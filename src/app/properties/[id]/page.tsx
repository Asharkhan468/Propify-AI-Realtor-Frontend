'use client';

import { notFound } from 'next/navigation';
import Image from 'next/image';
import { useProperty } from '@/hooks/useProperties';
import { useParams } from 'next/navigation';
import { formatPrice, formatArea, getStatusLabel, getStatusColor } from '@/lib/utils';
import { Calendar, MapPin, Bed, Bath, Sparkles, Shield, Phone, MessageSquare, AlertCircle } from 'lucide-react';
import { PropertyCard } from '@/components/properties/PropertyCard';
import { EmptyState } from '@/components/common/EmptyState';
import Link from 'next/link';

export default function PropertyDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const { data: property, isLoading, error } = useProperty(id);

  if (!property && !isLoading && !error) {
    notFound();
  }

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-background px-4 py-6">
        <div className="rounded-3xl border border-border bg-card p-10 shadow-sm animate-pulse w-full max-w-5xl" />
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-background px-4 py-6">
        <div className="rounded-3xl border border-destructive/30 bg-destructive/5 p-8 text-center max-w-md">
          <AlertCircle className="w-10 h-10 text-destructive mx-auto mb-3" />
          <h2 className="font-outfit font-bold text-xl mb-2">Property not found</h2>
          <p className="text-sm text-muted-foreground">
            {(error as Error)?.message || 'The property you are looking for does not exist or has been removed.'}
          </p>
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 mt-4 rounded-2xl bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold hover:bg-primary/90 transition-colors"
          >
            Browse Properties
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background px-4 py-6 sm:px-6 lg:px-8">
      <div className="container mx-auto space-y-8">
        <div className="rounded-[36px] border border-border bg-card/90 p-6 glass shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-primary/80 font-semibold mb-2">
                Property Details
              </p>
              <h1 className="font-outfit text-3xl md:text-4xl font-black leading-tight">
                {property.title}
              </h1>
              <p className="mt-3 text-sm md:text-base text-muted-foreground">
                {property.location}, {property.city}
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <span className={
                `inline-flex items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-semibold ${getStatusColor(property.status)}`
              }>
                <Sparkles className="w-4 h-4" /> {getStatusLabel(property.status)}
              </span>
              <span className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border bg-background/80 px-4 py-3 text-sm font-semibold text-muted-foreground">
                <Shield className="w-4 h-4" /> Verified listing
              </span>
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
          <div className="space-y-6">
            <div className="overflow-hidden rounded-[36px] border border-border bg-card shadow-sm">
              <div className="relative min-h-[420px] h-full bg-muted">
                <Image src={property.images[0]} alt={property.title} fill className="object-cover" />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {property.images.slice(1, 5).map((src, index) => (
                <div key={index} className="relative h-48 overflow-hidden rounded-3xl border border-border bg-muted">
                  <Image src={src} alt={`${property.title} ${index + 2}`} fill className="object-cover" />
                </div>
              ))}
            </div>

            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <h2 className="font-outfit text-2xl font-bold mb-4">Property overview</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">Price</p>
                  <p className="text-xl font-semibold">{formatPrice(property.price)}{property.status === 'for_rent' ? ' / month' : ''}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">Area</p>
                  <p className="text-xl font-semibold">{formatArea(property.area)}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">Bedrooms</p>
                  <p className="text-xl font-semibold">{property.bedrooms}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">Bathrooms</p>
                  <p className="text-xl font-semibold">{property.bathrooms}</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <h2 className="font-outfit text-2xl font-bold mb-4">Description</h2>
              <p className="text-muted-foreground leading-relaxed">{property.description}</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                <h3 className="font-semibold mb-4">Amenities</h3>
                <div className="grid grid-cols-2 gap-3 text-sm text-muted-foreground">
                  {property.amenities.map((amenity) => (
                    <span key={amenity} className="rounded-2xl border border-border bg-background/90 px-3 py-2">{amenity}</span>
                  ))}
                </div>
              </div>
              <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                <h3 className="font-semibold mb-4">Nearby</h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  {property.nearbyPlaces.map((place) => (
                    <div key={place.name} className="rounded-2xl border border-border bg-background/90 p-4">
                      <div className="font-medium">{place.name}</div>
                      <div className="text-xs text-muted-foreground">{place.type} · {place.distance}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <h2 className="font-outfit text-2xl font-bold mb-4">Location</h2>
              <div className="rounded-3xl border border-border bg-muted/80 h-72 flex items-center justify-center text-muted-foreground">
                <MapPin className="w-6 h-6" />
                <span className="ml-2">Map placeholder for {property.location}</span>
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <h2 className="font-outfit text-2xl font-bold mb-4">Agent details</h2>
              <div className="flex items-center gap-4 mb-6">
                <div className="relative h-16 w-16 rounded-3xl overflow-hidden bg-muted">
                  <Image src={property.agent.avatar} alt={property.agent.name} fill className="object-cover" />
                </div>
                <div>
                  <p className="font-semibold">{property.agent.name}</p>
                  <p className="text-sm text-muted-foreground">{property.agent.agency}</p>
                </div>
              </div>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-primary" />
                  <span>{property.agent.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-primary" />
                  <span>{property.agent.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-primary font-semibold">{property.agent.properties}</span>
                  <span className="text-muted-foreground">properties listed</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-primary font-semibold">{property.agent.rating}</span>
                  <span className="text-muted-foreground">Agent rating</span>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <h2 className="font-outfit text-2xl font-bold mb-4">Quick actions</h2>
              <div className="space-y-3">
                <Link
                  href="/chat"
                  className="flex items-center justify-center gap-2 rounded-2xl bg-primary text-primary-foreground px-4 py-3 text-sm font-semibold hover:bg-primary/90 transition-colors"
                >
                  Ask AI about this property
                </Link>
                <button
                  className="w-full rounded-2xl border border-border px-4 py-3 text-sm font-medium hover:bg-accent transition-colors"
                >
                  Schedule visit
                </button>
                <button
                  className="w-full rounded-2xl border border-border px-4 py-3 text-sm font-medium hover:bg-accent transition-colors"
                >
                  Contact agent
                </button>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <h2 className="font-outfit text-2xl font-bold mb-4">Similar properties</h2>
              <PropertyCard property={property} variant="compact" />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
