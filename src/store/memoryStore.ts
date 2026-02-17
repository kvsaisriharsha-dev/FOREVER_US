import { create } from 'zustand';
import { Memory, MemoryFormData, CompartmentType } from '../types/memory';
import { generateAICaption, generateId } from '../utils/captions';

const STORAGE_KEY = 'forever-us-memories';

const sampleMemories: Memory[] = [
  {
    id: 'sample_1',
    title: 'Golden Hour Together',
    description: 'That beautiful evening when the sky painted itself just for us. Every sunset reminds me of this perfect moment.',
    imageUrl: 'https://images.unsplash.com/photo-1620455970942-5fca5840d5ee?w=800&q=80',
    aiCaption: 'Two hearts, one beautiful story written in the language of forever 💜',
    date: '2025-12-15',
    liked: true,
    tags: ['love', 'sunset', 'together'],
    compartment: 'couple',
    createdAt: Date.now() - 86400000 * 30,
  },
  {
    id: 'sample_2',
    title: 'Friends Who Feel Like Family',
    description: 'Laughing until our stomachs hurt — these are the people who make life extraordinary.',
    imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80',
    aiCaption: 'Laughter shared with the best people becomes the sweetest memories ✨',
    date: '2025-11-20',
    liked: true,
    tags: ['friendship', 'laughter', 'joy'],
    compartment: 'besties',
    createdAt: Date.now() - 86400000 * 60,
  },
  {
    id: 'sample_3',
    title: 'Seaside Dreams',
    description: 'The ocean whispered secrets and we listened with our hearts. Salt air and sandy toes.',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    aiCaption: 'Some places touch your soul in ways words can never capture 💜',
    date: '2025-10-05',
    liked: false,
    tags: ['beach', 'nature', 'peace'],
    compartment: 'personal',
    createdAt: Date.now() - 86400000 * 90,
  },
  {
    id: 'sample_4',
    title: 'Mountain Escape',
    description: 'Above the clouds, everything feels possible. Nature heals what the world cannot.',
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
    aiCaption: 'The best views come after the hardest climbs — and the best company 💜',
    date: '2025-09-12',
    liked: false,
    tags: ['adventure', 'mountains', 'explore'],
    compartment: 'adventure',
    createdAt: Date.now() - 86400000 * 120,
  },
  {
    id: 'sample_5',
    title: 'Sunday Brunch with the Fam',
    description: 'Nothing beats the chaos and love of a family gathering. Grandma\'s cooking, kids laughing, and stories that never get old.',
    imageUrl: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&q=80',
    aiCaption: 'Family isn\'t just important, it\'s everything — wrapped in love and laughter 💜',
    date: '2025-08-18',
    liked: true,
    tags: ['family', 'love', 'gathering'],
    compartment: 'family',
    createdAt: Date.now() - 86400000 * 150,
  },
];

function loadMemories(): Memory[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as Memory[];
      // Migrate old memories without compartment
      return parsed.map((m) => ({
        ...m,
        compartment: m.compartment || 'personal' as CompartmentType,
      }));
    }
  } catch {
    console.warn('Failed to load memories from localStorage');
  }
  return sampleMemories;
}

function saveMemories(memories: Memory[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(memories));
  } catch {
    console.warn('Failed to save memories to localStorage');
  }
}

interface MemoryStore {
  memories: Memory[];
  searchQuery: string;
  filterTag: string;
  addMemory: (data: MemoryFormData) => Memory;
  deleteMemory: (id: string) => void;
  toggleLike: (id: string) => void;
  setSearchQuery: (query: string) => void;
  setFilterTag: (tag: string) => void;
  getMemoryById: (id: string) => Memory | undefined;
  getFilteredMemories: () => Memory[];
  getLikedMemories: () => Memory[];
  getAllTags: () => string[];
}

export const useMemoryStore = create<MemoryStore>((set, get) => ({
  memories: loadMemories(),
  searchQuery: '',
  filterTag: '',

  addMemory: (data: MemoryFormData) => {
    const aiCaption = generateAICaption(data.title, data.description);
    const newMemory: Memory = {
      id: generateId(),
      title: data.title,
      description: data.description,
      imageUrl: data.imageUrl || '',
      aiCaption,
      date: new Date().toISOString().split('T')[0],
      liked: false,
      tags: data.tags,
      compartment: data.compartment || 'personal',
      createdAt: Date.now(),
    };

    set((state) => {
      const updated = [newMemory, ...state.memories];
      saveMemories(updated);
      return { memories: updated };
    });

    return newMemory;
  },

  deleteMemory: (id: string) => {
    set((state) => {
      const updated = state.memories.filter((m) => m.id !== id);
      saveMemories(updated);
      return { memories: updated };
    });
  },

  toggleLike: (id: string) => {
    set((state) => {
      const updated = state.memories.map((m) =>
        m.id === id ? { ...m, liked: !m.liked } : m
      );
      saveMemories(updated);
      return { memories: updated };
    });
  },

  setSearchQuery: (query: string) => set({ searchQuery: query }),
  setFilterTag: (tag: string) => set({ filterTag: tag }),

  getMemoryById: (id: string) => get().memories.find((m) => m.id === id),

  getFilteredMemories: () => {
    const { memories, searchQuery, filterTag } = get();
    return memories.filter((m) => {
      const matchesSearch =
        !searchQuery ||
        m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.aiCaption.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTag = !filterTag || m.tags.includes(filterTag);
      return matchesSearch && matchesTag;
    });
  },

  getLikedMemories: () => get().memories.filter((m) => m.liked),

  getAllTags: () => {
    const tags = new Set<string>();
    get().memories.forEach((m) => m.tags.forEach((t) => tags.add(t)));
    return Array.from(tags).sort();
  },
}));
