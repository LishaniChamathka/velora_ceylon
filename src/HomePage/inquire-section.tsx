import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const clash: React.CSSProperties = {
  fontFamily: "'Clash Display', sans-serif",
};

export default function InquireSection() {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        width: '100%',
        padding: isMobile ? '1.5rem 1rem' : '3rem 5rem',
        boxSizing: 'border-box',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1280px',
          borderRadius: isMobile ? '1rem' : '2rem',
          overflow: 'hidden',
          minHeight: isMobile ? '280px' : '400px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        {/* Background Image */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url(/homepage/inquire.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 0,
            filter: 'brightness(0.6)',
          }}
        />

        {/* Overlay Scrim */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, rgba(0, 40, 60, 0.6) 0%, rgba(0, 40, 60, 0.3) 50%, rgba(0, 40, 60, 0.4) 100%)',
            zIndex: 1,
          }}
        />

        {/* Content */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            padding: isMobile ? '2rem 1.5rem' : '3rem',
            maxWidth: isMobile ? '90%' : '750px',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <h2
            style={{
              ...clash,
              fontSize: isMobile ? '28px' : '50px',
              fontWeight: 500,
              color: '#ffffff',
              lineHeight: 1.2,
              marginBottom: isMobile ? '1rem' : '1.5rem',
            }}
          >
            Let us plan your dream<br />getaway today!
          </h2>

          <p
            style={{
              fontSize: isMobile ? '16px' : '18px',
              color: 'rgba(255, 255, 255, 0.9)',
              lineHeight: 1.75,
              marginBottom: isMobile ? '1.5rem' : '2rem',
              fontFamily: 'Clash Display',
            }}
          >
            Whether you're looking for adventure, relaxation, or cultural exploration, Velora Ceylon Travels is here to make your journey unforgettable. Get in touch now, and we'll help you create the perfect itinerary.
          </p>

          {/* Button */}
          <button
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: isMobile ? '0.75rem' : '1rem',
              backgroundColor: 'rgba(255, 255, 255, 0.12)',
              color: '#ffffff',
              border: '1.5px solid rgba(255, 255, 255, 0.4)',
              borderRadius: '9999px',
              padding: isMobile ? '0.65rem 1.25rem 0.65rem 1.5rem' : '0.8rem 2rem 0.8rem 2rem',
              fontSize: isMobile ? '0.9rem' : '1rem',
              fontWeight: 400,
              cursor: 'pointer',
              fontFamily: 'Clash Display',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(2px)',
            }}
            onMouseEnter={(e) => {
              const btn = e.currentTarget;
              btn.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
              btn.style.borderColor = 'rgba(255, 255, 255, 0.8)';
            }}
            onMouseLeave={(e) => {
              const btn = e.currentTarget;
              btn.style.backgroundColor = 'transparent';
              btn.style.borderColor = 'rgba(255, 255, 255, 0.5)';
            }}
          >
            Inquire Now
            <div
              style={{
                width: isMobile ? '28px' : '32px',
                height: isMobile ? '28px' : '32px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <ArrowUpRight size={16} color="#002a3c" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
