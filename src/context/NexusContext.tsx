import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  NexusAppId, 
  AIAgentId, 
  NexusTheme, 
  NexusUser, 
  NexusNotification, 
  NexusDocument,
  NexusCloudService,
  NexusCourse
} from '../types/nexus';

interface NexusContextType {
  activeApp: NexusAppId;
  setActiveApp: (app: NexusAppId) => void;
  minimizedApps: NexusAppId[];
  toggleMinimizeApp: (app: NexusAppId) => void;
  openApps: NexusAppId[];
  closeApp: (app: NexusAppId) => void;
  
  // Theme & Accessibility
  theme: NexusTheme;
  setTheme: (theme: NexusTheme) => void;
  language: string;
  setLanguage: (lang: string) => void;
  currency: string;
  setCurrency: (curr: string) => void;
  lowBandwidth: boolean;
  setLowBandwidth: (val: boolean) => void;

  // Command bar
  isCommandOpen: boolean;
  setIsCommandOpen: (open: boolean) => void;
  executeCommand: (cmd: string) => Promise<any>;

  // Identity & Auth
  user: NexusUser;
  updateUser: (data: Partial<NexusUser>) => void;
  isIdModalOpen: boolean;
  setIsIdModalOpen: (open: boolean) => void;

  // Notifications
  notifications: NexusNotification[];
  unreadCount: number;
  markAllNotificationsRead: () => void;
  addNotification: (title: string, message: string, type: NexusNotification['type']) => void;

  // Documents
  documents: NexusDocument[];
  createDocument: (title: string, type: NexusDocument['type'], folder?: string, initialContent?: string) => NexusDocument;
  updateDocument: (id: string, updates: Partial<NexusDocument>) => void;

  // Cloud
  cloudServices: NexusCloudService[];
  deployService: (name: string, type: NexusCloudService['type']) => void;

  // AI helper
  askNexusAI: (prompt: string, agent?: AIAgentId) => Promise<string>;
}

const defaultUser: NexusUser = {
  id: 'NX-9042-8812',
  name: 'Emmanuel Nayituriki',
  email: 'emmanuelnayituriki993@gmail.com',
  title: 'Chief Technology Architect',
  organization: 'Nexus Global Systems Ltd.',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  tier: 'Enterprise',
  twoFactorEnabled: true,
  passkeysCount: 3,
  devices: [
    {
      id: 'dev-1',
      name: 'Nexus QuantumBook Pro 16"',
      location: 'Kigali, Rwanda',
      ip: '197.243.22.84',
      isCurrent: true,
      lastActive: 'Active Now'
    },
    {
      id: 'dev-2',
      name: 'Nexus Alpha Mobile Edge',
      location: 'Kigali, Rwanda',
      ip: '197.243.22.99',
      isCurrent: false,
      lastActive: '23 mins ago'
    },
    {
      id: 'dev-3',
      name: 'Cloud Dev Workstation (London)',
      location: 'London, UK',
      ip: '51.140.88.12',
      isCurrent: false,
      lastActive: 'Yesterday'
    }
  ]
};

const initialDocuments: NexusDocument[] = [
  {
    id: 'doc-1',
    title: "Rwanda's Technology & Innovation Sector 2026",
    type: 'doc',
    folder: 'Business',
    lastModified: '10 mins ago',
    author: 'Emmanuel N.',
    collaborators: ['Sarah K.', 'Amina D.', 'Nexus AI'],
    content: `# Strategic Report: Rwanda's Technology & Innovation Sector 2026

## 1. Executive Summary
Rwanda has rapidly consolidated its position as East Africa's leading pan-African proof-of-concept technology hub. Through Kigali Innovation City, Norrsken Kigali House, national 5G rollouts, and progressive regulatory sandboxes for fintech, AI, and autonomous transport, the ecosystem is accelerating.

## 2. Core Pillars of Growth
- **Pan-African Financial Hub (KIFC)**: Unifying cross-border capital flows and digital asset governance.
- **AI & Emerging Technologies Strategy**: National adoption of generative computing for health, agriculture, and public administrative efficiency.
- **High-Speed Connectivity**: Near universal 4G/5G fiber backbone penetration.

## 3. Recommendations
1. Scale regional cloud sovereign nodes.
2. Foster local developer talent through specialized machine learning fellowships.
3. Integrate interoperable payment APIs across COMESA regions.`
  },
  {
    id: 'sheet-1',
    title: 'Q3 Enterprise Revenue & Cloud Infrastructure Budget',
    type: 'sheet',
    folder: 'Finance',
    lastModified: '1 hour ago',
    author: 'Emmanuel N.',
    collaborators: ['Marcus T.'],
    content: 'Category,Q1 Actual,Q2 Actual,Q3 Projected,Growth YoY\nNexus Cloud Compute,$124000,$158000,$210000,+69%\nAI Inference Tokens,$48000,$82000,$145000,+202%\nEnterprise Licensing,$340000,$380000,$420000,+23%\nEdge Network Bandwidth,$31000,$39000,$46000,+48%\nTotal Ecosystem Revenue,$543000,$659000,$821000,+51%'
  },
  {
    id: 'slide-1',
    title: 'NEXUS OS — Ecosystem Architecture Keynote',
    type: 'slide',
    folder: 'Presentations',
    lastModified: 'Yesterday',
    author: 'Emmanuel N.',
    collaborators: ['Nexus AI'],
    content: 'Slide 1: NEXUS OS — Next-Generation Global Technology Platform\nSlide 2: One Identity. One AI. Infinite Scalability.\nSlide 3: Breaking the Silos: Productivity + Cloud + Code\nSlide 4: Enterprise-Grade Security & Regional Sovereignty'
  }
];

