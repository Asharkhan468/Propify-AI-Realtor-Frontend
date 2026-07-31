'use client';

import { motion } from 'framer-motion';
import { MessageSquare, Home, Search, Calendar } from 'lucide-react';
import Link from 'next/link';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-8 text-center"
    >
      <div className="mb-6 p-6 rounded-[28px] bg-primary/10 text-primary shadow-sm">
        {icon || <Search className="w-10 h-10" />}
      </div>
      <h3 className="text-xl font-semibold font-outfit mb-2">{title}</h3>
      <p className="text-muted-foreground max-w-sm mb-6">{description}</p>
      {action && (
        action.href ? (
          <Link
            href={action.href}
            className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:brightness-110 transition-all shadow-md"
          >
            {action.label}
          </Link>
        ) : (
          <button
            onClick={action.onClick}
            className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:brightness-110 transition-all shadow-md"
          >
            {action.label}
          </button>
        )
      )}
    </motion.div>
  );
}

export function ChatEmptyStateIllustration() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center h-full py-16 px-8 text-center"
    >
      <div className="relative mb-8">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#D4AF37] via-[#F5E096] to-[#C5A059] flex items-center justify-center shadow-lg float-shadow">
          <MessageSquare className="w-10 h-10 text-[#0A1128]" />
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/30 flex items-center justify-center">
          <Home className="w-4 h-4 text-[#D4AF37]" />
        </div>
      </div>
      <h2 className="text-2xl font-bold font-outfit mb-3">
        Start a Conversation
      </h2>
      <p className="text-muted-foreground max-w-md mb-2">
        Ask me anything about luxury properties in Dubai. I can help you find, compare, and book visits.
      </p>
    </motion.div>
  );
}

export function ErrorState({
  title = 'Something went wrong',
  description = 'An error occurred. Please try again.',
  onRetry,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-8 text-center"
    >
      <div className="mb-6 p-5 rounded-2xl bg-destructive/10 text-destructive">
        <Search className="w-10 h-10" />
      </div>
      <h3 className="text-xl font-semibold font-outfit mb-2">{title}</h3>
      <p className="text-muted-foreground max-w-sm mb-6">{description}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:brightness-110 transition-all shadow-md"
        >
          Try Again
        </button>
      )}
    </motion.div>
  );
}

export { Calendar };
