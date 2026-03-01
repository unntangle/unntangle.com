'use client';

import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import styles from './FeaturedServices.module.css';

interface ServiceStory {
    id: string;
    categoryId: string;
    tag: string;
    title: string;
    description: string;
    image: string;
    brandLogo?: string;
}

const serviceStories: ServiceStory[] = [
    {
        id: '1',
        categoryId: 'digital',
        tag: 'Digital Solutions',
        title: 'Modernizing Global Enterprise Architectures',
        description: 'Accelerating digital maturity through bespoke engineering and deterministic infrastructure upgrades.',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1600',
    },
    {
        id: '2',
        categoryId: 'ai',
        tag: 'AI Solutions',
        title: 'Unnleashing Potential with Predictive Intelligence',
        description: 'Integrating frontier AI models to automate complex decision-making and optimize operational workflows.',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1600',
    },
    {
        id: '3',
        categoryId: 'cloud',
        tag: 'Cloud Solutions',
        title: 'High-Performance Sovereign Cloud Ecosystems',
        description: 'Securing your digital assets with independent governance and global edge orchestration.',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1600',
    },
    {
        id: '4',
        categoryId: 'smart',
        tag: 'Smart Living Solutions',
        title: 'Seamless Physical-Digital Connectivity',
        description: 'Crafting intelligent environments that harmonize IoT and AI for an elevated, connected lifestyle.',
        image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=1600',
    }
];

interface Category {
    id: string;
    name: string;
}

interface FeaturedServicesProps {
    activeCategoryId: string;
    onCategoryChange: (id: string) => void;
    categories: Category[];
}

// Extracted Card Component to handle individual scaling
const ServiceCard = ({ story, index, totalCards, scrollYProgress }: { story: ServiceStory, index: number, totalCards: number, scrollYProgress: any }) => {
    // Calculate the precise scroll range where this card is centered
    // For 4 cards, centers are at 0, 0.33, 0.66, 1
    const centerPoint = index / (totalCards - 1);
    const windowSize = 1 / (totalCards - 1); // 0.33

    // Scale down cards that are not actively in the center
    const scale = useTransform(
        scrollYProgress,
        [
            centerPoint - windowSize, // Previous card centered
            centerPoint,              // This card perfectly centered
            centerPoint + windowSize  // Next card centered
        ],
        [0.85, 1, 0.85] // Scale down to 85% when off-center
    );

    // Fade out text slightly when off-center for depth
    const opacity = useTransform(
        scrollYProgress,
        [
            centerPoint - windowSize,
            centerPoint,
            centerPoint + windowSize
        ],
        [0.4, 1, 0.4]
    );

    return (
        <div className={styles.cardContainer}>
            <motion.div style={{ scale }} className={styles.cardWrapper}>
                <div className={styles.card}>
                    <div className={styles.glowBorder} />
                    <div className={styles.imageWrapper}>
                        <img src={story.image} alt={story.title} className={styles.image} />
                        <div className={styles.overlay} />
                    </div>
                    <motion.div style={{ opacity }} className={styles.topContent}>
                        <span className={styles.tag}>{story.tag}</span>
                    </motion.div>
                    <motion.div style={{ opacity }} className={styles.bottomContent}>
                        {story.brandLogo && (
                            <div className={styles.brandWrapper}>
                                <img src={story.brandLogo} alt="Brand" className={styles.brandLogo} />
                            </div>
                        )}
                        <h3 className={styles.title}>{story.title}</h3>
                        <p className={styles.description}>{story.description}</p>
                        <button className={styles.viewButton}>
                            <span>View the story</span>
                            <ArrowRight size={18} />
                        </button>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default function FeaturedServices({ activeCategoryId, onCategoryChange, categories }: FeaturedServicesProps) {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"]
    });

    // Translate vertical scroll into horizontal movement
    // Track padding-left is 10vw. Card width is 80vw. Gap is 5vw.
    // Total translation to center the 4th card (index 3) is 3 * (80vw + 5vw) = 255vw
    const x = useTransform(scrollYProgress, [0, 1], ["0vw", "-255vw"]);

    // Synchronize active category with scroll progress
    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (latest) => {
            if (latest < 0.16) {
                if (activeCategoryId !== 'digital') onCategoryChange('digital');
            } else if (latest < 0.50) {
                if (activeCategoryId !== 'ai') onCategoryChange('ai');
            } else if (latest < 0.83) {
                if (activeCategoryId !== 'cloud') onCategoryChange('cloud');
            } else {
                if (activeCategoryId !== 'smart') onCategoryChange('smart');
            }
        });
        return () => unsubscribe();
    }, [scrollYProgress, activeCategoryId, onCategoryChange]);

    return (
        <section ref={targetRef} className={styles.scrollSection}>
            <div className={styles.stickyWrapper}>
                <div className={styles.tabsStickyContainer}>
                    <div className={styles.categoriesList}>
                        {categories.map((cat) => (
                            <div
                                key={cat.id}
                                className={`${styles.categoryItem} ${activeCategoryId === cat.id ? styles.categoryActive : ''}`}
                                onClick={() => {
                                    const index = categories.findIndex(c => c.id === cat.id);
                                    const targetProgress = index / (categories.length - 1);
                                    const scrollableDistance = (targetRef.current?.offsetHeight || 0) - window.innerHeight;
                                    const scrollTarget = (targetRef.current?.offsetTop || 0) + scrollableDistance * targetProgress;
                                    window.scrollTo({ top: scrollTarget, behavior: 'smooth' });
                                }}
                            >
                                {cat.name}
                                {activeCategoryId === cat.id && <ArrowRight size={14} className={styles.tabIcon} />}
                            </div>
                        ))}
                    </div>
                </div>

                <motion.div style={{ x }} className={styles.horizontalTrack}>
                    {serviceStories.map((story, index) => (
                        <ServiceCard
                            key={story.id}
                            story={story}
                            index={index}
                            totalCards={serviceStories.length}
                            scrollYProgress={scrollYProgress}
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
