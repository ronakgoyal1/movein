import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag, Check } from "lucide-react";
import { useBuilderStore } from "@/store/useBuilderStore";
import { cn } from "@/lib/utils";
import { Button } from "../ui/Button";

export function ProductDrawer() {
  const { activeProduct, setActiveProduct, addToCart, removeFromCart, getCartProduct } = useBuilderStore();
  const [selectedVariant, setSelectedVariant] = useState<string | undefined>();
  const [quantity, setQuantity] = useState(1);

  const inCart = activeProduct ? getCartProduct(activeProduct.id) : undefined;

  // Reset state when product changes
  useEffect(() => {
    if (activeProduct) {
      if (inCart) {
        setSelectedVariant(inCart.variantId);
        setQuantity(inCart.quantity);
      } else {
        setSelectedVariant(activeProduct.variants?.[0]?.id);
        setQuantity(1);
      }
    }
  }, [activeProduct?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!activeProduct) return null;

  const product = activeProduct;
  const hasVariants = product.variants && product.variants.length > 0;
  const currentVariant = hasVariants
    ? product.variants!.find((v) => v.id === selectedVariant)
    : null;
  const unitPrice = product.price + (currentVariant?.priceDiff ?? 0);
  const totalPrice = unitPrice * quantity;

  const handleAddOrUpdate = () => {
    addToCart(product.id, selectedVariant, quantity);
    setActiveProduct(null);
  };

  const handleRemove = () => {
    removeFromCart(product.id);
    setActiveProduct(null);
  };

  return (
    <AnimatePresence>
      {activeProduct && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setActiveProduct(null)}
            className="fixed inset-0 z-[110] bg-black/40 backdrop-blur-[2px]"
          />

          {/* Desktop: Right drawer | Mobile: Bottom sheet */}
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="fixed z-[120] bg-surface shadow-2xl flex flex-col
              bottom-0 left-0 right-0 max-h-[85svh] rounded-t-2xl
              md:top-0 md:bottom-0 md:left-auto md:right-0 md:w-[420px] md:max-h-full md:rounded-none"
          >
            {/* Mobile handle */}
            <div className="w-full flex justify-center py-3 md:hidden shrink-0">
              <div className="w-8 h-1 rounded-full bg-border" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-5 pb-4 md:pt-6 md:px-6 shrink-0">
              <h3 className="font-serif text-lg font-medium text-primary">{product.name}</h3>
              <button
                onClick={() => setActiveProduct(null)}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-border text-secondary hover:text-primary hover:border-primary transition-colors"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto px-5 md:px-6 pb-6">
              {/* Image */}
              {product.imageUrl ? (
                <div className="aspect-[4/3] rounded-lg overflow-hidden bg-bg mb-5">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className="aspect-[4/3] rounded-lg bg-bg flex items-center justify-center mb-5">
                  <ShoppingBag size={40} className="text-border" />
                </div>
              )}

              {/* Recommended badge */}
              {product.recommended && (
                <div className="inline-flex items-center gap-1.5 bg-highlight/10 text-highlight border border-highlight/20 rounded-md px-3 py-1.5 text-[0.75rem] font-semibold mb-4">
                  ★ {product.recommended}
                </div>
              )}

              {/* Description */}
              <p className="text-[0.9375rem] text-secondary leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Variants */}
              {hasVariants && (
                <div className="mb-6">
                  <h4 className="text-[0.8125rem] font-semibold text-primary uppercase tracking-wider mb-3">
                    Choose variant
                  </h4>
                  <div className="flex flex-col gap-2">
                    {product.variants!.map((variant) => {
                      const isSelected = selectedVariant === variant.id;
                      const variantPrice = product.price + variant.priceDiff;
                      return (
                        <button
                          key={variant.id}
                          onClick={() => setSelectedVariant(variant.id)}
                          className={cn(
                            "flex items-center justify-between p-3.5 rounded-lg border-[1.5px] transition-all text-left focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent outline-none",
                            isSelected
                              ? "border-accent bg-accent/5"
                              : "border-border hover:border-accent/40"
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={cn(
                                "w-4.5 h-4.5 rounded-full border-[1.5px] flex items-center justify-center shrink-0 transition-colors",
                                isSelected ? "border-accent bg-accent" : "border-border"
                              )}
                            >
                              {isSelected && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                            </div>
                            <span className="font-medium text-[0.9375rem]">{variant.label}</span>
                          </div>
                          <span className="text-[0.9375rem] font-semibold">
                            ₹{variantPrice.toLocaleString("en-IN")}
                            {variant.priceDiff > 0 && (
                              <span className="text-[0.75rem] font-normal text-secondary ml-1.5">
                                +₹{variant.priceDiff}
                              </span>
                            )}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Quantity */}
              {product.allowQuantity && (
                <div className="mb-6">
                  <h4 className="text-[0.8125rem] font-semibold text-primary uppercase tracking-wider mb-3">
                    Quantity
                  </h4>
                  <div className="flex items-center gap-0 border border-border rounded-lg overflow-hidden w-fit">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-11 h-11 flex items-center justify-center bg-bg hover:bg-border/50 transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-12 h-11 flex items-center justify-center text-[1rem] font-semibold bg-surface border-x border-border">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-11 h-11 flex items-center justify-center bg-bg hover:bg-border/50 transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-5 py-4 md:px-6 border-t border-border bg-surface shrink-0">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[0.875rem] text-secondary">
                  {quantity > 1 ? `${quantity} × ₹${unitPrice.toLocaleString("en-IN")}` : "Total"}
                </span>
                <span className="font-serif text-xl font-semibold text-primary">
                  ₹{totalPrice.toLocaleString("en-IN")}
                </span>
              </div>

              <div className="flex gap-2">
                {inCart && (
                  <button
                    onClick={handleRemove}
                    className="px-4 py-3 text-[0.8125rem] font-medium text-red-500 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    Remove
                  </button>
                )}
                <Button
                  variant="dark"
                  size="md"
                  className="flex-1 !rounded-lg"
                  onClick={handleAddOrUpdate}
                >
                  {inCart ? (
                    <>
                      <Check size={16} /> Update Cart
                    </>
                  ) : (
                    <>
                      <Plus size={16} /> Add to Cart
                    </>
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
