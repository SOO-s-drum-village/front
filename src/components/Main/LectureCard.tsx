import React from 'react';
import Image from 'next/image';

interface Iprops {
  lecture: {
    id: number;
    title: string;
    image_url: string;
  };
}

export const LectureCard = ({ lecture }: Iprops) => {
  return (
    <div className="card flex flex-col  rounded-md">
      <div className="relative h-[220px] lg:h-[300px]">
        <Image
          src={lecture.image_url}
          alt="concert_image"
          sizes="250px, 250px"
          fill
          priority
          quality={100}
          className="rounded-md"
        />
      </div>
      <div className="py-1 flex flex-col break-keep">
        <div className="flex-1">
          <div className="mt-2 mb-1 text-sm font-semibold lg:text-base">
            {lecture.title}
          </div>
        </div>
      </div>
    </div>
  );
};