// Auto-generated from CATALOG_MANIFEST.json by Ghost Factory™ Engine
export interface ProductItem {
  id: number;
  name: string;
  category: string;
  vertical: string;
  gumroad_url: string;
  preview_url: string;
  admin_url: string;
  admin_passcode: string;
  audit_score: number;
  tables: string[];
}

export interface CatalogData {
  catalog_version: string;
  store: string;
  store_url: string;
  total_flagships: number;
  standards: string;
  database_engine: string;
  frontend_stack: string;
  valuation_framework: any;
  products: ProductItem[];
  vertical_slices: Record<string, {
    name: string;
    description: string;
    apa_valuation_range: string;
    target_asset_count: number;
    current_asset_count: number;
  }>;
}

export const CATALOG_DATA: CatalogData = {
  "catalog_version": "1.0.0",
  "store": "Aura & Grid",
  "store_url": "https://auraandgrid.gumroad.com",
  "total_flagships": 31,
  "standards": "Ghost Factory™ 9.0+ Verified Production Grade",
  "database_engine": "Supabase PostgreSQL (RLS Enabled)",
  "frontend_stack": "React 19 + Tailwind CSS + Lucide Icons + Vite",
  "valuation_framework": {
    "total_products": 31,
    "agency_whitelabel_vault_per_license": 1499,
    "retail_shelf_msrp_starter_ui": 2449,
    "retail_shelf_msrp_full_stack": 6169,
    "pre_revenue_liquidation_protocol": {
      "fire_sale_24_72h": {
        "per_product_min": 250,
        "per_product_max": 368,
        "fleet_total_min": 7750,
        "fleet_total_max": 11421
      },
      "quick_close_7_14d": {
        "per_product_min": 500,
        "per_product_max": 736,
        "fleet_total_min": 15500,
        "fleet_total_max": 22842
      },
      "marketplace_listing_30_45d": {
        "per_product_min": 789,
        "per_product_max": 1157,
        "fleet_total_min": 24474,
        "fleet_total_max": 35895
      }
    },
    "pre_revenue_apa_target_anchor": 35000,
    "post_traction_apa_cash_floor": 25000
  },
  "products": [
    {
      "id": 1,
      "name": "STRIDE MB",
      "category": "Boutique Fitness & Performance OS",
      "gumroad_url": "https://auraandgrid.gumroad.com/l/stride-mb",
      "preview_url": "https://stride-manhattan-beach.onrender.com",
      "admin_url": "https://stride-manhattan-beach.onrender.com/admin",
      "admin_passcode": "stridemb2026",
      "audit_score": 9.6,
      "tables": [
        "classes",
        "instructors",
        "bookings",
        "memberships"
      ],
      "vertical": "fitness"
    },
    {
      "id": 2,
      "name": "THE VAULT",
      "category": "Creative Production & Soundstage Studio OS",
      "gumroad_url": "https://auraandgrid.gumroad.com/l/the-vault",
      "preview_url": "https://the-vault-studio.onrender.com",
      "admin_url": "https://the-vault-studio.onrender.com/admin",
      "admin_passcode": "vault2026",
      "audit_score": 9.6,
      "tables": [
        "studios",
        "gear",
        "bookings",
        "intake"
      ],
      "vertical": "creative"
    },
    {
      "id": 3,
      "name": "VELOCITY",
      "category": "Ultra-Luxury Exotic Car Rental Fleet OS",
      "gumroad_url": "https://auraandgrid.gumroad.com/l/velocity-os",
      "preview_url": "https://velocity-exotic-fleet.onrender.com",
      "admin_url": "https://velocity-exotic-fleet.onrender.com/admin",
      "admin_passcode": "velocity2026",
      "audit_score": 9.7,
      "tables": [
        "vehicles",
        "reservations",
        "clients",
        "maintenance"
      ],
      "vertical": "automotive"
    },
    {
      "id": 4,
      "name": "APEX CLUB",
      "category": "Boutique Fight Club & Private Boxing Gym OS",
      "gumroad_url": "https://auraandgrid.gumroad.com/l/apex-club-os",
      "preview_url": "https://apex-fight-club.onrender.com",
      "admin_url": "https://apex-fight-club.onrender.com/admin",
      "admin_passcode": "apex2026",
      "audit_score": 9.8,
      "tables": [
        "roster",
        "bouts",
        "memberships",
        "sessions"
      ],
      "vertical": "fitness"
    },
    {
      "id": 5,
      "name": "ELEVATE CAPITAL",
      "category": "Private Equity Investor Portal OS",
      "gumroad_url": "https://auraandgrid.gumroad.com/l/elevate-capital-os",
      "preview_url": "https://elevate-capital-os.onrender.com",
      "admin_url": "https://elevate-capital-os.onrender.com",
      "admin_passcode": "elevate2026",
      "audit_score": 9.8,
      "tables": [
        "funds",
        "investors",
        "capital_calls",
        "allocations"
      ],
      "vertical": "wealth"
    },
    {
      "id": 6,
      "name": "OBSIDIAN LAB",
      "category": "Artisanal Coffee Slow Bar & Micro-Roastery OS",
      "gumroad_url": "https://auraandgrid.gumroad.com/l/obsidian-lab-os",
      "preview_url": "https://obsidian-slow-bar.onrender.com",
      "admin_url": "https://obsidian-slow-bar.onrender.com",
      "admin_passcode": "obsidian2026",
      "audit_score": 9.8,
      "tables": [
        "beans",
        "flights",
        "orders",
        "roast_batches"
      ],
      "vertical": "hospitality"
    },
    {
      "id": 7,
      "name": "THE ENCLAVE",
      "category": "Ultra-Luxury Architectural Real Estate & Villa OS",
      "gumroad_url": "https://auraandgrid.gumroad.com/l/the-enclave-os",
      "preview_url": "https://the-enclave-villas.onrender.com",
      "admin_url": "https://the-enclave-villas.onrender.com/admin",
      "admin_passcode": "enclave2026",
      "audit_score": 9.8,
      "tables": [
        "properties",
        "inquiries",
        "appointments",
        "maintenance_requests",
        "documents"
      ],
      "vertical": "hospitality"
    },
    {
      "id": 8,
      "name": "AURA MEDSPA",
      "category": "Boutique Aesthetics Clinic & VIP Treatment Booking OS",
      "gumroad_url": "https://auraandgrid.gumroad.com/l/aura-medspa-os",
      "preview_url": "https://aura-medspa-os.onrender.com",
      "admin_url": "https://aura-medspa-os.onrender.com/admin",
      "admin_passcode": "medspa2026",
      "audit_score": 9.8,
      "tables": [
        "profiles",
        "treatments",
        "appointments",
        "intake_records"
      ],
      "vertical": "medical"
    },
    {
      "id": 9,
      "name": "ROYAL APEX",
      "category": "Luxury Men's Grooming Atelier & Bespoke Barber OS",
      "gumroad_url": "https://auraandgrid.gumroad.com/l/royal-apex-os",
      "preview_url": "https://royal-apex-atelier.onrender.com",
      "admin_url": "https://royal-apex-atelier.onrender.com/admin",
      "admin_passcode": "royal2026",
      "audit_score": 9.8,
      "tables": [
        "profiles",
        "specialists",
        "services",
        "appointments"
      ],
      "vertical": "creative"
    },
    {
      "id": 10,
      "name": "AURA RESERVE",
      "category": "Private Vineyard Cellar & Tasting Estate OS",
      "gumroad_url": "https://auraandgrid.gumroad.com/l/aura-reserve-os",
      "preview_url": "https://aura-reserve-estate.onrender.com",
      "admin_url": "https://aura-reserve-estate.onrender.com/admin",
      "admin_passcode": "reserve2026",
      "audit_score": 9.8,
      "tables": [
        "patron_profiles",
        "cellar_reservations",
        "vintage_allocations",
        "vault_lockers"
      ],
      "vertical": "wealth"
    },
    {
      "id": 11,
      "name": "MONOLITH STUDIO",
      "category": "Brutalist Architecture & BIM Project Portal OS",
      "gumroad_url": "https://auraandgrid.gumroad.com/l/monolith-studio-os",
      "preview_url": "https://monolith-studio-os.onrender.com",
      "admin_url": "https://monolith-studio-os.onrender.com/admin",
      "admin_passcode": "monolith2026",
      "audit_score": 9.8,
      "tables": [
        "architect_clients",
        "commissioned_projects",
        "bim_revisions",
        "project_milestones"
      ],
      "vertical": "creative"
    },
    {
      "id": 12,
      "name": "KINETIC LAB",
      "category": "High-Performance Biomechanics & Athletic Testing OS",
      "gumroad_url": "https://auraandgrid.gumroad.com/l/kinetic-lab-os",
      "preview_url": "https://kinetic-lab-os.onrender.com",
      "admin_url": "https://kinetic-lab-os.onrender.com/admin",
      "admin_passcode": "kinetic2026",
      "audit_score": 9.8,
      "tables": [
        "athlete_profiles",
        "biomechanical_assessments",
        "force_plate_runs",
        "lab_billing_retainers"
      ],
      "vertical": "fitness"
    },
    {
      "id": 13,
      "name": "THE VELVET NOTE",
      "category": "Speakeasy, Jazz Listening Room & Sommelier Cellar OS",
      "gumroad_url": "https://auraandgrid.gumroad.com/l/the-velvet-note-os",
      "preview_url": "https://the-velvet-note-os.onrender.com",
      "admin_url": "https://the-velvet-note-os.onrender.com/admin",
      "admin_passcode": "velvet2026",
      "audit_score": 9.8,
      "tables": [
        "vip_reservations",
        "cellar_lockers",
        "bottle_inventory",
        "live_events"
      ],
      "vertical": "hospitality"
    },
    {
      "id": 14,
      "name": "AURA RETREAT OS",
      "category": "Boutique Sanctuary, Cohort Ledger & Masterclass Expedition OS",
      "gumroad_url": "https://auraandgrid.gumroad.com/l/retreat-os",
      "preview_url": "https://retreat-os.onrender.com",
      "admin_url": "https://retreat-os.onrender.com/admin",
      "admin_passcode": "retreat2026",
      "audit_score": 9.8,
      "tables": [
        "retreat_programs",
        "accommodation_tiers",
        "cohort_applications"
      ],
      "vertical": "medical"
    },
    {
      "id": 15,
      "name": "OMAKASE & COUNTER",
      "category": "16-Seat Hinoki Reservation & Tasting Room OS",
      "gumroad_url": "https://auraandgrid.gumroad.com/l/omakase-counter-os",
      "preview_url": "https://omakase-counter-os.onrender.com",
      "admin_url": "https://omakase-counter-os.onrender.com/admin",
      "admin_passcode": "omakase2026",
      "audit_score": 9.8,
      "tables": [
        "counter_reservations",
        "counter_seat_allocations",
        "sommelier_catalog"
      ],
      "vertical": "hospitality"
    },
    {
      "id": 16,
      "name": "AETHEL BESPOKE",
      "category": "Hand-Welted Cordwainer Atelier & Lastmaker OS",
      "gumroad_url": "https://auraandgrid.gumroad.com/l/aethel-bespoke-os",
      "preview_url": "https://aethel-bespoke-os.onrender.com",
      "admin_url": "https://aethel-bespoke-os.onrender.com/admin",
      "admin_passcode": "aethel2026",
      "audit_score": 9.8,
      "tables": [
        "bespoke_commissions",
        "client_lasts",
        "leather_inventory"
      ],
      "vertical": "creative"
    },
    {
      "id": 17,
      "name": "AURA APOTHECARY",
      "category": "Haute Parfumerie & Bespoke Scent Formulation OS",
      "gumroad_url": "https://auraandgrid.gumroad.com/l/aura-apothecary-os",
      "preview_url": "https://aura-apothecary-os.onrender.com",
      "admin_url": "https://aura-apothecary-os.onrender.com/admin",
      "admin_passcode": "apothecary2026",
      "audit_score": 9.8,
      "tables": [
        "perfume_formulations",
        "raw_essence_vault",
        "house_signatures"
      ],
      "vertical": "medical"
    },
    {
      "id": 18,
      "name": "THE WINTER PARLOR",
      "category": "Fireside Tasting Salon & Biodynamic Cellar OS",
      "gumroad_url": "https://auraandgrid.gumroad.com/l/the-winter-parlor-os",
      "preview_url": "https://the-winter-parlor-os.onrender.com",
      "admin_url": "https://the-winter-parlor-os.onrender.com/admin",
      "admin_passcode": "parlor2026",
      "audit_score": 9.8,
      "tables": [
        "parlor_reservations",
        "fireside_table_allocations",
        "cellar_inventory"
      ],
      "vertical": "hospitality"
    },
    {
      "id": 19,
      "name": "MOTIONSCALE",
      "category": "High-Ticket 3D Motion Design & VFX Studio OS",
      "gumroad_url": "https://auraandgrid.gumroad.com/l/motionscale-os",
      "preview_url": "https://motionscale-os.onrender.com",
      "admin_url": "https://motionscale-os.onrender.com/admin",
      "admin_passcode": "motionscale2026",
      "audit_score": 9.8,
      "tables": [
        "projects",
        "creative_assets",
        "client_portals",
        "financial_invoices"
      ],
      "vertical": "creative"
    },
    {
      "id": 20,
      "name": "AURA SUPPER CLUB",
      "category": "Private Dining Club, Analog Vinyl Lounge & Heritage Tasting Room OS",
      "gumroad_url": "https://auraandgrid.gumroad.com/l/aura-supper-club-os",
      "preview_url": "https://aura-supper-club-os.onrender.com",
      "admin_url": "https://aura-supper-club-os.onrender.com/admin",
      "admin_passcode": "supperclub2026",
      "audit_score": 9.8,
      "tables": [
        "supper_reservations",
        "tasting_sessions",
        "vinyl_records",
        "club_memberships"
      ],
      "vertical": "hospitality"
    },
    {
      "id": 21,
      "name": "NEO SHINJUKU",
      "category": "Cyberpunk Izakaya, High-Tech Robata Grill & Neon Cocktail Cantina OS",
      "gumroad_url": "https://auraandgrid.gumroad.com/l/neo-shinjuku-os",
      "preview_url": "https://neo-shinjuku-os.onrender.com",
      "admin_url": "https://neo-shinjuku-os.onrender.com/admin",
      "admin_passcode": "shinjuku2026",
      "audit_score": 9.8,
      "tables": [
        "izakaya_reservations",
        "robata_menu_items",
        "cocktail_dispensary",
        "capsule_booths"
      ],
      "vertical": "hospitality"
    },
    {
      "id": 22,
      "name": "NEON LOTUS",
      "category": "Downtown Chinese Bistro, Dim Sum Speakeasy & Craft Baijiu Bar OS",
      "gumroad_url": "https://auraandgrid.gumroad.com/l/neon-lotus-os",
      "preview_url": "https://neon-lotus-os.onrender.com",
      "admin_url": "https://neon-lotus-os.onrender.com/admin",
      "admin_passcode": "lotus2026",
      "audit_score": 9.8,
      "tables": [
        "bistro_reservations",
        "dim_sum_menu",
        "baijiu_cocktails",
        "speakeasy_booths"
      ],
      "vertical": "hospitality"
    },
    {
      "id": 23,
      "name": "APEX TUNING",
      "category": "High-Performance Auto Tuning, Dyno Testing & Workshop Management OS",
      "gumroad_url": "https://auraandgrid.gumroad.com/l/apex-tuning-os",
      "preview_url": "https://apex-tuning-os.onrender.com",
      "admin_url": "https://apex-tuning-os.onrender.com",
      "admin_passcode": "apextuning2026",
      "audit_score": 9.8,
      "tables": [
        "work_orders",
        "dyno_logs",
        "workshop_bays",
        "parts_inventory"
      ],
      "vertical": "automotive"
    },
    {
      "id": 24,
      "name": "VILLA OBSIDIAN",
      "category": "Ultra-Luxury Architectural Estates & Private Villa OS",
      "vertical": "wealth",
      "gumroad_url": "https://auraandgrid.gumroad.com/l/villa-obsidian-os",
      "preview_url": "https://villa-obsidian-os.onrender.com",
      "admin_url": "https://villa-obsidian-os.onrender.com",
      "admin_passcode": "villa2026",
      "audit_score": 9.8,
      "tables": [
        "properties",
        "inquiries",
        "appointments",
        "documents",
        "maintenance_requests"
      ]
    },
    {
      "id": 25,
      "name": "AFRODIGITAL MOTION",
      "category": "3D Animation Studio, VFX Pipeline & Character Rigging OS",
      "vertical": "creative",
      "gumroad_url": "https://auraandgrid.gumroad.com/l/afrodigital-motion-os",
      "preview_url": "https://afrodigital-motion-os.onrender.com",
      "admin_url": "https://afrodigital-motion-os.onrender.com",
      "admin_passcode": "motion2026",
      "audit_score": 9.8,
      "tables": [
        "production_pipelines",
        "client_briefs",
        "render_nodes",
        "asset_deliverables"
      ]
    },
    {
      "id": 26,
      "name": "BURGER LAB",
      "category": "Craft Smash Burger, Fast-Casual Ordering & Kitchen Dispatch OS",
      "vertical": "hospitality",
      "gumroad_url": "https://auraandgrid.gumroad.com/l/burger-lab-os",
      "preview_url": "https://burger-lab-os.onrender.com",
      "admin_url": "https://burger-lab-os.onrender.com/admin",
      "admin_passcode": "burger2026",
      "audit_score": 9.8,
      "tables": [
        "menu_items",
        "orders",
        "order_items",
        "grill_stations",
        "event_inquiries"
      ]
    },
    {
      "id": 27,
      "name": "AURA FRAGRANCE",
      "category": "Haute Parfumerie, Bespoke Scent Formulation & Olfactory Atelier OS",
      "vertical": "medical",
      "gumroad_url": "https://auraandgrid.gumroad.com/l/aura-fragrance-os",
      "preview_url": "https://aura-fragrance-os.onrender.com",
      "admin_url": "https://aura-fragrance-os.onrender.com/admin",
      "admin_passcode": "fragrance2026",
      "audit_score": 9.8,
      "tables": [
        "fragrance_catalog",
        "olfactory_notes",
        "scent_consultations",
        "bespoke_formulas"
      ]
    },
    {
      "id": 28,
      "name": "FOCUS ARCHITECTURE",
      "category": "Minimalist Obsidian Architectural Atelier, Project Roster & Client Portal OS",
      "vertical": "creative",
      "gumroad_url": "https://auraandgrid.gumroad.com/l/focus-architecture-os",
      "preview_url": "https://focus-architecture-os.onrender.com",
      "admin_url": "https://focus-architecture-os.onrender.com/admin",
      "admin_passcode": "focus2026",
      "audit_score": 9.8,
      "tables": [
        "architectural_projects",
        "blueprints",
        "project_milestones",
        "client_briefs"
      ]
    },
    {
      "id": 29,
      "name": "THE VINEYARDS",
      "category": "Ultra-Luxury Wine Estate, Allocation Portal & Sommelier Cellar OS",
      "vertical": "hospitality",
      "gumroad_url": "https://auraandgrid.gumroad.com/l/the-vineyards-os",
      "preview_url": "https://the-vineyards-os.onrender.com",
      "admin_url": "https://the-vineyards-os.onrender.com/admin",
      "admin_passcode": "vineyards2026",
      "audit_score": 9.8,
      "tables": [
        "wine_allocations",
        "tasting_reservations",
        "cellar_drops",
        "club_members"
      ]
    },
    {
      "id": 30,
      "name": "FAMILY LEGACY WEALTH",
      "category": "Multi-Generational Trust, Compound Horizon & Family Office OS",
      "vertical": "wealth",
      "gumroad_url": "https://auraandgrid.gumroad.com/l/family-legacy-wealth-os",
      "preview_url": "https://family-legacy-wealth-os.onrender.com",
      "admin_url": "https://family-legacy-wealth-os.onrender.com/admin",
      "admin_passcode": "legacy2026",
      "audit_score": 9.8,
      "tables": [
        "legacy_goals",
        "allowance_chores",
        "family_trust_ledgers"
      ]
    },
    {
      "id": 31,
      "name": "DIAMOND CUTS",
      "category": "Luxury Barber Salon, Chair Scheduling & Grooming Atelier Floor OS",
      "vertical": "medical",
      "gumroad_url": "https://auraandgrid.gumroad.com/l/diamond-cuts-os",
      "preview_url": "https://diamond-cuts-os.onrender.com",
      "admin_url": "https://diamond-cuts-os.onrender.com/admin",
      "admin_passcode": "diamond2026",
      "audit_score": 9.8,
      "tables": [
        "appointments",
        "salon_specialists",
        "salon_daily_metrics"
      ]
    }
  ],
  "vertical_slices": {
    "medical": {
      "name": "Medical & VIP Aesthetics Vault",
      "description": "Clinical booking, patient intake, medspas, salon grooming & olfactory OS",
      "apa_valuation_range": "$35,000 – $55,000",
      "target_asset_count": 50,
      "current_asset_count": 5
    },
    "automotive": {
      "name": "Automotive & Mobility Vault",
      "description": "Dyno testing, tuning dispatch, luxury fleet rentals & workshop OS",
      "apa_valuation_range": "$28,000 – $45,000",
      "target_asset_count": 40,
      "current_asset_count": 2
    },
    "hospitality": {
      "name": "Luxury Hospitality & Dining Vault",
      "description": "Bespoke counters, omakase, jazz bistros, supper clubs, estates & vineyards OS",
      "apa_valuation_range": "$42,000 – $65,000",
      "target_asset_count": 60,
      "current_asset_count": 10
    },
    "wealth": {
      "name": "Private Wealth & Real Estate Vault",
      "description": "Private equity LP portals, estate syndication, family office & luxury listings OS",
      "apa_valuation_range": "$30,000 – $48,000",
      "target_asset_count": 35,
      "current_asset_count": 4
    },
    "creative": {
      "name": "Creative Agency & Studio Vault",
      "description": "Motion VFX, architecture atelier, soundstage production & design OS",
      "apa_valuation_range": "$28,000 – $40,000",
      "target_asset_count": 40,
      "current_asset_count": 7
    },
    "fitness": {
      "name": "Performance Fitness & Athletics Vault",
      "description": "Boutique fight clubs, reformer training & athletic performance OS",
      "apa_valuation_range": "$25,000 – $38,000",
      "target_asset_count": 35,
      "current_asset_count": 3
    }
  },
  "roadmap_horizons": {
    "immediate_focus": {
      "target": "500 Apps (Phase 1 to 4)",
      "timeline": "2026 – Late 2027",
      "phase_1_archive_clearance": "50 Apps ($2,999 Agency Vault Launch)",
      "phase_2_century_funnel": "100 Apps ($3,500 VIP Setup + $35k–$50k Micro-APA)",
      "phase_3_category_dominance": "350 Apps (5-in-1 Niche Bundles + Micro-PE Multiple)",
      "phase_4_master_buyout": "500 Apps ($125,000–$200,000 Cash Buyout / $1.2M–$2.5M+ Cash Flow)"
    },
    "long_term_expansion": {
      "target": "3,000 to 5,000 Apps (Phase 5 to 7)",
      "timeline": "2028 – 2031 (3–5 Year Horizon)",
      "phase_5_multi_channel": "1,500 Apps (Custom Storefront, ThemeForest, B2B Outbound)",
      "phase_6_saas_franchise": "3,000 Apps ($450k–$900k Pre-Revenue Buyout / $4.5M Exit)",
      "phase_7_holding_conglomerate": "5,000 Apps ($750k–$1.5M Wholesale Buyout / $8.75M+ Exit)"
    }
  }
};
