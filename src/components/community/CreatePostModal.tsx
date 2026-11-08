import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CATEGORIES, LOCALITIES } from '../../data/mockData';
import { X, Image, AlertCircle, Eye, EyeOff, Sparkles } from 'lucide-react';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreatePostModal: React.FC<CreatePostModalProps> = ({ isOpen, onClose }) => {
  const { createPost, currentUser } = useApp();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0].name);
  const [locality, setLocality] = useState('Tambaram');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [photoUrl, setPhotoUrl] = useState('');
  const [photosList, setPhotosList] = useState<string[]>([]);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleAddPhoto = () => {
    if (photoUrl.trim()) {
      setPhotosList(prev => [...prev, photoUrl.trim()]);
      setPhotoUrl('');
    }
  };

  const handleRemovePhoto = (index: number) => {
    setPhotosList(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setError('Please provide both a title and description for your community post.');
      return;
    }

    createPost({
      title: title.trim(),
      content: content.trim(),
      category: category as any,
      locality,
      photos: photosList,
      isAnonymous
    });

    onClose();
  };

  // Preset sample civic evidence photos for easy 1-click testing
  const sampleEvidencePhotos = [
    { label: 'Garbage Dump', url: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=800&auto=format&fit=crop&q=80' },
    { label: 'Broken Road', url: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=800&auto=format&fit=crop&q=80' },
    { label: 'Drainage Issue', url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?w=800&auto=format&fit=crop&q=80' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-post-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#E8F5EE] text-[#176B50] flex items-center justify-center font-bold">
              +
            </div>
            <div>
              <h2 id="create-post-title" className="text-lg font-bold text-slate-900">
                Create Community Post
              </h2>
              <p className="text-xs text-slate-500">
                Share a local concern or discussion with neighbors in your locality.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mt-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-left">
          {/* Locality & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Locality / Sub-Community *
              </label>
              <select
                value={locality}
                onChange={(e) => setLocality(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#176B50]"
              >
                {LOCALITIES.filter(l => l !== 'All Localities').map((loc) => (
                  <option key={loc} value={loc}>
                    r/{loc}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#176B50]"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.name} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Post Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Uncollected garbage near Chromepet Bus Depot"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#176B50]"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Discussion Details *
            </label>
            <textarea
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Describe the issue, exact street or landmark, duration, and suggested remedies..."
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#176B50]"
              required
            />
          </div>

          {/* Photos Evidence */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Attach Photographs / Evidence (URL)
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                placeholder="Paste an image URL..."
                className="flex-1 px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#176B50]"
              />
              <button
                type="button"
                onClick={handleAddPhoto}
                className="px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
              >
                Add Photo
              </button>
            </div>

            {/* Quick Presets */}
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[11px] text-slate-400">Quick Samples:</span>
              {sampleEvidencePhotos.map(p => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => setPhotosList(prev => [...prev, p.url])}
                  className="text-[10px] bg-slate-100 hover:bg-[#E8F5EE] hover:text-[#176B50] px-2 py-0.5 rounded border border-slate-200 transition-colors"
                >
                  + {p.label}
                </button>
              ))}
            </div>

            {/* Photo previews list */}
            {photosList.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {photosList.map((url, i) => (
                  <div key={i} className="relative group w-16 h-16 rounded-lg overflow-hidden border border-slate-200">
                    <img src={url} alt={`preview ${i}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemovePhoto(i)}
                      className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Anonymous Toggle */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isAnonymous ? (
                <EyeOff className="w-4 h-4 text-slate-600" />
              ) : (
                <Eye className="w-4 h-4 text-[#176B50]" />
              )}
              <div>
                <span className="text-xs font-semibold text-slate-800 block">
                  Post Anonymously
                </span>
                <span className="text-[10px] text-slate-500 block">
                  Hide your real name from the community feed.
                </span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
              className="w-4 h-4 accent-[#176B50] rounded cursor-pointer"
            />
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-[#176B50] hover:bg-[#11533e] text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
            >
              Publish to r/{locality}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

