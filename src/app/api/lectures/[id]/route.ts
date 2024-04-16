import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const test = request.cookies.get("i18next");
  const { id } = params;
  const res = await fetch(`https://api-ssmusicweb.shop/lectures/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  console.log("data", data);
  console.log("test", test);

  return NextResponse.json({ id });
}
