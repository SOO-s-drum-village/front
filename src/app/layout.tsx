import "tailwindcss/tailwind.css";
import type { Metadata } from "next";
import { Roboto, Noto_Sans_KR } from "next/font/google";
import ToasterProvider from "../components/Provider/ToasterProvider";
import QueryProvider from "../components/Provider/QueryProvider";
import { Footer } from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import { languages } from "./i18n/settings";
import { dir } from "i18next";

const notoSansKr = Noto_Sans_KR({
  // preload: true, 기본값
  subsets: ["latin"], // 또는 preload: false
  weight: ["100", "400", "700", "900"], // 가변 폰트가 아닌 경우, 사용할 fontWeight 배열
});

const roboto = Roboto({
  subsets: ["latin"], // preload에 사용할 subsets입니다.
  weight: ["100", "400", "700"],
  variable: "--roboto", // CSS 변수 방식으로 스타일을 지정할 경우에 사용합니다.
});

export const cls = (...classnames: string[]) => {
  return classnames.join(" ");
};

export const metadata: Metadata = {
  title: "Drum Village",
  description: "Drum Village",
};
export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export default function RootLayout({
  children,
  params: { lng },
}: {
  children: React.ReactNode;
  params: { lng: string };
}) {
  return (
    <html lang={lng || "ko"}>
      <body
        className={
          (cls(notoSansKr.className, roboto.className),
          "h-screen font-roboto mt-[60px] overflow-y-auto pb-[150px] md:pb-0")
        }
        suppressHydrationWarning={true}
      >
        <ToasterProvider>
          <QueryProvider>
            <Header lng={lng || "ko"} />
            {children}
            <Footer />
          </QueryProvider>
        </ToasterProvider>
      </body>
    </html>
  );
}
