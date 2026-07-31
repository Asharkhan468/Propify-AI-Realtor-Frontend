'use client';

import { useMemo } from 'react';
import { useSavedStore } from '@/store/savedStore';
import { PropertyCard } from '@/components/properties/PropertyCard';
import { EmptyState } from '@/components/common/EmptyState';

export default function SavedPage() {
  const { savedProperties, removeAll } = useSavedStore();

  const content = useMemo(() => {
    if (savedProperties.length === 0) {
      return (
        <EmptyState
          title="Your wishlist is empty"
          description="Save properties while browsing to build your personal shortlist."
          action={{ label: 'Browse properties', href: '/properties' }}
        />
      );
    }

    return (
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Saved properties</p>
            <h1 className="font-outfit text-3xl font-black">Your shortlist</h1>
          </div>
          <button
            onClick={removeAll}
            className="rounded-2xl border border-border px-4 py-3 text-sm font-medium hover:bg-accent transition-colors"
          >
            Clear wishlist
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {savedProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    );
  }, [savedProperties, removeAll]);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background px-4 py-6 sm:px-6 lg:px-8">
      <div className="container mx-auto">{content}</div>
    </div>
  );
}
