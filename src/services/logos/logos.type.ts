export interface Logo {
  id: number;
  name: string;
  url: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
}

export interface CreateLogo {
  urlFile: string;
  fileName: string;
}

export type CreatedLogo = Logo & CreateLogo;
