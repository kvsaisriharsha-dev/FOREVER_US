import { motion } from 'framer-motion';
import { Heart, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

interface EmptyStateProps {
  title?: string;
  description?: string;
  showAction?: boolean;
}

export default function EmptyState({
  title = 'No memories yet',
  description = 'Start capturing your most beautiful moments and let them live forever.',
  showAction = true,
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center justify-center py-20 px-6"
    >
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          rotate: [0, 3, -3, 0],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="w-20 h-20 rounded-3xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 flex items-center justify-center border border-violet-500/20 mb-6"
      >
        <Heart className="w-10 h-10 text-violet-400" />
      </motion.div>

      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-white/40 text-sm text-center max-w-sm mb-8 leading-relaxed">
        {description}
      </p>

      {showAction && (
        <Link to="/add">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Create Memory
          </motion.button>
        </Link>
      )}
    </motion.div>
  );
}
