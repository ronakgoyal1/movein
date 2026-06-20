import { useState } from "react";
import { motion } from "framer-motion";
import { useBuilderStore } from "@/store/useBuilderStore";
import { categories, products } from "@/data";
import { cn } from "@/lib/utils";
import { Check, Plus, ShoppingBag, Minus } from "lucide-react";
import * as Icons from "lucide-react";

export function BrowseStep() {
  const [activeCat, setActiveCat] = useState(categories[0].id);
  const { addToCart, removeFromCart, getCartProduct, getCategoryCompletion, getReadinessPercent, setActiveProduct } = useBuilderStore();
  
  const completion = getCategoryCompletion();
  const readiness = getReadinessPercent();
  const catProducts = products.filter((p) => p.categoryId === activeCat);

  return (
    <div className="pb-4 px-4 md:px-0">
      {/* Readiness indicator */}
      <div className="mb-6 p-4 bg-surface border border-border rounded-lg">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[0.8125rem] font-medium text-primary">Move-in readiness</span>
          <span className="text-[0.875rem] font-semibold text-accent">{readiness}%</span>
        </div>
        <div className="w-full h-1.5 bg-border rounded-full overflow-hidden mb-3">
          <motion.div
            className="h-full bg-accent rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${readiness}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1.5">
          {categories.map((cat) => (
            <div key={cat.id} className="flex items-center gap-1.5 text-[0.75rem]">
              {completion[cat.id] ? (
                <Check size={12} className="text-accent" strokeWidth={3} />
              ) : (
                <div className="w-3 h-3 rounded-full border border-border" />
              )}
              <span className={completion[cat.id] ? "text-primary font-medium" : "text-secondary"}>
                {cat.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Category tabs */}
      <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-4 -mx-1 px-1">
        {categories.map((cat) => {
          const IconComponent = (Icons as any)[cat.icon] || Icons.Box;
          const isActive = activeCat === cat.id;
          const hasItems = completion[cat.id];
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCat(cat.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-full text-[0.8125rem] font-medium whitespace-nowrap transition-all shrink-0 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent outline-none",
                isActive
                  ? "bg-primary text-white shadow-sm"
                  : "bg-surface border border-border text-secondary hover:border-primary/30 hover:text-primary"
              )}
            >
              <IconComponent size={15} />
              {cat.name}
              {hasItems && !isActive && (
                <div className="w-1.5 h-1.5 rounded-full bg-accent" />
              )}
            </button>
          );
        })}
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {catProducts.map((product) => {
          const inCart = getCartProduct(product.id);
          
          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "relative border rounded-lg bg-surface overflow-hidden transition-all group",
                inCart
                  ? "border-accent/50 ring-1 ring-accent/20"
                  : "border-border hover:border-primary/20 hover:shadow-sm"
              )}
            >
              {/* Recommended badge */}
              {product.recommended && (
                <div className="absolute top-2.5 left-2.5 z-10 bg-highlight/90 text-white text-[0.625rem] font-bold uppercase tracking-wider px-2 py-1 rounded-sm">
                  {product.recommended}
                </div>
              )}

              {/* In cart indicator */}
              {inCart && (
                <div className="absolute top-2.5 right-2.5 z-10 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                  <Check size={14} className="text-white" strokeWidth={3} />
                </div>
              )}

              {/* Image / placeholder */}
              <button
                onClick={() => setActiveProduct(product)}
                className="w-full text-left focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent outline-none"
              >
                {product.imageUrl ? (
                  <div className="aspect-[16/10] bg-bg overflow-hidden">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="aspect-[16/10] bg-bg flex items-center justify-center">
                    <ShoppingBag size={28} className="text-border" />
                  </div>
                )}
              </button>

              {/* Info */}
              <div className="p-3.5">
                <button
                  onClick={() => setActiveProduct(product)}
                  className="text-left w-full mb-2"
                >
                  <h3 className="font-medium text-[0.9375rem] text-primary leading-tight mb-1">
                    {product.name}
                  </h3>
                  <p className="text-[0.8125rem] text-secondary line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </button>

                <div className="flex items-center justify-between gap-3 pt-2 border-t border-border/50">
                  <div className="font-semibold text-primary">
                    ₹{product.price.toLocaleString("en-IN")}
                    {product.variants && product.variants.length > 0 && (
                      <span className="text-[0.75rem] font-normal text-secondary ml-1">onwards</span>
                    )}
                  </div>
                  
                  {inCart ? (
                    product.allowQuantity ? (
                      <div className="flex items-center gap-0 border border-border rounded-md overflow-hidden">
                        <button
                          onClick={() => {
                            if (inCart.quantity <= 1) {
                              removeFromCart(product.id);
                            } else {
                              addToCart(product.id, inCart.variantId, inCart.quantity - 1);
                            }
                          }}
                          className="w-8 h-8 flex items-center justify-center bg-bg hover:bg-border/50 transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 h-8 flex items-center justify-center text-[0.8125rem] font-semibold bg-surface">
                          {inCart.quantity}
                        </span>
                        <button
                          onClick={() => addToCart(product.id, inCart.variantId, inCart.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center bg-bg hover:bg-border/50 transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="text-[0.75rem] font-medium text-red-500 hover:text-red-600 transition-colors px-2 py-1"
                      >
                        Remove
                      </button>
                    )
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (product.variants && product.variants.length > 0) {
                          setActiveProduct(product);
                        } else {
                          addToCart(product.id, undefined, 1);
                        }
                      }}
                      className="flex items-center gap-1.5 text-[0.8125rem] font-semibold text-accent bg-accent/10 hover:bg-accent/20 px-3 py-1.5 rounded-md transition-colors"
                    >
                      <Plus size={14} strokeWidth={2.5} />
                      Add
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
