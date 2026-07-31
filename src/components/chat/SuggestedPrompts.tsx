'use client';

import { motion } from 'framer-motion';
import { SUGGESTED_PROMPTS } from '@/lib/constants';

interface SuggestedPromptsProps {
  onSelect: (prompt: string) => void;
}

export function SuggestedPrompts({ onSelect }: SuggestedPromptsProps) {
  return (
    <div className="px-4 pb-4">
      <p className="text-xs text-muted-foreground mb-3 font-medium">Try asking:</p>
      <div className="flex flex-wrap gap-3">
        {SUGGESTED_PROMPTS.map(({ text, icon }, i) => (
          <motion.button
            key={text}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ y: -1, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(text)}
            className="flex items-center gap-2 px-4 py-3 rounded-2xl border border-border bg-card text-sm text-muted-foreground hover:border-primary/40 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
          >
            <span>{icon}</span>
            <span className="text-muted-foreground hover:text-foreground">{text}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
