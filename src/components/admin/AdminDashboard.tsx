import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CATEGORIES, LOCALITIES } from '../../data/mockData';
import {
  ShieldAlert,
  Users,
  Building2,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileText,
  Activity,
  Layers,
  Sparkles,
  Lock
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    users,
    organisations,
    verifyOrganisation,
    complaints,
    posts,
    currentUser
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'users' | 'orgs' | 'moderation' | 'categories'>('orgs');

  const pendingOrgs = organisations.filter(o => !o.isVerified);
  const verifiedOrgs = organisations.filter(o => o.isVerified);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
      {/* Header */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-md border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950 text-red-300 font-semibold text-xs border border-red-800">
            <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
            <span>Root Platform Administrator</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-2">
            VOXLY System Administration & Moderation
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Audit logs, content moderation, user rights governance, and NGO accreditation.
          </p>
        </div>

        <span className="text-xs font-mono bg-slate-800 px-3 py-1.5 rounded-lg text-slate-300 border border-slate-700">
          Admin Session Active
        </span>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto text-xs">
        <button
          type="button"
          onClick={() => setActiveSubTab('orgs')}
          className={`px-4 py-2 rounded-xl font-bold transition-colors cursor-pointer flex items-center gap-2 ${
            activeSubTab === 'orgs'
              ? 'bg-[#176B50] text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>NGO Accreditation ({pendingOrgs.length} Pending)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('users')}
          className={`px-4 py-2 rounded-xl font-bold transition-colors cursor-pointer flex items-center gap-2 ${
            activeSubTab === 'users'
              ? 'bg-[#176B50] text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>User Management ({users.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('moderation')}
          className={`px-4 py-2 rounded-xl font-bold transition-colors cursor-pointer flex items-center gap-2 ${
            activeSubTab === 'moderation'
              ? 'bg-[#176B50] text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <AlertTriangle className="w-4 h-4" />
          <span>Content Moderation ({posts.length} Posts)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('categories')}
          className={`px-4 py-2 rounded-xl font-bold transition-colors cursor-pointer flex items-center gap-2 ${
            activeSubTab === 'categories'
              ? 'bg-[#176B50] text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Taxonomy & Categories ({CATEGORIES.length})</span>
        </button>
      </div>

      {/* TAB 1: NGO Verification */}
      {activeSubTab === 'orgs' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-bold text-base text-slate-900">
              NGOs Awaiting Platform Verification & Accreditation
            </h3>

            {pendingOrgs.length === 0 ? (
              <div className="p-6 text-center text-slate-400 text-xs bg-slate-50 rounded-xl">
                All registered organisations have been audited and verified.
              </div>
            ) : (
              <div className="space-y-3">
                {pendingOrgs.map((org) => (
                  <div
                    key={org.id}
                    className="p-4 rounded-xl border-2 border-amber-200 bg-amber-50/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                          {org.registrationNumber}
                        </span>
                        <strong className="text-sm text-slate-900">{org.name}</strong>
                      </div>
                      <p className="text-xs text-slate-600">{org.description}</p>
                      <p className="text-[11px] text-slate-400">
                        Email: {org.contactEmail} • Phone: {org.contactPhone}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => verifyOrganisation(org.id)}
                      className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shrink-0 cursor-pointer"
                    >
                      Verify & Grant Privileges ✓
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Verified Organisations List */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-bold text-base text-slate-900">
              Verified Public Welfare Partners ({verifiedOrgs.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {verifiedOrgs.map((org) => (
                <div key={org.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <strong className="text-slate-900 text-sm flex items-center gap-1.5">
                      {org.name}
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    </strong>
                    <span className="text-[10px] bg-slate-200 px-2 py-0.5 rounded text-slate-700 font-mono">
                      {org.registrationNumber}
                    </span>
                  </div>
                  <p className="text-slate-600 line-clamp-2">{org.description}</p>
                  <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-200 flex justify-between">
                    <span>{org.type}</span>
                    <span>{org.areasOfOperation.join(', ')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Users Management */}
      {activeSubTab === 'users' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-bold text-base text-slate-900">
            Registered Platform Users & Role Assignment
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
                <tr>
                  <th className="p-3">User</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Current Role</th>
                  <th className="p-3">Locality</th>
                  <th className="p-3">Reputation Karma</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50">
                    <td className="p-3 font-semibold text-slate-900 flex items-center gap-2">
                      <img src={u.avatar} alt={u.name} className="w-7 h-7 rounded-full object-cover" />
                      <span>{u.name}</span>
                    </td>
                    <td className="p-3 font-mono text-slate-500">{u.email}</td>
                    <td className="p-3">
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-100 text-[#176B50]">
                        {u.role}
                      </span>
                    </td>
                    <td className="p-3">{u.locality}</td>
                    <td className="p-3 font-bold text-slate-800">{u.reputation}</td>
                    <td className="p-3">
                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        Active
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: Moderation */}
      {activeSubTab === 'moderation' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-bold text-base text-slate-900">
            Community Content Moderation Stream
          </h3>
          <p className="text-xs text-slate-500">
            All posts adhere to civic discourse standards. No reported offensive content currently flagged by automated filters.
          </p>

          <div className="space-y-3">
            {posts.slice(0, 5).map((p) => (
              <div key={p.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-between gap-4 text-xs">
                <div className="space-y-0.5 max-w-xl">
                  <div className="flex items-center gap-2 text-slate-400 text-[10px]">
                    <span>r/{p.locality}</span>
                    <span>•</span>
                    <span>by {p.userDisplayName}</span>
                  </div>
                  <h4 className="font-bold text-slate-900">{p.title}</h4>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    Passed Safety Audit
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: Categories */}
      {activeSubTab === 'categories' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-bold text-base text-slate-900">
            Civic Taxonomy & Complaint Classifications
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {CATEGORIES.map((c) => (
              <div key={c.name} className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800">{c.name}</span>
                <span className="text-[10px] font-mono text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200">
                  {c.count} active
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

