'use client';

import { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  X,
  Building2,
  Calendar,
  UserCheck,
  Search,
  ChevronDown,
  Bot,
  Send,
} from 'lucide-react';
import { useChat } from '@/hooks/useChat';
import { useChatStore } from '@/store/chatStore';
import { useUIStore } from '@/store/uiStore';
import { cn } from '@/lib/utils';
import { PropertyCard } from '@/components/properties/PropertyCard';

export function FloatingChatWidget() {
  const { floatingChatOpen, toggleFloatingChat, setFloatingChatOpen } = useUIStore();
  const { setShowLeadModal, setShowAppointmentModal } = useChatStore();
  const { activeSession, isTyping, inputValue, setInputValue, handleSend } = useChat();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat messages
  useEffect(() => {
    if (floatingChatOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [floatingChatOpen, activeSession?.messages, isTyping]);

  const messages = activeSession?.messages ?? [];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      <AnimatePresence>
        {floatingChatOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="pointer-events-auto mb-4 w-[92vw] sm:w-[420px] max-h-[640px] h-[82vh] bg-background/95 dark:bg-[#0A1128]/95 backdrop-blur-2xl rounded-3xl border border-[#D4AF37]/30 shadow-2xl flex flex-col overflow-hidden text-foreground border-glow"
          >
            {/* Header */}
            <div className="relative px-5 py-4 bg-gradient-to-r from-[#0A1128] via-[#111A38] to-[#0A1128] border-b border-[#D4AF37]/30 flex items-center justify-between text-white shadow-md shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#D4AF37] via-[#F5E096] to-[#C5A059] flex items-center justify-center text-[#0A1128] shadow-lg font-bold">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-[#0A1128] rounded-full" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-outfit font-bold text-base text-white">
                      Ancara Real Estate AI
                    </h3>
                    <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-[#D4AF37]/20 text-[#F5E096] border border-[#D4AF37]/30">
                      PRO CONCIERGE
                    </span>
                  </div>
                  <p className="text-xs text-white/70 flex items-center gap-1.5 mt-0.5">
                    <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                    Instant Luxury Real Estate Assistance
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setFloatingChatOpen(false)}
                  className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-white/10 text-white/80 hover:text-white transition-colors"
                  aria-label="Close Chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Actions Bar */}
            <div className="px-3 py-2 bg-[#0A1128]/40 dark:bg-black/40 border-b border-border/50 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0 text-xs">
              <button
                onClick={() => {
                  setInputValue('Show me luxury villas in Dubai Marina');
                }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-accent/60 hover:bg-accent border border-border text-foreground transition-all shrink-0"
              >
                <Search className="w-3 h-3 text-[#D4AF37]" />
                Dubai Villas
              </button>
              <button
                onClick={() => setShowLeadModal(true)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 border border-[#D4AF37]/30 text-[#D4AF37] font-medium transition-all shrink-0"
              >
                <UserCheck className="w-3 h-3" />
                Register Requirements
              </button>
              <button
                onClick={() => setShowAppointmentModal(true)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-medium transition-all shrink-0"
              >
                <Calendar className="w-3 h-3" />
                Book Consultation
              </button>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {/* Default Welcome Message if empty */}
              {messages.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-[#0A1128]/80 to-[#111A38]/90 border border-[#D4AF37]/30 text-white shadow-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-7 h-7 rounded-xl bg-[#D4AF37] flex items-center justify-center text-[#0A1128]">
                        <Bot className="w-4 h-4" />
                      </div>
                      <span className="font-outfit font-bold text-sm text-[#F5E096]">
                        Ancara Real Estate AI
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-slate-200">
                      Hello 👋 Welcome to <strong>Ancara Real Estate</strong>.
                      <br />
                      I can help you find properties, answer your questions, and arrange a consultation.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl border border-border/80 bg-accent/20 space-y-2">
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      How can I assist you today?
                    </h4>
                    <div className="grid grid-cols-1 gap-2">
                      <button
                        onClick={() => handleSend('I am looking for luxury villas in Dubai Marina')}
                        className="text-left p-2.5 rounded-xl border border-border bg-card hover:border-[#D4AF37]/60 hover:bg-[#D4AF37]/5 text-xs transition-all flex items-center justify-between group"
                      >
                        <span>🏰 Explore Luxury Dubai Marina Villas</span>
                        <ChevronDown className="w-3.5 h-3.5 -rotate-90 opacity-40 group-hover:opacity-100 group-hover:text-[#D4AF37] transition-all" />
                      </button>
                      <button
                        onClick={() => handleSend('Tell me about modern apartments in Downtown')}
                        className="text-left p-2.5 rounded-xl border border-border bg-card hover:border-[#D4AF37]/60 hover:bg-[#D4AF37]/5 text-xs transition-all flex items-center justify-between group"
                      >
                        <span>🏢 Downtown Luxury Apartments</span>
                        <ChevronDown className="w-3.5 h-3.5 -rotate-90 opacity-40 group-hover:opacity-100 group-hover:text-[#D4AF37] transition-all" />
                      </button>
                      <button
                        onClick={() => setShowAppointmentModal(true)}
                        className="text-left p-2.5 rounded-xl border border-[#D4AF37]/30 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 text-xs font-medium text-[#D4AF37] transition-all flex items-center justify-between group"
                      >
                        <span>📅 Schedule a Private VIP Consultation</span>
                        <Calendar className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Chat Message List */}
              {messages.map((msg) => {
                const isUser = msg.role === 'user';
                return (
                  <div
                    key={msg.id}
                    className={cn('flex flex-col space-y-2', isUser ? 'items-end' : 'items-start')}
                  >
                    <div
                      className={cn(
                        'max-w-[85%] rounded-2xl p-3.5 text-sm shadow-sm',
                        isUser
                          ? 'bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-[#0A1128] font-medium rounded-br-none'
                          : 'bg-card border border-border/80 text-foreground rounded-bl-none'
                      )}
                    >
                      <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                    </div>

                    {/* Recommended Property Cards inside Chat */}
                    {msg.recommendedProperties && msg.recommendedProperties.length > 0 && (
                      <div className="w-full space-y-2 pt-1">
                        <p className="text-xs font-semibold text-[#D4AF37] flex items-center gap-1">
                          <Sparkles className="w-3 h-3" /> Recommended Properties:
                        </p>
                        <div className="grid grid-cols-1 gap-2">
                          {msg.recommendedProperties.map((prop) => (
                            <PropertyCard key={prop.id} property={prop} variant="compact" />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex items-center gap-2 p-3 rounded-2xl bg-card border border-border max-w-[120px]">
                  <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
                  <span className="text-xs text-muted-foreground">Thinking...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <div className="p-3 bg-card border-t border-border/80 shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask Ancara AI about luxury properties..."
                  className="flex-1 px-4 py-2.5 text-sm rounded-xl border border-border bg-background/80 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/30 outline-none transition-all"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-[#0A1128] font-bold flex items-center justify-center hover:opacity-90 disabled:opacity-40 transition-all shadow-md shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
              <div className="flex items-center justify-between text-[10px] text-muted-foreground px-1 mt-2">
                <span>Powered by Ancara Real Estate AI</span>
                <button
                  type="button"
                  onClick={() => setShowLeadModal(true)}
                  className="hover:text-[#D4AF37] underline transition-colors"
                >
                  Request Specialist Callback
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleFloatingChat}
        className="pointer-events-auto relative group flex items-center gap-3 px-4 py-3.5 rounded-full bg-gradient-to-r from-[#0A1128] via-[#111A38] to-[#0A1128] text-white border-2 border-[#D4AF37] shadow-[0_10px_35px_rgba(212,175,55,0.3)] transition-all overflow-hidden"
      >
        <span className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/0 via-[#D4AF37]/20 to-[#D4AF37]/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#C5A059] flex items-center justify-center text-[#0A1128] font-bold shadow-md">
          {floatingChatOpen ? <X className="w-5 h-5" /> : <Building2 className="w-5 h-5" />}
        </div>
        <div className="hidden sm:flex flex-col text-left">
          <span className="font-outfit font-bold text-sm tracking-wide flex items-center gap-1.5 text-white">
            Talk With AI <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          </span>
          <span className="text-[10px] text-[#F5E096]/90">Ancara Concierge</span>
        </div>
      </motion.button>
    </div>
  );
}
