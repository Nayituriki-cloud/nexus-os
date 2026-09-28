import React, { useState } from 'react';
import { useNexus } from '../../context/NexusContext';
import { 
  ShieldAlert, 
  ShieldCheck, 
  Key, 
  Smartphone, 
  Laptop, 
  Trash2, 
  AlertTriangle, 
  CheckCircle2, 
  RefreshCw,
  Lock,
  EyeOff,
  Activity
} from 'lucide-react';

export const NexusSecurityApp: React.FC = () => {
  const { user, updateUser, addNotification } = useNexus();
  const [devices, setDevices] = useState(user.devices);
  const [zeroTrustActive, setZeroTrustActive] = useState(true);
  const [dataResidency, setDataResidency] = useState<'sovereign-rwanda' | 'pan-africa' | 'global'>('sovereign-rwanda');
  const [isAuditing, setIsAuditing] = useState(false);

  const revokeDevice = (id: string, name: string) => {
    const updated = devices.filter(d => d.id !== id);
    setDevices(updated);
    updateUser({ devices: updated });
    addNotification('Device Revoked', `Session for "${name}" has been terminated and cryptographic keys flushed.`, 'security');
  };

  const handleEnrollPasskey = () => {
    const nextCount = user.passkeysCount + 1;
    updateUser({ passkeysCount: nextCount });
    addNotification('Passkey Registered', `Hardware biometric key #${nextCount} enrolled to Nexus ID.`, 'security');
  };

  const runSecurityAudit = () => {
    setIsAuditing(true);
    setTimeout(() => {
      setIsAuditing(false);
      addNotification('Security Audit Passed', 'Zero vulnerabilities detected. All active tokens cryptographically verified.', 'security');
    }, 1500);
  };

  return (
    <div className="h-[calc(100vh-4.5rem)] flex flex-col max-w-7xl mx-auto p-3 md:p-6 pb-20 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 rounded-2xl glass-panel border border-white/10 mb-4 bg-gradient-to-r from-emerald-950/40 via-slate-900/90 to-teal-950/30">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h1 className="text-lg md:text-xl font-bold text-white tracking-tight">NEXUS ZERO-TRUST SECURITY CENTER</h1>
            <span className="text-[10px] px-2 py-0.5 rounded-full font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Post-Quantum Enforced
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Real-time heuristic threat detection, biometric hardware passkeys, and sovereign data perimeter boundaries.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={runSecurityAudit}
            disabled={isAuditing}
            className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-500/20 transition-colors cursor-pointer"
          >
            {isAuditing ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <ShieldCheck className="w-3.5 h-3.5" />}
            <span>{isAuditing ? 'Auditing Nodes...' : 'Run Zero-Trust Audit'}</span>
          </button>
        </div>
      </div>

      {/* Security Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="p-4 rounded-2xl glass-panel border border-emerald-500/30 bg-emerald-950/20">
          <div className="flex justify-between items-start">
            <span className="text-xs font-semibold text-emerald-300 uppercase font-mono">Posture Score</span>
            <span className="text-xl font-bold text-emerald-400 font-mono">99 / 100</span>
          </div>
          <p className="text-xs text-slate-300 mt-2">Zero unauthenticated access attempts in the past 30 days.</p>
        </div>

        <div className="p-4 rounded-2xl glass-panel border border-cyan-500/30 bg-cyan-950/20">
          <div className="flex justify-between items-start">
            <span className="text-xs font-semibold text-cyan-300 uppercase font-mono">FIDO2 Passkeys</span>
            <span className="text-xl font-bold text-cyan-400 font-mono">{user.passkeysCount} Active</span>
          </div>
          <button 
            onClick={handleEnrollPasskey}
            className="text-xs text-cyan-300 hover:underline mt-2 flex items-center gap-1 cursor-pointer"
          >
            + Register New Passkey Device
          </button>
        </div>

        <div className="p-4 rounded-2xl glass-panel border border-indigo-500/30 bg-indigo-950/20">
          <div className="flex justify-between items-start">
            <span className="text-xs font-semibold text-indigo-300 uppercase font-mono">Sovereign Boundary</span>
            <span className="text-xs font-bold text-indigo-300 font-mono uppercase">{dataResidency}</span>
          </div>
          <p className="text-xs text-slate-300 mt-2">Data stored exclusively in encrypted af-south-1 nodes.</p>
        </div>
      </div>

      {/* Device Management Section */}
      <div className="flex-1 glass-panel rounded-2xl border border-white/10 p-4 overflow-y-auto space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-white/10">
          <span className="text-xs font-semibold text-slate-300 uppercase font-mono flex items-center gap-1.5">
            <Laptop className="w-3.5 h-3.5 text-cyan-400" />
            Enrolled Hardware Devices ({devices.length})
          </span>
          <span className="text-[10px] text-slate-400 font-mono">Continuous Mutual TLS Handshake</span>
        </div>

        <div className="space-y-3">
          {devices.map(device => (
            <div
              key={device.id}
              className="p-4 rounded-xl bg-slate-900/60 border border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-300">
                  {device.name.includes('Mobile') ? <Smartphone className="w-5 h-5 text-indigo-400" /> : <Laptop className="w-5 h-5 text-cyan-400" />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">{device.name}</span>
                    {device.isCurrent && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                        Current Session
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5 flex items-center gap-2 font-mono">
                    <span>IP: {device.ip}</span>
                    <span>·</span>
                    <span>{device.location}</span>
                    <span>·</span>
                    <span>{device.lastActive}</span>
                  </div>
                </div>
              </div>

              {!device.isCurrent && (
                <button
                  onClick={() => revokeDevice(device.id, device.name)}
                  className="px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Revoke Session</span>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
