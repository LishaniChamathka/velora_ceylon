import { useState, useEffect, useRef } from "react";
import visionIcon from "/social-icons/vision-icon.png";
import missionIcon from "/social-icons/mission-icon.png";
import TopDestinations from "../HomePage/destinations-section";
import RealFeedback from "../HomePage/review-section";
import InquireSection from "../HomePage/inquire-section";
import Footer from "../Layout/footer";
import { ArrowUpRight } from "lucide-react";

interface StatItem {
  value: string;
  label: string;
  raw: number;
  suffix: string;
  isThousands?: boolean;
}

interface MissionVision {
  icon: string;
  title: string;
  desc: string;
}

const STATS: StatItem[] = [
  { value: "2.5K+", label: "Happy Travelers",     raw: 2500, suffix: "K+", isThousands: true },
  { value: "10+",   label: "Expert Guides",        raw: 10,   suffix: "+"  },
  { value: "05+",   label: "Years of Excellence",  raw: 5,    suffix: "+"  },
];

const MV_CARDS: MissionVision[] = [
  {
    icon: missionIcon,
    title: "Our Mission",
    desc: "To offer customized and authentic Sri Lankan travel experiences, connecting travelers to the island's vibrant culture, natural beauty, and warm hospitality.",
  },
  {
    icon: visionIcon,
    title: "Our Vision",
    desc: "To be the leading travel provider in Sri Lanka, recognized for our exceptional service, local expertise, and commitment to creating unforgettable journeys.",
  },
];

function useCountUp(item: StatItem, duration = 1600, trigger: boolean) {
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!trigger) return;
    const { raw, suffix, isThousands } = item;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const val = raw * eased;
      if (isThousands) {
        setDisplay((val / 1000).toFixed(1) + suffix);
      } else {
        setDisplay(Math.round(val) + suffix);
      }
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [trigger]);

  return display;
}

function StatCounter({ item, trigger }: { item: StatItem; trigger: boolean }) {
  const display = useCountUp(item, 1600, trigger);
  return (
    <div style={{ minWidth: 0 }}>
      <div style={{
        fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
        fontWeight: 600,
        color: "#111",
        letterSpacing: "-0.03em",
        lineHeight: 1,
        fontFamily: "'Clash Display', sans-serif",
      }}>
        {display}
      </div>
      <div style={{
        fontSize: "clamp(0.72rem, 1.3vw, 0.8rem)",
        color: "#000",
        marginTop: "5px",
        fontFamily: "'Clash Display', sans-serif",
        fontWeight: 400,
      }}>
        {item.label}
      </div>
    </div>
  );
}

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

