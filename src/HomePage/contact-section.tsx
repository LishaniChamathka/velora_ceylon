
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";

export default function HeroSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  useEffect(() => {
    if (!document.querySelector('link[data-clash-display]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.setAttribute("data-clash-display", "true");
      link.href =
        "https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const fadeInLeft: Variants = {
    hidden: { opacity: 0, x: -80 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <>
      <style>{`
        @import url('https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap');

        .hero-section * {
          font-family: 'Clash Display', 'Inter', sans-serif !important;
        }

        .hero-section {
          font-family: 'Clash Display', 'Inter', sans-serif;
          background: #ffffff;
          width: 100%;
        }

        .hero-inner {
          margin: 0 auto;
          padding: 56px 80px;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
        }

        .hero-left {
          flex: 1;
          max-width: 900px;
        }

        .hero-title {
          font-size: 46px;
          font-weight: 500;
          color: #0f0f0f;
          line-height: 1.13;
          letter-spacing: -0.5px;
          margin: 0 0 20px 0;
        }

        .hero-desc {
          font-size: 18px;
          font-weight: 400;
          color: #999999;
          line-height: 1.55;
          margin: 0 0 36px 0;
          max-width: 100%;
        }

        .hero-btn {
          display: inline-flex;
          align-items: center;
          background: #65ABEA;
          border: none;
          border-radius: 999px;
          padding: 5px 5px 5px 22px;
          cursor: pointer;
          gap: 0;
          transition: background 0.2s ease;
          text-decoration: none;
        }

        .hero-btn:hover { background: #0096df; }

        .hero-btn-text {
          font-size: 18px;
          font-weight: 400;
          color: #ffffff;
          margin-right: 14px;
        }

        .hero-btn-icon {
          width: 36px;
          height: 36px;
          background: #ffffff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .hero-btn-icon svg {
          width: 15px;
          height: 15px;
          color: #000000;
          transition: transform 0.2s ease;
        }

        .hero-btn:hover .hero-btn-icon svg { transform: translate(2px, -2px); }

        .hero-right {
          flex-shrink: 0;
          position: relative;
          width: 500px;
          height: 400px;
        }

        .img-top {
          position: absolute;
          top: 0;
          right: 0;
          width: 305px;
          height: 242px;
          border-radius: 18px;
          overflow: hidden;
          z-index: 1;
          box-shadow: 0 8px 32px rgba(0,0,0,0.10);
        }

        .img-bottom {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 305px;
          height: 242px;
          border-radius: 18px;
          overflow: hidden;
          z-index: 2;
          box-shadow: 0 8px 32px rgba(0,0,0,0.12);
        }

        .img-top img, .img-bottom img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        @media (max-width: 1024px) {
          .hero-inner { padding: 48px 48px; }
          .hero-title { font-size: 38px; }
          .hero-right { width: 320px; height: 250px; }
          .img-top, .img-bottom { width: 200px; height: 155px; }
        }

        @media (max-width: 768px) {
          .hero-inner { flex-direction: column; padding: 40px 24px; align-items: flex-start; }
          .hero-left { max-width: 100%; }
          .hero-title { font-size: 32px; }
          .hero-desc { max-width: 100%; }
          .hero-right { width: 100%; height: 260px; }
          .img-top { width: 55%; height: 180px; right: 0; }
          .img-bottom { width: 55%; height: 180px; left: 0; }
        }

        @media (max-width: 480px) {
          .hero-inner { padding: 32px 20px; }
          .hero-title { font-size: 28px; }
          .hero-right { height: 220px; }
          .img-top, .img-bottom { height: 150px; }
        }
      `}</style>

      <motion.section
        ref={sectionRef}
        className="hero-section"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.5 } },
        }}
      >
        <div className="hero-inner">

          {/* Left */}
          <motion.div
            className="hero-left"
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.h1 className="hero-title" variants={fadeInLeft}>
              Your Gateway to Sri Lankan Adventures
            </motion.h1>

            <motion.p className="hero-desc" variants={fadeInLeft}>
              Velora Ceylon Travels is your trusted travel partner in Sri Lanka,
              offering personalized, immersive experiences. Whether you're seeking
              adventure, culture, or relaxation, our tailored tours provide
              unforgettable journeys through Sri Lanka's rich history, pristine
              landscapes, and vibrant heritage. We are passionate about showcasing
              the beauty of Sri Lanka, ensuring every traveler's dream vacation
              becomes a reality.
            </motion.p>

            <motion.a
              href="#contact"
              className="hero-btn"
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="hero-btn-text">Contact Us</span>
              <span className="hero-btn-icon">
                <ArrowUpRight size={16} />
              </span>
            </motion.a>
          </motion.div>

          {/* Right — two overlapping images */}
          <div className="hero-right">
            <motion.div
              className="img-top"
              variants={imageVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
            >
              <img
                src="/homepage/contact-1.jpg"
                alt="Sri Lanka tropical beach with palm trees"
              />
            </motion.div>

            <motion.div
              className="img-bottom"
              variants={imageVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              <img
                src="/homepage/contact-2.jpg"
                alt="Sri Lanka green mountains and waterfall"
              />
            </motion.div>
          </div>

        </div>
      </motion.section>
    </>
  );
}