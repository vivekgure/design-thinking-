import React from 'react';
import { Complaint } from '../../types';
import { X, Printer, ShieldCheck, CheckCircle2, MapPin, Building, Calendar, Award } from 'lucide-react';

interface ComplaintDocketModalProps {
  complaint: Complaint;
  onClose: () => void;
}

export const ComplaintDocketModal: React.FC<ComplaintDocketModalProps> = ({ complaint, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 text-left">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 overflow-y-auto max-h-[90vh] space-y-6 animate-in fade-in zoom-in-95 print:p-0 print:border-none print:shadow-none">
        {/* Top actions bar (hidden on print) */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 print:hidden">
          <span className="text-xs font-bold text-[#176B50] uppercase tracking-wider flex items-center gap-1.5">
            <Award className="w-4 h-4" />
            Official Civic Docket & Grievance Certificate
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-lg bg-[#176B50] hover:bg-[#11533e] text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Docket Content */}
        <div className="p-6 border-2 border-slate-300 rounded-2xl space-y-5 bg-white text-slate-800 print:border-none print:p-0">
          {/* Header of Docket */}
          <div className="flex items-start justify-between border-b-2 border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#176B50] flex items-center justify-center text-white font-bold text-sm">
                  V
                </div>
                <span className="text-xl font-black text-[#176B50] tracking-tight">VOXLY</span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium mt-1">
                Community-Driven Civic Engagement & Problem-Solving Platform
              </p>
              <p className="text-[10px] text-slate-400">
                Design Thinking Evaluation Framework • Zone XIV Civic Secretariat
              </p>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Official Docket ID
              </span>
              <span className="text-lg font-black font-mono text-slate-900 tracking-wider">
                {complaint.id}
              </span>
              <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded block mt-0.5">
                STATUS: {complaint.status.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Grievance Details */}
          <div className="space-y-3 text-xs">
            <div>
              <span className="text-slate-400 uppercase font-bold text-[10px] block">Title</span>
              <h2 className="text-base font-bold text-slate-900 mt-0.5">{complaint.title}</h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div>
                <span className="text-slate-400 font-bold text-[10px] block">Locality</span>
                <strong className="text-slate-800">{complaint.locality}</strong>
              </div>
              <div>
                <span className="text-slate-400 font-bold text-[10px] block">Category</span>
                <strong className="text-slate-800">{complaint.category}</strong>
              </div>
              <div>
                <span className="text-slate-400 font-bold text-[10px] block">Visibility</span>
                <strong className="text-slate-800 capitalize">{complaint.visibility}</strong>
              </div>
              <div>
                <span className="text-slate-400 font-bold text-[10px] block">Community Backers</span>
                <strong className="text-emerald-700">{complaint.supportCount} citizens</strong>
              </div>
            </div>

            <div>
              <span className="text-slate-400 uppercase font-bold text-[10px] block">Incident Description</span>
              <p className="text-slate-700 leading-relaxed bg-slate-50/50 p-3 rounded-lg border border-slate-200 mt-1">
                {complaint.description}
              </p>
            </div>

            <div>
              <span className="text-slate-400 uppercase font-bold text-[10px] block">Physical Location / Landmark</span>
              <p className="text-slate-800 font-medium mt-0.5 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#176B50]" />
                {complaint.address}
              </p>
            </div>

            {/* Department Action */}
            <div className="p-3.5 bg-blue-50/60 border border-blue-200 rounded-xl space-y-1">
              <span className="text-blue-900 font-bold text-[11px] block">
                Assigned Municipal Authority & Action:
              </span>
              <p className="text-blue-800">
                Department: <strong>{complaint.assignedDepartment || 'GCC Solid Waste Management'}</strong>
                {complaint.assignedOfficer && <> • Executive Officer: <strong>{complaint.assignedOfficer}</strong></>}
              </p>
              {complaint.officialRemarks && (
                <p className="text-blue-950 font-medium pt-1 italic">
                  "{complaint.officialRemarks}"
                </p>
              )}
            </div>

            {/* Resolution Evidence Photos if available */}
            {complaint.resolutionEvidencePhotos && complaint.resolutionEvidencePhotos.length > 0 && (
              <div>
                <span className="text-slate-400 uppercase font-bold text-[10px] block mb-1">
                  Verified On-Ground Resolution Evidence:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {complaint.resolutionEvidencePhotos.map((photo, i) => (
                    <img key={i} src={photo} alt="Resolution evidence" className="rounded-lg h-28 w-full object-cover border" />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Verification Stamps */}
          <div className="pt-4 border-t-2 border-slate-200 flex items-center justify-between text-[10px] text-slate-500">
            <div>
              <span>Submitted: {new Date(complaint.createdAt).toLocaleString()}</span>
              {complaint.resolvedAt && (
                <span className="block text-emerald-800 font-bold">
                  Resolved: {new Date(complaint.resolvedAt).toLocaleString()}
                </span>
              )}
            </div>
            <div className="text-right">
              <div className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-900 border border-emerald-300 rounded font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Digitally Sealed & Verified</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
