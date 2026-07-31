export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://propify-ai-chabot-backend.onrender.com';

export const PROPERTY_TYPES = [
  { value: 'house', label: 'House' },
  { value: 'apartment', label: 'Apartment' },
  { value: 'villa', label: 'Villa' },
  { value: 'office', label: 'Office' },
  { value: 'shop', label: 'Shop' },
  { value: 'plot', label: 'Plot' },
  { value: 'warehouse', label: 'Warehouse' },
] as const;

export const PROPERTY_STATUSES = [
  { value: 'for_sale', label: 'For Sale' },
  { value: 'for_rent', label: 'For Rent' },
  { value: 'sold', label: 'Sold' },
  { value: 'rented', label: 'Rented' },
] as const;

export const CITIES = [
  'Dubai Marina',
  'Downtown Dubai',
  'Palm Jumeirah',
  'Armani Hotel',
  'Bluewaters Island',
  'Jumeirah Lake Towers',
  'Business Bay',
  'Dubailand',
];

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'area_asc', label: 'Area: Small to Large' },
  { value: 'area_desc', label: 'Area: Large to Small' },
] as const;

export const BEDROOM_OPTIONS = [1, 2, 3, 4, 5, 6];
export const BATHROOM_OPTIONS = [1, 2, 3, 4, 5];

export const PRICE_RANGE = {
  min: 0,
  max: 500000000,
  step: 1000000,
};

export const APPOINTMENT_TIMES = [
  '09:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '01:00 PM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM',
  '05:00 PM',
];

export const SUGGESTED_PROMPTS = [
  { text: 'Find me a luxury villa in Dubai Marina', icon: '🏰' },
  { text: '2 bedroom apartment under AED 2M', icon: '🏢' },
  { text: 'Villa with private pool in Palm Jumeirah', icon: '🏊' },
  { text: 'Penthouse with Burj Khalifa view in Downtown', icon: '🗼' },
  { text: 'Waterfront property under AED 5M', icon: '💰' },
  { text: 'Luxury villa above AED 10M', icon: '✨' },
];

export const AMENITIES = [
  'Swimming Pool',
  'Gym',
  'Parking',
  'Security',
  'Generator',
  'Garden',
  'Balcony',
  'Elevator',
  'Central A/C',
  'Solar Panels',
  'Water Tank',
  'Internet',
  'Servant Quarter',
  'Store Room',
];

export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/properties', label: 'Properties' },
  { href: '/chat', label: 'AI Chat' },
  { href: '/appointments', label: 'Appointments' },
];
