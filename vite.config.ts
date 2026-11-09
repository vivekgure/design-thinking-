import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { db } from './server/db.js';

function voxlyApiPlugin() {
  return {
    name: 'voxly-api-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url || !req.url.startsWith('/api')) {
          return next();
        }

        const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
        const pathname = url.pathname;

        res.setHeader('Content-Type', 'application/json');

        const readBody = () =>
          new Promise((resolve) => {
            let body = '';
            req.on('data', (chunk) => {
              body += chunk;
            });
            req.on('end', () => {
              try {
                resolve(body ? JSON.parse(body) : {});
              } catch {
                resolve({});
              }
            });
          });

        if (pathname === '/api/health') {
          res.end(JSON.stringify({ status: 'online', mode: 'vite-integrated-backend' }));
          return;
        }

        if (pathname === '/api/complaints') {
          if (req.method === 'GET') {
            const id = url.searchParams.get('id');
            const locality = url.searchParams.get('locality');
            const status = url.searchParams.get('status');
            const category = url.searchParams.get('category');
            const q = url.searchParams.get('q') || url.searchParams.get('search');

            if (id) {
              const item = db.getComplaintById(id);
              if (!item) {
                res.statusCode = 404;
                res.end(JSON.stringify({ error: `Complaint ${id} not found.` }));
                return;
              }
              res.end(JSON.stringify(item));
              return;
            }

            const list = db.getComplaints({ locality, status, category, q });
            res.end(JSON.stringify(list));
            return;
          }

          if (req.method === 'POST') {
            const body = await readBody();
            try {
              const newComplaint = db.createComplaint(body);
              res.statusCode = 201;
              res.end(JSON.stringify({ success: true, complaint: newComplaint }));
            } catch (err) {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: err.message }));
            }
            return;
          }

          if (req.method === 'PATCH') {
            const body = await readBody();
            const id = url.searchParams.get('id') || body.id;
            const updated = db.updateComplaint(id, body);
            if (!updated) {
              res.statusCode = 404;
              res.end(JSON.stringify({ error: 'Complaint not found.' }));
              return;
            }
            res.end(JSON.stringify({ success: true, complaint: updated }));
            return;
          }
        }

        if (pathname.startsWith('/api/complaints/')) {
          const parts = pathname.split('/');
          const id = parts[3];
          const isSupport = parts[4] === 'support';

          if (isSupport && req.method === 'POST') {
            const body = await readBody();
            const updated = db.supportComplaint(id, body.userId);
            res.end(JSON.stringify({ success: true, complaint: updated }));
            return;
          }

          if (req.method === 'GET') {
            const item = db.getComplaintById(id);
            if (!item) {
              res.statusCode = 404;
              res.end(JSON.stringify({ error: `Complaint ${id} not found.` }));
              return;
            }
            res.end(JSON.stringify(item));
            return;
          }

          if (req.method === 'PATCH') {
            const body = await readBody();
            const updated = db.updateComplaint(id, body);
            res.end(JSON.stringify({ success: true, complaint: updated }));
            return;
          }
        }

        if (pathname === '/api/referrals') {
          if (req.method === 'GET') {
            const complaintId = url.searchParams.get('complaintId');
            const targetDepartment = url.searchParams.get('targetDepartment');
            const priority = url.searchParams.get('priority');
            const list = db.getReferrals({ complaintId, targetDepartment, priority });
            res.end(JSON.stringify(list));
            return;
          }

          if (req.method === 'POST') {
            const body = await readBody();
            try {
              const referral = db.createReferral(body);
              res.statusCode = 201;
              res.end(JSON.stringify({ success: true, referral }));
            } catch (err) {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: err.message }));
            }
            return;
          }
        }

        if (pathname === '/api/stats') {
          res.end(JSON.stringify(db.getStats()));
          return;
        }

        next();
      });
    }
  };
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    voxlyApiPlugin(),
  ],
});
