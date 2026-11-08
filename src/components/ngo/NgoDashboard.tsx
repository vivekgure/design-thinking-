import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Complaint, NgoProject } from '../../types';
import { ProposeCollaborationModal } from './ProposeCollaborationModal';
import { NgoRegistrationModal } from './NgoRegistrationModal';
import { LOCALITIES, CATEGORIES } from '../../data/mockData';
import {
  Building2,
  ShieldCheck,
  Search,
  Filter,
  PlusCircle,
  Clock,
  HeartHandshake,
  CheckCircle2,
  Users,
  IndianRupee,
  FileText,
  Send,
  AlertCircle,
  ExternalLink,
  MapPin,
  Calendar
} from 'lucide-react';

export const NgoDashboard: React.FC = () => {
  const {
    currentUser,
    organisations,
    complaints,
    proposals,
    projects,
    updateProjectProgress,
    toggleMilestone,
    submitCompletionReport,
    setSelectedComplaintId,
    setActiveTab
  } = useApp();

  const [activeTabSub, setActiveTabSub] = useState<'explore' | 'proposals' | 'projects' | 'profile'>('explore');
  const [selectedLocality, setSelectedLocality] = useState('All Localities');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals
  const [proposingComplaint, setProposingComplaint] = useState<Complaint | null>(null);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  // Selected project for reporting
  const [activeProjectModal, setActiveProjectModal] = useState<NgoProject | null>(null);
  const [progressNote, setProgressNote] = useState('');
  const [progressPercent, setProgressPercent] = useState(50);
  const [reportPhoto, setReportPhoto] = useState('');

  // Completion report modal states
  const [completionSummary, setCompletionSummary] = useState('');
  const [completionOutcomes, setCompletionOutcomes] = useState('');
  const [completionEvidencePhoto, setCompletionEvidencePhoto] = useState('');
  const [isCompletionModalOpen, setIsCompletionModalOpen] = useState(false);

  // Active organisation
  const userOrg = organisations.find((o) => o.id === currentUser.organisationId) || organisations[0];

  // Public complaints available for collaboration (Private complaints NEVER visible!)
  const availableComplaints = complaints.filter((c) => {
    if (c.visibility === 'private') return false; // Strict privacy boundary!
    if (c.status === 'Resolved') return false;
    if (selectedLocality !== 'All Localities' && c.locality !== selectedLocality) return false;
    if (selectedCategory !== 'All Categories' && c.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      if (!c.title.toLowerCase().includes(q) && !c.description.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  // Proposals by this org
  const myProposals = proposals.filter((p) => p.organisationId === userOrg.id);

  // Projects by this org
  const myProjects = projects.filter((p) => p.organisationId === userOrg.id);

  const handleProgressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeProjectModal || !progressNote.trim()) return;

    updateProjectProgress(
      activeProjectModal.id,
      progressPercent,
      progressNote.trim(),
      reportPhoto.trim() ? [reportPhoto.trim()] : []
    );

    setProgressNote('');
    setReportPhoto('');
    // refresh active project modal reference
    const updated = projects.find(p => p.id === activeProjectModal.id);
    if (updated) setActiveProjectModal(updated);
  };

  const handleCompletionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeProjectModal || !completionSummary.trim()) return;

    submitCompletionReport(
      activeProjectModal.id,
      completionSummary.trim(),
      completionOutcomes.trim(),
      completionEvidencePhoto.trim() ? [completionEvidencePhoto.trim()] : []
    );

    setIsCompletionModalOpen(false);
    setCompletionSummary('');
    setCompletionOutcomes('');
    setCompletionEvidencePhoto('');
    setActiveProjectModal(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
      {/* Top Banner: Organisation Profile Summary */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={userOrg.logo}
            alt={userOrg.name}
            className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shadow-xs"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                {userOrg.name}
              </h1>
              {userOrg.isVerified ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-[#E8F5EE] text-[#176B50] px-2 py-0.5 rounded-full border border-[#c8e7d7]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified Partner
                </span>
              ) : (
                <span className="text-[11px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                  Verification Pending
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-1 max-w-xl">
              {userOrg.description}
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-400 mt-2">
              <span>Reg: <strong className="text-slate-700 font-mono">{userOrg.registrationNumber}</strong></span>
              <span>•</span>
              <span>Active in: <strong className="text-slate-700">{userOrg.areasOfOperation.join(', ')}</strong></span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setIsRegisterModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
          >
            Register Another NGO
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto text-xs">
        <button
          type="button"
          onClick={() => setActiveTabSub('explore')}
          className={`px-4 py-2 rounded-xl font-bold transition-colors cursor-pointer flex items-center gap-2 ${
            activeTabSub === 'explore'
              ? 'bg-[#176B50] text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Search className="w-4 h-4" />
          <span>Explore Public Complaints ({availableComplaints.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTabSub('proposals')}
          className={`px-4 py-2 rounded-xl font-bold transition-colors cursor-pointer flex items-center gap-2 ${
            activeTabSub === 'proposals'
              ? 'bg-[#176B50] text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>My Collaboration Proposals ({myProposals.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTabSub('projects')}
          className={`px-4 py-2 rounded-xl font-bold transition-colors cursor-pointer flex items-center gap-2 ${
            activeTabSub === 'projects'
              ? 'bg-[#176B50] text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <HeartHandshake className="w-4 h-4" />
          <span>Approved Projects ({myProjects.length})</span>
        </button>
      </div>

      {/* TAB 1: Explore Public Complaints to Propose Collaboration */}
      {activeTabSub === 'explore' && (
        <div className="space-y-6">
          {/* Filter Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search public complaints for collaboration opportunities..."
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#176B50]"
              />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <select
                value={selectedLocality}
                onChange={(e) => setSelectedLocality(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white text-slate-800"
              >
                {LOCALITIES.map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white text-slate-800"
              >
                <option value="All Categories">All Categories</option>
                {CATEGORIES.map((c) => (
                  <option key={c.name} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Complaints Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {availableComplaints.map((c) => (
              <div
                key={c.id}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-bold text-[#176B50] bg-[#E8F5EE] px-2 py-0.5 rounded">
                      {c.id}
                    </span>
                    <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      {c.supportCount} Backers
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-slate-900 leading-snug">
                    {c.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {c.description}
                  </p>

                  <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#176B50]" />
                      {c.locality}
                    </span>
                    <span>•</span>
                    <span className="font-medium text-slate-700">{c.category}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedComplaintId(c.id);
                      setActiveTab('track');
                    }}
                    className="text-xs text-slate-600 font-semibold hover:text-[#176B50]"
                  >
                    View Details →
                  </button>

                  <button
                    type="button"
                    onClick={() => setProposingComplaint(c)}
                    className="px-4 py-2 rounded-xl bg-[#176B50] hover:bg-[#11533e] text-white text-xs font-bold shadow-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Propose Collaboration</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: My Proposals */}
      {activeTabSub === 'proposals' && (
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <h3 className="font-bold text-base text-slate-900 mb-4">
              Submitted Collaboration Proposals
            </h3>

            {myProposals.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-xs">
                You haven’t submitted any proposals yet. Explore public complaints to submit a solution!
              </div>
            ) : (
              <div className="space-y-4">
                {myProposals.map((prop) => (
                  <div
                    key={prop.id}
                    className="p-5 rounded-xl border border-slate-200 hover:border-slate-300 transition-all space-y-3 bg-slate-50/50"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-mono font-bold text-slate-500">
                          PROPOSAL REF: {prop.id} • FOR {prop.complaintId}
                        </span>
                        <h4 className="font-bold text-sm text-slate-800 mt-0.5">
                          {prop.complaintTitle}
                        </h4>
                      </div>
                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-full uppercase self-start sm:self-auto ${
                          prop.status === 'Approved'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : prop.status === 'Pending'
                            ? 'bg-amber-100 text-amber-800 border border-amber-300'
                            : 'bg-rose-100 text-rose-800 border border-rose-300'
                        }`}
                      >
                        {prop.status}
                      </span>
                    </div>

                    <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs text-slate-700 space-y-1">
                      <strong className="text-slate-900 block">Proposed Action Plan:</strong>
                      <p>{prop.proposedSolution}</p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-600 pt-1">
                      <div>
                        <span className="text-slate-400 block text-[10px]">Estimated Budget</span>
                        <strong className="text-slate-800">₹{prop.estimatedBudget.toLocaleString()}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Funding Requested</span>
                        <strong className="text-slate-800">₹{prop.fundingRequested.toLocaleString()}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Funding Status</span>
                        <span className="font-semibold text-emerald-700">{prop.fundingStatus}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Volunteers Needed</span>
                        <strong className="text-slate-800">{prop.volunteerRequirement} members</strong>
                      </div>
                    </div>

                    {prop.officialNotes && (
                      <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 text-xs text-blue-900">
                        <strong>Official Authority Review:</strong> "{prop.officialNotes}"
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: Approved Projects & Execution */}
      {activeTabSub === 'projects' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-bold text-base text-slate-900">
              Active Project Execution & Volunteer Management
            </h3>

            {myProjects.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-xs">
                No active projects running currently. Once a proposal is approved by government authorities, it will appear here.
              </div>
            ) : (
              <div className="space-y-6">
                {myProjects.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-6 rounded-2xl border-2 border-emerald-100 bg-emerald-50/20 space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-emerald-100">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-emerald-800 bg-white px-2 py-0.5 rounded border border-emerald-200">
                            {proj.id}
                          </span>
                          <span className="text-xs font-bold text-slate-700">
                            Target Locality: {proj.locality}
                          </span>
                        </div>
                        <h4 className="font-bold text-base text-slate-900 mt-1">
                          {proj.complaintTitle}
                        </h4>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold px-3 py-1 rounded-full bg-white text-emerald-800 border border-emerald-300">
                          {proj.status}
                        </span>
                        <button
                          type="button"
                          onClick={() => setActiveProjectModal(proj)}
                          className="px-3.5 py-1.5 rounded-lg bg-[#176B50] hover:bg-[#11533e] text-white text-xs font-bold shadow-xs cursor-pointer"
                        >
                          Manage Execution
                        </button>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                        <span>Milestone Progress</span>
                        <span>{proj.progressPercentage}% Complete</span>
                      </div>
                      <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                        <div
                          className="bg-[#176B50] h-full rounded-full transition-all duration-300"
                          style={{ width: `${proj.progressPercentage}%` }}
                        />
                      </div>
                    </div>

                    {/* Milestones checklist */}
                    <div className="space-y-2 pt-2">
                      <span className="text-xs font-bold text-slate-700 block">
                        Milestone Verification Checklist:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {proj.milestones.map((m) => (
                          <div
                            key={m.id}
                            onClick={() => toggleMilestone(proj.id, m.id)}
                            className={`p-3 rounded-xl border text-xs cursor-pointer transition-colors flex items-start gap-2.5 ${
                              m.completed
                                ? 'bg-emerald-50 border-emerald-200 text-emerald-900 font-semibold'
                                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={m.completed}
                              onChange={() => {}}
                              className="w-4 h-4 accent-[#176B50] mt-0.5 rounded cursor-pointer"
                            />
                            <div>
                              <span>{m.title}</span>
                              <p className="text-[11px] text-slate-500 font-normal">{m.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Volunteer Headcount */}
                    <div className="flex items-center justify-between text-xs text-slate-600 bg-white p-3 rounded-xl border border-slate-200">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-[#176B50]" />
                        <span>Registered Volunteers: <strong>{proj.assignedVolunteersCount} active members</strong></span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setActiveProjectModal(proj);
                          setIsCompletionModalOpen(true);
                        }}
                        className="text-xs font-bold text-emerald-700 hover:underline"
                      >
                        Submit Final Completion Report →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Propose Collaboration Modal */}
      {proposingComplaint && (
        <ProposeCollaborationModal
          complaint={proposingComplaint}
          onClose={() => setProposingComplaint(null)}
        />
      )}

      {/* NGO Registration Modal */}
      <NgoRegistrationModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
      />

      {/* Manage Project Execution & Milestone Updates Modal */}
      {activeProjectModal && !isCompletionModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 text-left">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900">
                Manage Project Progress ({activeProjectModal.id})
              </h3>
              <button
                type="button"
                onClick={() => setActiveProjectModal(null)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleProgressSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Update Progress Percentage ({progressPercent}%)
                </label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={progressPercent}
                  onChange={(e) => setProgressPercent(Number(e.target.value))}
                  className="w-full accent-[#176B50]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Progress Notes / Activities Executed *
                </label>
                <textarea
                  rows={3}
                  value={progressNote}
                  onChange={(e) => setProgressNote(e.target.value)}
                  placeholder="e.g. Conducted volunteer orientation, deployed 4 compactor bins with GCC sanitary officers..."
                  className="w-full p-3 rounded-lg border border-slate-300 text-xs text-slate-800"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Progress Evidence Photo (URL)
                </label>
                <input
                  type="url"
                  value={reportPhoto}
                  onChange={(e) => setReportPhoto(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-800"
                />
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCompletionModalOpen(true)}
                  className="px-4 py-2 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-xs"
                >
                  Submit Completion Report
                </button>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveProjectModal(null)}
                    className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 font-semibold"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#176B50] text-white font-bold"
                  >
                    Post Progress Update
                  </button>
                </div>
              </div>
            </form>

            {/* Past Progress Reports */}
            {activeProjectModal.progressReports.length > 0 && (
              <div className="space-y-3 pt-3 border-t border-slate-100">
                <h4 className="font-bold text-xs text-slate-800">Past Progress Logs:</h4>
                {activeProjectModal.progressReports.map((pr) => (
                  <div key={pr.id} className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs space-y-1">
                    <div className="flex items-center justify-between text-slate-400 text-[10px]">
                      <span>{pr.date} • by {pr.author}</span>
                    </div>
                    <p className="text-slate-700">{pr.notes}</p>
                    {pr.photos && pr.photos.length > 0 && (
                      <div className="flex gap-2 pt-1">
                        {pr.photos.map((p, i) => (
                          <img key={i} src={p} alt="evidence" className="w-16 h-12 object-cover rounded border" />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Completion Report Modal */}
      {isCompletionModalOpen && activeProjectModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 text-left">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-4">
            <h3 className="font-bold text-base text-slate-900">
              Submit Project Completion Report
            </h3>
            <p className="text-xs text-slate-500">
              Document final project achievements for municipal review and community resolution.
            </p>

            <form onSubmit={handleCompletionSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Executive Completion Summary *
                </label>
                <textarea
                  rows={3}
                  value={completionSummary}
                  onChange={(e) => setCompletionSummary(e.target.value)}
                  placeholder="Summarize the work done, community participation, and long-term upkeep plan..."
                  className="w-full p-3 rounded-lg border border-slate-300 text-xs text-slate-800"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Measurable Outcomes
                </label>
                <input
                  type="text"
                  value={completionOutcomes}
                  onChange={(e) => setCompletionOutcomes(e.target.value)}
                  placeholder="e.g. 100% waste clearance, 4 segregation bins installed, 200 vendors educated"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-800"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Final Photographic Evidence (URL)
                </label>
                <input
                  type="url"
                  value={completionEvidencePhoto}
                  onChange={(e) => setCompletionEvidencePhoto(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-800"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCompletionModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-slate-600 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold"
                >
                  Submit for Official Verification
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

