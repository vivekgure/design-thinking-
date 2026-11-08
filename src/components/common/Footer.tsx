import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Heart, Award } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          {/* Brand & Purpose */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#176B50] flex items-center justify-center text-white font-bold">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M11 5L6 9H2v6h4l5 4V5z"/>
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                </svg>
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                VOXLY
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              Every Voice Matters. Together, We Create Change. VOXLY is a community-driven civic engagement platform bridging citizens, government authorities, and welfare NGOs through open dialogue, transparent complaint tracking, and structured project execution.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/80 border border-emerald-800/50 text-emerald-300 text-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Academic Prototype: Functional Demonstration for Design Thinking Evaluation</span>
            </div>
          </div>

          {/* Core Modules */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-3 uppercase tracking-wider text-xs">Platform Modules</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button type="button" onClick={() => setActiveTab('community')} className="hover:text-white transition-colors">
                  Community Discussions Feed
                </button>
              </li>
              <li>
                <button type="button" onClick={() => setActiveTab('report')} className="hover:text-white transition-colors">
                  Report Civic Issue
                </button>
              </li>
              <li>
                <button type="button" onClick={() => setActiveTab('explore')} className="hover:text-white transition-colors">
                  Interactive Issue Map
                </button>
              </li>
              <li>
                <button type="button" onClick={() => setActiveTab('track')} className="hover:text-white transition-colors">
                  Complaint Status Tracker
                </button>
              </li>
              <li>
                <button type="button" onClick={() => setActiveTab('organisations')} className="hover:text-white transition-colors">
                  NGO Collaboration Hub
                </button>
              </li>
            </ul>
          </div>

          {/* Privacy & Governance */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-3 uppercase tracking-wider text-xs">Civic Integrity</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Private complaints are encrypted and exclusively accessible to verified government authorities. NGOs only access public community-flagged issues.
            </p>
            <div className="text-xs text-slate-400 space-y-1.5">
              <div className="flex items-center gap-1.5 text-slate-300">
                <Award className="w-3.5 h-3.5 text-[#3478C5]" />
                <span>Simulated GCC & Municipal Workflows</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <Award className="w-3.5 h-3.5 text-emerald-400" />
                <span>Four-Tier Role-Based Access Control</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© 2026 VOXLY Platform. University Prototype for Design Thinking & Methodology.</p>
          <div className="flex items-center gap-4">
            <button type="button" onClick={() => setActiveTab('about')} className="hover:text-slate-300">
              Design Thinking Methodology
            </button>
            <span className="text-slate-700">•</span>
            <span className="flex items-center gap-1">
              Built with <Heart className="w-3 h-3 text-red-400 inline" /> for community impact
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
