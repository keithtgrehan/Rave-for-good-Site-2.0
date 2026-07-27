import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Mail } from "lucide-react";
import { confirmedPartners } from "@/data/partners";
import { SITE_CONTACT, contactMailto } from "@/data/site";
import type { SiteLocale } from "@/pages/park-cleanup";

const copy = {
  en: {
    languagePath: "/de/partners",
    languageLabel: "Deutsch",
    eyebrow: "Partnerships",
    title: "Work together, with clear roles",
    intro: "Rave for Good develops culturally relevant community action with organisations whose environmental knowledge and responsibilities complement our reach.",
    modelTitle: "A practical partnership model",
    rfgTitle: "What Rave for Good brings",
    rfgItems: ["Community mobilisation", "Reach within electronic music culture", "Artists and DJs", "Volunteer communications", "Content and event storytelling"],
    environmentTitle: "What an environmental partner can bring",
    environmentItems: ["Local environmental expertise", "Site and route knowledge", "Responsible waste processes", "Operational guidance", "Clear evidence and outcomes"],
    confirmedEyebrow: "Verified relationships",
    confirmedTitle: "Confirmed collaborators",
    confirmedEmpty: "Partner profiles will appear here only after the relationship and each organisation’s specific role have been confirmed in writing.",
    invitationTitle: "Open to environmental collaboration",
    invitationCopy: "We want to work with established environmental organisations rather than duplicate existing expertise. Each collaboration should agree responsibilities, communications and evidence before it is announced.",
    contactTitle: "Discuss a partnership",
    contactCopy: (name: string) => `Contact ${name} with a collaboration idea or to discuss how the Cleanup Collective could support an existing environmental programme.`,
    contactLabel: (name: string) => `Email ${name}`,
  },
  de: {
    languagePath: "/partners",
    languageLabel: "English",
    eyebrow: "Kooperationen",
    title: "Gemeinsam arbeiten – mit klaren Rollen",
    intro: "Rave for Good entwickelt kulturell relevante Gemeinschaftsaktionen mit Organisationen, deren Umweltkompetenz und Verantwortungsbereiche unsere Reichweite sinnvoll ergänzen.",
    modelTitle: "Ein praktisches Kooperationsmodell",
    rfgTitle: "Was Rave for Good einbringt",
    rfgItems: ["Mobilisierung der Community", "Reichweite in der elektronischen Musikkultur", "Artists und DJs", "Kommunikation mit Freiwilligen", "Inhalte und verantwortungsvolles Storytelling"],
    environmentTitle: "Was eine Umweltorganisation einbringen kann",
    environmentItems: ["Lokale Umweltfachkenntnis", "Kenntnis geeigneter Orte und Routen", "Verantwortungsvolle Abfallprozesse", "Operative Beratung", "Nachvollziehbare Ergebnisse und Nachweise"],
    confirmedEyebrow: "Verifizierte Beziehungen",
    confirmedTitle: "Bestätigte Kooperationen",
    confirmedEmpty: "Partnerprofile erscheinen hier erst, wenn die Beziehung und die konkrete Rolle der jeweiligen Organisation schriftlich bestätigt wurden.",
    invitationTitle: "Offen für Umweltkooperationen",
    invitationCopy: "Wir möchten mit etablierten Umweltorganisationen zusammenarbeiten, statt vorhandenes Wissen zu duplizieren. Verantwortlichkeiten, Kommunikation und Nachweise werden vereinbart, bevor eine Kooperation öffentlich angekündigt wird.",
    contactTitle: "Kooperation besprechen",
    contactCopy: (name: string) => `Kontaktiere ${name} mit einer Kooperationsidee oder um zu besprechen, wie das Cleanup Collective ein bestehendes Umweltprogramm unterstützen kann.`,
    contactLabel: (name: string) => `${name} schreiben`,
  },
} as const;

