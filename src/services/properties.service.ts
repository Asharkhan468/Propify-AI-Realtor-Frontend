import axiosInstance from '@/lib/axios';
import { Property, PropertyFilters, PropertiesResponse } from '@/types/property.types';

interface BackendProperty {
  id: number;
  title: string;
  description: string;
  property_type: string;
  status: string;
  price: number;
  area: number;
  bedrooms: number;
  bathrooms: number;
  location: string;
  image_url: string;
  created_at: string;
}

interface BackendPropertiesResponse {
  success: boolean;
  count: number;
  data: BackendProperty[];
}

const DEFAULT_PROPERTY_IMAGE =
  'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80';

const isValidImageUrl = (url?: string) =>
  !!url &&
  !url.includes('example.com') &&
  (url.startsWith('http://') || url.startsWith('https://'));

const mapBackendProperty = (p: BackendProperty): Property => ({
  id: String(p.id),
  title: p.title,
  description: p.description,
  type: p.property_type.toLowerCase() as Property['type'],
  status: p.status === 'Available' ? 'for_sale' : p.status.toLowerCase() as Property['status'],
  condition: 'good',
  price: p.price,
  area: p.area,
  bedrooms: p.bedrooms,
  bathrooms: p.bathrooms,
  city: p.location.split(',')[0]?.trim() || p.location,
  location: p.location,
  address: p.location,
  images: isValidImageUrl(p.image_url) ? [p.image_url] : [DEFAULT_PROPERTY_IMAGE],
  amenities: [],
  agent: {
    id: 'agent-1',
    name: 'Ancara Real Estate Specialist',
    phone: '+971-4-800-ANCARA',
    email: 'vip@ancararealestate.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    agency: 'Ancara Real Estate Consultancy',
    properties: 1,
    rating: 4.9,
  },
  nearbyPlaces: [],
  featured: false,
  verified: false,
  createdAt: p.created_at,
  updatedAt: p.created_at,
});

export const propertiesService = {
  getProperties: async (filters?: PropertyFilters): Promise<PropertiesResponse> => {
    const params: Record<string, string | number> = {};
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== '' && value !== null) {
          params[key] = value;
        }
      });
    }

    const response = await axiosInstance.get<BackendPropertiesResponse>('/properties/', {
      params,
    });

    const backendData = response.data.data ?? [];
    const page = filters?.page ?? 1;
    const limit = filters?.limit ?? backendData.length;
    const start = (page - 1) * limit;
    const paginated = backendData.slice(start, start + limit);

    return {
      properties: paginated.map(mapBackendProperty),
      total: response.data.count ?? backendData.length,
      page,
      limit,
      totalPages: Math.ceil((response.data.count ?? backendData.length) / limit) || 1,
    };
  },

  getPropertyById: async (id: string): Promise<Property> => {
    const response = await axiosInstance.get<{ success: boolean; data: BackendProperty }>(`/properties/${id}/`);
    return mapBackendProperty(response.data.data);
  },

  createProperty: async (data: Partial<Property>): Promise<Property> => {
    const response = await axiosInstance.post<Property>('/properties/', data);
    return response.data;
  },

  searchProperties: async (filters?: {
    location?: string;
    property_type?: string;
    min_price?: number;
    max_price?: number;
    bedrooms?: number;
  }): Promise<Property[]> => {
    const params: Record<string, string | number> = {};
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== '' && value !== null) {
          params[key] = value;
        }
      });
    }

    const response = await axiosInstance.get<BackendPropertiesResponse>('/properties/search/filter', {
      params,
    });

    return (response.data.data ?? []).map(mapBackendProperty);
  },
};
