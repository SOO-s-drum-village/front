"use client";

import React, { Suspense } from "react";
import Image from "next/image";
import ReactPlayer from "react-player";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { getLecture } from "@/apis/lecture";
import { useParams, useRouter } from "next/navigation";
import { Lecture } from "@/types/lecture";
import { AxiosError } from "axios";
import { useIsMounted } from "@toss/react";
import { LectureThumbnail } from "./LectureThumbnail";
import useUserStore from "@/store/user";
import useToast from "@/hooks/useToast";
import { useTranslation } from "@/app/i18n/client";
import { Loading } from "../Common/Loading";

const DetailContainer = () => {
  const params = useParams();
  const { t } = useTranslation(params.lng as string, "lecture");
  const router = useRouter();
  const isMounted = useIsMounted();
  const { user } = useUserStore();
  const { errorToast } = useToast();

  const {
    data: lecture,
    error,
    isLoading,
  } = useQuery<Lecture, AxiosError>({
    queryKey: ["lecture", params.id, user?.id],
    queryFn: () => getLecture(Number(params.id)),
  });

  if (isLoading) return <Loading />;

  if (error) {
    if (error.response?.status === 401) {
      router.push(`/${params.lng}/auth/sign-in`);
    } else if (error.response?.status === 403) {
      errorToast("가입필요");
      // router.push(`/${params.lng}/my-profile`);
    } else {
      throw new Error(error.message);
    }
  }

  return (
    <div className="max-w-screen-lg mx-auto p-4 md:p-8 h-full">
      <div className="flex flex-col md:flex-row">
        {/* <div className="relative w-full md:w-1/3 mx-auto h-[300px]">
          <Image
            src="/membership-pass.png"
            alt="lecture_img"
            fill
            priority
            sizes="250px, 250px"
            quality={100}
          />
        </div> */}
        {isMounted && lecture && (
          <div className="w-full md:w-1/2 h-[300px]">
            <ReactPlayer
              url="https://www.youtube.com/watch?v=l0IoPQM1HlU"
              light={<LectureThumbnail lecture={lecture} />}
              width="100%"
              height="100%"
              controls
              className="rounded-xl"
            />
            {/* <video
              controls
              poster="/membership-pass.png"
              style={{ width: "100%", height: "100%" }}
            >
              <source
                src="https://www.youtube.com/watch?v=l0IoPQM1HlU"
                type="video/mp4"
              ></source>
              <source
                src="https://www.youtube.com/watch?v=l0IoPQM1HlU"
                type="video/ogg"
              ></source>
            </video> */}
            <iframe
              src="https://www.youtube.com/embed/l0IoPQM1HlU"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              property="video"
              style={{ width: "100%", height: "100%" }}
            ></iframe>
          </div>
        )}

        <div className="mt-8 md:mt-0 flex-1 md:ml-16 flex flex-col">
          <span className="text-2xl font-bold md:mt-4">{lecture?.title}</span>
          <ul className="list-disc ml-4 mt-2 text-gray">
            <li className="my-2">
              온라인 / 오프라인등 <strong> 공유 및 유출을 금지 </strong>하며,
              유출시 법적 책임을 물 수 있습니다.
            </li>
            <li>레벨에 따라 연주가 편곡될 수 있습니다.</li>
          </ul>
          <p className="text-dimgray font-semibold mt-4 md:mt-6">
            카테고리 :{" "}
            {lecture?.categories.map((category) => (
              <span key={category}>{category} </span>
            ))}
          </p>
          <p className="text-dimgray font-semibold my-2">
            Level. {lecture?.level}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailContainer;
