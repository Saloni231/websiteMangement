import { cn } from "@/lib/utils";
import CustomLabel from "./CustomLabel";
import PriceInput from "./PriceInput";

type OfferProps = {
  heading: string;
  disabled: boolean;
};

export default function Offers({ heading, disabled }: OfferProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        disabled && "opacity-20 pointer-events-none select-none"
      )}
    >
      <h3 className="font-medium text-[16px] leading-[24px] text-[#0F0C1B99]">
        {heading}
      </h3>
      <div className="flex flex-col gap-2">
        <CustomLabel label="Price for Guest Posting" />
        <PriceInput />
      </div>
      <div className="flex flex-col gap-2">
        <CustomLabel label="Price for Link Insertion" />
        <PriceInput />
      </div>
    </div>
  );
}
