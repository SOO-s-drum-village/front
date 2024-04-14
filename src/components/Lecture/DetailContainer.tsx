'use client';

import React from 'react';
import ReactPlayer from 'react-player';
import { useQuery } from '@tanstack/react-query';
import { getLecture } from '@/apis/lecture';
import { useParams, useRouter } from 'next/navigation';
import { Lecture } from '@/types/lecture';
import { AxiosError } from 'axios';
import { useIsMounted } from '@toss/react';

const DetailContainer = () => {
  const params = useParams();
  const router = useRouter();
  const isMounted = useIsMounted();

  const { data: lecture, error } = useQuery<Lecture, AxiosError>({
    queryKey: ['lecture', params.id],
    queryFn: () => getLecture(Number(params.id)),
  });

  if (error) {
    if (error.response?.status === 401) {
      router.push(`/${params.lng}/auth/sign-in`);
    } else throw new Error(error.message);
  }

  return (
    <div className="max-w-screen-lg mx-auto p-4 md:p-8 h-full">
      <div className="flex flex-col h-full">
        {/* <div className="relative w-[330px] mx-auto h-[400px]">
          <Image
            src={lecture?.imageUrl || '/membership-pass.png'}
            alt="lecture_img"
            fill
            priority
            sizes="250px, 250px"
            quality={100}
          />
        </div> */}
        {isMounted && (
          <div className="w-full h-[50%] md:h-[80%] rounded-xl">
            <ReactPlayer
              url="https://www.youtube.com/watch?v=l0IoPQM1HlU"
              width="100%"
              height="100%"
              controls
              className="rounded-xl"
            />
          </div>
        )}
        <div className="mt-24 md:mt-0 flex flex-col">
          <span className="text-2xl font-bold md:mt-4">{lecture?.title}</span>
          <div className="text-dimgray font-semibold mt-4 md:mt-6">
            카테고리 :{' '}
            {lecture?.categories.map((category) => (
              <span key={category}>{category} </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailContainer;
