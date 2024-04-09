import { getMe, getPaymentMe } from "@/apis/auth";
import DetailContainer from "@/components/Lecture/DetailContainer";
import { redirect } from "next/navigation";

import React from "react";

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
  // const queryClient = GetQueryClient();
  // await queryClient.prefetchQuery({
  //   queryKey: ["lecture", params.id],
  //   queryFn: () => getLecture(Number(params.id)),
  // });
  // const dehydratedState = dehydrate(queryClient);

  // try {
  //   const me = await getMe();
  //   console.log("me", me);
  // } catch (e: any) {
  //   console.error(e.message);
  //   return redirect(`/${params.lng || "ko"}/auth/sign-in`);
  // }

  return (
    <div className="max-w-screen-xl mx-auto p-4 md:p-8 h-full bg-whitesmoke2">
      {/* <HydrationBoundary state={dehydratedState}> */}
      <DetailContainer />
      {/* </HydrationBoundary> */}
    </div>
  );
};

export default page;
