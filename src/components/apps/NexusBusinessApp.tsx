import React, { useState } from 'react';
import { useNexus } from '../../context/NexusContext';
import { 
  Briefcase, 
  Users, 
  TrendingUp, 
  CreditCard, 
  DollarSign, 
  Building2, 
  Sparkles, 
  Plus, 
  ArrowUpRight, 
  FileText, 
  CheckCircle2,
  PieChart
} from 'lucide-react';

interface Deal {
  id: string;
  client: string;
  value: string;
  stage: 'Qualified' | 'Proposal' | 'Negotiation' | 'Closed Won';
  probability: string;
  region: string;
}

const initialDeals: Deal[] = [
  { id: 'd1', client: 'Bank of Kigali Financial Group', value: '$450,000 / yr', stage: 'Negotiation', probability: '85%', region: 'Rwanda' },
  { id: 'd2', client: 'Safaricom Telecommunications', value: '$720,000 / yr', stage: 'Proposal', probability: '65%', region: 'Kenya' },
  { id: 'd3', client: 'Pan-African Health Network', value: '$280,000 / yr', stage: 'Closed Won', probability: '100%', region: 'Pan-Africa' },
  { id: 'd4', client: 'Norrsken Kigali Founder Hub', value: '$120,000 / yr', stage: 'Qualified', probability: '50%', region: 'Rwanda' }
];

export const NexusBusinessApp: React.FC = () => {
  const { askNexusAI, createDocument, setActiveApp } = useNexus();
  const [deals, setDeals] = useState<Deal[]>(initialDeals);
  const [activeTab, setActiveTab] = useState<'crm' | 'team' | 'finance'>('crm');
  const [aiReportGenerating, setAiReportGenerating] = useState(false);

  const handleGenerateExecutiveForecast = async () => {
    setAiReportGenerating(true);
    try {
      const dealsSummary = deals.map(d => `${d.client}: ${d.value} (${d.stage}, ${d.probability})`).join('\n');
      const forecast = await askNexusAI(
        `Act as Nexus Executive Business AI. Analyze this enterprise deals pipeline and provide a quarterly ARR forecast, sales velocity analysis, and 3 risk mitigations:\n\n${dealsSummary}`,
        'business'
      );
      createDocument('Q4 Executive Pipeline Analysis', 'doc', 'Executive', forecast);
      setActiveApp('work');
    } finally {
      setAiReportGenerating(false);
    }
  };

  return (
    <div className="h-[calc(100vh-4.5rem)] flex flex-col max-w-7xl mx-auto p-3 md:p-6 pb-20 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 rounded-2xl glass-panel border border-white/10 mb-4 bg-gradient-to-r from-teal-950/40 via-slate-900/90 to-emerald-950/30">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Briefcase className="w-5 h-5 text-teal-400" />
            <h1 className="text-lg md:text-xl font-bold text-white tracking-tight">NEXUS BUSINESS ENTERPRISE SUITE</h1>
            <span className="text-[10px] px-2 py-0.5 rounded-full font-mono bg-teal-500/20 text-teal-300 border border-teal-500/30">
              CRM & Financial ERP
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Enterprise pipeline management, global workforce directory, and automated treasury analytics.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleGenerateExecutiveForecast}
            disabled={aiReportGenerating}
            className="px-3.5 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-semibold text-xs flex items-center gap-1.5 shadow-md shadow-teal-500/20 transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Executive Forecast</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="glass-panel p-2 rounded-2xl border border-white/10 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveTab('crm')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'crm' ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5 text-teal-400" />
            <span>CRM & Deal Pipeline</span>
          </button>

          <button
            onClick={() => setActiveTab('team')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'team' ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-cyan-400" />
            <span>Workforce Directory</span>
          </button>

          <button
            onClick={() => setActiveTab('finance')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'finance' ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5 text-emerald-400" />
            <span>Treasury & Invoicing</span>
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-3 text-xs font-mono text-slate-400">
          <span>Weighted Pipeline: <strong className="text-teal-300">$1,570,000</strong></span>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 glass-panel rounded-2xl border border-white/10 p-4 overflow-y-auto">
        {activeTab === 'crm' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5">
                <div className="text-[10px] text-slate-400 uppercase font-mono">Total Pipeline Value</div>
                <div className="text-xl font-bold text-white font-mono mt-1">$1.57 Million</div>
                <div className="text-[10px] text-emerald-400 mt-0.5">+48% growth QoQ</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5">
                <div className="text-[10px] text-slate-400 uppercase font-mono">Win Rate</div>
                <div className="text-xl font-bold text-teal-300 font-mono mt-1">74.2%</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Average sales cycle: 38 days</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5">
                <div className="text-[10px] text-slate-400 uppercase font-mono">Target Region</div>
                <div className="text-xl font-bold text-cyan-300 font-mono mt-1">East & West Africa</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Expanding into COMESA</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5">
                <div className="text-[10px] text-slate-400 uppercase font-mono">Net Retention Rate</div>
                <div className="text-xl font-bold text-emerald-400 font-mono mt-1">138%</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Tier 1 institutional clients</div>
              </div>
            </div>

            <div className="space-y-2 mt-4">
              <h2 className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
                Active Institutional Opportunities
              </h2>
              {deals.map(deal => (
                <div
                  key={deal.id}
                  className="p-4 rounded-xl bg-slate-900/50 border border-white/5 hover:border-white/20 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-3"
                >
                  <div>
                    <div className="text-sm font-bold text-white">{deal.client}</div>
                    <div className="text-xs text-slate-400 flex items-center gap-2 mt-1">
                      <span>Region: {deal.region}</span>
                      <span>·</span>
                      <span>Probability: {deal.probability}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-mono">
                    <span className="text-teal-300 font-bold text-sm">{deal.value}</span>
                    <span className={`px-2.5 py-1 rounded text-[11px] font-semibold ${
                      deal.stage === 'Closed Won' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                      deal.stage === 'Negotiation' ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30' :
                      'bg-slate-800 text-slate-300'
                    }`}>
                      {deal.stage}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'team' && (
          <div className="space-y-3">
            <h2 className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
              Enterprise Workforce & Role Delegation
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-white/10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold">
                  EN
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Emmanuel Nayituriki</div>
                  <div className="text-xs text-slate-400">Chief Technology Architect</div>
                  <div className="text-[10px] text-cyan-400 font-mono mt-0.5">Role: Super Admin</div>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/60 border border-white/10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-500/20 text-indigo-300 flex items-center justify-center font-bold">
                  SK
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Sarah Kagame</div>
                  <div className="text-xs text-slate-400">VP of Sovereign Infrastructure</div>
                  <div className="text-[10px] text-indigo-400 font-mono mt-0.5">Role: Cluster Lead</div>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/60 border border-white/10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold">
                  AD
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Amina Diallo</div>
                  <div className="text-xs text-slate-400">Head of Regulatory & Security</div>
                  <div className="text-[10px] text-emerald-400 font-mono mt-0.5">Role: Compliance Officer</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'finance' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-emerald-500/20 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-white text-sm">Automated Invoicing Engine</h3>
                <p className="text-xs text-slate-400 mt-1">Multi-currency reconciliation supporting USD, EUR, RWF, and KES with automatic taxation.</p>
              </div>
              <button 
                onClick={() => alert('Generated invoice INV-2026-09-001 for Bank of Kigali.')}
                className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs transition-colors cursor-pointer"
              >
                + Issue New Invoice
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
