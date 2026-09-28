import React, { useState, useEffect, useRef } from 'react';
import { useNexus } from '../../context/NexusContext';
import { 
  Search, 
  Terminal, 
  Sparkles, 
  FileText, 
  Presentation, 
  Table, 
  Cloud, 
  Video, 
  ShieldCheck, 
  CornerDownLeft, 
  Check, 
  AlertTriangle,
  ArrowRight,
  X
} from 'lucide-react';

interface SuggestedCommand {
  query: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
}

const suggestions: SuggestedCommand[] = [
  { query: "Create a presentation about Rwanda's technology sector and save it in my Business folder", category: "Nexus Work", icon: Presentation },
  { query: "Draft quarterly enterprise budget spreadsheet for Nexus Cloud", category: "Nexus Work", icon: Table },
  { query: "Deploy API to Nexus Cloud cluster (af-south-1 edge)", category: "Nexus Cloud", icon: Cloud },
  { query: "Start a team video meeting in #engineering channel", category: "Nexus Connect", icon: Video },
  { query: "Open Nexus Code IDE and inspect Applet router", category: "Nexus Code", icon: Terminal },
  { query: "Run comprehensive zero-trust security audit on active devices", category: "Security", icon: ShieldCheck },
  { query: "Analyze pan-African fintech regulations for cross-border payments", category: "Law AI", icon: Sparkles }
];

export const NexusCommandBar: React.FC = () => {
  const { isCommandOpen, setIsCommandOpen, executeCommand } = useNexus();
  const [query, setQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [actionConfirmation, setActionConfirmation] = useState<{
    pending: boolean;
    cmd: string;
    details: string;
    target: string;
  } | null>(null);
  const [resultMessage, setResultMessage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isCommandOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setResultMessage(null);
      setActionConfirmation(null);
    }
  }, [isCommandOpen]);

  if (!isCommandOpen) return null;

  const handleRun = async (text: string) => {
    if (!text.trim()) return;

    // Check if command is consequential (e.g. deployment or external write) requiring user confirmation
    const lower = text.toLowerCase();
    if (lower.includes('deploy') && !actionConfirmation) {
      setActionConfirmation({
        pending: true,
        cmd: text,
        details: 'This will compile container artifacts and provision edge instances in af-south-1 (Kigali).',
        target: 'NEXUS CLOUD INFRASTRUCTURE'
      });
      return;
    }

    setIsProcessing(true);
    try {
      const res = await executeCommand(text);
      setResultMessage(res.message || 'Action executed successfully.');
      setTimeout(() => {
        setIsCommandOpen(false);
        setQuery('');
        setIsProcessing(false);
        setActionConfirmation(null);
      }, 1400);
    } catch (err) {
      setResultMessage('Command processing failed. Please retry.');
      setIsProcessing(false);
    }
  };

  const confirmAction = () => {
    if (actionConfirmation) {
      handleRun(actionConfirmation.cmd);
      setActionConfirmation(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150">
      <div 
        className="w-full max-w-2xl glass-panel rounded-2xl shadow-2xl border border-cyan-500/30 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Command Input Header */}
        <div className="flex items-center px-4 py-3 border-b border-white/10 bg-slate-900/70">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-500 flex items-center justify-center mr-3 glow-cyan shrink-0">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleRun(query);
              if (e.key === 'Escape') setIsCommandOpen(false);
            }}
            placeholder="Type a command or natural prompt for NEXUS OS..."
            className="flex-1 bg-transparent border-none text-slate-100 placeholder-slate-400 text-sm focus:outline-none"
            disabled={isProcessing}
          />
          <button 
            onClick={() => setIsCommandOpen(false)}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Consequential Action Confirmation Prompt */}
        {actionConfirmation && (
          <div className="p-4 bg-amber-500/10 border-b border-amber-500/30 flex flex-col gap-3">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-semibold text-amber-300 uppercase tracking-wider">
                  Confirmation Required · {actionConfirmation.target}
                </div>
                <div className="text-xs text-slate-200 mt-1">
                  {actionConfirmation.details}
                </div>
                <div className="text-[11px] font-mono text-cyan-300 mt-1 bg-black/30 p-1.5 rounded">
                  {actionConfirmation.cmd}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                onClick={() => setActionConfirmation(null)}
                className="px-3 py-1.5 text-xs text-slate-300 hover:bg-white/10 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmAction}
                className="px-3 py-1.5 text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg flex items-center gap-1.5 transition-colors"
              >
                <Check className="w-3.5 h-3.5" />
                Confirm & Proceed
              </button>
            </div>
          </div>
        )}

        {/* Processing or Execution Status */}
        {isProcessing && (
          <div className="p-4 flex items-center gap-3 text-cyan-300 text-xs border-b border-white/10 bg-cyan-950/20">
            <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
            <span>NEXUS OS neural core is orchestrating your request across unified services...</span>
          </div>
        )}

        {resultMessage && (
          <div className="p-4 flex items-center gap-2 text-emerald-400 text-xs border-b border-white/10 bg-emerald-950/20 font-medium">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{resultMessage}</span>
          </div>
        )}

        {/* Suggested Natural Language Actions */}
        <div className="p-3 max-h-80 overflow-y-auto space-y-1">
          <div className="px-2 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span>Intelligent Ecosystem Commands</span>
            <span className="text-[10px] text-cyan-400 font-mono">Real-time Intent Routing</span>
          </div>

          {suggestions
            .filter(s => !query || s.query.toLowerCase().includes(query.toLowerCase()) || s.category.toLowerCase().includes(query.toLowerCase()))
            .map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setQuery(item.query);
                    handleRun(item.query);
                  }}
                  className="w-full text-left p-2 rounded-xl hover:bg-white/10 flex items-center justify-between group transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-lg bg-slate-800 text-slate-300 group-hover:text-cyan-300 group-hover:bg-cyan-500/20 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-200 group-hover:text-white font-medium">
                        {item.query}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Target: <span className="text-cyan-400/90">{item.category}</span>
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              );
            })}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2 border-t border-white/10 bg-slate-900/50 flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <div className="flex items-center gap-3">
            <span><kbd className="px-1 py-0.5 bg-white/10 rounded text-[10px]">Enter</kbd> to run</span>
            <span><kbd className="px-1 py-0.5 bg-white/10 rounded text-[10px]">Esc</kbd> to exit</span>
          </div>
          <span className="text-cyan-400">NEXUS COMMAND OS v4.2</span>
        </div>
      </div>
    </div>
  );
};
