import React from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { Sparkles, RefreshCw, UserCheck } from 'lucide-react';
import { LanguageSwitcher } from './LanguageSwitcher';

export const PrototypeBanner: React.FC = () => {
  const { currentUser, switchRole, resetDemoData, t } = useApp();

  const roles: { role: UserRole; labelKey: string; defaultLabel: string; name: string }[] = [
    { role: 'citizen', labelKey: 'role.citizen', defaultLabel: 'Citizen', name: 'Priya Sundaram' },
    { role: 'government', labelKey: 'role.government', defaultLabel: 'Government', name: 'Dr. Arumugam, IAS' },
    { role: 'ngo', labelKey: 'role.ngo', defaultLabel: 'NGO Lead', name: 'Green Earth Chennai' },
    { role: 'admin', labelKey: 'role.admin', defaultLabel: 'Platform Admin', name: 'System Admin' },
  ];

  return (
    <div className="bg-[#11533e] text-white text-xs py-1.5 px-4 border-b border-[#1f8b68]/40 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 bg-[#1f8b68] text-white px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider text-[10px]">
            <Sparkles className="w-3 h-3" />
            {t('proto.badge', 'University Prototype')}
          </span>
          <span className="hidden sm:inline text-emerald-100 font-medium">
            {t('proto.subtitle', 'Design Thinking & Civic Innovation • Simulated GCC Workflows')}
          </span>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Language Switcher */}
          <LanguageSwitcher compact />

          <div className="h-4 w-px bg-emerald-700/60 hidden md:block" />

          <span className="text-emerald-200 hidden md:inline flex items-center gap-1">
            <UserCheck className="w-3.5 h-3.5" />
            {t('proto.activePerspective', 'Active Perspective:')}
          </span>
          <div className="flex items-center gap-1 bg-[#0d4030] p-0.5 rounded-lg border border-[#1f8b68]/50">
            {roles.map((r) => {
              const isActive = currentUser.role === r.role;
              const displayLabel = t(r.labelKey, r.defaultLabel);
              return (
                <button
                  key={r.role}
                  type="button"
                  onClick={() => switchRole(r.role)}
                  className={`px-2.5 py-1 rounded-md font-medium text-[11px] transition-all flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'bg-white text-[#11533e] font-bold shadow-sm'
                      : 'text-emerald-200 hover:text-white hover:bg-white/10'
                  }`}
                  title={`Switch to ${displayLabel} (${r.name})`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#176B50]' : 'bg-emerald-400'}`} />
                  <span>{displayLabel}</span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => {
              if (window.confirm('Reset sample demonstration data to default state?')) {
                resetDemoData();
              }
            }}
            className="text-emerald-300 hover:text-white p-1 hover:bg-white/10 rounded transition-colors ml-1 cursor-pointer"
            title={t('proto.reset', 'Reset Sample Data')}
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
