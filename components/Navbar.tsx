'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
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
import { blogsData } from '@/data/blogs';

const serviceCategories = [
  {
    id: "tech",
    label: "Technology Solutions",
    title: "Technology Solutions",
    services: [
      { name: "Website Development", description: "High-performance, responsive sites for your digital presence.", path: "/services/website" },
      { name: "App Development", description: "Custom mobile and desktop apps for complex business problems.", path: "/services/app" },
      { name: "ERP Development", description: "Integrated systems to streamline operations and data management.", path: "/services/erp" },
      { name: "Website Revamp", description: "Modernize legacy systems into high-converting digital powerhouses.", path: "/services/website-revamp" },
      { name: "Interactive 3D Website", description: "Immersive WebGL experiences that captivate and engage.", path: "/services/interactive-3d" }
    ]
  },
  {
    id: "design",
    label: "Creative Design",
    title: "Creative Design",
    services: [
      { name: "2D Graphic Designing", description: "Creative visuals that capture your brand and message.", path: "/services/graphic-designing" },
      { name: "3D Designing", description: "Hyper-realistic spatial assets and physical product modeling.", path: "/services/3d-designing" },
      { name: "AI Image Rendition", description: "Next-generation generative art for rapid, bespoke visuals.", path: "/services/ai-rendition" }
    ]
  },
  {
    id: "marketing",
    label: "Growth Marketing",
    title: "Growth Marketing",
    services: [
      { name: "Meta Ads", description: "Laser-targeted conversion campaigns across Facebook and Instagram.", path: "/services/meta-ads" },
      { name: "SMM", description: "Cultivate a fiercely loyal community around your brand.", path: "/services/smm" },
      { name: "SEO", description: "Dominate search engine rankings for high-intent keywords.", path: "/services/seo" },
      { name: "Google Ads", description: "Capture active demand exactly when they search for you.", path: "/services/google-ads" }
    ]
  }
];

// Products organized like services — categories of products with item lists.
// Today there's one shipping product (uVOIZ) plus a future-roadmap column.
const productCategories = [
  {
    id: "live",
    title: "AI & Automation",
    items: [
      {
        name: "uVOIZ",
        description: "Replace telecallers with AI that speaks Hindi, Tamil, Telugu, Kannada and more. TRAI-compliant. Built for Indian BPOs.",
        path: "https://uvoiz.unntangle.com",
        external: true,
        disabled: false,
        badge: "LIVE",
      },
    ],
  },
  {
    id: "roadmap",
    title: "Coming Soon",
    items: [
      {
        name: "uDYLR",
        description: "Intelligent BPO dialer with predictive routing, agent assist, and built-in compliance for outbound and inbound campaigns.",
        path: "#",
        disabled: true,
        external: false,
        badge: undefined,
      },
      {
        name: "uSCRIBR",
        description: "AI medical scribe that captures clinical conversations and generates structured SOAP notes in real time.",
        path: "#",
        disabled: true,
        external: false,
        badge: undefined,
      },
    ],
  },
];

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState<'services' | 'products' | null>(null);
  const [hidden, setHidden] = useState(false);

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
          <Link href="/" className={styles.logoLink}>
            <Image
              src="/images/unntangle_logo.webp"
              alt="Unntangle Logo"
              width={120}
              height={32}
              className={styles.logoImage}
              priority
            />
          </Link>

          <div className={styles.links}>
            <Link href="/about">Who we are</Link>

            <div
              className={styles.dropdownTrigger}
              onMouseEnter={() => setActiveDropdown('services')}
            >
              <Link href="/services" className={styles.linkWithIcon}>
                What we do <ChevronDown size={14} />
              </Link>
            </div>

            <div
              className={styles.dropdownTrigger}
              onMouseEnter={() => setActiveDropdown('products')}
            >
              <Link href="/products" className={styles.linkWithIcon}>
                Products <ChevronDown size={14} />
              </Link>
            </div>

            <Link href="/blog">Knowledge Hub</Link>
            <Link href="/contact">Let's Talk</Link>
          </div>

          <Link href="/shop/usynq" className={styles.ctaBadge}>
            Smart Living by uSYNQ
          </Link>
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
                {/* Service Category Columns */}
                <div className={styles.categoryColumns}>
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
                    <span className={styles.featuredProductHeaderTag}>AI Telecalling for BPOs</span>
                  </div>

                  <p className={styles.featuredProductDescription}>
                    Replace telecallers with AI voice agents that speak 5+ Indian languages, integrate with your CRM, and run 24/7.
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
      </nav>
    </motion.div>
  );
}
