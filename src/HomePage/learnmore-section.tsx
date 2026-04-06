import { useState, useEffect } from 'react';
 
interface FAQItem {
  id: number;
  question: string;
  answer: string;
}
 
const faqItems: FAQItem[] = [
  {
    id: 1,
    question: 'What is included in the tour price?',
    answer:
      'You can easily book a tour by visiting our website, selecting your preferred packages, and filling out the inquiry form. Our team will be in touch to finalize your booking.',
  },
  {
    id: 2,
    question: 'How do I book a tour?',
    answer:
      'You can easily book a tour by visiting our website, selecting your preferred packages, and filling out the inquiry form. Our team will be in touch to finalize your booking.',
  },
  {
    id: 3,
    question: 'Are the tours customizable?',
    answer:
      'You can easily book a tour by visiting our website, selecting your preferred packages, and filling out the inquiry form. Our team will be in touch to finalize your booking.',
  },
  {
    id: 4,
    question: 'What types of tours do you offer?',
    answer:
      'You can easily book a tour by visiting our website, selecting your preferred packages, and filling out the inquiry form. Our team will be in touch to finalize your booking.',
  },
  {
    id: 5,
    question: 'What is the best time to visit Sri Lanka?',
    answer:
      'You can easily book a tour by visiting our website, selecting your preferred packages, and filling out the inquiry form. Our team will be in touch to finalize your booking.',
  },
  {
    id: 6,
    question: 'How do I make payments?',
    answer:
      'You can easily book a tour by visiting our website, selecting your preferred packages, and filling out the inquiry form. Our team will be in touch to finalize your booking.',
  },
  {
    id: 7,
    question: 'Do I need a visa to visit Sri Lanka?',
    answer:
      'You can easily book a tour by visiting our website, selecting your preferred packages, and filling out the inquiry form. Our team will be in touch to finalize your booking.',
  },
];
 
const clash: React.CSSProperties = {
  fontFamily: "'Clash Display', sans-serif",
};
 
const LearnMoreSection = () => {
  const [expandedId, setExpandedId] = useState<number | null>(2);
  const [isMobile, setIsMobile] = useState(false);
 
  useEffect(() => {
    // Inject Clash Display font once
    // if (!document.getElementById('clash-display-font')) {
    //   const link = document.createElement('link');
    //   link.id = 'clash-display-font';
    //   link.rel = 'stylesheet';
    //   link.href =
    //     'https://fonts.googleapis.com/css2?family=Clash+Display:wght@400;500;600;700&display=swap';
    //   document.head.appendChild(link);
    // }
 
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
 
  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };
 
  return (
    <section
      style={{
        width: '100%',
        backgroundColor: '#ffffff',
        padding: isMobile ? '2.5rem 1.25rem' : '3.5rem 5rem',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
 
        {/* ── Header row ── */}
        <div
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: isMobile ? '1.25rem' : '3rem',
            marginBottom: isMobile ? '2rem' : '3rem',
          }}
        >
          {/* Title + description */}
          <div style={{ flex: 1 }}>
            <h2
              style={{
                ...clash,
                fontSize: isMobile ? '1.85rem' : '50px',
                fontWeight: 500,
                color: '#212121',
                lineHeight: 1.2,
                margin: '0 0 1rem 0',
                maxWidth: '700px'
              }}
            >
              Everything You Need to Know Before You Travel
            </h2>
            <p
              style={{
                fontSize: '18px',
                color: '#999999',
                fontWeight: 400,
                lineHeight: 1.5,
                margin: 0,
                fontFamily: 'Clash Display', 
                maxWidth: '720px'
              }}
            >
              We understand that planning a trip can raise many questions. Below,
              we've answered the most common queries to help you prepare for your
              unforgettable journey with Velora Ceylon Travels.
            </p>
          </div>
 
          {/* Learn More pill button */}
          <div style={{ flexShrink: 0, paddingTop: isMobile ? 0 : '0.25rem' }}>
            <button
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: '#65ABEA',
                color: '#ffffff',
                border: 'none',
                borderRadius: '9999px',
                padding: '0.6rem 1.1rem 0.6rem 1.4rem',
                fontSize: '0.875rem',
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                fontFamily: 'Clash Display', 
              }}
            >
              Learn More
              <span
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.28)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path
                    d="M1.5 11.5L11.5 1.5M11.5 1.5H4.5M11.5 1.5V8.5"
                    stroke="white"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>
 
        {/* ── Two-column: image + FAQ ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? '2rem' : '4rem',
            alignItems: 'center',
          }}
        >
          {/* Left — image */}
          <div
            style={{
              width: '100%',
              borderRadius: '1.5rem',
              overflow: 'hidden',
              height: isMobile ? '400px' : '700px',
            }}
          >
            <img
              src="/homepage/learnmore.jpg"
              alt="Wildlife tour"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800&q=80';
              }}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </div>
 
          {/* Right — FAQ accordion */}
          <div
            style={{
              borderTop: '1px solid #e5e7eb',
            }}
          >
            {faqItems.map((item, index) => {
              const isOpen = expandedId === item.id;
              const isLast = index === faqItems.length - 1;
 
              return (
                <div
                  key={item.id}
                  style={{
                    borderBottom: '1px solid #e5e7eb',
                  }}
                >
                  {/* Question */}
                  <button
                    onClick={() => toggleExpand(item.id)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '1.05rem 0',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      gap: '1rem',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.35rem',
                        flex: 1,
                        minWidth: 0,
                      }}
                    >
                      <span
                        style={{
                          ...clash,
                          fontSize: '24px',
                          fontWeight: 500,
                          color: '#212121',
                          flexShrink: 0,
                        }}
                      >
                        {item.id}.
                      </span>
                      <span
                        style={{
                          ...clash,
                          fontSize: '24px',
                          fontWeight: 500,
                          color: '#212121',
                        }}
                      >
                        {item.question}
                      </span>
                    </div>
 
                    <div style={{ flexShrink: 0, color: '#6b7280' }}>
                      {isOpen ? (
                        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      ) : (
                        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      )}
                    </div>
                  </button>
 
                  {/* Answer — CSS transition on max-height */}
                  <div
                    style={{
                      overflow: 'hidden',
                      maxHeight: isOpen ? '160px' : '0px',
                      transition: 'max-height 0.3s ease',
                    }}
                  >
                    <p
                      style={{
                        fontSize: '18px',
                        color: '#999999',
                        lineHeight: 1.75,
                        margin: '0 0 1rem 1.25rem',
                        fontFamily: 'Clash Display', 
                      }}
                    >
                      {item.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
 
      </div>
    </section>
  );
};
 
export default LearnMoreSection;