'use client';

import { ChatSidebar } from '@/components/chat/ChatSidebar';
import { ChatArea } from '@/components/chat/ChatArea';
import { LeadFormModal } from '@/components/modals/LeadFormModal';
import { AppointmentModal } from '@/components/modals/AppointmentModal';

export default function ChatPage() {
  return (
    <div className="relative flex h-dvh w-screen overflow-hidden bg-background text-foreground font-sans">
      {/* Sidebar Panel - Handles its own responsive collapsible/drawer behavior */}
      <ChatSidebar />

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col min-w-0 h-full overflow-hidden relative">
        <ChatArea />
      </main>

      {/* Overlays / Modals */}
      <LeadFormModal />
      <AppointmentModal />
    </div>
  );
}

