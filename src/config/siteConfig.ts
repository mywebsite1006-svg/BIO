export interface NavLinkItem {
  label: string;
  href: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  shortDescription: string;
  overview: string;
  idealFor: string;
  typicalTimeline: string;
  deliverables: string[];
  formTypeValue: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  industry: string;
  category: 'Hospitality' | 'Retail' | 'Architecture & Build' | 'Healthcare' | 'Local Services';
  isConcept: boolean;
  shortDescription: string;
  detailedSummary: string;
  highlights: string[];
  deviceScope: string;
  imageUrl: string;
  imageAlt: string;
  suggestedService: string;
}

export interface PricingPackage {
  id: string;
  name: string;
  tagline: string;
  /** Edit this string to display your live INR pricing, e.g. "₹12,000" */
  pricePlaceholder: string;
  priceNote: string;
  highlighted?: boolean;
  features: string[];
  budgetOptionValue: string;
  ctaLabel: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

/**
 * Central Studio Configuration
 * ----------------------------
 * Update business contact details, WhatsApp number, pricing placeholders,
 * social media links, form submission endpoint, and portfolio entries here.
 */
export const siteConfig = {
  brand: {
    name: 'Build It Once',
    wordmark: 'build it once.',
    tagline: "Your business deserves a better digital presence. Let's build it right.",
    location: 'Palakkad, Kerala, India',
    serviceArea: 'Serving Palakkad, Kerala, and small businesses across India.',
    copyrightYear: new Date().getFullYear(),
  },

  /**
   * Editable Contact & Integration Placeholders
   * Replace placeholder strings below with real studio details before launch.
   */
  contact: {
    isPlaceholder: true,
    email: 'hello@yourstudio-placeholder.in',
    phoneDisplay: '+91 00000 00000 (Placeholder)',
    /** Digits only with country code, e.g. "919876543210". Leave empty while placeholder. */
    whatsappNumber: '',
    whatsappDisplayNote: 'WhatsApp number configurable in src/config/siteConfig.ts',
    whatsappDefaultMessage:
      'Hello Build It Once, I would like to discuss a website for my business.',
    officeLocation: 'Palakkad, Kerala, India',
    officeHours: 'Monday – Saturday, 9:30 AM – 6:30 PM IST',
    /**
     * Optional Form Endpoint (e.g., Formspree, Web3Forms, or custom API route).
     * Leave as null until a backend or form service is connected.
     */
    formEndpoint: null as string | null,
  },

  /**
   * Editable Social Links
   * Set url to your live profile URL and isPlaceholder to false once created.
   */
  social: {
    instagram: {
      label: 'Instagram',
      handle: '@builditonce.placeholder',
      url: '#contact',
      isPlaceholder: true,
    },
    facebook: {
      label: 'Facebook',
      handle: 'fb.com/builditonce.placeholder',
      url: '#contact',
      isPlaceholder: true,
    },
  },

  navigation: [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'Our Work', href: '#work' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ] as NavLinkItem[],

  hero: {
    kicker: 'Web Design & Digital Studio · Palakkad, Kerala',
    headline: 'Good businesses deserve great websites.',
    supportingText:
      'We help small businesses build a professional online presence through thoughtfully designed websites that look exceptional, work beautifully and make sense for your budget.',
    primaryCta: 'Build Your Website',
    secondaryCta: 'Explore Our Work',
    showcaseImage: '/src/assets/images/hero_studio_showcase_1795338776869.jpg',
    showcaseAlt:
      'Desktop monitor, tablet, and smartphone displaying minimalist website designs for a cafe, a boutique store, and an interior design studio on a warm stone desk',
  },

  valueProposition: {
    kicker: 'Our Promise',
    headline: "Professional doesn't have to mean expensive.",
    lead: 'We believe every business deserves a well-designed website, irrespective of its size or budget. Large agency fees should never stand between a hardworking local business and a trustworthy online presence.',
    pillars: [
      {
        number: '01',
        title: 'Thoughtful Design',
        description:
          'Websites that make your business look professional, credible, and welcoming from the very first glance.',
      },
      {
        number: '02',
        title: 'Practical Pricing',
        description:
          'Transparent, sensible packages designed specifically around small-business budgets without hidden surprises.',
      },
      {
        number: '03',
        title: 'Built to Last',
        description:
          'Responsive, fast, and easy-to-maintain websites engineered with long-term clarity and usability in mind.',
      },
    ],
  },

  services: [
    {
      id: 'business-websites',
      number: '01',
      title: 'Business Websites',
      shortDescription:
        'Professional, clear websites for small and medium businesses built to earn customer trust and bring in enquiries.',
      overview:
        'A complete multi-section or multi-page website tailored to how your customers discover and evaluate your business. Designed for clarity on phones and desktops alike.',
      idealFor: 'Local businesses, clinics, restaurants, service providers, and growing firms',
      typicalTimeline: '2 – 3 weeks',
      deliverables: [
        'Custom brand-aligned visual layout',
        'Mobile-first responsive build across all screens',
        'Service pages, about story, and clear contact paths',
        'WhatsApp click-to-chat and Google Maps integration',
        'Foundational on-page SEO and speed optimisation',
      ],
      formTypeValue: 'Business Website',
    },
    {
      id: 'landing-pages',
      number: '02',
      title: 'Landing Pages',
      shortDescription:
        'Conversion-focused single-page websites designed for launches, promotions, products, and specific services.',
      overview:
        'A focused single-page experience structured to guide visitors smoothly from introduction to action—whether that is booking an appointment, calling, or sending a WhatsApp message.',
      idealFor: 'New ventures, seasonal campaigns, clinics, consultants, and product launches',
      typicalTimeline: '1 – 2 weeks',
      deliverables: [
        'Focused single-page editorial architecture',
        'Clear value proposition and enquiry call-to-action',
        'Fast loading performance on mobile networks',
        'Direct enquiry form and WhatsApp button',
        'Clean search-friendly page metadata',
      ],
      formTypeValue: 'Landing Page',
    },
    {
      id: 'ecommerce-websites',
      number: '03',
      title: 'E-commerce Websites',
      shortDescription:
        'Clean, straightforward online stores that help local shops and independent brands sell products online.',
      overview:
        'An approachable online storefront where your products take centre stage, making browsing, ordering, and customer support simple for shoppers and manageable for your team.',
      idealFor: 'Boutiques, bakeries, specialty retailers, handloom and home-grown brands',
      typicalTimeline: '3 – 5 weeks',
      deliverables: [
        'Clean product catalogue and category browsing',
        'Mobile-friendly cart and checkout or WhatsApp ordering flow',
        'Product photography framing and clear pricing layout',
        'Inventory and order management guidance',
        'Basic SEO for product discoverability',
      ],
      formTypeValue: 'E-commerce Website',
    },
    {
      id: 'portfolio-websites',
      number: '04',
      title: 'Portfolio Websites',
      shortDescription:
        'Refined digital portfolios for individuals, freelancers, architects, photographers, and creative professionals.',
      overview:
        'An uncluttered, gallery-like digital showcase that lets your finished work speak with authority and gives potential clients a clear way to get in touch.',
      idealFor: 'Interior designers, architects, photographers, writers, and independent consultants',
      typicalTimeline: '1 – 2 weeks',
      deliverables: [
        'Editorial project grid and full-screen gallery views',
        'Clean project case-study templates',
        'Personal bio, credentials, and direct enquiry section',
        'Fast image optimisation for sharp visual quality',
        'Easy-to-update project structure',
      ],
      formTypeValue: 'Portfolio Website',
    },
    {
      id: 'website-redesign',
      number: '05',
      title: 'Website Redesign',
      shortDescription:
        'Transform outdated, cluttered, or slow websites into calm, modern digital experiences that reflect where your business is today.',
      overview:
        'We keep what works about your existing brand while modernising layout, mobile usability, page speed, and content structure so your business makes a sharper impression.',
      idealFor: 'Established businesses whose current website feels dated or hard to use on phones',
      typicalTimeline: '2 – 3 weeks',
      deliverables: [
        'Audit of current site structure and mobile pain points',
        'Complete visual and typographic refresh',
        'Improved navigation and clearer customer enquiry paths',
        'Performance cleanup and updated SEO foundations',
        'Smooth transition without losing existing web presence',
      ],
      formTypeValue: 'Website Redesign',
    },
    {
      id: 'website-maintenance',
      number: '06',
      title: 'Website Maintenance',
      shortDescription:
        'Reliable updates, content changes, refinements, and ongoing technical care so your website stays dependable.',
      overview:
        'A good website should stay accurate as your business evolves. We offer straightforward ongoing care for text updates, new offerings, backups, and periodic health checks.',
      idealFor: 'Business owners who want a trusted partner on call without hiring an in-house team',
      typicalTimeline: 'Monthly or as-needed care',
      deliverables: [
        'Regular content, menu, price, and photo updates',
        'Periodic performance, link, and mobile checks',
        'Security updates and reliable backup monitoring',
        'Priority support via WhatsApp or email',
        'Small layout refinements as your business grows',
      ],
      formTypeValue: 'Website Maintenance',
    },
  ] as ServiceItem[],

  /**
   * Portfolio Projects
   * ------------------
   * Currently populated with studio demonstration Concept Projects.
   * To replace with a live client project, update the entry and set `isConcept: false`.
   */
  portfolio: [
    {
      id: 'concept-cafe',
      title: 'The Daily Grind',
      industry: 'Restaurant & Cafe',
      category: 'Hospitality',
      isConcept: true,
      shortDescription:
        'A warm, inviting digital home for an artisanal cafe featuring seasonal menus, location details, and effortless table reservations.',
      detailedSummary:
        'Designed to capture the calm warmth of a neighbourhood specialty cafe. Visitors immediately see today’s menu highlights, opening hours, and a straightforward reservation path without digging through clunky PDFs.',
      highlights: [
        'Mobile-first scannable menu layout',
        'Direct table reservation and WhatsApp inquiry flow',
        'Editorial food photography framing and warm palette',
      ],
      deviceScope: 'Desktop & Mobile Web',
      imageUrl: '/src/assets/images/concept_restaurant_cafe_1795338775786.jpg',
      imageAlt: 'Laptop displaying a refined artisanal cafe website concept on a travertine table',
      suggestedService: 'Business Website',
    },
    {
      id: 'concept-boutique',
      title: 'Luna & Loom',
      industry: 'Boutique & Clothing Store',
      category: 'Retail',
      isConcept: true,
      shortDescription:
        'An airy e-commerce storefront for a handloom and contemporary linen boutique built for calm browsing on mobile and desktop.',
      detailedSummary:
        'Crafted for independent apparel stores that want their fabrics and craftsmanship to shine. Clean product cards, uncluttered category filtering, and an easy mobile shopping flow keep focus on the collection.',
      highlights: [
        'Clean collection grid with crisp garment photography',
        'Synchronised desktop and mobile shopping experience',
        'Story-led brand section highlighting local craftsmanship',
      ],
      deviceScope: 'E-commerce Storefront',
      imageUrl: '/src/assets/images/concept_boutique_store_1795338777709.jpg',
      imageAlt: 'Desktop display and smartphones showing a minimalist handloom clothing boutique online store concept',
      suggestedService: 'E-commerce Website',
    },
    {
      id: 'concept-construction',
      title: 'Foundation Residential',
      industry: 'Construction Company',
      category: 'Architecture & Build',
      isConcept: true,
      shortDescription:
        'A grounded, trustworthy web presence for a residential builder showcasing completed projects, engineering standards, and consultation requests.',
      detailedSummary:
        'Homeowners choose builders based on trust and clarity. This concept pairs crisp photography of completed residences with structured service explanations and a clear project inquiry pathway.',
      highlights: [
        'Structured showcase of completed residential builds',
        'Clear explanation of process, materials, and standards',
        'High-trust editorial layout built to earn site-visit enquiries',
      ],
      deviceScope: 'Multi-Page Business Site',
      imageUrl: '/src/assets/images/concept_construction_firm_1795338777565.jpg',
      imageAlt: 'Desktop screen displaying a modern residential construction firm website concept on a walnut desk',
      suggestedService: 'Business Website',
    },
    {
      id: 'concept-interior',
      title: 'Studio Luma',
      industry: 'Interior Design Studio',
      category: 'Architecture & Build',
      isConcept: true,
      shortDescription:
        'A gallery-inspired portfolio website allowing completed residential spaces to breathe with refined typography and generous whitespace.',
      detailedSummary:
        'Built for interior designers and architects who need their spaces to speak first. Features clean project chapters, tactile neutral tones, and seamless tablet presentation for client meetings.',
      highlights: [
        'Curated editorial project chapters with clean typography',
        'Tablet-ready portfolio gallery for in-person client reviews',
        'Quiet consultation booking flow without visual clutter',
      ],
      deviceScope: 'Portfolio & Tablet Showcase',
      imageUrl: '/src/assets/images/concept_interior_studio_1795338774741.jpg',
      imageAlt: 'Desktop display and tablet showing an editorial interior design studio portfolio concept',
      suggestedService: 'Portfolio Website',
    },
    {
      id: 'concept-clinic',
      title: 'Hearthside Dental & Wellness',
      industry: 'Healthcare Clinic',
      category: 'Healthcare',
      isConcept: true,
      shortDescription:
        'A calm, reassuring clinic website with clear doctor profiles, treatment explanations, clinic timings, and simple appointment requests.',
      detailedSummary:
        'Patients searching for care want reassurance and immediate answers. This concept removes medical clutter in favour of welcoming photography, transparent doctor credentials, and effortless online booking.',
      highlights: [
        'Approachable doctor introductions and credentials',
        'Simple online appointment request and clinic timings',
        'High-contrast, accessible typography for every age group',
      ],
      deviceScope: 'Clinic Booking Website',
      imageUrl: '/src/assets/images/concept_healthcare_clinic_1795338777205.jpg',
      imageAlt: 'Laptop displaying a serene modern healthcare and dental clinic website concept',
      suggestedService: 'Business Website',
    },
    {
      id: 'concept-local-service',
      title: 'Oak & Stone Craftsmanship',
      industry: 'Local Service Business',
      category: 'Local Services',
      isConcept: true,
      shortDescription:
        'A crisp, practical service website for bespoke carpentry and home improvement with transparent starting estimates and fast quote requests.',
      detailedSummary:
        'Local service businesses win when customers immediately understand what is offered and how to reach out. This concept highlights core services, clear starting tiers, and one-tap mobile contact.',
      highlights: [
        'Clear service breakdown without industry jargon',
        'Transparent starting price guide to build early trust',
        'One-tap mobile quote and WhatsApp contact integration',
      ],
      deviceScope: 'Desktop & Mobile Web',
      imageUrl: '/src/assets/images/concept_local_service_1795338776657.jpg',
      imageAlt: 'Laptop and smartphone displaying a local bespoke carpentry and home services website concept',
      suggestedService: 'Business Website',
    },
  ] as PortfolioProject[],

  pricing: {
    kicker: 'Transparent Investment',
    headline: 'Good websites. Sensible investments.',
    lead: 'Honest packages built around what small businesses genuinely need. Every website receives the same care in typography, mobile responsiveness, and thoughtful craft—no shortcuts.',
    disclaimer:
      'Displayed figures are editable placeholder indicators in INR. Final pricing depends on project requirements, page scope, content readiness, and additional features. We always provide a clear written quote before starting.',
    packages: [
      {
        id: 'starter',
        name: 'Starter',
        tagline: 'For getting your business online.',
        pricePlaceholder: '₹XX,XXX',
        priceNote: 'Editable placeholder · Starting estimate',
        features: [
          'Single-page website',
          'Mobile responsive design',
          'Essential business information',
          'Contact and WhatsApp integration',
          'Basic SEO setup',
        ],
        budgetOptionValue: 'Starter Package (Single-Page)',
        ctaLabel: 'Inquire About Starter',
      },
      {
        id: 'business',
        name: 'Business',
        tagline: 'For businesses ready to grow.',
        pricePlaceholder: '₹XX,XXX',
        priceNote: 'Editable placeholder · Most chosen by local businesses',
        highlighted: true,
        features: [
          'Multi-page website',
          'Custom design tailored to your brand',
          'Services and portfolio sections',
          'Contact form and WhatsApp integration',
          'Basic SEO setup',
          'Google Maps integration where relevant',
        ],
        budgetOptionValue: 'Business Package (Multi-Page)',
        ctaLabel: 'Inquire About Business',
      },
      {
        id: 'growth',
        name: 'Growth',
        tagline: 'For businesses looking for more.',
        pricePlaceholder: '₹XX,XXX+',
        priceNote: 'Editable placeholder · Custom scope',
        features: [
          'Advanced custom website',
          'Additional tailored functionality',
          'E-commerce or booking features where applicable',
          'SEO foundations',
          'Performance optimisation',
          'Extended post-launch support',
        ],
        budgetOptionValue: 'Growth Package (Custom / E-commerce)',
        ctaLabel: 'Inquire About Growth',
      },
    ] as PricingPackage[],
  },

  whyUs: {
    kicker: 'Why Build It Once',
    headline: 'Built with purpose. Designed for the long run.',
    philosophy:
      'We believe a website should be more than something that simply exists online. It should represent your business, build trust and make it easier for customers to connect with you.',
    points: [
      {
        title: 'No unnecessary complexity',
        detail: 'Plain language, sensible tools, and a smooth process—never technical jargon or bloated features you do not need.',
      },
      {
        title: 'Honest and transparent pricing',
        detail: 'Clear estimates agreed upfront so you know exactly what is included before we begin.',
      },
      {
        title: 'Personal attention to every project',
        detail: 'You work directly with the studio designing and building your website, from first conversation to launch.',
      },
      {
        title: 'Modern, responsive design',
        detail: 'Crafted to look sharp and load cleanly on the smartphones your local customers actually use every day.',
      },
      {
        title: 'Practical solutions for real businesses',
        detail: 'Every button, page, and contact option is shaped around helping customers trust you and reach out easily.',
      },
    ],
  },

  process: {
    kicker: 'How We Work',
    headline: 'A calm, clear path from conversation to launch.',
    steps: [
      {
        number: '01',
        title: 'Understand',
        description:
          'We learn about your business, your customers, and what your website needs to accomplish.',
      },
      {
        number: '02',
        title: 'Design',
        description:
          'We create a clean, thoughtful design that reflects your brand and makes your services easy to understand.',
      },
      {
        number: '03',
        title: 'Build',
        description:
          'We develop, test across phones and desktops, and optimise your website for speed and clarity.',
      },
      {
        number: '04',
        title: 'Launch',
        description:
          'We take your website live and guide you through everything you need to get started confidently.',
      },
    ] as ProcessStep[],
  },

  about: {
    kicker: 'About the Studio',
    headline: 'A small studio with a simple philosophy.',
    paragraphs: [
      'Build It Once was created with a simple belief: professional digital experiences should be accessible to every business.',
      'We work closely with entrepreneurs and small businesses to transform their ideas into clean, functional and professional websites.',
      'Our focus is not on making things unnecessarily complicated. It is on understanding your business, building the right solution and delivering genuine value.',
    ],
    facts: [
      { label: 'Based in', value: 'Palakkad, Kerala, India' },
      { label: 'Focus', value: 'Small Businesses & Independent Brands' },
      { label: 'Approach', value: 'Direct Collaboration, Built Once, Built Right' },
    ],
  },

  faqs: [
    {
      id: 'cost',
      question: 'How much does a website cost?',
      answer:
        'Costs depend on whether you need a focused single-page website, a multi-page business site, or additional features such as e-commerce or booking. We keep our packages practical for small-business budgets and share a transparent, itemised quote in INR after a short conversation about your goals.',
    },
    {
      id: 'timeline',
      question: 'How long does it take to build a website?',
      answer:
        'A focused Starter or single-page website typically takes 1 to 2 weeks once your business information and photos are ready. Multi-page Business websites generally take 2 to 3 weeks, and Growth or E-commerce websites take 3 to 5 weeks.',
    },
    {
      id: 'mobile',
      question: 'Will my website work on mobile phones?',
      answer:
        'Yes. Most local customers will visit your website on their phone first. Every website we build is designed mobile-first so text is readable, buttons are easy to tap, and WhatsApp or call actions work smoothly on all screen sizes.',
    },
    {
      id: 'self-update',
      question: 'Can I update my website myself?',
      answer:
        'Yes. We structure projects cleanly and can set up straightforward content editing if you want to make regular updates yourself. If you prefer not to worry about edits at all, we can also handle updates for you whenever needed.',
    },
    {
      id: 'domain-hosting',
      question: 'Do you provide domain and hosting?',
      answer:
        'We guide you through selecting and setting up a reliable domain name (such as yourbusiness.in or .com) and dependable hosting registered in your own business name—so you always retain full ownership and control.',
    },
    {
      id: 'maintenance',
      question: 'Do you provide website maintenance?',
      answer:
        'Yes. We offer optional ongoing maintenance and support for text or photo updates, seasonal changes, performance checks, and technical peace of mind—either on a simple monthly plan or as needed.',
    },
    {
      id: 'redesign',
      question: 'Can you redesign my existing website?',
      answer:
        'Absolutely. If your current website feels outdated, cluttered, or difficult to use on mobile phones, we can redesign it from the ground up while keeping your domain name and core business information intact.',
    },
    {
      id: 'outside-palakkad',
      question: 'Do you work with businesses outside Palakkad?',
      answer:
        'Yes. While we are based in Palakkad and love meeting local business owners in person across Kerala, we work smoothly with entrepreneurs and small businesses anywhere in India via phone, WhatsApp, and video calls.',
    },
  ] as FaqItem[],

  contactFormOptions: {
    websiteTypes: [
      'Business Website',
      'Landing Page',
      'E-commerce Website',
      'Portfolio Website',
      'Website Redesign',
      'Website Maintenance',
      'Not sure yet — need guidance',
    ],
    budgetRanges: [
      'Starter Package (Single-Page)',
      'Business Package (Multi-Page)',
      'Growth Package (Custom / E-commerce)',
      'Website Maintenance / Updates',
      'Not sure yet — request custom quote',
    ],
  },
};

export function buildWhatsAppHref(customMessage?: string): string | null {
  const cleanNumber = siteConfig.contact.whatsappNumber.replace(/[^\d]/g, '');
  if (!cleanNumber) {
    return null;
  }
  const message = encodeURIComponent(customMessage || siteConfig.contact.whatsappDefaultMessage);
  return `https://wa.me/${cleanNumber}?text=${message}`;
}
