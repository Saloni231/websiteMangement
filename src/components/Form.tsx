"use client";

import ArticleSpecification from "@/components/ArticleSpecification";
import CreateOffer from "@/components/CreateOffer";
import Precondition from "@/components/Precondition";
import { Button } from "@/components/ui/button";
import WebsiteDetail, { countryType } from "@/components/WebsiteDetail";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { websiteFormSchema, WebsiteFormSchema } from "../store/formSchema";

const formInitialValue = {
  website: "",
  language: "",
  country: "",
  description: "",
  categories: [],
  preconditionAccepted: false,
  preconditionExpanded: false,
  offers: {
    normal: {
      guestPost: 0,
      linkInsertion: 0,
    },
    greyNicheOffer: {
      samePrice: false,
      price: undefined,
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
};

interface FormProps {
  countries: countryType[];
}

export default function Form({ countries }: FormProps) {
  const form = useForm<WebsiteFormSchema>({
    resolver: zodResolver(websiteFormSchema),
    defaultValues: formInitialValue,
  });

  const onSumbit = (data: WebsiteFormSchema) => {
    console.log("Form submitted", data);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSumbit)}>
        <Precondition />
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
