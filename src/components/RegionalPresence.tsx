import { useState, useEffect, useRef, useCallback } from "react";
import { geoMercator, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";
import type { GeoPermissibleObjects } from "d3-geo";

/* ══════════════════════════════════════════════
   HIGHLIGHTED COUNTRIES — ISO 3166-1 numeric
   Map: code → display name
══════════════════════════════════════════════ */
const HIGHLIGHTED: Record<string, string> = {
  // ── Middle East & GCC ──
  "364": "Iran",
  "368": "Iraq",
  "682": "Saudi Arabia",
  "784": "United Arab Emirates",
  "634": "Qatar",
  "414": "Kuwait",
  "48": "Bahrain",
  "512": "Oman",
  "400": "Jordan",
  "760": "Syria",
  "422": "Lebanon",
  "887": "Yemen",
  "376": "Israel",
  "275": "Palestine",
  // ── West Africa ──
  "566": "Nigeria",
  "288": "Ghana",
  "120": "Cameroon",
  "384": "Côte d'Ivoire",
  "686": "Senegal",
  "324": "Guinea",
  "694": "Sierra Leone",
  "430": "Liberia",
  "768": "Togo",
  "204": "Benin",
  "854": "Burkina Faso",
  "466": "Mali",
  "270": "Gambia",
  "624": "Guinea-Bissau",
  "226": "Equatorial Guinea",
  "266": "Gabon",
  "178": "Republic of Congo",
  "180": "DR Congo",
  "562": "Niger",
  "478": "Mauritania",
  "140": "Central African Republic",
  "678": "São Tomé and Príncipe",
  // ── East Africa ──
  "404": "Kenya",
  "834": "Tanzania",
  "231": "Ethiopia",
  "800": "Uganda",
  "646": "Rwanda",
  "108": "Burundi",
  "706": "Somalia",
  "232": "Eritrea",
  "262": "Djibouti",
  "450": "Madagascar",
  "729": "Sudan",
  "728": "South Sudan",
  "174": "Comoros",
  // ── Southern Africa ──
  "710": "South Africa",
  "716": "Zimbabwe",
  "894": "Zambia",
  "72": "Botswana",
  "516": "Namibia",
  "24": "Angola",
  "454": "Malawi",
  "426": "Lesotho",
  "748": "Eswatini",
  "508": "Mozambique",
};

const RED = "#E1261C";
const RED_HOV = "#c41f17";
const GRAY = "#D1D5DB";
const GRAY_HOV = "#B8BFC9";
const STROKE = "#FFFFFF";
const NAVY = "#0B1F2A";

/* ── SVG viewport ── */
const W = 800;
const H = 500;

/* ── Corner decoration (brand geometric triangles) ── */
function CornerDecoration() {
  return (
    <div
      className="absolute top-0 right-0 pointer-events-none z-10"
      style={{ width: 108, height: 108 }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 108 108" xmlns="http://www.w3.org/2000/svg">
        {/* 2×3 grid of triangular cells (54×36 each) */}
        {/* Row 1 */}
        <polygon points="0,0 54,0 54,36" fill={RED} />
        <polygon points="54,0 108,0 54,36" fill="none" stroke={RED} strokeWidth="3" />
        {/* Row 2 */}
        <polygon points="0,36 54,36 0,72" fill="none" stroke={RED} strokeWidth="3" />
        <polygon points="54,36 108,36 108,72" fill={RED} />
        {/* Row 3 */}
        <polygon points="0,72 54,72 54,108" fill={RED} />
        <polygon points="54,72 108,72 108,108" fill={RED} opacity="0.4" />
      </svg>
    </div>
  );
}

/* ── Tooltip ── */
function Tooltip({ name, x, y }: { name: string; x: number; y: number }) {
  return (
    <div
      className="fixed z-50 pointer-events-none px-3 py-1.5 rounded-md text-white text-xs font-semibold shadow-lg"
      style={{
        background: NAVY,
        left: x + 14,
        top: y - 38,
        whiteSpace: "nowrap",
        border: `1.5px solid ${RED}`,
      }}
    >
      {name}
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

/* ── World map feature interface ── */
interface CountryFeature {
  type: "Feature";
  id: string | number;
  properties: { name?: string };
  geometry: GeoPermissibleObjects;
}

/* ══════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════ */
export function RegionalPresence() {
  const { ref, visible } = useReveal();
  const [countries, setCountries] = useState<CountryFeature[]>([]);
  const [tooltip, setTooltip] = useState<{ name: string; x: number; y: number } | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const mapRef = useRef<SVGSVGElement>(null);

  /* ── Load topojson once ── */
  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}world-110m.json`)
      .then((r) => r.json())
      .then((topology: Topology) => {
        const countriesGeom = topology.objects["countries"] as GeometryCollection;
        const featureCollection = feature(topology, countriesGeom);
        setCountries(featureCollection.features as unknown as CountryFeature[]);
      })
      .catch(console.error);
  }, []);

  /* ── d3 projection — centered on Africa/ME ── */
  const projection = geoMercator()
    .scale(190)
    .center([28, 8])
    .translate([W / 2, H / 2]);

  const path = geoPath(projection);

  /* ── Event handlers ── */
  const handleEnter = useCallback(
    (id: string, countryName: string, evt: React.MouseEvent) => {
      if (!HIGHLIGHTED[id]) return;
      setHovered(id);
      setTooltip({ name: countryName, x: evt.clientX, y: evt.clientY });
    },
    []
  );

  const handleMove = useCallback((evt: React.MouseEvent) => {
    setTooltip((t) => t ? { ...t, x: evt.clientX, y: evt.clientY } : null);
  }, []);

  const handleLeave = useCallback(() => {
    setHovered(null);
    setTooltip(null);
  }, []);

  return (
    <section
      ref={ref}
      className="relative bg-white overflow-hidden"
      aria-labelledby="regional-presence-heading"
      id="regional-presence"
    >
      {/* Corner decoration */}
      <CornerDecoration />

      {/* ─── Two-column layout ─── */}
      <div className="flex flex-col lg:flex-row min-h-[480px]">

        {/* ══ LEFT — Text content ══ */}
        <div
          className="w-full lg:w-[42%] flex items-center px-8 sm:px-12 lg:px-14 xl:px-16 py-14 lg:py-16"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s",
          }}
        >
          <div className="max-w-[420px]">
            {/* Title — BOLD RED */}
            <h2
              id="regional-presence-heading"
              className="font-display font-black mb-5 leading-tight"
              style={{ color: RED, fontSize: "clamp(2rem, 3.5vw, 2.75rem)" }}
            >
              Regional Presence
            </h2>

            {/* Intro paragraph */}
            <p className="text-gray-600 text-[15px] leading-relaxed mb-5">
              Headquartered in Dubai, United Arab Emirates, AVAC Horizons supports
              industrial and infrastructure projects across Africa and the Middle East
              through its global supplier network and regional operational partnerships.
            </p>

            {/* Sub-label */}
            <p className="text-gray-800 font-medium text-[15px] mb-3">
              Our primary areas of operation include:
            </p>

            {/* Bullet list */}
            <ul className="flex flex-col gap-2 mb-6 pl-0" role="list">
              {[
                "Southern Africa",
                "East Africa",
                "West Africa",
                "Middle East and GCC countries",
              ].map((item, i) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-[15px] text-gray-700"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateX(0)" : "translateX(10px)",
                    transition: `opacity 0.5s ease ${0.35 + i * 0.08}s, transform 0.5s ease ${0.35 + i * 0.08}s`,
                  }}
                >
                  <span className="shrink-0 w-[5px] h-[5px] rounded-full bg-gray-600" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>

            {/* Supporting paragraph */}
            <p
              className="text-gray-600 text-[15px] leading-relaxed"
              style={{ opacity: visible ? 1 : 0, transition: "opacity 0.7s ease 0.75s" }}
            >
              Through our strategic location and international sourcing capabilities,
              we are able to efficiently connect global manufacturers with project
              requirements across emerging markets.
            </p>
          </div>
        </div>

        {/* ══ RIGHT — Interactive SVG Map ══ */}
        <div
          className="w-full lg:w-[58%] bg-gray-50 relative overflow-hidden flex items-center justify-center min-h-[340px]"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 0.9s ease 0.3s",
          }}
          onMouseMove={handleMove}
        >
          <svg
            ref={mapRef}
            viewBox={`0 0 ${W} ${H}`}
            className="w-full h-full"
            style={{ maxHeight: 520, display: "block" }}
            aria-label="Interactive world map showing AVAC Horizons operational regions"
          >
            {countries.map((geo, idx) => {
              const id = String(geo.id ?? "");
              const name = HIGHLIGHTED[id] || (geo.properties?.name ?? "");
              const isHighlighted = Boolean(HIGHLIGHTED[id]);
              const isHov = hovered === id;
              const d = path(geo.geometry as GeoPermissibleObjects);
              if (!d) return null;
              return (
                <path
                  key={id || idx}
                  d={d}
                  fill={isHighlighted ? (isHov ? RED_HOV : RED) : GRAY}
                  stroke={STROKE}
                  strokeWidth={0.5}
                  style={{ cursor: isHighlighted ? "pointer" : "default", outline: "none" }}
                  onMouseEnter={(e) => handleEnter(id, name, e)}
                  onMouseLeave={handleLeave}
                />
              );
            })}
          </svg>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 flex items-center gap-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-md shadow-sm border border-gray-100 text-[11px]">
            <span className="flex items-center gap-1.5 text-gray-600">
              <span className="w-3 h-3 rounded-sm shrink-0" style={{ background: RED }} />
              Operational Regions
            </span>
            <span className="flex items-center gap-1.5 text-gray-400">
              <span className="w-3 h-3 rounded-sm shrink-0 bg-gray-300" />
              Other Regions
            </span>
          </div>
        </div>
      </div>

      {/* Tooltip */}
      {tooltip && <Tooltip name={tooltip.name} x={tooltip.x} y={tooltip.y} />}
    </section>
  );
}
