import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';

export const metadata = {
    title: 'uSYNQ Smart Living | Launching Soon',
    description: 'Our premium uSYNQ smart home collection is currently being prepared for launch. Stay tuned for updates.',
};

export default function UsynqShopPage() {
    return (
        <main style={{ backgroundColor: '#050505', color: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            
            <div style={{ 
                flex: 1,
                position: 'relative', 
                minHeight: 'calc(100vh - 80px)', // Exact height below navbar
                marginTop: '80px', // Prevent navbar clipping
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                overflow: 'hidden',
                padding: '40px 20px' // Breathing room for smaller screens
            }}>
                {/* Background Image Elements */}
                <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                    <Image
                        src="/images/usynq_banner.png"
                        alt="uSYNQ Smart Living Background"
                        fill
                        style={{ objectFit: 'cover', opacity: 0.25 }}
                        priority
                    />
                    <div style={{ 
                        position: 'absolute', 
                        inset: 0, 
                        background: 'radial-gradient(circle at center, transparent 0%, #050505 90%), linear-gradient(to bottom, rgba(5,5,5,0.4) 0%, #050505 100%)' 
                    }} />
                </div>

                {/* Content */}
                <div style={{ 
                    position: 'relative', 
                    zIndex: 1, 
                    textAlign: 'center', 
                    maxWidth: '800px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '2rem'
                }}>
                    <div style={{ 
                        display: 'inline-flex', 
                        alignItems: 'center',
                        gap: '10px',
                        padding: '8px 20px', 
                        border: '1px solid rgba(255,255,255,0.15)', 
                        borderRadius: '30px', 
                        fontSize: '0.8rem',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: '#ddd',
                        backdropFilter: 'blur(10px)',
                        background: 'rgba(255,255,255,0.03)'
                    }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#fff', boxShadow: '0 0 10px #fff' }}></span>
                        Smart Living by uSYNQ
                    </div>
                    
                    <h1 style={{ 
                        fontSize: 'clamp(3rem, 6vw, 5.5rem)', 
                        fontWeight: 300, 
                        color: '#fff', 
                        letterSpacing: '-0.02em', 
                        lineHeight: 1.1,
                        margin: 0,
                    }}>
                        Launching Soon.
                    </h1>
                    
                    <p style={{ 
                        fontSize: 'clamp(1rem, 1.5vw, 1.25rem)', 
                        color: '#999', 
                        lineHeight: 1.6,
                        maxWidth: '550px',
                        margin: '0 auto'
                    }}>
                        The future of integrated home automation is almost here. Join the waitlist to receive early access and launch updates.
                    </p>

                    <div style={{ 
                        display: 'flex', 
                        justifyContent: 'center', 
                        marginTop: '1.5rem', 
                        width: '100%',
                        maxWidth: '460px'
                    }}>
                        <div style={{
                            display: 'flex',
                            width: '100%',
                            background: 'rgba(255,255,255,0.1)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            borderRadius: '40px',
                            padding: '6px',
                            backdropFilter: 'blur(15px)'
                        }}>
                            <input 
                                type="email" 
                                placeholder="Enter your email address" 
                                style={{
                                    flex: 1,
                                    background: 'transparent',
                                    border: 'none',
                                    color: '#fff',
                                    padding: '0 24px',
                                    outline: 'none',
                                    fontSize: '1rem'
                                }}
                            />
                            <button style={{
                                padding: '12px 28px',
                                background: '#fff',
                                color: '#000',
                                border: 'none',
                                borderRadius: '30px',
                                fontWeight: 600,
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                whiteSpace: 'nowrap',
                                fontSize: '0.95rem'
                            }}>
                                Notify Me
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
