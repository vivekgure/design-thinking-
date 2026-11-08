import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole, UserProfile } from '../../types';
import { X, Lock, Mail, User, Building2, ShieldCheck, Sparkles, LogIn, UserPlus } from 'lucide-react';
import { LOCALITIES } from '../../data/mockData';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
}) => {
  const { users, currentUser, setCurrentUser } = useApp();

  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<UserRole>('citizen');
  const [locality, setLocality] = useState('Tambaram');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  // Preset demo accounts for quick 1-click test
  const demoAccounts = [
    {
      role: 'citizen' as UserRole,
      title: 'Citizen',
      name: 'Priya Sundaram',
      email: 'priya.sundaram@gmail.com',
      desc: 'Active resident reporting neighborhood issues & voting'
    },
    {
      role: 'government' as UserRole,
      title: 'Government Official',
      name: 'Dr. R. Arumugam, IAS',
      email: 'arumugam.gov@chennaicorporation.gov.in',
      desc: 'GCC Zonal Officer assigning depts & approving funds'
    },
    {
      role: 'ngo' as UserRole,
      title: 'NGO Lead',
      name: 'Kavitha Narayanan',
      email: 'kavitha@greenearthchennai.org',
      desc: 'Director of Green Earth Chennai non-profit'
    },
    {
      role: 'admin' as UserRole,
      title: 'Platform Admin',
      name: 'Vikram Ramanathan',
      email: 'admin@voxly.community',
      desc: 'Moderation, verification & audit oversight'
    }
  ];

  const handleQuickLogin = (demoEmail: string) => {
    const matched = users.find(u => u.email === demoEmail);
    if (matched) {
      setCurrentUser(matched);
      onClose();
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (mode === 'login') {
      const matched = users.find(u => u.email.toLowerCase() === email.trim().toLowerCase());
      if (matched) {
        setCurrentUser(matched);
        onClose();
      } else {
        // Fallback for prototyping: if email doesn't match an exact demo, log them in or create temporary profile
        const newDemoUser: UserProfile = {
          id: `user-${Date.now()}`,
          name: email.split('@')[0].replace('.', ' ') || 'Civic User',
          email: email.trim(),
          role: 'citizen',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          locality: 'Chennai',
          badges: ['New Citizen Member'],
          reputation: 50
        };
        setCurrentUser(newDemoUser);
        onClose();
      }
    } else {
      // Sign up
      if (!name.trim() || !email.trim()) {
        setError('Please enter your full name and valid email address.');
        return;
      }
      const newUser: UserProfile = {
        id: `user-${Date.now()}`,
        name: name.trim(),
        email: email.trim(),
        role,
        avatar: role === 'government' 
          ? 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80'
          : role === 'ngo'
          ? 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
          : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        locality,
        badges: ['Registered Member', `${role.toUpperCase()} Account`],
        reputation: 100
      };
      setCurrentUser(newUser);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 text-left">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 overflow-y-auto max-h-[90vh] space-y-6 animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#E8F5EE] text-[#176B50] flex items-center justify-center font-bold">
              {mode === 'login' ? <LogIn className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                {mode === 'login' ? 'Sign In to VOXLY' : 'Create Civic Account'}
              </h2>
              <p className="text-xs text-slate-500">
                {mode === 'login' 
                  ? 'Access your citizen, municipal authority, or NGO dashboard.'
                  : 'Join the community-driven civic engagement network.'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1-Click Persona Quick Selector (Ideal for evaluators & professors) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span className="flex items-center gap-1.5 text-[#176B50]">
              <Sparkles className="w-3.5 h-3.5" />
              1-Click Demo Personas:
            </span>
            <span className="text-[10px] text-slate-400 font-normal">Click to switch instantly</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {demoAccounts.map((acc) => (
              <button
                key={acc.email}
                type="button"
                onClick={() => handleQuickLogin(acc.email)}
                className={`p-2.5 rounded-xl border text-left transition-all hover:border-[#176B50] hover:bg-[#E8F5EE]/40 cursor-pointer ${
                  currentUser.email === acc.email
                    ? 'border-[#176B50] bg-[#E8F5EE]/70 ring-1 ring-[#176B50]'
                    : 'border-slate-200 bg-slate-50/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">{acc.name}</span>
                  <span className="text-[9px] uppercase font-bold text-[#176B50] bg-white px-1.5 py-0.2 rounded border border-slate-200">
                    {acc.title}
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">{acc.desc}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="relative flex py-1 items-center">
          <div className="flex-grow border-t border-slate-200" />
          <span className="flex-shrink mx-3 text-slate-400 text-[11px] font-semibold uppercase">Or continue with credentials</span>
          <div className="flex-grow border-t border-slate-200" />
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs">
            {error}
          </div>
        )}

        {/* Credentials Form */}
        <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
          {mode === 'signup' && (
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Full Name *</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ramesh Krishnan"
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-slate-800 text-xs focus:ring-2 focus:ring-[#176B50] focus:outline-none"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Email Address *</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-slate-800 text-xs focus:ring-2 focus:ring-[#176B50] focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Password *</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-slate-800 text-xs focus:ring-2 focus:ring-[#176B50] focus:outline-none"
                required
              />
            </div>
          </div>

          {mode === 'signup' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Account Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as UserRole)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-800 text-xs bg-white"
                >
                  <option value="citizen">Citizen (Local Resident)</option>
                  <option value="government">Government Authority (GCC)</option>
                  <option value="ngo">NGO Representative</option>
                  <option value="admin">Platform Administrator</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Locality</label>
                <select
                  value={locality}
                  onChange={(e) => setLocality(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-800 text-xs bg-white"
                >
                  {LOCALITIES.filter(l => l !== 'All Localities').map(l => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-[#176B50] hover:bg-[#11533e] text-white font-bold text-xs shadow-sm transition-all cursor-pointer"
          >
            {mode === 'login' ? 'Sign In to Platform' : 'Complete Registration'}
          </button>
        </form>

        {/* Toggle Mode */}
        <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
          {mode === 'login' ? (
            <span>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => setMode('signup')}
                className="font-bold text-[#176B50] hover:underline"
              >
                Sign Up as Citizen or Official
              </button>
            </span>
          ) : (
            <span>
              Already registered?{' '}
              <button
                type="button"
                onClick={() => setMode('login')}
                className="font-bold text-[#176B50] hover:underline"
              >
                Sign In
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

