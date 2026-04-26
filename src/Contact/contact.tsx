import { useState, useEffect } from "react";
import { ChevronDown, Mail, Phone } from "lucide-react";
import InquireSection from "../HomePage/inquire-section";
import Footer from "../Layout/footer";
import emailjs from "@emailjs/browser";

const SUBJECTS = [
  "Tour Inquiry",
  "Custom Tour Request",
  "Booking Assistance",
  "Pricing & Packages",
  "General Question",
  "Other",
];

/* ─────────────────────────── Main Page ─────────────────────── */
export default function ContactUsPage() {
  const [heroVisible, setHeroVisible] = useState(false);
  /* ── Contact form state ── */
  const [cfFirstName, setCfFirstName] = useState("");
  const [cfLastName, setCfLastName] = useState("");
  const [cfEmail, setCfEmail] = useState("");
  const [cfPhone, setCfPhone] = useState("");
  const [cfSubject, setCfSubject] = useState("");
  const [cfMessage, setCfMessage] = useState("");
  const [cfErrors, setCfErrors] = useState<Record<string, string>>({});
  const [cfSending, setCfSending] = useState(false);
  const [cfSuccess, setCfSuccess] = useState(false);

  const cfSend = async () => {
    const errs = cfValidate();
    if (Object.keys(errs).length) {
      setCfErrors(errs);
      return;
    }
    setCfSending(true);
    try {
      await emailjs.send(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        {
          to_email: "lishanichamathka2003@gmail.com",
          first_name: cfFirstName,
          last_name: cfLastName,
          email: cfEmail,
          phone: cfPhone,
          subject: cfSubject,
          message: cfMessage,
        },
        "YOUR_PUBLIC_KEY",
      );
      setCfSuccess(true);
      setCfFirstName("");
      setCfLastName("");
      setCfEmail("");
      setCfPhone("");
      setCfSubject("");
      setCfMessage("");
      setCfErrors({});
    } catch {
      alert("Something went wrong. Please try again.");
    }
    setCfSending(false);
  };

  const cfClearErr = (k: string) =>
    setCfErrors((prev) => {
      const n = { ...prev };
      delete n[k];
      return n;
    });

  const cfNameInput =
    (setter: (v: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setter(e.target.value.replace(/[0-9]/g, ""));

  const cfPhoneInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setCfPhone(e.target.value.replace(/\D/g, "").slice(0, 10));

  const cfValidate = () => {
    const errs: Record<string, string> = {};
    if (!cfFirstName.trim()) errs.cfFirstName = "First name is required.";
    if (!cfLastName.trim()) errs.cfLastName = "Last name is required.";
    if (!cfEmail.trim()) errs.cfEmail = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cfEmail))
      errs.cfEmail = "Enter a valid email.";
    if (!cfPhone.trim()) errs.cfPhone = "Phone number is required.";
    else if (cfPhone.length !== 10)
      errs.cfPhone = "Enter a valid 10-digit number.";
    if (!cfSubject) errs.cfSubject = "Please select a subject.";
    if (!cfMessage.trim()) errs.cfMessage = "Message is required.";
    return errs;
  };

  const cfErr = (k: string) =>
    cfErrors[k] ? (
      <div
        style={{
          color: "#E53E3E",
          fontSize: "0.72rem",
          marginTop: "4px",
          fontFamily: "'Clash Display', sans-serif",
        }}
      >
        {cfErrors[k]}
      </div>
    ) : null;

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
          background: url('/tourspage/tour3.jpg') center / cover no-repeat;
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
          max-width: 800px;
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

        /* ── SUCCESS POPUP ── */
        .cf-success-overlay {
          position: fixed; inset: 0; z-index: 9999;
          background: rgba(0,0,0,0.45);
          backdrop-filter: blur(4px);
          display: flex; align-items: center; justify-content: center;
          padding: 24px;
        }
        .cf-success-modal {
          background: #fff;
          border-radius: 24px;
          padding: 48px 36px;
          max-width: 420px; width: 100%;
          display: flex; flex-direction: column; align-items: center;
          gap: 16px; text-align: center;
          animation: cf-pop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        @keyframes cf-pop {
          from { transform: scale(0.85); opacity: 0; }
          to   { transform: scale(1);    opacity: 1; }
        }
        .cf-success-icon {
          width: 72px; height: 72px; border-radius: 50%;
          background: #10B981;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 4px;
        }
        .cf-success-title {
          font-size: 1.5rem; font-weight: 600; color: #111;
          font-family: 'Clash Display', sans-serif;
          letter-spacing: -0.02em;
        }
        .cf-success-msg {
          font-size: 0.85rem; color: #777;
          font-family: 'Clash Display', sans-serif;
          line-height: 1.7; max-width: 300px;
        }
        .cf-success-btn {
          margin-top: 8px;
          background: var(--blue); border: none;
          border-radius: 12px; padding: 13px 48px;
          color: #fff; font-size: 0.92rem;
          font-family: 'Clash Display', sans-serif; font-weight: 600;
          cursor: pointer; transition: background 0.2s, transform 0.2s;
        }
        .cf-success-btn:hover { background: #4a9add; transform: translateY(-1px); }

        /* ══════ CONTACT FORM SECTION ══════ */
        .contact-page {
          padding: clamp(56px, 7vw, 96px) clamp(24px, 6vw, 80px);
          background: #fff;
        }
        .contact-page-title {
          font-size: clamp(1.9rem, 4vw, 2.8rem);
          font-weight: 500;
          color: #111;
          line-height: 1.1;
          letter-spacing: -0.025em;
          margin-bottom: 8px;
          font-family: 'Clash Display', sans-serif;
        }
        .contact-page-sub {
          font-size: clamp(0.78rem, 1.4vw, 0.88rem);
          color: #aaa;
          font-family: 'Clash Display', sans-serif;
          font-weight: 400;
          margin-bottom: clamp(28px, 4vw, 44px);
          max-width: 380px;
          line-height: 1.65;
        }
        .contact-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 16px;
        }
        .contact-form-full { grid-column: 1 / -1; }
        .contact-field { display: flex; flex-direction: column; gap: 6px; }
        .contact-label {
          font-size: 0.78rem;
          color: #555;
          font-family: 'Clash Display', sans-serif;
          font-weight: 500;
        }
        .contact-input {
          width: 100%;
          background: #F5F5F5;
          border: 1px solid #eee;
          border-radius: 10px;
          padding: 11px 14px;
          font-size: 0.82rem;
          font-family: 'Clash Display', sans-serif;
          color: #333;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          appearance: none;
        }
        .contact-input:focus {
          border-color: var(--blue);
          box-shadow: 0 0 0 3px rgba(101,171,234,0.12);
        }
        .contact-input::placeholder { color: #bbb; }
        .contact-select-wrap { position: relative; }
        .contact-select-icon {
          position: absolute;
          right: 12px; top: 50%;
          transform: translateY(-50%);
          color: #bbb;
          pointer-events: none;
        }
        .contact-textarea {
          width: 100%;
          background: #F5F5F5;
          border: 1px solid #eee;
          border-radius: 10px;
          padding: 11px 14px;
          font-size: 0.82rem;
          font-family: 'Clash Display', sans-serif;
          color: #333;
          outline: none;
          resize: vertical;
          min-height: 120px;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .contact-textarea:focus {
          border-color: var(--blue);
          box-shadow: 0 0 0 3px rgba(101,171,234,0.12);
        }
        .contact-textarea::placeholder { color: #bbb; }
        .contact-input-error { border-color: #E53E3E !important; }
        .contact-send-btn {
          width: 100%;
          background: var(--blue);
          border: none;
          border-radius: 76px;
          padding: 14px;
          color: #fff;
          font-size: 0.92rem;
          font-family: 'Clash Display', sans-serif;
          font-weight: 500;
          cursor: pointer;
          margin-top: 6px;
          transition: background 0.22s, transform 0.18s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          letter-spacing: 0.01em;
        }
        .contact-send-btn:hover { background: #4a9add; transform: translateY(-1px); }
        .contact-send-btn:disabled { opacity: 0.65; cursor: not-allowed; }

        /* ══════ CONTACT INFO SECTION ══════ */
        .contact-info-section {
          padding: clamp(48px, 6vw, 80px) clamp(24px, 6vw, 80px);
          background: #F9F9F7;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(24px, 4vw, 56px);
          align-items: start;
        }
        .contact-info-left { display: flex; flex-direction: column; gap: 14px; }
        .contact-info-title {
          font-size: clamp(1.6rem, 3.2vw, 2.2rem);
          font-weight: 500;
          color: #111;
          line-height: 1.12;
          letter-spacing: -0.025em;
          margin-bottom: 6px;
          font-family: 'Clash Display', sans-serif;
        }
        .contact-info-sub {
          font-size: clamp(0.78rem, 1.3vw, 0.86rem);
          color: #aaa;
          font-family: 'Clash Display', sans-serif;
          font-weight: 400;
          line-height: 1.65;
          margin-bottom: 10px;
          max-width: 340px;
        }
        .contact-card {
          background: #fff;
          border: 1px solid #eee;
          border-radius: 14px;
          padding: 16px 18px;
          display: flex;
          align-items: flex-start;
          gap: 14px;
          transition: box-shadow 0.22s, transform 0.22s;
        }
        .contact-card:hover {
          box-shadow: 0 8px 28px rgba(0,0,0,0.07);
          transform: translateY(-2px);
        }
        .contact-card-icon {
          width: 40px; height: 40px;
          border-radius: 10px;
          background: #C3E1FB;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          color: var(--blue);
        }
        .contact-card-label {
          font-size: 0.78rem;
          font-weight: 600;
          color: #111;
          font-family: 'Clash Display', sans-serif;
          margin-bottom: 3px;
        }
        .contact-card-value {
          font-size: 0.8rem;
          color: #555;
          font-family: 'Clash Display', sans-serif;
          font-weight: 400;
        }
        .contact-card-note {
          font-size: 0.72rem;
          color: #aaa;
          font-family: 'Clash Display', sans-serif;
          margin-top: 2px;
        }
        .contact-social-row {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 4px;
        }
        .contact-social-label {
          font-size: 0.78rem;
          font-weight: 600;
          color: #111;
          font-family: 'Clash Display', sans-serif;
        }
        .contact-social-icons { display: flex; gap: 10px; }
        .contact-social-icon {
          width: 36px; height: 36px;
          border-radius: 9px;
          border: 1px solid #eee;
          background: #C3E1FB;
          display: flex; align-items: center; justify-content: center;
          text-decoration: none;
          transition: background 0.2s, border-color 0.2s, color 0.2s, transform 0.2s;
          cursor: pointer;
        }
        .contact-social-icon:hover {
          background: var(--blue);
          border-color: var(--blue);
          color: #fff;
          transform: translateY(-2px);
        }

        /* ── WhatsApp card ── */
        .contact-whatsapp-card {
          background: #fff;
          border: 1px solid #eee;
          border-radius: 20px;
          padding: clamp(20px, 3vw, 32px);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 12px;
        }
        .contact-wa-icon-wrap {
          width: 52px; height: 52px;
          border-radius: 14px;
          background: #E8F8EF;
          display: flex; align-items: center; justify-content: center;
        }
        .contact-wa-title {
          font-size: 1.05rem;
          font-weight: 600;
          color: #111;
          font-family: 'Clash Display', sans-serif;
        }
        .contact-wa-sub {
          font-size: 0.78rem;
          color: #aaa;
          font-family: 'Clash Display', sans-serif;
          line-height: 1.6;
          max-width: 240px;
        }
        .contact-qr-wrap {
          width: 148px; height: 148px;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid #eee;
          background: #fff;
          display: flex; align-items: center; justify-content: center;
        }
        .contact-qr-wrap img { width: 100%; height: 100%; object-fit: contain; }
        .contact-wa-divider {
          font-size: 0.72rem;
          color: #bbb;
          font-family: 'Clash Display', sans-serif;
        }
        .contact-wa-btn {
          width: 100%;
          background: #25D366;
          border: none;
          border-radius: 12px;
          padding: 13px;
          color: #fff;
          font-size: 0.86rem;
          font-family: 'Clash Display', sans-serif;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: background 0.22s, transform 0.18s;
        }
        .contact-wa-btn:hover { background: #1ebe5a; transform: translateY(-1px); }

        /* ══════ MODAL ══════ */
        .modal-backdrop {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.45);
          backdrop-filter: blur(4px);
          z-index: 1000;
          display: flex; align-items: center; justify-content: center;
          padding: 16px;
        }
        .modal-box {
          background: #fff;
          border-radius: 20px;
          padding: clamp(24px, 4vw, 36px);
          width: 100%; max-width: 560px;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          box-shadow: 0 24px 80px rgba(0,0,0,0.18);
          scrollbar-width: thin;
          scrollbar-color: #cbd5e1 transparent;
        }
        .modal-box::-webkit-scrollbar { width: 6px; }
        .modal-box::-webkit-scrollbar-track { background: transparent; }
        .modal-box::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 999px; }
        .modal-box::-webkit-scrollbar-thumb:hover { background-color: #94a3b8; }
        .modal-close {
          position: absolute; top: 16px; right: 16px;
          width: 32px; height: 32px; border-radius: 50%;
          border: 1px solid #eee; background: #f5f5f5;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: background 0.2s; color: #555;
        }
        .modal-close:hover { background: #ececec; }
        .modal-title {
          font-size: clamp(1.2rem, 2.5vw, 1.5rem); font-weight: 600;
          color: #111; margin-bottom: 20px;
          font-family: 'Clash Display', sans-serif; letter-spacing: -0.02em;
        }
        .modal-section-label {
          font-size: 0.82rem; font-weight: 600; color: #111;
          margin-bottom: 10px; margin-top: 16px;
          font-family: 'Clash Display', sans-serif;
        }
        .modal-row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .modal-field { display: flex; flex-direction: column; gap: 6px; }
        .modal-label { font-size: 0.78rem; color: #666; font-family: 'Clash Display', sans-serif; }
        .modal-input-wrap { position: relative; display: flex; align-items: center; }
        .modal-input {
          width: 100%; background: #F5F5F5; border: 1px solid #eee;
          border-radius: 10px; padding: 10px 36px 10px 14px;
          font-size: 0.82rem; font-family: 'Clash Display', sans-serif;
          color: #333; outline: none; transition: border-color 0.2s; appearance: none;
        }
        .modal-input:focus { border-color: var(--blue); }
        .modal-input-icon { position: absolute; right: 12px; color: #bbb; pointer-events: none; }
        .modal-textarea {
          width: 100%; background: #F5F5F5; border: 1px solid #eee;
          border-radius: 10px; padding: 10px 14px;
          font-size: 0.82rem; font-family: 'Clash Display', sans-serif;
          color: #333; outline: none; resize: vertical; min-height: 72px;
          transition: border-color 0.2s;
        }
        .modal-textarea:focus { border-color: var(--blue); }
        .modal-select-wrap { position: relative; }
        .modal-select {
          width: 100%; background: #F5F5F5; border: 1px solid #eee;
          border-radius: 10px; padding: 10px 36px 10px 14px;
          font-size: 0.82rem; font-family: 'Clash Display', sans-serif;
          color: #333; outline: none; appearance: none; cursor: pointer;
          transition: border-color 0.2s;
        }
        .modal-select:focus { border-color: var(--blue); }
        .modal-counter {
          display: flex; align-items: center;
          background: #F5F5F5; border: 1px solid #eee;
          border-radius: 10px; overflow: hidden; width: 100%;
        }
        .modal-counter-btn {
          width: 40px; height: 40px; border: none; background: transparent;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: #555;
        }
        .modal-counter-btn:hover { background: #e8e8e8; }
        .modal-counter-val {
          flex: 1; text-align: center; font-size: 0.86rem;
          font-family: 'Clash Display', sans-serif; color: #333; font-weight: 500;
        }
        .modal-send-btn {
          width: 100%; background: var(--blue); border: none;
          border-radius: 12px; padding: 14px; color: #fff;
          font-size: 0.92rem; font-family: 'Clash Display', sans-serif;
          font-weight: 600; cursor: pointer; margin-top: 22px;
          transition: background 0.22s, transform 0.2s; letter-spacing: 0.01em;
        }
        .modal-send-btn:hover { background: #4a9add; }
        .modal-send-btn:disabled { opacity: 0.65; cursor: not-allowed; }
        .modal-input-error { border-color: #E53E3E !important; }
        .mobile-placeholder {
          position: absolute; left: 12px; top: 50%;
          transform: translateY(-50%); color: #aaa;
          pointer-events: none; font-size: 0.8rem; display: none;
        }
        .mobile-only { display: none; }
        @media (max-width: 768px) {
          .mobile-placeholder { display: block; }
          .mobile-only { display: inline-block; }
        }

        /* ══════ RESPONSIVE ══════ */
        @media (max-width: 900px) {
          .contact-info-section { grid-template-columns: 1fr; }
        }
        @media (max-width: 600px) {
          .contact-form-grid { grid-template-columns: 1fr; }
          .contact-form-full { grid-column: 1; }
          .modal-row-2 { grid-template-columns: 1fr; }
        }
        @media (max-width: 480px) {
          .contact-info-section { padding: 40px 20px; }
          .contact-page { padding: 48px 20px; }
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
              Get in Touch with Velora Ceylon Travels
            </h1>
            <p className="au-hero-sub">
              Have questions or need more details about our tours? Reach out to
              us, and we'll be happy to assist you.
            </p>
          </div>
        </section>

        {/* ── SEND MESSAGE FORM ── */}
        <section className="contact-page">
          <h2 className="contact-page-title">Send Us a Message</h2>
          <p className="contact-page-sub">
            Fill in the form below, and our team will get back to you as soon as
            possible.
          </p>

          <div className="contact-form-grid">
            {/* First Name */}
            <div className="contact-field">
              <label className="contact-label">
                First Name <span style={{ color: "#E53E3E" }}>*</span>
              </label>
              <input
                className={`contact-input${cfErrors.cfFirstName ? " contact-input-error" : ""}`}
                placeholder="Nimal"
                value={cfFirstName}
                onChange={cfNameInput(setCfFirstName)}
                onFocus={() => cfClearErr("cfFirstName")}
              />
              {cfErr("cfFirstName")}
            </div>

            {/* Last Name */}
            <div className="contact-field">
              <label className="contact-label">
                Last Name <span style={{ color: "#E53E3E" }}>*</span>
              </label>
              <input
                className={`contact-input${cfErrors.cfLastName ? " contact-input-error" : ""}`}
                placeholder="Chathuranga"
                value={cfLastName}
                onChange={cfNameInput(setCfLastName)}
                onFocus={() => cfClearErr("cfLastName")}
              />
              {cfErr("cfLastName")}
            </div>

            {/* Email */}
            <div className="contact-field">
              <label className="contact-label">
                Email <span style={{ color: "#E53E3E" }}>*</span>
              </label>
              <input
                type="email"
                className={`contact-input${cfErrors.cfEmail ? " contact-input-error" : ""}`}
                placeholder="nimal@example.com"
                value={cfEmail}
                onChange={(e) => {
                  setCfEmail(e.target.value);
                  cfClearErr("cfEmail");
                }}
              />
              {cfErr("cfEmail")}
            </div>

            {/* Phone */}
            <div className="contact-field">
              <label className="contact-label">
                Contact Number <span style={{ color: "#E53E3E" }}>*</span>
              </label>
              <input
                type="tel"
                className={`contact-input${cfErrors.cfPhone ? " contact-input-error" : ""}`}
                placeholder="+1 234 567 890"
                value={cfPhone}
                onChange={cfPhoneInput}
                onFocus={() => cfClearErr("cfPhone")}
                maxLength={10}
              />
              {cfErr("cfPhone")}
            </div>

            {/* Subject */}
            <div className="contact-field contact-form-full">
              <label className="contact-label">
                Subject <span style={{ color: "#E53E3E" }}>*</span>
              </label>
              <div className="contact-select-wrap">
                <select
                  className={`contact-input${cfErrors.cfSubject ? " contact-input-error" : ""}`}
                  value={cfSubject}
                  onChange={(e) => {
                    setCfSubject(e.target.value);
                    cfClearErr("cfSubject");
                  }}
                  style={{
                    paddingRight: "36px",
                    cursor: "pointer",
                    appearance: "none",
                  }}
                >
                  <option value="">Select Subject</option>
                  {SUBJECTS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <ChevronDown size={16} className="contact-select-icon" />
              </div>
              {cfErr("cfSubject")}
            </div>

            {/* Message */}
            <div className="contact-field contact-form-full">
              <label className="contact-label">
                Message <span style={{ color: "#E53E3E" }}>*</span>
              </label>
              <textarea
                className={`contact-textarea${cfErrors.cfMessage ? " contact-input-error" : ""}`}
                placeholder="Tell us how we can help you..."
                value={cfMessage}
                onChange={(e) => {
                  setCfMessage(e.target.value);
                  cfClearErr("cfMessage");
                }}
              />
              {cfErr("cfMessage")}
            </div>
          </div>

          <button
            className="contact-send-btn"
            onClick={cfSend}
            disabled={cfSending}
          >
            {cfSending ? "Sending..." : "Send Message"}
          </button>
        </section>

        {/* ── CONTACT INFO + WHATSAPP ── */}
        <section className="contact-info-section">
          {/* Left: contact cards */}
          <div className="contact-info-left">
            <h2 className="contact-info-title">Send Us a Message</h2>
            <p className="contact-info-sub">
              Fill in the form below, and our team will get back to you as soon
              as possible.
            </p>

            {/* Phone */}
            <div className="contact-card">
              <div className="contact-card-icon">
                <Phone size={18} style={{ color: "#000000" }} />
              </div>
              <div>
                <div className="contact-card-label">Phone</div>
                <div className="contact-card-value">+1 234 567 890</div>
                <div className="contact-card-note">Mon – Sat, 8am – 6pm</div>
              </div>
            </div>

            {/* Email */}
            <div className="contact-card">
              <div className="contact-card-icon">
                <Mail size={18} style={{ color: "#000000" }} />
              </div>
              <div>
                <div className="contact-card-label">Email</div>
                <div className="contact-card-value">
                  infovelora ceylon@gmail.com
                </div>
                <div className="contact-card-note">
                  We reply within 24 hours
                </div>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="contact-card">
              <div className="contact-card-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="black">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                </svg>
              </div>
              <div>
                <div className="contact-card-label">WhatsApp</div>
                <div className="contact-card-value">+94 123 456 7890</div>
                <div className="contact-card-note">
                  Quick responses on WhatsApp
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="contact-social-row">
              <div className="contact-social-label">Follow Us On</div>
              <div className="contact-social-icons">
                {/* Facebook */}
                <a
                  className="contact-social-icon"
                  href="#"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src="/social-icons/Vector.png" />
                </a>
                {/* Instagram */}
                <a
                  className="contact-social-icon"
                  href="#"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src="/social-icons/insta1.png" />
                </a>
                {/* TikTok */}
                <a
                  className="contact-social-icon"
                  href="#"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src="/social-icons/tiktok1.png" />
                </a>
                {/* LinkedIn */}
                <a
                  className="contact-social-icon"
                  href="#"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src="/social-icons/Vector1.png" />
                </a>
              </div>
            </div>
          </div>

          {/* Right: WhatsApp QR card */}
          <div className="contact-whatsapp-card">
            <div className="contact-wa-icon-wrap">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="#25D366">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
              </svg>
            </div>
            <div className="contact-wa-title">Chat on WhatsApp</div>
            <p className="contact-wa-sub">
              Scan the QR code below with your phone camera to start a WhatsApp
              conversation instantly.
            </p>
            <div className="contact-qr-wrap">
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=148x148&data=https://wa.me/94703272582"
                alt="WhatsApp QR code"
              />
            </div>
            <div className="contact-wa-divider">
              Or tap the button below to open WhatsApp directly.
            </div>
            <button
              className="contact-wa-btn"
              onClick={() => window.open("https://wa.me/94703272582", "_blank")}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
              </svg>
              Open WhatsApp
            </button>
          </div>
        </section>

        <InquireSection />
        <Footer />

        {/* ── SUCCESS POPUP ── */}
        {cfSuccess && (
          <div
            className="cf-success-overlay"
            onClick={() => setCfSuccess(false)}
          >
            <div
              className="cf-success-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="cf-success-icon">
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className="cf-success-title">Message Sent!</h3>
              <p className="cf-success-msg">
                Thank you, {cfFirstName || "there"}! Your message has been sent
                successfully. Our team will get back to you within 24 hours.
              </p>
              <button
                className="cf-success-btn"
                onClick={() => setCfSuccess(false)}
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
