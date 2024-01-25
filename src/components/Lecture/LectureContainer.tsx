"use client";

import React from "react";
import { LectureCard } from "./LectureCard";
import { useInView } from "react-intersection-observer";
import { useDidUpdate } from "@toss/react";
import { getLectures } from "@/apis/lecture";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Lecture } from "@/types/lecture";

export const LectureContainer = () => {
  const [ref, inView] = useInView({
    delay: 300,
    threshold: 0.5,
  });

  const getLectureList = async (pageParam: number): Promise<any> => {
    const response = await getLectures({
      page: pageParam,
    });
    return {
      lectures: response,
      nextPage: pageParam + 1,
      isLast: response.length < 20,
    };
  };

  const {
    isLoading,
    isFetching,
    isError,
    error,
    data,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["lectures"],
    queryFn: ({ pageParam }) => getLectureList(pageParam),
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
    <div className="max-w-screen-2xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 px-2">
      {data?.pages?.map((page) =>
        page?.lectures?.map((lecture: Lecture) => (
          <LectureCard lecture={lecture} key={lecture.id} />
        ))
      )}
      <div ref={ref} className="h-12" />
    </div>
  );
};
