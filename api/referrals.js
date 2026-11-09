import { db } from '../server/db.js';

export default async function handler(req, res) {
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

  try {
    if (method === 'GET') {
      const { complaintId, targetDepartment, priority } = req.query;
      const list = db.getReferrals({ complaintId, targetDepartment, priority });
      return res.status(200).json(list);
    }

    if (method === 'POST') {
      const referral = db.createReferral(req.body);
      return res.status(201).json({
        success: true,
        message: `Complaint ${referral.complaintId} successfully referred.`,
        referral
      });
    }

    return res.status(405).json({ error: `Method ${method} not allowed.` });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
