import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  if (price >= 1000000) {
    return `USD ${(price / 1000000).toFixed(1)}M`;
  } else if (price >= 1000) {
    return `USD ${(price / 1000).toFixed(0)}K`;
  }
  return `USD ${price.toLocaleString()}`;
}

export function formatArea(area: number): string {
  return `${area.toLocaleString()} sq ft`;
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-AE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatTime(time: string): string {
  return time;
}

export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'for_sale':
      return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
    case 'for_rent':
      return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20';
    case 'sold':
      return 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20';
    case 'rented':
      return 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20';
    default:
      return 'bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20';
  }
}

export function getStatusLabel(status: string): string {
  switch (status) {
    case 'for_sale': return 'For Sale';
    case 'for_rent': return 'For Rent';
    case 'sold': return 'Sold';
    case 'rented': return 'Rented';
    default: return status;
  }
}

export function getAppointmentStatusColor(status: string): string {
  switch (status) {
    case 'confirmed':
      return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400';
    case 'pending':
      return 'bg-amber-500/10 text-amber-600 dark:text-amber-400';
    case 'cancelled':
      return 'bg-red-500/10 text-red-600 dark:text-red-400';
    case 'completed':
      return 'bg-blue-500/10 text-blue-600 dark:text-blue-400';
    default:
      return 'bg-gray-500/10 text-gray-600 dark:text-gray-400';
  }
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return function (this: unknown, ...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}
