'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const brands = [
    {
        id: 'uryze',
        name: 'uRYZE',
        tagline: 'Vertical Excellence',
        description: 'Premium elevator solutions designed for mid to high-rise buildings, combining safety, speed, and sophisticated design.',
        image: '/images/uryze_preview.png',
        color: '#1a1a1a',
        link: '/shop/uryze'
    },
    {
        id: 'usynq',
        name: 'uSYNQ',
        tagline: 'Smart Intelligence',
        description: 'Elite home automation and smart devices that create a seamless, intuitive living environment tailored to your needs.',
        image: '/images/usynq_preview.png',
        color: '#0066cc',
        link: '/shop/usynq'
    },
    {
        id: 'unest',
        name: 'uNEST',
        tagline: 'Sustainable Living',
        description: 'Modern property solutions and sustainable development strategies that redefine the future of residential and commercial spaces.',
        image: '/images/unest_preview.png',
        color: '#2d5a27',
        link: '/services'
    }
];

export default function ProductsContent() {
    return (
        <>
            <section style={{ padding: '160px 20px 80px 20px', textAlign: 'center' }}>
                <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ fontSize: 'clamp(3rem, 8vw, 4.5rem)', fontWeight: 700, color: '#fff', marginBottom: '1.5rem', letterSpacing: '-0.03em', lineHeight: 1.1 }}
                    >
                        Our Universe of <span style={{ color: 'rgba(255,255,255,0.4)' }}>Innovation</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        style={{ fontSize: '1.25rem', color: 'rgba(255, 255, 255, 0.6)', maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}
                    >
                        Discover our specialized brands, each dedicated to transforming different aspects of modern living through design and technology.
                    </motion.p>
                </div>
            </section>

            <section style={{ padding: '40px 20px 120px 20px' }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px' }}>
                    {brands.map((brand, idx) => (
                        <motion.div
                            key={brand.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.1 + 0.2 }}
                            style={{
                                position: 'relative',
                                height: '600px',
                                borderRadius: '32px',
                                overflow: 'hidden',
                                backgroundColor: '#111',
                                border: '1px solid rgba(255,255,255,0.05)',
                            }}
                        >
                            <Image
                                src={brand.image}
                                alt={brand.name}
                                fill
                                style={{ objectFit: 'cover', opacity: 0.7 }}
                            />
                            <div style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'linear-gradient(to top, rgba(0,0,0,0.95), transparent)',
                                padding: '40px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-end'
                            }}>
                                <span style={{ color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.8rem', marginBottom: '8px' }}>
                                    {brand.tagline}
                                </span>
                                <h2 style={{ fontSize: '3rem', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>{brand.name}</h2>
                                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', lineHeight: 1.5, marginBottom: '32px', maxWidth: '400px' }}>
                                    {brand.description}
                                </p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                    <div style={{
                                        padding: '12px 24px',
                                        backgroundColor: 'rgba(255,255,255,0.1)',
                                        backdropFilter: 'blur(10px)',
                                        borderRadius: '100px',
                                        color: '#fff',
                                        fontSize: '0.9rem',
                                        fontWeight: 600,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        border: '1px solid rgba(255,255,255,0.1)'
                                    }}>
                                        Launching Soon <ExternalLink size={14} />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </>
    );
}
