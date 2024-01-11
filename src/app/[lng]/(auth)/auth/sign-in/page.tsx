import SignInContainer from "@/components/Auth/SignIn/SignInContainer";
import React from "react";

type Props = {
  params: { lng: string };
};

const page = ({ params }: Props) => {
  return (
    <div className="h-full flex items-center">
      <SignInContainer lng={params.lng} />
    </div>
  );
};

export default page;
