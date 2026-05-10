
import InquireSection from "../HomePage/inquire-section";
import Footer from "../Layout/footer";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight, Clock, Star } from "lucide-react";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

interface Tour {
  id: number;
  days: number;
  image: string;
  alt: string;
  rating: number;
  reviews: number;
  title: string;
  desc: string;
  price: string;
  priceNote: string;
}

const TOURS: Tour[] = [
  {
    id: 1,
    days: 7,
    image: "/homepage/tour1.jpg",
    alt: "Classic Sri Lanka Tour",
    rating: 4,
    reviews: 110,
    title: "Classic Sri Lanka Tour",
    desc: "Explore Sri Lanka's top cultural and natural landmarks, from Sigiriya to Yala National Park.",
    price: "$899 P/P",
    priceNote: "From",
  },
  {
    id: 2,
    days: 9,
    image: "/tourspage/tour2.jpg",
    alt: "Sri Lanka Adventure & Wildlife Safari",
    rating: 4,
    reviews: 110,
    title: "Sri Lanka Adventure & Wildlife Safari",
    desc: "An action-packed tour with safaris, rainforest treks, and breathtaking landscapes in Sri Lanka's wild heart.",
    price: "$1,199 P/P",
    priceNote: "From",
  },
  {
    id: 3,
    days: 5,
    image: "/tourspage/tour3.jpg",
    alt: "Luxury Beach Gateway",
    rating: 4,
    reviews: 110,
    title: "Luxury Beach Gateway",
    desc: "Indulge in a relaxing beach retreat with luxury resorts, whale watching, and private yacht tours.",
    price: "$1,499 P/P",
    priceNote: "From",
  },
];

const faqItems: FAQItem[] = [
  {
    id: 1,
    question: "What is included in the tour price?",
    answer:
      "You can easily book a tour by visiting our website, selecting your preferred packages, and filling out the inquiry form. Our team will be in touch to finalize your booking.",
  },
  {
    id: 2,
    question: "How do I book a tour?",
    answer:
      "You can easily book a tour by visiting our website, selecting your preferred packages, and filling out the inquiry form. Our team will be in touch to finalize your booking.",
  },
  {
    id: 3,
    question: "Are the tours customizable?",
    answer:
      "You can easily book a tour by visiting our website, selecting your preferred packages, and filling out the inquiry form. Our team will be in touch to finalize your booking.",
  },
  {
    id: 4,
    question: "What types of tours do you offer?",
    answer:
      "You can easily book a tour by visiting our website, selecting your preferred packages, and filling out the inquiry form. Our team will be in touch to finalize your booking.",
  },
  {
    id: 5,
    question: "What is the best time to visit Sri Lanka?",
    answer:
      "You can easily book a tour by visiting our website, selecting your preferred packages, and filling out the inquiry form. Our team will be in touch to finalize your booking.",
  },
  {
    id: 6,
    question: "How do I make payments?",
    answer:
      "You can easily book a tour by visiting our website, selecting your preferred packages, and filling out the inquiry form. Our team will be in touch to finalize your booking.",
  },
  {
    id: 7,
    question: "Do I need a visa to visit Sri Lanka?",
    answer:
      "You can easily book a tour by visiting our website, selecting your preferred packages, and filling out the inquiry form. Our team will be in touch to finalize your booking.",
  },
];

const clash: React.CSSProperties = {
  fontFamily: "'Clash Display', sans-serif",
};

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}

function StarRating({ rating, reviews }: { rating: number; reviews: number }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        marginBottom: "10px",
      }}
    >
      <div style={{ display: "flex", gap: "2px" }}>
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            size={14}
            fill={i <= rating ? "#65ABEA" : "none"}
            stroke={i <= rating ? "#65ABEA" : "#65ABEA"}
          />
        ))}
      </div>
      <span
        style={{
          fontSize: "0.75rem",
          color: "#999",
          fontFamily: "'Clash Display', sans-serif",
        }}
      >
        {rating}.6 ({reviews} reviews)
      </span>
    </div>
  );
}



