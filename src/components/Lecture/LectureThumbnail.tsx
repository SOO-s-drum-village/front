import { Lecture } from '@/types/lecture';
import Image from 'next/image';
import { PlayIcon } from '../icons/Play';

interface Props {
  lecture: Lecture;
}

export const LectureThumbnail = ({ lecture }: Props) => {
  return (
    <div className="p-3 h-[150px] md:h-[210px] flex flex-col">
      <Image
        src="/drumvillage-logo.png"
        alt="drumvillage_logo"
        width={50}
        height={50}
      />
      <div className="h-full flex items-center justify-center">
        <div
          className="rounded-full bg-black opacity-90 shadow-lg w-14 h-14
        flex items-center justify-center
        "
        >
          <button>
            <PlayIcon className="w-8 h-8 text-white" />
          </button>
        </div>
      </div>
      <div className="text-lg md:text-xl font-bold flex items-center justify-center">
        <h2>{lecture.title}</h2>
      </div>

      {lecture.owner && (
        <h4 className="text-xs md:text-sm border-b-[1px]  pb-[2px] px-4 ml-auto">
          {lecture.owner}
        </h4>
      )}
    </div>
  );
};
