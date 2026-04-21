import { useEffect, useRef, useState } from "react";

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
   FACILITY & INFRASTRUCTURE + EPC PROCUREMENT
   Combined two-column section — white background
   Matches second reference image exactly
════════════════════════════════════════ */
export function FacilityEPCSection() {
  const { ref, visible } = useReveal();

  return (
    <section
      ref={ref}
      aria-label="Facility, Infrastructure and EPC Procurement services"
      className="bg-white"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s",
      }}
    >
      {/* Thin top border line */}
      <div className="w-full h-px bg-gray-200" />

      <div className="section-container py-14 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

          {/* ── LEFT: Facility & Infrastructure Equipment ── */}
          <div id="facility-infrastructure">
            <h2
              className="font-display font-black leading-tight mb-5"
              style={{ color: "#0B1F2A", fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)" }}
            >
              Facility &amp; Infrastructure Equipment
            </h2>

            <p className="text-gray-600 text-sm leading-relaxed mb-5">
              AVAC supplies equipment and systems required for industrial facilities, site
              operations, and infrastructure development, including:
            </p>

            <ul className="flex flex-col gap-2.5 mb-8">
              {[
                "Heating, ventilation, air conditioning and refrigeration (HVAC-R) systems",
                "Furniture, fixtures and equipment (FF&E)",
                "Automotive fleet equipment and spare parts",
                "Specialized industrial products and equipment",
              ].map((b) => (
                <li key={b} className="flex items-start gap-3 text-gray-600 text-sm leading-relaxed">
                  <span
                    className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-gray-400"
                    aria-hidden="true"
                  />
                  {b}
                </li>
              ))}
            </ul>

            {/* Facility image */}
            <div className="overflow-hidden rounded-sm">
              <img
                src="/svc-facility-machinery.png"
                alt="Close-up of industrial machinery gears and mechanical components"
                className="w-full aspect-[4/3] object-cover object-center hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* ── RIGHT: EPC Procurement Support ── */}
          <div id="epc-procurement">
            <h2
              className="font-display font-black leading-tight mb-5"
              style={{ color: "#0B1F2A", fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)" }}
            >
              EPC Procurement Support
            </h2>

            <p className="text-gray-600 text-sm leading-relaxed mb-5">
              AVAC supports engineering, procurement and construction (EPC) contractors with
              structured procurement solutions designed to integrate with project execution
              schedules. Services include:
            </p>

            <ul className="flex flex-col gap-2.5 mb-8">
              {[
                "Procurement planning aligned with project schedules",
                "Vendor coordination and supplier management",
                "Technical compliance verification",
                "Inspection, certification and documentation management",
              ].map((b) => (
                <li key={b} className="flex items-start gap-3 text-gray-600 text-sm leading-relaxed">
                  <span
                    className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-gray-400"
                    aria-hidden="true"
                  />
                  {b}
                </li>
              ))}
            </ul>

            {/* EPC image */}
            <div className="overflow-hidden rounded-sm mb-5">
              <img
                src="/svc-epc-worker.png"
                alt="Construction engineer with clipboard on industrial site"
                className="w-full aspect-[4/3] object-cover object-center hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Footer tagline below image */}
            <p className="text-gray-500 text-sm leading-relaxed italic">
              Our services help ensure that projects receive the required materials and
              equipment on time and within budget.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
