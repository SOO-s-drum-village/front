"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import Image from "next/image";

export const MainCategory = () => {
  const params = useParams();

  const categoryList = [
    {
      id: 1,
      icon: "/icon/user.png",
      title: "Join",
      href: `/auth/sign-in`,
    },
    {
      id: 2,
      icon: "/icon/about.png",
      title: "About",
      href: "/",
    },
    {
      id: 3,
      icon: "/icon/song.png",
      title: "Song",
      href: "/lecture",
    },
    // {
    //   id: 4,
    //   icon: "/icon/shop.png",
    //   title: "Shop",
    //   href: "/",
    // },
    {
      id: 5,
      icon: "/icon/free.png",
      title: "Free",
      href: "/",
    },
  ];

  return (
    <div className="max-w-screen-lg mx-auto my-8">
      <div className="my-4 md:my-20 max-w-screen-md mx-auto grid grid-cols-4 place-items-center ">
        {categoryList.map((category) => (
          <Link
            href={`/${params.lng || "ko"}${category.href}`}
            key={category.id}
          >
            <div className="flex flex-col items-center cursor-pointer">
              <div className="relative h-[30px] md:h-[60px] w-[30px] md:w-[60px]">
                <Image src={category.icon} alt={category.title} fill />
              </div>
              <span className="mt-2 md:mt-4 text-base md:text-xl font-medium">
                {category.title}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
