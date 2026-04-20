import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown } from "lucide-react";

/* ─── tiny hook: fires once element is in view ─── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

export function Hero() {
  const { ref, visible } = useReveal();

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col overflow-hidden bg-[#060f14]"
      aria-labelledby="hero-heading"
      id="hero"
    >
      {/* ══════════════════════════════════
          BACKGROUND LAYER
      ══════════════════════════════════ */}

      {/* Photo — full bleed, fades left on desktop */}
      <div className="absolute inset-0 z-0">
        <img
          src="/avac-horizons/hero-industrial.png"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center transition-transform duration-[12000ms] ease-out"
          style={{ transform: visible ? "scale(1.06)" : "scale(1)" }}
        />
        {/* Gradient mask — dark on left, soft on right (desktop) */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#060f14] via-[#060f14]/85 to-[#060f14]/30 lg:to-transparent" />
        {/* Bottom dark fade */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#060f14] to-transparent" />
        {/* Top fade */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-navy-800/80 to-transparent" />
      </div>

      {/* ── Dot grid texture (left panel only) ── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
          maskImage: "linear-gradient(to right, black 0%, black 45%, transparent 70%)",
          WebkitMaskImage: "linear-gradient(to right, black 0%, black 45%, transparent 70%)",
        }}
      />

      {/* ── Red geometric accent shapes ── */}
      {/* Top-right large triangle */}
      <div
        className="absolute z-[1] pointer-events-none"
        style={{
          top: "-60px",
          right: "-40px",
          width: "320px",
          height: "320px",
          background: "linear-gradient(135deg, #E1261C22 0%, transparent 60%)",
          clipPath: "polygon(100% 0%, 0% 0%, 100% 100%)",
        }}
      />
      {/* Bottom-left sharp line accent */}
      <div
        className="absolute z-[2] pointer-events-none"
        style={{
          bottom: "80px",
          left: "0",
          width: "180px",
          height: "3px",
          background: "linear-gradient(to right, #E1261C, transparent)",
        }}
      />
      {/* Floating accent bar — desktop top right */}
      <div
        className="hidden lg:block absolute z-[2] pointer-events-none"
        style={{
          top: "34%",
          right: "5%",
          width: "3px",
          height: "80px",
          background: "linear-gradient(to bottom, transparent, #E1261C, transparent)",
        }}
      />
      {/* Red glow blob */}
      <div
        className="absolute z-0 pointer-events-none"
        style={{
          top: "20%",
          left: "-100px",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(225,38,28,0.07) 0%, transparent 70%)",
        }}
      />

      {/* ══════════════════════════════════
          CONTENT
      ══════════════════════════════════ */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="section-container w-full py-28 lg:py-0 lg:min-h-screen lg:flex lg:items-center">
          <div className="max-w-[620px]">

            {/* ── Eyebrow label ── */}
            <div
              className="transition-all duration-700 ease-out"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
                transitionDelay: "100ms",
              }}
            >
              <span className="inline-flex items-center gap-3 mb-6">
                <span className="block w-8 h-[2px] bg-accent-500 rounded-full" />
                <span className="text-accent-400 text-xs font-bold tracking-[0.2em] uppercase">
                  Industrial Procurement &amp; Supply
                </span>
              </span>
            </div>

            {/* ── Main heading ── */}
            <div
              className="transition-all duration-700 ease-out"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                transitionDelay: "220ms",
              }}
            >
              <h1
                id="hero-heading"
                className="font-display font-black text-white leading-[1.08] tracking-tight mb-6"
                style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}
              >
                Integrated{" "}
                <span className="relative inline-block">
                  <span className="text-accent-500">Procurement</span>
                </span>
                <br />
                <span className="text-white/90">for Modern</span>{" "}
                <span
                  className="relative inline-block"
                  style={{
                    WebkitTextStroke: "1px rgba(255,255,255,0.15)",
                  }}
                >
                  Industry
                </span>
              </h1>
            </div>

            {/* ── Supporting text ── */}
            <div
              className="transition-all duration-700 ease-out"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transitionDelay: "360ms",
              }}
            >
              <p className="text-white/60 text-lg leading-relaxed mb-10 max-w-[480px]">
                Delivering reliable procurement, industrial supply, and project support
                solutions across{" "}
                <span className="text-white/85 font-medium">Africa</span> and the{" "}
                <span className="text-white/85 font-medium">Middle East</span>.
              </p>
            </div>

            {/* ── CTA Buttons ── */}
            <div
              className="transition-all duration-700 ease-out"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transitionDelay: "480ms",
              }}
            >
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                {/* Primary */}
                <Link
                  to="/services"
                  id="hero-cta-services"
                  className="group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-md px-7 py-3.5 text-sm font-bold text-white transition-all duration-300 sm:w-auto w-full"
                  style={{ background: "#E1261C" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                      "0 0 28px rgba(225,38,28,0.55), 0 4px 12px rgba(225,38,28,0.3)";
                    (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.02)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
                    (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)";
                  }}
                >
                  {/* Shine sweep on hover */}
                  <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-500 ease-in-out" />
                  Explore Services
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>

                {/* Secondary */}
                <Link
                  to="/about"
                  id="hero-cta-about"
                  className="group inline-flex items-center justify-center gap-2.5 rounded-md border border-white/25 bg-white/5 px-7 py-3.5 text-sm font-bold text-white/85 backdrop-blur-sm transition-all duration-300 hover:border-accent-500 hover:bg-accent-500 hover:text-white sm:w-auto w-full"
                >
                  Learn About Us
                  <ArrowRight className="w-4 h-4 opacity-60 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* ── Trust bar ── */}
            <div
              className="transition-all duration-700 ease-out mt-12"
              style={{
                opacity: visible ? 1 : 0,
                transitionDelay: "620ms",
              }}
            >
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                {[
                  { value: "10+", label: "Years Active" },
                  { value: "MENA", label: "Region Covered" },
                  { value: "OEM", label: "Certified Supply" },
                ].map(({ value, label }, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    {i > 0 && (
                      <span className="hidden sm:block w-px h-7 bg-white/15" />
                    )}
                    <div>
                      <p className="font-display font-black text-accent-400 text-xl leading-none">
                        {value}
                      </p>
                      <p className="text-white/40 text-[11px] font-medium tracking-wider uppercase mt-0.5">
                        {label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div
        className="relative z-10 flex justify-center pb-8 transition-all duration-700"
        style={{ opacity: visible ? 1 : 0, transitionDelay: "900ms" }}
      >
        <a
          href="#services-overview"
          className="flex flex-col items-center gap-1.5 text-white/30 hover:text-white/60 transition-colors duration-200 group"
          aria-label="Scroll down"
        >
          <span className="text-[10px] font-medium tracking-[0.2em] uppercase">Scroll</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </a>
      </div>

      {/* ── Bottom border accent ── */}
      <div className="absolute inset-x-0 bottom-0 z-10 h-[2px]">
        <div className="h-full w-full bg-gradient-to-r from-transparent via-accent-500/50 to-transparent" />
      </div>
    </section>
  );
}
