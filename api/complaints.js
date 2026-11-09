import { db } from '../server/db.js';

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { method } = req;
  const { id, locality, status, category, q, search } = req.query;

  try {
    if (method === 'GET') {
      if (id) {
        const item = db.getComplaintById(id);
        if (!item) return res.status(404).json({ error: `Complaint ${id} not found.` });
        return res.status(200).json(item);
      }
      const list = db.getComplaints({ locality, status, category, q: q || search });
      return res.status(200).json(list);
    }

    if (method === 'POST') {
      // Support check
      if (req.query.action === 'support' && id) {
        const { userId } = req.body || {};
        const supported = db.supportComplaint(id, userId);
        return res.status(200).json({ success: true, complaint: supported });
      }

      // Complainer submitting new grievance
      const newComplaint = db.createComplaint(req.body);
      return res.status(201).json({
        success: true,
        message: 'Complaint registered in national civic registry.',
        complaint: newComplaint
      });
    }

    if (method === 'PATCH') {
      const complaintId = id || req.body.id;
      if (!complaintId) {
        return res.status(400).json({ error: 'Complaint ID is required for status updates.' });
      }
      const updated = db.updateComplaint(complaintId, req.body);
      if (!updated) return res.status(404).json({ error: `Complaint ${complaintId} not found.` });
      return res.status(200).json({ success: true, complaint: updated });
    }

    return res.status(405).json({ error: `Method ${method} not allowed.` });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
