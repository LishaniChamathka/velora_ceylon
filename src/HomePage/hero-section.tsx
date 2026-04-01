"use client";

import { useState, useEffect, useCallback } from "react";
import Navbar from "../Layout/navbar";
import { ArrowUpRight } from "lucide-react";

// Add to app/layout.tsx <head>:
// <link href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap" rel="stylesheet"/>

// ─── Slide data ────────────────────────────────────────────────────────────────
const SLIDES = [
  {
    img: "/homepage/mirissa-beach.jpg",
    title: "Mirissa Beach",
    desc: "Relax in the pristine beaches of Mirissa, a perfect getaway for sun, sand, and serenity.",
  },
  {
    img: "/homepage/nine-arch-bridge.jpg",
    title: "Nine Arch Bridge",
    desc: "Marvel at this iconic colonial-era viaduct cutting through lush tea country in Ella.",
  },
  {
    img: "/homepage/leopard.jpg",
    title: "Sri Lanka Leopard",
    desc: "Spot the elusive Sri Lankan leopard on a thrilling safari through Yala National Park.",
  },
  {
    img: "/homepage/dalada-maligawa.jpg",
    title: "Temple of the Tooth",
    desc: "Discover the sacred Dalada Maligawa, a UNESCO heritage gem nestled in Kandy.",
  },
  {
    img: "/homepage/sigiriya.jpeg",
    title: "Sigiriya Rock",
    desc: "Climb the ancient Lion Rock fortress rising 200m from the central plains — a wonder of the world.",
  },
];

const AVATAR_COLORS = [
  "linear-gradient(135deg,#f6d365,#fda085)",
  "linear-gradient(135deg,#a1c4fd,#c2e9fb)",
  "linear-gradient(135deg,#d4fc79,#96e6a1)",
  "linear-gradient(135deg,#f093fb,#f5576c)",
];

