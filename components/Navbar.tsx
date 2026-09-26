'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
// HIDDEN-UBIQ: `usePathname` was only used for the uBIQ logo swap below.
// Restore this import when unhiding the brand site.
// import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import {
  ChevronDown,
  ArrowRight,
  PhoneCall,
  Sparkles,
  Globe2,
  ShieldCheck,
  BarChart3,
  Zap,
} from 'lucide-react';
import styles from './Navbar.module.css';
import { publishedBlogs as blogsData } from '@/data/blogs';

// Two service pillars: AI implementation, and the software engineering
// (websites, apps, custom software) Unntangle has always delivered.
// Growth marketing was retired.
const serviceCategories = [
  {
    id: "ai",
    label: "AI Implementation & Deployment",
    title: "AI Implementation & Deployment",
    services: [
      { name: "AI Workflow Assessment", description: "Find where AI can create measurable value before anything is built.", path: "/services/ai-workflow-assessment" },
      { name: "AI Agents & Workflow Automation", description: "AI that handles RFQs, invoices, follow-ups, reports and routine queries — with human approval.", path: "/services/ai-agents" },
      { name: "AI & System Integration", description: "Connect AI to your ERP, CRM, email, WhatsApp, documents and databases.", path: "/services/ai-integration" },
      { name: "AI Workflow Examples", description: "Sales, finance, procurement, operations, customer service and management reporting.", path: "/#ai-solutions" },
    ]
  },
  {
    id: "tech",
    label: "Software Engineering",
    title: "Software Engineering",
    services: [
      { name: "Website Development", description: "Fast, secure business websites connected to your CRM and workflows.", path: "/services/website" },
      { name: "Website Revamp", description: "Modernise an outdated site while protecting your search rankings.", path: "/services/website-revamp" },
      { name: "App Development", description: "Mobile and web apps for customers, field teams and internal operations.", path: "/services/app" },
      { name: "Custom Software & ERP", description: "ERP, workflow systems and internal platforms built around how you operate.", path: "/services/erp" },
      { name: "Interactive 3D", description: "3D product viewers, configurators and walkthroughs in the browser.", path: "/services/interactive-3d" }
    ]
  }
];

const productCategories = [
  {
    id: "live",
    title: "AI Products",
    items: [
      {
        name: "uVOIZ",
        description: "AI voice agents for lead qualification, follow-ups and first-line support calls, in multiple Indian languages.",
        path: "https://uvoiz.unntangle.com",
        external: true,
        disabled: false,
        badge: "Beta",
      },
    ],
  },
  {
    id: "roadmap",
    title: "Coming Soon",
    items: [
      {
        name: "uDYLR",
        description: "Contact-center workflows that take repetitive customer interactions off your agents' queue.",
        path: "#",
        disabled: true,
        external: false,
        badge: undefined,
      },
      {
        name: "uSCRIBR",
        description: "Clinical conversations turned into structured notes for review, reducing documentation time.",
        path: "#",
        disabled: true,
        external: false,
        badge: undefined,
      },
    ],
  },
];

