import { motion } from "framer-motion";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { useBuilderStore } from "@/store/useBuilderStore";
import { MINIMUM_ORDER_VALUE } from "@/data";

export function FloatingCart() {
  const { cart, getTotal, getItemCount, meetsMinimum, setStep } = useBuilderStore();
  const total = getTotal();
  const itemCount = getItemCount();
  const canProceed = meetsMinimum();
  const remaining = Math.max(0, MINIMUM_ORDER_VALUE - total);
  const progress = Math.min(100, (total / MINIMUM_ORDER_VALUE) * 100);

  if (cart.length === 0) return null;

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 20, opacity: 0 }}
      className="px-4 py-3 md:px-6 md:py-4 border-t border-border bg-surface shrink-0"
    >
      {/* Progress bar toward minimum */}
      {!canProceed && (
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[0.75rem] text-secondary">
              ₹{total.toLocaleString("en-IN")} / ₹{MINIMUM_ORDER_VALUE.toLocaleString("en-IN")} minimum
            </span>
            <span className="text-[0.75rem] font-medium text-highlight">
              Add ₹{remaining.toLocaleString("en-IN")} more
            </span>
          </div>
          <div className="w-full h-1.5 bg-border rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-highlight to-accent"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
        </div>
      )}

      <div className="flex items-center gap-3">
        {/* Cart summary */}
        <div className="flex-1 flex items-center gap-3">
          <div className="relative">
            <ShoppingBag size={20} className="text-primary" />
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-accent text-white text-[0.625rem] font-bold flex items-center justify-center">
              {itemCount}
            </span>
          </div>
          <div>
            <div className="font-serif text-lg font-semibold text-primary leading-tight">
              ₹{total.toLocaleString("en-IN")}
            </div>
            <div className="text-[0.6875rem] text-secondary">
              {itemCount} {itemCount === 1 ? "item" : "items"}
              {canProceed && <span className="text-accent ml-1.5">✓ Minimum met</span>}
            </div>
          </div>
        </div>

        {/* Review button */}
        <button
          onClick={() => canProceed && setStep("review")}
          disabled={!canProceed}
          className={`flex items-center gap-2 px-5 py-3 rounded-lg text-[0.875rem] font-semibold transition-all ${
            canProceed
              ? "bg-primary text-white hover:bg-primary/90 active:scale-[0.98]"
              : "bg-border text-secondary cursor-not-allowed"
          }`}
        >
          Review Order
          <ArrowRight size={16} />
        </button>
      </div>
    </motion.div>
  );
}
