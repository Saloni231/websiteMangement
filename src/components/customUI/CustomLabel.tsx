import { Label } from "../ui/label";

type LabelProps = {
  label: string;
};

export default function CustomLabel({ label }: LabelProps) {
  return (
    <Label
      htmlFor="website"
      className="text-[#0F0C1B] font-medium text-[14px] leading-[20px] tracking-normal"
    >
      {label}
    </Label>
  );
}
