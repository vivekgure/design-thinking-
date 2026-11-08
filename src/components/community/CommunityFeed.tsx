import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CATEGORIES, LOCALITIES } from '../../data/mockData';
import { PostCard } from './PostCard';
import { CreatePostModal } from './CreatePostModal';
import { PostDetailModal } from './PostDetailModal';
import {
  Sparkles,
  Flame,
  Clock,
  ThumbsUp,
  AlertTriangle,
  PlusCircle,
  Search,
  Filter,
  MapPin,
  Building2,
  ShieldCheck,
  TrendingUp,
  Info
} from 'lucide-react';

export const CommunityFeed: React.FC = () => {
  const {
    posts,
    complaints,
    projects,
    activeTab,
    setActiveTab,
    selectedPostId,
    setSelectedPostId,
    setSelectedComplaintId,
    t
  } = useApp();

  const [activeFilter, setActiveFilter] = useState<'latest' | 'trending' | 'most_supported' | 'unresolved'>('latest');
  const [selectedLocality, setSelectedLocality] = useState<string>('All India');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Categories');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Filter & sort posts
  let filteredPosts = posts.filter((post) => {
    // Locality filter
    if (selectedLocality !== 'All Localities' && selectedLocality !== 'All India' && post.locality !== selectedLocality) {
      return false;
    }
    // Category filter
    if (selectedCategory !== 'All Categories' && post.category !== selectedCategory) {
      return false;
    }
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchesTitle = post.title.toLowerCase().includes(q);
      const matchesContent = post.content.toLowerCase().includes(q);
      const matchesLocality = post.locality.toLowerCase().includes(q);
      if (!matchesTitle && !matchesContent && !matchesLocality) return false;
    }
    // Unresolved filter
    if (activeFilter === 'unresolved') {
      if (post.complaintStatus === 'Resolved') return false;
    }
    return true;
  });

  // Sorting
  if (activeFilter === 'trending') {
    filteredPosts.sort((a, b) => (b.upvotes + b.commentCount) - (a.upvotes + a.commentCount));
  } else if (activeFilter === 'most_supported') {
    filteredPosts.sort((a, b) => b.upvotes - a.upvotes);
  } else {
    // Latest
    filteredPosts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  // Active NGO Projects for right sidebar
  const activeProjects = projects.filter(p => p.status === 'In Progress' || p.status === 'Initiated').slice(0, 2);

  // Trending grievances
  const trendingGrievances = complaints
    .filter(c => c.visibility !== 'private')
    .sort((a, b) => b.supportCount - a.supportCount)
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* 3-Column Reddit Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT SIDEBAR: Localities & Categories (3 cols) */}
        <aside className="hidden lg:block lg:col-span-3 space-y-6 text-left">
          {/* Quick CTA */}
          <div className="bg-gradient-to-br from-[#176B50] to-[#11533e] p-5 rounded-2xl text-white shadow-sm space-y-3">
            <h3 className="font-bold text-base leading-tight">
              Report Civic Issue
            </h3>
            <p className="text-xs text-emerald-100 leading-relaxed">
              Facing broken infrastructure, uncollected waste, or water leakage? File an official complaint.
            </p>
            <button
              type="button"
              onClick={() => setActiveTab('report')}
              className="w-full py-2.5 px-4 rounded-xl bg-white text-[#176B50] font-bold text-xs shadow hover:bg-emerald-50 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Report an Issue</span>
            </button>
          </div>

          {/* Localities Selector */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#176B50]" />
                Localities
              </h4>
              {selectedLocality !== 'All India' && selectedLocality !== 'All Localities' && (
                <button
                  type="button"
                  onClick={() => setSelectedLocality('All India')}
                  className="text-[10px] text-[#176B50] font-semibold hover:underline"
                >
                  Reset
                </button>
              )}
            </div>

            <div className="space-y-1 max-h-80 overflow-y-auto pr-1">
              {LOCALITIES.map((loc) => {
                const isActive = selectedLocality === loc;
                return (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => setSelectedLocality(loc)}
                    className={`w-full px-3 py-1.5 rounded-lg text-xs font-medium text-left transition-colors flex items-center justify-between cursor-pointer ${
                      isActive
                        ? 'bg-[#E8F5EE] text-[#176B50] font-bold'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <span>{loc === 'All India' || loc === 'All Localities' ? '🇮🇳 All India' : `r/${loc}`}</span>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#176B50]" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Categories Selector */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-[#176B50]" />
                Categories
              </h4>
              {selectedCategory !== 'All Categories' && (
                <button
                  type="button"
                  onClick={() => setSelectedCategory('All Categories')}
                  className="text-[10px] text-[#176B50] font-semibold hover:underline"
                >
                  Reset
                </button>
              )}
            </div>

            <div className="space-y-1 max-h-72 overflow-y-auto pr-1">
              <button
                type="button"
                onClick={() => setSelectedCategory('All Categories')}
                className={`w-full px-2.5 py-1.5 rounded-lg text-xs font-medium text-left transition-colors cursor-pointer ${
                  selectedCategory === 'All Categories'
                    ? 'bg-[#E8F5EE] text-[#176B50] font-bold'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                All Categories
              </button>

              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.name;
                return (
                  <button
                    key={cat.name}
                    type="button"
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`w-full px-2.5 py-1.5 rounded-lg text-xs font-medium text-left transition-colors flex items-center justify-between cursor-pointer ${
                      isActive
                        ? 'bg-[#E8F5EE] text-[#176B50] font-bold'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span className="truncate pr-1">{cat.name}</span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* CENTER COLUMN: Feed (6 cols) */}
        <main className="lg:col-span-6 space-y-4">
          {/* Quick Create Post Bar */}
          <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#E8F5EE] text-[#176B50] flex items-center justify-center font-bold text-sm shrink-0">
              V
            </div>
            <button
              type="button"
              onClick={() => setIsCreateModalOpen(true)}
              className="flex-1 text-left px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs text-slate-500 font-medium transition-colors"
            >
              Share an issue or start a discussion in {selectedLocality}...
            </button>
            <button
              type="button"
              onClick={() => setIsCreateModalOpen(true)}
              className="px-3.5 py-2.5 rounded-xl bg-[#176B50] hover:bg-[#11533e] text-white text-xs font-bold transition-all shrink-0 flex items-center gap-1 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Post</span>
            </button>
          </div>

          {/* Search Bar & Mobile Filter Pills */}
          <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search community posts, complaints, or keywords..."
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#176B50]"
              />
            </div>

            {/* Mobile locality dropdown */}
            <div className="flex lg:hidden items-center gap-2">
              <select
                value={selectedLocality}
                onChange={(e) => setSelectedLocality(e.target.value)}
                className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-800 bg-white"
              >
                {LOCALITIES.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-800 bg-white"
              >
                <option value="All Categories">All Categories</option>
                {CATEGORIES.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Filter Tabs: Latest, Trending, Most Supported, Unresolved */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              <button
                type="button"
                onClick={() => setActiveFilter('latest')}
                className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 ${
                  activeFilter === 'latest'
                    ? 'bg-[#176B50] text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>{t('feed.filter.latest', 'Latest')}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveFilter('trending')}
                className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 ${
                  activeFilter === 'trending'
                    ? 'bg-[#176B50] text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Flame className="w-3.5 h-3.5" />
                <span>{t('feed.filter.trending', 'Trending')}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveFilter('most_supported')}
                className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 ${
                  activeFilter === 'most_supported'
                    ? 'bg-[#176B50] text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>{t('feed.filter.mostSupported', 'Most Supported')}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveFilter('unresolved')}
                className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 ${
                  activeFilter === 'unresolved'
                    ? 'bg-[#176B50] text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>{t('feed.filter.unresolved', 'Unresolved Issues')}</span>
              </button>
            </div>
          </div>

          {/* Active Filter Indicators */}
          {(selectedLocality !== 'All Localities' && selectedLocality !== 'All India' || selectedCategory !== 'All Categories' || searchQuery) && (
            <div className="flex items-center gap-2 text-xs text-slate-600 bg-slate-100/80 px-3 py-2 rounded-xl">
              <span>Filtering by:</span>
              {selectedLocality !== 'All Localities' && selectedLocality !== 'All India' && (
                <span className="bg-white font-bold px-2 py-0.5 rounded border border-slate-200 text-[#176B50]">
                  r/{selectedLocality}
                </span>
              )}
              {selectedCategory !== 'All Categories' && (
                <span className="bg-white font-bold px-2 py-0.5 rounded border border-slate-200">
                  {selectedCategory}
                </span>
              )}
              {searchQuery && (
                <span className="bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-700">
                  "{searchQuery}"
                </span>
              )}
              <button
                type="button"
                onClick={() => {
                  setSelectedLocality('All India');
                  setSelectedCategory('All Categories');
                  setSearchQuery('');
                }}
                className="ml-auto text-xs text-[#176B50] font-semibold hover:underline"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Posts Feed Stream */}
          <div className="space-y-4">
            {filteredPosts.length === 0 ? (
              <div className="bg-white rounded-2xl p-10 border border-slate-200 text-center space-y-3">
                <Info className="w-10 h-10 text-slate-300 mx-auto" />
                <h3 className="font-bold text-slate-800 text-sm">
                  No community posts match your filter.
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Be the first to create a discussion in {selectedLocality} or adjust your filters above!
                </p>
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-[#176B50] text-white text-xs font-bold cursor-pointer"
                >
                  Create a Post
                </button>
              </div>
            ) : (
              filteredPosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onOpenDetail={(id) => setSelectedPostId(id)}
                />
              ))
            )}
          </div>
        </main>

        {/* RIGHT SIDEBAR: Trending Grievances & NGO Projects (3 cols) */}
        <aside className="hidden lg:block lg:col-span-3 space-y-6 text-left">
          {/* Trending Grievances Card */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800 flex items-center gap-1.5 pb-2 border-b border-slate-100">
              <TrendingUp className="w-3.5 h-3.5 text-amber-500" />
              Trending Local Grievances
            </h4>

            <div className="space-y-2.5">
              {trendingGrievances.map((c) => (
                <div
                  key={c.id}
                  onClick={() => {
                    setSelectedComplaintId(c.id);
                    setActiveTab('track');
                  }}
                  className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer space-y-1"
                >
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-bold text-[#176B50]">r/{c.locality}</span>
                    <span className="text-slate-400 font-mono">{c.id}</span>
                  </div>
                  <h5 className="text-xs font-bold text-slate-800 line-clamp-2">
                    {c.title}
                  </h5>
                  <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
                    <span className="font-semibold text-emerald-700">
                      {c.supportCount} Backers
                    </span>
                    <span className="capitalize">{c.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active NGO Collaborations Card */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800 flex items-center gap-1.5 pb-2 border-b border-slate-100">
              <Building2 className="w-3.5 h-3.5 text-[#176B50]" />
              Active NGO Collaborations
            </h4>

            <div className="space-y-3">
              {activeProjects.map((p) => (
                <div
                  key={p.id}
                  onClick={() => setActiveTab('organisations')}
                  className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-100 hover:border-emerald-200 transition-all cursor-pointer space-y-2"
                >
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-bold text-[#176B50]">{p.organisationName}</span>
                    <span className="font-semibold text-emerald-700 bg-white px-1.5 py-0.2 rounded border border-emerald-200">
                      {p.status}
                    </span>
                  </div>
                  <h5 className="text-xs font-bold text-slate-800 line-clamp-1">
                    {p.complaintTitle}
                  </h5>
                  {/* Progress bar */}
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#176B50] h-full rounded-full"
                      style={{ width: `${p.progressPercentage}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-500">
                    <span>{p.progressPercentage}% Complete</span>
                    <span>{p.assignedVolunteersCount} Volunteers</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* VOXLY Community Guidelines */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2 text-xs text-slate-600">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800 flex items-center gap-1.5 pb-1 border-b border-slate-100">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              Community Guidelines
            </h4>
            <ul className="space-y-1.5 text-[11px] leading-relaxed list-disc list-inside text-slate-500">
              <li>Keep discussions constructive & evidence-based.</li>
              <li>Respect neighbor privacy; do not dox individuals.</li>
              <li>Support existing complaints instead of duplicating.</li>
              <li>Report emergency safety hazards directly to 112.</li>
            </ul>
          </div>
        </aside>
      </div>

      {/* Modals */}
      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      {selectedPostId && (
        <PostDetailModal
          postId={selectedPostId}
          onClose={() => setSelectedPostId(null)}
        />
      )}
    </div>
  );
};

