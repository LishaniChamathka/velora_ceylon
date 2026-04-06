import { useRef, useState } from "react";

const destinations = [
  {
    name: "Kandy",
    image: "/homepage/dalada-maligawa.jpg",
  },
  {
    name: "Ella",
    image: "/homepage/ella.jpg",
  },
  {
    name: "Jaffna",
    image: "/homepage/jaffna.jpg",
  },
  {
    name: "Sigiriya",
    image: "/homepage/sigiriya-ticker.jpg",
  },
  {
    name: "Mirissa",
    image: "/homepage/contact-1.jpg",
  },
  {
    name: "Nuwaraeliya",
    image: "/homepage/nuwaraeliya.jpg",
  },
  {
    name: "Galle",
    image: "/homepage/galle-fort.jpg",
  },
  {
    name: "Trincomalee",
    image: "/homepage/Trincomalee.jpg",
  },
];

const tickerItems = [...destinations, ...destinations];

export default function TopDestinations() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap');

        /* ── Section ── */
        .td-section {
          font-family: 'Clash Display', sans-serif;
          background: #ffffff;
          width: 100%;
          padding: 3rem 0 2.5rem;
          overflow: hidden;
        }

        /* ── Header ── */
        .td-header {
          text-align: center;
          padding: 0 1.25rem;
          margin-bottom: 2.5rem;
        }

        .td-header h2 {
          font-family: 'Clash Display', sans-serif;
          font-size: clamp(26px, 3.5vw, 50px);
          font-weight: 500;
          color: #212121;
          line-height: 1.1;
          letter-spacing: -0.5px;
          margin-bottom: 0.75rem;
        }

        .td-header p {
          font-family: 'Clash Display', sans-serif;
          font-size: 18px;
          font-weight: 400;
          color: #999999;
          line-height: 1.75;
          max-width: 800px;
          margin: 0 auto;
        }

        /* ── Ticker wrapper ── */
        .td-ticker-wrap {
          position: relative;
          width: 100%;
        }

        .td-ticker-overflow {
          overflow: hidden;
          padding: 4px 0;
        }

        /* ── Ticker animation ── */
        @keyframes ticker-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .td-ticker-track {
          display: flex;
          gap: 1rem;
          width: max-content;
          animation: ticker-scroll 52s linear infinite;
        }

        .td-ticker-track.paused {
          animation-play-state: paused;
        }

        /* ── Cards ── */
        .td-card {
          position: relative;
          flex-shrink: 0;
          width: 243px;
          height: 243px;
          border-radius: 30px;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .td-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.4);
          z-index: 1;
        }

        .td-card:hover {
          transform: scale(1.04);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.22);
        }

        .td-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.4s ease;
        }

        .td-card:hover img {
          transform: scale(1.07);
        }

        .td-card-label {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          padding: 1rem;
          border-radius: 12px;
          font-family: 'Clash Display', sans-serif;
          font-size: 18px;
          font-weight: 600;
          color: #ffffff;
          letter-spacing: 0.01em;
          text-align: center;
          white-space: nowrap;
          z-index: 2;
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .td-header p {
            font-size: 18px;
          }
          .td-fade-left,
          .td-fade-right {
            width: 50px;
          }
        }

        @media (max-width: 480px) {
          .td-card {
            width: 160px;
            height: 160px;
          }
          .td-card-label {
            font-size: 15px;
            padding: 0.75rem;
          }
        }
      `}</style>

      <section className="td-section">

        <div className="td-header">
          <h2>Explore Our Top Destinations</h2>
          <p>
            From breathtaking beaches to ancient temples and wildlife safaris, our top
            destinations promise unforgettable experiences for every traveler.
          </p>
        </div>

        <div
          className="td-ticker-wrap"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="td-fade-left" />
          <div className="td-fade-right" />

          <div className="td-ticker-overflow">
            <div
              ref={trackRef}
              className={`td-ticker-track${paused ? " paused" : ""}`}
            >
              {tickerItems.map((dest, i) => (
                <div key={`${dest.name}-${i}`} className="td-card">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    loading="lazy"
                    draggable={false}
                  />
                  <div className="td-card-label">{dest.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </section>
    </>
  );
}