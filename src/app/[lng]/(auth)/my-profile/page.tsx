"use client";

import {
  getPaymentMe,
  handleChangePassword,
  updateSubscription,
} from "@/apis/auth";
import { useTranslation } from "@/app/i18n/client";
import { Button } from "@/components/ui/button";
import useToast from "@/hooks/useToast";
import useUserStore from "@/store/user";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Modal } from "@/components/Common/Modal";
import LoginInfo from "@/components/Profile/LoginInfo";
import CardInfo from "@/components/Profile/CardInfo";
import PaymentDetail from "@/components/Profile/PaymentDetail";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ErrorMessage } from "@hookform/error-message";
import { ArrowLeftIcon } from "@/components/icons/ArrowLeft";

const schema = yup
  .object({
    password: yup
      .string()
      .min(8, "8글자 이상 입력해주세요.")
      .max(12, "12글자 이내로 입력해주세요.")
      .required(),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref("password")], "비밀번호가 다릅니다"),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

type Props = {
  params: { lng: string };
};

const page = ({ params }: Props) => {
  const { user } = useUserStore();
  const router = useRouter();
  const lng = params.lng || "ko";
  const { t } = useTranslation(lng, "auth");
  const { successToast, errorToast } = useToast();
  const queryClient = useQueryClient();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const { data: myPayment } = useQuery({
    queryKey: ["my-payment"],
    queryFn: getPaymentMe,
  });

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (!user) {
      router.push(`/${lng}/auth/sign-in`);
    }
  }, []);

  const handleSubscription = async () => {
    if (!myPayment && !user) return;

    try {
      await updateSubscription(!myPayment?.subscription);
      await queryClient.invalidateQueries({ queryKey: ["my-payment"] });
      successToast(
        myPayment?.subscription
          ? t("subscription-success-toast")
          : t("subscription-cancel-toast")
      );
      setIsConfirmModalOpen(false);
    } catch (error: any) {
      errorToast("failed to update subscription");
      console.log("error", error.message);
    }
  };

  const handlePasswordSubmit = async () => {
    if (!myPayment && !user) return;

    try {
      await handleChangePassword({ password: getValues("password") });
      successToast(t("change-password-success"));
      setIsPasswordModalOpen(false);
    } catch (error: any) {
      errorToast("failed to change password");
      console.log("error", error.message);
    }
  };

  return (
    <section className="max-w-screen-md mx-auto py-8 md:py-16 px-4 md:px-0">
      <div className="bg-whitesmoke2 text-black text-lg md:text-2xl font-bold px-6 py-8 rounded-xl shadow-lg flex items-center">
        <button onClick={() => router.back()}>
          <ArrowLeftIcon className="w-6 h-6" />
        </button>
        <span className="ml-4 leading-6">{user?.name}</span>
      </div>
      <LoginInfo
        lng={lng}
        handleModal={() => setIsPasswordModalOpen(!isPasswordModalOpen)}
      />
      <CardInfo
        lng={lng}
        myPayment={myPayment}
        handleModal={() => setIsConfirmModalOpen(!isConfirmModalOpen)}
      />
      <PaymentDetail lng={lng} />
      <Modal
        title={t("change-password")}
        isOpen={isPasswordModalOpen}
        closeModal={() => setIsPasswordModalOpen(false)}
      >
        <div className="mt-2">
          <div className="grid items-center gap-1.5 my-4">
            <Label htmlFor="비밀번호">{t("password")}</Label>
            <Input
              type="password"
              placeholder={t("pw-placeholder")}
              {...register("password")}
              className="border-[1px] rounded-xl border-silver text-dimgray bg-white py-6 text-lg focus:border-gray"
            />
            <ErrorMessage
              errors={errors}
              name="password"
              render={({ message }) => (
                <p className="text-error font-semibold">{message}</p>
              )}
            />
          </div>
          <div className="grid items-center gap-1.5 my-4">
            <Label htmlFor="비밀번호확인">{t("pw-confirm")}</Label>
            <Input
              type="password"
              placeholder={t("pw-placeholder")}
              {...register("passwordConfirm")}
              className="border-[1px] rounded-xl border-silver text-dimgray bg-white py-6 text-lg focus:border-gray"
            />
            <ErrorMessage
              errors={errors}
              name="passwordConfirm"
              render={({ message }) => (
                <p className="text-error font-semibold">{message}</p>
              )}
            />
          </div>
        </div>
        <div className="flex justify-end mt-2">
          <div>
            <Button
              className="rounded-lg border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-error hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
              onClick={() => setIsPasswordModalOpen(false)}
            >
              {t("cancel")}
            </Button>
            <Button
              className="ml-2 rounded-lg border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-royalblue hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              disabled={!isValid}
              onClick={handlePasswordSubmit}
            >
              {t("change")}
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        title={myPayment?.subscription ? t("title-cancel") : t("title-apply")}
        isOpen={isConfirmModalOpen}
        closeModal={() => setIsConfirmModalOpen(false)}
      >
        <div className="mt-2">
          <p className="text-sm text-gray font-medium">
            {myPayment?.subscription
              ? t("description-cancel")
              : t("description-apply")}
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
              onClick={handleSubscription}
            >
              {t("confirm")}
            </Button>
          </div>
        </div>
      </Modal>
    </section>
  );
};

export default page;