const initialCloudServices: NexusCloudService[] = [
  {
    id: 'srv-1',
    name: 'nexus-core-api',
    type: 'container',
    region: 'af-south-1 (Kigali Edge)',
    status: 'running',
    cpu: 24,
    memory: 1.4,
    requests: '1.8M / hr',
    endpoint: 'https://api.nexus.systems'
  },
  {
    id: 'srv-2',
    name: 'nexus-postgres-cluster',
    type: 'database',
    region: 'eu-west-2 (London Primary)',
    status: 'running',
    cpu: 48,
    memory: 6.2,
    requests: '14.2k queries / sec'
  },
  {
    id: 'srv-3',
    name: 'nexus-assets-s3',
    type: 'bucket',
    region: 'af-south-1 (Kigali Edge)',
    status: 'running',
    cpu: 8,
    memory: 0.8,
    requests: '450k req / hr',
    endpoint: 'https://cdn.nexus.systems'
  }
];

const initialNotifications: NexusNotification[] = [
  {
    id: 'notif-1',
    title: 'Nexus Shield Security Audit',
    message: 'All 3 active devices verified. Biometric passkey session refreshed.',
    timestamp: '5m ago',
    type: 'security',
    read: false
  },
  {
    id: 'notif-2',
    title: 'Cloud Edge Auto-Scaling',
    message: 'Cluster "nexus-core-api" scaled up 4 edge replicas in af-south-1.',
    timestamp: '18m ago',
    type: 'cloud',
    read: false
  },
  {
    id: 'notif-3',
    title: 'Team Connect Meeting',
    message: 'Architecture Sync with Sarah and Amina scheduled in 15 mins.',
    timestamp: '1h ago',
    type: 'connect',
    read: true
  }
];

const NexusContext = createContext<NexusContextType | undefined>(undefined);

