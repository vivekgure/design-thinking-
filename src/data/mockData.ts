import {
  UserProfile,
  Complaint,
  CommunityPost,
  PostComment,
  Organisation,
  CollaborationProposal,
  NgoProject,
  AppNotification
} from '../types';

export const INITIAL_USERS: UserProfile[] = [
  {
    id: 'user-citizen-1',
    name: 'Priya Sundaram',
    email: 'priya.sundaram@gmail.com',
    role: 'citizen',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    locality: 'Tambaram',
    badges: ['Active Resident', 'Civic Champion', 'Verified Neighbor'],
    reputation: 340,
  },
  {
    id: 'user-citizen-2',
    name: 'Karthik Raja',
    email: 'karthik.raja@outlook.com',
    role: 'citizen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    locality: 'Chromepet',
    badges: ['Community Watch', 'Top Contributor'],
    reputation: 215,
  },
  {
    id: 'user-gov-1',
    name: 'Dr. R. Arumugam, IAS',
    email: 'arumugam.gov@chennaicorporation.gov.in',
    role: 'government',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    locality: 'Chennai',
    departmentId: 'Greater Chennai Corporation',
    badges: ['Zonal Officer', 'Verified Official', 'GCC Executive'],
    reputation: 980,
  },
  {
    id: 'user-ngo-1',
    name: 'Kavitha Narayanan',
    email: 'kavitha@greenearthchennai.org',
    role: 'ngo',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    locality: 'Pallavaram',
    organisationId: 'ngo-1',
    badges: ['NGO Director', 'Green Earth Lead', 'CSR Partner'],
    reputation: 750,
  },
  {
    id: 'user-admin-1',
    name: 'Vikram Ramanathan',
    email: 'admin@voxly.community',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    locality: 'Chennai',
    badges: ['Platform Admin', 'Design Thinking Lead'],
    reputation: 1200,
  }
];

export const INITIAL_ORGANISATIONS: Organisation[] = [
  {
    id: 'ngo-1',
    name: 'Green Earth Chennai',
    type: 'Environmental NGO',
    registrationNumber: 'TN-CH-2018-NGO-4481',
    description: 'A registered civic-action non-profit dedicated to urban lake restoration, solid waste audits, and decentralized composting.',
    website: 'https://greenearthchennai.org',
    contactEmail: 'contact@greenearthchennai.org',
    contactPhone: '+91 94441 23456',
    areasOfOperation: ['Tambaram', 'Chromepet', 'Pallavaram', 'Velachery'],
    previousProjects: [
      'Chromepet Periya Eri lake shoreline cleanup (2024)',
      'Community composting drive in Tambaram Sanatorium (2025)'
    ],
    isVerified: true,
    logo: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=120&auto=format&fit=crop&q=80',
    establishedYear: 2018,
    activeProjectsCount: 2,
    completedProjectsCount: 14,
  },
  {
    id: 'ngo-2',
    name: 'Clean Chennai Coalition',
    type: 'Waste Management Organisation',
    registrationNumber: 'TN-CH-2020-CS-9182',
    description: 'Citizen-powered waste segregation and circular recycling advocacy coalition working alongside municipal workers.',
    website: 'https://cleanchennaicoalition.org',
    contactEmail: 'info@cleanchennaicoalition.org',
    contactPhone: '+91 98402 87654',
    areasOfOperation: ['Chennai', 'Guindy', 'Adyar', 'T. Nagar'],
    previousProjects: [
      'Zero-waste market pilot at Chromepet Station market',
      'Electronic waste doorstep collection campaign'
    ],
    isVerified: true,
    logo: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=120&auto=format&fit=crop&q=80',
    establishedYear: 2020,
    activeProjectsCount: 1,
    completedProjectsCount: 9,
  },
  {
    id: 'ngo-3',
    name: 'Yuva Welfare Trust',
    type: 'Social Welfare Organisation',
    registrationNumber: 'TN-SW-2019-TR-3012',
    description: 'Empowering local youth to participate in community infrastructure rehabilitation, school street-art, and public road safety.',
    website: 'https://yuvawelfaretrust.org',
    contactEmail: 'connect@yuvawelfare.org',
    contactPhone: '+91 97910 11223',
    areasOfOperation: ['Pallavaram', 'Tambaram', 'Meenambakkam'],
    previousProjects: [
      'Streetlight audit and safety survey in Chromepet industrial estate',
      'Pothole marking and citizen petition rally'
    ],
    isVerified: true,
    logo: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=120&auto=format&fit=crop&q=80',
    establishedYear: 2019,
    activeProjectsCount: 1,
    completedProjectsCount: 8,
  }
];

