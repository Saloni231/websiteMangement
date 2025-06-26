import CustomLable from "./CustomLabel";
import { Card } from "./ui/card";
import { Input } from "./ui/input";

export default function WebsiteDetail() {
  return (
    <div className="my-16">
      <h3 className="font-semibold text-[24px] leading-[40px]">
        Website detail
      </h3>
      <Card className="shadow-xs border-none my-6 p-6">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex flex-col space-y-1 gap-2 w-full md:w-[264px]">
            <CustomLable label="Enter website" />
            <Input
              id="website"
              placeholder="Website URL"
              className="font-normal text-[14px] leading-[20px] tracking-[0px] placeholder:text-[#0F0C1B66;] border-[#EAEAEA] rounded-md hover:shadow-[0_0_0_3px_rgba(97,63,221,0.1)] focus:outline-none focus:shadow-[inset_0_0_5.5px_0_rgba(0,0,0,0.1)] transition focus:ring-0 focus-visible:ring-0 focus-visible:border-[#EAEAEA]"
            />
          </div>
          <div className="flex flex-col space-y-1 gap-2 w-full md:w-[264px]">
            <CustomLable label="Website’s Primary language" />
            <Input
              id="website"
              placeholder="Website URL"
              className="font-normal text-[14px] leading-[20px] tracking-[0px] placeholder:text-[#0F0C1B66;] border-[#EAEAEA] rounded-md hover:shadow-[0_0_0_3px_rgba(97,63,221,0.1)] focus:outline-none focus:shadow-[inset_0_0_5.5px_0_rgba(0,0,0,0.1)] transition focus:ring-0 focus-visible:ring-0 focus-visible:border-[#EAEAEA]"
            />
          </div>
          <div className="flex flex-col space-y-1 gap-2 w-full md:w-[264px]">
            <CustomLable label="Your Majority of traffic comes from" />
            <Input
              id="website"
              placeholder="Website URL"
              className="font-normal text-[14px] leading-[20px] tracking-[0px] placeholder:text-[#0F0C1B66;] border-[#EAEAEA] rounded-md hover:shadow-[0_0_0_3px_rgba(97,63,221,0.1)] focus:outline-none focus:shadow-[inset_0_0_5.5px_0_rgba(0,0,0,0.1)] transition focus:ring-0 focus-visible:ring-0 focus-visible:border-[#EAEAEA]"
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
