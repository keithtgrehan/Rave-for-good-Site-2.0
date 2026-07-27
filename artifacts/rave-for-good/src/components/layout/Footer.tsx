import { Link } from "wouter";
import { Instagram, Mail, ArrowUpRight } from "lucide-react";
import { SITE_CONTACT, contactMailto } from "@/data/site";

const EXPLORE_LINKS = [
  { href: "/about", label: "About" },
  { href: "/upcoming-events", label: "Events" },
  { href: "/park-cleanup", label: "Cleanup" },
  { href: "/impact", label: "Impact" },
  { href: "/partners", label: "Partners" },
  { href: "/get-involved", label: "Get Involved" },
];

const SECONDARY_LINKS = [
  { href: "/artists", label: "Artists" },
  { href: "/crew-radio", label: "Crew Radio" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="bg-card border-t border-white/[0.06] pt-14 pb-8 sm:pt-20 sm:pb-10" data-testid="layout-footer">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mb-12 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-12 sm:mb-16">
          <div className="lg:col-span-2 pr-0 lg:pr-12">
            <h2 className="font-display text-2xl font-bold tracking-tighter uppercase mb-4 text-foreground/90">
              RAVE FOR GOOD
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md text-sm font-light leading-relaxed">
              Berlin nightlife, channelled into clean water and community action. More than a party. A scene that gives back.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://www.instagram.com/raveforgoodofficial/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center border border-white/[0.1] text-muted-foreground transition-all duration-300 group hover:border-primary/40 hover:text-primary"
                aria-label="Instagram"
                data-testid="link-instagram-footer"
              >
                <Instagram size={16} className="group-hover:scale-110 transition-transform" />
              </a>
              <a
                href={contactMailto()}
                className="flex h-10 w-10 items-center justify-center border border-white/[0.1] text-muted-foreground transition-all duration-300 group hover:border-primary/40 hover:text-primary"
                aria-label="Email"
                data-testid="link-email-footer"
              >
                <Mail size={16} className="group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-6 font-mono text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">Explore</h3>
            <ul className="flex flex-col gap-4">
              {EXPLORE_LINKS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>
                    <span className="text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wide text-xs font-medium flex items-center gap-1 group cursor-pointer" data-testid={`footer-link-${item.label.toLowerCase()}`}>
                      {item.label}
                      <ArrowUpRight size={12} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="mb-4 mt-8 font-mono text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">More</h3>
            <ul className="flex flex-col gap-3">
              {SECONDARY_LINKS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-xs font-medium uppercase tracking-wide text-foreground/60 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono font-bold tracking-[0.16em] uppercase mb-6 text-muted-foreground text-[10px]">Stay Connected</h3>
            <p className="mb-4 max-w-sm text-xs font-light leading-relaxed text-muted-foreground">
              For collaborations, press, volunteer interest, and donation questions, email us directly.
            </p>
            <a
              href={contactMailto()}
              className="link-line inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
              data-testid="footer-link-contact-email"
            >
              {SITE_CONTACT.email}
              <ArrowUpRight size={12} />
            </a>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-3 border-t border-white/[0.06] pt-6 text-left font-mono text-[10px] uppercase tracking-widest text-muted-foreground md:flex-row md:items-center">
          <p data-testid="text-copyright">© {new Date().getFullYear()} RAVE FOR GOOD e.V.</p>
          <div className="flex flex-wrap gap-4 sm:gap-6">
            <Link href="/impressum"><span className="hover:text-foreground/50 cursor-pointer transition-colors" data-testid="footer-link-impressum">Impressum</span></Link>
            <Link href="/datenschutz"><span className="hover:text-foreground/50 cursor-pointer transition-colors" data-testid="footer-link-datenschutz">Datenschutz</span></Link>
            <Link href="/transparency"><span className="hover:text-foreground/50 cursor-pointer transition-colors" data-testid="footer-link-transparency">Transparency</span></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
