import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, X, MessageSquare, AlertCircle, Building2, MapPin, ExternalLink, ArrowRight } from 'lucide-react';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose }) => {
  const {
    complaints,
    posts,
    organisations,
    setSelectedComplaintId,
    setSelectedPostId,
    setActiveTab
  } = useApp();

  const [query, setQuery] = useState('');

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.trim().toLowerCase();

  const matchingComplaints = q
    ? complaints.filter(
        c =>
          c.visibility !== 'private' &&
          (c.id.toLowerCase().includes(q) ||
            c.title.toLowerCase().includes(q) ||
            c.locality.toLowerCase().includes(q) ||
            c.category.toLowerCase().includes(q))
      ).slice(0, 4)
    : [];

  const matchingPosts = q
    ? posts.filter(
        p =>
          p.title.toLowerCase().includes(q) ||
          p.content.toLowerCase().includes(q) ||
          p.locality.toLowerCase().includes(q)
      ).slice(0, 4)
    : [];

  const matchingOrgs = q
    ? organisations.filter(
        o =>
          o.name.toLowerCase().includes(q) ||
          o.type.toLowerCase().includes(q) ||
          o.areasOfOperation.some(a => a.toLowerCase().includes(q))
      ).slice(0, 3)
    : [];

  const hasResults =
    matchingComplaints.length > 0 || matchingPosts.length > 0 || matchingOrgs.length > 0;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-start justify-center pt-16 sm:pt-24 p-3 sm:p-6 text-left">
      <div
        className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden space-y-0 animate-in fade-in zoom-in-95"
        role="dialog"
        aria-modal="true"
      >
        {/* Search input bar */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search complaints (e.g. VX-2026-1042), discussions, NGOs, or localities..."
            className="w-full text-sm text-slate-900 placeholder-slate-400 focus:outline-none bg-transparent"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 rounded text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
              ESC
            </span>
          )}
        </div>

        {/* Results Stream */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-5">
          {!q && (
            <div className="py-8 text-center text-slate-400 text-xs space-y-1">
              <p className="font-semibold text-slate-600">Global Civic Omni-Search</p>
              <p>Type keywords to search across complaints, community posts, and verified organisations.</p>
            </div>
          )}

          {q && !hasResults && (
            <div className="py-8 text-center text-slate-400 text-xs">
              No results found for "{query}". Try checking another keyword or locality.
            </div>
          )}

          {/* Complaints Results */}
          {matchingComplaints.length > 0 && (
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Public Complaints ({matchingComplaints.length})
              </span>
              <div className="space-y-1.5">
                {matchingComplaints.map(c => (
                  <div
                    key={c.id}
                    onClick={() => {
                      setSelectedComplaintId(c.id);
                      onClose();
                      setActiveTab('track');
                    }}
                    className="p-2.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer border border-slate-100 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-[#176B50] bg-[#E8F5EE] px-1.5 py-0.5 rounded text-[11px]">
                        {c.id}
                      </span>
                      <span className="font-semibold text-slate-800 line-clamp-1">{c.title}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] text-slate-400">{c.locality}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Community Posts Results */}
          {matchingPosts.length > 0 && (
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Community Discussions ({matchingPosts.length})
              </span>
              <div className="space-y-1.5">
                {matchingPosts.map(p => (
                  <div
                    key={p.id}
                    onClick={() => {
                      setSelectedPostId(p.id);
                      onClose();
                      setActiveTab('community');
                    }}
                    className="p-2.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer border border-slate-100 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-[#3478C5] bg-blue-50 px-1.5 py-0.5 rounded">
                        r/{p.locality}
                      </span>
                      <span className="font-semibold text-slate-800 line-clamp-1">{p.title}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] text-slate-400">{p.commentCount} comments</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Organisations Results */}
          {matchingOrgs.length > 0 && (
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Verified Organisations ({matchingOrgs.length})
              </span>
              <div className="space-y-1.5">
                {matchingOrgs.map(o => (
                  <div
                    key={o.id}
                    onClick={() => {
                      onClose();
                      setActiveTab('organisations');
                    }}
                    className="p-2.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer border border-slate-100 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <img src={o.logo} alt={o.name} className="w-6 h-6 rounded-md object-cover border" />
                      <span className="font-semibold text-slate-800">{o.name}</span>
                      <span className="text-[10px] text-slate-400">({o.type})</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-center text-[11px] text-slate-400 flex items-center justify-between">
          <span>Search shortcut: <kbd className="font-mono bg-white px-1.5 py-0.5 rounded border">Ctrl</kbd> + <kbd className="font-mono bg-white px-1.5 py-0.5 rounded border">K</kbd></span>
          <span>VOXLY Civic Engine</span>
        </div>
      </div>
    </div>
  );
};
