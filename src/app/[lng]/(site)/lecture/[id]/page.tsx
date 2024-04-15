import Loading from "@/components/Common/Loading";
import DetailContainer from "@/components/Lecture/DetailContainer";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

interface Props {
  params: { id: string; lng?: string };
}

// export async function generateMetadata({ params }: Props) {
//   const { id } = params;

//     return {
//       title: `공연 | 아트인포`,
//       description: `${pageTitle} | 아트인포`,
//       openGraph: {
//         title: pageTitle,
//         description: "아트인포 공연",
//         images: {
//           url:
//             pageImage ??
//             "https://ycuajmirzlqpgzuonzca.supabase.co/storage/v1/object/public/artinfo/concerts/288/1694427064047.jpg",
//           alt: "아트인포-ARTINFO",
//         },
//       },
//     }
// }

const page = async ({ params }: Props) => {
  return (
    <section className="h-full bg-whitesmoke2">
      <DetailContainer />
    </section>
  );
};

export default page;
