import { useEffect, useRef, useState } from "react";
import { CheckCircle } from "lucide-react";

/* ─────────────────────────────────────────
   RED TRIANGLE MOSAIC — exact match to ref
   3 cols × 5 rows of diagonal-split cells
   Each cell = square halved by a diagonal
   Pattern replicates the brand geometric style
───────────────────────────────────────── */
type TriCell = {
  /** which diagonal half is filled: "tr"=top-right, "bl"=bottom-left, "tl"=top-left, "br"=bottom-right */
  fill: "tr" | "bl" | "tl" | "br";
  /** solid fill or outline-only */
  mode: "solid" | "outline";
};

// 3 cols → left, mid, right   |   5 rows → top to bottom
// This pattern is reverse-engineered from the reference screenshot
const MOSAIC: TriCell[][] = [
  // row 0
  [
    { fill: "tr", mode: "solid" },
    { fill: "tl", mode: "solid" },
    { fill: "tr", mode: "solid" },
  ],
  // row 1
  [
    { fill: "bl", mode: "solid" },
    { fill: "br", mode: "outline" },
    { fill: "bl", mode: "solid" },
  ],
  // row 2
  [
    { fill: "tr", mode: "outline" },
    { fill: "tl", mode: "solid" },
    { fill: "tr", mode: "outline" },
  ],
  // row 3
  [
    { fill: "bl", mode: "solid" },
    { fill: "br", mode: "solid" },
    { fill: "bl", mode: "outline" },
  ],
  // row 4
  [
    { fill: "tr", mode: "solid" },
    { fill: "tl", mode: "outline" },
    { fill: "br", mode: "solid" },
  ],
];

/** Renders one triangle cell as an SVG path */
function TriangleCell({ fill, mode }: TriCell) {
  // Polygon points for each orientation (100×100 viewBox)
  const points: Record<TriCell["fill"], string> = {
    tr: "0,0 100,0 100,100",   // top-right triangle
    bl: "0,0 0,100 100,100",   // bottom-left triangle
    tl: "0,0 100,0 0,100",     // top-left triangle
    br: "100,0 100,100 0,100", // bottom-right triangle
  };

  const RED = "#E1261C";
  const STROKE_W = 3;

  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
    >
      <polygon
        points={points[fill]}
        fill={mode === "solid" ? RED : "none"}
        stroke={RED}
        strokeWidth={mode === "outline" ? STROKE_W : 0}
      />
    </svg>
  );
}

/** 3-column × 5-row mosaic overlay — absolutely positioned on the left side */
function RedMosaic() {
  return (
    <div
      className="absolute inset-y-0 left-0 z-10 pointer-events-none"
      style={{ width: "38%" }}
      aria-hidden="true"
    >
      <div
        className="h-full grid"
        style={{
          gridTemplateColumns: "repeat(3, 1fr)",
          gridTemplateRows: "repeat(5, 1fr)",
        }}
      >
        {MOSAIC.map((row, ri) =>
          row.map((cell, ci) => (
            <div key={`${ri}-${ci}`} className="w-full h-full">
              <TriangleCell fill={cell.fill} mode={cell.mode} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

/* ─── Industries list ─── */
const INDUSTRIES = [
  "Oil & Gas",
  "Energy & Power",
  "Construction & Infrastructure",
  "Mining & Natural Resources",
  "Marine & Offshore",
  "Industrial Manufacturing",
];

/* ─── Thumbnails ─── */
const THUMBS = [
  { src: "/avac-horizons/ind-thumb-1.png", alt: "Aerial view of oil refinery and storage tanks" },
  { src: "/avac-horizons/ind-thumb-2.png", alt: "Offshore wind farm" },
  { src: "/avac-horizons/ind-thumb-3.png", alt: "Industrial plant at night" },
];

/* ─── Reveal hook ─── */
function useReveal() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

/* ═══════════════════════════════════════════
   INDUSTRIES WE SERVE — main component
═══════════════════════════════════════════ */
export function IndustriesSection() {
  const { ref, visible } = useReveal();

  return (
    <section
      ref={ref}
      className="w-full overflow-hidden"
      aria-labelledby="industries-heading"
      id="industries-we-serve"
    >
      {/* ── Two-column grid ── */}
      <div className="flex flex-col lg:flex-row min-h-[580px] lg:min-h-[620px]">

        {/* ══ LEFT — Image + Mosaic Overlay ══ */}
        <div className="relative w-full lg:w-1/2 overflow-hidden min-h-[340px] lg:min-h-full">
          {/* Main image */}
          <img
            src="/avac-horizons/ind-rig.png"
            alt="Offshore oil drilling platform representing Marine & Offshore industry"
            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-[6000ms] ease-out"
            style={{ transform: visible ? "scale(1.04)" : "scale(1)" }}
          />
          {/* Dark overlay for depth */}
          <div className="absolute inset-0 bg-navy-800/20 z-[1]" />
          {/* Red triangle mosaic — sits on top */}
          <RedMosaic />
        </div>

        {/* ══ RIGHT — Content ══ */}
        <div
          className="w-full lg:w-1/2 bg-white flex flex-col justify-between"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateX(0)" : "translateX(24px)",
            transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
          }}
        >
          {/* Top content area */}
          <div className="px-8 sm:px-12 lg:px-14 pt-10 lg:pt-14 pb-6">
            {/* Title */}
            <h2
              id="industries-heading"
              className="font-display font-black text-navy-800 mb-4 leading-tight"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
            >
              Industries We Serve
            </h2>

            {/* Intro paragraph */}
            <p className="text-brand-dark-gray text-base leading-relaxed mb-7 max-w-sm">
              Our procurement and supply solutions support a wide range of industries:
            </p>

            {/* Industry list */}
            <ul className="flex flex-col gap-3" role="list">
              {INDUSTRIES.map((industry, i) => (
                <li
                  key={industry}
                  className="flex items-center gap-3"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateX(0)" : "translateX(12px)",
                    transition: `opacity 0.5s ease ${0.35 + i * 0.07}s, transform 0.5s ease ${0.35 + i * 0.07}s`,
                  }}
                >
                  {/* Bullet — small red filled square matches brand sharpness */}
                  <span
                    className="shrink-0 w-2 h-2 bg-accent-500"
                    style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
                    aria-hidden="true"
                  />
                  <span className="text-navy-800 font-medium text-[15px] leading-tight">
                    {industry}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Bottom thumbnails ── */}
          <div
            className="px-8 sm:px-12 lg:px-14 pb-10 lg:pb-14"
            style={{
              opacity: visible ? 1 : 0,
              transition: "opacity 0.7s ease 0.75s",
            }}
          >
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {THUMBS.map(({ src, alt }, i) => (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-lg"
                  style={{ aspectRatio: "4/3" }}
                >
                  <img
                    src={src}
                    alt={alt}
                    className="w-full h-full object-cover object-center transition-transform duration-500 ease-in-out group-hover:scale-110"
                  />
                  {/* Subtle overlay on hover */}
                  <div className="absolute inset-0 bg-navy-800/0 group-hover:bg-navy-800/20 transition-colors duration-300" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
