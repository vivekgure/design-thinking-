import fs from 'fs';
import path from 'path';

// City coordinates mapping for Pan-India automatic geo-referencing
export const INDIA_COORDINATES = {
  'Delhi NCR': [28.6139, 77.2090],
  'Mumbai': [19.0760, 72.8777],
  'Bengaluru': [12.9716, 77.5946],
  'Hyderabad': [17.3850, 78.4867],
  'Chennai': [13.0827, 80.2707],
  'Kolkata': [22.5726, 88.3639],
  'Pune': [18.5204, 73.8567],
  'Ahmedabad': [23.0225, 72.5714],
  'Jaipur': [26.9124, 75.7873],
  'Lucknow': [26.8467, 80.9462],
  'Kochi': [9.9312, 76.2673],
  'Chandigarh': [30.7333, 76.7794],
  'Bhopal': [23.2599, 77.4126],
  'Guwahati': [26.1445, 91.7362],
  'Tambaram': [12.9249, 80.1197],
  'Chromepet': [12.9516, 80.1462],
  'Pallavaram': [12.9675, 80.1491],
  'Velachery': [12.9815, 80.2180],
};

// Initial demonstration grievances spanning all of India
const SEED_COMPLAINTS = [
  {
    id: 'VX-2026-1042',
    title: 'Severe Garbage Accumulation & Open Dumping Near Tambaram Railway Station East',
    description: 'Massive overflow of non-segregated household and commercial waste piling onto the pedestrian pathway outside Tambaram East railway station. Stagnant runoff is causing severe foul odors and attracting stray animals. Pedestrians are forced to walk onto the busy vehicular road.',
    category: 'Garbage Accumulation',
    locality: 'Tambaram',
    address: 'GST Road Exit, Tambaram East Railway Station, Chennai 600059',
    latitude: 12.9249,
    longitude: 80.1197,
    visibility: 'public',
    status: 'In Progress',
    createdAt: '2026-10-24T09:30:00Z',
    updatedAt: '2026-11-04T14:15:00Z',
    userId: 'user-citizen-1',
    userDisplayName: 'Priya Sundaram',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    photos: [
      'https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800&auto=format&fit=crop&q=80'
    ],
    assignedDepartment: 'GCC Solid Waste Management',
    assignedOfficer: 'Thiru M. Balaji (AE, Zone XIV)',
    officialRemarks: 'Site inspection conducted on Oct 26. Initial mechanized clearing executed. Partnered with Green Earth Chennai NGO under civic collaboration scheme for sustainable bin infrastructure and daily monitoring.',
    supportCount: 48,
    supportedByUserIds: ['user-citizen-2', 'user-ngo-1', 'user-admin-1'],
    linkedPostId: 'post-1',
    linkedProjectId: 'project-1'
  },
  {
    id: 'VX-2026-1088',
    title: 'Overflowing Sewage & Broken Drainage Pipeline on Chromepet Station Road',
    description: 'Underground sewerage line has fractured near the busy market junction on Chromepet Station Road. Dark sewage is flooding into local storefronts and creating a critical health hazard with mosquito breeding.',
    category: 'Drainage Problems',
    locality: 'Chromepet',
    address: 'Station Road Junction, near Chromepet Bus Stand, Chennai 600044',
    latitude: 12.9516,
    longitude: 80.1462,
    visibility: 'public',
    status: 'Assigned',
    createdAt: '2026-11-01T11:20:00Z',
    updatedAt: '2026-11-05T16:00:00Z',
    userId: 'user-citizen-2',
    userDisplayName: 'Karthik Raja',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    photos: [
      'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?w=800&auto=format&fit=crop&q=80'
    ],
    assignedDepartment: 'Chennai Metro Water & Sewerage (CMWSSB)',
    assignedOfficer: 'Er. S. Venkatraman (Area Engineer)',
    officialRemarks: 'Work order #CMWSSB-2026-89 issued. High-pressure jetting machine dispatched. Trench work scheduled for overnight maintenance to minimize traffic bottleneck.',
    supportCount: 34,
    supportedByUserIds: ['user-citizen-1'],
    linkedPostId: 'post-2'
  },
  {
    id: 'VX-2026-2101',
    title: 'Severe Particulate Smog & Unregulated Open Plastic Burning near Anand Vihar ISBT',
    description: 'Hazardous air quality spikes (AQI 420+) caused by commercial open waste incineration and heavy interstate bus idling without emission filtration. Residents experiencing severe respiratory distress.',
    category: 'Air Pollution',
    locality: 'Delhi NCR',
    address: 'Road No. 56, Anand Vihar ISBT Terminal Gate 3, East Delhi 110092',
    latitude: 28.6469,
    longitude: 77.3160,
    visibility: 'public',
    status: 'In Progress',
    createdAt: '2026-10-28T07:15:00Z',
    updatedAt: '2026-11-06T15:20:00Z',
    userId: 'user-citizen-delhi',
    userDisplayName: 'Amit Sharma',
    userAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    photos: [
      'https://images.unsplash.com/photo-1579245486065-224683c34a2e?w=800&auto=format&fit=crop&q=80'
    ],
    assignedDepartment: 'Tamil Nadu Pollution Control Board (TNPCB)',
    assignedOfficer: 'DPCC Environmental Enforcement Inspector S. Verma',
    officialRemarks: 'Anti-smog guns deployed on Road 56. Night thermal patrolling initiated to penalize illegal dumping.',
    supportCount: 128,
    supportedByUserIds: ['user-citizen-delhi', 'user-admin-1'],
    linkedPostId: 'post-delhi-1'
  },
  {
    id: 'VX-2026-2201',
    title: 'Plastic Debris Bottleneck & Stagnant Stormwater Overflow on Mithi River BKC Connector',
    description: 'Massive single-use plastic accumulations obstructing the flow of Mithi River beneath the BKC bridge. High tide causes toxic black runoff to back up into public cycling tracks and transit lanes.',
    category: 'Drainage Problems',
    locality: 'Mumbai',
    address: 'Mithi River Bridge, Near BKC Connector, Bandra Kurla Complex, Mumbai 400051',
    latitude: 19.0657,
    longitude: 72.8687,
    visibility: 'public',
    status: 'In Progress',
    createdAt: '2026-10-30T14:45:00Z',
    updatedAt: '2026-11-05T18:00:00Z',
    userId: 'user-citizen-mumbai',
    userDisplayName: 'Sneha Patil',
    userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    photos: [
      'https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=800&auto=format&fit=crop&q=80'
    ],
    assignedDepartment: 'GCC Solid Waste Management',
    assignedOfficer: 'MCGM Stormwater Chief Engineer R. Gokhale',
    officialRemarks: 'Trash-skimmer boat operating 6 hours daily. Mumbai Waterfronts Action Network NGO deploying floating boom barrier.',
    supportCount: 142,
    supportedByUserIds: ['user-citizen-mumbai', 'user-admin-1'],
    linkedPostId: 'post-mumbai-1'
  },
  {
    id: 'VX-2026-2301',
    title: 'Toxic Chemical Foam Eruption & Weed Choking at Bellandur Lake Outflow',
    description: 'White chemical foam billowing 8 feet high over the outflow weir and drifting across pedestrian pathways on Yemalur road. Severe foul odor and eye irritation reported by residents in nearby tech parks.',
    category: 'Water Pollution',
    locality: 'Bengaluru',
    address: 'Yemalur-Bellandur Lake Spillway, Outer Ring Road corridor, Bengaluru 560037',
    latitude: 12.9352,
    longitude: 77.6784,
    visibility: 'public',
    status: 'In Progress',
    createdAt: '2026-10-26T11:00:00Z',
    updatedAt: '2026-11-04T16:30:00Z',
    userId: 'user-citizen-blr',
    userDisplayName: 'Rahul Hegde',
    userAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    photos: [
      'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?w=800&auto=format&fit=crop&q=80'
    ],
    assignedDepartment: 'Tamil Nadu Pollution Control Board (TNPCB)',
    assignedOfficer: 'KSPCB Environmental Officer N. Swamy',
    officialRemarks: 'Continuous aeration pumps running. Co-partnering with Bengaluru Lakes & Civic Forum to remove invasive hyacinth.',
    supportCount: 167,
    supportedByUserIds: ['user-citizen-blr', 'user-admin-1'],
    linkedPostId: 'post-blr-1'
  },
  {
    id: 'VX-2026-2401',
    title: 'Untreated Raw Sewage Inflow & Water Hyacinth Proliferation in Musi Riverbed',
    description: 'Black water effluent pouring from open stormwater inlets into Musi river near Nayapul. Dense mosquito breeding and foul odor covering the historic bazaar belt in Old City.',
    category: 'Water Pollution',
    locality: 'Hyderabad',
    address: 'Nayapul Bridge, Near Salar Jung Museum, Old City, Hyderabad 500002',
    latitude: 17.3616,
    longitude: 78.4747,
    visibility: 'public',
    status: 'Under Review',
    createdAt: '2026-10-29T13:00:00Z',
    updatedAt: '2026-11-05T11:20:00Z',
    userId: 'user-citizen-1',
    userDisplayName: 'Ananya Reddy',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    photos: [
      'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=800&auto=format&fit=crop&q=80'
    ],
    assignedDepartment: 'Chennai Metro Water & Sewerage (CMWSSB)',
    officialRemarks: 'HMWSSB sewerage diversion plan under engineering survey.',
    supportCount: 85,
    supportedByUserIds: ['user-citizen-1'],
    linkedPostId: 'post-hyd-1'
  },
  {
    id: 'VX-2026-2501',
    title: 'Solid Waste Piling and Plastic Clogging along Adi Ganga (Tolly’s Nullah) Embankment',
    description: 'Severe accumulation of uncollected household waste, clay idols remnants, and polythene blocking the historic tidal canal. Stagnant brackish water causing health risks for surrounding neighborhoods.',
    category: 'Waste Management',
    locality: 'Kolkata',
    address: 'Kalighat Bridge Bank, Tolly’s Nullah Embankment, South Kolkata 700026',
    latitude: 22.5186,
    longitude: 88.3426,
    visibility: 'public',
    status: 'In Progress',
    createdAt: '2026-10-27T10:15:00Z',
    updatedAt: '2026-11-04T14:40:00Z',
    userId: 'user-citizen-2',
    userDisplayName: 'Sourav Chatterjee',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    photos: [
      'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800&auto=format&fit=crop&q=80'
    ],
    assignedDepartment: 'GCC Solid Waste Management',
    assignedOfficer: 'KMC Solid Waste Borough VIII Team',
    officialRemarks: 'Mechanical dredging excavator mobilized. Bio-retaining nets installed at two bridges.',
    supportCount: 92,
    supportedByUserIds: ['user-citizen-2'],
    linkedPostId: 'post-kol-1'
  }
];

