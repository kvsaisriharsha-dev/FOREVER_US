import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Send, Tag, X, ArrowLeft } from 'lucide-react';
import { useMemoryStore } from '../store/memoryStore';
import { COMPARTMENTS, CompartmentType, getCompartmentConfig } from '../types/memory';
import PhotoUpload from '../components/PhotoUpload';

const suggestedTags = ['love', 'friendship', 'adventure', 'nature', 'personal', 'travel', 'family', 'celebration', 'sunset', 'beach'];

export default function AddMemory() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const addMemory = useMemoryStore((s) => s.addMemory);

  const presetCompartment = searchParams.get('compartment') as CompartmentType | null;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [compartment, setCompartment] = useState<CompartmentType>(presetCompartment || 'personal');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (presetCompartment) setCompartment(presetCompartment);
  }, [presetCompartment]);

  const addTag = (tag: string) => {
    const normalizedTag = tag.toLowerCase().trim();
    if (normalizedTag && !tags.includes(normalizedTag) && tags.length < 5) {
      setTags([...tags, normalizedTag]);
    }
    setTagInput('');
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));

    const memory = addMemory({
      title: title.trim(),
      description: description.trim(),
      tags,
      compartment,
      imageUrl: imageUrl || 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&q=80',
    });

    setIsSubmitting(false);
    navigate(`/memory/${memory.id}`);
  };

  const isValid = title.trim().length > 0 && description.trim().length > 0;
  const activeCompartment = getCompartmentConfig(compartment);

  return (
    <div className="min-h-screen pt-24 sm:pt-28 pb-12 px-4">
      <div className="max-w-2xl mx-auto">
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

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Create a Memory
          </h1>
          <p className="text-white/40 text-sm sm:text-base">
            Capture a moment and let AI express the emotions behind it.
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Compartment Selection */}
          <div>
            <label className="form-label">Save To Compartment</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {COMPARTMENTS.map((comp) => (
                <motion.button
                  key={comp.id}
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setCompartment(comp.id)}
                  className={`flex items-center gap-2.5 p-3 rounded-xl text-left text-sm font-medium transition-all duration-300 ${
                    compartment === comp.id
                      ? `bg-gradient-to-r ${comp.gradientBg} ${comp.borderColor} border text-white`
                      : 'bg-white/[0.02] border border-white/5 text-white/40 hover:text-white/60 hover:border-white/10'
                  }`}
                >
                  <span className="text-lg">{comp.emoji}</span>
                  <span>{comp.label}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Photo Upload */}
          <div>
            <label className="form-label">Photo</label>
            <PhotoUpload
              onImageSelect={(dataUrl) => setImageUrl(dataUrl)}
              currentImage={imageUrl}
            />
          </div>

          {/* Title */}
          <div>
            <label className="form-label">Memory Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give this memory a name..."
              className="input-field"
              maxLength={100}
            />
            <div className="text-right mt-1">
              <span className="text-white/20 text-xs">{title.length}/100</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="form-label">Your Story</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell the story behind this moment... What made it special?"
              className="input-field min-h-[140px] resize-none"
              rows={5}
              maxLength={500}
            />
            <div className="text-right mt-1">
              <span className="text-white/20 text-xs">{description.length}/500</span>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="form-label flex items-center gap-2">
              <Tag className="w-4 h-4" />
              Tags
              <span className="text-white/20 font-normal">({tags.length}/5)</span>
            </label>

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {tags.map((tag) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-violet-500/15 text-violet-300 text-xs font-medium border border-violet-500/20"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="text-violet-400/50 hover:text-violet-300 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </motion.span>
                ))}
              </div>
            )}

            <div className="flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTag(tagInput);
                  }
                }}
                placeholder="Add a tag..."
                className="input-field flex-1"
                disabled={tags.length >= 5}
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => addTag(tagInput)}
                disabled={!tagInput.trim() || tags.length >= 5}
                className="btn-secondary px-4 disabled:opacity-30"
              >
                Add
              </motion.button>
            </div>

            <div className="flex flex-wrap gap-1.5 mt-3">
              {suggestedTags
                .filter((t) => !tags.includes(t))
                .slice(0, 6)
                .map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => addTag(tag)}
                    disabled={tags.length >= 5}
                    className="px-2.5 py-1 rounded-lg text-[11px] text-white/30 bg-white/5 hover:bg-white/10 hover:text-white/50 transition-all disabled:opacity-30 border border-white/5"
                  >
                    + {tag}
                  </button>
                ))}
            </div>
          </div>

          {/* AI Caption Preview */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="glass-card rounded-2xl p-5"
          >
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-violet-400" />
              <span className="text-sm font-medium text-violet-300">AI Caption</span>
            </div>
            <p className="text-white/40 text-sm italic leading-relaxed">
              {isValid
                ? `✨ Your AI caption will appear when you save to ${activeCompartment.emoji} ${activeCompartment.label}.`
                : "Fill in the title and story to get an AI-generated emotional caption."}
            </p>
          </motion.div>

          {/* Submit */}
          <motion.button
            whileHover={isValid ? { scale: 1.02 } : {}}
            whileTap={isValid ? { scale: 0.98 } : {}}
            type="submit"
            disabled={!isValid || isSubmitting}
            className="btn-primary w-full py-4 flex items-center justify-center gap-2 text-base disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                  <Sparkles className="w-5 h-5" />
                </motion.div>
                Generating AI Caption...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Save to {activeCompartment.emoji} {activeCompartment.label}
              </>
            )}
          </motion.button>
        </motion.form>
      </div>
    </div>
  );
}
