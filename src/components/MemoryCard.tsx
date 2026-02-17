import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Sparkles } from 'lucide-react';
import { Memory, getCompartmentConfig } from '../types/memory';
import LikeButton from './LikeButton';
import { useMemoryStore } from '../store/memoryStore';

interface MemoryCardProps {
  memory: Memory;
  index: number;
}

export default function MemoryCard({ memory, index }: MemoryCardProps) {
  const toggleLike = useMemoryStore((s) => s.toggleLike);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
      whileHover={{ y: -6 }}
      className="group"
    >
      <Link to={`/memory/${memory.id}`}>
        <div className="glass-card rounded-2xl overflow-hidden hover:border-violet-500/30 transition-all duration-500 hover:shadow-xl hover:shadow-violet-500/10">
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={memory.imageUrl}
              alt={memory.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Like Button */}
            <div className="absolute top-3 right-3">
              <LikeButton
                liked={memory.liked}
                onToggle={() => toggleLike(memory.id)}
                size="sm"
              />
            </div>

            {/* Tags */}
            <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
              {memory.compartment && (() => {
                const comp = getCompartmentConfig(memory.compartment);
                return (
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-gradient-to-r ${comp.gradientBg} backdrop-blur-md text-white/90 border border-white/10`}>
                    {comp.emoji} {comp.label}
                  </span>
                );
              })()}
              {memory.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-white/15 backdrop-blur-md text-white/90 border border-white/10"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-5">
            <h3 className="text-base sm:text-lg font-semibold text-white mb-1.5 line-clamp-1 group-hover:text-violet-300 transition-colors">
              {memory.title}
            </h3>

            <p className="text-white/50 text-xs sm:text-sm line-clamp-2 mb-3 leading-relaxed">
              {memory.description}
            </p>

            {/* AI Caption */}
            <div className="flex items-start gap-2 p-2.5 rounded-xl bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 border border-violet-500/10">
              <Sparkles className="w-3.5 h-3.5 text-violet-400 mt-0.5 flex-shrink-0" />
              <p className="text-[11px] sm:text-xs text-violet-300/80 italic leading-relaxed line-clamp-2">
                {memory.aiCaption}
              </p>
            </div>

            {/* Date */}
            <div className="flex items-center gap-1.5 mt-3 text-white/30 text-[11px]">
              <Calendar className="w-3 h-3" />
              <span>{new Date(memory.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
