import React, { useState } from 'react';
import { useNexus } from '../../context/NexusContext';
import { NexusAppId, NexusDocument } from '../../types/nexus';
import { 
  Sparkles, 
  FileText, 
  Table, 
  Presentation, 
  Cloud, 
  Code2, 
  Video, 
  CheckSquare, 
  Calendar as CalendarIcon, 
  MessageSquare, 
  ArrowUpRight, 
  Plus, 
  ShieldCheck, 
  Activity, 
  HardDrive, 
  Cpu, 
  FolderPlus,
  Play
} from 'lucide-react';

export const NexusWorkspace: React.FC = () => {
  const { 
    user, 
    setActiveApp, 
    documents, 
    createDocument, 
    cloudServices, 
    askNexusAI,
    setIsCommandOpen
  } = useNexus();

  const [aiQuickInput, setAiQuickInput] = useState('');
  const [aiQuickResponse, setAiQuickResponse] = useState<string | null>(null);
  const [isAsking, setIsAsking] = useState(false);
  
  // Custom workspace task items
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Finalize Rwanda Tech Sector 2026 Keynote', done: true, priority: 'High' },
    { id: 2, title: 'Review Sovereign Cloud af-south-1 failover test', done: false, priority: 'Urgent' },
    { id: 3, title: 'Approve Q4 Enterprise licensing contracts', done: false, priority: 'Normal' },
    { id: 4, title: 'Verify Nexus ID zero-trust biometric passkeys', done: true, priority: 'Normal' }
  ]);

  const [newTaskInput, setNewTaskInput] = useState('');

  const handleQuickAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuickInput.trim()) return;
    setIsAsking(true);
    setAiQuickResponse(null);
    try {
      const res = await askNexusAI(aiQuickInput, 'general');
      setAiQuickResponse(res);
    } catch {
      setAiQuickResponse('Query completed in offline mode.');
    } finally {
      setIsAsking(false);
    }
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskInput.trim()) return;
    setTasks([...tasks, { id: Date.now(), title: newTaskInput, done: false, priority: 'Normal' }]);
    setNewTaskInput('');
  };

  return (
    <div className="h-[calc(100vh-3rem)] overflow-y-auto pb-24 p-4 md:p-6 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Welcome Banner & Vision */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 rounded-2xl glass-panel border border-white/10 relative overflow-hidden bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-cyan-950/30">
        <div className="relative z-10 space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-widest text-cyan-400 font-mono font-semibold">NEXUS OS · Unified Digital Ecosystem</span>
            <span className="text-slate-600">·</span>
            <span className="text-xs text-slate-400 font-mono">Tenant: {user.organization}</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            Welcome back, {user.name}
          </h1>
          <p className="text-xs md:text-sm text-slate-400 max-w-2xl">
            "One Identity. One AI. One Digital Workspace. Infinite Possibilities." Your apps, cloud infrastructure, team meetings, and intelligence are synchronized.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setIsCommandOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Launch Command</span>
          </button>
          <button
            onClick={() => createDocument('Untitled Document', 'doc', 'General')}
            className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 text-xs flex items-center gap-1.5 transition-colors border border-white/10 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New File</span>
          </button>
        </div>
      </div>

      {/* AI Quick Neural Prompt Widget */}
      <div className="rounded-2xl glass-panel p-4 border border-cyan-500/20 bg-slate-900/40">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-semibold text-cyan-300 font-mono">NEXUS AI · Central Neural Terminal</span>
          </div>
          <button 
            onClick={() => setActiveApp('ai')}
            className="text-[11px] text-cyan-400 hover:underline flex items-center gap-1"
          >
            Open Full AI Suite <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>

        <form onSubmit={handleQuickAsk} className="flex gap-2">
          <input
            type="text"
            value={aiQuickInput}
            onChange={(e) => setAiQuickInput(e.target.value)}
            placeholder="Ask anything, analyze data, draft code, or request research..."
            className="flex-1 bg-slate-950/70 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            disabled={isAsking}
          />
          <button
            type="submit"
            disabled={isAsking}
            className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
          >
            {isAsking ? (
              <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Sparkles className="w-3.5 h-3.5" />
            )}
            <span>Generate</span>
          </button>
        </form>

        {aiQuickResponse && (
          <div className="mt-3 p-3.5 rounded-xl bg-slate-950/60 border border-white/10 text-xs text-slate-300 leading-relaxed font-sans max-h-48 overflow-y-auto whitespace-pre-wrap">
            {aiQuickResponse}
          </div>
        )}
      </div>

      {/* Grid: 3 Columns of Productivity & Operations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Recent Documents & Files */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              Recent Documents & Sheets
            </h2>
            <button
              onClick={() => setActiveApp('work')}
              className="text-[11px] text-cyan-400 hover:underline flex items-center gap-1"
            >
              View Work Suite <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-2">
            {documents.slice(0, 4).map(doc => {
              const DocIcon = doc.type === 'sheet' ? Table : doc.type === 'slide' ? Presentation : FileText;
              const iconColor = doc.type === 'sheet' ? 'text-emerald-400 bg-emerald-500/10' : doc.type === 'slide' ? 'text-amber-400 bg-amber-500/10' : 'text-blue-400 bg-blue-500/10';

              return (
                <div
                  key={doc.id}
                  onClick={() => setActiveApp('work')}
                  className="p-3 rounded-xl glass-panel border border-white/5 hover:border-white/20 transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className={`p-2 rounded-lg ${iconColor} shrink-0`}>
                      <DocIcon className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <div className="text-xs font-medium text-slate-200 group-hover:text-cyan-300 transition-colors truncate">
                        {doc.title}
                      </div>
                      <div className="text-[10px] text-slate-500 flex items-center gap-2 mt-0.5">
                        <span>Folder: {doc.folder}</span>
                        <span>·</span>
                        <span>{doc.lastModified}</span>
                      </div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-cyan-400 transition-colors shrink-0" />
                </div>
              );
            })}
          </div>

          {/* Quick Create Buttons */}
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => { createDocument('New Document', 'doc'); setActiveApp('work'); }}
              className="p-2.5 rounded-xl glass-panel hover:bg-white/5 border border-white/10 text-center flex flex-col items-center gap-1 text-xs text-slate-300 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-blue-400" />
              <span className="text-[11px]">Doc</span>
            </button>
            <button
              onClick={() => { createDocument('New Spreadsheet', 'sheet'); setActiveApp('work'); }}
              className="p-2.5 rounded-xl glass-panel hover:bg-white/5 border border-white/10 text-center flex flex-col items-center gap-1 text-xs text-slate-300 cursor-pointer"
            >
              <Table className="w-4 h-4 text-emerald-400" />
              <span className="text-[11px]">Sheet</span>
            </button>
            <button
              onClick={() => { createDocument('New Slide Deck', 'slide'); setActiveApp('work'); }}
              className="p-2.5 rounded-xl glass-panel hover:bg-white/5 border border-white/10 text-center flex flex-col items-center gap-1 text-xs text-slate-300 cursor-pointer"
            >
              <Presentation className="w-4 h-4 text-amber-400" />
              <span className="text-[11px]">Slide</span>
            </button>
          </div>
        </div>

        {/* Center Column: Tasks & Priority Actions */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <CheckSquare className="w-3.5 h-3.5 text-indigo-400" />
              Active Priority Tasks
            </h2>
            <span className="text-[11px] text-slate-400 font-mono">{tasks.filter(t => t.done).length}/{tasks.length} Completed</span>
          </div>

          <div className="glass-panel rounded-2xl p-3 border border-white/10 space-y-2">
            {tasks.map(task => (
              <div 
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className={`p-2.5 rounded-xl flex items-center justify-between transition-all cursor-pointer ${
                  task.done ? 'bg-white/2 text-slate-500 line-through' : 'bg-slate-900/50 hover:bg-slate-900/80 text-slate-200'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                    task.done ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300' : 'border-slate-600'
                  }`}>
                    {task.done && <CheckSquare className="w-3 h-3" />}
                  </div>
                  <span className="text-xs truncate">{task.title}</span>
                </div>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                  task.priority === 'Urgent' ? 'bg-rose-500/20 text-rose-300' : task.priority === 'High' ? 'bg-amber-500/20 text-amber-300' : 'bg-slate-800 text-slate-400'
                }`}>
                  {task.priority}
                </span>
              </div>
            ))}

            <form onSubmit={addTask} className="flex gap-2 pt-2 border-t border-white/10">
              <input
                type="text"
                value={newTaskInput}
                onChange={(e) => setNewTaskInput(e.target.value)}
                placeholder="Add a new task..."
                className="flex-1 bg-slate-950/70 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none"
              />
              <button
                type="submit"
                className="px-2.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium cursor-pointer"
              >
                Add
              </button>
            </form>
          </div>

          {/* Upcoming Schedule / Meetings */}
          <div className="glass-panel rounded-2xl p-3 border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <CalendarIcon className="w-3.5 h-3.5 text-purple-400" />
                Today's Synchronized Agenda
              </span>
              <button onClick={() => setActiveApp('connect')} className="text-[10px] text-purple-400 hover:underline">
                Nexus Connect
              </button>
            </div>
            <div className="space-y-1.5 text-xs">
              <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-between">
                <div>
                  <div className="font-medium text-slate-200">Kigali Innovation Hub Architecture Review</div>
                  <div className="text-[10px] text-slate-400">15:00 - 15:45 · Video Conf with Sarah & Amina</div>
                </div>
                <button 
                  onClick={() => setActiveApp('connect')}
                  className="px-2 py-1 rounded bg-purple-600 text-white text-[10px] font-medium flex items-center gap-1 cursor-pointer"
                >
                  <Play className="w-2.5 h-2.5" /> Join
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Nexus Cloud & Infrastructure Telemetry */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Cloud className="w-3.5 h-3.5 text-cyan-400" />
              Nexus Cloud Edge Nodes
            </h2>
            <button
              onClick={() => setActiveApp('cloud')}
              className="text-[11px] text-cyan-400 hover:underline flex items-center gap-1"
            >
              Console <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>

          {/* Live telemetry widget */}
          <div className="glass-panel rounded-2xl p-4 border border-white/10 space-y-3">
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-white/5">
                <div className="text-[10px] text-slate-400 uppercase font-mono">Cluster Health</div>
                <div className="text-base font-bold text-emerald-400 font-mono mt-0.5">99.99%</div>
                <div className="text-[10px] text-slate-500">Zero incidents</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-white/5">
                <div className="text-[10px] text-slate-400 uppercase font-mono">Edge Latency</div>
                <div className="text-base font-bold text-cyan-400 font-mono mt-0.5">9ms</div>
                <div className="text-[10px] text-slate-500">af-south-1</div>
              </div>
            </div>

            <div className="space-y-2">
              {cloudServices.map(srv => (
                <div key={srv.id} className="p-2.5 rounded-xl bg-slate-900/40 border border-white/5 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-mono font-medium text-slate-200">{srv.name}</div>
                    <div className="text-[10px] text-slate-500">{srv.region} · {srv.type}</div>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400">
                      {srv.status}
                    </span>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">CPU {srv.cpu}%</div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setActiveApp('cloud')}
              className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span>Deploy New Edge Container</span>
            </button>
          </div>

          {/* Quick Zero-Trust Security Card */}
          <div 
            onClick={() => setActiveApp('security')}
            className="p-3.5 rounded-2xl glass-panel border border-emerald-500/20 bg-emerald-950/10 hover:border-emerald-500/40 transition-all cursor-pointer flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-semibold text-emerald-300">Zero-Trust Shield Active</div>
                <div className="text-[10px] text-slate-400">3 Verified Passkey Devices · No Breaches</div>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-emerald-400" />
          </div>
        </div>

      </div>
    </div>
  );
};
