import React from 'react';
import { BannerContainer } from '../Banner/BannerContainer';
import { MainCategory } from './MainCategory';
import { LectureContainer } from './LectureContainer';

export const MainContainer = () => {
  return (
    <div>
      <BannerContainer />
      <MainCategory />
      <LectureContainer />
    </div>
  );
};
