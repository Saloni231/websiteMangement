import { z } from "zod";

const nonNegativePrice = z
  .number({ required_error: "Price is required" })
  .min(0, "Price must be non-negative");

const greyNicheCategories = [
  "Gambling",
  "Crypto",
  "Adult",
  "CBD",
  "Pharmacy",
  "Loan",
] as const;

const greyNicheCategorySchema = z.object({
  guestPost: nonNegativePrice,
  linkInsertion: nonNegativePrice,
});

const greyNicheCategoriesSchema = z.object(
  Object.fromEntries(
    greyNicheCategories.map((category) => [category, greyNicheCategorySchema])
  )
);

export const websiteFormSchema = z.object({
  website: z.string().url("Enter a valid URL"),
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
        price: nonNegativePrice.optional(),
        categories: greyNicheCategoriesSchema.optional(),
      })
      .superRefine((data, ctx) => {
        if (data.samePrice) {
          if (data.price === undefined) {
            ctx.addIssue({
              path: ["price"],
              code: z.ZodIssueCode.custom,
              message: "Price is required when using same price for all niches",
            });
          }
        } else {
          if (!data.categories) {
            ctx.addIssue({
              path: ["categories"],
              code: z.ZodIssueCode.custom,
              message: "Individual pricing for all categories is required",
            });
          }
        }
      }),

    homepageOffer: z.object({
      price: nonNegativePrice,
      description: z.string().min(1, "Homepage offer description is required"),
    }),
    preconditionAccepted: z.literal(true, {
      errorMap: () => ({
        message: "You must accept the preconditions to continue.",
      }),
    }),
    article: z.object({
      included: z.string(),
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
    }),
  }),
});

export type WebsiteFormSchema = z.infer<typeof websiteFormSchema>;
