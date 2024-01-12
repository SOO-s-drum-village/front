import { getLecture } from "@/apis/lecture";
import { Metadata } from "next/types";
// import SupabaseServer from "@/lib/supabase-server"

type Props = {
  params: { id: string; lng: string };
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props) {
  const { id } = params;

  const data = await getLecture(Number(id));

  console.log("data", data);

  //   const pageTitle = data?.title.substring(0, 35)
  //   const pageImage = data?.poster_url

  //   console.log("pageImage", pageImage)

  //   return {
  //     title: `공연 | 아트인포`,
  //     description: `${pageTitle} | 아트인포`,
  //     openGraph: {
  //       title: pageTitle,
  //       description: "아트인포 공연",
  //       images: {
  //         url:
  //           pageImage ??
  //           "https://ycuajmirzlqpgzuonzca.supabase.co/storage/v1/object/public/artinfo/concerts/288/1694427064047.jpg",
  //         alt: "아트인포-ARTINFO",
  //       },
  //     },
  //   }
}

export default function LectureLayout({ children, params }: Props) {
  return <div className="touch-auto">{children}</div>;
}
