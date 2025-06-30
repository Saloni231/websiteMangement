"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Precondition from "@/components/Form/Precondition";
import { Button } from "@/components/ui/button";

import { useStore, WebsiteFormData } from "@/store/store";
import { useCountryStore } from "@/store/countryData";
import { websiteFormSchema, WebsiteFormSchema } from "@/store/formSchema";

const CreateOffer = dynamic(() => import("@/components/Form/CreateOffer"), {
  ssr: false,
});
const ArticleSpecification = dynamic(
  () => import("@/components/Form/ArticleSpecification"),
  {
    ssr: false,
  }
);
const WebsiteDetail = dynamic(() => import("@/components/Form/WebsiteDetail"), {
  ssr: false,
});

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
  const { addData, selectedWebsite, data, setSelectedWebsite } = useStore();
  const [isLoading, setIsLoading] = useState(true);

  const form = useForm<WebsiteFormSchema>({
    resolver: zodResolver(websiteFormSchema),
    defaultValues: formInitialValue,
    mode: "onSubmit",
  });

  const {
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
    setFocus,
  } = form;

  const formData = watch();

  const { fetchCountries, countries } = useCountryStore();

  useEffect(() => {
    if (countries.length === 0) {
      fetchCountries();
    }
  }, [fetchCountries, countries]);

  useEffect(() => {
    if (selectedWebsite) {
      Object.keys(selectedWebsite).forEach((key) => {
        setValue(
          key as keyof WebsiteFormData,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          selectedWebsite[key as keyof WebsiteFormData] as any
        );
      });
    } else {
      const savedData = localStorage.getItem("websiteFormData");
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        Object.keys(parsedData).forEach((key) => {
          if (parsedData[key] !== undefined) {
            setValue(key as keyof WebsiteFormSchema, parsedData[key]);
          }
        });
      }
    }
    setIsLoading(false);
  }, [selectedWebsite, setValue]);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("websiteFormData", JSON.stringify(formData));
    }
  }, [formData, isLoading]);

  const onSubmit = (newData: WebsiteFormSchema) => {
    if (selectedWebsite) {
      const index = data.findIndex(
        (item) => item.website === selectedWebsite.website
      );
      useStore.getState().data[index] = newData;
    } else {
      addData(newData);
    }
    localStorage.removeItem("websiteFormData");
    reset(formInitialValue);
    setSelectedWebsite(null);
    redirect("/my-website");
  };

  useEffect(() => {
    if (errors) {
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setFocus(firstErrorField as any);
      }
    }
  }, [errors, setFocus]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
