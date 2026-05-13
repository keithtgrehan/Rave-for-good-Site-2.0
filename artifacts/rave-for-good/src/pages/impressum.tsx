import { useEffect } from "react";
import { Mail } from "lucide-react";

type LegalPageProps = {
  canonicalPath?: string;
  noindex?: boolean;
};

function setLegalMeta(title: string, description: string, canonicalPath: string, noindex?: boolean) {
  document.title = title;

  const descriptionMeta =
    document.querySelector<HTMLMetaElement>('meta[name="description"]') ??
    document.head.appendChild(document.createElement("meta"));
  descriptionMeta.name = "description";
  descriptionMeta.content = description;

  const canonical =
    document.querySelector<HTMLLinkElement>('link[rel="canonical"]') ??
    document.head.appendChild(document.createElement("link"));
  canonical.rel = "canonical";
  canonical.href = `${window.location.origin}${canonicalPath}`;

  const robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
  if (noindex) {
    const robotsMeta = robots ?? document.head.appendChild(document.createElement("meta"));
    robotsMeta.name = "robots";
    robotsMeta.content = "noindex,follow";
  } else if (robots) {
    robots.remove();
  }
}

export default function Impressum({ canonicalPath = "/impressum", noindex = false }: LegalPageProps) {
  useEffect(() => {
    setLegalMeta(
      "Impressum | Rave for Good e.V.",
      "Impressum und Anbieterkennzeichnung von Rave for Good e.V. in Berlin.",
      canonicalPath,
      noindex,
    );
  }, [canonicalPath, noindex]);

  return (
    <div className="w-full pt-24 pb-16 sm:pt-28 sm:pb-20 md:pt-40 md:pb-32" data-testid="page-impressum">
      <div className="container px-4 sm:px-6">
        <div className="mb-14 max-w-4xl sm:mb-20">
          <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.22em] text-primary/70">Legal</p>
          <h1 className="mb-6 font-display text-4xl font-bold uppercase leading-[0.9] tracking-tighter sm:text-5xl md:text-7xl lg:text-8xl">
            Impressum
          </h1>
          <p className="max-w-2xl text-lg font-light leading-relaxed text-foreground/55 sm:text-xl">
            Angaben gemäß § 5 DDG
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <section className="border border-white/[0.06] bg-card p-5 sm:p-8 md:p-10 lg:col-span-7">
            <h2 className="mb-6 font-display text-2xl font-bold uppercase tracking-tight text-foreground/88">Anbieter</h2>
            <div className="space-y-6 text-sm font-light leading-relaxed text-foreground/58 sm:text-base">
              <address className="not-italic">
                Rave for Good e.V.<br />
                c/o Relativ Studios<br />
                Weserstr. 190<br />
                12045 Berlin<br />
                Deutschland
              </address>

              <div>
                <h3 className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-primary/70">Vertreten durch den Vorstand</h3>
                <p>Marco Creiti, Matthew Jones, Bianka Tonko, Sven Meissner, Keith Grehan, Diana Flodur</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <h3 className="mb-1 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/35">Registergericht</h3>
                  <p>Amtsgericht Charlottenburg</p>
                </div>
                <div>
                  <h3 className="mb-1 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/35">Registernummer</h3>
                  <p>VR 39221 B</p>
                </div>
                <div>
                  <h3 className="mb-1 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/35">Steuernummer</h3>
                  <p>27/676/50019</p>
                </div>
                <div>
                  <h3 className="mb-1 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/35">E-Mail</h3>
                  <a className="link-line inline-flex items-center gap-2 text-foreground/75 hover:text-foreground" href="mailto:info@raveforgood.berlin">
                    <Mail size={15} />
                    info@raveforgood.berlin
                  </a>
                </div>
              </div>
            </div>
          </section>

          <aside className="border border-white/[0.06] bg-card p-5 sm:p-8 md:p-10 lg:col-span-5">
            <h2 className="mb-6 font-display text-2xl font-bold uppercase tracking-tight text-foreground/88">Verantwortlich</h2>
            <div className="text-sm font-light leading-relaxed text-foreground/58 sm:text-base">
              <p className="mb-3">Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV:</p>
              <address className="not-italic">
                Keith Grehan<br />
                Rave for Good e.V.<br />
                c/o Relativ Studios<br />
                Weserstr. 190<br />
                12045 Berlin<br />
                Deutschland
              </address>
            </div>
          </aside>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-px bg-white/[0.04] md:grid-cols-3">
          {[
            {
              title: "Haftung für Inhalte",
              text: "Als Diensteanbieter sind wir gemäß den allgemeinen Gesetzen für eigene Inhalte auf diesen Seiten verantwortlich. Wir bemühen uns um sorgfältige und aktuelle Informationen, übernehmen jedoch keine Gewähr für Vollständigkeit, Richtigkeit und Aktualität.",
            },
            {
              title: "Haftung für Links",
              text: "Unsere Website kann Links zu externen Websites enthalten. Auf deren Inhalte haben wir keinen Einfluss. Für Inhalte verlinkter Seiten ist stets der jeweilige Anbieter oder Betreiber verantwortlich.",
            },
            {
              title: "Urheberrecht",
              text: "Die auf dieser Website erstellten Inhalte und Werke unterliegen dem deutschen Urheberrecht. Beiträge Dritter werden als solche gekennzeichnet. Jede Verwertung außerhalb der Grenzen des Urheberrechts bedarf der Zustimmung der jeweiligen Rechteinhaber.",
            },
          ].map((section) => (
            <section key={section.title} className="bg-card p-5 sm:p-8">
              <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-tight text-foreground/85">{section.title}</h2>
              <p className="text-sm font-light leading-relaxed text-foreground/52">{section.text}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
