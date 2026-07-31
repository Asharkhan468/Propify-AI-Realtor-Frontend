'use client';

import { Send } from 'lucide-react';
import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ChatInputProps {
  value: string;
  onChange: (val: string) => void;
  onSend: () => void;
  isLoading: boolean;
}

export function ChatInput({ value, onChange, onSend, isLoading }: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!isLoading && value.trim()) onSend();
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [value]);

  return (
    <div
      className="px-4 py-4 md:px-6 md:py-5 border-t border-border/40 bg-background/80 backdrop-blur-xl"
      style={{ paddingBottom: 'calc(1rem + env(safe-area-inset-bottom, 0px))' }}
    >
      <div className="mx-auto max-w-3xl flex items-end gap-2.5 p-2 pl-3.5 pr-2 rounded-[24px] border border-border bg-card shadow-sm focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/10 transition-all">
        {/* Textarea Input */}
        <textarea
          ref={textareaRef}
          id="chat-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask me about luxury properties in Dubai..."
          className="flex-1 resize-none bg-transparent text-sm leading-6 outline-none placeholder:text-muted-foreground/60 py-2.5 min-h-[40px] max-h-[120px] scrollbar-none"
          rows={1}
          disabled={isLoading}
        />

        {/* Send Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onSend}
          disabled={isLoading || !value.trim()}
          className="p-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-[#0A1128] font-bold disabled:opacity-40 disabled:cursor-not-allowed shadow-md hover:brightness-110 transition-all shrink-0"
          aria-label="Send message"
          id="chat-send"
        >
          {isLoading ? (
            <div className="w-4.5 h-4.5 border-2 border-[#0A1128]/30 border-t-[#0A1128] rounded-full animate-spin" />
          ) : (
            <Send className="w-4.5 h-4.5" />
          )}
        </motion.button>
      </div>

      {/* Disclaimer */}
      <p className="text-center text-[10px] md:text-xs text-muted-foreground/80 mt-2.5 select-none">
        Ancara AI can make mistakes. Verify important information with agents.
      </p>
    </div>
  );
}
