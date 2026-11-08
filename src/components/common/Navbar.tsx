import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Bell,
  MessageSquare,
  MapPin,
  Building2,
  LayoutDashboard,
  Info,
  Menu,
  X,
  PlusCircle,
  CheckCheck,
  Search,
  LogIn
} from 'lucide-react';
import { AuthModal } from './AuthModal';
import { GlobalSearchModal } from './GlobalSearchModal';
import { LanguageSwitcher } from './LanguageSwitcher';

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
    setSelectedPostId,
    t
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  // Global Ctrl+K / Cmd+K shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchModalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const userNotifications = notifications.filter((n) => n.userId === currentUser.id);

  const getDashboardLabel = () => {
    switch (currentUser.role) {
      case 'government':
        return t('nav.dashboard.gov', 'Gov Authority');
      case 'ngo':
        return t('nav.dashboard.ngo', 'NGO Hub');
      case 'admin':
        return t('nav.dashboard.admin', 'Admin Panel');
      default:
        return t('nav.dashboard.citizen', 'My Dashboard');
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
    { id: 'home', label: t('nav.home', 'Home'), icon: null },
    { id: 'community', label: t('nav.community', 'Community Feed'), icon: MessageSquare },
    { id: 'report', label: t('nav.report', 'Report Issue'), icon: PlusCircle, highlight: true },
    { id: 'explore', label: t('nav.explore', 'Explore & Map'), icon: MapPin },
    { id: 'organisations', label: t('nav.organisations', 'Organisations'), icon: Building2 },
    { id: getDashboardTabName(), label: getDashboardLabel(), icon: LayoutDashboard },
    { id: 'about', label: t('nav.about', 'About'), icon: Info },
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
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo & Tagline */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setActiveTab('home')}
                className="flex items-center gap-2.5 text-left group cursor-pointer"
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
                    {t('brand.tagline', 'Every Voice Matters. Together, We Create Change.')}
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

            {/* Right Controls: Search, Language, Notifications & User Profile */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* Omni Search Button */}
              <button
                type="button"
                onClick={() => setIsSearchModalOpen(true)}
                className="hidden sm:flex items-center gap-2 px-2.5 py-1.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50 text-slate-500 text-xs transition-colors cursor-pointer"
                title="Search complaints, discussions, NGOs (Ctrl+K)"
              >
                <Search className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden md:inline">{t('nav.search.hint', 'Search... (Ctrl+K)')}</span>
              </button>

              {/* Language Switcher */}
              <div className="hidden sm:block">
                <LanguageSwitcher />
              </div>

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
                        <span className="font-bold text-sm text-slate-800">{t('nav.notifications', 'Notifications')}</span>
                        <span className="text-xs bg-[#E8F5EE] text-[#176B50] font-semibold px-2 py-0.5 rounded-full">
                          {userNotifications.length}
                        </span>
                      </div>
                      {userNotifications.length > 0 && (
                        <button
                          type="button"
                          onClick={markAllNotificationsAsRead}
                          className="text-xs text-[#176B50] hover:underline flex items-center gap-1 font-medium cursor-pointer"
                        >
                          <CheckCheck className="w-3.5 h-3.5" />
                          {t('nav.markAllRead', 'Mark all read')}
                        </button>
                      )}
                    </div>

                    <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                      {userNotifications.length === 0 ? (
                        <div className="p-6 text-center text-slate-400 text-xs">
                          {t('nav.noNotifications', 'No notifications for your profile yet.')}
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
                        className="text-xs font-semibold text-[#176B50] hover:underline cursor-pointer"
                      >
                        View all in Dashboard →
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* User Profile Pill / Auth Trigger */}
              <button
                type="button"
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center gap-2 p-1 pl-2 pr-3 rounded-full border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors text-left cursor-pointer"
                title="Account & Persona Switcher"
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
                className="p-2 rounded-lg text-slate-600 hover:text-slate-900 lg:hidden cursor-pointer"
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Drawer */}
          {mobileMenuOpen && (
            <div className="lg:hidden border-t border-slate-200 py-3 space-y-2">
              {/* Mobile language & search */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <LanguageSwitcher />
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsSearchModalOpen(true);
                  }}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-xs font-medium text-slate-600 flex items-center gap-1.5"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Search</span>
                </button>
              </div>

              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-semibold text-left cursor-pointer ${
                    activeTab === item.id
                      ? 'text-[#176B50] bg-[#E8F5EE]'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {item.icon && <item.icon className="w-4 h-4" />}
                  <span>{item.label}</span>
                </button>
              ))}

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsAuthModalOpen(true);
                }}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-bold text-[#176B50] border-t border-slate-100 mt-2 cursor-pointer"
              >
                <LogIn className="w-4 h-4" />
                <span>{t('nav.signIn', 'Switch Profile / Sign In')}</span>
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Global Search Dialog (Ctrl+K) */}
      <GlobalSearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
};
