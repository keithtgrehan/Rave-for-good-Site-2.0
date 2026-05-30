import { useEffect } from "react";

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

const sections = [
  {
    title: "1. Verantwortlicher",
    content: (
      <>
        <p>Verantwortlich für die Datenverarbeitung auf dieser Website ist:</p>
        <address className="not-italic">
          Rave for Good e.V.<br />
          c/o Relativ Studios<br />
          Weserstr. 190<br />
          12045 Berlin<br />
          Deutschland
        </address>
        <p>
          E-Mail: <a className="link-line text-foreground/75 hover:text-foreground" href="mailto:info@raveforgood.berlin">info@raveforgood.berlin</a>
        </p>
      </>
    ),
  },
  {
    title: "2. Hosting über Vercel",
    content: (
      <>
        <p>Diese Website wird über Vercel bereitgestellt. Beim Aufruf der Website können technische Server-Logdaten verarbeitet werden, insbesondere IP-Adresse, Datum und Uhrzeit des Zugriffs, angeforderte URL oder Datei, Referrer-URL sofern übermittelt, Browsertyp und -version, Betriebssystem, User Agent sowie weitere technische Request-Metadaten.</p>
        <p>Die Verarbeitung dient der sicheren, stabilen und effizienten Bereitstellung der Website. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Vercel kann Daten, soweit erforderlich, auch außerhalb der EU verarbeiten; dabei können geeignete Schutzmaßnahmen zur Anwendung kommen, soweit diese rechtlich erforderlich sind.</p>
      </>
    ),
  },
  {
    title: "3. Kontakt per E-Mail",
    content: (
      <>
        <p>Wenn Sie uns per E-Mail kontaktieren, verarbeiten wir Ihre E-Mail-Adresse, Ihren Namen sofern angegeben, den Inhalt Ihrer Nachricht sowie technische Metadaten der Kommunikation.</p>
        <p>Zweck der Verarbeitung ist die Bearbeitung und Beantwortung Ihrer Anfrage. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit die Anfrage mit einem bestehenden oder angebahnten Verhältnis zusammenhängt, sowie Art. 6 Abs. 1 lit. f DSGVO für allgemeine Kommunikation. Die Daten speichern wir so lange, wie es zur Bearbeitung der Anfrage und zur Erfüllung gesetzlicher Aufbewahrungspflichten erforderlich ist.</p>
      </>
    ),
  },
  {
    title: "4. Spenden per Banküberweisung",
    content: (
      <p>Bei Spenden per Banküberweisung verarbeiten wir die im Zahlungsvorgang sichtbaren Daten, insbesondere Name der spendenden Person, IBAN oder Kontodaten aus dem Kontoauszug, Spendenbetrag, Verwendungszweck, Zahlungsdatum und Bankmetadaten. Zweck ist die Abwicklung von Spenden, Buchhaltung und Finanzverwaltung. Rechtsgrundlagen sind Art. 6 Abs. 1 lit. b DSGVO, Art. 6 Abs. 1 lit. c DSGVO und Art. 6 Abs. 1 lit. f DSGVO.</p>
    ),
  },
  {
    title: "5. Spenden über PayPal",
    content: (
      <p>Der PayPal/paypal.me-Link ist ein direkter externer Link. Auf dieser Website wird kein eingebettetes PayPal-Widget und kein PayPal-Script geladen. Wenn Sie den PayPal-Link anklicken, verlassen Sie die Website von Rave for Good. PayPal verarbeitet personenbezogene Daten in eigener Verantwortung nach den dort geltenden Datenschutzinformationen.</p>
    ),
  },
  {
    title: "6. Google Analytics",
    content: (
      <p>Diese Website lädt derzeit kein Google Analytics. Google Analytics ist nicht aktuell aktiv. Sollten zukünftig Analysewerkzeuge wie Google Analytics eingesetzt werden, werden sie nur nach Einwilligung geladen, soweit dies rechtlich erforderlich ist.</p>
    ),
  },
  {
    title: "7. Meta/Facebook Pixel",
    content: (
      <p>Wir verwenden wissentlich keinen Meta/Facebook Pixel auf dieser Website.</p>
    ),
  },
  {
    title: "8. SoundCloud und soziale Medien",
    content: (
      <p>SoundCloud wird nicht automatisch eingebettet. Der SoundCloud-Player wird erst nach aktiver Betätigung der Schaltfläche geladen. Soweit diese Website auf externe Plattformen wie SoundCloud, Instagram, Facebook oder andere Anbieter verlinkt oder externe Inhalte nach Nutzeraktion lädt, verarbeiten die jeweiligen Anbieter Daten in eigener Verantwortung.</p>
    ),
  },
  {
    title: "9. Cookies, lokaler Speicher und Newsletter",
    content: (
      <p>Für den technischen Betrieb der Website kann essenzielle technische Speicherung verwendet werden. Es gibt derzeit keinen Newsletter-Anbieter und keine Newsletter-Datenerhebung auf dieser Website. Es werden keine PayPal-Cookies durch ein eingebettetes PayPal-Widget gesetzt, da PayPal nur extern verlinkt ist. Es werden keine Cookies für Google Analytics gesetzt, da Google Analytics derzeit nicht aktiv ist.</p>
    ),
  },
  {
    title: "10. Ihre Rechte",
    content: (
      <p>Sie haben nach Maßgabe der DSGVO Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit, Widerspruch gegen bestimmte Verarbeitungen sowie Widerruf einer erteilten Einwilligung mit Wirkung für die Zukunft. Außerdem haben Sie das Recht, sich bei einer Aufsichtsbehörde zu beschweren.</p>
    ),
  },
  {
    title: "11. Aufsichtsbehörde",
    content: (
      <p>Zuständige Aufsichtsbehörde kann insbesondere die Berliner Beauftragte für Datenschutz und Informationsfreiheit sein.</p>
    ),
  },
  {
    title: "12. TLS/HTTPS",
    content: (
      <p>Diese Website nutzt HTTPS/TLS-Verschlüsselung, um die Übertragung von Daten zwischen Ihrem Browser und der Website zu schützen.</p>
    ),
  },
];

