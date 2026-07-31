'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  Building2,
  Plus,
  MessageSquare,
  Heart,
  Calendar,
  Settings,
  Trash2,
  ChevronLeft,
  X,
} from 'lucide-react';
import { useChatStore } from '@/store/chatStore';
import { useUIStore } from '@/store/uiStore';
import { cn, truncateText } from '@/lib/utils';

export function ChatSidebar() {
  const { chatSidebarOpen, setChatSidebarOpen } = useUIStore();
  const [isDesktop, setIsDesktop] = useState(false);

  // Monitor screen width to switch between desktop fixed and mobile/tablet drawer layouts
  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 1280; // xl breakpoint
      setIsDesktop(desktop);
      // Default to closed on mobile/tablet, open on desktop
      if (!desktop && chatSidebarOpen) {
        // Keep it as is or let user toggle
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [chatSidebarOpen]);

  // Prevent body scroll on mobile/tablet when sidebar is open
  useEffect(() => {
    if (!isDesktop && chatSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isDesktop, chatSidebarOpen]);

  // Handle Escape key to close sidebar on mobile/tablet
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isDesktop && chatSidebarOpen) {
        setChatSidebarOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDesktop, chatSidebarOpen, setChatSidebarOpen]);

  return (
    <>
      {/* 1. DESKTOP SIDEBAR: Fixed panel that pushes content, responsive width animation */}
      <AnimatePresence initial={false}>
        {isDesktop && chatSidebarOpen && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 280, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
            className="relative flex flex-col border-r border-border/60 bg-card/30 backdrop-blur-md overflow-hidden shrink-0 h-full"
          >
            <div className="w-[280px] h-full flex flex-col">
              <SidebarContent isDesktop={true} onClose={() => setChatSidebarOpen(false)} />
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* 2. MOBILE & TABLET SIDEBAR: Slide-over drawer with dark backdrop overlay */}
      <AnimatePresence>
        {!isDesktop && chatSidebarOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setChatSidebarOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              aria-hidden="true"
            />

            {/* Slide-in Drawer Container */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', bounce: 0.05, duration: 0.35 }}
              className="fixed inset-y-0 left-0 z-50 w-[280px] max-w-[85vw] h-full flex flex-col bg-card border-r border-border/80 shadow-2xl"
            >
              <SidebarContent isDesktop={false} onClose={() => setChatSidebarOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

interface SidebarContentProps {
  isDesktop: boolean;
  onClose: () => void;
}

function SidebarContent({ isDesktop, onClose }: SidebarContentProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { sessions, activeSessionId, createNewSession, setActiveSession, deleteSession } = useChatStore();
  const { setChatSidebarOpen } = useUIStore();

  const handleNewChat = () => {
    createNewSession();
    router.push('/chat');
    if (!isDesktop) {
      onClose();
    }
  };

  const sidebarLinks = [
    { href: '/saved', icon: Heart, label: 'Saved Properties' },
    { href: '/appointments', icon: Calendar, label: 'Appointments' },
    { href: '/profile', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="flex flex-col h-full p-4 select-none">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between mb-5 min-h-[40px]">
          <Link href="/" className="flex items-center gap-2.5 outline-none focus-visible:ring-2 focus-visible:ring-primary/20 rounded-lg p-1 transition-all">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#D4AF37] via-[#F5E096] to-[#C5A059] flex items-center justify-center shadow-sm shrink-0">
              <Building2 className="w-4 h-4 text-[#0A1128]" />
            </div>
            <span className="font-outfit font-bold text-base tracking-tight">
              <span className="gradient-text">Ancara</span>
              <span className="text-foreground/50 font-normal text-xs">Real Estate</span>
            </span>
          </Link>
        
        {/* Toggle Button */}
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 transition-colors"
          aria-label={isDesktop ? "Collapse sidebar" : "Close sidebar"}
        >
          {isDesktop ? <ChevronLeft className="w-4.5 h-4.5" /> : <X className="w-4.5 h-4.5" />}
        </button>
      </div>

      {/* New Chat Button */}
      <button
        id="new-chat"
        onClick={handleNewChat}
        className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold mb-5 shadow-sm hover:bg-primary/95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 active:scale-[0.98] transition-all cursor-pointer"
      >
        <Plus className="w-4 h-4" />
        New Chat
      </button>

      {/* Chat History Section */}
      <div className="flex-1 min-h-0 flex flex-col mb-4">
        <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground/70 px-2 mb-2">
          Recent Chats
        </p>
        
        <div className="flex-1 overflow-y-auto pr-1 space-y-1.5 scrollbar-thin">
          <AnimatePresence initial={false}>
            {sessions.map((session) => {
              const isActive = session.id === activeSessionId;
              return (
                <motion.div
                  key={session.id}
                  initial={{ opacity: 0, height: 0, y: -8 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -8 }}
                  transition={{ type: 'spring', bounce: 0, duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div
                    className={cn(
                      'group relative flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer transition-all text-sm font-medium border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30',
                      isActive
                        ? 'bg-primary/10 border-primary/20 text-primary shadow-[0_2px_12px_rgba(212,175,55,0.04)]'
                        : 'border-transparent text-muted-foreground hover:bg-accent/60 hover:text-foreground hover:border-border/30'
                    )}
                    onClick={() => {
                      setActiveSession(session.id);
                      if (!isDesktop) {
                        setChatSidebarOpen(false);
                      }
                    }}
                  >
                    <MessageSquare className={cn("w-4 h-4 shrink-0 transition-colors", isActive ? "text-primary" : "text-muted-foreground/60 group-hover:text-foreground/80")} />
                    <span className="flex-1 truncate pr-6">{truncateText(session.title, 24)}</span>
                    
                    {/* Delete Session Button (revealed on hover) */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteSession(session.id);
                      }}
                      className="absolute right-2.5 p-1 rounded-md opacity-0 group-hover:opacity-100 focus-visible:opacity-100 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all shrink-0 cursor-pointer"
                      aria-label={`Delete chat ${session.title}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {sessions.length === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs text-muted-foreground/80 text-center py-6 px-4 leading-relaxed"
            >
              No conversations yet.<br />Start a new chat above!
            </motion.p>
          )}
        </div>
      </div>

      {/* Bottom Navigation Section */}
      <div className="space-y-1 pt-4 border-t border-border/60">
        {sidebarLinks.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20",
                isActive
                  ? "bg-accent border-border text-foreground font-semibold"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:bg-accent/60"
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

