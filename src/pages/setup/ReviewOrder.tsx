import { useNavigate } from "react-router-dom";
import { useBuilderStore } from "@/store/useBuilderStore";
import { products, colleges, categories } from "@/data";
import { Check, Edit2, Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

export function ReviewOrder() {
  const navigate = useNavigate();
  const { collegeId, cart, getTotal, getItemCount, removeFromCart, addToCart, getItemPrice, getCategoryCompletion, setActiveProduct } = useBuilderStore();

  useEffect(() => {
    trackEvent("review_order_opened", { totalAmount: getTotal(), itemCount: getItemCount() });
  }, []);

  const college = colleges.find((c) => c.id === collegeId);
  const total = getTotal();
  const itemCount = getItemCount();
  const completion = getCategoryCompletion();

  // Group cart items by category
  const grouped = categories
    .map((cat) => {
      const items = cart
        .map((ci) => {
          const prod = products.find((p) => p.id === ci.productId);
          if (!prod || prod.categoryId !== cat.id) return null;
          const variant = ci.variantId && prod.variants
            ? prod.variants.find((v) => v.id === ci.variantId)
            : null;
          return { cartItem: ci, product: prod, variant, linePrice: getItemPrice(ci) };
        })
        .filter(Boolean) as Array<{
          cartItem: typeof cart[0];
          product: typeof products[0];
          variant: { id: string; label: string; priceDiff: number } | null;
          linePrice: number;
        }>;
      return { category: cat, items };
    })
    .filter((g) => g.items.length > 0);

  return (
    <div className="flex flex-col min-h-full pb-24">
      <div className="flex-1 px-4 md:px-8 py-6 max-w-3xl w-full mx-auto">
        <p className="text-[0.9375rem] text-secondary mb-6">
          Review your selections before checking out.
        </p>

        {/* College info */}
        <div className="p-4 bg-surface border border-border rounded-lg mb-6">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[0.6875rem] text-secondary uppercase tracking-widest">Delivery to</span>
            <button onClick={() => navigate("/setup")} className="text-[0.75rem] text-accent hover:underline flex items-center gap-1">
              <Edit2 size={10} /> Change
            </button>
          </div>
          <div className="font-medium text-[0.9375rem]">{college?.name}</div>
        </div>

        {/* Readiness summary */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className={cn(
                "flex items-center gap-1.5 text-[0.75rem] px-2.5 py-1 rounded-full border",
                completion[cat.id]
                  ? "bg-accent/10 border-accent/20 text-accent font-medium"
                  : "bg-bg border-border text-secondary"
              )}
            >
              {completion[cat.id] ? <Check size={11} strokeWidth={3} /> : <div className="w-2.5 h-2.5 rounded-full border border-current" />}
              {cat.name}
            </div>
          ))}
        </div>

        {/* Cart items grouped by category */}
        <div className="flex flex-col gap-4 mb-6">
          {grouped.map(({ category, items }) => (
            <div key={category.id}>
              <h3 className="text-[0.75rem] font-semibold text-secondary uppercase tracking-widest mb-2">
                {category.name}
              </h3>
              <div className="border border-border rounded-lg overflow-hidden bg-surface">
                {items.map(({ cartItem, product, variant, linePrice }, idx) => (
                  <div
                    key={product.id}
                    className={cn("flex items-start gap-3 p-4", idx > 0 && "border-t border-border")}
                  >
                    {/* Image */}
                    {product.imageUrl ? (
                      <button
                        onClick={() => setActiveProduct(product)}
                        className="w-14 h-14 rounded-lg bg-bg overflow-hidden shrink-0"
                      >
                        <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                      </button>
                    ) : (
                      <div className="w-14 h-14 rounded-lg bg-bg flex items-center justify-center shrink-0">
                        <ShoppingBag size={18} className="text-border" />
                      </div>
                    )}

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="font-medium text-[0.875rem] text-primary">{product.name}</div>
                          {variant && (
                            <div className="text-[0.75rem] text-secondary">{variant.label}</div>
                          )}
                        </div>
                        <div className="text-[0.875rem] font-semibold text-primary shrink-0">
                          ₹{linePrice.toLocaleString("en-IN")}
                        </div>
                      </div>

                      {/* Quantity / Remove */}
                      <div className="flex items-center justify-between mt-2">
                        {product.allowQuantity ? (
                          <div className="flex items-center gap-0 border border-border rounded-md overflow-hidden">
                            <button
                              onClick={() => {
                                if (cartItem.quantity <= 1) removeFromCart(product.id);
                                else addToCart(product.id, cartItem.variantId, cartItem.quantity - 1);
                              }}
                              className="w-7 h-7 flex items-center justify-center bg-bg hover:bg-border/50 transition-colors"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="w-7 h-7 flex items-center justify-center text-[0.75rem] font-semibold bg-surface">
                              {cartItem.quantity}
                            </span>
                            <button
                              onClick={() => addToCart(product.id, cartItem.variantId, cartItem.quantity + 1)}
                              className="w-7 h-7 flex items-center justify-center bg-bg hover:bg-border/50 transition-colors"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                        ) : (
                          <span className="text-[0.75rem] text-secondary">Qty: 1</span>
                        )}
                        <button
                          onClick={() => removeFromCart(product.id)}
                          className="text-[0.75rem] text-red-400 hover:text-red-500 flex items-center gap-1 transition-colors"
                        >
                          <Trash2 size={12} /> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Add more items */}
        <button
          onClick={() => navigate("/setup/browse")}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-lg border border-dashed border-border text-[0.875rem] font-medium text-secondary hover:text-primary hover:border-primary/40 transition-colors mb-6"
        >
          <Plus size={16} /> Add more items
        </button>

        {/* Total */}
        <div className="p-5 bg-primary text-white rounded-lg flex justify-between items-center mb-6">
          <div>
            <div className="text-[0.8125rem] text-white/50">{itemCount} {itemCount === 1 ? "item" : "items"}</div>
            <div className="font-serif text-[1.125rem]">Total Amount</div>
          </div>
          <div className="font-serif text-[1.5rem]">₹{total.toLocaleString("en-IN")}</div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 md:py-6 bg-surface border-t border-border z-10 md:static md:bg-transparent md:border-none md:p-0 md:max-w-3xl md:w-full md:mx-auto">
        <Button 
          size="lg" 
          className="w-full" 
          onClick={() => navigate("/setup/delivery")}
        >
          Proceed to Delivery Details
        </Button>
      </div>
    </div>
  );
}
