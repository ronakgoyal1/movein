import type { Category, College, FAQ, Product, Testimonial } from "../types";

export const MINIMUM_ORDER_VALUE = 2000;
export const WHATSAPP_NUMBER = "917400390244";

export const colleges: College[] = [
  {
    id: "iiita",
    name: "IIIT Allahabad",
    shortName: "IIIT-A",
    description: "Indian Institute of Information Technology, Allahabad",
  },
  {
    id: "mnnit",
    name: "MNNIT Allahabad",
    shortName: "MNNIT",
    description: "Motilal Nehru National Institute of Technology, Allahabad",
  },
];

export const categories: Category[] = [
  { id: "sleep", name: "Sleep", icon: "BedSingle", description: "Mattresses, pillows, and bedsheets for hostel beds." },
  { id: "bathroom", name: "Bathroom", icon: "Bath", description: "Buckets, mugs, soap holders, and bathroom essentials." },
  { id: "study", name: "Study", icon: "BookOpen", description: "Extension boards, study lamps, and desk essentials." },
  { id: "storage", name: "Storage", icon: "Box", description: "Hangers, laundry bags, and under-bed storage." },
  { id: "weather", name: "Weather", icon: "Umbrella", description: "Coolers, umbrellas, and weather protection." },
];

export const products: Product[] = [
  // ── Sleep ──────────────────────────────────────────────
  {
    id: "mattress_budget",
    name: "Budget Foam Mattress",
    description: "A clean, firm foam base. Gets the job done for hostel life.",
    price: 800,
    categoryId: "sleep",
    recommended: "Most affordable",
    imageUrl: "https://images.unsplash.com/photo-1584013217435-97fcceadfa1f?auto=format&fit=crop&w=400&q=80",
    variants: [
      { id: "3inch", label: "3 inch", priceDiff: 0 },
      { id: "4inch", label: "4 inch", priceDiff: 200 },
    ],
  },
  {
    id: "mattress_dual",
    name: "Dual Comfort Mattress",
    description: "Soft on one side, firm on the other. Flip based on your mood.",
    price: 1200,
    categoryId: "sleep",
    recommended: "Most popular at IIITA",
    imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&q=80",
    variants: [
      { id: "4inch", label: "4 inch", priceDiff: 0 },
      { id: "5inch", label: "5 inch", priceDiff: 300 },
    ],
  },
  {
    id: "mattress_ortho",
    name: "Orthopedic Mattress",
    description: "Firm, structured support for your back during exam seasons and long nights.",
    price: 1800,
    categoryId: "sleep",
    imageUrl: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "mattress_memory",
    name: "Memory Foam Mattress",
    description: "Body-contouring comfort. Feels like sleeping on a cloud.",
    price: 2400,
    categoryId: "sleep",
    imageUrl: "https://images.unsplash.com/photo-1628148906969-9c5c93d9a19c?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "mattress_foldable",
    name: "Foldable Premium Mattress",
    description: "Premium quality, folds for easy storage. Perfect for limited hostel space.",
    price: 2800,
    categoryId: "sleep",
    recommended: "Best for small rooms",
    imageUrl: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "pillow_standard",
    name: "Standard Pillow",
    description: "Reliable, consistent comfort. Does the job well.",
    price: 199,
    categoryId: "sleep",
    allowQuantity: true,
  },
  {
    id: "pillow_memory",
    name: "Memory Foam Pillow",
    description: "Adapts to your neck shape. Reduces morning stiffness.",
    price: 449,
    categoryId: "sleep",
    recommended: "Recommended for hostel use",
    allowQuantity: true,
  },
  {
    id: "pillow_cervical",
    name: "Cervical Support Pillow",
    description: "Ergonomic support for long screen hours and study sessions.",
    price: 649,
    categoryId: "sleep",
    allowQuantity: true,
  },
  {
    id: "bedsheet_cotton",
    name: "Cotton Bedsheet Set",
    description: "Soft, breathable cotton bedsheet with a pillow cover. Fits hostel single beds.",
    price: 399,
    categoryId: "sleep",
    allowQuantity: true,
  },
  {
    id: "bedsheet_premium",
    name: "Premium Bedsheet Set",
    description: "Higher thread count, softer texture. Two pillow covers included.",
    price: 699,
    categoryId: "sleep",
    recommended: "Most popular at MNNIT",
    allowQuantity: true,
  },

  // ── Bathroom ───────────────────────────────────────────
  {
    id: "bucket_15l",
    name: "15L Bucket & Mug Set",
    description: "Compact bucket with matching mug. Fits smaller hostel bathrooms.",
    price: 149,
    categoryId: "bathroom",
    imageUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "bucket_18l",
    name: "18L Bucket & Mug Set",
    description: "Mid-size bucket. The most popular choice among hostel students.",
    price: 199,
    categoryId: "bathroom",
    recommended: "Most popular at IIITA",
    imageUrl: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "bucket_20l",
    name: "20L Bucket & Mug Set",
    description: "Large capacity bucket for laundry days and maximum utility.",
    price: 249,
    categoryId: "bathroom",
  },
  {
    id: "soap_holder",
    name: "Soap & Shampoo Holder",
    description: "Wall-friendly suction holder. Keeps your bathroom space tidy.",
    price: 129,
    categoryId: "bathroom",
    imageUrl: "https://images.unsplash.com/photo-1629198725838-8e65842cce91?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "brush_holder",
    name: "Toothbrush & Brush Holder",
    description: "Covered holder that protects your brush in shared bathrooms.",
    price: 99,
    categoryId: "bathroom",
    recommended: "A must for shared bathrooms",
  },
  {
    id: "laundry_basket",
    name: "Laundry Basket",
    description: "Foldable laundry basket with handles. Keeps dirty clothes separate.",
    price: 249,
    categoryId: "bathroom",
  },

  // ── Study ──────────────────────────────────────────────
  {
    id: "extension_4",
    name: "4-Socket Extension Board",
    description: "Powers your laptop, phone, and fan. Essential from day one.",
    price: 299,
    categoryId: "study",
    recommended: "Essential — do not arrive without this",
  },
  {
    id: "extension_6",
    name: "6-Socket Extension with USB",
    description: "More sockets, built-in USB ports. Handles your full tech setup.",
    price: 499,
    categoryId: "study",
    recommended: "Best for multiple devices",
  },
  {
    id: "study_lamp",
    name: "LED Study Lamp",
    description: "Adjustable, eye-friendly light for late-night study sessions.",
    price: 449,
    categoryId: "study",
    recommended: "Recommended for hostel use",
  },
  {
    id: "table_cover",
    name: "Table Cover",
    description: "Protects the desk. Gives your study space a clean, finished look.",
    price: 149,
    categoryId: "study",
  },
  {
    id: "desk_organizer",
    name: "Desk Organizer",
    description: "Multi-compartment organizer for stationery, chargers, and small items.",
    price: 199,
    categoryId: "study",
  },

  // ── Storage ────────────────────────────────────────────
  {
    id: "hangers_6",
    name: "6 Velvet Hangers",
    description: "Non-slip velvet hangers. Clothes stay put and don't crease.",
    price: 149,
    categoryId: "storage",
    allowQuantity: true,
  },
  {
    id: "hangers_12",
    name: "12 Velvet Hangers",
    description: "Full wardrobe coverage. Never run out of hangers.",
    price: 249,
    categoryId: "storage",
    recommended: "Best value pack",
    allowQuantity: true,
  },
  {
    id: "laundry_bag",
    name: "Laundry Bag",
    description: "Drawstring laundry bag. Keeps your room tidy and clothes separate.",
    price: 129,
    categoryId: "storage",
    allowQuantity: true,
  },
  {
    id: "storage_box",
    name: "Under-Bed Storage Box",
    description: "Uses dead space under your bed. Perfect for seasonal items.",
    price: 349,
    categoryId: "storage",
    recommended: "Maximizes small hostel rooms",
  },
  {
    id: "almirah_lock",
    name: "Almirah Lock",
    description: "Sturdy combination lock for hostel almirahs. No keys to lose.",
    price: 199,
    categoryId: "storage",
    recommended: "Essential for hostel security",
  },

  // ── Weather ────────────────────────────────────────────
  {
    id: "umbrella",
    name: "Compact Travel Umbrella",
    description: "Fits in your bag. Ready for Allahabad monsoons and summer sun.",
    price: 249,
    categoryId: "weather",
    recommended: "You'll need this more than you think",
  },
  {
    id: "cooler_desk",
    name: "Personal Desk Fan / Cooler",
    description: "Survive Allahabad summers. Quiet, compact, and effective.",
    price: 899,
    categoryId: "weather",
    recommended: "Allahabad hits 44°C — not optional",
  },
  {
    id: "blanket",
    name: "Light Blanket",
    description: "Soft, lightweight blanket for AC rooms and winter nights.",
    price: 499,
    categoryId: "weather",
  },
];