export function PartnersPage({ locale = "en" }: { locale?: SiteLocale }) {
  const text = copy[locale];

  return (
    <div className="relative w-full overflow-hidden pb-20 pt-24 sm:pt-28 md:pb-32 md:pt-40" data-testid={`page-partners-${locale}`}>
      <div className="pointer-events-none absolute right-0 top-0 h-[680px] w-[760px] bg-[radial-gradient(ellipse,rgba(109,94,245,0.08)_0%,transparent_68%)]" />
      <div className="container relative z-10 px-4 sm:px-6">
        <header className="mb-16 max-w-5xl sm:mb-24">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary-readable">{text.eyebrow}</p>
            <Link href={text.languagePath} className="inline-flex min-h-11 items-center border border-white/[0.18] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-foreground/80 hover:border-primary hover:text-foreground">
              {text.languageLabel}
            </Link>
          </div>
          <motion.h1 className="mb-7 max-w-5xl font-display text-[clamp(3rem,10vw,8rem)] font-bold uppercase leading-[0.86] tracking-[-0.04em]" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {text.title}
          </motion.h1>
          <p className="max-w-3xl text-lg font-light leading-relaxed text-foreground/75 sm:text-xl md:text-2xl">{text.intro}</p>
        </header>

        <section className="mb-20 sm:mb-28" aria-labelledby="partnership-model-heading">
          <h2 id="partnership-model-heading" className="mb-8 font-display text-3xl font-bold uppercase tracking-[-0.025em] sm:text-4xl">{text.modelTitle}</h2>
          <div className="grid gap-px bg-white/[0.12] lg:grid-cols-2">
            {[
              [text.rfgTitle, text.rfgItems],
              [text.environmentTitle, text.environmentItems],
            ].map(([title, items]) => (
              <article key={title as string} className="bg-card p-6 sm:p-8 md:p-10">
                <h3 className="mb-6 font-display text-2xl font-bold uppercase text-foreground/95">{title}</h3>
                <ul className="space-y-3 text-muted-foreground">
                  {(items as readonly string[]).map((item) => <li key={item} className="flex gap-3"><span aria-hidden="true" className="text-primary-readable">—</span>{item}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-20 border-y border-white/[0.1] py-12 sm:mb-28 sm:py-16" aria-labelledby="confirmed-partners-heading">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-primary-readable">{text.confirmedEyebrow}</p>
          <h2 id="confirmed-partners-heading" className="mb-6 font-display text-3xl font-bold uppercase sm:text-4xl">{text.confirmedTitle}</h2>
          {confirmedPartners.length ? (
            <div className="grid gap-5 md:grid-cols-2">
              {confirmedPartners.map((partner) => (
                <article key={partner.id} className="border border-white/[0.12] bg-card p-6 sm:p-8">
                  {partner.logo ? <img src={partner.logo} alt={`${partner.name} logo`} className="mb-6 h-16 w-auto object-contain" /> : null}
                  <h3 className="mb-3 font-display text-2xl font-bold uppercase">{partner.name}</h3>
                  <p className="text-muted-foreground">{partner.role}</p>
                </article>
              ))}
            </div>
          ) : (
            <p className="max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">{text.confirmedEmpty}</p>
          )}
        </section>

        <section className="mb-16 grid gap-8 border border-white/[0.12] bg-card p-7 sm:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(260px,0.55fr)] lg:items-center lg:p-14">
          <div>
            <h2 className="mb-5 font-display text-3xl font-bold uppercase sm:text-4xl">{text.invitationTitle}</h2>
            <p className="max-w-3xl leading-relaxed text-muted-foreground sm:text-lg">{text.invitationCopy}</p>
          </div>
          <div className="border-l-2 border-primary-readable pl-5">
            <h2 className="mb-3 font-display text-2xl font-bold uppercase">{text.contactTitle}</h2>
            <p className="mb-5 text-sm leading-relaxed text-muted-foreground">{text.contactCopy(SITE_CONTACT.name)}</p>
            <a href={contactMailto(locale === "de" ? "Kooperation mit Rave for Good" : "Partnership with Rave for Good")} className="link-line inline-flex min-h-11 items-center gap-2 py-3 font-semibold text-primary-readable">
              <Mail size={16} /> {text.contactLabel(SITE_CONTACT.name)} <ArrowRight size={14} />
            </a>
            <p className="mt-2 text-sm text-muted-foreground">{SITE_CONTACT.name} · {SITE_CONTACT.email}</p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default function Partners() {
  return <PartnersPage locale="en" />;
}
