import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Sparkles, ArrowRight, Camera, Grid3X3, Lock } from 'lucide-react';
import { COMPARTMENTS } from '../types/memory';

export default function Landing() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-20 left-10 w-72 h-72 bg-violet-600/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -25, 0], y: [0, 30, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-40 right-10 w-96 h-96 bg-fuchsia-600/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-20 left-1/3 w-80 h-80 bg-pink-600/8 rounded-full blur-3xl"
        />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 mb-8"
          >
            <Sparkles className="w-4 h-4 text-violet-400" />
            <span className="text-violet-300 text-sm font-medium">AI-Powered Memory Journaling</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            <span className="text-white">Keep Your</span>
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
              Memories Forever
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-white/50 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Organize memories into private, password-protected spaces — Besties, Family, Couple & more. Each compartment keeps your moments safe and separate.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/compartments">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="btn-primary text-base px-8 py-4 flex items-center gap-2.5"
              >
                <Grid3X3 className="w-5 h-5" />
                Open Compartments
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
            <Link to="/add">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="btn-secondary text-base px-8 py-4 flex items-center gap-2.5"
              >
                <Camera className="w-5 h-5" />
                Create Memory
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Compartments Preview */}
      <section className="relative py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              Private Memory Spaces
            </h2>
            <p className="text-white/40 text-sm sm:text-base max-w-xl mx-auto">
              Each compartment is password-protected. Your besties memories stay separate from family, couple, and personal moments.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {COMPARTMENTS.map((comp, index) => (
              <motion.div
                key={comp.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <Link to={`/compartment/${comp.id}`}>
                  <div className="glass-card rounded-2xl p-5 text-center group hover:border-white/15 transition-all duration-500">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${comp.gradient} flex items-center justify-center mx-auto mb-3 text-2xl shadow-lg group-hover:scale-110 transition-transform`}>
                      {comp.emoji}
                    </div>
                    <h3 className="text-sm font-semibold text-white mb-1">{comp.label}</h3>
                    <div className="flex items-center justify-center gap-1 text-white/25 text-[10px]">
                      <Lock className="w-2.5 h-2.5" />
                      <span>Protected</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Sparkles,
                title: 'AI Captions',
                description: 'Each memory gets a heartfelt AI-generated caption that captures the emotion perfectly.',
                gradient: 'from-violet-500 to-purple-600',
              },
              {
                icon: Lock,
                title: 'Password Protected',
                description: 'Each compartment has its own password — your besties memories stay private from family.',
                gradient: 'from-fuchsia-500 to-pink-600',
              },
              {
                icon: Heart,
                title: 'Favorite Moments',
                description: 'Mark your most precious memories and find them instantly within each compartment.',
                gradient: 'from-pink-500 to-rose-600',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                whileHover={{ y: -5 }}
                className="glass-card rounded-2xl p-6 sm:p-8 group hover:border-violet-500/30 transition-all duration-500"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5 shadow-lg`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-8 px-4 border-t border-white/5">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-violet-400 fill-violet-400" />
            <span className="text-white/30 text-sm">Forever Us — Made with love</span>
          </div>
          <p className="text-white/20 text-xs">Your memories, your story, forever beautiful.</p>
        </div>
      </footer>
    </div>
  );
}
