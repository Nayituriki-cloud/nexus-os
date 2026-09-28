import React, { useState } from 'react';
import { useNexus } from '../../context/NexusContext';
import { 
  ShieldCheck, 
  Key, 
  Smartphone, 
  Laptop, 
  X, 
  Check, 
  User, 
  Building2, 
  Mail, 
  Award, 
  Lock,
  ExternalLink
} from 'lucide-react';

export const NexusIdModal: React.FC = () => {
  const { user, updateUser, isIdModalOpen, setIsIdModalOpen, addNotification } = useNexus();
  const [name, setName] = useState(user.name);
  const [title, setTitle] = useState(user.title);
  const [org, setOrg] = useState(user.organization);
  const [saved, setSaved] = useState(false);

  if (!isIdModalOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ name, title, organization: org });
    setSaved(true);
    addNotification('Nexus ID Updated', 'Your global ecosystem identity profile has been saved.', 'info');
    setTimeout(() => {
      setSaved(false);
      setIsIdModalOpen(false);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div 
        className="w-full max-w-xl glass-panel rounded-3xl border border-cyan-500/30 shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-white/10 bg-slate-900/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm glow-cyan shadow-md">
              NX
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white">NEXUS ID</h2>
                <span className="text-[10px] font-mono bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/30">
                  Global Unified Account
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">ID: {user.id}</p>
            </div>
          </div>

          <button
            onClick={() => setIsIdModalOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSave} className="p-5 space-y-4 overflow-y-auto max-h-[75vh]">
          {/* Identity Snapshot Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900/90 to-cyan-950/30 border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={user.avatarUrl} alt={user.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-cyan-400" />
              <div>
                <div className="font-bold text-white text-sm">{user.name}</div>
                <div className="text-xs text-slate-300">{user.email}</div>
                <div className="text-[11px] text-cyan-400 font-mono mt-0.5">{user.title} · {user.tier} Plan</div>
              </div>
            </div>

            <div className="text-right">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 inline-flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> 2FA & FIDO2 Active
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="text-slate-300 font-semibold block mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                required
              />
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">Professional Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-slate-300 font-semibold block mb-1">Enterprise Organization</label>
              <input
                type="text"
                value={org}
                onChange={(e) => setOrg(e.target.value)}
                className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                required
              />
            </div>
          </div>

          {/* Security & Enrolled Passkeys */}
          <div className="pt-3 border-t border-white/10">
            <div className="text-xs font-semibold text-slate-300 uppercase font-mono mb-2 flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-cyan-400" />
              Connected Ecosystem Services
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
              <div className="p-2.5 rounded-xl bg-slate-900/50 border border-white/5 flex items-center justify-between">
                <span>Nexus AI & Work</span>
                <span className="text-emerald-400 font-mono text-[10px]">SYNCED</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/50 border border-white/5 flex items-center justify-between">
                <span>Nexus Cloud & Code</span>
                <span className="text-emerald-400 font-mono text-[10px]">SYNCED</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/50 border border-white/5 flex items-center justify-between">
                <span>Nexus Connect</span>
                <span className="text-emerald-400 font-mono text-[10px]">ACTIVE</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/50 border border-white/5 flex items-center justify-between">
                <span>Zero-Trust Shield</span>
                <span className="text-cyan-400 font-mono text-[10px]">ENFORCED</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsIdModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-cyan-500/20 transition-all cursor-pointer"
            >
              {saved ? <Check className="w-3.5 h-3.5" /> : null}
              <span>{saved ? 'Saved' : 'Save Nexus ID'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
