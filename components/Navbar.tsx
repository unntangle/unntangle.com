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
    id: "digital",
    label: "Digital Solutions",
    title: "Digital & Creative",
    services: [
      { name: "Website Development", description: "High-performance, responsive sites for your digital presence.", path: "/services/web", icon: Monitor },
      { name: "App Development", description: "Custom mobile and desktop apps for complex business problems.", path: "/services/app", icon: Smartphone },
      { name: "ERP Development", description: "Integrated systems to streamline operations and data management.", path: "/services/erp", icon: Database },
      { name: "Digital Marketing", description: "Data-driven strategies to increase visibility and growth.", path: "/services/marketing", icon: BarChart3 },
      { name: "Graphic Designing", description: "Creative visuals that capture your brand and message.", path: "/services/graphics", icon: Palette },
    ]
  },
  {
    id: "ai",
    label: "AI Solutions",
    title: "Artificial Intelligence",
    services: [
      { name: "Custom AI Application Development", description: "Tailored AI solutions for unique business requirements.", path: "/services/ai-app", icon: Cpu },
      { name: "AI Agent Development", description: "Autonomous agents to automate workflows and engagement.", path: "/services/ai-agents", icon: Bot },
      { name: "Generative AI & Chatbots", description: "Next-gen LLM solutions for intelligent interaction.", path: "/services/gen-ai", icon: MessageSquare },
      { name: "NLP Solutions", description: "Analyze and understand language with advanced algorithms.", path: "/services/nlp", icon: FileText },
      { name: "AI Automation", description: "Streamline repetitive tasks with intelligent logic.", path: "/services/ai-automation", icon: Zap },
    ]
  },
  {
    id: "cloud",
    label: "Cloud Solutions",
    title: "Cloud Computing",
    services: [
      { name: "Cloud Migration", description: "Securely move your infrastructure to the modern cloud.", path: "/services/cloud-migration", icon: CloudUpload },
      { name: "Cloud Modernization", description: "Update legacy systems with cloud-native architectures.", path: "/services/cloud-modernization", icon: RefreshCw },
      { name: "Cloud-Native Development", description: "Build scalable applications designed for cloud efficiency.", path: "/services/cloud-native", icon: Layers },
      { name: "Managed Cloud Services", description: "24/7 monitoring and optimization of your cloud environment.", path: "/services/cloud-managed", icon: ShieldCheck },
      { name: "Backup & Disaster Recovery", description: "Resilient data protection and rapid recovery solutions.", path: "/services/cloud-backup", icon: LifeBuoy },
    ]
  },
  {
    id: "living",
    label: "Smart Living Solutions",
    title: "Automation & Energy",
    services: [
      { name: "Smart Home Automation", description: "Integrated automation for lighting, climate, and security.", path: "/services/smart-home", icon: Home },
      { name: "Security Systems", description: "Advanced surveillance and asset protection technologies.", path: "/services/security", icon: Lock },
      { name: "Solar Energy Panels", description: "Sustainable energy panels for residential efficiency.", path: "/services/solar", icon: Sun },
      { name: "Residential & Commercial Elevators", description: "Premium mobility solutions for home and commerce.", path: "/services/elevators", icon: ArrowUpCircle },
      { name: "Door Systems", description: "Automated entry and access control for modern living.", path: "/services/doors", icon: DoorOpen },
    ]
  }
];

export default function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeCategory, setActiveCategory] = useState("digital");
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
      onMouseLeave={() => setShowDropdown(false)}
    >
      <nav className={styles.navbar}>
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
          <Link href="/about">About us</Link>

          <div
            className={styles.dropdownTrigger}
            onMouseEnter={() => setShowDropdown(true)}
          >
            <Link href="/services" className={styles.linkWithIcon}>
              Services <ChevronDown size={14} />
            </Link>
          </div>

          <Link href="/case-studies">Case studies</Link>
          <Link href="/blog">Blog</Link>
        </div>

        <Link href="/contact" className={styles.ctaBadge}>
          Get in touch
        </Link>

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
                      <Link href="/contact">Explore All Services <ExternalLink size={12} /></Link>
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
