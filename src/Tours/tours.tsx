import { useState, useEffect, useRef } from "react";
import {
  ArrowUpRight,
  Clock,
  Settings2,
  Star,
  ChevronDown,
  Plus,
  Minus,
  X,
  Calendar,
  Mail,
  Phone,
  DollarSign,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import InquireSection from "../HomePage/inquire-section";
import Footer from "../Layout/footer";

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
  {
    id: 4,
    days: 8,
    image: "/tourspage/tour4.jpg",
    alt: "Adventure Trekking Expectation",
    rating: 4,
    reviews: 110,
    title: "Adventure Trekking Expectation",
    desc: "Embark on a thrilling trekking adventure through Sri Lanka’s rugged mountain ranges and stunning waterfalls.",
    price: "$1,099 P/P",
    priceNote: "From",
  },
  {
    id: 5,
    days: 6,
    image: "/tourspage/tour5.jpg",
    alt: "Cultural Heritage Tour",
    rating: 4,
    reviews: 110,
    title: "Cultural Heritage Tour",
    desc: "Dive deep into Sri Lanka’s rich cultural heritage, exploring ancient cities and sacred landmarks.",
    price: "$749 P/P",
    priceNote: "From",
  },
  {
    id: 6,
    days: 7,
    image: "/tourspage/tour6.jpg",
    alt: "Sri Lanka Family Gateway",
    rating: 4,
    reviews: 110,
    title: "Sri Lanka Family Gateway",
    desc: "A perfect family-friendly tour filled with adventure, wildlife, and relaxation along Sri Lanka’s coast.",
    price: "$899 P/P",
    priceNote: "From",
  },
  {
    id: 7,
    days: 7,
    image: "/tourspage/tour7.jpg",
    alt: "Sri Lanka Wellness Retreat",
    rating: 4,
    reviews: 110,
    title: "Sri Lanka Wellness Retreat",
    desc: "Relax and rejuvenate with yoga, meditation, Ayurvedic treatments, and serene nature walks at tranquil destinations in Sri Lanka.",
    price: "$1,099 P/P",
    priceNote: "From",
  },
  {
    id: 8,
    days: 10,
    image: "/tourspage/tour8.jpg",
    alt: "Ultimate Adventure Tour",
    rating: 4,
    reviews: 110,
    title: "Ultimate Adventure Tour",
    desc: "Embark on thrilling hikes, rafting, surfing, and trekking, exploring Sri Lanka's most adventurous and scenic locations.",
    price: "$1,399 P/P",
    priceNote: "From",
  },
  {
    id: 9,
    days: 7,
    image: "/tourspage/tour9.jpg",
    alt: "Wildlife & Nature Explorer",
    rating: 4,
    reviews: 110,
    title: "Wildlife & Nature Explorer",
    desc: "Discover Sri Lanka's wild side with safaris, elephant watching, and rainforest treks in the island's national parks.",
    price: "$899 P/P",
    priceNote: "From",
  },
];

const TOUR_TYPES = [
  "Cultural & Heritage",
  "Adventure & Wildlife",
  "Beach & Luxury",
  "Wellness & Retreat",
  "Family Tour",
  "Honeymoon Package",
  "Custom Tour",
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold },
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

/* ─────────────────────────── Modal ─────────────────────────── */
const Req = () => (
  <span style={{ color: "#E53E3E", marginLeft: "2px" }}>*</span>
);

