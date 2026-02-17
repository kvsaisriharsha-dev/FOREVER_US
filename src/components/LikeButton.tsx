import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

interface LikeButtonProps {
  liked: boolean;
  onToggle: () => void;
  size?: 'sm' | 'md' | 'lg';
}

export default function LikeButton({ liked, onToggle, size = 'md' }: LikeButtonProps) {
  const sizeMap = {
    sm: { button: 'w-8 h-8', icon: 'w-4 h-4' },
    md: { button: 'w-10 h-10', icon: 'w-5 h-5' },
    lg: { button: 'w-12 h-12', icon: 'w-6 h-6' },
  };

  return (
    <motion.button
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.85 }}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        onToggle();
      }}
      className={`${sizeMap[size].button} rounded-full flex items-center justify-center transition-all duration-300 ${
        liked
          ? 'bg-pink-500/20 text-pink-400 shadow-lg shadow-pink-500/20'
          : 'bg-white/5 text-white/40 hover:text-pink-400 hover:bg-pink-500/10'
      }`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={liked ? 'liked' : 'unliked'}
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 45 }}
          transition={{ type: 'spring', stiffness: 500, damping: 15 }}
        >
          <Heart
            className={`${sizeMap[size].icon} ${liked ? 'fill-pink-400' : ''}`}
          />
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
}
