'use client';

import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({ currentPage, totalPages, onPageChange, className }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const visiblePages = pages.filter(
    (p) => p === 1 || p === totalPages || (p >= currentPage - 1 && p <= currentPage + 1)
  );

  return (
    <div className={cn('flex items-center justify-center gap-1', className)}>
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-9 h-9 flex items-center justify-center rounded-xl border border-border bg-card hover:bg-accent disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        aria-label="Previous page"
      >
        <ChevronLeft className="w-4 h-4" />
      </motion.button>

      {visiblePages.map((page, i) => {
        const prevPage = visiblePages[i - 1];
        const showEllipsis = prevPage && page - prevPage > 1;
        return (
          <div key={page} className="flex items-center gap-1">
            {showEllipsis && (
              <span className="px-2 text-muted-foreground text-sm">...</span>
            )}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => onPageChange(page)}
              className={cn(
                'w-9 h-9 flex items-center justify-center rounded-xl text-sm font-medium transition-colors',
                page === currentPage
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'border border-border bg-card hover:bg-accent'
              )}
              aria-label={`Page ${page}`}
              aria-current={page === currentPage ? 'page' : undefined}
            >
              {page}
            </motion.button>
          </div>
        );
      })}

      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-9 h-9 flex items-center justify-center rounded-xl border border-border bg-card hover:bg-accent disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        aria-label="Next page"
      >
        <ChevronRight className="w-4 h-4" />
      </motion.button>
    </div>
  );
}
