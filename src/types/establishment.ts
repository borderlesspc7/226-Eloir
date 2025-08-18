export interface Establishment {
  id?: string;
  name: string;
  cnpjCpf: string;
  adress: {
    country: string;
    state: string;
    city: string;
    street: string;
    number: string;
    zipCode: string;
  };
  category: string;
  productsServices: string[];
  plan: string;
  documents: DocumentFile[];
  status: "pending" | "approved" | "rejected";
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export interface DocumentFile {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  uploadedAt: Date;
}

export interface CreateEstablishmentData {
  name: string;
  cnpjCpf: string;
  adress: {
    country: string;
    state: string;
    city: string;
    street: string;
    number: string;
    zipCode: string;
  };
  category: string;
  productsServices: string[];
  plan: string;
  documents: File[];
}

export interface UpdateEstablishmentData {
  name?: string;
  cnpjCpf?: string;
  adress?: {
    country?: string;
    state?: string;
    city?: string;
    street?: string;
    number?: string;
    zipCode?: string;
  };
  category?: string;
  productsServices?: string[];
  plan?: string;
  documents?: File[];
}

export interface EstablishmentFilters {
  category?: string;
  state?: string;
  city?: string;
  status?: "pending" | "approved" | "rejected";
  userId?: string;
}
