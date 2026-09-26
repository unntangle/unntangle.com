/**
 * Service page layouts — which sections each /services/[slug] page shows,
 * in what order, with what content. Every service has its own line-up so
 * pages don't share a template.
 *
 * Signature blocks (content defined here):
 *   timeline · checklist · bento · compare · chips · flow · tiers
 * Shared blocks (content pulled from data/services.ts, heading set here):
 *   capabilities · approach · deliverables · usecases · benefits · tools · faq
 *
 * The overview and closing CTA are always shown and are not listed here.
 * Content is practical description only — no invented statistics or clients.
 */

export type Actor = 'ai' | 'human' | 'system';

interface Head {
    heading: string;
    /** trailing words of the heading shown in the accent colour */
    accent?: string;
    intro?: string;
}

export type ServiceSection =
    | (Head & { type: 'timeline'; items: { title: string; text: string }[] })
    | (Head & { type: 'checklist'; items: string[]; aside?: string })
    | (Head & { type: 'bento'; items: { icon: string; title: string; text: string; wide?: boolean }[] })
    | (Head & { type: 'compare'; left: string; right: string; rows: { left: string; right: string }[] })
    | (Head & { type: 'chips'; groups: { label: string; items: string[] }[] })
    | (Head & { type: 'flow'; items: { title: string; text: string; actor: Actor }[] })
    | (Head & { type: 'tiers'; items: { name: string; text: string; points: string[]; tag?: string }[] })
    | (Head & { type: 'capabilities' | 'approach' | 'deliverables' | 'usecases' | 'benefits' | 'tools' | 'faq' });

