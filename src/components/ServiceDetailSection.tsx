import { useEffect, useRef, useState } from "react";

/* ── Red geometric corner decoration — top-right (2×2 triangle grid) ── */
function RedTriangleCorner({ size = 200 }: { size?: number }) {
  const C = size / 2; // half-size = cell size
  return (
    <div
      className="absolute top-0 right-0 pointer-events-none z-10"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg viewBox={`0 0 ${size} ${size}`} xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Top-left cell: solid red lower-right tri */}
        <polygon points={`0,0 ${C},0 0,${C}`} fill="#E1261C" />
        {/* Top-right cell: outline upper-right tri */}
        <polygon points={`${C},0 ${size},0 ${size},${C}`} fill="#E1261C" opacity="0.18"/>
        <polygon points={`${C},0 ${size},0 ${C},${C}`} fill="none" stroke="#E1261C" strokeWidth="2"/>
        {/* Bottom-left cell: outline */}
        <polygon points={`0,${C} ${C},${C} 0,${size}`} fill="none" stroke="#E1261C" strokeWidth="2"/>
        {/* Bottom-right cell: solid red */}
        <polygon points={`${C},${C} ${size},${C} ${size},${size}`} fill="#E1261C" />
        <polygon points={`${C},${C} ${C},${size} ${size},${size}`} fill="#E1261C" opacity="0.3"/>
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
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

/* ════════════════════════════════════════
   SERVICE DETAIL SECTION — Reusable
   text left / image right (default)
   or image left / text right (imagePosition="left")
════════════════════════════════════════ */
export interface ServiceDetailSectionProps {
  id: string;
  number?: string;       // optional "01", "02" etc.
  title: string;
  description: string;
  subheading: string;
  bullets: string[];
  imageSrc: string;
  imageAlt: string;
  imagePosition?: "left" | "right";
}

export function ServiceDetailSection({
  id,
  title,
  description,
  subheading,
  bullets,
  imageSrc,
  imageAlt,
  imagePosition = "right",
}: ServiceDetailSectionProps) {
  const { ref, visible } = useReveal();
  const isImageRight = imagePosition === "right";

  const textPanel = (
    <div
      className="flex flex-col justify-center px-8 sm:px-12 lg:px-16 py-14 lg:py-20"
      style={{ background: "#0B1F2A" }}
    >
      <h2
        className="font-display font-black text-white leading-tight mb-6"
        style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}
      >
        {title}
      </h2>

      <p className="text-white/70 text-sm leading-relaxed mb-6">
        {description}
      </p>

      <p className="text-white/55 text-sm font-semibold tracking-wide mb-4">
        {subheading}
      </p>

      <ul className="flex flex-col gap-2.5">
        {bullets.map((bullet) => (
          <li key={bullet} className="flex items-start gap-3 text-white/75 text-sm leading-relaxed">
            <span
              className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full"
              style={{ background: "rgba(255,255,255,0.6)" }}
              aria-hidden="true"
            />
            {bullet}
          </li>
        ))}
      </ul>
    </div>
  );

  const imagePanel = (
    <div className="relative overflow-hidden min-h-[320px] lg:min-h-0 group">
      {/* Image */}
      <img
        src={imageSrc}
        alt={imageAlt}
        className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        style={{ minHeight: 320 }}
      />
      {/* Red triangles — top-right corner */}
      <RedTriangleCorner size={180} />
    </div>
  );

  return (
    <section
      ref={ref}
      id={id}
      aria-labelledby={`${id}-heading`}
      className="overflow-hidden"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s",
      }}
    >
      {/* Add hidden h2 id for aria pointing */}
      <span id={`${id}-heading`} className="sr-only">{title}</span>

      <div className={`grid grid-cols-1 lg:grid-cols-2 min-h-[520px]`}>
        {isImageRight ? (
          <>
            {textPanel}
            {imagePanel}
          </>
        ) : (
          <>
            {imagePanel}
            {textPanel}
          </>
        )}
      </div>
    </section>
  );
}
