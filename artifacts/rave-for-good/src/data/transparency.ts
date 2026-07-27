export type TransparencyDocumentCategory =
  | "registration"
  | "governance"
  | "nonprofit-tax"
  | "project-evidence";

export type TransparencyDocument = {
  id: string;
  category: TransparencyDocumentCategory;
  title: string;
  href: string;
  publishedDate?: string;
  verified: true;
};

// Add only reviewed documents that are approved for public download.
export const transparencyDocuments: TransparencyDocument[] = [];
