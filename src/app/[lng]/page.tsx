import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useTranslation } from "../i18n";
import Link from "next/link";
import { MainContainer } from "@/components/Main/MainContainer";

export default async function Home({
  params: { lng },
}: {
  params: { lng: string };
}) {
  const { t } = await useTranslation({ lng, ns: "home" });
  return (
    <div className=" flex-col items-center justify-between  mx-auto">
      <MainContainer />
      <Link href={`/${lng}/second-page`}>{t("home")}</Link>
    </div>
  );
}
