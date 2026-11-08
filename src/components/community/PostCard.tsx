import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CommunityPost } from '../../types';
import {
  ArrowBigUp,
  ArrowBigDown,
  MessageSquare,
  Share2,
  Bookmark,
  ExternalLink,
  HeartHandshake,
  ShieldAlert,
  CheckCircle2,
  Image as ImageIcon
} from 'lucide-react';

interface PostCardProps {
  post: CommunityPost;
  onOpenDetail: (postId: string) => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onOpenDetail }) => {
  const {
    votePost,
    toggleSavePost,
    savedPostIds,
    complaints,
    supportComplaint,
    currentUser,
    setSelectedComplaintId,
    setActiveTab
  } = useApp();

  const [copied, setCopied] = useState(false);

  const isSaved = savedPostIds.includes(post.id);
  const linkedComplaint = post.linkedComplaintId
    ? complaints.find((c) => c.id === post.linkedComplaintId)
    : null;

  const isSupported = linkedComplaint
    ? linkedComplaint.supportedByUserIds.includes(currentUser.id)
    : false;

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStatusBadgeColor = (status?: string) => {
    switch (status) {
      case 'Submitted':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Under Review':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Verified':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'Assigned':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'In Progress':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Resolved':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Reopened':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <article className="bg-white rounded-2xl border border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row overflow-hidden text-left group">
      {/* Vote Column (Desktop) */}
      <div className="hidden sm:flex flex-col items-center bg-slate-50/80 p-3 border-r border-slate-100 shrink-0 w-14">
        <button
          type="button"
          onClick={() => votePost(post.id, 'up')}
          className={`p-1 rounded hover:bg-emerald-100 transition-colors ${
            post.userVote === 'up' ? 'text-emerald-700 bg-emerald-50' : 'text-slate-500'
          }`}
          aria-label="Upvote post"
        >
          <ArrowBigUp className="w-6 h-6" />
        </button>

        <span className="text-xs font-bold my-1 text-slate-700">
          {post.upvotes - post.downvotes}
        </span>

        <button
          type="button"
          onClick={() => votePost(post.id, 'down')}
          className={`p-1 rounded hover:bg-red-100 transition-colors ${
            post.userVote === 'down' ? 'text-red-700 bg-red-50' : 'text-slate-500'
          }`}
          aria-label="Downvote post"
        >
          <ArrowBigDown className="w-6 h-6" />
        </button>
      </div>

      {/* Main Content Area */}
      <div className="p-4 sm:p-5 flex-1 space-y-3 cursor-pointer" onClick={() => onOpenDetail(post.id)}>
        {/* Post Metadata Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-[#176B50] bg-[#E8F5EE] px-2 py-0.5 rounded text-[11px]">
              r/{post.locality}
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500">
              Posted by <strong className="text-slate-700">{post.userDisplayName}</strong>
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-400">
              {new Date(post.createdAt).toLocaleDateString()}
            </span>
          </div>

          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
            {post.category}
          </span>
        </div>

        {/* Linked Complaint Badge if present */}
        {linkedComplaint && (
          <div
            onClick={(e) => {
              e.stopPropagation();
              setSelectedComplaintId(linkedComplaint.id);
              setActiveTab('track');
            }}
            className="p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-200/80 flex flex-wrap items-center justify-between gap-2 hover:bg-emerald-100/60 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-white text-emerald-800 border border-emerald-200">
                {linkedComplaint.id}
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getStatusBadgeColor(linkedComplaint.status)}`}>
                {linkedComplaint.status}
              </span>
              <span className="text-xs text-slate-600 hidden md:inline">
                • {linkedComplaint.assignedDepartment || 'GCC Field Review'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#176B50]">
                {linkedComplaint.supportCount} Citizen Backers
              </span>
              <span className="text-[11px] text-[#176B50] font-semibold flex items-center gap-0.5 underline">
                Track Timeline <ExternalLink className="w-3 h-3" />
              </span>
            </div>
          </div>
        )}

        {/* Post Title */}
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#176B50] transition-colors leading-snug">
          {post.title}
        </h3>

        {/* Post Excerpt */}
        <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
          {post.content}
        </p>

        {/* Photographic Evidence Preview */}
        {post.photos && post.photos.length > 0 && (
          <div className="relative rounded-xl overflow-hidden max-h-64 border border-slate-200 bg-slate-100">
            <img
              src={post.photos[0]}
              alt={post.title}
              className="w-full h-48 sm:h-60 object-cover group-hover:scale-101 transition-transform"
            />
            {post.photos.length > 1 && (
              <span className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1">
                <ImageIcon className="w-3 h-3" />
                +{post.photos.length - 1} more photos
              </span>
            )}
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500 gap-2">
          {/* Mobile Vote Controls */}
          <div className="flex sm:hidden items-center gap-2 bg-slate-100 px-2 py-1 rounded-lg">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                votePost(post.id, 'up');
              }}
              className="text-slate-600 hover:text-emerald-700"
            >
              <ArrowBigUp className="w-5 h-5" />
            </button>
            <span className="font-bold text-slate-800">
              {post.upvotes - post.downvotes}
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                votePost(post.id, 'down');
              }}
              className="text-slate-600 hover:text-red-700"
            >
              <ArrowBigDown className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              className="flex items-center gap-1.5 font-semibold text-slate-600 hover:text-[#176B50]"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{post.commentCount} Comments</span>
            </button>

            {linkedComplaint && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  supportComplaint(linkedComplaint.id);
                }}
                className={`flex items-center gap-1 font-semibold px-2.5 py-1 rounded-lg transition-colors ${
                  isSupported
                    ? 'bg-[#176B50] text-white'
                    : 'text-[#176B50] bg-[#E8F5EE] hover:bg-emerald-100'
                }`}
              >
                <HeartHandshake className="w-3.5 h-3.5" />
                <span>{isSupported ? 'Supported' : 'Support Issue'}</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggleSavePost(post.id);
              }}
              className={`p-1.5 rounded-lg border transition-colors ${
                isSaved ? 'text-amber-700 bg-amber-50 border-amber-200' : 'text-slate-500 border-slate-200 hover:bg-slate-100'
              }`}
              title={isSaved ? 'Remove from saved' : 'Save post'}
            >
              <Bookmark className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 transition-colors"
              title="Copy post link"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

