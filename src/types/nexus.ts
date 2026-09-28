export type NexusAppId = 
  | 'workspace'
  | 'ai'
  | 'work'
  | 'cloud'
  | 'code'
  | 'connect'
  | 'campus'
  | 'business'
  | 'creator'
  | 'market'
  | 'security'
  | 'admin';

export type AIAgentId = 
  | 'general'
  | 'law'
  | 'business'
  | 'coding'
  | 'education'
  | 'creative'
  | 'research'
  | 'finance';

export type NexusTheme = 'dark' | 'light' | 'contrast';

export interface NexusUser {
  id: string;
  name: string;
  email: string;
  title: string;
  organization: string;
  avatarUrl: string;
  tier: 'Free' | 'Pro' | 'Business' | 'Enterprise';
  twoFactorEnabled: boolean;
  passkeysCount: number;
  devices: {
    id: string;
    name: string;
    location: string;
    ip: string;
    isCurrent: boolean;
    lastActive: string;
  }[];
}

export interface NexusNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'info' | 'security' | 'cloud' | 'connect' | 'work';
  read: boolean;
}

export interface NexusDocument {
  id: string;
  title: string;
  type: 'doc' | 'sheet' | 'slide' | 'note';
  folder: string;
  lastModified: string;
  content: string;
  author: string;
  collaborators: string[];
}

export interface NexusCloudService {
  id: string;
  name: string;
  type: 'container' | 'database' | 'api' | 'bucket';
  region: string;
  status: 'running' | 'deploying' | 'stopped';
  cpu: number;
  memory: number;
  requests: string;
  endpoint?: string;
}

export interface NexusChatMessage {
  id: string;
  sender: string;
  avatar: string;
  text: string;
  time: string;
  isAI?: boolean;
}

export interface NexusCourse {
  id: string;
  title: string;
  category: string;
  progress: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  modules: number;
  instructor: string;
}