export const INITIAL_COMPLAINTS: Complaint[] = [
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
    id: 'VX-2026-1095',
    title: 'Extensive Crater Potholes & Missing Streetlights on Pallavaram Hill Road',
    description: 'Over 25 large craters across a 600m stretch. The streetlights have been non-functional for three weeks. Multiple two-wheeler skids and accidents have occurred during the evening commute.',
    category: 'Damaged Roads',
    locality: 'Pallavaram',
    address: 'Pallavaram Hill View Avenue, Near Cantonment Boundary, Chennai 600043',
    latitude: 12.9675,
    longitude: 80.1491,
    visibility: 'anonymous',
    status: 'Verified',
    createdAt: '2026-11-03T18:40:00Z',
    updatedAt: '2026-11-06T10:30:00Z',
    userId: 'user-citizen-1',
    userDisplayName: 'Anonymous Citizen',
    userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    photos: [
      'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=800&auto=format&fit=crop&q=80'
    ],
    assignedDepartment: 'State Highways & Municipal Roads Dept',
    assignedOfficer: 'Divisional Engineer K. Murugan',
    officialRemarks: 'Complaint verified by municipal field inspector. Road surface categorized as urgent high-priority repair. Patching works tender approved.',
    supportCount: 62,
    supportedByUserIds: ['user-citizen-2', 'user-ngo-1'],
    linkedPostId: 'post-3'
  },
  {
    id: 'VX-2026-1102',
    title: 'Industrial Effluent Discharge into Keelkattalai Lake Wetland',
    description: 'Chemical dye runoff observed entering Keelkattalai surplus canal around late midnight hours. Water turns frothy purple with chemical stench affecting resident breathing in surrounding colonies.',
    category: 'Water Pollution',
    locality: 'Pallavaram',
    address: 'Keelkattalai Lake Eastern Feeder Channel, Chennai 600117',
    latitude: 12.9582,
    longitude: 80.1786,
    visibility: 'public',
    status: 'Under Review',
    createdAt: '2026-11-05T08:15:00Z',
    updatedAt: '2026-11-07T09:00:00Z',
    userId: 'user-citizen-1',
    userDisplayName: 'Priya Sundaram',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    photos: [
      'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=800&auto=format&fit=crop&q=80'
    ],
    assignedDepartment: 'Tamil Nadu Pollution Control Board (TNPCB)',
    officialRemarks: 'Environmental squad collected water samples for BOD/COD laboratory testing. Notice to suspect manufacturing units in preparation.',
    supportCount: 79,
    supportedByUserIds: ['user-citizen-2', 'user-ngo-1'],
    linkedPostId: 'post-4'
  },
  {
    id: 'VX-2026-0974',
    title: 'Illegal Sand Encroachment & Debris Dumping on Velachery Lake Bund',
    description: 'Commercial construction debris being dumped on the pedestrian walkway and green buffer zone of Velachery lake. CleanChennai Coalition collaborated with GCC to restore the bank.',
    category: 'Environmental Damage',
    locality: 'Velachery',
    address: 'Lake Bund Road, Velachery West, Chennai 600042',
    latitude: 12.9815,
    longitude: 80.2180,
    visibility: 'public',
    status: 'Resolved',
    createdAt: '2026-09-12T10:00:00Z',
    updatedAt: '2026-10-18T17:30:00Z',
    userId: 'user-citizen-2',
    userDisplayName: 'Karthik Raja',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    photos: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=80'
    ],
    assignedDepartment: 'Parks & Urban Forestry Division',
    assignedOfficer: 'GCC Forest Officer S. Raman',
    officialRemarks: 'Debris completely cleared. 120 native saplings planted along the restored bund. CCTV camera installed at access point.',
    resolutionEvidencePhotos: [
      'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop&q=80'
    ],
    resolvedAt: '2026-10-18T17:30:00Z',
    supportCount: 91,
    supportedByUserIds: ['user-citizen-1', 'user-admin-1'],
    linkedPostId: 'post-5'
  },
  {
    id: 'VX-2026-1120',
    title: 'Confidential Report: Unlicensed Chemical Storage in Residential Cellar',
    description: 'Private safety grievance: Volatile solvent drums stored without firefighting equipment beneath residential apartment block. Risk of fire and fumes.',
    category: 'Public Safety',
    locality: 'Chromepet',
    address: 'Radha Nagar 4th Cross Street, Chromepet, Chennai 600044',
    latitude: 12.9535,
    longitude: 80.1411,
    visibility: 'private', // MUST NOT appear in community feed or NGO views
    status: 'Under Review',
    createdAt: '2026-11-06T14:10:00Z',
    updatedAt: '2026-11-07T11:45:00Z',
    userId: 'user-citizen-2',
    userDisplayName: 'Karthik Raja',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    photos: [],
    assignedDepartment: 'Traffic & Public Safety Wing',
    officialRemarks: 'Confidential notice dispatched to Fire and Rescue Services department for immediate inspection.',
    supportCount: 0,
    supportedByUserIds: []
  }
];