function CustomizeModal({ onClose }: { onClose: () => void }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [destinations, setDestinations] = useState("");
  const [tourType, setTourType] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [budget, setBudget] = useState("");
  const [special, setSpecial] = useState("");
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const today = new Date().toISOString().split("T")[0];

  // Name: block digits
  const handleNameInput =
    (setter: (v: string) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value.replace(/[0-9]/g, "");
      setter(val);
    };

  // Phone: digits only, max 10
  const handlePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 10);
    setPhone(val);
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!firstName.trim()) newErrors.firstName = "First name is required.";
    if (!lastName.trim()) newErrors.lastName = "Last name is required.";
    if (!startDate) newErrors.startDate = "Start date is required.";
    if (!endDate) newErrors.endDate = "End date is required.";
    if (!destinations.trim())
      newErrors.destinations = "Please list at least one destination.";
    if (!tourType) newErrors.tourType = "Please select a tour type.";
    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Enter a valid email (e.g. name@example.com).";
    }
    if (!phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (phone.length !== 10) {
      newErrors.phone = "Enter a valid 10-digit Sri Lankan number.";
    }
    return newErrors;
  };

  const sendToWhatsApp = () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSending(true);
    const msg = `NEW TOUR INQUIRY – Velora Ceylon Travels
 
Name:
  • First Name: ${firstName}
  • Last Name: ${lastName}
 
Tour Dates:
  • Start: ${startDate}
  • End: ${endDate}
 
Destinations: 
${destinations}
 
Tour Type:
${tourType}
 
Number of People:
  • Adults: ${adults}
  • Children: ${children}
 
Contact Details:
  • Email: ${email}
  • Phone: ${phone.startsWith("0") ? phone.slice(1) : phone}
 
Budget Estimate: ${budget ? "$" + budget : "Not specified"}
 
Special Requests: ${special || "None"}
 

_Sent via Velora Ceylon Travels Website_`;

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/94703272582?text=${encoded}`, "_blank");
    setSending(false);
    onClose();
  };

  const err = (key: string) =>
    errors[key] ? (
      <div
        style={{
          color: "#E53E3E",
          fontSize: "0.72rem",
          marginTop: "4px",
          fontFamily: "'Clash Display', sans-serif",
        }}
      >
        {errors[key]}
      </div>
    ) : null;

  const inputCls = (key: string) =>
    `modal-input${errors[key] ? " modal-input-error" : ""}`;
  const textareaCls = (key: string) =>
    `modal-textarea${errors[key] ? " modal-input-error" : ""}`;
  const selectCls = (key: string) =>
    `modal-select${errors[key] ? " modal-input-error" : ""}`;

  const clearErr = (key: string) =>
    setErrors((prev) => {
      const n = { ...prev };
      delete n[key];
      return n;
    });

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-box">
        <button className="modal-close" onClick={onClose}>
          <X size={18} />
        </button>
        <h2 className="modal-title">Customize Your Tour</h2>

        {/* Name */}
        <div className="modal-section-label">Personal Details</div>
        <div className="modal-row-2">
          <div className="modal-field">
            <label className="modal-label">
              First Name
              <Req />
            </label>
            <div className="modal-input-wrap">
              <input
                className={inputCls("firstName")}
                type="text"
                placeholder="Nimal"
                value={firstName}
                onChange={handleNameInput(setFirstName)}
                onFocus={() => clearErr("firstName")}
              />
            </div>
            {err("firstName")}
          </div>
          <div className="modal-field">
            <label className="modal-label">
              Last Name
              <Req />
            </label>
            <div className="modal-input-wrap">
              <input
                className={inputCls("lastName")}
                type="text"
                placeholder="Chathuranga"
                value={lastName}
                onChange={handleNameInput(setLastName)}
                onFocus={() => clearErr("lastName")}
              />
            </div>
            {err("lastName")}
          </div>
        </div>

        {/* Tour Dates */}
        <div className="modal-section-label">Tour Dates</div>
        <div className="modal-row-2">
          <div className="modal-field">
            <label className="modal-label">
              Start Date
              <Req />
            </label>

            <div className="modal-input-wrap">
              <input
                type="date"
                className={inputCls("startDate")}
                value={startDate}
                min={today}
                onKeyDown={(e) => e.preventDefault()}
                onChange={(e) => {
                  setStartDate(e.target.value);
                  clearErr("startDate");
                }}
              />

              {/* Mobile placeholder */}
              {!startDate && (
                <span className="mobile-placeholder">mm/dd/yyyy</span>
              )}

              <Calendar size={16} className="modal-input-icon mobile-only" />
            </div>

            {err("startDate")}
          </div>

          <div className="modal-field">
            <label className="modal-label">
              End Date
              <Req />
            </label>

            <div className="modal-input-wrap">
              <input
                type="date"
                className={inputCls("endDate")}
                value={endDate}
                min={today}
                onKeyDown={(e) => e.preventDefault()}
                onChange={(e) => {
                  setEndDate(e.target.value);
                  clearErr("endDate");
                }}
              />

              {/* Mobile placeholder */}
              {!endDate && (
                <span className="mobile-placeholder">mm/dd/yyyy</span>
              )}

              <Calendar size={16} className="modal-input-icon mobile-only" />
            </div>

            {err("endDate")}
          </div>
        </div>

        {/* Destinations */}
        <div className="modal-section-label">
          Destinations
          <Req />
        </div>
        <div className="modal-field">
          <textarea
            className={textareaCls("destinations")}
            placeholder="List your desired destinations (e.g., Kandy, Ella, Sigiriya)"
            value={destinations}
            onChange={(e) => {
              setDestinations(e.target.value);
              clearErr("destinations");
            }}
          />
          {err("destinations")}
        </div>

        {/* Tour Type */}
        <div className="modal-section-label">
          Tour Type
          <Req />
        </div>
        <div className="modal-field">
          <div className="modal-input-wrap modal-select-wrap">
            <select
              className={selectCls("tourType")}
              value={tourType}
              onChange={(e) => {
                setTourType(e.target.value);
                clearErr("tourType");
              }}
            >
              <option value="">Select your preferred tour type</option>
              {TOUR_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <ChevronDown size={16} className="modal-input-icon" />
          </div>
          {err("tourType")}
        </div>

        {/* Number of People */}
        <div className="modal-section-label">
          Number of People
          <Req />
        </div>
        <div className="modal-row-2">
          <div className="modal-field">
            <label className="modal-label">Adults</label>
            <div className="modal-counter">
              <button
                className="modal-counter-btn"
                onClick={() => setAdults(Math.max(1, adults - 1))}
              >
                <Minus size={14} />
              </button>
              <span className="modal-counter-val">{adults}</span>
              <button
                className="modal-counter-btn"
                onClick={() => setAdults(adults + 1)}
              >
                <Plus size={14} />
              </button>
            </div>
          </div>
          <div className="modal-field">
            <label className="modal-label">Children</label>
            <div className="modal-counter">
              <button
                className="modal-counter-btn"
                onClick={() => setChildren(Math.max(0, children - 1))}
              >
                <Minus size={14} />
              </button>
              <span className="modal-counter-val">{children}</span>
              <button
                className="modal-counter-btn"
                onClick={() => setChildren(children + 1)}
              >
                <Plus size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="modal-section-label">Contact Details</div>
        <div className="modal-row-2">
          <div className="modal-field">
            <label className="modal-label">
              Email
              <Req />
            </label>
            <div className="modal-input-wrap">
              <input
                type="email"
                className={inputCls("email")}
                placeholder="john@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  clearErr("email");
                }}
              />
              <Mail size={16} className="modal-input-icon" />
            </div>
            {err("email")}
          </div>
          <div className="modal-field">
            <label className="modal-label">
              Phone Number
              <Req />
            </label>
            <div className="modal-input-wrap modal-phone-wrap">
              <input
                type="tel"
                className={`modal-input modal-input-phone${errors.phone ? " modal-input-error" : ""}`}
                placeholder="+1 23 456 7890"
                value={phone}
                onChange={handlePhone}
                onFocus={() => clearErr("phone")}
                maxLength={10}
              />
              <Phone size={16} className="modal-input-icon" />
            </div>
            {err("phone")}
          </div>
        </div>

        {/* Budget */}
        <div className="modal-section-label">
          Budget Estimate{" "}
          <span style={{ color: "#aaa", fontSize: "0.78rem" }}>(Optional)</span>
        </div>
        <div className="modal-field">
          <div className="modal-input-wrap">
            <input
              type="text"
              className="modal-input"
              placeholder="$ eg. 2000"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            />
            <DollarSign size={16} className="modal-input-icon" />
          </div>
        </div>

        {/* Special Requests */}
        <div className="modal-section-label">
          Special Requests{" "}
          <span style={{ color: "#aaa", fontSize: "0.78rem" }}>(Optional)</span>
        </div>
        <div className="modal-field">
          <textarea
            className="modal-textarea"
            placeholder="Any special request or notes? (e.g., dietary restrictions, preferred activities, accessibility needs)"
            value={special}
            onChange={(e) => setSpecial(e.target.value)}
          />
        </div>

        <button
          className="modal-send-btn"
          onClick={sendToWhatsApp}
          disabled={sending}
        >
          {sending ? "Sending..." : "Send Inquiry"}
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────── Main Page ─────────────────────── */
export default function AboutUsPage() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const { ref: aboutRef, visible: aboutVisible } = useInView(0.12);
  const { ref: toursRef, visible: toursVisible } = useInView(0.1);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  // Lock body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = modalOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalOpen]);

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
          background: url('/tourspage/hero-bg.jpg') center / cover no-repeat;
          transform: scale(1.06);
          transition: transform 9s ease;
        }
        .au-hero-bg.visible { transform: scale(1); }
        .au-hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.08) 10%, rgba(0,0,0,0.62) 100%);
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
          max-width: 670px;
          margin-left: auto; margin-right: auto;
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
        .au-pill-btn:hover { background: rgba(255,255,255,0.20); border-color: rgba(255,255,255,0.55); transform: translateX(5px); }
        .au-pill-btn-icon {
          width: 30px; height: 30px;
          border-radius: 50%;
          background: #fff;
          color: #111;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: transform 0.2s;
        }
        .au-pill-btn:hover .au-pill-btn-icon { transform: translateX(4px); }

        /* ══════ CURATED ADVENTURES SECTION (Image 1) ══════ */
        .au-curated-section {
          padding: clamp(48px, 6vw, 80px) clamp(24px, 6vw, 80px);
          display: flex;
          align-items: center;
          gap: clamp(32px, 5vw, 72px);
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.85s ease, transform 0.85s ease;
        }
        .au-curated-section.visible { opacity: 1; transform: translateY(0); }

        .au-curated-text {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .au-curated-heading {
          font-size: clamp(1.9rem, 4vw, 2.8rem);
          font-weight: 500;
          color: #111;
          line-height: 1.12;
          letter-spacing: -0.025em;
        }
        .au-curated-desc {
          font-size: clamp(0.8rem, 1.4vw, 0.9rem);
          color: #999;
          line-height: 1.8;
          font-weight: 400;
          max-width: 650px;
        }

        /* Stats row */
        .au-stats {
          display: flex;
          gap: clamp(20px, 4vw, 48px);
          flex-wrap: wrap;
          margin-top: 4px;
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
          background: var(--blue);
          border: none;
          border-radius: 9999px;
          padding: 10px 14px 10px 24px;
          color: #fff;
          font-size: 0.86rem;
          font-family: 'Clash Display', sans-serif;
          font-weight: 500;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.25s ease;
          width: fit-content;
          margin-top: 4px;
        }
        .au-inquire-btn:hover { background: #4a9add; transform: translateX(5px); }
        .au-inquire-btn-icon {
          width: 30px; height: 30px;
          border-radius: 50%;
          background: #fff;
          color: #fff;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: transform 0.2s;
        }
        .au-inquire-btn:hover .au-inquire-btn-icon { transform: translateX(4px); }

        /* Right image (rounded rectangle) */
        .au-curated-img-wrap {
          flex: 1;
          border-radius: 24px;
          overflow: hidden;
          max-width: 580px;
          height: clamp(240px, 32vw, 340px);
          flex-shrink: 0;
        }
        .au-curated-img-wrap img {
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
          display: block;
        }
        .au-curated-img-wrap:hover img { transform: scale(1.05); }

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
        padding-top: 28px;
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

        /* Customize CTA */
        .tours-cta-row {
          text-align: center;
          margin-top: clamp(28px, 4vw, 40px);
        }
        .tours-cta-text {
          font-size: 0.85rem;
          color: #aaa;
          margin-bottom: 14px;
          font-family: 'Clash Display', sans-serif;
        }
        .tours-customize-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #111;
          border: none;
          border-radius: 9999px;
          padding: 12px 28px;
          color: #fff;
          font-size: 0.88rem;
          font-family: 'Clash Display', sans-serif;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.22s, transform 0.22s;
        }
        .tours-customize-btn:hover { background: #333; transform: scale(1.03); }

        /* ══════ MODAL ══════ */
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.45);
          backdrop-filter: blur(4px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
        }
        .modal-box {
          background: #fff;
          border-radius: 20px;
          padding: clamp(24px, 4vw, 36px);
          width: 100%;
          max-width: 560px;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          box-shadow: 0 24px 80px rgba(0,0,0,0.18);
        }
        .modal-close {
          position: absolute;
          top: 16px; right: 16px;
          width: 32px; height: 32px;
          border-radius: 50%;
          border: 1px solid #eee;
          background: #f5f5f5;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s;
          color: #555;
        }
        .modal-close:hover { background: #ececec; }
        .modal-title {
          font-size: clamp(1.2rem, 2.5vw, 1.5rem);
          font-weight: 600;
          color: #111;
          margin-bottom: 20px;
          font-family: 'Clash Display', sans-serif;
          letter-spacing: -0.02em;
        }
        .modal-section-label {
          font-size: 0.82rem;
          font-weight: 600;
          color: #111;
          margin-bottom: 10px;
          margin-top: 16px;
          font-family: 'Clash Display', sans-serif;
        }
        .modal-row-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .modal-field { display: flex; flex-direction: column; gap: 6px; }
        .modal-label { font-size: 0.78rem; color: #666; font-family: 'Clash Display', sans-serif; }
        .modal-input-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }
        .modal-input {
          width: 100%;
          background: #F5F5F5;
          border: 1px solid #eee;
          border-radius: 10px;
          padding: 10px 36px 10px 14px;
          font-size: 0.82rem;
          font-family: 'Clash Display', sans-serif;
          color: #333;
          outline: none;
          transition: border-color 0.2s;
          appearance: none;
        }
        .modal-input:focus { border-color: var(--blue); }
        .modal-input-icon {
          position: absolute;
          right: 12px;
          color: #bbb;
          pointer-events: none;
        }
        .modal-textarea {
          width: 100%;
          background: #F5F5F5;
          border: 1px solid #eee;
          border-radius: 10px;
          padding: 10px 14px;
          font-size: 0.82rem;
          font-family: 'Clash Display', sans-serif;
          color: #333;
          outline: none;
          resize: vertical;
          min-height: 72px;
          transition: border-color 0.2s;
        }
        .modal-textarea:focus { border-color: var(--blue); }
        .modal-select-wrap { position: relative; }
        .modal-select {
          width: 100%;
          background: #F5F5F5;
          border: 1px solid #eee;
          border-radius: 10px;
          padding: 10px 36px 10px 14px;
          font-size: 0.82rem;
          font-family: 'Clash Display', sans-serif;
          color: #333;
          outline: none;
          appearance: none;
          cursor: pointer;
          transition: border-color 0.2s;
        }
        .modal-select:focus { border-color: var(--blue); }
        .modal-counter {
        display: flex;
        align-items: center;
        background: #F5F5F5;
        border: 1px solid #eee;
        border-radius: 10px;
        overflow: hidden;
        width: 100%;
        }
        .modal-counter-btn {
        width: 40px;
        height: 40px;
        border: none;
        background: transparent;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        color: #555;
        }
        .modal-counter-btn:hover { background: #e8e8e8; }
        .modal-counter-val {
        flex: 1;                
        text-align: center;     
        font-size: 0.86rem;
        font-family: 'Clash Display', sans-serif;
        color: #333;
        font-weight: 500;
        }
        .modal-send-btn {
          width: 100%;
          background: var(--blue);
          border: none;
          border-radius: 12px;
          padding: 14px;
          color: #fff;
          font-size: 0.92rem;
          font-family: 'Clash Display', sans-serif;
          font-weight: 600;
          cursor: pointer;
          margin-top: 22px;
          transition: background 0.22s, transform 0.2s;
          letter-spacing: 0.01em;
        }
        .modal-send-btn:hover { background: #4a9add; }
        .modal-send-btn:disabled { opacity: 0.65; cursor: not-allowed; }


        .modal-input-wrap {
        position: relative;
        }

        /* Placeholder text */
        .mobile-placeholder {
        position: absolute;
        left: 12px;
        top: 50%;
        transform: translateY(-50%);
        color: #aaa;
        pointer-events: none;
        font-size: 0.8rem;
        }

        /* Hide on desktop */
        .mobile-placeholder {
        display: none;
        }

        /* Show only on mobile */
        @media (max-width: 768px) {
        .mobile-placeholder {
            display: block;
        }
        }

        /* Hide calendar icon on desktop */
        .mobile-only {
        display: none;
        }

        @media (max-width: 768px) {
        .mobile-only {
            display: inline-block;
        }
        }

        .mobile-only {
            display: none;
        }

        /* Show only on mobile */
        @media (max-width: 768px) {
            .mobile-only {
            display: inline-block;
            }
        }

        /* ══════ RESPONSIVE ══════ */
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
        }
      `}</style>

      <div className="au-page">
        {/* ── HERO ── */}
        <section className="au-hero">
          <div className={`au-hero-bg ${heroVisible ? "visible" : ""}`} />
          <div className="au-hero-overlay" />
          <div className={`au-hero-content ${heroVisible ? "visible" : ""}`}>
            <h1 className="au-hero-title">
              Explore Our Curated Tours Across Sri Lanka
            </h1>
            <p className="au-hero-sub">
              Handcrafted journeys to the world's most breathtaking destinations
              - designed for authentic, unforgettable experiences.
            </p>
          </div>
        </section>

        {/* ── CURATED ADVENTURES (Image 1 style) ── */}
        <div
          className={`au-curated-section ${aboutVisible ? "visible" : ""}`}
          ref={aboutRef}
        >
          {/* Left: text */}
          <div className="au-curated-text">
            <h2 className="au-curated-heading">
              Curated Adventures
              <br />
              Await You
            </h2>
            <p className="au-curated-desc">
              From serene coastal escapes to thrilling mountain treks, our
              meticulously planned tours offer something for every type of
              traveler. Discover hidden gems, immerse yourself in local
              cultures, and create unforgettable memories with our expert
              guides.
            </p>

            <a href="/contact-us" className="au-inquire-btn">
              Inquire Now
              <span className="au-inquire-btn-icon">
                <ArrowUpRight size={16} color="#212121" />
              </span>
            </a>
          </div>

          {/* Right: single rounded image */}
          <div className="au-curated-img-wrap">
            <img
              src="/tourspage/about-right.jpg"
              alt="Sri Lanka elephant in forest"
            />
          </div>
        </div>

        {/* ── FEATURED TOURS (Images 2 & 3 style) ── */}
        <section className="au-tours-section">
          <div className="au-tours-header">
            <h2 className="au-tours-heading">
              Explore Our
              <br />
              Featured Tours
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

          {/* Customize CTA */}
          <div className="tours-cta-row">
            <p className="tours-cta-text">
              Can't find what you're looking for?
            </p>
            <button
              className="tours-customize-btn"
              onClick={() => setModalOpen(true)}
            >
              <Settings2 size={16} />
              Customize Your Tour
            </button>
          </div>
        </section>

        {/* ── MODAL ── */}
        {modalOpen && <CustomizeModal onClose={() => setModalOpen(false)} />}

        <InquireSection />
        <Footer />
      </div>
    </>
  );
}
