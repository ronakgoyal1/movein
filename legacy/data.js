// Wisor Freshers Kit — Data Layer

const WISOR_DATA = {

  colleges: [
    {
      id: 'iiita',
      name: 'IIIT Allahabad',
      shortName: 'IIIT-A',
      description: 'Indian Institute of Information Technology, Allahabad',
      note: 'Kits designed for IIIT-A hostel room dimensions and facilities.',
      hostels: ['Boys Hostel (BH-1 to BH-7)', 'Girls Hostel (GH-1, GH-2)']
    },
    {
      id: 'mnnit',
      name: 'MNNIT Allahabad',
      shortName: 'MNNIT',
      description: 'Motilal Nehru National Institute of Technology, Allahabad',
      note: 'Kits designed for MNNIT hostel room dimensions and facilities.',
      hostels: ['Tagore Bhawan', 'Nehru Bhawan', 'Azad Bhawan', 'Subhash Bhawan', 'Sarojini Bhawan', 'Kasturba Bhawan']
    }
  ],

  kits: [
    {
      id: 'essential',
      name: 'Essential Kit',
      tagline: 'Everything you need, nothing you don\'t.',
      description: 'The carefully curated minimum — every item chosen by students who\'ve been through move-in day.',
      basePrice: 3499,
      badge: null,
      icon: '○',
      color: '#6B7280',
      includes: ['Basic mattress', 'Standard pillow', 'Bucket & mug', 'Soap holder', 'Extension board', 'Laundry bag', '4 hangers'],
      idealFor: 'Students who prefer to add personal items over time.'
    },
    {
      id: 'comfort',
      name: 'Comfort Kit',
      tagline: 'Move in ready. Settle in faster.',
      description: 'The most popular choice — a balanced kit that covers all essentials plus the items that make a hostel room feel like home.',
      basePrice: 5999,
      badge: 'Most Popular',
      icon: '◎',
      color: '#7C8F7A',
      includes: ['Comfort mattress', 'Memory foam pillow', 'Premium bucket set', 'Soap holder + brush holder', 'Extension board', 'Study lamp', 'Table cloth', 'Laundry bag', '8 hangers', 'Umbrella'],
      idealFor: 'Most freshers — tested and trusted by 200+ students.'
    },
    {
      id: 'premium',
      name: 'Premium Kit',
      tagline: 'Your hostel, your sanctuary.',
      description: 'The complete move-in experience — every item hand-selected for comfort, quality, and the specific needs of hostel life.',
      basePrice: 9499,
      badge: 'Best Value',
      icon: '●',
      color: '#1F2937',
      includes: ['Orthopedic mattress', 'Memory foam pillow', 'Premium bucket set', 'Full bathroom set', 'Extension board (6-socket)', 'Study lamp + cooler', 'Table cloth + storage box', 'Laundry bag + carry bag', '12 hangers', 'Umbrella', 'Bed side organizer'],
      idealFor: 'Students who want to walk in and feel at home from day one.'
    }
  ],

  categories: [
    {
      id: 'sleep',
      name: 'Sleep',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/></svg>`,
      description: 'Your foundation for rest and recovery',
      products: [
        {
          id: 'mattress_basic',
          name: 'Basic Foam Mattress',
          outcome: 'A clean, firm base for a good night\'s sleep.',
          recommendation: null,
          price: 0,
          tier: ['essential'],
          tag: null
        },
        {
          id: 'mattress_comfort',
          name: 'Comfort Foam Mattress',
          outcome: 'Balanced support for daily use. Preferred by most students.',
          recommendation: 'Great for all sleep positions.',
          price: 600,
          tier: ['comfort'],
          tag: 'Popular'
        },
        {
          id: 'mattress_ortho',
          name: 'Orthopedic Mattress',
          outcome: 'Firm support for your back during exam seasons and long nights.',
          recommendation: 'Especially helpful for students with back concerns.',
          price: 1800,
          tier: ['premium'],
          tag: 'Premium'
        },
        {
          id: 'mattress_memory',
          name: 'Memory Foam Mattress',
          outcome: 'Softer, contouring comfort. Feels like sleeping on a cloud.',
          recommendation: 'Best for students who prefer softer sleep surfaces.',
          price: 2400,
          tier: ['premium'],
          tag: null
        },
        {
          id: 'mattress_latex',
          name: 'Latex Hybrid Mattress',
          outcome: 'The best of both — responsive support with cushioned comfort.',
          recommendation: 'Long-lasting and breathable. Worth the upgrade.',
          price: 3200,
          tier: ['premium'],
          tag: 'Best'
        }
      ]
    },
    {
      id: 'pillow',
      name: 'Pillow',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="10" rx="5"/></svg>`,
      description: 'The small detail that makes a big difference',
      products: [
        {
          id: 'pillow_standard',
          name: 'Standard Pillow',
          outcome: 'Reliable, consistent. Does the job well.',
          recommendation: null,
          price: 0,
          tier: ['essential'],
          tag: null
        },
        {
          id: 'pillow_memory',
          name: 'Memory Foam Pillow',
          outcome: 'Adapts to your neck. Reduces morning stiffness.',
          recommendation: 'Recommended for students who study late.',
          price: 350,
          tier: ['comfort', 'premium'],
          tag: 'Popular'
        },
        {
          id: 'pillow_cervical',
          name: 'Cervical Support Pillow',
          outcome: 'Ergonomic support for long screen hours and study sessions.',
          recommendation: 'Ideal for CS and tech students.',
          price: 550,
          tier: ['premium'],
          tag: null
        }
      ]
    },
    {
      id: 'bathroom',
      name: 'Bathroom',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/><line x1="10" x2="8" y1="5" y2="7"/><line x1="2" x2="22" y1="12" y2="12"/></svg>`,
      description: 'Everything for a clean daily routine',
      products: [
        {
          id: 'bucket_standard',
          name: 'Standard Bucket & Mug Set',
          outcome: 'Durable, wide-base bucket with matching mug. Fits hostel bathroom shelves.',
          recommendation: null,
          price: 0,
          tier: ['essential', 'comfort', 'premium'],
          tag: null
        },
        {
          id: 'bucket_premium',
          name: 'Premium Bucket Set',
          outcome: 'Heavier-gauge plastic. Comfortable grip. Lasts the full degree.',
          recommendation: 'Worth it for 4 years of daily use.',
          price: 180,
          tier: ['comfort', 'premium'],
          tag: 'Upgrade'
        },
        {
          id: 'soap_holder',
          name: 'Soap & Shampoo Holder',
          outcome: 'Wall-friendly suction holder. Keeps your space tidy.',
          recommendation: null,
          price: 0,
          tier: ['essential', 'comfort', 'premium'],
          tag: null
        },
        {
          id: 'brush_holder',
          name: 'Toothbrush & Brush Holder',
          outcome: 'Covered holder that protects your brush in shared bathrooms.',
          recommendation: 'A must in shared bathrooms.',
          price: 120,
          tier: ['comfort', 'premium'],
          tag: 'Recommended'
        }
      ]
    },
    {
      id: 'study',
      name: 'Study',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
      description: 'Set up your desk for focus',
      products: [
        {
          id: 'extension_basic',
          name: '4-Socket Extension Board',
          outcome: 'Powers your laptop, phone, and fan. Essential from day one.',
          recommendation: 'Do not arrive without this.',
          price: 0,
          tier: ['essential', 'comfort'],
          tag: 'Essential'
        },
        {
          id: 'extension_premium',
          name: '6-Socket Extension with USB',
          outcome: 'More sockets, USB charging. Handles your full tech setup.',
          recommendation: 'Ideal for students with multiple devices.',
          price: 280,
          tier: ['premium'],
          tag: null
        },
        {
          id: 'lamp_basic',
          name: 'Study Lamp',
          outcome: 'Focused light for late-night study. Reduces eye strain.',
          recommendation: 'Your eyes will thank you.',
          price: 0,
          tier: ['comfort', 'premium'],
          tag: 'Popular'
        },
        {
          id: 'tablecloth',
          name: 'Table Cover',
          outcome: 'Protects the desk. Gives your study space a clean, finished look.',
          recommendation: null,
          price: 0,
          tier: ['comfort', 'premium'],
          tag: null
        }
      ]
    },
    {
      id: 'weather',
      name: 'Weather',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M23 12a11.05 11.05 0 0 0-22 0zm-5 7a3 3 0 0 1-6 0v-7"/></svg>`,
      description: 'Allahabad summers are real. Be prepared.',
      products: [
        {
          id: 'umbrella',
          name: 'Compact Travel Umbrella',
          outcome: 'Fits in your bag. Ready for Allahabad monsoons and summer sun.',
          recommendation: 'You\'ll need this more than you think.',
          price: 0,
          tier: ['comfort', 'premium'],
          tag: 'Must-Have'
        },
        {
          id: 'cooler',
          name: 'Personal Desk Fan / Cooler',
          outcome: 'Survive Allahabad summers. Quiet, compact, and effective.',
          recommendation: 'Allahabad hits 44°C in May. This is not optional.',
          price: 0,
          tier: ['premium'],
          tag: 'Highly Recommended'
        }
      ]
    },
    {
      id: 'storage',
      name: 'Storage',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/></svg>`,
      description: 'Keep your space organised from day one',
      products: [
        {
          id: 'hangers_4',
          name: '4 Hangers',
          outcome: 'Sturdy velvet-grip hangers. Clothes stay put.',
          recommendation: null,
          price: 0,
          tier: ['essential'],
          tag: null
        },
        {
          id: 'hangers_8',
          name: '8 Hangers',
          outcome: 'Enough for your full wardrobe rotation.',
          recommendation: 'The right number for a hostel wardrobe.',
          price: 80,
          tier: ['comfort'],
          tag: 'Popular'
        },
        {
          id: 'hangers_12',
          name: '12 Hangers',
          outcome: 'Full wardrobe coverage. Never a hanger shortage.',
          recommendation: null,
          price: 140,
          tier: ['premium'],
          tag: null
        },
        {
          id: 'laundry_bag',
          name: 'Laundry Bag',
          outcome: 'Dedicated laundry bag keeps your room tidy and your clothes separate.',
          recommendation: null,
          price: 0,
          tier: ['essential', 'comfort', 'premium'],
          tag: null
        },
        {
          id: 'storage_box',
          name: 'Under-Bed Storage Box',
          outcome: 'Uses the dead space under your bed. Perfect for seasonal items.',
          recommendation: 'Maximises small hostel rooms.',
          price: 0,
          tier: ['premium'],
          tag: null
        }
      ]
    }
  ],

  faqs: [
    {
      question: 'When will my kit be delivered?',
      answer: 'We deliver your kit 1–2 days before your move-in date. You can specify your exact move-in date during checkout, and we\'ll coordinate delivery to your hostel.'
    },
    {
      question: 'How does delivery work to the hostel?',
      answer: 'We deliver directly to your hostel gate or block. For IIIT-A and MNNIT-A, we\'re familiar with all hostel locations. Our team will coordinate with you over WhatsApp to confirm the exact drop-off point.'
    },
    {
      question: 'Can I customise my kit?',
      answer: 'Yes — that\'s the whole point. After choosing your base kit, you can swap or upgrade individual items. Add a better mattress, choose your pillow type, or add a study lamp. Every choice is yours.'
    },
    {
      question: 'What if I want to return something?',
      answer: 'If any item arrives damaged or isn\'t what you expected, contact us on WhatsApp within 48 hours of delivery. We\'ll replace or refund it — no questions asked.'
    },
    {
      question: 'How do I pay?',
      answer: 'Currently, we accept payment on delivery (cash or UPI) or advance payment via UPI. You\'ll finalise payment details over WhatsApp after placing your order.'
    },
    {
      question: 'Is the kit the same for IIIT-A and MNNIT-A?',
      answer: 'The products are the same quality, but we\'ve adapted recommendations for each college\'s hostel setup — room dimensions, bathroom facilities, and what students actually use.'
    },
    {
      question: 'Who curated these kits?',
      answer: 'Current students from IIIT Allahabad and MNNIT Allahabad. We spent a semester figuring out what you actually need vs. what you think you need. The kits are the result of that research.'
    },
    {
      question: 'What if I already have some items?',
      answer: 'You can deselect any item during customisation. The price adjusts automatically. You only pay for what you need.'
    }
  ],

  testimonials: [
    {
      name: 'Arjun K.',
      college: 'IIIT Allahabad',
      batch: 'B.Tech 2025',
      quote: 'I had no idea what to bring. The Comfort Kit had everything I actually needed. My parents were relieved.',
      avatar: 'AK'
    },
    {
      name: 'Priya M.',
      college: 'MNNIT Allahabad',
      batch: 'B.Tech 2025',
      quote: 'The kit arrived the day before orientation. Everything was already in my room when my parents left. It made the goodbye so much easier.',
      avatar: 'PM'
    },
    {
      name: 'Rahul S.',
      college: 'IIIT Allahabad',
      batch: 'B.Tech 2024',
      quote: 'I upgraded the mattress and added the cooler. Best decision. The customisation flow was so simple.',
      avatar: 'RS'
    }
  ],

  whatsappNumber: '919999999999' // Replace with actual number
};
