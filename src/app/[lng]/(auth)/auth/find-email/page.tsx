import FindEmailContainer from "@/components/Auth/Find/FindEmailContainer";
import { Language } from "@/types";
import React from "react";

interface Props {
  params: { lng: Language };
}

const page = ({ params: { lng } }: Props) => {
  return (
    <div className="h-full flex items-center">
      <FindEmailContainer lng={lng} />
    </div>
  );
};

export default page;
