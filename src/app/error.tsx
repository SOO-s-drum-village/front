"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const error = ({ error }: { error: Error & { digest?: string } }) => {
  console.log("error", error);
  const router = useRouter();

  return (
    <div className="w-full h-full flex justify-center flex-col items-center">
      <h2 className="my-[40px] text-2xl">페이지를 찾을수 없습니다.</h2>
      <div>
        <Button
          type="submit"
          className="bg-salomon text-white disabled:bg-disabled disabled:text-silver w-full py-7 rounded-xl hover:bg-salomon"
          onClick={() => router.push("/")}
        >
          메인 페이지로 돌아가기
        </Button>
      </div>
    </div>
  );
};

export default error;
