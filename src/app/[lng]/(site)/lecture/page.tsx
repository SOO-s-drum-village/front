import { getLectures } from "@/apis/lecture";
import GetQueryClient from "@/app/GetQueryClient";
import {
  LectureContainer,
  LectureList,
} from "@/components/Lecture/LectureContainer";
import { Metadata } from "next";
import React from "react";

interface Props {
  params: { id: string };
}

export const metadata: Metadata = {
  title: "Drum Village Lecture",
  description: "Drum Village Lecture",
};

const getLectureList = async (pageParam: number): Promise<LectureList> => {
  const response = await getLectures({
    page: pageParam,
  });
  return {
    lectures: response,
    nextPage: pageParam + 1,
    isLast: response.length < 20,
  };
};

const page = async ({ params }: Props) => {
  const queryClient = GetQueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["lectures"],
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
