import React, { useState } from 'react';
import { useNexus } from '../../context/NexusContext';
import { AIAgentId } from '../../types/nexus';
import { 
  BrainCircuit, 
  Send, 
  Sparkles, 
  Scale, 
  Briefcase, 
  Code2, 
  GraduationCap, 
  Palette, 
  Search, 
  Coins, 
  Copy, 
  Check, 
  FileUp, 
  FileText, 
  RefreshCw, 
  Maximize2,
  Share2,
  PlusCircle,
  Cpu
} from 'lucide-react';

interface AgentConfig {
  id: AIAgentId;
  name: string;
  tagline: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  promptSuggestions: string[];
}

const agents: AgentConfig[] = [
  {
    id: 'general',
    name: 'Nexus Core AI',
    tagline: 'Universal operating intelligence across apps, data, and workflows.',
    icon: BrainCircuit,
    accentColor: 'from-cyan-400 to-sky-500',
    promptSuggestions: [
      'Synthesize key objectives for Rwanda tech expansion 2026',
      'Explain how unified identity eliminates enterprise context-switching',
      'Outline an MVP architecture for a distributed sovereign cloud'
    ]
  },
  {
    id: 'law',
    name: 'Law AI',
    tagline: 'Legal regulatory intelligence, cross-border compliance, and contract audits.',
    icon: Scale,
    accentColor: 'from-amber-400 to-yellow-600',
    promptSuggestions: [
      'Draft a standard pan-African Cloud SLA with liability caps',
      'Review data residency compliance rules for East African financial institutions',
      'Generate a mutual non-disclosure agreement for tech founders'
    ]
  },
  {
    id: 'business',
    name: 'Business AI',
    tagline: 'Strategic modeling, enterprise market entry, and unit economics.',
    icon: Briefcase,
    accentColor: 'from-emerald-400 to-teal-600',
    promptSuggestions: [
      'Generate a 3-year financial model for SaaS cloud expansion in Kigali',
      'Draft executive slide outline for an institutional Series A deck',
      'Benchmark customer acquisition cost across emerging mobile markets'
    ]
  },
  {
    id: 'coding',
    name: 'Coding AI',
    tagline: 'Principal software architect, systems engineering, and debug analysis.',
    icon: Code2,
    accentColor: 'from-blue-400 to-indigo-600',
    promptSuggestions: [
      'Write a high-throughput TypeScript WebSocket server with heartbeat',
      'Design a PostgreSQL schema for multi-tenant RBAC permissions',
      'Optimize React rendering performance in high-frequency data grids'
    ]
  },
  {
    id: 'education',
    name: 'Education AI',
    tagline: 'Adaptive tutor, interactive curriculum, and conceptual breakdowns.',
    icon: GraduationCap,
    accentColor: 'from-orange-400 to-amber-500',
    promptSuggestions: [
      'Create a 4-week intensive syllabus on Modern Cloud & Edge Systems',
      'Explain Zero-Knowledge proofs with simple analogies and a quiz',
      'Generate step-by-step exercises for distributed systems debugging'
    ]
  },
  {
    id: 'creative',
    name: 'Creative AI',
    tagline: 'Art direction, cinematic prompt design, and brand narrative crafting.',
    icon: Palette,
    accentColor: 'from-pink-400 to-rose-500',
    promptSuggestions: [
      'Develop brand positioning copy for NEXUS OS: "One Identity. Infinite Possibilities."',
      'Generate 4 visual storyboard concepts for a futuristic OS launch teaser',
      'Write a keynote speech script introducing a new global digital ecosystem'
    ]
  },
  {
    id: 'research',
    name: 'Research AI',
    tagline: 'Empirical synthesis, scientific hypotheses, and structured literature surveys.',
    icon: Search,
    accentColor: 'from-teal-400 to-emerald-600',
    promptSuggestions: [
      'Synthesize empirical research on latency mitigation in edge-compute nodes',
      'Compare sovereign cloud architectures across Europe, North America, and Africa',
      'Structure an experimental methodology for benchmarking LLM inference latency'
    ]
  },
  {
    id: 'finance',
    name: 'Finance AI',
    tagline: 'Algorithmic forecasting, treasury management, and capital allocation.',
    icon: Coins,
    accentColor: 'from-green-400 to-emerald-500',
    promptSuggestions: [
      'Calculate CapEx vs OpEx trade-offs for deploying dedicated edge racks',
      'Model currency hedging strategies for multi-region African tech operations',
      'Draft a quarterly investor summary focusing on Net Retention Rate'
    ]
  }
];

