import React, { use } from "react";
import { HeaderContainer } from "../Header/HeaderContainer";
import { useTranslation } from "@/app/i18n";

interface IProps {
  lng: string;
}

const Header = async ({ lng }: IProps) => {
  const { t } = await useTranslation(lng, "header");
  return (
    <HeaderContainer>
      <ul className="hidden md:flex flex-1 mr-12 ">
        <li>{t("member-ship")}</li>
      </ul>
    </HeaderContainer>
  );
};

export default Header;