export default function Datenschutz({ canonicalPath = "/datenschutz", noindex = false }: LegalPageProps) {
  useEffect(() => {
    setLegalMeta(
      "Datenschutz | Rave for Good e.V.",
      "Datenschutzerklärung von Rave for Good e.V. mit Informationen zu Vercel Hosting, Kontakt und Spenden.",
      canonicalPath,
      noindex,
    );
  }, [canonicalPath, noindex]);

  return (
    <div className="w-full pt-24 pb-16 sm:pt-28 sm:pb-20 md:pt-40 md:pb-32" data-testid="page-datenschutz">
      <div className="container px-4 sm:px-6">
        <div className="mb-14 max-w-4xl sm:mb-20">
          <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.22em] text-primary/70">Privacy</p>
          <h1 className="mb-6 font-display text-4xl font-bold uppercase leading-[0.9] tracking-tighter sm:text-5xl md:text-7xl lg:text-8xl">
            Datenschutz
          </h1>
          <p className="max-w-2xl text-lg font-light leading-relaxed text-foreground/55 sm:text-xl">
            Datenschutzerklärung für die Website von Rave for Good e.V.
          </p>
        </div>

        <div className="space-y-px bg-white/[0.04]">
          {sections.map((section) => (
            <section key={section.title} className="bg-card p-5 sm:p-8 md:p-10">
              <h2 className="mb-5 font-display text-xl font-bold uppercase tracking-tight text-foreground/88 sm:text-2xl">
                {section.title}
              </h2>
              <div className="space-y-4 text-sm font-light leading-relaxed text-foreground/56 sm:text-base">
                {section.content}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
