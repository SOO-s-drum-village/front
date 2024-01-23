import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Lecture } from "@/types/lecture";

interface Iprops {
  lecture: Lecture;
}

export const LectureCard = ({ lecture }: Iprops) => {
  const params = useParams();

  const lng = params.lng || "ko";

  return (
    <Link href={`/${lng}/lecture/${lecture.id}`}>
      <div className="card flex flex-col  rounded-md">
        <div className="relative h-[150px] md:h-[327px] ">
          <Image
            src={
              "https://ycuajmirzlqpgzuonzca.supabase.co/storage/v1/object/public/artinfo/concert/1684838755185"
            }
            alt="lecture_image"
            sizes="250px, 250px"
            fill
            priority
            quality={100}
            className="rounded-xl"
          />
        </div>
        <div className="pt-2 pb-1 flex flex-col break-keep">
          <div className="flex-1 my-2  font-semibold lg:text-base flex flex-col">
            <span className="text-sm md:text-xl">{lecture.title}</span>
            <span className="text-xs md:text-base text-darkgray">{`Level. ${lecture.level}`}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
