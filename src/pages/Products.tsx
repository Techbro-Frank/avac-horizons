import { useEffect, useRef, useState } from "react";
import { ProductsCategorySection } from "@/components/ProductsCategorySection";
import { ProductsFinalSection } from "@/components/ProductsFinalSection";

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

/* ── Tiny brand mosaic icon (red square with white triangles) ── */
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

/* ════════════════════════════════════════
   PRODUCTS PAGE
   TOP: split navy title block (left ~30%) + port image (right ~70%)
   BOTTOM: two-column — text paragraphs | product categories + machinery image
════════════════════════════════════════ */
export function ProductsPage() {
  const { ref, visible } = useReveal();

  return (
    <main
      ref={ref}
      className="bg-white"
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 0.7s ease",
      }}
    >
      {/* ════════════ TOP SPLIT HERO — fixed 280px height ════════════ */}
      <div
        className="grid grid-cols-1 md:grid-cols-[30%_70%]"
        style={{ height: 280 }}
      >
        {/* LEFT — Navy title block */}
        <div
          className="flex items-center px-10"
          style={{ background: "#0B1F2A" }}
        >
          <h1
            id="products-heading"
            className="font-display font-black text-white leading-tight"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)" }}
          >
            Our Products
          </h1>
        </div>

        {/* RIGHT — Port / crane image */}
        <div className="overflow-hidden hidden md:block">
          <img
            src="/avac-horizons/products-port-hero.png"
            alt="Industrial seaport with cranes and cargo containers"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>

      {/* ════════════ BOTTOM TWO-COLUMN CONTENT ════════════ */}
      <div className="section-container py-14 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* ── LEFT: Text paragraphs + supporting image ── */}
          <div className="flex flex-col gap-6">
            <p className="text-gray-600 text-sm leading-loose">
              AVAC sources and supplies a wide range of industrial products through a global
              network of qualified manufacturers and suppliers. Our focus is on delivering
              reliable, specification-compliant materials that support project execution
              across multiple industries.
            </p>
            <p className="text-gray-600 text-sm leading-loose">
              Our procurement capability allows us to identify and supply both standard and
              specialized equipment, materials, and operational supplies required for
              industrial, construction, and infrastructure projects.
            </p>
            {/* Supporting image — global supply chain / industrial warehouse */}
            <div className="overflow-hidden" style={{ borderRadius: 0 }}>
              <img
                src="/avac-horizons/products-supply-chain.png"
                alt="Industrial warehouse team reviewing procurement inventory and supply chain operations"
                className="w-full object-cover object-center"
                style={{ maxHeight: 280 }}
              />
            </div>
          </div>

          {/* ── RIGHT: Product Categories ── */}
          <div>
            {/* "Product Categories" title — RED */}
            <h2
              className="font-display font-bold mb-6"
              style={{ color: "#E1261C", fontSize: "clamp(1.2rem, 2vw, 1.5rem)" }}
            >
              Product Categories
            </h2>

            {/* Category header row: icon + title */}
            <div className="flex items-center gap-3 mb-4">
              <BrandMiniIcon />
              <h3
                className="font-display font-bold"
                style={{ color: "#0B1F2A", fontSize: "1rem" }}
              >
                Industrial Equipment &amp; Machinery
              </h3>
            </div>

            {/* Bullet list */}
            <ul className="flex flex-col gap-2.5 mb-7 pl-1">
              {[
                "Heavy-duty machinery and industrial equipment",
                "Manufacturing and process equipment",
                "Industrial vehicles",
                "Specialized industrial equipment and components",
              ].map((item) => (
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

            {/* Machinery image below bullets */}
            <div className="overflow-hidden" style={{ borderRadius: 0 }}>
              <img
                src="/avac-horizons/products-machinery.png"
                alt="Complex industrial machinery — piping, valves and pressure vessels"
                className="w-full object-cover object-center"
                style={{ maxHeight: 260 }}
              />
            </div>
          </div>
        </div>
      </div>
      {/* ════════════ CATEGORY SECTION — Construction & Consumables ════════════ */}
      <ProductsCategorySection />

      {/* ════════════ FINAL DARK SECTION — Electrical, Energy, Power & Safety ════════════ */}
      <ProductsFinalSection />
    </main>
  );
}
