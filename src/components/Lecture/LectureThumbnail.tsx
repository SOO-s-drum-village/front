import { Lecture } from "@/types/lecture";
import Image from "next/image";
import { PlayIcon } from "../icons/Play";
import { useParams } from "next/navigation";

interface Props {
  lecture: Lecture;
}

export const LectureThumbnail = ({ lecture }: Props) => {
  const params = useParams();
  const isDetail = params.id;

  return (
    <div
      className={`p-3 h-[150px] flex flex-col bg-white w-full ${
        isDetail ? "md:h-full" : "md:h-[210px]"
      }`}
    >
      <Image
        src="/drumvillage-logo.png"
        alt="drumvillage_logo"
        width={50}
        height={50}
      />
      <div className="h-full flex items-center justify-center">
        {!isDetail && (
          <div
            className="rounded-full bg-[#34363d] opacity-100 shadow-lg w-12 h-12
       flex items-center justify-center hover:opacity-75
       "
          >
            <button>
              <PlayIcon className="w-6 h-6 text-white" />
            </button>
          </div>
        )}
      </div>
      {!isDetail && (
        <div className="text-lg md:text-xl font-bold flex items-center justify-center">
          <h2>{lecture.title}</h2>
        </div>
      )}

      {lecture.owner && (
        <h4 className="text-xs md:text-sm border-b-[1px]  pb-[2px] px-4 ml-auto">
          {lecture.owner}
        </h4>
      )}
    </div>
  );
};
