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
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent ${
        isScrolled || isMobileMenuOpen
          ? "bg-background/95 backdrop-blur-md border-border/50 py-4"
          : "bg-transparent py-6"
      }`}
      data-testid="layout-header"
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link href="/" className="z-50 relative">
          <span className="font-display font-bold text-xl tracking-tighter uppercase cursor-pointer" data-testid="link-home">
            RAVE FOR GOOD
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8" data-testid="nav-desktop">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href}>
              <span 
                className={`text-sm font-medium tracking-wide uppercase transition-colors hover:text-primary cursor-pointer ${
                  location === link.href ? "text-primary" : "text-foreground/80"
                }`}
                data-testid={`link-${link.label.toLowerCase()}`}
              >
                {link.label}
              </span>
            </Link>
          ))}
          <Link href="/get-involved">
            <Button variant="default" className="font-bold tracking-widest uppercase rounded-none" data-testid="button-get-involved-nav">
              Get Involved
            </Button>
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden z-50 relative text-foreground p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          data-testid="button-mobile-menu-toggle"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Nav Overlay */}
        <div
          className={`fixed inset-0 bg-background z-40 flex flex-col items-center justify-center gap-8 transition-all duration-500 ease-in-out ${
            isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
          }`}
          data-testid="nav-mobile"
        >
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href}>
              <span 
                className={`text-3xl font-display font-bold tracking-tight uppercase cursor-pointer ${
                  location === link.href ? "text-primary" : "text-foreground"
                }`}
                data-testid={`mobile-link-${link.label.toLowerCase()}`}
              >
                {link.label}
              </span>
            </Link>
          ))}
          <Link href="/get-involved">
            <Button size="lg" className="mt-8 font-bold tracking-widest uppercase rounded-none text-lg px-12 py-6" data-testid="button-get-involved-mobile">
              Get Involved
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
