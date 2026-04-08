import { Link } from "wouter";
import { Instagram, Mail, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border pt-20 pb-10" data-testid="layout-footer">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-2 pr-0 lg:pr-12">
            <h2 className="font-display text-3xl font-bold tracking-tighter uppercase mb-4">
              RAVE FOR GOOD
            </h2>
            <p className="text-foreground/70 mb-8 max-w-md text-lg">
              Berlin nightlife, channelled into clean water and community action. More than a party. A scene that gives back.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors group" aria-label="Instagram" data-testid="link-instagram-footer">
                <Instagram size={20} className="group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="w-10 h-10 border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors group" aria-label="Email" data-testid="link-email-footer">
                <Mail size={20} className="group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-display font-bold tracking-wide uppercase mb-6 text-foreground/50 text-sm">Explore</h3>
            <ul className="flex flex-col gap-4">
              {["About", "Events", "Impact", "Partners"].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase()}`}>
                    <span className="text-foreground/80 hover:text-primary transition-colors uppercase tracking-wide text-sm font-medium flex items-center gap-1 group cursor-pointer" data-testid={`footer-link-${item.toLowerCase()}`}>
                      {item}
                      <ArrowUpRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display font-bold tracking-wide uppercase mb-6 text-foreground/50 text-sm">Stay Connected</h3>
            <p className="text-foreground/70 mb-4 text-sm">Join the movement. Updates on events and impact.</p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()} data-testid="form-newsletter-footer">
              <Input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                className="bg-background border-border rounded-none focus-visible:ring-primary font-mono text-xs uppercase" 
                data-testid="input-newsletter-email"
              />
              <Button type="submit" variant="outline" className="rounded-none w-full border-border hover:bg-primary hover:text-primary-foreground font-bold tracking-widest uppercase text-xs" data-testid="button-newsletter-submit">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-foreground/40 font-mono uppercase tracking-widest">
          <p data-testid="text-copyright">© {new Date().getFullYear()} RAVE FOR GOOD e.V.</p>
          <div className="flex gap-6">
            <Link href="/imprint"><span className="hover:text-primary cursor-pointer" data-testid="footer-link-imprint">Imprint</span></Link>
            <Link href="/privacy"><span className="hover:text-primary cursor-pointer" data-testid="footer-link-privacy">Privacy</span></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
