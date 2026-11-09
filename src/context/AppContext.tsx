import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  UserProfile,
  UserRole,
  Complaint,
  ComplaintStatus,
  ComplaintVisibility,
  DepartmentName,
  CommunityPost,
  PostComment,
  Organisation,
  CollaborationProposal,
  ProposalStatus,
  NgoProject,
  AppNotification,
  ComplaintReferral
} from '../types';
import {
  INITIAL_USERS,
  INITIAL_ORGANISATIONS,
  INITIAL_COMPLAINTS,
  INITIAL_POSTS,
  INITIAL_COMMENTS,
  INITIAL_PROPOSALS,
  INITIAL_PROJECTS,
  INITIAL_NOTIFICATIONS,
  INDIA_CITY_COORDINATES
} from '../data/mockData';
import { Language, translations } from '../i18n/translations';
import { api } from '../services/api';

interface AppContextType {
  currentUser: UserProfile;
  users: UserProfile[];
  switchRole: (role: UserRole) => void;
  setCurrentUser: (user: UserProfile) => void;

  // Language & i18n
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, fallback?: string) => string;
  
  // Navigation
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedComplaintId: string | null;
  setSelectedComplaintId: (id: string | null) => void;
  selectedPostId: string | null;
  setSelectedPostId: (id: string | null) => void;
  
  // Complaints
  complaints: Complaint[];
  createComplaint: (data: {
    title: string;
    description: string;
    category: any;
    locality: string;
    address: string;
    latitude?: number;
    longitude?: number;
    visibility: ComplaintVisibility;
    photos: string[];
    suggestedDepartment?: DepartmentName;
  }) => Complaint;
  supportComplaint: (complaintId: string) => void;
  updateComplaintStatus: (
    complaintId: string,
    status: ComplaintStatus,
    remarks?: string,
    department?: DepartmentName,
    officer?: string,
    resolutionPhotos?: string[]
  ) => void;
  reopenComplaint: (complaintId: string, reason: string) => void;
  getComplaintById: (id: string) => Complaint | undefined;

  // Inter-Agency Referrals
  referrals: ComplaintReferral[];
  createReferral: (data: {
    complaintId: string;
    targetDepartment: string;
    targetAgency?: string;
    priority?: 'Urgent' | 'High' | 'Normal';
    actionMandate?: string;
  }) => ComplaintReferral;

  // Community Posts
  posts: CommunityPost[];
  createPost: (data: {
    title: string;
    content: string;
    category: any;
    locality: string;
    photos: string[];
    isAnonymous?: boolean;
    linkedComplaintId?: string;
  }) => CommunityPost;
  votePost: (postId: string, type: 'up' | 'down') => void;
  toggleSavePost: (postId: string) => void;
  savedPostIds: string[];
  toggleFollowPost: (postId: string) => void;
  followedPostIds: string[];

  // Comments
  comments: PostComment[];
  addComment: (postId: string, content: string, parentId?: string) => void;
  voteComment: (commentId: string, type: 'up' | 'down') => void;

  // Organisations
  organisations: Organisation[];
  registerOrganisation: (data: Omit<Organisation, 'id' | 'isVerified' | 'activeProjectsCount' | 'completedProjectsCount'>) => void;
  verifyOrganisation: (orgId: string) => void;

  // Proposals
  proposals: CollaborationProposal[];
  submitProposal: (data: Omit<CollaborationProposal, 'id' | 'submittedAt' | 'status'>) => void;
  reviewProposal: (
    proposalId: string,
    status: ProposalStatus,
    notes?: string,
    approvedFunding?: number,
    department?: DepartmentName
  ) => void;

  // Projects
  projects: NgoProject[];
  updateProjectProgress: (projectId: string, percentage: number, note: string, photos: string[]) => void;
  toggleMilestone: (projectId: string, milestoneId: string) => void;
  submitCompletionReport: (projectId: string, summary: string, outcomes: string, photos: string[]) => void;
  verifyProjectCompletion: (projectId: string) => void;

  // Notifications
  notifications: AppNotification[];
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  unreadNotificationsCount: number;

  // Reset to initial demo data
  resetDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load persisted state or initial data
  const [users, setUsers] = useState<UserProfile[]>(() => {
    const saved = localStorage.getItem('voxly_users');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    const savedRole = localStorage.getItem('voxly_current_role');
    const found = users.find(u => u.role === savedRole);
    return found || users[0];
  });

  const [complaints, setComplaints] = useState<Complaint[]>(() => {
    const saved = localStorage.getItem('voxly_complaints_v2') || localStorage.getItem('voxly_complaints');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.some(c => c.locality === 'Delhi NCR' || c.locality === 'Mumbai')) {
          return parsed;
        }
      } catch (e) {}
    }
    return INITIAL_COMPLAINTS;
  });

  const [posts, setPosts] = useState<CommunityPost[]>(() => {
    const saved = localStorage.getItem('voxly_posts_v2') || localStorage.getItem('voxly_posts');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.some(p => p.locality === 'Delhi NCR' || p.locality === 'Mumbai')) {
          return parsed;
        }
      } catch (e) {}
    }
    return INITIAL_POSTS;
  });

  const [comments, setComments] = useState<PostComment[]>(() => {
    const saved = localStorage.getItem('voxly_comments');
    return saved ? JSON.parse(saved) : INITIAL_COMMENTS;
  });

  const [organisations, setOrganisations] = useState<Organisation[]>(() => {
    const saved = localStorage.getItem('voxly_organisations_v2') || localStorage.getItem('voxly_organisations');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.some(o => o.id === 'ngo-delhi')) {
          return parsed;
        }
      } catch (e) {}
    }
    return INITIAL_ORGANISATIONS;
  });

  const [proposals, setProposals] = useState<CollaborationProposal[]>(() => {
    const saved = localStorage.getItem('voxly_proposals');
    return saved ? JSON.parse(saved) : INITIAL_PROPOSALS;
  });

  const [projects, setProjects] = useState<NgoProject[]>(() => {
    const saved = localStorage.getItem('voxly_projects');
    return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
  });

  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    const saved = localStorage.getItem('voxly_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [savedPostIds, setSavedPostIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('voxly_saved_posts');
    return saved ? JSON.parse(saved) : ['post-5'];
  });

  const [followedPostIds, setFollowedPostIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('voxly_followed_posts');
    return saved ? JSON.parse(saved) : ['post-1', 'post-4'];
  });

  // Inter-Agency Referrals state
  const [referrals, setReferrals] = useState<ComplaintReferral[]>(() => {
    const saved = localStorage.getItem('voxly_referrals_v1');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch {}
    }
    return [
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
  });

  // Language state
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('voxly_lang') as Language;
    return saved && ['en', 'ta', 'hi', 'te'].includes(saved) ? saved : 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('voxly_lang', lang);
  };

  const t = (key: string, fallback?: string): string => {
    return translations[language]?.[key] ?? translations['en']?.[key] ?? fallback ?? key;
  };

  // Navigation State
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedComplaintId, setSelectedComplaintId] = useState<string | null>(null);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  // Persistence effects
  useEffect(() => {
    localStorage.setItem('voxly_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('voxly_current_role', currentUser.role);
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('voxly_complaints', JSON.stringify(complaints));
    localStorage.setItem('voxly_complaints_v2', JSON.stringify(complaints));
  }, [complaints]);

  useEffect(() => {
    localStorage.setItem('voxly_posts', JSON.stringify(posts));
    localStorage.setItem('voxly_posts_v2', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('voxly_comments', JSON.stringify(comments));
  }, [comments]);

  useEffect(() => {
    localStorage.setItem('voxly_organisations', JSON.stringify(organisations));
    localStorage.setItem('voxly_organisations_v2', JSON.stringify(organisations));
  }, [organisations]);

  useEffect(() => {
    localStorage.setItem('voxly_proposals', JSON.stringify(proposals));
  }, [proposals]);

  useEffect(() => {
    localStorage.setItem('voxly_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('voxly_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('voxly_saved_posts', JSON.stringify(savedPostIds));
  }, [savedPostIds]);

  useEffect(() => {
    localStorage.setItem('voxly_followed_posts', JSON.stringify(followedPostIds));
  }, [followedPostIds]);

  useEffect(() => {
    localStorage.setItem('voxly_referrals_v1', JSON.stringify(referrals));
  }, [referrals]);

  // Synchronize complaints & referrals with the backend API on startup
  useEffect(() => {
    api.getComplaints().then((serverComplaints) => {
      if (Array.isArray(serverComplaints) && serverComplaints.length > 0) {
        setComplaints(prev => {
          const map = new Map<string, Complaint>();
          serverComplaints.forEach(c => map.set(c.id, c));
          prev.forEach(c => {
            if (!map.has(c.id)) map.set(c.id, c);
          });
          return Array.from(map.values());
        });
      }
    }).catch(() => {
      // offline / local fallback mode
    });

    api.getReferrals().then((serverReferrals) => {
      if (Array.isArray(serverReferrals) && serverReferrals.length > 0) {
        setReferrals(prev => {
          const map = new Map<string, ComplaintReferral>();
          serverReferrals.forEach(r => map.set(r.id, r));
          prev.forEach(r => {
            if (!map.has(r.id)) map.set(r.id, r);
          });
          return Array.from(map.values());
        });
      }
    }).catch(() => {
      // offline / local fallback mode
    });
  }, []);

  // Switch Role
  const switchRole = (role: UserRole) => {
    const targetUser = users.find(u => u.role === role);
    if (targetUser) {
      setCurrentUser(targetUser);
    }
  };

  // Trigger positive celebration confetti
  const fireConfetti = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#176B50', '#3478C5', '#E8F5EE', '#f59e0b']
      });
    } catch {
      // ignore
    }
  };

  // Helper to push a notification
  const addNotification = (notif: Omit<AppNotification, 'id' | 'createdAt' | 'isRead'>) => {
    const newNotif: AppNotification = {
      ...notif,
      id: `n-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      createdAt: new Date().toISOString(),
      isRead: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // 1. Create Complaint
  const createComplaint = (data: {
    title: string;
    description: string;
    category: any;
    locality: string;
    address: string;
    latitude?: number;
    longitude?: number;
    visibility: ComplaintVisibility;
    photos: string[];
    suggestedDepartment?: DepartmentName;
  }): Complaint => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const complaintId = `VX-2026-${randomSuffix}`;
    const timestamp = new Date().toISOString();

    // Locality coordinate defaults (pan-India) if not provided
    const [defaultLat, defaultLng] = INDIA_CITY_COORDINATES[data.locality] || [20.5937, 78.9629];

    const newComplaint: Complaint = {
      id: complaintId,
      title: data.title,
      description: data.description,
      category: data.category,
      locality: data.locality,
      address: data.address,
      latitude: data.latitude || defaultLat + (Math.random() * 0.008 - 0.004),
      longitude: data.longitude || defaultLng + (Math.random() * 0.008 - 0.004),
      visibility: data.visibility,
      status: 'Submitted',
      createdAt: timestamp,
      updatedAt: timestamp,
      userId: currentUser.id,
      userDisplayName: data.visibility === 'anonymous' ? 'Anonymous Citizen' : currentUser.name,
      userAvatar: data.visibility === 'anonymous' 
        ? 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80' 
        : currentUser.avatar,
      photos: data.photos,
      assignedDepartment: data.suggestedDepartment,
      supportCount: 1,
      supportedByUserIds: [currentUser.id]
    };

    // If PUBLIC or ANONYMOUS, automatically create a linked Community Post!
    if (data.visibility !== 'private') {
      const postId = `post-${Date.now()}`;
      newComplaint.linkedPostId = postId;

      const newPost: CommunityPost = {
        id: postId,
        title: data.title,
        content: data.description,
        category: data.category,
        locality: data.locality,
        userId: currentUser.id,
        userDisplayName: data.visibility === 'anonymous' ? 'Anonymous Citizen' : currentUser.name,
        userAvatar: data.visibility === 'anonymous' 
          ? 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80' 
          : currentUser.avatar,
        userRole: currentUser.role,
        isAnonymous: data.visibility === 'anonymous',
        createdAt: timestamp,
        photos: data.photos,
        upvotes: 1,
        downvotes: 0,
        commentCount: 0,
        linkedComplaintId: complaintId,
        complaintStatus: 'Submitted'
      };

      setPosts(prev => [newPost, ...prev]);
    }

    setComplaints(prev => [newComplaint, ...prev]);

    // Send to backend API asynchronously (persists to server database / Vercel serverless)
    api.createComplaint({
      title: newComplaint.title,
      description: newComplaint.description,
      category: newComplaint.category,
      locality: newComplaint.locality,
      address: newComplaint.address,
      latitude: newComplaint.latitude,
      longitude: newComplaint.longitude,
      visibility: newComplaint.visibility,
      photos: newComplaint.photos,
      suggestedDepartment: newComplaint.assignedDepartment,
      userId: currentUser.id,
      userDisplayName: newComplaint.userDisplayName,
      userAvatar: newComplaint.userAvatar
    }).catch(err => {
      console.warn('[Backend Sync] Fallback to local persistence:', err.message);
    });

    // Notify user of complaint registration
    addNotification({
      userId: currentUser.id,
      title: `Complaint Registered (${complaintId})`,
      message: `Your complaint has been submitted. Status: Submitted. Tracking ID: ${complaintId}`,
      type: 'status_change',
      linkTarget: { type: 'complaint', id: complaintId }
    });

    fireConfetti();
    return newComplaint;
  };

  // 1.1 Create and Inter-Agency Refer Complaint
  const createReferral = (data: {
    complaintId: string;
    targetDepartment: string;
    targetAgency?: string;
    priority?: 'Urgent' | 'High' | 'Normal';
    actionMandate?: string;
  }): ComplaintReferral => {
    const complaint = complaints.find(c => c.id === data.complaintId);
    const refNum = Math.floor(1000 + Math.random() * 9000);
    const referralId = `REF-2026-${refNum}`;
    const prefix = data.targetDepartment.slice(0, 4).toUpperCase().replace(/[^A-Z]/g, '') || 'CIV';
    const docketNumber = `DOK-${prefix}-2026-${refNum}`;
    const timestamp = new Date().toISOString();

    const newReferral: ComplaintReferral = {
      id: referralId,
      complaintId: data.complaintId,
      complaintTitle: complaint ? complaint.title : 'Referred Civic Grievance',
      complainantName: complaint ? complaint.userDisplayName : 'Verified Citizen',
      locality: complaint ? complaint.locality : 'India',
      referredBy: currentUser.name,
      referredByRole: currentUser.role,
      targetDepartment: data.targetDepartment,
      targetAgency: data.targetAgency,
      priority: data.priority || 'High',
      actionMandate: data.actionMandate || 'Mandatory inspection, corrective action, and verification report ordered.',
      status: 'Action Initiated',
      createdAt: timestamp,
      officialDocketNumber: docketNumber
    };

    setReferrals(prev => [newReferral, ...prev]);

    // Update parent complaint
    updateComplaintStatus(
      data.complaintId,
      complaint?.status === 'Submitted' ? 'Assigned' : (complaint?.status || 'Assigned'),
      `Inter-Agency Referral under Docket ${docketNumber} dispatched to ${data.targetDepartment}. Action Mandate: ${newReferral.actionMandate}`,
      data.targetDepartment as DepartmentName
    );

    // Sync to backend API
    api.createReferral({
      complaintId: data.complaintId,
      referredBy: currentUser.name,
      referredByRole: currentUser.role,
      targetDepartment: data.targetDepartment,
      targetAgency: data.targetAgency,
      priority: data.priority,
      actionMandate: data.actionMandate
    }).catch(err => {
      console.warn('[Backend Sync] Referral registered locally:', err.message);
    });

    addNotification({
      userId: currentUser.id,
      title: `Referral Docket Issued (${docketNumber})`,
      message: `Complaint ${data.complaintId} was referred to ${data.targetDepartment} with ${newReferral.priority} priority.`,
      type: 'official_response',
      linkTarget: { type: 'complaint', id: data.complaintId }
    });

    fireConfetti();
    return newReferral;
  };

  // Support complaint (community backing)
  const supportComplaint = (complaintId: string) => {
    setComplaints(prev => prev.map(c => {
      if (c.id === complaintId) {
        const alreadySupported = c.supportedByUserIds.includes(currentUser.id);
        const updatedList = alreadySupported
          ? c.supportedByUserIds.filter(id => id !== currentUser.id)
          : [...c.supportedByUserIds, currentUser.id];
        
        if (!alreadySupported) {
          fireConfetti();
        }

        return {
          ...c,
          supportCount: updatedList.length,
          supportedByUserIds: updatedList
        };
      }
      return c;
    }));

    // Sync to backend API
    api.supportComplaint(complaintId, currentUser.id).catch(err => {
      console.warn('[Backend Sync] Support update saved locally:', err.message);
    });
  };

  // Update complaint status (Government Official / Admin)
  const updateComplaintStatus = (
    complaintId: string,
    status: ComplaintStatus,
    remarks?: string,
    department?: DepartmentName,
    officer?: string,
    resolutionPhotos?: string[]
  ) => {
    const timestamp = new Date().toISOString();
    let targetComplaint: Complaint | undefined;

    setComplaints(prev => prev.map(c => {
      if (c.id === complaintId) {
        const updated: Complaint = {
          ...c,
          status,
          updatedAt: timestamp,
          officialRemarks: remarks || c.officialRemarks,
          assignedDepartment: department || c.assignedDepartment,
          assignedOfficer: officer || c.assignedOfficer,
          resolutionEvidencePhotos: resolutionPhotos || c.resolutionEvidencePhotos,
          resolvedAt: status === 'Resolved' ? timestamp : c.resolvedAt
        };
        targetComplaint = updated;
        return updated;
      }
      return c;
    }));

    // Also update linked post complaintStatus
    setPosts(prev => prev.map(p => {
      if (p.linkedComplaintId === complaintId) {
        return { ...p, complaintStatus: status };
      }
      return p;
    }));

    if (targetComplaint) {
      addNotification({
        userId: (targetComplaint as Complaint).userId,
        title: `Complaint Status Updated: ${status}`,
        message: `Complaint ${complaintId} is now marked as "${status}". ${remarks ? `Official note: "${remarks}"` : ''}`,
        type: 'status_change',
        linkTarget: { type: 'complaint', id: complaintId }
      });
    }

    // Sync to backend API
    api.updateComplaint(complaintId, {
      status,
      officialRemarks: remarks,
      assignedDepartment: department,
      assignedOfficer: officer,
      resolutionEvidencePhotos: resolutionPhotos
    }).catch(err => {
      console.warn('[Backend Sync] Status update registered locally:', err.message);
    });
  };

  // Reopen complaint (Citizen)
  const reopenComplaint = (complaintId: string, reason: string) => {
    updateComplaintStatus(complaintId, 'Reopened', `Citizen requested reopening: "${reason}"`);
  };

  const getComplaintById = (id: string) => {
    return complaints.find(c => c.id === id);
  };

  // 2. Community Posts
  const createPost = (data: {
    title: string;
    content: string;
    category: any;
    locality: string;
    photos: string[];
    isAnonymous?: boolean;
    linkedComplaintId?: string;
  }): CommunityPost => {
    const newPost: CommunityPost = {
      id: `post-${Date.now()}`,
      title: data.title,
      content: data.content,
      category: data.category,
      locality: data.locality,
      userId: currentUser.id,
      userDisplayName: data.isAnonymous ? 'Anonymous Citizen' : currentUser.name,
      userAvatar: data.isAnonymous 
        ? 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80' 
        : currentUser.avatar,
      userRole: currentUser.role,
      isAnonymous: !!data.isAnonymous,
      createdAt: new Date().toISOString(),
      photos: data.photos,
      upvotes: 1,
      downvotes: 0,
      commentCount: 0,
      linkedComplaintId: data.linkedComplaintId
    };

    setPosts(prev => [newPost, ...prev]);
    fireConfetti();
    return newPost;
  };

  const votePost = (postId: string, type: 'up' | 'down') => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        if (p.userVote === type) {
          // Remove vote
          return {
            ...p,
            userVote: undefined,
            upvotes: type === 'up' ? p.upvotes - 1 : p.upvotes,
            downvotes: type === 'down' ? p.downvotes - 1 : p.downvotes,
          };
        } else {
          // Apply new vote
          const oldVote = p.userVote;
          let newUp = p.upvotes;
          let newDown = p.downvotes;

          if (oldVote === 'up') newUp -= 1;
          if (oldVote === 'down') newDown -= 1;

          if (type === 'up') newUp += 1;
          if (type === 'down') newDown += 1;

          return {
            ...p,
            userVote: type,
            upvotes: newUp,
            downvotes: newDown
          };
        }
      }
      return p;
    }));
  };

  const toggleSavePost = (postId: string) => {
    setSavedPostIds(prev => 
      prev.includes(postId) ? prev.filter(id => id !== postId) : [...prev, postId]
    );
  };

  const toggleFollowPost = (postId: string) => {
    setFollowedPostIds(prev => 
      prev.includes(postId) ? prev.filter(id => id !== postId) : [...prev, postId]
    );
  };

  // 3. Comments
  const addComment = (postId: string, content: string, parentId?: string) => {
    const newComment: PostComment = {
      id: `c-${Date.now()}`,
      postId,
      userId: currentUser.id,
      userDisplayName: currentUser.role === 'ngo' 
        ? `${currentUser.name} (${organisations.find(o => o.id === currentUser.organisationId)?.name || 'NGO'})`
        : currentUser.role === 'government' 
          ? `${currentUser.name} (GCC Official)`
          : currentUser.name,
      userAvatar: currentUser.avatar,
      userRole: currentUser.role,
      content,
      createdAt: new Date().toISOString(),
      upvotes: 0,
      downvotes: 0,
      parentId
    };

    setComments(prev => [...prev, newComment]);

    // Increment post comment count
    setPosts(prev => prev.map(p => p.id === postId ? { ...p, commentCount: p.commentCount + 1 } : p));

    // Notify post author if not current user
    const targetPost = posts.find(p => p.id === postId);
    if (targetPost && targetPost.userId !== currentUser.id) {
      addNotification({
        userId: targetPost.userId,
        title: `New Comment on Your Post`,
        message: `${newComment.userDisplayName} commented: "${content.slice(0, 60)}..."`,
        type: 'comment',
        linkTarget: { type: 'post', id: postId }
      });
    }
  };

  const voteComment = (commentId: string, type: 'up' | 'down') => {
    setComments(prev => prev.map(c => {
      if (c.id === commentId) {
        if (c.userVote === type) {
          return {
            ...c,
            userVote: undefined,
            upvotes: type === 'up' ? c.upvotes - 1 : c.upvotes,
            downvotes: type === 'down' ? c.downvotes - 1 : c.downvotes,
          };
        } else {
          const oldVote = c.userVote;
          let newUp = c.upvotes;
          let newDown = c.downvotes;
          if (oldVote === 'up') newUp -= 1;
          if (oldVote === 'down') newDown -= 1;
          if (type === 'up') newUp += 1;
          if (type === 'down') newDown += 1;
          return {
            ...c,
            userVote: type,
            upvotes: newUp,
            downvotes: newDown
          };
        }
      }
      return c;
    }));
  };

  // 4. Organisations
  const registerOrganisation = (data: Omit<Organisation, 'id' | 'isVerified' | 'activeProjectsCount' | 'completedProjectsCount'>) => {
    const newOrg: Organisation = {
      ...data,
      id: `ngo-${Date.now()}`,
      isVerified: false, // awaits admin verification
      activeProjectsCount: 0,
      completedProjectsCount: 0,
    };
    setOrganisations(prev => [...prev, newOrg]);
    fireConfetti();
  };

  const verifyOrganisation = (orgId: string) => {
    setOrganisations(prev => prev.map(o => o.id === orgId ? { ...o, isVerified: true } : o));
  };

  // 5. Proposals
  const submitProposal = (data: Omit<CollaborationProposal, 'id' | 'submittedAt' | 'status'>) => {
    const newProp: CollaborationProposal = {
      ...data,
      id: `prop-${Date.now()}`,
      submittedAt: new Date().toISOString(),
      status: 'Pending',
      fundingStatus: data.fundingRequested > 0 ? 'Pending Review' : 'Not Requested'
    };

    setProposals(prev => [newProp, ...prev]);

    // Notify government authority of new proposal
    const govUser = users.find(u => u.role === 'government');
    if (govUser) {
      addNotification({
        userId: govUser.id,
        title: `New NGO Proposal Submitted`,
        message: `${data.organisationName} proposed collaboration on complaint "${data.complaintTitle.slice(0, 50)}..."`,
        type: 'proposal',
        linkTarget: { type: 'complaint', id: data.complaintId }
      });
    }

    fireConfetti();
  };

  const reviewProposal = (
    proposalId: string,
    status: ProposalStatus,
    notes?: string,
    approvedFunding?: number,
    department?: DepartmentName
  ) => {
    const timestamp = new Date().toISOString();
    let approvedProp: CollaborationProposal | undefined;

    setProposals(prev => prev.map(p => {
      if (p.id === proposalId) {
        const updated: CollaborationProposal = {
          ...p,
          status,
          officialNotes: notes || p.officialNotes,
          fundingApproved: approvedFunding ?? p.fundingApproved,
          fundingStatus: status === 'Approved' ? 'Approved' : status === 'Rejected' ? 'Rejected' : p.fundingStatus,
          reviewedAt: timestamp,
          assignedDepartment: department || p.assignedDepartment
        };
        if (status === 'Approved') approvedProp = updated;
        return updated;
      }
      return p;
    }));

    // If approved, create a new NgoProject and link to Complaint!
    if (status === 'Approved' && approvedProp) {
      const p = approvedProp;
      const newProject: NgoProject = {
        id: `project-${Date.now()}`,
        proposalId: p.id,
        complaintId: p.complaintId,
        complaintTitle: p.complaintTitle,
        organisationId: p.organisationId,
        organisationName: p.organisationName,
        locality: complaints.find(c => c.id === p.complaintId)?.locality || 'Chennai',
        status: 'Initiated',
        startDate: new Date().toISOString().split('T')[0],
        targetCompletionDate: new Date(Date.now() + p.expectedDurationWeeks * 7 * 86400000).toISOString().split('T')[0],
        assignedVolunteersCount: p.volunteerRequirement,
        volunteersList: ['Core Coordination Team', 'Community Volunteer Wing'],
        progressPercentage: 10,
        milestones: [
          {
            id: 'm-init',
            title: 'Project Kickoff & Municipal Permitting',
            description: `Assigned Department: ${department || 'GCC'}. Initial site mobilization.`,
            date: new Date().toISOString().split('T')[0],
            completed: true
          },
          {
            id: 'm-mid',
            title: 'Field Execution & Citizen Outreach',
            description: 'Solution rollout and resident awareness.',
            date: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
            completed: false
          },
          {
            id: 'm-final',
            title: 'Final Quality Verification & Handover',
            description: 'Submission of completion report and municipal inspection.',
            date: new Date(Date.now() + p.expectedDurationWeeks * 7 * 86400000).toISOString().split('T')[0],
            completed: false
          }
        ],
        progressReports: []
      };

      setProjects(prev => [newProject, ...prev]);

      // Link project ID to Complaint and update status to 'In Progress'
      setComplaints(prev => prev.map(c => {
        if (c.id === p.complaintId) {
          return {
            ...c,
            status: 'In Progress',
            linkedProjectId: newProject.id,
            officialRemarks: `Collaboration approved with ${p.organisationName}. Project ID: ${newProject.id}`
          };
        }
        return c;
      }));

      // Also update linked post
      setPosts(prev => prev.map(post => {
        if (post.linkedComplaintId === p.complaintId) {
          return { ...post, complaintStatus: 'In Progress' };
        }
        return post;
      }));

      // Notify NGO rep
      const ngoUser = users.find(u => u.organisationId === p.organisationId);
      if (ngoUser) {
        addNotification({
          userId: ngoUser.id,
          title: `Proposal Approved!`,
          message: `Your collaboration proposal for "${p.complaintTitle.slice(0, 45)}..." was approved. Project initialized.`,
          type: 'proposal',
          linkTarget: { type: 'project', id: newProject.id }
        });
      }

      fireConfetti();
    }
  };

  // 6. Projects Management
  const updateProjectProgress = (projectId: string, percentage: number, note: string, photos: string[]) => {
    const report = {
      id: `pr-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      notes: note,
      photos,
      author: currentUser.name
    };

    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        return {
          ...p,
          status: percentage >= 100 ? 'Under Government Review' : 'In Progress',
          progressPercentage: percentage,
          progressReports: [report, ...p.progressReports]
        };
      }
      return p;
    }));
  };

  const toggleMilestone = (projectId: string, milestoneId: string) => {
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        return {
          ...p,
          milestones: p.milestones.map(m => m.id === milestoneId ? { ...m, completed: !m.completed } : m)
        };
      }
      return p;
    }));
  };

  const submitCompletionReport = (projectId: string, summary: string, outcomes: string, photos: string[]) => {
    const completionReport = {
      submittedAt: new Date().toISOString(),
      summary,
      outcomes,
      evidencePhotos: photos,
      governmentVerified: false
    };

    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        return {
          ...p,
          status: 'Under Government Review',
          progressPercentage: 100,
          completionReport
        };
      }
      return p;
    }));

    // Notify government authority to review completion report
    const govUser = users.find(u => u.role === 'government');
    if (govUser) {
      addNotification({
        userId: govUser.id,
        title: `Project Completion Report Submitted`,
        message: `NGO submitted completion report for project ${projectId}. Ready for official verification.`,
        type: 'project_update',
        linkTarget: { type: 'project', id: projectId }
      });
    }

    fireConfetti();
  };

  const verifyProjectCompletion = (projectId: string) => {
    const timestamp = new Date().toISOString();
    let targetProject: NgoProject | undefined;

    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        const updated: NgoProject = {
          ...p,
          status: 'Completed',
          completionReport: p.completionReport ? {
            ...p.completionReport,
            governmentVerified: true,
            verificationDate: timestamp
          } : undefined
        };
        targetProject = updated;
        return updated;
      }
      return p;
    }));

    if (targetProject) {
      // Mark linked complaint as RESOLVED!
      updateComplaintStatus(
        (targetProject as NgoProject).complaintId,
        'Resolved',
        `Project successfully verified and completed by GCC & ${(targetProject as NgoProject).organisationName}.`,
        undefined,
        undefined,
        (targetProject as NgoProject).completionReport?.evidencePhotos
      );
    }
  };

  // 7. Notifications
  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const unreadNotificationsCount = notifications.filter(
    n => n.userId === currentUser.id && !n.isRead
  ).length;

  // Reset Demo Data
  const resetDemoData = () => {
    localStorage.clear();
    setUsers(INITIAL_USERS);
    setCurrentUser(INITIAL_USERS[0]);
    setComplaints(INITIAL_COMPLAINTS);
    setPosts(INITIAL_POSTS);
    setComments(INITIAL_COMMENTS);
    setOrganisations(INITIAL_ORGANISATIONS);
    setProposals(INITIAL_PROPOSALS);
    setProjects(INITIAL_PROJECTS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setSavedPostIds(['post-5']);
    setFollowedPostIds(['post-1', 'post-4']);
    setActiveTab('home');
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        currentUser,
        users,
        switchRole,
        setCurrentUser,
        activeTab,
        setActiveTab,
        selectedComplaintId,
        setSelectedComplaintId,
        selectedPostId,
        setSelectedPostId,
        complaints,
        createComplaint,
        supportComplaint,
        updateComplaintStatus,
        reopenComplaint,
        getComplaintById,
        referrals,
        createReferral,
        posts,
        createPost,
        votePost,
        toggleSavePost,
        savedPostIds,
        toggleFollowPost,
        followedPostIds,
        comments,
        addComment,
        voteComment,
        organisations,
        registerOrganisation,
        verifyOrganisation,
        proposals,
        submitProposal,
        reviewProposal,
        projects,
        updateProjectProgress,
        toggleMilestone,
        submitCompletionReport,
        verifyProjectCompletion,
        notifications,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        unreadNotificationsCount,
        resetDemoData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

