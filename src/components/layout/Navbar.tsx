import { useState, useRef, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { AvacLogo } from "@/components/AvacLogo";

/* ─────────────── NAV DATA ─────────────── */
const servicesItems = [
  {
    label: "Industrial Equipment, Materials & Safety Supply",
    href: "/services#industrial-equipment",
    description: "End-to-end supply of industrial equipment, raw materials, and safety products.",
  },
  {
    label: "Construction Equipment Leasing & Site Support",
    href: "/services#construction-leasing",
    description: "Flexible leasing solutions for construction machinery and full site support.",
  },
  {
    label: "Facility & Infrastructure Equipment",
    href: "/services#facility-infrastructure",
    description: "Specialist equipment for facility management and large-scale infrastructure.",
  },
  {
    label: "EPC Procurement Support",
    href: "/services#epc-procurement",
    description: "Comprehensive procurement support for Engineering, Procurement & Construction.",
  },
  {
    label: "Logistics & Supply Chain Management",
    href: "/services#logistics",
    description: "Integrated logistics and supply chain solutions for complex operations.",
  },
];

const productsItems = [
  { label: "Industrial Equipment & Machinery", href: "/products#industrial-machinery" },
  { label: "Construction & Industrial Systems", href: "/products#construction-systems" },
  { label: "Industrial Consumables", href: "/products#consumables" },
  { label: "Electrical & Communication Systems", href: "/products#electrical-comms" },
  { label: "Power & Fluid Systems", href: "/products#power-fluid" },
  { label: "Safety & Industrial Protection", href: "/products#safety-protection" },
  { label: "Facility & Infrastructure Equipment", href: "/products#facility-infra" },
];

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services", dropdown: servicesItems },
  { label: "Products", href: "/products", dropdown: productsItems },
  { label: "Quality & Compliance", href: "/quality-compliance" },
  { label: "OEMs", href: "/oems" },
  { label: "Our Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

/* ─────────────── DESKTOP DROPDOWN ─────────────── */
function DesktopDropdown({
  items,
  isWide = false,
}: {
  items: { label: string; href: string; description?: string }[];
  isWide?: boolean;
}) {
  return (
    <div
      className={cn(
        "absolute top-full left-1/2 -translate-x-1/2 mt-0 pt-3 z-50",
        isWide ? "w-[680px]" : "w-72"
      )}
    >
      <div className="bg-white rounded-xl shadow-soft-xl border border-brand-mid-gray overflow-hidden">
        <div className={cn("p-2", isWide && "grid grid-cols-2 gap-0.5")}>
          {items.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="group flex flex-col gap-0.5 px-4 py-3 rounded-lg hover:bg-navy-50 transition-colors duration-150"
            >
              <span className="text-sm font-medium text-navy-800 group-hover:text-accent-500 transition-colors duration-150 leading-snug">
                {item.label}
              </span>
              {item.description && (
                <span className="text-xs text-brand-dark-gray leading-relaxed">
                  {item.description}
                </span>
              )}
            </Link>
          ))}
        </div>
        {/* Footer link */}
        <div className="border-t border-brand-mid-gray px-4 py-3 bg-brand-light-gray">
          <Link
            to={isWide ? "/services" : "/products"}
            className="flex items-center gap-2 text-xs font-semibold text-accent-500 hover:text-accent-600 transition-colors"
          >
            View all {isWide ? "services" : "products"}
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ─────────────── NAVBAR ─────────────── */
export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();

  // Close mobile on route change
  useEffect(() => {
    setIsMobileOpen(false);
    setMobileExpanded(null);
    setActiveDropdown(null);
  }, [location.pathname]);

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileOpen]);

  const handleMouseEnter = (label: string) => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    hoverTimeout.current = setTimeout(() => setActiveDropdown(null), 120);
  };

  const isActive = (href: string) =>
    href === "/" ? location.pathname === "/" : location.pathname.startsWith(href);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-[#0B1F2A] shadow-[0_4px_24px_rgba(0,0,0,0.35)]"
            : "bg-[#0B1F2A]"
        )}
      >
        <nav
          className="section-container flex items-center justify-between h-[70px] lg:h-20"
          aria-label="Main navigation"
        >
          {/* ── Logo ── */}
          <Link
            to="/"
            className="flex items-center shrink-0 group"
            aria-label="AVAC Horizons — Home"
            id="nav-logo"
          >
            <AvacLogo iconSize={38} showText={true} dark={true} className="group-hover:opacity-90 transition-opacity duration-200" />
          </Link>

          {/* ── Desktop Nav ── */}
          <ul className="hidden xl:flex items-center gap-0.5" role="list">
            {navLinks.map((item) => (
              <li key={item.label} className="relative">
                {item.dropdown ? (
                  <div
                    onMouseEnter={() => handleMouseEnter(item.label)}
                    onMouseLeave={handleMouseLeave}
                    className="relative"
                  >
                    <button
                      className={cn(
                        "flex items-center gap-1 px-3.5 py-2 rounded-md text-[13.5px] font-medium transition-colors duration-200",
                        isActive(item.href)
                          ? "text-accent-400"
                          : "text-white/80 hover:text-white"
                      )}
                      aria-expanded={activeDropdown === item.label}
                      aria-haspopup="true"
                      id={`nav-${item.label.toLowerCase().replace(/\s/g, "-")}`}
                    >
                      {item.label}
                      <ChevronDown
                        className={cn(
                          "w-3.5 h-3.5 transition-transform duration-200",
                          activeDropdown === item.label && "rotate-180"
                        )}
                      />
                    </button>

                    {activeDropdown === item.label && (
                      <DesktopDropdown
                        items={item.dropdown}
                        isWide={item.label === "Services"}
                      />
                    )}
                  </div>
                ) : (
                  <NavLink
                    to={item.href}
                    end={item.href === "/"}
                    id={`nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                    className={({ isActive }) =>
                      cn(
                        "relative block px-3.5 py-2 rounded-md text-[13.5px] font-medium transition-colors duration-200 group",
                        isActive
                          ? "text-accent-400"
                          : "text-white/80 hover:text-white"
                      )
                    }
                  >
                    {({ isActive: active }) => (
                      <>
                        {item.label}
                        <span
                          className={cn(
                            "absolute bottom-1 left-3.5 right-3.5 h-[2px] rounded-full bg-accent-500 transition-all duration-200 origin-left",
                            active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                          )}
                        />
                      </>
                    )}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>

          {/* ── Desktop CTA ── */}
          <div className="hidden xl:flex items-center">
            <Button variant="accent" size="sm" asChild>
              <Link to="/contact" id="nav-cta">
                Get in Touch <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </Button>
          </div>

          {/* ── Mobile Hamburger ── */}
          <button
            className="xl:hidden relative z-50 w-10 h-10 flex items-center justify-center rounded-md text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label={isMobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileOpen}
            id="mobile-menu-toggle"
          >
            <span
              className={cn(
                "absolute transition-all duration-200",
                isMobileOpen ? "opacity-100 rotate-0" : "opacity-0 rotate-90"
              )}
            >
              <X className="w-5 h-5" />
            </span>
            <span
              className={cn(
                "absolute transition-all duration-200",
                isMobileOpen ? "opacity-0 -rotate-90" : "opacity-100 rotate-0"
              )}
            >
              <Menu className="w-5 h-5" />
            </span>
          </button>
        </nav>
      </header>

      {/* ── Mobile Menu Panel ── */}
      <div
        className={cn(
          "fixed inset-0 z-40 xl:hidden transition-all duration-300",
          isMobileOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
        id="mobile-menu"
        aria-hidden={!isMobileOpen}
      >
        {/* Backdrop */}
        <div
          className={cn(
            "absolute inset-0 bg-navy-900/80 backdrop-blur-sm transition-opacity duration-300",
            isMobileOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setIsMobileOpen(false)}
        />

        {/* Slide-in Panel */}
        <div
          className={cn(
            "absolute top-0 right-0 h-full w-full max-w-sm bg-navy-800 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out",
            isMobileOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          {/* Panel Header */}
          <div className="flex items-center justify-between px-6 h-[70px] border-b border-white/10 shrink-0">
            <Link to="/" className="flex items-center" onClick={() => setIsMobileOpen(false)}>
              <AvacLogo iconSize={32} showText={true} dark={true} />
            </Link>
          </div>

          {/* Panel Links */}
          <nav className="flex-1 overflow-y-auto py-4 px-4" aria-label="Mobile navigation">
            <ul className="flex flex-col gap-1" role="list">
              {navLinks.map((item) => (
                <li key={item.label}>
                  {item.dropdown ? (
                    <div>
                      <button
                        onClick={() =>
                          setMobileExpanded(
                            mobileExpanded === item.label ? null : item.label
                          )
                        }
                        className={cn(
                          "w-full flex items-center justify-between gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                          isActive(item.href)
                            ? "text-accent-400 bg-white/5"
                            : "text-white/80 hover:text-white hover:bg-white/8"
                        )}
                        aria-expanded={mobileExpanded === item.label}
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          className={cn(
                            "w-4 h-4 shrink-0 transition-transform duration-200",
                            mobileExpanded === item.label && "rotate-180"
                          )}
                        />
                      </button>

                      {/* Mobile Accordion */}
                      <div
                        className={cn(
                          "overflow-hidden transition-all duration-300 ease-in-out",
                          mobileExpanded === item.label ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
                        )}
                      >
                        <div className="pl-4 py-1 flex flex-col gap-0.5">
                          {/* Link to main page */}
                          <Link
                            to={item.href}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-accent-400 hover:bg-white/5 transition-colors"
                            onClick={() => setIsMobileOpen(false)}
                          >
                            <ArrowRight className="w-3.5 h-3.5" />
                            View All {item.label}
                          </Link>
                          <div className="h-px bg-white/8 mx-2 my-1" />
                          {item.dropdown.map((sub) => (
                            <Link
                              key={sub.href}
                              to={sub.href}
                              className="px-4 py-2.5 rounded-lg text-sm text-white/65 hover:text-white hover:bg-white/8 transition-colors leading-snug"
                              onClick={() => setIsMobileOpen(false)}
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <NavLink
                      to={item.href}
                      end={item.href === "/"}
                      className={({ isActive }) =>
                        cn(
                          "block px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                          isActive
                            ? "text-accent-400 bg-white/5"
                            : "text-white/80 hover:text-white hover:bg-white/8"
                        )
                      }
                      onClick={() => setIsMobileOpen(false)}
                    >
                      {item.label}
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Panel Footer CTA */}
          <div className="px-4 pb-8 pt-4 border-t border-white/10 shrink-0">
            <Button variant="accent" className="w-full" asChild>
              <Link to="/contact" onClick={() => setIsMobileOpen(false)} id="mobile-cta">
                Get in Touch <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
