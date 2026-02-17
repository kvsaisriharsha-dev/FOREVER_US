import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, LockOpen, Sparkles, Plus } from 'lucide-react';
import { COMPARTMENTS, CompartmentConfig } from '../types/memory';
import { isCompartmentUnlocked, hasPassword } from '../components/PasswordGate';
import { useMemoryStore } from '../store/memoryStore';

export default function CompartmentHub() {
  const memories = useMemoryStore((s) => s.memories);

  const getCount = (id: string) => memories.filter((m) => m.compartment === id).length;

  return (
    <div className="min-h-screen pt-24 sm:pt-28 pb-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 mb-6">
            <Sparkles className="w-4 h-4 text-violet-400" />
            <span className="text-violet-300 text-sm font-medium">Private Memory Spaces</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">
            Your Memory Compartments
          </h1>
          <p className="text-white/40 text-sm sm:text-base max-w-xl mx-auto">
            Each space is password-protected and holds memories close to your heart. Choose a compartment to explore.
          </p>
        </motion.div>

        {/* Compartment Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-12">
          {COMPARTMENTS.map((comp, index) => (
            <CompartmentCard key={comp.id} compartment={comp} count={getCount(comp.id)} index={index} />
          ))}
        </div>

        {/* Create Memory CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Link to="/add">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary text-base px-8 py-4 inline-flex items-center gap-2.5"
            >
              <Plus className="w-5 h-5" />
              Create New Memory
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

function CompartmentCard({ compartment, count, index }: { compartment: CompartmentConfig; count: number; index: number }) {
  const unlocked = isCompartmentUnlocked(compartment.id);
  const hasPass = hasPassword(compartment.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className="group"
    >
      <Link to={`/compartment/${compartment.id}`}>
        <div className={`glass-card rounded-2xl overflow-hidden hover:${compartment.borderColor} transition-all duration-500 hover:shadow-xl`}>
          {/* Cover Image */}
          <div className="relative aspect-[16/10] overflow-hidden">
            <img
              src={compartment.coverImage}
              alt={compartment.label}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            {/* Lock Status */}
            <div className="absolute top-3 right-3">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md ${
                unlocked
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : 'bg-white/10 text-white/50 border border-white/10'
              }`}>
                {unlocked ? <LockOpen className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
              </div>
            </div>

            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${compartment.gradient} flex items-center justify-center text-lg shadow-lg`}>
                  {compartment.emoji}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{compartment.label}</h3>
                  <p className="text-white/50 text-xs">{count} {count === 1 ? 'memory' : 'memories'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="p-4">
            <p className="text-white/40 text-xs leading-relaxed mb-3">{compartment.description}</p>
            <div className={`flex items-center gap-2 text-xs font-medium ${
              hasPass ? 'text-white/30' : 'text-violet-400'
            }`}>
              {hasPass ? (
                <>
                  <Lock className="w-3 h-3" />
                  <span>Password protected</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3 h-3" />
                  <span>Tap to set up & enter</span>
                </>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
