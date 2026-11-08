import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Building2, ShieldCheck, PlusCircle, ExternalLink, Mail, Phone, Calendar, CheckCircle2 } from 'lucide-react';
import { NgoRegistrationModal } from '../ngo/NgoRegistrationModal';

export const OrganisationsPage: React.FC = () => {
  const { organisations, projects, currentUser, setActiveTab } = useApp();
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F5EE] text-[#176B50] font-semibold text-xs border border-[#c8e7d7]">
            <Building2 className="w-3.5 h-3.5" />
            <span>Civic NGO Network</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Verified Partner Organisations & NGOs
          </h1>
          <p className="text-xs text-slate-500">
            Accredited non-profits, volunteer coalitions, and CSR bodies partnering with municipal authorities to resolve civic grievances.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsRegisterOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-[#176B50] hover:bg-[#11533e] text-white text-xs font-bold shadow-xs flex items-center gap-1.5 shrink-0 cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Register an Organisation</span>
        </button>
      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {organisations.map((org) => {
          const orgProjects = projects.filter((p) => p.organisationId === org.id);

          return (
            <div
              key={org.id}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <img
                    src={org.logo}
                    alt={org.name}
                    className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shadow-2xs"
                  />
                  <div>
                    <h3 className="font-bold text-base text-slate-900 flex items-center gap-1">
                      {org.name}
                      {org.isVerified && <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />}
                    </h3>
                    <span className="text-xs text-slate-500 font-medium">
                      {org.type}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {org.description}
                </p>

                <div className="space-y-1 text-xs text-slate-500 pt-1">
                  <div className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span className="truncate">{org.contactEmail}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>{org.contactPhone}</span>
                  </div>
                </div>

                {/* Localities & Projects summary */}
                <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-1">
                  {org.areasOfOperation.map((area) => (
                    <span
                      key={area}
                      className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">
                  <strong className="text-slate-900">{orgProjects.length}</strong> Ongoing Projects
                </span>
                <button
                  type="button"
                  onClick={() => setActiveTab('ngo-dashboard')}
                  className="font-bold text-[#176B50] hover:underline"
                >
                  View NGO Hub →
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <NgoRegistrationModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />
    </div>
  );
};

