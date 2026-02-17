import { Link, useLocation } from 'react-router-dom';
import { Heart, Plus, Home, Grid3X3, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');

  const navLinks = [
    { path: '/', label: 'Home', icon: Home, exact: true },
    { path: '/compartments', label: 'Spaces', icon: Grid3X3, exact: false },
    { path: '/gallery', label: 'All', icon: Sparkles, exact: true },
    { path: '/add', label: 'Create', icon: Plus, exact: true },
  ];

  const checkActive = (path: string, exact: boolean) => {
    if (exact) return location.pathname === path;
    return location.pathname === path || location.pathname.startsWith(path + '/') || location.pathname.startsWith('/compartment/');
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="mx-3 mt-3 sm:mx-6 sm:mt-4">
        <div className="glass-card rounded-2xl px-4 py-3 sm:px-6 sm:py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/25"
            >
              <Heart className="w-5 h-5 text-white fill-white" />
            </motion.div>
            <span className="text-lg font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent hidden sm:block">
              Forever Us
            </span>
          </Link>

          {/* Nav Links */}
          <div className="flex items-center gap-1 sm:gap-2">
            {navLinks.map(({ path, label, icon: Icon, exact }) => (
              <Link key={path} to={path}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative flex items-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                    checkActive(path, exact)
                      ? 'text-white'
                      : 'text-white/60 hover:text-white/90'
                  }`}
                >
                  {checkActive(path, exact) && (
                    <motion.div
                      layoutId="navbar-active"
                      className="absolute inset-0 bg-white/10 rounded-xl border border-white/20"
                      transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
                    />
                  )}
                  <Icon className="w-4 h-4 relative z-10" />
                  <span className="relative z-10 hidden sm:block">{label}</span>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
