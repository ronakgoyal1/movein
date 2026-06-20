import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const comparisons = [
  {
    feature: "Selection process",
    amazon: "Hundreds of confusing options",
    wisor: "Curated essentials only"
  },
  {
    feature: "Delivery experience",
    amazon: "Multiple random deliveries",
    wisor: "Single delivery before day one"
  },
  {
    feature: "Product fit",
    amazon: "Generic recommendations",
    wisor: "College-specific recommendations"
  },
  {
    feature: "Completeness",
    amazon: "Easy to forget essentials",
    wisor: "Complete move-in checklist"
  }
];

export function WhyNotAmazon() {
  return (
    <section className="py-20 md:py-28 bg-bg">
      <div className="w-full max-w-[1000px] mx-auto px-5 sm:px-10 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <span className="block text-[0.6875rem] font-medium tracking-widest uppercase text-accent mb-4">
            The Alternative
          </span>
          <h2 className="font-serif text-3xl md:text-[2.75rem] leading-[1.18] tracking-tight text-primary">
            Why not just use Amazon?
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="bg-surface border border-border rounded-lg overflow-hidden shadow-sm"
        >
          <div className="grid grid-cols-[1fr_1fr_1fr] bg-bg/50 border-b border-border">
            <div className="p-4 md:p-6 text-[0.8125rem] font-medium tracking-widest uppercase text-secondary">
              Feature
            </div>
            <div className="p-4 md:p-6 text-[0.8125rem] font-medium tracking-widest uppercase text-secondary border-l border-border bg-white">
              Amazon
            </div>
            <div className="p-4 md:p-6 text-[0.8125rem] font-medium tracking-widest uppercase text-white bg-dark">
              Wisor
            </div>
          </div>

          {comparisons.map((row, idx) => (
            <div key={idx} className="grid grid-cols-[1fr_1fr_1fr] border-b border-border last:border-0">
              <div className="p-4 md:p-6 text-[0.9375rem] font-medium text-primary flex items-center">
                {row.feature}
              </div>
              <div className="p-4 md:p-6 text-[0.875rem] text-secondary border-l border-border flex items-start gap-3 bg-white">
                <X size={18} className="text-red-400 shrink-0 mt-0.5" />
                <span>{row.amazon}</span>
              </div>
              <div className="p-4 md:p-6 text-[0.875rem] font-medium text-primary border-l border-border flex items-start gap-3 bg-[#EEF1E4]/30">
                <Check size={18} className="text-success shrink-0 mt-0.5" />
                <span>{row.wisor}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
