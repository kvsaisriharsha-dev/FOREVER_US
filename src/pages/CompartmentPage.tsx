import { useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Heart, Sparkles, X, ArrowLeft, Plus, Lock } from 'lucide-react';
import { getCompartmentConfig, CompartmentType } from '../types/memory';
import { useMemoryStore } from '../store/memoryStore';
import MemoryCard from '../components/MemoryCard';
import EmptyState from '../components/EmptyState';
import PasswordGate, { isCompartmentUnlocked } from '../components/PasswordGate';

export default function CompartmentPage() {
  const { compartmentId } = useParams<{ compartmentId: string }>();
  const compartment = getCompartmentConfig((compartmentId || 'personal') as CompartmentType);

  const [unlocked, setUnlocked] = useState(isCompartmentUnlocked(compartment.id));
  const [searchQuery, setSearchQuery] = useState('');
  const [showFavorites, setShowFavorites] = useState(false);

  const memories = useMemoryStore((s) => s.memories);
  const toggleLike = useMemoryStore((s) => s.toggleLike);

  const compartmentMemories = memories.filter((m) => m.compartment === compartment.id);
  const filtered = compartmentMemories.filter((m) => {
    const matchesSearch = !searchQuery ||
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFav = !showFavorites || m.liked;
    return matchesSearch && matchesFav;
  });

  const handleUnlock = useCallback(() => setUnlocked(true), []);

  if (!unlocked) {
    return <PasswordGate compartment={compartment} onUnlock={handleUnlock} />;
  }

  return (
    <div className="min-h-screen pt-24 sm:pt-28 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back */}
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
          <Link
            to="/compartments"
            className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 text-sm mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            All Compartments
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-3">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${compartment.gradient} flex items-center justify-center text-xl shadow-lg`}>
              {compartment.emoji}
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white">
                {compartment.label}
              </h1>
              <p className="text-white/40 text-sm">{compartment.description}</p>
            </div>
          </div>
        </motion.div>

        {/* Search & Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8 space-y-4"
        >
          <div className="flex gap-3 flex-col sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search ${compartment.label.toLowerCase()} memories...`}
                className="input-field pl-12 pr-12"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setShowFavorites(!showFavorites)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  showFavorites
                    ? 'bg-pink-500/20 text-pink-300 border border-pink-500/30'
                    : 'bg-white/5 text-white/50 border border-white/10'
                }`}
              >
                <Heart className={`w-4 h-4 ${showFavorites ? 'fill-pink-400' : ''}`} />
                Favorites
              </motion.button>
              <Link to={`/add?compartment=${compartment.id}`}>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-primary flex items-center gap-2 whitespace-nowrap"
                >
                  <Plus className="w-4 h-4" />
                  Add Memory
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-2 mb-6"
        >
          <Lock className="w-3.5 h-3.5 text-green-400" />
          <span className="text-white/30 text-sm">
            {filtered.length} {filtered.length === 1 ? 'memory' : 'memories'}
            {showFavorites ? ' favorited' : ''} in {compartment.label}
          </span>
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <EmptyState
              title={`No ${compartment.label.toLowerCase()} memories yet`}
              description={`Start capturing your ${compartment.label.toLowerCase()} moments. Each one tells a story worth keeping.`}
              showAction={true}
            />
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
            >
              {filtered.map((memory, index) => (
                <MemoryCard key={memory.id} memory={memory} index={index} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
