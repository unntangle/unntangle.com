'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import {
  ChevronDown,
  ArrowRight,
  ExternalLink,
  Monitor,
  Smartphone,
  Database,
  BarChart3,
  Palette,
  Cpu,
  Bot,
  MessageSquare,
  FileText,
  Zap,
  CloudUpload,
  RefreshCw,
  Layers,
  ShieldCheck,
  LifeBuoy,
  Home,
  Lock,
  Sun,
  ArrowUpCircle,
  DoorOpen
} from 'lucide-react';
import styles from './Navbar.module.css';

const serviceCategories = [
  {
    id: "tech",
    label: "Technology Solutions",
    title: "Technology Solutions",
    services: [
      { name: "Website Development", description: "High-performance, responsive sites for your digital presence.", path: "/services/website", icon: Monitor },
      { name: "App Development", description: "Custom mobile and desktop apps for complex business problems.", path: "/services/app", icon: Smartphone },
      { name: "ERP Development", description: "Integrated systems to streamline operations and data management.", path: "/services/erp", icon: Database },
      { name: "Website Revamp", description: "Modernize legacy systems into high-converting digital powerhouses.", path: "/services/website-revamp", icon: RefreshCw },
      { name: "Interactive 3D Website", description: "Immersive WebGL experiences that captivate and engage.", path: "/services/interactive-3d", icon: Layers }
    ]
  },
  {
    id: "design",
    label: "Creative Design",
    title: "Creative Design",
    services: [
      { name: "2D Graphic Designing", description: "Creative visuals that capture your brand and message.", path: "/services/graphic-designing", icon: Palette },
      { name: "3D Designing", description: "Hyper-realistic spatial assets and physical product modeling.", path: "/services/3d-designing", icon: Sun },
      { name: "AI Image Rendition", description: "Next-generation generative art for rapid, bespoke visuals.", path: "/services/ai-rendition", icon: Bot }
    ]
  },
  {
    id: "marketing",
    label: "Growth Marketing",
    title: "Growth Marketing",
    services: [
      { name: "Meta Ads", description: "Laser-targeted conversion campaigns across Facebook and Instagram.", path: "/services/meta-ads", icon: BarChart3 },
      { name: "SMM", description: "Cultivate a fiercely loyal community around your brand.", path: "/services/smm", icon: MessageSquare },
      { name: "SEO", description: "Dominate search engine rankings for high-intent keywords.", path: "/services/seo", icon: ShieldCheck },
      { name: "Google Ads", description: "Capture active demand exactly when they search for you.", path: "/services/google-ads", icon: Zap }
    ]
  }
];



export default function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeCategory, setActiveCategory] = useState("tech");
  const [hidden, setHidden] = useState(false);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150 && !showDropdown) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const currentGroup = serviceCategories.find(cat => cat.id === activeCategory) || serviceCategories[0];

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
        setShowDropdown(false);
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
              onMouseEnter={() => {
                setShowDropdown(true);
              }}
            >
              <Link href="/services" className={styles.linkWithIcon}>
                What we do <ChevronDown size={14} />
              </Link>
            </div>

            <Link href="/blog">Knowledge Hub</Link>
            <Link href="/contact">Let's Talk</Link>
          </div>

          <Link href="/shop/usynq" className={styles.ctaBadge}>
            Smart Living by uSYNQ
          </Link>
        </div>



        <AnimatePresence>
          {showDropdown && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className={styles.megaMenu}
              onMouseEnter={() => setShowDropdown(true)}
            >
              <div className={styles.megaMenuContainer}>
                {/* Left Side: Category Nav & Banner */}
                <div className={styles.megaMenuSide}>
                  <div className={styles.categoryNav}>
                    {serviceCategories.map(cat => (
                      <button
                        key={cat.id}
                        className={`${styles.catButton} ${activeCategory === cat.id ? styles.active : ''}`}
                        onMouseEnter={() => setActiveCategory(cat.id)}
                      >
                        <span>{cat.label}</span>
                        <ArrowRight size={16} />
                      </button>
                    ))}
                  </div>

                  <div className={styles.promoBanner}>
                    <Image
                      src="/images/hero.png"
                      alt="Explore Services"
                      fill
                      className={styles.promoImage}
                    />
                    <div className={styles.promoOverlay}>
                      <h4>Maximize Your Presence</h4>
                      <Link href="/services">Explore All Services <ExternalLink size={12} /></Link>
                    </div>
                  </div>
                </div>

                {/* Center: Services List */}
                <div className={styles.megaMenuMain}>
                  <h5>{currentGroup.title}</h5>
                  <div className={styles.servicesGrid}>
                    {currentGroup.services.map((service, i) => {
                      const Icon = service.icon;
                      return (
                        <Link key={i} href={service.path} className={styles.serviceItem}>
                          <div className={styles.serviceIconWrapper}>
                            <Icon size={24} className={styles.serviceIcon} />
                          </div>
                          <div className={styles.serviceItemContent}>
                            <span className={styles.serviceName}>{service.name}</span>
                            <span className={styles.serviceDesc}>{service.description}</span>
                          </div>
                          <ArrowRight size={18} className={styles.serviceArrow} />
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Right Side: Latest Blog */}
                <div className={styles.megaMenuFeatured}>
                  <h5>Latest Blog</h5>
                  <div className={styles.featuredList}>
                    <div className={styles.featuredCard}>
                      <div className={styles.featuredImageWrapper}>
                        <Image
                          src="/images/latest_blog.png"
                          alt="Latest Blog"
                          fill
                          className={styles.featuredImage}
                        />
                      </div>
                      <div className={styles.featuredContent}>
                        <p>The Future of AI in Modern Business: How to Stay Ahead of the Curve in 2026</p>
                        <Link href="/blog/ai-future">Read Full Article</Link>
                      </div>
                    </div>

                    <div className={styles.secondaryBlogs}>
                      <Link href="/blog/digital-trends" className={styles.blogLinkItem}>
                        <span>Digital Transformation Trends 2026</span>
                        <ArrowRight size={14} />
                      </Link>
                      <Link href="/blog/cloud-security" className={styles.blogLinkItem}>
                        <span>Securing Your Cloud Infrastructure</span>
                        <ArrowRight size={14} />
                      </Link>
                      <Link href="/blog/ai-ethics" className={styles.blogLinkItem}>
                        <span>AI Ethics: Navigating the New Frontier</span>
                        <ArrowRight size={14} />
                      </Link>
                      <Link href="/blog/smart-efficiency" className={styles.blogLinkItem}>
                        <span>Maximizing Efficiency with Smart Living</span>
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.div>
  );
}
