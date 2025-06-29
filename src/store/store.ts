import { create } from "zustand";

export interface WebsiteFormData {
  website: string;
  language: string;
  country: string;
  flag: string;
  description: string;
  categories?: string[];
  isOwner?: boolean;
  offers?: {
    normal?: {
      guestPost?: number;
      linkInsertion?: number;
    };
    greyNicheOffer?: {
      samePrice?: boolean;
      price?: number;
      categories?: {
        Gambling?: {
          guestPost?: number;
          linkInsertion?: number;
        };
        Crypto?: {
          guestPost?: number;
          linkInsertion?: number;
        };
        Adult?: {
          guestPost?: number;
          linkInsertion?: number;
        };
        CBD?: {
          guestPost?: number;
          linkInsertion?: number;
        };
        Pharmacy?: {
          guestPost?: number;
          linkInsertion?: number;
        };
        Loan?: {
          guestPost?: number;
          linkInsertion?: number;
        };
      };
    };
    homepageOffer?: {
      price?: number;
      description: string;
    };
  };
  preconditionAccepted: boolean;
  article: {
    writingIncluded: string;
    wordLimit: string;
    doFollowLinks: string;
    linkType: string;
    taggingPolicy: string;
    advertiserLinkLimit: string;
    otherLinksPolicy: string;
    otherSpec?: string;
  };
}

interface Store {
  data: WebsiteFormData[];
  addData: (newData: WebsiteFormData) => void;
  selectedWebsite: WebsiteFormData | null;
  setSelectedWebsite: (website: WebsiteFormData | null) => void;
}

export const useStore = create<Store>((set) => ({
  data: [],
  addData: (newData: WebsiteFormData) =>
    set((state) => ({ data: [...state.data, newData] })),
  selectedWebsite: null,
  setSelectedWebsite: (website) => set({ selectedWebsite: website }),
}));
