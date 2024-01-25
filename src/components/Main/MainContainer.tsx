import React from "react";
import { BannerContainer } from "../Banner/BannerContainer";
import { MainCategory } from "./MainCategory";
import PopularItemContainer from "./PopularItemContainer";

export const MainContainer = () => {
  return (
    <div>
      <BannerContainer />
      <MainCategory />
      <PopularItemContainer />
    </div>
  );
};
