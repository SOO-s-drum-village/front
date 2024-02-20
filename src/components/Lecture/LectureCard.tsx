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
        className={`card flex flex-col mb-4 text-darkgunmetal shadow-lg rounded-xl ${
          scroll ? "w-[180px] md:w-[300px] mr-4 md:mr-8" : " "
        }`}
      >
        {/* <div
          className={`relative ${
            scroll ? "h-[120px] md:h-[180px]" : " h-[120px] md:h-[210px]"
          }`}
        >
          <Image
            src={lecture.imageUrl}
            alt="lecture_image"
            fill
            priority
            quality={100}
            className="rounded-t-xl"
          />
        </div> */}
        <div className="p-3 h-[150px] md:h-[210px] flex flex-col">
          <Image
            src="/drumvillage-logo.png"
            alt="drumvillage_logo"
            width={50}
            height={50}
          />
          <div className="flex-1 text-center text-lg md:text-xl font-bold flex items-center justify-center">
            <h2>비와 당신의 이야기</h2>
          </div>

          <h4 className="text-xs md:text-sm border-b-[1px]  pb-[2px] px-4 ml-auto">
            차이코프스키
          </h4>
        </div>
        <div
          className={` px-3 flex flex-col break-keep ${
            scroll ? "py-2" : "py-4"
          }`}
        >
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
