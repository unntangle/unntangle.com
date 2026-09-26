import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { publishedBlogs } from '@/data/blogs';
import styles from './Home.module.css';

/**
 * Home-page "Knowledge Hub" — editorial layout.
 *   Left:  the newest article as a large featured card: its cover image
 *          inset inside a pastel frame, then title, summary and meta.
 *   Right: the next three articles as a stacked list, each with a
 *          thumbnail of its cover image, category/read time and title.
 * Images come from each post's `image` in data/blogs.ts. Updates
 * automatically as new posts are published; retired categories
 * (growth marketing) are never shown.
 */

export default function HomeKnowledgeHub() {
    const sorted = [...publishedBlogs].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    const [featured, ...rest] = sorted;
    const list = rest.slice(0, 3);

    if (!featured) return null;

    return (
        <section className={`${styles.section} ${styles.hubSection}`} id="knowledge-hub">
            <div className={styles.container}>
                <div className={styles.resourceHead}>
                    <div>
                        <span className={styles.eyebrow}>Knowledge Hub</span>
                        <h2 className={styles.h2}>Practical ideas on AI and software</h2>
                        <p className={styles.lead}>
                            Perspectives from our engineers and designers on putting AI to work
                            inside businesses, and building the systems they run on.
                        </p>
                    </div>
                    <Link href="/blog" className={`${styles.btn} ${styles.btnDark}`}>
                        <span className={styles.btnIcon}><ArrowRight size={16} /></span>
                        Visit the Knowledge Hub
                    </Link>
                </div>

                <div className={styles.hubGrid}>
                    {/* Featured article */}
                    <Link href={`/blog/${featured.id}`} className={styles.hubFeature}>
                        <div className={styles.hubFeatureImg}>
                            <img src={featured.image} alt="" loading="lazy" />
                            <span className={styles.hubPill}>{featured.category}</span>
                        </div>
                        <div className={styles.hubFeatureBody}>
                            <span className={styles.hubFeatureLabel}>Latest article</span>
                            <h3 className={styles.hubFeatureTitle}>{featured.title}</h3>
                            <p className={styles.hubFeatureDesc}>{featured.description}</p>
                            <div className={styles.hubFeatureFoot}>
                                <span className={styles.hubArrow} aria-hidden="true">
                                    <ArrowRight size={18} />
                                </span>
                                <span className={styles.hubFeatureMeta}>
                                    <span>{featured.date}</span>
                                    <span className={styles.resourceMetaDot} aria-hidden="true" />
                                    <span>{featured.readTime}</span>
                                </span>
                            </div>
                        </div>
                    </Link>

                    {/* Next three */}
                    <div className={styles.hubList}>
                        {list.map((post) => (
                            <Link key={post.id} href={`/blog/${post.id}`} className={styles.hubItem}>
                                <span className={styles.hubThumb}>
                                    <img src={post.image} alt="" loading="lazy" />
                                </span>
                                <span>
                                    <span className={styles.hubItemMeta}>
                                        <span>{post.category}</span>
                                        <span className={styles.resourceMetaDot} aria-hidden="true" />
                                        <span>{post.readTime}</span>
                                    </span>
                                    <span className={styles.hubItemTitle}>{post.title}</span>
                                </span>
                                <span className={styles.hubArrow} aria-hidden="true">
                                    <ArrowRight size={16} />
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
