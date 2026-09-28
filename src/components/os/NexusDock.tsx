import React from 'react';
import { useNexus } from '../../context/NexusContext';
import { NexusAppId } from '../../types/nexus';
import { 
  LayoutGrid, 
  BrainCircuit, 
  FileSpreadsheet, 
  CloudLightning, 
  Code2, 
  MessageSquareShare, 
  GraduationCap, 
  Briefcase, 
  Palette, 
  Store, 
  ShieldAlert, 
  Settings2
} from 'lucide-react';

interface DockItem {
  id: NexusAppId;
  label: string;
  sub: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const dockItems: DockItem[] = [
  { id: 'workspace', label: 'Workspace', sub: 'Hub', icon: LayoutGrid, color: 'from-sky-400 to-blue-600' },
  { id: 'ai', label: 'Nexus AI', sub: 'Intelligence', icon: BrainCircuit, color: 'from-cyan-400 to-teal-500' },
  { id: 'work', label: 'Nexus Work', sub: 'Productivity', icon: FileSpreadsheet, color: 'from-blue-500 to-indigo-600' },
  { id: 'cloud', label: 'Nexus Cloud', sub: 'Compute & Edge', icon: CloudLightning, color: 'from-indigo-400 to-cyan-500' },
  { id: 'code', label: 'Nexus Code', sub: 'Dev Studio', icon: Code2, color: 'from-emerald-400 to-teal-600' },
  { id: 'connect', label: 'Nexus Connect', sub: 'Comms & Video', icon: MessageSquareShare, color: 'from-violet-400 to-purple-600' },
  { id: 'campus', label: 'Nexus Campus', sub: 'Education', icon: GraduationCap, color: 'from-amber-400 to-orange-500' },
  { id: 'business', label: 'Nexus Business', sub: 'Enterprise', icon: Briefcase, color: 'from-teal-400 to-emerald-600' },
  { id: 'creator', label: 'Nexus Creator', sub: 'Studio', icon: Palette, color: 'from-pink-500 to-rose-600' },
  { id: 'market', label: 'Nexus Market', sub: 'Agent Store', icon: Store, color: 'from-cyan-500 to-blue-500' },
  { id: 'security', label: 'Security Center', sub: 'Zero-Trust', icon: ShieldAlert, color: 'from-emerald-500 to-teal-700' },
  { id: 'admin', label: 'Admin Console', sub: 'Governance', icon: Settings2, color: 'from-slate-400 to-slate-600' },
];

export const NexusDock: React.FC = () => {
  const { activeApp, setActiveApp, openApps } = useNexus();

  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-50 px-2 py-1.5 rounded-2xl glass-panel shadow-2xl border border-white/10 flex items-center gap-1 sm:gap-1.5 max-w-[98vw] overflow-x-auto">
      {dockItems.map(item => {
        const Icon = item.icon;
        const isActive = activeApp === item.id;
        const isOpen = openApps.includes(item.id);

        return (
          <button
            key={item.id}
            onClick={() => setActiveApp(item.id)}
            className={`group relative p-2 rounded-xl transition-all duration-200 flex flex-col items-center justify-center cursor-pointer ${
              isActive
                ? 'bg-white/15 shadow-lg scale-110 -translate-y-1'
                : 'hover:bg-white/10 hover:scale-105 hover:-translate-y-0.5'
            }`}
            title={`${item.label} — ${item.sub}`}
          >
            {/* Icon container */}
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-tr ${item.color} shadow-sm transition-transform`}>
              <Icon className="w-4 h-4 text-white" />
            </div>

            {/* Label in hover tooltip */}
            <div className="absolute -top-9 px-2 py-1 rounded-md glass-panel text-[11px] font-medium text-slate-200 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap shadow-xl border border-white/10">
              {item.label}
            </div>

            {/* Active app indicator dot */}
            <div className="mt-1 flex items-center justify-center h-1">
              {isActive ? (
                <div className="w-3 h-1 rounded-full bg-cyan-400 glow-cyan transition-all" />
              ) : isOpen ? (
                <div className="w-1 h-1 rounded-full bg-slate-400" />
              ) : (
                <div className="w-1 h-1 opacity-0" />
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
};
