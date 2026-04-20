import { useEffect, useRef, useState } from "react";

/* ── Scroll reveal ── */
function useReveal() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

/* ── Red geometric brand triangles — bottom-right corner of panel ── */
function PanelTriangles() {
  return (
    <div
      className="absolute bottom-0 right-0 pointer-events-none z-10"
      style={{ width: 160, height: 148 }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 160 148"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Upper large triangle — pointing upper-right */}
        <polygon points="0,0 160,74 0,74" fill="#E1261C" />
        {/* Lower smaller triangle — below */}
        <polygon points="0,74 96,148 0,148" fill="#E1261C" />
      </svg>
    </div>
  );
}

const BULLETS = [
  "Cranes and lifting equipment",
  "Power generators (ATEX-certified and non-ATEX)",
  "Air compressors and pneumatic equipment",
  "Construction and heavy earthmoving equipment",
  "Site support infrastructure, and temporary facilities, including flatpack and accommodation units",
];

/* ════════════════════════════════════════
   CONSTRUCTION LEASING SECTION
   Full-width background image + floating
   dark navy overlay panel (left-aligned)
   — exactly matching reference design
════════════════════════════════════════ */
export function ConstructionLeasingSection() {
  const { ref, visible } = useReveal();

  return (
    <section
      ref={ref}
      id="construction-leasing"
      aria-labelledby="construction-leasing-heading"
      className="relative overflow-hidden"
      style={{
        minHeight: 580,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.85s ease 0.1s",
      }}
    >
      {/* ── Full-width background image ── */}
      <div className="absolute inset-0 z-0">
        <img
          src="/avac-horizons/svc-construction-leasing.png"
          alt="Heavy-duty industrial mobile equipment on truck trailers"
          className="w-full h-full object-cover object-center"
          style={{
            transform: visible ? "scale(1.03)" : "scale(1.08)",
            transition: "transform 6s ease",
          }}
        />
      </div>

      {/* ── Content row: panel floats INSIDE the section (10% top+bottom, small left offset) ── */}
      <div
        className="relative z-10 flex items-center"
        style={{ minHeight: 580, padding: "8% 0 8% 4%" }}
      >
        {/* ── Navy overlay panel — floats, ~45% wide ── */}
        <div
          className="relative flex flex-col justify-center w-full md:w-[56%] lg:w-[44%] xl:w-[41%] px-10 md:px-12 lg:px-14 py-12 lg:py-14"
          style={{ background: "rgba(11, 31, 42, 0.95)" }}
        >
          {/* Title */}
          <h2
            id="construction-leasing-heading"
            className="font-display font-black text-white leading-tight mb-6"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
          >
            Construction Equipment Leasing &amp; Site Support
          </h2>

          {/* Description */}
          <p className="text-white/75 text-sm leading-relaxed mb-5">
            AVAC also supports project operations through the supply and leasing of
            construction equipment and site machinery, enabling clients to maintain
            operational efficiency during project execution.
          </p>

          {/* Subheading */}
          <p className="text-white/65 text-sm font-semibold mb-4">
            Available equipment includes:
          </p>

          {/* Bullets */}
          <ul className="flex flex-col gap-2 mb-20">
            {BULLETS.map((b) => (
              <li
                key={b}
                className="flex items-start gap-3 text-white/75 text-sm leading-relaxed"
              >
                <span
                  className="mt-1.5 shrink-0 w-[5px] h-[5px] rounded-full"
                  style={{ background: "rgba(255,255,255,0.6)" }}
                  aria-hidden="true"
                />
                {b}
              </li>
            ))}
          </ul>

          {/* Red geometric brand triangles — bottom-right of panel */}
          <PanelTriangles />
        </div>

        {/* ── Right side: transparent (shows background image) ── */}
        <div className="hidden md:block flex-1" />
      </div>
    </section>
  );
}
