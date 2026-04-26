import { useState, useEffect } from 'react';

const Footer = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <footer
      style={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
      }}
    >
      {/* Background Image */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/homepage/footer.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0,
        }}
      />

      {/* Gradient Overlay - White fade at top, dark at bottom */}
      {/* <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'linear-gradient(180deg, rgba(255, 255, 255, 0.4) 0%, rgba(0, 0, 0, 0.65) 100%)',
          zIndex: 1,
        }}
      /> */}

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          boxSizing: 'border-box',
          minHeight: '500px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        {/* Top Section with padding */}
        <div
          style={{
            padding: isMobile ? '2.5rem 1.25rem' : '3.5rem 5rem',
          }}
        >
          <div
            style={{
              maxWidth: '1280px',
              margin: '0 auto',
              marginBottom: isMobile ? '2rem' : '3rem',
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr 1fr',
              gap: isMobile ? '2rem' : '3rem',
            }}
          >
          {/* Left - Logo & Description */}
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: isMobile ? '1rem' : '1.5rem',
              }}
            >
              <img
                src="/logo-icon.png"
                alt="Velora Ceylon"
                style={{ width: '40px', height: '40px' }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <span
                style={{
                  fontFamily: "'Clash Display', sans-serif",
                  fontSize: isMobile ? '18px' : '20px',
                  fontWeight: 500,
                  color: '#ffffff',
                }}
              >
                Velora Ceylon
              </span>
            </div>
            <p
              style={{
                fontSize: isMobile ? '14px' : '16px',
                color: 'rgba(255, 255, 255, 0.85)',
                lineHeight: 1.7,
                margin: 0,
                fontFamily: "'Clash Display', sans-serif",
              }}
            >
              Velora Ceylon Travels offers personalized tours across Sri Lanka, providing unforgettable experiences through unique cultural, wildlife, and beach destinations. Our goal is to make every journey a memorable adventure.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              style={{
                fontFamily: "'Clash Display', sans-serif",
                fontSize: isMobile ? '16px' : '18px',
                fontWeight: 600,
                color: '#ffffff',
                marginBottom: isMobile ? '1rem' : '1.5rem',
                margin: 0,
                paddingBottom: isMobile ? '0.75rem' : '1rem',
              }}
            >
              Quick Links
            </h3>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: isMobile ? '0.65rem' : '0.85rem',
              }}
            >
              {['Home', 'About Us', 'Tours', 'Faq', 'Contact'].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    style={{
                      fontFamily: "'Clash Display', sans-serif",
                      fontSize: isMobile ? '14px' : '16px',
                      color: 'rgba(255, 255, 255, 0.8)',
                      textDecoration: 'none',
                      transition: 'color 0.3s ease',
                      display: 'inline-block',
                    }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLAnchorElement).style.color =
                        'rgba(255, 255, 255, 1)';
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLAnchorElement).style.color =
                        'rgba(255, 255, 255, 0.8)';
                    }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3
              style={{
                fontFamily: "'Clash Display', sans-serif",
                fontSize: isMobile ? '16px' : '18px',
                fontWeight: 600,
                color: '#ffffff',
                marginBottom: isMobile ? '1rem' : '1.5rem',
                margin: 0,
                paddingBottom: isMobile ? '0.75rem' : '1rem',
              }}
            >
              Contact Info
            </h3>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: isMobile ? '0.65rem' : '0.85rem',
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: "'Clash Display', sans-serif",
                    fontSize: isMobile ? '14px' : '16px',
                    color: 'rgba(255, 255, 255, 0.8)',
                    margin: 0,
                  }}
                >
                  infoveloraceylon@gmail.com
                </p>
              </div>
              <div>
                <p
                  style={{
                    fontFamily: "'Clash Display', sans-serif",
                    fontSize: isMobile ? '14px' : '16px',
                    color: 'rgba(255, 255, 255, 0.8)',
                    margin: 0,
                  }}
                >
                  +94 70.327.2582
                </p>
              </div>
              <div>
                <p
                  style={{
                    fontFamily: "'Clash Display', sans-serif",
                    fontSize: isMobile ? '14px' : '16px',
                    color: 'rgba(255, 255, 255, 0.8)',
                    margin: 0,
                  }}
                >
                  +94 70.327.2582
                </p>
              </div>
              <div>
                <p
                  style={{
                    fontFamily: "'Clash Display', sans-serif",
                    fontSize: isMobile ? '14px' : '16px',
                    color: 'rgba(255, 255, 255, 0.8)',
                    margin: 0,
                  }}
                >
                  Sri Lanka
                </p>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3
              style={{
                fontFamily: "'Clash Display', sans-serif",
                fontSize: isMobile ? '16px' : '18px',
                fontWeight: 600,
                color: '#ffffff',
                marginBottom: isMobile ? '1rem' : '1.5rem',
                margin: 0,
                paddingBottom: isMobile ? '0.75rem' : '1rem',
              }}
            >
              Social Media
            </h3>
            <div
              style={{
                display: 'flex',
                gap: '1rem',
                flexWrap: 'wrap',
              }}
            >
              {[
                { name: 'facebook', icon: 'facebook (2).png' },
                { name: 'instagram', icon: 'instagram.png' },
                { name: 'whatsapp', icon: 'whatsapp.png' },
                { name: 'tiktok', icon: 'tiktok.png' },
              ].map((social) => (
                <a
                  key={social.name}
                  href="#"
                  style={{
                    width: isMobile ? '40px' : '44px',
                    height: isMobile ? '40px' : '44px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.backgroundColor = 'rgba(255, 255, 255, 0.25)';
                    el.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    el.style.transform = 'scale(1)';
                  }}
                >
                  <img
                    src={`/social-icons/${social.icon}`}
                    alt={social.name}
                    style={{
                      width: isMobile ? '20px' : '22px',
                      height: isMobile ? '20px' : '22px',
                    }}
                  />
                </a>
              ))}
            </div>
          </div>
          </div>
        </div>

        {/* Bottom section with divider and copyright */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            padding: isMobile ? '1.5rem 1.25rem' : '2rem 5rem',
          }}
        >
          <div
            style={{
              maxWidth: '1280px',
              margin: '0 auto',
              textAlign: 'center',
            }}
          >
          <p
            style={{
              fontFamily: "'Clash Display', sans-serif",
              fontSize: isMobile ? '13px' : '14px',
              color: 'rgba(255, 255, 255, 0.7)',
              margin: 0,
            }}
          >
            2026 Velora Ceylon Travels. All right Reserved.
          </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
