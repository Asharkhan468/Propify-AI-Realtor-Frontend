'use client';

import { ChatMessage } from '@/types/chat.types';
import { PropertyCard } from '@/components/properties/PropertyCard';
import { useState } from 'react';
import { Copy, Check, Building2, User } from 'lucide-react';
import { toast } from 'sonner';
import { useChatStore } from '@/store/chatStore';

interface ChatBubbleProps {
  message: ChatMessage;
}

export function ChatBubble({ message }: ChatBubbleProps) {
  const [copied, setCopied] = useState(false);
  const { setShowAppointmentModal, setSelectedPropertyId } = useChatStore();

  const handleCopy = async () => {
    if (!message.content) return;
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    toast.success('Copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleBookVisit = (propertyId: string) => {
    setSelectedPropertyId(propertyId);
    setShowAppointmentModal(true);
  };

  if (message.role === 'user') {
    return (
      <div className="flex items-end gap-3 justify-end">
        <div className="max-w-[85%] lg:max-w-[65%]">
          <div className="rounded-[28px] bg-gradient-to-r from-[#D4AF37] to-[#C5A059] px-4 py-3 shadow-lg text-[#0A1128] font-medium">
            <p className="text-sm leading-7">{message.content ?? ''}</p>
          </div>
          <div className="flex justify-end mt-2">
            <span className="text-[11px] uppercase tracking-[0.2em] text-white/70">
              {new Date(message.timestamp).toLocaleTimeString('en-AE', { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-center w-10 h-10 rounded-3xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#0A1128] shadow-sm shrink-0">
          <User className="w-4 h-4" />
        </div>
      </div>
    );
  }

  // AI message
  return (
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 rounded-3xl bg-gradient-to-br from-[#D4AF37] via-[#F5E096] to-[#C5A059] flex items-center justify-center shadow-lg shrink-0">
        <Building2 className="w-5 h-5 text-[#0A1128]" />
      </div>
      <div className="max-w-[92%] lg:max-w-[82%] space-y-4">
        {/* Text bubble */}
        <div className="group relative">
          <div className="glass border border-border px-5 py-4 rounded-[32px] rounded-tl-none shadow-sm">
            <div className="prose-chat text-sm leading-7">
              {renderChatContent(message.content)}
            </div>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              {new Date(message.timestamp).toLocaleTimeString('en-AE', { hour: '2-digit', minute: '2-digit' })}
            </span>
            <button
              onClick={handleCopy}
              className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground"
              aria-label="Copy message"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Property cards */}
        {message.recommendedProperties && message.recommendedProperties.length > 0 && (
          <div>
            <p className="text-xs text-muted-foreground mb-3 font-medium">
              {message.recommendedProperties.length} properties found:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {message.recommendedProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  variant="chat"
                  onBookVisit={handleBookVisit}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function renderChatContent(content: string) {
  const text = content ?? '';
  return text.split('\n').map((line, index) => {
    if (line.startsWith('- ')) {
      return (
        <p key={index} className="mb-2 list-disc list-inside">
          {line.slice(2)}
        </p>
      );
    }

    const parts = line.split(/\*\*(.*?)\*\*/g);
    return (
      <p key={index} className="mb-2 leading-relaxed">
        {parts.map((part, partIndex) =>
          partIndex % 2 === 1 ? <strong key={partIndex}>{part}</strong> : part
        )}
      </p>
    );
  });
}
