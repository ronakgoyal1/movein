import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Package, Truck, MessageSquare } from "lucide-react";
import { useBuilderStore } from "@/store/useBuilderStore";

export function WhyWisor() {
  const setBuilderOpen = useBuilderStore((state) => state.setOpen);

  return (
    <section id="why" className="relative bg-dark py-20 md:py-32 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute -top-[30%] -left-[10%] w-[70%] h-[120%] bg-[radial-gradient(ellipse_at_30%_50%,rgba(34,197,94,0.08)_0%,transparent_60%)] pointer-events-none" />
      <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[80%] bg-[radial-gradient(ellipse_at_70%_70%,rgba(34,197,94,0.05)_0%,transparent_60%)] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1320px] mx-auto px-5 sm:px-10 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">
          
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <span className="block text-[0.6875rem] font-medium tracking-widest uppercase text-accent mb-5">
                Why Wisor
              </span>
              <h2 className="font-serif text-[2.25rem] md:text-5xl leading-[1.1] tracking-tight text-white mb-6">
                Built by students.<br />
                <em className="text-accent/90 not-italic italic">For the day<br />everything changes.</em>
              </h2>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
              className="text-white/45 font-light leading-[1.8] mb-8 max-w-[480px]"
            >
              We spent a semester talking to freshers at IIIT Allahabad and MNNIT Allahabad. We asked what they wished they had on move-in day, what they bought and never used, and what their parents worried about most. This configurator is the result.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              <button 
                onClick={() => setBuilderOpen(true)}
                className="inline-flex items-center gap-2 text-[0.875rem] font-medium tracking-wider uppercase text-white/70 border-b border-white/30 pb-px transition-all hover:text-white hover:border-white/70 hover:gap-3"
              >
                Start building
                <ArrowRight size={14} />
              </button>
            </motion.div>
          </div>

          <ul className="flex flex-col">
            {[
              {
                icon: CheckCircle2,
                title: "Curated by students",
                desc: "Every item was chosen by people who have lived in these exact hostels. Not marketers. Not vendors."
              },
              {
                icon: Package,
                title: "No unnecessary products",
                desc: "We removed everything that ends up in a corner after week one. Only items that earn their space."
              },
              {
                icon: Truck,
                title: "Delivered before move-in day",
                desc: "Your order arrives before you do. Walk in and find your room already set up. Let the goodbyes be the hard part — not the logistics."
              },
              {
                icon: MessageSquare,
                title: "WhatsApp support, always",
                desc: "We're reachable on WhatsApp. Real answers within an hour. No ticket systems, no bots."
              }
            ].map((feature, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 + (idx * 0.1) }}
                className="flex items-start gap-5 py-6 border-b border-white/5 first:border-t"
              >
                <div className="w-9 h-9 rounded-sm bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0 mt-0.5">
                  <feature.icon size={18} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-serif text-base font-medium text-white/90 mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-[0.875rem] text-white/40 leading-[1.65]">
                    {feature.desc}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>

        </div>
      </div>
    </section>
  );
}
