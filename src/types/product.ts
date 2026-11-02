export interface ProductVariant {
  colors?: string[];
  sizes?: string[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  images: string[];
  rating: number;
  reviewCount: number;
  stock: number;
  featured: boolean;
  bestseller: boolean;
  createdAt: string;
  variants?: {
    colors?: string[];
    sizes?: string[];
  };
  specifications?: Record<string, string>;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  itemCount: number;
}

