'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Menu, X, Home, MessageSquare, Search, Calendar, User, Sparkles, PhoneCall } from 'lucide-react';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import { useUIStore } from '@/store/uiStore';
import { useChatStore } from '@/store/chatStore';
import { cn } from '@/lib/utils';
import { NAV_LINKS } from '@/lib/constants';

const navIcons = {
  '/': Home,
  '/properties': Search,
  '/chat': MessageSquare,
  '/appointments': Calendar,
};

export function Navbar() {
  const pathname = usePathname();
  const { sidebarOpen, toggleSidebar, setFloatingChatOpen } = useUIStore();
  const { setShowLeadModal } = useChatStore();

  if (pathname.startsWith('/chat')) return null;

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-[#0A1128]/90 border-b border-[#D4AF37]/25 backdrop-blur-xl transition-all">
        <div className="container px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#D4AF37] via-[#F5E096] to-[#C5A059] flex items-center justify-center shadow-[0_4px_20px_rgba(212,175,55,0.3)] group-hover:scale-105 transition-transform duration-300">
              <Building2 className="w-5 h-5 text-[#0A1128]" />
            </div>
            <div className="flex flex-col">
              <span className="font-outfit font-extrabold text-xl tracking-tight text-white flex items-center gap-1.5">
                ANCARA
                <span className="text-[#D4AF37] font-light">ESTATE</span>
              </span>
              <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-[#D4AF37]/80 -mt-1">
                Luxury Properties
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1 bg-[#111A38]/60 p-1.5 rounded-full border border-[#D4AF37]/20">
            {NAV_LINKS.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    'relative px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all',
                    isActive
                      ? 'text-[#0A1128]'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-[#C5A059] rounded-full shadow-md"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            {/* AI Assistant Trigger Button */}
            <button
              onClick={() => setFloatingChatOpen(true)}
              className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F5E096] to-[#C5A059] text-[#0A1128] text-xs font-bold uppercase tracking-wider hover:brightness-110 shadow-[0_4px_20px_rgba(212,175,55,0.25)] transition-all"
            >
              <Sparkles className="w-4 h-4 fill-current" />
              <span>Talk With AI</span>
            </button>

            {/* Contact Specialist */}
            <button
              onClick={() => setShowLeadModal(true)}
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37]/10 text-xs font-semibold uppercase tracking-wider transition-all"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Connect</span>
            </button>

            {/* Mobile menu toggle */}
            <button
              id="mobile-menu-toggle"
              onClick={toggleSidebar}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden"
              onClick={toggleSidebar}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', bounce: 0.1, duration: 0.4 }}
              className="fixed left-0 top-0 bottom-0 z-50 w-[88vw] max-w-xs bg-[#0A1128] border-r border-[#D4AF37]/30 p-6 md:hidden flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#C5A059] flex items-center justify-center shadow-sm">
                    <Building2 className="w-5 h-5 text-[#0A1128]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-outfit font-extrabold text-lg tracking-tight text-white">
                      ANCARA <span className="text-[#D4AF37]">ESTATE</span>
                    </span>
                    <span className="text-[10px] tracking-widest uppercase text-[#D4AF37]/80">
                      Luxury Real Estate
                    </span>
                  </div>
                </div>

                <nav className="space-y-2">
                  {NAV_LINKS.map(({ href, label }) => {
                    const Icon = navIcons[href as keyof typeof navIcons] || Home;
                    const isActive = pathname === href;
                    return (
                      <Link
                        key={href}
                        href={href}
                        onClick={toggleSidebar}
                        className={cn(
                          'flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-colors',
                          isActive
                            ? 'bg-[#D4AF37] text-[#0A1128]'
                            : 'text-slate-300 hover:text-white hover:bg-white/5'
                        )}
                      >
                        <Icon className="w-4 h-4" />
                        {label}
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <div className="space-y-3 pt-6 border-t border-border/40">
                <button
                  onClick={() => {
                    toggleSidebar();
                    setFloatingChatOpen(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-[#0A1128] font-bold text-sm shadow-md"
                >
                  <Sparkles className="w-4 h-4" />
                  Talk With AI Concierge
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
