import { useEffect, useRef, useState } from "react";

/* ── Scroll reveal ── */
function useReveal(threshold = 0.05) {
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

/* ── OEM lists exactly matching reference ── */
const LEFT_OEMS = [
  "Energy Chains, Chainflex Cables - Igus, Germany",
  "Power Transmission Belts – Optibelt, Germany",
  "Vertical Turbine Pumps, Fire Hydrant Systems – Peerless, USA",
  "Shandong Hongqiao Energy Equipment Technology Co., Ltd. - for reinforcement steel",
  "Guowang cable group",
];

const RIGHT_OEMS = [
  "API Pumps and Valves",
  "Albatros S,rL - for chemicals",
  "Coofix tools China",
  "Chongqing Kefei Cable Group Co., Ltd.",
];

/* ── Single navy card ── */
function OEMCard({ text, index, visible }: { text: string; index: number; visible: boolean }) {
  return (
    <div
      id={`oem-card-${index}`}
      className="flex items-center px-6 py-4 cursor-default transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
      style={{
        background: "#0B1F2A",
        borderRadius: 0,
        minHeight: 56,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        transition: `opacity 0.5s ease ${0.08 * index}s, transform 0.5s ease ${0.08 * index}s, box-shadow 0.2s`,
      }}
    >
      <p className="text-white text-sm leading-snug font-medium">{text}</p>
    </div>
  );
}

/* ════════════════════════════════════════
   SECTION 1 — HERO BANNER (grayscale handshake)
════════════════════════════════════════ */
function OEMHero() {
  return (
    <div
      className="w-full overflow-hidden"
      style={{ height: 340 }}
      aria-hidden="true"
    >
      <img
        src="/oem-handshake.png"
        alt="Business partners shaking hands — AVAC OEM partnerships"
        className="w-full h-full object-cover object-center"
        style={{
          filter: "grayscale(100%) contrast(1.1)",
        }}
      />
    </div>
  );
}

/* ════════════════════════════════════════
   SECTION 2 — MAIN CONTENT
   Left: "Our / OEMs" title with red bar + red glow
   Right: 2-column navy cards grid
════════════════════════════════════════ */
function OEMContent() {
  const { ref, visible } = useReveal();

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-white"
      aria-labelledby="oem-heading"
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 0.8s ease 0.1s",
      }}
    >
      {/* ── Red radial glow — bottom-left ── */}
      <div
        className="absolute bottom-0 left-0 pointer-events-none"
        style={{
          width: 420,
          height: 420,
          background: "radial-gradient(circle at bottom left, rgba(225,38,28,0.28) 0%, transparent 70%)",
          zIndex: 0,
        }}
        aria-hidden="true"
      />

      <div
        className="relative z-10 section-container py-16 lg:py-20"
      >
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

          {/* ── LEFT: Title ── */}
          <div className="shrink-0 lg:w-[220px] xl:w-[260px]">
            {/* "Our" + red bar on same line */}
            <div className="flex items-center gap-4 mb-0">
              <h1
                id="oem-heading"
                className="font-display font-black leading-none"
                style={{
                  color: "#0B1F2A",
                  fontSize: "clamp(3.5rem, 7vw, 5.5rem)",
                  lineHeight: 1,
                }}
              >
                Our
              </h1>
              {/* Red horizontal accent bar — inline with "Our" */}
              <div
                className="shrink-0"
                style={{
                  width: 48,
                  height: 10,
                  background: "#E1261C",
                  marginTop: 4,
                }}
                aria-hidden="true"
              />
            </div>
            <p
              className="font-display font-black leading-none"
              style={{
                color: "#0B1F2A",
                fontSize: "clamp(3.5rem, 7vw, 5.5rem)",
                lineHeight: 1,
              }}
            >
              OEMs
            </p>
          </div>

          {/* ── RIGHT: 2-column OEM card grid ── */}
          <div className="flex-1 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* LEFT COLUMN */}
              <div className="flex flex-col gap-4">
                {LEFT_OEMS.map((text, i) => (
                  <OEMCard key={text} text={text} index={i} visible={visible} />
                ))}
              </div>

              {/* RIGHT COLUMN */}
              <div className="flex flex-col gap-4">
                {RIGHT_OEMS.map((text, i) => (
                  <OEMCard key={text} text={text} index={i + LEFT_OEMS.length} visible={visible} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════
   OEMS PAGE — assembles both sections
════════════════════════════════════════ */
export function OEMsPage() {
  return (
    <>
      <OEMHero />
      <OEMContent />
    </>
  );
}
