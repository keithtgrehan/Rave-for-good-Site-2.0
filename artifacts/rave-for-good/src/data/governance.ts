export type CommitteeMember = {
  id: string;
  fullName: string;
  role: string;
  verified: true;
};

// Populate only from reviewed governance documentation.
export const committeeMembers: CommitteeMember[] = [];
