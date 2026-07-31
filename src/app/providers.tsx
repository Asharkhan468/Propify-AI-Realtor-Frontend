'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/hooks/useTheme';
import { Toaster } from 'sonner';
import { useState } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000,
            retry: 2,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        {children}
        <Toaster
          position="top-right"
          richColors
          toastOptions={{
            style: {
              borderRadius: '12px',
              border: '1px solid hsl(var(--border))',
            },
          }}
        />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
