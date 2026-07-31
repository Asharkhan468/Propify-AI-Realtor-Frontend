export type PropertyType =
  | 'house'
  | 'apartment'
  | 'villa'
  | 'office'
  | 'shop'
  | 'plot'
  | 'warehouse';

export type PropertyStatus = 'for_sale' | 'for_rent' | 'sold' | 'rented';

export type PropertyCondition = 'new' | 'good' | 'needs_renovation';

export interface PropertyAmenity {
  name: string;
  icon: string;
}

export interface PropertyAgent {
  id: string;
  name: string;
  phone: string;
  email: string;
  avatar: string;
  agency: string;
  properties: number;
  rating: number;
}

export interface NearbyPlace {
  name: string;
  type: 'school' | 'hospital' | 'park' | 'mall' | 'mosque';
  distance: string;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  type: PropertyType;
  status: PropertyStatus;
  condition: PropertyCondition;
  price: number;
  area: number;
  bedrooms: number;
  bathrooms: number;
  city: string;
  location: string;
  address: string;
  images: string[];
  amenities: string[];
  agent: PropertyAgent;
  nearbyPlaces: NearbyPlace[];
  featured: boolean;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PropertyFilters {
  search?: string;
  city?: string;
  location?: string;
  type?: PropertyType | '';
  status?: PropertyStatus | '';
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  minArea?: number;
  maxArea?: number;
  sortBy?: 'price_asc' | 'price_desc' | 'newest' | 'oldest' | 'area_asc' | 'area_desc';
  page?: number;
  limit?: number;
}

export interface PropertiesResponse {
  properties: Property[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
