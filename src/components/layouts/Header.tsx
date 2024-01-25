import React, { use } from "react";
import { HeaderContainer } from "../Header/HeaderContainer";
import { useTranslation } from "@/app/i18n";

interface IProps {
  lng: string;
}

const Header = async ({ lng }: IProps) => {
  const { t } = await useTranslation(lng, "header");

  const headerItems = [
    {
      href: "/lecture",
      name: t("lecture"),
    },
  ];

  return (
    <HeaderContainer>
      <ul className="hidden md:flex flex-1 mr-12 ">
        {headerItems.map((item) => (
          <li key={item.name} className="mr-6">
            <a className="text-lg font-medium" href={`/${lng}/${item.href}`}>
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </HeaderContainer>
  );
};

export default Header;
