"use client";

import { getPaymentMe } from "@/apis/auth";
import { useTranslation } from "@/app/i18n/client";
import useUserStore from "@/store/user";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const UserIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-6 h-6 cursor-pointer"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
      />
    </svg>
  );
};

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

  const { data: myPayment } = useQuery({
    queryKey: ["my-payment"],
    queryFn: getPaymentMe,
  });

  useEffect(() => {
    if (!user) {
      router.push(`/${lng}/auth/sign-in`);
    }
  }, []);

  return (
    <section className="max-w-screen-md mx-auto py-8 md:py-16 px-4 md:px-0">
      <div className="bg-whitesmoke2 text-black text-lg md:text-2xl font-bold px-6 py-8 rounded-xl shadow-lg flex items-center">
        <button onClick={() => router.back()}>
          <ArrowIcon />
        </button>
        <span className="ml-4 leading-6">{user?.name}</span>
      </div>
      <div className="my-8  text-black text-lg shadow-lg rounded-xl">
        <div className="bg-whitesmoke2 p-6 flex items-center font-bold  rounded-t-xl ">
          <UserIcon />
          <span className="ml-2">{t("login-info")}</span>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-5 mb-6">
            <span className="text-gray">{t("email")}</span>
            <span className="">{user?.email}</span>
          </div>
          <div className="grid grid-cols-5">
            <span className="text-gray">{t("name")}</span>
            <span className="">{user?.name}</span>
          </div>
        </div>
        <div className="p-6 border-t-[1px] border-whitesmoke ">
          <button className="text-gray">{t("change-pw")}</button>
        </div>
      </div>
      <div className="my-8  text-black text-lg shadow-lg rounded-xl">
        <div className="bg-whitesmoke2 p-6 flex items-center font-bold  rounded-t-xl ">
          <UserIcon />
          <span className="ml-2">{t("card-info")}</span>
        </div>
        <div className="p-6 break-keep">
          <div className="grid grid-cols-4 mb-4 md:mb-6">
            <span className="text-gray">{t("card-number")}</span>
            <span className="">{myPayment?.cardNumber}</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 mb-4 md:mb-6">
            <span className="text-gray">{t("card-expiration")}</span>
            <span className="">{myPayment?.cardExpiry}</span>
            <span className="text-gray">{t("birth")}</span>
            <span className="">{myPayment?.birth}</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 mb-4 md:mb-6">
            <span className="text-gray">{t("cardPwd2digit")}</span>
            <span className="">{myPayment?.cardPwd2digit && "**"}</span>
            <span className="text-gray">{t("card-cvc")}</span>
            <span className="">{myPayment?.cardCvc && "***"}</span>
          </div>
          <div className="grid grid-cols-4">
            <span className="text-gray">{t("subscription-status")}</span>
            <span className="font-medium">
              {myPayment?.subscription ? "구독 중" : "구독 아님"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
