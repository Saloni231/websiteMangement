"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";

export type Option = {
  language: string;
  flag: string;
  name: string;
};

type CustomSelectBoxProps = {
  options: Option[];
  type: "language" | "country";
  value: string;
  onChange: (val: string) => void;
  error?: string;
};

export default function CustomSelectBox({
  options,
  type,
  value,
  onChange,
  error,
}: CustomSelectBoxProps) {
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const { setValue } = useFormContext();

  useEffect(() => {
    const match =
      type === "language"
        ? options.find((opt) => opt.language === value)
        : options.find((opt) => opt.name === value);
    if (match) setSelectedOption(match);
    if (!value) return setSelectedOption(null);
  }, [value, options, type]);

  const handleSelect = (option: Option) => {
    setSelectedOption(option);
    setOpen(false);
    onChange(type === "language" ? option.language : option.name);
    if (type === "country") {
      setValue("flag", option.flag);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full font-normal justify-between items-center px-4 py-2",
            "rounded-md border border-[#EAEAEA] bg-white text-gray-600",
            "hover:shadow-[0_0_0_3px_rgba(97,63,221,0.12)]",
            "focus:outline-none focus:ring-2 focus:ring-[#A48AF4]",
            open && "shadow-[0_0_0_3px_rgba(97,63,221,0.2)]",
            "transition-all",
            error && "border-red-500"
          )}
        >
          <div className="flex items-center gap-2">
            {selectedOption && (
              <Image
                src={selectedOption.flag}
                alt="flag"
                width={20}
                height={15}
              />
            )}
            <span className="text-[#0F0C1B66] font-medium text-[14px] leading-[20px] tracking-normal">
              {selectedOption
                ? type === "language"
                  ? selectedOption.language
                  : selectedOption.name
                : `Select ${type === "language" ? "Language" : "Country"}`}
            </span>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[250px] p-0 mt-2 rounded-md border border-[#EAEAEA] shadow-lg bg-white">
        <Command>
          <CommandInput placeholder="Search..." className="h-9 px-3 text-sm" />
          <CommandList>
            <CommandEmpty>No result found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={`${option.language}-${option.name}`}
                  value={`${option.language} ${option.name}`}
                  onSelect={() => handleSelect(option)}
                  className={cn(
                    "px-3 py-2 flex items-center gap-2 text-sm cursor-pointer rounded-sm"
                  )}
                >
                  <Image src={option.flag} alt="flag" width={20} height={15} />
                  <span>
                    {type === "language" ? option.language : option.name}
                  </span>
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4 text-gray-400",
                      selectedOption &&
                        `${selectedOption.language} ${selectedOption.name}` ===
                          `${option.language} ${option.name}`
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
