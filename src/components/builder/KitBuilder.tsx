import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft } from "lucide-react";
import { useBuilderStore } from "@/store/useBuilderStore";
import type { BuilderStep } from "@/store/useBuilderStore";
import { CollegeStep } from "./steps/CollegeStep";
import { BrowseStep } from "./steps/BrowseStep";
import { ReviewStep } from "./steps/ReviewStep";
import { CheckoutStep } from "./steps/CheckoutStep";
import { FloatingCart } from "./FloatingCart";
import { ProductDrawer } from "./ProductDrawer";

const STEP_CONFIG: Record<BuilderStep, { label: string; title: string }> = {
  college: { label: "College", title: "Which college are you joining?" },
  browse: { label: "Build", title: "Build your setup" },
  review: { label: "Review", title: "Review your order" },
  checkout: { label: "Confirm", title: "Confirm delivery" },
};

const STEP_ORDER: BuilderStep[] = ["college", "browse", "review", "checkout"];

export function KitBuilder() {
  const { isOpen, step, setOpen, setStep, collegeId } = useBuilderStore();

  const stepIndex = STEP_ORDER.indexOf(step);

  const canGoBack = stepIndex > 0;

  const goBack = () => {
    if (stepIndex > 0) {
      setStep(STEP_ORDER[stepIndex - 1]);
    }
  };

  const goNext = () => {
    if (step === "college" && !collegeId) return;
    if (stepIndex < STEP_ORDER.length - 1) {
      setStep(STEP_ORDER[stepIndex + 1]);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center md:justify-end overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-[#0F140F]/65 backdrop-blur-[6px]"
          />

          {/* Builder Panel */}
          <motion.div
            initial={{ y: "100%", x: 0 }}
            animate={{ y: 0, x: 0 }}
            exit={{ y: "100%", x: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative z-10 w-full md:w-[600px] lg:w-[700px] h-[92svh] md:h-full bg-surface rounded-t-2xl md:rounded-none flex flex-col shadow-2xl"
          >
            {/* Mobile Handle */}
            <div className="w-full flex justify-center py-3 md:hidden shrink-0">
              <div className="w-8 h-1 rounded-full bg-border" />
            </div>

            {/* Header */}
            <div className="px-4 pb-4 md:pt-8 md:pb-6 md:px-8 border-b border-border shrink-0 bg-surface z-20">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  {canGoBack && (
                    <button
                      onClick={goBack}
                      className="w-8 h-8 flex items-center justify-center rounded-full border border-border text-secondary hover:text-primary hover:border-primary transition-colors"
                      aria-label="Go back"
                    >
                      <ChevronLeft size={18} />
                    </button>
                  )}
                  <div>
                    <p className="text-[0.6875rem] text-secondary uppercase tracking-widest">
                      Step {stepIndex + 1} of {STEP_ORDER.length}
                    </p>
                    <p className="text-[0.9375rem] font-semibold text-primary">
                      {STEP_CONFIG[step].title}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-border text-secondary hover:text-primary hover:border-primary transition-colors"
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Progress bar */}
              <div className="flex items-center gap-1.5">
                {STEP_ORDER.map((s, i) => (
                  <div key={s} className="flex items-center gap-1.5 flex-1">
                    <div
                      className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                        i < stepIndex
                          ? "bg-accent"
                          : i === stepIndex
                          ? "bg-primary"
                          : "bg-border"
                      }`}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Body - Scrollable */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden bg-bg relative">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="px-4 py-6 md:px-8"
                >
                  {step === "college" && <CollegeStep onNext={goNext} />}
                  {step === "browse" && <BrowseStep />}
                  {step === "review" && <ReviewStep />}
                  {step === "checkout" && <CheckoutStep />}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer — Floating cart for browse step, or step-specific footer */}
            {step === "browse" && <FloatingCart />}

            {step === "college" && (
              <div className="px-4 py-4 md:px-8 md:py-5 border-t border-border bg-surface shrink-0">
                <button
                  onClick={goNext}
                  disabled={!collegeId}
                  className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-lg text-[0.9375rem] font-semibold transition-all ${
                    collegeId
                      ? "bg-primary text-white hover:bg-primary/90 active:scale-[0.98]"
                      : "bg-border text-secondary cursor-not-allowed"
                  }`}
                >
                  Continue
                </button>
              </div>
            )}

            {step === "review" && (
              <div className="px-5 py-4 md:px-8 md:py-5 border-t border-border bg-surface shrink-0">
                <button
                  onClick={goNext}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-lg text-[0.9375rem] font-semibold bg-primary text-white hover:bg-primary/90 active:scale-[0.98] transition-all"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </motion.div>

          {/* Product detail drawer — sits on top of everything */}
          <ProductDrawer />
        </div>
      )}
    </AnimatePresence>
  );
}
