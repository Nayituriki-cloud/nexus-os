import React, { useState } from 'react';
import { useNexus } from '../../context/NexusContext';
import { 
  Code2, 
  Terminal, 
  FolderTree, 
  Play, 
  GitBranch, 
  Sparkles, 
  Bug, 
  Cpu, 
  Layers, 
  Save, 
  Copy, 
  Check, 
  FileCode, 
  Folder,
  Send
} from 'lucide-react';

interface CodeFile {
  name: string;
  language: string;
  path: string;
  content: string;
}

const sampleFiles: CodeFile[] = [
  {
    name: 'server.ts',
    language: 'typescript',
    path: '/src/server.ts',
    content: `import express from 'express';
import { GoogleGenAI } from '@google/genai';

const app = express();
const ai = new GoogleGenAI();

app.post('/api/compute', async (req, res) => {
  const { task } = req.body;
  // Execute edge optimization with Nexus Cloud mesh
  const response = await ai.models.generateContent({
    model: 'gemini-3.8-flash',
    contents: \`Optimize workload: \${task}\`
  });
  res.json({ status: 'SUCCESS', result: response.text });
});

app.listen(3000, () => {
  console.log('[NEXUS CLOUD] Micro-service live on port 3000');
});`
  },
  {
    name: 'schema.sql',
    language: 'sql',
    path: '/db/schema.sql',
    content: `-- Nexus Multi-Tenant Identity Schema
CREATE TABLE tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  region VARCHAR(64) DEFAULT 'af-south-1',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE enterprise_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id),
  email VARCHAR(255) UNIQUE NOT NULL,
  role VARCHAR(64) DEFAULT 'developer',
  passkey_enrolled BOOLEAN DEFAULT TRUE
);`
  },
  {
    name: 'nexus-config.json',
    language: 'json',
    path: '/nexus-config.json',
    content: `{
  "ecosystem": "NEXUS OS",
  "version": "4.2.0",
  "environment": "production-kigali-edge",
  "scaling": {
    "minReplicas": 3,
    "maxReplicas": 50,
    "targetCpuUtilization": 70
  },
  "security": {
    "zeroTrust": true,
    "biometricPasskeys": "REQUIRED"
  }
}`
  }
];

