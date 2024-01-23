import React from "react";
import { BannerContainer } from "../Banner/BannerContainer";
import { MainCategory } from "./MainCategory";
import { LectureContainer } from "../Lecture/LectureContainer";

export const MainContainer = () => {
  return (
    <div>
      <BannerContainer />
      <MainCategory />
      <LectureContainer />
    </div>
  );
};
