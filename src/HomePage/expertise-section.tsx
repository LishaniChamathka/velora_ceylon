import { useEffect, useRef, useState } from "react";

const cards = [
  {
    title: "Local Expertise",
    description:
      "Our team of passionate locals offers insider access to hidden gems and authentic experiences.",
  },
  {
    title: "Expert Guides",
    description:
      "Our team of passionate locals offers insider access to hidden gems and authentic experiences.",
  },
  {
    title: "Safety First",
    description:
      "We prioritize your safety, providing secure transportation, reliable accommodations, and well-planned itineraries.",
  },
  {
    title: "Tailored Travel",
    description:
      "Every tour is customized to suit your preferences, ensuring a personalized and unforgettable experience.",
  },
];

export default function TrustedExpertise() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .te-page {
          background: #ffffff;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2.5rem 6rem;
          font-family: 'Clash Display', sans-serif;
        }

        .te-wrapper {
          position: relative;
          width: 100%;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0,0,0,0.18);
          min-height: 597px;
        }

        .te-bg {
          position: absolute;
          inset: 0;
          background-image: url('/homepage/expertise.jpg');
          background-size: cover;
          background-position: center 35%;
          z-index: 0;
        }

        .te-scrim {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(0,0,0,0.25) 0%,
            rgba(0,0,0,0.15) 40%,
            rgba(0,0,0,0.45) 100%
          );
          z-index: 1;
        }

        .te-inner {
          position: relative;
          z-index: 2;
          padding: 3rem 3rem 3rem;
          display: flex;
          flex-direction: column;
          min-height: 360px;
        }

        .te-top {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          align-items: start;
          margin-bottom: 3.5rem;
        }

        .te-heading {
          font-family: 'Clash Display', sans-serif;
          font-size: clamp(26px, 3.5vw, 50px);
          font-weight: 500;
          color: #ffffff;
          line-height: 1.08;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .te-heading.go { opacity: 1; transform: translateY(0); }

        .te-para {
          font-size: 18px;
          color: rgba(255,255,255,0.85);
          line-height: 1.8;
          font-weight: 400;
          padding-top: 0.3rem;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.7s ease 0.12s, transform 0.7s ease 0.12s;
        }
        .te-para.go { opacity: 1; transform: translateY(0); }

        .te-cards {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0.85rem;
        }

        .te-card {
          background: rgba(255,255,255,0.12);
          backdrop-filter: blur(2px) saturate(180%);
          -webkit-backdrop-filter: blur(22px) saturate(180%);
          border: 0.5px solid rgba(255,255,255,0.22);
          border-radius: 30px;
          padding: 1.4rem 1.25rem 1.6rem;
          display: flex;
          flex-direction: column;
          gap: 0.7rem;
          opacity: 0;
          margin-top: 4rem;
          transform: translateY(28px);
          transition:
            opacity 0.55s ease,
            transform 0.55s ease,
            background 0.25s,
            border-color 0.25s;
        }
        .te-card.go { opacity: 1; transform: translateY(0); }
        .te-card:hover {
        //   background: rgba(255,255,255,0.18);
        //   border-color: rgba(255,255,255,0.35);
        backdrop-filter: blur(10px) saturate(180%);
          -webkit-backdrop-filter: blur(22px) saturate(180%);
        }

        .te-card-title {
          font-family: 'Clash Display', sans-serif;
          font-size: 24px;
          font-weight: 600;
          color: #ffffff;
        }

        .te-card-desc {
          font-size: 18px;
          color: #C7C7C7;
          line-height: 1.75;
          font-weight: 400;
        }

        @media (max-width: 860px) {
          .te-top { grid-template-columns: 1fr; gap: 1rem; margin-bottom: 2.5rem; }
          .te-cards { grid-template-columns: repeat(2, 1fr); }
          .te-inner { padding: 2.5rem 2rem; }
        }

        @media (max-width: 520px) {
          .te-cards { grid-template-columns: 1fr; }
          .te-inner { padding: 2rem 1.25rem; }
          .te-page { padding: 1.25rem 0.75rem; }
          .te-card { margin-top: 0.5rem; }
        }
      `}</style>

      <div className="te-page">
        <div className="te-wrapper" ref={ref}>
          <div className="te-bg" />
          <div className="te-scrim" />
          <div className="te-inner">
            <div className="te-top">
              <h2 className={`te-heading${visible ? " go" : ""}`}>
                Our Trusted<br />Expertise
              </h2>
              <p className={`te-para${visible ? " go" : ""}`}>
                At Velora Ceylon Travels, we are committed to delivering exceptional,
                tailored travel experiences. Our deep local knowledge, dedication to
                safety, and passion for exploring Sri Lanka's hidden gems ensure your
                journey is unforgettable.
              </p>
            </div>

            <div className="te-cards">
              {cards.map((card, i) => (
                <div
                  key={card.title}
                  className={`te-card${visible ? " go" : ""}`}
                  style={{ transitionDelay: visible ? `${0.22 + i * 0.09}s` : "0s" }}
                >
                  <div className="te-card-title">{card.title}</div>
                  <p className="te-card-desc">{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}