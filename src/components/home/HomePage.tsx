import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  MessageSquare,
  AlertCircle,
  Users,
  CheckCircle2,
  TrendingUp,
  Building2,
  ArrowRight,
  ShieldCheck,
  MapPin,
  Sparkles,
  HeartHandshake,
  Compass,
  FileCheck2
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const {
    setActiveTab,
    complaints,
    posts,
    organisations,
    projects,
    setSelectedPostId,
    setSelectedComplaintId,
    t
  } = useApp();

  // Compute live stats from data
  const totalReported = complaints.length;
  const issuesResolved = complaints.filter(c => c.status === 'Resolved').length;
  const verifiedOrgsCount = organisations.filter(o => o.isVerified).length;
  const ongoingProjectsCount = projects.filter(p => p.status === 'In Progress' || p.status === 'Initiated').length;
  const activeCommunitiesCount = 8; // Tambaram, Chromepet, Pallavaram, Guindy, Velachery, etc.

  // Trending complaints (most supported)
  const trendingComplaints = [...complaints]
    .filter(c => c.visibility !== 'private')
    .sort((a, b) => b.supportCount - a.supportCount)
    .slice(0, 3);

  // Recent posts
  const recentPosts = [...posts].slice(0, 3);

  return (
    <div className="space-y-16">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-20">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.emerald.50),theme(colors.slate.50))]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headline & Action */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F5EE] border border-[#c8e7d7] text-[#176B50] text-xs font-semibold shadow-xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t('hero.badge', 'Next-Gen Civic Engagement & Problem Solving')}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#202B27] tracking-tight leading-[1.12]">
                {t('hero.title1', 'Your Community.')} <br />
                <span className="text-[#176B50]">{t('hero.title2', 'Your Voice.')}</span> <br />
                <span className="text-[#3478C5]">{t('hero.title3', 'Your Change.')}</span>
              </h1>

              <p className="text-lg text-slate-600 max-w-xl leading-relaxed">
                {t('hero.desc', 'Connect with your community, report local problems, share solutions, and work together with authorities and organisations to create meaningful change.')}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('community')}
                  className="px-6 py-3.5 rounded-xl bg-[#176B50] hover:bg-[#11533e] text-white font-bold text-base shadow-lg shadow-[#176B50]/25 hover:shadow-xl transition-all flex items-center gap-2 cursor-pointer group"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>{t('hero.exploreBtn', 'Explore Community')}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('report')}
                  className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-[#176B50] font-bold text-base border-2 border-[#176B50] shadow-sm hover:shadow transition-all flex items-center gap-2 cursor-pointer"
                >
                  <AlertCircle className="w-5 h-5 text-[#176B50]" />
                  <span>{t('hero.reportBtn', 'Report an Issue')}</span>
                </button>
              </div>

              {/* Sub-features list */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200/80 text-xs text-slate-600 font-medium">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#176B50]" />
                  <span>{t('hero.feat1', 'Reddit-Style Feeds')}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#176B50]" />
                  <span>{t('hero.feat2', 'Confidential Reporting')}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#176B50]" />
                  <span>{t('hero.feat3', 'NGO Co-Execution')}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Platform Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-5 space-y-4">
                {/* Header of mockup */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-400" />
                    <span className="w-3 h-3 rounded-full bg-amber-400" />
                    <span className="w-3 h-3 rounded-full bg-green-400" />
                    <span className="text-xs font-semibold text-slate-500 ml-2">Live Civic Stream</span>
                  </div>
                  <span className="text-[11px] font-bold text-[#176B50] bg-[#E8F5EE] px-2 py-0.5 rounded-full">
                    Tambaram Zone
                  </span>
                </div>

                {/* Sample Live Issue Card in Hero */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-700">VX-2026-1042</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                      In Progress
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-800">
                    Tambaram Station Garbage & Bin Rollout
                  </h4>
                  <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                    <span className="flex items-center gap-1">
                      <HeartHandshake className="w-3.5 h-3.5 text-[#176B50]" />
                      Green Earth Chennai NGO
                    </span>
                    <span className="font-bold text-[#176B50]">48 Backers</span>
                  </div>
                  {/* Progress Bar */}
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mt-1">
                    <div className="bg-[#176B50] h-full rounded-full" style={{ width: '65%' }} />
                  </div>
                  <p className="text-[10px] text-slate-400 text-right">65% Milestone Cleared</p>
                </div>

                {/* Second mini card */}
                <div className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-100 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#176B50] text-white flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <h5 className="text-xs font-bold text-slate-800">Official Municipal Action</h5>
                    <p className="text-[11px] text-slate-500">CMWSSB dispatched sewer repair unit to Chromepet.</p>
                  </div>
                </div>

                {/* Workflow pill */}
                <div className="pt-2 text-center">
                  <div className="inline-flex items-center gap-2 text-[11px] font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full">
                    <span>Report</span> → <span>Discuss</span> → <span>Collaborate</span> → <span>Resolve</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Platform Statistics */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 mb-6 border-b border-slate-100 gap-2">
            <div>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#176B50]" />
                {t('stats.title', 'Platform Impact Overview')}
              </h2>
              <p className="text-xs text-slate-500">
                {t('stats.subtitle', 'Demonstration platform statistics (simulated data for university project evaluation).')}
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded bg-slate-100 text-slate-600">
              Chennai Metropolitan Area
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-100">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#176B50] block">
                {totalReported}
              </span>
              <span className="text-xs font-medium text-slate-600 mt-1 block">
                {t('stats.totalReported', 'Total Issues Reported')}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-100">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#176B50] block">
                {issuesResolved}
              </span>
              <span className="text-xs font-medium text-slate-600 mt-1 block">
                {t('stats.resolved', 'Issues Resolved')}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-100">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#3478C5] block">
                {activeCommunitiesCount}
              </span>
              <span className="text-xs font-medium text-slate-600 mt-1 block">
                {t('stats.activeCommunities', 'Active Localities')}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-100">
              <span className="text-3xl sm:text-4xl font-extrabold text-amber-600 block">
                {verifiedOrgsCount}
              </span>
              <span className="text-xs font-medium text-slate-600 mt-1 block">
                {t('stats.verifiedOrgs', 'Verified NGOs')}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-100 col-span-2 md:col-span-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-emerald-600 block">
                {ongoingProjectsCount}
              </span>
              <span className="text-xs font-medium text-slate-600 mt-1 block">
                {t('stats.ongoingProjects', 'Collaborative Projects')}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. How It Works (The 4 Pillars) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#176B50] bg-[#E8F5EE] px-3 py-1 rounded-full">
            {t('how.badge', 'Our 4-Step Methodology')}
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 mt-3">
            {t('how.title', 'How VOXLY Drives Real Solutions')}
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            {t('how.subtitle', 'A continuous civic pipeline transforming individual frustrations into backed community solutions and verified outcomes.')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Step 1 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative text-left hover:border-[#176B50]/40 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-[#E8F5EE] text-[#176B50] flex items-center justify-center font-black text-lg mb-4 group-hover:scale-110 transition-transform">
              1
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              {t('how.step1.title', '1. Report a Problem')}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t('how.step1.desc', 'Citizens submit environmental or social issues with photographs, location pins, and choose between Public, Anonymous, or Private visibility.')}
            </p>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-semibold text-[#176B50]">
              Unique Complaint ID Tracking
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative text-left hover:border-[#176B50]/40 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-[#E8F5EE] text-[#176B50] flex items-center justify-center font-black text-lg mb-4 group-hover:scale-110 transition-transform">
              2
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              {t('how.step2.title', '2. Discuss & Rally')}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t('how.step2.desc', 'Public issues automatically generate Reddit-style community threads where neighbors comment, share evidence, and upvote to elevate urgency.')}
            </p>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-semibold text-[#176B50]">
              Support Existing Complaints
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative text-left hover:border-[#176B50]/40 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-[#E8F5EE] text-[#176B50] flex items-center justify-center font-black text-lg mb-4 group-hover:scale-110 transition-transform">
              3
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              {t('how.step3.title', '3. Collaborate')}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t('how.step3.desc', 'Verified NGOs discover community-backed grievances and submit structured collaboration proposals with solutions, budgets, and volunteer plans.')}
            </p>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-semibold text-[#176B50]">
              Government Approval & Funding
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative text-left hover:border-[#176B50]/40 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-[#E8F5EE] text-[#176B50] flex items-center justify-center font-black text-lg mb-4 group-hover:scale-110 transition-transform">
              4
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              {t('how.step4.title', '4. Track & Resolve')}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t('how.step4.desc', 'Transparent milestone updates, photographic resolution evidence, and final verification ensure real results with citizen reopening rights.')}
            </p>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-semibold text-[#176B50]">
              Citizen Feedback Loop
            </div>
          </div>
        </div>
      </section>

      {/* 4. Trending Issues & Recent Activity */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Trending Issues */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs text-left">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-amber-500" />
                Trending Community Issues
              </h3>
              <button
                type="button"
                onClick={() => setActiveTab('community')}
                className="text-xs font-semibold text-[#176B50] hover:underline"
              >
                View all →
              </button>
            </div>

            <div className="space-y-3">
              {trendingComplaints.map((c) => (
                <div
                  key={c.id}
                  onClick={() => {
                    setSelectedComplaintId(c.id);
                    setActiveTab('track');
                  }}
                  className="p-3.5 rounded-xl border border-slate-100 hover:border-slate-300 hover:bg-slate-50 transition-all cursor-pointer flex items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-[#176B50] bg-[#E8F5EE] px-2 py-0.5 rounded">
                        {c.locality}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {c.id}
                      </span>
                    </div>
                    <h4 className="text-sm font-semibold text-slate-800 line-clamp-1">
                      {c.title}
                    </h4>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-bold text-[#176B50] block">
                      {c.supportCount} Backers
                    </span>
                    <span className="text-[10px] text-slate-400 capitalize">
                      {c.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Community Posts */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs text-left">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#3478C5]" />
                Recent Discussions
              </h3>
              <button
                type="button"
                onClick={() => setActiveTab('community')}
                className="text-xs font-semibold text-[#176B50] hover:underline"
              >
                Go to Feed →
              </button>
            </div>

            <div className="space-y-3">
              {recentPosts.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    setSelectedPostId(p.id);
                    setActiveTab('community');
                  }}
                  className="p-3.5 rounded-xl border border-slate-100 hover:border-slate-300 hover:bg-slate-50 transition-all cursor-pointer flex items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-semibold text-slate-500">
                        r/{p.locality}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        by {p.userDisplayName}
                      </span>
                    </div>
                    <h4 className="text-sm font-semibold text-slate-800 line-clamp-1">
                      {p.title}
                    </h4>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-bold text-slate-700 block">
                      ▲ {p.upvotes}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {p.commentCount} comments
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Featured Verified Organisations */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div className="text-left">
            <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Building2 className="w-6 h-6 text-[#176B50]" />
              Featured Verified Organisations
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Accredited NGOs and citizen welfare bodies executing public interest projects.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setActiveTab('organisations')}
            className="text-xs font-semibold text-[#176B50] hover:underline"
          >
            All Organisations →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {organisations.map((org) => (
            <div
              key={org.id}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs text-left space-y-3 hover:border-slate-300 transition-all"
            >
              <div className="flex items-center gap-3">
                <img
                  src={org.logo}
                  alt={org.name}
                  className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                />
                <div>
                  <h4 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                    {org.name}
                    {org.isVerified && (
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    )}
                  </h4>
                  <span className="text-[11px] text-slate-500 font-medium">
                    {org.type}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {org.description}
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                <span className="text-slate-500">
                  <strong className="text-slate-800">{org.completedProjectsCount}</strong> Projects Completed
                </span>
                <span className="text-[#176B50] font-semibold">
                  {org.areasOfOperation[0]} Area
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Call to Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="bg-gradient-to-r from-[#176B50] to-[#11533e] rounded-3xl p-8 sm:p-12 text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl shadow-emerald-950/20">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Notice a problem in your street?
            </h3>
            <p className="text-emerald-100 text-sm leading-relaxed">
              Don’t let it linger. File a complaint in under 2 minutes, get local community support, and watch authorities and NGOs bring it to resolution.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setActiveTab('report')}
            className="px-6 py-3.5 rounded-xl bg-white text-[#176B50] font-bold text-sm shadow-md hover:bg-emerald-50 transition-all shrink-0 cursor-pointer"
          >
            Report an Issue Now
          </button>
        </div>
      </section>
    </div>
  );
};

