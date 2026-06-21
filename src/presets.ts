import { ColorPalette, TypographySettings, Section } from './types';

export interface PresetTheme {
  id: string;
  name: string;
  description: string;
  category: 'Clean Professional Themes' | 'Custom Designs' | 'Shopping/Store';
  colors: ColorPalette;
  typography: TypographySettings;
  sections?: Section[];
}

export const PRESET_THEMES: PresetTheme[] = [
  {
    id: 'warm-editorial',
    name: 'Warm Editorial',
    description: 'A cozy, high-end organic feel with warm tones and elegant serif headlines. Inspired by classic modern publishers.',
    category: 'Clean Professional Themes',
    colors: {
      primaryBg: '#FAF6F0',
      secondaryBg: '#F3ECE0',
      textColor: '#413A36',
      headingColor: '#261E1A',
      primaryButtonBg: '#8B6A4F',
      primaryButtonText: '#FAF6F0',
      secondaryButtonBg: '#EFE5D7',
      secondaryButtonText: '#413A36',
      dividerColor: '#E6DAD0',
      navBg: '#FAF6F0',
      navText: '#261E1A',
    },
    typography: {
      title: { family: 'Playfair Display', weight: '700', size: '48px', letterSpacing: '-0.02em' },
      heading: { family: 'Playfair Display', weight: '600', size: '24px', letterSpacing: '-0.01em' },
      body: { family: 'Inter', weight: '400', size: '14px', letterSpacing: '0' },
    },
  },
  {
    id: 'lilac-dream',
    name: 'Lilac Dreams',
    description: 'Soft, feminine pastel palettes featuring rounded, fashionable typography for agency portfolios and modern creators.',
    category: 'Clean Professional Themes',
    colors: {
      primaryBg: '#FAF8FC',
      secondaryBg: '#F2ECF7',
      textColor: '#3A323F',
      headingColor: '#533B63',
      primaryButtonBg: '#8E73A6',
      primaryButtonText: '#FFFFFF',
      secondaryButtonBg: '#E9DFF0',
      secondaryButtonText: '#533B63',
      dividerColor: '#E3DAE9',
      navBg: '#FAF8FC',
      navText: '#533B63',
    },
    typography: {
      title: { family: 'Outfit', weight: '700', size: '48px', letterSpacing: '-0.03em' },
      heading: { family: 'Outfit', weight: '600', size: '24px', letterSpacing: '-0.02em' },
      body: { family: 'Outfit', weight: '400', size: '14px', letterSpacing: '0' },
    },
  },
  {
    id: 'retro-cyber',
    name: 'Cyber Mono',
    description: 'A striking neon tech blueprint layout on high-contrast absolute dark canvas. Perfect for developers and retro gear nerds.',
    category: 'Clean Professional Themes',
    colors: {
      primaryBg: '#0A0C10',
      secondaryBg: '#121620',
      textColor: '#A0AEC0',
      headingColor: '#38BDF8',
      primaryButtonBg: '#0EA5E9',
      primaryButtonText: '#0A0C10',
      secondaryButtonBg: '#1F2937',
      secondaryButtonText: '#38BDF8',
      dividerColor: '#1E293B',
      navBg: '#0A0C10',
      navText: '#38BDF8',
    },
    typography: {
      title: { family: 'Space Grotesk', weight: '700', size: '44px', letterSpacing: '-0.01em' },
      heading: { family: 'Space Grotesk', weight: '600', size: '24px', letterSpacing: '0' },
      body: { family: 'JetBrains Mono', weight: '400', size: '13px', letterSpacing: '0' },
    },
  },
  {
    id: 'sage-minimal',
    name: 'Sage Minimalist',
    description: 'Quiet, peaceful and professional with soft green backgrounds and clean spacing. Elegant and corporate.',
    category: 'Clean Professional Themes',
    colors: {
      primaryBg: '#F4F7F5',
      secondaryBg: '#E8EFEA',
      textColor: '#2E3A31',
      headingColor: '#1A291E',
      primaryButtonBg: '#4A5D4E',
      primaryButtonText: '#FFFFFF',
      secondaryButtonBg: '#DBE5DE',
      secondaryButtonText: '#1A291E',
      dividerColor: '#D1DDD6',
      navBg: '#FFFFFF',
      navText: '#1A291E',
    },
    typography: {
      title: { family: 'Inter', weight: '700', size: '48px', letterSpacing: '-0.03em' },
      heading: { family: 'Inter', weight: '600', size: '24px', letterSpacing: '-0.02em' },
      body: { family: 'Inter', weight: '400', size: '14px', letterSpacing: '0' },
    },
  },
  {
    id: 'coral-peach',
    name: 'Coral Peach',
    description: 'Sun-drenched, high-energy beachside aesthetic combining crisp coral buttons, amber highlights, and warm gray backdrops.',
    category: 'Clean Professional Themes',
    colors: {
      primaryBg: '#FFF7F4',
      secondaryBg: '#FEECE5',
      textColor: '#4D3631',
      headingColor: '#E04A30',
      primaryButtonBg: '#E04A30',
      primaryButtonText: '#FFFFFF',
      secondaryButtonBg: '#FFDDD0',
      secondaryButtonText: '#4D3631',
      dividerColor: '#F8D1C4',
      navBg: '#FFF7F4',
      navText: '#E04A30',
    },
    typography: {
      title: { family: 'Outfit', weight: '800', size: '48px', letterSpacing: '-0.02em' },
      heading: { family: 'Outfit', weight: '700', size: '24px', letterSpacing: '-0.01em' },
      body: { family: 'Inter', weight: '400', size: '14px', letterSpacing: '0' },
    },
  },

  // ===== NEW CATEGORY: CUSTOM DESIGNS =====
  {
    id: 'custom-pets-vets',
    name: "Pets and Vet's",
    description: 'A bubbly, energetic earth and cloud layout designed for pet welfare centers, animal clinics, and grooming lounges.',
    category: 'Custom Designs',
    colors: {
      primaryBg: '#FAF7F5',
      secondaryBg: '#F2ECE6',
      textColor: '#5C4E43',
      headingColor: '#2B1E15',
      primaryButtonBg: '#E07A5F',
      primaryButtonText: '#FAF7F5',
      secondaryButtonBg: '#F2CC8F',
      secondaryButtonText: '#2B1E15',
      dividerColor: '#E6DAD0',
      navBg: '#FAF7F5',
      navText: '#2B1E15',
    },
    typography: {
      title: { family: 'Quicksand', weight: '700', size: '44px', letterSpacing: '-0.01em' },
      heading: { family: 'Quicksand', weight: '600', size: '22px', letterSpacing: '0' },
      body: { family: 'Inter', weight: '400', size: '14px', letterSpacing: '0' },
    },
    sections: [
      {
        id: 'pet-hero',
        type: 'hero',
        title: 'Compassionate Care for Family Pets',
        subtitle: 'Our world-renowned veterinary surgeons and nurses treat every pet with gentle hands, playful energy, and premium medical backing.',
        content: 'From comprehensive puppy physical reviews to emergency surgical diagnostics, our modern suite is open 24/7 to cover your loved companions.',
        imageUrl: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80',
        bannerOpacity: 50,
        ctaText: 'Schedule Appointment',
        ctaUrl: '#appointment',
      },
      {
        id: 'pet-split',
        type: 'split',
        title: 'Where Happy Tails Start Their Recovery',
        subtitle: 'Bespoke clinical equipment designed for zero-stress exams.',
        content: 'We avoid cold metal tables. All diagnostic suites are outfitted with comfortable warm mats, adaptive lighting, and visual cues that ease cats and dogs into safe veterinary evaluations without triggering standard travel anxiety.',
        imageUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80',
        imagePosition: 'right',
        ctaText: 'Explore Diagnostics',
        ctaUrl: '#services',
      },
      {
        id: 'pet-features',
        type: 'features',
        title: 'Complete Care Specialties',
        subtitle: 'Pioneering holistic care structures for pets of all sizes',
        items: [
          { id: 'pf-1', title: 'Wellness Checks', description: 'Preventative diagnostics, custom nutrition advice, and state vaccine updates.' },
          { id: 'pf-2', title: 'Surgical Excellence', description: 'Specialized low-impact surgery using digital anesthesia monitoring for speedy recoveries.' },
          { id: 'pf-3', title: 'Pampered Boarding', description: 'Interactive play enclosures staffed by certified veterinarians, with high-definition webcam feeds.' }
        ]
      }
    ]
  },
  {
    id: 'custom-spa-1',
    name: 'Spa #1',
    description: 'A cozy, ultra-calm aesthetic prioritizing lavender purples, gentle milk soaps and cream toners for cosmetic beauty creators.',
    category: 'Custom Designs',
    colors: {
      primaryBg: '#FAF8F6',
      secondaryBg: '#F4EEE9',
      textColor: '#706056',
      headingColor: '#4A3D36',
      primaryButtonBg: '#8C7C96',
      primaryButtonText: '#FAF8F6',
      secondaryButtonBg: '#E2D9E4',
      secondaryButtonText: '#4A3D36',
      dividerColor: '#EAE1DB',
      navBg: '#FAF8F6',
      navText: '#4A3D36',
    },
    typography: {
      title: { family: 'Cormorant Garamond', weight: '700', size: '52px', letterSpacing: '-0.02em' },
      heading: { family: 'Cormorant Garamond', weight: '600', size: '26px', letterSpacing: '-0.01em' },
      body: { family: 'Inter', weight: '400', size: '14px', letterSpacing: '0' },
    },
    sections: [
      {
        id: 'spa1-hero',
        type: 'hero',
        title: 'Sensory Sanctuary of Pure Botanical Soaps',
        subtitle: 'Restore a peaceful state of relaxation to your daily skincare cycle with handcrafted lavender elements made from local cottage farms.',
        content: 'Zero chemicals, organic shea butter bases, and slow-aged cold process techniques that preserve healing oils.',
        imageUrl: 'https://images.unsplash.com/photo-1605264964521-300ed3f3d353?auto=format&fit=crop&w=1200&q=80',
        bannerOpacity: 50,
        ctaText: 'Browse Organic Soaps',
        ctaUrl: '#catalog',
      },
      {
        id: 'spa1-split',
        type: 'split',
        title: 'Infused with Real Lavender Extract',
        subtitle: 'Nourishment that restores moisture and calms irritation',
        content: 'Each custom soap slice contains whole lavender grains and triple-milled floral oils. Our proprietary formula helps restore healthy epidermal moisture while surrounding your bathroom with mild, restorative lavender vapor.',
        imageUrl: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80',
        imagePosition: 'left',
        ctaText: 'View Botanical Scent Guide',
        ctaUrl: '#scents',
      },
      {
        id: 'spa1-features',
        type: 'features',
        title: 'Our Natural Craft Philosophy',
        subtitle: 'Conscientious soaps created in tiny batches with direct garden ingredients',
        items: [
          { id: 'sf-1', title: '100% Vegan Bases', description: 'Sustainably sourced palm, coconut, and olive oil, completely free from aggressive artificial lathering agents.' },
          { id: 'sf-2', title: 'Skin Balance Therapies', description: 'Specifically structured pH balances formulated for hyper-sensitive or dry skin types.' },
          { id: 'sf-3', title: 'Compostable Packaging', description: 'Wrapped in beautiful linen paper boxes printed with organic, non-toxic soy inks.' }
        ]
      }
    ]
  },
  {
    id: 'custom-beach-vacation',
    name: 'Beach Vacation',
    description: 'Vibrant, sea-blue seaside layout framing real estate rentals, vacation packages, and shoreline ocean listings.',
    category: 'Custom Designs',
    colors: {
      primaryBg: '#F7FBFD',
      secondaryBg: '#EDF5F9',
      textColor: '#415E6D',
      headingColor: '#1E4357',
      primaryButtonBg: '#3A9DBE',
      primaryButtonText: '#FFFFFF',
      secondaryButtonBg: '#D1E6EF',
      secondaryButtonText: '#1E4357',
      dividerColor: '#DBECF4',
      navBg: '#F7FBFD',
      navText: '#1E4357',
    },
    typography: {
      title: { family: 'Outfit', weight: '800', size: '48px', letterSpacing: '-0.02em' },
      heading: { family: 'Outfit', weight: '700', size: '24px', letterSpacing: '-0.01em' },
      body: { family: 'DM Sans', weight: '400', size: '14px', letterSpacing: '0' },
    },
    sections: [
      {
        id: 'beach-hero',
        type: 'hero',
        title: 'Stunning Oceanfront Villas for Restful Getaways',
        subtitle: 'Indulge in cozy coastal living. Our select vacation properties feature direct beach access, sun-drenched pool terraces, and panoramic water horizons.',
        content: 'Stay weeks or months on sandy dunes with supercharged Wi-Fi support, customized luxury catering, and private beach loungers.',
        imageUrl: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1200&q=80',
        bannerOpacity: 50,
        ctaText: 'Book Summer Stay',
        ctaUrl: '#booking',
      },
      {
        id: 'beach-split',
        type: 'split',
        title: 'Escape to Your Calm Oasis',
        subtitle: 'Unobstructed visual panoramas of the sparkling blue tides',
        content: 'Our villas are built around floor-to-ceiling visual glass portals. Wake up to gentle marine breezes, enjoy espresso on your floating timber veranda, and stroll straight down to your secluded sandy cove in seconds.',
        imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
        imagePosition: 'right',
        ctaText: 'View Virtual Floor Plans',
        ctaUrl: '#villas',
      },
      {
        id: 'beach-features',
        type: 'features',
        title: 'Premium Seaside Amenities',
        subtitle: 'Experience true coastal hospitality with fully managed facilities',
        items: [
          { id: 'bf-1', title: 'Panoramic Ocean Pools', description: 'Infinity heated salt-water pools that seem to float directly into the blue horizon.' },
          { id: 'bf-2', title: 'Local Chef Dinners', description: 'In-villa gourmet food preparation featuring fresh catches sourced locally each morning.' },
          { id: 'bf-3', title: 'Water Activities', description: 'Complementary carbon paddleboards, kayaking gear, and guided deep-reef snorkel tours.' }
        ]
      }
    ]
  },
  {
    id: 'custom-restauranteer',
    name: 'restauranteer',
    description: 'An aggressive, moody street-food theme combining deep ambers, dark woods, and modern bold typography for food trucks.',
    category: 'Custom Designs',
    colors: {
      primaryBg: '#FCFBF9',
      secondaryBg: '#F4ECE4',
      textColor: '#4D433A',
      headingColor: '#211B15',
      primaryButtonBg: '#D35400',
      primaryButtonText: '#FCFBF9',
      secondaryButtonBg: '#E9C4A6',
      secondaryButtonText: '#211B15',
      dividerColor: '#E6DDD4',
      navBg: '#FDFCFB',
      navText: '#D35400',
    },
    typography: {
      title: { family: 'Space Grotesk', weight: '700', size: '44px', letterSpacing: '-0.02em' },
      heading: { family: 'Space Grotesk', weight: '600', size: '24px', letterSpacing: '-0.01em' },
      body: { family: 'Inter', weight: '400', size: '14px', letterSpacing: '0' },
    },
    sections: [
      {
        id: 'rest-hero',
        type: 'hero',
        title: 'Artisan Wood-Fired Food Truck Creations',
        subtitle: 'We craft slow-cooked brisket slides, flame-grilled glaze patties, and custom hand-seasoned hand-cut fries directly on wheels.',
        content: 'Check our live calendar tracking to find our street kitchen setup at local craft microbreweries, plazas, and city markets.',
        imageUrl: 'https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?auto=format&fit=crop&w=1200&q=80',
        bannerOpacity: 50,
        ctaText: 'Locate Our Truck Today',
        ctaUrl: '#tracker',
      },
      {
        id: 'rest-split',
        type: 'split',
        title: 'Mastering the Flame & Smoke Combo',
        subtitle: 'Gourmet street food items built with sustainable local cuts',
        content: 'Our double-patty sliders feature fresh brioche buns baked locally every morning, caramelized red sweet onions, aged sharp cheddar, and a secret hickory molasses reduction sauce that leaves patrons lining up daily.',
        imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80',
        imagePosition: 'left',
        ctaText: 'See Full Menus & Prices',
        ctaUrl: '#menu',
      },
      {
        id: 'rest-features',
        type: 'features',
        title: 'Why Foodies Track Us Down',
        subtitle: 'Redefining street-side cooking standards in every gourmet box',
        items: [
          { id: 'rf-1', title: '100% Wood-Fired', description: 'Zero gas, zero flat-tops. We grill using genuine applewood charcoal for authentic rich barbecue aroma.' },
          { id: 'rf-2', title: 'Eco-Friendly Carts', description: 'Our custom kitchens run on hybrid solar batteries with clean, recyclable container boxes.' },
          { id: 'rf-3', title: 'Locally Harvested', description: 'Partnering directly with local family farms to guarantee organic greens & hand-selected potatoes.' }
        ]
      }
    ]
  },
  {
    id: 'custom-robo-site',
    name: 'Robo-Site',
    description: 'A striking high-tech dark interface with neon sky highlights, styled for personal AI mentors and algorithmic trainers.',
    category: 'Custom Designs',
    colors: {
      primaryBg: '#0F172A',
      secondaryBg: '#1E293B',
      textColor: '#94A3B8',
      headingColor: '#38BDF8',
      primaryButtonBg: '#38BDF8',
      primaryButtonText: '#0F172A',
      secondaryButtonBg: '#334155',
      secondaryButtonText: '#38BDF8',
      dividerColor: '#1E293B',
      navBg: '#0F172A',
      navText: '#38BDF8',
    },
    typography: {
      title: { family: 'Space Grotesk', weight: '700', size: '44px', letterSpacing: '-0.02em' },
      heading: { family: 'Space Grotesk', weight: '600', size: '22px', letterSpacing: '0' },
      body: { family: 'JetBrains Mono', weight: '400', size: '13px', letterSpacing: '0' },
    },
    sections: [
      {
        id: 'robo-hero',
        type: 'hero',
        title: 'Accelerate Personal Milestones with AI Coaching',
        subtitle: 'Our algorithmic micro-learning models analyze your daily workflows, energy curves, and project goals to auto-generate personalized peak performance blueprints.',
        content: 'Zero theory, continuous feedback. Connect your workspaces to map progress tracking with intelligent algorithmic telemetry analysis.',
        imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
        bannerOpacity: 50,
        ctaText: 'Initiate Free Evaluation',
        ctaUrl: '#ai-advisor',
      },
      {
        id: 'robo-split',
        type: 'split',
        title: 'Real-time Analytical Feedback',
        subtitle: 'Understand your biological and behavioral energy blocks',
        content: 'Our system tracks attention patterns and blocks distracting activity. Through gentle algorithmic vibration notifications and scheduled mindfulness pauses, you complete deep focus sprints without reaching energy burnout.',
        imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
        imagePosition: 'right',
        ctaText: 'Review System Specs',
        ctaUrl: '#features',
      },
      {
        id: 'robo-features',
        type: 'features',
        title: 'Algorithmic Optimization Blocks',
        subtitle: 'Data-driven lifestyle design engineered for the tech-fluent generation',
        items: [
          { id: 'rof-1', title: 'Cognitive Scheduling', description: 'Auto-allocating complex technical tasks into custom high-energy alert windows.' },
          { id: 'rof-2', title: 'Biometric Correlation', description: 'Correlate resting heart rates and screen fatigue to balance rest periods.' },
          { id: 'rof-3', title: 'Privacy First Tech', description: 'Local encrypted database profiles ensure your workflow metrics remain entirely private.' }
        ]
      }
    ]
  },
  {
    id: 'custom-spa-2',
    name: 'Spa #2',
    description: 'Delicate aesthetic rose and floral setting, tailored for cosmetic salons, dermis clinics and high-contrast skin treatments.',
    category: 'Custom Designs',
    colors: {
      primaryBg: '#FFFBFB',
      secondaryBg: '#FFF3F3',
      textColor: '#6B4E55',
      headingColor: '#4A2E35',
      primaryButtonBg: '#C88C9A',
      primaryButtonText: '#FFFBFB',
      secondaryButtonBg: '#F9DCE2',
      secondaryButtonText: '#4A2E35',
      dividerColor: '#F2D8DC',
      navBg: '#FFFBFB',
      navText: '#C88C9A',
    },
    typography: {
      title: { family: 'Cinzel', weight: '700', size: '44px', letterSpacing: '-0.02em' },
      heading: { family: 'Playfair Display', weight: '600', size: '24px', letterSpacing: '0' },
      body: { family: 'Plus Jakarta Sans', weight: '400', size: '13px', letterSpacing: '0' },
    },
    sections: [
      {
        id: 'spa2-hero',
        type: 'hero',
        title: 'Nourish Your Skin & Awaken Natural Glow',
        subtitle: 'Discover elite facial micro-therapies, gentle enzyme organic peels, and restorative cosmetic massages designed to refresh skin vigor.',
        content: 'Our luxurious state-licensed salon provides a tranquil retreat where clinical expertise matches pure botanical luxury.',
        imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80',
        bannerOpacity: 50,
        ctaText: 'Request Glam Tour',
        ctaUrl: '#booking',
      },
      {
        id: 'spa2-split',
        type: 'split',
        title: 'Bespoke Anti-Fatigue Facial Packs',
        subtitle: 'Hydration that penetrates deep to restore cell elasticity',
        content: 'We combine cold-pressed botanicals with micro-current muscle toning techniques. Our custom face masks adapt immediately to calm stressed dermal layers, leaving your cheekbones beautifully highlighted with a natural clean glow.',
        imageUrl: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=800&q=80',
        imagePosition: 'left',
        ctaText: 'Behold Service Menu',
        ctaUrl: '#salon-menu',
      },
      {
        id: 'spa2-features',
        type: 'features',
        title: 'Exclusive Dermal Treatments',
        subtitle: 'Restore harmony to your body through ancient botanical therapies',
        items: [
          { id: 'spf-1', title: 'Hyaluronic Peels', description: 'Fruit-acid enzymic exfoliations that sweep dead cells to reveal polished fresh layers.' },
          { id: 'spf-2', title: 'Sculpt & Contour', description: 'Intricate physical massage patterns that stimulate lymphatic drainage to shape your jawline.' },
          { id: 'spf-3', title: 'Mineral Hydrating Mist', description: 'Deep botanical hydration that restores natural balance after long flight travel or sun wear.' }
        ]
      }
    ]
  },
  {
    id: 'custom-mocktails',
    name: 'Mocktails',
    description: 'Juicy, fruit-saturated layout featuring lemon greens and citrus ambers for plant seltzers, cocktail lounges and bars.',
    category: 'Custom Designs',
    colors: {
      primaryBg: '#FCFDF7',
      secondaryBg: '#F5F8EC',
      headingColor: '#1E350E',
      textColor: '#45523A',
      primaryButtonBg: '#8DC63F',
      primaryButtonText: '#FFFFFF',
      secondaryButtonBg: '#E4EFCF',
      secondaryButtonText: '#1E350E',
      dividerColor: '#E1ECBA',
      navBg: '#FCFDF7',
      navText: '#1E350E',
    },
    typography: {
      title: { family: 'Outfit', weight: '800', size: '48px', letterSpacing: '-0.02em' },
      heading: { family: 'Outfit', weight: '700', size: '24px', letterSpacing: '-0.01em' },
      body: { family: 'DM Sans', weight: '405', size: '14px', letterSpacing: '0' },
    },
    sections: [
      {
        id: 'mock-hero',
        type: 'hero',
        title: 'Sophisticated Zero-Proof Botanicals & Juice Elixirs',
        subtitle: 'Re-imagine social gatherings with crisp woodsy mocktails, slow-pressed citrus extracts, and natural fizzy botanical-infused seltzers.',
        content: 'Zero synthetic sweeteners, direct garden herbs, and organic sparkling mountain springs bottled fresh weekly.',
        imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1200&q=80',
        bannerOpacity: 50,
        ctaText: 'Discover Flavor Profiles',
        ctaUrl: '#seltzer',
      },
      {
        id: 'mock-split',
        type: 'split',
        title: 'Citrus, Mint, & Cold-Pressed Botanicals',
        subtitle: 'Vibrant, low-sugar refreshments packed with mineral energy',
        content: 'Our flagship recipe unites organic squeezed lemon juice, organic fresh ginger-root reductions, and fresh-clipped sweet rosemary sprigs. Lightly carbonated, it provides a highly satisfying herbal experience without standard sugars.',
        imageUrl: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=800&q=80',
        imagePosition: 'right',
        ctaText: 'Order Bulk Box',
        ctaUrl: '#shop-juices',
      },
      {
        id: 'mock-features',
        type: 'features',
        title: 'Why Botanical Spirits Rule',
        subtitle: 'Elegant ingredients hand-selected for zero-hangover premium gatherings',
        items: [
          { id: 'mcf-1', title: 'Zero Artificial Additives', description: 'Our mocktails derive their brilliant sweet profiles directly from organic monk fruit and real berries.' },
          { id: 'mcf-2', title: 'Prebiotic Backing', description: 'Each seltzer bottle incorporates organic dietary apple fibers that actively support digestion wellness.' },
          { id: 'mcf-3', title: 'Social Integration', description: 'Chic classic labels that feel beautiful in your hands at upscale cocktail events.' }
        ]
      }
    ]
  },
  {
    id: 'custom-chocolate-love',
    name: 'Chocolate LOVE',
    description: 'Sumptuous, rich velvet chocolate palette framing premium organic cocoa blocks and elegant home baker assets.',
    category: 'Custom Designs',
    colors: {
      primaryBg: '#FAF5F2',
      secondaryBg: '#EFE5DF',
      textColor: '#5C3E31',
      headingColor: '#3D2114',
      primaryButtonBg: '#5B3224',
      primaryButtonText: '#FAF5F2',
      secondaryButtonBg: '#DEC9BE',
      secondaryButtonText: '#3D2114',
      dividerColor: '#E5D5CD',
      navBg: '#FAF5F2',
      navText: '#5B3224',
    },
    typography: {
      title: { family: 'Lora', weight: '700', size: '44px', letterSpacing: '-0.01em' },
      heading: { family: 'Playfair Display', weight: '600', size: '24px', letterSpacing: '0' },
      body: { family: 'Inter', weight: '400', size: '14px', letterSpacing: '0' },
    },
    sections: [
      {
        id: 'choco-hero',
        type: 'hero',
        title: 'Single-Origin, Bean-To-Bar Craft Chocolate LOVE',
        subtitle: 'Taste the profound velvet complexity of organic cocoa harvested from sustainable micro-estates in Madagascar and Ecuador.',
        content: 'We slow-roast whole cocoa beans and stone-grind them for 72 consecutive hours, preserving delicious notes of wild raspberries and warm honeycomb.',
        imageUrl: 'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=1200&q=80',
        bannerOpacity: 50,
        ctaText: 'Explore Chocolate Bars',
        ctaUrl: '#bars',
      },
      {
        id: 'choco-split',
        type: 'split',
        title: 'Handcrafted Chocolate Dark Slabs',
        subtitle: 'Rich dark bars scattered with toasted almond slivers',
        content: 'Our flagship 74% cocoa bar strikes an excellent balance between structural texture, bitterness, and sweet sugarcane. Sprinkled lightly with sea-salt crystals, it melts cleanly, creating a luxurious sensory experience for gourmands.',
        imageUrl: 'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=800&q=80',
        imagePosition: 'left',
        ctaText: 'Shop Special Holiday Gift Boxes',
        ctaUrl: '#gift-boxes',
      },
      {
        id: 'choco-features',
        type: 'features',
        title: 'The Artisan Cocoa Lifecycle',
        subtitle: 'Meticulous chocolate production with full supply-chain transparency',
        items: [
          { id: 'chof-1', title: 'Fair Trade Sourcing', description: 'We pay 50% above market rates to ensure local cocoa growers thrive with stable wages.' },
          { id: 'chof-2', title: 'Stone-Ground Smooth', description: 'Traditional granite grinders process our beans, preserving earthy undertones without heat friction.' },
          { id: 'chof-3', title: 'No Artificial Chemicals', description: 'Organic ingredients only. Free from heavy soy lecithin fats and synthetic flavor dusts.' }
        ]
      }
    ]
  },
  {
    id: 'custom-childrens-book',
    name: 'Childrens Book',
    description: 'Whimsical warm tones and friendly typography designed for fairytale illustrated stories, family books, and bed readings.',
    category: 'Custom Designs',
    colors: {
      primaryBg: '#FEFBF3',
      secondaryBg: '#FAF3E0',
      textColor: '#7A5E51',
      headingColor: '#6A4A3C',
      primaryButtonBg: '#F0A500',
      primaryButtonText: '#FEFBF3',
      secondaryButtonBg: '#F7DBAC',
      secondaryButtonText: '#6A4A3C',
      dividerColor: '#EEDCBE',
      navBg: '#FEFBF3',
      navText: '#F0A500',
    },
    typography: {
      title: { family: 'Quicksand', weight: '700', size: '44px', letterSpacing: '-0.01em' },
      heading: { family: 'Quicksand', weight: '600', size: '24px', letterSpacing: '0' },
      body: { family: 'Quicksand', weight: '400', size: '14px', letterSpacing: '0' },
    },
    sections: [
      {
        id: 'book-hero',
        type: 'hero',
        title: 'Whimsical bedtime adventures for early reading years',
        subtitle: 'Our charming illustrated series features warm animal characters, rhythmic bedside rhymes, and beautiful hand-drawn landscapes.',
        content: 'Designed to spark lifelong reading love. Standard large-letter grids make it excellent for parent-child reading.',
        imageUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=1200&q=80',
        bannerOpacity: 50,
        ctaText: 'Discover Childrens Catalog',
        ctaUrl: '#books',
      },
      {
        id: 'book-split',
        type: 'split',
        title: 'Foster Boundless Childrens Creativity',
        subtitle: 'Books that spark young imaginations and healthy curiosity',
        content: 'Meet Ollie the owl and his cozy woodland companion crew! Through beautiful visual sketches and sweet moral chapters, children learn positive values of cooperation, patience, and direct kindness to woodland creatures.',
        imageUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80',
        imagePosition: 'right',
        ctaText: 'Listen To Sample Audio Chapters',
        ctaUrl: '#audio',
      },
      {
        id: 'book-features',
        type: 'features',
        title: 'Storybook Structural Features',
        subtitle: 'Thoughtful children books designed for small interactive hands',
        items: [
          { id: 'bkf-1', title: 'Hardy Wipeable Pages', description: 'Glossy thick board paper structures that easily withstand spills and rough handling.' },
          { id: 'bkf-2', title: 'Interactive Puzzles', description: 'Includes simple, fun maze challenges at the end of every story block to build focus.' },
          { id: 'bkf-3', title: 'Soothe Sleeptime Rhymes', description: 'Slow, peaceful vocabulary rhythms crafted to ease toddlers into calming, restorative sleep.' }
        ]
      }
    ]
  },
  {
    id: 'custom-childrens-page',
    name: "Children's Page",
    description: 'Bright, playful coral pink and playground yellow accents for preschool hubs, kids areas, and dynamic activity centers.',
    category: 'Custom Designs',
    colors: {
      primaryBg: '#FCFAF2',
      secondaryBg: '#F5F1E1',
      textColor: '#4E5E65',
      headingColor: '#2A3A40',
      primaryButtonBg: '#EF5B5B',
      primaryButtonText: '#FCFAF2',
      secondaryButtonBg: '#F6D55C',
      secondaryButtonText: '#2A3A40',
      dividerColor: '#EAE0CC',
      navBg: '#FCFAF2',
      navText: '#EF5B5B',
    },
    typography: {
      title: { family: 'Quicksand', weight: '700', size: '44px', letterSpacing: '-0.01em' },
      heading: { family: 'Quicksand', weight: '600', size: '22px', letterSpacing: '0' },
      body: { family: 'Inter', weight: '400', size: '14px', letterSpacing: '0' },
    },
    sections: [
      {
        id: 'kid-hero',
        type: 'hero',
        title: 'Unleash Massive Toddler Imaginations & Active Play',
        subtitle: 'Our colorful child-development play spaces are outfitted with soft sensory playgrounds, climbing zones, and creative painting rooms.',
        content: 'Fully supervised by licensed early-childhood educators. Safe, hygienic, and incredibly high-energy!',
        imageUrl: 'https://images.unsplash.com/photo-1566371486490-560ded239fe6?auto=format&fit=crop&w=1200&q=80',
        bannerOpacity: 50,
        ctaText: 'Schedule Facility Tour',
        ctaUrl: '#tour-booking',
      },
      {
        id: 'kid-split',
        type: 'split',
        title: 'Healthy Sensory Play & Dynamic Blocks',
        subtitle: 'Physical activities that develop balance, spatial awareness, and motor control',
        content: 'We provide bright interactive block sets and soft safety mats where preschoolers build towers, interact in group games, and develop coordination skills while socializing inside supportive mini team groupings.',
        imageUrl: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80',
        imagePosition: 'left',
        ctaText: 'View Daily Program Schedules',
        ctaUrl: '#schedule',
      },
      {
        id: 'kid-features',
        type: 'features',
        title: 'Safe Play Facility Highlights',
        subtitle: 'Meticulously structured environments prioritizing child security and learning',
        items: [
          { id: 'kdf-1', title: 'Certified Playground Supervisors', description: 'Every room is staffed by pediatric-first-aid certified educators.' },
          { id: 'kdf-2', title: 'Triple-Filtered Air Systems', description: 'Medical grade active HVAC filters cycle the air constantly to maintain health.' },
          { id: 'kdf-3', title: 'Organic Snack Pantries', description: 'Complimentary wholesome fruits and nut-free organic crackers for midday energy recharges.' }
        ]
      }
    ]
  },
  {
    id: 'custom-get-organized',
    name: 'Get organized',
    description: 'A monochrome grid-system layout mirroring personal Notion dashboards and clean life planners (Second Brain).',
    category: 'Custom Designs',
    colors: {
      primaryBg: '#FFFFFF',
      secondaryBg: '#F9F9FB',
      textColor: '#4A4A4A',
      headingColor: '#1A1A1A',
      primaryButtonBg: '#2E2E33',
      primaryButtonText: '#FFFFFF',
      secondaryButtonBg: '#E9E9EB',
      secondaryButtonText: '#1A1A1A',
      dividerColor: '#E3E3E6',
      navBg: '#FFFFFF',
      navText: '#2E2E33',
    },
    typography: {
      title: { family: 'Inter', weight: '700', size: '44px', letterSpacing: '-0.02em' },
      heading: { family: 'Inter', weight: '600', size: '24px', letterSpacing: '-0.01em' },
      body: { family: 'JetBrains Mono', weight: '400', size: '13px', letterSpacing: '0' },
    },
    sections: [
      {
        id: 'org-hero',
        type: 'hero',
        title: 'Structure Your Personal Knowledge Second Brain',
        subtitle: 'Stop drowning in scattered social bookmarks, loose note pads, and untracked projects. Centralize your knowledge framework with clean Notion-like systems.',
        content: 'A cohesive digital workspace engineered for fast capturing, systematic project tracking, and daily cognitive relief.',
        imageUrl: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=1200&q=80',
        bannerOpacity: 50,
        ctaText: 'Acquire Layout Preset',
        ctaUrl: '#acquisition',
      },
      {
        id: 'org-split',
        type: 'split',
        title: 'The PARA Framework in Action',
        subtitle: 'Divide your databases cleanly into Projects, Areas, Resources, and Archives',
        content: 'This structure aligns your thoughts in real-time. Actionable items are sorted in immediate work screens, while passive articles rest in highly indexable resource stacks, keeping your active daily planner clutter-free and fast to navigate.',
        imageUrl: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=800&q=80',
        imagePosition: 'right',
        ctaText: 'Study Organizing Basics',
        ctaUrl: '#para-tutorial',
      },
      {
        id: 'org-features',
        type: 'features',
        title: 'Second Brain Layout Features',
        subtitle: 'A minimal black-and-white grid designed for deep intellectual clarity',
        items: [
          { id: 'orgf-1', title: 'Modular Action Dashboards', description: 'Visual queues that isolate current tasks so you can check boxes off chronologically.' },
          { id: 'orgf-2', title: 'Frictionless Mobile Capture', description: 'Quick-entry links designed to write text into folders without needing full layout nesting.' },
          { id: 'orgf-3', title: 'Archive Storage Guidelines', description: 'Structured deep-storage files that tuck completed projects away, keeping active workspaces fast.' }
        ]
      }
    ]
  },

  // ===== COFFEE BAR (Inspired by fratelli-coffee-kwd) =====
  {
    id: 'custom-coffee-bar',
    name: 'Coffee Bar',
    description: 'A cozy espresso and specialty coffee setting. Rich browns, warm creams, and elegant serif typography designed for modern cafes and artisan roasters.',
    category: 'Custom Designs',
    colors: {
      primaryBg: '#FDFBF7',
      secondaryBg: '#F5EFEB',
      textColor: '#4E3629',
      headingColor: '#2B1408',
      primaryButtonBg: '#8C6239',
      primaryButtonText: '#FDFBF7',
      secondaryButtonBg: '#E9DDD4',
      secondaryButtonText: '#4E3629',
      dividerColor: '#EBE0D7',
      navBg: '#FDFBF7',
      navText: '#2B1408',
    },
    typography: {
      title: { family: 'Cormorant Garamond', weight: '700', size: '50px', letterSpacing: '-0.01em' },
      heading: { family: 'Cormorant Garamond', weight: '600', size: '26px', letterSpacing: '0' },
      body: { family: 'DM Sans', weight: '400', size: '14px', letterSpacing: '0' },
    },
    sections: [
      {
        id: 'coffee-hero',
        type: 'hero',
        title: 'Artisan Espresso & Cozy Conversations',
        subtitle: 'Our local micro-roastery sources fair-trade organic beans from high-altitude family plots in Ethiopia and Peru.',
        content: 'Slowly roasted, masterfully brewed. Join us every morning for single-origin espresso pulls, flaky chocolate croissants, and silent neighborhood workspaces.',
        imageUrl: 'https://images.unsplash.com/photo-1507133750040-4a8f57021571?auto=format&fit=crop&w=1200&q=80',
        bannerOpacity: 50,
        ctaText: 'Explore Daily Brews',
        ctaUrl: '#menu',
      },
      {
        id: 'coffee-split',
        type: 'split',
        title: 'Pioneering Slow Extraction Methods',
        subtitle: 'Every cup is a customized balance of temperature and flow rate',
        content: 'We adjust grind profiles Hourly based on dry indoor humidity to guarantee a flawless golden crema. Taste the subtle, natural notes of blackberry preserves, lemon zest, and raw honeycomb in every pour-over.',
        imageUrl: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80',
        imagePosition: 'left',
        ctaText: 'Our Roastery Process',
        ctaUrl: '#process',
      },
      {
        id: 'coffee-features',
        type: 'features',
        title: 'Custom Cafe Experiences',
        subtitle: 'More than a standard neighborhood brew station',
        items: [
          { id: 'cf-1', title: 'Single-Origin Flight', description: 'Sample three rare microlatitude coffee extractions guided by certified sensory baristas.' },
          { id: 'cf-2', title: 'Roastery Subscription', description: 'Freshly sealed whole bean bags shipped straight to your kitchen table within 48 hours of roasting.' },
          { id: 'cf-3', title: 'Community Lounges', description: 'Spacious work tables fitted with high-speed internet, silent zones, and accessible power docks.' }
        ]
      }
    ]
  },

  // ===== SPECIAL EVENT (Inspired by quattrocento-wedding-template) =====
  {
    id: 'custom-special-event',
    name: 'Special Event',
    description: 'An ethereal, delicate wedding and anniversary event layout utilizing luxury gold highlights, spacious frames, and light champagne backgrounds.',
    category: 'Custom Designs',
    colors: {
      primaryBg: '#FAF8F5',
      secondaryBg: '#F3EFEA',
      textColor: '#5E574F',
      headingColor: '#8C7456',
      primaryButtonBg: '#8C7456',
      primaryButtonText: '#FAF8F5',
      secondaryButtonBg: '#E9E3D8',
      secondaryButtonText: '#5E574F',
      dividerColor: '#EBE3D7',
      navBg: '#FAF8F5',
      navText: '#8C7456',
    },
    typography: {
      title: { family: 'Cinzel', weight: '600', size: '46px', letterSpacing: '0.04em' },
      heading: { family: 'Cinzel', weight: '500', size: '22px', letterSpacing: '0.02em' },
      body: { family: 'Lora', weight: '400', size: '14px', letterSpacing: '0' },
    },
    sections: [
      {
        id: 'event-hero',
        type: 'hero',
        title: 'A Dreamlike Feast on Tuscan Sandy Terraces',
        subtitle: 'Gather with beloved guests for a sun-drenched ceremony surrounded by wild rosemary gardens and olive groves.',
        content: 'From evening reception cocktails to sunrise private villa brunches, we celebrate eternal love with handcrafted details and romantic styling.',
        imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
        bannerOpacity: 50,
        ctaText: 'Access RSVP Hub',
        ctaUrl: '#rsvp',
      },
      {
        id: 'event-split',
        type: 'split',
        title: 'Sophisticated Tuscan Culinary Menus',
        subtitle: 'A local seasonal farm-to-table banquet custom-tailored for you',
        content: 'Delight in fresh hand-rolled lavender truffle gnocchi, local lemon-infused seaside sea bass, and sparkling champagne towers. Our menus highlight biodynamic orchards and rustic cottage cheeses produced directly on estate land.',
        imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80',
        imagePosition: 'right',
        ctaText: 'Read Food Agenda',
        ctaUrl: '#menu',
      },
      {
        id: 'event-features',
        type: 'features',
        title: 'Wedding Guest Travel Plans',
        subtitle: 'Coordinating guest transport and accommodation details beautifully',
        items: [
          { id: 'ef-1', title: 'Exclusive Estate Suites', description: 'Cozy modern cottage rooms reserved for wedding group attendees with private pool entries.' },
          { id: 'ef-2', title: 'Scenic Vineyard Tours', description: 'Optional pre-wedding afternoon grape harvest walk and private cellar tasting session.' },
          { id: 'ef-3', title: 'Shuttle Coordination', description: 'Scheduled limousine transport from local major airport terminals direct to the resort gate.' }
        ]
      }
    ]
  },

  // ===== PHOTO GALLERY (Inspired by imt-bosch-portfolio-template) =====
  {
    id: 'custom-photo-gallery',
    name: 'Photo Gallery',
    description: 'A striking minimalist monochrome canvas designed for visual storytellers, landscape shutterbugs, and commercial filmmakers.',
    category: 'Custom Designs',
    colors: {
      primaryBg: '#FFFFFF',
      secondaryBg: '#F3F4F6',
      textColor: '#1F2937',
      headingColor: '#111827',
      primaryButtonBg: '#111827',
      primaryButtonText: '#FFFFFF',
      secondaryButtonBg: '#E5E7EB',
      secondaryButtonText: '#1F2937',
      dividerColor: '#E5E7EB',
      navBg: '#FFFFFF',
      navText: '#111827',
    },
    typography: {
      title: { family: 'Space Grotesk', weight: '700', size: '52px', letterSpacing: '-0.03em' },
      heading: { family: 'Space Grotesk', weight: '600', size: '24px', letterSpacing: '-0.01em' },
      body: { family: 'Inter', weight: '400', size: '14px', letterSpacing: '0' },
    },
    sections: [
      {
        id: 'photo-hero',
        type: 'hero',
        title: 'Visual Frames Mapping Silent Horizons',
        subtitle: 'Fine art architectural and high-contrast landscape photography collections capturing the passing of light.',
        content: 'We freeze fleeting minutes on medium-format negative film scales. From mountain salt basins to brutalist metropolitan structures, each frame is printed on museum-grade cotton rag.',
        imageUrl: 'https://images.unsplash.com/photo-1452570053594-1b985d6ea890?auto=format&fit=crop&w=1200&q=80',
        bannerOpacity: 50,
        ctaText: 'View Print Gallery',
        ctaUrl: '#gallery',
      },
      {
        id: 'photo-split',
        type: 'split',
        title: 'Precision Mid-Format Technical Capture',
        subtitle: 'Utilizing optical tilt-shift controls to achieve absolute line alignment',
        content: 'We avoid crop digital sensors. Each print relies on 100-megapixel native medium-format architectural film backing. This preserves crisp brick elements, soft shadow transitions, and incredible black levels without digital artificial sharpening.',
        imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
        imagePosition: 'left',
        ctaText: 'Camera Accessories Used',
        ctaUrl: '#equipment',
      },
      {
        id: 'photo-features',
        type: 'features',
        title: 'Commercial Creative Services',
        subtitle: 'Tailored photography and visual curation for luxury global clients',
        items: [
          { id: 'pgf-1', title: 'Museum Art Prints', description: 'Individually signed, numbered silver gelatin prints paired with verification documents.' },
          { id: 'pgf-2', title: 'Luxury Location Shoots', description: 'Commercial lifestyle and hotel interior framing designed for premium digital magazines.' },
          { id: 'pgf-3', title: 'Lighting Masterclasses', description: 'Intimate weekend workshops explaining natural ambient shadows and complex studio grids.' }
        ]
      }
    ]
  },

  // ===== MY GARDEN (Inspired by plantshop) =====
  {
    id: 'custom-my-garden',
    name: 'My Garden',
    description: 'An organic plant, botanical garden, and seed nursery theme with cozy earthy tones, deep foliage green highlights, and terra-cotta warmth.',
    category: 'Custom Designs',
    colors: {
      primaryBg: '#FAF6F0',
      secondaryBg: '#EFF2EC',
      textColor: '#2E3F2F',
      headingColor: '#1A331E',
      primaryButtonBg: '#1A331E',
      primaryButtonText: '#FAF6F0',
      secondaryButtonBg: '#DEF0E1',
      secondaryButtonText: '#2E3F2F',
      dividerColor: '#E6DDD4',
      navBg: '#FAF6F0',
      navText: '#1A331E',
    },
    typography: {
      title: { family: 'Playfair Display', weight: '700', size: '48px', letterSpacing: '-0.01em' },
      heading: { family: 'Playfair Display', weight: '600', size: '24px', letterSpacing: '0' },
      body: { family: 'DM Sans', weight: '400', size: '14px', letterSpacing: '0' },
    },
    sections: [
      {
        id: 'garden-hero',
        type: 'hero',
        title: 'Bring Living Botanical Magic Into Light Spaces',
        subtitle: 'Discover healthy tropical specimen monsteras, rare snake cultivars, and nourishing organic soil essentials.',
        content: 'All green plants are slow-grown inside our humid neighborhood greenhouses under carefully managed solar schedules, establishing deep rot-resistant root structures for breezy home styling.',
        imageUrl: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&w=1200&q=80',
        bannerOpacity: 50,
        ctaText: 'Adopt Indoor Foliage',
        ctaUrl: '#catalog',
      },
      {
        id: 'garden-split',
        type: 'split',
        title: 'Nourish Soil with Earthy Nutrients',
        subtitle: 'Our custom-aged forest bark peat mix ensures optimal drainage',
        content: 'Yellowing leaves and damp root decay are most often caused by standard dense clay soils. Our hand-turned forest potting blends encourage optimal water airflow, maintaining resilient micro-ventilation so roots breathe freely between water cycles.',
        imageUrl: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80',
        imagePosition: 'right',
        ctaText: 'Read Soil Guide',
        ctaUrl: '#soils',
      },
      {
        id: 'garden-features',
        type: 'features',
        title: 'Garden Care Services',
        subtitle: 'Custom plant diagnostics and home installation consultations',
        items: [
          { id: 'gf-1', title: 'Lush Botanical Styling', description: 'Our consultants visit your workspace to curate species matching your windows and humidity levels.' },
          { id: 'gf-2', title: 'Soil Diagnostic Help', description: 'Bring a root sample to our clinic for microscopic insect checks and nutrient custom testing.' },
          { id: 'gf-3', title: 'Holiday Foliage Lodging', description: 'Traveling for weeks? Leave your delicate high-care monsteras inside our fully managed green suites.' }
        ]
      }
    ]
  },

  // ===== GARDEN/LAWN SERVICE (Inspired by gardening-service) =====
  {
    id: 'custom-garden-lawn',
    name: 'Garde/Lawn service',
    description: 'A crisp, professional look with rich forest greens, dark soil charcoal and clean grass-lime accents designed for landscape architects and estate care.',
    category: 'Custom Designs',
    colors: {
      primaryBg: '#F9FAF7',
      secondaryBg: '#EDF2EB',
      textColor: '#2E352C',
      headingColor: '#172714',
      primaryButtonBg: '#2D5A27',
      primaryButtonText: '#F9FAF7',
      secondaryButtonBg: '#DAE6D7',
      secondaryButtonText: '#2E352C',
      dividerColor: '#E2E6DF',
      navBg: '#F9FAF7',
      navText: '#172714',
    },
    typography: {
      title: { family: 'Outfit', weight: '800', size: '46px', letterSpacing: '-0.02em' },
      heading: { family: 'Outfit', weight: '700', size: '24px', letterSpacing: '-0.01em' },
      body: { family: 'Inter', weight: '400', size: '14px', letterSpacing: '0' },
    },
    sections: [
      {
        id: 'lawn-hero',
        type: 'hero',
        title: 'Impeccable Estate Care & Landscape Art',
        subtitle: 'We shape stunning lawn turfs, stone walkways, and vibrant flower displays for premier residential residences.',
        content: 'From seasonal soil diagnostic aeration to structural deep root fertilizing, our fully licensed landscape specialists maintain pristine outdoor beauty with quiet energy.',
        imageUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&w=1200&q=80',
        bannerOpacity: 50,
        ctaText: 'Request Season Quote',
        ctaUrl: '#quote',
      },
      {
        id: 'lawn-split',
        type: 'split',
        title: 'Precision Structural Topiary Shaping',
        subtitle: 'Our pruning techniques protect your plants from seasonal diseases',
        content: 'We avoid random shears. Our horticulturists slice branches at specific growth node points, encouraging maximum flower vitality while protecting sensitive core softwoods from seasonal fungal elements or weather frost damage.',
        imageUrl: 'https://images.unsplash.com/photo-1558905619-172542a916af?auto=format&fit=crop&w=800&q=80',
        imagePosition: 'left',
        ctaText: 'View Project Gallery',
        ctaUrl: '#projects',
      },
      {
        id: 'lawn-features',
        type: 'features',
        title: 'Our Specialist Capabilities',
        subtitle: 'Complete year-round estate management options',
        items: [
          { id: 'ls-1', title: 'Clay Soil Aeration', description: 'Core extraction techniques that break up hard clay, giving dry roots access to direct rainwater.' },
          { id: 'ls-2', title: 'Stone Walkway Layouts', description: 'Hand-set natural quartz flagstones laid over sand foundations to prevent frost buckling.' },
          { id: 'ls-3', title: 'Weed Foliage Shield', description: 'Eco-conscious preventative spraying that stops wild dandelions without harming bees or family pets.' }
        ]
      }
    ]
  },

  // ===== MY FARM (Inspired by smallfarm) =====
  {
    id: 'custom-my-farm',
    name: 'My Farm',
    description: 'A cozy agricultural look with rich sunflower gold, terracotta brick red, and field green tones made for family homesteads and organic farmer boxes.',
    category: 'Custom Designs',
    colors: {
      primaryBg: '#FAF6F2',
      secondaryBg: '#EFF5F0',
      textColor: '#413A35',
      headingColor: '#2B1E12',
      primaryButtonBg: '#C36A2D',
      primaryButtonText: '#FAF6F2',
      secondaryButtonBg: '#E9DDD4',
      secondaryButtonText: '#413A35',
      dividerColor: '#E6DAD0',
      navBg: '#FAF6F2',
      navText: '#2B1E12',
    },
    typography: {
      title: { family: 'Playfair Display', weight: '700', size: '48px', letterSpacing: '-0.01em' },
      heading: { family: 'Playfair Display', weight: '600', size: '24px', letterSpacing: '0' },
      body: { family: 'Lora', weight: '400', size: '14px', letterSpacing: '0' },
    },
    sections: [
      {
        id: 'farm-hero',
        type: 'hero',
        title: 'Farm-to-Table Organic Harvest Boxes',
        subtitle: 'Straight from our regenerative micro-farm, harvesting fresh heirloom greens and soil-grown seasonal root crops.',
        content: 'Taste sweet heirloom tomatoes, crisp kale stalks, and pasture-raised eggs collected at sunrise. Sign up for weekly countryside vegetable crates today.',
        imageUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80',
        bannerOpacity: 50,
        ctaText: 'Subscribe to Veg Crate',
        ctaUrl: '#subscribe',
      },
      {
        id: 'farm-split',
        type: 'split',
        title: 'Restoring Grass Soil with Rotational Grazing',
        subtitle: 'Our livestock actively feed on pasture grass, generating carbon-rich compost and aerating crop fields naturally',
        content: 'We avoid modern chemical fertilizer layers. Every plant we harvest gets its life from native worm castings and thick sheets of grass-compost, preserving natural taste profiles and deep antioxidants in every carrot.',
        imageUrl: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=800&q=80',
        imagePosition: 'right',
        ctaText: 'Regenerative Farm Facts',
        ctaUrl: '#heritage',
      },
      {
        id: 'farm-features',
        type: 'features',
        title: 'Farm Stand Fresh Offerings',
        subtitle: 'Hand-picked organic goods available at our weekend barn stand',
        items: [
          { id: 'mff-1', title: 'Farm-Fresh Jars', description: 'Artisanal lavender-infused honey, dark wild raspberry reserves, and local micro-greens.' },
          { id: 'mff-2', title: 'Pasture-Raised Eggs', description: 'Collected every morning from chickens grazing happily inside open wildflower fields.' },
          { id: 'mff-3', title: 'Homestead Bakery', description: 'Fresh warm Dutch farm bread loaves and spiced cinnamon buns baked on cast iron.' }
        ]
      }
    ]
  },

  // ===== MUSIC LESSONS (Inspired by music-school) =====
  {
    id: 'custom-music-lessons',
    name: 'Music Lessons',
    description: 'An elegant template using deep wine-burgundy accents, classic instrument browns, and premium serif typography designed for music schools.',
    category: 'Custom Designs',
    colors: {
      primaryBg: '#FDFBF9',
      secondaryBg: '#F5EFEB',
      textColor: '#403833',
      headingColor: '#5C1D24',
      primaryButtonBg: '#5C1D24',
      primaryButtonText: '#FDFBF9',
      secondaryButtonBg: '#E9DFD9',
      secondaryButtonText: '#403833',
      dividerColor: '#EADCD7',
      navBg: '#FDFBF9',
      navText: '#5C1D24',
    },
    typography: {
      title: { family: 'Cinzel', weight: '600', size: '44px', letterSpacing: '0.02em' },
      heading: { family: 'Cinzel', weight: '500', size: '22px', letterSpacing: '0.01em' },
      body: { family: 'Lora', weight: '400', size: '14px', letterSpacing: '0' },
    },
    sections: [
      {
        id: 'music-hero',
        type: 'hero',
        title: 'Unlock Your Creative Symphonic Talents',
        subtitle: 'Learn classic acoustic concert grand piano, classical acoustic violin, or modern acoustic fingerstyle guitar from award-winning faculty.',
        content: 'From complete starter finger techniques to complex jazz modal harmonies, we map personalized lesson paths that build deep motor skills in warm studio spaces.',
        imageUrl: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=1200&q=80',
        bannerOpacity: 50,
        ctaText: 'Schedule Audition Lesson',
        ctaUrl: '#audition',
      },
      {
        id: 'music-split',
        type: 'split',
        title: 'One-on-One Intimate Studio Training',
        subtitle: 'We avoid high-stress drilling. Our educators use positive reinforcement to guide students through real musical pieces.',
        content: 'Whether practicing difficult Mozart classical compositions or learning modern pop chords, our lesson structures emphasize physical relaxation, hand postures, and beautiful tone production.',
        imageUrl: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=800&q=80',
        imagePosition: 'left',
        ctaText: 'Meet School Instructors',
        ctaUrl: '#faculty',
      },
      {
        id: 'music-features',
        type: 'features',
        title: 'Curriculum Offerings',
        subtitle: 'Structured educational blocks designed to cultivate long-term artistry',
        items: [
          { id: 'mlf-1', title: 'Sight Reading', description: 'Advanced melodic training that unlocks complex manuscript scores without digital midi dependencies.' },
          { id: 'mlf-2', title: 'Improvisational Jazz', description: 'Explore pentatonic chord runs, rootless voicings, and real-time rhythmic phrasing.' },
          { id: 'mlf-3', title: 'Annual Concert Halls', description: 'Showcase your progress inside high-end professional concert halls on Steinway grand scales.' }
        ]
      }
    ]
  },

  // ===== FASHION MODEL (Inspired by model-portfolio) =====
  {
    id: 'custom-fashion-model',
    name: 'Fashion Model',
    description: 'A striking avant-garde look using pale rose-beige backdrops, graphic charcoal outlines, and stark ebony black button overlays.',
    category: 'Custom Designs',
    colors: {
      primaryBg: '#FAF7F5',
      secondaryBg: '#F3EDEA',
      textColor: '#2E2724',
      headingColor: '#1A1412',
      primaryButtonBg: '#1A1412',
      primaryButtonText: '#FAF7F5',
      secondaryButtonBg: '#E9E0DB',
      secondaryButtonText: '#2E2724',
      dividerColor: '#E6DAD4',
      navBg: '#FAF7F5',
      navText: '#1A1412',
    },
    typography: {
      title: { family: 'Syne', weight: '800', size: '52px', letterSpacing: '-0.03em' },
      heading: { family: 'Syne', weight: '700', size: '24px', letterSpacing: '-0.01em' },
      body: { family: 'Inter', weight: '400', size: '14px', letterSpacing: '0' },
    },
    sections: [
      {
        id: 'model-hero',
        type: 'hero',
        title: 'High-Fashion Editorial & Runway Staging',
        subtitle: 'A contemporary modeling portfolio highlighting vanguard runway walks, commercial lifestyle sets, and high-fashion branding shoots.',
        content: 'Collaborating with premier luxury fashion labels in Milan, Paris, and Tokyo. Explore raw conceptual imagery framed with striking minimalist negative spaces.',
        imageUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80',
        bannerOpacity: 50,
        ctaText: 'Access Bookings Portfolio',
        ctaUrl: '#portfolio',
      },
      {
        id: 'model-split',
        type: 'split',
        title: 'Vanguard Conceptual Runway Walks',
        subtitle: 'Expressing fashion details cleanly through deliberate postures',
        content: 'We represent architectural style edits. By maintaining precise body lines, fluid runway walks, and strong camera-gaze tracking, every fashion collection is highlighted cleanly under complex studio spotlight settings.',
        imageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
        imagePosition: 'right',
        ctaText: 'Review Brand Placements',
        ctaUrl: '#brands',
      },
      {
        id: 'model-features',
        type: 'features',
        title: 'Editorial Modeling Services',
        subtitle: 'Expert creative capabilities ready for high-concept fashion shoots',
        items: [
          { id: 'fmf-1', title: 'Haute Couture Runway', description: 'Expert poise and timing designed for luxury runway events.' },
          { id: 'fmf-2', title: 'Commercial Lifestyle', description: 'Vibrant, high-energy storytelling for organic beauty lines and luxury resort advertising.' },
          { id: 'fmf-3', title: 'Cosmetics & Beauty Carts', description: 'Macro-lens structural skin framing tailored for high-end facial cosmetic branding campaigns.' }
        ]
      }
    ]
  },

  // ==========================================
  // ===== NEW CATEGORY: SHOPPING/STORE ======
  // ==========================================

  // ===== HOLIDAY DECOR (Inspired by christmasdecor) =====
  {
    id: 'store-holiday-decor',
    name: 'Holiday Decor',
    description: 'Festive mistletoe greens, deep fireplace ruby hues, and sweet warm cedar textures carefully designed for artisanal holiday storefronts.',
    category: 'Shopping/Store',
    colors: {
      primaryBg: '#FDFBF9',
      secondaryBg: '#F3EDE9',
      textColor: '#40312E',
      headingColor: '#8C1E26',
      primaryButtonBg: '#8C1E26',
      primaryButtonText: '#FDFBF9',
      secondaryButtonBg: '#E9DDD7',
      secondaryButtonText: '#40312E',
      dividerColor: '#EBE0D7',
      navBg: '#FDFBF9',
      navText: '#8C1E26',
    },
    typography: {
      title: { family: 'Cinzel', weight: '700', size: '44px', letterSpacing: '0.04em' },
      heading: { family: 'Cinzel', weight: '600', size: '22px', letterSpacing: '0.02em' },
      body: { family: 'Lora', weight: '400', size: '14px', letterSpacing: '0' },
    },
    sections: [
      {
        id: 'holiday-hero',
        type: 'hero',
        title: 'Artisanal Hearth Wreaths & Holiday Glows',
        subtitle: 'Bring fragrant winter pine logs, handcrafted beeswax candles, and beautiful luxury velvet ribbon trimmings into your holiday house.',
        content: 'Each fresh pine wreath is hand-woven using responsibly harvested evergreen softwoods from local high-altitude Oregon farms.',
        imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80',
        bannerOpacity: 50,
        ctaText: 'Browse Wreath Store',
        ctaUrl: '#shop-wreaths',
      },
      {
        id: 'holiday-split',
        type: 'split',
        title: 'Hand-Poured Holiday Beeswax Tapers',
        subtitle: 'Scented sweet rosemary and pine needles to soothe cool winter evenings',
        content: 'We melt raw yellow honeycombs down slowly and filter them twice through organic flax filters. This produces a bright, natural sweet honey-mellow flame that burns cleanly without generating black chemical smoke loops.',
        imageUrl: 'https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80',
        imagePosition: 'left',
        ctaText: 'Shop Pine Candles',
        ctaUrl: '#shop-candles',
      },
      {
        id: 'holiday-features',
        type: 'features',
        title: 'Store Collection Highlights',
        subtitle: 'Explore sweet festive accessories shipped with care',
        items: [
          { id: 'hdf-1', title: 'Wool Wreath Ribbons', description: 'Vibrant garnet velvet ribbons hand-torn in our workshop to add cozy charm.' },
          { id: 'hdf-2', title: 'Handmade Ornaments', description: 'Delicate glass spheres containing real dried cedar leaves and dried berry sprigs.' },
          { id: 'hdf-3', title: 'Scented Pine Sachets', description: 'Place these sweet burlap packs near doorways to spread botanical holiday forest aromas.' }
        ]
      }
    ]
  },

  // ===== COSMETICS (Inspired by cosmeticsshop) =====
  {
    id: 'store-cosmetics',
    name: 'Cosmetics',
    description: 'A light blush-pink layout featuring cream peptide tones, premium gold accents, and clean modern typography for luxury skincare stores.',
    category: 'Shopping/Store',
    colors: {
      primaryBg: '#FDF9F8',
      secondaryBg: '#F7EFF1',
      textColor: '#574244',
      headingColor: '#8C5662',
      primaryButtonBg: '#8C5662',
      primaryButtonText: '#FDF9F8',
      secondaryButtonBg: '#EFDDDE',
      secondaryButtonText: '#574244',
      dividerColor: '#EBE0DE',
      navBg: '#FDF9F8',
      navText: '#8C5662',
    },
    typography: {
      title: { family: 'Outfit', weight: '700', size: '48px', letterSpacing: '-0.02em' },
      heading: { family: 'Outfit', weight: '600', size: '24px', letterSpacing: '-0.01em' },
      body: { family: 'Inter', weight: '400', size: '14px', letterSpacing: '0' },
    },
    sections: [
      {
        id: 'cosm-hero',
        type: 'hero',
        title: 'Active Peptide Serums & Botanic Glows',
        subtitle: 'Nourish your delicate skin cycle using our clean, clinical plant-peptide serums and certified vegan facial tonics.',
        content: 'Infused with cold-extracted chamomile oils and dynamic hyaluronic complexes to restore structural glow from the direct soil.',
        imageUrl: 'https://images.unsplash.com/photo-1608248597481-496100c80836?auto=format&fit=crop&w=1200&q=80',
        bannerOpacity: 50,
        ctaText: 'Shop Peptide Serum',
        ctaUrl: '#shop-serum',
      },
      {
        id: 'cosm-split',
        type: 'split',
        title: '100% Conscious Skin Nourishing Formulas',
        subtitle: 'Zero chemical fillers, zero synthetic scents. We preserve oil purity.',
        content: 'Our lab crafts active skin tonics using organic squalane harvested directly from sugarcane crops. Tested clinically under expert dermatological guidelines to soothe redness on sensitive or dry face areas without burning.',
        imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
        imagePosition: 'right',
        ctaText: 'Our Skincare Science',
        ctaUrl: '#skincare-science',
      },
      {
        id: 'cosm-features',
        type: 'features',
        title: 'Premium Organic Essentials',
        subtitle: 'Explore dermatologically certified solutions for glowing daily cycles',
        items: [
          { id: 'csf-1', title: 'Chamomile Skin Balms', description: 'Calm evening redness with direct herbal oils whipped with organic shea butter.' },
          { id: 'csf-2', title: 'Algae Eye Serums', description: 'Tighten skin barriers with active marine-kelp extracts packed with deep vitamins.' },
          { id: 'csf-3', title: 'Mineral Facial Mists', description: 'Supercharge hydration with pure rosewater and micro-nutrient mountain minerals.' }
        ]
      }
    ]
  },

  // ===== HERBALIST (Inspired by handmade-soap-shop) =====
  {
    id: 'store-herbalist',
    name: 'Herbalist',
    description: 'An earthy clay and thyme-green rustic design styled for botanical soap shops, wild herb apothecaries, and wellness creators.',
    category: 'Shopping/Store',
    colors: {
      primaryBg: '#FAF6EF',
      secondaryBg: '#EFF2EC',
      textColor: '#4E483F',
      headingColor: '#2D3F2D',
      primaryButtonBg: '#2D3F2D',
      primaryButtonText: '#FAF6EF',
      secondaryButtonBg: '#DEF0E1',
      secondaryButtonText: '#4E483F',
      dividerColor: '#E6DDD4',
      navBg: '#FAF6EF',
      navText: '#2D3F2D',
    },
    typography: {
      title: { family: 'Cormorant Garamond', weight: '700', size: '52px', letterSpacing: '-0.01em' },
      heading: { family: 'Cormorant Garamond', weight: '600', size: '26px', letterSpacing: '0' },
      body: { family: 'DM Sans', weight: '400', size: '14px', letterSpacing: '0' },
    },
    sections: [
      {
        id: 'herb-hero',
        type: 'hero',
        title: 'Cold-Process Botanical Soaps & Wild Balms',
        subtitle: 'Hand-stirred botanical bars, rosemary herbal scrubs, and mountain salt mineral baths made in small family batches.',
        content: 'Rich in organic plant glycerin and therapeutic lavender oil extracts to cleanse skin pores without stripping natural skin barriers.',
        imageUrl: 'https://images.unsplash.com/photo-1607006342411-9a3363f63012?auto=format&fit=crop&w=1200&q=80',
        bannerOpacity: 50,
        ctaText: 'Browse Soap Catalog',
        ctaUrl: '#soap-shop',
      },
      {
        id: 'herb-split',
        type: 'split',
        title: 'Why We Avoid Synthetic Sulfer Foams',
        subtitle: 'Our cold-process technique cures slowly for 6 full weeks',
        content: 'Mass-market soap bars strip skin moisture with harsh chemical detergents. Our apothecary melts pure golden olive oils and botanical seeds at low heat, allowing them to age for six weeks to create a gentle, moisturizing lather.',
        imageUrl: 'https://images.unsplash.com/photo-1546554137-f86b9593a222?auto=format&fit=crop&w=800&q=80',
        imagePosition: 'left',
        ctaText: 'Meet Our Soapmaker',
        ctaUrl: '#about-apothecary',
      },
      {
        id: 'herb-features',
        type: 'features',
        title: 'Handcrafted apothecary goods',
        subtitle: 'Nourish your skin cells with native garden herb extracts',
        items: [
          { id: 'hbf-1', title: 'Oat Honey Bars', description: 'Gently exfoliative ground organic oats bound with direct mountain honeyclover.' },
          { id: 'hbf-2', title: 'Wild Nettle Vapor Balms', description: 'Herbaceous eucalyptus salves that calm congested sinuses on cool winter evenings.' },
          { id: 'hbf-3', title: 'Cedar Wood Bath Flakes', description: 'Dead sea mineral salts loaded with forest pine oils for an immersive mountain steam.' }
        ]
      }
    ]
  },

  // ===== BAKERY (Inspired by cakery) =====
  {
    id: 'store-bakery',
    name: 'Bakery',
    description: 'Artisanal sourdough and buttercream pink whimsy. Sweet wheat-gold borders, soft vanilla overlays, and elegant editorial fonts.',
    category: 'Shopping/Store',
    colors: {
      primaryBg: '#FDFBF7',
      secondaryBg: '#F7EDEC',
      textColor: '#4E3A37',
      headingColor: '#BF5C69',
      primaryButtonBg: '#BF5C69',
      primaryButtonText: '#FDFBF7',
      secondaryButtonBg: '#EFDFDE',
      secondaryButtonText: '#4E3A37',
      dividerColor: '#EBE1D7',
      navBg: '#FDFBF7',
      navText: '#BF5C69',
    },
    typography: {
      title: { family: 'Playfair Display', weight: '700', size: '48px', letterSpacing: '-0.01em' },
      heading: { family: 'Playfair Display', weight: '600', size: '24px', letterSpacing: '0' },
      body: { family: 'DM Sans', weight: '400', size: '14px', letterSpacing: '0' },
    },
    sections: [
      {
        id: 'bakery-hero',
        type: 'hero',
        title: 'Sweet Powdered Tarts & Slow Sourdough Slices',
        subtitle: 'Our morning bakers wake at 3:00 AM to hand-fold warm golden croissants, sweet berry tarts, and real wild-yeast sourdough.',
        content: 'Warm butter, organic stoneground grain flours, and zero artificial preservatives. Walk in or reserve weekend custom cake boxes online.',
        imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80',
        bannerOpacity: 50,
        ctaText: 'Order Sweet Pastries',
        ctaUrl: '#pastry-pastries',
      },
      {
        id: 'bakery-split',
        type: 'split',
        title: 'Classic 24-Hour Sourdough Leavening',
        subtitle: 'Stretching dough strands by hand to capture perfect air pockets',
        content: 'Patience produces the best sourdough crumb structure. Our standard starter wheat base has been fed daily for over seven consecutive years, giving our loaves a complex golden crust and easily digestible mineral nourishment properties.',
        imageUrl: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=800&q=80',
        imagePosition: 'right',
        ctaText: 'Loaf Baking Schedule',
        ctaUrl: '#schedule-loaf',
      },
      {
        id: 'bakery-features',
        type: 'features',
        title: 'Artisanal Cafe Menus',
        subtitle: 'Fresh confectioneries baked with high-grade local dairy farms',
        items: [
          { id: 'bcf-1', title: 'Raspberry French Macarons', description: 'Crisp ground-almond shells sandwiching local organic raspberry pectin preserves.' },
          { id: 'bcf-2', title: 'Triple Butter Croissants', description: 'Laminated flake pastries made using authentic grass-fed pasture churn butter.' },
          { id: 'bcf-3', title: 'Custom Birthday Tiers', description: 'Work with pastry chefs to draft delicious organic lavender-sponge cakes for weddings.' }
        ]
      }
    ]
  },

  // ===== ADRENELYN (Inspired by skydivingdesign) =====
  {
    id: 'store-adrenelyn',
    name: 'Adrenelyn',
    description: 'Electric cyan skies, hazard sign orange, and carbon black. An aggressive high-octane setup for skydiving and mountain sports.',
    category: 'Shopping/Store',
    colors: {
      primaryBg: '#111827',
      secondaryBg: '#1F2937',
      textColor: '#E5E7EB',
      headingColor: '#FF6B00',
      primaryButtonBg: '#FF6B00',
      primaryButtonText: '#111827',
      secondaryButtonBg: '#06B6D4',
      secondaryButtonText: '#111827',
      dividerColor: '#374151',
      navBg: '#111827',
      navText: '#FF6B00',
    },
    typography: {
      title: { family: 'Syne', weight: '800', size: '54px', letterSpacing: '-0.03em' },
      heading: { family: 'Syne', weight: '700', size: '26px', letterSpacing: '-0.01em' },
      body: { family: 'JetBrains Mono', weight: '400', size: '13px', letterSpacing: '0' },
    },
    sections: [
      {
        id: 'sky-hero',
        type: 'hero',
        title: 'Accelerate Terminal Speeds at 14,000 FT',
        subtitle: 'Experience extreme 120-MPH tandem skydives or enroll in our accelerated solo freefall wingsuit license program.',
        content: 'All skydiving rigs are fitted with modern digital secondary altimeters and automated parachute release computers to guarantee safety.',
        imageUrl: 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1200&q=80',
        bannerOpacity: 50,
        ctaText: 'Book Active Jump',
        ctaUrl: '#book-jump',
      },
      {
        id: 'sky-split',
        type: 'split',
        title: 'Automated Cyber Canopy Safety Deploy',
        subtitle: 'Certified military canopy rigs that track speed coordinates instantly',
        content: 'We prioritize air safety. Our core parachute packs are inspected rigid weekly by FAA-licensed rigging specialists and carry direct mechanical computer triggers that deploy relief canopies automatically if you lose visual altitude tracking.',
        imageUrl: 'https://images.unsplash.com/photo-1508615070457-7baebe4003ab?auto=format&fit=crop&w=800&q=80',
        imagePosition: 'left',
        ctaText: 'Aircraft & Tech Specs',
        ctaUrl: '#aircraft-details',
      },
      {
        id: 'sky-features',
        type: 'features',
        title: 'Jump Training Options',
        subtitle: 'Flexible progression paths designed for thrillseekers and solo flyers',
        items: [
          { id: 'sjf-1', title: 'Tandem Jump Starter', description: 'Strap in with master instructors for an easy, breathtaking 60-second raw freefall.' },
          { id: 'sjf-2', title: 'Solo Skydiving AFF', description: 'A detailed 7-level structural school teaching stable air maneuvers and solo landings.' },
          { id: 'sjf-3', title: 'Freefall Video Reels', description: 'Our air cameramen dive alongside you to record spectacular high-definition photos.' }
        ]
      }
    ]
  },

  // ===== ARTSY FARTSY (Inspired by artgallery) =====
  {
    id: 'store-artsy-fartsy',
    name: 'Artsy Fartsy',
    description: 'Modern cobalt ink, pure canvas linen backdrops, and turmeric highlights. Perfect for avant-garde galleries and painting collections.',
    category: 'Shopping/Store',
    colors: {
      primaryBg: '#FAF8F5',
      secondaryBg: '#EFF2F6',
      textColor: '#1E242B',
      headingColor: '#1E40AF',
      primaryButtonBg: '#1E40AF',
      primaryButtonText: '#FAF8F5',
      secondaryButtonBg: '#F59E0B',
      secondaryButtonText: '#1E242B',
      dividerColor: '#E2E8F0',
      navBg: '#FAF8F5',
      navText: '#1E40AF',
    },
    typography: {
      title: { family: 'Space Grotesk', weight: '750', size: '50px', letterSpacing: '-0.02em' },
      heading: { family: 'Space Grotesk', weight: '600', size: '24px', letterSpacing: '-0.01em' },
      body: { family: 'Inter', weight: '400', size: '14px', letterSpacing: '0' },
    },
    sections: [
      {
        id: 'artsy-hero',
        type: 'hero',
        title: 'Vibrant Abstract Oils & Stoneware Linens',
        subtitle: 'An independent fine-art workshop exhibiting dynamic abstract canvases, terracotta clay columns, and limited graphic screenprints.',
        content: 'We support local artists. Drop by our weekend gallery show or purchase authentic verified original works shipped in custom wood crates.',
        imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=80',
        bannerOpacity: 50,
        ctaText: 'Bid on Canvas Pieces',
        ctaUrl: '#curated-bidding',
      },
      {
        id: 'artsy-split',
        type: 'split',
        title: 'Crafting Heavy Textured Clay Stoneware',
        subtitle: 'Our firing ovens run at 2,200 degrees to produce beautiful glaze textures',
        content: 'We avoid modern plastic molds. All pottery vases are hand-thrown on wheels and finished with custom reactive glazes. This makes every vase totally distinct, featuring stunning variations in wood-ash greens and deep iron blues.',
        imageUrl: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
        imagePosition: 'right',
        ctaText: 'Our Clay Materials',
        ctaUrl: '#pottery-art',
      },
      {
        id: 'artsy-features',
        type: 'features',
        title: 'Curated Gallery Services',
        subtitle: 'Bespoke fine-art solutions designed for home interior spaces',
        items: [
          { id: 'ayf-1', title: 'Museum Framing', description: 'UV-blocking framing panels mated to certified acid-free mat borders to preserve artwork colors.' },
          { id: 'ayf-2', title: 'Private Home Curation', description: 'Our curators arrange art grids matching your specific wall scales and shadows.' },
          { id: 'ayf-3', title: 'Artist Showcase Slots', description: 'Join our annual summer abstract gallery to present your works to premier global collectors.' }
        ]
      }
    ]
  },

  // ===== TECHNO (Inspired by electronics-store) =====
  {
    id: 'store-techno',
    name: 'Techno',
    description: 'High-tech wireless audio gear aesthetics with charcoal black frames, neon cyan lasers, and tech-silver panels.',
    category: 'Shopping/Store',
    colors: {
      primaryBg: '#090D16',
      secondaryBg: '#151D2A',
      textColor: '#D1D5DB',
      headingColor: '#06B6D4',
      primaryButtonBg: '#06B6D4',
      primaryButtonText: '#090D16',
      secondaryButtonBg: '#374151',
      secondaryButtonText: '#D1D5DB',
      dividerColor: '#1F2937',
      navBg: '#090D16',
      navText: '#06B6D4',
    },
    typography: {
      title: { family: 'Outfit', weight: '800', size: '50px', letterSpacing: '-0.02em' },
      heading: { family: 'Outfit', weight: '700', size: '24px', letterSpacing: '-0.01em' },
      body: { family: 'JetBrains Mono', weight: '400', size: '13px', letterSpacing: '0' },
    },
    sections: [
      {
        id: 'tech-hero',
        type: 'hero',
        title: '40-HR Hi-Fi Acoustic Noise Canceling',
        subtitle: 'Immerse your ears in absolute spatial acoustic mapping with aluminum headphones, mechanical wireless soundboards, and titanium drivers.',
        content: 'Engineered with ultra-low latency bluetooth chips to stream raw audiophile formats flawlessly without wireless compression.',
        imageUrl: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=80',
        bannerOpacity: 50,
        ctaText: 'Preorder Headset Now',
        ctaUrl: '#preorder',
      },
      {
        id: 'tech-split',
        type: 'split',
        title: 'Titanium Acoustic Sound Chambers',
        subtitle: 'Our metal enclosures isolate clear bass waves perfectly',
        content: 'Mass headphones use flexible plastic shells that vibrate during heavy sound frequencies, mudding sub-bass vocals. Our custom hardware relies on sandblasted titanium chambers that stay completely rigid, pumping crisp, clear signals into your ears.',
        imageUrl: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80',
        imagePosition: 'left',
        ctaText: 'Acoustic Driver Testing',
        ctaUrl: '#tech-docs',
      },
      {
        id: 'tech-features',
        type: 'features',
        title: 'Hardware features list',
        subtitle: 'Premium specifications designed for true audio purists',
        items: [
          { id: 'tyf-1', title: 'Spatial Audio Grid', description: 'In-ear movement tracking sensors that adjust frequency mapping in real-time.' },
          { id: 'tyf-2', title: 'Magnetic Dock Charging', description: 'Click your headphone safely on solid oak and copper induction charging bases.' },
          { id: 'tyf-3', title: 'Acoustic Custom Profiles', description: 'Download our equalizer control application to save personalized curves.' }
        ]
      }
    ]
  },

  // ===== VIBE (Inspired by interiordesignerr) =====
  {
    id: 'store-vibe',
    name: 'Vibe',
    description: 'A luxurious interior design atmosphere. Limestone whites, dried sand dunes, walnut timbers, and deep espresso accents.',
    category: 'Shopping/Store',
    colors: {
      primaryBg: '#FAF8F5',
      secondaryBg: '#F3EFEA',
      textColor: '#5E524D',
      headingColor: '#2B1A13',
      primaryButtonBg: '#2B1A13',
      primaryButtonText: '#FAF8F5',
      secondaryButtonBg: '#E9E3DB',
      secondaryButtonText: '#5E524D',
      dividerColor: '#EBE3D8',
      navBg: '#FAF8F5',
      navText: '#2B1A13',
    },
    typography: {
      title: { family: 'Cormorant Garamond', weight: '700', size: '54px', letterSpacing: '-0.02em' },
      heading: { family: 'Cormorant Garamond', weight: '600', size: '26px', letterSpacing: '-0.01em' },
      body: { family: 'Inter', weight: '400', size: '14px', letterSpacing: '0' },
    },
    sections: [
      {
        id: 'vibe-hero',
        type: 'hero',
        title: 'Architectural Home Staging & Natural Cottons',
        subtitle: 'We compose tranquil residential sanctuaries using local walnut timbers, natural Belgian linen seats, and clean geometric structures.',
        content: 'Our staging services create high visual rhythm. Browse our select line of handcrafted stone coffee tables and woven boucle stools.',
        imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
        bannerOpacity: 50,
        ctaText: 'Acquire Staging Consult',
        ctaUrl: '#get-staged',
      },
      {
        id: 'vibe-split',
        type: 'split',
        title: 'Organic Belgian Flax Linens',
        subtitle: 'Our fibers are hand-retted in Flanders rivers to preserve natural visual textures',
        content: 'We avoid bleached chemical yarn. Our home fabrics rely entirely on hand-combed natural linen weaves that breathe naturally and age into a soft, textured drape, giving your sofa spaces a luxury look and deep durability.',
        imageUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
        imagePosition: 'right',
        ctaText: 'Examine Cotton Linens',
        ctaUrl: '#linens',
      },
      {
        id: 'vibe-features',
        type: 'features',
        title: 'Home Staging Studio Services',
        subtitle: 'Bespoke design processes from mapping to furniture delivery',
        items: [
          { id: 'vff-1', title: 'Solar Spatial Mapping', description: 'We chart natural window daylight schedules to arrange furniture corners at correct shadow angles.' },
          { id: 'vff-2', title: 'Sustainable Walnut Stools', description: 'Every solid timber beam we cut is sourced from verified sustainable state farm plots.' },
          { id: 'vff-3', title: 'Organic Stone Tables', description: 'Sculptured low coffee tables carved out of solid blocks of textured limestone.' }
        ]
      }
    ]
  }
];

