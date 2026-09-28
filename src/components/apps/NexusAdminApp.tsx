import React, { useState } from 'react';
import { useNexus } from '../../context/NexusContext';
import { 
  Settings2, 
  Users, 
  ShieldCheck, 
  CreditCard, 
  Check, 
  Layers, 
  Activity, 
  Building2,
  HardDrive,
  FileText
} from 'lucide-react';

interface OrgUser {
  id: string;
  name: string;
  email: string;
  role: 'Super Admin' | 'Architect' | 'Developer' | 'Auditor';
  status: 'Active' | 'Pending';
  lastLogin: string;
}

const initialOrgUsers: OrgUser[] = [
  { id: 'u1', name: 'Emmanuel Nayituriki', email: 'emmanuelnayituriki993@gmail.com', role: 'Super Admin', status: 'Active', lastLogin: 'Active Now' },
  { id: 'u2', name: 'Sarah Kagame', email: 'sarah.k@nexus.systems', role: 'Architect', status: 'Active', lastLogin: '10m ago' },
  { id: 'u3', name: 'Amina Diallo', email: 'amina.d@nexus.systems', role: 'Auditor', status: 'Active', lastLogin: '1h ago' },
  { id: 'u4', name: 'Jean-Paul Habimana', email: 'jp.h@nexus.systems', role: 'Developer', status: 'Active', lastLogin: 'Yesterday' }
];

