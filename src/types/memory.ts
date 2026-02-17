export interface Memory {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  aiCaption: string;
  date: string;
  liked: boolean;
  tags: string[];
  compartment: CompartmentType;
  createdAt: number;
}

export type CompartmentType = 'besties' | 'family' | 'couple' | 'personal' | 'adventure';

export type MemoryFormData = Pick<Memory, 'title' | 'description' | 'tags' | 'compartment'> & {
  imageFile?: File | null;
  imageUrl?: string;
};

export interface CompartmentConfig {
  id: CompartmentType;
  label: string;
  emoji: string;
  description: string;
  gradient: string;
  gradientBg: string;
  accentColor: string;
  borderColor: string;
  coverImage: string;
}

export const COMPARTMENTS: CompartmentConfig[] = [
  {
    id: 'besties',
    label: 'Besties',
    emoji: '👯',
    description: 'Memories with your ride-or-die friends',
    gradient: 'from-violet-500 to-indigo-600',
    gradientBg: 'from-violet-500/15 to-indigo-600/10',
    accentColor: 'violet',
    borderColor: 'border-violet-500/30',
    coverImage: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80',
  },
  {
    id: 'family',
    label: 'Family',
    emoji: '👨‍👩‍👧‍👦',
    description: 'Precious family moments to treasure',
    gradient: 'from-amber-500 to-orange-600',
    gradientBg: 'from-amber-500/15 to-orange-600/10',
    accentColor: 'amber',
    borderColor: 'border-amber-500/30',
    coverImage: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=600&q=80',
  },
  {
    id: 'couple',
    label: 'Couple',
    emoji: '💑',
    description: 'Love stories written in moments',
    gradient: 'from-pink-500 to-rose-600',
    gradientBg: 'from-pink-500/15 to-rose-600/10',
    accentColor: 'pink',
    borderColor: 'border-pink-500/30',
    coverImage: 'https://images.unsplash.com/photo-1620455970942-5fca5840d5ee?w=600&q=80',
  },
  {
    id: 'personal',
    label: 'Personal',
    emoji: '🌟',
    description: 'Your private journal of self-discovery',
    gradient: 'from-emerald-500 to-teal-600',
    gradientBg: 'from-emerald-500/15 to-teal-600/10',
    accentColor: 'emerald',
    borderColor: 'border-emerald-500/30',
    coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80',
  },
  {
    id: 'adventure',
    label: 'Adventure',
    emoji: '🌍',
    description: 'Wanderlust and wild explorations',
    gradient: 'from-cyan-500 to-blue-600',
    gradientBg: 'from-cyan-500/15 to-blue-600/10',
    accentColor: 'cyan',
    borderColor: 'border-cyan-500/30',
    coverImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80',
  },
];

export function getCompartmentConfig(id: CompartmentType): CompartmentConfig {
  return COMPARTMENTS.find((c) => c.id === id) || COMPARTMENTS[3];
}