export const INITIAL_POSTS: CommunityPost[] = [
  {
    id: 'post-1',
    title: 'Severe Garbage Accumulation & Open Dumping Near Tambaram Railway Station East',
    content: 'Massive overflow of non-segregated household and commercial waste piling onto the pedestrian pathway outside Tambaram East railway station. Stagnant runoff is causing severe foul odors and attracting stray animals. Pedestrians are forced to walk onto the busy vehicular road.\n\nWe urgently need a community cleanup drive and proper compactor bins installed by GCC.',
    category: 'Garbage Accumulation',
    locality: 'Tambaram',
    userId: 'user-citizen-1',
    userDisplayName: 'Priya Sundaram',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    userRole: 'citizen',
    isAnonymous: false,
    createdAt: '2026-10-24T09:30:00Z',
    photos: [
      'https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800&auto=format&fit=crop&q=80'
    ],
    upvotes: 74,
    downvotes: 2,
    commentCount: 8,
    linkedComplaintId: 'VX-2026-1042',
    complaintStatus: 'In Progress'
  },
  {
    id: 'post-2',
    title: 'Overflowing Sewage & Broken Drainage Pipeline on Chromepet Station Road',
    content: 'Underground sewerage line has fractured near the busy market junction on Chromepet Station Road. Dark sewage is flooding into local storefronts and creating a critical health hazard with mosquito breeding.',
    category: 'Drainage Problems',
    locality: 'Chromepet',
    userId: 'user-citizen-2',
    userDisplayName: 'Karthik Raja',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    userRole: 'citizen',
    isAnonymous: false,
    createdAt: '2026-11-01T11:20:00Z',
    photos: [
      'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?w=800&auto=format&fit=crop&q=80'
    ],
    upvotes: 49,
    downvotes: 1,
    commentCount: 5,
    linkedComplaintId: 'VX-2026-1088',
    complaintStatus: 'Assigned'
  },
  {
    id: 'post-3',
    title: 'Extensive Crater Potholes & Missing Streetlights on Pallavaram Hill Road',
    content: 'Over 25 large craters across a 600m stretch. The streetlights have been non-functional for three weeks. Multiple two-wheeler skids and accidents have occurred during the evening commute.',
    category: 'Damaged Roads',
    locality: 'Pallavaram',
    userId: 'user-citizen-1',
    userDisplayName: 'Anonymous Resident',
    userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    userRole: 'citizen',
    isAnonymous: true,
    createdAt: '2026-11-03T18:40:00Z',
    photos: [
      'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=800&auto=format&fit=crop&q=80'
    ],
    upvotes: 88,
    downvotes: 3,
    commentCount: 11,
    linkedComplaintId: 'VX-2026-1095',
    complaintStatus: 'Verified'
  },
  {
    id: 'post-4',
    title: 'Industrial Effluent Discharge into Keelkattalai Lake Wetland',
    content: 'Chemical dye runoff observed entering Keelkattalai surplus canal around late midnight hours. Water turns frothy purple with chemical stench affecting resident breathing in surrounding colonies.',
    category: 'Water Pollution',
    locality: 'Pallavaram',
    userId: 'user-citizen-1',
    userDisplayName: 'Priya Sundaram',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    userRole: 'citizen',
    isAnonymous: false,
    createdAt: '2026-11-05T08:15:00Z',
    photos: [
      'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=800&auto=format&fit=crop&q=80'
    ],
    upvotes: 112,
    downvotes: 0,
    commentCount: 14,
    linkedComplaintId: 'VX-2026-1102',
    complaintStatus: 'Under Review'
  },
  {
    id: 'post-5',
    title: 'Resolved: Debris Cleared & 120 Native Trees Planted at Velachery Lake Bund!',
    content: 'Huge victory for our community! After continuous tracking on VOXLY, CleanChennai Coalition and Greater Chennai Corporation restored the entire eastern bund. The illegal dumping has stopped and native tree saplings are thriving.',
    category: 'Environmental Damage',
    locality: 'Velachery',
    userId: 'user-citizen-2',
    userDisplayName: 'Karthik Raja',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    userRole: 'citizen',
    isAnonymous: false,
    createdAt: '2026-10-19T09:00:00Z',
    photos: [
      'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop&q=80'
    ],
    upvotes: 165,
    downvotes: 1,
    commentCount: 9,
    linkedComplaintId: 'VX-2026-0974',
    complaintStatus: 'Resolved'
  },
  {
    id: 'post-6',
    title: 'Community Proposal: Solar Powered Streetlights for Pallavaram Footpaths',
    content: 'Discussion thread: Many residential lanes connecting to the train station remain dark because of underground cable faults. What if the resident welfare association partners with Yuva Welfare Trust to pilot solar streetlights?',
    category: 'Community Suggestions',
    locality: 'Pallavaram',
    userId: 'user-ngo-1',
    userDisplayName: 'Kavitha Narayanan',
    userAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    userRole: 'ngo',
    isAnonymous: false,
    createdAt: '2026-11-06T15:30:00Z',
    photos: [],
    upvotes: 38,
    downvotes: 0,
    commentCount: 4
  }
];

