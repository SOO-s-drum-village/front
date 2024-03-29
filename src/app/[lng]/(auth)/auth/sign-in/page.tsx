import SignInContainer from "@/components/Auth/SignIn/SignInContainer";
import { Language } from "@/types";
import React from "react";

type Props = {
  params: { lng: Language };
};

const page = ({ params }: Props) => {
  return (
    <div className="h-full flex items-center">
      <SignInContainer lng={params.lng} />
    </div>
  );
};

export default page;
