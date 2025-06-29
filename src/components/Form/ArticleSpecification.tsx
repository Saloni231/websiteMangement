"use client";

import { Controller, useFormContext, useWatch } from "react-hook-form";
import ComponentHeading from "../customUI/CompontHeading";
import CustomRadioItem from "../customUI/CustomRadioItem";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { WebsiteFormSchema } from "@/store/formSchema";

export default function ArticleSpecification() {
  const {
    formState: { errors },
    control,
  } = useFormContext<WebsiteFormSchema>();

  const wordLimit = useWatch({ control, name: "article.wordLimit" });
  const linkLimit = useWatch({ control, name: "article.advertiserLinkLimit" });

  const wordLimitErrors =
    wordLimit === "No, the advertiser (client) needs to provide the content";
  const linkLimitErrors =
    linkLimit === "A maximum number of links to the advertiser:";

  return (
    <div className="mt-10 mb-10 lg:w-[1024px] w-full">
      <ComponentHeading heading="Article specification" />
      <Card className="shadow-xs border-none my-6 p-6 flex flex-col gap-8 lg:gap-16 lg:flex-row">
        <div className="flex flex-col gap-6">
          <CustomRadioItem
            question="Is writing of an article included in the offer?"
            option={[
              { value: "Yes" },
              {
                value:
                  "No, the advertiser (client) needs to provide the content",
              },
            ]}
            name="article.writingIncluded"
          />

          <div className="flex flex-col gap-2">
            <CustomRadioItem
              question="Number of words in the article"
              option={[
                { value: "Length of the article is not limited." },
                {
                  value:
                    "No, the advertiser (client) needs to provide the content",
                },
              ]}
              name="article.wordLimit"
            />
            <div className="flex gap-6 mx-4">
              <div className="flex flex-col">
                <Controller
                  name="article.minWords"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="number"
                      placeholder="Min"
                      className={`w-[95px] h-[40px] text-[14px] ${
                        errors.article?.minWords?.message &&
                        wordLimitErrors &&
                        "border-red-500"
                      }`}
                      value={field.value || ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        const numericValue =
                          value === "" ? undefined : parseFloat(value);
                        field.onChange(numericValue);
                      }}
                    />
                  )}
                />
                {errors.article?.minWords?.message && wordLimitErrors && (
                  <span className="text-red-500 text-sm">
                    {errors.article.minWords.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <Controller
                  name="article.maxWords"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="number"
                      placeholder="Max"
                      className={`w-[95px] h-[40px] text-[14px] ${
                        errors.article?.maxWords?.message &&
                        wordLimitErrors &&
                        "border-red-500"
                      }`}
                      value={field.value || ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        const numericValue =
                          value === "" ? undefined : parseFloat(value);
                        field.onChange(numericValue);
                      }}
                    />
                  )}
                />
                {errors.article?.maxWords && wordLimitErrors && (
                  <span className="text-red-500 text-sm">
                    {errors.article.maxWords.message}
                  </span>
                )}
              </div>
            </div>
          </div>

          <CustomRadioItem
            name="article.doFollowLinks"
            question="I allow DOFOLLOW links in the article"
            option={[{ value: "Yes" }, { value: "No" }]}
          />

          <CustomRadioItem
            question="Type of links allowed:"
            option={[
              { value: "Only brand links, URL, navigational, graphic links." },
              { value: "Only branded and generic links." },
              { value: "Also mixed links (partly exact match anchors)." },
              { value: "All links, including exact match anchors." },
            ]}
            name="article.linkType"
          />
        </div>

        <div className="flex flex-col gap-6">
          <CustomRadioItem
            question="Tagging articles policy:"
            option={[
              { value: "We do not tag paid articles." },
              {
                value: "Articles are tagged only at the advertiser’s request.",
              },
              { value: `We always tag articles: "Sponsored article".` },
            ]}
            name="article.taggingPolicy"
          />

          <div className="flex flex-col gap-2">
            <CustomRadioItem
              question="A number of links to the advertiser in the article:"
              option={[
                { value: "We do not tag paid articles." },
                { value: "A maximum number of links to the advertiser:" },
              ]}
              name="article.advertiserLinkLimit"
            />
            <div className="flex gap-6 mx-4">
              <div className="flex flex-col">
                <Controller
                  name="article.minAdvertiserLinks"
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="number"
                      placeholder="Min"
                      className={`w-[95px] h-[40px] text-[14px] ${
                        errors.article?.minAdvertiserLinks?.message &&
                        linkLimitErrors &&
                        "border-red-500"
                      }`}
                      value={field.value || ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        const numericValue =
                          value === "" ? undefined : parseFloat(value);
                        field.onChange(numericValue);
                      }}
                    />
                  )}
                />
                {errors.article?.minAdvertiserLinks && linkLimitErrors && (
                  <span className="text-red-500 text-sm">
                    {errors.article.minAdvertiserLinks.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <Controller
                  name="article.maxAdvertiserLinks"
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="number"
                      placeholder="Max"
                      className={`w-[95px] h-[40px] text-[14px] ${
                        errors.article?.maxAdvertiserLinks?.message &&
                        linkLimitErrors &&
                        "border-red-500"
                      }`}
                      value={field.value || ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        const numericValue =
                          value === "" ? undefined : parseFloat(value);
                        field.onChange(numericValue);
                      }}
                    />
                  )}
                />
                {errors.article?.maxAdvertiserLinks && linkLimitErrors && (
                  <span className="text-red-500 text-sm">
                    {errors.article.maxAdvertiserLinks.message}
                  </span>
                )}
              </div>
            </div>
          </div>

          <CustomRadioItem
            name="article.otherLinksPolicy"
            question="Other links in the article:"
            option={[
              {
                value:
                  "We allow links to other websites in the content of the article.",
              },
              {
                value:
                  "We DO NOT allow links to other websites in the content of the article.",
              },
            ]}
          />

          <div className="flex flex-col gap-2">
            <Label
              htmlFor="question"
              className="text-[#0F0C1B] text-[14px] font-[400] leading-[20px]"
            >
              Other content rules/specifications:
            </Label>
            <Controller
              name="article.otherSpec"
              render={({ field }) => (
                <Textarea
                  {...field}
                  placeholder="Description"
                  className="w-full md:w-[471px] h-24 font-normal text-[14px] leading-[20px] tracking-[0px] placeholder:text-[#0F0C1B66] border-[#EAEAEA] rounded-md hover:shadow-[0_0_0_3px_rgba(97,63,221,0.1)] focus:outline-none focus:shadow-[inset_0_0_5.5px_0_rgba(0,0,0,0.1)] transition focus:ring-0 focus-visible:ring-0 focus-visible:border-[#EAEAEA]"
                />
              )}
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
