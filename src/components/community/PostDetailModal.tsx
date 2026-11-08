import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  ArrowBigUp,
  ArrowBigDown,
  MessageSquare,
  Share2,
  Bookmark,
  Building2,
  ShieldCheck,
  Send,
  ExternalLink,
  HeartHandshake,
  CheckCircle2,
  CornerDownRight
} from 'lucide-react';

interface PostDetailModalProps {
  postId: string;
  onClose: () => void;
}

export const PostDetailModal: React.FC<PostDetailModalProps> = ({ postId, onClose }) => {
  const {
    posts,
    comments,
    votePost,
    addComment,
    voteComment,
    currentUser,
    complaints,
    supportComplaint,
    setSelectedComplaintId,
    setActiveTab,
    toggleSavePost,
    savedPostIds
  } = useApp();

  const [commentText, setCommentText] = useState('');
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [copied, setCopied] = useState(false);

  const post = posts.find((p) => p.id === postId);
  if (!post) return null;

  const linkedComplaint = post.linkedComplaintId
    ? complaints.find((c) => c.id === post.linkedComplaintId)
    : null;

  const isSaved = savedPostIds.includes(post.id);
  const isSupported = linkedComplaint
    ? linkedComplaint.supportedByUserIds.includes(currentUser.id)
    : false;

  const postComments = comments.filter((c) => c.postId === post.id && !c.parentId);

  const getReplies = (commentId: string) => {
    return comments.filter((c) => c.parentId === commentId);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addComment(post.id, commentText.trim());
    setCommentText('');
  };

  const handleAddReply = (parentId: string) => {
    if (!replyText.trim()) return;
    addComment(post.id, replyText.trim(), parentId);
    setReplyText('');
    setReplyingToId(null);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4">
      <div
        className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
        aria-labelledby="post-detail-title"
      >
        {/* Modal Header */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#176B50] bg-[#E8F5EE] px-2.5 py-1 rounded-md">
              r/{post.locality}
            </span>
            <span className="text-xs text-slate-500">•</span>
            <span className="text-xs text-slate-600 font-medium">
              Posted by {post.userDisplayName}
            </span>
            <span className="text-[10px] text-slate-400">
              {new Date(post.createdAt).toLocaleDateString()}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-left flex-1">
          {/* Linked Complaint Alert Banner */}
          {linkedComplaint && (
            <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold font-mono text-emerald-800 bg-white px-2 py-0.5 rounded border border-emerald-200">
                    ID: {linkedComplaint.id}
                  </span>
                  <span className="text-xs font-bold text-emerald-900">
                    Official Grievance Registered
                  </span>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-white text-emerald-700 border border-emerald-300">
                    {linkedComplaint.status}
                  </span>
                </div>
                <p className="text-xs text-emerald-700">
                  {linkedComplaint.assignedDepartment || 'Department pending assignment'} • {linkedComplaint.supportCount} citizen backers
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => supportComplaint(linkedComplaint.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    isSupported
                      ? 'bg-[#176B50] text-white shadow-xs'
                      : 'bg-white text-[#176B50] border border-[#176B50] hover:bg-[#E8F5EE]'
                  }`}
                >
                  <HeartHandshake className="w-4 h-4" />
                  <span>{isSupported ? 'Supported' : 'Support Issue'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedComplaintId(linkedComplaint.id);
                    onClose();
                    setActiveTab('track');
                  }}
                  className="px-3 py-1.5 rounded-lg bg-emerald-700 text-white hover:bg-emerald-800 text-xs font-bold flex items-center gap-1"
                >
                  <span>Track Timeline</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Post Title & Meta */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-slate-100 text-slate-700">
                {post.category}
              </span>
              {post.isAnonymous && (
                <span className="text-xs px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">
                  Anonymous Post
                </span>
              )}
            </div>

            <h1 id="post-detail-title" className="text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
              {post.title}
            </h1>
          </div>

          {/* Post Content */}
          <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line bg-slate-50/50 p-4 rounded-xl border border-slate-100">
            {post.content}
          </div>

          {/* Photos Gallery */}
          {post.photos && post.photos.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Evidence Photographs ({post.photos.length})
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {post.photos.map((photo, i) => (
                  <div key={i} className="rounded-xl overflow-hidden border border-slate-200 shadow-xs max-h-72">
                    <img
                      src={photo}
                      alt={`Evidence ${i + 1}`}
                      className="w-full h-full object-cover hover:scale-102 transition-transform duration-200"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Post Action Bar */}
          <div className="flex items-center justify-between py-3 border-y border-slate-100">
            <div className="flex items-center gap-2 bg-slate-100 rounded-lg p-1">
              <button
                type="button"
                onClick={() => votePost(post.id, 'up')}
                className={`p-1 rounded flex items-center gap-1 text-xs font-bold transition-colors ${
                  post.userVote === 'up' ? 'text-emerald-700 bg-white shadow-xs' : 'text-slate-600 hover:text-emerald-700'
                }`}
              >
                <ArrowBigUp className="w-5 h-5" />
                <span>{post.upvotes}</span>
              </button>
              <span className="text-slate-300">|</span>
              <button
                type="button"
                onClick={() => votePost(post.id, 'down')}
                className={`p-1 rounded flex items-center gap-1 text-xs font-bold transition-colors ${
                  post.userVote === 'down' ? 'text-red-700 bg-white shadow-xs' : 'text-slate-600 hover:text-red-700'
                }`}
              >
                <ArrowBigDown className="w-5 h-5" />
                <span>{post.downvotes}</span>
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => toggleSavePost(post.id)}
                className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors ${
                  isSaved ? 'bg-amber-50 text-amber-800 border-amber-200' : 'text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <Bookmark className="w-4 h-4" />
                <span>{isSaved ? 'Saved' : 'Save'}</span>
              </button>

              <button
                type="button"
                onClick={handleShare}
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span>{copied ? 'Copied Link!' : 'Share'}</span>
              </button>
            </div>
          </div>

          {/* Comments Section */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#176B50]" />
                Community Discussion ({comments.filter((c) => c.postId === post.id).length})
              </h3>
              <span className="text-xs text-slate-400">
                Civic discourse adhering to community guidelines
              </span>
            </div>

            {/* Comment Form */}
            <form onSubmit={handleAddComment} className="space-y-2">
              <div className="flex items-start gap-3">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-full object-cover border border-slate-200 shrink-0 mt-1"
                />
                <div className="flex-1 space-y-2">
                  <textarea
                    rows={3}
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder={`Comment as ${currentUser.name} (${currentUser.role})...`}
                    className="w-full p-3 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#176B50]"
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">
                      Posting role: <strong className="text-slate-700 capitalize">{currentUser.role}</strong>
                    </span>
                    <button
                      type="submit"
                      disabled={!commentText.trim()}
                      className="px-4 py-1.5 rounded-lg bg-[#176B50] hover:bg-[#11533e] disabled:opacity-50 text-white text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Post Comment</span>
                    </button>
                  </div>
                </div>
              </div>
            </form>

            {/* Comments List */}
            <div className="space-y-4 pt-4 divide-y divide-slate-100">
              {postComments.length === 0 ? (
                <div className="py-8 text-center text-slate-400 text-xs">
                  No comments yet. Start the conversation!
                </div>
              ) : (
                postComments.map((c) => {
                  const replies = getReplies(c.id);
                  const isOfficial = c.userRole === 'government';
                  const isNgo = c.userRole === 'ngo';

                  return (
                    <div key={c.id} className="pt-4 space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <img
                            src={c.userAvatar}
                            alt={c.userDisplayName}
                            className="w-7 h-7 rounded-full object-cover border border-slate-200"
                          />
                          <div>
                            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                              {c.userDisplayName}
                              {isOfficial && (
                                <span className="text-[10px] font-bold bg-blue-100 text-[#3478C5] px-1.5 py-0.2 rounded flex items-center gap-0.5">
                                  <ShieldCheck className="w-3 h-3" /> Official
                                </span>
                              )}
                              {isNgo && (
                                <span className="text-[10px] font-bold bg-emerald-100 text-[#176B50] px-1.5 py-0.2 rounded flex items-center gap-0.5">
                                  <Building2 className="w-3 h-3" /> NGO Partner
                                </span>
                              )}
                            </span>
                            <span className="text-[10px] text-slate-400">
                              {new Date(c.createdAt).toLocaleDateString()} at{' '}
                              {new Date(c.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className={`text-xs text-slate-700 leading-relaxed pl-9 ${isOfficial ? 'font-medium bg-blue-50/50 p-2.5 rounded-lg border border-blue-100' : ''}`}>
                        {c.content}
                      </p>

                      <div className="flex items-center gap-4 pl-9 text-[11px] text-slate-500">
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => voteComment(c.id, 'up')}
                            className="hover:text-emerald-700"
                          >
                            <ArrowBigUp className="w-4 h-4" />
                          </button>
                          <span>{c.upvotes - c.downvotes}</span>
                          <button
                            type="button"
                            onClick={() => voteComment(c.id, 'down')}
                            className="hover:text-red-700"
                          >
                            <ArrowBigDown className="w-4 h-4" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => setReplyingToId(replyingToId === c.id ? null : c.id)}
                          className="hover:text-slate-800 font-semibold"
                        >
                          Reply
                        </button>
                      </div>

                      {/* Reply Box */}
                      {replyingToId === c.id && (
                        <div className="pl-9 pt-2 flex items-center gap-2">
                          <input
                            type="text"
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="Write a reply..."
                            className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-[#176B50]"
                          />
                          <button
                            type="button"
                            onClick={() => handleAddReply(c.id)}
                            className="px-3 py-1.5 rounded-lg bg-[#176B50] text-white text-xs font-bold"
                          >
                            Reply
                          </button>
                          <button
                            type="button"
                            onClick={() => setReplyingToId(null)}
                            className="text-xs text-slate-500 hover:text-slate-700 px-2"
                          >
                            Cancel
                          </button>
                        </div>
                      )}

                      {/* Nested Replies */}
                      {replies.length > 0 && (
                        <div className="pl-9 space-y-3 pt-2">
                          {replies.map((reply) => (
                            <div key={reply.id} className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 space-y-1">
                              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800">
                                <CornerDownRight className="w-3.5 h-3.5 text-slate-400" />
                                <span>{reply.userDisplayName}</span>
                                {reply.userRole === 'government' && (
                                  <span className="text-[10px] bg-blue-100 text-[#3478C5] px-1 rounded font-bold">
                                    Official
                                  </span>
                                )}
                                <span className="text-[10px] text-slate-400 font-normal">
                                  {new Date(reply.createdAt).toLocaleDateString()}
                                </span>
                              </div>
                              <p className="text-xs text-slate-700 pl-5">
                                {reply.content}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

