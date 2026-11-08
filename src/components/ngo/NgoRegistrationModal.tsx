import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Building2, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';
import { LOCALITIES } from '../../data/mockData';

interface NgoRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ORG_TYPES = [
  'Environmental NGO',
  'Social Welfare Organisation',
  'Waste Management Organisation',
  'Public Health Organisation',
  'Educational NGO',
  'CSR Organisation',
  'Volunteer Group',
  'Other',
];

export const NgoRegistrationModal: React.FC<NgoRegistrationModalProps> = ({ isOpen, onClose }) => {
  const { registerOrganisation } = useApp();

  const [name, setName] = useState('');
  const [type, setType] = useState(ORG_TYPES[0]);
  const [regNumber, setRegNumber] = useState('');
  const [description, setDescription] = useState('');
  const [website, setWebsite] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedAreas, setSelectedAreas] = useState<string[]>(['Tambaram', 'Chromepet']);
  const [previousProjects, setPreviousProjects] = useState('');
  const [logo, setLogo] = useState('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=120&auto=format&fit=crop&q=80');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const toggleArea = (area: string) => {
    setSelectedAreas(prev =>
      prev.includes(area) ? prev.filter(a => a !== area) : [...prev, area]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !regNumber.trim() || !description.trim()) {
      setError('Please fill in all mandatory organisation details.');
      return;
    }

    registerOrganisation({
      name: name.trim(),
      type,
      registrationNumber: regNumber.trim(),
      description: description.trim(),
      website: website.trim() || 'https://ngo-initiative.org',
      contactEmail: email.trim() || 'contact@ngo.org',
      contactPhone: phone.trim() || '+91 94440 00000',
      areasOfOperation: selectedAreas.length > 0 ? selectedAreas : ['Chennai'],
      previousProjects: previousProjects.split('\n').filter(p => p.trim()),
      logo: logo.trim() || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=120&auto=format&fit=crop&q=80',
      establishedYear: 2022
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 text-left">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 overflow-y-auto max-h-[90vh] space-y-5 animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-[#E8F5EE] text-[#176B50] flex items-center justify-center font-bold">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Register Public Welfare Organisation
              </h2>
              <p className="text-xs text-slate-500">
                Join the VOXLY civic network to discover and solve community problems.
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

        {error && (
          <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Organisation Legal Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Clean Chromepet Environmental Trust"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#176B50]"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Organisation Classification *</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-800 bg-white"
              >
                {ORG_TYPES.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Registration / 80G Reference *</label>
              <input
                type="text"
                value={regNumber}
                onChange={(e) => setRegNumber(e.target.value)}
                placeholder="TN-CH-2023-NGO-XXXX"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-800 font-mono"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Mission & Activities Description *</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your civic focus, experience with municipal bodies, and key target groups..."
              className="w-full p-3 rounded-lg border border-slate-300 text-xs text-slate-800"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Official Contact Email *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="contact@organisation.org"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-800"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Helpline / Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 94440 12345"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-800"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Operational Localities</label>
            <div className="flex flex-wrap gap-2">
              {LOCALITIES.filter(l => l !== 'All Localities').map((loc) => {
                const isSelected = selectedAreas.includes(loc);
                return (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => toggleArea(loc)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-colors ${
                      isSelected
                        ? 'bg-[#176B50] text-white border-[#176B50]'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {loc}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-800 leading-relaxed">
            Note: Newly registered organisations undergo verification by the Platform Administrator before proposal submission privileges are granted.
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
              Submit Organisation Registration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