export const INITIAL_COMMENTS: PostComment[] = [
  {
    id: 'c-1',
    postId: 'post-1',
    userId: 'user-ngo-1',
    userDisplayName: 'Kavitha Narayanan (Green Earth)',
    userAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    userRole: 'ngo',
    content: 'Our NGO has surveyed this spot today. We have submitted an official Collaboration Proposal to the Zonal Officer to deploy 4 segregated metal compactor bins and organize weekend volunteer shifts to educate station-side vendors.',
    createdAt: '2026-10-25T11:00:00Z',
    upvotes: 24,
    downvotes: 0
  },
  {
    id: 'c-2',
    postId: 'post-1',
    userId: 'user-gov-1',
    userDisplayName: 'Dr. R. Arumugam, IAS (GCC)',
    userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    userRole: 'government',
    content: 'Official Update: The Greater Chennai Corporation has reviewed and approved Green Earth’s proposal. Heavy mechanical sweepers cleared 8.5 metric tons of accumulated waste this morning. Status updated to In Progress.',
    createdAt: '2026-10-26T14:30:00Z',
    upvotes: 39,
    downvotes: 0,
    parentId: 'c-1'
  },
  {
    id: 'c-3',
    postId: 'post-1',
    userId: 'user-citizen-2',
    userDisplayName: 'Karthik Raja',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    userRole: 'citizen',
    content: 'This is great news! I commute through Tambaram East every day and the difference is already noticeable. Thank you @Green Earth and GCC!',
    createdAt: '2026-10-27T08:15:00Z',
    upvotes: 12,
    downvotes: 0
  },
  {
    id: 'c-4',
    postId: 'post-4',
    userId: 'user-gov-1',
    userDisplayName: 'Dr. R. Arumugam, IAS (GCC)',
    userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    userRole: 'government',
    content: 'TNPCB flying squad was deployed at 02:00 AM on Nov 6. Two unauthorized dying units upstream have been issued immediate stop-work show cause notices.',
    createdAt: '2026-11-06T12:00:00Z',
    upvotes: 41,
    downvotes: 0
  }
];

