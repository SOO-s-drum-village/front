"use client";

import React from "react";

const BoltIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-8 h-8 md:w-16 md:h-16"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
      />
    </svg>
  );
};

const Chip = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-8 h-8 md:w-16 md:h-16"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Zm.75-12h9v9h-9v-9Z"
      />
    </svg>
  );
};

const MusicIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-8 h-8 md:w-16 md:h-16"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z"
      />
    </svg>
  );
};

const BellIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-8 h-8 md:w-16 md:h-16"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
      />
    </svg>
  );
};

const categoryList = [
  { id: 1, icon: <BoltIcon />, title: "드럼" },
  {
    id: 2,
    icon: <Chip />,
    title: "드럼",
  },
  {
    id: 3,
    icon: <MusicIcon />,
    title: "드럼",
  },
  {
    id: 4,
    icon: <BellIcon />,
    title: "드럼",
  },
  { id: 5, icon: <BoltIcon />, title: "드럼" },
  {
    id: 6,
    icon: <Chip />,
    title: "드럼",
  },
  {
    id: 7,
    icon: <MusicIcon />,
    title: "드럼",
  },
  {
    id: 8,
    icon: <BellIcon />,
    title: "드럼",
  },
];

export const MainCategory = () => {
  return (
    <div className="max-w-screen-lg mx-auto my-8">
      <div className="my-4 md:my-20 grid grid-cols-4 gap-4 place-items-center md:grid-cols-8 md:gap-32">
        {categoryList.map((category) => (
          <div
            key={category.id}
            className="flex flex-col items-center cursor-pointer"
          >
            {category.icon}
            <span className="mt-2 md:mt-4 text-base md:text-xl font-medium">
              {category.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
