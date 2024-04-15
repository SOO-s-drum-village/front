import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Lecture, LectureValues } from "@/types/lecture";
import { PlayIcon } from "../icons/Play";
import { LectureThumbnail } from "./LectureThumbnail";

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
          scroll && "w-[180px] md:w-[300px] mr-4 md:mr-8"
        }`}
      >
        <LectureThumbnail lecture={lecture} />
        <div
          className={` px-3 flex flex-col break-keep ${
            scroll ? "py-2" : "py-4"
          }`}
        >
          <div className="flex-1  font-semibold lg:text-base flex flex-col ">
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
