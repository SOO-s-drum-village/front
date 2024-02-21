"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTranslation } from "@/app/i18n/client";
import { useRouter } from "next/navigation";
import FindEmailForm from "./FindEmailForm";
import FindPasswordForm from "./FindPasswordForm";

interface Props {
  lng: "ko" | "en";
}

const FindEmailContainer = ({ lng }: Props) => {
  const { t } = useTranslation(lng, "auth");
  const router = useRouter();
  const [resetedPassword, setResetedPassword] = useState("");

  return (
    <Card className="w-full md:max-w-screen-sm mx-auto rounded-xl bg-white max-h-[800px]  border-none p-0 md:p-4 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 cursor-pointer"
            onClick={() => router.back()}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>

          <span className="ml-2">{t("find-password")}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <FindPasswordForm
          lng={lng}
          handleResetedPassword={(value) => setResetedPassword(value)}
        />
      </CardContent>
      <CardFooter>
        {resetedPassword && lng === "ko" && (
          <div className="mt-4">
            <span>초기화된 비밀번호는</span>
            <strong className="mx-1 font-bold text-lg md:text-xl">
              {resetedPassword}
            </strong>
            입니다
          </div>
        )}
        {resetedPassword && lng === "en" && (
          <div className="mt-4">
            <span>he initialized password is </span>
            <strong className="mx-1 font-bold text-lg md:text-xl">
              {resetedPassword}
            </strong>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default FindEmailContainer;
