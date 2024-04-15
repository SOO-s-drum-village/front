"use client";

import { Spinner } from "@material-tailwind/react";

export const Loading = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Spinner color="blue" className="w-12 h-12 text-silver" />
    </div>
  );
};
