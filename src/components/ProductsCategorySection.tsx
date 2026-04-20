/* ════════════════════════════════════════
   ProductsCategorySection
   LEFT column:  text (Construction & Industrial Systems) → forklift image
   RIGHT column: chemical worker image → text (Industrial Consumables)
   Matches reference exactly — alternating content/image layout
════════════════════════════════════════ */

/* ── Tiny brand mosaic icon (mirror of Products page icon) ── */
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

/* ── Category header: icon + bold title ── */
function CategoryHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <BrandMiniIcon />
      <h2
        className="font-display font-bold"
        style={{ color: "#0B1F2A", fontSize: "1rem" }}
      >
        {children}
      </h2>
    </div>
  );
}

/* ── Bullet list ── */
function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-2.5 pl-1">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-2.5 text-gray-600 text-sm leading-relaxed"
        >
          <span
            className="mt-2 shrink-0 w-[5px] h-[5px] rounded-full"
            style={{ background: "#6b7280" }}
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
export function ProductsCategorySection() {
  return (
    <section
      id="product-categories"
      className="bg-white"
      aria-label="Product Categories — Construction and Consumables"
    >
      <div className="section-container py-12 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* ══════════ LEFT COLUMN ══════════ */}
          <div className="flex flex-col gap-6">
            {/* 1. Category text */}
            <div>
              <CategoryHeader>Construction &amp; Industrial Systems</CategoryHeader>
              <BulletList
                items={[
                  "Building and construction materials",
                  "Electro-mechanical systems",
                  "Flow control and fluid transfer equipment",
                  "Material handling and packaging systems",
                ]}
              />
            </div>

            {/* 2. Forklift image below text */}
            <div className="overflow-hidden" style={{ borderRadius: 0 }}>
              <img
                src="/avac-horizons/products-forklift.png"
                alt="Yellow Hyster forklift operating inside industrial warehouse"
                className="w-full object-cover object-center"
                style={{ maxHeight: 280 }}
              />
            </div>
          </div>

          {/* ══════════ RIGHT COLUMN ══════════ */}
          <div className="flex flex-col gap-6">
            {/* 1. Chemical worker image on top */}
            <div className="overflow-hidden" style={{ borderRadius: 0 }}>
              <img
                src="/avac-horizons/products-chemical-worker.png"
                alt="Industrial worker in full PPE handling chemical containers in warehouse"
                className="w-full object-cover object-center"
                style={{ maxHeight: 280 }}
              />
            </div>

            {/* 2. Category text below image */}
            <div>
              <CategoryHeader>Industrial Consumables</CategoryHeader>
              <BulletList
                items={[
                  "Maintenance, repair and operating supplies",
                  "Operating supplies and equipment",
                  "Industrial lubricants and greases",
                  "Process chemicals and specialty chemicals",
                  "Water treatment chemicals and plant treatment solutions",
                  "Industrial materials and chemicals",
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
