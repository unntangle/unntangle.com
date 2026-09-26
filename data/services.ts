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
    // --- AI IMPLEMENTATION & DEPLOYMENT ---
    // No `stats` on these pages on purpose: add results only once they are
    // verified and the client has approved publishing them.
    {
        id: "ai-workflow-assessment",
        categoryId: "ai",
        categoryLabel: "AI Implementation & Deployment",
        title: "AI Workflow Assessment",
        shortDescription: "Find where AI can create measurable value in your business before anything is built.",
        heroImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=2000",
        overview: "Every AI deployment we do starts here. We spend time with the teams who do the work, map how requests, documents and data move through your business, and identify which workflows AI should take on first — and which should stay with people. You get a clear, prioritised plan before any development starts.",
        features: [
            { title: "Workflow Discovery", description: "Conversations and observation with the people who run the work day to day.", icon: "MessageSquare" },
            { title: "Process & System Mapping", description: "Every step, hand-off, document and system in the workflow, mapped as it really happens.", icon: "Layers" },
            { title: "Opportunity Prioritisation", description: "Workflows scored on volume, effort, error risk and business value to decide what to deploy first.", icon: "BarChart3" }
        ],
        process: [
            { step: "01", title: "Discover", description: "Understand how your teams work, the systems they use and where time goes." },
            { step: "02", title: "Map", description: "Document the repetitive, manual and decision-heavy workflows in detail." },
            { step: "03", title: "Prioritise", description: "Score each workflow and agree which ones AI should take on first." },
            { step: "04", title: "Recommend", description: "A first deployment with scope, integrations, approval points and success measures." }
        ],
        benefits: [
            { title: "Clarity Before Investment", description: "Know what AI should do, and what it shouldn't, before committing budget." },
            { title: "A Plan Your Team Owns", description: "Built with your people, so the recommendations reflect how work really happens." },
            { title: "Lower Deployment Risk", description: "Integration, data-quality and approval needs are identified up front, not mid-build." }
        ],
        deliverables: [
            { title: "Workflow Maps", description: "Step-by-step maps of the workflows reviewed, including people, documents and systems involved.", icon: "FileText" },
            { title: "Opportunity Scorecard", description: "Each workflow scored and ranked, with the reasoning behind every score.", icon: "BarChart3" },
            { title: "System & Data Inventory", description: "The systems and data sources each workflow depends on, and how they can be accessed.", icon: "Database" },
            { title: "Recommended First Deployment", description: "A scoped proposal for the first workflow: what AI does, what people do, and where approvals sit.", icon: "Zap" },
            { title: "Integration Approach", description: "How the AI would connect to your ERP, CRM, email and other systems, agreed with your IT team.", icon: "RefreshCw" },
            { title: "Success Measures", description: "The measures we will use to judge whether the deployment is working.", icon: "ShieldCheck" }
        ],
        useCases: [
            { industry: "Sales", title: "RFQ to Quotation", description: "Assess how enquiries and RFQs become quotations, and which steps AI can prepare." },
            { industry: "Distribution", title: "Order Entry & Dealer Enquiries", description: "Map how orders arrive by email, phone and WhatsApp, and where re-typing happens." },
            { industry: "Finance", title: "Collections & Invoices", description: "Review receivables follow-up and invoice processing for repetitive effort." },
            { industry: "Procurement", title: "Vendor Quote Comparison", description: "Look at how supplier quotes are collected, compared and turned into purchase decisions." },
            { industry: "Customer Service", title: "Routine Enquiry Handling", description: "Identify the questions that come up again and again and where answers live." },
            { industry: "Management", title: "Reporting & Exceptions", description: "Find the reports compiled by hand each day or week from several systems." }
        ],
        faqs: [
            { question: "Who from our side needs to be involved?", answer: "A sponsor who owns the outcome, the people who actually do the work in the workflows we review, and someone from IT who knows your systems. Most of the time we need is with the people doing the work." },
            { question: "What if AI isn't the right answer for a workflow?", answer: "We'll say so. Sometimes a simpler automation, a software change or a process fix is the better answer — and because we also build websites, apps and custom software, we can recommend and deliver that instead." },
            { question: "How long does the assessment take?", answer: "It depends on how many teams and workflows are in scope. We agree the scope and timeline with you before we start." },
            { question: "What do we get at the end?", answer: "Workflow maps, a prioritised list of opportunities, and a scoped recommendation for the first deployment — including integrations, approval points and how success will be measured." }
        ]
    },
    {
        id: "ai-agents",
        categoryId: "ai",
        categoryLabel: "AI Implementation & Deployment",
        title: "AI Agents & Workflow Automation",
        shortDescription: "AI agents that carry out real business tasks inside your existing workflows, with human approval where it matters.",
        heroImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=2000",
        overview: "We build AI agents and automations around specific workflows — reading documents and messages, pulling data from your systems, preparing work for review and completing it once approved. Sales, finance, procurement, operations, customer service and management reporting are where we typically start.",
        features: [
            { title: "Document & Message Understanding", description: "Reads RFQs, invoices, purchase orders, emails and WhatsApp messages and extracts what matters.", icon: "FileText" },
            { title: "Actions, Not Just Answers", description: "Drafts quotations, prepares follow-ups, creates tickets and updates records — not just a chat window.", icon: "Bot" },
            { title: "Human-in-the-Loop Controls", description: "Approval gates, permissions and escalation paths designed into every critical step.", icon: "ShieldCheck" }
        ],
        process: [
            { step: "01", title: "Scope the Workflow", description: "Agree exactly what the agent does, what it hands to people, and how success is measured." },
            { step: "02", title: "Build & Test", description: "Build the agent around your data and business rules, and test it on real past cases." },
            { step: "03", title: "Integrate & Add Controls", description: "Connect it to your systems and set up approvals, permissions and escalation." },
            { step: "04", title: "Deploy & Improve", description: "Go live with your team, monitor results and refine the workflow over time." }
        ],
        benefits: [
            { title: "Less Repetitive Work", description: "Your team spends time on judgement and customers, not copying data between systems." },
            { title: "Faster Turnaround", description: "Requests are prepared as soon as they arrive, not when someone gets to them." },
            { title: "Consistent Handling", description: "The same rules applied every time, with every action recorded." }
        ],
        deliverables: [
            { title: "Production AI Agent", description: "The agent or automation running inside your real workflow, not a demo environment.", icon: "Bot" },
            { title: "Approval & Escalation Flows", description: "Review steps and escalation rules configured to match your business.", icon: "ShieldCheck" },
            { title: "System Connectors", description: "Integrations with the ERP, CRM, email, WhatsApp or databases the workflow needs.", icon: "RefreshCw" },
            { title: "Activity Log", description: "A record of what the agent did, when, and on what information.", icon: "FileText" },
            { title: "Monitoring View", description: "Visibility into volumes, exceptions and approvals so you can see how it is performing.", icon: "BarChart3" },
            { title: "Team Training & Handover", description: "Training for the people who work with the agent, plus documentation for your IT team.", icon: "LifeBuoy" }
        ],
        useCases: [
            { industry: "Sales", title: "AI Sales Agent", description: "Process leads, analyse RFQs, prepare quotation drafts, follow up with prospects and update the CRM." },
            { industry: "Finance", title: "AI Finance Agent", description: "Process invoices, identify outstanding payments, prepare collection follow-ups and generate reports." },
            { industry: "Procurement", title: "AI Procurement Agent", description: "Analyse requirements, compare vendors, process supplier information and prepare recommendations." },
            { industry: "Operations", title: "AI Operations Agent", description: "Analyse operational data, generate reports, monitor workflows and escalate exceptions." },
            { industry: "Customer Service", title: "AI Customer Service Agent", description: "Understand requests, search company knowledge, resolve routine queries and escalate complex ones." },
            { industry: "Leadership", title: "AI Management Intelligence", description: "Combine information across systems into management reports, summaries and exception alerts." }
        ],
        techStack: [
            { name: "Python", slug: "python", category: "AI Engineering" },
            { name: "TypeScript", slug: "typescript", category: "Language" },
            { name: "Node.js", slug: "nodedotjs", category: "Backend" },
            { name: "LLM APIs", slug: null, category: "AI Models" },
            { name: "Vector Search", slug: null, category: "Retrieval" },
            { name: "PostgreSQL", slug: "postgresql", category: "Database" },
            { name: "Redis", slug: "redis", category: "Queue & Cache" },
            { name: "Docker", slug: "docker", category: "Infrastructure" },
            { name: "AWS", slug: "amazonwebservices", category: "Cloud" },
            { name: "Supabase", slug: "supabase", category: "Backend" }
        ],
        faqs: [
            { question: "How is an AI agent different from a chatbot?", answer: "A chatbot answers questions. An AI agent carries out a workflow: when an RFQ arrives, it reads the document, retrieves pricing from your systems, drafts the quotation, waits for approval, sends it and updates your CRM." },
            { question: "Which AI models do you use?", answer: "We choose models per project based on accuracy, cost and your data requirements, and agree the choice with you — including where your data is processed." },
            { question: "What happens when the AI isn't sure?", answer: "It hands the case to a person. Escalation rules are part of the design, so unusual, high-value or low-confidence cases go to your team rather than being guessed at." },
            { question: "Can we start with a single workflow?", answer: "That is what we recommend. Start with the workflow that costs your team the most time, prove it works, then extend to the next one." }
        ]
    },
    {
        id: "ai-integration",
        categoryId: "ai",
        categoryLabel: "AI Implementation & Deployment",
        title: "AI & System Integration",
        shortDescription: "Connect AI to your ERP, CRM, email, WhatsApp, documents and databases — without replacing the systems you already run.",
        heroImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=2000",
        overview: "AI is only useful when it can work with your real data. We build the connections between AI and the systems your teams already use — through APIs, database access, file exports or email, depending on what each system supports — with access controls agreed with your IT team.",
        features: [
            { title: "ERP & CRM Connectivity", description: "Read product, pricing, stock, customer and order data, and write results back.", icon: "Database" },
            { title: "Email, WhatsApp & Documents", description: "Bring the channels where work actually arrives into the workflow.", icon: "MessageSquare" },
            { title: "Secure Access Design", description: "Role-based access, credentials you control, and only the data each workflow needs.", icon: "Lock" }
        ],
        process: [
            { step: "01", title: "System Audit", description: "Review each system involved and how it can be accessed safely." },
            { step: "02", title: "Integration Design", description: "Agree data flows, permissions and failure handling with your IT team." },
            { step: "03", title: "Build & Test", description: "Build the connectors and test them against real data in a safe environment." },
            { step: "04", title: "Go-Live & Support", description: "Switch on in production with monitoring and alerts in place." }
        ],
        benefits: [
            { title: "Keep Your Systems", description: "No rip-and-replace. Your ERP, CRM and tools stay exactly where they are." },
            { title: "One Flow of Data", description: "Results land back in the systems your teams already use — no extra screens to check." },
            { title: "Foundation for More AI", description: "Each connection built makes the next workflow simpler to deploy." }
        ],
        deliverables: [
            { title: "Integration Layer", description: "The service that connects AI workflows to your business systems.", icon: "Layers" },
            { title: "System Connectors", description: "Connectors for each system in scope, using the access method it supports.", icon: "RefreshCw" },
            { title: "Data Mapping Documentation", description: "What data moves where, in which format, and why.", icon: "FileText" },
            { title: "Access & Security Setup", description: "Credentials, roles and permissions configured with your IT team.", icon: "Lock" },
            { title: "Monitoring & Alerts", description: "Alerts when a connection fails or data looks wrong, so issues are caught early.", icon: "BarChart3" },
            { title: "Cloud or On-Premise Deployment", description: "Deployed in the environment agreed with you.", icon: "CloudUpload" }
        ],
        useCases: [
            { industry: "ERP", title: "Pricing & Stock Lookups", description: "Let AI check product, price and availability data while preparing quotations or replies." },
            { industry: "CRM", title: "Automatic Record Updates", description: "Log enquiries, quotations and follow-ups against the right customer without manual entry." },
            { industry: "Email", title: "Inbox-to-Workflow Routing", description: "Turn incoming emails and attachments into structured work items." },
            { industry: "WhatsApp", title: "Customer & Dealer Messaging", description: "Handle routine order and status messages and hand the rest to your team." },
            { industry: "Documents", title: "Company Knowledge Search", description: "Give AI access to specs, SOPs and past documents so answers reflect your business." },
            { industry: "Databases", title: "Reporting Pipelines", description: "Combine data from several systems for automated management reports." }
        ],
        techStack: [
            { name: "Node.js", slug: "nodedotjs", category: "Integration Services" },
            { name: "Python", slug: "python", category: "Data & AI" },
            { name: "TypeScript", slug: "typescript", category: "Language" },
            { name: "REST APIs", slug: null, category: "Integration" },
            { name: "GraphQL", slug: "graphql", category: "Integration" },
            { name: "PostgreSQL", slug: "postgresql", category: "Database" },
            { name: "Redis", slug: "redis", category: "Queue & Cache" },
            { name: "Docker", slug: "docker", category: "Infrastructure" },
            { name: "AWS", slug: "amazonwebservices", category: "Cloud" },
            { name: "Cloudflare", slug: "cloudflare", category: "Network" }
        ],
        faqs: [
            { question: "Which systems can you connect to?", answer: "It depends on the system. Most modern ERPs and CRMs offer APIs; older or on-premise systems can often be connected through database access, scheduled exports or email. We confirm the approach for each of your systems before building." },
            { question: "Does our IT team need to be involved?", answer: "Yes. Access, credentials and data flows are agreed with your IT team, and they keep control of the accounts and permissions the integration uses." },
            { question: "What if our system has no API?", answer: "We look at other routes — database views, file exports, email-based processing or, where appropriate, a small custom service built alongside the system. We'll tell you the trade-offs of each." },
            { question: "Is our data copied somewhere else?", answer: "We design integrations to access only what each workflow needs. Where data is stored and processed is agreed with you before anything is built." }
        ]
    },

    // --- SOFTWARE ENGINEERING (websites, apps, custom software) ---
    {
        id: "website",
        categoryId: "tech",
        categoryLabel: "Software Engineering",
        title: "Website Development",
        shortDescription: "Fast, secure business websites and web platforms, built to connect with your CRM and workflows.",
        heroImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2000",
        overview: "We design and build business websites and web platforms that are fast, easy to manage and connected to the rest of your operations — so enquiries flow straight into your CRM or AI workflows instead of sitting in an inbox.",
        features: [
            { title: "Custom Architecture", description: "Built from the ground up using modern frameworks like React and Next.js.", icon: "Monitor" },
            { title: "Responsive Design", description: "A consistent experience across phones, tablets and desktops.", icon: "Smartphone" },
            { title: "Connected to Your Systems", description: "Forms, enquiries and quote requests routed into your CRM or AI workflows.", icon: "RefreshCw" }
        ],
        process: [
            { step: "01", title: "Discovery & Strategy", description: "Understanding your brand, target audience, and digital objectives." },
            { step: "02", title: "UI/UX Design", description: "Crafting intuitive user journeys and stunning visual interfaces." },
            { step: "03", title: "Development", description: "Writing clean, performant, and scalable code." },
            { step: "04", title: "Launch", description: "Rigorous testing and seamless deployment to production." }
        ],
        benefits: [
            { title: "More Enquiries Captured", description: "Clear user journeys and forms that feed straight into your sales process." },
            { title: "Fast Load Times", description: "Performance built in from the start, on every device." },
            { title: "Ready to Grow", description: "Easy to extend with portals, integrations and AI features later." }
        ],
        deliverables: [
            { title: "Production-Ready Codebase", description: "Clean, documented, version-controlled source code hosted on your GitHub or ours.", icon: "FileText" },
            { title: "Pixel-Perfect Figma Files", description: "Editable design systems, components, and tokens you can hand to any future designer.", icon: "Palette" },
            { title: "CMS & Admin Panel", description: "A non-technical content interface so your team can publish without engineering tickets.", icon: "Database" },
            { title: "Performance Audit Report", description: "Lighthouse scores and Core Web Vitals measured at launch, as a baseline for future work.", icon: "BarChart3" },
            { title: "Technical SEO Foundation", description: "Schema markup, sitemap, robots.txt and OG tags set up correctly from day one.", icon: "Layers" },
            { title: "Hosting & DNS Setup", description: "Production deployment on Vercel, AWS, or your cloud of choice — fully configured.", icon: "CloudUpload" }
        ],
        useCases: [
            { industry: "Manufacturing", title: "Product & Capability Sites", description: "Product catalogues, capability pages and RFQ forms that route enquiries to your sales team." },
            { industry: "Distribution", title: "Dealer & Partner Portals", description: "Logged-in areas for dealers to check products, place orders and track status." },
            { industry: "B2B Services", title: "Corporate Websites", description: "Clear, credible company sites that explain what you do and who you do it for." },
            { industry: "Healthcare", title: "Clinic & Practice Sites", description: "Booking flows, doctor profiles and patient resource libraries." },
            { industry: "Finance", title: "Corporate Web Presence", description: "Compliance-ready content structures for banks, NBFCs and wealth management firms." },
            { industry: "E-commerce", title: "Online Storefronts", description: "Shopify and custom Next.js storefronts connected to inventory and order systems." }
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
        faqs: [
            { question: "How long does a typical website project take?", answer: "It depends on the number of pages, integrations and custom features. We share a week-by-week timeline in our scoping document before we start." },
            { question: "Do you build on Next.js exclusively?", answer: "Next.js is our default for new builds because of its performance and SEO ergonomics, but we also work in Astro, Remix, and SvelteKit where the project demands it." },
            { question: "Can I edit content myself after launch?", answer: "Yes — sites can ship with a CMS so your team can update copy, swap images and add pages without filing engineering tickets." },
            { question: "Do you handle hosting and ongoing maintenance?", answer: "We deploy to Vercel or AWS by default, transfer ownership to your account, and offer optional retainers for security patches, dependency updates, and feature work." },
            { question: "Can the website connect to our CRM or AI workflows?", answer: "Yes. Enquiry and RFQ forms can feed directly into your CRM, and into AI workflows that read the request and prepare a response for your team to review." }
        ]
    },
    {
        id: "app",
        categoryId: "tech",
        categoryLabel: "Software Engineering",
        title: "App Development",
        shortDescription: "Mobile and web apps for customers, field teams and internal operations, with AI features where they help.",
        heroImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=2000",
        overview: "We build mobile and desktop apps for the people who keep your business running — customers, dealers, sales and field teams, and back-office staff. Apps connect to your existing systems, and can include AI features such as document capture or assisted replies where they genuinely save time.",
        features: [
            { title: "Cross-Platform", description: "Build once for iOS and Android with React Native or Flutter.", icon: "Smartphone" },
            { title: "Connected to Your Systems", description: "Real-time data from your ERP, CRM and databases, with offline support where needed.", icon: "RefreshCw" },
            { title: "Secure Architecture", description: "Role-based access and secure authentication protecting business and user data.", icon: "ShieldCheck" }
        ],
        process: [
            { step: "01", title: "Requirements Analysis", description: "Defining core functionalities and technical constraints." },
            { step: "02", title: "Prototyping", description: "Interactive wireframes to visualize the app flow." },
            { step: "03", title: "Agile Development", description: "Iterative sprints to build features rapidly." },
            { step: "04", title: "Deployment", description: "App Store submission and enterprise rollout." }
        ],
        benefits: [
            { title: "Work From Anywhere", description: "Sales, service and field teams get the information they need on the move." },
            { title: "Less Manual Entry", description: "Data captured once in the app flows straight into your systems." },
            { title: "Better Customer Experience", description: "Customers and dealers can order, track and get answers without calling." }
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
            { industry: "Manufacturing", title: "Dealer & Sales Apps", description: "Product catalogues, order capture, stock checks and order tracking for dealers and sales teams." },
            { industry: "Logistics", title: "Fleet & Driver Apps", description: "GPS tracking, offline-first sync, route planning and proof-of-delivery capture." },
            { industry: "Field Service", title: "Service Engineer Apps", description: "Job lists, checklists, photo capture and customer sign-off, synced back to your systems." },
            { industry: "Healthcare", title: "Patient & Provider Apps", description: "Appointments, consultations, prescriptions and records integrations." },
            { industry: "Retail & D2C", title: "Customer Apps", description: "Ordering, loyalty and account management connected to your inventory and CRM." },
            { industry: "Enterprise", title: "Internal Tooling", description: "Approval workflows, inspections and field-force apps integrated with your ERP." }
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
        faqs: [
            { question: "Native or cross-platform — which should I pick?", answer: "We default to React Native or Flutter for most apps because they cover iOS and Android from one codebase. We recommend fully native only when your app needs deep OS integration — and we'll be upfront if that's your case." },
            { question: "Do you handle App Store and Play Store submission?", answer: "Yes — we manage the entire submission process including listing copy, screenshots, app review responses, and post-launch update rollouts." },
            { question: "What about backend infrastructure?", answer: "We typically build the backend in Node.js with PostgreSQL, deploy to AWS or GCP, and document everything. You get the keys — no vendor lock-in." },
            { question: "How do you handle ongoing app maintenance?", answer: "Apps need regular maintenance: iOS and Android updates, dependency patches and bug fixes. We offer maintenance retainers sized to your app." },
            { question: "Can the app include AI features?", answer: "Yes, where they save real time — for example reading a photographed document, suggesting replies, or pulling answers from your company knowledge. We only add AI where it clearly helps the user." },
            { question: "Can the app work offline?", answer: "Yes — for logistics, field-service, and travel apps we build offline-first architectures with local storage, conflict resolution, and background sync." }
        ]
    },
    {
        id: "erp",
        categoryId: "tech",
        categoryLabel: "Software Engineering",
        title: "Custom Software & ERP Development",
        shortDescription: "Custom ERP, workflow systems and internal platforms built around how your business actually operates.",
        heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2000",
        overview: "When off-the-shelf software doesn't fit how you work, we build systems that do. Custom ERP, order and inventory management, approval workflows and internal portals — designed around your processes, and structured so AI workflows can be added on top as your business is ready.",
        features: [
            { title: "Data Unification", description: "Bring operational data from spreadsheets and disconnected tools into one system.", icon: "Database" },
            { title: "Process Automation", description: "Automate approvals, reporting, inventory and finance workflows.", icon: "RefreshCw" },
            { title: "AI-Ready Foundation", description: "Clean, structured data and APIs that AI agents can work with later.", icon: "Brain" }
        ],
        process: [
            { step: "01", title: "Systems Audit", description: "Evaluating existing legacy systems and data structures." },
            { step: "02", title: "Architecture Design", description: "Mapping out the new operational ecosystem." },
            { step: "03", title: "Custom Integration", description: "Connecting APIs and migrating historical data." },
            { step: "04", title: "Training & Adoption", description: "Ensuring smooth transition for your workforce." }
        ],
        benefits: [
            { title: "Fits How You Work", description: "Software shaped around your processes, not the other way round." },
            { title: "Complete Visibility", description: "See the current state of orders, stock and finances in one place." },
            { title: "Ready for AI", description: "A structured foundation that makes future AI deployment simpler." }
        ],
        deliverables: [
            { title: "Custom ERP Platform", description: "A modular, role-based web application tailored to your exact operational workflows.", icon: "Layers" },
            { title: "Role-Based Access Control", description: "Granular permissions for finance, sales, ops, HR, and executive leadership.", icon: "Lock" },
            { title: "Migrated Historical Data", description: "Clean, validated import of your legacy data — Excel, Tally, SAP, or whatever you're on.", icon: "Database" },
            { title: "Reporting & BI Dashboards", description: "Real-time finance, inventory, and operations dashboards with export-to-Excel/PDF.", icon: "BarChart3" },
            { title: "API & Integration Layer", description: "Pre-built connectors to your CRM, payment gateway, accounting tool, and logistics partners.", icon: "RefreshCw" },
            { title: "Team Training & SOPs", description: "Onboarding sessions, role-specific user guides, and post-launch adoption support.", icon: "FileText" }
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
        faqs: [
            { question: "Custom ERP vs SAP/Oracle/Zoho — why build from scratch?", answer: "Off-the-shelf ERPs work great if your operations fit their model. For businesses with unique workflows — custom pricing logic, non-standard inventory rules, hybrid manufacturing — a tailored ERP can be more cost-effective over time and far more adaptable. We'll do an honest scoping call before we recommend either path." },
            { question: "Can it integrate with our existing Tally / Zoho Books / SAP?", answer: "Usually, yes. We build connectors to accounting, CRM and logistics systems wherever they allow it, so your ERP becomes the operational hub without forcing a finance-team migration. We confirm the approach for each system during scoping." },
            { question: "What about data migration from our legacy system?", answer: "Migration is a dedicated workstream. We audit your existing data, clean inconsistencies, map fields, run dry-runs in staging, and then cut over with a rollback plan. Zero data loss is non-negotiable." },
            { question: "Is the ERP hosted in the cloud or on-premise?", answer: "Both are options. Most clients go cloud (AWS or Azure) for cost and remote access. For regulated industries we deploy on-premise or in a VPC with your compliance team's approvals." },
            { question: "Can AI be added to the system later?", answer: "Yes — and we design for it. Structured data and clean APIs mean AI agents can later read orders, prepare quotations or flag exceptions without rebuilding the system." },
            { question: "How do you handle user training?", answer: "Role-based training sessions, recorded walkthroughs, written SOPs, and a post-launch support window where our team responds to user queries directly." }
        ]
    },
    {
        id: "website-revamp",
        categoryId: "tech",
        categoryLabel: "Software Engineering",
        title: "Website Revamp",
        shortDescription: "Modernise an outdated website into a fast, credible platform that reflects what your business does today.",
        heroImage: "https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&q=80&w=2000",
        overview: "When your business has moved on but your website hasn't, we rebuild it — new design, modern technology and clearer messaging — while protecting the search rankings and content you've already built up.",
        features: [
            { title: "UI/UX Overhaul", description: "A fresh design built around clear messaging and easy navigation.", icon: "Palette" },
            { title: "Tech Stack Modernization", description: "Migration from slow legacy code to modern frameworks.", icon: "Layers" },
            { title: "Careful Migration", description: "Content moved intact and every old URL redirected correctly.", icon: "ShieldCheck" }
        ],
        process: [
            { step: "01", title: "Legacy Audit", description: "Mapping your current site structure, traffic drops, and technical debt." },
            { step: "02", title: "Redesign", description: "Creating a modernised visual identity and user flow." },
            { step: "03", title: "Development Phase", description: "Building the new platform while your existing site remains fully operational." },
            { step: "04", title: "Planned Cutover", description: "A planned switch-over to the new platform with minimal disruption." }
        ],
        benefits: [
            { title: "A Site That Reflects You Today", description: "Messaging and design that match what your business now offers." },
            { title: "Rankings Protected", description: "Careful 301 mapping to preserve the search visibility you've built." },
            { title: "Easier to Extend", description: "A flexible foundation for portals, integrations and AI features later." }
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
        faqs: [
            { question: "Will my SEO rankings drop after a revamp?", answer: "We work to prevent that. Every redirect, metadata field, schema entry and URL is mapped before launch, and we monitor rankings after launch so any dips can be caught and fixed quickly." },
            { question: "Can you keep my current content and just modernize the design and tech?", answer: "Absolutely. Content migration is part of every revamp — we preserve blog posts, case studies, and resources with full structure, metadata, and image assets intact." },
            { question: "How long is the typical revamp timeline?", answer: "It depends on the number of pages, integrations and custom features. The old site stays live the entire time, and we share the timeline before we start." },
            { question: "What if I'm on WordPress and want to stay there?", answer: "If WordPress is the right fit for your team, we'll modernize within WordPress — new theme, performance optimization, headless API layer if needed. We won't force a stack change just to charge for one." },
            { question: "Do you handle the actual go-live cutover?", answer: "Yes — DNS, redirects, search-console updates, sitemap submission and close monitoring during the cutover window." }
        ]
    },
    {
        id: "interactive-3d",
        categoryId: "tech",
        categoryLabel: "Software Engineering",
        title: "Interactive 3D Website",
        shortDescription: "Interactive 3D product and experience websites built with WebGL.",
        heroImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=2000",
        overview: "For products that are easier to understand when you can see them from every angle, we build interactive 3D websites using WebGL, Three.js and React Three Fiber — product viewers, configurators and walkthroughs that run directly in the browser.",
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
            { title: "Products Explained Visually", description: "Let buyers explore machines, products and spaces before they talk to sales." },
            { title: "Distinctive Presence", description: "A memorable experience that sets you apart from competitors." },
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
        faqs: [
            { question: "Will this work on mobile devices?", answer: "Yes — every 3D project we ship has a mobile performance budget from day one. We tune poly counts, texture sizes and shader complexity for mid-tier phones, and serve a 2D fallback for very old or low-end devices." },
            { question: "How do 3D sites affect SEO?", answer: "We render text content as standard HTML alongside the 3D canvas — so search engines crawl all your copy, headings, and metadata normally. The 3D layer is a visual enhancement, not a replacement for indexable content." },
            { question: "Do you need 3D source files from us, or do you build the assets?", answer: "Either works. If you have CAD or Blender files, great — we'll optimize and stage them. If you're starting from scratch, our 3D team models, textures, and rigs everything based on your brief and references." },
            { question: "What's the typical timeline for a 3D website?", answer: "It depends on the number and complexity of 3D assets. We prototype the heaviest scene first so we can lock the performance budget early, and share the timeline before we start." },
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

    // Growth-marketing services (Meta Ads, SMM, SEO, Google Ads) were
    // retired. Their old URLs are redirected in middleware.ts.
];