export const GOOGLE_FONTS_LIST = [
  'Inter',
  'Playfair Display',
  'Outfit',
  'Space Grotesk',
  'JetBrains Mono',
  'Cormorant Garamond',
  'Montserrat',
  'Roboto',
  'Lora',
  'Plus Jakarta Sans',
  'Syne',
  'DM Sans',
  'Cinzel',
  'Quicksand',
  'Bebas Neue',
  'Fira Code',
  'Arvo'
];

export const INITIAL_SECTIONS: Section[] = [
  {
    id: 'sec-hero',
    type: 'hero',
    title: 'The Design Studio for Google Sites',
    subtitle: 'Unlock publication-grade visual aesthetics, gorgeous font pairs, and customizable responsive visual blocks directly inside your standard Google Site.',
    content: 'Our themes and customizable sections translate seamlessly to Google Sites. Style your primary palettes, choose elite typography scales, copy embedded grids, and deploy in minutes.',
    ctaText: 'Build Custom Template',
    ctaUrl: '#creator-editor',
  },
  {
    id: 'sec-features',
    type: 'features',
    title: 'Premium Theme Features',
    subtitle: 'Why design with our dynamic theme creator tool?',
    items: [
      {
        id: 'feat-1',
        title: 'Pixel-Perfect Color Pickers',
        description: 'Map primary backgrounds, high-contrast dividers, custom navigation headers, and rounded responsive action buttons.',
        icon: 'Palette',
      },
      {
        id: 'feat-2',
        title: 'Full Google Fonts library',
        description: 'Dynamically pair beautiful sans, serif, and monospace font families, custom weights, and responsive typographic scale.',
        icon: 'Type',
      },
      {
        id: 'feat-3',
        title: 'Instant CSS & JSON Export',
        description: 'Create ready-to-run inline stylesheets and structured theme config files you can map straight onto custom Google Sites properties.',
        icon: 'FileCode',
      }
    ],
  },
  {
    id: 'sec-split',
    type: 'split',
    title: 'Visual Content Layout Blocks',
    subtitle: 'High-contrast split column panels designed to capture viewer focus.',
    content: 'Google Sites embeds represent the finest way to display custom grids, tables, carousel cards, and interactive sliders. By copying our ready-to-use theme codes and inserting them into the Embed option, you completely upgrade your layout flexibility without paying for complex high-end hosting platforms.',
    ctaText: 'Explore Addons',
    ctaUrl: '#export-panel',
    imageUrl: 'https://images.unsplash.com/photo-1541462608141-2758733e30bc?auto=format&fit=crop&w=800&q=80',
    imagePosition: 'right',
  },
  {
    id: 'sec-two-col',
    type: 'two-col',
    title: 'Symmetrical Split Column Layout',
    subtitle: 'Two equally proportioned columns to organize your messaging with maximum neatness.',
    items: [
      {
        id: 'col-1',
        title: 'Creator Resource library',
        description: 'Every component is built under standard layout frames so it looks gorgeous on small handset viewports, tablets, and massive 4K desktop screens without breaking or overlapping.',
      },
      {
        id: 'col-2',
        title: 'Structured Style Guides',
        description: 'No other platform gives you this level of control. Export your style sheet variables directly or use our custom design checklist to construct your blocks manually.',
      }
    ],
  },
  {
    id: 'sec-bento',
    type: 'bento',
    title: 'Premium Creative Showcase',
    subtitle: 'Display your agency templates, products, and services in a beautiful grid mesh.',
    items: [
      {
        id: 'bento-1',
        title: 'E-commerce Theme',
        description: 'Perfect visual deck with custom shopping layouts and links.',
        tag: 'TEMPLATES',
      },
      {
        id: 'bento-2',
        title: 'Premium Add-ons',
        description: 'Custom FAQ lists, dividers, buttons, and responsive headers.',
        tag: 'WIDGETS',
      },
      {
        id: 'bento-3',
        title: 'Link-In-Bio Portfolio',
        description: 'Single landing pages to drive social media link clicks.',
        tag: 'LINK IN BIO',
      }
    ],
  },
  {
    id: 'sec-faq',
    type: 'faq',
    title: 'Frequently Answered Inquiries',
    subtitle: 'Quick answers on applying our custom assets inside Google Sites.',
    items: [
      {
        id: 'faq-1',
        title: 'How do I import these colors to standard Google Sites?',
        description: 'Inside Google Sites, open the Themes panel on the right sidebar, click the Plus icon to Add Custom Theme. You can paste our generated HEX color codes for primary, secondary, and background fields directly into the theme creation wizard.',
      },
      {
        id: 'faq-2',
        title: 'What is the Embed Code option used for?',
        description: 'Google Sites allows you to insert HTML/CSS boxes anywhere. Click "Insert" -> "Embed" -> "Embed code" on your Sites editor, and paste our generated Section Embed structures to build custom typography and buttons.',
      },
      {
        id: 'faq-3',
        title: 'Are Google Fonts loaded automatically in embeds?',
        description: 'Yes! Our custom-generated embed codes automatically import the selected Google Font family using safe external CDN link headers, so it renders identically inside your live page.',
      }
    ],
  },
  {
    id: 'sec-testimonials',
    type: 'testimonials',
    title: 'Trusted by 10,000+ Google Sites Creators',
    subtitle: 'Read the stellar reviews from our active designer community.',
    items: [
      {
        id: 'test-1',
        title: 'Sarah K., Digital Creator',
        description: 'This is a game-changer! I was about to migrate to standard WordPress because Google Sites felt so limited, but using these beautiful split containers and custom color grids saved me weeks of effort!',
        tag: '5-Star Review',
      },
      {
        id: 'test-2',
        title: 'Marcus Lin, Design Agent',
        description: 'Pure aesthetic power. The CSS variable exports lets me maintain visual alignment across 15 client sites within an easy, accessible library system. Highly recommended!',
        tag: 'Verified User',
      }
    ],
  },
  {
    id: 'sec-pricing',
    type: 'pricing',
    title: 'Pricing & Creative Plans',
    subtitle: 'Transparent pricing with direct export modules for any project budget tier.',
    items: [
      {
        id: 'price-1',
        title: 'Starter Pack',
        description: 'Single layout section exporting, 2 default theme presets, standard Google Fonts.',
        price: '$0',
        ctaText: 'Deploy Free',
      },
      {
        id: 'price-2',
        title: 'Designer Bundle',
        description: 'Full 10 layout sections, unlimited JSON/CSS exports, premium tutorial videos, custom theme asset support.',
        price: '$19',
        ctaText: 'Unlock Premium',
        tag: 'POPULAR',
      }
    ],
  },
  {
    id: 'sec-links',
    type: 'link-in-bio',
    title: 'Explore Our Social Channels',
    subtitle: 'Stay aligned with our premium templates, weekly drops, and step-by-step guides.',
    items: [
      {
        id: 'link-1',
        title: 'Visit She Designs Things Premium Store',
        description: 'Browse our full catalog of premium Google Sites files and asset bundles.',
        url: 'https://shop.shedesignsthings.com/',
      },
      {
        id: 'link-2',
        title: 'Check Our Link-In-Bio Portfolio',
        description: 'Perfect responsive visual setups for Instagram, TikTok, and bio lists.',
        url: 'https://shop.shedesignsthings.com/shop-link-in-bio',
      },
      {
        id: 'link-3',
        title: 'Watch YouTube Sites Academy Tutorials',
        description: 'Step-by-step tutorial reviews covering embedding custom scripts.',
        url: 'https://shop.shedesignsthings.com/add-ons',
      }
    ],
  },
  {
    id: 'sec-footer',
    type: 'footer',
    title: 'Studio Theme Creator',
    subtitle: 'All Rights Reserved © 2026. Made with love for Google Sites customizers.',
    items: [
      { id: 'foot-1', title: 'Products', description: 'Templates', url: '#' },
      { id: 'foot-2', title: 'Resources', description: 'Add-Ons', url: '#' },
      { id: 'foot-3', title: 'Agency', description: 'Premium Showcase', url: '#' }
    ]
  }
];