export const serviceLayouts: Record<string, ServiceSection[]> = {
    // ------------------------------------------------------------------
    'ai-workflow-assessment': [
        {
            type: 'timeline',
            heading: 'The Seven Steps of an',
            accent: 'Assessment',
            intro: 'A structured look at how your business runs today, before anything is built.',
            items: [
                { title: 'Understand Your Operations', text: 'How work moves across departments, who owns what, and where the pressure points are.' },
                { title: 'Map Key Workflows', text: 'The real sequence of steps for the processes that matter, including the spreadsheets and workarounds.' },
                { title: 'Identify Repetitive Work', text: 'Tasks that happen often, follow recognisable rules and involve reading or re-typing information.' },
                { title: 'Review Systems and Data', text: 'Which systems hold the data a workflow needs, and how they can be reached safely.' },
                { title: 'Score Each Opportunity', text: 'Value, complexity, data readiness and risk, compared on the same scale.' },
                { title: 'Recommend AI Use Cases', text: 'The workflows worth starting with, and the ones that should stay with people.' },
                { title: 'Plan the First Deployment', text: 'Scope, integrations, approval points and how success will be measured.' },
            ],
        },
        { type: 'deliverables', heading: 'The Assessment', accent: 'Pack', intro: 'What you receive at the end, yours to keep whether or not we build anything next.' },
        {
            type: 'checklist',
            heading: 'Who Should Be',
            accent: 'in the Room',
            intro: 'The assessment works best with a small group who know how the work really happens.',
            items: [
                'An operations or business head',
                'Leads for the departments being reviewed',
                'People who do the work day to day',
                'Whoever owns your ERP, CRM and IT systems',
                'A finance or budget decision-maker',
                'Anyone who approves customer-facing output',
            ],
            aside: 'Most sessions are a few hours per department, not weeks of workshops.',
        },
        {
            type: 'compare',
            heading: 'Assessment First vs.',
            accent: 'Pilot First',
            left: 'Jumping straight to a pilot',
            right: 'Starting with an assessment',
            rows: [
                { left: 'Starts from a technology someone wants to try', right: 'Starts from the work that consumes your team\u2019s time' },
                { left: 'Success is judged by whether the demo impressed', right: 'Success measures are agreed before anything is built' },
                { left: 'Integration questions surface late', right: 'Systems and data access are reviewed up front' },
                { left: 'Human approval is added as an afterthought', right: 'Approval points are designed into the plan' },
            ],
        },
        {
            type: 'tiers',
            heading: 'What Happens',
            accent: 'After',
            intro: 'Three honest outcomes. All of them are useful.',
            items: [
                { name: 'Start With One Workflow', tag: 'Most common', text: 'Deploy AI into the highest-scoring workflow first.', points: ['Clear scope and success measures', 'Approval steps agreed with your team', 'Expand once it proves itself'] },
                { name: 'Prepare Your Systems First', text: 'Some workflows need data or integration groundwork before AI can help.', points: ['Clean up key data sources', 'Add missing integrations', 'Revisit AI once the foundation is ready'] },
                { name: 'Not the Right Time', text: 'Sometimes the honest answer is that AI isn\u2019t the right fix yet.', points: ['You keep the full assessment', 'Process improvements you can act on', 'No obligation to build anything'] },
            ],
        },
        { type: 'faq', heading: 'Assessment', accent: 'Questions' },
    ],

    // ------------------------------------------------------------------
    'ai-agents': [
        {
            type: 'flow',
            heading: 'Anatomy of an',
            accent: 'AI Agent',
            intro: 'Every agent we deploy follows the same shape: AI prepares, people decide, systems stay in sync.',
            items: [
                { title: 'Trigger', text: 'An email, document, form or scheduled check starts the workflow.', actor: 'system' },
                { title: 'Read', text: 'The agent extracts what matters from the request and attachments.', actor: 'ai' },
                { title: 'Check', text: 'It looks up pricing, stock, records or history in your systems.', actor: 'ai' },
                { title: 'Prepare', text: 'A draft quote, reply, reminder or report is produced.', actor: 'ai' },
                { title: 'Approve', text: 'The right person reviews, edits or rejects it.', actor: 'human' },
                { title: 'Act and Log', text: 'Once approved it\u2019s sent, systems are updated and every step is recorded.', actor: 'system' },
            ],
        },
        {
            type: 'bento',
            heading: 'Agents We',
            accent: 'Deploy',
            items: [
                { icon: 'Handshake', title: 'Sales Agent', text: 'Reads RFQs, drafts quotations from ERP pricing and prepares follow-ups.', wide: true },
                { icon: 'Receipt', title: 'Finance Agent', text: 'Flags overdue invoices and prepares reminder batches.' },
                { icon: 'ShoppingCart', title: 'Procurement Agent', text: 'Compares vendor quotes line by line.' },
                { icon: 'Settings2', title: 'Operations Agent', text: 'Monitors workflows and flags exceptions.' },
                { icon: 'MessagesSquare', title: 'Customer Service Agent', text: 'Answers routine queries from your own data and escalates the rest.' },
                { icon: 'BarChart3', title: 'Management Intelligence', text: 'Combines data from your systems into a regular briefing for decision-makers.', wide: true },
            ],
        },
        {
            type: 'checklist',
            heading: 'Guardrails Built Into',
            accent: 'Every Agent',
            intro: 'Agents act inside your business, so control is designed in from day one.',
            items: [
                'Approval before anything reaches a customer',
                'Access limited to the data a workflow needs',
                'Clear rules for when to escalate to a person',
                'Every action logged and reviewable',
                'Uncertain cases flagged, not guessed',
                'Easy to pause or roll back',
            ],
        },
        { type: 'usecases', heading: 'Where Agents', accent: 'Earn Their Keep' },
        { type: 'benefits', heading: 'What Changes for Your Team' },
        { type: 'faq', heading: 'Questions About', accent: 'AI Agents' },
    ],

    // ------------------------------------------------------------------
    'ai-integration': [
        {
            type: 'chips',
            heading: 'Systems We',
            accent: 'Connect',
            intro: 'AI is only as useful as the data it can reach. These are the systems we typically connect.',
            groups: [
                { label: 'Business Systems', items: ['ERP', 'CRM', 'Accounting', 'Inventory', 'HRMS', 'Order management'] },
                { label: 'Communication', items: ['Email', 'WhatsApp', 'Microsoft Teams', 'Slack', 'Web forms'] },
                { label: 'Documents & Data', items: ['PDFs', 'Excel', 'Google Sheets', 'SharePoint', 'SQL databases'] },
                { label: 'Custom Software', items: ['Internal apps', 'REST APIs', 'Webhooks', 'Legacy systems'] },
            ],
        },
        {
            type: 'tiers',
            heading: 'Four Ways to',
            accent: 'Connect',
            intro: 'The right route depends on what each system supports. Most deployments use more than one.',
            items: [
                { name: 'APIs', tag: 'Cleanest', text: 'Documented, permissioned endpoints for reading and writing.', points: ['Modern ERPs and CRMs', 'Real-time where needed'] },
                { name: 'Database Access', text: 'Read-only views for older or on-premise systems.', points: ['Specific tables only', 'Writes handled carefully'] },
                { name: 'Scheduled Exports', text: 'Reports exported and imported on a schedule.', points: ['Easy for IT to control', 'Good for daily reporting'] },
                { name: 'Inbox Connections', text: 'A shared mailbox as the front door for work.', points: ['Where many workflows start', 'No change for customers'] },
            ],
        },
        {
            type: 'checklist',
            heading: 'Security Questions',
            accent: 'We Settle First',
            intro: 'Answering these early is what lets your IT team say yes with confidence.',
            items: [
                'Which data does this workflow actually need?',
                'Whose credentials does the integration use?',
                'Where is data processed and stored?',
                'What happens when a system is down?',
                'How is every change logged?',
                'Who can revoke access, and how quickly?',
            ],
        },
        {
            type: 'compare',
            heading: 'Point-to-Point vs. an',
            accent: 'Integration Layer',
            left: 'Direct point-to-point links',
            right: 'A shared integration layer',
            rows: [
                { left: 'Every new system multiplies the connections', right: 'Each system connects once' },
                { left: 'An API change breaks several links', right: 'One adapter to update' },
                { left: 'Failures are hard to see', right: 'Sync status and failures in one place' },
                { left: 'Each workflow rebuilds access', right: 'New workflows reuse existing connections' },
            ],
        },
        { type: 'tools', heading: 'Integration', accent: 'Toolkit' },
        { type: 'faq', heading: 'Integration', accent: 'Questions' },
    ],

    // ------------------------------------------------------------------
    website: [
        {
            type: 'bento',
            heading: 'Included in',
            accent: 'Every Site',
            items: [
                { icon: 'Monitor', title: 'Responsive Design', text: 'Built for phones first, and sharp on every screen.', wide: true },
                { icon: 'FileText', title: 'Easy Content Editing', text: 'A CMS your team can update without a developer.' },
                { icon: 'Search', title: 'Technical SEO', text: 'Clean structure, schema and metadata from day one.' },
                { icon: 'Zap', title: 'Fast Loading', text: 'Performance budgets and Core Web Vitals checked before launch.' },
                { icon: 'Mail', title: 'Forms Connected', text: 'Enquiries flow straight into your CRM or inbox.' },
                { icon: 'BarChart3', title: 'Analytics', text: 'Privacy-configured tracking so you know what\u2019s working.', wide: true },
            ],
        },
        {
            type: 'tiers',
            heading: 'Sites',
            accent: 'We Build',
            items: [
                { name: 'Company Website', text: 'The core site that explains who you are and what you do.', points: ['Service and about pages', 'Knowledge hub or blog', 'Contact and enquiry flows'] },
                { name: 'Product or Service Site', text: 'Focused on one offer, built to convert.', points: ['Feature and pricing pages', 'Comparison and FAQ sections', 'Demo or trial sign-up'] },
                { name: 'Campaign Landing Pages', text: 'Fast pages for launches, events and campaigns.', points: ['Built to a single goal', 'Easy to duplicate and test', 'Connected to your CRM'] },
            ],
        },
        { type: 'approach', heading: 'From Brief to', accent: 'Launch' },
        {
            type: 'checklist',
            heading: 'Our Pre-Launch',
            accent: 'Checklist',
            items: [
                'Every page tested on mobile and desktop',
                'Forms tested end to end',
                'Metadata and sitemap in place',
                'Redirects checked',
                'Analytics verified',
                'Accessibility spot-checked with a keyboard',
            ],
        },
        { type: 'tools', heading: 'Built With' },
        { type: 'faq', heading: 'Website', accent: 'Questions' },
    ],

    // ------------------------------------------------------------------
    'website-revamp': [
        {
            type: 'checklist',
            heading: 'Signs It\u2019s Time for a',
            accent: 'Revamp',
            items: [
                'Pages are slow, especially on mobile',
                'Updating content needs a developer',
                'The site no longer reflects what you do',
                'Enquiries don\u2019t reach the right people',
                'The platform is outdated or insecure',
                'Search traffic has plateaued',
            ],
        },
        {
            type: 'compare',
            heading: 'What We Change, What',
            accent: 'We Protect',
            left: 'What we rebuild',
            right: 'What we protect',
            rows: [
                { left: 'Design, layout and user journeys', right: 'URLs that already rank, with redirects where they must change' },
                { left: 'Platform and codebase', right: 'Content depth on pages that bring traffic' },
                { left: 'Page speed and mobile experience', right: 'Titles, descriptions, canonicals and structured data' },
                { left: 'Forms and lead handling', right: 'Backlinks pointing at your existing pages' },
            ],
        },
        {
            type: 'timeline',
            heading: 'Migration Without the',
            accent: 'Traffic Drop',
            items: [
                { title: 'Audit What\u2019s Indexed', text: 'Every live URL, its traffic and its backlinks, recorded before design starts.' },
                { title: 'Map Every Redirect', text: 'Single-hop 301s from each old URL to its new home. No chains.' },
                { title: 'Carry Over Metadata', text: 'Titles, descriptions, canonicals, schema and alt text moved deliberately.' },
                { title: 'Stage Behind a Password', text: 'The new site is tested privately so it never competes with the live one.' },
                { title: 'Launch Early in the Week', text: 'Never on a Friday, with the team available to respond.' },
                { title: 'Watch the First 72 Hours', text: 'Crawl stats, coverage and traffic checked daily so issues are caught early.' },
            ],
        },
        { type: 'deliverables', heading: 'What', accent: 'You Get' },
        { type: 'faq', heading: 'Revamp', accent: 'Questions' },
    ],

    // ------------------------------------------------------------------
    app: [
        {
            type: 'tiers',
            heading: 'Choosing the Right',
            accent: 'Platform',
            items: [
                { name: 'Cross-Platform', tag: 'Most apps', text: 'One codebase for iOS and Android.', points: ['React Native or Flutter', 'Faster to build and maintain', 'Near-native performance'] },
                { name: 'Native iOS & Android', text: 'Separate apps for demanding use cases.', points: ['Heavy graphics or hardware access', 'Platform-specific features', 'Highest performance ceiling'] },
                { name: 'Web App or PWA', text: 'Runs in the browser, installable on phones.', points: ['No app store needed', 'Great for internal tools', 'One URL for every device'] },
            ],
        },
        {
            type: 'bento',
            heading: 'Feature',
            accent: 'Modules',
            intro: 'The building blocks most apps need, designed around your users.',
            items: [
                { icon: 'Lock', title: 'Sign-In & Accounts', text: 'Secure login, roles and permissions.' },
                { icon: 'CreditCard', title: 'Payments', text: 'In-app payments and subscriptions.' },
                { icon: 'Bell', title: 'Notifications', text: 'Timely, relevant push and in-app alerts.' },
                { icon: 'WifiOff', title: 'Offline Mode', text: 'Works without a connection, syncs later.' },
                { icon: 'MapPin', title: 'Maps & Location', text: 'Field teams, deliveries and check-ins.' },
                { icon: 'MessageCircle', title: 'Chat & Support', text: 'Conversations with customers or teams.' },
                { icon: 'LayoutDashboard', title: 'Admin Panel', text: 'Manage users, content and data from the web.', wide: true },
            ],
        },
        {
            type: 'flow',
            heading: 'Our Release',
            accent: 'Pipeline',
            intro: 'Releases become routine, not events.',
            items: [
                { title: 'Build on Every Merge', text: 'An installable build is produced automatically.', actor: 'system' },
                { title: 'Internal Testing', text: 'Your team uses real builds throughout development.', actor: 'human' },
                { title: 'Staged Rollout', text: 'New versions go to a small share of users first.', actor: 'system' },
                { title: 'Monitor', text: 'Crashes and key metrics watched before widening.', actor: 'human' },
                { title: 'Feature Flags', text: 'Features switched on or off without a new release.', actor: 'system' },
            ],
        },
        { type: 'usecases', heading: 'Apps We', accent: 'Build' },
        { type: 'faq', heading: 'App', accent: 'Questions' },
    ],

    // ------------------------------------------------------------------
    erp: [
        {
            type: 'bento',
            heading: 'Modules Built Around',
            accent: 'How You Work',
            items: [
                { icon: 'Package', title: 'Inventory', text: 'Stock across locations, in real time.', wide: true },
                { icon: 'ClipboardList', title: 'Sales & Orders', text: 'Quotes, orders and fulfilment.' },
                { icon: 'ShoppingCart', title: 'Purchasing', text: 'Requisitions, POs and vendors.' },
                { icon: 'Factory', title: 'Production', text: 'Planning, jobs and capacity.' },
                { icon: 'Wallet', title: 'Finance', text: 'Invoicing, receivables and reporting.' },
                { icon: 'Users', title: 'People', text: 'Teams, roles and approvals.' },
                { icon: 'BarChart3', title: 'Reporting', text: 'Dashboards your managers actually use.', wide: true },
            ],
        },
        {
            type: 'compare',
            heading: 'Off-the-Shelf vs.',
            accent: 'Custom',
            intro: 'Custom isn\u2019t always the answer. Here\u2019s how we help you decide.',
            left: 'Off-the-shelf ERP fits when\u2026',
            right: 'Custom ERP fits when\u2026',
            rows: [
                { left: 'Your processes match industry standard', right: 'Your process is part of your competitive advantage' },
                { left: 'You can adapt how teams work to the software', right: 'Adapting would mean losing something that works' },
                { left: 'Licence costs are acceptable at your scale', right: 'Licence and customisation costs keep growing' },
                { left: 'You need it running quickly', right: 'You want a system that grows with you, module by module' },
            ],
        },
        {
            type: 'timeline',
            heading: 'Data Migration,',
            accent: 'Done Carefully',
            items: [
                { title: 'Profile the Data', text: 'Find duplicates, gaps and inconsistent units early and honestly.' },
                { title: 'Clean It', text: 'Fix what matters before it moves, not after go-live.' },
                { title: 'Map Old to New', text: 'Every field and record type given a clear home.' },
                { title: 'Trial Migration', text: 'A full rehearsal on real data, checked by your team.' },
                { title: 'Reconcile', text: 'Totals and key records compared between old and new.' },
                { title: 'Cut Over', text: 'A planned switch with support embedded in each team.' },
            ],
        },
        {
            type: 'chips',
            heading: 'Connected to',
            accent: 'Everything Else',
            groups: [
                { label: 'Sales Channels', items: ['E-commerce', 'Marketplaces', 'Distributor portals'] },
                { label: 'Finance', items: ['Accounting', 'Payroll', 'Banking', 'GST filing tools'] },
                { label: 'Operations', items: ['Warehouse systems', 'Logistics', 'IoT and sensors'] },
                { label: 'AI Workflows', items: ['Quotation agents', 'Collections', 'Procurement', 'Reporting'] },
            ],
        },
        { type: 'benefits', heading: 'Why Teams Switch' },
        { type: 'faq', heading: 'ERP', accent: 'Questions' },
    ],

    // ------------------------------------------------------------------
    'interactive-3d': [
        {
            type: 'tiers',
            heading: 'Experience',
            accent: 'Types',
            items: [
                { name: 'Product Configurator', tag: 'Most requested', text: 'Customers build their exact product before buying.', points: ['Finishes, sizes and options', 'Shareable configuration links', 'Connected to real inventory'] },
                { name: 'Virtual Walkthrough', text: 'Explore a space before it\u2019s built or visited.', points: ['Real estate and hospitality', 'Showrooms and events', 'Guided or free movement'] },
                { name: '3D Product Viewer', text: 'Rotate, zoom and inspect from every angle.', points: ['Lightweight and fast', 'Works on product pages', 'AR view on phones'] },
            ],
        },
        {
            type: 'flow',
            heading: 'From CAD to',
            accent: 'Browser',
            items: [
                { title: 'Source Model', text: 'CAD files or a new model built from references.', actor: 'human' },
                { title: 'Optimise', text: 'Geometry rebuilt for real-time rendering.', actor: 'system' },
                { title: 'Bake Detail', text: 'High-resolution detail baked into textures.', actor: 'system' },
                { title: 'Compress', text: 'Geometry and textures compressed for fast loading.', actor: 'system' },
                { title: 'Load Progressively', text: 'An image shows first; the 3D loads behind it.', actor: 'system' },
            ],
        },
        {
            type: 'checklist',
            heading: 'Our Performance',
            accent: 'Budget',
            intro: 'Beautiful 3D that loads slowly loses customers, so every experience is held to a budget.',
            items: [
                'First view in under three seconds on a mid-range phone',
                'Static fallback for older devices',
                'No download cost for visitors who don\u2019t interact',
                'Keyboard and reduced-motion support',
                'Tested on real devices, not just fast laptops',
                'Page speed checked with the 3D in place',
            ],
        },
        { type: 'usecases', heading: 'Where 3D', accent: 'Pays Off' },
        { type: 'tools', heading: '3D', accent: 'Toolkit' },
        { type: 'faq', heading: '3D', accent: 'Questions' },
    ],

    // ------------------------------------------------------------------
    'graphic-designing': [
        {
            type: 'bento',
            heading: 'What We',
            accent: 'Design',
            items: [
                { icon: 'Palette', title: 'Brand Identity', text: 'Logo, colour, typography and the rules that tie them together.', wide: true },
                { icon: 'Megaphone', title: 'Marketing Collateral', text: 'Brochures, flyers and sales material.' },
                { icon: 'Share2', title: 'Social Templates', text: 'On-brand posts your team can reuse.' },
                { icon: 'Presentation', title: 'Presentations', text: 'Pitch and sales decks that read well.' },
                { icon: 'Package', title: 'Packaging', text: 'Designed with print constraints in mind.' },
                { icon: 'Printer', title: 'Print & Signage', text: 'Colour-checked for real substrates.', wide: true },
            ],
        },
        {
            type: 'compare',
            heading: 'Brand Guidelines vs. a',
            accent: 'Brand System',
            left: 'A guidelines PDF',
            right: 'A working brand system',
            rows: [
                { left: 'Specifies exact values', right: 'Explains intent, so it works in new situations' },
                { left: 'Designed for designers', right: 'Usable by anyone making a slide or post' },
                { left: 'Screen colours only', right: 'Screen and print colours defined and tested' },
                { left: 'Rarely opened after launch', right: 'Templates people actually use every week' },
            ],
        },
        {
            type: 'checklist',
            heading: 'Layers of a',
            accent: 'Brand System',
            items: [
                'Logo and usage rules',
                'Colour palette with meaning',
                'Type scale and hierarchy',
                'Iconography and illustration',
                'Photography direction',
                'Templates for everyday formats',
            ],
        },
        { type: 'approach', heading: 'How a Brand', accent: 'Comes Together' },
        { type: 'benefits', heading: 'Why It Matters' },
    ],

    // ------------------------------------------------------------------
    '3d-designing': [
        {
            type: 'tiers',
            heading: 'Render',
            accent: 'Types',
            items: [
                { name: 'Product Renders', text: 'Photoreal images of products, including ones not yet made.', points: ['Studio and lifestyle scenes', 'Every colourway', 'Consistent across a range'] },
                { name: 'Architectural Visualisation', text: 'Interiors and exteriors before construction.', points: ['Day and night lighting', 'Material options', 'Marketing-ready stills'] },
                { name: 'Animations & Turntables', text: 'Motion that shows form and function.', points: ['360\u00b0 turntables', 'Exploded views', 'Short product films'] },
            ],
        },
        {
            type: 'flow',
            heading: 'Production',
            accent: 'Pipeline',
            items: [
                { title: 'References & CAD', text: 'Drawings, photos or CAD files gathered.', actor: 'human' },
                { title: 'Modelling', text: 'Accurate geometry built to real dimensions.', actor: 'human' },
                { title: 'Materials', text: 'Physically based materials matched to samples.', actor: 'human' },
                { title: 'Lighting', text: 'Studio or environment lighting set up.', actor: 'human' },
                { title: 'Render & Retouch', text: 'Final images rendered and polished.', actor: 'system' },
            ],
        },
        {
            type: 'checklist',
            heading: 'What We Need',
            accent: 'From You',
            items: [
                'CAD files, drawings or measurements',
                'Photos of the real product or samples',
                'Material and finish references',
                'Where the images will be used',
                'Brand and style references',
                'Any deadlines tied to launches',
            ],
        },
        { type: 'usecases', heading: 'Where Renders', accent: 'Are Used' },
        { type: 'deliverables', heading: 'What You', accent: 'Receive' },
    ],

    // ------------------------------------------------------------------
    'ai-rendition': [
        {
            type: 'bento',
            heading: 'What We',
            accent: 'Create',
            items: [
                { icon: 'Sparkles', title: 'Campaign Concepts', text: 'Many creative directions explored quickly before committing to production.', wide: true },
                { icon: 'Image', title: 'Backgrounds & Scenes', text: 'Environments and settings for existing product shots.' },
                { icon: 'Layers', title: 'Variations', text: 'Seasonal, regional and format variants.' },
                { icon: 'Languages', title: 'Localisation', text: 'Adapted visuals for different markets.' },
                { icon: 'Palette', title: 'Style-Matched Imagery', text: 'Images guided by your existing brand look.', wide: true },
            ],
        },
        {
            type: 'compare',
            heading: 'Where It Fits, and',
            accent: 'Where It Doesn\u2019t',
            left: 'Good fit for generative imagery',
            right: 'Better with photography or 3D',
            rows: [
                { left: 'Early concepts and mood exploration', right: 'Your exact product, accurately shown' },
                { left: 'Backgrounds and environments', right: 'Real customers or team photos' },
                { left: 'Many variations of an approved look', right: 'Images that imply documentary truth' },
                { left: 'Illustrative, clearly stylised visuals', right: 'Packaging and trademark artwork' },
            ],
        },
        {
            type: 'flow',
            heading: 'Our',
            accent: 'Workflow',
            items: [
                { title: 'Brief', text: 'Purpose, audience and where images will be used.', actor: 'human' },
                { title: 'References', text: 'Brand look, products and style examples gathered.', actor: 'human' },
                { title: 'Generate', text: 'Many options produced quickly.', actor: 'ai' },
                { title: 'Select', text: 'The strongest directions chosen with you.', actor: 'human' },
                { title: 'Refine & Deliver', text: 'Retouched, checked and delivered with records.', actor: 'human' },
            ],
        },
        {
            type: 'checklist',
            heading: 'Rights and',
            accent: 'Disclosure',
            intro: 'Ownership of generated imagery is still unsettled in many places, so we handle it carefully.',
            items: [
                'Records kept of tools and inputs used',
                'Usage checked before packaging or paid media',
                'No generated images presented as real people',
                'Clear labelling where it matters',
                'Real products shown with real photos or 3D',
                'Your brand assets used only with permission',
            ],
        },
        { type: 'benefits', heading: 'Why Teams Use It' },
    ],
};
