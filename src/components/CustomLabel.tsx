import { Label } from "@radix-ui/react-label";

type LabelProps = {
  label: string;
};

export default function CustomLable({ label }: LabelProps) {
  return (
    <Label
      htmlFor="website"
      className="text-[#0F0C1B] text-[14px] font-medium leading-[20px]"
    >
      {label}
    </Label>
  );
}
