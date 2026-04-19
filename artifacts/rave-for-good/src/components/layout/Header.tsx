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

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;

    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? "bg-background/92 backdrop-blur-xl border-b border-white/[0.055] py-3 md:py-4"
          : "bg-transparent py-4 md:py-7"
      }`}
      data-testid="layout-header"
    >
      <div className="container mx-auto flex items-center justify-between gap-3 px-4 sm:px-6">

        <Link href="/" className="z-50 relative">
          <img
            src="/images/rfg-logo.png"
            alt="Rave for Good e.V."
            className="h-10 w-auto max-w-[96px] object-contain brightness-0 invert sm:h-11 sm:max-w-[108px] md:h-12 md:max-w-[120px]"
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
          className="md:hidden z-50 relative flex min-h-11 min-w-11 items-center justify-center p-3 text-foreground/50 transition-colors duration-200 hover:text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          data-testid="button-mobile-menu-toggle"
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Mobile Overlay */}
        <div
          className={`fixed inset-0 z-40 flex flex-col items-stretch justify-start gap-6 overflow-y-auto bg-background/96 px-6 pt-24 pb-10 backdrop-blur-2xl transition-all duration-400 ease-in-out sm:px-8 ${
            isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
          }`}
          data-testid="nav-mobile"
        >
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href}>
              <span
                className={`block w-full border-b border-white/[0.06] py-4 font-display text-3xl font-bold tracking-[-0.025em] uppercase transition-colors duration-200 sm:text-4xl ${
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
              className="btn-cta mt-2 h-12 w-full self-start rounded-none px-6 font-bold tracking-[0.14em] uppercase sm:mt-4 sm:h-14 sm:max-w-sm sm:px-12"
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
