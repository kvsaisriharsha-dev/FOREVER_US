const emotionalCaptions: Record<string, string[]> = {
  love: [
    "Two hearts, one beautiful story written in the language of forever 💜",
    "In a world of temporary things, you are my permanent happiness ✨",
    "This moment captured what words could never express — pure, infinite love 🌙",
    "Some memories are so beautiful, they make your heart ache with gratitude 💫",
    "Love isn't just a feeling — it's every small moment that makes life extraordinary 🦋",
    "Together is the most beautiful place we've ever been 💜",
    "Every love story is beautiful, but ours is my absolute favorite ✨",
  ],
  friendship: [
    "True friends are never apart, maybe in distance but never in heart 🌟",
    "Some friendships are so deep, they become part of who you are 💜",
    "Laughter shared with the best people becomes the sweetest memories ✨",
    "Friends who become family — that's the real treasure of life 🌙",
    "In the garden of life, the best flowers are the friends we pick 💫",
    "These are the moments we'll look back on and smile forever 🦋",
    "Side by side or miles apart, real friends are always close to the heart 💜",
  ],
  nature: [
    "Nature doesn't hurry, yet everything is accomplished — just like the best moments ✨",
    "Lost in the beauty of this moment, found in the peace of nature 🌿",
    "Some places touch your soul in ways words can never capture 💜",
    "The earth has music for those who listen — this was its symphony 🌙",
    "Between the sunsets and the starlight, life happens beautifully 💫",
    "In every walk with nature, one receives far more than they seek 🦋",
  ],
  personal: [
    "This is a chapter I never want to forget — written in moments, sealed in love 💜",
    "Life is not measured by breaths we take, but by the moments that take our breath away ✨",
    "A moment of pure magic, preserved forever in the gallery of my heart 🌙",
    "Some memories are worth collecting like precious gems 💫",
    "Today I choose joy, gratitude, and the beauty of this very moment 🦋",
    "This is what it feels like to be truly, deeply alive 💜",
    "Hold onto this feeling — it's what makes life worth every heartbeat ✨",
  ],
  adventure: [
    "Adventure is out there, and we found it in every shared heartbeat 🌍",
    "The best views come after the hardest climbs — and the best company 💜",
    "Collecting moments, not things — this one is priceless ✨",
    "Life begins at the end of your comfort zone, and it's beautiful here 🌙",
    "Wanderlust and wonderful company — the recipe for unforgettable memories 💫",
    "Every adventure is better when it's shared with someone special 🦋",
  ],
};

const allCategories = Object.keys(emotionalCaptions);

function detectCategory(title: string, description: string): string {
  const text = `${title} ${description}`.toLowerCase();

  const keywords: Record<string, string[]> = {
    love: ['love', 'heart', 'romance', 'couple', 'kiss', 'together', 'partner', 'darling', 'sweetheart', 'babe', 'husband', 'wife', 'boyfriend', 'girlfriend', 'date', 'anniversary', 'wedding', 'forever'],
    friendship: ['friend', 'buddy', 'bestie', 'crew', 'squad', 'gang', 'pal', 'bff', 'laugh', 'fun', 'hangout', 'party', 'reunion'],
    nature: ['nature', 'sunset', 'sunrise', 'ocean', 'mountain', 'beach', 'forest', 'garden', 'flower', 'sky', 'rain', 'snow', 'lake', 'river', 'tree', 'sea', 'star'],
    adventure: ['adventure', 'travel', 'trip', 'journey', 'explore', 'discover', 'road', 'flight', 'hike', 'camp', 'wander', 'vacation', 'holiday'],
    personal: ['me', 'myself', 'personal', 'journal', 'diary', 'reflect', 'growth', 'milestone', 'birthday', 'achieve', 'dream', 'grateful', 'blessed'],
  };

  let bestCategory = 'personal';
  let bestScore = 0;

  for (const [category, words] of Object.entries(keywords)) {
    const score = words.filter(word => text.includes(word)).length;
    if (score > bestScore) {
      bestScore = score;
      bestCategory = category;
    }
  }

  return bestCategory;
}

export function generateAICaption(title: string, description: string): string {
  const category = detectCategory(title, description);
  const captions = emotionalCaptions[category] || emotionalCaptions.personal;
  const randomIndex = Math.floor(Math.random() * captions.length);
  return captions[randomIndex];
}

export function generateId(): string {
  return `memory_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}
