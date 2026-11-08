import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Complaint } from '../../types';
import { X, Building2, Sparkles, AlertCircle, IndianRupee } from 'lucide-react';

interface ProposeCollaborationModalProps {
  complaint: Complaint;
  onClose: () => void;
}

export const ProposeCollaborationModal: React.FC<ProposeCollaborationModalProps> = ({
  complaint,
  onClose,
}) => {
  const { submitProposal, currentUser, organisations } = useApp();

  const userOrg = organisations.find((o) => o.id === currentUser.organisationId) || organisations[0];

  const [proposedSolution, setProposedSolution] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [resourcesAvailable, setResourcesAvailable] = useState('');
  const [volunteerRequirement, setVolunteerRequirement] = useState(15);
  const [estimatedBudget, setEstimatedBudget] = useState(50000);
  const [durationWeeks, setDurationWeeks] = useState(3);
  const [govAssistance, setGovAssistance] = useState('');
  const [fundingRequested, setFundingRequested] = useState(25000);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!proposedSolution.trim() || !projectDescription.trim()) {
      setError('Please provide the proposed solution and project implementation description.');
      return;
    }

    submitProposal({
      complaintId: complaint.id,
      complaintTitle: complaint.title,
      organisationId: userOrg.id,
      organisationName: userOrg.name,
      organisationType: userOrg.type,
      proposedSolution: proposedSolution.trim(),
      projectDescription: projectDescription.trim(),
      resourcesAvailable: resourcesAvailable.trim() || 'Internal NGO volunteer network & standard tools',
      volunteerRequirement: Number(volunteerRequirement),
      estimatedBudget: Number(estimatedBudget),
      expectedDurationWeeks: Number(durationWeeks),
      governmentAssistanceRequired: govAssistance.trim() || 'Municipal site clearance & waste collection coordination',
      fundingRequested: Number(fundingRequested),
      fundingStatus: Number(fundingRequested) > 0 ? 'Pending Review' : 'Not Requested',
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 text-left">
      <div
        className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 overflow-y-auto max-h-[90vh] space-y-5 animate-in fade-in zoom-in-95"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#E8F5EE] text-[#176B50] flex items-center justify-center font-bold">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Propose NGO Collaboration
              </h2>
              <p className="text-xs text-slate-500">
                Submitting proposal as: <strong className="text-slate-800">{userOrg.name}</strong>
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Target Complaint Summary */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-xs">
          <span className="text-[10px] font-mono font-bold text-[#176B50] bg-white px-1.5 py-0.5 rounded border border-slate-200">
            {complaint.id} • {complaint.locality}
          </span>
          <h4 className="font-bold text-slate-800 pt-0.5">
            {complaint.title}
          </h4>
          <p className="text-slate-500 line-clamp-1">{complaint.description}</p>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Proposed Solution Summary *
            </label>
            <input
              type="text"
              value={proposedSolution}
              onChange={(e) => setProposedSolution(e.target.value)}
              placeholder="e.g. Deployment of segregated bins, volunteer cleanup drive, and resident marshals"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#176B50]"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Project Implementation Description *
            </label>
            <textarea
              rows={3}
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              placeholder="Detail on-ground action steps, community mobilization, safety measures, and long-term upkeep..."
              className="w-full p-3 rounded-lg border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#176B50]"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Volunteer Requirement (Headcount)
              </label>
              <input
                type="number"
                min={1}
                max={500}
                value={volunteerRequirement}
                onChange={(e) => setVolunteerRequirement(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#176B50]"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Expected Duration (Weeks)
              </label>
              <input
                type="number"
                min={1}
                max={52}
                value={durationWeeks}
                onChange={(e) => setDurationWeeks(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#176B50]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Estimated Project Budget (₹ INR)
              </label>
              <input
                type="number"
                min={0}
                step={1000}
                value={estimatedBudget}
                onChange={(e) => setEstimatedBudget(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#176B50]"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Simulated Government Funding Request (₹ INR)
              </label>
              <input
                type="number"
                min={0}
                step={1000}
                value={fundingRequested}
                onChange={(e) => setFundingRequested(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#176B50]"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Government Assistance / Permissions Required
            </label>
            <input
              type="text"
              value={govAssistance}
              onChange={(e) => setGovAssistance(e.target.value)}
              placeholder="e.g. GCC Road clearance permission, Police traffic escort, compactor truck support"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#176B50]"
            />
          </div>

          <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl text-[11px] text-emerald-800 leading-relaxed">
            Upon submission, this proposal is routed to the authorized Zonal Officer for administrative review. If approved, an active project will be created automatically.
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#176B50] hover:bg-[#11533e] text-white font-bold shadow-sm"
            >
              Submit Proposal for Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

