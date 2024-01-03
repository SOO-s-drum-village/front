"use client";

import React, { useState } from "react";
import { languages } from "@/app/i18n/settings";
import Link from "next/link";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "@/app/i18n/client";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

const SearchIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-7 h-7 cursor-pointer"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
      />
    </svg>
  );
};

const UserIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-7 h-7 cursor-pointer"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
      />
    </svg>
  );
};

export const Header = ({ lng }: any) => {
  const { t } = useTranslation(lng, "header");
  const [lang, setLang] = useState(lng);
  const pathname = usePathname();
  const router = useRouter();

  const test = (value: any) => {
    let path = pathname.split("/");
    path[1] = value;
    const newUrl = path.join("/");
    return router.push(newUrl);
  };

  return (
    <div className="sticky top-0 left-0 w-full z-50 rounded-none py-4 px-4  lg:px-12 flex justify-between items-center bg-white">
      <div>
        <Link href={`/${lng}`}>
          <span className="text-2xl font-bold">Drum village</span>
        </Link>
      </div>
      <div className="flex">
        <div className="flex items-center">
          <SearchIcon />
          <DropdownMenu>
            <DropdownMenuTrigger className="mx-1 md:mx-3">
              <UserIcon />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{t("my-account")}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>{t("my-profile")}</DropdownMenuItem>
              <DropdownMenuItem>{t("logout")}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="mx-2 flex items-center">
          {/* <Trans i18nKey="languageSwitcher" t={t}>
            <span>{lng}</span>
          </Trans> */}
          {/* {languages
            .filter((l) => lng !== l)
            .map((l, index) => {
              return (
                <span key={l} className="font-bold ">
                  <Link href={`/${l}`} prefetch={false}>
                    {lng === "en" ? "한국어" : "English"}
                  </Link>
                </span>
              );
            })} */}
          <Select onValueChange={test}>
            <SelectTrigger className="w-[130px] ">
              <SelectValue
                placeholder={`${lng === "kr" ? "한국어" : "English"}`}
              />
            </SelectTrigger>
            <SelectContent>
              {languages
                .filter((l) => lng !== l)
                .map((l, index) => {
                  return (
                    // <span key={l} className="font-bold ">
                    //   <Link href={`/${l}`} prefetch={false}>
                    //     {lng === "en" ? "한국어" : "English"}
                    //   </Link>
                    // </span>
                    <SelectItem key={l} value={l}>
                      {l === `kr` ? "한국어" : "English"}
                    </SelectItem>
                  );
                })}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
