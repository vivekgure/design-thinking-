import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Bell,
  MessageSquare,
  AlertCircle,
  MapPin,
  Building2,
  LayoutDashboard,
  Info,
  Menu,
  X,
  PlusCircle,
  ExternalLink,
  CheckCheck
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    currentUser,
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    unreadNotificationsCount,
    setSelectedComplaintId,
    setSelectedPostId
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const userNotifications = notifications.filter(n => n.userId === currentUser.id);

  const getDashboardLabel = () => {
    switch (currentUser.role) {
      case 'government':
        return 'Gov Authority';
      case 'ngo':
        return 'NGO Hub';
      case 'admin':
        return 'Admin Panel';
      default:
        return 'My Dashboard';
    }
  };

  const getDashboardTabName = () => {
    switch (currentUser.role) {
      case 'government':
        return 'gov-dashboard';
      case 'ngo':
        return 'ngo-dashboard';
      case 'admin':
        return 'admin-dashboard';
      default:
        return 'citizen-dashboard';
    }
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: null },
    { id: 'community', label: 'Community Feed', icon: MessageSquare },
    { id: 'report', label: 'Report Issue', icon: PlusCircle, highlight: true },
    { id: 'explore', label: 'Explore & Map', icon: MapPin },
    { id: 'organisations', label: 'Organisations', icon: Building2 },
    { id: getDashboardTabName(), label: getDashboardLabel(), icon: LayoutDashboard },
    { id: 'about', label: 'About', icon: Info },
  ];

  const handleNotificationClick = (notif: typeof notifications[0]) => {
    markNotificationAsRead(notif.id);
    setShowNotifications(false);
    if (notif.linkTarget) {
      if (notif.linkTarget.type === 'complaint') {
        setSelectedComplaintId(notif.linkTarget.id);
        setActiveTab('track');
      } else if (notif.linkTarget.type === 'post') {
        setSelectedPostId(notif.linkTarget.id);
        setActiveTab('community');
      } else if (notif.linkTarget.type === 'project') {
        setActiveTab('ngo-dashboard');
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Tagline */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setActiveTab('home')}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#176B50] flex items-center justify-center text-white shadow-md shadow-[#176B50]/20 group-hover:scale-105 transition-transform">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 5L6 9H2v6h4l5 4V5z"/>
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                </svg>
              </div>
              <div>
                <span className="text-2xl font-black tracking-tight text-[#176B50] font-sans flex items-center gap-1.5">
                  VOXLY
                  <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-[#E8F5EE] text-[#176B50] border border-[#c8e7d7]">
                    Civic
                  </span>
                </span>
                <p className="text-[10px] text-slate-500 font-medium tracking-tight hidden sm:block">
                  Every Voice Matters. Together, We Create Change.
                </p>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              const Icon = item.icon;

              if (item.highlight) {
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveTab(item.id)}
                    className="ml-1 mr-2 px-3.5 py-2 rounded-lg bg-[#176B50] hover:bg-[#11533e] text-white font-semibold text-sm shadow-sm hover:shadow transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              }

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'text-[#176B50] bg-[#E8F5EE]'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4 opacity-75" />}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Controls: Notifications & User Profile */}
          <div className="flex items-center gap-3">
            {/* Notification Bell */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="View notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                    {unreadNotificationsCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-800">Notifications</span>
                      <span className="text-xs bg-[#E8F5EE] text-[#176B50] font-semibold px-2 py-0.5 rounded-full">
                        {userNotifications.length}
                      </span>
                    </div>
                    {userNotifications.length > 0 && (
                      <button
                        type="button"
                        onClick={markAllNotificationsAsRead}
                        className="text-xs text-[#176B50] hover:underline flex items-center gap-1 font-medium"
                      >
                        <CheckCheck className="w-3.5 h-3.5" />
                        Mark all read
                      </button>
                    )}
                  </div>

                  <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                    {userNotifications.length === 0 ? (
                      <div className="p-6 text-center text-slate-400 text-xs">
                        No notifications for your profile yet.
                      </div>
                    ) : (
                      userNotifications.map((notif) => (
                        <div
                          key={notif.id}
                          onClick={() => handleNotificationClick(notif)}
                          className={`p-3 text-left hover:bg-slate-50 transition-colors cursor-pointer flex gap-3 ${
                            !notif.isRead ? 'bg-emerald-50/50' : ''
                          }`}
                        >
                          <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${!notif.isRead ? 'bg-[#176B50]' : 'bg-transparent'}`} />
                          <div className="flex-1">
                            <h4 className="text-xs font-semibold text-slate-800 flex items-center justify-between">
                              {notif.title}
                              <span className="text-[10px] text-slate-400 font-normal">
                                {new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </h4>
                            <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                              {notif.message}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="p-2 bg-slate-50 border-t border-slate-200 text-center">
                    <button
                      type="button"
                      onClick={() => {
                        setShowNotifications(false);
                        setActiveTab(getDashboardTabName());
                      }}
                      className="text-xs font-semibold text-[#176B50] hover:underline"
                    >
                      View all in Dashboard →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Pill */}
            <button
              type="button"
              onClick={() => setActiveTab(getDashboardTabName())}
              className="flex items-center gap-2 p-1 pl-2 pr-3 rounded-full border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors text-left"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full object-cover border border-slate-200"
              />
              <div className="hidden sm:block leading-tight">
                <span className="text-xs font-bold text-slate-800 block truncate max-w-[120px]">
                  {currentUser.name}
                </span>
                <span className="text-[10px] font-semibold text-[#176B50] capitalize block">
                  {currentUser.role}
                </span>
              </div>
            </button>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 lg:hidden"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 py-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-semibold text-left ${
                  activeTab === item.id
                    ? 'text-[#176B50] bg-[#E8F5EE]'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {item.icon && <item.icon className="w-4 h-4" />}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

