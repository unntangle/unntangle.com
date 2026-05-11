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

export interface ServiceDeliverable {
    title: string;
    description: string;
    icon: string;
}

export interface ServiceUseCase {
    industry: string;
    title: string;
    description: string;
}

export interface ServiceTechItem {
    name: string;
    /** Simple Icons slug — see https://simpleicons.org. Null falls back to a lettermark badge. */
    slug: string | null;
    category?: string;
}

export interface ServiceStat {
    /** The headline number, e.g. "98+" or "2.3s" */
    value: string;
    label: string;
    description: string;
}

export interface ServiceFAQ {
    question: string;
    answer: string;
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
    /** Optional — rich sections used by tech service pages */
    deliverables?: ServiceDeliverable[];
    useCases?: ServiceUseCase[];
    techStack?: ServiceTechItem[];
    stats?: ServiceStat[];
    faqs?: ServiceFAQ[];
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
        ],
        deliverables: [
            { title: "Production-Ready Codebase", description: "Clean, documented, version-controlled source code hosted on your GitHub or ours.", icon: "FileText" },
            { title: "Pixel-Perfect Figma Files", description: "Editable design systems, components, and tokens you can hand to any future designer.", icon: "Palette" },
            { title: "CMS & Admin Panel", description: "A non-technical content interface so your team can publish without engineering tickets.", icon: "Database" },
            { title: "Performance Audit Report", description: "Lighthouse scores, Core Web Vitals data, and a 90-day post-launch performance baseline.", icon: "BarChart3" },
            { title: "SEO Foundation Kit", description: "Schema markup, sitemap, robots.txt, OG tags, and a keyword map for ongoing content work.", icon: "Layers" },
            { title: "Hosting & DNS Setup", description: "Production deployment on Vercel, AWS, or your cloud of choice — fully configured.", icon: "CloudUpload" }
        ],
        useCases: [
            { industry: "SaaS", title: "Product Marketing Sites", description: "Conversion-focused landing pages, pricing pages, and feature tours that turn organic traffic into trials." },
            { industry: "E-commerce", title: "Headless Storefronts", description: "Shopify Hydrogen and custom Next.js storefronts with sub-second checkout flows." },
            { industry: "Real Estate", title: "Listing Platforms", description: "Map-integrated property search with high-density imagery and lead-capture funnels." },
            { industry: "Healthcare", title: "Clinic & Practice Sites", description: "HIPAA-conscious booking flows, doctor profiles, and patient resource libraries." },
            { industry: "Finance", title: "Corporate Web Presence", description: "Compliance-ready content architectures for banks, NBFCs, and wealth management firms." },
            { industry: "D2C Brands", title: "Brand Showcases", description: "Editorial-grade brand storytelling sites with rich media and Shopify integrations." }
        ],
        techStack: [
            { name: "Next.js", slug: "nextdotjs", category: "Framework" },
            { name: "React", slug: "react", category: "Framework" },
            { name: "TypeScript", slug: "typescript", category: "Language" },
            { name: "Tailwind CSS", slug: "tailwindcss", category: "Styling" },
            { name: "Framer Motion", slug: "framer", category: "Animation" },
            { name: "Sanity", slug: "sanity", category: "CMS" },
            { name: "Contentful", slug: "contentful", category: "CMS" },
            { name: "Vercel", slug: "vercel", category: "Hosting" },
            { name: "AWS", slug: "amazonwebservices", category: "Cloud" },
            { name: "PostgreSQL", slug: "postgresql", category: "Database" }
        ],
        stats: [
            { value: "98+", label: "Lighthouse Score", description: "Average performance score across our delivered sites." },
            { value: "<1.5s", label: "Largest Contentful Paint", description: "First meaningful render — under Google's 'good' threshold." },
            { value: "40%", label: "Avg. Conversion Lift", description: "Median uplift measured on revamped marketing sites within 90 days." },
            { value: "99.99%", label: "Uptime SLA", description: "Production hosting backed by Vercel and AWS edge networks." }
        ],
        faqs: [
            { question: "How long does a typical website project take?", answer: "Marketing sites (5-10 pages) ship in 4-6 weeks. Larger platforms with CMS, integrations, and complex flows usually run 8-12 weeks. We share a week-by-week timeline in our scoping doc before we start." },
            { question: "Do you build on Next.js exclusively?", answer: "Next.js is our default for new builds because of its performance and SEO ergonomics, but we also work in Astro, Remix, and SvelteKit where the project demands it." },
            { question: "Can I edit content myself after launch?", answer: "Yes — every site ships with a CMS (typically Sanity or Contentful) so your marketing team can publish copy, swap images, and launch new pages without filing engineering tickets." },
            { question: "Do you handle hosting and ongoing maintenance?", answer: "We deploy to Vercel or AWS by default, transfer ownership to your account, and offer optional retainers for security patches, dependency updates, and feature work." },
            { question: "Will my site be SEO-friendly out of the box?", answer: "Technical SEO is baked in — schema markup, sitemap generation, semantic HTML, optimized Core Web Vitals, and OG metadata. Content-side SEO is a separate workstream our growth team can pick up." }
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
        ],
        deliverables: [
            { title: "iOS & Android Builds", description: "Signed, production-ready binaries submitted to App Store and Play Store under your developer accounts.", icon: "Smartphone" },
            { title: "Source Code & CI/CD", description: "Full repository access with automated build, test, and deploy pipelines configured for your team.", icon: "FileText" },
            { title: "Backend & API Layer", description: "Scalable REST or GraphQL APIs, authentication, and database schemas — all documented.", icon: "Database" },
            { title: "Design System", description: "Reusable component library in Figma plus matching code components for future feature work.", icon: "Palette" },
            { title: "QA & Test Suite", description: "Unit, integration, and end-to-end tests with reports — so future changes don't break production.", icon: "ShieldCheck" },
            { title: "Analytics & Crash Reporting", description: "Mixpanel, Amplitude, or your tool of choice wired in, plus Sentry/Firebase Crashlytics.", icon: "BarChart3" }
        ],
        useCases: [
            { industry: "FinTech", title: "Consumer Banking Apps", description: "KYC flows, secure transactions, biometric auth, and PCI-DSS-aligned architectures." },
            { industry: "Logistics", title: "Fleet & Driver Apps", description: "Real-time GPS tracking, offline-first sync, route optimization, and proof-of-delivery capture." },
            { industry: "Healthcare", title: "Patient & Provider Apps", description: "Tele-consultation, prescription management, EHR integrations, and appointment scheduling." },
            { industry: "Retail & D2C", title: "Loyalty & Commerce Apps", description: "In-app purchases, push-driven re-engagement, AR product preview, and social commerce." },
            { industry: "Education", title: "Learning Platforms", description: "Video streaming, offline downloads, live classes, and progress-tracking dashboards." },
            { industry: "Enterprise", title: "Internal Tooling", description: "Field-force apps, approval workflows, and SAP/Salesforce-integrated companion apps." }
        ],
        techStack: [
            { name: "React Native", slug: "react", category: "Mobile" },
            { name: "Flutter", slug: "flutter", category: "Mobile" },
            { name: "Swift", slug: "swift", category: "iOS Native" },
            { name: "Kotlin", slug: "kotlin", category: "Android Native" },
            { name: "Expo", slug: "expo", category: "Tooling" },
            { name: "Node.js", slug: "nodedotjs", category: "Backend" },
            { name: "GraphQL", slug: "graphql", category: "API" },
            { name: "Firebase", slug: "firebase", category: "BaaS" },
            { name: "PostgreSQL", slug: "postgresql", category: "Database" },
            { name: "Redis", slug: "redis", category: "Cache" }
        ],
        stats: [
            { value: "60fps", label: "Native Performance", description: "Buttery animations on both iOS and Android, even on mid-tier devices." },
            { value: "<3s", label: "Cold Start", description: "Time-to-interactive on first launch — well under industry median." },
            { value: "4.7★", label: "Avg. Store Rating", description: "Across apps we've shipped over the last 24 months." },
            { value: "70%", label: "Code Reuse", description: "Shared logic across iOS and Android using cross-platform stacks." }
        ],
        faqs: [
            { question: "Native or cross-platform — which should I pick?", answer: "We default to React Native or Flutter for 90% of apps because the cost-to-feature ratio is unbeatable. We recommend fully native only when your app needs deep OS integration (advanced AR, custom Bluetooth protocols, etc.) — we'll be upfront if that's your case." },
            { question: "Do you handle App Store and Play Store submission?", answer: "Yes — we manage the entire submission process including listing copy, screenshots, app review responses, and post-launch update rollouts." },
            { question: "What about backend infrastructure?", answer: "We typically build the backend in Node.js with PostgreSQL, deploy to AWS or GCP, and document everything. You get the keys — no vendor lock-in." },
            { question: "How do you handle ongoing app maintenance?", answer: "Apps need quarterly maintenance: iOS/Android OS updates, dependency patches, and crash fixes. We offer retainer plans starting at 20 engineering hours/month." },
            { question: "Can the app work offline?", answer: "Yes — for logistics, field-service, and travel apps we build offline-first architectures with local storage, conflict resolution, and background sync." }
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
        ],
        deliverables: [
            { title: "Custom ERP Platform", description: "A modular, role-based web application tailored to your exact operational workflows.", icon: "Layers" },
            { title: "Role-Based Access Control", description: "Granular permissions for finance, sales, ops, HR, and executive leadership.", icon: "Lock" },
            { title: "Migrated Historical Data", description: "Clean, validated import of your legacy data — Excel, Tally, SAP, or whatever you're on.", icon: "Database" },
            { title: "Reporting & BI Dashboards", description: "Real-time finance, inventory, and operations dashboards with export-to-Excel/PDF.", icon: "BarChart3" },
            { title: "API & Integration Layer", description: "Pre-built connectors to your CRM, payment gateway, accounting tool, and logistics partners.", icon: "RefreshCw" },
            { title: "Team Training & SOPs", description: "Onboarding sessions, role-specific user guides, and a 60-day adoption support window.", icon: "FileText" }
        ],
        useCases: [
            { industry: "Manufacturing", title: "Production & Inventory ERP", description: "BOMs, work orders, shop-floor tracking, MRP, and finished-goods inventory in one system." },
            { industry: "Distribution", title: "Warehouse & Logistics ERP", description: "Multi-warehouse stock, route planning, dispatch, and reverse logistics workflows." },
            { industry: "Real Estate", title: "Project & Sales CRM-ERP", description: "Inventory management, lead-to-booking pipelines, payment schedules, and broker payouts." },
            { industry: "Education", title: "Institute Management Systems", description: "Admissions, fee collection, attendance, exam workflows, and parent communication." },
            { industry: "Healthcare", title: "Hospital Information Systems", description: "OPD/IPD billing, pharmacy stock, lab integration, and insurance claim processing." },
            { industry: "Professional Services", title: "Agency Operations ERP", description: "Project tracking, timesheet billing, resource allocation, and P&L per engagement." }
        ],
        techStack: [
            { name: "Next.js", slug: "nextdotjs", category: "Frontend" },
            { name: "TypeScript", slug: "typescript", category: "Language" },
            { name: "Node.js", slug: "nodedotjs", category: "Backend" },
            { name: "NestJS", slug: "nestjs", category: "Backend Framework" },
            { name: "PostgreSQL", slug: "postgresql", category: "Database" },
            { name: "Redis", slug: "redis", category: "Cache" },
            { name: "Prisma", slug: "prisma", category: "ORM" },
            { name: "Docker", slug: "docker", category: "Infrastructure" },
            { name: "AWS", slug: "amazonwebservices", category: "Cloud" },
            { name: "Power BI", slug: null, category: "Analytics" }
        ],
        stats: [
            { value: "60%", label: "Manual Effort Reduced", description: "Average reduction in data-entry hours after ERP rollout." },
            { value: "4x", label: "Reporting Speed", description: "Faster month-end close compared to Excel-based workflows." },
            { value: "Zero", label: "Data Silos", description: "All operational data unified into a single normalized source of truth." },
            { value: "12 wk", label: "Avg. Time to Launch", description: "From scoping to first production rollout for mid-size operations." }
        ],
        faqs: [
            { question: "Custom ERP vs SAP/Oracle/Zoho — why build from scratch?", answer: "Off-the-shelf ERPs work great if your operations fit their model. For businesses with unique workflows — custom pricing logic, non-standard inventory rules, hybrid manufacturing — a tailored ERP is cheaper over 3 years and far more agile. We'll do an honest scoping call before we recommend either path." },
            { question: "Can it integrate with our existing Tally / Zoho Books / SAP?", answer: "Yes — we build connectors for accounting (Tally, Zoho, QuickBooks, SAP), CRM (Salesforce, HubSpot), and logistics partners so your ERP becomes the operational hub without forcing a finance-team migration." },
            { question: "What about data migration from our legacy system?", answer: "Migration is a dedicated workstream. We audit your existing data, clean inconsistencies, map fields, run dry-runs in staging, and then cut over with a rollback plan. Zero data loss is non-negotiable." },
            { question: "Is the ERP hosted in the cloud or on-premise?", answer: "Both are options. Most clients go cloud (AWS or Azure) for cost and remote access. For regulated industries we deploy on-premise or in a VPC with your compliance team's approvals." },
            { question: "How do you handle user training?", answer: "Role-based training sessions (admin, finance, ops, sales), recorded walkthroughs, written SOPs, and a 60-day post-launch hypercare window where our team responds to user queries directly." }
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
            { title: "Future Scalability", description: "A flexible foundation ready for tomorrow's feature requests." }
        ],
        deliverables: [
            { title: "Pre-Launch Audit Report", description: "A documented baseline of your current site's traffic, rankings, speed, and conversion benchmarks.", icon: "FileText" },
            { title: "Redesigned UI Kit", description: "Full Figma file with new design system, components, typography, and brand-aligned tokens.", icon: "Palette" },
            { title: "Migrated Codebase", description: "Modern Next.js or Astro build replacing your legacy WordPress, Drupal, or custom PHP stack.", icon: "RefreshCw" },
            { title: "301 Redirect Map", description: "Spreadsheet of every old URL mapped to its new destination — no SEO equity lost.", icon: "Layers" },
            { title: "Content Migration", description: "All blog posts, case studies, and resources moved with structure intact and metadata preserved.", icon: "Database" },
            { title: "Post-Launch Monitoring", description: "30-day SEO and traffic monitoring with weekly reports to catch any ranking dips early.", icon: "BarChart3" }
        ],
        useCases: [
            { industry: "Legacy Enterprises", title: "WordPress to Next.js", description: "Migrate aging WordPress sites to headless architectures without losing rankings or content." },
            { industry: "SaaS", title: "Marketing Site Refresh", description: "Replace a tired marketing site with a high-conversion modern build aligned to your new brand." },
            { industry: "Agencies & Consultancies", title: "Premium Rebrand Sites", description: "Elevate the digital presence after a brand refresh, repositioning, or M&A event." },
            { industry: "E-commerce", title: "Shopify or Magento Migration", description: "Move from legacy Magento or custom platforms to Shopify Plus or headless commerce." },
            { industry: "Education", title: "Institutional Website Modernization", description: "Universities and schools moving from outdated CMS to modern, mobile-first platforms." },
            { industry: "Hospitality", title: "Hotel & F&B Revamps", description: "Refresh hospitality sites with direct-booking funnels, photography upgrades, and reservation integrations." }
        ],
        techStack: [
            { name: "Next.js", slug: "nextdotjs", category: "Framework" },
            { name: "Astro", slug: "astro", category: "Framework" },
            { name: "TypeScript", slug: "typescript", category: "Language" },
            { name: "Sanity", slug: "sanity", category: "Headless CMS" },
            { name: "Strapi", slug: "strapi", category: "Headless CMS" },
            { name: "Vercel", slug: "vercel", category: "Hosting" },
            { name: "Cloudflare", slug: "cloudflare", category: "CDN" },
            { name: "Screaming Frog", slug: null, category: "SEO Audit" },
            { name: "Ahrefs", slug: "ahrefs", category: "SEO" },
            { name: "GA4", slug: "googleanalytics", category: "Analytics" }
        ],
        stats: [
            { value: "Zero", label: "Downtime Cutover", description: "Hot-swap deployments mean visitors never see a broken site." },
            { value: "100%", label: "SEO Equity Preserved", description: "Meticulous 301 mapping keeps every backlink's authority intact." },
            { value: "3-5x", label: "Page Speed Boost", description: "Typical improvement from legacy CMS to modern static/headless architecture." },
            { value: "+45%", label: "Conversion Increase", description: "Median uplift on lead-gen pages after design and CRO overhaul." }
        ],
        faqs: [
            { question: "Will my SEO rankings drop after a revamp?", answer: "Not with us. Every redirect, every metadata field, every schema entry, and every URL is mapped before launch. We monitor rankings for 30 days post-launch and catch any anomalies within hours. Most clients see rankings hold steady or improve due to the speed boost." },
            { question: "Can you keep my current content and just modernize the design and tech?", answer: "Absolutely. Content migration is part of every revamp — we preserve blog posts, case studies, and resources with full structure, metadata, and image assets intact." },
            { question: "How long is the typical revamp timeline?", answer: "4-8 weeks for marketing sites, 8-14 weeks for content-heavy sites with hundreds of pages, integrations, and bespoke features. The old site stays live the entire time." },
            { question: "What if I'm on WordPress and want to stay there?", answer: "If WordPress is the right fit for your team, we'll modernize within WordPress — new theme, performance optimization, headless API layer if needed. We won't force a stack change just to charge for one." },
            { question: "Do you handle the actual go-live cutover?", answer: "Yes — DNS, redirects, search-console updates, sitemap submission, and a live monitoring war-room during the cutover window. You won't lose a single visitor." }
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
        ],
        deliverables: [
            { title: "Optimized 3D Asset Library", description: "Compressed .glb / .gltf models with LODs, baked lighting, and mobile-friendly poly counts.", icon: "Layers" },
            { title: "Three.js / R3F Codebase", description: "Maintainable React Three Fiber code with reusable scene components and shaders.", icon: "FileText" },
            { title: "Custom GLSL Shaders", description: "Hand-written shaders for unique visual effects you can't get from any template library.", icon: "Cpu" },
            { title: "Performance Budget Doc", description: "Every asset, draw call, and shader documented with mobile/desktop perf budgets.", icon: "BarChart3" },
            { title: "Fallback 2D Experience", description: "A graceful 2D version for older devices, low-end mobiles, and accessibility needs.", icon: "Smartphone" },
            { title: "Source Files", description: "Blender / Cinema 4D source files so your team can iterate on the 3D assets independently.", icon: "Palette" }
        ],
        useCases: [
            { industry: "Product Launches", title: "Hero Product Reveals", description: "Apple-style scrollytelling reveals for hardware, fashion, automotive, and luxury goods." },
            { industry: "Architecture", title: "Virtual Property Tours", description: "Walkthrough experiences for real estate, hospitality, and museum projects." },
            { industry: "Gaming & Entertainment", title: "Pre-Launch Microsites", description: "Teaser sites for game releases, films, and music drops with interactive trailers." },
            { industry: "Automotive", title: "Configurator Experiences", description: "Real-time 3D car configurators with color, trim, and option visualization." },
            { industry: "Fashion & Luxury", title: "Editorial Brand Sites", description: "Immersive seasonal lookbooks and capsule collection reveals." },
            { industry: "SaaS & Tech", title: "Abstract Brand Worlds", description: "Visual metaphors and abstract 3D environments to communicate complex technical products." }
        ],
        techStack: [
            { name: "Three.js", slug: "threedotjs", category: "WebGL" },
            { name: "React Three Fiber", slug: "react", category: "WebGL" },
            { name: "GLSL", slug: null, category: "Shaders" },
            { name: "Blender", slug: "blender", category: "3D Modeling" },
            { name: "Cinema 4D", slug: null, category: "3D Modeling" },
            { name: "GSAP", slug: "greensock", category: "Animation" },
            { name: "Lenis", slug: null, category: "Scroll" },
            { name: "Spline", slug: "spline", category: "3D Design" },
            { name: "Draco Compression", slug: null, category: "Optimization" },
            { name: "Next.js", slug: "nextdotjs", category: "Framework" }
        ],
        stats: [
            { value: "60fps", label: "Target Frame Rate", description: "Maintained on mid-tier devices through aggressive optimization." },
            { value: "+180%", label: "Session Duration", description: "Average uplift compared to standard 2D versions of the same content." },
            { value: "<3MB", label: "Initial Payload", description: "Compressed and progressively loaded — fast even on 4G." },
            { value: "8/10", label: "Awwwards Average", description: "Average jury score across our 3D site submissions to date." }
        ],
        faqs: [
            { question: "Will this work on mobile devices?", answer: "Yes — every 3D project we ship has a mobile performance budget from day one. We tune poly counts, texture sizes, and shader complexity for sub-3-second loads on mid-tier Android phones. For very old or low-end devices, we serve a graceful 2D fallback." },
            { question: "How do 3D sites affect SEO?", answer: "We render text content as standard HTML alongside the 3D canvas — so search engines crawl all your copy, headings, and metadata normally. The 3D layer is a visual enhancement, not a replacement for indexable content." },
            { question: "Do you need 3D source files from us, or do you build the assets?", answer: "Either works. If you have CAD or Blender files, great — we'll optimize and stage them. If you're starting from scratch, our 3D team models, textures, and rigs everything based on your brief and references." },
            { question: "What's the typical timeline for a 3D website?", answer: "6-12 weeks depending on scope. Asset creation usually takes 3-5 weeks, with web integration and optimization running in parallel. We prototype the heaviest scene first so we can lock the performance budget early." },
            { question: "How is this different from Spline or ready-made templates?", answer: "Spline and templates are great for quick demos. We build production-grade, custom-shaded experiences with hand-tuned GLSL and proper LOD strategies — the difference shows up in load time, framerate, and the visual signature that templates can't replicate." }
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
            { title: "Custom Deep Learning", description: "Fine-tuning models (LoRAs) specifically on your brand's visual style.", icon: "Cpu" },
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
