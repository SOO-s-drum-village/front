import { SignInPayload } from "@/apis/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const req = await request.json();
  console.log("res", req);
  //   const test = request.cookies.get("i18next");
  //   const { id } = params;
  const res = await fetch(`https://api-ssmusicweb.shop/auth/login/email`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: req,
  });

  const data = await res.json();
  console.log("data", data);
  //   console.log("test", test);

  return NextResponse.json("hihi");
}
