import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Sparkles, Trash2, Share2, Tag, Grid3X3 } from 'lucide-react';
import { useMemoryStore } from '../store/memoryStore';
import { getCompartmentConfig } from '../types/memory';
import LikeButton from '../components/LikeButton';

export default function MemoryDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getMemoryById, toggleLike, deleteMemory } = useMemoryStore();

  const memory = getMemoryById(id || '');

  if (!memory) {
    return (
      <div className="min-h-screen pt-32 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-2xl font-bold text-white mb-4">Memory Not Found</h2>
          <p className="text-white/40 mb-8">This memory may have been deleted or doesn't exist.</p>
          <Link to="/gallery" className="btn-primary inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Gallery
          </Link>
        </motion.div>
      </div>
    );
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this memory? This action cannot be undone.')) {
      deleteMemory(memory.id);
      navigate('/gallery');
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: memory.title,
          text: memory.aiCaption,
        });
      } catch { /* user cancelled */ }
    }
  };

  return (
    <div className="min-h-screen pt-24 sm:pt-28 pb-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-white/40 hover:text-white/70 text-sm mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </motion.button>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl overflow-hidden mb-8 relative"
        >
          <img
            src={memory.imageUrl}
            alt={memory.title}
            className="w-full aspect-[16/10] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          {/* Actions on Image */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <LikeButton
              liked={memory.liked}
              onToggle={() => toggleLike(memory.id)}
              size="lg"
            />
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-6"
        >
          {/* Title & Date */}
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              {memory.title}
            </h1>
            <div className="flex items-center gap-4 text-white/30 text-sm">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>
                  {new Date(memory.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Compartment Badge */}
          {memory.compartment && (() => {
            const comp = getCompartmentConfig(memory.compartment);
            return (
              <div className="flex items-center gap-2">
                <Grid3X3 className="w-4 h-4 text-white/20" />
                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r ${comp.gradientBg} ${comp.borderColor} border text-white/70`}>
                  <span>{comp.emoji}</span>
                  {comp.label}
                </span>
              </div>
            );
          })()}

          {/* Tags */}
          {memory.tags.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <Tag className="w-4 h-4 text-white/20" />
              {memory.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-violet-500/10 text-violet-300 border border-violet-500/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Description */}
          <div className="glass-card rounded-2xl p-6">
            <p className="text-white/70 leading-relaxed text-sm sm:text-base">
              {memory.description}
            </p>
          </div>

          {/* AI Caption */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card rounded-2xl p-6 bg-gradient-to-r from-violet-500/5 to-fuchsia-500/5 border-violet-500/20"
          >
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-violet-400" />
              <span className="text-sm font-semibold text-violet-300">AI-Generated Caption</span>
            </div>
            <p className="text-violet-200/70 italic leading-relaxed text-sm sm:text-base">
              "{memory.aiCaption}"
            </p>
          </motion.div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleShare}
              className="btn-secondary flex items-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              Share
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleDelete}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-red-400/70 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 hover:text-red-300 transition-all"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
