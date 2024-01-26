"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTranslation } from "@/app/i18n/client";
import { useRouter } from "next/navigation";
import SignUpForm from "./SignUpform";

interface Props {
  lng: string;
}

const SignUpContainer = ({ lng }: Props) => {
  const { t } = useTranslation(lng, "auth");
  const router = useRouter();

  return (
    <Card className="w-full md:max-w-screen-sm mx-auto  rounded-xl bg-white  border-none p-0 md:p-4">
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

          <span className="ml-2">{t("signup")}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <SignUpForm lng={lng} />
      </CardContent>
      <CardFooter className="flex flex-col text-gray font-medium">
        {/* <button className="py-4">
      <span>{t("find-email")}</span>
    </button> */}
        {/* <button
          className="py-4"
          onClick={() => router.push(`/${lng}/auth/sign-up`)}
        >
          <span className="underline">{t("signup")}</span>
        </button> */}
      </CardFooter>
    </Card>
  );
};

export default SignUpContainer;
