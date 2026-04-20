import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const RED = "#E1261C";

/* ── Red geometric triangles — top-right corner (exact reference match) ──
   2 columns × 2 rows of bold diagonal-split cells, large and prominent     */
function RedTriangleCorner() {
  return (
    <div
      className="absolute top-0 right-0 pointer-events-none z-10"
      style={{ width: 240, height: 200 }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 240 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* ── Row 1 (top half) — 2 cells, each 120×100 ── */}
        {/* Cell [0,0]: solid lower-right triangle → pointing left */}
        <polygon points="0,0 120,0 0,100" fill={RED} />
        {/* Cell [0,1]: outline top-left triangle */}
        <polygon points="120,0 240,0 120,100" fill={RED} opacity="0.15" />
        <polygon points="120,0 240,0 240,100" fill="none" stroke={RED} strokeWidth="2" />

        {/* ── Row 2 (bottom half) ── */}
        {/* Cell [1,0]: outline only */}
        <polygon points="0,100 120,100 0,200" fill="none" stroke={RED} strokeWidth="2" />
        {/* Cell [1,1]: solid upper-right triangle */}
        <polygon points="120,100 240,100 240,200" fill={RED} />
        <polygon points="120,100 120,200 240,200" fill={RED} opacity="0.3" />
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
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

/* ════════════════════════════════════════
   FINAL CTA SECTION
════════════════════════════════════════ */
export function FinalCTASection() {
  const { ref, visible } = useReveal();

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      aria-labelledby="final-cta-heading"
      id="final-positioning"
      style={{
        background: "#0B1F2A",
        minHeight: 320,
      }}
    >
      {/* ── Dotted world map background image ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: "url('/cta-world-map.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.55,
        }}
      />

      {/* ── Dark overlay for contrast on text ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, rgba(11,31,42,0.85) 40%, rgba(11,31,42,0.3) 100%)",
        }}
        aria-hidden="true"
      />

      {/* ── Red geometric triangles top-right ── */}
      <RedTriangleCorner />

      {/* ── Content — left aligned ── */}
      <div
        className="relative z-10 section-container py-16 lg:py-20 flex flex-col items-start"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.75s ease 0.1s, transform 0.75s ease 0.1s",
        }}
      >
        {/* Title */}
        <h2
          id="final-cta-heading"
          className="font-display font-black text-white leading-tight mb-5 text-center sm:text-left"
          style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
        >
          Final Positioning
        </h2>

        {/* Supporting text */}
        <p
          className="text-white/80 text-base leading-relaxed mb-3 max-w-md text-center sm:text-left"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 0.7s ease 0.3s",
          }}
        >
          Connecting global supply with regional project execution.
        </p>
        <p
          className="text-white/60 text-sm leading-relaxed mb-10 max-w-sm text-center sm:text-left"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 0.7s ease 0.45s",
          }}
        >
          Delivering reliable procurement solutions for industrial projects across Africa
          and the Middle East.
        </p>

        {/* CTA Button */}
        <div
          className="w-full sm:w-auto"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 0.7s ease 0.6s",
          }}
        >
          <Link
            to="/contact"
            id="final-cta-button"
            className="group inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-8 py-3.5 rounded-md font-semibold text-white text-sm transition-all duration-300 ease-in-out"
            style={{
              background: RED,
              boxShadow: "0 0 0 0 rgba(225,38,28,0)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.04)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                "0 0 24px 4px rgba(225,38,28,0.45)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                "0 0 0 0 rgba(225,38,28,0)";
            }}
          >
            Contact Us
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
