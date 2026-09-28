import React, { useState } from 'react';
import { useNexus } from '../../context/NexusContext';
import { 
  Palette, 
  Sparkles, 
  Image as ImageIcon, 
  Video, 
  Music, 
  Share2, 
  Download, 
  Copy, 
  Check, 
  Wand2, 
  Sliders, 
  Layers
} from 'lucide-react';

interface CreativeProject {
  id: string;
  title: string;
  type: 'image' | 'video' | 'audio' | 'brand';
  aspect: string;
  previewUrl: string;
  prompt: string;
}

const sampleCreations: CreativeProject[] = [
  {
    id: 'cr1',
    title: 'Kigali Innovation City 2030 Skyline',
    type: 'image',
    aspect: '16:9',
    previewUrl: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&auto=format&fit=crop&q=80',
    prompt: 'Futuristic architectural campus in Kigali with solar glass domes, lush green terraces, and high-tech aerial mobility lanes.'
  },
  {
    id: 'cr2',
    title: 'Sovereign Edge Network Node',
    type: 'image',
    aspect: '1:1',
    previewUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80',
    prompt: 'Titanium quantum server racks glowing with cyan fiber optics, cybernetic architecture, ultra-detailed.'
  },
  {
    id: 'cr3',
    title: 'Nexus OS Brand Campaign Identity',
    type: 'brand',
    aspect: '4:3',
    previewUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    prompt: 'Minimalist obsidian and luminescent cyan geometric helix emblem for next-generation technology ecosystem.'
  }
];

