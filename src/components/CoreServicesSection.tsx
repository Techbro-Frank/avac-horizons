import { useEffect, useRef, useState } from "react";

/* ────── Custom inline SVG icons — red outline style matching reference ────── */
const OemIcon = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="8" y="8" width="30" height="36" rx="3" stroke="#E1261C" strokeWidth="2.5"/>
    <line x1="14" y1="20" x2="32" y2="20" stroke="#E1261C" strokeWidth="2"/>
    <line x1="14" y1="27" x2="32" y2="27" stroke="#E1261C" strokeWidth="2"/>
    <line x1="14" y1="34" x2="26" y2="34" stroke="#E1261C" strokeWidth="2"/>
    <circle cx="44" cy="46" r="10" stroke="#E1261C" strokeWidth="2.5"/>
    <line x1="51" y1="53" x2="58" y2="60" stroke="#E1261C" strokeWidth="3" strokeLinecap="round"/>
    <circle cx="44" cy="46" r="5" stroke="#E1261C" strokeWidth="1.5"/>
  </svg>
);

const GlobeIcon = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="30" cy="30" r="20" stroke="#E1261C" strokeWidth="2.5"/>
    <ellipse cx="30" cy="30" rx="9" ry="20" stroke="#E1261C" strokeWidth="2"/>
    <line x1="10" y1="30" x2="50" y2="30" stroke="#E1261C" strokeWidth="2"/>
    <line x1="13" y1="20" x2="47" y2="20" stroke="#E1261C" strokeWidth="1.5"/>
    <line x1="13" y1="40" x2="47" y2="40" stroke="#E1261C" strokeWidth="1.5"/>
    <circle cx="50" cy="50" r="10" stroke="#E1261C" strokeWidth="2.5"/>
    <line x1="56" y1="56" x2="62" y2="62" stroke="#E1261C" strokeWidth="3" strokeLinecap="round"/>
  </svg>
);

const ComplianceIcon = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="10" y="4" width="36" height="46" rx="3" stroke="#E1261C" strokeWidth="2.5"/>
    <line x1="18" y1="16" x2="38" y2="16" stroke="#E1261C" strokeWidth="2"/>
    <line x1="18" y1="24" x2="38" y2="24" stroke="#E1261C" strokeWidth="2"/>
    <line x1="18" y1="32" x2="30" y2="32" stroke="#E1261C" strokeWidth="2"/>
    <circle cx="44" cy="46" r="14" stroke="#E1261C" strokeWidth="2.5"/>
    <polyline points="37,46 42,51 52,40" stroke="#E1261C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SpecializedIcon = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="4" y="34" width="48" height="14" rx="2" stroke="#E1261C" strokeWidth="2.5"/>
    <rect x="14" y="20" width="18" height="14" rx="2" stroke="#E1261C" strokeWidth="2"/>
    <rect x="36" y="26" width="12" height="8" rx="1.5" stroke="#E1261C" strokeWidth="2"/>
    <circle cx="14" cy="50" r="5" stroke="#E1261C" strokeWidth="2"/>
    <circle cx="38" cy="50" r="5" stroke="#E1261C" strokeWidth="2"/>
    <line x1="50" y1="42" x2="58" y2="34" stroke="#E1261C" strokeWidth="2" strokeLinecap="round"/>
    <line x1="54" y1="34" x2="58" y2="34" stroke="#E1261C" strokeWidth="2" strokeLinecap="round"/>
    <line x1="58" y1="34" x2="58" y2="38" stroke="#E1261C" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const CAPABILITIES = [
  {
    Icon: OemIcon,
    text: "OEM and supplier identification, qualification, and management",
  },
  {
    Icon: GlobeIcon,
    text: "Global sourcing and procurement execution",
  },
  {
    Icon: ComplianceIcon,
    text: "Technical compliance verification and documentation",
  },
  {
    Icon: SpecializedIcon,
    text: "Sourcing of specialised and hard-to-find industrial items",
  },
];

/* ────── Scroll reveal hook ────── */
function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ════════════════════════════════════════
   CORE SERVICES SECTION
════════════════════════════════════════ */
export function CoreServicesSection() {
  const { ref, visible } = useReveal(0.05);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      aria-labelledby="core-services-heading"
      id="core-services"
      style={{ background: "#0B1F2A", minHeight: "100vh" }}
    >
      {/* Industrial background watermark image */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: "url('/hero-industrial.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.12,
        }}
      />
      {/* Dark overlay gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(180deg, rgba(11,31,42,0.6) 0%, rgba(11,31,42,0.85) 100%)" }}
        aria-hidden="true"
      />

      {/* Bottom-right red geometric accent */}
      <div className="absolute bottom-0 right-0 pointer-events-none" aria-hidden="true" style={{ width: 120, height: 90 }}>
        <svg viewBox="0 0 120 90" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <polygon points="0,90 120,0 120,90" fill="#E1261C"/>
        </svg>
      </div>

      {/* Content */}
      <div
        className="relative z-10 section-container flex flex-col items-center text-center py-20 lg:py-28"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s",
        }}
      >
        {/* Title */}
        <h1
          id="core-services-heading"
          className="font-display font-black mb-4"
          style={{ color: "#E1261C", fontSize: "clamp(2.2rem, 5vw, 3.5rem)" }}
        >
          Core Services
        </h1>

        {/* Subtitle */}
        <p
          className="text-white font-semibold mb-6"
          style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)" }}
        >
          Strategic Procurement &amp; Global Sourcing
        </p>

        {/* Description */}
        <p className="text-white/70 leading-relaxed max-w-3xl mx-auto mb-10 text-base">
          AVAC provides structured procurement solutions by sourcing high-quality materials,
          equipment, and specialized products from trusted global manufacturers and suppliers.
          Our approach ensures compliance with technical specifications, quality standards,
          budgetary requirements, and project schedules.
        </p>

        {/* "Capabilities include:" label */}
        <p className="text-white/55 text-sm font-medium mb-10 tracking-wide">
          Capabilities include:
        </p>

        {/* 2×2 Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-10 max-w-4xl mx-auto w-full">
          {CAPABILITIES.map(({ Icon, text }, i) => (
            <div
              key={text}
              className="flex items-center gap-5 text-left"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
                transition: `opacity 0.6s ease ${0.3 + i * 0.1}s, transform 0.6s ease ${0.3 + i * 0.1}s`,
              }}
            >
              {/* Icon */}
              <div className="shrink-0">
                <Icon />
              </div>

              {/* Thin vertical divider */}
              <div
                className="shrink-0 w-px self-stretch"
                style={{ background: "rgba(255,255,255,0.2)", minHeight: 56 }}
                aria-hidden="true"
              />

              {/* Text */}
              <p className="text-white/85 text-sm leading-relaxed font-medium">
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
