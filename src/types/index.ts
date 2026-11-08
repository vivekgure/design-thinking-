export type UserRole = 'citizen' | 'government' | 'ngo' | 'admin';

export type ComplaintVisibility = 'public' | 'anonymous' | 'private';

export type ComplaintStatus = 
  | 'Submitted' 
  | 'Under Review' 
  | 'Verified' 
  | 'Assigned' 
  | 'In Progress' 
  | 'Resolved' 
  | 'Reopened';

export type ComplaintCategory =
  | 'Garbage Accumulation'
  | 'Waste Management'
  | 'Water Pollution'
  | 'Air Pollution'
  | 'Drainage Problems'
  | 'Water Leakage'
  | 'Deforestation'
  | 'Environmental Damage'
  | 'Damaged Roads'
  | 'Broken Streetlights'
  | 'Public Safety'
  | 'Poor Sanitation'
  | 'Public Facilities'
  | 'Transportation'
  | 'Community Infrastructure'
  | 'Community Suggestions'
  | 'General Discussion';

export type DepartmentName =
  | 'GCC Solid Waste Management'
  | 'Chennai Metro Water & Sewerage (CMWSSB)'
  | 'State Highways & Municipal Roads Dept'
  | 'Tamil Nadu Pollution Control Board (TNPCB)'
  | 'Greater Chennai Corporation Health & Sanitation'
  | 'Public Works Department (PWD)'
  | 'Traffic & Public Safety Wing'
  | 'Parks & Urban Forestry Division';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  locality: string;
  organisationId?: string;
  departmentId?: string;
  badges: string[];
  reputation: number;
}

export interface Complaint {
  id: string; // e.g. "VX-2026-1042"
  title: string;
  description: string;
  category: ComplaintCategory;
  locality: string;
  address: string;
  latitude: number;
  longitude: number;
  visibility: ComplaintVisibility;
  status: ComplaintStatus;
  createdAt: string;
  updatedAt: string;
  userId: string;
  userDisplayName: string;
  userAvatar: string;
  photos: string[];
  assignedDepartment?: DepartmentName;
  assignedOfficer?: string;
  officialRemarks?: string;
  resolutionEvidencePhotos?: string[];
  resolvedAt?: string;
  reopenReason?: string;
  supportCount: number;
  supportedByUserIds: string[];
  linkedPostId?: string;
  linkedProjectId?: string;
}

export interface PostComment {
  id: string;
  postId: string;
  userId: string;
  userDisplayName: string;
  userAvatar: string;
  userRole: UserRole;
  content: string;
  createdAt: string;
  upvotes: number;
  downvotes: number;
  userVote?: 'up' | 'down';
  parentId?: string; // for nested replies
}

export interface CommunityPost {
  id: string;
  title: string;
  content: string;
  category: ComplaintCategory;
  locality: string;
  userId: string;
  userDisplayName: string;
  userAvatar: string;
  userRole: UserRole;
  isAnonymous: boolean;
  createdAt: string;
  photos: string[];
  upvotes: number;
  downvotes: number;
  userVote?: 'up' | 'down';
  commentCount: number;
  isSaved?: boolean;
  isFollowed?: boolean;
  linkedComplaintId?: string;
  complaintStatus?: ComplaintStatus;
}

export type ProposalStatus = 'Pending' | 'Approved' | 'Modification Requested' | 'Rejected';

export interface CollaborationProposal {
  id: string;
  complaintId: string;
  complaintTitle: string;
  organisationId: string;
  organisationName: string;
  organisationType: string;
  proposedSolution: string;
  projectDescription: string;
  resourcesAvailable: string;
  volunteerRequirement: number;
  estimatedBudget: number; // in INR
  expectedDurationWeeks: number;
  governmentAssistanceRequired: string;
  fundingRequested: number;
  fundingApproved?: number;
  fundingStatus: 'Not Requested' | 'Pending Review' | 'Approved' | 'Partially Approved' | 'Rejected';
  status: ProposalStatus;
  officialNotes?: string;
  submittedAt: string;
  reviewedAt?: string;
  assignedDepartment?: DepartmentName;
}

export interface ProjectMilestone {
  id: string;
  title: string;
  description: string;
  date: string;
  completed: boolean;
  photos?: string[];
}

export interface NgoProject {
  id: string;
  proposalId: string;
  complaintId: string;
  complaintTitle: string;
  organisationId: string;
  organisationName: string;
  locality: string;
  status: 'Initiated' | 'In Progress' | 'Under Government Review' | 'Completed';
  startDate: string;
  targetCompletionDate: string;
  assignedVolunteersCount: number;
  volunteersList: string[];
  progressPercentage: number;
  milestones: ProjectMilestone[];
  progressReports: {
    id: string;
    date: string;
    notes: string;
    photos: string[];
    author: string;
  }[];
  completionReport?: {
    submittedAt: string;
    summary: string;
    outcomes: string;
    evidencePhotos: string[];
    governmentVerified: boolean;
    verificationDate?: string;
    residentFeedbackScore?: number;
  };
}

export interface Organisation {
  id: string;
  name: string;
  type: string;
  registrationNumber: string;
  description: string;
  website: string;
  contactEmail: string;
  contactPhone: string;
  areasOfOperation: string[];
  previousProjects: string[];
  isVerified: boolean;
  logo: string;
  establishedYear: number;
  activeProjectsCount: number;
  completedProjectsCount: number;
}

export interface AppNotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'status_change' | 'comment' | 'proposal' | 'project_update' | 'official_response';
  linkTarget?: {
    type: 'complaint' | 'post' | 'project';
    id: string;
  };
  createdAt: string;
  isRead: boolean;
}

