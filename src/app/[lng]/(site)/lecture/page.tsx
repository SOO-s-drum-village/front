import { getLectures } from "@/apis/lecture";
import GetQueryClient from "@/app/GetQueryClient";
import { LectureContainer } from "@/components/Lecture/LectureContainer";
import { LectureList } from "@/types/lecture";
import { Metadata } from "next";
import React from "react";

interface Props {
  searchParams: { category?: string; sort?: string };
}

export const metadata: Metadata = {
  title: "Drum Village Lecture",
  description: "Drum Village Lecture",
};

const getLectureList = async (pageParam: number): Promise<LectureList> => {
  const response = await getLectures({
    page: pageParam,
    // category:
    //   category === "ALL" || !!category
    //     ? undefined
    //     : (category as LectureCategory),
    // direction: sort as SortDirection,
  });
  return {
    lectures: response,
    nextPage: pageParam + 1,
    isLast: response.length < 20,
  };
};

const page = async ({ searchParams: { category, sort } }: Props) => {
  const queryClient = GetQueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["lectures", category, sort],
    queryFn: ({ pageParam }) => getLectureList(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (!lastPage.isLast) return lastPage.nextPage;
    },
    pages: 1,
  });

  return (
    <div className="max-w-screen-2xl mx-auto py-4 px-4 md:p-8">
      <LectureContainer />
    </div>
  );
};

export default page;
