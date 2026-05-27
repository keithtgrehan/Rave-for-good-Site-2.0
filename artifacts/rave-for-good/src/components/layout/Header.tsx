import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/events", label: "Events" },
  { href: "/upcoming-events", label: "Upcoming" },
  { href: "/artists", label: "Artists" },
  { href: "/impact", label: "Impact" },
  { href: "/partners", label: "Partners" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const mobileMenuToggleRef = useRef<HTMLButtonElement | null>(null);
  const mobileMenuCloseRef = useRef<HTMLButtonElement | null>(null);

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
    const originalTouchAction = document.body.style.touchAction;

    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.touchAction = originalTouchAction;
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      mobileMenuToggleRef.current?.focus();
      return;
    }

    mobileMenuCloseRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => setIsMobileMenuOpen((open) => !open);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
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
        <nav className="hidden items-center gap-4 md:flex lg:gap-6 xl:gap-8" data-testid="nav-desktop">
          {NAV_LINKS.map((link) => {
            const isActive = location === link.href || (link.href === "/upcoming-events" && location.startsWith("/upcoming-events/"));
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
          ref={mobileMenuToggleRef}
          className="md:hidden z-50 relative flex min-h-11 min-w-11 items-center justify-center p-3 text-foreground/50 transition-colors duration-200 hover:text-foreground"
          onClick={toggleMobileMenu}
          data-testid="button-mobile-menu-toggle"
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-navigation-overlay"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

      </div>

      <div
        id="mobile-navigation-overlay"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={`fixed inset-0 z-[60] md:hidden transition-[visibility,opacity] duration-300 ${
          isMobileMenuOpen ? "visible opacity-100" : "invisible opacity-0 pointer-events-none"
        }`}
        data-testid="nav-mobile"
      >
        <div className="absolute inset-0 bg-background/98 backdrop-blur-2xl" />
        <div className="relative flex min-h-full flex-col px-5 pb-8 pt-5 sm:px-6">
          <div className="flex items-center justify-between gap-4 border-b border-white/[0.06] pb-5">
            <Link href="/" className="min-w-0" onClick={() => setIsMobileMenuOpen(false)}>
              <div className="flex min-w-0 items-center gap-3">
                <img
                  src="/images/rfg-logo.png"
                  alt="Rave for Good e.V."
                  className="h-10 w-auto max-w-[96px] object-contain brightness-0 invert"
                />
                <div className="min-w-0">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/35">
                    Menu
                  </p>
                  <p className="truncate font-display text-lg font-semibold uppercase tracking-[-0.02em] text-foreground/88">
                    Rave For Good
                  </p>
                </div>
              </div>
            </Link>

            <button
              ref={mobileMenuCloseRef}
              type="button"
              className="flex min-h-11 min-w-11 items-center justify-center rounded-full border border-white/[0.08] bg-card/70 p-3 text-foreground/62 transition-colors duration-200 hover:text-foreground"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
              data-testid="button-mobile-menu-close"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-6">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-primary/65">
              Navigate
            </p>
            <div className="space-y-3">
              {NAV_LINKS.map((link) => (
                <Link key={link.href} href={link.href}>
                  <div
                    className={`group flex w-full items-center justify-between border px-5 py-4 transition-colors duration-200 ${
                      location === link.href
                        ? "border-primary/35 bg-primary/[0.08] text-primary"
                        : "border-white/[0.08] bg-card/75 text-foreground/78 hover:border-white/[0.16] hover:text-foreground"
                    }`}
                    data-testid={`mobile-link-${link.label.toLowerCase()}`}
                  >
                    <span className="font-display text-[1.7rem] font-bold uppercase leading-none tracking-[-0.03em] sm:text-[1.9rem]">
                      {link.label}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/32 transition-colors group-hover:text-foreground/55">
                      Open
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="border-t border-white/[0.06] pt-5">
            <p className="mb-4 max-w-sm text-sm font-light leading-relaxed text-foreground/42">
              Choose a page or jump straight into the main call to action.
            </p>
            <Link href="/get-involved">
              <Button
                size="lg"
                className="btn-cta h-12 w-full rounded-none px-6 font-bold tracking-[0.14em] uppercase sm:h-14"
                data-testid="button-get-involved-mobile"
              >
                Get Involved
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
