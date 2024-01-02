"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Pagination } from "swiper/modules";

const posters = [
  {
    id: 1,
    image_url:
      "https://ycuajmirzlqpgzuonzca.supabase.co/storage/v1/object/public/artinfo/lessons/56bcf767-1591-4b9f-a964-c8bb7e487775/1703125972384.png",
  },
];

export const BannerContainer = () => {
  return (
    <section>
      <Swiper spaceBetween={10} slidesPerView="auto" modules={[Pagination]}>
        {/* <Swiper spaceBetween={10} slidesPerView={3} modules={[Pagination]}> */}
        {posters.map((item, idx) => (
          // <SwiperSlide key={item.id} style={{ width: "270px" }}>
          <SwiperSlide key={item.id}>
            <div
              style={{ height: 260 }}
              className="cursor-pointer relative h-[150px]"
            >
              <Image
                src={item.image_url!}
                alt="banner_image"
                fill
                priority
                quality={100}
                unoptimized
                sizes="(max-width: 680px) 100px 40px, (max-width: 1200px) 200px, 100px"
                className="max-w-full  shadow hover:shadow-lg"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
