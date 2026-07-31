'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useSyncExternalStore, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useChat } from '@/hooks/useChat';
import { ChatBubble } from './ChatBubble';
import { TypingIndicator } from './TypingIndicator';
import { SuggestedPrompts } from './SuggestedPrompts';
import { ChatInput } from './ChatInput';
import { ChatEmptyStateIllustration } from '@/components/common/EmptyState';
import { useUIStore } from '@/store/uiStore';
import { useChatStore } from '@/store/chatStore';
import { Menu, Plus, Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export function ChatArea() {
  const isHydrated = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const {
    activeSession,
    isTyping,
    isPending,
    inputValue,
    setInputValue,
    handleSend,
  } = useChat();

  const router = useRouter();
  const { chatSidebarOpen, setChatSidebarOpen } = useUIStore();
  const { createNewSession } = useChatStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasMessages = isHydrated && (activeSession?.messages.length ?? 0) > 0;

  useEffect(() => {
    if (!isHydrated) return;
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeSession?.messages, isTyping, isHydrated]);

  const handleNewChat = () => {
    createNewSession();
    router.push('/chat');
  };

  return (
    <div className="flex flex-col h-full min-h-0 bg-background overflow-hidden relative">
      {/* Top Header Navbar */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-border/40 bg-background/80 px-4 md:px-6 backdrop-blur-md z-30 select-none">
        <div className="flex items-center gap-3">
          {/* Sidebar Toggle Button */}
          <button
            onClick={() => setChatSidebarOpen(!chatSidebarOpen)}
            className={cn(
              "p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 transition-all cursor-pointer",
              chatSidebarOpen ? "xl:hidden" : "xl:flex"
            )}
            aria-label="Toggle sidebar"
          >
            <Menu className="w-4.5 h-4.5" />
          </button>

          {/* Logo Branding */}
          <div className={cn("flex items-center gap-2", chatSidebarOpen ? "xl:hidden" : "xl:flex")}>
            <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-[#D4AF37] via-[#F5E096] to-[#C5A059] flex items-center justify-center shadow-sm shrink-0">
              <Building2 className="w-4 h-4 text-[#0A1128]" />
            </div>
            <span className="font-outfit font-bold text-sm tracking-tight">
              Ancara Real Estate
            </span>
          </div>
        </div>

        {/* New Chat Button (Mobile Header) */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleNewChat}
            className="xl:hidden p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent transition-colors cursor-pointer"
            aria-label="New chat"
          >
            <Plus className="w-4.5 h-4.5" />
          </button>
        </div>
      </header>

      {/* Message and Empty State Scroll Panel */}
      <div className="flex-1 min-h-0 overflow-y-auto scrollbar-thin">
        {!hasMessages ? (
          /* Empty State View */
          <div className="flex flex-col items-center justify-center min-h-full py-12">
            <div className="mx-auto w-full max-w-2xl px-4 md:px-6 lg:px-8 flex flex-col items-center justify-center gap-6">
              <ChatEmptyStateIllustration />
              <SuggestedPrompts onSelect={(p) => handleSend(p)} />
            </div>
          </div>
        ) : (
          /* Message Feed View */
          <div className="mx-auto w-full max-w-3xl px-4 py-6 md:px-6 lg:px-8 space-y-6">
            <AnimatePresence mode="popLayout" initial={false}>
              {activeSession?.messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="w-full"
                >
                  <ChatBubble message={message} />
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="w-full"
                >
                  <TypingIndicator />
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Sticky Bottom Input */}
      <div className="shrink-0">
        <ChatInput
          value={inputValue}
          onChange={setInputValue}
          onSend={() => handleSend()}
          isLoading={isPending || isTyping}
        />
      </div>
    </div>
  );
}
