import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Plus } from "lucide-react";
import { faqs, WHATSAPP_NUMBER } from "@/data";
import { cn } from "@/lib/utils";

export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-bg py-20 md:py-32">
      <div className="w-full max-w-[1320px] mx-auto px-5 sm:px-10 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 md:gap-20 items-start">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="md:sticky md:top-32"
          >
            <span className="block text-[0.6875rem] font-medium tracking-widest uppercase text-accent mb-5">
              Questions
            </span>
            <h2 className="font-serif text-[2.25rem] leading-[1.1] tracking-tight mb-4">
              Everything<br />you want<br />to know.
            </h2>
            <p className="text-[0.9375rem] text-secondary leading-[1.7] mb-8">
              Still have questions? We're on WhatsApp and will reply within the hour.
            </p>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[0.875rem] font-medium tracking-wider uppercase border-b border-primary pb-px transition-all hover:text-accent hover:border-accent hover:gap-3"
            >
              Ask on WhatsApp
              <ArrowRight size={14} />
            </a>
          </motion.div>

          <div className="flex flex-col">
            {faqs.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: idx * 0.1 }}
                  className="border-b border-border first:border-t"
                >
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="w-full flex items-start justify-between gap-4 py-5 text-left transition-colors duration-200 hover:text-accent"
                    aria-expanded={isOpen}
                  >
                    <span className="text-[0.9375rem] font-medium">{faq.question}</span>
                    <div className={cn(
                      "w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-all duration-280",
                      isOpen ? "bg-accent border-accent text-white rotate-45" : "border-border text-[#9E9B97]"
                    )}>
                      <Plus size={12} strokeWidth={3} />
                    </div>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <div className="pb-5 text-[0.9375rem] text-secondary leading-[1.75] pr-10">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
