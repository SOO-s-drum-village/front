import React from "react";
import Image from "next/image";

const lecture = {
  id: 1,
  title: "테스트",
  image_url:
    "https://artinfokorea.com/_next/image?url=https%3A%2F%2Fycuajmirzlqpgzuonzca.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fartinfo%2Fconcert%2F1703601013947.webp&w=256&q=100",
};

const DetailContainer = () => {
  return (
    <section>
      <div className="flex flex-col md:flex-row">
        <div className="relative w-[330px] mx-auto h-[400px]">
          <Image
            src={lecture.image_url}
            alt="lecture_img"
            fill
            priority
            sizes="250px, 250px"
            quality={100}
          />
        </div>
        <div className="ml-4 flex-1 mt-8 md:mt-0">
          <div>{lecture.title}</div>
        </div>
      </div>
    </section>
  );
};

export default DetailContainer;
