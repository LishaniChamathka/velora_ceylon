"use client";

import { ArrowUpRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { useNavigate } from "react-router-dom";

const tours = [
  {
    id: 1,
    title: "Classic Sri Lanka Tour",
    desc: "Explore Sri Lanka's top cultural and natural landmarks, from Sigiriya to Yala National Park.",
    price: "$899 P/P",
    duration: "7 Days / 6 Nights",
    image: "/homepage/tour1.jpg",
  },
  {
    id: 2,
    title: "Sri Lanka Adventure & Wildlife Safari",
    desc: "An action-packed tour with safaris, rainforest treks, and breathtaking landscapes in Sri Lanka's wild heart.",
    price: "$1,199 P/P",
    duration: "9 Days / 8 Nights",
    image: "/homepage/tour2.jpg",
  },
  {
    id: 3,
    title: "Luxury Beach Getaway",
    desc: "Indulge in a relaxing beach retreat with luxury resorts, whale watching, and private yacht tours.",
    price: "$1,499 P/P",
    duration: "6 Days / 5 Nights",
    image: "/homepage/tour3.jpg",
  },
  {
    id: 4,
    title: "Adventure Trekking Expedition",
    desc: "Embark on a thrilling trekking adventure through Sri Lanka's rugged mountain ranges and stunning waterfalls.",
    price: "$1,099 P/P",
    duration: "8 Days / 7 Nights",
    image: "/homepage/tour4.jpg",
  },
  {
    id: 5,
    title: "Cultural Heritage Tour",
    desc: "Dive deep into Sri Lanka's rich cultural heritage, exploring ancient cities and sacred landmarks.",
    price: "$749 P/P",
    duration: "6 Days / 5 Nights",
    image: "/homepage/tour5.jpg",
  },
  {
    id: 6,
    title: "Sri Lanka Family Getaway",
    desc: "A perfect family-friendly tour filled with adventure, wildlife, and relaxation along Sri Lanka's coast.",
    price: "$899 P/P",
    duration: "7 Days / 6 Nights",
    image: "/homepage/tour6.jpg",
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 60, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

function TourCard({ tour, index }: { tour: (typeof tours)[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <motion.div
      ref={ref}
      className="tour-card"
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ delay: index * 0.08 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={tour.image}
        alt={tour.title}
        className={`tour-card__img${hovered ? " tour-card__img--zoom" : ""}`}
      />
      <div className="tour-card__overlay" />

      <div className="tour-card__body">
        <h3 className="tour-card__title">{tour.title}</h3>
        <p className="tour-card__desc">{tour.desc}</p>

        <div className="tour-card__meta">
          <span className="tour-card__price">{tour.price}</span>
          <span className="tour-card__sep">|</span>
          <span className="tour-card__dur">{tour.duration}</span>
        </div>

        <div className={`tour-card__btn-wrap${hovered ? " tour-card__btn-wrap--visible" : ""}`}>
           <button
            className="tour-card__btn"
            onClick={() => {                         
              navigate(`/tours/${tour.id}`);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <span className="tour-card__btn-label">See More Details</span>
            <span className="tour-card__btn-icon">
              <ArrowUpRight size={14} color="#333" />
            </span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function ToursSection() {
  const navigate = useNavigate();
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.3 });

  useEffect(() => {
    if (!document.querySelector('link[data-clash]')) {
      const l = document.createElement("link");
      l.rel = "stylesheet";
      l.setAttribute("data-clash", "true");
      l.href = "https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap";
      document.head.appendChild(l);
    }
  }, []);

  return (
    <>
      <style>{`
        @import url('https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap');

        .tours-section, .tours-section * {
          font-family: 'Clash Display', 'Inter', sans-serif !important;
          box-sizing: border-box;
        }

        .tours-section {
          background: #fff;
          padding: 56px 96px;
          width: 100%;
        }

        /* ── Header ── */
        .tours-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 24px;
          margin-bottom: 36px;
          flex-wrap: wrap;
        }

        .tours-header-left { flex: 1; min-width: 220px; }

        .tours-title {
          font-size: clamp(26px, 3.5vw, 42px);
          font-weight: 500;
          color: #0f0f0f;
          line-height: 1.15;
          margin: 0 0 12px 0;
        }

        .tours-subtitle {
          font-size: 18px;
          color: #999999;
          line-height: 1.6;
          margin: 0;
          max-width: 700px;
        }

        .tours-all-btn {
          display: inline-flex;
          align-items: center;
          background: #65ABEA;
          border: none;
          border-radius: 999px;
          padding: 7px 7px 7px 22px;
          cursor: pointer;
          gap: 0;
          white-space: nowrap;
          flex-shrink: 0;
          transition: background 0.2s;
        }
        .tours-all-btn:hover { background: #0096df; }
        .tours-all-btn span:first-child {
          font-size: 18px;
          font-weight: 400;
          color: #fff;
          margin-right: 12px;
        }
        .tours-all-btn-icon {
          width: 34px;
          height: 34px;
          background: #fff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* ── Grid ── */
        .tours-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        /* ── Card ── */
        .tour-card {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          cursor: pointer;
          height: 560px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }

        .tour-card__img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
          z-index: 0;
        }
        .tour-card__img--zoom { transform: scale(1.07); }

        .tour-card__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(0,0,0,0.88) 0%,
            rgba(0,0,0,0.35) 50%,
            rgba(0,0,0,0.04) 100%
          );
          z-index: 1;
        }

        .tour-card__body {
          position: relative;
          z-index: 2;
          padding: 24px 22px 26px 22px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .tour-card__title {
          font-size: clamp(28px, 1.7vw, 22px);
          font-weight: 600;
          color: #fff;
          margin: 0;
          line-height: 1.25;
        }

        .tour-card__desc {
          font-size: 18px;
          color: rgba(255,255,255,0.75);
          line-height: 1.65;
          margin: 0;
          color: #C7C7C7;
        }

        .tour-card__meta {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 4px;
        }
        .tour-card__price {
          font-size: 18px;
          font-weight: 500;
          color: #fff;
        }
        .tour-card__sep {
          font-size: 12px;
          color: #fff;
          font-weight: 500;
        }
        .tour-card__dur {
          font-size: 18px;
          color: #fff;
          font-weight: 500;
        }

        /* ── Hover button — full width ── */
        .tour-card__btn-wrap {
          overflow: hidden;
          max-height: 0;
          opacity: 0;
          transition: max-height 0.38s ease, opacity 0.32s ease, margin-top 0.32s ease;
          margin-top: 0;
          width: 100%;
        }
        .tour-card__btn-wrap--visible {
          max-height: 70px;
          opacity: 1;
          margin-top: 10px;
        }

        .tour-card__btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.28);
          border-radius: 999px;
          padding: 8px 8px 8px 22px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .tour-card__btn:hover { background: rgba(255,255,255,0.25); }

        .tour-card__btn-label {
          font-size: 14px;
          font-weight: 600;
          color: #fff;
        }

        .tour-card__btn-icon {
          width: 32px;
          height: 32px;
          background: #fff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        /* ── Responsive ── */
        @media (max-width: 1100px) {
          .tours-section { padding: 48px 40px; }
          .tour-card { height: 520px; }
        }

        @media (max-width: 900px) {
          .tours-grid { grid-template-columns: repeat(2, 1fr); gap: 14px; }
          .tour-card { height: 480px; }
          .tours-header { align-items: flex-start; }
          .tours-subtitle { font-size: 15px; }
        }

        @media (max-width: 600px) {
          .tours-section { padding: 36px 20px; }
          .tours-grid { grid-template-columns: 1fr; gap: 14px; }
          .tour-card { height: 440px; }
          .tours-all-btn { padding: 6px 6px 6px 18px; }
          .tours-all-btn span:first-child { font-size: 15px; }
          .tours-subtitle { font-size: 18px; }

          .tour-card__btn-wrap {
            max-height: 70px;
            opacity: 1;
            margin-top: 10px;
          }
        }
      `}</style>

      <section className="tours-section">
        <motion.div
          ref={headerRef}
          className="tours-header"
          variants={headerVariants}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
        >
          <div className="tours-header-left">
            <h2 className="tours-title">
              Explore the Best of Sri Lanka with<br />Our Handpicked Tours
            </h2>
            <p className="tours-subtitle">
              Discover our handpicked tours that showcase Sri Lanka's beauty, culture, and adventure. Find your perfect getaway today!
            </p>
          </div>
          <motion.button
            className="tours-all-btn"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/tours")}
          >
            <span>See All Tours</span>
            <span className="tours-all-btn-icon">
              <ArrowUpRight size={16} />
            </span>
          </motion.button>
        </motion.div>

        <div className="tours-grid">
          {tours.map((tour, index) => (
            <TourCard key={tour.id} tour={tour} index={index} />
          ))}
        </div>
      </section>
    </>
  );
}