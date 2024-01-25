"use client";

import { getLectures } from "@/apis/lecture";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { LectureCard } from "../Lecture/LectureCard";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { useTranslation } from "@/app/i18n/client";
import { useParams } from "next/navigation";

const PopularItemContainer = () => {
  const params = useParams();
  const { t } = useTranslation((params.lng as string) || "ko", "main");

  const { data: popularItems } = useQuery({
    queryKey: ["popularItems"],
    queryFn: () => getLectures({ page: 1 }),
  });

  return (
    <section className="max-w-screen-2xl mx-auto px-2 md:px-8">
      <div className="my-6">
        <h2 className="text-xl md:text-3xl font-bold">주목해야 할 상품</h2>
      </div>
      <ScrollArea
        className="whitespace-nowrap rounded-md"
        scrollHideDelay={100}
      >
        <div className="flex overflow-x-scroll">
          {popularItems?.map((item) => (
            <LectureCard lecture={item} key={item.id} scroll />
          ))}
        </div>
        <ScrollBar
          orientation="horizontal"
          className="bg-disabled"
          forceMount
        />
      </ScrollArea>
    </section>
  );
};

export default PopularItemContainer;