export const INITIAL_PROPOSALS: CollaborationProposal[] = [
  {
    id: 'prop-1',
    complaintId: 'VX-2026-1042',
    complaintTitle: 'Severe Garbage Accumulation & Open Dumping Near Tambaram Railway Station East',
    organisationId: 'ngo-1',
    organisationName: 'Green Earth Chennai',
    organisationType: 'Environmental NGO',
    proposedSolution: 'Installation of 4 heavy-gauge color-coded segregation bins, bi-weekly citizen awareness booths, and partnership with local auto-rickshaw union as civic marshals.',
    projectDescription: 'Transform the chronic illegal dumping blackspot into an organized, aesthetically landscaped zero-litter station approach with CCTV warning signs and daily upkeep.',
    resourcesAvailable: '32 registered volunteers, 2 e-loaders, printed Tamil/English awareness boards, bio-enzymes for odor remediation.',
    volunteerRequirement: 25,
    estimatedBudget: 85000,
    expectedDurationWeeks: 4,
    governmentAssistanceRequired: 'GCC permission for bin installation on railway road margin, coordination with Zone XIV compactor truck for twice-daily collection.',
    fundingRequested: 45000,
    fundingApproved: 45000,
    fundingStatus: 'Approved',
    status: 'Approved',
    officialNotes: 'Approved by Zonal Officer Dr. R. Arumugam on Oct 26. Fund allocation released under Ward Sanitation Partnership Scheme.',
    submittedAt: '2026-10-25T10:15:00Z',
    reviewedAt: '2026-10-26T14:00:00Z',
    assignedDepartment: 'GCC Solid Waste Management'
  },
  {
    id: 'prop-2',
    complaintId: 'VX-2026-1095',
    complaintTitle: 'Extensive Crater Potholes & Missing Streetlights on Pallavaram Hill Road',
    organisationId: 'ngo-3',
    organisationName: 'Yuva Welfare Trust',
    organisationType: 'Social Welfare Organisation',
    proposedSolution: 'Cold-mix asphalt temporary pothole filling with reflective safety barricading while formal municipal tender is executed.',
    projectDescription: 'Immediate hazard mitigation to prevent two-wheeler fatalities on the sharp hairpin curves of Pallavaram Hill road.',
    resourcesAvailable: '15 youth volunteers, 40 high-visibility reflective cones, 2 asphalt tampers.',
    volunteerRequirement: 12,
    estimatedBudget: 35000,
    expectedDurationWeeks: 2,
    governmentAssistanceRequired: 'Traffic Police escort during night execution and permission from Municipal Highways wing.',
    fundingRequested: 20000,
    fundingStatus: 'Pending Review',
    status: 'Pending',
    submittedAt: '2026-11-05T16:30:00Z'
  }
];

