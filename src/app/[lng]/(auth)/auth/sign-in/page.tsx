import SignInCard from "@/components/Auth/SignInCard";
import React from "react";

type Props = {
  params: { lng: string };
};

const page = ({ params }: Props) => {
  return (
    <div className="h-full">
      <SignInCard lng={params.lng} />
    </div>
  );
};

export default page;
