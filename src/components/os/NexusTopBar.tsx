import React, { useState } from 'react';
import { useNexus } from '../../context/NexusContext';
import { 
  Search, 
  Bell, 
  ShieldCheck, 
  Globe, 
  Moon, 
  Sun, 
  Eye, 
  Wifi, 
  WifiOff, 
  Sparkles,
  CheckCircle,
  ExternalLink,
  ChevronDown
} from 'lucide-react';

export const NexusTopBar: React.FC = () => {
  const { 
    user, 
    theme, 
    setTheme, 
    language, 
    setLanguage, 
    currency, 
    setCurrency, 
    lowBandwidth, 
    setLowBandwidth, 
    notifications, 
    unreadCount, 
    markAllNotificationsRead, 
    setIsCommandOpen,
    setIsIdModalOpen
  } = useNexus();

  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);

  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const currentDate = new Date().toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });

  const languages = [
    { code: 'en', name: 'English (Global)' },
    { code: 'rw', name: 'Ikinyarwanda' },
    { code: 'sw', name: 'Kiswahili' },
    { code: 'fr', name: 'Français' },
    { code: 'es', name: 'Español' },
    { code: 'de', name: 'Deutsch' },
    { code: 'ar', name: 'العربية' }
  ];

  const currencies = ['USD ($)', 'EUR (€)', 'GBP (£)', 'RWF (Frw)', 'KES (KSh)'];

  return (
    <header className="h-12 border-b border-white/10 glass-panel flex items-center justify-between px-4 z-40 relative select-none">
      {/* Left: Brand Identity & Status */}
      <div className="flex items-center gap-3">
        <button 
          onClick={() => setIsIdModalOpen(true)}
          className="flex items-center gap-2 group text-left cursor-pointer focus-visible:outline-cyan-400"
          title="NEXUS OS Core Dashboard"
        >
          {/* Original Geometric Nexus Emblem */}
          <div className="relative w-7 h-7 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 to-indigo-500 rounded-lg rotate-45 opacity-80 group-hover:opacity-100 transition-opacity glow-cyan" />
            <div className="relative text-white font-extrabold text-xs tracking-tighter">NX</div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm tracking-wider bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
                NEXUS<span className="text-white font-light text-xs ml-1">OS</span>
              </span>
              <span className="text-[10px] text-cyan-400/80 font-mono tracking-widest uppercase">v4.2</span>
            </div>
          </div>
        </button>

        <div className="hidden md:flex items-center text-xs text-slate-400 gap-2 border-l border-white/10 pl-3">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-[11px] text-emerald-400">Cluster 01 Online</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="text-slate-400 font-mono text-[11px]">Edge: Kigali (af-south-1)</span>
        </div>
      </div>

      {/* Center: Universal Command Bar Trigger */}
      <div className="flex-1 max-w-xl mx-4">
        <button
          onClick={() => setIsCommandOpen(true)}
          className="w-full flex items-center justify-between px-3 py-1.5 text-xs bg-slate-900/60 hover:bg-slate-900/90 text-slate-400 hover:text-slate-200 rounded-lg border border-white/10 transition-all shadow-inner group"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
            <span className="truncate">
              Ask AI or run command... <span className="hidden sm:inline text-slate-500 italic">"Deploy website", "Create Rwanda pitch deck"</span>
            </span>
          </div>
          <div className="flex items-center gap-1">
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white/10 rounded text-slate-300 border border-white/10">⌘K</kbd>
          </div>
        </button>
      </div>

      {/* Right: Quick Controls & Identity */}
      <div className="flex items-center gap-2">
        {/* Low-Bandwidth Mode Indicator */}
        <button
          onClick={() => setLowBandwidth(!lowBandwidth)}
          className={`px-2 py-1 rounded text-[11px] flex items-center gap-1 border transition-colors ${
            lowBandwidth 
              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' 
              : 'text-slate-400 hover:text-slate-200 border-white/5 hover:border-white/10'
          }`}
          title={lowBandwidth ? "Low-Bandwidth Mode Active (Data Saver)" : "Standard Bandwidth Mode"}
        >
          {lowBandwidth ? <WifiOff className="w-3 h-3 text-amber-400" /> : <Wifi className="w-3 h-3 text-emerald-400" />}
          <span className="hidden lg:inline">{lowBandwidth ? 'Data Saver' : 'Ultra Fast'}</span>
        </button>

        {/* Language & Currency Menu */}
        <div className="relative">
          <button
            onClick={() => setShowLangMenu(!showLangMenu)}
            className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-white/5 rounded-md transition-colors flex items-center gap-1 text-xs"
            title="Language & Regional Settings"
          >
            <Globe className="w-3.5 h-3.5" />
            <span className="hidden xl:inline text-[11px]">{language.split(' ')[0]}</span>
            <ChevronDown className="w-3 h-3 opacity-60" />
          </button>

          {showLangMenu && (
            <div className="absolute right-0 mt-2 w-56 glass-panel rounded-xl shadow-2xl p-2 z-50 border border-white/10 text-xs">
              <div className="px-2 py-1 font-semibold text-slate-300 text-[11px] uppercase tracking-wider">Language</div>
              <div className="space-y-0.5 mb-2">
                {languages.map(l => (
                  <button
                    key={l.code}
                    onClick={() => { setLanguage(l.name); setShowLangMenu(false); }}
                    className={`w-full text-left px-2 py-1.5 rounded-md flex items-center justify-between transition-colors ${
                      language === l.name ? 'bg-cyan-500/20 text-cyan-300 font-medium' : 'text-slate-300 hover:bg-white/5'
                    }`}
                  >
                    <span>{l.name}</span>
                    {language === l.name && <CheckCircle className="w-3 h-3 text-cyan-400" />}
                  </button>
                ))}
              </div>
              <div className="border-t border-white/10 pt-2 px-2 font-semibold text-slate-300 text-[11px] uppercase tracking-wider">Currency</div>
              <div className="space-y-0.5">
                {currencies.map(c => (
                  <button
                    key={c}
                    onClick={() => { setCurrency(c); setShowLangMenu(false); }}
                    className={`w-full text-left px-2 py-1.5 rounded-md flex items-center justify-between transition-colors ${
                      currency === c ? 'bg-cyan-500/20 text-cyan-300 font-medium' : 'text-slate-300 hover:bg-white/5'
                    }`}
                  >
                    <span>{c}</span>
                    {currency === c && <CheckCircle className="w-3 h-3 text-cyan-400" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Theme Switcher */}
        <div className="flex items-center bg-slate-900/60 border border-white/10 rounded-lg p-0.5">
          <button
            onClick={() => setTheme('dark')}
            className={`p-1 rounded ${theme === 'dark' ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-400 hover:text-slate-200'}`}
            title="Dark Mode"
          >
            <Moon className="w-3 h-3" />
          </button>
          <button
            onClick={() => setTheme('light')}
            className={`p-1 rounded ${theme === 'light' ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-400 hover:text-slate-200'}`}
            title="Light Mode"
          >
            <Sun className="w-3 h-3" />
          </button>
          <button
            onClick={() => setTheme('contrast')}
            className={`p-1 rounded ${theme === 'contrast' ? 'bg-amber-500/20 text-amber-300' : 'text-slate-400 hover:text-slate-200'}`}
            title="High Contrast Mode"
          >
            <Eye className="w-3 h-3" />
          </button>
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifMenu(!showNotifMenu)}
            className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-white/5 rounded-md transition-colors relative"
            title="Notifications"
          >
            <Bell className="w-3.5 h-3.5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-cyan-400 glow-cyan ring-2 ring-slate-950" />
            )}
          </button>

          {showNotifMenu && (
            <div className="absolute right-0 mt-2 w-80 glass-panel rounded-xl shadow-2xl p-3 z-50 border border-white/10 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-2">
                <span className="font-semibold text-slate-200">System Notifications</span>
                {unreadCount > 0 && (
                  <button 
                    onClick={markAllNotificationsRead} 
                    className="text-[10px] text-cyan-400 hover:underline"
                  >
                    Mark all read
                  </button>
                )}
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {notifications.map(n => (
                  <div key={n.id} className={`p-2 rounded-lg border transition-colors ${n.read ? 'bg-white/2 border-white/5 text-slate-400' : 'bg-cyan-500/10 border-cyan-500/30 text-slate-200'}`}>
                    <div className="flex items-center justify-between font-medium text-xs mb-1">
                      <span>{n.title}</span>
                      <span className="text-[10px] text-slate-500 font-mono">{n.timestamp}</span>
                    </div>
                    <p className="text-[11px] leading-relaxed text-slate-300">{n.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Clock */}
        <div className="hidden sm:flex flex-col items-end text-right px-2 border-l border-white/10">
          <span className="font-mono text-xs font-semibold text-slate-200">{currentTime}</span>
          <span className="text-[10px] text-slate-400">{currentDate}</span>
        </div>

        {/* Nexus ID Account Pill */}
        <button
          onClick={() => setIsIdModalOpen(true)}
          className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-lg hover:bg-white/5 border border-white/10 transition-colors"
          title="Nexus ID Profile & Enterprise Settings"
        >
          <div className="w-6 h-6 rounded-full overflow-hidden ring-1 ring-cyan-400/50 bg-slate-800 flex items-center justify-center">
            <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
          </div>
          <div className="hidden lg:flex flex-col text-left">
            <span className="text-xs font-semibold text-slate-200 truncate max-w-[110px]">{user.name}</span>
            <span className="text-[10px] text-cyan-400 font-mono">{user.tier} Plan</span>
          </div>
          <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 hidden sm:block" />
        </button>
      </div>
    </header>
  );
};
