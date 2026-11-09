import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { db } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'VOXLY Civic Backend API',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// 1. GET Complaints (supports filters: locality, status, category, q/search)
app.get('/api/complaints', (req, res) => {
  try {
    const { locality, status, category, q, search, id } = req.query;
    if (id) {
      const complaint = db.getComplaintById(id);
      if (!complaint) {
        return res.status(404).json({ error: `Complaint with ID ${id} not found.` });
      }
      return res.json(complaint);
    }
    const complaints = db.getComplaints({ locality, status, category, q: q || search });
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. GET Single Complaint
app.get('/api/complaints/:id', (req, res) => {
  try {
    const { id } = req.params;
    const complaint = db.getComplaintById(id);
    if (!complaint) {
      return res.status(404).json({ error: `Complaint with ID ${id} not found.` });
    }
    res.json(complaint);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. POST Complaint (Complainer submits a grievance)
app.post('/api/complaints', (req, res) => {
  try {
    const newComplaint = db.createComplaint(req.body);
    res.status(201).json({
      success: true,
      message: 'Complaint successfully registered in VOXLY Civic Registry.',
      complaint: newComplaint
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 4. PATCH Complaint (Update status, add official remarks)
app.patch('/api/complaints/:id', (req, res) => {
  try {
    const { id } = req.params;
    const updated = db.updateComplaint(id, req.body);
    if (!updated) {
      return res.status(404).json({ error: `Complaint with ID ${id} not found.` });
    }
    res.json({
      success: true,
      message: 'Complaint status successfully updated.',
      complaint: updated
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 5. POST Support Complaint
app.post('/api/complaints/:id/support', (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body || {};
    const updated = db.supportComplaint(id, userId);
    if (!updated) {
      return res.status(404).json({ error: `Complaint with ID ${id} not found.` });
    }
    res.json({
      success: true,
      complaint: updated
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 6. GET Referrals (Referral records and audit trail)
app.get('/api/referrals', (req, res) => {
  try {
    const { complaintId, targetDepartment, priority } = req.query;
    const referrals = db.getReferrals({ complaintId, targetDepartment, priority });
    res.json(referrals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 7. POST Referral ("So we can refer that")
app.post('/api/referrals', (req, res) => {
  try {
    const referral = db.createReferral(req.body);
    res.status(201).json({
      success: true,
      message: `Complaint ${referral.complaintId} successfully referred to ${referral.targetDepartment}.`,
      referral
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 8. GET Platform Stats
app.get('/api/stats', (req, res) => {
  try {
    const stats = db.getStats();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Serve static assets in production if dist directory exists
const distDir = path.resolve(__dirname, '..', 'dist');
app.use(express.static(distDir));

app.get('*', (req, res) => {
  res.sendFile(path.join(distDir, 'index.html'));
});

// Start listening if run directly
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`[VOXLY Backend] Live & listening on http://localhost:${PORT}`);
    console.log(`[VOXLY Backend] REST Endpoints:`);
    console.log(`  - POST /api/complaints (Submit complaint)`);
    console.log(`  - GET  /api/complaints (Search & list complaints)`);
    console.log(`  - POST /api/referrals  (Refer complaint to department)`);
    console.log(`  - GET  /api/referrals  (Audit referrals)`);
  });
}

export default app;