export const NexusAdminApp: React.FC = () => {
  const { user, updateUser, addNotification } = useNexus();
  const [adminTab, setAdminTab] = useState<'users' | 'billing' | 'audit'>('billing');
  const [orgUsers, setOrgUsers] = useState<OrgUser[]>(initialOrgUsers);

  const tiers = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Essential digital tools for students, individuals, and open-source developers.',
      features: [
        'Nexus AI Core (Standard quota)',
        '15 GB Nexus Drive storage',
        'Docs, Sheets & Slides standard suite',
        'Nexus Connect 1-on-1 calls',
        'Nexus Code Web Sandbox'
      ],
      current: user.tier === 'Free'
    },
    {
      name: 'Pro',
      price: '$19',
      period: 'per user / mo',
      description: 'Power tools for creators, researchers, and professional software engineers.',
      features: [
        'Unlimited Gemini 3.8 Flash inference',
        '250 GB High-Speed Edge Storage',
        'Full Nexus Creator multi-modal studio',
        'Dedicated Container deployments',
        'Priority Global Edge latency'
      ],
      current: user.tier === 'Pro'
    },
    {
      name: 'Business',
      price: '$49',
      period: 'per user / mo',
      description: 'Collaborative enterprise operations, CRM, team channels, and compliance.',
      features: [
        'Full Nexus Business CRM & ERP',
        '1 TB Storage per organization seat',
        'Role-Based Access Control (RBAC)',
        'Meeting Minutes AI Transcriber',
        '24/7 Priority Support SLA'
      ],
      current: user.tier === 'Business'
    },
    {
      name: 'Enterprise',
      price: '$120',
      period: 'per user / mo',
      description: 'Complete institutional sovereignty, dedicated cloud nodes, and post-quantum security.',
      features: [
        'Sovereign Regional Cloud (af-south-1)',
        'Zero-Trust Biometric Hardware Passkeys',
        'Custom Fine-Tuned AI Models',
        'Unlimited Edge Clusters & DB replicas',
        'Comprehensive Audit Trail & SLA 99.99%'
      ],
      current: user.tier === 'Enterprise'
    }
  ];

  const handleSelectTier = (tierName: any) => {
    updateUser({ tier: tierName });
    addNotification('Plan Updated', `Organization billing updated to ${tierName} plan.`, 'info');
  };

  return (
    <div className="h-[calc(100vh-4.5rem)] flex flex-col max-w-7xl mx-auto p-3 md:p-6 pb-20 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 rounded-2xl glass-panel border border-white/10 mb-4 bg-gradient-to-r from-slate-900/90 via-indigo-950/40 to-slate-900/90">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Settings2 className="w-5 h-5 text-indigo-400" />
            <h1 className="text-lg md:text-xl font-bold text-white tracking-tight">NEXUS CENTRAL ADMINISTRATOR CONSOLE</h1>
            <span className="text-[10px] px-2 py-0.5 rounded-full font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Organization Governance
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Tenant: <strong>{user.organization}</strong> · Multi-role RBAC, cloud quotas, and transparent subscription tiers.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-cyan-300 bg-cyan-500/10 px-3 py-1.5 rounded-xl border border-cyan-500/30">
            Tier: {user.tier} Plan (Active)
          </span>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="glass-panel p-2 rounded-2xl border border-white/10 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setAdminTab('billing')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              adminTab === 'billing' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5 text-indigo-400" />
            <span>Subscription Tiers & Plans</span>
          </button>

          <button
            onClick={() => setAdminTab('users')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              adminTab === 'users' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-cyan-400" />
            <span>Identity & RBAC Users</span>
          </button>

          <button
            onClick={() => setAdminTab('audit')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              adminTab === 'audit' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-emerald-400" />
            <span>Immutable Audit Trail</span>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 glass-panel rounded-2xl border border-white/10 p-4 overflow-y-auto">
        {adminTab === 'billing' && (
          <div className="space-y-4">
            <div className="text-center max-w-xl mx-auto mb-6">
              <h2 className="text-base font-bold text-white">Transparent Global Ecosystem Pricing</h2>
              <p className="text-xs text-slate-400 mt-1">
                Scale smoothly from individual learning and early coding to sovereign enterprise infrastructure.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {tiers.map(t => (
                <div
                  key={t.name}
                  className={`p-5 rounded-2xl border flex flex-col justify-between transition-all ${
                    t.current
                      ? 'bg-indigo-950/30 border-cyan-400 shadow-xl ring-1 ring-cyan-400/50'
                      : 'bg-slate-900/40 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-white text-sm uppercase font-mono">{t.name}</span>
                      {t.current && (
                        <span className="text-[10px] font-mono bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/40">
                          Active Plan
                        </span>
                      )}
                    </div>

                    <div className="flex items-baseline gap-1 my-3">
                      <span className="text-2xl font-extrabold text-white font-mono">{t.price}</span>
                      <span className="text-xs text-slate-400">{t.period}</span>
                    </div>

                    <p className="text-xs text-slate-400 mb-4 leading-relaxed">{t.description}</p>

                    <div className="space-y-2 border-t border-white/10 pt-3">
                      {t.features.map((f, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                          <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-3">
                    <button
                      onClick={() => handleSelectTier(t.name)}
                      disabled={t.current}
                      className={`w-full py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                        t.current
                          ? 'bg-white/10 text-slate-400 cursor-default'
                          : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md'
                      }`}
                    >
                      {t.current ? 'Current Subscription' : `Switch to ${t.name}`}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {adminTab === 'users' && (
          <div className="space-y-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-semibold text-slate-300 uppercase font-mono">
                Team Members & RBAC Roles ({orgUsers.length})
              </span>
              <button 
                onClick={() => alert('Invite sent to new enterprise user.')}
                className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs transition-colors cursor-pointer"
              >
                + Invite User
              </button>
            </div>

            <div className="divide-y divide-white/5 bg-slate-900/50 rounded-xl border border-white/10 overflow-hidden">
              {orgUsers.map(u => (
                <div key={u.id} className="p-3.5 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-white">{u.name}</div>
                    <div className="text-slate-400 text-[11px]">{u.email}</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-cyan-300 bg-cyan-500/10 px-2.5 py-1 rounded-md border border-cyan-500/20">
                      {u.role}
                    </span>
                    <span className="text-slate-500 font-mono text-[11px]">{u.lastLogin}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {adminTab === 'audit' && (
          <div className="space-y-2 font-mono text-xs text-slate-300">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 flex items-center justify-between">
              <div>
                <span className="text-emerald-400">[AUTH_PASSKEY_VERIFIED]</span> User EN-9042 successfully authenticated via hardware key NX-FIDO2.
              </div>
              <span className="text-slate-500">2026-09-27 14:02:18 CAT</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 flex items-center justify-between">
              <div>
                <span className="text-cyan-400">[EDGE_CLUSTER_AUTOSCALE]</span> Scaled af-south-1 pods from 14 to 28 replicas.
              </div>
              <span className="text-slate-500">2026-09-27 13:45:02 CAT</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 flex items-center justify-between">
              <div>
                <span className="text-indigo-400">[POLICY_AUDIT]</span> Sovereign data boundary test completed with zero egress leaks.
              </div>
              <span className="text-slate-500">2026-09-27 11:15:33 CAT</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
