import { create } from "zustand";
import { products, MINIMUM_ORDER_VALUE } from "../data";
import type { CartItem, Product } from "../types";

export type BuilderStep = "college" | "browse" | "review" | "checkout";

interface BuilderState {
  isOpen: boolean;
  step: BuilderStep;
  collegeId: string | null;
  cart: CartItem[];
  activeProduct: Product | null; // product open in the drawer

  // Actions
  setOpen: (open: boolean) => void;
  setStep: (step: BuilderStep) => void;
  setCollege: (id: string) => void;
  setActiveProduct: (product: Product | null) => void;

  // Cart actions
  addToCart: (productId: string, variantId?: string, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  updateVariant: (productId: string, variantId: string) => void;
  clearCart: () => void;

  // Computed
  getTotal: () => number;
  getItemCount: () => number;
  meetsMinimum: () => boolean;
  getItemPrice: (item: CartItem) => number;
  getCartProduct: (productId: string) => CartItem | undefined;
  getCategoryCompletion: () => Record<string, boolean>;
  getReadinessPercent: () => number;
}

export const useBuilderStore = create<BuilderState>((set, get) => ({
  isOpen: false,
  step: "college",
  collegeId: null,
  cart: [],
  activeProduct: null,

  setOpen: (open) =>
    set({
      isOpen: open,
      step: open ? get().step : "college",
      activeProduct: null,
    }),

  setStep: (step) => set({ step, activeProduct: null }),

  setCollege: (id) => set({ collegeId: id }),

  setActiveProduct: (product) => set({ activeProduct: product }),

  addToCart: (productId, variantId, quantity = 1) => {
    const { cart } = get();
    const existing = cart.find((i) => i.productId === productId);
    if (existing) {
      // Update variant or increment quantity
      set({
        cart: cart.map((i) =>
          i.productId === productId
            ? {
                ...i,
                variantId: variantId ?? i.variantId,
                quantity: quantity,
              }
            : i
        ),
      });
    } else {
      set({
        cart: [...cart, { productId, variantId, quantity }],
      });
    }
  },

  removeFromCart: (productId) => {
    set({ cart: get().cart.filter((i) => i.productId !== productId) });
  },

  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeFromCart(productId);
      return;
    }
    set({
      cart: get().cart.map((i) =>
        i.productId === productId ? { ...i, quantity } : i
      ),
    });
  },

  updateVariant: (productId, variantId) => {
    set({
      cart: get().cart.map((i) =>
        i.productId === productId ? { ...i, variantId } : i
      ),
    });
  },

  clearCart: () => set({ cart: [] }),

  getItemPrice: (item) => {
    const prod = products.find((p) => p.id === item.productId);
    if (!prod) return 0;
    let unitPrice = prod.price;
    if (item.variantId && prod.variants) {
      const variant = prod.variants.find((v) => v.id === item.variantId);
      if (variant) unitPrice += variant.priceDiff;
    }
    return unitPrice * item.quantity;
  },

  getTotal: () => {
    const { cart, getItemPrice } = get();
    return cart.reduce((sum, item) => sum + getItemPrice(item), 0);
  },

  getItemCount: () => {
    return get().cart.reduce((sum, item) => sum + item.quantity, 0);
  },

  meetsMinimum: () => {
    return get().getTotal() >= MINIMUM_ORDER_VALUE;
  },

  getCartProduct: (productId) => {
    return get().cart.find((i) => i.productId === productId);
  },

  getCategoryCompletion: () => {
    const { cart } = get();
    const cartProductIds = new Set(cart.map((i) => i.productId));
    const completion: Record<string, boolean> = {};
    const categoryIds = [
      "sleep",
      "bathroom",
      "study",
      "storage",
      "weather",
    ];
    categoryIds.forEach((catId) => {
      const catProducts = products.filter((p) => p.categoryId === catId);
      completion[catId] = catProducts.some((p) => cartProductIds.has(p.id));
    });
    return completion;
  },

  getReadinessPercent: () => {
    const completion = get().getCategoryCompletion();
    const total = Object.keys(completion).length;
    const filled = Object.values(completion).filter(Boolean).length;
    return Math.round((filled / total) * 100);
  },
}));
