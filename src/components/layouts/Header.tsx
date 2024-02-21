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
      <ul className="flex flex-1 md:mr-12">
        {/* {headerItems.map((item) => (
          <li key={item.name} className="ml-3 md:ml-6">
            <a className="font-medium" href={`/${lng}/${item.href}`}>
              {item.name}
            </a>
          </li>
        ))} */}
      </ul>
    </HeaderContainer>
  );
};

export default Header;
