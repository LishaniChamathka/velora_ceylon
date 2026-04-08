import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const reviews = [
  {
    rating: 4,
    quote: '"Velora Ceylon crafted an absolutely magical 12-day..."',
    body: "Velora Ceylon crafted an absolutely magical 12-day tour through Sri Lanka. Every detail was perfect — from the tea estate stays to the private whale-watching trip.",
    name: "James Harrington",
    country: "United Kingdom",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    rating: 4,
    quote: '"The team went above and beyond to..."',
    body: "The team went above and beyond to make our honeymoon unforgettable. Hidden beaches, private villa dinners, sunrise safaris — truly a once-in-a-lifetime experience.",
    name: "Sophie Laurent",
    country: "France",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    rating: 4,
    quote: '"I was amazed at how personalized everything..."',
    body: "I was amazed at how personalized everything felt. Roshan our guide knew the history of every temple, and Nimesha organized everything flawlessly.",
    name: "Marcus Chen",
    country: "Australia",
    avatar: "https://randomuser.me/api/portraits/men/55.jpg",
  },
  {
    rating: 4,
    quote: '"Sustainable, authentic, extraordinary..."',
    body: "Sustainable, authentic, extraordinary. Velora Ceylon took us off the beaten path to experience real Sri Lankan life while treading lightly on this beautiful island.",
    name: "Annika Bergström",
    country: "Sweden",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    rating: 5,
    quote: '"An experience beyond all expectations..."',
    body: "From the moment we landed to our departure, every moment was curated with such care. The cultural immersion, the food, the landscapes — all absolutely breathtaking.",
    name: "David Okafor",
    country: "Canada",
    avatar: "https://randomuser.me/api/portraits/men/76.jpg",
  },
  {
    rating: 4,
    quote: '"The most thoughtful travel company..."',
    body: "They thought of everything before we even had to ask. The attention to detail across every hotel, every driver, every guide was unlike anything we've experienced.",
    name: "Yuki Tanaka",
    country: "Japan",
    avatar: "https://randomuser.me/api/portraits/women/22.jpg",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div style={{ display: "flex", gap: "4px" }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={18}
          fill={s <= rating ? "#65ABEA" : "none"}
          stroke={s <= rating ? "#65ABEA" : "#65ABEA"}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}

const VISIBLE_DESKTOP = 4;

export default function RealFeedback() {
  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [, setDirection] = useState<"left" | "right">("right");
  const [visibleCards, setVisibleCards] = useState(VISIBLE_DESKTOP);
  const [visible, setVisible] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setVisibleCards(4);
      } else if (window.innerWidth >= 768) {
        setVisibleCards(2);
      } else {
        setVisibleCards(1);
      }
      setIndex(0); 
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, reviews.length - visibleCards);

  const slide = (dir: "left" | "right") => {
    if (animating) return;
    if (dir === "right" && index >= maxIndex) return;
    if (dir === "left" && index <= 0) return;
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setIndex((prev) => (dir === "right" ? prev + 1 : prev - 1));
      setAnimating(false);
    }, 350);
  };

  const translateX = `translateX(calc(-${index} * (var(--card-width) + var(--gap))))`;

  return (
    <>
      <style>{`
        @import url('https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap');

        .rf-section {
          font-family: 'Clash Display', sans-serif;
          background: #ffffff;
          width: 100%;
          padding: 2.5rem 6rem;
          overflow: hidden;
        }

        .rf-inner {
          margin: 0 auto;
          padding: 0 2.5rem;
        }

        /* ── Header row ── */
        .rf-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 2rem;
          margin-bottom: 2.5rem;
        }

        .rf-header-left h2 {
          font-family: 'Clash Display', sans-serif;
          font-size: clamp(28px, 4vw, 50px);
          font-weight: 500;
          color: #111111;
          line-height: 1.1;
          letter-spacing: -0.5px;
          margin-bottom: 0.85rem;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }

        .rf-header-left h2.go {
          opacity: 1;
          transform: translateY(0);
        }

        .rf-header-left p {
          font-family: 'Clash Display', sans-serif;
          font-size: 18px;
          font-weight: 400;
          color: #999999;
          line-height: 1.75;
          max-width: 800px;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s;
        }

        .rf-header-left p.go {
          opacity: 1;
          transform: translateY(0);
        }

        /* ── Arrow buttons ── */
        .rf-arrows {
          display: flex;
          gap: 0.6rem;
          flex-shrink: 0;
        }

        .rf-arrow {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: none;
          background: #111111;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s ease, transform 0.15s ease;
        }

        .rf-arrow:hover {
          background: #333333;
          transform: scale(1.06);
        }

        .rf-arrow:disabled {
          background: #e5e7eb;
          color: #9ca3af;
          cursor: default;
          transform: none;
        }

        /* ── Slider ── */
        .rf-slider-outer {
          overflow: hidden;
        }

        .rf-slider-track {
          --card-width: calc(25% - 0.825rem);
          --gap: 1.1rem;
          display: flex;
          gap: var(--gap);
          width: 100%;
          transition: transform 0.45s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* ── Card ── */
        .rf-card {
          font-family: 'Clash Display', sans-serif;
          flex-shrink: 0;
          width: var(--card-width);
        //   height: 350px;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 16px;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          transition: box-shadow 0.25s ease, transform 0.25s ease, opacity 0.6s ease, filter 0.6s ease;
          opacity: 0;
          filter: blur(4px);
        }

        .rf-card.go {
          opacity: 1;
          filter: blur(0);
        }

        .rf-card:hover {
          box-shadow: 0 8px 32px rgba(0,0,0,0.08);
          transform: translateY(-2px);
        }

        .rf-card-quote {
          font-family: 'Clash Display', sans-serif;
          font-size: 18px;
          font-weight: 500;
          color: #000000;
          line-height: 1.4;
        }

        .rf-card-body {
          font-family: 'Clash Display', sans-serif;
          font-size: 16px;
          font-weight: 400;
          color: #212121;
          line-height: 1.75;
          flex: 1;
        }

        .rf-card-author {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          padding-top: 0.4rem;
          border-top: 1px solid #f3f4f6;
        }

        .rf-card-avatar {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          object-fit: cover;
          flex-shrink: 0;
        }

        .rf-card-name {
          font-family: 'Clash Display', sans-serif;
          font-size: 14px;
          font-weight: 500;
          color: #212121;
        }

        .rf-card-country {
          font-family: 'Clash Display', sans-serif;
          font-size: 13px;
          font-weight: 400;
          color: #212121;
        }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .rf-slider-track {
            --card-width: calc(50% - 0.5rem);
            --gap: 1rem;
          }
        }

        @media (max-width: 768px) {
          .rf-section { padding: 2rem 1.25rem; }
          .rf-inner { padding: 0 1.25rem; }
          .rf-header { flex-direction: column; align-items: flex-start; gap: 1.5rem; margin-bottom: 2rem; }
          .rf-slider-track { --card-width: calc(100% - 1rem); --gap: 1rem; }
          .rf-card { padding: 1.25rem; }
        }

        @media (max-width: 480px) {
          .rf-section { padding: 1.5rem 1rem; }
          .rf-inner { padding: 0 0.5rem; }
          .rf-header { gap: 1rem; }
          .rf-slider-track { --card-width: calc(100% - 0.75rem); --gap: 0.75rem; }
          .rf-card { padding: 1rem; }
          .rf-card-quote { font-size: 14px; }
          .rf-card-body { font-size: 12px; }
        }
      `}</style>

      <section ref={sectionRef} className="rf-section">
        <div className="rf-inner">
          <div className="rf-header">
            <div className="rf-header-left">
              <h2 className={visible ? "go" : ""}>
                Real Feedback from<br />Happy Travelers
              </h2>
              <p className={visible ? "go" : ""}>
                We pride ourselves on delivering unforgettable travel experiences. Here's what some
                of our satisfied customers have to say about their journey with Velora Ceylon Travels.
              </p>
            </div>
            <div className="rf-arrows">
              <button
                className="rf-arrow"
                onClick={() => slide("left")}
                disabled={index <= 0}
                aria-label="Previous"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                className="rf-arrow"
                onClick={() => slide("right")}
                disabled={index >= maxIndex}
                aria-label="Next"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div className="rf-slider-outer">
            <div
              ref={trackRef}
              className="rf-slider-track"
              style={{ transform: translateX }}
            >
              {reviews.map((r, i) => (
                <div
                  key={i}
                  className={`rf-card${visible ? " go" : ""}`}
                  style={{ transitionDelay: visible ? `${0.15 + i * 0.08}s` : "0s" }}
                >
                  <StarRating rating={r.rating} />
                  <div className="rf-card-quote">{r.quote}</div>
                  <p className="rf-card-body">{r.body}</p>
                  <div className="rf-card-author">
                    <img
                      src={r.avatar}
                      alt={r.name}
                      className="rf-card-avatar"
                      loading="lazy"
                    />
                    <div>
                      <div className="rf-card-name">{r.name}</div>
                      <div className="rf-card-country">{r.country}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}