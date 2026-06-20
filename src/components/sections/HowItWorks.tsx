import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Choose your college",
    desc: "Select IIIT Allahabad or MNNIT Allahabad. Product recommendations are tailored to your hostel's rules and room dimensions."
  },
  {
    num: "02",
    title: "Pick what you need",
    desc: "Browse categories — mattresses, buckets, study essentials, and more. Add only what you actually need. Skip what you already have."
  },
  {
    num: "03",
    title: "Customize your setup",
    desc: "Choose variants, adjust quantities, and compare options. Your total updates in real time."
  },
  {
    num: "04",
    title: "Receive before move-in day",
    desc: "Your complete order is delivered directly to your hostel room 1–2 days before you arrive. Just unpack and settle in."
  }
];

export function HowItWorks() {
  return (
    <section id="how" className="bg-surface py-20 md:py-24">
      <div className="w-full max-w-[1320px] mx-auto px-5 sm:px-10 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-16 md:gap-24 items-start md:items-center">
          
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-10"
            >
              <span className="block text-[0.6875rem] font-medium tracking-widest uppercase text-accent mb-4">
                The process
              </span>
              <h2 className="font-serif text-3xl md:text-[2.75rem] leading-[1.18] tracking-tight">
                Four simple steps.<br />
                <span className="italic text-secondary">Zero hassle.</span>
              </h2>
            </motion.div>

            <ol className="flex flex-col">
              {steps.map((step, idx) => (
                <motion.li
                  key={step.num}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: idx * 0.1 }}
                  className="grid grid-cols-[48px_1fr] gap-5 py-6 border-b border-border first:border-t group"
                >
                  <div className="font-serif text-2xl text-border pt-0.5 transition-colors duration-280 group-hover:text-accent">
                    {step.num}
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-medium mb-1.5 leading-[1.3]">
                      {step.title}
                    </h3>
                    <p className="text-[0.9rem] text-secondary leading-[1.7]">
                      {step.desc}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative rounded-xl overflow-hidden aspect-[16/9] md:aspect-[3/4] bg-[#EEF1E4]"
          >
            <img
              src="/hero.jpg"
              alt="Organised hostel room"
              loading="lazy"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-dark/70 to-transparent">
              <span className="text-white/90 text-[0.8125rem] font-medium tracking-wide">
                Wisor Delivery
              </span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
