"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTranslation } from "@/app/i18n/client";
import { Language } from "@/types";
import { useRouter } from "next/navigation";
import SignInForm from "./SignInForm";
import { useLoading } from "@toss/use-loading";
import useToast from "@/hooks/useToast";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { getMe, handleSignIn } from "@/apis/auth";
import useUserStore from "@/store/user";
import * as yup from "yup";

interface Props {
  lng: Language;
}

const schema = yup
  .object({
    password: yup
      .string()
      .min(8, "8글자 이상 입력해주세요.")
      .max(12, "12글자 이내로 입력해주세요.")
      .required(),
    email: yup.string().email("유효한 이메일 형식이 아닙니다.").required(),
  })
  .required();
export type SingInFormData = yup.InferType<typeof schema>;

const SignInCard = ({ lng }: Props) => {
  const router = useRouter();
  const { errorToast, successToast } = useToast();
  const { setIsAuth, setUser } = useUserStore();
  const [isLoading, startTransition] = useLoading();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { t } = useTranslation(lng, "auth");

  const signInSubmit = async (payload: SingInFormData) => {
    console.log("hihi");
    try {
      await startTransition(handleSignIn(payload));

      const result = await getMe();

      if (result) {
        setIsAuth(true);
        setUser(result);
      }

      successToast(t("signin-success"));
      router.push(`/${lng}`);
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
          <span className="ml-2">{t("signin")}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <SignInForm
          lng={lng}
          isLoading={isLoading}
          isValid={isValid}
          register={register}
          handleSubmit={handleSubmit(signInSubmit)}
        />
      </CardContent>
      <CardFooter className="flex flex-col text-gray font-medium">
        <div className="flex">
          <button
            className="py-1 mr-3"
            onClick={() => router.push(`/${lng}/auth/find-password`)}
          >
            <span className="underline">{t("find-password")}</span>
          </button>
          <div className="border-r-[1px] border-disabled my-2"></div>
          <button
            className="py-1 ml-3"
            onClick={() => router.push(`/${lng}/auth/find-email`)}
          >
            <span className="underline">{t("find-email")}</span>
          </button>
        </div>
        <button
          className="py-1"
          onClick={() => router.push(`/${lng}/auth/sign-up`)}
        >
          <span className="underline">{t("signup")}</span>
        </button>
      </CardFooter>
    </Card>
  );
};

export default SignInCard;
