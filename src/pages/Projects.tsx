import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";

/* ── Scroll reveal ── */
function useReveal(threshold = 0.08) {
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

/* ─────────── PROJECT DATA ─────────── */
interface ProjectItem {
  id: string;
  client: string;
  title: string;
  location: string;
  flag: string;          // emoji flag
  scope: string[];
  accent: string;        // title color
}

const projects: ProjectItem[] = [
  {
    id: "ccs-jv",
    client: "CCS JV –",
    title: "Temporary Buildings Project\nAfungi Project Site, Mozambique",
    location: "Afungi, Mozambique",
    flag: "🇲🇿",
    accent: "#E1261C",
    scope: [
      "Supply of Furniture for temporary buildings projects — field offices, warehouses, workshops",
      "Supply of Power tools",
      "Supply of construction consumable tools",
      "Supply of PPE",
      "Supply of REINFORCEMENT STEEL",
      "Supply of Electrical cables",
    ],
  },
  {
    id: "nlng-t7",
    client: "",
    title: "NLNG T7 Bonny Project –\nWest Africa",
    location: "Bonny Island, Nigeria",
    flag: "🇳🇬",
    accent: "#E1261C",
    scope: [
      "Rental of power generators",
      "Supply of furniture for temporary accommodation",
      "Supply of Air conditioning units and accessories for temporary housing",
      "Supply of PPE",
      "Supply of electrical materials and consumables",
      "Supply of European and Chinese Kitchen and Laundry Equipment",
      "Supply of chemicals for the maintenance of water treatment plants.",
    ],
  },
  {
    id: "bonga-north",
    client: "",
    title: "Bonga North Project",
    location: "Bonga, Nigeria",
    flag: "🇳🇬",
    accent: "#E1261C",
    scope: [
      "Supply of Riggings and lifting accessories for the Pre-campaign and main campaign.",
      "Torque tools spread rental for the bonga north project",
    ],
  },
];

/* ─────────── PROJECT CARD ─────────── */
function ProjectCard({ project, index }: { project: ProjectItem; index: number }) {
  const { ref, visible } = useReveal(0.05);
  return (
    <article
      ref={ref as React.RefObject<HTMLElement>}
      id={`project-${project.id}`}
      className="flex flex-col"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.55s ease ${index * 0.12}s, transform 0.55s ease ${index * 0.12}s`,
      }}
      aria-label={`Project: ${project.title.replace("\n", " ")}`}
    >
      {/* Card top — navy with red accent bar at bottom */}
      <div
        className="flex flex-col flex-1 p-7 sm:p-8"
        style={{ background: "#0B1F2A" }}
      >
        {/* Client & title */}
        <div className="mb-5">
          {project.client && (
            <p
              className="font-display font-bold text-sm mb-1"
              style={{ color: project.accent }}
            >
              {project.client}
            </p>
          )}
          <h3
            className="font-display font-bold leading-tight whitespace-pre-line"
            style={{ color: project.accent, fontSize: "1.1rem" }}
          >
            {project.title}
          </h3>
        </div>

        {/* Location badge */}
        <div className="flex items-center gap-1.5 mb-6">
          <MapPin className="w-3.5 h-3.5 shrink-0" style={{ color: "rgba(255,255,255,0.4)" }} />
          <span className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
            {project.flag} {project.location}
          </span>
        </div>

        {/* Scope bullets */}
        <ul className="flex flex-col gap-2.5 flex-1">
          {project.scope.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-2.5 text-sm leading-relaxed"
              style={{ color: "rgba(255,255,255,0.78)" }}
            >
              <span
                className="mt-[7px] shrink-0 w-[5px] h-[5px] rounded-full"
                style={{ background: "rgba(255,255,255,0.45)" }}
                aria-hidden="true"
              />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Red accent bar at bottom */}
      <div style={{ height: 6, background: "#E1261C" }} />
    </article>
  );
}

/* ─────────── STATS ─────────── */
const stats = [
  { value: "3+", label: "Landmark Projects" },
  { value: "3", label: "Countries Served" },
  { value: "100%", label: "On-Time Delivery" },
];

/* ════════════════════════════════════════
   PROJECTS PAGE
════════════════════════════════════════ */
export function ProjectsPage() {
  const heroReveal = useReveal(0.01);

  return (
    <main className="bg-white" id="projects-main">

      {/* ════════ HERO ════════ */}
      <section
        className="relative overflow-hidden"
        style={{ minHeight: 340 }}
        aria-label="Our Projects hero"
      >
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="/projects-hero.png"
            alt="Industrial project site at dusk"
            className="w-full h-full object-cover object-center"
          />
          {/* Dark overlay */}
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(135deg, rgba(11,31,42,0.92) 0%, rgba(11,31,42,0.70) 55%, rgba(225,38,28,0.25) 100%)" }}
          />
        </div>

        {/* Hero content */}
        <div
          ref={heroReveal.ref as React.RefObject<HTMLDivElement>}
          className="relative section-container py-20 lg:py-28 flex flex-col items-start"
          style={{
            opacity: heroReveal.visible ? 1 : 0,
            transform: heroReveal.visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <span
            className="inline-block text-xs font-bold uppercase tracking-[0.18em] mb-4 px-3 py-1.5 rounded-sm"
            style={{ background: "#E1261C", color: "white" }}
          >
            Portfolio
          </span>
          <h1
            id="projects-heading"
            className="font-display font-black text-white leading-tight mb-4"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            Our Projects
          </h1>
          <p
            className="text-white/65 max-w-xl leading-relaxed"
            style={{ fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)" }}
          >
            A track record of delivering complex industrial procurement and supply
            solutions across Africa, the Middle East, and beyond.
          </p>
        </div>
      </section>

      {/* ════════ STATS STRIP ════════ */}
      <div style={{ background: "#E1261C" }}>
        <div className="section-container py-5">
          <dl className="grid grid-cols-3 gap-0 divide-x divide-white/20">
            {stats.map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center py-3 lg:py-0 text-center">
                <dt className="font-display font-black text-white" style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)" }}>
                  {value}
                </dt>
                <dd className="text-white/75 text-xs font-medium uppercase tracking-wider mt-0.5">
                  {label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* ════════ INTRO ════════ */}
      <section className="section-container py-14 lg:py-16">
        <div className="max-w-3xl">
          <h2
            className="font-display font-bold mb-4"
            style={{ color: "#0B1F2A", fontSize: "clamp(1.3rem, 2.5vw, 1.75rem)" }}
          >
            Delivering Excellence Across Complex Projects
          </h2>
          <p className="text-gray-600 text-sm leading-loose mb-3">
            AVAC Horizons has built a strong reputation as a trusted procurement and supply partner
            on some of the most challenging industrial projects in West and East Africa. From temporary
            accommodation build-outs to specialist rigging and lifting equipment, we mobilise rapidly
            and deliver reliably.
          </p>
          <p className="text-gray-600 text-sm leading-loose">
            Each project below represents our commitment to quality, compliance, and operational
            excellence — providing the right equipment, at the right time, to the right location.
          </p>
        </div>
      </section>

      {/* ════════ PROJECT CARDS ════════ */}
      <section
        className="section-container pb-16 lg:pb-20"
        aria-label="Project portfolio cards"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </section>

      {/* ════════ CTA ════════ */}
      <section
        className="border-t border-gray-100"
        style={{ background: "#F8F9FA" }}
        aria-label="Work with us"
      >
        <div className="section-container py-14 lg:py-16 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h2
              className="font-display font-bold mb-1"
              style={{ color: "#0B1F2A", fontSize: "clamp(1.1rem, 2vw, 1.4rem)" }}
            >
              Have a project in mind?
            </h2>
            <p className="text-gray-500 text-sm">
              Get in touch with our team to discuss your procurement and supply requirements.
            </p>
          </div>
          <Link
            to="/contact"
            id="projects-cta"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white px-7 py-3.5 rounded-md transition-colors duration-200 shrink-0"
            style={{ background: "#E1261C" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#c41f17")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#E1261C")}
          >
            Get in Touch <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </main>
  );
}
