import { useState, useEffect } from "react";

const Footer = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <footer
      style={{
        position: "relative",
        width: "100%",
        minHeight: "500px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        overflow: "hidden",
        color: "white",
      }}
    >
      {/* Background Image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/homepage/footer.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 0,
        }}
      />

      {/* Gradient Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: isMobile
            ? "linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 25%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0.55) 100%)"
            : "linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.2) 25%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0.55) 100%)",
          zIndex: 1,
        }}
      />

      {/* Content - sits at the bottom */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          padding: isMobile ? "40px 24px 24px" : "60px 80px 30px",
          width: "100%",
        }}
      >
        {/* Top Section */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1.4fr 1fr 1.2fr 1fr",
            gap: isMobile ? "32px" : "40px",
            alignItems: "start",
          }}
        >
          {/* Left - Logo & Description */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              marginTop: isMobile ? "40px" : "-30px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <img
                src="/logo.png"
                alt="Velora Ceylon"
                style={{ width: "200px", height: "auto" }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
            <p
              style={{
                fontSize: "14px",
                lineHeight: "1.7",
                color: "rgba(255,255,255,0.85)",
                margin: 0,
                maxWidth: "300px",
                fontFamily: "Clash Display",
              }}
            >
              Velora Ceylon Travels offers personalized tours across Sri Lanka,
              providing unforgettable experiences through unique cultural,
              wildlife, and beach destinations. Our goal is to make every
              journey a memorable adventure.
            </p>
          </div>

          {/* Quick Links */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "14px" }}
          >
            <h4
              style={{
                fontSize: "24px",
                fontWeight: 500,
                margin: 0,
                fontFamily: "Clash Display",
              }}
            >
              Quick Links
            </h4>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about-us" },
                { label: "Tours", href: "/tours" },
                { label: "Faq", href: "/faq" },
                { label: "Contact", href: "/contact-us" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    style={{
                      color: "rgba(255,255,255,0.8)",
                      textDecoration: "none",
                      fontSize: "14px",
                      fontFamily: "Clash Display",
                    }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLAnchorElement).style.color =
                        "rgba(255,255,255,1)";
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLAnchorElement).style.color =
                        "rgba(255,255,255,0.8)";
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "14px" }}
          >
            <h4
              style={{
                fontSize: "24px",
                fontWeight: 500,
                margin: 0,
                fontFamily: "Clash Display",
              }}
            >
              Contact Info
            </h4>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                fontSize: "14px",
                color: "rgba(255,255,255,0.85)",
                fontFamily: "Clash Display",
              }}
            >
              <a
                href="mailto:infoveloraceylon@gmail.com"
                style={{
                  color: "rgba(255,255,255,0.85)",
                  textDecoration: "none",
                  fontSize: "14px",
                }}
              >
                infoveloraceylon@gmail.com
              </a>
              <a
                href="tel:+94703272582"
                style={{
                  color: "rgba(255,255,255,0.85)",
                  textDecoration: "none",
                  fontSize: "14px",
                }}
              >
                +94 70 327 2582
              </a>
              <a
                href="tel:+94703272582"
                style={{
                  color: "rgba(255,255,255,0.85)",
                  textDecoration: "none",
                  fontSize: "14px",
                }}
              >
                +94 70 327 2582
              </a>
              <span>Sri Lanka</span>
            </div>
          </div>

          {/* Social Media */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "14px" }}
          >
            <h4
              style={{
                fontSize: "24px",
                fontWeight: 500,
                margin: 0,
                fontFamily: "Clash Display",
              }}
            >
              Social Media
            </h4>
            <div style={{ display: "flex", gap: "15px" }}>
              {[
                { name: "facebook", icon: "public/social-icons/facebook (2).png" },
                { name: "instagram", icon: "public/social-icons/instagram.png" },
                { name: "whatsapp", icon: "public/social-icons/whatsapp.png" },
                { name: "tiktok", icon: "public/social-icons/tiktok.png" },
              ].map((social) => (
                <a
                  key={social.name}
                  href="#"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(255,255,255,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.backgroundColor = "rgba(255,255,255,0.25)";
                    el.style.transform = "scale(1.1)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.backgroundColor = "rgba(255,255,255,0.1)";
                    el.style.transform = "scale(1)";
                  }}
                >
                  <img
                    src={`/${social.icon}`}
                    alt={social.name}
                    style={{ width: "18px", height: "18px" }}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider + Copyright */}
        <div style={{ marginTop: isMobile ? "32px" : "50px" }}>
          <div
            style={{
              height: "1px",
              background: "rgba(255,255,255,0.2)",
              marginBottom: "16px",
            }}
          />
          <p
            style={{
              textAlign: "left",
              fontSize: "13px",
              color: "rgba(255,255,255,0.7)",
              margin: 0,
            }}
          >
            2026 Velora Ceylon Travels. All right Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
