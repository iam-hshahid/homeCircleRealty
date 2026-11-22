export interface Property {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  developer: string;
  type: 'Villa' | 'Villament' | 'Apartment' | 'Penthouse' | 'Plot' | 'Commercial';
  price: string; // formatted e.g. "₹8.75 Cr"
  numericPrice: number; // in INR for filtering e.g. 87500000
  pricePerSqFt?: string;
  location: string; // e.g. "IVC Road, North Bengaluru"
  area: string; // micro-market e.g. "Yelahanka / IVC Road"
  city: string;
  pincode: string;
  bedrooms: number; // 0 for plots
  bathrooms: number;
  balconies: number;
  superBuiltUpArea: number; // in sq ft
  carpetArea?: number; // in sq ft
  furnishing: 'Unfurnished' | 'Semi-Furnished' | 'Fully Furnished';
  facing: 'East' | 'North' | 'North-East' | 'West' | 'South';
  possessionStatus: 'Ready to Move' | 'Under Construction' | 'New Launch' | 'Resale';
  possessionDate?: string;
  reraNumber?: string;
  youtubeId?: string; // YouTube video ID (e.g. "dQw4w9WgXcQ")
  youtubeUrl?: string; // Full YouTube video or channel walkthrough URL
  featured: boolean;
  images: string[];
  description: string;
  highlights: string[];
  amenities: string[];
  floorPlanUrl?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface Inquiry {
  id: string;
  propertyId?: string;
  propertyTitle?: string;
  name: string;
  email: string;
  phone: string;
  inquiryType: 'Site Visit' | 'Price Inquiry' | 'General' | 'Video Walkthrough Request';
  preferredDate?: string;
  budget?: string;
  message: string;
  status: 'New' | 'Contacted' | 'Visit Scheduled' | 'Closed';
  createdAt: string;
}
