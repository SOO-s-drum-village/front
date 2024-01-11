import SignUpContainer from "@/components/Auth/SignUp/SignUpContainer";
import React from "react";

type Props = {
  params: { lng: string };
};

const page = ({ params }: Props) => {
  return (
    <div className="h-full overflow-y-auto">
      <SignUpContainer lng={params.lng} />
    </div>
  );
};

export default page;
