import "tailwindcss/tailwind.css";
import type { Metadata, Viewport } from "next";
import { Roboto, Noto_Sans_KR } from "next/font/google";
import ToasterProvider from "../components/Provider/ToasterProvider";
import QueryProvider from "../components/Provider/QueryProvider";
import { languages } from "./i18n/settings";
import Header from "@/components/layouts/Header";
import { Language } from "@/types";
// import "./globals.css";

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
  metadataBase: new URL("https://front-drumvillage.vercel.app"),
  title: "Drum Village",
  description: "Drum Village",
  openGraph: {
    title: "Drum Village",
    description: "Drum Village",
    type: "website",
    images: [
      {
        url: "https://ycuajmirzlqpgzuonzca.supabase.co/storage/v1/object/public/artinfo/lessons/56bcf767-1591-4b9f-a964-c8bb7e487775/1706502399822.png",
        width: 1200,
        height: 630,
        alt: "Drum Village",
      },
    ],
  },
  twitter: {
    title: "Drum Village",
    description: "Drum Village",
    images: [
      {
        url: "https://ycuajmirzlqpgzuonzca.supabase.co/storage/v1/object/public/artinfo/lessons/56bcf767-1591-4b9f-a964-c8bb7e487775/1706502399822.png",
        width: 1200,
        height: 630,
        alt: "Drum Village",
      },
    ],
  },
  icons: {
    icon: { url: "/favicon.ico", type: "image/png", sizes: "32x32" },
    shortcut: { url: "/favicon.ico", type: "image/png", sizes: "32x32" },
  },
};

export const viewport: Viewport = {
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
  width: "device-width",
};

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export default function RootLayout({
  children,
  params: { lng },
}: {
  children: React.ReactNode;
  params: { lng: Language };
}) {
  return (
    <html lang={lng ?? "ko"}>
      <body
        className={
          (cls(notoSansKr.className, roboto.className), "mt-[76px] font-roboto")
        }
        style={{ height: "calc(100vh - 76px)" }}
        suppressHydrationWarning={true}
      >
        <ToasterProvider>
          <QueryProvider>
            <Header lng={lng ?? "ko"} />
            {children}
            {/* <Footer /> */}
          </QueryProvider>
        </ToasterProvider>
      </body>
    </html>
  );
}
