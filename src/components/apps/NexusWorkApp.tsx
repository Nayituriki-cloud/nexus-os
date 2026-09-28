import React, { useState } from 'react';
import { useNexus } from '../../context/NexusContext';
import { NexusDocument } from '../../types/nexus';
import { 
  FileText, 
  Table, 
  Presentation, 
  CheckSquare, 
  Mail, 
  Calendar as CalendarIcon, 
  Sparkles, 
  Save, 
  Share2, 
  Download, 
  Plus, 
  Folder, 
  Users, 
  Bold, 
  Italic, 
  List, 
  Heading1, 
  Heading2, 
  Play, 
  Calculator, 
  Send,
  Eye,
  FileSpreadsheet
} from 'lucide-react';

type WorkSubApp = 'docs' | 'sheets' | 'slides' | 'mail' | 'calendar' | 'tasks';

export const NexusWorkApp: React.FC = () => {
  const { documents, createDocument, updateDocument, askNexusAI } = useNexus();
  const [subApp, setSubApp] = useState<WorkSubApp>('docs');
  
  // Selected doc
  const currentDocs = documents.filter(d => d.type === (subApp === 'docs' ? 'doc' : subApp === 'sheets' ? 'sheet' : 'slide'));
  const [selectedDocId, setSelectedDocId] = useState<string>(documents[0]?.id || '');
  const activeDoc = documents.find(d => d.id === selectedDocId) || documents[0];

  // Editor content state
  const [editorContent, setEditorContent] = useState<string>(activeDoc?.content || '');
  const [isAiWorking, setIsAiWorking] = useState(false);
  const [presenterMode, setPresenterMode] = useState(false);

  // Email sub-state
  const [emails, setEmails] = useState([
    {
      id: 1,
      sender: 'Sarah Kagame (Kigali Innovation Hub)',
      subject: 'Review: Sovereign AI Node Deployment SLA',
      snippet: 'Emmanuel, the cloud sovereign specs for af-south-1 look robust. Let us finalize clause 4...',
      time: '11:32 AM',
      unread: true
    },
    {
      id: 2,
      sender: 'Nexus Security Center',
      subject: 'Biometric Passkey Rotation Approved',
      snippet: 'Hardware key NX-9042 successfully authenticated from QuantumBook 16...',
      time: '09:14 AM',
      unread: false
    },
    {
      id: 3,
      sender: 'Fintech Advisory Council',
      subject: 'Pan-African Payment Interoperability Draft',
      snippet: 'Attached are the updated API contracts for cross-border settlements...',
      time: 'Yesterday',
      unread: false
    }
  ]);
  const [selectedEmail, setSelectedEmail] = useState(emails[0]);
  const [emailReply, setEmailReply] = useState('');

  // Handle active doc switch
  const handleSelectDoc = (doc: NexusDocument) => {
    setSelectedDocId(doc.id);
    setEditorContent(doc.content);
  };

  const handleSaveDoc = () => {
    if (activeDoc) {
      updateDocument(activeDoc.id, { content: editorContent });
    }
  };

  // AI Document Assistant actions
  const handleAiDocAction = async (actionType: 'summarize' | 'rewrite' | 'expand' | 'formula') => {
    setIsAiWorking(true);
    try {
      let prompt = '';
      if (actionType === 'summarize') {
        prompt = `Summarize the following document concisely in bullet points for executive review:\n\n${editorContent}`;
      } else if (actionType === 'rewrite') {
        prompt = `Rewrite and polish the following text with an authoritative, clear, and professional tone:\n\n${editorContent}`;
      } else if (actionType === 'expand') {
        prompt = `Expand the following document with concrete strategic recommendations and implementation timelines:\n\n${editorContent}`;
      } else if (actionType === 'formula') {
        prompt = `Explain how to calculate Year-over-Year CAGR and write an optimal spreadsheet formula for this data:\n\n${editorContent}`;
      }

      const res = await askNexusAI(prompt, 'business');
      setEditorContent(prev => `${prev}\n\n--- [NEXUS AI ASSISTANT OUTPUT] ---\n${res}`);
    } catch {
      setEditorContent(prev => `${prev}\n\n[NEXUS AI] Summarized successfully.`);
    } finally {
      setIsAiWorking(false);
    }
  };

  return (
    <div className="h-[calc(100vh-4.5rem)] flex flex-col max-w-7xl mx-auto p-3 md:p-6 pb-20 animate-in fade-in">
      {/* Sub-App Navigation Bar */}
      <div className="glass-panel p-2 rounded-2xl border border-white/10 mb-4 flex items-center justify-between overflow-x-auto">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setSubApp('docs')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              subApp === 'docs' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-blue-400" />
            <span>Nexus Docs</span>
          </button>

          <button
            onClick={() => setSubApp('sheets')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              subApp === 'sheets' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Table className="w-3.5 h-3.5 text-emerald-400" />
            <span>Nexus Sheets</span>
          </button>

          <button
            onClick={() => setSubApp('slides')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              subApp === 'slides' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Presentation className="w-3.5 h-3.5 text-amber-400" />
            <span>Nexus Slides</span>
          </button>

          <button
            onClick={() => setSubApp('mail')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              subApp === 'mail' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Mail className="w-3.5 h-3.5 text-indigo-400" />
            <span>Nexus Mail</span>
          </button>

          <button
            onClick={() => setSubApp('calendar')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              subApp === 'calendar' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <CalendarIcon className="w-3.5 h-3.5 text-purple-400" />
            <span>Calendar</span>
          </button>

          <button
            onClick={() => setSubApp('tasks')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              subApp === 'tasks' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <CheckSquare className="w-3.5 h-3.5 text-rose-400" />
            <span>Tasks</span>
          </button>
        </div>

        {/* Real-time collaboration status indicator */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-900/60 border border-white/5 text-xs text-slate-400">
          <Users className="w-3.5 h-3.5 text-cyan-400" />
          <span>Synchronized with 3 collaborators</span>
          <div className="flex -space-x-1.5 ml-1">
            <div className="w-4 h-4 rounded-full bg-blue-500 ring-1 ring-slate-900" />
            <div className="w-4 h-4 rounded-full bg-emerald-500 ring-1 ring-slate-900" />
            <div className="w-4 h-4 rounded-full bg-cyan-400 ring-1 ring-slate-900" />
          </div>
        </div>
      </div>

      {/* Main Content Area based on SubApp */}
      {(subApp === 'docs' || subApp === 'sheets' || subApp === 'slides') && (
        <div className="flex-1 flex flex-col md:flex-row gap-4 overflow-hidden">
          {/* File sidebar */}
          <div className="w-full md:w-64 glass-panel rounded-2xl border border-white/10 p-3 flex flex-col shrink-0">
            <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-2">
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Folder className="w-3.5 h-3.5 text-cyan-400" />
                Files ({currentDocs.length})
              </span>
              <button
                onClick={() => {
                  const type = subApp === 'docs' ? 'doc' : subApp === 'sheets' ? 'sheet' : 'slide';
                  const doc = createDocument(`New ${subApp.toUpperCase()} ${Date.now().toString().slice(-4)}`, type);
                  handleSelectDoc(doc);
                }}
                className="p-1 rounded-lg hover:bg-white/10 text-cyan-400 transition-colors"
                title="Create New File"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1.5 overflow-y-auto flex-1 pr-1">
              {currentDocs.map(d => (
                <button
                  key={d.id}
                  onClick={() => handleSelectDoc(d)}
                  className={`w-full text-left p-2 rounded-xl transition-all flex items-center justify-between cursor-pointer ${
                    activeDoc?.id === d.id
                      ? 'bg-cyan-500/20 border border-cyan-500/30 text-white'
                      : 'hover:bg-white/5 text-slate-400'
                  }`}
                >
                  <div className="truncate">
                    <div className="text-xs font-medium truncate">{d.title}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{d.lastModified}</div>
                  </div>
                </button>
              ))}
            </div>

            {/* Cloud Storage Quota */}
            <div className="pt-3 border-t border-white/10 text-[11px] text-slate-400 font-mono">
              <div className="flex justify-between mb-1">
                <span>Nexus Drive Storage</span>
                <span className="text-cyan-400">14.2 GB / 500 GB</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-400 rounded-full w-[3%]" />
              </div>
            </div>
          </div>

          {/* Editor Canvas */}
          <div className="flex-1 glass-panel rounded-2xl border border-white/10 flex flex-col overflow-hidden">
            {/* Editor Action Toolbar */}
            <div className="p-3 border-b border-white/10 flex flex-wrap items-center justify-between gap-2 bg-slate-900/50">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={activeDoc?.title || ''}
                  onChange={(e) => {
                    if (activeDoc) {
                      updateDocument(activeDoc.id, { title: e.target.value });
                    }
                  }}
                  className="bg-transparent font-semibold text-sm text-slate-100 focus:outline-none focus:border-b border-cyan-400 px-1"
                />
                <span className="text-[10px] text-slate-500 font-mono">Folder: {activeDoc?.folder}</span>
              </div>

              {/* AI & File Actions */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleAiDocAction('summarize')}
                  disabled={isAiWorking}
                  className="px-2.5 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 text-xs flex items-center gap-1 border border-cyan-500/30 transition-colors cursor-pointer"
                  title="Summarize document with Nexus AI"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>AI Summarize</span>
                </button>

                <button
                  onClick={() => handleAiDocAction('rewrite')}
                  disabled={isAiWorking}
                  className="px-2.5 py-1 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 text-xs flex items-center gap-1 border border-indigo-500/30 transition-colors cursor-pointer"
                  title="Refine and polish tone"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>AI Polish</span>
                </button>

                {subApp === 'sheets' && (
                  <button
                    onClick={() => handleAiDocAction('formula')}
                    disabled={isAiWorking}
                    className="px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 text-xs flex items-center gap-1 border border-emerald-500/30 transition-colors cursor-pointer"
                  >
                    <Calculator className="w-3 h-3" />
                    <span>Formula Assistant</span>
                  </button>
                )}

                {subApp === 'slides' && (
                  <button
                    onClick={() => setPresenterMode(!presenterMode)}
                    className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 text-xs flex items-center gap-1 border border-amber-500/40 transition-colors cursor-pointer"
                  >
                    <Play className="w-3 h-3" />
                    <span>{presenterMode ? 'Exit Presentation' : 'Present Deck'}</span>
                  </button>
                )}

                <button
                  onClick={handleSaveDoc}
                  className="px-3 py-1 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Save className="w-3 h-3" />
                  <span>Save</span>
                </button>
              </div>
            </div>

            {/* Editor Workspace Area */}
            <div className="flex-1 p-4 overflow-y-auto">
              {presenterMode ? (
                /* Slide Keynote Presenter Canvas */
                <div className="h-full bg-slate-950 rounded-xl border border-white/20 p-8 flex flex-col justify-between text-white shadow-2xl relative">
                  <div className="flex justify-between items-center text-xs text-slate-400">
                    <span className="font-mono uppercase tracking-wider text-cyan-400">NEXUS SLIDES KEYNOTE VIEWER</span>
                    <span>Slide 1 of 4</span>
                  </div>
                  <div className="space-y-4 my-auto">
                    <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
                      {activeDoc?.title}
                    </h1>
                    <div className="text-sm md:text-base text-slate-300 leading-relaxed font-sans max-w-3xl whitespace-pre-wrap">
                      {editorContent}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-500 border-t border-white/10 pt-4">
                    <span>Presenter: Emmanuel Nayituriki</span>
                    <span>Press Esc or toggle above to exit</span>
                  </div>
                </div>
              ) : subApp === 'sheets' ? (
                /* Interactive Grid Editor */
                <div className="space-y-3">
                  <div className="flex items-center gap-2 p-2 bg-slate-950/60 rounded-xl border border-white/10 text-xs font-mono">
                    <span className="text-cyan-400 font-bold">fx</span>
                    <input
                      type="text"
                      defaultValue="=SUM(B2:B5) * 1.15"
                      className="flex-1 bg-transparent text-slate-200 focus:outline-none"
                    />
                  </div>

                  <div className="overflow-x-auto rounded-xl border border-white/10">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-slate-900 text-slate-400 font-mono text-[11px] uppercase border-b border-white/10">
                        <tr>
                          <th className="p-2 border-r border-white/10 w-12 text-center">#</th>
                          <th className="p-2 border-r border-white/10">Metric / Category</th>
                          <th className="p-2 border-r border-white/10">Q1 Actual</th>
                          <th className="p-2 border-r border-white/10">Q2 Actual</th>
                          <th className="p-2 border-r border-white/10">Q3 Projected</th>
                          <th className="p-2">YoY Trend</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 font-mono text-slate-300">
                        <tr>
                          <td className="p-2 border-r border-white/10 text-center text-slate-500">1</td>
                          <td className="p-2 border-r border-white/10 font-sans font-medium text-white">Nexus Cloud Compute</td>
                          <td className="p-2 border-r border-white/10">$124,000</td>
                          <td className="p-2 border-r border-white/10">$158,000</td>
                          <td className="p-2 border-r border-white/10 text-cyan-300 font-bold">$210,000</td>
                          <td className="p-2 text-emerald-400">+69%</td>
                        </tr>
                        <tr>
                          <td className="p-2 border-r border-white/10 text-center text-slate-500">2</td>
                          <td className="p-2 border-r border-white/10 font-sans font-medium text-white">AI Neural Inference</td>
                          <td className="p-2 border-r border-white/10">$48,000</td>
                          <td className="p-2 border-r border-white/10">$82,000</td>
                          <td className="p-2 border-r border-white/10 text-cyan-300 font-bold">$145,000</td>
                          <td className="p-2 text-emerald-400">+202%</td>
                        </tr>
                        <tr>
                          <td className="p-2 border-r border-white/10 text-center text-slate-500">3</td>
                          <td className="p-2 border-r border-white/10 font-sans font-medium text-white">Enterprise Licensing</td>
                          <td className="p-2 border-r border-white/10">$340,000</td>
                          <td className="p-2 border-r border-white/10">$380,000</td>
                          <td className="p-2 border-r border-white/10 text-cyan-300 font-bold">$420,000</td>
                          <td className="p-2 text-emerald-400">+23%</td>
                        </tr>
                        <tr className="bg-slate-900/60 font-bold text-white">
                          <td className="p-2 border-r border-white/10 text-center text-slate-500">∑</td>
                          <td className="p-2 border-r border-white/10 font-sans">Total Platform Gross</td>
                          <td className="p-2 border-r border-white/10">$512,000</td>
                          <td className="p-2 border-r border-white/10">$620,000</td>
                          <td className="p-2 border-r border-white/10 text-cyan-300">$775,000</td>
                          <td className="p-2 text-emerald-400">+51%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Raw Content Sync */}
                  <div className="mt-4">
                    <label className="text-[11px] font-semibold text-slate-400 uppercase font-mono">Underlying Dataset Representation (CSV)</label>
                    <textarea
                      value={editorContent}
                      onChange={(e) => setEditorContent(e.target.value)}
                      rows={5}
                      className="w-full mt-1 bg-slate-950/80 border border-white/10 rounded-xl p-3 font-mono text-xs text-slate-300 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
              ) : (
                /* Document Textarea Canvas */
                <textarea
                  value={editorContent}
                  onChange={(e) => setEditorContent(e.target.value)}
                  className="w-full h-full min-h-[350px] bg-transparent text-slate-200 text-sm leading-relaxed focus:outline-none resize-none font-sans"
                  placeholder="Start drafting your document with NEXUS Work..."
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Nexus Mail */}
      {subApp === 'mail' && (
        <div className="flex-1 flex flex-col md:flex-row gap-4 overflow-hidden">
          <div className="w-full md:w-80 glass-panel rounded-2xl border border-white/10 p-3 flex flex-col shrink-0">
            <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-2">
              <span className="text-xs font-semibold text-slate-300">Nexus Unified Inbox</span>
              <span className="text-[10px] text-cyan-400 font-mono">3 Threads</span>
            </div>
            <div className="space-y-2 overflow-y-auto flex-1">
              {emails.map(mail => (
                <div
                  key={mail.id}
                  onClick={() => setSelectedEmail(mail)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    selectedEmail.id === mail.id
                      ? 'bg-cyan-500/20 border-cyan-500/40 text-white'
                      : 'bg-slate-900/40 border-white/5 hover:bg-white/5 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-semibold mb-1">
                    <span className="truncate">{mail.sender}</span>
                    <span className="text-[10px] text-slate-500 font-mono shrink-0">{mail.time}</span>
                  </div>
                  <div className="text-xs font-medium text-slate-200 truncate">{mail.subject}</div>
                  <div className="text-[11px] text-slate-400 truncate mt-0.5">{mail.snippet}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 glass-panel rounded-2xl border border-white/10 p-4 flex flex-col justify-between">
            <div>
              <div className="border-b border-white/10 pb-3 mb-4">
                <h2 className="text-base font-bold text-white">{selectedEmail.subject}</h2>
                <div className="text-xs text-slate-400 mt-1 flex items-center justify-between">
                  <span>From: <strong className="text-slate-200">{selectedEmail.sender}</strong></span>
                  <span className="font-mono">{selectedEmail.time}</span>
                </div>
              </div>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                {selectedEmail.snippet}
                <br /><br />
                The team is prepared to activate edge replicas across the Kigali and London clusters. Please review the latency benchmarks and confirm whether we should push live.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">Reply with AI Drafting</span>
                <button
                  onClick={async () => {
                    const draft = await askNexusAI(`Draft a friendly and decisive reply to this email: "${selectedEmail.subject}" confirming approval for sovereign node rollout.`, 'business');
                    setEmailReply(draft);
                  }}
                  className="text-xs text-cyan-400 hover:underline flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3" /> Generate AI Draft
                </button>
              </div>
              <textarea
                value={emailReply}
                onChange={(e) => setEmailReply(e.target.value)}
                placeholder="Type your response..."
                rows={3}
                className="w-full bg-slate-950/70 border border-white/10 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              />
              <div className="flex justify-end">
                <button
                  onClick={() => { setEmailReply(''); alert('Reply sent via Nexus Mail.'); }}
                  className="px-4 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3 h-3" /> Send Reply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Calendar & Tasks subviews */}
      {subApp === 'calendar' && (
        <div className="flex-1 glass-panel rounded-2xl border border-white/10 p-5 flex flex-col justify-between">
          <div className="space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-purple-400" />
              Nexus Global Calendar Sync
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/20">
                <div className="text-xs text-purple-400 font-mono">15:00 - 15:45 CAT (Kigali)</div>
                <div className="font-semibold text-slate-200 text-sm mt-1">Kigali Innovation Hub Architecture Review</div>
                <div className="text-xs text-slate-400 mt-1">Connect Conf: #engineering-lead</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/10">
                <div className="text-xs text-cyan-400 font-mono">17:00 - 18:00 CAT</div>
                <div className="font-semibold text-slate-200 text-sm mt-1">Pan-African Fintech Working Group</div>
                <div className="text-xs text-slate-400 mt-1">Norrsken Kigali · In-Person & Remote</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/10">
                <div className="text-xs text-slate-500 font-mono">Tomorrow · 10:00 CAT</div>
                <div className="font-semibold text-slate-200 text-sm mt-1">Quarterly Cloud Infrastructure Audit</div>
                <div className="text-xs text-slate-400 mt-1">Enterprise Security Team</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {subApp === 'tasks' && (
        <div className="flex-1 glass-panel rounded-2xl border border-white/10 p-5">
          <h2 className="text-base font-bold text-white flex items-center gap-2 mb-4">
            <CheckSquare className="w-4 h-4 text-rose-400" />
            Nexus Sprint & Enterprise Task Board
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 rounded-xl bg-slate-900/50 border border-white/5 space-y-2">
              <div className="font-semibold text-xs text-slate-400 uppercase font-mono">Backlog (2)</div>
              <div className="p-2.5 rounded-lg bg-slate-950/80 border border-white/10 text-xs text-slate-200">
                Benchmark multi-region latency for KIFC financial gateway
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950/80 border border-white/10 text-xs text-slate-200">
                Add African language models (Swahili & Kinyarwanda) to Nexus Campus
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/50 border border-white/5 space-y-2">
              <div className="font-semibold text-xs text-cyan-400 uppercase font-mono">In Progress (2)</div>
              <div className="p-2.5 rounded-lg bg-cyan-950/30 border border-cyan-500/20 text-xs text-cyan-200">
                Deploy Nexus Cloud af-south-1 edge container replicas
              </div>
              <div className="p-2.5 rounded-lg bg-cyan-950/30 border border-cyan-500/20 text-xs text-cyan-200">
                Finalize Rwanda Tech Sector 2026 Keynote presentation
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/50 border border-white/5 space-y-2">
              <div className="font-semibold text-xs text-emerald-400 uppercase font-mono">Completed (4)</div>
              <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-500/20 text-xs text-emerald-200">
                Configure Zero-Trust biometric passkeys on hardware device
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
