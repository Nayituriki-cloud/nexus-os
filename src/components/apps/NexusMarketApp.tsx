import React, { useState } from 'react';
import { useNexus } from '../../context/NexusContext';
import { 
  Store, 
  BrainCircuit, 
  Download, 
  Star, 
  Check, 
  Sparkles, 
  Search, 
  SlidersHorizontal,
  ExternalLink,
  ShieldCheck,
  Tag
} from 'lucide-react';

interface MarketAgent {
  id: string;
  name: string;
  category: string;
  author: string;
  description: string;
  rating: number;
  installs: string;
  price: string;
  installed: boolean;
  capabilities: string[];
}

const initialMarketAgents: MarketAgent[] = [
  {
    id: 'ag-1',
    name: 'Pan-African Agricultural Advisor',
    category: 'AgriTech & Climate',
    author: 'Rwanda Agriculture Board & Nexus Labs',
    description: 'Hyper-localized satellite crop disease detection, weather modeling, and soil nutrient optimization across sub-Saharan Africa.',
    rating: 4.9,
    installs: '18.4k',
    price: 'Free',
    installed: true,
    capabilities: ['Satellite Telemetry', 'Swahili & Kinyarwanda NLP', 'Yield Forecasting']
  },
  {
    id: 'ag-2',
    name: 'International Trade & Customs Lawyer',
    category: 'Legal & Regulatory',
    author: 'KIFC Legal Fellows',
    description: 'Instant compliance checking for cross-border African Continental Free Trade Area (AfCFTA) tariff schedules and dispute clauses.',
    rating: 4.8,
    installs: '9.2k',
    price: '$29 / mo',
    installed: false,
    capabilities: ['AfCFTA Protocol Checks', 'Harmonized System Codes', 'Customs Arbitration']
  },
  {
    id: 'ag-3',
    name: 'Full-Stack Rust & WebAssembly Architect',
    category: 'Development',
    author: 'Nexus Developer Core',
    description: 'Writes ultra-high-throughput edge microservices in Rust, auto-compiles to Wasm, and generates zero-overhead HTTP wrappers.',
    rating: 5.0,
    installs: '42.1k',
    price: 'Free',
    installed: true,
    capabilities: ['Rust Memory Safety', 'Wasm Sandbox Compile', 'Zero-Copy Serialization']
  },
  {
    id: 'ag-4',
    name: 'Pan-African Travel & Visa Navigator',
    category: 'Productivity',
    author: 'Nomad Africa Tech',
    description: 'Calculates bilateral visa requirements, flight routes, currency exchange, and emergency medical protocols across all 54 African nations.',
    rating: 4.7,
    installs: '31.0k',
    price: 'Free',
    installed: false,
    capabilities: ['Real-time Visa Protocols', 'Multi-Leg Routing', 'Currency Converters']
  },
  {
    id: 'ag-5',
    name: 'Growth Marketing & Omnichannel Copywriter',
    category: 'Marketing',
    author: 'Kigali Creative Collective',
    description: 'Tailors social viral campaigns, SEO metadata, and product landing pages optimized for mobile-first audiences.',
    rating: 4.6,
    installs: '25.3k',
    price: '$15 / mo',
    installed: false,
    capabilities: ['Omnichannel Ad Copy', 'SEO Schema Generator', 'Audience Segmentation']
  }
];

export const NexusMarketApp: React.FC = () => {
  const { addNotification } = useNexus();
  const [agents, setAgents] = useState<MarketAgent[]>(initialMarketAgents);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'AgriTech & Climate', 'Legal & Regulatory', 'Development', 'Productivity', 'Marketing'];

  const toggleInstall = (id: string) => {
    setAgents(prev => prev.map(a => {
      if (a.id === id) {
        const nextState = !a.installed;
        addNotification(
          nextState ? 'Agent Installed' : 'Agent Removed',
          `${a.name} has been ${nextState ? 'added to your Nexus AI workspace' : 'uninstalled'}.`,
          'info'
        );
        return { ...a, installed: nextState };
      }
      return a;
    }));
  };

  const filtered = agents.filter(a => {
    const matchesSearch = a.name.toLowerCase().includes(searchQuery.toLowerCase()) || a.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || a.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="h-[calc(100vh-4.5rem)] flex flex-col max-w-7xl mx-auto p-3 md:p-6 pb-20 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 rounded-2xl glass-panel border border-white/10 mb-4 bg-gradient-to-r from-cyan-950/40 via-slate-900/90 to-blue-950/30">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Store className="w-5 h-5 text-cyan-400" />
            <h1 className="text-lg md:text-xl font-bold text-white tracking-tight">NEXUS AGENT STORE & ECOSYSTEM MARKET</h1>
            <span className="text-[10px] px-2 py-0.5 rounded-full font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              Verified Developer Registry
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Discover and integrate specialized autonomous neural agents, developer plugins, and enterprise micro-tools.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-cyan-300 bg-cyan-500/10 px-3 py-1.5 rounded-xl border border-cyan-500/30">
            Publish an Agent: sdk.nexus.systems
          </span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="glass-panel p-3 rounded-2xl border border-white/10 mb-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 w-full sm:w-80 bg-slate-950/70 border border-white/10 px-3 py-1.5 rounded-xl">
          <Search className="w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search agents, plugins, APIs..."
            className="bg-transparent text-xs text-white focus:outline-none w-full"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors shrink-0 cursor-pointer ${
                selectedCategory === cat ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Agents Grid */}
      <div className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pr-1">
        {filtered.map(agent => (
          <div
            key={agent.id}
            className="p-4 rounded-2xl glass-panel border border-white/10 hover:border-cyan-500/30 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded">
                  {agent.category}
                </span>
                <span className="text-xs font-bold text-slate-200">{agent.price}</span>
              </div>

              <h2 className="text-sm font-bold text-white mb-1">{agent.name}</h2>
              <div className="text-[11px] text-slate-400 mb-2">By {agent.author}</div>
              <p className="text-xs text-slate-300 leading-relaxed mb-3">{agent.description}</p>

              <div className="flex flex-wrap gap-1 mb-3">
                {agent.capabilities.map((cap, i) => (
                  <span key={i} className="text-[10px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-white/5">
                    {cap}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-1 text-xs text-amber-400">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="font-bold">{agent.rating}</span>
                <span className="text-slate-500 text-[10px]">({agent.installs})</span>
              </div>

              <button
                onClick={() => toggleInstall(agent.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  agent.installed
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md shadow-cyan-500/20'
                }`}
              >
                {agent.installed ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Configured</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5" />
                    <span>Install Agent</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
