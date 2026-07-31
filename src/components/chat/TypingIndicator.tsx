'use client';

import { Building2 } from 'lucide-react';

export function TypingIndicator() {
  return (
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 rounded-3xl bg-gradient-to-br from-[#D4AF37] via-[#F5E096] to-[#C5A059] flex items-center justify-center shadow-lg shrink-0">
        <Building2 className="w-5 h-5 text-[#0A1128]" />
      </div>
      <div className="glass border border-border px-4 py-3 rounded-[28px] rounded-tl-none">
        <div className="flex items-center gap-2 h-6">
          <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
          <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse animation-delay-200" />
          <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse animation-delay-400" />
        </div>
      </div>
    </div>
  );
}
