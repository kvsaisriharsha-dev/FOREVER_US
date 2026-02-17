import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Eye, EyeOff, ShieldCheck, KeyRound } from 'lucide-react';
import { CompartmentConfig } from '../types/memory';

const PASSWORDS_KEY = 'forever-us-passwords';
const UNLOCKED_KEY = 'forever-us-unlocked';

function getPasswords(): Record<string, string> {
  try {
    const stored = localStorage.getItem(PASSWORDS_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch { return {}; }
}

function savePassword(compartmentId: string, password: string) {
  const passwords = getPasswords();
  passwords[compartmentId] = password;
  localStorage.setItem(PASSWORDS_KEY, JSON.stringify(passwords));
}

function getUnlocked(): string[] {
  try {
    const stored = sessionStorage.getItem(UNLOCKED_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch { return []; }
}

function setUnlocked(compartmentId: string) {
  const unlocked = getUnlocked();
  if (!unlocked.includes(compartmentId)) {
    unlocked.push(compartmentId);
    sessionStorage.setItem(UNLOCKED_KEY, JSON.stringify(unlocked));
  }
}

export function isCompartmentUnlocked(compartmentId: string): boolean {
  return getUnlocked().includes(compartmentId);
}

export function hasPassword(compartmentId: string): boolean {
  const passwords = getPasswords();
  return !!passwords[compartmentId];
}

interface PasswordGateProps {
  compartment: CompartmentConfig;
  onUnlock: () => void;
}

export default function PasswordGate({ compartment, onUnlock }: PasswordGateProps) {
  const isFirstTime = !hasPassword(compartment.id);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [mode, setMode] = useState<'unlock' | 'setup'>(isFirstTime ? 'setup' : 'unlock');

  const handleSetup = () => {
    if (password.length < 4) {
      setError('Password must be at least 4 characters');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    savePassword(compartment.id, password);
    setUnlocked(compartment.id);
    onUnlock();
  };

  const handleUnlock = () => {
    const passwords = getPasswords();
    if (passwords[compartment.id] === password) {
      setUnlocked(compartment.id);
      setError('');
      onUnlock();
    } else {
      setError('Incorrect password');
      setPassword('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'setup') handleSetup();
    else handleUnlock();
  };

  return (
    <div className="min-h-screen pt-24 sm:pt-28 pb-12 px-4 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="glass-card rounded-3xl p-8 sm:p-10 text-center">
          {/* Lock Icon */}
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${compartment.gradient} flex items-center justify-center mx-auto mb-6 shadow-lg`}
          >
            {mode === 'setup' ? (
              <ShieldCheck className="w-10 h-10 text-white" />
            ) : (
              <Lock className="w-10 h-10 text-white" />
            )}
          </motion.div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-white mb-1">
            {compartment.emoji} {compartment.label}
          </h2>
          <p className="text-white/40 text-sm mb-8">
            {mode === 'setup'
              ? 'Set a password to protect this space'
              : 'Enter your password to unlock'}
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Password Input */}
            <div className="relative">
              <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                placeholder={mode === 'setup' ? 'Create a password...' : 'Enter password...'}
                className="input-field pl-11 pr-11"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Confirm Password (Setup Mode) */}
            <AnimatePresence>
              {mode === 'setup' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="relative"
                >
                  <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => { setConfirmPassword(e.target.value); setError(''); }}
                    placeholder="Confirm password..."
                    className="input-field pl-11"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-red-400 text-xs"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Submit */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className={`btn-primary w-full py-3.5 flex items-center justify-center gap-2`}
            >
              {mode === 'setup' ? (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  Set Password & Enter
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  Unlock
                </>
              )}
            </motion.button>
          </form>

          {/* Switch Mode */}
          {!isFirstTime && (
            <button
              onClick={() => {
                setMode(mode === 'unlock' ? 'setup' : 'unlock');
                setPassword('');
                setConfirmPassword('');
                setError('');
              }}
              className="mt-4 text-white/20 text-xs hover:text-white/40 underline transition-colors"
            >
              {mode === 'unlock' ? 'Reset password' : 'Back to unlock'}
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
