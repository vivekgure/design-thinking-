import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ComplaintReferral, DepartmentName } from '../../types';
import { LOCALITIES } from '../../data/mockData';
import {
  FileText,
  Search,
  Filter,
  ArrowRight,
  ExternalLink,
  Building,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Printer,
  Download,
  Share2,
  PlusCircle,
  X,
  ShieldCheck,
  Send,
  MapPin,
  Sparkles
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

export const ComplaintRegistry: React.FC = () => {
  const {
    complaints,
    referrals,
    createReferral,
    setSelectedComplaintId,
    setActiveTab,
    currentUser,
    t
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocality, setSelectedLocality] = useState('All India');
  const [selectedDept, setSelectedDept] = useState('All Departments');
  const [selectedPriority, setSelectedPriority] = useState('All');
  const [isReferModalOpen, setIsReferModalOpen] = useState(false);
  const [selectedDocketToPrint, setSelectedDocketToPrint] = useState<ComplaintReferral | null>(null);

  // Referral form state
  const [targetComplaintId, setTargetComplaintId] = useState(complaints[0]?.id || '');
  const [referDepartment, setReferDepartment] = useState<DepartmentName>('GCC Solid Waste Management');
  const [referAgency, setReferAgency] = useState('');
  const [referPriority, setReferPriority] = useState<'Urgent' | 'High' | 'Normal'>('Urgent');
  const [referMandate, setReferMandate] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Filter referrals
  const filteredReferrals = referrals.filter((r) => {
    if (selectedLocality !== 'All India' && selectedLocality !== 'All Localities' && r.locality !== selectedLocality) return false;
    if (selectedDept !== 'All Departments' && r.targetDepartment !== selectedDept) return false;
    if (selectedPriority !== 'All' && r.priority !== selectedPriority) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchId = r.id.toLowerCase().includes(q);
      const matchCompId = r.complaintId.toLowerCase().includes(q);
      const matchTitle = r.complaintTitle.toLowerCase().includes(q);
      const matchDocket = r.officialDocketNumber.toLowerCase().includes(q);
      const matchName = r.complainantName.toLowerCase().includes(q);
      if (!matchId && !matchCompId && !matchTitle && !matchDocket && !matchName) return false;
    }
    return true;
  });

  const handleOpenReferModalFor = (complaintId: string) => {
    setTargetComplaintId(complaintId);
    const targetComp = complaints.find(c => c.id === complaintId);
    if (targetComp) {
      setReferMandate(`Urgent on-site inspection and remedial action mandated for ${targetComp.category} issue at ${targetComp.address}. Report SLA: 48 hours.`);
    }
    setIsReferModalOpen(true);
  };

  const handleSubmitReferral = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetComplaintId) return;

    createReferral({
      complaintId: targetComplaintId,
      targetDepartment: referDepartment,
      targetAgency: referAgency.trim() || undefined,
      priority: referPriority,
      actionMandate: referMandate.trim() || undefined
    });

    setSuccessMsg(`Complaint ${targetComplaintId} successfully referred to ${referDepartment}!`);
    setTimeout(() => setSuccessMsg(''), 4000);
    setIsReferModalOpen(false);
    setReferAgency('');
  };

  const handleExportCSV = () => {
    const headers = ['Referral ID', 'Docket Number', 'Complaint ID', 'Complaint Title', 'Complainant', 'Locality', 'Target Department', 'Priority', 'Mandate', 'Status', 'Date'];
    const rows = filteredReferrals.map(r => [
      r.id,
      r.officialDocketNumber,
      r.complaintId,
      `"${r.complaintTitle.replace(/"/g, '""')}"`,
      r.complainantName,
      r.locality,
      r.targetDepartment,
      r.priority,
      `"${r.actionMandate.replace(/"/g, '""')}"`,
      r.status,
      new Date(r.createdAt).toLocaleString()
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `VOXLY_Civic_Referrals_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
      {/* 1. Header Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F5EE] text-[#176B50] font-semibold text-xs border border-[#c8e7d7]">
            <FileText className="w-3.5 h-3.5" />
            <span>Official Civic Referral & Inter-Agency Coordination</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Municipal Complaint Referral & Audit Registry
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
            Send, track, and refer citizens’ grievances to authorized municipal wings, pollution control boards, and partner NGOs with formal legal docket tracking.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 flex-wrap">
          <button
            type="button"
            onClick={() => {
              setReferMandate('Immediate site inspection, sample testing, and corrective work order issuance ordered under Section 133 CrPC.');
              setIsReferModalOpen(true);
            }}
            className="px-4 py-2.5 rounded-xl bg-[#176B50] hover:bg-[#11533e] text-white text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Refer a Complaint</span>
          </button>

          <button
            type="button"
            onClick={handleExportCSV}
            className="px-3.5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            title="Export referrals list as CSV"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* 2. Key Metrics Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-2xl sm:text-3xl font-extrabold text-[#176B50] block">
            {complaints.length}
          </span>
          <span className="text-xs font-medium text-slate-600 mt-1 block">
            Total Complaints Received
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-2xl sm:text-3xl font-extrabold text-[#3478C5] block">
            {referrals.length}
          </span>
          <span className="text-xs font-medium text-slate-600 mt-1 block">
            Official Referrals Dispatched
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-2xl sm:text-3xl font-extrabold text-amber-600 block">
            {referrals.filter(r => r.priority === 'Urgent').length}
          </span>
          <span className="text-xs font-medium text-slate-600 mt-1 block">
            Urgent SLA Mandates
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600 block">
            {complaints.filter(c => c.status === 'Resolved').length}
          </span>
          <span className="text-xs font-medium text-slate-600 mt-1 block">
            Verified Resolutions
          </span>
        </div>
      </div>

      {/* 3. Search and Filters */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Docket #, Complaint ID (e.g. VX-2026-1042), Complainant, or keywords..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#176B50]"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto flex-wrap text-xs">
            <select
              value={selectedLocality}
              onChange={(e) => setSelectedLocality(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-800 font-semibold"
            >
              {LOCALITIES.map((l) => (
                <option key={l} value={l}>{l === 'All India' ? '🇮🇳 All India' : l}</option>
              ))}
            </select>

            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-800"
            >
              <option value="All Departments">All Departments</option>
              {DEPARTMENTS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>

            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-800"
            >
              <option value="All">All Priorities</option>
              <option value="Urgent">Urgent Priority</option>
              <option value="High">High Priority</option>
              <option value="Normal">Normal Priority</option>
            </select>
          </div>
        </div>
      </div>

      {/* 4. Referrals Table / Cards */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#176B50]" />
            <h3 className="font-bold text-sm text-slate-900">
              Active Inter-Agency Referral Dockets ({filteredReferrals.length})
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Authorized Public Record
          </span>
        </div>

        {filteredReferrals.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-xs space-y-2">
            <FileText className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="font-semibold text-slate-700">No referral dockets matched your criteria.</p>
            <p>Try resetting filters or click "Refer a Complaint" to dispatch a grievance to an agency.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredReferrals.map((r) => {
              const comp = complaints.find(c => c.id === r.complaintId);

              return (
                <div
                  key={r.id}
                  className="p-5 hover:bg-slate-50/80 transition-colors flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-mono font-black text-[#176B50] bg-[#E8F5EE] px-2 py-0.5 rounded border border-[#c8e7d7]">
                        {r.officialDocketNumber}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedComplaintId(r.complaintId);
                          setActiveTab('track');
                        }}
                        className="text-xs font-mono font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded hover:bg-slate-200 cursor-pointer"
                        title="Click to track complaint"
                      >
                        Ref: {r.complaintId} →
                      </button>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {r.locality}
                      </span>
                      <span
                        className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                          r.priority === 'Urgent'
                            ? 'bg-red-100 text-red-800 border border-red-200'
                            : r.priority === 'High'
                            ? 'bg-amber-100 text-amber-800 border border-amber-200'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {r.priority} Priority
                      </span>
                    </div>

                    <h4 className="font-bold text-sm sm:text-base text-slate-900 leading-snug">
                      {r.complaintTitle}
                    </h4>

                    <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                      <strong className="text-slate-800">Mandate:</strong> {r.actionMandate}
                    </p>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 pt-1">
                      <span>Target: <strong className="text-slate-800">{r.targetDepartment}</strong></span>
                      {r.targetAgency && (
                        <span>Partner NGO: <strong className="text-emerald-700">{r.targetAgency}</strong></span>
                      )}
                      <span>Referred by: <strong>{r.referredBy}</strong></span>
                      <span>Dispatched: {new Date(r.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex lg:flex-col items-center lg:items-end gap-2 shrink-0 self-stretch lg:self-center justify-between border-t lg:border-t-0 pt-3 lg:pt-0 border-slate-100">
                    <button
                      type="button"
                      onClick={() => setSelectedDocketToPrint(r)}
                      className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print Docket</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedComplaintId(r.complaintId);
                        setActiveTab('track');
                      }}
                      className="px-3.5 py-2 rounded-xl bg-[#176B50] hover:bg-[#11533e] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs"
                    >
                      <span>Track Status</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 5. Quick Complaints Referral Grid */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <Building className="w-5 h-5 text-[#176B50]" />
              Submitted Grievances Available for Departmental Referral
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Select any community complaint below to immediately issue a formal referral docket.
            </p>
          </div>
          <span className="text-xs text-slate-500 font-semibold">
            {complaints.length} in registry
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {complaints.slice(0, 6).map((c) => {
            const hasReferral = referrals.some(r => r.complaintId === c.id);

            return (
              <div
                key={c.id}
                className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50/50 space-y-2 flex flex-col justify-between transition-all"
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-bold text-[#176B50] bg-white px-2 py-0.5 rounded border border-slate-200">
                      {c.id}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {c.status}
                    </span>
                  </div>
                  <h4 className="font-bold text-xs text-slate-800 line-clamp-2">
                    {c.title}
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    {c.locality} • {c.category}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => handleOpenReferModalFor(c.id)}
                    className="w-full py-1.5 rounded-lg bg-[#176B50] hover:bg-[#11533e] text-white text-xs font-bold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>Refer This Issue</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* MODAL: Refer a Complaint */}
      {isReferModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#E8F5EE] text-[#176B50] flex items-center justify-center font-bold">
                  <Send className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900">
                    Issue Inter-Agency Referral
                  </h3>
                  <p className="text-xs text-slate-500">
                    Dispatch formal action mandate to municipal department or NGO.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsReferModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitReferral} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Target Complaint *
                </label>
                <select
                  value={targetComplaintId}
                  onChange={(e) => setTargetComplaintId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white text-slate-800"
                  required
                >
                  {complaints.map((c) => (
                    <option key={c.id} value={c.id}>
                      [{c.id}] {c.locality} - {c.title.slice(0, 50)}...
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Assignee Department *
                  </label>
                  <select
                    value={referDepartment}
                    onChange={(e) => setReferDepartment(e.target.value as DepartmentName)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white text-slate-800"
                    required
                  >
                    {DEPARTMENTS.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Priority Mandate *
                  </label>
                  <select
                    value={referPriority}
                    onChange={(e) => setReferPriority(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white text-slate-800"
                  >
                    <option value="Urgent">Urgent (48 Hour SLA)</option>
                    <option value="High">High (7 Day SLA)</option>
                    <option value="Normal">Normal (14 Day SLA)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Partner NGO / Welfare Co-executor (Optional)
                </label>
                <input
                  type="text"
                  value={referAgency}
                  onChange={(e) => setReferAgency(e.target.value)}
                  placeholder="e.g. Green Earth Chennai, Clean Delhi Taskforce, etc."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs placeholder-slate-400"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Action Mandate & Directives *
                </label>
                <textarea
                  rows={3}
                  value={referMandate}
                  onChange={(e) => setReferMandate(e.target.value)}
                  placeholder="State the required inspection, corrective actions, equipment deployment, and reporting deadline..."
                  className="w-full p-3 rounded-xl border border-slate-300 text-xs placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#176B50]"
                  required
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsReferModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#176B50] hover:bg-[#11533e] text-white font-bold transition-colors cursor-pointer"
                >
                  Confirm & Dispatch Referral
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Printable Official Referral Docket */}
      {selectedDocketToPrint && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-[#176B50]" />
                <div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Official Inter-Agency Referral Docket
                  </h3>
                  <span className="text-[11px] font-mono text-slate-500">
                    {selectedDocketToPrint.officialDocketNumber}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedDocketToPrint(null)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3 pb-2 border-b border-slate-200">
                <div>
                  <span className="text-slate-400 block font-medium">Complaint Reference</span>
                  <span className="font-bold text-slate-800 font-mono text-sm">
                    {selectedDocketToPrint.complaintId}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Priority Level</span>
                  <span className="font-bold text-red-700 uppercase">
                    {selectedDocketToPrint.priority}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-slate-400 block font-medium">Grievance Subject</span>
                <span className="font-bold text-slate-800 text-sm">
                  {selectedDocketToPrint.complaintTitle}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-slate-400 block font-medium">Complainant</span>
                  <span className="font-semibold text-slate-700">{selectedDocketToPrint.complainantName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Locality / Jurisdiction</span>
                  <span className="font-semibold text-slate-700">{selectedDocketToPrint.locality}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200">
                <span className="text-slate-400 block font-medium">Assignee Municipal Department</span>
                <span className="font-bold text-[#176B50] text-sm">{selectedDocketToPrint.targetDepartment}</span>
              </div>

              {selectedDocketToPrint.targetAgency && (
                <div>
                  <span className="text-slate-400 block font-medium">Partner Welfare Organisation</span>
                  <span className="font-semibold text-slate-800">{selectedDocketToPrint.targetAgency}</span>
                </div>
              )}

              <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Action Mandate</span>
                <p className="text-slate-800 leading-relaxed font-medium">
                  {selectedDocketToPrint.actionMandate}
                </p>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                <span>Issued by: {selectedDocketToPrint.referredBy}</span>
                <span>Date: {new Date(selectedDocketToPrint.createdAt).toLocaleString()}</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-[#176B50] hover:bg-[#11533e] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Certificate</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedDocketToPrint(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
