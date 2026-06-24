export type SpicyLevel = 'none' | 'mild' | 'medium' | 'hot' | 'extra-hot';
export type PriceUnit = 'per pax' | 'per meal' | 'per package';
export type CuisineType = 'Malay' | 'Chinese' | 'Indian' | 'Western' | 'Mexican' | 'Japanese' | 'Healthy' | 'Dessert' | 'Fusion';
export type EventType = 'Wedding' | 'Birthday' | 'Corporate' | 'Family Gathering' | 'Meal Prep' | 'Office Lunch' | 'Sports / Gym' | 'Buffet' | 'Casual Dinner' | 'Snack / Dessert Event';

export interface Package {
  id: string;
  vendorId: string;
  name: string;
  description: string;
  price: number;
  priceUnit: PriceUnit;
  minPax: number;
  tags: string[];
  menuItems: string[];
  suitableFor: EventType[];
}

export interface Vendor {
  id: string;
  name: string;
  description: string;
  city: string;
  deliveryAreas: string[];
  rating: number;
  reviewCount: number;
  tags: string[];
  cuisineTypes: CuisineType[];
  isHalalFriendly: boolean;
  minOrderPax: number;
  priceRange: { min: number; max: number };
  spicyLevel: SpicyLevel;
  imagePlaceholder: string;
  packages: Package[];
}