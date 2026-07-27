import { Link } from "wouter";
import { ArrowRight, Download } from "lucide-react";
import { transparencyDocuments, type TransparencyDocumentCategory } from "@/data/transparency";

const sections: Array<{
  category: TransparencyDocumentCategory;
  title: string;
  description: string;
}> = [
  {
    category: "registration",
    title: "Registration",
    description: "Verified association registration material approved for public access.",
  },
  {
    category: "governance",
    title: "Governance",
    description: "Verified committee, governance and decision-making documentation.",
  },
  {
    category: "nonprofit-tax",
    title: "Nonprofit and tax documentation",
    description: "Reviewed status or tax documentation that is appropriate for publication.",
  },
  {
    category: "project-evidence",
    title: "Project evidence and reports",
    description: "Outcome reports, supporting evidence and approved project downloads.",
  },
];

export default function Transparency() {
  return (
    <div className="relative w-full overflow-hidden pb-20 pt-24 sm:pt-28 md:pb-32 md:pt-40" data-testid="page-transparency">
      <div className="pointer-events-none absolute right-0 top-0 h-[620px] w-[720px] bg-[radial-gradient(ellipse,rgba(109,94,245,0.08)_0%,transparent_68%)]" />
      <div className="container relative z-10 px-4 sm:px-6">
        <header className="mb-14 max-w-5xl sm:mb-20">
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-primary-readable">Accountability</p>
          <h1 className="mb-7 font-display text-[clamp(3rem,11vw,8rem)] font-bold uppercase leading-[0.86] tracking-[-0.04em]">Transparency</h1>
          <p className="max-w-3xl text-lg leading-relaxed text-foreground/75 sm:text-xl">
            A central place for verified governance information, public documents and project evidence. Nothing is published here before review.
          </p>
        </header>

        <div className="grid gap-5 md:grid-cols-2">
          {sections.map((section) => {
            const documents = transparencyDocuments.filter((document) => document.category === section.category);
            return (
              <section key={section.category} className="border border-white/[0.1] bg-card p-6 sm:p-8" aria-labelledby={`transparency-${section.category}`}>
                <h2 id={`transparency-${section.category}`} className="mb-4 font-display text-2xl font-bold uppercase sm:text-3xl">{section.title}</h2>
                <p className="mb-6 leading-relaxed text-muted-foreground">{section.description}</p>
                {documents.length ? (
                  <ul className="space-y-3">
                    {documents.map((document) => (
                      <li key={document.id}>
                        <a href={document.href} className="inline-flex min-h-11 items-center gap-2 py-2 font-semibold text-primary-readable">
                          <Download size={15} /> {document.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">No verified public documents are available in this category yet.</p>
                )}
              </section>
            );
          })}
        </div>

        <section className="mt-8 border-l-2 border-primary-readable bg-card p-6 sm:p-8">
          <h2 className="mb-3 font-display text-2xl font-bold uppercase">Legal information</h2>
          <p className="mb-5 max-w-3xl text-muted-foreground">The existing legal provider information remains available in the Impressum and is not duplicated here.</p>
          <Link href="/impressum" className="link-line inline-flex min-h-11 items-center gap-2 py-3 font-semibold text-primary-readable">
            Open Impressum <ArrowRight size={14} />
          </Link>
        </section>
      </div>
    </div>
  );
}