export default function AboutUsPage() {
  const [heroVisible, setHeroVisible] = useState(false);

  const { ref: aboutRef,  visible: aboutVisible  } = useInView(0.12);
  const { ref: statsRef,  visible: statsVisible  } = useInView(0.4);
  const { ref: mvGridRef, visible: mvGridVisible } = useInView(0.15);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

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
          background: url('/aboutpage/about-hero.jpg') center / cover no-repeat;
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
        }

        .au-hero-sub {
          font-size: clamp(0.82rem, 1.8vw, 1rem);
          color: #C7C7C7;
          font-weight: 400;
          letter-spacing: 0.04em;
          margin-bottom: 36px;
          max-width: 550px;
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

        /* ══════ SECTIONS ══════ */
        .au-section {
          padding: clamp(32px, 4vw, 60px) clamp(20px, 6vw, 80px);
        }

        /* ══════ ABOUT ROW ══════ */
        .au-about-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(40px, 6vw, 90px);
          align-items: center;
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.85s ease, transform 0.85s ease;
        }
        .au-about-row.visible { opacity: 1; transform: translateY(0); }

        /* ── Image stack ── */
        .au-img-stack {
          position: relative;
          height: clamp(300px, 42vw, 500px);
        }
        .au-img-primary {
          position: absolute;
          top: 0; left: 0;
          width: 70%; height: 90%;
          border-radius: 22px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0,0,0,0.13);
          z-index: 2;
        }
        .au-img-primary img,
        .au-img-secondary img {
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
          display: block;
        }
        .au-img-primary:hover img  { transform: scale(1.05); }
        .au-img-secondary:hover img { transform: scale(1.06); }

        .au-img-secondary {
          position: absolute;
          bottom: 0; right: 0;
          width: 56%; height: 55%;
          border-radius: 30px;
          overflow: hidden;
          box-shadow: 0 14px 40px rgba(0,0,0,0.12);
          z-index: 3;
        }

        /* ── Text column ── */
        .au-text-col { display: flex; flex-direction: column; }

        .au-main-heading {
          font-size: clamp(1.8rem, 4vw, 3rem);
          font-weight: 500;
          color: #212121;
          line-height: 1.12;
          letter-spacing: -0.025em;
          margin-bottom: 16px;
        }

        .au-blockquote {
          font-size: clamp(0.8rem, 1.5vw, 0.92rem);
          color: #999999;
          line-height: 1.8;
          margin-bottom: 18px;
          font-weight: 400;
        }

        .au-stats {
          display: flex;
          gap: clamp(20px, 4vw, 48px);
          margin-bottom: 18px;
          flex-wrap: wrap;
        }
        .au-stat-divider {
          width: 1px;
          background: var(--border);
          align-self: stretch;
        }

        /* Blue pill button */
        .au-inquire-btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background: transparent;
          border: 1.5px solid var(--blue);
          border-radius: 9999px;
          padding: 10px 14px 10px 24px;
          color: var(--blue);
          font-size: 0.86rem;
          font-family: 'Clash Display', sans-serif;
          font-weight: 500;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.25s ease;
          width: fit-content;
        }
        .au-inquire-btn:hover {
          background: var(--blue);
          color: #fff;
          transform: translateX(5px);
        }
        .au-inquire-btn-icon {
          width: 30px; height: 30px;
          border-radius: 50%;
          background: var(--blue);
          color: #fff;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          font-weight: 700;
          flex-shrink: 0;
          transition: background 0.25s, color 0.25s, transform 0.2s;
        }
        .au-inquire-btn:hover .au-inquire-btn-icon {
          background: #fff;
          color: var(--blue);
          transform: translateX(4px);
        }

        /* ══════ MISSION / VISION SECTION ══════ */
        .au-mv-section {
          background: #fff;
          padding: clamp(24px, 3vw, 48px) clamp(20px, 6vw, 80px);
        }

        .au-mv-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(16px, 3vw, 28px);
          opacity: 0;
          transform: translateY(36px);
          transition: opacity 0.85s 0.15s ease, transform 0.85s 0.15s ease;
        }
        .au-mv-grid.visible { opacity: 1; transform: translateY(0); }

        .au-mv-card {
          background: #F8F8F8;
          border-radius: 22px;
          padding: clamp(24px, 3vw, 36px);
          transition: box-shadow 0.28s ease, transform 0.28s ease;
        }
        .au-mv-card:hover {
          box-shadow: 0 10px 40px rgba(101,171,234,0.13);
          transform: translateY(-4px);
        }

        .au-mv-icon {
          width: 42px; height: 42px;
          border-radius: 12px;
          background: #C3E1FB;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
          overflow: hidden;
          padding: 8px;
        }
        .au-mv-icon img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .au-mv-title {
          font-size: clamp(1rem, 1.8vw, 1.15rem);
          font-weight: 600;
          color: var(--dark);
          margin-bottom: 10px;
        }
        .au-mv-desc {
          font-size: clamp(0.8rem, 1.3vw, 0.87rem);
          color: var(--soft);
          line-height: 1.75;
          font-weight: 400;
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
      `}</style>

      <div className="au-page">
        <section className="au-hero">
          <div className={`au-hero-bg ${heroVisible ? "visible" : ""}`} />
          <div className="au-hero-overlay" />

          <div className={`au-hero-content ${heroVisible ? "visible" : ""}`}>
            <h1 className="au-hero-title">The Soul of Ceylon</h1>
            <p className="au-hero-sub">
              Your Journey Begins Here – Discover Sri Lanka Like Never Before
            </p>
            <a href="#" className="au-pill-btn">
              Explore Tours
              <span className="au-pill-btn-icon"><ArrowUpRight size={16} /></span>
            </a>
          </div>
        </section>

        <section className="au-section">
          <div
            className={`au-about-row ${aboutVisible ? "visible" : ""}`}
            ref={aboutRef}
          >
            {/* Left: stacked images */}
            <div className="au-img-stack">
              <div className="au-img-primary">
                <img src="/aboutpage/image1.jpg" alt="Sri Lanka temple" />
              </div>
              <div className="au-img-secondary">
                <img src="/aboutpage/image2.jpg" alt="Nine Arch Bridge" />
              </div>
            </div>

            {/* Right: text */}
            <div className="au-text-col">
              <h2 className="au-main-heading">
                Crafting unforgettable<br />
                memories in paradise!
              </h2>

              <p className="au-blockquote">
                At Velora Ceylon Travels, we are passionate about creating
                unforgettable experiences in Sri Lanka. Born from a love for
                our island's rich culture, breathtaking landscapes, and
                friendly people, our mission is to provide personalized tours
                that reflect the true essence of Sri Lanka. Our team of expert
                local guides and travel enthusiasts is dedicated to ensuring
                you get the most out of your journey – whether you're here for
                relaxation, adventure, or culture. We bring Sri Lanka closer
                to you.
              </p>

              {/* Stats */}
              <div className="au-stats" ref={statsRef}>
                {STATS.map((s, i) => (
                  <>
                    <StatCounter key={s.label} item={s} trigger={statsVisible} />
                    {i < STATS.length - 1 && (
                      <div key={`div-${i}`} className="au-stat-divider" />
                    )}
                  </>
                ))}
              </div>

              <a href="/contact-us" className="au-inquire-btn">
                Inquire Now
                <span className="au-inquire-btn-icon">↗</span>
              </a>
            </div>
          </div>
        </section>

        <section className="au-mv-section">
          <div
            className={`au-mv-grid ${mvGridVisible ? "visible" : ""}`}
            ref={mvGridRef}
          >
            {MV_CARDS.map((card) => (
              <div key={card.title} className="au-mv-card">
                <div className="au-mv-icon">
                  <img src={card.icon} alt={card.title} />
                </div>
                <h3 className="au-mv-title">{card.title}</h3>
                <p className="au-mv-desc">{card.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <TopDestinations />
        <RealFeedback />
        <InquireSection />
        <Footer />

      </div>
    </>
  );
}