import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Heart, Sparkles, X } from 'lucide-react';
import { useMemoryStore } from '../store/memoryStore';
import MemoryCard from '../components/MemoryCard';
import EmptyState from '../components/EmptyState';

export default function Gallery() {
  const { searchQuery, setSearchQuery, filterTag, setFilterTag, getFilteredMemories, getAllTags } = useMemoryStore();
  const [showFavorites, setShowFavorites] = useState(false);

  const memories = getFilteredMemories();
  const displayMemories = showFavorites ? memories.filter((m) => m.liked) : memories;
  const tags = getAllTags();

  return (
    <div className="min-h-screen pt-24 sm:pt-28 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Your Memories
          </h1>
          <p className="text-white/40 text-sm sm:text-base">
            A beautiful collection of moments that matter most.
          </p>
        </motion.div>

        {/* Search & Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8 space-y-4"
        >
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search your memories..."
              className="input-field pl-12 pr-12"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter Row */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Favorites Toggle */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setShowFavorites(!showFavorites)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                showFavorites
                  ? 'bg-pink-500/20 text-pink-300 border border-pink-500/30'
                  : 'bg-white/5 text-white/50 border border-white/10 hover:border-white/20'
              }`}
            >
              <Heart className={`w-4 h-4 ${showFavorites ? 'fill-pink-400' : ''}`} />
              Favorites
            </motion.button>

            {/* Tag Filters */}
            {tags.map((tag) => (
              <motion.button
                key={tag}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setFilterTag(filterTag === tag ? '' : tag)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-300 ${
                  filterTag === tag
                    ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
                    : 'bg-white/5 text-white/40 border border-white/10 hover:border-white/20'
                }`}
              >
                <Filter className="w-3 h-3" />
                {tag}
              </motion.button>
            ))}

            {(filterTag || searchQuery) && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => { setFilterTag(''); setSearchQuery(''); }}
                className="text-xs text-white/30 hover:text-white/60 underline transition-colors"
              >
                Clear filters
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* Memory Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-2 mb-6"
        >
          <Sparkles className="w-4 h-4 text-violet-400" />
          <span className="text-white/30 text-sm">
            {displayMemories.length} {displayMemories.length === 1 ? 'memory' : 'memories'}
            {showFavorites ? ' favorited' : ''}
            {filterTag ? ` tagged "${filterTag}"` : ''}
          </span>
        </motion.div>

        {/* Gallery Grid */}
        <AnimatePresence mode="wait">
          {displayMemories.length === 0 ? (
            <EmptyState
              title={showFavorites ? "No favorites yet" : "No memories found"}
              description={
                showFavorites
                  ? "Heart the memories you love most to see them here."
                  : "Try adjusting your search or create a new memory."
              }
              showAction={!showFavorites && !searchQuery && !filterTag}
            />
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
            >
              {displayMemories.map((memory, index) => (
                <MemoryCard key={memory.id} memory={memory} index={index} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
