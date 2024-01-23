"use client";

import React from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useTranslation } from "@/app/i18n/client";
import { Button } from "@/components/ui/button";

const page = () => {
  const params = useParams();

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
            <Button className="bg-cornflowerblue text-white font-semibold  py-[20px] px-8 md:px-6 rounded-2xl hover:bg-blue-600">
              바로 구매
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
