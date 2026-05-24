import type { Category, Product } from "@/features/catalog/schema";

export const mockCategories: Category[] = [
  {
    id: "cat_1",
    slug: "skincare",
    name: "Skincare",
    description: "Cleansers, serums, and creams crafted for everyday ritual.",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&q=80",
    productCount: 3,
  },
  {
    id: "cat_2",
    slug: "fragrance",
    name: "Fragrance",
    description: "Layered scents inspired by warm light and quiet moments.",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80",
    productCount: 2,
  },
  {
    id: "cat_3",
    slug: "accessories",
    name: "Accessories",
    description: "Considered objects to complete the ritual.",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80",
    productCount: 2,
  },
];

export const mockProducts: Product[] = [
  {
    id: "prod_1",
    slug: "ritual-cream-cleanser",
    name: "Ritual Cream Cleanser",
    description:
      "A weightless cream that lifts impurities while preserving the skin's natural balance.",
    priceCents: 4800,
    compareAtCents: 6000,
    currency: "USD",
    images: [
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=900&q=80",
      "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=900&q=80",
    ],
    categoryId: "cat_1",
    categorySlug: "skincare",
    inStock: true,
    rating: 4.7,
    reviewCount: 128,
  },
  {
    id: "prod_2",
    slug: "amber-glow-serum",
    name: "Amber Glow Serum",
    description: "A radiance-boosting blend of botanicals and vitamin C for a quiet luminosity.",
    priceCents: 7200,
    compareAtCents: null,
    currency: "USD",
    images: ["https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=900&q=80"],
    categoryId: "cat_1",
    categorySlug: "skincare",
    inStock: true,
    rating: 4.9,
    reviewCount: 312,
  },
  {
    id: "prod_3",
    slug: "velvet-night-balm",
    name: "Velvet Night Balm",
    description: "Rich overnight balm that wakes skin soft, plumped, and quietly luminous.",
    priceCents: 6800,
    compareAtCents: null,
    currency: "USD",
    images: ["https://images.unsplash.com/photo-1601612628452-9e99ced43524?w=900&q=80"],
    categoryId: "cat_1",
    categorySlug: "skincare",
    inStock: true,
    rating: 4.6,
    reviewCount: 87,
  },
  {
    id: "prod_4",
    slug: "warm-cedar-eau-de-parfum",
    name: "Warm Cedar Eau de Parfum",
    description: "Notes of cedarwood, amber, and white pepper — soft yet unmistakable.",
    priceCents: 11800,
    compareAtCents: null,
    currency: "USD",
    images: ["https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=900&q=80"],
    categoryId: "cat_2",
    categorySlug: "fragrance",
    inStock: true,
    rating: 4.8,
    reviewCount: 204,
  },
  {
    id: "prod_5",
    slug: "ivory-bloom-eau-de-toilette",
    name: "Ivory Bloom Eau de Toilette",
    description: "A softly powdered floral built on jasmine, peony, and warm musk.",
    priceCents: 9400,
    compareAtCents: 11000,
    currency: "USD",
    images: ["https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=900&q=80"],
    categoryId: "cat_2",
    categorySlug: "fragrance",
    inStock: false,
    rating: 4.5,
    reviewCount: 96,
  },
  {
    id: "prod_6",
    slug: "linen-travel-pouch",
    name: "Linen Travel Pouch",
    description: "Hand-stitched natural linen, lined for everyday carry.",
    priceCents: 3200,
    compareAtCents: null,
    currency: "USD",
    images: ["https://images.unsplash.com/photo-1591348278863-a8fb3887e2aa?w=900&q=80"],
    categoryId: "cat_3",
    categorySlug: "accessories",
    inStock: true,
    rating: 4.4,
    reviewCount: 41,
  },
  {
    id: "prod_7",
    slug: "porcelain-incense-holder",
    name: "Porcelain Incense Holder",
    description: "Slip-cast porcelain disk with a brushed gold inlay — a quiet object.",
    priceCents: 4400,
    compareAtCents: null,
    currency: "USD",
    images: ["https://images.unsplash.com/photo-1602928321679-560bb453f190?w=900&q=80"],
    categoryId: "cat_3",
    categorySlug: "accessories",
    inStock: true,
    rating: 4.6,
    reviewCount: 18,
  },
];

export function findProductBySlug(slug: string): Product | undefined {
  return mockProducts.find((p) => p.slug === slug);
}

export function findCategoryBySlug(slug: string): Category | undefined {
  return mockCategories.find((c) => c.slug === slug);
}

export function productsByCategory(categorySlug: string): Product[] {
  return mockProducts.filter((p) => p.categorySlug === categorySlug);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return mockProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.categorySlug.includes(q),
  );
}