export const NexusProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeApp, setActiveApp] = useState<NexusAppId>('workspace');
  const [openApps, setOpenApps] = useState<NexusAppId[]>(['workspace', 'ai', 'work', 'cloud', 'code']);
  const [minimizedApps, setMinimizedApps] = useState<NexusAppId[]>([]);
  const [theme, setTheme] = useState<NexusTheme>('dark');
  const [language, setLanguage] = useState<string>('English');
  const [currency, setCurrency] = useState<string>('USD ($)');
  const [lowBandwidth, setLowBandwidth] = useState<boolean>(false);
  const [isCommandOpen, setIsCommandOpen] = useState<boolean>(false);
  const [isIdModalOpen, setIsIdModalOpen] = useState<boolean>(false);
  
  const [user, setUser] = useState<NexusUser>(defaultUser);
  const [notifications, setNotifications] = useState<NexusNotification[]>(initialNotifications);
  const [documents, setDocuments] = useState<NexusDocument[]>(initialDocuments);
  const [cloudServices, setCloudServices] = useState<NexusCloudService[]>(initialCloudServices);

  // Keyboard shortcut for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Update theme class on HTML element
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('theme-light', 'theme-contrast', 'dark');
    if (theme === 'dark') {
      root.classList.add('dark');
    } else if (theme === 'light') {
      root.classList.add('theme-light');
    } else if (theme === 'contrast') {
      root.classList.add('theme-contrast');
    }
  }, [theme]);

  const updateUser = (data: Partial<NexusUser>) => {
    setUser(prev => ({ ...prev, ...data }));
  };

  const addNotification = (title: string, message: string, type: NexusNotification['type']) => {
    const newNotif: NexusNotification = {
      id: `notif-${Date.now()}`,
      title,
      message,
      timestamp: 'Just now',
      type,
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const toggleMinimizeApp = (app: NexusAppId) => {
    if (minimizedApps.includes(app)) {
      setMinimizedApps(prev => prev.filter(a => a !== app));
      setActiveApp(app);
    } else {
      setMinimizedApps(prev => [...prev, app]);
      // Switch to workspace or last open
      if (activeApp === app) {
        setActiveApp('workspace');
      }
    }
  };

  const closeApp = (app: NexusAppId) => {
    setOpenApps(prev => prev.filter(a => a !== app));
    setMinimizedApps(prev => prev.filter(a => a !== app));
    if (activeApp === app) {
      setActiveApp('workspace');
    }
  };

  const createDocument = (title: string, type: NexusDocument['type'], folder: string = 'General', initialContent: string = ''): NexusDocument => {
    const newDoc: NexusDocument = {
      id: `doc-${Date.now()}`,
      title,
      type,
      folder,
      lastModified: 'Just now',
      author: user.name,
      collaborators: [user.name, 'Nexus AI'],
      content: initialContent || (type === 'doc' ? `# ${title}\n\nCreated in Nexus Work.` : type === 'sheet' ? 'Item,Quantity,Unit Cost,Total\nCompute Nodes,10,$120,$1200' : 'Slide 1: Title\nSlide 2: Agenda')
    };
    setDocuments(prev => [newDoc, ...prev]);
    addNotification('Document Created', `"${title}" has been saved to your ${folder} folder.`, 'work');
    return newDoc;
  };

  const updateDocument = (id: string, updates: Partial<NexusDocument>) => {
    setDocuments(prev => prev.map(d => d.id === id ? { ...d, ...updates, lastModified: 'Just now' } : d));
  };

  const deployService = (name: string, type: NexusCloudService['type']) => {
    const newService: NexusCloudService = {
      id: `srv-${Date.now()}`,
      name: name.toLowerCase().replace(/\s+/g, '-'),
      type,
      region: 'af-south-1 (Kigali Edge)',
      status: 'deploying',
      cpu: 12,
      memory: 1.0,
      requests: '0 req/hr',
      endpoint: `https://${name.toLowerCase().replace(/\s+/g, '-')}.nexus.systems`
    };
    setCloudServices(prev => [newService, ...prev]);
    addNotification('Deployment Initiated', `Service "${name}" is deploying to af-south-1 edge.`, 'cloud');

    setTimeout(() => {
      setCloudServices(prev => prev.map(s => s.id === newService.id ? { ...s, status: 'running', cpu: 18, memory: 1.2 } : s));
      addNotification('Deployment Complete', `Service "${name}" is live and passing health checks.`, 'cloud');
    }, 2500);
  };

  // Call the server Gemini AI API with fallback
  const askNexusAI = async (prompt: string, agent: AIAgentId = 'general'): Promise<string> => {
    try {
      const response = await fetch('/api/nexus/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, agent })
      });
      if (!response.ok) {
        throw new Error('API server returned error');
      }
      const data = await response.json();
      return data.text || 'Response received.';
    } catch (err) {
      console.warn('Network call failed, utilizing offline Nexus Neural engine:', err);
      return `[Nexus OS Neural Response]\nProcessed query: "${prompt}"\n\nResult:\n• System state verified.\n• Identity: ${user.name} (${user.tier})\n• Context synchronized with Nexus Work & Cloud.\n\nAll services operational.`;
    }
  };

  // Natural language command execution (NEXUS COMMAND)
  const executeCommand = async (cmd: string) => {
    const lower = cmd.toLowerCase();

    // Intent routing
    if (lower.includes('presentation') || lower.includes('rwanda') || lower.includes('slides')) {
      const doc = createDocument("Rwanda's Technology Sector Keynote", 'slide', 'Business', 'Slide 1: Rwanda Innovation & Tech Hub 2026\nSlide 2: Kigali Innovation City Ecosystem\nSlide 3: Pan-African Fintech & Sovereign AI\nSlide 4: Strategic Roadmaps & Milestones');
      setActiveApp('work');
      return {
        action: 'CREATED_PRESENTATION',
        app: 'work',
        message: 'Created presentation "Rwanda\'s Technology Sector Keynote" in Business folder and opened Nexus Work.',
        document: doc
      };
    }

    if (lower.includes('budget') || lower.includes('spreadsheet') || lower.includes('sheets') || lower.includes('finance')) {
      const doc = createDocument('Q4 Strategic Budget & Projections', 'sheet', 'Finance', 'Item,Budget,Actual,Variance\nCompute Infrastructure,$180000,$165000,-$15000\nR&D AI Research,$95000,$92000,-$3000\nTalent & Operations,$140000,$140000,$0');
      setActiveApp('work');
      return {
        action: 'CREATED_SHEET',
        app: 'work',
        message: 'Created spreadsheet "Q4 Strategic Budget & Projections" in Finance folder.',
        document: doc
      };
    }

    if (lower.includes('deploy') || lower.includes('website') || lower.includes('api') || lower.includes('cloud')) {
      deployService('nexus-gateway-v2', 'container');
      setActiveApp('cloud');
      return {
        action: 'DEPLOYED_CLOUD',
        app: 'cloud',
        message: 'Initiated edge deployment for nexus-gateway-v2 in Nexus Cloud.',
      };
    }

    if (lower.includes('meet') || lower.includes('call') || lower.includes('chat') || lower.includes('connect')) {
      setActiveApp('connect');
      return {
        action: 'OPENED_CONNECT',
        app: 'connect',
        message: 'Opened Nexus Connect. Ready to initiate voice/video call or team messaging.',
      };
    }

    if (lower.includes('code') || lower.includes('ide') || lower.includes('developer') || lower.includes('git')) {
      setActiveApp('code');
      return {
        action: 'OPENED_CODE',
        app: 'code',
        message: 'Launched Nexus Code Web IDE and developer workspace.',
      };
    }

    if (lower.includes('security') || lower.includes('audit') || lower.includes('passkey') || lower.includes('devices')) {
      setActiveApp('security');
      return {
        action: 'OPENED_SECURITY',
        app: 'security',
        message: 'Opened Nexus Security Center. Device audits and threat monitors are active.',
      };
    }

    if (lower.includes('campus') || lower.includes('course') || lower.includes('tutor') || lower.includes('learn')) {
      setActiveApp('campus');
      return {
        action: 'OPENED_CAMPUS',
        app: 'campus',
        message: 'Opened Nexus Campus. Your personalized learning profile and AI tutor are ready.',
      };
    }

    if (lower.includes('business') || lower.includes('crm') || lower.includes('invoice')) {
      setActiveApp('business');
      return {
        action: 'OPENED_BUSINESS',
        app: 'business',
        message: 'Opened Nexus Business Suite.',
      };
    }

    // Default: Ask Nexus AI
    setActiveApp('ai');
    const aiAnswer = await askNexusAI(cmd, 'general');
    return {
      action: 'NEXUS_AI_QUERY',
      app: 'ai',
      message: aiAnswer
    };
  };

  return (
    <NexusContext.Provider value={{
      activeApp,
      setActiveApp: (app) => {
        if (!openApps.includes(app)) {
          setOpenApps(prev => [...prev, app]);
        }
        if (minimizedApps.includes(app)) {
          setMinimizedApps(prev => prev.filter(a => a !== app));
        }
        setActiveApp(app);
      },
      minimizedApps,
      toggleMinimizeApp,
      openApps,
      closeApp,
      theme,
      setTheme,
      language,
      setLanguage,
      currency,
      setCurrency,
      lowBandwidth,
      setLowBandwidth,
      isCommandOpen,
      setIsCommandOpen,
      executeCommand,
      user,
      updateUser,
      isIdModalOpen,
      setIsIdModalOpen,
      notifications,
      unreadCount: notifications.filter(n => !n.read).length,
      markAllNotificationsRead,
      addNotification,
      documents,
      createDocument,
      updateDocument,
      cloudServices,
      deployService,
      askNexusAI
    }}>
      {children}
    </NexusContext.Provider>
  );
};

export const useNexus = () => {
  const context = useContext(NexusContext);
  if (!context) {
    throw new Error('useNexus must be used within a NexusProvider');
  }
  return context;
};
