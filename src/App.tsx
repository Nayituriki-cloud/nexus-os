import React from 'react';
import { NexusProvider, useNexus } from './context/NexusContext';
import { NexusTopBar } from './components/os/NexusTopBar';
import { NexusDock } from './components/os/NexusDock';
import { NexusCommandBar } from './components/os/NexusCommandBar';
import { NexusWorkspace } from './components/os/NexusWorkspace';
import { NexusAIApp } from './components/apps/NexusAIApp';
import { NexusWorkApp } from './components/apps/NexusWorkApp';
import { NexusCloudApp } from './components/apps/NexusCloudApp';
import { NexusCodeApp } from './components/apps/NexusCodeApp';
import { NexusConnectApp } from './components/apps/NexusConnectApp';
import { NexusCampusApp } from './components/apps/NexusCampusApp';
import { NexusBusinessApp } from './components/apps/NexusBusinessApp';
import { NexusCreatorApp } from './components/apps/NexusCreatorApp';
import { NexusMarketApp } from './components/apps/NexusMarketApp';
import { NexusSecurityApp } from './components/apps/NexusSecurityApp';
import { NexusAdminApp } from './components/apps/NexusAdminApp';
import { NexusIdModal } from './components/apps/NexusIdModal';

const NexusOSStage: React.FC = () => {
  const { activeApp } = useNexus();

  const renderActiveApp = () => {
    switch (activeApp) {
      case 'workspace':
        return <NexusWorkspace />;
      case 'ai':
        return <NexusAIApp />;
      case 'work':
        return <NexusWorkApp />;
      case 'cloud':
        return <NexusCloudApp />;
      case 'code':
        return <NexusCodeApp />;
      case 'connect':
        return <NexusConnectApp />;
      case 'campus':
        return <NexusCampusApp />;
      case 'business':
        return <NexusBusinessApp />;
      case 'creator':
        return <NexusCreatorApp />;
      case 'market':
        return <NexusMarketApp />;
      case 'security':
        return <NexusSecurityApp />;
      case 'admin':
        return <NexusAdminApp />;
      default:
        return <NexusWorkspace />;
    }
  };

  return (
    <div className="min-h-screen w-screen bg-slate-950 text-slate-100 flex flex-col relative overflow-hidden select-none">
      {/* Dynamic Background Cyber Gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl" />
      </div>

      {/* OS Top Navigation Bar */}
      <NexusTopBar />

      {/* Main Workspace Stage */}
      <main className="flex-1 relative z-10 overflow-hidden">
        {renderActiveApp()}
      </main>

      {/* Universal Ecosystem Dock */}
      <NexusDock />

      {/* Universal NEXUS COMMAND Interface */}
      <NexusCommandBar />

      {/* Unified Identity Profile Modal */}
      <NexusIdModal />
    </div>
  );
};

export default function App() {
  return (
    <NexusProvider>
      <NexusOSStage />
    </NexusProvider>
  );
}
