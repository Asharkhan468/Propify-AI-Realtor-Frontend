import { useQuery } from '@tanstack/react-query';
import { propertiesService } from '@/services/properties.service';
import { PropertyFilters } from '@/types/property.types';

export function useProperties(filters?: PropertyFilters) {
  return useQuery({
    queryKey: ['properties', filters],
    queryFn: () => propertiesService.getProperties(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useProperty(id: string) {
  return useQuery({
    queryKey: ['property', id],
    queryFn: () => propertiesService.getPropertyById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}
