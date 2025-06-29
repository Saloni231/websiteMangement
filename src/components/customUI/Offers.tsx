import { cn } from "@/lib/utils";
import CustomLabel from "./CustomLabel";
import PriceInput from "./PriceInput";
import { Controller, useFormContext } from "react-hook-form";
import { WebsiteFormSchema } from "@/store/formSchema";

type OfferProps = {
  disabled: boolean;
};

export default function Offers({ disabled }: OfferProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext<WebsiteFormSchema>();

  return (
    <>
      <div
        className={cn(
          "flex flex-col gap-4",
          disabled && "opacity-20 pointer-events-none select-none"
        )}
      >
        <h3 className="font-semibold text-[16px] leading-[24px] tracking-[-0.25px] text-[#0F0C1B99]">
          Gambling
        </h3>
        <div className="flex flex-col gap-2">
          <CustomLabel label="Price for Guest Posting" />
          <Controller
            name={"offers.greyNicheOffer.categories.Gambling.guestPost"}
            control={control}
            render={({ field }) => (
              <PriceInput
                {...field}
                disabled={disabled}
                error={
                  errors.offers?.greyNicheOffer?.categories?.Gambling?.guestPost
                    ?.message
                }
              />
            )}
          />
        </div>
        <div className="flex flex-col gap-2">
          <CustomLabel label="Price for Link Insertion" />
          <Controller
            name="offers.greyNicheOffer.categories.Gambling.linkInsertion"
            control={control}
            render={({ field }) => (
              <PriceInput
                {...field}
                disabled={disabled}
                error={
                  errors.offers?.greyNicheOffer?.categories?.Gambling
                    ?.linkInsertion?.message
                }
              />
            )}
          />
        </div>
      </div>

      <div
        className={cn(
          "flex flex-col gap-4",
          disabled && "opacity-20 pointer-events-none select-none"
        )}
      >
        <h3 className="font-semibold text-[16px] leading-[24px] tracking-[-0.25px] text-[#0F0C1B99]">
          Crypto
        </h3>
        <div className="flex flex-col gap-2">
          <CustomLabel label="Price for Guest Posting" />
          <Controller
            name={"offers.greyNicheOffer.categories.Crypto.guestPost"}
            control={control}
            render={({ field }) => (
              <PriceInput
                {...field}
                disabled={disabled}
                error={
                  errors.offers?.greyNicheOffer?.categories?.Crypto?.guestPost
                    ?.message
                }
              />
            )}
          />
        </div>
        <div className="flex flex-col gap-2">
          <CustomLabel label="Price for Link Insertion" />
          <Controller
            name="offers.greyNicheOffer.categories.Crypto.linkInsertion"
            control={control}
            render={({ field }) => (
              <PriceInput
                {...field}
                disabled={disabled}
                error={
                  errors.offers?.greyNicheOffer?.categories?.Crypto?.guestPost
                    ?.message
                }
              />
            )}
          />
        </div>
      </div>
      <div
        className={cn(
          "flex flex-col gap-4",
          disabled && "opacity-20 pointer-events-none select-none"
        )}
      >
        <h3 className="font-semibold text-[16px] leading-[24px] tracking-[-0.25px] text-[#0F0C1B99]">
          Adult
        </h3>
        <div className="flex flex-col gap-2">
          <CustomLabel label="Price for Guest Posting" />
          <Controller
            name={"offers.greyNicheOffer.categories.Adult.guestPost"}
            control={control}
            render={({ field }) => (
              <PriceInput
                {...field}
                disabled={disabled}
                error={
                  errors.offers?.greyNicheOffer?.categories?.Adult?.guestPost
                    ?.message
                }
              />
            )}
          />
        </div>
        <div className="flex flex-col gap-2">
          <CustomLabel label="Price for Link Insertion" />
          <Controller
            name="offers.greyNicheOffer.categories.Adult.linkInsertion"
            control={control}
            render={({ field }) => (
              <PriceInput
                {...field}
                disabled={disabled}
                error={
                  errors.offers?.greyNicheOffer?.categories?.Adult?.guestPost
                    ?.message
                }
              />
            )}
          />
        </div>
      </div>
      <div
        className={cn(
          "flex flex-col gap-4",
          disabled && "opacity-20 pointer-events-none select-none"
        )}
      >
        <h3 className="font-semibold text-[16px] leading-[24px] tracking-[-0.25px] text-[#0F0C1B99]">
          CBD
        </h3>
        <div className="flex flex-col gap-2">
          <CustomLabel label="Price for Guest Posting" />
          <Controller
            name={"offers.greyNicheOffer.categories.CBD.guestPost"}
            control={control}
            render={({ field }) => (
              <PriceInput
                {...field}
                disabled={disabled}
                error={
                  errors.offers?.greyNicheOffer?.categories?.CBD?.guestPost
                    ?.message
                }
              />
            )}
          />
        </div>
        <div className="flex flex-col gap-2">
          <CustomLabel label="Price for Link Insertion" />
          <Controller
            name="offers.greyNicheOffer.categories.CBD.linkInsertion"
            control={control}
            render={({ field }) => (
              <PriceInput
                {...field}
                disabled={disabled}
                error={
                  errors.offers?.greyNicheOffer?.categories?.CBD?.guestPost
                    ?.message
                }
              />
            )}
          />
        </div>
      </div>
      <div
        className={cn(
          "flex flex-col gap-4",
          disabled && "opacity-20 pointer-events-none select-none"
        )}
      >
        <h3 className="font-semibold text-[16px] leading-[24px] tracking-[-0.25px] text-[#0F0C1B99]">
          Pharmacy
        </h3>
        <div className="flex flex-col gap-2">
          <CustomLabel label="Price for Guest Posting" />
          <Controller
            name={"offers.greyNicheOffer.categories.Pharmacy.guestPost"}
            control={control}
            render={({ field }) => (
              <PriceInput
                {...field}
                disabled={disabled}
                error={
                  errors.offers?.greyNicheOffer?.categories?.Pharmacy?.guestPost
                    ?.message
                }
              />
            )}
          />
        </div>
        <div className="flex flex-col gap-2">
          <CustomLabel label="Price for Link Insertion" />
          <Controller
            name="offers.greyNicheOffer.categories.Pharmacy.linkInsertion"
            control={control}
            render={({ field }) => (
              <PriceInput
                {...field}
                disabled={disabled}
                error={
                  errors.offers?.greyNicheOffer?.categories?.Pharmacy?.guestPost
                    ?.message
                }
              />
            )}
          />
        </div>
      </div>
      <div
        className={cn(
          "flex flex-col gap-4",
          disabled && "opacity-20 pointer-events-none select-none"
        )}
      >
        <h3 className="font-semibold text-[16px] leading-[24px] tracking-[-0.25px] text-[#0F0C1B99]">
          Loan
        </h3>
        <div className="flex flex-col gap-2">
          <CustomLabel label="Price for Guest Posting" />
          <Controller
            name={"offers.greyNicheOffer.categories.Loan.guestPost"}
            control={control}
            render={({ field }) => (
              <PriceInput
                {...field}
                disabled={disabled}
                error={
                  errors.offers?.greyNicheOffer?.categories?.Loan?.guestPost
                    ?.message
                }
              />
            )}
          />
        </div>
        <div className="flex flex-col gap-2">
          <CustomLabel label="Price for Link Insertion" />
          <Controller
            name="offers.greyNicheOffer.categories.Loan.linkInsertion"
            control={control}
            render={({ field }) => (
              <PriceInput
                {...field}
                disabled={disabled}
                error={
                  errors.offers?.greyNicheOffer?.categories?.Loan?.guestPost
                    ?.message
                }
              />
            )}
          />
        </div>
      </div>
    </>
  );
}
