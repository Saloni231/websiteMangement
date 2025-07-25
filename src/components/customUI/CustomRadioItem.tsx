import { Controller, useFormContext } from "react-hook-form";

import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

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
      <Label className="text-[#0F0C1B] font-normal text-[14px] leading-[20px] tracking-[0.25px]">
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
                  id={`${name}-${value}`}
                  aria-labelledby={`${name}-${value}-label`}
                  className="w-4 h-4 rounded-full text-[#613FDD] data-[state=checked]:border-[#613FDD] [&_svg]:fill-[#613FDD] hover:ring-4 hover:ring-[#613FDD1C] hover:bg-[#613FDD1C] border-[#BABABA]"
                />
                <Label
                  htmlFor={`${name}-${value}`}
                  id={`${name}-${value}-label`}
                  className="font-normal text-[14px] leading-[20px] tracking-[0.25px] text-[#0F0C1B99] transition-colors duration-200 
                    data-[state=checked]:text-[#0F0C1B] data-[state=checked]:font-medium"
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
