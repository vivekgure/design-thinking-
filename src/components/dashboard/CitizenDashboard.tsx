import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  User,
  AlertCircle,
  HeartHandshake,
  MessageSquare,
  Bookmark,
  Bell,
  Award,
  ExternalLink,
  MapPin,
  Clock,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export const CitizenDashboard: React.FC = () => {
  const {
    currentUser,
    complaints,
    posts,
    savedPostIds,
    followedPostIds,
    notifications,
    setSelectedComplaintId,
    setSelectedPostId,
    setActiveTab,
    markNotificationAsRead
  } = useApp();

  const [activeTabSub, setActiveTabSub] = useState<'my_complaints' | 'supported' | 'my_posts' | 'saved' | 'notifications'>('my_complaints');

  // Filter citizen records
  const myComplaints = complaints.filter((c) => c.userId === currentUser.id);
  const supportedComplaints = complaints.filter((c) => c.supportedByUserIds.includes(currentUser.id));
  const myPosts = posts.filter((p) => p.userId === currentUser.id);
  const savedPosts = posts.filter((p) => savedPostIds.includes(p.id));
  const userNotifications = notifications.filter((n) => n.userId === currentUser.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
      {/* Citizen Profile Hero Card */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-emerald-200 shadow-xs"
          />
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                {currentUser.name}
              </h1>
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#E8F5EE] text-[#176B50] border border-[#c8e7d7]">
                Civic Champion
              </span>
            </div>
            <p className="text-xs text-slate-500">
              {currentUser.email} • Locality: <strong className="text-slate-800">{currentUser.locality}</strong>
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {currentUser.badges.map((b) => (
                <span
                  key={b}
                  className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md flex items-center gap-1"
                >
                  <Award className="w-3 h-3 text-[#176B50]" />
                  {b}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Reputation Score & Quick Stats */}
        <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 self-stretch md:self-auto justify-around">
          <div className="text-center px-2">
            <span className="text-2xl font-black text-[#176B50] block">
              {currentUser.reputation}
            </span>
            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">
              Civic Karma
            </span>
          </div>
          <div className="w-px h-8 bg-slate-200" />
          <div className="text-center px-2">
            <span className="text-2xl font-black text-slate-800 block">
              {myComplaints.length}
            </span>
            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">
              Reported
            </span>
          </div>
          <div className="w-px h-8 bg-slate-200" />
          <div className="text-center px-2">
            <span className="text-2xl font-black text-[#3478C5] block">
              {supportedComplaints.length}
            </span>
            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">
              Supported
            </span>
          </div>
        </div>
      </div>

      {/* Tabs Menu */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto text-xs">
        <button
          type="button"
          onClick={() => setActiveTabSub('my_complaints')}
          className={`px-4 py-2 rounded-xl font-bold transition-colors cursor-pointer flex items-center gap-2 ${
            activeTabSub === 'my_complaints'
              ? 'bg-[#176B50] text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <AlertCircle className="w-4 h-4" />
          <span>My Complaints ({myComplaints.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTabSub('supported')}
          className={`px-4 py-2 rounded-xl font-bold transition-colors cursor-pointer flex items-center gap-2 ${
            activeTabSub === 'supported'
              ? 'bg-[#176B50] text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <HeartHandshake className="w-4 h-4" />
          <span>Supported Issues ({supportedComplaints.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTabSub('my_posts')}
          className={`px-4 py-2 rounded-xl font-bold transition-colors cursor-pointer flex items-center gap-2 ${
            activeTabSub === 'my_posts'
              ? 'bg-[#176B50] text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>My Community Posts ({myPosts.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTabSub('saved')}
          className={`px-4 py-2 rounded-xl font-bold transition-colors cursor-pointer flex items-center gap-2 ${
            activeTabSub === 'saved'
              ? 'bg-[#176B50] text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>Saved Discussions ({savedPosts.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTabSub('notifications')}
          className={`px-4 py-2 rounded-xl font-bold transition-colors cursor-pointer flex items-center gap-2 ${
            activeTabSub === 'notifications'
              ? 'bg-[#176B50] text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>Notifications History ({userNotifications.length})</span>
        </button>
      </div>

      {/* TAB 1: My Complaints */}
      {activeTabSub === 'my_complaints' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-slate-900">
              Complaints Filed by You
            </h3>
            <button
              type="button"
              onClick={() => setActiveTab('report')}
              className="text-xs font-bold text-[#176B50] hover:underline"
            >
              + Report New Problem
            </button>
          </div>

          {myComplaints.length === 0 ? (
            <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-slate-400 text-xs">
              You haven’t filed any complaints yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {myComplaints.map((c) => (
                <div
                  key={c.id}
                  onClick={() => {
                    setSelectedComplaintId(c.id);
                    setActiveTab('track');
                  }}
                  className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-slate-300 transition-all cursor-pointer space-y-3 shadow-xs"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-bold text-[#176B50] bg-[#E8F5EE] px-2 py-0.5 rounded">
                      {c.id}
                    </span>
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-800">
                      {c.status}
                    </span>
                  </div>

                  <h4 className="font-bold text-sm text-slate-900 line-clamp-2">
                    {c.title}
                  </h4>

                  <p className="text-xs text-slate-500 line-clamp-2">
                    {c.description}
                  </p>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                    <span>{c.locality}</span>
                    <span className="font-bold text-[#176B50] flex items-center gap-1">
                      Track Timeline <ExternalLink className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: Supported Issues */}
      {activeTabSub === 'supported' && (
        <div className="space-y-4">
          <h3 className="font-bold text-base text-slate-900">
            Neighborhood Complaints You Supported
          </h3>

          {supportedComplaints.length === 0 ? (
            <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-slate-400 text-xs">
              You haven’t backed any neighborhood complaints yet. Explore the community feed to support issues!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {supportedComplaints.map((c) => (
                <div
                  key={c.id}
                  onClick={() => {
                    setSelectedComplaintId(c.id);
                    setActiveTab('track');
                  }}
                  className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-slate-300 transition-all cursor-pointer space-y-3 shadow-xs"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-bold text-[#176B50] bg-[#E8F5EE] px-2 py-0.5 rounded">
                      {c.id}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full">
                      {c.supportCount} Backers
                    </span>
                  </div>

                  <h4 className="font-bold text-sm text-slate-900 line-clamp-2">
                    {c.title}
                  </h4>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                    <span>r/{c.locality}</span>
                    <span className="text-[#176B50] font-semibold">Track Live Progress →</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: My Posts */}
      {activeTabSub === 'my_posts' && (
        <div className="space-y-4">
          <h3 className="font-bold text-base text-slate-900">
            Community Posts by You
          </h3>

          {myPosts.length === 0 ? (
            <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-slate-400 text-xs">
              No community posts created yet.
            </div>
          ) : (
            <div className="space-y-3">
              {myPosts.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    setSelectedPostId(p.id);
                    setActiveTab('community');
                  }}
                  className="bg-white p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-all cursor-pointer flex items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-[#176B50]">r/{p.locality}</span>
                    <h4 className="text-sm font-semibold text-slate-800">{p.title}</h4>
                  </div>
                  <div className="text-right text-xs shrink-0">
                    <span className="font-bold text-slate-700 block">▲ {p.upvotes}</span>
                    <span className="text-slate-400">{p.commentCount} comments</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: Saved Posts */}
      {activeTabSub === 'saved' && (
        <div className="space-y-4">
          <h3 className="font-bold text-base text-slate-900">
            Saved & Bookmarked Discussions
          </h3>

          {savedPosts.length === 0 ? (
            <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-slate-400 text-xs">
              No saved posts. Click the bookmark icon on any post card to save it here.
            </div>
          ) : (
            <div className="space-y-3">
              {savedPosts.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    setSelectedPostId(p.id);
                    setActiveTab('community');
                  }}
                  className="bg-white p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-all cursor-pointer flex items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-[#176B50]">r/{p.locality}</span>
                    <h4 className="text-sm font-semibold text-slate-800">{p.title}</h4>
                  </div>
                  <div className="text-right text-xs shrink-0">
                    <span className="font-bold text-slate-700 block">▲ {p.upvotes}</span>
                    <span className="text-slate-400">{p.commentCount} comments</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 5: Notifications History */}
      {activeTabSub === 'notifications' && (
        <div className="space-y-4">
          <h3 className="font-bold text-base text-slate-900">
            All Notifications
          </h3>

          <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 overflow-hidden">
            {userNotifications.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-xs">
                No notifications logged.
              </div>
            ) : (
              userNotifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => {
                    markNotificationAsRead(n.id);
                    if (n.linkTarget) {
                      if (n.linkTarget.type === 'complaint') {
                        setSelectedComplaintId(n.linkTarget.id);
                        setActiveTab('track');
                      } else if (n.linkTarget.type === 'post') {
                        setSelectedPostId(n.linkTarget.id);
                        setActiveTab('community');
                      }
                    }
                  }}
                  className={`p-4 hover:bg-slate-50 transition-colors cursor-pointer flex items-start gap-3 ${
                    !n.isRead ? 'bg-emerald-50/40' : ''
                  }`}
                >
                  <div className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${!n.isRead ? 'bg-[#176B50]' : 'bg-slate-300'}`} />
                  <div className="flex-1 space-y-0.5">
                    <div className="flex items-center justify-between text-xs">
                      <strong className="text-slate-800">{n.title}</strong>
                      <span className="text-[10px] text-slate-400">
                        {new Date(n.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{n.message}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

