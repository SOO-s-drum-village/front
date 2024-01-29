import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Lecture, LectureValues } from "@/types/lecture";

interface Iprops {
  lecture: Lecture;
  scroll?: boolean;
}

export const LectureCard = ({ lecture, scroll }: Iprops) => {
  const params = useParams();

  const lng = params.lng || "ko";

  return (
    <Link href={`/${lng}/lecture/${lecture.id}`}>
      <div
        className={`card flex flex-col  shadow-lg rounded-xl ${
          scroll ? "w-[150px] md:w-[250px] mr-4 md:mr-8" : " "
        }`}
      >
        <div
          className={`relative ${
            scroll ? "h-[120px] md:h-[220px]" : " h-[120px] md:h-[210px]"
          }`}
        >
          <Image
            src={
              "https://ycuajmirzlqpgzuonzca.supabase.co/storage/v1/object/public/artinfo/concert/1684838755185"
            }
            alt="lecture_image"
            sizes="250px, 250px"
            fill
            priority
            quality={100}
            className="rounded-t-xl"
          />
        </div>
        <div className="py-4 px-3 flex flex-col break-keep ">
          <div className="flex-1  font-semibold lg:text-base flex flex-col ">
            <span className="text-base md:text-lg">{lecture.title}</span>
            <span className="text-sm md:text-base text-darkgray">{`Level. ${lecture.level}`}</span>
            <div>
              {lecture.categories.map((category, index) => (
                <span
                  key={category}
                  className="text-sm md:text-base text-darkgray"
                >
                  {index === 0 ? "" : " · "}
                  {LectureValues[category]}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
