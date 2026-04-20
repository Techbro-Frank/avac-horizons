/* ════════════════════════════════════════
   ProductsFinalSection
   DARK NAVY — #0B1F2A background
   LEFT  col: Electrical & Communication → Electronics image
               Energy & Environmental    → Wind Turbines image
   RIGHT col: Power & Fluid Systems
              Safety & Industrial Protection
              Facility & Infrastructure Equipment
              PPE Worker image (bottom)
   Matches reference PDF page 10 exactly
════════════════════════════════════════ */

/* ── Tiny red brand mosaic icon ── */
function BrandMiniIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 60 60"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="shrink-0"
    >
      <rect width="60" height="60" fill="#E1261C" />
      <polygon points="0,0 20,0 0,20" fill="white" />
      <polygon points="20,0 40,0 30,20" fill="white" />
      <polygon points="40,0 60,0 60,20" fill="white" />
      <polygon points="0,20 20,30 0,40" fill="white" />
      <polygon points="30,20 40,30 30,40 20,30" fill="white" />
      <polygon points="60,20 60,40 40,30" fill="white" />
      <polygon points="0,40 0,60 20,60" fill="white" />
      <polygon points="20,60 40,60 30,40" fill="white" />
      <polygon points="40,60 60,60 60,40" fill="white" />
    </svg>
  );
}

/* ── Category header: icon + bold white title ── */
function CategoryHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <BrandMiniIcon />
      <h3
        className="font-display font-bold text-white"
        style={{ fontSize: "1.05rem" }}
      >
        {children}
      </h3>
    </div>
  );
}

/* ── Bullet list — white/light-gray text ── */
function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-2 pl-1">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-2.5 text-sm leading-relaxed"
          style={{ color: "rgba(255,255,255,0.82)" }}
        >
          <span
            className="mt-2 shrink-0 w-[5px] h-[5px] rounded-full"
            style={{ background: "rgba(255,255,255,0.6)" }}
            aria-hidden="true"
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

/* ════════════════════════════════════════
   EXPORTED SECTION
════════════════════════════════════════ */
export function ProductsFinalSection() {
  return (
    <section
      id="product-categories-final"
      style={{ background: "#0B1F2A" }}
      aria-label="Product Categories — Electrical, Energy, Power and Safety"
      className="py-16"
    >
      <div className="section-container">
        {/*
          Desktop: 2-col grid
          Mobile:  single column, order matches spec
        */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* ══════════ LEFT COLUMN ══════════ */}
          <div className="flex flex-col gap-10">

            {/* BLOCK 1 — Electrical & Communication Systems */}
            <div>
              <CategoryHeader>Electrical &amp; Communication Systems</CategoryHeader>
              <BulletList
                items={[
                  "Electrical and electronic equipment",
                  "Sensors, transducers, and detectors",
                  "Network and communication equipment",
                ]}
              />
              {/* Electronics / circuit board image */}
              <div className="overflow-hidden mt-6" style={{ borderRadius: 0 }}>
                <img
                  src="/avac-horizons/products-electronics.png"
                  alt="Electronics circuit board with sensors and transducers"
                  className="w-full object-cover object-center"
                  style={{ maxHeight: 260 }}
                />
              </div>
            </div>

            {/* BLOCK 2 — Energy & Environmental Solutions */}
            <div>
              <CategoryHeader>Energy &amp; Environmental Solutions</CategoryHeader>
              <BulletList
                items={[
                  "Clean energy technologies",
                  "Water treatment systems",
                  "Waste management solutions",
                ]}
              />
              {/* Wind turbines / energy image */}
              <div className="overflow-hidden mt-6" style={{ borderRadius: 0 }}>
                <img
                  src="/avac-horizons/products-wind-energy.png"
                  alt="Wind turbines and solar panels in a desert energy park"
                  className="w-full object-cover object-center"
                  style={{ maxHeight: 260 }}
                />
              </div>
            </div>

          </div>

          {/* ══════════ RIGHT COLUMN ══════════ */}
          <div className="flex flex-col gap-10">

            {/* BLOCK 1 — Power & Fluid Systems */}
            <div>
              <CategoryHeader>Power &amp; Fluid Systems</CategoryHeader>
              <BulletList
                items={[
                  "Fluid and pneumatic power equipment",
                  "Pumps and fluid transfer systems",
                ]}
              />
            </div>

            {/* BLOCK 2 — Safety & Industrial Protection */}
            <div>
              <CategoryHeader>Safety &amp; Industrial Protection</CategoryHeader>
              <BulletList
                items={[
                  "Personal protective equipment (PPE)",
                  "Industrial safety and security equipment",
                ]}
              />
            </div>

            {/* BLOCK 3 — Facility & Infrastructure Equipment */}
            <div>
              <CategoryHeader>Facility &amp; Infrastructure Equipment</CategoryHeader>
              <BulletList
                items={[
                  "HVAC and refrigeration systems",
                  "Furniture, fixtures and equipment",
                  "Automotive fleet equipment and spare parts",
                ]}
              />
            </div>

            {/* PPE worker image — bottom of right column */}
            <div className="overflow-hidden mt-2" style={{ borderRadius: 0 }}>
              <img
                src="/avac-horizons/products-ppe-worker.png"
                alt="Safety worker in full PPE — goggles, mask and gloves inspecting a component"
                className="w-full object-cover object-center"
                style={{ maxHeight: 320 }}
              />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
