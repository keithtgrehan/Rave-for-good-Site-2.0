export type ConfirmedPartner = {
  id: string;
  name: string;
  role: string;
  website?: string;
  logo?: string;
  verifiedInWriting: true;
};

// Add records only after written confirmation and approval of any supplied logo.
export const confirmedPartners: ConfirmedPartner[] = [];
