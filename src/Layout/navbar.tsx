"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

// ─── Add this to your app/layout.tsx inside <head> ───────────────────────────
// <link
//   href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap"
//   rel="stylesheet"
// />
// ─────────────────────────────────────────────────────────────────────────────

const NAV_LINKS = ["Home", "About Us", "Tours", "Faq", "Contact Us"];

export default function VeloraCeylonNavbar() {
  const [active, setActive] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <>
      {/* ── Font + keyframe injection ── */}
      <style>{`
       

        .vc-nav * { font-family: 'Clash Display', sans-serif; }

        @keyframes vcSlideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .vc-mobile-menu {
          animation: vcSlideDown 0.22s ease forwards;
        }

        /* Hamburger bar transforms */
        .vc-bar { transition: transform 0.22s ease, opacity 0.22s ease; }
        .vc-bar-top.open    { transform: rotate(45deg) translate(5px, 5px); }
        .vc-bar-mid.open    { opacity: 0; transform: scaleX(0); }
        .vc-bar-bot.open    { transform: rotate(-45deg) translate(5px, -5px); }

        /* Hide/show based on viewport */
        .vc-desktop { display: flex; }
        .vc-hamburger { display: none; }

        @media (max-width: 899px) {
          .vc-desktop  { display: none !important; }
          .vc-hamburger { display: flex !important; }
        }
        @media (min-width: 900px) {
          .vc-mobile-menu { display: none !important; }
        }
      `}</style>

      {/* ══════════════════════════════════════════════════
          NAVBAR
      ══════════════════════════════════════════════════ */}
      <nav
        className="vc-nav"
        style={{
          width: "100%",
          padding: "14px 36px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
          zIndex: 50,
          boxSizing: "border-box",
        }}
      >
        {/* ── Logo ── */}
        <a
          href="#"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            textDecoration: "none",
            flexShrink: 0,
          }}
        >
          {/* <img
            src="/homepage/logo.png"
            alt="Velora Ceylon"
            style={{ width: "30px", height: "30px" }}
          /> */}
          <span
            style={{
              color: "#ffffff",
              fontSize: "1.15rem",
              fontWeight: 500,
              letterSpacing: "0.03em",
              whiteSpace: "nowrap",
            }}
          >
            Velora Ceylon
          </span>
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
            background: "rgba(255,255,255,0.1)",
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
                    ? "rgba(255,255,255,0.2)"
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
            background: hovered === "book" ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.1)",
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
          <span className={`vc-bar vc-bar-top ${menuOpen ? "open" : ""}`}
            style={{ display: "block", width: "22px", height: "2px", background: "#fff", borderRadius: "2px" }}
          />
          <span className={`vc-bar vc-bar-mid ${menuOpen ? "open" : ""}`}
            style={{ display: "block", width: "22px", height: "2px", background: "#fff", borderRadius: "2px" }}
          />
          <span className={`vc-bar vc-bar-bot ${menuOpen ? "open" : ""}`}
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
            position: "absolute",
            top: "68px",
            left: "14px",
            right: "14px",
            zIndex: 40,
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
                  background: isActive ? "rgba(255,255,255,0.9)" : "transparent",
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
                fontSize: "0.85rem",
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