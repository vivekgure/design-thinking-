import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ComplaintStatus, DepartmentName } from '../../types';
import {
  Search,
  CheckCircle2,
  Clock,
  Building,
  UserCheck,
  ShieldCheck,
  RotateCcw,
  AlertTriangle,
  ExternalLink,
  HeartHandshake,
  Image as ImageIcon,
  MessageSquare,
  Sparkles,
  MapPin
} from 'lucide-react';

const STATUS_STEPS: ComplaintStatus[] = [
  'Submitted',
  'Under Review',
  'Verified',
  'Assigned',
  'In Progress',
  'Resolved',
];

export const ComplaintTracker: React.FC = () => {
  const {
    complaints,
    selectedComplaintId,
    setSelectedComplaintId,
    currentUser,
    reopenComplaint,
    updateComplaintStatus,
    supportComplaint,
    projects,
    setActiveTab,
    setSelectedPostId,
    t
  } = useApp();

  const [searchId, setSearchId] = useState('');
  const [reopenReason, setReopenReason] = useState('');
  const [showReopenModal, setShowReopenModal] = useState(false);

  // Government action states
  const [newStatus, setNewStatus] = useState<ComplaintStatus>('In Progress');
  const [officialRemark, setOfficialRemark] = useState('');
  const [evidencePhoto, setEvidencePhoto] = useState('');

  // Selected complaint (or default to selectedComplaintId or first available)
  const activeComplaint = complaints.find(
    (c) => c.id === (selectedComplaintId || searchId.trim().toUpperCase())
  ) || complaints[0];

  const isCitizenOwner = activeComplaint && activeComplaint.userId === currentUser.id;
  const isGovernment = currentUser.role === 'government' || currentUser.role === 'admin';
  const isSupported = activeComplaint
    ? activeComplaint.supportedByUserIds.includes(currentUser.id)
    : false;

  const linkedProject = activeComplaint?.linkedProjectId
    ? projects.find((p) => p.id === activeComplaint.linkedProjectId)
    : null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchId.trim()) {
      setSelectedComplaintId(searchId.trim().toUpperCase());
    }
  };

  const handleReopenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reopenReason.trim() || !activeComplaint) return;
    reopenComplaint(activeComplaint.id, reopenReason.trim());
    setShowReopenModal(false);
    setReopenReason('');
  };

  const handleGovernmentUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeComplaint) return;
    updateComplaintStatus(
      activeComplaint.id,
      newStatus,
      officialRemark.trim() || undefined,
      undefined,
      currentUser.name,
      evidencePhoto.trim() ? [evidencePhoto.trim()] : undefined
    );
    setOfficialRemark('');
    setEvidencePhoto('');
  };

  const getStepIndex = (status: ComplaintStatus) => {
    if (status === 'Reopened') return 4; // treated as in-progress review
    return STATUS_STEPS.indexOf(status);
  };

  const currentStepIndex = activeComplaint ? getStepIndex(activeComplaint.status) : 0;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
      {/* Header & Complaint Lookup */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F5EE] text-[#176B50] font-semibold text-xs border border-[#c8e7d7]">
              <Clock className="w-3.5 h-3.5" />
              <span>Public Civic Audit & Tracking</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              {t('track.title', 'Civic Complaint Status Tracker')}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              {t('track.subtitle', 'Follow real-time municipal inspection, department dispatch, and NGO project resolution.')}
            </p>
          </div>

          {/* Search Box */}
          <form onSubmit={handleSearch} className="flex gap-2 w-full sm:w-auto">
            <input
              type="text"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder="e.g. VX-2026-1042"
              className="px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-mono uppercase tracking-wider text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#176B50] w-full sm:w-48"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-[#176B50] hover:bg-[#11533e] text-white text-xs font-bold transition-colors flex items-center gap-1 shrink-0 cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
              <span>{t('track.lookup', 'Lookup')}</span>
            </button>
          </form>
        </div>

        {/* Quick select pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 text-xs">
          <span className="text-slate-400 shrink-0 font-medium text-[11px]">Recent Grievances:</span>
          {complaints
            .filter((c) => c.visibility !== 'private' || c.userId === currentUser.id || isGovernment)
            .slice(0, 5)
            .map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelectedComplaintId(c.id)}
                className={`px-2.5 py-1 rounded-lg border text-[11px] font-mono shrink-0 transition-all ${
                  activeComplaint?.id === c.id
                    ? 'bg-[#176B50] text-white font-bold border-[#176B50]'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
                }`}
              >
                {c.id} ({c.status})
              </button>
            ))}
        </div>
      </div>

      {activeComplaint ? (
        <div className="space-y-6">
          {/* Main Complaint Overview Card */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            {/* Header row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-mono font-black text-[#176B50] bg-[#E8F5EE] px-2.5 py-1 rounded-lg border border-[#c8e7d7]">
                    {activeComplaint.id}
                  </span>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-800">
                    r/{activeComplaint.locality}
                  </span>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                    {activeComplaint.category}
                  </span>
                  {activeComplaint.visibility === 'private' && (
                    <span className="text-xs px-2.5 py-1 rounded-full bg-purple-100 text-purple-800 font-bold">
                      🔒 Confidential Report
                    </span>
                  )}
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mt-2">
                  {activeComplaint.title}
                </h2>
              </div>

              {/* Status pill & support count */}
              <div className="flex sm:flex-col items-center sm:items-end justify-between shrink-0 gap-2">
                <span
                  className={`text-xs font-extrabold uppercase px-3 py-1 rounded-full tracking-wider ${
                    activeComplaint.status === 'Resolved'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : activeComplaint.status === 'In Progress'
                      ? 'bg-orange-100 text-orange-800 border border-orange-300'
                      : 'bg-blue-100 text-blue-800 border border-blue-300'
                  }`}
                >
                  {activeComplaint.status}
                </span>
                <span className="text-xs font-bold text-[#176B50]">
                  {activeComplaint.supportCount} Citizen Backers
                </span>
              </div>
            </div>

            {/* Description & metadata */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-4">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Grievance Description
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line bg-slate-50 p-4 rounded-xl border border-slate-100">
                    {activeComplaint.description}
                  </p>
                </div>

                {/* Evidence Photos */}
                {activeComplaint.photos && activeComplaint.photos.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Photographs Submitted ({activeComplaint.photos.length})
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      {activeComplaint.photos.map((p, i) => (
                        <div key={i} className="rounded-xl overflow-hidden border border-slate-200 h-36">
                          <img src={p} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Details Box */}
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-4 text-xs">
                <div>
                  <span className="text-slate-400 block font-medium">Location Landmark</span>
                  <span className="font-semibold text-slate-800 flex items-start gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-[#176B50] shrink-0 mt-0.5" />
                    {activeComplaint.address}
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 block font-medium">Assigned Department</span>
                  <span className="font-semibold text-slate-800 flex items-center gap-1 mt-0.5">
                    <Building className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    {activeComplaint.assignedDepartment || 'Reviewing department assignment'}
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 block font-medium">Zonal Officer</span>
                  <span className="font-semibold text-slate-800 flex items-center gap-1 mt-0.5">
                    <UserCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    {activeComplaint.assignedOfficer || 'Under Allocation'}
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 block font-medium">Submission Timestamp</span>
                  <span className="font-semibold text-slate-800">
                    {new Date(activeComplaint.createdAt).toLocaleString()}
                  </span>
                </div>

                {/* Actions */}
                <div className="pt-2 border-t border-slate-200 space-y-2">
                  {activeComplaint.visibility !== 'private' && (
                    <button
                      type="button"
                      onClick={() => supportComplaint(activeComplaint.id)}
                      className={`w-full py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                        isSupported
                          ? 'bg-[#176B50] text-white shadow-xs'
                          : 'bg-white text-[#176B50] border border-[#176B50] hover:bg-[#E8F5EE]'
                      }`}
                    >
                      <HeartHandshake className="w-4 h-4" />
                      <span>{isSupported ? 'Supported Issue ✓' : 'Support Complaint'}</span>
                    </button>
                  )}

                  {activeComplaint.linkedPostId && (
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedPostId(activeComplaint.linkedPostId!);
                        setActiveTab('community');
                      }}
                      className="w-full py-2 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5"
                    >
                      <MessageSquare className="w-4 h-4 text-slate-500" />
                      <span>Open Community Discussion</span>
                    </button>
                  )}

                  {activeComplaint.status === 'Resolved' && isCitizenOwner && (
                    <button
                      type="button"
                      onClick={() => setShowReopenModal(true)}
                      className="w-full py-2 px-3 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold border border-rose-200 flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Request Issue Reopening</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* VISUAL TIMELINE */}
            <div className="pt-6 border-t border-slate-100 space-y-4">
              <h3 className="text-base font-bold text-slate-900">
                Official Resolution Timeline
              </h3>

              <div className="relative py-4">
                {/* Horizontal line for desktop */}
                <div className="hidden sm:block absolute top-1/2 left-6 right-6 h-1 bg-slate-200 -translate-y-1/2 z-0" />
                <div
                  className="hidden sm:block absolute top-1/2 left-6 h-1 bg-[#176B50] -translate-y-1/2 z-0 transition-all duration-500"
                  style={{
                    width: `${Math.min(100, Math.max(0, (currentStepIndex / (STATUS_STEPS.length - 1)) * 90))}%`
                  }}
                />

                <div className="grid grid-cols-2 sm:grid-cols-6 gap-4 relative z-10">
                  {STATUS_STEPS.map((step, idx) => {
                    const isCompleted = idx <= currentStepIndex;
                    const isCurrent = idx === currentStepIndex;

                    return (
                      <div key={step} className="flex flex-col items-center text-center space-y-2">
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                            isCompleted
                              ? 'bg-[#176B50] text-white shadow-md'
                              : 'bg-white border-2 border-slate-300 text-slate-400'
                          }`}
                        >
                          {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                        </div>
                        <div>
                          <span className={`text-xs block font-bold ${isCurrent ? 'text-[#176B50]' : 'text-slate-700'}`}>
                            {step}
                          </span>
                          <span className="text-[10px] text-slate-400 block">
                            {idx === 0 && new Date(activeComplaint.createdAt).toLocaleDateString()}
                            {idx === 5 && activeComplaint.resolvedAt && new Date(activeComplaint.resolvedAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Official Remarks Card */}
              {activeComplaint.officialRemarks && (
                <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-blue-900">
                    <ShieldCheck className="w-4 h-4 text-blue-700" />
                    <span>Official Authority Statement</span>
                  </div>
                  <p className="text-xs text-blue-800 leading-relaxed pl-5">
                    "{activeComplaint.officialRemarks}"
                  </p>
                </div>
              )}

              {/* Resolution Evidence Photos if resolved */}
              {activeComplaint.resolutionEvidencePhotos && activeComplaint.resolutionEvidencePhotos.length > 0 && (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span>Verified Resolution Evidence</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {activeComplaint.resolutionEvidencePhotos.map((photo, i) => (
                      <div key={i} className="rounded-lg overflow-hidden border border-emerald-200 h-28">
                        <img src={photo} alt={`Resolution evidence ${i + 1}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Linked NGO Collaboration Project Card if exists */}
          {linkedProject && (
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#E8F5EE] text-[#176B50] flex items-center justify-center font-bold">
                    <HeartHandshake className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-slate-900">
                      Co-Execution Project: {linkedProject.organisationName}
                    </h3>
                    <p className="text-xs text-slate-500">
                      Official collaboration project executing on-ground resolution.
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#176B50] bg-[#E8F5EE] px-2.5 py-1 rounded-full">
                  {linkedProject.status}
                </span>
              </div>

              {/* Progress bar */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                  <span>Project Execution Progress</span>
                  <span>{linkedProject.progressPercentage}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#176B50] h-full rounded-full transition-all"
                    style={{ width: `${linkedProject.progressPercentage}%` }}
                  />
                </div>
              </div>

              {/* Milestones list */}
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Milestones
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {linkedProject.milestones.map((m) => (
                    <div
                      key={m.id}
                      className={`p-3 rounded-xl border text-xs space-y-1 ${
                        m.completed
                          ? 'bg-emerald-50/50 border-emerald-200 text-emerald-950'
                          : 'bg-slate-50 border-slate-200 text-slate-600'
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold">
                        <span>{m.title}</span>
                        {m.completed && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                      </div>
                      <p className="text-[11px] text-slate-500">{m.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* GOVERNMENT AUTHORITY ACTION PANEL (Only visible to Government / Admin) */}
          {isGovernment && (
            <div className="bg-amber-50/70 p-6 sm:p-8 rounded-2xl border-2 border-amber-300 shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-700" />
                <div>
                  <h3 className="font-bold text-base text-amber-900">
                    Government Official Control Panel (Simulated GCC Officer Action)
                  </h3>
                  <p className="text-xs text-amber-800">
                    Update status, assign departments, or add resolution photographs for {activeComplaint.id}.
                  </p>
                </div>
              </div>

              <form onSubmit={handleGovernmentUpdate} className="space-y-4 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-amber-900 mb-1">
                      Update Official Status
                    </label>
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value as ComplaintStatus)}
                      className="w-full px-3 py-2 rounded-lg border border-amber-300 text-xs bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#176B50]"
                    >
                      <option value="Under Review">Under Review</option>
                      <option value="Verified">Verified</option>
                      <option value="Assigned">Assigned</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-amber-900 mb-1">
                      Resolution Evidence Photo (URL)
                    </label>
                    <input
                      type="url"
                      value={evidencePhoto}
                      onChange={(e) => setEvidencePhoto(e.target.value)}
                      placeholder="https://..."
                      className="w-full px-3 py-2 rounded-lg border border-amber-300 text-xs bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#176B50]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-amber-900 mb-1">
                    Official Inspection Remarks / Order Details
                  </label>
                  <textarea
                    rows={2}
                    value={officialRemark}
                    onChange={(e) => setOfficialRemark(e.target.value)}
                    placeholder="Enter official action taken by GCC or contractor..."
                    className="w-full p-3 rounded-lg border border-amber-300 text-xs bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#176B50]"
                  />
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs shadow-sm cursor-pointer"
                >
                  Commit Official Update to Database
                </button>
              </form>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center text-slate-500 text-xs">
          Complaint reference not found. Please verify the ID or choose from the list above.
        </div>
      )}

      {/* Reopening Modal */}
      {showReopenModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 text-left">
            <h3 className="font-bold text-lg text-slate-900">
              Request Grievance Reopening
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              If the problem was not adequately solved in your locality, explain the deficiency for municipal re-investigation.
            </p>

            <form onSubmit={handleReopenSubmit} className="space-y-3">
              <textarea
                rows={3}
                value={reopenReason}
                onChange={(e) => setReopenReason(e.target.value)}
                placeholder="Describe why this issue is still unresolved..."
                className="w-full p-3 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowReopenModal(false)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold"
                >
                  Submit Reopen Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

