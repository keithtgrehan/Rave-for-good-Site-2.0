import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/events", label: "Events" },
  { href: "/impact", label: "Impact" },
  { href: "/partners", label: "Partners" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? "bg-background/92 backdrop-blur-xl border-b border-white/[0.055] py-4"
          : "bg-transparent py-7"
      }`}
      data-testid="layout-header"
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">

        <Link href="/" className="z-50 relative">
          <img
            src="/images/rfg-logo.png"
            alt="Rave for Good e.V."
            className="h-12 w-auto max-w-[120px] object-contain brightness-0 invert"
            data-testid="link-home"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10" data-testid="nav-desktop">
          {NAV_LINKS.map((link) => {
            const isActive = location === link.href;
            return (
              <Link key={link.href} href={link.href}>
                <span
                  className={`relative text-[11px] font-medium tracking-[0.14em] uppercase transition-colors duration-200 cursor-pointer pb-1 ${
                    isActive
                      ? "text-foreground nav-active"
                      : "text-foreground/38 hover:text-foreground/75"
                  }`}
                  data-testid={`link-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </span>
              </Link>
            );
          })}
          <Link href="/get-involved">
            <Button
              variant="default"
              className="btn-cta font-bold tracking-[0.14em] uppercase rounded-none text-[11px] h-9 px-5"
              data-testid="button-get-involved-nav"
            >
              Get Involved
            </Button>
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden z-50 relative text-foreground/50 hover:text-foreground p-2 transition-colors duration-200"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          data-testid="button-mobile-menu-toggle"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Mobile Overlay */}
        <div
          className={`fixed inset-0 bg-background/96 backdrop-blur-2xl z-40 flex flex-col items-center justify-center gap-10 transition-all duration-400 ease-in-out ${
            isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
          }`}
          data-testid="nav-mobile"
        >
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href}>
              <span
                className={`font-display text-4xl font-bold tracking-[-0.025em] uppercase cursor-pointer transition-colors duration-200 ${
                  location === link.href ? "text-primary" : "text-foreground/50 hover:text-foreground"
                }`}
                data-testid={`mobile-link-${link.label.toLowerCase()}`}
              >
                {link.label}
              </span>
            </Link>
          ))}
          <Link href="/get-involved">
            <Button
              size="lg"
              className="btn-cta mt-6 font-bold tracking-[0.14em] uppercase rounded-none px-12 h-14"
              data-testid="button-get-involved-mobile"
            >
              Get Involved
            </Button>
          </Link>
        </div>

      </div>
    </header>
  );
}
