import { z } from "zod";

const greyNicheCategorySchema = z.object({
  guestPost: z.number().min(0, { message: "Must be non-negative" }).optional(),
  linkInsertion: z
    .number()
    .min(0, { message: "Must be non-negative" })
    .optional(),
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
  flag: z.string(),
  description: z.string().min(1, "Description is required"),
  categories: z.array(z.string()).optional(),
  isOwner: z.boolean().optional(),
  offers: z.object({
    normal: z.object({
      guestPost: z
        .number()
        .min(0, { message: "Must be non-negative" })
        .optional(),
      linkInsertion: z
        .number()
        .min(0, { message: "Must be non-negative" })
        .optional(),
    }),
    greyNicheOffer: z.object({
      samePrice: z.boolean().optional(),
      price: z.number().min(0, { message: "Must be non-negative" }).optional(),
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
    }),
    homepageOffer: z.object({
      price: z.number().min(0, { message: "Must be non-negative" }).optional(),
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