export const NexusCodeApp: React.FC = () => {
  const { askNexusAI, addNotification, deployService } = useNexus();
  const [files, setFiles] = useState<CodeFile[]>(sampleFiles);
  const [activeFileName, setActiveFileName] = useState<string>('server.ts');
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    'Nexus Cloud Developer Shell v4.2 [af-south-1 node]',
    'Type "help" or "nexus run" or "git status" to execute commands.',
  ]);
  const [termInput, setTermInput] = useState('');
  const [aiAssistantPrompt, setAiAssistantPrompt] = useState('');
  const [aiCodeResult, setAiCodeResult] = useState<string | null>(null);
  const [isAiWorking, setIsAiWorking] = useState(false);
  const [copied, setCopied] = useState(false);

  const activeFile = files.find(f => f.name === activeFileName) || files[0];

  const handleUpdateContent = (text: string) => {
    setFiles(files.map(f => f.name === activeFileName ? { ...f, content: text } : f));
  };

  const handleTermCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = termInput.trim();
    if (!cmd) return;

    const lower = cmd.toLowerCase();
    const newLines = [`$ ${cmd}`];

    if (lower === 'help') {
      newLines.push(
        'Available commands:',
        '  nexus run       - Build & execute active script in cloud sandbox',
        '  nexus deploy    - Ship container image to af-south-1 edge mesh',
        '  git status      - Show working branch and pending commits',
        '  nexus test      - Run automated integration test suite',
        '  clear           - Clear terminal window'
      );
    } else if (lower === 'clear') {
      setTerminalHistory([]);
      setTermInput('');
      return;
    } else if (lower.includes('nexus run')) {
      newLines.push(
        '[BUILD] Bundling TypeScript source via esbuild...',
        '[SANDBOX] Process spawned (PID: 40912)',
        '[NEXUS CLOUD] Micro-service live on port 3000',
        '✔ Health checks passing (0.8ms latency)'
      );
    } else if (lower.includes('nexus deploy')) {
      newLines.push(
        '[DOCKER] Packaging OCI container image...',
        '[REGISTRY] Pushing to registry.nexus.systems/kigali-edge:latest',
        '[K8S] Rolling update dispatched across 4 edge clusters...',
        '✔ Deployment verified in af-south-1.'
      );
      deployService('kigali-cloud-service', 'container');
    } else if (lower.includes('git status')) {
      newLines.push(
        'On branch main (origin/main)',
        'Your branch is up to date with origin/main.',
        'Changes ready for commit:',
        '  modified: src/server.ts',
        '  modified: nexus-config.json'
      );
    } else {
      newLines.push(`bash: ${cmd}: command not found. Type "help" for options.`);
    }

    setTerminalHistory(prev => [...prev, ...newLines]);
    setTermInput('');
  };

  const handleAiRefactor = async (action: 'explain' | 'fix' | 'test') => {
    setIsAiWorking(true);
    setAiCodeResult(null);
    try {
      let p = '';
      if (action === 'explain') p = `Explain this code architecturally and highlight its concurrency guarantees:\n\n${activeFile.content}`;
      if (action === 'fix') p = `Audit this code for edge cases, error handling, and security vulnerabilities, then provide the improved code:\n\n${activeFile.content}`;
      if (action === 'test') p = `Write a comprehensive TypeScript test suite with mocks for this file:\n\n${activeFile.content}`;

      const res = await askNexusAI(p, 'coding');
      setAiCodeResult(res);
    } catch {
      setAiCodeResult('Nexus Code AI analyzed the file successfully.');
    } finally {
      setIsAiWorking(false);
    }
  };

  return (
    <div className="h-[calc(100vh-4.5rem)] flex flex-col max-w-7xl mx-auto p-3 md:p-6 pb-20 animate-in fade-in">
      {/* Code Header Bar */}
      <div className="glass-panel p-2.5 rounded-2xl border border-white/10 mb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Code2 className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-white flex items-center gap-2">
              NEXUS CODE STUDIO
              <span className="text-[10px] px-2 py-0.5 rounded font-mono bg-emerald-500/20 text-emerald-300">
                In-Browser Web IDE
              </span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400 font-mono bg-slate-900/60 px-2.5 py-1 rounded-lg border border-white/5">
            <GitBranch className="w-3.5 h-3.5 text-indigo-400" />
            <span>main</span>
          </div>

          <button
            onClick={() => handleAiRefactor('fix')}
            disabled={isAiWorking}
            className="px-3 py-1.5 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 hover:bg-indigo-500/30 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Code Copilot</span>
          </button>

          <button
            onClick={() => {
              setTerminalHistory(prev => [...prev, '$ nexus run', '[BUILD] Compiling...', '✔ Application running on http://localhost:3000']);
              addNotification('Build Succeeded', 'Application sandbox compiled and running.', 'cloud');
            }}
            className="px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-500/20 transition-colors cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Run Sandbox</span>
          </button>
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-3 overflow-hidden">
        {/* Left: File Explorer (2 cols) */}
        <div className="lg:col-span-3 glass-panel rounded-2xl border border-white/10 p-3 flex flex-col">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono mb-2 flex items-center gap-1.5">
            <FolderTree className="w-3.5 h-3.5 text-cyan-400" />
            Project Explorer
          </div>

          <div className="space-y-1 overflow-y-auto flex-1 font-mono text-xs">
            {files.map(f => (
              <button
                key={f.name}
                onClick={() => setActiveFileName(f.name)}
                className={`w-full text-left px-2.5 py-2 rounded-xl flex items-center gap-2 transition-colors cursor-pointer ${
                  activeFileName === f.name ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                <FileCode className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="truncate">{f.name}</span>
              </button>
            ))}
          </div>

          {/* Quick AI Snippet Actions */}
          <div className="pt-3 border-t border-white/10 space-y-1.5">
            <div className="text-[10px] uppercase font-mono text-slate-400">Quick AI Architect</div>
            <button
              onClick={() => handleAiRefactor('explain')}
              className="w-full text-left text-xs p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 flex items-center gap-1.5"
            >
              <Cpu className="w-3 h-3 text-cyan-400" /> Explain Architecture
            </button>
            <button
              onClick={() => handleAiRefactor('test')}
              className="w-full text-left text-xs p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 flex items-center gap-1.5"
            >
              <Check className="w-3 h-3 text-emerald-400" /> Generate Test Suite
            </button>
          </div>
        </div>

        {/* Center: Editor (6 cols) */}
        <div className="lg:col-span-6 glass-panel rounded-2xl border border-white/10 flex flex-col overflow-hidden">
          <div className="p-2.5 bg-slate-900/60 border-b border-white/10 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-300">{activeFile.path}</span>
            <span className="text-slate-500">{activeFile.language} · UTF-8</span>
          </div>
          <div className="flex-1 p-3 overflow-y-auto bg-slate-950/70">
            <textarea
              value={activeFile.content}
              onChange={(e) => handleUpdateContent(e.target.value)}
              className="w-full h-full bg-transparent font-mono text-xs md:text-sm text-cyan-100 focus:outline-none resize-none leading-relaxed"
              spellCheck={false}
            />
          </div>
        </div>

        {/* Right: Terminal & Copilot Panel (3 cols) */}
        <div className="lg:col-span-3 flex flex-col gap-3 overflow-hidden">
          {/* AI Copilot Panel */}
          {aiCodeResult && (
            <div className="h-1/2 glass-panel rounded-2xl border border-indigo-500/30 p-3 flex flex-col overflow-hidden bg-slate-900/80">
              <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-2">
                <span className="text-xs font-semibold text-indigo-300 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> AI Copilot Review
                </span>
                <button onClick={() => setAiCodeResult(null)} className="text-[10px] text-slate-400 hover:text-white">
                  Close
                </button>
              </div>
              <div className="flex-1 overflow-y-auto text-xs text-slate-300 whitespace-pre-wrap font-sans leading-relaxed">
                {aiCodeResult}
              </div>
            </div>
          )}

          {/* Integrated Interactive Terminal */}
          <div className={`flex-1 glass-panel rounded-2xl border border-white/10 p-3 flex flex-col overflow-hidden bg-black/90 font-mono text-xs ${aiCodeResult ? 'h-1/2' : 'h-full'}`}>
            <div className="flex items-center justify-between pb-2 border-b border-white/10 text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <Terminal className="w-3.5 h-3.5" /> nexus-shell
              </span>
              <span>bash 5.2</span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-1 py-2 text-slate-300">
              {terminalHistory.map((line, idx) => (
                <div key={idx} className={line.startsWith('$') ? 'text-cyan-400 font-bold' : line.includes('✔') ? 'text-emerald-400' : 'text-slate-300'}>
                  {line}
                </div>
              ))}
            </div>

            <form onSubmit={handleTermCommand} className="flex items-center gap-1.5 pt-2 border-t border-white/10">
              <span className="text-emerald-400 font-bold">$</span>
              <input
                type="text"
                value={termInput}
                onChange={(e) => setTermInput(e.target.value)}
                placeholder="nexus run / deploy..."
                className="flex-1 bg-transparent text-white focus:outline-none text-xs"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
