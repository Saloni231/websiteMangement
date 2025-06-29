"use client";

import ArticleSpecification from "@/components/Form/ArticleSpecification";
import CreateOffer from "@/components/Form/CreateOffer";
import Precondition from "@/components/Form/Precondition";
import { Button } from "@/components/ui/button";
import WebsiteDetail from "@/components/Form/WebsiteDetail";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { websiteFormSchema, WebsiteFormSchema } from "../../store/formSchema";
import { useStore } from "@/store/store";
import { redirect } from "next/navigation";

const formInitialValue: WebsiteFormSchema = {
  website: "",
  language: "",
  country: "",
  flag: "",
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

export default function Form() {
  const { addData, selectedWebsite, data } = useStore();

  const form = useForm<WebsiteFormSchema>({
    resolver: zodResolver(websiteFormSchema),
    defaultValues: selectedWebsite || formInitialValue,
    mode: "onSubmit",
  });

  const {
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = (newData: WebsiteFormSchema) => {
    if (selectedWebsite) {
      const index = data.findIndex(
        (item) => item.website === selectedWebsite.website
      );
      useStore.getState().data[index] = newData;
    } else {
      addData(newData);
    }
    redirect("/my-website");
  };

  return (
    <>
      <h2 className="mx-6 font-semibold text-[32px] leading-[44px] tracking-[-0.25px]">
        {selectedWebsite ? "Edit Website" : "Add a website"}
      </h2>
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Precondition />
          {errors.preconditionAccepted?.message && (
            <span className="text-red-500 text-sm">
              {errors.preconditionAccepted?.message}
            </span>
          )}
          <WebsiteDetail />
          <CreateOffer />
          <ArticleSpecification />
          <div className="flex justify-end">
            <Button type="submit" className="bg-[#613FDD] text-[#fff]">
              {selectedWebsite ? "Edit Website" : "Add a website"}
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
