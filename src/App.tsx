import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { PrototypeBanner } from './components/common/PrototypeBanner';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';

// Pages
import { HomePage } from './components/home/HomePage';
import { CommunityFeed } from './components/community/CommunityFeed';
import { ReportIssue } from './components/complaints/ReportIssue';
import { ComplaintTracker } from './components/complaints/ComplaintTracker';
import { ExploreMap } from './components/explore/ExploreMap';
import { OrganisationsPage } from './components/organisations/OrganisationsPage';
import { CitizenDashboard } from './components/dashboard/CitizenDashboard';
import { GovernmentDashboard } from './components/government/GovernmentDashboard';
import { NgoDashboard } from './components/ngo/NgoDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AboutPage } from './components/about/AboutPage';

const MainContent: React.FC = () => {
  const { activeTab } = useApp();

  const renderActiveView = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage />;
      case 'community':
        return <CommunityFeed />;
      case 'report':
        return <ReportIssue />;
      case 'track':
        return <ComplaintTracker />;
      case 'explore':
        return <ExploreMap />;
      case 'organisations':
        return <OrganisationsPage />;
      case 'citizen-dashboard':
        return <CitizenDashboard />;
      case 'gov-dashboard':
        return <GovernmentDashboard />;
      case 'ngo-dashboard':
        return <NgoDashboard />;
      case 'admin-dashboard':
        return <AdminDashboard />;
      case 'about':
        return <AboutPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAF9] text-[#202B27] font-sans antialiased">
      {/* 1. Academic Prototype Role Switcher Banner */}
      <PrototypeBanner />

      {/* 2. Main Navigation Bar */}
      <Navbar />

      {/* 3. Dynamic Page View */}
      <main className="flex-1">
        {renderActiveView()}
      </main>

      {/* 4. Civic Footer */}
      <Footer />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

export default App;
