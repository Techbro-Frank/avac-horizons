import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

/* ── Scroll reveal hook ── */
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

/* ── Red accent line ── */
function RedBar() {
  return <div className="w-14 h-1 mb-6" style={{ background: "#E1261C" }} aria-hidden="true" />;
}

/* ════════════════════════════════════════
   SECTION 1 — PAGE HEADER (dark navy hero)
════════════════════════════════════════ */
function AboutHero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "#0B1F2A", minHeight: 260 }}
      aria-label="About AVAC Horizons"
    >
      {/* Faint geometric grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 60px)," +
            "repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 60px)",
        }}
        aria-hidden="true"
      />
      {/* Red left accent bar */}
      <div
        className="absolute top-0 left-0 w-2 h-full"
        style={{ background: "#E1261C" }}
        aria-hidden="true"
      />
      <div className="relative z-10 section-container flex flex-col justify-center py-16 lg:py-20">
        <span
          className="text-xs font-bold uppercase tracking-[0.22em] mb-4"
          style={{ color: "#E1261C" }}
        >
          Who We Are
        </span>
        <h1
          className="font-display font-black text-white leading-tight"
          style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)" }}
        >
          About AVAC Horizons
        </h1>
        <p className="text-white/50 text-sm mt-4 max-w-xl uppercase tracking-widest font-medium">
          Global Procurement · Industrial Supply · Project Support
        </p>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════
   SECTION 2 — COMPANY OVERVIEW
════════════════════════════════════════ */
const OVERVIEW_PARAS = [
  "AVAC Horizons General Trading FZCO is a UAE-based procurement and industrial supply company headquartered in Dubai, specializing in delivering critical materials, equipment, and operational supplies to energy, infrastructure, and industrial projects across Africa and the Middle East.",
  "Our procurement model integrates global sourcing, supplier qualification, logistics coordination, and project execution support, ensuring that clients receive compliant products aligned with project specifications and delivery schedules.",
  "We support EPC contractors, engineering companies, and industrial operators by providing end-to-end procurement solutions including strategic sourcing, purchasing, consolidation, shipping, and delivery to project sites.",
  "Through our international supplier network and regional operational experience, AVAC enables efficient procurement even in remote and complex operating environments.",
];

