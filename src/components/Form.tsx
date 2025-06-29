"use client";

import ArticleSpecification from "@/components/ArticleSpecification";
import CreateOffer from "@/components/CreateOffer";
import Precondition from "@/components/Precondition";
import { Button } from "@/components/ui/button";
import WebsiteDetail, { countryType } from "@/components/WebsiteDetail";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { websiteFormSchema, WebsiteFormSchema } from "../store/formSchema";
import { useStore } from "@/store/store";

const formInitialValue: WebsiteFormSchema = {
  website: "",
  language: "",
  country: "",
  description: "",
  categories: [],
  isOwner: false,
  preconditionAccepted: false,
  offers: {
    normal: {
      guestPost: 0,
      linkInsertion: 0,
    },
    greyNicheOffer: {
      samePrice: false,
      price: 0,
      categories: {
        Gambling: { guestPost: 0, linkInsertion: 0 },
        Crypto: { guestPost: 0, linkInsertion: 0 },
        Adult: { guestPost: 0, linkInsertion: 0 },
        CBD: { guestPost: 0, linkInsertion: 0 },
        Pharmacy: { guestPost: 0, linkInsertion: 0 },
        Loan: { guestPost: 0, linkInsertion: 0 },
      },
    },
    homepageOffer: {
      price: 0,
      description: "",
    },
  },
  article: {
    writingIncluded: "Yes",
    wordLimit: "Length of the article is not limited.",
    doFollowLinks: "Yes",
    linkType: "Only brand links, URL, navigational, graphic links.",
    taggingPolicy: "We do not tag paid articles.",
    advertiserLinkLimit: "We do not tag paid articles.",
    otherLinksPolicy:
      "We DO NOT allow links to other websites in the content of the article.",
    otherSpec: "",
    minWords: undefined,
    maxWords: undefined,
    minAdvertiserLinks: undefined,
    maxAdvertiserLinks: undefined,
  },
};

interface FormProps {
  countries: countryType[];
}

export default function Form({ countries }: FormProps) {
  const { data, addData } = useStore();

  const form = useForm<WebsiteFormSchema>({
    resolver: zodResolver(websiteFormSchema),
    defaultValues: formInitialValue,
    mode: "onSubmit",
  });

  const {
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = (newData: WebsiteFormSchema) => {
    console.log("Form submitted", newData);
    addData(newData);
  };

  console.log(data);

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Precondition />
        {errors.preconditionAccepted?.message && (
          <span className="text-red-500 text-sm">
            {errors.preconditionAccepted?.message}
          </span>
        )}
        <WebsiteDetail countries={countries} />
        <CreateOffer />
        <ArticleSpecification />
        <div className="flex justify-end">
          <Button
            type="submit"
            style={{ backgroundColor: "#613FDD", color: "#fff" }}
          >
            Add Website
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
