import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Lightbulb,
  Target,
  Sparkles,
  Users,
  Compass,
  CheckCircle2,
  ShieldCheck,
  Award,
  ArrowRight
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { setActiveTab } = useApp();

  const methodologySteps = [
    {
      stage: '1. Empathize',
      icon: Users,
      color: 'bg-blue-50 text-blue-700 border-blue-200',
      title: 'Listening to Resident & Municipal Realities',
      desc: 'Through stakeholder observations across suburban hubs (Tambaram, Chromepet, Pallavaram), we found that citizens feel individual complaints vanish into bureaucratic voids. Simultaneously, municipal officers struggle to prioritize unstructured grievances, and NGOs lack an official discovery channel for localized welfare initiatives.'
    },
    {
      stage: '2. Define',
      icon: Target,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      title: 'Actionable Problem Statement',
      desc: 'How might we create a unified civic platform where citizen reports transform into community-backed priorities, verified municipal work orders, and actionable NGO collaboration projects with transparent milestone tracking?'
    },
    {
      stage: '3. Ideate',
      icon: Lightbulb,
      color: 'bg-amber-50 text-amber-700 border-amber-200',
      title: 'Synthesizing Social Feed with Grievance Tech',
      desc: 'We merged the viral engagement mechanics of Reddit (upvoting, local sub-communities, discussion threads) with a tamper-proof complaint management workflow and a structured NGO proposal/funding management system.'
    },
    {
      stage: '4. Prototype',
      icon: Sparkles,
      color: 'bg-purple-50 text-purple-700 border-purple-200',
      title: 'VOXLY Full-Stack Architecture',
      desc: 'Built as an interactive, multi-role web prototype implementing strict role-based access control (Citizens, Government Authorities, NGOs, Admins), three-tier privacy (Public, Anonymous, Private), automated community post linking, and duplicate issue prevention.'
    },
    {
      stage: '5. Test & Validate',
      icon: CheckCircle2,
      color: 'bg-rose-50 text-rose-700 border-rose-200',
      title: 'Workflow Verification & Evaluation',
      desc: 'Demonstrated complete circular resolution: Citizen reports problem → Community discussion and voting → Government assigns department → NGO submits collaboration proposal → Authority sanctions funds → NGO executes milestones → Community & Government verify resolution.'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 text-left">
      {/* Hero Section */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#E8F5EE] text-[#176B50] font-semibold text-xs border border-[#c8e7d7]">
          <Award className="w-3.5 h-3.5" />
          <span>Design Thinking & Methodology Academic Project</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
          VOXLY: Civic Problem-Solving Through Design Thinking
        </h1>

        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          VOXLY is designed to dismantle traditional barriers between citizens, municipal administrators, and social welfare non-profits. Rather than treating civic complaints as isolated tickets, VOXLY elevates them into collective community movements with verified outcomes.
        </p>
      </div>

      {/* The 5 Stages of Design Thinking */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-3">
          Design Thinking Framework Implementation
        </h2>

        <div className="space-y-4">
          {methodologySteps.map((step) => (
            <div
              key={step.stage}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start gap-4 hover:border-slate-300 transition-all"
            >
              <div className={`p-3 rounded-xl border ${step.color} shrink-0`}>
                <step.icon className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#176B50]">
                  {step.stage}
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Complete Workflow Architecture */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <h2 className="text-xl font-bold text-slate-900">
          The Circular Civic Resolution Workflow
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-xs font-bold text-[#176B50]">STAGE 1</span>
            <h4 className="font-bold text-sm text-slate-800">REPORT</h4>
            <p className="text-[11px] text-slate-500">Citizen uploads issue, photos, GPS & chooses visibility.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-xs font-bold text-[#3478C5]">STAGE 2</span>
            <h4 className="font-bold text-sm text-slate-800">DISCUSS</h4>
            <p className="text-[11px] text-slate-500">Reddit-style upvoting, evidence addition & support.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-xs font-bold text-amber-600">STAGE 3</span>
            <h4 className="font-bold text-sm text-slate-800">COLLABORATE</h4>
            <p className="text-[11px] text-slate-500">NGO proposes solution, budget, and govt assistance.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-xs font-bold text-emerald-600">STAGE 4</span>
            <h4 className="font-bold text-sm text-slate-800">RESOLVE</h4>
            <p className="text-[11px] text-slate-500">Official verification, photo evidence & feedback loop.</p>
          </div>
        </div>
      </div>

      {/* Technology Stack & Architecture */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-white">
          Modern Technology Stack
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-slate-300">
          <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700">
            <strong className="text-white block mb-0.5">Frontend</strong>
            React 19, TypeScript, Vite, Tailwind CSS v4
          </div>
          <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700">
            <strong className="text-white block mb-0.5">Geospatial</strong>
            Leaflet API, OpenStreetMap, GeoJSON Pins
          </div>
          <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700">
            <strong className="text-white block mb-0.5">Architecture</strong>
            4-Tier RBAC, LocalStorage State, Reactive Events
          </div>
          <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700">
            <strong className="text-white block mb-0.5">Security</strong>
            Encrypted private complaint isolation & RLS models
          </div>
        </div>
      </div>

      {/* Academic Prototype Notice */}
      <div className="p-5 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-900 text-xs space-y-2">
        <h4 className="font-bold flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-amber-700" />
          Academic Prototype Evaluation Notice
        </h4>
        <p className="leading-relaxed">
          VOXLY is developed strictly as a university design thinking prototype for evaluation and demonstration. All municipal authority designations (e.g. Greater Chennai Corporation, CMWSSB, TNPCB), funding allocations, and resolution evidence are simulated realistic scenarios created for academic modeling.
        </p>
      </div>

      <div className="pt-4 text-center">
        <button
          type="button"
          onClick={() => setActiveTab('community')}
          className="px-6 py-3 rounded-xl bg-[#176B50] hover:bg-[#11533e] text-white font-bold text-xs shadow-md transition-all inline-flex items-center gap-2 cursor-pointer"
        >
          <span>Explore the Interactive Community Feed</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

