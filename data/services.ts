export interface ServiceProcessStep {
    step: string;
    title: string;
    description: string;
}

export interface ServiceFeature {
    title: string;
    description: string;
    icon: string; 
}

export interface ServiceBenefit {
    title: string;
    description: string;
}

export interface ServiceData {
    id: string; 
    categoryId: string;
    categoryLabel: string;
    title: string;
    shortDescription: string;
    heroImage: string;
    overview: string;
    features: ServiceFeature[];
    process: ServiceProcessStep[];
    benefits: ServiceBenefit[];
}

export const servicesData: ServiceData[] = [
    // --- TECH ---
    {
        id: "website",
        categoryId: "tech",
        categoryLabel: "Technology Solutions",
        title: "Website Development",
        shortDescription: "High-performance, responsive sites for your digital presence.",
        heroImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2000",
        overview: "We architect premium web ecosystems designed for scale, speed, and conversion. Going beyond standard templates, we build bespoke digital platforms that serve as the foundational pillar of your brand's online presence.",
        features: [
            { title: "Custom Architecture", description: "Built from the ground up using modern frameworks like React and Next.js.", icon: "Monitor" },
            { title: "Responsive Design", description: "Flawless user experience across all devices and screen sizes.", icon: "Smartphone" },
            { title: "SEO Optimized", description: "Technical SEO built into the core structure for maximum visibility.", icon: "BarChart3" }
        ],
        process: [
            { step: "01", title: "Discovery & Strategy", description: "Understanding your brand, target audience, and digital objectives." },
            { step: "02", title: "UI/UX Design", description: "Crafting intuitive user journeys and stunning visual interfaces." },
            { step: "03", title: "Development", description: "Writing clean, performant, and scalable code." },
            { step: "04", title: "Launch", description: "Rigorous testing and seamless deployment to production." }
        ],
        benefits: [
            { title: "Increased Conversion", description: "Optimized user flows that turn visitors into customers." },
            { title: "Lightning Fast URLs", description: "Sub-second load times that keep engagement high." },
            { title: "Future-Proof Tech", description: "Easily scalable as your business grows." }
        ]
    },
    {
        id: "app",
        categoryId: "tech",
        categoryLabel: "Technology Solutions",
        title: "App Development",
        shortDescription: "Custom mobile and desktop apps for complex business problems.",
        heroImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=2000",
        overview: "From native mobile applications to comprehensive desktop software, we develop powerful tools that solve complex operational challenges and deliver exceptional user experiences.",
        features: [
            { title: "Cross-Platform", description: "Build once, deploy everywhere with React Native and Flutter.", icon: "Smartphone" },
            { title: "Native Performance", description: "Optimized for iOS, Android, and Desktop environments.", icon: "Zap" },
            { title: "Secure Architecture", description: "Enterprise-grade security protocols protecting user data.", icon: "ShieldCheck" }
        ],
        process: [
            { step: "01", title: "Requirements Analysis", description: "Defining core functionalities and technical constraints." },
            { step: "02", title: "Prototyping", description: "Interactive wireframes to visualize the app flow." },
            { step: "03", title: "Agile Development", description: "Iterative sprints to build features rapidly." },
            { step: "04", title: "Deployment", description: "App Store submission and enterprise rollout." }
        ],
        benefits: [
            { title: "Omnichannel Presence", description: "Reach your users wherever they are." },
            { title: "Operational Efficiency", description: "Streamline workflows with custom internal tools." },
            { title: "High Engagement", description: "Immersive experiences that drive user retention." }
        ]
    },
    {
        id: "erp",
        categoryId: "tech",
        categoryLabel: "Technology Solutions",
        title: "ERP Development",
        shortDescription: "Integrated systems to streamline operations and data management.",
        heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2000",
        overview: "Transform your enterprise with bespoke ERP solutions. We unify fragmented data silos into cohesive, deterministic ecosystems that provide real-time operational clarity and drive efficiency.",
        features: [
            { title: "Data Unification", description: "Centralize all operational data into a single source of truth.", icon: "Database" },
            { title: "Process Automation", description: "Automate reporting, inventory, and finance workflows.", icon: "RefreshCw" },
            { title: "Advanced Analytics", description: "Real-time dashboards for predictive decision making.", icon: "BarChart3" }
        ],
        process: [
            { step: "01", title: "Systems Audit", description: "Evaluating existing legacy systems and data structures." },
            { step: "02", title: "Architecture Design", description: "Mapping out the new operational ecosystem." },
            { step: "03", title: "Custom Integration", description: "Connecting APIs and migrating historical data." },
            { step: "04", title: "Training & Adoption", description: "Ensuring smooth transition for your workforce." }
        ],
        benefits: [
            { title: "Cost Reduction", description: "Eliminate inefficiencies and redundant software costs." },
            { title: "Complete Visibility", description: "See the exact state of your business at any moment." },
            { title: "Scalable Operations", description: "Infrastructure designed to handle exponential growth." }
        ]
    },
    {
        id: "website-revamp",
        categoryId: "tech",
        categoryLabel: "Technology Solutions",
        title: "Website Revamp",
        shortDescription: "Modernize legacy systems into high-converting digital powerhouses.",
        heroImage: "https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&q=80&w=2000",
        overview: "A dated digital presence costs you high-value clients. Our website revamp completely overhauls your existing platform into a cutting-edge standard—retaining your hard-earned SEO authority while injecting modern UI/UX and blazingly fast architecture.",
        features: [
            { title: "UI/UX Overhaul", description: "A fresh, premium design language engineered for maximum conversion.", icon: "Palette" },
            { title: "Tech Stack Modernization", description: "Migration from sluggish legacy code to modern, headless frameworks.", icon: "Layers" },
            { title: "Migration Security", description: "Bulletproof processes ensuring zero data loss and flawless URL redirection.", icon: "ShieldCheck" }
        ],
        process: [
            { step: "01", title: "Legacy Audit", description: "Mapping your current site structure, traffic drops, and technical debt." },
            { step: "02", title: "Design Revolution", description: "Creating a completely modernized visual identity and user flow." },
            { step: "03", title: "Development Phase", description: "Building the new platform while your existing site remains fully operational." },
            { step: "04", title: "Hot Swap Deployment", description: "An instant, zero-downtime transition to the upgraded platform." }
        ],
        benefits: [
            { title: "Bounced Traffic Recaptured", description: "Modern UI drastically lowers bounce rates." },
            { title: "Preserved SEO Rankings", description: "Meticulous 301 mapping safeguards your domain authority." },
            { title: "Future Scalability", description: "A flexible foundation ready for tomorrow’s feature requests." }
        ]
    },
    {
        id: "interactive-3d",
        categoryId: "tech",
        categoryLabel: "Technology Solutions",
        title: "Interactive 3D Website",
        shortDescription: "Immersive WebGL experiences that captivate and engage.",
        heroImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=2000",
        overview: "Break free from the constraints of 2D screen design. We engineer breathtaking, interactive 3D websites using WebGL, Three.js, and React Three Fiber—delivering an unforgettable, gamified user experience directly in the browser.",
        features: [
            { title: "WebGL Real-Time Rendering", description: "Silky smooth 60fps 3D graphics in the user's browser without plugins.", icon: "Monitor" },
            { title: "Micro-Interactions", description: "Physics-based hovering, scrolling, and interactive particle systems.", icon: "Zap" },
            { title: "Optimized Performance", description: "Aggressive asset compression enabling instant load times on mobile.", icon: "Smartphone" }
        ],
        process: [
            { step: "01", title: "Storyboarding", description: "Defining the immersive narrative and camera paths." },
            { step: "02", title: "3D Asset Creation", description: "Modeling, texturing, and rigging the virtual environment." },
            { step: "03", title: "WebGL Engineering", description: "Integrating assets into a performant web canvas." },
            { step: "04", title: "Optimization", description: "Ensuring smooth framerates universally across all devices." }
        ],
        benefits: [
            { title: "Astonishing Metrics", description: "Radically increased average session duration and user engagement." },
            { title: "Unforgettable Branding", description: "A 'wow' factor that fundamentally separates you from competitors." },
            { title: "Visual Storytelling", description: "Communicate complex product features through interactive discovery." }
        ]
    },

    // --- DESIGN ---
    {
        id: "graphic-designing",
        categoryId: "design",
        categoryLabel: "Creative Design",
        title: "2D Graphic Designing",
        shortDescription: "Creative visuals that capture your brand and message.",
        heroImage: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=2000",
        overview: "Visual identity that speaks volumes before a single word is read. We design premium, aesthetic 2D brand assets that communicate authority, innovation, and trust, establishing a distinctive presence in competitive markets.",
        features: [
            { title: "Brand Identity", description: "Comprehensive logo, typography, and color systems.", icon: "Palette" },
            { title: "UI Assets", description: "Custom iconography, digital illustrations, and vector art.", icon: "Layers" },
            { title: "Marketing Collateral", description: "High-end designs for digital campaigns and physical print mediums.", icon: "FileText" }
        ],
        process: [
            { step: "01", title: "Brand Discovery", description: "Understanding the core values, psychology, and desired perception." },
            { step: "02", title: "Concepting", description: "Developing initial visual directions, themes, and mood boards." },
            { step: "03", title: "Refinement", description: "Polishing the chosen aesthetic into perfect, scalable mathematical vectors." },
            { step: "04", title: "Delivery", description: "Providing comprehensive brand guidelines and final source files." }
        ],
        benefits: [
            { title: "Instant Authority", description: "Premium design instantly builds implicit trust with your audience." },
            { title: "Visual Consistency", description: "A cohesive, universally aligned brand presence across all touchpoints." },
            { title: "Memorable Impact", description: "Unique and striking visual hooks that stand out in crowded digital markets." }
        ]
    },
    {
        id: "3d-designing",
        categoryId: "design",
        categoryLabel: "Creative Design",
        title: "3D Designing",
        shortDescription: "Hyper-realistic spatial assets and physical product modeling.",
        heroImage: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=2000",
        overview: "Bring your concepts into the third dimension. From hyper-realistic product rendering to cinematic architectural walkthroughs, our 3D design studio creates perfect spatial assets with meticulous attention to lighting, texturing, and material physics.",
        features: [
            { title: "Photorealistic Texturing", description: "PBR materials that accurately interact with virtual light.", icon: "Sun" },
            { title: "Product Prototyping", description: "Virtual manufacturing files for physical visualization.", icon: "Layers" },
            { title: "Cinematic Rendering", description: "Studio-quality lighting rigs for product and brand reveals.", icon: "Monitor" }
        ],
        process: [
            { step: "01", title: "Reference Collation", description: "Gathering CAD files, blueprints, or conceptual sketches." },
            { step: "02", title: "Polygon Modeling", description: "Sculpting the precise geometric shapes of the asset." },
            { step: "03", title: "Material Engineering", description: "Applying true-to-life textures, bumps, and light reflections." },
            { step: "04", title: "Final Rendering", description: "Executing the final high-resolution render farm outputs." }
        ],
        benefits: [
            { title: "Pre-Production Marketing", description: "Market and sell physical products before manufacturing them." },
            { title: "Absolute Perfection", description: "Showcase ideal, flawless versions of your offerings." },
            { title: "Inexhaustible Assets", description: "Render virtual objects from infinite camera angles instantly." }
        ]
    },
    {
        id: "ai-rendition",
        categoryId: "design",
        categoryLabel: "Creative Design",
        title: "AI Image Rendition",
        shortDescription: "Next-generation generative art for rapid, bespoke visuals.",
        heroImage: "https://images.unsplash.com/photo-1681498144214-ddf00bcf4788?auto=format&fit=crop&q=80&w=2000",
        overview: "Harnessing the cutting edge of visual artificial intelligence. We engineer highly specific, sophisticated prompts and utilize custom-trained models to generate breathtaking, uniquely branded imagery at a velocity previously impossible.",
        features: [
            { title: "Custom Deep Learning", description: "Fine-tuning models (LoRAs) specifically on your brand’s visual style.", icon: "Cpu" },
            { title: "High-Fidelity Generation", description: "Upscaled, print-ready, artifact-free resolution imagery.", icon: "Bot" },
            { title: "Rapid Iteration", description: "Generating hundreds of stylistic variants in seconds.", icon: "RefreshCw" }
        ],
        process: [
            { step: "01", title: "Aesthetic Parameterization", description: "Defining the exact visual constraints required." },
            { step: "02", title: "Model Conditioning", description: "Training control nets or feeding reference imagery." },
            { step: "03", title: "Generation & Curation", description: "Prompting thousands of variations and meticulously selecting the best." },
            { step: "04", title: "Retouching", description: "Human-in-the-loop post-processing to fix AI artifacts and ensure perfection." }
        ],
        benefits: [
            { title: "Unbound Creativity", description: "Visualize the impossible without expensive physical photoshoots." },
            { title: "Extreme Scalability", description: "Generate thousands of tailored asset variations for A/B testing instantly." },
            { title: "Velocity to Market", description: "Cut visual production timelines from weeks into mere hours." }
        ]
    },

    // --- DIGITAL MARKETING ---
    {
        id: "meta-ads",
        categoryId: "marketing",
        categoryLabel: "Growth Marketing",
        title: "Meta Ads",
        shortDescription: "Laser-targeted conversion campaigns across Facebook and Instagram.",
        heroImage: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=2000",
        overview: "Transform social scrolling into revenue streams. We build, manage, and meticulously optimize data-driven Meta Ad campaigns designed to aggressively acquire your highest-value customers through precise algorithmic targeting.",
        features: [
            { title: "Pixel Integration", description: "Flawless server-side tracking (CAPI) for absolute data integrity.", icon: "Database" },
            { title: "Dynamic Creative", description: "Testing thousands of copy and imagery combinations autonomously.", icon: "RefreshCw" },
            { title: "Custom Audiences", description: "Retargeting frameworks and high-accuracy lookalike modeling.", icon: "Layers" }
        ],
        process: [
            { step: "01", title: "Account Architecture", description: "Structuring campaigns, ad sets, and pixels for algorithmic success." },
            { step: "02", title: "Creative Production", description: "Designing scroll-stopping imagery and persuasive ad copy." },
            { step: "03", title: "Launch & Learning Phase", description: "Carefully feeding data into the Meta algorithm to establish conversion baselines." },
            { step: "04", title: "Aggressive Scaling", description: "Increasing budgets on winning variants to maximize ROAS." }
        ],
        benefits: [
            { title: "Predictable Acquisition", description: "Turn ad spend into a reliable, mathematical revenue engine." },
            { title: "Vast Reach", description: "Tap directly into a network of billions of users globally." },
            { title: "Hyper-Segmentation", description: "Serve ads exclusively to demographics statistically likely to convert." }
        ]
    },
    {
        id: "smm",
        categoryId: "marketing",
        categoryLabel: "Growth Marketing",
        title: "SMM",
        shortDescription: "Cultivate a fiercely loyal community around your brand.",
        heroImage: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&q=80&w=2000",
        overview: "Social Media Marketing is not just about posting—it's about digital authority. We construct organic social ecosystems that establish your brand as a leading voice, generating compound interest in audience attention across Instagram, LinkedIn, X, and TikTok.",
        features: [
            { title: "Content Ecosystems", description: "High-value, omni-channel content strategies mapped to user psychology.", icon: "FileText" },
            { title: "Virality Engineering", description: "Trend leveraging and algorithm optimization for organic explosion.", icon: "Zap" },
            { title: "Community Management", description: "Active engagement, response, and sentiment moderation.", icon: "MessageSquare" }
        ],
        process: [
            { step: "01", title: "Voice & Tone Strategy", description: "Establishing exactly how your brand communicates and acts." },
            { step: "02", title: "Content Calendering", description: "Structuring 30-day pipelines of high-quality multimedia." },
            { step: "03", title: "Distribution", description: "Executing timed posts optimized for maximum algorithmic lift." },
            { step: "04", title: "Analytics Feedback", description: "Reviewing engagement metrics to refine the content strategy continuously." }
        ],
        benefits: [
            { title: "Brand Equity", description: "Build a moat of trust and industry authority overtime." },
            { title: "Zero CPC Traffic", description: "Generate inbound leads continuously without relying on ad spend." },
            { title: "Direct Customer Feedback", description: "Understand market sentiment through direct audience interaction." }
        ]
    },
    {
        id: "seo",
        categoryId: "marketing",
        categoryLabel: "Growth Marketing",
        title: "SEO",
        shortDescription: "Dominate search engine rankings for high-intent keywords.",
        heroImage: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=80&w=2000",
        overview: "Secure the most valuable real estate on the internet. Our Search Engine Optimization strategy combines grueling technical architecture, authoritative content, and aggressive link-building to guarantee Page 1 dominance.",
        features: [
            { title: "Technical On-Page", description: "Core Web Vitals, Schema markup, and crawler optimization.", icon: "Monitor" },
            { title: "Semantic Architecture", description: "Building topic clusters for supreme topical authority.", icon: "Layers" },
            { title: "Off-Page Authority", description: "Acquiring high DR (Domain Rating) backlinks from top-tier publications.", icon: "ShieldCheck" }
        ],
        process: [
            { step: "01", title: "Technical Audit", description: "Fixing crawl errors, toxic links, and site-speed penalties." },
            { step: "02", title: "Keyword Economics", description: "Identifying low-difficulty, massive-ROI search terms." },
            { step: "03", title: "Content Deployment", description: "Writing hyper-optimized, better-than-competition landing pages." },
            { step: "04", title: "Authority Building", description: "Executing perpetual outreach and digital PR campaigns." }
        ],
        benefits: [
            { title: "Compound ROI", description: "Efforts stack—generating free, high-intent traffic for years to come." },
            { title: "Unrivaled Trust", description: "Consumers implicitly trust brands that rank #1 organically." },
            { title: "Defensible Moat", description: "Once established, organic rankings are difficult for competitors to steal." }
        ]
    },
    {
        id: "google-ads",
        categoryId: "marketing",
        categoryLabel: "Growth Marketing",
        title: "Google Ads",
        shortDescription: "Capture active demand exactly when they search for you.",
        heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2000",
        overview: "Harvesting the world's most intent-driven traffic. We engineer Google Search, Performance Max, and Shopping campaigns that instantly put your offer in front of consumers actively pulling out their credit cards.",
        features: [
            { title: "Intent Mapping", description: "Structuring campaigns based precisely on customer purchasing readiness.", icon: "BarChart3" },
            { title: "Conversion Tracking", description: "Closing the loop between clicks, forms, and offline CRM conversions.", icon: "Database" },
            { title: "A/B Copy Testing", description: "Relentless iteration of headlines and ad extensions to maximize CTR.", icon: "RefreshCw" }
        ],
        process: [
            { step: "01", title: "Keyword Strategy", description: "Mapping broad, exact, and negative keywords to block wasted spend." },
            { step: "02", title: "Architecture & Bid Strategy", description: "Building the campaign structure and setting tCPA / tROAS goals." },
            { step: "03", title: "Landing Page Sync", description: "Ensuring ad promise matches landing page reality for High Quality Scores." },
            { step: "04", title: "Daily Optimization", description: "Trimming underperforming search terms and reallocating budget to winners." }
        ],
        benefits: [
            { title: "Instant Visibility", description: "Skip the SEO waiting period and appear at the top of Google immediately." },
            { title: "Highest Conversion Rates", description: "Target users explicitly searching to solve a problem you fix." },
            { title: "Infinite Granularity", description: "Control exactly how much you pay for a lead down to the cent." }
        ]
    }
];
