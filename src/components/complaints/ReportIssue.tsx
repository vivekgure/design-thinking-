import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { ComplaintCategory, ComplaintVisibility, DepartmentName } from '../../types';
import { LOCALITIES } from '../../data/mockData';
import {
  AlertCircle,
  Upload,
  MapPin,
  Lock,
  Globe,
  EyeOff,
  CheckCircle2,
  Calendar,
  Building,
  Image as ImageIcon,
  Sparkles,
  HeartHandshake,
  ArrowRight,
  ExternalLink,
  X
} from 'lucide-react';

const ENVIRONMENTAL_CATEGORIES: ComplaintCategory[] = [
  'Garbage Accumulation',
  'Waste Management',
  'Water Pollution',
  'Air Pollution',
  'Drainage Problems',
  'Water Leakage',
  'Deforestation',
  'Environmental Damage',
];

const SOCIAL_CATEGORIES: ComplaintCategory[] = [
  'Damaged Roads',
  'Broken Streetlights',
  'Public Safety',
  'Poor Sanitation',
  'Public Facilities',
  'Transportation',
  'Community Infrastructure',
];

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

export const ReportIssue: React.FC = () => {
  const {
    createComplaint,
    complaints,
    supportComplaint,
    currentUser,
    setSelectedComplaintId,
    setActiveTab
  } = useApp();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<ComplaintCategory>('Garbage Accumulation');
  const [locality, setLocality] = useState('Tambaram');
  const [address, setAddress] = useState('');
  const [dateOfOccurrence, setDateOfOccurrence] = useState(new Date().toISOString().split('T')[0]);
  const [department, setDepartment] = useState<DepartmentName>('GCC Solid Waste Management');
  const [visibility, setVisibility] = useState<ComplaintVisibility>('public');
  const [photoUrl, setPhotoUrl] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [submittedComplaintId, setSubmittedComplaintId] = useState<string | null>(null);
  const [error, setError] = useState('');

  // Sample photo helpers for quick testing
  const sampleEvidencePresets = [
    { label: 'Tambaram Waste Piling', url: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=800&auto=format&fit=crop&q=80' },
    { label: 'Road Potholes & Cracks', url: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=800&auto=format&fit=crop&q=80' },
    { label: 'Sewer Line Rupture', url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?w=800&auto=format&fit=crop&q=80' },
    { label: 'Water Contamination', url: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=800&auto=format&fit=crop&q=80' },
  ];

  // DUPLICATE DETECTION LOGIC:
  // Checks if any public complaint in the selected locality matches category or keywords in the title
  const similarComplaints = useMemo(() => {
    if (!title.trim() && !locality) return [];
    const query = title.trim().toLowerCase();

    return complaints.filter((c) => {
      if (c.visibility === 'private') return false; // NEVER suggest private complaints
      if (c.locality !== locality) return false;

      // Check category match or title word match
      if (c.category === category) return true;
      if (query.length > 3) {
        const words = query.split(/\s+/).filter(w => w.length > 3);
        const hasKeywordMatch = words.some(w => c.title.toLowerCase().includes(w));
        if (hasKeywordMatch) return true;
      }
      return false;
    }).slice(0, 2);
  }, [title, locality, category, complaints]);

  const handleAddPhoto = () => {
    if (photoUrl.trim()) {
      setPhotos(prev => [...prev, photoUrl.trim()]);
      setPhotoUrl('');
    }
  };

  const handleRemovePhoto = (idx: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Please provide a descriptive complaint title.');
      return;
    }
    if (!description.trim()) {
      setError('Please provide a detailed description of the problem.');
      return;
    }
    if (!address.trim()) {
      setError('Please provide the street address or nearest landmark.');
      return;
    }

    const created = createComplaint({
      title: title.trim(),
      description: description.trim(),
      category,
      locality,
      address: address.trim(),
      visibility,
      photos,
      suggestedDepartment: department
    });

    setSubmittedComplaintId(created.id);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-left">
      {/* Title & Introduction */}
      <div className="mb-8 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F5EE] text-[#176B50] font-semibold text-xs border border-[#c8e7d7]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Official Civic Grievance Registration</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Report an Issue in Your Neighborhood
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
          Submit local environmental, infrastructure, or public safety issues. Public complaints automatically create community discussion posts where neighbors can rally and back your issue.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* DUPLICATE DETECTION NOTICE */}
      {similarComplaints.length > 0 && (
        <div className="mb-8 p-5 rounded-2xl bg-amber-50 border-2 border-amber-300 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-amber-900">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
            <h3 className="font-bold text-sm">
              An issue similar to yours has already been reported in {locality}!
            </h3>
          </div>
          <p className="text-xs text-amber-800 leading-relaxed">
            Support an existing complaint instead of creating duplicate grievances. Backing an existing issue increases its priority on the municipal and NGO dashboards.
          </p>

          <div className="space-y-2 pt-1">
            {similarComplaints.map((sim) => {
              const isSupported = sim.supportedByUserIds.includes(currentUser.id);
              return (
                <div
                  key={sim.id}
                  className="bg-white p-3.5 rounded-xl border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">
                        {sim.id}
                      </span>
                      <span className="text-xs font-bold text-slate-800">
                        {sim.title}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      {sim.address} • Currently: <strong className="text-amber-800 capitalize">{sim.status}</strong> • {sim.supportCount} citizen backers
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => supportComplaint(sim.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                        isSupported
                          ? 'bg-[#176B50] text-white'
                          : 'bg-amber-600 hover:bg-amber-700 text-white'
                      }`}
                    >
                      <HeartHandshake className="w-3.5 h-3.5" />
                      <span>{isSupported ? 'Supported ✓' : 'Support Existing'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedComplaintId(sim.id);
                        setActiveTab('track');
                      }}
                      className="px-2.5 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold"
                    >
                      Track
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Complaint Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        {/* Section 1: Basic Information */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
            <span className="w-6 h-6 rounded-md bg-[#E8F5EE] text-[#176B50] flex items-center justify-center text-xs font-bold">1</span>
            Issue Details
          </h2>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Complaint Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Major sewage overflow and broken drain on Chromepet Station Road"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#176B50]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Detailed Description *
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the exact issue, potential hazards, duration of occurrence, and how it impacts residents..."
              className="w-full p-3.5 rounded-xl border border-slate-300 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#176B50]"
              required
            />
          </div>

          {/* Category Picker */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Issue Category *
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block mb-1">
                  Environmental Issues
                </span>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ComplaintCategory)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#176B50]"
                >
                  {ENVIRONMENTAL_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <span className="text-[11px] font-bold text-blue-800 uppercase tracking-wider block mb-1">
                  Social & Infrastructure
                </span>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ComplaintCategory)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#176B50]"
                >
                  {SOCIAL_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Location & Occurrence */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h2 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
            <span className="w-6 h-6 rounded-md bg-[#E8F5EE] text-[#176B50] flex items-center justify-center text-xs font-bold">2</span>
            Location & Department
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Locality / Sub-Municipality *
              </label>
              <select
                value={locality}
                onChange={(e) => setLocality(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#176B50]"
              >
                {LOCALITIES.filter(l => l !== 'All Localities').map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Date of Occurrence *
              </label>
              <input
                type="date"
                value={dateOfOccurrence}
                onChange={(e) => setDateOfOccurrence(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#176B50]"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Specific Street Address & Landmark *
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="e.g. Near Pillar No. 42, GST Road, Tambaram East Market Junction"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#176B50]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Suggested Department
            </label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value as DepartmentName)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#176B50]"
            >
              {DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Section 3: Evidence Photographs */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h2 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
            <span className="w-6 h-6 rounded-md bg-[#E8F5EE] text-[#176B50] flex items-center justify-center text-xs font-bold">3</span>
            Photographic Evidence
          </h2>

          <div className="flex gap-2">
            <input
              type="url"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              placeholder="Paste photographic evidence URL..."
              className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#176B50]"
            />
            <button
              type="button"
              onClick={handleAddPhoto}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold shrink-0"
            >
              Add Photo
            </button>
          </div>

          {/* Quick preset selector */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-slate-500 font-medium">Or attach demonstration evidence:</span>
            {sampleEvidencePresets.map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => setPhotos(prev => [...prev, preset.url])}
                className="text-[11px] bg-slate-100 hover:bg-[#E8F5EE] hover:text-[#176B50] px-2.5 py-1 rounded-lg border border-slate-200 transition-colors"
              >
                + {preset.label}
              </button>
            ))}
          </div>

          {/* Photos list */}
          {photos.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {photos.map((p, idx) => (
                <div key={idx} className="relative group rounded-xl overflow-hidden border border-slate-200 h-28">
                  <img src={p} alt={`Evidence ${idx + 1}`} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => handleRemovePhoto(idx)}
                    className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-90 hover:opacity-100"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Section 4: Complaint Visibility (3 Options) */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-[#E8F5EE] text-[#176B50] flex items-center justify-center text-xs font-bold">4</span>
              Complaint Visibility Level
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Select how your report is distributed. Private complaints are strictly protected and never shared with other citizens or NGOs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 1. Public */}
            <label
              className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                visibility === 'public'
                  ? 'border-[#176B50] bg-emerald-50/40 ring-1 ring-[#176B50]'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-bold text-sm text-slate-900">
                    <Globe className="w-4 h-4 text-[#176B50]" />
                    <span>Public</span>
                  </div>
                  <input
                    type="radio"
                    name="visibility"
                    value="public"
                    checked={visibility === 'public'}
                    onChange={() => setVisibility('public')}
                    className="w-4 h-4 accent-[#176B50]"
                  />
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Visible to everyone. Automatically creates a community feed post under your username. Neighbors can vote, comment, and collaborate.
                </p>
              </div>
              <span className="text-[10px] font-semibold text-emerald-700 bg-white px-2 py-0.5 rounded border border-emerald-200 mt-3 inline-block self-start">
                Community Driven
              </span>
            </label>

            {/* 2. Anonymous Public */}
            <label
              className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                visibility === 'anonymous'
                  ? 'border-[#176B50] bg-emerald-50/40 ring-1 ring-[#176B50]'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-bold text-sm text-slate-900">
                    <EyeOff className="w-4 h-4 text-amber-600" />
                    <span>Anonymous Public</span>
                  </div>
                  <input
                    type="radio"
                    name="visibility"
                    value="anonymous"
                    checked={visibility === 'anonymous'}
                    onChange={() => setVisibility('anonymous')}
                    className="w-4 h-4 accent-[#176B50]"
                  />
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Visible to everyone in community feed, but your name is hidden. Neighbors can discuss and vote. Only authorized officials see your identity for verification.
                </p>
              </div>
              <span className="text-[10px] font-semibold text-amber-700 bg-white px-2 py-0.5 rounded border border-amber-200 mt-3 inline-block self-start">
                Identity Shielded
              </span>
            </label>

            {/* 3. Private */}
            <label
              className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                visibility === 'private'
                  ? 'border-[#176B50] bg-emerald-50/40 ring-1 ring-[#176B50]'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-bold text-sm text-slate-900">
                    <Lock className="w-4 h-4 text-purple-600" />
                    <span>Private</span>
                  </div>
                  <input
                    type="radio"
                    name="visibility"
                    value="private"
                    checked={visibility === 'private'}
                    onChange={() => setVisibility('private')}
                    className="w-4 h-4 accent-[#176B50]"
                  />
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Strictly confidential. Visible ONLY to you and verified municipal officials. Does NOT appear in community feeds or to NGOs.
                </p>
              </div>
              <span className="text-[10px] font-semibold text-purple-700 bg-white px-2 py-0.5 rounded border border-purple-200 mt-3 inline-block self-start">
                Encrypted & Discreet
              </span>
            </label>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            Filing as: <strong className="text-slate-800">{currentUser.name}</strong> ({currentUser.email})
          </p>

          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#176B50] hover:bg-[#11533e] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Register Official Complaint</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>

      {/* Confirmation Modal */}
      {submittedComplaintId && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 text-center space-y-4 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="w-14 h-14 rounded-full bg-[#E8F5EE] text-[#176B50] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#176B50]">
                Success!
              </span>
              <h3 className="text-xl font-bold text-slate-900">
                Complaint Registered Successfully
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Your complaint has been assigned a tracking reference ID and dispatched to {department}.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">
                Unique Tracking Reference
              </span>
              <div className="text-2xl font-black font-mono text-[#176B50] tracking-wider">
                {submittedComplaintId}
              </div>
            </div>

            {visibility !== 'private' ? (
              <p className="text-xs text-slate-600 bg-emerald-50 p-2.5 rounded-lg border border-emerald-100">
                🎉 A community discussion post was automatically created in <strong>r/{locality}</strong>.
              </p>
            ) : (
              <p className="text-xs text-slate-600 bg-purple-50 p-2.5 rounded-lg border border-purple-100">
                🔒 Registered as a private grievance. Encrypted for municipal review only.
              </p>
            )}

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  const id = submittedComplaintId;
                  setSubmittedComplaintId(null);
                  setSelectedComplaintId(id);
                  setActiveTab('track');
                }}
                className="flex-1 py-2.5 rounded-xl bg-[#176B50] text-white text-xs font-bold hover:bg-[#11533e] transition-colors"
              >
                Track Status Timeline →
              </button>
              <button
                type="button"
                onClick={() => {
                  setSubmittedComplaintId(null);
                  setActiveTab('community');
                }}
                className="py-2.5 px-4 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50"
              >
                Community Feed
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