export default function VeloraCeylonHero() {
  const [current, setCurrent] = useState(0);
  const [textVisible, setTextVisible] = useState(true);

  const goTo = useCallback(
    (idx: number) => {
      if (idx === current) return;
      setTextVisible(false);
      setTimeout(() => {
        setCurrent(idx);
        setTextVisible(true);
      }, 350);
    },
    [current],
  );

  const next = useCallback(() => {
    setTextVisible(false);
    setTimeout(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
      setTextVisible(true);
    }, 350);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 3800);
    return () => clearInterval(timer);
  }, [next]);

  const visibleSlides = Array.from(
    { length: 4 },
    (_, i) => SLIDES[(current + i) % SLIDES.length],
  );

  return (
    <>
      <style>{`
        @import url('https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap');
        .vc, .vc * { font-family: 'Clash Display', sans-serif; box-sizing: border-box; }

        @keyframes vcFadeUp {
          from { opacity:0; transform:translateY(22px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes vcCardIn {
          from { opacity:0; transform:translateY(28px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes vcTextIn {
          from { opacity:0; transform:translateY(8px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes vcSlideIn {
          from { opacity:0; transform:translateY(16px); }
          to   { opacity:1; transform:translateY(0); }
        }

        .vc-heading-anim { animation: vcFadeUp 0.9s 0.15s ease both; }
        .vc-info-anim    { animation: vcCardIn 0.9s 0.35s ease both; }
        .vc-text-visible { animation: vcTextIn 0.4s ease both; }
        .vc-text-hidden  { opacity:0; transform:translateY(8px); transition:opacity 0.3s,transform 0.3s; }
        .vc-slide-wrap   { animation: vcSlideIn 0.5s ease both; }

        .vc-slide-img {
          transition: transform 0.6s ease;
          display: block;
          width: 100%;
          object-fit: cover;
          object-position: center center;
        }
        .vc-slide-wrap:hover .vc-slide-img { transform: scale(1.04); }

        .vc-nav-link { transition: background 0.2s, color 0.2s; cursor: pointer; }
        .vc-nav-link:hover { background: rgba(255,255,255,0.14) !important; color:#fff !important; }

        /* ── Desktop bottom layout ── */
        .vc-bottom {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 24px;
          margin-top: 24px;
          margin-bottom: 60px;
        }

        .vc-slider-outer {
          display: flex;
          justify-content: flex-end;
          align-items: flex-end;
          gap: 14px;
          overflow: hidden;
          min-width: 0;
          flex: 1;
        }

        /* ── Tablet ≤ 1024px ── */
        @media (max-width: 1024px) {
          .vc-slide-wrap.featured { width: 240px !important; }
          .vc-slide-wrap.thumb    { width: 145px !important; }
          .vc-feat-img  { height: 200px !important; }
          .vc-thumb-img { height: 210px !important; }
        }

        /* ── Tablet ≤ 768px ── */
        @media (max-width: 768px) {
          .vc-bottom { flex-direction: column; align-items: stretch; gap: 16px; }
          .vc-info-card-wrap { width: 100% !important; max-width: 380px; }
          .vc-slider-outer {
            justify-content: flex-start;
            overflow-x: auto;
            padding-bottom: 4px;
          }
          .vc-slide-wrap.featured { width: 210px !important; }
          .vc-slide-wrap.thumb    { width: 130px !important; }
          .vc-feat-img  { height: 180px !important; }
          .vc-thumb-img { height: 175px !important; }
          .vc-feat-title { font-size: 1rem !important; }
          .vc-feat-desc  { font-size: 0.78rem !important; }
        }

        /* ── Mobile ≤ 480px ── */
        @media (max-width: 480px) {
          .vc-content-pad { padding: 8px 16px 20px !important; }
          .vc-heading-anim h1 { font-size: clamp(1.8rem,7vw,2.6rem) !important; }
          .vc-slide-wrap.featured { width: 175px !important; }
          .vc-slide-wrap.thumb    { width: 110px !important; }
          .vc-feat-img  { height: 150px !important; }
          .vc-thumb-img { height: 145px !important; }
          .vc-info-card-inner { padding: 14px 15px !important; }
          .vc-feat-title { font-size: 0.95rem !important; }
          .vc-feat-desc  { font-size: 0.75rem !important; }
        }

        .vc-slider-outer::-webkit-scrollbar { display: none; }
        .vc-slider-outer { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <section
        className="vc"
        style={{
          position: "relative",
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          background: "#0d1a0d",
        }}
      >
        {/* Static background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(/homepage/hero-bg.jpg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 0,
          }}
        />

        {/* Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.44) 0%, rgba(0,0,0,0.12) 34%, rgba(0,0,0,0.72) 100%)",
            zIndex: 1,
          }}
        />

        <Navbar />

        {/* ══════════ HERO CONTENT ══════════ */}
        <div
          className="vc-content-pad"
          style={{
            position: "relative",
            zIndex: 5,
            flex: 1,
            display: "flex",
            flexDirection: "column",
            padding: "10px 44px 32px",
          }}
        >
          {/* Heading */}
          <div
            className="vc-heading-anim"
            style={{
              textAlign: "center",
              marginTop: "100px",
              marginBottom: "auto",
            }}
          >
            <h1
              style={{
                fontSize: "clamp(2.6rem,5.8vw,5rem)",
                fontWeight: 500,
                color: "#fff",
                lineHeight: 1.08,
                letterSpacing: "-0.01em",
                margin: 0,
              }}
            >
              Sri Lanka Awaits Your
              <br />
              Next Adventure
            </h1>
          </div>

          {/* ── Bottom row ── */}
          <div className="vc-bottom">
            <div
              className="vc-info-card-wrap"
              style={{
                flexShrink: 0,
                width: "500px",
                marginLeft: "auto",
                marginRight: "40px",
              }}
            >
              {/* Left: Info card */}
              <div
                className="vc-info-card-inner"
                style={{
                  background: "rgba(255, 255, 255, 0.1)",
                  border: "1px solid rgba(255,255,255,0.25)",
                  borderRadius: "30px",
                  backdropFilter: "blur(3px)",
                  WebkitBackdropFilter: "blur(5px)",
                  padding: "22px 24px",
                  height: "250px",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                }}
              >
                {/* Avatars */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "14px",
                    flexShrink: 0,
                  }}
                >
                  {AVATAR_COLORS.map((bg, i) => (
                    <div
                      key={i}
                      style={{
                        width: "38px",
                        height: "38px",
                        borderRadius: "9999px",
                        border: "2.5px solid rgba(255,255,255,0.55)",
                        background: bg,
                        marginLeft: i === 0 ? "0" : "-9px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.72rem",
                        color: "#fff",
                        fontWeight: 600,
                        flexShrink: 0,
                      }}
                    >
                      {["A", "B", "C", "D"][i]}
                    </div>
                  ))}
                  <div
                    style={{
                      width: "38px",
                      height: "38px",
                      borderRadius: "9999px",
                      background: "rgba(255,255,255,0.2)",
                      border: "2px solid rgba(255,255,255,0.45)",
                      fontSize: "0.65rem",
                      color: "#fff",
                      fontWeight: 600,
                      marginLeft: "-9px",
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    50+
                  </div>
                  <span
                    style={{
                      marginLeft: "10px",
                      fontSize: "0.76rem",
                      color: "rgba(255,255,255,0.68)",
                      lineHeight: 1.3,
                    }}
                  >
                    <strong
                      style={{
                        display: "block",
                        color: "#fff",
                        fontWeight: 600,
                        fontSize: "0.82rem",
                      }}
                    >
                      People Joined
                    </strong>
                  </span>
                </div>

                {/* Slide description - takes remaining space */}
                <p
                  className={textVisible ? "vc-text-visible" : "vc-text-hidden"}
                  style={{
                    fontSize: "0.83rem",
                    color: "rgba(255,255,255,0.85)",
                    lineHeight: 1.7,
                    marginBottom: "18px",
                    fontWeight: 400,
                    flex: 1,
                    overflow: "auto",
                  }}
                >
                  {SLIDES[current].desc}
                </p>

                {/* Explore Tours button - always at bottom */}
                <a
                  href="#"
                  className="vc-explore-button"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    border: "1.5px solid rgba(255,255,255,0.32)",
                    borderRadius: "9999px",
                    padding: "8px 10px 8px 18px",
                    color: "rgba(255,255,255,0.90)",
                    fontSize: "0.82rem",
                    fontWeight: 400,
                    textDecoration: "none",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    cursor: "pointer",
                    width: "fit-content",
                    flexShrink: 0,
                    background: "rgba(255,255,255,0.05)",
                    backdropFilter: "blur(4px)",
                  }}
                  onMouseEnter={(e) => {
                    const button = e.currentTarget;
                    const arrow = button.querySelector(".vc-arrow-icon");
                    button.style.transform = "translateX(5px)";
                    button.style.borderColor = "rgba(255,255,255,0.6)";
                    button.style.background = "rgba(255,255,255,0.15)";
                    if (arrow) {
                      (arrow as HTMLElement).style.transform =
                        "translateX(4px)";
                      (arrow as HTMLElement).style.background = "#fff";
                      (arrow as HTMLElement).style.color = "#000";
                    }
                  }}
                  onMouseLeave={(e) => {
                    const button = e.currentTarget;
                    const arrow = button.querySelector(".vc-arrow-icon");
                    button.style.transform = "translateX(0px)";
                    button.style.borderColor = "rgba(255,255,255,0.32)";
                    button.style.background = "rgba(255,255,255,0.05)";
                    if (arrow) {
                      (arrow as HTMLElement).style.transform =
                        "translateX(0px)";
                      (arrow as HTMLElement).style.background = "#fff";
                      (arrow as HTMLElement).style.color = "#000";
                    }
                  }}
                >
                  Explore Tours
                  <span
                    className="vc-arrow-icon"
                    style={{
                      width: "26px",
                      height: "26px",
                      borderRadius: "9999px",
                      border: "1.5px solid rgba(255,255,255,0.36)",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.82rem",
                      color: "#000",
                      background: "#fff",
                      transition:
                        "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), background 0.3s ease",
                    }}
                  >
                    <ArrowUpRight size={16} />
                  </span>
                </a>
              </div>
            </div>

            {/* Right: Slider */}
            <div className="vc-slider-outer">
              {visibleSlides.map((slide, pos) => {
                const isFeatured = pos === 0;
                return (
                  <div
                    key={`${slide.title}-${pos}`}
                    className={`vc-slide-wrap ${isFeatured ? "featured" : "thumb"}`}
                    onClick={() => {
                      const realIdx = SLIDES.findIndex(
                        (s) => s.title === slide.title,
                      );
                      goTo(realIdx);
                    }}
                    style={{
                      flexShrink: 0,
                      display: "flex",
                      flexDirection: "column",
                      cursor: "pointer",
                      // featured: much wider; thumbs: also wider than before
                      width: isFeatured ? "300px" : "180px",
                      transition: "width 0.65s cubic-bezier(0.4,0,0.2,1)",
                      animationDelay: `${pos * 0.06}s`,
                    }}
                  >
                    {/* Image — shorter height, maximised width */}
                    <div style={{ borderRadius: "16px", overflow: "hidden" }}>
                      <img
                        className={`vc-slide-img ${isFeatured ? "vc-feat-img" : "vc-thumb-img"}`}
                        src={slide.img}
                        alt={slide.title}
                        loading="lazy"
                        style={{
                          // featured: reduced height as requested; thumbs: match
                          height: isFeatured ? "240px" : "300px",
                        }}
                      />
                    </div>

                    {/* Caption below — featured only, bigger text */}
                    {isFeatured && (
                      <div style={{ padding: "12px 4px 0" }}>
                        <h3
                          className="vc-feat-title"
                          style={{
                            fontSize: "1.08rem", // bigger title
                            fontWeight: 700,
                            color: "#fff",
                            margin: "0 0 6px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {slide.title}
                        </h3>
                        <p
                          className="vc-feat-desc"
                          style={{
                            fontSize: "0.85rem", // bigger desc
                            color: "rgba(255,255,255,0.72)",
                            lineHeight: 1.6,
                            margin: 0,
                            wordBreak: "break-word",
                          }}
                        >
                          {slide.desc}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
