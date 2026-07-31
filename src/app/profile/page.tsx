'use client';

import Image from 'next/image';
import { useSavedStore } from '@/store/savedStore';
import { useAppointments } from '@/hooks/useAppointments';
import { useChatStore } from '@/store/chatStore';
import { useQuery } from '@tanstack/react-query';
import { usersService } from '@/services/users.service';
import { Heart, Calendar, MessageSquare, Settings, LogOut } from 'lucide-react';

export default function ProfilePage() {
  const { savedProperties } = useSavedStore();
  const { upcomingAppointments, pastAppointments } = useAppointments();
  const { sessions } = useChatStore();
  const { data: user, isLoading } = useQuery({
    queryKey: ['user', 'me'],
    queryFn: usersService.getCurrentUser,
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-background px-4 py-6 sm:px-6 lg:px-8">
        <div className="container mx-auto space-y-8">
          <div className="rounded-[36px] border border-border bg-card/80 p-6 glass shadow-sm">
            <div className="flex items-center gap-4">
              <div className="h-20 w-20 rounded-3xl bg-muted animate-pulse" />
              <div className="space-y-2">
                <div className="h-4 w-32 bg-muted animate-pulse rounded" />
                <div className="h-8 w-48 bg-muted animate-pulse rounded" />
                <div className="h-4 w-64 bg-muted animate-pulse rounded" />
              </div>
            </div>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-3xl border border-border bg-card p-6 shadow-sm flex items-center gap-4">
                <div className="h-16 w-16 rounded-3xl bg-muted animate-pulse" />
                <div className="space-y-2">
                  <div className="h-3 w-24 bg-muted animate-pulse rounded" />
                  <div className="h-8 w-12 bg-muted animate-pulse rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background px-4 py-6 sm:px-6 lg:px-8">
      <div className="container mx-auto space-y-8">
        <div className="rounded-[36px] border border-border bg-card/80 p-6 glass shadow-sm">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div className="relative h-20 w-20 rounded-3xl overflow-hidden bg-muted">
                {user && <Image src={user.avatar} alt={user.name} fill className="object-cover" />}
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Welcome back,</p>
                <h1 className="font-outfit text-4xl font-black">{user?.name ?? '—'}</h1>
                <p className="text-sm text-muted-foreground">{user?.email ?? ''}</p>
              </div>
            </div>
            <button className="inline-flex items-center gap-2 rounded-2xl border border-border px-5 py-3 text-sm font-medium hover:bg-accent transition-colors">
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {[
            { icon: Heart, title: 'Saved properties', value: savedProperties.length },
            { icon: Calendar, title: 'Appointments', value: upcomingAppointments.length + pastAppointments.length },
            { icon: MessageSquare, title: 'Chat history', value: sessions.length },
          ].map(({ icon: Icon, title, value }) => (
            <div key={title} className="rounded-3xl border border-border bg-card p-6 shadow-sm flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-primary/10 text-primary">
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{title}</p>
                <p className="font-outfit text-3xl font-black">{value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-primary/80 font-semibold">Profile</p>
                <h2 className="font-outfit text-2xl font-bold">Account summary</h2>
              </div>
              <Settings className="w-5 h-5 text-primary" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-border bg-background/90 p-5">
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="mt-2 font-semibold">{user?.city ?? '—'}</p>
              </div>
              <div className="rounded-3xl border border-border bg-background/90 p-5">
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="mt-2 font-semibold">{user?.phone ?? '—'}</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
            <h2 className="font-outfit text-2xl font-bold mb-4">Featured benefits</h2>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="rounded-3xl border border-border bg-background/90 p-4">Priority access to new luxury listings.</li>
              <li className="rounded-3xl border border-border bg-background/90 p-4">24/7 chat support with AI-assisted agent matching.</li>
              <li className="rounded-3xl border border-border bg-background/90 p-4">Secure booking and personalized property alerts.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
