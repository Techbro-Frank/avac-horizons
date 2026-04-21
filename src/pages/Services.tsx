import { CoreServicesSection } from "@/components/CoreServicesSection";
import { ServiceDetailSection } from "@/components/ServiceDetailSection";
import { ConstructionLeasingSection } from "@/components/ConstructionLeasingSection";
import { FacilityEPCSection } from "@/components/FacilityEPCSection";
import { LogisticsSupplySection } from "@/components/LogisticsSupplySection";

/* ════════════════════════════════════════
   SERVICES PAGE
   Section order:
   1. Core Services header block
   2. Industrial Equipment, Materials & Safety Supply
   3. Construction Equipment Leasing & Site Support   ← custom layout
   4. Facility & Infrastructure + EPC Procurement     ← combined 2-col white section
════════════════════════════════════════ */
export function ServicesPage() {
  return (
    <>
      {/* ── 1. Core Services header ── */}
      <CoreServicesSection />

      {/* ── 2. Industrial Equipment, Materials & Safety Supply ── */}
      <ServiceDetailSection
        id="industrial-equipment"
        title="Industrial Equipment, Materials & Safety Supply"
        description="AVAC provides a broad range of industrial equipment, materials, operational supplies, and safety products required for construction, manufacturing, and industrial operations."
        subheading="Supply scope includes:"
        bullets={[
          "Heavy-duty industrial machinery and equipment",
          "Construction machinery and site equipment",
          "Electrical, electronic, and electro-mechanical systems",
          "Flow control, pumps, and fluid transfer systems",
          "Fluid and pneumatic power equipment",
          "Maintenance, repair, and operating supplies (MRO)",
          "Operating supplies and industrial consumables",
          "Industrial safety, security systems, and PPE",
          "Industrial lubricants, process chemicals, and water treatment chemicals for industrial and energy facilities",
        ]}
        imageSrc="/svc-industrial-equipment.png"
        imageAlt="Shipping containers and harbour crane at an industrial port"
        imagePosition="right"
      />

      {/* ── 3. Construction Equipment Leasing & Site Support ── */}
      <ConstructionLeasingSection />

      {/* ── 4. Facility & Infrastructure + EPC Procurement (combined) ── */}
      <FacilityEPCSection />

      {/* ── 5. Logistics & Supply Chain Management ── */}
      <LogisticsSupplySection />
    </>
  );
}
