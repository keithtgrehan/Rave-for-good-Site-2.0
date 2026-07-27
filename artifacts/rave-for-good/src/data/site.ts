export const SITE_CONTACT = {
  name: "Keith Grehan",
  email: "info@raveforgood.berlin",
} as const;

export function contactMailto(subject?: string) {
  const query = subject ? `?subject=${encodeURIComponent(subject)}` : "";
  return `mailto:${SITE_CONTACT.email}${query}`;
}
