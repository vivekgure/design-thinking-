import React, { useEffect, useRef, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Complaint, ComplaintStatus } from '../../types';
import { LOCALITIES, CATEGORIES } from '../../data/mockData';
import L from 'leaflet';
import {
  MapPin,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  HeartHandshake,
  ExternalLink,
  Layers,
  Sparkles,
  Info
} from 'lucide-react';

export const ExploreMap: React.FC = () => {
  const {
    complaints,
    setSelectedComplaintId,
    setActiveTab,
    supportComplaint,
    currentUser
  } = useApp();

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersGroupRef = useRef<L.LayerGroup | null>(null);

  const [selectedLocality, setSelectedLocality] = useState('All Localities');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedPinComplaint, setSelectedPinComplaint] = useState<Complaint | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Strict privacy boundary: Only show public & anonymous complaints on the map. Never private!
  const mapComplaints = complaints.filter((c) => {
    if (c.visibility === 'private') return false;
    if (selectedLocality !== 'All Localities' && c.locality !== selectedLocality) return false;
    if (selectedCategory !== 'All Categories' && c.category !== selectedCategory) return false;
    if (statusFilter !== 'All' && c.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      if (!c.title.toLowerCase().includes(q) && !c.address.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  // Center coordinates for Chennai South zone
  const defaultCenter: [number, number] = [12.9516, 80.1462]; // Chromepet / Tambaram hub

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: defaultCenter,
        zoom: 12,
        scrollWheelZoom: false
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      const markersGroup = L.layerGroup().addTo(map);
      markersGroupRef.current = markersGroup;
      mapInstanceRef.current = map;
    }

    return () => {
      // cleanup on unmount
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update map markers when complaints or filters change
  useEffect(() => {
    if (!mapInstanceRef.current || !markersGroupRef.current) return;

    markersGroupRef.current.clearLayers();

    mapComplaints.forEach((c) => {
      const getPinColor = (status: ComplaintStatus) => {
        if (status === 'Resolved') return '#16a34a';
        if (status === 'In Progress') return '#ea580c';
        if (status === 'Verified' || status === 'Assigned') return '#3478C5';
        return '#d97706';
      };

      const pinColor = getPinColor(c.status);

      const customIcon = L.divIcon({
        className: 'custom-map-marker',
        html: `
          <div style="
            background-color: ${pinColor};
            width: 32px;
            height: 32px;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            display: flex;
            align-items: center;
            justify-content: center;
            border: 2px solid white;
            box-shadow: 0 4px 6px rgba(0,0,0,0.3);
            cursor: pointer;
          ">
            <div style="
              width: 12px;
              height: 12px;
              background-color: white;
              border-radius: 50%;
              transform: rotate(45deg);
            "></div>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
      });

      const marker = L.marker([c.latitude, c.longitude], { icon: customIcon });

      marker.on('click', () => {
        setSelectedPinComplaint(c);
      });

      markersGroupRef.current?.addLayer(marker);
    });
  }, [mapComplaints]);

  // Center map on selected locality
  const handleLocalityChange = (loc: string) => {
    setSelectedLocality(loc);
    const localityCoords: Record<string, [number, number]> = {
      'Tambaram': [12.9249, 80.1197],
      'Chromepet': [12.9516, 80.1462],
      'Pallavaram': [12.9675, 80.1491],
      'Velachery': [12.9815, 80.2180],
      'Guindy': [13.0067, 80.2026],
      'Anna Nagar': [13.0850, 80.2101],
      'Chennai': [13.0827, 80.2707],
    };

    if (mapInstanceRef.current && localityCoords[loc]) {
      mapInstanceRef.current.flyTo(localityCoords[loc], 13);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 text-left">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F5EE] text-[#176B50] font-semibold text-xs border border-[#c8e7d7]">
            <MapPin className="w-3.5 h-3.5" />
            <span>Geospatial Civic Intelligence</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Explore Local Issues & Interactive Map
          </h1>
          <p className="text-xs text-slate-500">
            OpenStreetMap visualization of verified public complaints across Chennai localities.
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-xs bg-white p-2.5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span>Pending</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            <span>Verified</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
            <span>In Progress</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
            <span>Resolved</span>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search neighborhood, street, or issue description..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#176B50]"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto flex-wrap">
          <select
            value={selectedLocality}
            onChange={(e) => handleLocalityChange(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white text-slate-800"
          >
            {LOCALITIES.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white text-slate-800"
          >
            <option value="All Categories">All Categories</option>
            {CATEGORIES.map((c) => (
              <option key={c.name} value={c.name}>{c.name}</option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white text-slate-800"
          >
            <option value="All">All Statuses</option>
            <option value="Submitted">Submitted</option>
            <option value="Under Review">Under Review</option>
            <option value="Verified">Verified</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>
      </div>

      {/* Map & Detail Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Map Container (8 cols) */}
        <div className="lg:col-span-8 bg-white p-3 rounded-2xl border border-slate-200 shadow-xs h-[500px] sm:h-[600px] relative overflow-hidden">
          <div ref={mapContainerRef} className="w-full h-full rounded-xl" />
          <span className="absolute bottom-5 right-5 z-20 bg-white/90 backdrop-blur-xs text-[10px] text-slate-500 px-2 py-1 rounded shadow-xs">
            Showing {mapComplaints.length} public grievances
          </span>
        </div>

        {/* Selected Complaint Pin Preview Card (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {selectedPinComplaint ? (
            <div className="bg-white p-6 rounded-2xl border-2 border-emerald-200 shadow-md space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono font-bold text-[#176B50] bg-[#E8F5EE] px-2.5 py-1 rounded-md">
                  {selectedPinComplaint.id}
                </span>
                <span className="font-bold text-xs uppercase px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800">
                  {selectedPinComplaint.status}
                </span>
              </div>

              <h3 className="font-bold text-base text-slate-900 leading-snug">
                {selectedPinComplaint.title}
              </h3>

              <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                {selectedPinComplaint.description}
              </p>

              {/* Photo preview */}
              {selectedPinComplaint.photos && selectedPinComplaint.photos.length > 0 && (
                <div className="rounded-xl overflow-hidden h-36 border border-slate-200">
                  <img
                    src={selectedPinComplaint.photos[0]}
                    alt={selectedPinComplaint.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="space-y-1.5 text-xs text-slate-500 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-1.5 font-medium text-slate-700">
                  <MapPin className="w-3.5 h-3.5 text-[#176B50]" />
                  <span>{selectedPinComplaint.address}</span>
                </div>
                <div className="flex items-center justify-between text-xs pt-1">
                  <span>Backers: <strong className="text-[#176B50]">{selectedPinComplaint.supportCount} citizens</strong></span>
                  <span className="text-[11px] text-slate-400">{new Date(selectedPinComplaint.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedComplaintId(selectedPinComplaint.id);
                    setActiveTab('track');
                  }}
                  className="w-full py-2.5 rounded-xl bg-[#176B50] hover:bg-[#11533e] text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Track Full Timeline</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => supportComplaint(selectedPinComplaint.id)}
                  className="w-full py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <HeartHandshake className="w-4 h-4 text-[#176B50]" />
                  <span>
                    {selectedPinComplaint.supportedByUserIds.includes(currentUser.id)
                      ? 'Supported Issue ✓'
                      : 'Support this Grievance'}
                  </span>
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs text-center text-slate-400 text-xs space-y-3">
              <MapPin className="w-8 h-8 text-slate-300 mx-auto" />
              <p>Click on any pin on the map to inspect issue details, view evidence photos, and track resolution.</p>
            </div>
          )}

          {/* Quick List of Localities */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2 text-xs">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700 mb-2">
              Browse by Localities
            </h4>
            <div className="grid grid-cols-2 gap-1.5">
              {LOCALITIES.filter(l => l !== 'All Localities').map((loc) => {
                const count = complaints.filter(c => c.locality === loc && c.visibility !== 'private').length;
                return (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => handleLocalityChange(loc)}
                    className="p-2 rounded-lg bg-slate-50 hover:bg-[#E8F5EE] hover:text-[#176B50] text-left transition-colors text-xs font-semibold flex items-center justify-between"
                  >
                    <span>{loc}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