export const faqs: FAQ[] = [
  { question: "How does delivery work?", answer: "We deliver directly to your hostel gate or block 1–2 days before your move-in date. Our team will coordinate with you over WhatsApp to confirm the exact drop-off point at IIIT-A or MNNIT-A." },
  { question: "Can I customize my order?", answer: "Absolutely. Pick exactly the products you need, choose variants, and adjust quantities. You only pay for what you select." },
  { question: "How are products selected?", answer: "Products are curated by current students based on actual hostel dimensions, rules, and daily needs. We partner with reliable local suppliers to ensure durability and quality." },
  { question: "When should I place my order?", answer: "We recommend placing your order as soon as your admission is confirmed. This ensures we can aggregate demand and guarantee stock before the peak move-in rush." },
];

export const testimonials: Testimonial[] = [
  { name: "Arjun K.", college: "IIIT Allahabad", batch: "B.Tech 2025", quote: "I picked exactly what I needed. No unnecessary stuff. My parents were relieved.", avatar: "AK" },
  { name: "Priya M.", college: "MNNIT Allahabad", batch: "B.Tech 2025", quote: "Everything arrived the day before orientation. My room was set up before my parents left.", avatar: "PM" },
  { name: "Rahul S.", college: "IIIT Allahabad", batch: "B.Tech 2024", quote: "The configurator was like ordering food. Just pick what you want and it shows up. So simple.", avatar: "RS" },
];
