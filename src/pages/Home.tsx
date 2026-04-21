import { Link } from "react-router-dom";
import { ArrowRight, Zap, Shield, Globe, TrendingUp, Package, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Hero } from "@/components/layout/Hero";
import { IndustriesSection } from "@/components/IndustriesSection";
import { RegionalPresence } from "@/components/RegionalPresence";
import { StrengthsClientsSection } from "@/components/StrengthsClientsSection";
import { FinalCTASection } from "@/components/FinalCTASection";

/* ─── DATA ─── */
const stats = [
  { value: "10+", label: "Years Experience" },
  { value: "150+", label: "Projects Delivered" },
  { value: "40+", label: "Enterprise Clients" },
  { value: "MENA", label: "Region Covered" },
];

const services = [
  {
    icon: Package,
    title: "Industrial Equipment & Safety Supply",
    description:
      "End-to-end supply of certified industrial equipment, raw materials, and safety products.",
    href: "/services#industrial-equipment",
  },
  {
    icon: Zap,
    title: "Construction Equipment Leasing",
    description:
      "Flexible leasing solutions for heavy construction machinery with full site support.",
    href: "/services#construction-leasing",
  },
  {
    icon: Shield,
    title: "EPC Procurement Support",
    description:
      "Comprehensive procurement support for Engineering, Procurement & Construction projects.",
    href: "/services#epc-procurement",
  },
  {
    icon: Globe,
    title: "Facility & Infrastructure",
    description:
      "Specialist equipment supply for facility management and large-scale infrastructure.",
    href: "/services#facility-infrastructure",
  },
  {
    icon: Truck,
    title: "Logistics & Supply Chain",
    description:
      "Integrated logistics and supply chain management for complex operations.",
    href: "/services#logistics",
  },
  {
    icon: TrendingUp,
    title: "Strategic Sourcing",
    description:
      "Data-driven sourcing strategies that reduce costs and ensure supply continuity.",
    href: "/services",
  },
];

/* ─── PAGE ─── */
export function HomePage() {
  return (
    <>
      {/* ══ HERO ══ */}
      <Hero />



      {/* ══ SERVICES OVERVIEW ══ */}
      <section
        className="section-padding bg-brand-light-gray"
        aria-labelledby="services-section-heading"
      >
        <div className="section-container">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
            <div>
              <span className="label-eyebrow mb-4">What We Do</span>
              <h2
                id="services-section-heading"
                className="heading-section max-w-xl"
              >
                Services Built for Global Industries
              </h2>
            </div>
            <Button variant="outline" size="default" asChild className="self-start lg:self-auto shrink-0">
              <Link to="/services" id="services-view-all-link">
                View All Services <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {services.map(({ icon: Icon, title, description, href }, i) => (
              <Link
                key={title}
                to={href}
                id={`service-card-${i}`}
                className="group card-hover block p-6 no-underline"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                {/* Icon */}
                <div className="w-11 h-11 rounded-lg bg-navy-800 flex items-center justify-center mb-5 transition-all duration-300 group-hover:bg-accent-500 group-hover:scale-110">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                {/* Text */}
                <h3 className="font-display font-semibold text-navy-800 text-base mb-2 leading-snug group-hover:text-accent-500 transition-colors duration-200">
                  {title}
                </h3>
                <p className="text-brand-dark-gray text-sm leading-relaxed">
                  {description}
                </p>
                {/* Arrow */}
                <div className="mt-5 flex items-center gap-1.5 text-accent-500 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  Learn more <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ INDUSTRIES WE SERVE ══ */}
      <IndustriesSection />

      {/* ══ REGIONAL PRESENCE ══ */}
      <RegionalPresence />

      {/* ══ STRENGTHS & CLIENTS ══ */}
      <StrengthsClientsSection />


      {/* ══ FINAL POSITIONING CTA ══ */}
      <FinalCTASection />
    </>
  );
}