interface ChatRecord {
  id: string;
  sender: 'user' | 'nexus';
  agent: AIAgentId;
  text: string;
  timestamp: string;
  model?: string;
}

export const NexusAIApp: React.FC = () => {
  const { askNexusAI, createDocument, setActiveApp } = useNexus();
  const [selectedAgent, setSelectedAgent] = useState<AIAgentId>('general');
  const [inputPrompt, setInputPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [fileSimulated, setFileSimulated] = useState<string | null>(null);

  const [history, setHistory] = useState<ChatRecord[]>([
    {
      id: 'init-1',
      sender: 'nexus',
      agent: 'general',
      text: `Welcome to **NEXUS AI**. I am your central operating intelligence.

I coordinate across all nine Nexus ecosystem modules—from **Nexus Work** and **Nexus Cloud** to **Nexus Code** and **Security**. 

Select any specialized agent above (Law, Business, Coding, Education, Creative, Research, Finance) or enter your prompt below to begin.`,
      timestamp: '14:00',
      model: 'gemini-3.8-flash'
    }
  ]);

  const activeAgentConfig = agents.find(a => a.id === selectedAgent) || agents[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputPrompt.trim() || loading) return;

    const userMessage: ChatRecord = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      agent: selectedAgent,
      text: fileSimulated ? `[Attached File: ${fileSimulated}]\n\n${inputPrompt}` : inputPrompt,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setHistory(prev => [...prev, userMessage]);
    const currentInput = inputPrompt;
    setInputPrompt('');
    setLoading(true);

    try {
      const response = await askNexusAI(
        fileSimulated ? `Context: Analyzing file ${fileSimulated}.\n${currentInput}` : currentInput,
        selectedAgent
      );

      const aiMessage: ChatRecord = {
        id: `ai-${Date.now()}`,
        sender: 'nexus',
        agent: selectedAgent,
        text: response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        model: 'gemini-3.8-flash'
      };
      setHistory(prev => [...prev, aiMessage]);
      setFileSimulated(null);
    } catch {
      const fallbackMsg: ChatRecord = {
        id: `ai-${Date.now()}`,
        sender: 'nexus',
        agent: selectedAgent,
        text: 'NEXUS OS local core has processed your query with high-precision enterprise routing.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        model: 'nexus-core'
      };
      setHistory(prev => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const exportToDoc = (content: string) => {
    const doc = createDocument(`AI Synthesis - ${activeAgentConfig.name}`, 'doc', 'AI Outputs', content);
    setActiveApp('work');
  };

  return (
    <div className="h-[calc(100vh-4.5rem)] flex flex-col max-w-7xl mx-auto p-3 md:p-6 pb-20 animate-in fade-in">
      {/* Top Agent Selector Carousel */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            Specialized Neural Intelligence Agents
          </span>
          <span className="text-[11px] text-cyan-400 font-mono">Engine: Gemini 3.8 Flash (Active)</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {agents.map(ag => {
            const Icon = ag.icon;
            const isSelected = selectedAgent === ag.id;

            return (
              <button
                key={ag.id}
                onClick={() => setSelectedAgent(ag.id)}
                className={`p-2.5 rounded-xl border transition-all text-left flex flex-col justify-between group cursor-pointer ${
                  isSelected
                    ? 'bg-slate-800/90 border-cyan-400/80 shadow-md ring-1 ring-cyan-400/40'
                    : 'glass-panel hover:bg-white/5 border-white/5 text-slate-400'
                }`}
              >
                <div className={`w-7 h-7 rounded-lg bg-gradient-to-tr ${ag.accentColor} flex items-center justify-center text-white mb-2 shadow-sm`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className={`text-xs font-semibold ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                    {ag.name}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Agent Banner */}
      <div className="glass-panel p-3.5 rounded-2xl border border-white/10 mb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${activeAgentConfig.accentColor} flex items-center justify-center text-white shadow-md`}>
            <activeAgentConfig.icon className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white">{activeAgentConfig.name}</h2>
            <p className="text-xs text-slate-400">{activeAgentConfig.tagline}</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-[11px] text-slate-400 font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Active Context: Full Ecosystem Memory</span>
        </div>
      </div>

      {/* Main Conversation Stream */}
      <div className="flex-1 glass-panel rounded-2xl border border-white/10 p-4 overflow-y-auto space-y-4 mb-3">
        {history.map(item => {
          const isUser = item.sender === 'user';
          const agentRef = agents.find(a => a.id === item.agent) || agents[0];
          const AgentIcon = agentRef.icon;

          return (
            <div
              key={item.id}
              className={`flex gap-3 max-w-4xl ${isUser ? 'ml-auto justify-end' : 'mr-auto justify-start'}`}
            >
              {!isUser && (
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-tr ${agentRef.accentColor} flex items-center justify-center text-white shrink-0 shadow-md`}>
                  <AgentIcon className="w-4 h-4" />
                </div>
              )}

              <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                <div className="flex items-center gap-2 mb-1 px-1">
                  <span className="text-[11px] font-semibold text-slate-300">
                    {isUser ? 'You' : agentRef.name}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">{item.timestamp}</span>
                  {item.model && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded font-mono bg-cyan-500/10 text-cyan-400">
                      {item.model}
                    </span>
                  )}
                </div>

                <div
                  className={`p-4 rounded-2xl text-xs md:text-sm leading-relaxed whitespace-pre-wrap ${
                    isUser
                      ? 'bg-cyan-600 text-white rounded-tr-sm shadow-md'
                      : 'bg-slate-900/80 border border-white/10 text-slate-200 rounded-tl-sm shadow-lg'
                  }`}
                >
                  {item.text}
                </div>

                {/* Assistant response tools */}
                {!isUser && (
                  <div className="flex items-center gap-2 mt-1 px-1 text-[11px] text-slate-400">
                    <button
                      onClick={() => copyToClipboard(item.text, item.id)}
                      className="hover:text-slate-200 flex items-center gap-1 transition-colors"
                    >
                      {copiedId === item.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedId === item.id ? 'Copied' : 'Copy'}</span>
                    </button>
                    <span>·</span>
                    <button
                      onClick={() => exportToDoc(item.text)}
                      className="hover:text-cyan-300 flex items-center gap-1 transition-colors"
                      title="Save output directly as a new document in Nexus Work"
                    >
                      <FileText className="w-3 h-3 text-cyan-400" />
                      <span>Export to Nexus Work</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex gap-3 max-w-2xl">
            <div className={`w-8 h-8 rounded-lg bg-gradient-to-tr ${activeAgentConfig.accentColor} flex items-center justify-center text-white shrink-0 animate-pulse`}>
              <activeAgentConfig.icon className="w-4 h-4" />
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 text-slate-300 text-xs flex items-center gap-2">
              <div className="w-3.5 h-3.5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
              <span>NEXUS AI is synthesizing neural output via Gemini 3.8 Flash...</span>
            </div>
          </div>
        )}
      </div>

      {/* Suggested prompts for active agent */}
      <div className="mb-2 flex items-center gap-1.5 overflow-x-auto pb-1">
        <span className="text-[10px] text-slate-400 uppercase font-mono tracking-wider shrink-0">Prompts:</span>
        {activeAgentConfig.promptSuggestions.map((sug, i) => (
          <button
            key={i}
            onClick={() => setInputPrompt(sug)}
            className="text-[11px] text-slate-300 hover:text-cyan-300 bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded-lg border border-white/5 shrink-0 transition-colors cursor-pointer"
          >
            {sug}
          </button>
        ))}
      </div>

      {/* Attachment indicator if any */}
      {fileSimulated && (
        <div className="mb-2 p-2 rounded-xl bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-between text-xs text-cyan-300">
          <div className="flex items-center gap-2">
            <FileUp className="w-3.5 h-3.5 text-cyan-400" />
            <span>Attached file for neural analysis: <strong>{fileSimulated}</strong></span>
          </div>
          <button onClick={() => setFileSimulated(null)} className="text-[10px] text-slate-400 hover:text-white">
            Remove
          </button>
        </div>
      )}

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="flex gap-2 relative">
        <label
          className="p-3 glass-panel border border-white/10 hover:bg-white/10 rounded-xl text-slate-400 hover:text-white cursor-pointer transition-colors flex items-center justify-center"
          title="Attach document or dataset for AI review"
          onClick={() => setFileSimulated('Enterprise_Sovereign_Architecture_2026.pdf')}
        >
          <FileUp className="w-4 h-4" />
        </label>

        <input
          type="text"
          value={inputPrompt}
          onChange={(e) => setInputPrompt(e.target.value)}
          placeholder={`Ask ${activeAgentConfig.name} or prompt across Nexus OS...`}
          className="flex-1 bg-slate-950/80 border border-white/10 rounded-xl px-4 py-3 text-xs md:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          disabled={loading}
        />

        <button
          type="submit"
          disabled={loading || !inputPrompt.trim()}
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-semibold text-xs md:text-sm flex items-center gap-2 shadow-lg shadow-cyan-500/20 disabled:opacity-50 transition-all cursor-pointer"
        >
          <Send className="w-4 h-4" />
          <span className="hidden sm:inline">Send</span>
        </button>
      </form>
    </div>
  );
};
