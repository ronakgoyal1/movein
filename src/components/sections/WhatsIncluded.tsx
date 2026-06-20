import { motion } from "framer-motion";
import { BedSingle, Bath, BookOpen, Box, Umbrella } from "lucide-react";

const categories = [
  {
    title: "Sleep Essentials",
    icon: BedSingle,
    items: ["Orthopedic Mattress", "Cotton Bedsheets", "Pillow & Covers"],
    desc: "Quality sleep products designed for hostel beds."
  },
  {
    title: "Bathroom Essentials",
    icon: Bath,
    items: ["20L Bucket & Mug", "Laundry Basket", "Soap Dispenser"],
    desc: "Durable basics for shared or private hostel bathrooms."
  },
  {
    title: "Study Essentials",
    icon: BookOpen,
    items: ["Extension Board", "Study Lamp", "Organizers"],
    desc: "Everything you need for late-night exam prep."
  },
  {
    title: "Storage Essentials",
    icon: Box,
    items: ["Almirah Lock", "Hangers", "Storage Bags"],
    desc: "Keep your limited space tidy and secure."
  },
  {
    title: "Weather Essentials",
    icon: Umbrella,
    items: ["Desert Cooler", "Umbrella", "Blanket"],
    desc: "Stay comfortable through Allahabad's extreme weather."
  }
];

export function WhatsIncluded() {
  return (
    <section id="included" className="py-20 md:py-28 bg-surface">
      <div className="w-full max-w-[1320px] mx-auto px-5 sm:px-10 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <span className="block text-[0.6875rem] font-medium tracking-widest uppercase text-accent mb-4">
            What's Included
          </span>
          <h2 className="font-serif text-3xl md:text-[2.75rem] leading-[1.18] tracking-tight text-primary">
            Curated categories.<br />
            <span className="italic text-secondary">Zero junk.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut", delay: idx * 0.1 }}
              className="p-6 border border-border bg-bg/50 rounded-sm hover:border-accent/50 transition-colors"
            >
              <div className="w-12 h-12 bg-white border border-border rounded-full flex items-center justify-center mb-5 text-accent shadow-sm">
                <cat.icon size={22} strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-xl font-medium mb-2">{cat.title}</h3>
              <p className="text-[0.9375rem] text-secondary mb-4 leading-relaxed">
                {cat.desc}
              </p>
              <ul className="flex flex-col gap-2">
                {cat.items.map(item => (
                  <li key={item} className="flex items-center gap-2 text-[0.875rem] text-primary">
                    <div className="w-1.5 h-1.5 rounded-full bg-border" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
