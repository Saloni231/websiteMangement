"use client";

import { memo } from "react";
import { useFormContext, Controller, useWatch } from "react-hook-form";

import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import PriceInput from "@/components/customUI/PriceInput";
import CustomLabel from "@/components/customUI/CustomLabel";
import Offers from "@/components/customUI/Offers";
import ComponentHeading from "@/components/customUI/CompontHeading";

import { WebsiteFormSchema } from "@/store/formSchema";

const TabsArr = [
  { label: "Normal Offer", value: "NormalOffer" },
  { label: "Grey Niche offer", value: "GreyNicheoffer" },
  { label: "Homepage link", value: "Homepagelink" },
];

function CreateOffer() {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<WebsiteFormSchema>();
  const samePriceGrey =
    useWatch({ control, name: "offers.greyNicheOffer.samePrice" }) || false;

  return (
    <div>
      <ComponentHeading heading="Create offer" />
      <Card className="shadow-xs border-none mt-6 p-6 w-full lg:w-[1060px]">
        <Tabs defaultValue="NormalOffer" className="w-full relative">
          <TabsList className="flex h-[48px] w-[536px] rounded-none justify-start border-b bg-transparent p-0 overflow-x-auto whitespace-nowrap scrollbar-hide">
            {TabsArr.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="font-semibold text-[18px] leading-[28px] text-[#0F0C1B66] data-[state=active]:text-[#0F0C1B] tracking-normal shrink-0 min-w-max px-4 pb-3 pt-2 md:text-base border-b-2 border-transparent data-[state=active]:border-b-[#613FDD] rounded-none"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="NormalOffer">
            <div className="flex flex-col md:flex-row gap-8 mx-4 mt-8 mb-0">
              <div className="flex flex-col gap-2 my-2">
                <CustomLabel label="Guest posting" />
                <Controller
                  name="offers.normal.guestPost"
                  control={control}
                  render={({ field }) => (
                    <PriceInput
                      {...field}
                      error={errors.offers?.normal?.guestPost?.message}
                    />
                  )}
                />
              </div>
              <div className="flex flex-col gap-2 my-2">
                <CustomLabel label="Link insertion" />
                <Controller
                  name="offers.normal.linkInsertion"
                  control={control}
                  render={({ field }) => (
                    <PriceInput
                      {...field}
                      error={errors.offers?.normal?.linkInsertion?.message}
                    />
                  )}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="GreyNicheoffer">
            <div className="flex items-center gap-3 m-2 my-8">
              <div className="relative">
                <Controller
                  name="offers.greyNicheOffer.samePrice"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      id="SamePrice"
                      checked={field.value}
                      onCheckedChange={(val) => {
                        field.onChange(!!val);
                      }}
                      className="peer h-5 w-5 rounded-full border border-gray-300 bg-white data-[state=checked]:bg-white  data-[state=checked]:border-[#613FDD] data-[state=checked]:text-white focus-visible:ring-2 focus-visible:ring-[#EDE9FE] hover:ring-4 hover:ring-[#EDE9FE] hover:bg-[#EDE9FE] transition-all"
                    />
                  )}
                />
                {samePriceGrey && (
                  <div className="pointer-events-none absolute top-1/2 left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#613FDD]" />
                )}
              </div>
              <Label
                htmlFor="SamePrice"
                className="font-medium text-[14px] leading-[20px] tracking-normal text-[#0F0C1B99]"
              >
                I offer same price for all grey niches
              </Label>
            </div>

            {samePriceGrey && (
              <div className="flex flex-col gap-2 m-2 my-4">
                <CustomLabel label="Enter Price" />
                <Controller
                  name="offers.greyNicheOffer.price"
                  control={control}
                  render={({ field }) => (
                    <PriceInput
                      {...field}
                      error={errors.offers?.greyNicheOffer?.price?.message}
                    />
                  )}
                />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4 m-2">
              <Offers disabled={samePriceGrey} />
            </div>
          </TabsContent>

          <TabsContent value="Homepagelink">
            <div className="flex flex-col gap-8 mx-4 mt-8 mb-0">
              <div className="flex flex-col gap-2">
                <CustomLabel label="Price" />
                <Controller
                  name="offers.homepageOffer.price"
                  control={control}
                  render={({ field }) => (
                    <PriceInput
                      {...field}
                      error={errors.offers?.homepageOffer?.price?.message}
                    />
                  )}
                />
              </div>
              <div className="flex flex-col gap-2">
                <CustomLabel label="Offer Guidelines" />
                <Textarea
                  {...register("offers.homepageOffer.description")}
                  placeholder="Description"
                  className={`w-full lg:w-[856px] h-24 font-medium text-[14px] leading-[20px] tracking-normal placeholder:text-[#0F0C1B66] border-[#EAEAEA] rounded-md hover:shadow-[0_0_0_3px_rgba(97,63,221,0.1)] focus:outline-none focus:shadow-[inset_0_0_5.5px_0_rgba(0,0,0,0.1)] transition focus:ring-0 focus-visible:ring-0 focus-visible:border-[#EAEAEA] ${
                    errors.offers?.homepageOffer?.description?.message &&
                    "border-red-500"
                  }`}
                />
                {errors.offers?.homepageOffer?.description?.message && (
                  <span className="text-red-500 text-sm">
                    {errors.offers?.homepageOffer?.description?.message}
                  </span>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}

export default memo(CreateOffer);
