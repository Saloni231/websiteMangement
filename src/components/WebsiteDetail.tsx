"use client";

import { useFormContext, Controller } from "react-hook-form";
import CustomLabel from "./customUI/CustomLabel";
import CustomSelectBox from "./customUI/CustomSelectBox";
import { Card } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import ComponentHeading from "./customUI/CompontHeading";
import { useMemo } from "react";

const categories = [
  "Animals / Pets",
  "Art",
  "Auto",
  "Beauty",
  "Blogging",
  "Business / Entrepreneur",
  "Directory",
  "Education",
  "Energy & Solar Energy",
  "Entertainment & Music",
  "Environment",
  "Events",
  "Family / Parenting",
  "Fashion",
  "Finance",
  "Food",
  "Gambling",
  "Gaming",
  "General",
  "Health & Fitness",
  "Home & Garden",
  "Italian Sites",
  "Legal",
  "Lifestyle",
  "Marijuana / Vaporizers",
  "Marketing",
  "Medical",
  "News",
  "Other",
  "Outdoors",
  "Photography",
  "Politics",
  "Real Estate",
  "EnvironmentSafety",
  "SEO",
  "Sex & Adult",
  "Shopping",
];

export type countryType = {
  language: string;
  flag: string;
  name: string;
};

interface WebsiteDetailProps {
  countries: countryType[];
}

export default function WebsiteDetail({ countries }: WebsiteDetailProps) {
  const { register, setValue, watch, control } = useFormContext();

  const selectedCategory = watch("categories") || [];
  const isOwner = watch("isOwner") || false;

  const uniqueCountries = useMemo(() => {
    const map = new Map<string, countryType>();
    for (const country of countries) {
      if (!map.has(country.name)) map.set(country.name, country);
    }
    return Array.from(map.values());
  }, [countries]);

  const handleSelect = (category: string) => {
    const current = watch("categories") || [];
    const updated = current.includes(category)
      ? current.filter((c: string) => c !== category)
      : [...current, category];
    setValue("categories", updated);
  };

  return (
    <div className="mt-16 mb-10">
      <ComponentHeading heading="Website detail" />
      <Card className="shadow-xs border-none my-6 p-6">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex flex-col space-y-1 gap-2 w-full md:w-[264px]">
            <CustomLabel label="Enter website" />
            <Input
              {...register("website")}
              placeholder="Website URL"
              className="font-normal text-[14px] leading-[20px] tracking-[0px] placeholder:text-[#0F0C1B66] border-[#EAEAEA]"
            />
          </div>

          <div className="flex flex-col space-y-1 gap-2 w-full md:w-[264px]">
            <CustomLabel label="Website’s Primary language" />
            <Controller
              name="language"
              control={control}
              render={({ field }) => (
                <CustomSelectBox
                  options={countries}
                  type="language"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>

          <div className="flex flex-col space-y-1 gap-2 w-full md:w-[264px]">
            <CustomLabel label="Your Majority of traffic comes from" />
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <CustomSelectBox
                  options={uniqueCountries}
                  type="country"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <CustomLabel label="Main Category" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-4 gap-x-6 m-2">
            {categories.map((category) => (
              <Label
                key={category}
                className="flex items-center gap-2 cursor-pointer text-[14px] text-[#0F0C1B99]"
              >
                <Checkbox
                  checked={selectedCategory.includes(category)}
                  onCheckedChange={() => handleSelect(category)}
                />
                {category}
              </Label>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 my-2">
          <CustomLabel label="Description of Website" />
          <Textarea
            {...register("description")}
            placeholder="Description"
            className="w-full lg:w-[856px] h-24 text-[14px] placeholder:text-[#0F0C1B66] border-[#EAEAEA]"
          />
        </div>

        <div className="flex gap-2 my-2 items-center">
          <Checkbox
            checked={isOwner}
            onCheckedChange={() => setValue("isOwner", !isOwner)}
          />
          <Label className="text-[14px] text-[#09090B]">
            I am the owner of the website
          </Label>
        </div>
      </Card>
    </div>
  );
}
