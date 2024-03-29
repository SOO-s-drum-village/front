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
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import useToast from "@/hooks/useToast";
import { handleFindEmail } from "@/apis/auth";
import { useLoading } from "@toss/use-loading";
import FindEmailForm from "./FindEmailForm";

interface Props {
  lng: "ko" | "en";
}

const schema = yup
  .object({
    cardNumber: yup.string().required("카드번호 16자를 입력해주세요."),
    name: yup
      .string()
      .min(2, "2글자 이상 입력해주세요.")
      .required("이름은 필수입니다."),
  })
  .required();
export type FindEmailFormData = yup.InferType<typeof schema>;

const FindEmailContainer = ({ lng }: Props) => {
  const { t } = useTranslation(lng, "auth");
  const router = useRouter();
  const [responseEmail, setResponseEmail] = useState("");
  const { errorToast, successToast } = useToast();
  const [isLoading, startTransition] = useLoading();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const findEmailSubmit = async (payload: FindEmailFormData) => {
    try {
      const response = await startTransition(
        handleFindEmail({
          name: payload.name,
          cardNumber: payload.cardNumber.replace(/-/g, ""),
        })
      );
      if (response.id) {
        setResponseEmail(response.id);
      }
      successToast(t("find-email-success"));
    } catch (error: any) {
      console.log("error", error);
      errorToast(error.message);
    }
  };

  return (
    <Card className="w-full md:max-w-screen-sm mx-auto rounded-xl bg-white h-[500px]  border-none p-0 md:p-4 shadow-lg">
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

          <span className="ml-2">{t("find-email")}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <FindEmailForm
          lng={lng}
          register={register}
          isLoading={isLoading}
          isValid={isValid}
          errors={errors}
          onSubmit={handleSubmit(findEmailSubmit)}
        />
      </CardContent>
      <CardFooter>
        {responseEmail && lng === "ko" && (
          <div className="mt-4">
            <span>요청하신 명의자의 이메일은</span>
            <strong className="mx-1 font-bold text-lg md:text-xl">
              {responseEmail}
            </strong>
            입니다
          </div>
        )}
        {responseEmail && lng === "en" && (
          <div className="mt-4">
            <span>The email address of the person making the request is </span>
            <strong className="mx-1 font-bold text-lg md:text-xl">
              {responseEmail}
            </strong>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default FindEmailContainer;
