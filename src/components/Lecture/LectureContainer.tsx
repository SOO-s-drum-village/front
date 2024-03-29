"use client";

import { LectureCard } from "./LectureCard";
import { useInView } from "react-intersection-observer";
import { useDidUpdate } from "@toss/react";
import { getLectureList, getLectures } from "@/apis/lecture";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Lecture, LectureCategory } from "@/types/lecture";
import { useSearchParams } from "next/navigation";
import { SortDirection } from "@/types/index";
import LectureSearchForm from "./LectureSearchForm";

export const LectureContainer = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const sort = searchParams.get("sort");

  const [ref, inView] = useInView({
    delay: 300,
    threshold: 0.5,
  });

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["lectures", category, sort],
    queryFn: ({ pageParam }) =>
      getLectureList({
        page: pageParam,
        category:
          category === "ALL" || !!category
            ? undefined
            : (category as LectureCategory),
        direction: sort as SortDirection,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (!lastPage.isLast) return lastPage.nextPage;
    },
  });

  useDidUpdate(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  return (
    <section>
      <LectureSearchForm />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {data?.pages?.map((page) =>
          page?.lectures?.map((lecture: Lecture) => (
            <LectureCard lecture={lecture} key={lecture.id} />
          ))
        )}
        <div ref={ref} className="h-12" />
      </div>
    </section>
  );
};
