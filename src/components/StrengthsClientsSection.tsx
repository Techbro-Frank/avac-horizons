import { useEffect, useRef, useState } from "react";

/* ════════════════════════════════════════
   INLINE SVG LOGOS — exact brand colors
════════════════════════════════════════ */

const McDermottLogo = () => (
  <svg viewBox="0 0 220 60" xmlns="http://www.w3.org/2000/svg" aria-label="McDermott">
    {/* Green bracket/box accent */}
    <rect x="2" y="8" width="38" height="44" rx="1" fill="none" stroke="#00843D" strokeWidth="3.5" />
    <text x="21" y="38" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontSize="20" fontWeight="900" fill="#00843D">M</text>
    <text x="130" y="24" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fontWeight="700" fill="#1a1a1a" letterSpacing="1">McDERMOTT</text>
    <text x="130" y="40" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fill="#555" letterSpacing="0.5">INTERNATIONAL</text>
  </svg>
);

const DaewooLogo = () => (
  <svg viewBox="0 0 220 60" xmlns="http://www.w3.org/2000/svg" aria-label="Daewoo E&C">
    <circle cx="22" cy="30" r="18" fill="#0052A5" opacity="0.1" />
    <text x="22" y="36" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontSize="22" fontWeight="900" fill="#0052A5">D</text>
    <text x="125" y="26" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="13" fontWeight="800" fill="#0052A5" letterSpacing="1">DAEWOO E&amp;C</text>
    <text x="125" y="44" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fill="#0052A5" letterSpacing="0.3">Engineering &amp; Construction</text>
  </svg>
);

const RencoLogo = () => (
  <svg viewBox="0 0 180 60" xmlns="http://www.w3.org/2000/svg" aria-label="Renco">
    <text x="90" y="40" textAnchor="middle" fontFamily="Impact, Arial Black, sans-serif" fontSize="34" fontWeight="900" fill="#E85C1B" letterSpacing="2">RENCO</text>
  </svg>
);

const ChiyodaLogo = () => (
  <svg viewBox="0 0 220 65" xmlns="http://www.w3.org/2000/svg" aria-label="Chiyoda Corporation">
    {/* Blue triangle */}
    <polygon points="6,52 34,6 62,52" fill="none" stroke="#1B3B7B" strokeWidth="3.5" />
    <line x1="6" y1="52" x2="62" y2="52" stroke="#1B3B7B" strokeWidth="3.5" />
    {/* Divider line inside */}
    <line x1="21" y1="38" x2="47" y2="38" stroke="#1B3B7B" strokeWidth="2" />
    <text x="130" y="28" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="13.5" fontWeight="800" fill="#1B3B7B" letterSpacing="1.5">CHIYODA</text>
    <text x="130" y="46" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10.5" fontWeight="600" fill="#1B3B7B" letterSpacing="1">CORPORATION</text>
  </svg>
);

const EgbinLogo = () => (
  <svg viewBox="0 0 180 60" xmlns="http://www.w3.org/2000/svg" aria-label="Egbin">
    <text x="10" y="44" fontFamily="Impact, Arial Black, sans-serif" fontSize="13" fontWeight="900" fill="#E85C1B" fontStyle="italic">e</text>
    <text x="26" y="44" fontFamily="Impact, Arial Black, sans-serif" fontSize="30" fontWeight="900" fill="#1a1a1a" letterSpacing="1">GBIN</text>
  </svg>
);

const TELogo = () => (
  <svg viewBox="0 0 120 60" xmlns="http://www.w3.org/2000/svg" aria-label="TotalEnergies">
    {/* T — red */}
    <text x="18" y="44" fontFamily="Arial Black, sans-serif" fontSize="40" fontWeight="900" fill="#E1261C">T</text>
    {/* E — gradient colors */}
    <text x="52" y="44" fontFamily="Arial Black, sans-serif" fontSize="40" fontWeight="900">
      <tspan fill="#E1261C">E</tspan>
    </text>
    {/* Color strips on the E */}
    <rect x="52" y="7" width="8" height="8" fill="#E1261C" />
    <rect x="52" y="18" width="8" height="8" fill="#F5A623" />
    <rect x="52" y="29" width="8" height="8" fill="#4CAF50" />
  </svg>
);

const SaipemLogo = () => (
  <svg viewBox="0 0 200 75" xmlns="http://www.w3.org/2000/svg" aria-label="Saipem">
    {/* S bracket — teal */}
    <rect x="8" y="6" width="46" height="46" rx="2" fill="none" stroke="#007B8A" strokeWidth="3" />
    <rect x="8" y="6" width="25" height="25" rx="1" fill="#007B8A" />
    <rect x="29" y="27" width="25" height="25" rx="1" fill="#E05C1A" />
    <text x="120" y="35" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="22" fontWeight="800" fill="#1a1a1a" letterSpacing="2">SAIPEM</text>
  </svg>
);

/* ════════════════════════════════════════
   DATA
════════════════════════════════════════ */
const STRENGTHS_COLS = [
  [
    "Established global supplier network",
    "Reliable delivery across challenging markets",
  ],
  [
    "Competitive sourcing and cost optimization",
  ],
  [
    "Strict quality control and compliance processes",
    "Proven capability supporting industrial and infrastructure projects",
  ],
];

