import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Complaint, ComplaintStatus, DepartmentName, CollaborationProposal, ProposalStatus } from '../../types';
import { LOCALITIES, CATEGORIES } from '../../data/mockData';
import {
  ShieldCheck,
  Building,
  FileCheck2,
  Users,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  ExternalLink,
  MapPin,
  TrendingUp,
  BarChart2,
  PieChart,
  IndianRupee,
  Eye,
  Check,
  X
} from 'lucide-react';

const DEPARTMENTS: DepartmentName[] = [
  'GCC Solid Waste Management',
  'Chennai Metro Water & Sewerage (CMWSSB)',
  'State Highways & Municipal Roads Dept',
  'Tamil Nadu Pollution Control Board (TNPCB)',
  'Greater Chennai Corporation Health & Sanitation',
  'Public Works Department (PWD)',
  'Traffic & Public Safety Wing',
  'Parks & Urban Forestry Division',
];

export const GovernmentDashboard: React.FC = () => {
  const {
    complaints,
    proposals,
    projects,
    organisations,
    updateComplaintStatus,
    reviewProposal,
    verifyProjectCompletion,
    currentUser,
    setSelectedComplaintId,
    setActiveTab
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'complaints' | 'proposals' | 'projects' | 'analytics'>('complaints');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [localityFilter, setLocalityFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Complaint Action Modal
  const [inspectingComplaint, setInspectingComplaint] = useState<Complaint | null>(null);
  const [actionStatus, setActionStatus] = useState<ComplaintStatus>('Verified');
  const [assignedDept, setAssignedDept] = useState<DepartmentName>('GCC Solid Waste Management');
  const [officialRemark, setOfficialRemark] = useState('');
  const [resolutionPhoto, setResolutionPhoto] = useState('');

  // Proposal Action Modal
  const [reviewingProposal, setReviewingProposal] = useState<CollaborationProposal | null>(null);
  const [proposalNotes, setProposalNotes] = useState('');
  const [approvedFunds, setApprovedFunds] = useState<number>(0);

  // Key KPI metrics
  const totalCount = complaints.length;
  const pendingCount = complaints.filter(c => c.status === 'Submitted' || c.status === 'Under Review').length;
  const verifiedCount = complaints.filter(c => c.status === 'Verified').length;
  const inProgressCount = complaints.filter(c => c.status === 'In Progress' || c.status === 'Assigned').length;
  const resolvedCount = complaints.filter(c => c.status === 'Resolved').length;
  const pendingProposalsCount = proposals.filter(p => p.status === 'Pending').length;
  const activeProjectsCount = projects.filter(p => p.status === 'In Progress' || p.status === 'Initiated' || p.status === 'Under Government Review').length;

  // Filter complaints
  const filteredComplaints = complaints.filter((c) => {
    if (statusFilter !== 'All' && c.status !== statusFilter) return false;
    if (localityFilter !== 'All' && c.locality !== localityFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      if (!c.id.toLowerCase().includes(q) && !c.title.toLowerCase().includes(q) && !c.address.toLowerCase().includes(q)) {
        return false;
      }
    }
    return true;
  });

  const handleUpdateComplaint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inspectingComplaint) return;

    updateComplaintStatus(
      inspectingComplaint.id,
      actionStatus,
      officialRemark.trim() || undefined,
      assignedDept,
      currentUser.name,
      resolutionPhoto.trim() ? [resolutionPhoto.trim()] : undefined
    );

    setInspectingComplaint(null);
    setOfficialRemark('');
    setResolutionPhoto('');
  };

  const handleProposalDecision = (status: ProposalStatus) => {
    if (!reviewingProposal) return;
    reviewProposal(
      reviewingProposal.id,
      status,
      proposalNotes.trim() || undefined,
      status === 'Approved' ? (approvedFunds || reviewingProposal.fundingRequested) : 0,
      assignedDept
    );

    setReviewingProposal(null);
    setProposalNotes('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
      {/* Top Banner: Authority Badge */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-md border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 font-semibold text-xs border border-emerald-800">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Government Administrator Console • Municipal Zonal Administration</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-2">
            Greater Chennai Corporation (GCC) Civic Administration
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Logged in as: <strong className="text-white">{currentUser.name}</strong> • Zonal Executive Officer
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-lg bg-slate-800 text-emerald-300 text-xs font-mono font-bold border border-slate-700">
            Zone XIV - South Chennai
          </span>
        </div>
      </div>

      {/* KPI Stats Overview Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-medium block">Total Complaints</span>
          <span className="text-2xl font-black text-slate-900 mt-1 block">{totalCount}</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <span className="text-xs text-amber-600 font-medium block">Under Review</span>
          <span className="text-2xl font-black text-amber-600 mt-1 block">{pendingCount}</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <span className="text-xs text-indigo-600 font-medium block">Verified</span>
          <span className="text-2xl font-black text-indigo-600 mt-1 block">{verifiedCount}</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <span className="text-xs text-orange-600 font-medium block">In Progress</span>
          <span className="text-2xl font-black text-orange-600 mt-1 block">{inProgressCount}</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <span className="text-xs text-emerald-600 font-medium block">Resolved</span>
          <span className="text-2xl font-black text-emerald-600 mt-1 block">{resolvedCount}</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <span className="text-xs text-blue-600 font-medium block">NGO Proposals</span>
          <span className="text-2xl font-black text-[#3478C5] mt-1 block">{pendingProposalsCount}</span>
        </div>
      </div>

      {/* Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto text-xs">
        <button
          type="button"
          onClick={() => setActiveSubTab('complaints')}
          className={`px-4 py-2 rounded-xl font-bold transition-colors cursor-pointer flex items-center gap-2 ${
            activeSubTab === 'complaints'
              ? 'bg-[#176B50] text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Building className="w-4 h-4" />
          <span>Complaints Management ({complaints.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('proposals')}
          className={`px-4 py-2 rounded-xl font-bold transition-colors cursor-pointer flex items-center gap-2 ${
            activeSubTab === 'proposals'
              ? 'bg-[#176B50] text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <FileCheck2 className="w-4 h-4" />
          <span>NGO Collaboration Requests ({pendingProposalsCount} Pending)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('projects')}
          className={`px-4 py-2 rounded-xl font-bold transition-colors cursor-pointer flex items-center gap-2 ${
            activeSubTab === 'projects'
              ? 'bg-[#176B50] text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Active NGO Projects ({activeProjectsCount})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('analytics')}
          className={`px-4 py-2 rounded-xl font-bold transition-colors cursor-pointer flex items-center gap-2 ${
            activeSubTab === 'analytics'
              ? 'bg-[#176B50] text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <BarChart2 className="w-4 h-4" />
          <span>Civic Analytics & Trends</span>
        </button>
      </div>

      {/* SUB-TAB 1: Complaints Management Table */}
      {activeSubTab === 'complaints' && (
        <div className="space-y-4">
          {/* Filters Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search complaint ID, citizen name, address..."
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#176B50]"
              />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white text-slate-800"
              >
                <option value="All">All Statuses</option>
                <option value="Submitted">Submitted</option>
                <option value="Under Review">Under Review</option>
                <option value="Verified">Verified</option>
                <option value="Assigned">Assigned</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
                <option value="Reopened">Reopened</option>
              </select>

              <select
                value={localityFilter}
                onChange={(e) => setLocalityFilter(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white text-slate-800"
              >
                <option value="All">All Localities</option>
                {LOCALITIES.filter(l => l !== 'All Localities').map(l => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
                  <tr>
                    <th className="p-3.5">Reference ID</th>
                    <th className="p-3.5">Grievance Title</th>
                    <th className="p-3.5">Locality</th>
                    <th className="p-3.5">Visibility</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5">Assigned Dept</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredComplaints.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3.5 font-mono font-bold text-[#176B50]">
                        {c.id}
                      </td>
                      <td className="p-3.5 max-w-xs truncate font-semibold text-slate-900">
                        {c.title}
                      </td>
                      <td className="p-3.5 font-medium">
                        {c.locality}
                      </td>
                      <td className="p-3.5">
                        {c.visibility === 'private' ? (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-800">
                            🔒 Private
                          </span>
                        ) : c.visibility === 'anonymous' ? (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                            Anonymous
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-[#176B50]">
                            Public
                          </span>
                        )}
                      </td>
                      <td className="p-3.5">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          c.status === 'Resolved'
                            ? 'bg-emerald-100 text-emerald-800'
                            : c.status === 'In Progress'
                            ? 'bg-orange-100 text-orange-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {c.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-slate-500">
                        {c.assignedDepartment || 'Pending'}
                      </td>
                      <td className="p-3.5 text-right space-x-2">
                        <button
                          type="button"
                          onClick={() => {
                            setInspectingComplaint(c);
                            setActionStatus(c.status);
                            setAssignedDept(c.assignedDepartment || 'GCC Solid Waste Management');
                            setOfficialRemark(c.officialRemarks || '');
                          }}
                          className="px-2.5 py-1 rounded-lg bg-[#176B50] hover:bg-[#11533e] text-white text-[11px] font-bold cursor-pointer"
                        >
                          Review & Action
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: Review NGO Proposals */}
      {activeSubTab === 'proposals' && (
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-bold text-base text-slate-900">
              NGO Collaboration & Funding Proposals Awaiting Official Approval
            </h3>

            {proposals.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-xs">
                No collaboration proposals submitted yet.
              </div>
            ) : (
              <div className="space-y-4">
                {proposals.map((prop) => (
                  <div
                    key={prop.id}
                    className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-slate-500">
                            {prop.id} • FOR COMPLAINT {prop.complaintId}
                          </span>
                          <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                            {prop.organisationName}
                          </span>
                        </div>
                        <h4 className="font-bold text-base text-slate-900 mt-1">
                          {prop.complaintTitle}
                        </h4>
                      </div>

                      <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase self-start sm:self-auto ${
                        prop.status === 'Approved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : prop.status === 'Pending'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}>
                        {prop.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                        <span className="text-slate-400 font-bold uppercase text-[10px] block">
                          Proposed Solution
                        </span>
                        <p className="text-slate-800">{prop.proposedSolution}</p>
                      </div>

                      <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                        <span className="text-slate-400 font-bold uppercase text-[10px] block">
                          Resource Requirements & Budget
                        </span>
                        <p className="text-slate-800">
                          Total Budget: <strong>₹{prop.estimatedBudget.toLocaleString()}</strong> • Requested Govt Assistance: <strong>₹{prop.fundingRequested.toLocaleString()}</strong> ({prop.fundingStatus})
                        </p>
                        <p className="text-slate-500 text-[11px]">
                          Volunteer Headcount: {prop.volunteerRequirement} • Est Duration: {prop.expectedDurationWeeks} weeks
                        </p>
                      </div>
                    </div>

                    {/* Government Decision Actions */}
                    {prop.status === 'Pending' && (
                      <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            setReviewingProposal(prop);
                            setApprovedFunds(prop.fundingRequested);
                          }}
                          className="px-4 py-2 rounded-xl bg-[#176B50] hover:bg-[#11533e] text-white text-xs font-bold shadow-xs cursor-pointer"
                        >
                          Review & Make Decision
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* SUB-TAB 3: Active NGO Projects & Completion Verification */}
      {activeSubTab === 'projects' && (
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-bold text-base text-slate-900">
              Ongoing Multi-Stakeholder Projects & Final Verification
            </h3>

            {projects.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-xs">
                No active projects.
              </div>
            ) : (
              <div className="space-y-4">
                {projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <span className="text-xs font-mono font-bold text-[#176B50]">
                          PROJECT: {proj.id} • {proj.organisationName}
                        </span>
                        <h4 className="font-bold text-base text-slate-900">
                          {proj.complaintTitle}
                        </h4>
                      </div>
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-white text-emerald-800 border border-emerald-300 self-start sm:self-auto">
                        {proj.status}
                      </span>
                    </div>

                    {/* Progress */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs text-slate-600 font-semibold">
                        <span>Milestone Progress</span>
                        <span>{proj.progressPercentage}%</span>
                      </div>
                      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-[#176B50] h-full rounded-full"
                          style={{ width: `${proj.progressPercentage}%` }}
                        />
                      </div>
                    </div>

                    {/* Completion report awaiting verification */}
                    {proj.completionReport && !proj.completionReport.governmentVerified && (
                      <div className="p-4 rounded-xl bg-amber-50 border-2 border-amber-300 space-y-2 text-xs">
                        <div className="flex items-center gap-1.5 font-bold text-amber-900">
                          <AlertTriangle className="w-4 h-4 text-amber-600" />
                          <span>Completion Report Submitted by NGO — Ready for Official Verification</span>
                        </div>
                        <p className="text-amber-800">{proj.completionReport.summary}</p>
                        <p className="text-slate-600"><strong>Outcomes:</strong> {proj.completionReport.outcomes}</p>

                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm('Verify this project as officially completed? This will mark the linked complaint as Resolved.')) {
                              verifyProjectCompletion(proj.id);
                            }
                          }}
                          className="px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs"
                        >
                          Verify & Mark Complaint Resolved ✓
                        </button>
                      </div>
                    )}

                    {proj.completionReport?.governmentVerified && (
                      <div className="p-3 rounded-lg bg-emerald-50 text-emerald-900 text-xs font-semibold flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Verified and Completed on {new Date(proj.completionReport.verificationDate || '').toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* SUB-TAB 4: Visual Civic Analytics */}
      {activeSubTab === 'analytics' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-[#176B50]" />
              Complaints by Civic Category
            </h3>
            <div className="space-y-2 pt-2">
              {CATEGORIES.slice(0, 6).map((cat) => {
                const count = complaints.filter(c => c.category === cat.name).length;
                const percent = Math.min(100, Math.round((count / Math.max(1, complaints.length)) * 100));
                return (
                  <div key={cat.name} className="space-y-1 text-xs">
                    <div className="flex items-center justify-between text-slate-700 font-medium">
                      <span>{cat.name}</span>
                      <span>{count} reported ({percent}%)</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-[#176B50] h-full rounded-full" style={{ width: `${Math.max(15, percent)}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <PieChart className="w-5 h-5 text-[#3478C5]" />
              Locality Distribution & Resolution Ratio
            </h3>
            <div className="space-y-3 pt-2 text-xs">
              {LOCALITIES.filter(l => l !== 'All Localities').slice(0, 5).map((loc) => {
                const locComplaints = complaints.filter(c => c.locality === loc);
                const locResolved = locComplaints.filter(c => c.status === 'Resolved').length;
                return (
                  <div key={loc} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                    <div>
                      <strong className="text-slate-800 block">r/{loc}</strong>
                      <span className="text-[11px] text-slate-500">
                        {locComplaints.length} Total Issues
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-[#176B50] block">
                        {locResolved} Resolved
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {locComplaints.length ? Math.round((locResolved / locComplaints.length) * 100) : 0}% success rate
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Inspect & Action Complaint Modal */}
      {inspectingComplaint && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 text-left">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#176B50]">
                  OFFICIAL ACTION ON {inspectingComplaint.id}
                </span>
                <h3 className="text-lg font-bold text-slate-900">
                  {inspectingComplaint.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setInspectingComplaint(null)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUpdateComplaint} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Update Status *</label>
                <select
                  value={actionStatus}
                  onChange={(e) => setActionStatus(e.target.value as ComplaintStatus)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-800 bg-white"
                >
                  <option value="Under Review">Under Review</option>
                  <option value="Verified">Verified</option>
                  <option value="Assigned">Assigned</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Assign Responsible Department</label>
                <select
                  value={assignedDept}
                  onChange={(e) => setAssignedDept(e.target.value as DepartmentName)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-800 bg-white"
                >
                  {DEPARTMENTS.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Official Municipal Response Note</label>
                <textarea
                  rows={3}
                  value={officialRemark}
                  onChange={(e) => setOfficialRemark(e.target.value)}
                  placeholder="Enter details of field inspection, work order number, or contractor assignment..."
                  className="w-full p-3 rounded-lg border border-slate-300 text-xs text-slate-800"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Resolution Evidence Photograph (URL)</label>
                <input
                  type="url"
                  value={resolutionPhoto}
                  onChange={(e) => setResolutionPhoto(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-800"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setInspectingComplaint(null)}
                  className="px-4 py-2 rounded-lg text-slate-600 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#176B50] hover:bg-[#11533e] text-white font-bold"
                >
                  Commit Official Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Review Proposal Modal */}
      {reviewingProposal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 text-left">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-4">
            <h3 className="font-bold text-base text-slate-900">
              Government Review: {reviewingProposal.organisationName}
            </h3>
            <p className="text-xs text-slate-500">
              Review proposed plan and approve simulated municipal partnership funding.
            </p>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
              <strong className="text-slate-800 block">Proposed Plan:</strong>
              <p className="text-slate-700">{reviewingProposal.proposedSolution}</p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Approved Government Funding (₹ INR)
                </label>
                <input
                  type="number"
                  value={approvedFunds}
                  onChange={(e) => setApprovedFunds(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-800"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Official Administrative Notes
                </label>
                <textarea
                  rows={2}
                  value={proposalNotes}
                  onChange={(e) => setProposalNotes(e.target.value)}
                  placeholder="Sanction note, department instructions, or modification guidelines..."
                  className="w-full p-3 rounded-lg border border-slate-300 text-xs text-slate-800"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => handleProposalDecision('Rejected')}
                  className="px-4 py-2 rounded-xl bg-red-100 hover:bg-red-200 text-red-800 font-bold"
                >
                  Reject Proposal
                </button>
                <button
                  type="button"
                  onClick={() => handleProposalDecision('Approved')}
                  className="px-5 py-2 rounded-xl bg-[#176B50] hover:bg-[#11533e] text-white font-bold"
                >
                  Approve Collaboration & Release Funds
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

