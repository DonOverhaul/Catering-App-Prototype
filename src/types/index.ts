export type SpicyLevel = 'none' | 'mild' | 'medium' | 'hot' | 'extra-hot';

export type PriceUnit = 'per pax' | 'per meal' | 'per package';

export type CuisineType =
  | 'Malay'
  | 'Chinese'
  | 'Indian'
  | 'Western'
  | 'Mexican'
  | 'Japanese'
  | 'Korean'
  | 'Fusion'
  | 'Dessert'
  | 'Healthy';

export type EventType =
  | 'Wedding'
  | 'Birthday'
  | 'Corporate'
  | 'Family Gathering'
  | 'Meal Prep'
  | 'Office Lunch'
  | 'Sports / Gym'
  | 'Buffet'
  | 'Casual Dinner'
  | 'Snack / Dessert Event';

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
  priceRange: {
    min: number;
    max: number;
  };
  spicyLevel: SpicyLevel;
  imagePlaceholder: string; // emoji or colour code used as placeholder
  packages: Package[];
}

export type FilterState = {
  city: string | null;
  maxBudgetPerPax: number | null;
  minPax: number | null;
  dietaryTags: string[];
  cuisineTypes: CuisineType[];
  halalOnly: boolean;
  mealPrepOnly: boolean;
  spicyLevel: SpicyLevel | null;
  sortBy: 'rating' | 'price' | 'popularity';
};