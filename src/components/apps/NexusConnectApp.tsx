import React, { useState } from 'react';
import { useNexus } from '../../context/NexusContext';
import { 
  MessageSquareShare, 
  Video, 
  Mic, 
  MicOff, 
  VideoOff, 
  MonitorUp, 
  PhoneOff, 
  Send, 
  Users, 
  Hash, 
  Sparkles, 
  FileText, 
  Check, 
  Phone,
  Paperclip
} from 'lucide-react';

interface Channel {
  id: string;
  name: string;
  topic: string;
}

const channels: Channel[] = [
  { id: 'eng', name: 'engineering-architecture', topic: 'Kigali sovereign cloud node rollout & edge benchmarks' },
  { id: 'gen', name: 'general-ecosystem', topic: 'Global team sync and product releases' },
  { id: 'fintech', name: 'pan-african-fintech', topic: 'Interoperable payment rails across EAC & COMESA' }
];

interface ChatMsg {
  id: string;
  sender: string;
  text: string;
  time: string;
  avatar: string;
}

export const NexusConnectApp: React.FC = () => {
  const { user, askNexusAI, createDocument, setActiveApp } = useNexus();
  const [activeChannelId, setActiveChannelId] = useState<string>('eng');
  const [inCall, setInCall] = useState<boolean>(false);
  const [micActive, setMicActive] = useState<boolean>(true);
  const [videoActive, setVideoActive] = useState<boolean>(true);
  const [isScreenSharing, setIsScreenSharing] = useState<boolean>(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isGeneratingNotes, setIsGeneratingNotes] = useState(false);

  const [messages, setMessages] = useState<Record<string, ChatMsg[]>>({
    eng: [
      {
        id: 'm1',
        sender: 'Sarah Kagame',
        text: 'The Kigali Innovation City edge container test just hit 8.2ms p99 latency. All green!',
        time: '14:10',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80'
      },
      {
        id: 'm2',
        sender: 'Amina Diallo',
        text: 'Zero-trust hardware passkey validation is also linked to the identity registry. Emmanuel, can we sync on video?',
        time: '14:14',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80'
      }
    ],
    gen: [
      {
        id: 'g1',
        sender: 'Marcus Thorne',
        text: 'Welcome to NEXUS OS v4.2 deployment cycle. Please test the universal AI command center.',
        time: '12:00',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80'
      }
    ],
    fintech: [
      {
        id: 'f1',
        sender: 'David Osei',
        text: 'Regulatory filings in Rwanda, Kenya, and Ghana are aligned with the new sovereign data provisions.',
        time: 'Yesterday',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80'
      }
    ]
  });

  const activeChannel = channels.find(c => c.id === activeChannelId) || channels[0];
  const channelMessages = messages[activeChannelId] || [];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMsg: ChatMsg = {
      id: `m-${Date.now()}`,
      sender: user.name,
      text: inputMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      avatar: user.avatarUrl
    };

    setMessages(prev => ({
      ...prev,
      [activeChannelId]: [...(prev[activeChannelId] || []), newMsg]
    }));
    setInputMessage('');
  };

  const generateMeetingNotes = async () => {
    setIsGeneratingNotes(true);
    try {
      const transcript = channelMessages.map(m => `${m.sender}: ${m.text}`).join('\n');
      const notes = await askNexusAI(
        `Extract structured Meeting Minutes, Key Decisions, and Action Items with owners from this conversation:\n\n${transcript}`,
        'business'
      );
      createDocument(`Meeting Minutes - #${activeChannel.name}`, 'doc', 'Meetings', notes);
      setActiveApp('work');
    } finally {
      setIsGeneratingNotes(false);
    }
  };

  return (
    <div className="h-[calc(100vh-4.5rem)] flex flex-col max-w-7xl mx-auto p-3 md:p-6 pb-20 animate-in fade-in">
      {/* Top Header */}
      <div className="glass-panel p-2.5 rounded-2xl border border-white/10 mb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-violet-400">
            <MessageSquareShare className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-white flex items-center gap-2">
              NEXUS CONNECT
              <span className="text-[10px] px-2 py-0.5 rounded font-mono bg-violet-500/20 text-violet-300">
                Encrypted Comms & Video
              </span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!inCall ? (
            <button
              onClick={() => setInCall(true)}
              className="px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-500/20 transition-colors cursor-pointer"
            >
              <Video className="w-3.5 h-3.5" />
              <span>Start Video Meeting</span>
            </button>
          ) : (
            <button
              onClick={() => setInCall(false)}
              className="px-3.5 py-1.5 rounded-lg bg-rose-500 hover:bg-rose-400 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md shadow-rose-500/20 transition-colors cursor-pointer"
            >
              <PhoneOff className="w-3.5 h-3.5" />
              <span>End Call</span>
            </button>
          )}

          <button
            onClick={generateMeetingNotes}
            disabled={isGeneratingNotes}
            className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-slate-200 text-xs flex items-center gap-1.5 border border-white/10 transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>AI Meeting Minutes</span>
          </button>
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-3 overflow-hidden">
        {/* Left: Channels & DMs (3 cols) */}
        <div className="lg:col-span-3 glass-panel rounded-2xl border border-white/10 p-3 flex flex-col">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono mb-2">
            Team Channels
          </div>
          <div className="space-y-1 mb-4">
            {channels.map(ch => (
              <button
                key={ch.id}
                onClick={() => setActiveChannelId(ch.id)}
                className={`w-full text-left px-2.5 py-2 rounded-xl flex items-center gap-2 transition-colors cursor-pointer ${
                  activeChannelId === ch.id
                    ? 'bg-violet-500/20 text-violet-200 border border-violet-500/30'
                    : 'text-slate-400 hover:bg-white/5'
                }`}
              >
                <Hash className="w-3.5 h-3.5 text-violet-400 shrink-0" />
                <span className="text-xs font-medium truncate">{ch.name}</span>
              </button>
            ))}
          </div>

          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono mb-2">
            Active Members (3)
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Sarah Kagame (Product Lead)</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Amina Diallo (Security Eng)</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <div className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>Nexus AI Transcriber</span>
            </div>
          </div>
        </div>

        {/* Center / Right: Chat or Video Call Conference (9 cols) */}
        <div className="lg:col-span-9 flex flex-col gap-3 overflow-hidden">
          {/* Active Call UI if inCall */}
          {inCall && (
            <div className="h-72 glass-panel rounded-2xl border border-violet-500/30 p-3 flex flex-col justify-between bg-slate-950 relative overflow-hidden">
              {/* Call video tiles */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 flex-1">
                {/* User Tile */}
                <div className="rounded-xl bg-slate-900 border border-white/10 relative overflow-hidden flex items-center justify-center">
                  {videoActive ? (
                    <img src={user.avatarUrl} alt="You" className="w-full h-full object-cover opacity-80" />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-white font-bold">
                      {user.name.slice(0, 2)}
                    </div>
                  )}
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/60 text-[10px] text-white flex items-center gap-1 font-mono">
                    <span>You ({user.name.split(' ')[0]})</span>
                    {!micActive && <MicOff className="w-2.5 h-2.5 text-rose-400" />}
                  </div>
                </div>

                {/* Sarah Tile */}
                <div className="rounded-xl bg-slate-900 border border-white/10 relative overflow-hidden flex items-center justify-center">
                  <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80" alt="Sarah" className="w-full h-full object-cover" />
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/60 text-[10px] text-white font-mono">
                    Sarah Kagame (Kigali)
                  </div>
                  {/* Audio Waveform simulation */}
                  <div className="absolute top-2 right-2 flex items-center gap-0.5 bg-black/50 px-1.5 py-0.5 rounded">
                    <span className="w-1 h-3 bg-emerald-400 animate-pulse" />
                    <span className="w-1 h-2 bg-emerald-400 animate-pulse delay-75" />
                    <span className="w-1 h-4 bg-emerald-400 animate-pulse delay-150" />
                  </div>
                </div>

                {/* Amina Tile */}
                <div className="hidden md:flex rounded-xl bg-slate-900 border border-white/10 relative overflow-hidden items-center justify-center">
                  <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80" alt="Amina" className="w-full h-full object-cover" />
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/60 text-[10px] text-white font-mono">
                    Amina Diallo
                  </div>
                </div>
              </div>

              {/* Call Controls Bar */}
              <div className="pt-2 flex items-center justify-center gap-3">
                <button
                  onClick={() => setMicActive(!micActive)}
                  className={`p-2.5 rounded-xl border transition-colors ${
                    micActive ? 'bg-white/10 text-white border-white/10' : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                  }`}
                  title={micActive ? 'Mute Microphone' : 'Unmute Microphone'}
                >
                  {micActive ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setVideoActive(!videoActive)}
                  className={`p-2.5 rounded-xl border transition-colors ${
                    videoActive ? 'bg-white/10 text-white border-white/10' : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                  }`}
                  title={videoActive ? 'Turn Video Off' : 'Turn Video On'}
                >
                  {videoActive ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setIsScreenSharing(!isScreenSharing)}
                  className={`p-2.5 rounded-xl border transition-colors ${
                    isScreenSharing ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' : 'bg-white/10 text-white border-white/10'
                  }`}
                  title="Share Screen"
                >
                  <MonitorUp className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setInCall(false)}
                  className="p-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white transition-colors"
                  title="Disconnect Call"
                >
                  <PhoneOff className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Channel Chat View */}
          <div className="flex-1 glass-panel rounded-2xl border border-white/10 flex flex-col overflow-hidden">
            <div className="p-3 border-b border-white/10 flex items-center justify-between bg-slate-900/40">
              <div className="flex items-center gap-2">
                <Hash className="w-4 h-4 text-violet-400" />
                <span className="font-bold text-white text-xs">{activeChannel.name}</span>
                <span className="text-slate-600">·</span>
                <span className="text-[11px] text-slate-400">{activeChannel.topic}</span>
              </div>
            </div>

            {/* Messages list */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {channelMessages.map(msg => (
                <div key={msg.id} className="flex gap-3 items-start">
                  <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 mt-0.5">
                    <img src={msg.avatar} alt={msg.sender} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-xs text-white">{msg.sender}</span>
                      <span className="text-[10px] text-slate-500 font-mono">{msg.time}</span>
                    </div>
                    <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Message Box */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-white/10 flex gap-2 bg-slate-900/50">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={`Message #${activeChannel.name}...`}
                className="flex-1 bg-slate-950/80 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-violet-500"
              />
              <button
                type="submit"
                className="px-3.5 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
