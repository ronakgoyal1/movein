import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/Button";
import { useNavigate } from "react-router-dom";
import { WHATSAPP_NUMBER } from "@/data";

export function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative grid grid-cols-1 lg:grid-cols-[62fr_38fr] lg:h-[calc(100vh-80px)] lg:mt-[80px] overflow-hidden">
      {/* Left panel - Image */}
      <div className="relative h-full aspect-[16/10] lg:aspect-auto overflow-hidden bg-dark">
        <motion.img
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 3, ease: [0.25, 0.46, 0.45, 0.94] }}
          src="/hero.jpg"
          alt="Authentic student hostel room"
          className="absolute inset-0 w-full h-full object-cover object-[70%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1F2923]/15 via-[#1F2923]/5 to-[#1F2923]/45 lg:bg-gradient-to-r lg:from-transparent lg:via-[#1F2923]/15 lg:to-[#2F3A2F]/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4">
          <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-sm px-3 py-1.5 text-white/90 text-[0.6875rem] font-medium tracking-widest uppercase">
            <div className="w-2.5 h-2.5 rounded-full bg-current" />
            IIIT-A & MNNIT-A
          </div>
          <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-sm px-3 py-1.5 text-white/90 text-[0.6875rem] font-medium tracking-widest uppercase">
            Delivered before day one
          </div>
        </div>
      </div>

      {/* Right panel - Content */}
      <div className="relative flex flex-col justify-center px-6 sm:px-12 md:px-20 py-8 space-y-6 bg-bg overflow-hidden">
        {/* Subtle radial glow */}
        <div className="absolute -top-[20%] -right-[20%] w-[120%] h-[120%] bg-[radial-gradient(ellipse_70%_60%_at_70%_30%,rgba(138,154,91,0.07)_0%,transparent_65%)] pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex items-center gap-3"
        >
          <div className="w-8 h-[1px] bg-accent" />
          <span className="text-[0.6875rem] font-medium tracking-widest uppercase text-secondary">
            Move-in concierge
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="font-serif text-[clamp(2.75rem,3vw,4.5rem)] leading-[0.9] tracking-[-0.04em] max-w-[8ch] text-primary"
        >
          Everything you need for hostel move-in.<br />
          <em className="text-accent not-italic italic text-[0.92em]">Arrive. Unpack. Settle in.</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="text-lg sm:text-xl font-light text-secondary max-w-[420px] leading-relaxed"
        >
          Curated essentials for IIIT Allahabad and MNNIT Allahabad students.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          className="flex flex-wrap items-center gap-4"
        >
          <Button variant="dark" size="lg" onClick={() => navigate("/setup")}>
            Build My Setup
            <ArrowRight size={16} />
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=Hi,%20I%27m%20interested%20in%20partnering%20with%20Wisor%20to%20supply%20products%20for%20IIIT%20Allahabad%20and%20MNNIT%20Allahabad%20students.`, '_blank')}
          >
            Become a Partner
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          className="flex flex-col gap-3 pt-6 border-t border-border"
        >
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.8125rem] text-secondary tracking-wide">
            <span>Curated by seniors</span>
            <span className="text-border">&middot;</span>
            <span>Delivered to hostel</span>
            <span className="text-border">&middot;</span>
            <span>WhatsApp support</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