export default function FAQPage() {
  const [expandedId, setExpandedId] = useState<number | null>(2);
  const [isMobile, setIsMobile] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);
  const { ref: toursRef, visible: toursVisible } = useInView(0.1);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  function TourCard({ tour }: { tour: Tour }) {
  const navigate = useNavigate();

  return (
    <div className="tour-card">
      <div className="tour-img-wrap">
        <img src={tour.image} alt={tour.alt} className="tour-img" />
        <div className="tour-badge">
          <Clock size={12} />
          <span>{tour.days} Days</span>
        </div>
      </div>
      <div className="tour-body">
        <StarRating rating={tour.rating} reviews={tour.reviews} />
        <h3 className="tour-title">{tour.title}</h3>
        <p className="tour-desc">{tour.desc}</p>
        <div className="tour-footer">
          <div>
            <div
              style={{
                fontSize: "0.72rem",
                color: "#aaa",
                fontFamily: "'Clash Display', sans-serif",
              }}
            >
              From
            </div>
            <div className="tour-price">{tour.price}</div>
          </div>
          <button
            className="tour-btn"
            onClick={() => navigate(`/tours/${tour.id}`)}
          >
            View Details
            <span className="tour-btn-icon">
              <ArrowUpRight size={14} />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

  return (
    <>
      <style>{`
        @import url('https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap');

        :root {
          --blue:   #65ABEA;
          --dark:   #111111;
          --mid:    #444444;
          --soft:   #888888;
          --bg:     #f9f9f7;
          --card:   #ffffff;
          --border: rgba(0,0,0,0.08);
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .au-page {
          font-family: 'Clash Display', sans-serif;
          background: #fff;
          color: var(--dark);
        }

        /* ══════ HERO ══════ */
        .au-hero {
          position: relative;
          width: 100%;
          min-height: 650px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          overflow: hidden;
        }

        .au-hero-bg {
          position: absolute; inset: 0;
          background: url('/faqpage/faq-hero.jpg') center / cover no-repeat;
          transform: scale(1.06);
          transition: transform 9s ease;
        }
        .au-hero-bg.visible { transform: scale(1); }

        .au-hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(0,0,0,0.22) 0%,
            rgba(0,0,0,0.08) 10%,
            rgba(0,0,0,0.62) 100%
          );
        }

        .au-hero-content {
          position: relative; z-index: 2;
          padding: 0 24px;
          opacity: 0; transform: translateY(28px);
          transition: opacity 1s ease, transform 1s ease;
        }
        .au-hero-content.visible { opacity: 1; transform: translateY(0); }

        .au-hero-title {
          font-size: clamp(2.8rem, 7.5vw, 5rem);
          font-weight: 500;
          color: #fff;
          line-height: 1.04;
          letter-spacing: -0.03em;
          margin-bottom: 16px;
          max-width: 800px;
        }

        .au-hero-sub {
          font-size: clamp(0.82rem, 1.8vw, 1rem);
          color: #C7C7C7;
          font-weight: 400;
          letter-spacing: 0.04em;
          margin-bottom: 36px;
          max-width: 650px;
          margin-left: auto;
          margin-right: auto;
        }

        .au-pill-btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background: rgba(255,255,255,0.10);
          border: 1.5px solid rgba(255,255,255,0.32);
          border-radius: 9999px;
          padding: 10px 14px 10px 24px;
          color: #fff;
          font-size: 0.86rem;
          font-family: 'Clash Display', sans-serif;
          font-weight: 500;
          cursor: pointer;
          text-decoration: none;
          transition: background 0.22s, border-color 0.22s, transform 0.22s;
          backdrop-filter: blur(10px);
        }
        .au-pill-btn:hover {
          background: rgba(255,255,255,0.20);
          border-color: rgba(255,255,255,0.55);
          transform: translateX(5px);
        }
        .au-pill-btn-icon {
          width: 30px; height: 30px;
          border-radius: 50%;
          background: #fff;
          color: #111;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          font-weight: 700;
          flex-shrink: 0;
          transition: transform 0.2s;
        }
        .au-pill-btn:hover .au-pill-btn-icon { transform: translateX(4px); }

        /* ══════ TOURS SECTION (Images 2 & 3) ══════ */
        .au-tours-section {
          padding: clamp(40px, 5vw, 72px) clamp(24px, 6vw, 80px);
          background: #fff;
        }

        .au-tours-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 24px;
          margin-bottom: clamp(28px, 4vw, 48px);
          flex-wrap: wrap;
        }

        .au-tours-heading {
          font-size: clamp(1.8rem, 3.5vw, 2.6rem);
          font-weight: 500;
          color: #111;
          line-height: 1.12;
          letter-spacing: -0.025em;
          flex: 0 0 auto;
        }

        .au-tours-subtext {
        font-size: clamp(0.78rem, 1.3vw, 0.88rem);
        color: #aaa;
        line-height: 1.7;
        font-weight: 400;
        max-width: 450px;    
        margin-left: auto; 
        text-align: left;
        }

        .tours-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(16px, 2.5vw, 24px);
          opacity: 0;
          transform: translateY(36px);
          transition: opacity 0.85s 0.1s ease, transform 0.85s 0.1s ease;
        }
        .tours-grid.visible { opacity: 1; transform: translateY(0); }

        /* Tour Card */
        .tour-card {
          border: 1px solid #eee;
          border-radius: 18px;
          overflow: hidden;
          background: #fff;
          transition: box-shadow 0.28s ease, transform 0.28s ease;
          display: flex;
          flex-direction: column;
        }
        .tour-card:hover { box-shadow: 0 12px 40px rgba(0,0,0,0.10); transform: translateY(-4px); }

        .tour-img-wrap {
          position: relative;
          height: clamp(170px, 20vw, 300px);
          overflow: hidden;
          flex-shrink: 0;
        }
        .tour-img {
          width: 100%; height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.5s ease;
        }
        .tour-card:hover .tour-img { transform: scale(1.05); }

        .tour-badge {
          position: absolute;
          top: 14px; right: 14px;
          background: var(--blue);
          color: #fff;
          border-radius: 9999px;
          padding: 5px 12px;
          font-size: 0.72rem;
          font-family: 'Clash Display', sans-serif;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .tour-body {
          padding: clamp(14px, 2vw, 20px);
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .tour-title {
          font-size: clamp(0.9rem, 1.5vw, 1rem);
          font-weight: 600;
          color: #111;
          margin-bottom: 8px;
          line-height: 1.3;
          font-family: 'Clash Display', sans-serif;
        }
        .tour-desc {
          font-size: clamp(0.75rem, 1.2vw, 0.82rem);
          color: #999;
          line-height: 1.7;
          font-weight: 400;
          flex: 1;
          margin-bottom: 14px;
          font-family: 'Clash Display', sans-serif;
        }
        .tour-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }
        .tour-price {
          font-size: clamp(0.82rem, 1.3vw, 0.9rem);
          color: var(--blue);
          font-weight: 600;
          font-family: 'Clash Display', sans-serif;
        }
        .tour-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--blue);
          border: none;
          border-radius: 9999px;
          padding: 8px 10px 8px 16px;
          color: #fff;
          font-size: 0.78rem;
          font-family: 'Clash Display', sans-serif;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.22s, transform 0.22s;
          white-space: nowrap;
        }
        .tour-btn:hover { background: #4a9add; transform: translateX(3px); }
        .tour-btn-icon {
          width: 24px; height: 24px;
          border-radius: 50%;
          background: rgba(255,255,255,0.25);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        /* ══════ RESPONSIVE ══════ */
        @media (max-width: 768px) {
          .au-about-row  { grid-template-columns: 1fr; }
          .au-img-stack  { height: clamp(240px, 65vw, 360px); }
          .au-mv-grid    { grid-template-columns: 1fr; }
          .au-stats      { gap: 16px; }
        }
        @media (max-width: 480px) {
          .au-stat-divider { display: none; }
          .au-hero { min-height: 400px; }
          .au-hero-content { padding: 0 12px; margin-top: 60px; }
        }

        @media (max-width: 900px) {
          .tours-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .au-curated-section {
            flex-direction: column;
          }
          .au-curated-img-wrap {
            width: 100%;
            max-width: 100%;
            height: clamp(200px, 55vw, 320px);
          }
          .au-stats { gap: 16px; }
          .au-tours-header { flex-direction: column; gap: 8px; }
          .au-tours-subtext { text-align: left; }
        }
        @media (max-width: 600px) {
          .tours-grid { grid-template-columns: 1fr; }
          .modal-row-2 { grid-template-columns: 1fr; }
        }
        @media (max-width: 480px) {
          .au-stat-divider { display: none; }
          .au-tours-subtext { text-align: left; margin-top: -15px; }
          .au-hero { min-height: 400px; }
          .au-hero-content { padding: 0 12px; margin-top: 60px; }
          .au-tours-subtext { margin-top: 15px; }
        }
      `}</style>

      <div className="au-page">
        <section className="au-hero">
          <div className={`au-hero-bg ${heroVisible ? "visible" : ""}`} />
          <div className="au-hero-overlay" />

          <div className={`au-hero-content ${heroVisible ? "visible" : ""}`}>
            <h1 className="au-hero-title">Got Questions? We Have Answers!</h1>
            <p className="au-hero-sub">
              Find quick answers to your most common questions about our tours, booking process, and everything you need to know before your adventure.
            </p>
          </div>
        </section>

        <section
          style={{
            width: "100%",
            backgroundColor: "#ffffff",
            padding: isMobile ? "2.5rem 1.25rem" : "3.5rem 5rem",
            boxSizing: "border-box",
          }}
        >
          <div style={{ margin: "0 auto" }}>
            <div
              style={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: isMobile ? "1.25rem" : "3rem",
                marginBottom: isMobile ? "2rem" : "3rem",
              }}
            >
              <div style={{ flex: 1 }}>
                <h2
                  style={{
                    ...clash,
                    fontSize: isMobile ? "1.85rem" : "50px",
                    fontWeight: 500,
                    color: "#212121",
                    lineHeight: 1.2,
                    margin: "0 0 1rem 0",
                    maxWidth: "700px",
                  }}
                >
                  Everything You Need to Know Before You Travel
                </h2>
                <p
                  style={{
                    fontSize: "18px",
                    color: "#999999",
                    fontWeight: 400,
                    lineHeight: 1.5,
                    margin: 0,
                    fontFamily: "Clash Display",
                    maxWidth: "720px",
                  }}
                >
                  We understand that planning a trip can raise many questions.
                  Below, we've answered the most common queries to help you
                  prepare for your unforgettable journey with Velora Ceylon
                  Travels.
                </p>
              </div>
              <div
                style={{ flexShrink: 0, paddingTop: isMobile ? 0 : "0.25rem" }}
              >
                <button
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    backgroundColor: "#65ABEA",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "9999px",
                    padding: "0.6rem 1.1rem 0.6rem 1.4rem",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    fontFamily: "Clash Display",
                  }}
                >
                  Learn More
                  <span
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      backgroundColor: "rgba(255,255,255,0.28)",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
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

            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                gap: isMobile ? "2rem" : "4rem",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "100%",
                  borderRadius: "1.5rem",
                  overflow: "hidden",
                  height: isMobile ? "400px" : "700px",
                }}
              >
                <img
                  src="/faqpage/faq-left.jpg"
                  alt="Wildlife tour"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800&q=80";
                  }}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>

              <div
                style={{
                  borderTop: "1px solid #e5e7eb",
                }}
              >
                {faqItems.map((item) => {
                  const isOpen = expandedId === item.id;

                  return (
                    <div
                      key={item.id}
                      style={{
                        borderBottom: "1px solid #e5e7eb",
                      }}
                    >
                      {/* Question */}
                      <button
                        onClick={() => toggleExpand(item.id)}
                        style={{
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "1.05rem 0",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          textAlign: "left",
                          gap: "1rem",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "0.35rem",
                            flex: 1,
                            minWidth: 0,
                          }}
                        >
                          <span
                            style={{
                              ...clash,
                              fontSize: "24px",
                              fontWeight: 500,
                              color: "#212121",
                              flexShrink: 0,
                            }}
                          >
                            {item.id}.
                          </span>
                          <span
                            style={{
                              ...clash,
                              fontSize: "24px",
                              fontWeight: 500,
                              color: "#212121",
                            }}
                          >
                            {item.question}
                          </span>
                        </div>

                        <div style={{ flexShrink: 0, color: "#6b7280" }}>
                          {isOpen ? (
                            <svg
                              width="20"
                              height="20"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M20 12H4"
                              />
                            </svg>
                          ) : (
                            <svg
                              width="20"
                              height="20"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 4v16m8-8H4"
                              />
                            </svg>
                          )}
                        </div>
                      </button>

                      <div
                        style={{
                          overflow: "hidden",
                          maxHeight: isOpen ? "160px" : "0px",
                          transition: "max-height 0.3s ease",
                        }}
                      >
                        <p
                          style={{
                            fontSize: "18px",
                            color: "#999999",
                            lineHeight: 1.75,
                            margin: "0 0 1rem 1.25rem",
                            fontFamily: "Clash Display",
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


        {/* ── FEATURED TOURS (Images 2 & 3 style) ── */}
        <section className="au-tours-section">
          <div className="au-tours-header">
            <h2 className="au-tours-heading">
              Explore Tours
            </h2>
            <p className="au-tours-subtext">
              From tropical escapes to mountain expeditions – find the perfect
              journey for every type of traveler.
            </p>
          </div>

          <div
            className={`tours-grid ${toursVisible ? "visible" : ""}`}
            ref={toursRef}
          >
            {TOURS.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        </section>
        <InquireSection />
        <Footer />
      </div>
    </>
  );
}
