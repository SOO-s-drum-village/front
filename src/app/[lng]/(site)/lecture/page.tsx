import { Metadata } from "next";
import React from "react";

interface Props {
  params: { id: string };
}

export const metadata: Metadata = {
  title: "Drum Village's Lecture",
  description: "Drum Village",
};

const page = ({ params }: Props) => {
  return <div className="max-w-screen-2xl mx-auto p-4 md:p-8"></div>;
};

export default page;
