"use client";

import React, { SetStateAction, use, useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useParams, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/app/i18n/client";
import { getMe, handleSignOut } from "@/apis/auth";
import useToast from "@/hooks/useToast";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { set } from "react-hook-form";
import useUserStore from "@/store/user";

const SearchIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-7 h-7 cursor-pointer"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
      />
    </svg>
  );
};

const UserIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-7 h-7 cursor-pointer"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
      />
    </svg>
  );
};

interface IProps {
  children: React.ReactNode;
}

export const HeaderContainer = ({ children }: IProps) => {
  const lng = useParams().lng || "ko";
  const { t } = useTranslation(lng as string, "header");
  const router = useRouter();
  const pathName = usePathname();
  const { errorToast } = useToast();
  const queryClient = useQueryClient();
  const { isAuth, setIsAuth, setUser, user } = useUserStore();

  const handleLanguage = (value: any) => {
    const pathParts = pathName.split("/");

    pathParts[1] = value;

    const newPath = pathParts.join("/");

    router.push(newPath);
  };

  const goToHome = () => {
    return router.push(`/${lng}`);
  };

  const signOut = async () => {
    try {
      await handleSignOut();
      await queryClient.refetchQueries({
        queryKey: ["user"],
      });
      setIsAuth(false);
      setUser(null);
      router.push(`/${lng}/auth/sign-in`);
    } catch (error: any) {
      errorToast(error.message);
    }
  };

  useEffect(() => {
    getMe().then((res) => {
      if (res) {
        setIsAuth(true);
        setUser(res);
      }
    });
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-50 rounded-none py-4 px-4  lg:px-12 flex justify-between items-center bg-white shadow-md">
      <div>
        <button onClick={goToHome}>
          <span className="text-lg md:text-2xl font-bold">Drum village</span>
        </button>
      </div>

      <div className="flex">
        <div className="flex items-center">
          {children}
          <SearchIcon />
          {isAuth ? (
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger className="mx-1 md:mx-3 ">
                <UserIcon />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white">
                <DropdownMenuLabel>{t("my-account")}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => router.push(`/${lng}/my-profile`)}
                >
                  {t("my-profile")}
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" onClick={signOut}>
                  {t("logout")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <button
              className="mx-2"
              onClick={() => router.push(`/${lng}/auth/sign-in`)}
            >
              {t("signin")}
            </button>
          )}
        </div>

        <Menubar className="mx-2">
          <MenubarMenu>
            <MenubarTrigger className="w-[100px]">
              {!lng ? "한국어" : lng === "ko" ? "한국어" : "English"}
            </MenubarTrigger>
            <MenubarContent className="bg-white w-[100px]">
              <MenubarItem
                className="cursor-pointer"
                onSelect={() => handleLanguage("ko")}
              >
                한국어
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem
                className="cursor-pointer"
                onSelect={() => handleLanguage("en")}
              >
                English
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
    </div>
  );
};
