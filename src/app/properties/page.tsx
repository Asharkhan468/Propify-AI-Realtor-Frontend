"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Grid, List, ChevronDown, AlertCircle } from "lucide-react";
import { useProperties } from "@/hooks/useProperties";
import { PropertyCard } from "@/components/properties/PropertyCard";
import { PropertyFilters } from "@/types/property.types";
import {
  CITIES,
  PROPERTY_TYPES,
  BEDROOM_OPTIONS,
  BATHROOM_OPTIONS,
  SORT_OPTIONS,
} from "@/lib/constants";
import { useUIStore } from "@/store/uiStore";
import { Pagination } from "@/components/common/Pagination";
import { EmptyState } from "@/components/common/EmptyState";

export default function PropertiesPage() {
  const [filters, setFilters] = useState<PropertyFilters>({
    page: 1,
    limit: 9,
  });
  const { data, isLoading, error } = useProperties(filters);
  const { propertyView, setPropertyView } = useUIStore();

  const properties = data?.properties ?? [];

  const handleFilterChange = (
    key: keyof PropertyFilters,
    value: string | number | undefined,
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: 1,
    }));
  };

  const gridClass =
    propertyView === "grid"
      ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
      : "grid-cols-1";
  const selectClass =
    "w-full appearance-none rounded-2xl border border-border bg-background/90 py-3 pl-3 pr-10 text-sm outline-none transition-all duration-200 focus:border-primary/50 focus:ring-2 focus:ring-primary/20";

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background px-4 py-6 sm:px-6 lg:px-8">
      <div className="container mx-auto space-y-6">
        <div className="rounded-[36px] border border-border bg-card/80 p-6 glass shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-primary/80 font-semibold mb-2">
                Property Marketplace
              </p>
              <h1 className="font-outfit text-3xl md:text-4xl font-black leading-tight">
                Discover premium listings across Pakistan.
              </h1>
            </div>
          </div>

          <div className="mt-6 grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-3xl border border-border bg-background/80 p-5 shadow-sm">
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                <label className="space-y-2 text-sm text-muted-foreground">
                  Search
                  <div className="relative">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      value={filters.search ?? ""}
                      onChange={(e) =>
                        handleFilterChange("search", e.target.value)
                      }
                      className="w-full rounded-2xl border border-border bg-background/90 py-3 pl-10 pr-3 text-sm outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20"
                      placeholder="Search by city, type, or location"
                    />
                  </div>
                </label>

                <label className="space-y-2 text-sm text-muted-foreground">
                  City
                  <div className="relative">
                    <select
                      value={filters.city ?? ""}
                      onChange={(e) =>
                        handleFilterChange("city", e.target.value || undefined)
                      }
                      className={selectClass}
                    >
                      <option value="">All cities</option>

                      {CITIES.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>

                    <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  </div>
                </label>

                <label className="space-y-2 text-sm text-muted-foreground">
                  Property Type
                  <div className="relative">
                    <select
                      value={filters.type ?? ""}
                      onChange={(e) =>
                        handleFilterChange("type", e.target.value || undefined)
                      }
                      className={selectClass}
                    >
                      <option value="">All types</option>

                      {PROPERTY_TYPES.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>

                    <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  </div>
                </label>

                <label className="space-y-2 text-sm text-muted-foreground">
                  Bedrooms
                  <div className="relative">
                    <select
                      value={filters.bedrooms ?? ""}
                      onChange={(e) =>
                        handleFilterChange(
                          "bedrooms",
                          e.target.value ? Number(e.target.value) : undefined,
                        )
                      }
                      className={selectClass}
                    >
                      <option value="">Any</option>

                      {BEDROOM_OPTIONS.map((bed) => (
                        <option key={bed} value={bed}>
                          {bed}+ Beds
                        </option>
                      ))}
                    </select>

                    <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  </div>
                </label>

                <label className="space-y-2 text-sm text-muted-foreground">
                  Bathrooms
                  <div className="relative">
                    <select
                      value={filters.bathrooms ?? ""}
                      onChange={(e) =>
                        handleFilterChange(
                          "bathrooms",
                          e.target.value ? Number(e.target.value) : undefined,
                        )
                      }
                      className={selectClass}
                    >
                      <option value="">Any</option>

                      {BATHROOM_OPTIONS.map((bath) => (
                        <option key={bath} value={bath}>
                          {bath}+ Baths
                        </option>
                      ))}
                    </select>

                    <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  </div>
                </label>

                <label className="space-y-2 text-sm text-muted-foreground">
                  Sort by
                  <div className="relative">
                    <select
                      value={filters.sortBy ?? ""}
                      onChange={(e) =>
                        handleFilterChange(
                          "sortBy",
                          e.target.value || undefined,
                        )
                      }
                      className={selectClass}
                    >
                      <option value="">Newest</option>

                      {SORT_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>

                    <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  </div>
                </label>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-card/80 p-5 shadow-sm glass">
              <h2 className="font-outfit font-bold text-xl mb-4">
                Quick filters
              </h2>
              <div className="space-y-3">
                <button
                  onClick={() =>
                    setFilters({ page: 1, limit: 9, status: "for_sale" })
                  }
                  className="w-full rounded-2xl border border-border px-4 py-3 text-left text-sm font-medium hover:bg-accent transition-colors"
                >
                  For Sale Properties
                </button>
                <button
                  onClick={() =>
                    setFilters({ page: 1, limit: 9, status: "for_rent" })
                  }
                  className="w-full rounded-2xl border border-border px-4 py-3 text-left text-sm font-medium hover:bg-accent transition-colors"
                >
                  For Rent Properties
                </button>
                <button
                  onClick={() =>
                    setFilters({
                      page: 1,
                      limit: 9,
                      minPrice: 10000000,
                      sortBy: "price_desc",
                    })
                  }
                  className="w-full rounded-2xl border border-border px-4 py-3 text-left text-sm font-medium hover:bg-accent transition-colors"
                >
                  Luxury listings
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground">
                Showing {properties.length} properties
              </p>
              <h2 className="font-outfit text-2xl font-black">
                Latest listings
              </h2>
            </div>
          </div>

          {isLoading ? (
            <div className="space-y-4 py-16">
              {Array.from({ length: 3 }).map((_, idx) => (
                <div
                  key={idx}
                  className="rounded-3xl border border-border bg-card p-6 shadow-sm"
                >
                  <div className="h-72 rounded-3xl bg-muted animate-pulse" />
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="rounded-3xl border border-destructive/30 bg-destructive/5 p-8 text-center">
              <AlertCircle className="w-10 h-10 text-destructive mx-auto mb-3" />
              <h3 className="font-outfit font-bold text-lg mb-1">Failed to load properties</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {(error as Error).message || 'Please check your connection and try again.'}
              </p>
              <button
                onClick={() => setFilters({ page: 1, limit: 9 })}
                className="inline-flex items-center gap-2 rounded-2xl bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold hover:bg-primary/90 transition-colors"
              >
                Retry
              </button>
            </div>
          ) : properties.length === 0 ? (
            <EmptyState
              title="No properties found"
              description="Try adjusting your filters or search query to discover more listings."
              action={{
                label: "Reset search",
                onClick: () => setFilters({ page: 1, limit: 9 }),
              }}
            />
          ) : (
            <div className={`grid gap-6 ${gridClass}`}>
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}

          <Pagination
            currentPage={data?.page ?? 1}
            totalPages={data?.totalPages ?? 1}
            onPageChange={(page) => setFilters((prev) => ({ ...prev, page }))}
          />
        </div>
      </div>
    </div>
  );
}
