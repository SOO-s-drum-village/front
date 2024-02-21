import React from "react";
import { languages } from "../i18n/settings";
import Header from "@/components/layouts/Header";
import { Footer } from "@/components/layouts/Footer";
import { Language } from "@/types";

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export default function LangLayout({
  children,
  params: { lng },
}: {
  children: React.ReactNode;
  params: { lng: Language };
}) {
  return (
    <main className="h-full">
      <Header lng={lng} />
      {children}
    </main>
  );
}
