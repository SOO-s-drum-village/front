import React from "react";

export default function LangLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className=" p-4 md:p-8 h-full bg-whitesmoke2">{children}</div>;
}
