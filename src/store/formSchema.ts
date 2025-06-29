import { z } from "zod";

const nonNegativePrice = z
  .number({ required_error: "Price is required" })
  .min(1, "Price must be non-negative");

const greyNicheCategorySchema = z.object({
  guestPost: z.number().optional(),
  linkInsertion: z.number().optional(),
});

export const websiteFormSchema = z.object({
  website: z
    .string()
    .min(1, "Website URL is required")
    .refine((val) => /^https?:\/\/[\w.-]+(?:\.[\w\.-]+)+/.test(val), {
      message: "Enter a valid URL",
    }),
  language: z.string().min(1, "Primary Language is required"),
  country: z.string().min(1, "Country is required"),
  description: z.string().min(1, "Description is required"),
  categories: z.array(z.string()).optional(),
  isOwner: z.boolean().optional(),
  offers: z.object({
    normal: z.object({
      guestPost: nonNegativePrice,
      linkInsertion: nonNegativePrice,
    }),
    greyNicheOffer: z
      .object({
        samePrice: z.boolean().optional(),
        price: z.number().optional(),
        categories: z
          .object({
            Gambling: greyNicheCategorySchema,
            Crypto: greyNicheCategorySchema,
            Adult: greyNicheCategorySchema,
            CBD: greyNicheCategorySchema,
            Pharmacy: greyNicheCategorySchema,
            Loan: greyNicheCategorySchema,
          })
          .optional(),
      })
      .refine(
        (data) => {
          if (data.samePrice) {
            if (data.price === 0) {
              return false;
            }
          }
          return true;
        },
        {
          message: "Price must be non-negative",
          path: ["price"],
        }
      )
      .refine(
        (data) => {
          if (!data.samePrice) {
            if (data.categories?.Gambling.guestPost === 0) {
              return false;
            }
          }
          return true;
        },
        {
          message: "Price must be non-negative",
          path: ["categories.Gambling.guestPost"],
        }
      )
      .refine(
        (data) => {
          if (!data.samePrice) {
            if (data.categories?.Gambling.linkInsertion === 0) {
              return false;
            }
          }
          return true;
        },
        {
          message: "Price must be non-negative",
          path: ["categories.Gambling.linkInsertion"],
        }
      )
      .refine(
        (data) => {
          if (!data.samePrice) {
            if (data.categories?.Adult.guestPost === 0) {
              return false;
            }
          }
          return true;
        },
        {
          message: "Price must be non-negative",
          path: ["categories.Adult.guestPost"],
        }
      )
      .refine(
        (data) => {
          if (!data.samePrice) {
            if (data.categories?.Adult.linkInsertion === 0) {
              return false;
            }
          }
          return true;
        },
        {
          message: "Price must be non-negative",
          path: ["categories.Adult.linkInsertion"],
        }
      )
      .refine(
        (data) => {
          if (!data.samePrice) {
            if (data.categories?.CBD.guestPost === 0) {
              return false;
            }
          }
          return true;
        },
        {
          message: "Price must be non-negative",
          path: ["categories.CBD.guestPost"],
        }
      )
      .refine(
        (data) => {
          if (!data.samePrice) {
            if (data.categories?.CBD.linkInsertion === 0) {
              return false;
            }
          }
          return true;
        },
        {
          message: "Price must be non-negative",
          path: ["categories.CBD.linkInsertion"],
        }
      )
      .refine(
        (data) => {
          if (!data.samePrice) {
            if (data.categories?.Crypto.guestPost === 0) {
              return false;
            }
          }
          return true;
        },
        {
          message: "Price must be non-negative",
          path: ["categories.Crypto.guestPost"],
        }
      )
      .refine(
        (data) => {
          if (!data.samePrice) {
            if (data.categories?.Crypto.linkInsertion === 0) {
              return false;
            }
          }
          return true;
        },
        {
          message: "Price must be non-negative",
          path: ["categories.Crypto.linkInsertion"],
        }
      )
      .refine(
        (data) => {
          if (!data.samePrice) {
            if (data.categories?.Loan.guestPost === 0) {
              return false;
            }
          }
          return true;
        },
        {
          message: "Price must be non-negative",
          path: ["categories.Loan.guestPost"],
        }
      )
      .refine(
        (data) => {
          if (!data.samePrice) {
            if (data.categories?.Loan.linkInsertion === 0) {
              return false;
            }
          }
          return true;
        },
        {
          message: "Price must be non-negative",
          path: ["categories.Loan.linkInsertion"],
        }
      )
      .refine(
        (data) => {
          if (!data.samePrice) {
            if (data.categories?.Pharmacy.guestPost === 0) {
              return false;
            }
          }
          return true;
        },
        {
          message: "Price must be non-negative",
          path: ["categories.Pharmacy.guestPost"],
        }
      )
      .refine(
        (data) => {
          if (!data.samePrice) {
            if (data.categories?.Pharmacy.linkInsertion === 0) {
              return false;
            }
          }
          return true;
        },
        {
          message: "Price must be non-negative",
          path: ["categories.Pharmacy.linkInsertion"],
        }
      ),
    homepageOffer: z.object({
      price: nonNegativePrice,
      description: z.string().min(1, "Homepage offer description is required"),
    }),
  }),
  preconditionAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the preconditions to continue.",
  }),
  article: z
    .object({
      writingIncluded: z.string(),
      wordLimit: z.string(),
      doFollowLinks: z.string(),
      linkType: z.string(),
      taggingPolicy: z.string(),
      advertiserLinkLimit: z.string(),
      otherLinksPolicy: z.string(),
      otherSpec: z.string().optional(),
      minWords: z.number().optional(),
      maxWords: z.number().optional(),
      minAdvertiserLinks: z.number().optional(),
      maxAdvertiserLinks: z.number().optional(),
    })
    .refine(
      (data) => {
        if (
          data.wordLimit ===
          "No, the advertiser (client) needs to provide the content"
        ) {
          if (data.minWords === undefined) {
            return false;
          }
        }
        return true;
      },
      {
        message:
          "Min words are required when the advertiser provides the content.",
        path: ["minWords"],
      }
    )
    .refine(
      (data) => {
        if (
          data.wordLimit ===
          "No, the advertiser (client) needs to provide the content"
        ) {
          if (data.maxWords === undefined) {
            return false;
          }
        }
        return true;
      },
      {
        message:
          "Max words are required when the advertiser provides the content.",
        path: ["maxWords"],
      }
    )
    .refine(
      (data) => {
        if (
          data.advertiserLinkLimit ===
          "A maximum number of links to the advertiser:"
        ) {
          if (data.minAdvertiserLinks === undefined) {
            return false;
          }
        }
        return true;
      },
      {
        message: "Min number of links are required.",
        path: ["minAdvertiserLinks"],
      }
    )
    .refine(
      (data) => {
        if (
          data.advertiserLinkLimit ===
          "A maximum number of links to the advertiser:"
        ) {
          if (data.maxAdvertiserLinks === undefined) {
            return false;
          }
        }
        return true;
      },
      {
        message: "Max number of links are required.",
        path: ["maxAdvertiserLinks"],
      }
    ),
});

export type WebsiteFormSchema = z.infer<typeof websiteFormSchema>;