const CLIENTS = [
  { name: "McDermott", Logo: McDermottLogo },
  { name: "Daewoo E&C", Logo: DaewooLogo },
  { name: "Renco", Logo: RencoLogo },
  { name: "Chiyoda Corporation", Logo: ChiyodaLogo },
  { name: "eGBIN", Logo: EgbinLogo },
  { name: "TotalEnergies", Logo: TELogo },
  { name: "Saipem", Logo: SaipemLogo },
];

/* ── Small corner triangle decoration ── */
function TriangleCorner({ position = "tl" }: { position?: "tl" | "br" }) {
  const cls =
    position === "tl"
      ? "absolute top-0 left-0 pointer-events-none"
      : "absolute bottom-0 right-0 pointer-events-none rotate-180";
  return (
    <div className={cls} style={{ width: 120, height: 120 }} aria-hidden="true">
      <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
        <polygon points="0,0 60,0 60,60" fill="#E1261C" />
        <polygon points="60,0 120,0 60,60" fill="none" stroke="#E1261C" strokeWidth="3" />
        <polygon points="0,60 60,60 0,120" fill="none" stroke="#E1261C" strokeWidth="3" />
        <polygon points="60,60 120,60 120,120" fill="#E1261C" />
      </svg>
    </div>
  );
}

/* ── Scroll reveal hook ── */
function useReveal() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

/* ════════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════════ */
export function StrengthsClientsSection() {
  const { ref, visible } = useReveal();

  return (
    <section
      ref={ref}
      className="relative bg-white"
      aria-label="Our Strengths and Clientele"
      id="strengths-clients"
    >
      {/* ══════════════════════════════════
          TOP — OUR STRENGTHS
      ══════════════════════════════════ */}
      <div
        className="relative overflow-hidden pt-16 pb-0 lg:pt-20"
        id="our-strengths"
        aria-labelledby="strengths-heading"
      >
        {/* Industrial background watermark */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage: "url('/hero-industrial.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.05,
          }}
        />
        <div className="absolute inset-0 bg-white/60 pointer-events-none" />

        <div
          className="relative z-10 section-container"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
          }}
        >
          {/* Centered title + subtitle */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2
              id="strengths-heading"
              className="font-display font-black text-navy-800 mb-5"
              style={{ fontSize: "clamp(2rem, 3.5vw, 2.75rem)" }}
            >
              Our Strengths
            </h2>
            <p className="text-gray-600 text-base leading-relaxed">
              Our approach is built on reliability, speed, and disciplined execution.
              By combining global supplier access with regional market understanding,
              AVAC delivers consistent procurement performance even in complex
              operating environments through its:
            </p>
          </div>

          {/* 3-column strengths grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6 max-w-5xl mx-auto">
            {STRENGTHS_COLS.map((col, ci) => (
              <div
                key={ci}
                className="flex flex-col gap-5"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(16px)",
                  transition: `opacity 0.6s ease ${0.25 + ci * 0.12}s, transform 0.6s ease ${0.25 + ci * 0.12}s`,
                }}
              >
                {col.map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <span
                      className="shrink-0 mt-[0.35em] w-[7px] h-[7px] rounded-full bg-navy-800"
                      aria-hidden="true"
                    />
                    <p className="text-navy-800 font-semibold text-[15px] leading-snug">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Circle teamwork image — bottom center, overlaps into clients section */}
        <div
          className="relative z-20 flex justify-center mt-10"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 0.8s ease 0.55s",
          }}
        >
          <div
            className="relative overflow-hidden rounded-full border-[6px] border-navy-800 shadow-2xl"
            style={{ width: 280, height: 280 }}
          >
            <img
              src="/avac-horizons/teamwork-hands.png"
              alt="Teamwork and partnership — joined hands representing AVAC Horizons team"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════
          BOTTOM — OUR CLIENTELE
      ══════════════════════════════════ */}
      <div
        className="relative overflow-hidden pt-0 pb-16 lg:pb-20"
        id="our-clients"
        aria-labelledby="clients-heading"
      >
        {/* Corner decorations — matching reference */}
        <TriangleCorner position="tl" />
        <TriangleCorner position="br" />

        <div
          className="section-container pt-14 lg:pt-16"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 0.7s ease 0.4s",
          }}
        >
          {/* Title */}
          <h2
            id="clients-heading"
            className="font-display font-black text-navy-800 text-center mb-10"
            style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
          >
            Our Clients
          </h2>

          {/* Logo grid — 3 per row desktop, 2 mobile */}
          {/* Row 1: 3 logos */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-8 max-w-3xl mx-auto">
            {CLIENTS.slice(0, 6).map(({ name, Logo }, i) => (
              <div
                key={name}
                className="flex items-center justify-center h-20 px-4 filter grayscale hover:grayscale-0 hover:scale-105 transition-all duration-300 ease-in-out cursor-default"
                style={{
                  opacity: visible ? 1 : 0,
                  transition: `opacity 0.5s ease ${0.5 + i * 0.07}s, filter 0.3s ease, transform 0.3s ease`,
                }}
                title={name}
              >
                <Logo />
              </div>
            ))}
          </div>

          {/* Row 2: Last logo centered */}
          <div className="flex justify-center mt-8">
            {CLIENTS.slice(6).map(({ name, Logo }, i) => (
              <div
                key={name}
                className="flex items-center justify-center h-20 w-48 px-4 filter grayscale hover:grayscale-0 hover:scale-105 transition-all duration-300 ease-in-out cursor-default"
                style={{
                  opacity: visible ? 1 : 0,
                  transition: `opacity 0.5s ease 0.92s, filter 0.3s ease, transform 0.3s ease`,
                }}
                title={name}
              >
                <Logo />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