function CompanyOverview() {
  const { ref, visible } = useReveal();
  return (
    <section
      ref={ref}
      className="bg-white section-padding"
      aria-labelledby="overview-heading"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.8s ease, transform 0.8s ease",
      }}
    >
      <div className="section-container">
        <div className="max-w-4xl mx-auto">
          <RedBar />
          <h2
            id="overview-heading"
            className="font-display font-black mb-10"
            style={{ color: "#0B1F2A", fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}
          >
            Company Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-7">
            {OVERVIEW_PARAS.map((para, i) => (
              <p
                key={i}
                className="text-gray-600 text-sm leading-loose"
                style={{
                  opacity: visible ? 1 : 0,
                  transition: `opacity 0.7s ease ${0.2 + i * 0.12}s`,
                }}
              >
                {para}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════
   SECTION 3 — MISSION & VISION
   Full-width bg image (grayscale + dark overlay)
   Centered floating navy card with dart image strip left
════════════════════════════════════════ */
function MissionVision() {
  const { ref, visible } = useReveal(0.05);
  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      aria-labelledby="mission-heading"
      style={{ minHeight: 520 }}
    >
      {/* Background image — grayscale + dark overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/about-industrial-bg.png"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center"
          style={{ filter: "grayscale(100%)", transform: "scale(1.04)" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "rgba(5,14,20,0.78)" }}
        />
      </div>

      {/* Centered card wrapper */}
      <div
        className="relative z-10 flex items-center justify-center py-16 lg:py-24 px-4"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(28px)",
          transition: "opacity 0.9s ease 0.15s, transform 0.9s ease 0.15s",
        }}
      >
        {/* Navy card — ~70% wide, sharp corners */}
        <div
          className="w-full flex overflow-hidden"
          style={{
            maxWidth: 860,
            background: "#0B1F2A",
            borderRadius: 0,
          }}
        >
          {/* LEFT — Dart image strip (~27% width) */}
          <div
            className="hidden md:block shrink-0"
            style={{ width: "27%", minHeight: 420 }}
          >
            <img
              src="/about-dart-target.png"
              alt="Dart hitting bullseye — precision and mission focus"
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* RIGHT — Mission + Vision text */}
          <div className="flex flex-col justify-center px-10 md:px-12 py-12 md:py-14 flex-1">
            {/* Mission */}
            <div className="mb-10">
              <h2
                id="mission-heading"
                className="font-display font-black text-white mb-4"
                style={{ fontSize: "clamp(1.7rem, 3vw, 2.4rem)" }}
              >
                Mission
              </h2>
              <p className="text-white/70 text-sm leading-relaxed">
                To deliver dependable, efficient, and cost-effective procurement and
                industrial supply solutions that support successful project execution for
                engineering, construction, and industrial operations across Africa and the
                Middle East.
              </p>
            </div>

            {/* Thin separator */}
            <div
              className="w-full h-px mb-10"
              style={{ background: "rgba(255,255,255,0.1)" }}
              aria-hidden="true"
            />

            {/* Vision */}
            <div>
              <h2
                className="font-display font-black text-white mb-4"
                style={{ fontSize: "clamp(1.7rem, 3vw, 2.4rem)" }}
              >
                Vision
              </h2>
              <p className="text-white/70 text-sm leading-relaxed">
                To become a leading and trusted procurement and industrial supply partner
                across Africa and the Middle East, recognized for operational excellence,
                reliable delivery, and strong support for global engineering contractors
                and industrial operators.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════
   SECTION 4 — CORE VALUES (bonus, clean grid)
════════════════════════════════════════ */
const VALUES = [
  { icon: "🎯", title: "Precision", text: "Every procurement decision is driven by technical accuracy and compliance with project specifications." },
  { icon: "🤝", title: "Reliability", text: "We deliver on our commitments — on time, within budget, and to the agreed standard." },
  { icon: "🌍", title: "Global Reach", text: "An international supplier network enables us to source specialised products from anywhere in the world." },
  { icon: "⚙️", title: "Operational Excellence", text: "Our processes are built to handle complex, high-stakes procurement environments without compromise." },
];

function CoreValues() {
  const { ref, visible } = useReveal();
  return (
    <section
      ref={ref}
      className="section-padding"
      style={{ background: "#F5F5F5" }}
      aria-labelledby="values-heading"
    >
      <div className="section-container">
        <div className="max-w-4xl mx-auto">
          <RedBar />
          <h2
            id="values-heading"
            className="font-display font-black mb-10"
            style={{ color: "#0B1F2A", fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}
          >
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {VALUES.map(({ icon, title, text }, i) => (
              <div
                key={title}
                className="bg-white p-8 border-l-4 transition-shadow duration-200 hover:shadow-lg"
                style={{
                  borderColor: "#E1261C",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(16px)",
                  transition: `opacity 0.6s ease ${0.15 + i * 0.1}s, transform 0.6s ease ${0.15 + i * 0.1}s, box-shadow 0.2s`,
                }}
              >
                <span className="text-2xl mb-4 block" aria-hidden="true">{icon}</span>
                <h3
                  className="font-display font-bold mb-3"
                  style={{ color: "#0B1F2A", fontSize: "1.05rem" }}
                >
                  {title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════
   SECTION 5 — CTA STRIP
════════════════════════════════════════ */
function AboutCTA() {
  return (
    <section
      className="section-padding"
      style={{ background: "#0B1F2A" }}
      aria-label="Contact AVAC Horizons"
    >
      <div className="section-container">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="font-display font-black text-white mb-4"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
          >
            Ready to Work With Us?
          </h2>
          <p className="text-white/60 text-sm mb-8 leading-relaxed">
            Get in touch with our team to discuss your procurement requirements, project
            timelines, and how AVAC Horizons can support your operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              id="about-cta-contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-bold text-white transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
              style={{ background: "#E1261C" }}
            >
              Contact Us →
            </Link>
            <Link
              to="/services"
              id="about-cta-services"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-bold text-white border transition-all duration-200 hover:border-white/60"
              style={{ border: "1px solid rgba(255,255,255,0.25)" }}
            >
              View Our Services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════
   ABOUT PAGE — assembles all sections
════════════════════════════════════════ */
export function AboutPage() {
  return (
    <>
      <AboutHero />
      <CompanyOverview />
      <MissionVision />
      <CoreValues />
      <AboutCTA />
    </>
  );
}
