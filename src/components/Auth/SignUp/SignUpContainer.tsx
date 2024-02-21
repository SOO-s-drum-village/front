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
import { Modal } from "@/components/Common/Modal";
import { useRouter } from "next/navigation";
import SignUpForm from "./SignUpform";
import { Button } from "@/components/ui/button";
import * as yup from "yup";
import { handleSignUp } from "@/apis/auth";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useLoading } from "@toss/use-loading";
import useToast from "@/hooks/useToast";

const schema = yup
  .object({
    name: yup
      .string()
      .min(2, "2글자 이상 입력해주세요.")
      .required("이름은 필수입니다."),
    password: yup
      .string()
      .min(8, "8글자 이상 입력해주세요.")
      .max(12, "12글자 이내로 입력해주세요.")
      .required(),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref("password")], "비밀번호가 다릅니다"),
    email: yup.string().email("유효한 이메일 형식이 아닙니다.").required(),
    cardNumber: yup.string().required("카드번호 16자를 입력해주세요."),
    cardExpiry: yup.string().required("카드 유효기간 4자리를 입력해주세요."),
    birth: yup
      .string()
      .length(6, "생년월일 6자리를 입력해주세요.")
      .required("생년월일 6자리를 입력해주세요."),
    cardPwd2digit: yup
      .string()
      .length(2, "카드 비밀번호 앞 2자리를 입력해주세요.")
      .required("카드 비밀번호 앞 2자리를 입력해주세요."),
    cardCvc: yup
      .string()
      .length(3, "카드 cvc번호는 3글자이어야 합니다.")
      .required("카드 CVC번호 3자리를 입력해주세요."),
  })
  .required();
export type SignUpFormData = yup.InferType<typeof schema>;

interface Props {
  lng: string;
}

const SignUpContainer = ({ lng }: Props) => {
  const { t } = useTranslation(lng, "auth");
  const router = useRouter();
  const { errorToast, successToast } = useToast();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isLoading, startTransition] = useLoading();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const signUpSubmit = async (payload: SignUpFormData) => {
    const singInPayload = {
      name: payload.name,
      email: payload.email,
      password: payload.password,
      cardNumber: payload.cardNumber.replace(/-/g, ""),
      cardExpiry: payload.cardExpiry.replace(/\//g, ""),
      birth: payload.birth,
      cardPwd2digit: payload.cardPwd2digit,
      cardCvc: payload.cardCvc,
    };

    try {
      await startTransition(handleSignUp(singInPayload));
      successToast(t("signup-success"));
      router.push(`/${lng || "ko"}/auth/sign-in`);
    } catch (error: any) {
      console.log("error", error);
      errorToast(error.response.data.message);
    } finally {
      setIsConfirmModalOpen(false);
    }
  };

  return (
    <section>
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
          <SignUpForm
            lng={lng}
            onSubmit={() => setIsConfirmModalOpen(!isConfirmModalOpen)}
            register={register}
            errors={errors}
            isValid={isValid}
          />
        </CardContent>
      </Card>
      <Modal
        title={t("signup")}
        isOpen={isConfirmModalOpen}
        closeModal={() => setIsConfirmModalOpen(false)}
      >
        <div className="mt-2">
          <p className="text-sm text-gray font-medium">
            {t("signup-description")}
          </p>
        </div>
        <div className="flex justify-end mt-2">
          <div>
            <Button
              className="rounded-lg border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-error hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
              onClick={() => setIsConfirmModalOpen(false)}
            >
              {t("cancel")}
            </Button>
            <Button
              className="ml-2 rounded-lg border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-royalblue hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              disabled={isLoading}
              onClick={handleSubmit(signUpSubmit)}
            >
              {t("confirm")}
            </Button>
          </div>
        </div>
      </Modal>
    </section>
  );
};

export default SignUpContainer;