export const INITIAL_PROJECTS: NgoProject[] = [
  {
    id: 'project-1',
    proposalId: 'prop-1',
    complaintId: 'VX-2026-1042',
    complaintTitle: 'Severe Garbage Accumulation & Open Dumping Near Tambaram Railway Station East',
    organisationId: 'ngo-1',
    organisationName: 'Green Earth Chennai',
    locality: 'Tambaram',
    status: 'In Progress',
    startDate: '2026-10-27',
    targetCompletionDate: '2026-11-24',
    assignedVolunteersCount: 28,
    volunteersList: ['Priya Sundaram', 'M. Saravanan', 'Deepak Nathan', 'S. Meenakshi', 'R. Vignesh'],
    progressPercentage: 65,
    milestones: [
      {
        id: 'm-1',
        title: 'Initial Mechanized Debris Clearance',
        description: 'Joint operation with GCC compactor trucks to remove historical accumulation.',
        date: '2026-10-28',
        completed: true,
        photos: ['https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=600&auto=format&fit=crop&q=80']
      },
      {
        id: 'm-2',
        title: 'Bin Platform Concreting & Installation',
        description: 'Installed 4 heavy-gauge dry/wet segregated bins with anti-litter signage.',
        date: '2026-11-02',
        completed: true,
        photos: ['https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&auto=format&fit=crop&q=80']
      },
      {
        id: 'm-3',
        title: 'Vendor Sensitization & Marshaling Shift',
        description: 'Daily morning and evening briefings with railway station fruit & tea vendors.',
        date: '2026-11-06',
        completed: true
      },
      {
        id: 'm-4',
        title: 'Final Wall Mural Art & CCTV Integration',
        description: 'Civic awareness street-art wall painting and handoff to municipal sanitation staff.',
        date: '2026-11-20',
        completed: false
      }
    ],
    progressReports: [
      {
        id: 'pr-1',
        date: '2026-11-03',
        notes: 'Over 85% reduction in daily ground litter observed since segregated bins were installed. GCC truck now empties bins punctually at 06:00 and 15:00.',
        photos: ['https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&auto=format&fit=crop&q=80'],
        author: 'Kavitha Narayanan (Project Lead)'
      }
    ]
  }
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'n-1',
    userId: 'user-citizen-1',
    title: 'Proposal Approved for Your Complaint',
    message: 'Dr. R. Arumugam, IAS approved Green Earth Chennai’s collaboration proposal for VX-2026-1042.',
    type: 'proposal',
    linkTarget: { type: 'complaint', id: 'VX-2026-1042' },
    createdAt: '2026-10-26T14:05:00Z',
    isRead: false
  },
  {
    id: 'n-2',
    userId: 'user-citizen-1',
    title: 'Official Response Received',
    message: 'GCC Solid Waste Management posted a status update on Tambaram Station dumping.',
    type: 'official_response',
    linkTarget: { type: 'post', id: 'post-1' },
    createdAt: '2026-10-26T14:31:00Z',
    isRead: false
  },
  {
    id: 'n-3',
    userId: 'user-citizen-2',
    title: 'Status Updated to Assigned',
    message: 'Your complaint VX-2026-1088 has been assigned to Chennai Metro Water & Sewerage.',
    type: 'status_change',
    linkTarget: { type: 'complaint', id: 'VX-2026-1088' },
    createdAt: '2026-11-05T16:01:00Z',
    isRead: true
  },
  {
    id: 'n-4',
    userId: 'user-ngo-1',
    title: 'New Collaboration Opportunity',
    message: 'A high-support complaint (VX-2026-1102) regarding Water Pollution was reported in Pallavaram.',
    type: 'proposal',
    linkTarget: { type: 'complaint', id: 'VX-2026-1102' },
    createdAt: '2026-11-05T08:20:00Z',
    isRead: true
  }
];

export const CATEGORIES: { name: string; icon: string; count: number }[] = [
  { name: 'Garbage Accumulation', icon: 'Trash2', count: 48 },
  { name: 'Waste Management', icon: 'Recycle', count: 32 },
  { name: 'Water Pollution', icon: 'Droplets', count: 19 },
  { name: 'Drainage Problems', icon: 'Wrench', count: 27 },
  { name: 'Damaged Roads', icon: 'AlertTriangle', count: 54 },
  { name: 'Broken Streetlights', icon: 'LightbulbOff', count: 31 },
  { name: 'Public Safety', icon: 'ShieldAlert', count: 18 },
  { name: 'Environmental Damage', icon: 'Trees', count: 15 },
  { name: 'Community Suggestions', icon: 'MessageSquare', count: 22 },
  { name: 'General Discussion', icon: 'Users', count: 41 },
];

export const LOCALITIES = [
  'All Localities',
  'Tambaram',
  'Chromepet',
  'Pallavaram',
  'Velachery',
  'Guindy',
  'Anna Nagar',
  'Chennai'
];

