import { Link } from "wouter";
import { Instagram, Mail, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  return (
    <footer className="bg-card border-t border-white/[0.06] pt-20 pb-10" data-testid="layout-footer">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-2 pr-0 lg:pr-12">
            <h2 className="font-display text-2xl font-bold tracking-tighter uppercase mb-4 text-foreground/90">
              RAVE FOR GOOD
            </h2>
            <p className="text-foreground/45 mb-8 max-w-md text-sm font-light leading-relaxed">
              Berlin nightlife, channelled into clean water and community action. More than a party. A scene that gives back.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/raveforgoodofficial/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-white/[0.1] flex items-center justify-center hover:border-primary/40 hover:text-primary transition-all duration-300 group text-foreground/40"
                aria-label="Instagram"
                data-testid="link-instagram-footer"
              >
                <Instagram size={16} className="group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="mailto:info@raveforgood.berlin"
                className="w-9 h-9 border border-white/[0.1] flex items-center justify-center hover:border-primary/40 hover:text-primary transition-all duration-300 group text-foreground/40"
                aria-label="Email"
                data-testid="link-email-footer"
              >
                <Mail size={16} className="group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-mono font-bold tracking-[0.16em] uppercase mb-6 text-foreground/30 text-[10px]">Explore</h3>
            <ul className="flex flex-col gap-4">
              {["About", "Events", "Impact", "Partners"].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase()}`}>
                    <span className="text-foreground/45 hover:text-foreground transition-colors uppercase tracking-wide text-xs font-medium flex items-center gap-1 group cursor-pointer" data-testid={`footer-link-${item.toLowerCase()}`}>
                      {item}
                      <ArrowUpRight size={12} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono font-bold tracking-[0.16em] uppercase mb-6 text-foreground/30 text-[10px]">Stay Connected</h3>
            <p className="text-foreground/40 mb-4 text-xs font-light leading-relaxed">Join the movement. Updates on events and impact.</p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()} data-testid="form-newsletter-footer">
              <Input
                type="email"
                placeholder="EMAIL ADDRESS"
                className="bg-background border-white/[0.08] rounded-none focus-visible:ring-primary/50 font-mono text-[10px] uppercase tracking-widest"
                data-testid="input-newsletter-email"
              />
              <Button type="submit" variant="outline" className="rounded-none w-full border-white/[0.1] text-foreground/50 hover:bg-primary hover:text-primary-foreground hover:border-primary/60 font-bold tracking-widest uppercase text-xs transition-colors" data-testid="button-newsletter-submit">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/[0.06] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-foreground/25 font-mono uppercase tracking-widest">
          <p data-testid="text-copyright">© {new Date().getFullYear()} RAVE FOR GOOD e.V.</p>
          <div className="flex gap-6">
            <Link href="/imprint"><span className="hover:text-foreground/50 cursor-pointer transition-colors" data-testid="footer-link-imprint">Imprint</span></Link>
            <Link href="/privacy"><span className="hover:text-foreground/50 cursor-pointer transition-colors" data-testid="footer-link-privacy">Privacy</span></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
