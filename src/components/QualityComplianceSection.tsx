import { useEffect, useRef, useState } from "react";

/* ── Scroll reveal ── */
function useReveal(threshold = 0.06) {
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

const BULLETS = [
  "Certificates of conformity",
  "Technical data sheets",
  "Third party inspection reports",
  "Compliance certificates",
];

/* ════════════════════════════════════════
   QUALITY & COMPLIANCE SECTION
   Left: dark navy panel (text + subtle geo pattern)
   Right: full-height lab image
   Floating: smaller portrait image overlapping the boundary
════════════════════════════════════════ */
export function QualityComplianceSection() {
  const { ref, visible } = useReveal();

  return (
    <section
      ref={ref}
      id="quality-compliance"
      aria-labelledby="quality-heading"
      className="relative overflow-hidden"
      style={{
        minHeight: 540,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.9s ease 0.1s",
      }}
    >
      {/* ════════════════ TWO-COLUMN BASE LAYER ════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-2" style={{ minHeight: 540 }}>

        {/* ── LEFT: Dark Navy Panel ── */}
        <div
          className="relative flex flex-col justify-center px-10 md:px-14 lg:px-16 py-16 lg:py-20"
          style={{ background: "#0B1F2A" }}
        >
          {/* Subtle geometric dot/grid pattern overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
            aria-hidden="true"
          />

          {/* Content */}
          <div className="relative z-10 max-w-[480px]">
            {/* Red accent bar */}
            <div
              className="w-12 h-1 mb-6"
              style={{ background: "#E1261C" }}
              aria-hidden="true"
            />

            {/* Title */}
            <h2
              id="quality-heading"
              className="font-display font-black text-white leading-tight mb-8"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              Quality &amp; Compliance
            </h2>

            {/* Para 1 */}
            <p className="text-white/70 text-sm leading-loose mb-6">
              AVAC maintains strict quality assurance standards throughout the
              procurement process.
            </p>

            {/* Para 2 */}
            <p className="text-white/70 text-sm leading-loose mb-5">
              All supplied materials are sourced from verified manufacturers and
              delivered with required documentation including:
            </p>

            {/* Bullet list */}
            <ul className="flex flex-col gap-3">
              {BULLETS.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-3 text-white/75 text-sm leading-relaxed"
                >
                  <span
                    className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full"
                    style={{ background: "rgba(255,255,255,0.55)" }}
                    aria-hidden="true"
                  />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── RIGHT: Main full-height lab image ── */}
        <div
          className="relative overflow-hidden min-h-[320px] lg:min-h-0 group"
        >
          <img
            src="/quality-main-lab.png"
            alt="Quality control technician with blue gloves operating precision testing equipment"
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            style={{ minHeight: 320 }}
          />
        </div>
      </div>

      {/* ════════════════ FLOATING OVERLAY IMAGE ════════════════
          Centered over the left/right boundary
          z-10 so it sits above both base panels
      ════════════════════════════════════════════════════════════ */}
      <div
        className="absolute z-20 hidden lg:block"
        style={{
          /* Horizontally centred around the 50% boundary */
          left: "35%",
          top: "12%",
          width: "30%",
          bottom: "12%",
          boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 1s ease 0.4s, transform 1s ease 0.4s",
        }}
      >
        <img
          src="/quality-floating-lab.png"
          alt="Lab technician operating automated quality analyzer"
          className="w-full h-full object-cover object-center transition-transform duration-300 hover:-translate-y-1"
          style={{ display: "block" }}
        />
      </div>
    </section>
  );
}
