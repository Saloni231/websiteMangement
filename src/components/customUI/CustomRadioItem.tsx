import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Controller, useFormContext } from "react-hook-form";

interface CustomRadioItemProps {
  question: string;
  option: { value: string }[];
  name: string;
}

export default function CustomRadioItem({
  question,
  option,
  name,
}: CustomRadioItemProps) {
  const { control } = useFormContext();

  return (
    <div className="flex flex-col space-y-1 gap-2 w-full">
      <Label className="text-[#0F0C1B] text-[14px] font-[400] leading-[20px]">
        {question}
      </Label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <RadioGroup
            {...field}
            onValueChange={field.onChange}
            value={field.value}
          >
            {option.map(({ value }) => (
              <div key={value} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={value}
                  id={value}
                  className="w-4 h-4 rounded-full text-[#613FDD] border-gray-300 data-[state=checked]:border-[#613FDD]"
                />
                <Label
                  htmlFor={value}
                  className="text-[#0F0C1B99] text-[14px] font-[400]"
                >
                  {value}
                </Label>
              </div>
            ))}
          </RadioGroup>
        )}
      />
    </div>
  );
}