const SEED_REFERRALS = [
  {
    id: 'REF-2026-8901',
    complaintId: 'VX-2026-1042',
    complaintTitle: 'Severe Garbage Accumulation & Open Dumping Near Tambaram Railway Station East',
    complainantName: 'Priya Sundaram',
    locality: 'Tambaram',
    referredBy: 'Dr. R. Arumugam, IAS',
    referredByRole: 'government',
    targetDepartment: 'GCC Solid Waste Management',
    targetAgency: 'Green Earth Chennai NGO',
    priority: 'Urgent',
    actionMandate: 'Immediate mechanized waste clearance, installation of 4 compactor bins, and daily monitoring with NGO partnership.',
    status: 'Action Initiated',
    createdAt: '2026-10-25T11:00:00Z',
    officialDocketNumber: 'DOK-GCC-2026-4402'
  },
  {
    id: 'REF-2026-8902',
    complaintId: 'VX-2026-2101',
    complaintTitle: 'Severe Particulate Smog & Unregulated Open Plastic Burning near Anand Vihar ISBT',
    complainantName: 'Amit Sharma',
    locality: 'Delhi NCR',
    referredBy: 'Zonal Municipal Directorate',
    referredByRole: 'admin',
    targetDepartment: 'State Pollution Control Board',
    targetAgency: 'Clean Air & Yamuna Taskforce',
    priority: 'Urgent',
    actionMandate: 'Deploy water mist cannons, enforce night patrolling for illegal burning, and inspect emission filters on interstate buses.',
    status: 'Action Initiated',
    createdAt: '2026-10-29T09:30:00Z',
    officialDocketNumber: 'DOK-DPCC-2026-9011'
  },
  {
    id: 'REF-2026-8903',
    complaintId: 'VX-2026-2301',
    complaintTitle: 'Toxic Chemical Foam Eruption & Weed Choking at Bellandur Lake Outflow',
    complainantName: 'Rahul Hegde',
    locality: 'Bengaluru',
    referredBy: 'Municipal Commissioner Office',
    referredByRole: 'government',
    targetDepartment: 'State Pollution Control Board',
    targetAgency: 'Bengaluru Lakes & Civic Forum',
    priority: 'High',
    actionMandate: 'Run bio-aeration pumps, clear floating water hyacinth, and seal unauthorized industrial chemical drainage pipes.',
    status: 'Pending',
    createdAt: '2026-10-27T14:15:00Z',
    officialDocketNumber: 'DOK-KSPCB-2026-3190'
  }
];

