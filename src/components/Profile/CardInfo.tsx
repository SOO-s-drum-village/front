"use client";

import { useTranslation } from "@/app/i18n/client";
import React from "react";
import { Button } from "../ui/button";

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

interface Props {
  lng: string;
  myPayment?: {
    cardNumber: string;
    cardExpiry: string;
    birth: string;
    cardPwd2digit: string;
    cardCvc: string;
    subscription: boolean;
  };
  handleModal: () => void;
}

const CardInfo = ({ lng, myPayment, handleModal }: Props) => {
  const { t } = useTranslation(lng, "auth");

  return (
    <div className="my-8 text-black text-lg shadow-lg rounded-xl">
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
        <div className="grid grid-cols-2 md:grid-cols-4 md:gap-0 mb-4 md:mb-6">
          <span className="text-gray mr-4">{t("cardPwd2digit")}</span>
          <span className="">{myPayment?.cardPwd2digit && "**"}</span>
          <span className="text-gray">{t("card-cvc")}</span>
          <span className="">{myPayment?.cardCvc && "***"}</span>
        </div>
        <div className="grid grid-cols-4 ">
          <span className="text-gray mt-[6px]">{t("subscription-status")}</span>
          {myPayment?.subscription ? (
            <div className="flex items-center">
              <span className="font-medium ">{t("subscribed")}</span>
              <Button className="text-error w-20 ml-4" onClick={handleModal}>
                {t("cancel")}
              </Button>
            </div>
          ) : (
            <Button className="text-cornflowerblue w-20" onClick={handleModal}>
              {t("subscribe")}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardInfo;
