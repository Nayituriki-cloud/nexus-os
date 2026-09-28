import React, { useState } from 'react';
import { useNexus } from '../../context/NexusContext';
import { NexusCloudService } from '../../types/nexus';
import { 
  CloudLightning, 
  Server, 
  Database, 
  HardDrive, 
  Activity, 
  Plus, 
  Terminal, 
  Globe, 
  CheckCircle, 
  AlertCircle, 
  RefreshCw, 
  Play, 
  Square, 
  ExternalLink,
  Cpu,
  Layers
} from 'lucide-react';

export const NexusCloudApp: React.FC = () => {
  const { cloudServices, deployService, addNotification } = useNexus();
  const [selectedTab, setSelectedTab] = useState<'compute' | 'database' | 'storage' | 'logs'>('compute');
  const [newServiceName, setNewServiceName] = useState('');
  const [newServiceType, setNewServiceType] = useState<NexusCloudService['type']>('container');
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);

  // Cloud logs stream
  const [logs, setLogs] = useState<string[]>([
    '[NEXUS-CLOUD af-south-1] Edge cluster healthy. 14 micro-nodes online.',
    '[nexus-core-api] Handshake confirmed with London primary cluster (latency: 42ms).',
    '[nexus-postgres-cluster] Replicas in sync (WAL offset: 0, 14.2k queries/sec).',
    '[nexus-assets-s3] CDN cache hit ratio: 98.4% across 18 edge distribution pops.',
    '[security-monitor] TLS 1.3 enforced. 0 abnormal handshake requests.'
  ]);

  const handleCreateService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newServiceName.trim()) return;
    deployService(newServiceName, newServiceType);
    setLogs(prev => [`[NEW DEPLOYMENT] Provisioning ${newServiceName} (${newServiceType}) in af-south-1...`, ...prev]);
    setNewServiceName('');
    setIsDeployModalOpen(false);
  };

  return (
    <div className="h-[calc(100vh-4.5rem)] flex flex-col max-w-7xl mx-auto p-3 md:p-6 pb-20 animate-in fade-in">
      {/* Cloud Header & Telemetry Summary */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 rounded-2xl glass-panel border border-white/10 mb-4 bg-gradient-to-r from-slate-900/90 via-indigo-950/40 to-cyan-950/40">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <CloudLightning className="w-5 h-5 text-cyan-400" />
            <h1 className="text-lg md:text-xl font-bold text-white tracking-tight">NEXUS CLOUD INFRASTRUCTURE</h1>
            <span className="text-[10px] px-2 py-0.5 rounded-full font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              Sovereign Multi-Region
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Global compute fabric with zero-cold-start containers, distributed PostgreSQL clusters, and edge object storage.
          </p>
        </div>

        <button
          onClick={() => setIsDeployModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Deploy New Service</span>
        </button>
      </div>

      {/* Cloud Top Tabs */}
      <div className="glass-panel p-2 rounded-2xl border border-white/10 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setSelectedTab('compute')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              selectedTab === 'compute' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Server className="w-3.5 h-3.5 text-cyan-400" />
            <span>Containers & Edge APIs</span>
          </button>
          <button
            onClick={() => setSelectedTab('database')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              selectedTab === 'database' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Database className="w-3.5 h-3.5 text-indigo-400" />
            <span>Databases (Postgres & Redis)</span>
          </button>
          <button
            onClick={() => setSelectedTab('storage')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              selectedTab === 'storage' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <HardDrive className="w-3.5 h-3.5 text-emerald-400" />
            <span>Object Storage & Buckets</span>
          </button>
          <button
            onClick={() => setSelectedTab('logs')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              selectedTab === 'logs' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal className="w-3.5 h-3.5 text-amber-400" />
            <span>Live Telemetry & Logs</span>
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-3 text-xs text-slate-400 font-mono">
          <span>Active Edge: Kigali (af-south-1)</span>
          <span className="text-emerald-400 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> 100% SLA
          </span>
        </div>
      </div>

      {/* Main Tab Content */}
      <div className="flex-1 glass-panel rounded-2xl border border-white/10 p-4 overflow-y-auto">
        {selectedTab === 'compute' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5">
                <div className="text-[11px] text-slate-400 uppercase font-mono">Total Edge Replicas</div>
                <div className="text-2xl font-bold text-cyan-400 font-mono mt-1">28 Pods</div>
                <div className="text-[10px] text-slate-500 mt-1">Autoscaling threshold: 75% CPU</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5">
                <div className="text-[11px] text-slate-400 uppercase font-mono">Network Ingress / Egress</div>
                <div className="text-2xl font-bold text-white font-mono mt-1">3.4 TB / mo</div>
                <div className="text-[10px] text-emerald-400 mt-1">Optimized by Nexus Edge CDN</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5">
                <div className="text-[11px] text-slate-400 uppercase font-mono">Average Latency (Kigali)</div>
                <div className="text-2xl font-bold text-emerald-400 font-mono mt-1">8.4 ms</div>
                <div className="text-[10px] text-slate-500 mt-1">Zero cold-start edge execution</div>
              </div>
            </div>

            <div className="space-y-2 mt-4">
              <h2 className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
                Active Compute Services
              </h2>
              {cloudServices.filter(s => s.type === 'container' || s.type === 'api').map(service => (
                <div
                  key={service.id}
                  className="p-4 rounded-xl bg-slate-900/50 border border-white/5 hover:border-white/20 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                      <Server className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-white text-sm">{service.name}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                          service.status === 'running' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                        }`}>
                          {service.status.toUpperCase()}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 flex items-center gap-2 mt-1">
                        <span>{service.region}</span>
                        <span>·</span>
                        <span>Requests: {service.requests}</span>
                        {service.endpoint && (
                          <>
                            <span>·</span>
                            <a href="#" onClick={(e) => e.preventDefault()} className="text-cyan-400 hover:underline flex items-center gap-0.5">
                              {service.endpoint} <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-mono">
                    <div className="text-right">
                      <span className="text-slate-400">CPU Usage</span>
                      <div className="text-cyan-300 font-bold">{service.cpu}%</div>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-400">Memory</span>
                      <div className="text-indigo-300 font-bold">{service.memory} GB</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedTab === 'database' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-indigo-500/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h3 className="font-bold text-white text-sm flex items-center gap-2">
                  <Database className="w-4 h-4 text-indigo-400" />
                  Distributed PostgreSQL Cluster (Nexus-v16)
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Primary node: eu-west-2 | Read replica: af-south-1 (Kigali). Automatic failover enabled.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                  HEALTHY · 14.2k ops/s
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-white/10 font-mono text-xs space-y-2">
              <div className="text-slate-400 uppercase text-[10px]">Secure Internal Connection String:</div>
              <div className="p-2.5 bg-black/60 rounded-lg text-cyan-300 select-all border border-white/5 break-all">
                postgresql://nexus_admin:NX_TOKEN_SECURE_9042@pg-cluster-kigali.internal.nexus:5432/nexus_enterprise_db?sslmode=verify-full
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'storage' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-900/50 border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-white text-sm font-semibold">nexus-assets-s3</span>
                  <span className="text-xs text-cyan-400 font-mono">af-south-1</span>
                </div>
                <div className="text-xs text-slate-400">Public CDN bucket for client assets and video chunks.</div>
                <div className="pt-2 text-xs font-mono text-slate-300 flex justify-between">
                  <span>Size: 420.5 GB</span>
                  <span className="text-emerald-400">99.999999999% Durability</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/50 border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-white text-sm font-semibold">nexus-ai-embeddings-vault</span>
                  <span className="text-xs text-cyan-400 font-mono">Encrypted KMS</span>
                </div>
                <div className="text-xs text-slate-400">High-dimensional vector storage for enterprise neural search.</div>
                <div className="pt-2 text-xs font-mono text-slate-300 flex justify-between">
                  <span>Vectors: 45.8 Million</span>
                  <span className="text-indigo-400">Pinecone / pgvector hybrid</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'logs' && (
          <div className="h-full bg-black/80 rounded-xl p-4 font-mono text-xs text-slate-300 overflow-y-auto space-y-1.5 border border-white/10">
            <div className="text-cyan-400 mb-2">[NEXUS CLOUD REAL-TIME TELEMETRY STREAM]</div>
            {logs.map((log, index) => (
              <div key={index} className="flex gap-2">
                <span className="text-slate-600">{new Date().toLocaleTimeString()}</span>
                <span className={log.includes('NEW DEPLOYMENT') ? 'text-amber-400' : 'text-slate-300'}>{log}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Deployment Modal */}
      {isDeployModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-md glass-panel rounded-2xl p-5 border border-cyan-500/40 shadow-2xl">
            <h3 className="text-base font-bold text-white mb-2">Deploy Cloud Microservice</h3>
            <p className="text-xs text-slate-400 mb-4">
              Deploy a zero-cold-start container with automated TLS certificates across the Nexus edge mesh.
            </p>

            <form onSubmit={handleCreateService} className="space-y-3">
              <div>
                <label className="text-xs text-slate-300 block mb-1">Service Identifier</label>
                <input
                  type="text"
                  value={newServiceName}
                  onChange={(e) => setNewServiceName(e.target.value)}
                  placeholder="e.g. kigali-payment-gateway"
                  className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                  required
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1">Architecture Type</label>
                <select
                  value={newServiceType}
                  onChange={(e) => setNewServiceType(e.target.value as any)}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                >
                  <option value="container">Stateless Edge Container (Node/Go/Rust)</option>
                  <option value="api">High-Throughput GraphQL / REST API</option>
                  <option value="database">Dedicated PostgreSQL Cache Node</option>
                  <option value="bucket">Private Object Storage Vault</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsDeployModalOpen(false)}
                  className="px-3 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs transition-colors"
                >
                  Launch Deployment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
