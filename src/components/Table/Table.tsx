"use client";

import { useMemo, useState } from "react";

import { redirect } from "next/navigation";
import Image from "next/image";

import { ArrowLeft, ArrowRight, PlusIcon } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import { useStore, WebsiteFormData } from "@/store/store";

export default function WebsiteTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data, setSelectedWebsite } = useStore();

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return data.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, data]);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const pageNumbers: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handleRowClick = (item: WebsiteFormData) => {
    setSelectedWebsite(item);
    redirect("/my-website/edit-website");
  };

  function getDomainFromUrl(url: string) {
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.hostname;
    } catch (error) {
      console.error("Invalid URL:", url, error);
      return "";
    }
  }

  const handleAddWebsite = () => {
    localStorage.removeItem("websiteFormData");
    setSelectedWebsite(null);
    setCurrentPage(1);
    redirect("/my-website/add-website");
  };

  return (
    <>
      <Button
        onClick={handleAddWebsite}
        className="bg-[#613FDD] text-[#fff] w-[228px] font-medium text-[12px] leading-[20px] tracking-normal mt-24"
      >
        <PlusIcon size={10} /> Add Website
      </Button>
      <div className="container mx-auto p-4">
        <Table className="min-w-ful  border-collapse shadow-md rounded-lg overflow-hidden">
          <TableHeader>
            <TableRow className="bg-[#613FDD05]">
              <TableCell className="px-6 py-3 font-semibold text-[12px] leading-[16px] tracking-normal text-left text-[#0F0C1B99]">
                Website
              </TableCell>
              <TableCell className="px-6 py-3 font-semibold text-[12px] leading-[16px] tracking-normal text-left text-[#0F0C1B99]">
                Country
              </TableCell>
              <TableCell className="px-6 py-3 font-semibold text-[12px] leading-[16px] tracking-normal text-left text-[#0F0C1B99]">
                Language
              </TableCell>
              <TableCell className="px-6 py-3 font-semibold text-[12px] leading-[16px] tracking-normal text-left text-[#0F0C1B99]">
                Category
              </TableCell>
              <TableCell className="px-6 py-3 font-semibold text-[12px] leading-[16px] tracking-normal text-left text-[#0F0C1B99]">
                Other Categories
              </TableCell>
              <TableCell className="px-6 py-3 font-semibold text-[12px] leading-[16px] tracking-normal text-left text-[#0F0C1B99]">
                Grey Niches
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center text-sm text-gray-500 py-4"
                >
                  No data available.
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((item, index) => {
                let mainCategory = "";
                let otherCategories = "";

                if (item.categories) {
                  mainCategory = item.categories[0];
                  otherCategories = item.categories.slice(1).join(", ");

                  if (item.categories.length > 5) {
                    otherCategories = `${item.categories
                      .slice(1, 6)
                      .join(
                        ", "
                      )} <span class="text-[#613FDD] font-semibold">+${
                      item.categories.length - 5
                    }</span>`;
                  }
                }

                const isSamePrice =
                  item.offers?.greyNicheOffer?.samePrice === true &&
                  typeof item.offers?.greyNicheOffer?.price === "number" &&
                  item.offers.greyNicheOffer.price > 0;

                const isGambling =
                  item.offers?.greyNicheOffer?.categories?.Gambling
                    ?.guestPost &&
                  item.offers?.greyNicheOffer?.categories?.Gambling
                    ?.linkInsertion &&
                  item.offers?.greyNicheOffer?.categories?.Gambling?.guestPost >
                    0 &&
                  item.offers?.greyNicheOffer?.categories?.Gambling
                    ?.linkInsertion > 0;
                const isCrypto =
                  item.offers?.greyNicheOffer?.categories?.Crypto?.guestPost &&
                  item.offers?.greyNicheOffer?.categories?.Crypto
                    ?.linkInsertion &&
                  item.offers?.greyNicheOffer?.categories?.Crypto?.guestPost >
                    0 &&
                  item.offers?.greyNicheOffer?.categories?.Crypto
                    ?.linkInsertion > 0;
                const isLoan =
                  item.offers?.greyNicheOffer?.categories?.Loan?.guestPost &&
                  item.offers?.greyNicheOffer?.categories?.Loan
                    ?.linkInsertion &&
                  item.offers?.greyNicheOffer?.categories?.Loan?.guestPost >
                    0 &&
                  item.offers?.greyNicheOffer?.categories?.Loan?.linkInsertion >
                    0;
                const isAdult =
                  item.offers?.greyNicheOffer?.categories?.Adult?.guestPost &&
                  item.offers?.greyNicheOffer?.categories?.Adult
                    ?.linkInsertion &&
                  item.offers?.greyNicheOffer?.categories?.Adult?.guestPost >
                    0 &&
                  item.offers?.greyNicheOffer?.categories?.Adult
                    ?.linkInsertion > 0;
                const isPharmacy =
                  item.offers?.greyNicheOffer?.categories?.Pharmacy
                    ?.guestPost &&
                  item.offers?.greyNicheOffer?.categories?.Pharmacy
                    ?.linkInsertion &&
                  item.offers?.greyNicheOffer?.categories?.Pharmacy?.guestPost >
                    0 &&
                  item.offers?.greyNicheOffer?.categories?.Pharmacy
                    ?.linkInsertion > 0;
                const isCBD =
                  item.offers?.greyNicheOffer?.categories?.CBD?.guestPost &&
                  item.offers?.greyNicheOffer?.categories?.CBD?.linkInsertion &&
                  item.offers?.greyNicheOffer?.categories?.CBD?.guestPost > 0 &&
                  item.offers?.greyNicheOffer?.categories?.CBD?.linkInsertion >
                    0;

                return (
                  <TableRow
                    key={index}
                    className={`border-t ${
                      index % 2 === 0 ? "bg-[#FEFEFF]" : "bg-[#613FDD05]"
                    }`}
                    onClick={() => handleRowClick(item)}
                  >
                    <TableCell className="px-6 py-3 text-[#0F0C1B] font-normal text-[13px] leading-[18px] tracking-[0.25px]">
                      {getDomainFromUrl(item.website)}
                    </TableCell>
                    <TableCell className="px-6 py-3 text-[#0F0C1B] font-normal text-[13px] leading-[18px] tracking-[0.25px]">
                      <div className="flex items-center gap-2">
                        <Image
                          src={item.flag}
                          alt="flag"
                          width={20}
                          height={15}
                        />{" "}
                        {item.country}
                      </div>
                    </TableCell>
                    <TableCell className="px-6 py-3 text-[#0F0C1B] font-normal text-[13px] leading-[18px] tracking-[0.25px]">
                      {item.language}
                    </TableCell>
                    <TableCell className="px-6 py-3 text-[#0F0C1B] font-normal text-[13px] leading-[18px] tracking-[0.25px]">
                      {mainCategory || "-"}
                    </TableCell>
                    <TableCell className="px-6 py-3 text-[#0F0C1B] font-normal text-[13px] leading-[18px] tracking-[0.25px]">
                      <span
                        dangerouslySetInnerHTML={{
                          __html: otherCategories || "-",
                        }}
                      />
                    </TableCell>
                    <TableCell className="px-6 py-3">
                      <div className="flex items-center gap-2">
                        {(isCrypto || isSamePrice) && (
                          <svg
                            width="16"
                            height="15"
                            viewBox="0 0 16 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M9.38349 8.82537C9.13847 9.81454 7.47775 9.27911 6.93326 9.14299L7.36885 7.39153C7.91335 7.52765 9.63759 7.79082 9.38349 8.82537ZM7.9678 4.99577L7.5685 6.58386C8.02225 6.69276 9.41072 7.15558 9.63759 6.25716C9.86446 5.32247 8.42155 5.10467 7.9678 4.99577ZM15.0463 9.06132C14.0752 12.9454 10.1367 15.3139 6.24356 14.352C2.35949 13.381 -0.0181437 9.44246 0.952875 5.55839C1.92389 1.66527 5.86242 -0.694214 9.75556 0.267729C13.6396 1.23875 16.0173 5.17727 15.0463 9.06132ZM5.61739 8.52589C5.58109 8.62572 5.48127 8.77092 5.2544 8.71647C5.2181 8.71647 4.6736 8.57127 4.6736 8.57127L4.2743 9.47876L5.30884 9.73286C5.50849 9.78731 5.68999 9.83268 5.88057 9.88713L5.55387 11.203L6.34339 11.4026L6.67008 10.0959C6.88788 10.1594 7.09661 10.2048 7.30533 10.2592L6.97863 11.5569L7.77723 11.7566L8.10392 10.4407C9.46516 10.6948 10.4906 10.595 10.9172 9.36079C11.262 8.37162 10.899 7.7999 10.1821 7.42783C10.6994 7.30985 11.0896 6.965 11.1985 6.25716C11.3437 5.29524 10.6086 4.7689 9.60129 4.43313L9.92799 3.11726L9.12939 2.91761L8.81177 4.1881C8.60305 4.13365 8.38525 4.08828 8.16745 4.03383L8.48507 2.75426L7.69555 2.55461L7.36885 3.8614C7.19643 3.8251 7.02401 3.77973 6.86066 3.74343L5.76259 3.46211L5.55387 4.31515C5.55387 4.31515 6.13466 4.45127 6.13466 4.46035C6.45229 4.54202 6.50674 4.75075 6.50674 4.92317L5.60832 8.50774L5.61739 8.52589Z"
                              fill="#613FDD"
                            />
                          </svg>
                        )}
                        {(isGambling || isSamePrice) && (
                          <svg
                            width="14"
                            height="15"
                            viewBox="0 0 14 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M7.26603 7.13689L12.8992 3.58414C12.6863 3.25269 12.397 2.97708 12.0557 2.78037L7.90319 0.383594C7.13929 -0.057593 6.198 -0.057593 5.43407 0.383594L1.28152 2.78037C0.981786 2.95356 0.721866 3.18793 0.518677 3.46822L6.34575 7.13691C6.62715 7.3133 6.98463 7.3133 7.26603 7.13689ZM5.70091 3.30129C5.70074 2.76685 6.13387 2.33344 6.66835 2.33327C7.20279 2.3331 7.6362 2.76623 7.63637 3.3007C7.63654 3.83518 7.20341 4.26856 6.66894 4.26873C6.66884 4.26873 6.66874 4.26873 6.66864 4.26873C6.13429 4.26871 5.70106 3.83562 5.70091 3.30129Z"
                              fill="#613FDD"
                            />
                            <path
                              d="M6.61287 7.61925C6.44803 7.59389 6.29013 7.53507 6.14888 7.4464L0.324477 3.77921C0.141442 4.13091 0.04585 4.52153 0.0457764 4.91799V9.71302C0.0459973 10.5951 0.516692 11.4102 1.28062 11.8513L5.43316 14.2486C5.79243 14.4563 6.19829 14.5699 6.61317 14.5789C6.61317 14.5789 6.61317 14.5774 6.61317 14.5765L6.61287 7.61925ZM1.54776 11.0098C1.16055 10.7246 0.856666 10.0878 0.856666 9.58284C0.856666 9.07792 1.16205 8.87127 1.54926 9.131C1.94832 9.39784 2.28098 10.0519 2.28098 10.5838C2.28098 11.1157 1.94682 11.3048 1.54776 11.0098ZM4.51615 9.60243C4.12895 9.31602 3.82356 8.68036 3.82356 8.17544C3.82356 7.67053 4.12895 7.46388 4.51615 7.7236C4.91521 7.99044 5.24758 8.64447 5.24758 9.17786C5.24758 9.71123 4.91521 9.89743 4.51615 9.60243Z"
                              fill="#613FDD"
                            />
                            <path
                              d="M13.0722 3.90689L7.46154 7.44778C7.31553 7.53962 7.15174 7.59954 6.98096 7.6236V14.5613C7.30583 14.5199 7.61917 14.4142 7.90273 14.2503L12.0553 11.8526C12.8193 11.4115 13.29 10.5963 13.2901 9.71411V4.91937C13.29 4.57024 13.2157 4.22514 13.0722 3.90689ZM8.57573 13.1491C8.18853 13.4077 7.88314 13.2022 7.88314 12.6973C7.88314 12.1924 8.18853 11.5567 8.57573 11.2703C8.97479 10.9739 9.30716 11.1615 9.30716 11.6949C9.30716 12.2283 8.97482 12.8826 8.57573 13.1491ZM8.57573 9.63167C8.18853 9.89019 7.88314 9.68475 7.88314 9.17983C7.88314 8.67492 8.18853 8.03926 8.57573 7.75285C8.97479 7.45755 9.30686 7.64405 9.30686 8.17621C9.30686 8.70838 8.97482 9.36515 8.57573 9.63167ZM11.8225 11.0483C11.4353 11.3068 11.1299 11.1016 11.1299 10.5964C11.1299 10.0912 11.4353 9.45586 11.8225 9.16945C12.2216 8.87445 12.554 9.06065 12.554 9.59402C12.554 10.1274 12.2216 10.7817 11.8225 11.0483ZM11.8225 7.5308C11.4353 7.79082 11.1299 7.58329 11.1299 7.07926C11.1299 6.57523 11.4353 5.93868 11.8225 5.65227C12.2216 5.3558 12.554 5.54377 12.554 6.07684C12.554 6.60991 12.2216 7.26426 11.8225 7.5308Z"
                              fill="#613FDD"
                            />
                          </svg>
                        )}
                        {(isLoan || isSamePrice) && (
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 15 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M7.33416 0.0523987C3.3226 0.0523987 0.0703125 3.30469 0.0703125 7.31624C0.0703125 11.3278 3.3226 14.5801 7.33416 14.5801C11.3457 14.5801 14.598 11.3278 14.598 7.31624C14.598 3.30469 11.3457 0.0523987 7.33416 0.0523987ZM9.42064 10.1799C9.10379 10.5655 8.69127 10.8256 8.21 10.9571C8.00076 11.0139 7.9051 11.1245 7.91706 11.3427C7.92603 11.558 7.91706 11.7702 7.91407 11.9854C7.91407 12.1767 7.81543 12.2784 7.6271 12.2844C7.50454 12.2873 7.38199 12.2903 7.25943 12.2903C7.15181 12.2903 7.0442 12.2903 6.93659 12.2873C6.73332 12.2844 6.63767 12.1678 6.63767 11.9705C6.63468 11.815 6.63468 11.6566 6.63468 11.5012C6.63169 11.1544 6.61973 11.1425 6.28793 11.0887C5.86345 11.0199 5.44496 10.9243 5.05636 10.7359C4.75146 10.5865 4.71858 10.5117 4.80526 10.1889C4.87103 9.94976 4.93679 9.71062 5.01152 9.47447C5.06533 9.3011 5.11614 9.22338 5.20881 9.22338C5.26262 9.22338 5.33137 9.25028 5.42404 9.29811C5.85449 9.5223 6.31184 9.64785 6.79311 9.70763C6.87382 9.7166 6.95452 9.72258 7.03523 9.72258C7.25943 9.72258 7.47764 9.68073 7.68988 9.58806C8.22495 9.3549 8.30865 8.73613 7.85727 8.36547C7.70482 8.23992 7.52846 8.14725 7.34611 8.06654C6.8768 7.86029 6.38956 7.70484 5.94715 7.4388C5.22974 7.00835 4.77537 6.41947 4.82918 5.54662C4.88896 4.56017 5.44795 3.94439 6.35369 3.61557C6.72734 3.48105 6.73033 3.48404 6.73033 3.09544C6.73033 2.96392 6.72734 2.83239 6.73332 2.69787C6.74229 2.40493 6.79012 2.35411 7.08306 2.34514C7.11594 2.34514 7.15181 2.34514 7.1847 2.34514C7.24149 2.34514 7.29829 2.34514 7.35508 2.34514C7.379 2.34514 7.40291 2.34514 7.42384 2.34514C7.97983 2.34514 7.97983 2.36906 7.98282 2.96989C7.98581 3.4123 7.98581 3.4123 8.42523 3.48105C8.76301 3.53486 9.08286 3.6335 9.39374 3.77101C9.56413 3.84574 9.62989 3.96531 9.57609 4.14765C9.49837 4.41668 9.42363 4.6887 9.33994 4.95475C9.28613 5.11617 9.23531 5.1909 9.13966 5.1909C9.08585 5.1909 9.02009 5.16997 8.93639 5.12812C8.50594 4.91888 8.05456 4.81724 7.58226 4.81724C7.52248 4.81724 7.45971 4.82023 7.39992 4.82322C7.25943 4.83219 7.12192 4.85012 6.9904 4.90692C6.52407 5.11019 6.44934 5.62434 6.84691 5.9412C7.04719 6.10261 7.27736 6.21621 7.51351 6.31485C7.92603 6.48524 8.33854 6.64964 8.73013 6.86487C9.9617 7.55239 10.2965 9.11576 9.42064 10.1799Z"
                              fill="#613FDD"
                            />
                          </svg>
                        )}
                        {(isPharmacy || isSamePrice) && (
                          <svg
                            width="15"
                            height="14"
                            viewBox="0 0 15 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5.51201 11.9958C5.77401 12.2259 6.04446 12.4632 6.32266 12.7093C6.32455 12.7109 6.32649 12.7126 6.32843 12.7143L7.25391 13.5137C7.37791 13.6209 7.5318 13.6744 7.6857 13.6744C7.83959 13.6744 7.99353 13.6208 8.11753 13.5137L9.04283 12.7143C9.04477 12.7126 9.04667 12.711 9.04856 12.7093C10.8806 11.0891 12.2542 9.84866 13.248 8.6389C14.4087 7.22597 14.9494 5.94844 14.9494 4.61847C14.9494 2.21225 13.0645 0.327423 10.6584 0.327423C9.57695 0.327423 8.50841 0.73464 7.6857 1.44053C6.86277 0.734596 5.79422 0.327423 4.71273 0.327423C2.3065 0.327379 0.421631 2.21225 0.421631 4.61843C0.421631 7.52702 2.4467 9.30481 5.51201 11.9958ZM5.0435 5.67998H6.80477V3.91862H8.56613V5.67998H10.3275V7.44129H8.56613V9.20257H6.80477V7.44129H5.0435V5.67998Z"
                              fill="#613FDD"
                            />
                          </svg>
                        )}
                        {(isAdult || isSamePrice) && (
                          <svg
                            width="15"
                            height="14"
                            viewBox="0 0 15 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12.2055 5.29927H2.58761C2.51869 5.29929 2.45074 5.28302 2.3893 5.25177C2.32787 5.22053 2.27469 5.1752 2.23411 5.11949C2.19353 5.06378 2.1667 4.99926 2.15581 4.9312C2.14491 4.86315 2.15026 4.79348 2.17142 4.72788L3.58 0.356125C3.6084 0.268089 3.66399 0.19133 3.73878 0.13689C3.81356 0.0824499 3.90369 0.0531348 3.99619 0.0531616H10.7969C10.8894 0.0531348 10.9795 0.0824499 11.0543 0.13689C11.1291 0.19133 11.1847 0.268089 11.2131 0.356125L12.6217 4.72788C12.6428 4.79348 12.6482 4.86315 12.6373 4.9312C12.6264 4.99926 12.5996 5.06378 12.559 5.11949C12.5184 5.1752 12.4652 5.22053 12.4038 5.25177C12.3424 5.28302 12.2744 5.29929 12.2055 5.29927ZM13.9542 7.04798H0.838909C0.722963 7.04798 0.611766 7.00192 0.529779 6.91993C0.447793 6.83794 0.401733 6.72675 0.401733 6.6108C0.401733 6.49485 0.447793 6.38366 0.529779 6.30167C0.611766 6.21968 0.722963 6.17362 0.838909 6.17362H13.9542C14.0701 6.17362 14.1813 6.21968 14.2633 6.30167C14.3453 6.38366 14.3914 6.49485 14.3914 6.6108C14.3914 6.72675 14.3453 6.83794 14.2633 6.91993C14.1813 7.00192 14.0701 7.04798 13.9542 7.04798ZM10.894 13.1684C10.3752 13.1684 9.86802 13.0146 9.43666 12.7264C9.0053 12.4381 8.6691 12.0285 8.47057 11.5492C8.27203 11.0699 8.22009 10.5425 8.3213 10.0336C8.42251 9.52483 8.67233 9.05744 9.03917 8.6906C9.40602 8.32376 9.8734 8.07394 10.3822 7.97273C10.891 7.87152 11.4185 7.92346 11.8978 8.12199C12.3771 8.32053 12.7867 8.65673 13.0749 9.08809C13.3632 9.51945 13.517 10.0266 13.517 10.5454C13.5163 11.2408 13.2397 11.9076 12.748 12.3994C12.2562 12.8912 11.5894 13.1677 10.894 13.1684ZM10.894 8.79668C10.5481 8.79668 10.21 8.89924 9.92243 9.09139C9.63485 9.28354 9.41072 9.55665 9.27836 9.87618C9.14601 10.1957 9.11138 10.5473 9.17885 10.8865C9.24633 11.2258 9.41287 11.5373 9.65744 11.7819C9.902 12.0265 10.2136 12.193 10.5528 12.2605C10.892 12.328 11.2436 12.2933 11.5632 12.161C11.8827 12.0286 12.1558 11.8045 12.3479 11.5169C12.5401 11.2293 12.6427 10.8912 12.6427 10.5454C12.6427 10.0816 12.4584 9.63681 12.1305 9.30886C11.8025 8.98092 11.3577 8.79668 10.894 8.79668ZM3.89914 13.1684C3.38035 13.1684 2.87321 13.0146 2.44185 12.7264C2.01049 12.4381 1.67429 12.0285 1.47575 11.5492C1.27722 11.0699 1.22528 10.5425 1.32649 10.0336C1.4277 9.52483 1.67752 9.05744 2.04436 8.6906C2.4112 8.32376 2.87859 8.07394 3.38741 7.97273C3.89623 7.87152 4.42364 7.92346 4.90294 8.12199C5.38224 8.32053 5.79191 8.65673 6.08013 9.08809C6.36836 9.51945 6.5222 10.0266 6.5222 10.5454C6.5215 11.2408 6.24492 11.9076 5.75315 12.3994C5.26139 12.8912 4.5946 13.1677 3.89914 13.1684ZM3.89914 8.79668C3.55328 8.79668 3.21519 8.89924 2.92761 9.09139C2.64004 9.28354 2.4159 9.55665 2.28355 9.87618C2.15119 10.1957 2.11656 10.5473 2.18404 10.8865C2.25151 11.2258 2.41806 11.5373 2.66262 11.7819C2.90718 12.0265 3.21877 12.193 3.55799 12.2605C3.8972 12.328 4.24881 12.2933 4.56834 12.161C4.88787 12.0286 5.16098 11.8045 5.35313 11.5169C5.54528 11.2293 5.64784 10.8912 5.64784 10.5454C5.64784 10.0816 5.46361 9.63681 5.13566 9.30886C4.80772 8.98092 4.36293 8.79668 3.89914 8.79668ZM8.70808 10.9826C8.59213 10.9826 8.48093 10.9365 8.39895 10.8545C8.31696 10.7725 8.2709 10.6613 8.2709 10.5454C8.2709 10.3135 8.17878 10.0911 8.01481 9.92712C7.85083 9.76315 7.62844 9.67103 7.39655 9.67103C7.16466 9.67103 6.94226 9.76315 6.77829 9.92712C6.61432 10.0911 6.5222 10.3135 6.5222 10.5454C6.5222 10.6613 6.47614 10.7725 6.39415 10.8545C6.31216 10.9365 6.20097 10.9826 6.08502 10.9826C5.96907 10.9826 5.85788 10.9365 5.77589 10.8545C5.6939 10.7725 5.64784 10.6613 5.64784 10.5454C5.64784 10.0816 5.83208 9.63681 6.16003 9.30886C6.48797 8.98092 6.93276 8.79668 7.39655 8.79668C7.86033 8.79668 8.30512 8.98092 8.63307 9.30886C8.96101 9.63681 9.14525 10.0816 9.14525 10.5454C9.14525 10.6613 9.09919 10.7725 9.01721 10.8545C8.93522 10.9365 8.82402 10.9826 8.70808 10.9826Z"
                              fill="#613FDD"
                            />
                          </svg>
                        )}
                        {(isCBD || isSamePrice) && (
                          <svg
                            width="14"
                            height="15"
                            viewBox="0 0 14 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clip-rule="evenodd"
                              d="M5.80899 11.1396C4.72667 11.6096 3.99777 12.6378 3.73582 14.0526C5.44639 13.7354 6.43463 12.7412 6.7487 11.0271C6.48052 11.0542 6.21914 11.0681 5.96373 11.0722L5.80899 11.1396ZM6.69117 10.5807C5.42959 7.78497 3.3251 6.57075 0.274536 6.87551C1.53617 9.67056 3.64037 10.8848 6.69117 10.5807ZM7.01871 10.2197C6.68402 9.51642 6.2921 8.90896 5.84286 8.398L5.76504 8.18971C4.81477 5.64184 5.22437 3.20086 7.01871 0.735596C8.8227 3.21335 9.22835 5.66613 8.2592 8.22443L8.19277 8.40078C7.74441 8.91037 7.35307 9.51712 7.01871 10.2197ZM7.3462 10.5807C10.3976 10.8848 12.5015 9.67056 13.7631 6.87551C10.7117 6.57075 8.60804 7.78567 7.3462 10.5807ZM7.2889 11.0271C7.60308 12.7412 8.59124 13.7354 10.3018 14.0526C10.0399 12.6378 9.31096 11.6096 8.22843 11.1396L8.07388 11.0723C7.81828 11.0681 7.55717 11.0542 7.2889 11.0271Z"
                              fill="#613FDD"
                            />
                          </svg>
                        )}
                        {!isCrypto &&
                          !isGambling &&
                          !isLoan &&
                          !isPharmacy &&
                          !isAdult &&
                          !isCBD &&
                          !isSamePrice &&
                          "-"}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>

        {paginatedData.length > 0 && (
          <div className="flex justify-center items-center mt-6">
            <Button
              variant="outline"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(1)}
              className="px-4 py-2 text-sm text-gray-800 rounded-r-none"
            >
              <ArrowLeft size={10} /> Previous
            </Button>

            {[...pageNumbers].map((page, index) => (
              <Button
                key={index}
                variant="outline"
                onClick={() => {
                  if (typeof page === "number") {
                    setCurrentPage(page);
                  }
                }}
                disabled={currentPage === page}
                className={`px-4 py-2 text-sm rounded-none  ${currentPage === page ? "bg-gray-200" : ""}`}
              >
                {page}
              </Button>
            ))}

            <Button
              variant="outline"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(totalPages)}
              className="px-4 py-2 text-sm text-gray-800 rounded-l-none"
            >
              Next <ArrowRight size={10} />
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
