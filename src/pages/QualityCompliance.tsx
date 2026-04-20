import { QualityComplianceSection } from "@/components/QualityComplianceSection";

/* ════════════════════════════════════════
   QUALITY & COMPLIANCE PAGE
   Page header + main layered section
════════════════════════════════════════ */
function QualityHero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "#0B1F2A", minHeight: 220 }}
      aria-label="Quality and Compliance"
    >
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 60px)," +
            "repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 60px)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute top-0 left-0 w-2 h-full"
        style={{ background: "#E1261C" }}
        aria-hidden="true"
      />
      <div className="relative z-10 section-container flex flex-col justify-center py-14 lg:py-18">
        <span
          className="text-xs font-bold uppercase tracking-[0.22em] mb-4"
          style={{ color: "#E1261C" }}
        >
          Standards &amp; Integrity
        </span>
        <h1
          className="font-display font-black text-white leading-tight"
          style={{ fontSize: "clamp(2rem, 4.5vw, 3.4rem)" }}
        >
          Quality &amp; Compliance
        </h1>
        <p className="text-white/50 text-sm mt-4 max-w-xl leading-relaxed">
          Every material we supply meets verified international quality standards — documented, traceable, and compliant.
        </p>
      </div>
    </section>
  );
}

export function QualityCompliancePage() {
  return (
    <>
      <QualityHero />
      <QualityComplianceSection />
    </>
  );
}
