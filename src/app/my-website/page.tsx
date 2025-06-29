import WebsiteTable from "@/components/Table/Table";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

export default async function MyWebsite() {
  return (
    <div className="mx-10 lg:mx-20 my-6">
      <h2 className="font-semibold text-[24px] leading-[40px] tracking-normal">
        All websites
      </h2>
      <Link href="/my-website/add-website">
        <Button className="bg-[#613FDD] text-[#fff] w-[228px] font-medium text-[12px] leading-[20px] tracking-normal mt-24">
          <PlusIcon size={10} /> Add Website
        </Button>
      </Link>
      <WebsiteTable />
    </div>
  );
}
