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
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import useToast from "@/hooks/useToast";
import { handleFindPassword } from "@/apis/auth";
import { useLoading } from "@toss/use-loading";
import * as yup from "yup";
import FindPasswordForm from "./FindPasswordForm";

interface Props {
  lng: "ko" | "en";
}

const schema = yup
  .object({
    cardNumber: yup.string().required("카드번호 16자를 입력해주세요."),
    email: yup.string().email("유효한 이메일 형식이 아닙니다.").required(),
    cardPwd2digit: yup
      .string()
      .length(2, "카드 비밀번호 앞 2자리를 입력해주세요.")
      .required("카드 비밀번호 앞 2자리를 입력해주세요."),
  })
  .required();
export type FindPWFormData = yup.InferType<typeof schema>;

const FindEmailContainer = ({ lng }: Props) => {
  const router = useRouter();
  const [resetedPassword, setResetedPassword] = useState("");
  const { errorToast, successToast } = useToast();
  const [isLoading, startTransition] = useLoading();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { t } = useTranslation(lng, "auth");

  const findEmailSubmit = async (payload: FindPWFormData) => {
    try {
      const response = await startTransition(
        handleFindPassword({
          email: payload.email,
          cardNumber: payload.cardNumber.replace(/-/g, ""),
          cardPwd2digit: payload.cardPwd2digit,
        })
      );
      if (response.password) {
        setResetedPassword(response.password);
      }
      successToast(t("find-password-success"));
    } catch (error: any) {
      console.log("error", error);
      errorToast(error.message);
    }
  };

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
          isLoading={isLoading}
          isValid={isValid}
          errors={errors}
          register={register}
          onSubmit={handleSubmit(findEmailSubmit)}
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
