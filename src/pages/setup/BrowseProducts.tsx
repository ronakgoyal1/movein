import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useBuilderStore } from "@/store/useBuilderStore";
import { categories, products } from "@/data";
import { cn } from "@/lib/utils";
import { Check, Plus, Minus, ShoppingBag, Search } from "lucide-react";
import * as Icons from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export function BrowseProducts() {
  const [activeCat, setActiveCat] = useState(categories[0].id);
  const { 
    searchQuery, 
    setSearchQuery, 
    addToCart, 
    removeFromCart, 
    getCartProduct, 
    getCategoryCompletion, 
    getReadinessPercent, 
    setActiveProduct 
  } = useBuilderStore();
  
  const completion = getCategoryCompletion();
  const readiness = getReadinessPercent();

  // Handle Category Click Analytics
  const handleCategoryClick = (catId: string) => {
    trackEvent("category_viewed", { categoryId: catId });
    setActiveCat(catId);
  };

  // Filter products by category AND search query
  const displayedProducts = useMemo(() => {
    let filtered = products;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = products.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.tags?.some(t => t.toLowerCase().includes(q)));
    } else {
      filtered = products.filter((p) => p.categoryId === activeCat);
    }
    return filtered;
  }, [activeCat, searchQuery]);

  return (
    <div className="pb-24 px-4 md:px-8">
      {/* Search Bar - Sticky underneath the header (header is handled by layout) */}
      <div className="sticky top-0 z-10 bg-bg pt-4 pb-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" size={18} />
          <input 
            type="text" 
            placeholder="Search essentials..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-surface border border-border rounded-lg text-[0.9375rem] focus:outline-none focus:border-accent focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-bg transition-all"
          />
        </div>
      </div>

      {/* Category Navigation - Sticky */}
      {!searchQuery && (
        <div className="sticky top-[72px] z-10 bg-bg/95 backdrop-blur-sm py-3 -mx-4 px-4 md:-mx-8 md:px-8 shadow-sm">
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {categories.map((cat) => {
              const IconComponent = (Icons as any)[cat.icon] || Icons.Box;
              const isActive = activeCat === cat.id;
              const hasItems = completion[cat.id];
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2.5 rounded-full text-[0.8125rem] font-medium whitespace-nowrap transition-all shrink-0 focus-visible:ring-2 focus-visible:ring-offset-2 outline-none",
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
        </div>
      )}

      {/* Readiness indicator - Only show if not searching */}
      {!searchQuery && (
        <div className="mt-4 mb-6 p-4 bg-surface border border-border rounded-lg">
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
      )}

      {/* Product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {displayedProducts.length === 0 && (
          <div className="col-span-full py-12 text-center text-secondary">
            No products found for "{searchQuery}". Try a different term.
          </div>
        )}
        
        {displayedProducts.map((product) => {
          const inCart = getCartProduct(product.id);
          
          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setActiveProduct(product)}
              className={cn(
                "relative flex flex-col border rounded-lg bg-surface overflow-hidden transition-all group cursor-pointer",
                inCart
                  ? "border-accent/50 ring-1 ring-accent/20"
                  : "border-border hover:border-primary/20 hover:shadow-sm"
              )}
            >
              {/* Badges */}
              {product.recommended && (
                <div className="absolute top-3 left-3 z-10 bg-highlight/90 text-white text-[0.625rem] font-bold uppercase tracking-wider px-2 py-1 rounded-sm shadow-sm backdrop-blur-sm">
                  {product.recommended}
                </div>
              )}

              {/* Image Area */}
              <div className="aspect-[4/3] bg-bg relative overflow-hidden flex items-center justify-center p-6 border-b border-border/50">
                {product.imageUrl ? (
                  <img 
                    src={product.imageUrl} 
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-surface shadow-sm flex items-center justify-center">
                    <ShoppingBag size={28} className="text-secondary/50" strokeWidth={1.5} />
                  </div>
                )}
              </div>

              {/* Content Area */}
              <div className="flex-1 p-4 flex flex-col">
                <div className="flex-1">
                  <h3 className="font-semibold text-[0.9375rem] text-primary mb-1 line-clamp-1 group-hover:text-accent transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-[0.8125rem] text-secondary line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>
                
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
                  <div className="font-semibold text-primary">
                    ₹{product.price.toLocaleString("en-IN")}
                  </div>
                  
                  {inCart ? (
                    <div className="flex items-center gap-3 bg-accent/5 rounded-full px-2 py-1 border border-accent/20" onClick={(e) => e.stopPropagation()}>
                      {product.allowQuantity ? (
                        <>
                          <button
                            onClick={() => removeFromCart(product.id)}
                            className="w-7 h-7 rounded-full flex items-center justify-center text-accent hover:bg-accent/10 transition-colors"
                          >
                            <Minus size={14} strokeWidth={2.5} />
                          </button>
                          <span className="text-[0.8125rem] font-semibold text-accent w-4 text-center">
                            {inCart.quantity}
                          </span>
                          <button
                            onClick={() => addToCart(product.id, inCart.variantId, inCart.quantity + 1)}
                            className="w-7 h-7 rounded-full flex items-center justify-center text-accent hover:bg-accent/10 transition-colors"
                          >
                            <Plus size={14} strokeWidth={2.5} />
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => removeFromCart(product.id)}
                          className="px-3 py-1 text-[0.75rem] font-medium text-accent hover:bg-accent/10 rounded-full transition-colors"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (product.variants?.length) {
                          setActiveProduct(product); // open drawer to select variant
                        } else {
                          addToCart(product.id);
                        }
                      }}
                      className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition-transform active:scale-95"
                    >
                      <Plus size={18} strokeWidth={2} />
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
