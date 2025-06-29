import OfferCategory from "./OfferCategory";
import { WebsiteFormSchema } from "@/store/formSchema";
import { useFormContext } from "react-hook-form";

type OfferProps = {
  disabled: boolean;
};

const categories = ["Gambling", "Crypto", "Adult", "CBD", "Pharmacy", "Loan"];

export default function Offers({ disabled }: OfferProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext<WebsiteFormSchema>();

  return (
    <>
      {categories.map((category) => (
        <OfferCategory
          key={category}
          category={category}
          control={control}
          errors={errors}
          disabled={disabled}
        />
      ))}
    </>
  );
}
