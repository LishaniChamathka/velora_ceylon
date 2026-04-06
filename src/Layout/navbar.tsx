"use client";

import { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";

const NAV_LINKS = ["Home", "About Us", "Tours", "Faq", "Contact Us"];

export default function VeloraCeylonNavbar() {
  const [active, setActive] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  // ── Scroll listener ──────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Logo click handler ───────────────────────────────────────────────────
  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setActive("Home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* ── Styles ── */}
      <style>{`
        .vc-nav * { font-family: 'Clash Display', sans-serif; }

        @keyframes vcSlideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .vc-mobile-menu { animation: vcSlideDown 0.22s ease forwards; }

        .vc-bar { transition: transform 0.22s ease, opacity 0.22s ease; }
        .vc-bar-top.open { transform: rotate(45deg) translate(5px, 5px); }
        .vc-bar-mid.open { opacity: 0; transform: scaleX(0); }
        .vc-bar-bot.open { transform: rotate(-45deg) translate(5px, -5px); }

        .vc-desktop  { display: flex; }
        .vc-hamburger { display: none; }

        @media (max-width: 899px) {
          .vc-desktop   { display: none !important; }
          .vc-hamburger { display: flex !important; }
        }
        @media (min-width: 900px) {
          .vc-mobile-menu { display: none !important; }
        }

        /* Logo hover */
        .vc-logo-img {
          transition: transform 0.2s ease;
        }
        .vc-logo:hover .vc-logo-img {
          transform: scale(1.08);
        }
      `}</style>

      {/* ══════════════════════════════════════════════════
          NAVBAR
      ══════════════════════════════════════════════════ */}
      <nav
        className="vc-nav"
        style={{
          width: "100%",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          padding: scrolled ? "8px 36px" : "14px 36px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxSizing: "border-box",
          // Scrolled glass effect
          background: scrolled ? "rgba(25, 35, 45, 0.12)" : "transparent",
          backdropFilter: scrolled ? "blur(24px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(24px)" : "none",
          boxShadow: scrolled ? "0 4px 32px rgba(0,0,0,0.22)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(255,255,255,0.10)"
            : "1px solid transparent",
          transition: [
            "padding 0.35s cubic-bezier(.4,0,.2,1)",
            "background 0.35s cubic-bezier(.4,0,.2,1)",
            "box-shadow 0.35s cubic-bezier(.4,0,.2,1)",
            "border-bottom 0.35s",
          ].join(", "),
        }}
      >
        {/* ── Logo ── */}
        <a
          href="#"
          className="vc-logo"
          onClick={handleLogoClick}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "9px",
            textDecoration: "none",
            flexShrink: 0,
          }}
        >
          <img
            src="/logo.png"
            alt="Velora Ceylon"
            className="vc-logo-img"
            style={{
              width: "150px",
              height: "50px",
              objectFit: "contain",
            }}
          />
          {/* <span
            style={{
              color: "#ffffff",
              fontSize: "1.05rem",
              fontWeight: 600,
              letterSpacing: "0.04em",
              whiteSpace: "nowrap",
              opacity: 0.92,
            }}
          >
            Velora Ceylon
          </span> */}
        </a>

        {/* ── Desktop pill nav ── */}
        <div
          className="vc-desktop"
          style={{
            alignItems: "center",
            border: "1.5px solid rgba(255,255,255,0.35)",
            borderRadius: "9999px",
            padding: "4px 5px",
            gap: "2px",
            backdropFilter: "blur(80px)",
            WebkitBackdropFilter: "blur(80px)",
            background: "rgba(255,255,255,0.10)",
          }}
        >
          {NAV_LINKS.map((link) => {
            const isActive = active === link;
            const isHovered = hovered === link;
            return (
              <a
                key={link}
                href="#"
                onMouseEnter={() => setHovered(link)}
                onMouseLeave={() => setHovered(null)}
                onClick={(e) => { e.preventDefault(); setActive(link); }}
                style={{
                  fontSize: "0.875rem",
                  fontWeight: isActive ? 500 : 400,
                  padding: "7px 20px",
                  borderRadius: "9999px",
                  letterSpacing: "0.01em",
                  textDecoration: "none",
                  cursor: "pointer",
                  transition: "background 0.18s, color 0.18s",
                  whiteSpace: "nowrap",
                  background: isActive
                    ? "rgba(255,255,255,0.92)"
                    : isHovered
                    ? "rgba(255,255,255,0.18)"
                    : "transparent",
                  color: isActive ? "#1c1c1c" : "rgba(255,255,255,0.88)",
                }}
              >
                {link}
              </a>
            );
          })}
        </div>

        {/* ── Book Now button ── */}
        <a
          href="#"
          className="vc-desktop"
          onMouseEnter={() => setHovered("book")}
          onMouseLeave={() => setHovered(null)}
          style={{
            alignItems: "center",
            gap: "10px",
            border: "1.5px solid rgba(255,255,255,0.35)",
            borderRadius: "9999px",
            paddingLeft: "22px",
            paddingRight: "10px",
            paddingTop: "6px",
            paddingBottom: "6px",
            color: "rgba(255,255,255,0.9)",
            fontSize: "0.875rem",
            fontWeight: 400,
            letterSpacing: "0.01em",
            textDecoration: "none",
            background:
              hovered === "book"
                ? "rgba(255,255,255,0.20)"
                : "rgba(255,255,255,0.10)",
            backdropFilter: "blur(80px)",
            WebkitBackdropFilter: "blur(80px)",
            transition: "background 0.18s",
            flexShrink: 0,
            cursor: "pointer",
          }}
        >
          Book Now
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "28px",
              height: "28px",
              borderRadius: "9999px",
              border: "1.5px solid rgba(255,255,255,0.4)",
              color: "#000",
              background: "#fff",
            }}
          >
            <ArrowUpRight size={14} />
          </span>
        </a>

        {/* ── Hamburger button ── */}
        <button
          className="vc-hamburger"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle navigation menu"
          style={{
            flexDirection: "column",
            gap: "5px",
            padding: "9px 10px",
            border: "1.5px solid rgba(255,255,255,0.35)",
            borderRadius: "10px",
            background: "rgba(255,255,255,0.1)",
            backdropFilter: "blur(80px)",
            WebkitBackdropFilter: "blur(80px)",
            cursor: "pointer",
          }}
        >
          <span
            className={`vc-bar vc-bar-top ${menuOpen ? "open" : ""}`}
            style={{ display: "block", width: "22px", height: "2px", background: "#fff", borderRadius: "2px" }}
          />
          <span
            className={`vc-bar vc-bar-mid ${menuOpen ? "open" : ""}`}
            style={{ display: "block", width: "22px", height: "2px", background: "#fff", borderRadius: "2px" }}
          />
          <span
            className={`vc-bar vc-bar-bot ${menuOpen ? "open" : ""}`}
            style={{ display: "block", width: "22px", height: "2px", background: "#fff", borderRadius: "2px" }}
          />
        </button>
      </nav>

      {/* ══════════════════════════════════════════════════
          MOBILE DROPDOWN
      ══════════════════════════════════════════════════ */}
      {menuOpen && (
        <div
          className="vc-nav vc-mobile-menu"
          style={{
            position: "fixed",
            top: "68px",
            left: "14px",
            right: "14px",
            zIndex: 49,
            display: "flex",
            flexDirection: "column",
            gap: "2px",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "18px",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            background: "rgba(50,60,70,0.55)",
            padding: "10px",
          }}
        >
          {NAV_LINKS.map((link) => {
            const isActive = active === link;
            return (
              <a
                key={link}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setActive(link);
                  setMenuOpen(false);
                }}
                style={{
                  fontSize: "0.9rem",
                  fontWeight: isActive ? 500 : 400,
                  color: isActive ? "#1c1c1c" : "rgba(255,255,255,0.85)",
                  background: isActive
                    ? "rgba(255,255,255,0.9)"
                    : "transparent",
                  padding: "11px 18px",
                  borderRadius: "12px",
                  textDecoration: "none",
                  letterSpacing: "0.01em",
                  cursor: "pointer",
                  transition: "background 0.15s, color 0.15s",
                }}
              >
                {link}
              </a>
            );
          })}
          <a
            href="#"
            style={{
              marginTop: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "11px 12px 11px 18px",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.28)",
              color: "rgba(255,255,255,0.9)",
              fontSize: "0.9rem",
              fontWeight: 400,
              textDecoration: "none",
              cursor: "pointer",
              letterSpacing: "0.01em",
            }}
          >
            Book Now
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "28px",
                height: "28px",
                borderRadius: "9999px",
                border: "1px solid rgba(255,255,255,0.38)",
                color: "#fff",
              }}
            >
              <ArrowUpRight size={16} />
            </span>
          </a>
        </div>
      )}
    </>
  );
}