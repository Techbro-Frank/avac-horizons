import { useEffect, useRef, useState } from "react";
import { AvacLogo } from "@/components/AvacLogo";

/* ── Fade-in hook ── */
function useFadeIn() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);
  return visible;
}

/* ════════════════════════════════════════
   Brand geometric mosaic pattern (top-right of red panel)
   Grid of squares each split diagonally — white triangles
════════════════════════════════════════ */
function BrandPattern() {
  const cell = 22;
  const cols = 9;
  const rows = 6;
  const cells: { x: number; y: number; variant: number }[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      cells.push({ x: c * cell, y: r * cell, variant: (r + c) % 2 });
    }
  }
  const W = cols * cell;
  const H = rows * cell;
  return (
    <div
      className="absolute top-0 right-0 pointer-events-none z-10"
      style={{ width: W, height: H }}
      aria-hidden="true"
    >
      <svg width={W} height={H} xmlns="http://www.w3.org/2000/svg">
        {cells.map(({ x, y, variant }, i) =>
          variant === 0 ? (
            /* Upper-right white triangle */
            <polygon
              key={i}
              points={`${x},${y} ${x + cell},${y} ${x + cell},${y + cell}`}
              fill="white"
              fillOpacity="0.88"
            />
          ) : (
            /* Lower-left outline triangle (semi-transparent) */
            <polygon
              key={i}
              points={`${x},${y} ${x},${y + cell} ${x + cell},${y + cell}`}
              fill="white"
              fillOpacity="0.22"
            />
          )
        )}
      </svg>
    </div>
  );
}

/* ════════════════════════════════════════
   ISO Badge — circular certification mark
════════════════════════════════════════ */
function ISOBadge() {
  return (
    <div
      className="flex items-center justify-center shrink-0"
      style={{ width: 68, height: 68 }}
      title="ISO Certified"
      aria-label="ISO Certification badge"
    >
      <svg viewBox="0 0 68 68" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Outer ring */}
        <circle cx="34" cy="34" r="32" fill="none" stroke="white" strokeWidth="2" />
        {/* Dashed inner ring */}
        <circle cx="34" cy="34" r="26" fill="none" stroke="white" strokeWidth="1" strokeDasharray="3 2" />
        {/* ISO text */}
        <text x="34" y="30" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold" fontFamily="sans-serif">
          ISO
        </text>
        {/* 9001 */}
        <text x="34" y="42" textAnchor="middle" fill="white" fontSize="8" fontFamily="sans-serif">
          9001
        </text>
        {/* Certified */}
        <text x="34" y="52" textAnchor="middle" fill="white" fontSize="5.5" fontFamily="sans-serif" letterSpacing="0.5">
          CERTIFIED
        </text>
      </svg>
    </div>
  );
}

/* ════════════════════════════════════════
   Contact icon + text row
════════════════════════════════════════ */
function ContactRow({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-4">
      {/* White circle icon wrapper */}
      <div
        className="shrink-0 flex items-center justify-center rounded-full mt-0.5"
        style={{
          width: 36,
          height: 36,
          border: "2px solid white",
          background: "rgba(255,255,255,0.12)",
        }}
        aria-hidden="true"
      >
        {icon}
      </div>
      <div className="text-white text-sm leading-relaxed">{children}</div>
    </div>
  );
}

/* ── SVG icons (white, 18×18) ── */
const IconLocation = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const IconPhone = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.06 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z" />
  </svg>
);
const IconEmail = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);
const IconGlobe = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

/* ════════════════════════════════════════
   CONTACT PAGE — full-width section
   Background: Dubai Museum of the Future
   Red panel: right side, absolute positioned
   Bottom-left: AVAC logo + ISO badge
════════════════════════════════════════ */
export function ContactPage() {
  const visible = useFadeIn();

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative overflow-hidden"
      style={{
        minHeight: "min(640px, 100vh)",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.7s ease",
      }}
    >
      {/* ── Full-width background image ── */}
      <div className="absolute inset-0 z-0">
        <img
          src="/contact-dubai-bg.png"
          alt="Dubai Museum of the Future skyline"
          className="w-full h-full object-cover object-center"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.28)" }} />
        {/* Bottom gradient */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: 160,
            background: "linear-gradient(to top, rgba(0,0,0,0.45), transparent)",
          }}
          aria-hidden="true"
        />
      </div>

      {/* ── Red panel — right side (desktop: absolute, mobile: full-width block) ── */}
      {/* MOBILE: stacked below the image  */}
      <div
        className="relative z-10 flex flex-col lg:flex-row"
        style={{ minHeight: "min(640px, 100vh)" }}
      >
        {/* Spacer — left side (shows background image) */}
        <div className="flex-1 hidden lg:block" />

        {/* Red panel */}
        <div
          className="relative flex flex-col justify-center px-10 md:px-12 pt-10 pb-12 w-full lg:w-[46%] xl:w-[44%]"
          style={{
            background: "#E1261C",
            transform: visible ? "translateX(0)" : "translateX(40px)",
            transition: "transform 0.8s ease 0.2s",
          }}
        >
          {/* Brand geometric pattern — top-right of panel */}
          <BrandPattern />

          {/* Content — sits above pattern */}
          <div className="relative z-20 mt-16 lg:mt-12">
            {/* Title */}
            <h1
              id="contact-heading"
              className="font-display font-black text-white mb-8"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)" }}
            >
              Contact Us
            </h1>

            {/* Contact rows */}
            <div className="flex flex-col gap-6">
              <ContactRow icon={<IconLocation />}>
                <p className="font-semibold text-white mb-0.5">AVAC HORIZONS GENERAL TRADING FZCO</p>
                <p className="text-white/85">Address: DSO – IFZA, IFZA Properties, Dubai Silicon Oasis</p>
              </ContactRow>

              <ContactRow icon={<IconPhone />}>
                <a
                  href="tel:+971551505277"
                  className="text-white hover:text-white/80 transition-colors"
                >
                  +971551505277
                </a>
              </ContactRow>

              <ContactRow icon={<IconEmail />}>
                <p>
                  <a href="mailto:info@avachorizons.com" className="text-white hover:text-white/80 transition-colors">
                    info@avachorizons.com
                  </a>
                  <span className="text-white/70 mx-2">/</span>
                  <a href="mailto:contact.avaholdings@gmail.com" className="text-white hover:text-white/80 transition-colors">
                    contact.avaholdings@gmail.com
                  </a>
                </p>
              </ContactRow>

              <ContactRow icon={<IconGlobe />}>
                <a
                  href="https://www.avachorizons.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-white/80 transition-colors"
                >
                  https://www.avachorizons.com
                </a>
              </ContactRow>
            </div>
          </div>
        </div>
      </div>

      {/* ── BOTTOM-LEFT: AVAC Logo + ISO Badge ── */}
      <div
        className="absolute bottom-0 left-0 z-20 flex items-center gap-5 px-8 py-6"
        aria-label="AVAC Horizons branding"
      >
        {/* <AvacLogo iconSize={44} showText dark /> */}
        <ISOBadge />
      </div>
    </section>
  );
}