class DatabaseManager {
  constructor() {
    this.memoryDb = {
      complaints: [...SEED_COMPLAINTS],
      referrals: [...SEED_REFERRALS],
      posts: []
    };
    this.storageFile = this.resolveStoragePath();
    this.load();
  }

  resolveStoragePath() {
    // If in Vercel serverless environment, write to /tmp
    if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) {
      return path.join('/tmp', 'voxly_database.json');
    }
    // Local development storage in ./data directory
    const dir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dir)) {
      try {
        fs.mkdirSync(dir, { recursive: true });
      } catch {
        // ignore
      }
    }
    return path.join(dir, 'database.json');
  }

  load() {
    try {
      if (fs.existsSync(this.storageFile)) {
        const raw = fs.readFileSync(this.storageFile, 'utf-8');
        const parsed = JSON.parse(raw);
        if (parsed.complaints && Array.isArray(parsed.complaints)) {
          this.memoryDb.complaints = parsed.complaints;
        }
        if (parsed.referrals && Array.isArray(parsed.referrals)) {
          this.memoryDb.referrals = parsed.referrals;
        }
        if (parsed.posts && Array.isArray(parsed.posts)) {
          this.memoryDb.posts = parsed.posts;
        }
      } else {
        this.save();
      }
    } catch (err) {
      console.warn('[DB] Failed to load from file, using in-memory dataset:', err.message);
    }
  }

  save() {
    try {
      fs.writeFileSync(this.storageFile, JSON.stringify(this.memoryDb, null, 2), 'utf-8');
    } catch (err) {
      // In serverless read-only contexts where /tmp fails, keep in memory
      console.warn('[DB] Persistent disk write failed (retained in memory):', err.message);
    }
  }

  // --- Complaints API ---

  getComplaints(filters = {}) {
    let result = [...this.memoryDb.complaints];

    if (filters.locality && filters.locality !== 'All India' && filters.locality !== 'All Localities') {
      result = result.filter(c => c.locality.toLowerCase() === filters.locality.toLowerCase());
    }

    if (filters.category && filters.category !== 'All Categories') {
      result = result.filter(c => c.category === filters.category);
    }

    if (filters.status && filters.status !== 'All') {
      result = result.filter(c => c.status === filters.status);
    }

    if (filters.visibility) {
      result = result.filter(c => c.visibility === filters.visibility);
    }

    if (filters.q || filters.search) {
      const q = (filters.q || filters.search).toLowerCase().trim();
      result = result.filter(c =>
        c.id.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.address.toLowerCase().includes(q) ||
        c.locality.toLowerCase().includes(q) ||
        (c.userDisplayName && c.userDisplayName.toLowerCase().includes(q))
      );
    }

    // Default newest first
    result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return result;
  }

  getComplaintById(id) {
    if (!id) return null;
    const cleanId = id.trim().toUpperCase();
    return this.memoryDb.complaints.find(c => c.id.toUpperCase() === cleanId) || null;
  }

  createComplaint(data) {
    if (!data.title || !data.description || !data.locality) {
      throw new Error('Title, description, and locality are required.');
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const complaintId = `VX-2026-${randomSuffix}`;
    const timestamp = new Date().toISOString();

    const [defaultLat, defaultLng] = INDIA_COORDINATES[data.locality] || [20.5937, 78.9629];
    const lat = data.latitude || (defaultLat + (Math.random() * 0.01 - 0.005));
    const lng = data.longitude || (defaultLng + (Math.random() * 0.01 - 0.005));

    const newComplaint = {
      id: complaintId,
      title: data.title.trim(),
      description: data.description.trim(),
      category: data.category || 'General Discussion',
      locality: data.locality,
      address: data.address ? data.address.trim() : `${data.locality}, India`,
      latitude: Number(lat.toFixed(6)),
      longitude: Number(lng.toFixed(6)),
      visibility: data.visibility || 'public',
      status: 'Submitted',
      createdAt: timestamp,
      updatedAt: timestamp,
      userId: data.userId || 'user-citizen-1',
      userDisplayName: data.visibility === 'anonymous' ? 'Anonymous Citizen' : (data.userDisplayName || 'Verified Citizen'),
      userAvatar: data.visibility === 'anonymous'
        ? 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
        : (data.userAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'),
      photos: Array.isArray(data.photos) ? data.photos : [],
      assignedDepartment: data.suggestedDepartment || data.assignedDepartment || undefined,
      assignedOfficer: undefined,
      officialRemarks: 'Complaint received and recorded into the national civic registry. Pending departmental review.',
      supportCount: 1,
      supportedByUserIds: [data.userId || 'user-citizen-1'],
      linkedPostId: undefined
    };

    // Auto-create linked public community post if not private
    if (newComplaint.visibility !== 'private') {
      const postId = `post-${Date.now()}`;
      newComplaint.linkedPostId = postId;

      this.memoryDb.posts.unshift({
        id: postId,
        title: newComplaint.title,
        content: newComplaint.description,
        category: newComplaint.category,
        locality: newComplaint.locality,
        userId: newComplaint.userId,
        userDisplayName: newComplaint.userDisplayName,
        userAvatar: newComplaint.userAvatar,
        userRole: 'citizen',
        isAnonymous: newComplaint.visibility === 'anonymous',
        createdAt: timestamp,
        photos: newComplaint.photos,
        upvotes: 1,
        downvotes: 0,
        commentCount: 0,
        linkedComplaintId: newComplaint.id,
        complaintStatus: 'Submitted'
      });
    }

    this.memoryDb.complaints.unshift(newComplaint);
    this.save();
    return newComplaint;
  }

  updateComplaint(id, updates = {}) {
    const complaint = this.getComplaintById(id);
    if (!complaint) return null;

    if (updates.status) complaint.status = updates.status;
    if (updates.officialRemarks) complaint.officialRemarks = updates.officialRemarks;
    if (updates.assignedDepartment) complaint.assignedDepartment = updates.assignedDepartment;
    if (updates.assignedOfficer) complaint.assignedOfficer = updates.assignedOfficer;
    if (updates.resolutionEvidencePhotos) {
      complaint.resolutionEvidencePhotos = updates.resolutionEvidencePhotos;
      complaint.resolvedAt = new Date().toISOString();
    }
    complaint.updatedAt = new Date().toISOString();

    this.save();
    return complaint;
  }

  supportComplaint(id, userId = 'user-citizen-1') {
    const complaint = this.getComplaintById(id);
    if (!complaint) return null;

    if (!complaint.supportedByUserIds.includes(userId)) {
      complaint.supportedByUserIds.push(userId);
      complaint.supportCount += 1;
    } else {
      complaint.supportedByUserIds = complaint.supportedByUserIds.filter(uid => uid !== userId);
      complaint.supportCount = Math.max(0, complaint.supportCount - 1);
    }
    complaint.updatedAt = new Date().toISOString();

    this.save();
    return complaint;
  }

  // --- Referrals API (Refer complaints to departments & NGOs) ---

  getReferrals(filters = {}) {
    let result = [...this.memoryDb.referrals];
    if (filters.complaintId) {
      result = result.filter(r => r.complaintId.toUpperCase() === filters.complaintId.trim().toUpperCase());
    }
    if (filters.targetDepartment) {
      result = result.filter(r => r.targetDepartment.toLowerCase().includes(filters.targetDepartment.toLowerCase()));
    }
    if (filters.priority) {
      result = result.filter(r => r.priority === filters.priority);
    }
    result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return result;
  }

  createReferral({
    complaintId,
    referredBy = 'Municipal Administrative Cell',
    referredByRole = 'government',
    targetDepartment,
    targetAgency,
    priority = 'High',
    actionMandate
  }) {
    const complaint = this.getComplaintById(complaintId);
    if (!complaint) {
      throw new Error(`Cannot refer: Complaint with ID ${complaintId} was not found.`);
    }

    const refNum = Math.floor(1000 + Math.random() * 9000);
    const referralId = `REF-2026-${refNum}`;
    const prefix = targetDepartment ? targetDepartment.slice(0, 4).toUpperCase().replace(/[^A-Z]/g, '') : 'CIV';
    const docketNumber = `DOK-${prefix}-2026-${refNum}`;
    const timestamp = new Date().toISOString();

    const referral = {
      id: referralId,
      complaintId: complaint.id,
      complaintTitle: complaint.title,
      complainantName: complaint.userDisplayName,
      locality: complaint.locality,
      referredBy,
      referredByRole,
      targetDepartment: targetDepartment || 'Municipal Inspection Wing',
      targetAgency: targetAgency || undefined,
      priority,
      actionMandate: actionMandate || 'Site verification and corrective civic action mandated within departmental SLAs.',
      status: 'Action Initiated',
      createdAt: timestamp,
      officialDocketNumber: docketNumber
    };

    this.memoryDb.referrals.unshift(referral);

    // Update parent complaint
    this.updateComplaint(complaint.id, {
      status: complaint.status === 'Submitted' ? 'Assigned' : complaint.status,
      assignedDepartment: targetDepartment,
      officialRemarks: `Referred under Docket ${docketNumber} to ${targetDepartment}. Mandate: ${referral.actionMandate}`
    });

    this.save();
    return referral;
  }

  // --- Statistics ---

  getStats() {
    const total = this.memoryDb.complaints.length;
    const resolved = this.memoryDb.complaints.filter(c => c.status === 'Resolved').length;
    const inProgress = this.memoryDb.complaints.filter(c => c.status === 'In Progress' || c.status === 'Assigned').length;
    const cities = new Set(this.memoryDb.complaints.map(c => c.locality)).size;
    const referrals = this.memoryDb.referrals.length;

    return {
      totalComplaints: total,
      resolvedComplaints: resolved,
      inProgressComplaints: inProgress,
      activeCitiesCount: cities,
      totalReferrals: referrals,
      statusBreakdown: {
        submitted: this.memoryDb.complaints.filter(c => c.status === 'Submitted').length,
        underReview: this.memoryDb.complaints.filter(c => c.status === 'Under Review').length,
        verified: this.memoryDb.complaints.filter(c => c.status === 'Verified').length,
        assigned: this.memoryDb.complaints.filter(c => c.status === 'Assigned').length,
        inProgress: inProgress,
        resolved: resolved
      }
    };
  }
}

// Export singleton database instance
export const db = new DatabaseManager();
