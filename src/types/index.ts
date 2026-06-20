export type College = {
  id: string;
  name: string;
  shortName: string;
  description: string;
};

export type ProductVariant = {
  id: string;
  label: string;
  priceDiff: number; // +/- from base price
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number; // absolute base price in ₹
  categoryId: string;
  imageUrl?: string;
  recommended?: string; // e.g. "Most popular at IIITA"
  allowQuantity?: boolean; // if true, user can add multiples
  variants?: ProductVariant[];
};

export type Category = {
  id: string;
  name: string;
  icon: string;
  description: string;
};

export type CartItem = {
  productId: string;
  variantId?: string;
  quantity: number;
};

export type Testimonial = {
  quote: string;
  name: string;
  college: string;
  batch: string;
  avatar: string;
};

export type FAQ = {
  question: string;
  answer: string;
};