export const NexusCreatorApp: React.FC = () => {
  const { askNexusAI } = useNexus();
  const [activeType, setActiveType] = useState<'image' | 'video' | 'audio' | 'brand'>('image');
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [styleMode, setStyleMode] = useState('Photorealistic Futuristic');
  const [creations, setCreations] = useState<CreativeProject[]>(sampleCreations);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiScriptResult, setAiScriptResult] = useState<string | null>(null);

  const handleGenerateAsset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    setIsGenerating(true);

    try {
      if (activeType === 'video' || activeType === 'audio' || activeType === 'brand') {
        const script = await askNexusAI(
          `Act as Nexus Creative Director. Generate a high-end cinematic production script, sound design notes, and brand copy for this vision: "${prompt}"`,
          'creative'
        );
        setAiScriptResult(script);
      }

      // Add to simulated creative creations
      const newAsset: CreativeProject = {
        id: `cr-${Date.now()}`,
        title: prompt.slice(0, 30) + '...',
        type: activeType,
        aspect: aspectRatio,
        previewUrl: activeType === 'image' 
          ? 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800&auto=format&fit=crop&q=80'
          : 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
        prompt
      };

      setCreations(prev => [newAsset, ...prev]);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="h-[calc(100vh-4.5rem)] flex flex-col max-w-7xl mx-auto p-3 md:p-6 pb-20 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 rounded-2xl glass-panel border border-white/10 mb-4 bg-gradient-to-r from-pink-950/40 via-slate-900/90 to-rose-950/30">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Palette className="w-5 h-5 text-pink-400" />
            <h1 className="text-lg md:text-xl font-bold text-white tracking-tight">NEXUS CREATIVE STUDIO</h1>
            <span className="text-[10px] px-2 py-0.5 rounded-full font-mono bg-pink-500/20 text-pink-300 border border-pink-500/30">
              Multi-Modal Generation
            </span>
          </div>
          <p className="text-xs text-slate-400">
            High-fidelity generative visual synthesis, cinematic audio storyboards, and social campaign kits.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-mono">Render GPU: Cloud H100 Cluster</span>
        </div>
      </div>

      {/* Media Type Switcher */}
      <div className="glass-panel p-2 rounded-2xl border border-white/10 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveType('image')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeType === 'image' ? 'bg-pink-500/20 text-pink-300 border border-pink-500/40' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5 text-pink-400" />
            <span>Image Studio</span>
          </button>

          <button
            onClick={() => setActiveType('video')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeType === 'video' ? 'bg-pink-500/20 text-pink-300 border border-pink-500/40' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Video className="w-3.5 h-3.5 text-purple-400" />
            <span>Cinematic Video</span>
          </button>

          <button
            onClick={() => setActiveType('audio')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeType === 'audio' ? 'bg-pink-500/20 text-pink-300 border border-pink-500/40' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Music className="w-3.5 h-3.5 text-cyan-400" />
            <span>Sound & Music Synth</span>
          </button>

          <button
            onClick={() => setActiveType('brand')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeType === 'brand' ? 'bg-pink-500/20 text-pink-300 border border-pink-500/40' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Wand2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Brand Kit & Social</span>
          </button>
        </div>
      </div>

      {/* Main Studio View */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 overflow-hidden">
        {/* Left: Prompt & Settings Generator (5 cols) */}
        <div className="lg:col-span-5 glass-panel rounded-2xl border border-white/10 p-4 flex flex-col justify-between">
          <form onSubmit={handleGenerateAsset} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 uppercase font-mono block mb-1.5">
                Generative Direction / Creative Prompt
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your scene, lighting, texture, camera lens, or brand story..."
                rows={4}
                className="w-full bg-slate-950/80 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-pink-400 leading-relaxed"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-slate-400 font-mono text-[11px] block mb-1">Aspect Ratio</label>
                <select
                  value={aspectRatio}
                  onChange={(e) => setAspectRatio(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl p-2 text-white focus:outline-none"
                >
                  <option value="16:9">16:9 (Cinematic Widescreen)</option>
                  <option value="1:1">1:1 (Square Profile)</option>
                  <option value="4:3">4:3 (Editorial Display)</option>
                  <option value="9:16">9:16 (Vertical Mobile Story)</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 font-mono text-[11px] block mb-1">Aesthetic Style</label>
                <select
                  value={styleMode}
                  onChange={(e) => setStyleMode(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl p-2 text-white focus:outline-none"
                >
                  <option value="Photorealistic Futuristic">Photorealistic Futuristic</option>
                  <option value="Cyber-Minimalism">Cyber-Minimalism</option>
                  <option value="Architectural Blueprint">Architectural Blueprint</option>
                  <option value="Cinematic 35mm">Cinematic 35mm Film</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={isGenerating || !prompt.trim()}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-400 hover:to-rose-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-pink-500/20 transition-all cursor-pointer disabled:opacity-50"
            >
              {isGenerating ? (
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Sparkles className="w-3.5 h-3.5" />
              )}
              <span>Synthesize Creative Output</span>
            </button>
          </form>

          {aiScriptResult && (
            <div className="mt-4 p-3 rounded-xl bg-slate-900/80 border border-pink-500/20 max-h-48 overflow-y-auto text-xs text-slate-300 leading-relaxed font-sans">
              <div className="text-[10px] font-mono text-pink-400 uppercase font-semibold mb-1">Generated Production Notes</div>
              {aiScriptResult}
            </div>
          )}
        </div>

        {/* Right: Render Gallery (7 cols) */}
        <div className="lg:col-span-7 glass-panel rounded-2xl border border-white/10 p-4 overflow-y-auto space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-300 uppercase font-mono">
              Rendered Artifacts & Assets ({creations.length})
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {creations.map(asset => (
              <div key={asset.id} className="rounded-xl overflow-hidden bg-slate-900/60 border border-white/10 group flex flex-col justify-between">
                <div className="relative aspect-video overflow-hidden">
                  <img src={asset.previewUrl} alt={asset.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/70 text-[10px] text-white font-mono">
                    {asset.aspect}
                  </div>
                </div>
                <div className="p-3">
                  <div className="text-xs font-bold text-white truncate">{asset.title}</div>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{asset.prompt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
