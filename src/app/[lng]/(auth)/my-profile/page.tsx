"use client";

import { getPaymentMe, updateSubscription } from "@/apis/auth";
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

const ArrowIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
      />
    </svg>
  );
};

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
  const [isOpen, setIsOpen] = useState(false);

  const { data: myPayment } = useQuery({
    queryKey: ["my-payment"],
    queryFn: getPaymentMe,
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
      setIsOpen(false);
    } catch (error: any) {
      errorToast("failed to update subscription");
      console.log("error", error.message);
    }
  };

  return (
    <section className="max-w-screen-md mx-auto py-8 md:py-16 px-4 md:px-0">
      <div className="bg-whitesmoke2 text-black text-lg md:text-2xl font-bold px-6 py-8 rounded-xl shadow-lg flex items-center">
        <button onClick={() => router.back()}>
          <ArrowIcon />
        </button>
        <span className="ml-4 leading-6">{user?.name}</span>
      </div>
      <LoginInfo lng={lng} />
      <CardInfo
        lng={lng}
        myPayment={myPayment}
        handleModal={() => setIsOpen(!isOpen)}
      />
      <PaymentDetail lng={lng} />
      <Modal
        title={myPayment?.subscription ? t("title-cancel") : t("title-apply")}
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
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
              onClick={() => setIsOpen(false)}
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
