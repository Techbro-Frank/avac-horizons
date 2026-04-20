import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ArrowRight, Share2, Rss, Globe } from "lucide-react";
import { AvacLogo } from "@/components/AvacLogo";

/* ─────────────── FOOTER DATA ─────────────── */
const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "Quality & Compliance", href: "/quality-compliance" },
  { label: "OEMs", href: "/oems" },
  { label: "Our Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

const servicesList = [
  { label: "Industrial Equipment & Safety Supply", href: "/services#industrial-equipment" },
  { label: "Construction Equipment Leasing", href: "/services#construction-leasing" },
  { label: "Facility & Infrastructure Equipment", href: "/services#facility-infrastructure" },
  { label: "EPC Procurement Support", href: "/services#epc-procurement" },
  { label: "Logistics & Supply Chain", href: "/services#logistics" },
];

const socialLinks = [
  { icon: Share2, href: "#", label: "LinkedIn" },
  { icon: Rss, href: "#", label: "Twitter / X" },
  { icon: Globe, href: "#", label: "Web" },
];

/* ─────────────── FOOTER ─────────────── */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-800" role="contentinfo" aria-label="Site footer">
      {/* ── Top CTA strip ── */}
      <div className="border-b border-white/10">
        <div className="section-container py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-white font-display font-semibold text-lg">
              Ready to work with us?
            </p>
            <p className="text-white/50 text-sm mt-0.5">
              Get in touch with our team today.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white text-sm font-semibold px-6 py-3 rounded-md transition-colors duration-200 shrink-0"
            id="footer-cta"
          >
            Get in Touch <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* ── Main footer grid ── */}
      <div className="section-container py-14 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* ── 1. Company Info ── */}
          <div className="sm:col-span-2 lg:col-span-1">
            {/* Logo */}
            <Link
              to="/"
              className="inline-flex items-center mb-5 group"
              aria-label="AVAC Horizons — Home"
            >
              <AvacLogo iconSize={40} showText={true} dark={true} className="group-hover:opacity-85 transition-opacity duration-200" />
            </Link>

            <p className="text-white/55 text-sm leading-relaxed mb-6 max-w-[280px]">
              A Dubai-based trading company delivering world-class industrial equipment, 
              procurement, and supply chain solutions across the MENA region and beyond.
            </p>

            {/* Socials */}
            <div className="flex items-center gap-2.5">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-md border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:border-accent-500 hover:bg-accent-500/15 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* ── 2. Quick Links ── */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-[0.12em] mb-5">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2.5" role="list">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="group flex items-center gap-1.5 text-sm text-white/55 hover:text-accent-400 transition-colors duration-200"
                  >
                    <span className="w-0 group-hover:w-3 h-[1.5px] bg-accent-500 transition-all duration-200 rounded-full shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── 3. Services ── */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-[0.12em] mb-5">
              Our Services
            </h3>
            <ul className="flex flex-col gap-2.5" role="list">
              {servicesList.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="group flex items-start gap-1.5 text-sm text-white/55 hover:text-accent-400 transition-colors duration-200 leading-snug"
                  >
                    <span className="w-0 group-hover:w-3 h-[1.5px] bg-accent-500 transition-all duration-200 rounded-full shrink-0 mt-[0.55em]" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── 4. Contact ── */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-[0.12em] mb-5">
              Contact Us
            </h3>
            <ul className="flex flex-col gap-4" role="list">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-md bg-white/8 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-accent-400" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-0.5">Address</p>
                  <p className="text-sm text-white/60 leading-relaxed">
                    IFZA Business Park, DDP,<br />
                    Dubai, United Arab Emirates
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-md bg-white/8 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-accent-400" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-0.5">Phone</p>
                  <a
                    href="tel:+97100000000"
                    className="text-sm text-white/60 hover:text-accent-400 transition-colors duration-200"
                  >
                    +971 00 000 0000
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-md bg-white/8 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-accent-400" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-0.5">Email</p>
                  <a
                    href="mailto:info@avachorizons.com"
                    className="text-sm text-white/60 hover:text-accent-400 transition-colors duration-200"
                  >
                    info@avachorizons.com
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/10">
        <div className="section-container py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-white/35">
            &copy; {year} AVAC Horizons General Trading FZCO. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/quality-compliance" className="text-xs text-white/30 hover:text-white/60 transition-colors duration-200">
              Quality & Compliance
            </Link>
            <span className="text-white/15">·</span>
            <Link to="/contact" className="text-xs text-white/30 hover:text-white/60 transition-colors duration-200">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
