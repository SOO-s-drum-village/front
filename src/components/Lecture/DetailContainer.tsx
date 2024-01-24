"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getLecture } from "@/apis/lecture";
import { useParams, useRouter } from "next/navigation";
import { Lecture } from "@/types/lecture";
import { AxiosError } from "axios";

const DetailContainer = () => {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: lecture, error } = useQuery<Lecture, AxiosError>({
    queryKey: ["lecture", params.id],
    queryFn: () => getLecture(Number(params.id)),
  });

  if (error) {
    if (error.response?.status === 401) {
      router.push(`/${params.lng}/auth/sign-in`);
    } else if (error.response?.status === 403) {
      queryClient.removeQueries({
        queryKey: ["lecture", params.id],
      });
      router.push(`/${params.lng}/membership`);
    } else throw new Error(error.message);
  }

  // useEffect(() => {
  //   getLecture(Number(params.id)).then((res) => console.log("res", res));

  //   return () => {

  //   };
  // }, []);

  return (
    <section>
      <div className="flex flex-col md:flex-row">
        <div className="relative w-[330px] mx-auto h-[400px]">
          <Image
            src={lecture?.imageUrl || "/membership.jpeg"}
            alt="lecture_img"
            fill
            priority
            sizes="250px, 250px"
            quality={100}
          />
        </div>
        <div className="md:ml-16 flex-1 mt-8 md:mt-0 flex flex-col">
          <span className="text-2xl font-bold md:mt-4">{lecture?.title}</span>
          <div className="text-dimgray font-semibold mt-4 md:mt-6">
            카테고리 :{" "}
            {lecture?.categories.map((category) => (
              <span key={category}>{category} </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailContainer;
