"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useTranslation } from "@/app/i18n/client";
import { Button } from "@/components/ui/button";
import useToast from "@/hooks/useToast";
import useUserStore from "@/store/user";
import { updateSubscription } from "@/apis/auth";
import { useQueryClient } from "@tanstack/react-query";
import { Modal } from "@/components/Common/Modal";

const page = () => {
  const params = useParams();
  const { isAuth } = useUserStore();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { successToast, errorToast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const handleSubscription = async () => {
    if (!isAuth) router.push(`/${params.lng}/auth/sign-in`);

    try {
      await updateSubscription(true);
      await queryClient.invalidateQueries({ queryKey: ["my-payment"] });
      successToast(t("subscription-success-toast"));
      router.back();
    } catch (error: any) {
      errorToast("failed to update subscription");
    }
  };

  const { t } = useTranslation(params.lng as string, "membership");

  return (
    <div className="max-w-screen-lg mx-auto p-4 md:p-8">
      <section className="flex flex-col md:flex-row">
        <div className="relative h-[300px] md:w-[300px]">
          <Image
            src="/membership.jpeg"
            alt="membership_img"
            fill
            priority
            sizes="250px, 250px"
            quality={100}
          />
        </div>
        <div className="md:ml-16 flex-1 flex flex-col">
          <div>
            <h2 className="mt-4 text-xl md:text-3xl font-bold">{t("title")}</h2>
            <h4 className="mt-4 text-base">
              <span className="md:text-lg text-cornflowerblue leading-6">
                ₩19,900
              </span>
              / {t("month")}
            </h4>
          </div>
          <div className="border-1 border-b border-b-disabled my-4" />
          <ol className="list-disc px-4 md:px-8 text-darkgrey font-medium break-keep">
            <li className="my-1 ">{t("list-1")}</li>
            <li className="my-1">{t("list-2")}</li>
            <li className="my-1">{t("list-3")}</li>
          </ol>
          <div className="border-1 border-b border-b-disabled my-4" />
          <div className="mt-2 flex justify-center md:justify-start">
            <Button
              className="bg-cornflowerblue text-white font-semibold  py-[20px] px-8 md:px-6 rounded-2xl hover:bg-blue-600"
              onClick={() => setIsOpen(true)}
            >
              바로 구매
            </Button>
          </div>
        </div>
      </section>
      <Modal
        title={t("confirm-title")}
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
      >
        <div className="mt-2">
          <p className="text-sm text-gray font-medium">{t("confirm-desc")}</p>
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
    </div>
  );
};

export default page;
