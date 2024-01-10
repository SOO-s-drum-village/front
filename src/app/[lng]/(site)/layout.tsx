import React from "react";
import { languages } from "../../i18n/settings";
import Header from "@/components/layouts/Header";
import { Footer } from "@/components/layouts/Footer";

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export default function LangLayout({
  children,
  params: { lng },
}: {
  children: React.ReactNode;
  params: { lng: string };
}) {
  return (
    <div className="mt-[72px] pb-[150px] md:pb-0">
      <Header lng={lng || "ko"} />
      {children}
      <Footer />
    </div>
  );
}
