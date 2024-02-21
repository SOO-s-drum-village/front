import FindPasswordContainer from "@/components/Auth/Find/FindPasswordContainer";
import { Language } from "@/types";
import React from "react";

interface Props {
  params: { lng: Language };
}

const page = ({ params: { lng } }: Props) => {
  return (
    <div className="h-full flex items-center">
      <FindPasswordContainer lng={lng} />
    </div>
  );
};

export default page;
