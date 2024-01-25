import { getLecture } from "@/apis/lecture";
import GetQueryClient from "@/app/GetQueryClient";
import DetailContainer from "@/components/Lecture/DetailContainer";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React from "react";

interface Props {
  params: { id: string };
}

const page = async ({ params }: Props) => {
  const queryClient = GetQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["lecture", params.id],
    queryFn: () => getLecture(Number(params.id)),
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="max-w-screen-xl mx-auto p-4 md:p-8 bg-whitesmoke2">
      <HydrationBoundary state={dehydratedState}>
        <DetailContainer />
      </HydrationBoundary>
    </div>
  );
};

export default page;
