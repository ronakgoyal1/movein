import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import { MessageCircle, TrendingUp, Users, Package, PieChart } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/data";

const benefits = [
  {
    icon: Package,
    title: "Bulk orders",
    desc: "Aggregate demand into large, predictable volumes."
  },
  {
    icon: TrendingUp,
    title: "Predictable demand",
    desc: "Know exactly what to stock before the season begins."
  },
  {
    icon: Users,
    title: "Direct community access",
    desc: "Reach IIIT-A and MNNIT-A students directly."
  },
  {
    icon: PieChart,
    title: "Lower acquisition costs",
    desc: "Zero marketing spend to acquire new student customers."
  }
];

export function ForDealers() {
  const partnerMessage = "Hi, I'm interested in partnering with Wisor to supply products for IIIT Allahabad and MNNIT Allahabad students.";
  const partnerLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(partnerMessage)}`;

  return (
    <section id="dealers" className="py-20 md:py-32 bg-surface border-t border-border">
      <div className="w-full max-w-[1320px] mx-auto px-5 sm:px-10 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="block text-[0.6875rem] font-medium tracking-widest uppercase text-accent mb-4">
              For Dealers & Suppliers
            </span>
            <h2 className="font-serif text-3xl md:text-[2.75rem] leading-[1.18] tracking-tight text-primary mb-6">
              Reach hundreds of students through one trusted platform.
            </h2>
            <p className="text-lg text-secondary mb-10 max-w-[480px] leading-relaxed">
              We connect local suppliers directly with incoming freshers, eliminating marketing costs and simplifying logistics through aggregated demand.
            </p>
            
            <Button 
              variant="whatsapp" 
              size="lg" 
              onClick={() => window.open(partnerLink, '_blank')}
            >
              <MessageCircle size={18} />
              Partner With Wisor
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {benefits.map((benefit, idx) => (
              <div key={idx} className="p-6 bg-bg/50 border border-border rounded-lg">
                <div className="w-10 h-10 rounded-full bg-white border border-border flex items-center justify-center text-accent mb-4">
                  <benefit.icon size={18} />
                </div>
                <h3 className="font-medium text-primary mb-2">{benefit.title}</h3>
                <p className="text-[0.875rem] text-secondary leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
