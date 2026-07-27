import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { href: "/about", label: "About", testId: "about" },
  { href: "/upcoming-events", label: "Events", testId: "events" },
  { href: "/park-cleanup", label: "Cleanup", testId: "cleanup" },
  { href: "/impact", label: "Impact", testId: "impact" },
  { href: "/partners", label: "Partners", testId: "partners" },
];

const SECONDARY_LINKS = [
  { href: "/artists", label: "Artists", testId: "artists" },
  { href: "/crew-radio", label: "Crew Radio", testId: "crew-radio" },
  { href: "/contact", label: "Contact", testId: "contact" },
];

export function isNavLinkActive(currentPath: string, href: string) {
  if (href === "/park-cleanup") {
    return (
      currentPath === "/park-cleanup" ||
      currentPath.startsWith("/park-cleanup/") ||
      currentPath === "/de/park-cleanup" ||
      currentPath === "/berlin-park-cleanup"
    );
  }

  if (href === "/upcoming-events") {
    return (
      currentPath === "/upcoming-events" ||
      currentPath.startsWith("/upcoming-events/") ||
      currentPath === "/events" ||
      currentPath.startsWith("/events/")
    );
  }

  if (href === "/partners") {
    return currentPath === "/partners" || currentPath === "/de/partners";
  }

  return currentPath === href;
}

export function mobileFocusWrapTarget<T>(first: T, last: T, active: T | null, shiftKey: boolean): T | null {
  if (shiftKey && active === first) return last;
  if (!shiftKey && active === last) return first;
  return null;
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const mobileMenuToggleRef = useRef<HTMLButtonElement | null>(null);
  const mobileMenuCloseRef = useRef<HTMLButtonElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const wasMobileMenuOpenRef = useRef(false);

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

  useLayoutEffect(() => {
    if (!isMobileMenuOpen) {
      if (wasMobileMenuOpenRef.current) {
        const focusFrame = window.requestAnimationFrame(() => {
          mobileMenuToggleRef.current?.focus();
        });
        wasMobileMenuOpenRef.current = false;
        return () => window.cancelAnimationFrame(focusFrame);
      }

      return undefined;
    }

    wasMobileMenuOpenRef.current = true;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
        return;
      }

      if (event.key === "Tab" && mobileMenuRef.current) {
        const focusable = Array.from(
          mobileMenuRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
          ),
        ).filter((element) => !element.hasAttribute("disabled"));
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (!first || !last) return;

        const activeElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
        const wrapTarget = mobileFocusWrapTarget(first, last, activeElement, event.shiftKey);
        if (wrapTarget) {
          event.preventDefault();
          wrapTarget.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
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
        <nav className="hidden items-center lg:flex lg:gap-3 xl:gap-5" data-testid="nav-desktop">
          {NAV_LINKS.map((link) => {
            const isActive = isNavLinkActive(location, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background"
              >
                <span
                  className={`relative cursor-pointer pb-1 text-[10px] font-medium uppercase tracking-[0.1em] transition-colors duration-200 xl:text-[11px] xl:tracking-[0.14em] ${
                    isActive
                      ? "text-foreground nav-active"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  data-testid={`link-${link.testId}`}
                >
                  {link.label}
                </span>
              </Link>
            );
          })}
          <Button
            asChild
            variant="default"
            className="btn-cta h-9 rounded-none px-3 text-[11px] font-bold uppercase tracking-[0.14em] xl:px-5"
          >
            <Link href="/get-involved" data-testid="button-get-involved-nav">
              Get Involved
            </Link>
          </Button>
        </nav>

        {/* Mobile Toggle */}
        <button
          ref={mobileMenuToggleRef}
          className="lg:hidden z-50 relative flex min-h-11 min-w-11 items-center justify-center p-3 text-foreground/50 transition-colors duration-200 hover:text-foreground"
          onClick={toggleMobileMenu}
          data-testid="button-mobile-menu-toggle"
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-navigation-overlay"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

      </div>

      {isMobileMenuOpen ? (
        <div
          id="mobile-navigation-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className="fixed inset-0 z-[60] lg:hidden"
          data-testid="nav-mobile"
        >
        <div className="absolute inset-0 bg-background/98 backdrop-blur-2xl" />
        <div ref={mobileMenuRef} className="relative flex min-h-full flex-col px-5 pb-8 pt-5 sm:px-6">
          <div className="flex items-center justify-between gap-4 border-b border-white/[0.06] pb-5">
            <Link href="/" className="min-w-0" onClick={() => setIsMobileMenuOpen(false)}>
              <div className="flex min-w-0 items-center gap-3">
                <img
                  src="/images/rfg-logo.png"
                  alt="Rave for Good e.V."
                  className="h-10 w-auto max-w-[96px] object-contain brightness-0 invert"
                />
                <div className="min-w-0">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
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
              autoFocus
              className="flex min-h-11 min-w-11 items-center justify-center rounded-full border border-white/[0.08] bg-card/70 p-3 text-foreground/62 transition-colors duration-200 hover:text-foreground"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
              data-testid="button-mobile-menu-close"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-6">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-primary-readable">
              Navigate
            </p>
            <div className="space-y-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
                >
                  <div
                    className={`group flex w-full min-w-0 items-center justify-between gap-3 border px-5 py-4 transition-colors duration-200 ${
                      isNavLinkActive(location, link.href)
                        ? "border-primary/35 bg-primary/[0.08] text-primary"
                        : "border-white/[0.08] bg-card/75 text-foreground/78 hover:border-white/[0.16] hover:text-foreground"
                    }`}
                    data-testid={`mobile-link-${link.testId}`}
                  >
                    <span className="min-w-0 flex-1 break-words font-display text-[1.7rem] font-bold uppercase leading-none tracking-[-0.03em] sm:text-[1.9rem]">
                      {link.label}
                    </span>
                    <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground transition-colors group-hover:text-foreground">
                      Open
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            <p className="mb-4 mt-8 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
              More
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              {SECONDARY_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex min-h-11 items-center justify-between border border-white/[0.12] bg-card/75 px-4 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-foreground/75 hover:border-primary/60 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  data-testid={`mobile-link-${link.testId}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="border-t border-white/[0.06] pt-5">
            <p className="mb-4 max-w-sm text-sm font-light leading-relaxed text-muted-foreground">
              Choose a page or jump straight into the main call to action.
            </p>
            <Button
              asChild
              size="lg"
              className="btn-cta h-12 w-full rounded-none px-6 font-bold tracking-[0.14em] uppercase sm:h-14"
            >
              <Link href="/get-involved" data-testid="button-get-involved-mobile">
                Get Involved
              </Link>
            </Button>
          </div>
        </div>
        </div>
      ) : null}
    </header>
  );
}
