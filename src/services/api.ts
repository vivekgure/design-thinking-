import { Complaint, ComplaintReferral, ComplaintStatus, DepartmentName } from '../types';

export interface CreateComplaintPayload {
  title: string;
  description: string;
  category: any;
  locality: string;
  address: string;
  latitude?: number;
  longitude?: number;
  visibility: 'public' | 'anonymous' | 'private';
  photos: string[];
  suggestedDepartment?: DepartmentName;
  userId?: string;
  userDisplayName?: string;
  userAvatar?: string;
}

export interface CreateReferralPayload {
  complaintId: string;
  referredBy?: string;
  referredByRole?: string;
  targetDepartment: string;
  targetAgency?: string;
  priority?: 'Urgent' | 'High' | 'Normal';
  actionMandate?: string;
}

class ApiService {
  private baseUrl = '';

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    try {
      const res = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...(options.headers || {})
        }
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error ${res.status}: ${res.statusText}`);
      }

      return await res.json();
    } catch (err: any) {
      console.warn(`[API] Request to ${endpoint} failed:`, err.message);
      throw err;
    }
  }

  // Complaints
  async getComplaints(filters: { locality?: string; status?: string; category?: string; search?: string } = {}): Promise<Complaint[]> {
    const params = new URLSearchParams();
    if (filters.locality && filters.locality !== 'All India' && filters.locality !== 'All Localities') {
      params.set('locality', filters.locality);
    }
    if (filters.status && filters.status !== 'All') {
      params.set('status', filters.status);
    }
    if (filters.category && filters.category !== 'All Categories') {
      params.set('category', filters.category);
    }
    if (filters.search) {
      params.set('q', filters.search);
    }

    const qs = params.toString() ? `?${params.toString()}` : '';
    return this.request<Complaint[]>(`/api/complaints${qs}`);
  }

  async getComplaintById(id: string): Promise<Complaint> {
    return this.request<Complaint>(`/api/complaints/${encodeURIComponent(id)}`);
  }

  async createComplaint(payload: CreateComplaintPayload): Promise<{ success: boolean; complaint: Complaint }> {
    return this.request<{ success: boolean; complaint: Complaint }>('/api/complaints', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  }

  async updateComplaint(
    id: string,
    updates: {
      status?: ComplaintStatus;
      officialRemarks?: string;
      assignedDepartment?: DepartmentName;
      assignedOfficer?: string;
      resolutionEvidencePhotos?: string[];
    }
  ): Promise<{ success: boolean; complaint: Complaint }> {
    return this.request<{ success: boolean; complaint: Complaint }>(`/api/complaints/${encodeURIComponent(id)}`, {
      method: 'PATCH',
      body: JSON.stringify(updates)
    });
  }

  async supportComplaint(id: string, userId?: string): Promise<{ success: boolean; complaint: Complaint }> {
    return this.request<{ success: boolean; complaint: Complaint }>(`/api/complaints/${encodeURIComponent(id)}/support`, {
      method: 'POST',
      body: JSON.stringify({ userId })
    });
  }

  // Referrals
  async getReferrals(filters: { complaintId?: string; targetDepartment?: string; priority?: string } = {}): Promise<ComplaintReferral[]> {
    const params = new URLSearchParams();
    if (filters.complaintId) params.set('complaintId', filters.complaintId);
    if (filters.targetDepartment) params.set('targetDepartment', filters.targetDepartment);
    if (filters.priority) params.set('priority', filters.priority);

    const qs = params.toString() ? `?${params.toString()}` : '';
    return this.request<ComplaintReferral[]>(`/api/referrals${qs}`);
  }

  async createReferral(payload: CreateReferralPayload): Promise<{ success: boolean; referral: ComplaintReferral }> {
    return this.request<{ success: boolean; referral: ComplaintReferral }>('/api/referrals', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  }

  // Stats
  async getStats(): Promise<any> {
    return this.request<any>('/api/stats');
  }
}

export const api = new ApiService();
