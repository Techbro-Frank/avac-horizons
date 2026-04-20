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

/* ════════════════════════
   5 capability cards
════════════════════════ */
const CARDS = [
  "Freight coordination and cargo consolidation",
  "Export documentation and customs compliance",
  "International shipping and transportation management",
  "Supply chain visibility and delivery tracking",
  "Delivery coordination to remote or complex project locations",
];

/* ════════════════════════════════════════
   LOGISTICS & SUPPLY CHAIN SECTION
   Left: navy title + description + 3+2 red card grid
   Right: truck image (contained rectangular)
   Background: off-white #F5F5F5
   — matches reference exactly
════════════════════════════════════════ */
export function LogisticsSupplySection() {
  const { ref, visible } = useReveal();

  return (
    <section
      ref={ref}
      id="logistics"
      aria-labelledby="logistics-heading"
      style={{
        background: "#F5F5F5",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s",
      }}
    >
      <div className="section-container py-14 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-10 lg:gap-14 items-start">

          {/* ── LEFT: Content ── */}
          <div>
            {/* Title */}
            <h2
              id="logistics-heading"
              className="font-display font-black leading-tight mb-6"
              style={{ color: "#0B1F2A", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
            >
              Logistics &amp; Supply Chain Management
            </h2>

            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed mb-4 max-w-lg">
              AVAC coordinates international logistics and supply chain operations to
              ensure efficient and reliable delivery of materials to project locations.
            </p>

            {/* Sub-label */}
            <p className="text-gray-700 text-sm font-semibold mb-6">
              Capabilities include:
            </p>

            {/* ── 3 + 2 Red cards grid ── */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {CARDS.map((card, i) => (
                <div
                  key={card}
                  id={`logistics-card-${i + 1}`}
                  className="group p-6 cursor-default transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
                  style={{
                    background: "#E1261C",
                    /* No rounded corners — sharp edges */
                    borderRadius: 0,
                  }}
                >
                  <p className="text-white text-sm font-medium leading-relaxed">
                    {card}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Truck image ── */}
          <div
            className="overflow-hidden group"
            style={{ borderRadius: 0 }}
          >
            <img
              src="/avac-horizons/svc-logistics-truck.png"
              alt="Long-haul truck driving on open highway — logistics and supply chain"
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              style={{ minHeight: 340 }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
