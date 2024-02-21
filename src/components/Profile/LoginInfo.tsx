"use client";

import { useTranslation } from "@/app/i18n/client";
import useUserStore from "@/store/user";
import React from "react";

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
  handleModal: () => void;
}

const LoginInfo = ({ lng, handleModal }: Props) => {
  const { user } = useUserStore();
  const { t } = useTranslation(lng, "auth");

  return (
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
        <button className="text-gray" onClick={handleModal}>
          {t("change-pw")}
        </button>
      </div>
    </div>
  );
};

export default LoginInfo;