// Brands are deliberately kept separate from the products above. A brand
// has its own identity, its own domain and its own customers, and may ship
// products of its own beneath it (uBIQ has Senz, Twin and Care+). The
// entries in `productCategories` are Unntangle-branded SaaS by contrast.
//
// uBIQ lives on its own domain now, so this is an external link — the old
// /ubiq route on this site 301s there anyway (see middleware.ts), but
// linking direct avoids the redirect hop.
//
// OfficeMate is the other brand and is intentionally not listed yet.
// With a single brand the menu shows a hero banner in the wide left column
// rather than a category list; add a `brandCategories`-style list back (see
// `productCategories` for the shape) when a second brand arrives.
const featuredBrand = {
  logo: "/uBIQ/uBIQ-logo.svg",
  // Brand banner. Must live in THIS project's public/uBIQ/ folder — the
  // original is in the ubiqautomation.com project, which Next can't reach
  // across from here.
  preview: "/uBIQ/uBIQ-banner.png",
  previewAlt: "uBIQ smart home automation",
  tagline: "Smart Space Automation",
  description:
    "Intelligent automation for homes, villas, offices and hotels — one layer that senses, learns and adapts the space around the people in it.",
  stats: [
    { value: "9+", label: "Technology categories" },
    { value: "100%", label: "Vendor-independent" },
  ],
  // Platform wordmarks rather than logo images: the real marks are the
  // vendors' trademarks and we hold no asset files for them. Mirrors the
  // `techStack` array on the uBIQ site's about page.
  platforms: ["KNX", "Matter", "Crestron", "Lutron"],
  href: "https://ubiqautomation.com",
  cta: "Explore uBIQ",
};

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState<'services' | 'products' | 'brands' | null>(null);
  const [hidden, setHidden] = useState(false);

  // HIDDEN-UBIQ: the uBIQ brand site is switched off (see HIDE_UBIQ in
  // middleware.ts), so the header no longer swaps to the uBIQ wordmark and
  // `isUbiq` is pinned to false. The original logic is preserved below.
  //
  // const pathname = usePathname();
  // // On the uBIQ brand page the header logo swaps to the uBIQ wordmark
  // // (the brand owns that section) and links to /ubiq; everywhere else it's
  // // the Unntangle Technologies mark linking home. The uBIQ artwork is black-on-transparent
  // // and the navbar is white, so it shows as-is. It's an SVG, hence unoptimized.
  // const isUbiq = pathname === '/ubiq' || (pathname?.startsWith('/ubiq/') ?? false);
  // const logoConfig = isUbiq
  //   ? {
  //       src: '/uBIQ/uBIQ-logo.svg',
  //       alt: 'uBIQ',
  //       href: '/ubiq',
  //       width: 932,
  //       height: 306,
  //     }
  //   : { ...Unntangle Technologies mark, as below... };
  const isUbiq = false;
  const logoConfig = {
    src: '/images/unntangle_logo.webp',
    alt: 'Unntangle Logo',
    href: '/',
    width: 120,
    height: 32,
  };

  // Get the most recent blog post by parsing dates and sorting descending
  const latestBlog = useMemo(() => {
    if (!blogsData || blogsData.length === 0) return null;
    return [...blogsData].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )[0];
  }, []);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150 && !activeDropdown) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.div
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: -100, opacity: 0 }
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={styles.navbarWrapper}
      onMouseLeave={() => {
        setActiveDropdown(null);
      }}
    >
      <nav className={styles.navbar}>
        <div className={styles.navbarInner}>
          <Link href={logoConfig.href} className={styles.logoLink}>
            <Image
              src={logoConfig.src}
              alt={logoConfig.alt}
              width={logoConfig.width}
              height={logoConfig.height}
              className={styles.logoImage}
              priority
              unoptimized={isUbiq}
            />
          </Link>

          <div className={styles.links}>
            <div
              className={styles.dropdownTrigger}
              onMouseEnter={() => setActiveDropdown('services')}
            >
              <Link href="/services" className={styles.linkWithIcon}>
                Services <ChevronDown size={14} />
              </Link>
            </div>

            <div
              className={styles.dropdownTrigger}
              onMouseEnter={() => setActiveDropdown('products')}
            >
              {/* No `/products` route exists, so the trigger jumps to the
                  home-page AI Products section; the mega menu on hover
                  still surfaces each product (uVOIZ, uDYLR, uSCRIBR). */}
              <Link href="/#ai-products" className={styles.linkWithIcon}>
                AI Products <ChevronDown size={14} />
              </Link>
            </div>

            <div
              className={styles.dropdownTrigger}
              onMouseEnter={() => setActiveDropdown('brands')}
            >
              {/* Same reasoning as Products: there's no `/brands`
                  listing route, so the trigger is a non-navigating
                  span and the dropdown carries the actual link. */}
              <span className={`${styles.linkWithIcon} ${styles.linkWithIconStatic}`}>
                Our Brands <ChevronDown size={14} />
              </span>
            </div>

            {/* "How We Deploy" and "Industries" were removed from the top nav;
                both sections are still on the home page and linked in the footer. */}
            <Link href="/blog" onMouseEnter={() => setActiveDropdown(null)}>Knowledge Hub</Link>
            <Link href="/about" onMouseEnter={() => setActiveDropdown(null)}>About</Link>
            <Link href="/contact" className={styles.ctaBadge}>Book an Assessment</Link>
          </div>
        </div>

        {/* Services Mega Menu */}
        <AnimatePresence>
          {activeDropdown === 'services' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className={styles.megaMenu}
              onMouseEnter={() => setActiveDropdown('services')}
            >
              <div className={styles.megaMenuContainer}>
                {/* Service Category Columns — two pillars, so use the
                    two-column layout the Products menu already uses. */}
                <div className={`${styles.categoryColumns} ${styles.categoryColumnsTwo}`}>
                  {serviceCategories.map((cat) => (
                    <div key={cat.id} className={styles.categoryColumn}>
                      <h5 className={styles.columnHeading}>{cat.title}</h5>
                      <div className={styles.columnLinks}>
                        {cat.services.map((service, i) => (
                          <Link key={i} href={service.path} className={styles.serviceLink}>
                            <span className={styles.serviceLinkTitle}>{service.name}</span>
                            <span className={styles.serviceLinkDesc}>{service.description}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Featured Latest Blog Card (dynamic) */}
                <div className={styles.featuredPromo}>
                  {latestBlog && (
                    <>
                      <span className={styles.promoEyebrow}>Latest from the blog</span>
                      <Link href={`/blog/${latestBlog.id}`} className={styles.promoCard}>
                        <div className={styles.promoCardImage}>
                          <Image
                            src={latestBlog.image}
                            alt={latestBlog.title}
                            fill
                            className={styles.promoCardImg}
                            unoptimized
                          />
                        </div>
                      </Link>
                      <div className={styles.promoMeta}>
                        <span className={styles.promoCategory}>{latestBlog.category}</span>
                        <span className={styles.promoDot}>•</span>
                        <span className={styles.promoDate}>{latestBlog.date}</span>
                      </div>
                      <Link href={`/blog/${latestBlog.id}`} className={styles.promoTitleLink}>
                        <h4 className={styles.promoHeading}>{latestBlog.title}</h4>
                      </Link>
                      <p className={styles.promoDescription}>{latestBlog.description}</p>
                      <Link href={`/blog/${latestBlog.id}`} className={styles.promoLink}>
                        Read full article <ArrowRight size={14} />
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Products Mega Menu — mirrors Services structure */}
        <AnimatePresence>
          {activeDropdown === 'products' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className={styles.megaMenu}
              onMouseEnter={() => setActiveDropdown('products')}
            >
              <div className={styles.megaMenuContainer}>
                {/* Product Category Columns (left) */}
                <div className={`${styles.categoryColumns} ${styles.categoryColumnsTwo}`}>
                  {productCategories.map((cat) => (
                    <div key={cat.id} className={styles.categoryColumn}>
                      <h5 className={styles.columnHeading}>{cat.title}</h5>
                      <div className={styles.columnLinks}>
                        {cat.items.map((item, i) => {
                          const linkProps = item.external
                            ? { target: '_blank' as const, rel: 'noopener noreferrer' }
                            : {};
                          const className = item.disabled
                            ? `${styles.serviceLink} ${styles.productItemDisabled}`
                            : styles.serviceLink;
                          return (
                            <Link
                              key={i}
                              href={item.disabled ? '#' : item.path}
                              className={className}
                              {...linkProps}
                              onClick={item.disabled ? (e) => e.preventDefault() : undefined}
                            >
                              <span className={styles.productItemTitleRow}>
                                <span className={styles.serviceLinkTitle}>
                                  {item.name.startsWith('u') && item.name.length > 1 ? (
                                    <>
                                      <span className={styles.uvoizU}>u</span>
                                      <span className={styles.uvoizVoiz}>{item.name.slice(1)}</span>
                                    </>
                                  ) : (
                                    item.name
                                  )}
                                </span>
                                {item.badge && (
                                  <span className={styles.productLiveBadge}>{item.badge}</span>
                                )}
                                {item.disabled && (
                                  <span className={styles.productSoonBadge}>Soon</span>
                                )}
                              </span>
                              <span className={styles.serviceLinkDesc}>{item.description}</span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Featured Product Card (right) — SaaS-style with product preview image */}
                <div className={`${styles.featuredPromo} ${styles.featuredProduct}`}>
                  <span className={styles.promoEyebrow}>
                    Featured product
                  </span>

                  {/* Product preview image — BPO / AI telecalling vibe */}
                  <Link
                    href="https://uvoiz.unntangle.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.featuredProductPreview}
                  >
                    <Image
                      src="https://images.unsplash.com/photo-1587560699334-cc4ff634909a?auto=format&fit=crop&q=80&w=800&h=450"
                      alt="AI-powered BPO call center"
                      fill
                      sizes="320px"
                      className={styles.featuredProductPreviewImg}
                      unoptimized
                    />
                    <div className={styles.featuredProductPreviewGradient} aria-hidden="true" />
                  </Link>

                  {/* Compact logo + tagline below the image */}
                  <div className={styles.featuredProductHeaderText}>
                    <Image
                      src="/images/uVOIZ-logo.webp"
                      alt="uVOIZ"
                      width={120}
                      height={32}
                      className={styles.featuredProductLogo}
                    />
                    <span className={styles.featuredProductHeaderTag}>AI Voice Agents · Beta</span>
                  </div>

                  <p className={styles.featuredProductDescription}>
                    AI voice agents that take routine calls off your team&apos;s plate — in multiple Indian languages — and hand conversations to a person when needed.
                  </p>

                  {/* Stat tiles — Google/Stripe-style metric cards */}
                  <div className={styles.featuredProductStats}>
                    <div className={styles.statTile}>
                      <span className={styles.statValue}>5+</span>
                      <span className={styles.statLabel}>Indian languages</span>
                    </div>
                    <div className={styles.statTile}>
                      <span className={styles.statValue}>24/7</span>
                      <span className={styles.statLabel}>Always-on calling</span>
                    </div>
                  </div>

                  <Link
                    href="https://uvoiz.unntangle.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.featuredProductCtaLink}
                  >
                    Try now <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Brands Mega Menu — hero banner fills the wide left column,
            brand detail sits in the right rail. */}
        <AnimatePresence>
          {activeDropdown === 'brands' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className={styles.megaMenu}
              onMouseEnter={() => setActiveDropdown('brands')}
            >
              <div className={styles.megaMenuContainer}>
                {/* Brand banner (left) — fills the whole wide column and
                    stretches to the rail's height via align-items: stretch. */}
                <Link
                  href={featuredBrand.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.brandsBanner}
                >
                  <Image
                    src={featuredBrand.preview}
                    alt={featuredBrand.previewAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 960px"
                    className={styles.brandsBannerImg}
                  />
                </Link>

                {/* Brand detail (right) */}
                <div
                  className={`${styles.featuredPromo} ${styles.featuredProduct} ${styles.brandsDetail}`}
                >
                  <span className={styles.promoEyebrow}>Our brand</span>

                  {/* The uBIQ mark is black-on-transparent and this rail is
                      near-white, so it shows as-is. SVG, hence unoptimized. */}
                  <div className={styles.featuredProductHeaderText}>
                    <Image
                      src={featuredBrand.logo}
                      alt="uBIQ"
                      width={932}
                      height={306}
                      className={styles.featuredProductLogo}
                      unoptimized
                    />
                    <span className={styles.featuredProductHeaderTag}>
                      {featuredBrand.tagline}
                    </span>
                  </div>

                  <p className={styles.featuredProductDescription}>
                    {featuredBrand.description}
                  </p>

                  <div className={styles.featuredProductStats}>
                    {featuredBrand.stats.map((stat) => (
                      <div key={stat.label} className={styles.statTile}>
                        <span className={styles.statValue}>{stat.value}</span>
                        <span className={styles.statLabel}>{stat.label}</span>
                      </div>
                    ))}
                  </div>

                  <div className={styles.brandsPlatforms}>
                    <span className={styles.brandsPlatformsLabel}>Works with</span>
                    <div className={styles.brandsPlatformRow}>
                      {featuredBrand.platforms.map((platform) => (
                        <span key={platform} className={styles.brandsPlatformChip}>
                          {platform}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={featuredBrand.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.featuredProductCtaLink}
                  >
                    {featuredBrand.cta} <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.div>
  );
}
