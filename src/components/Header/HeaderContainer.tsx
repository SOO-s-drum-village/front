"use client";

import React, { useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useParams, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/app/i18n/client";
import { getMe, handleSignOut } from "@/apis/auth";
import useToast from "@/hooks/useToast";
import { useQueryClient } from "@tanstack/react-query";
import useUserStore from "@/store/user";
import Image from "next/image";
import Search from "../\bIcon/Search";

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
      await queryClient.removeQueries();
      setIsAuth(false);
      setUser(null);
      router.push(`/${lng}/auth/sign-in`);
    } catch (error: any) {
      errorToast(error.message);
    }
  };

  const fetchMe = async () => {
    try {
      const res = await getMe();
      if (res) {
        setIsAuth(true);
        setUser(res);
      }
    } catch (error: any) {
      console.log("error", error.message);
    }
  };

  useEffect(() => {
    fetchMe();
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 rounded-none py-4 px-4  lg:px-12 flex justify-between items-center bg-white shadow-md">
      <div>
        <button onClick={goToHome}>
          <Image
            src="/drumvillage-logo.png"
            alt="drumvillage_logo"
            width={150}
            height={50}
          />
        </button>
      </div>
      {children}
      <div className="flex items-center">
        <div className="flex items-center">
          {/* <Search className="w-6 h-6 cursor-pointer" border="2" /> */}
          {isAuth ? (
            <Menu as="div" className="text-left">
              <div>
                <Menu.Button className="inline-flex w-full h-full  hover:bg-whitesmoke2 justify-center rounded-md  p-2 text-sm font-medium   focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 ">
                  <Image
                    src="/icon/user.png"
                    alt="profile_image"
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                  <div className="px-1 py-1 ">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active
                              ? "bg-violet-400 text-white"
                              : "text-gray-900"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          onClick={() => router.push(`/${lng}/my-profile`)}
                        >
                          {t("my-profile")}
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active
                              ? "bg-violet-400 text-white"
                              : "text-gray-900"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          onClick={signOut}
                        >
                          {t("logout")}
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          ) : (
            <button
              className="mx-2"
              onClick={() => router.push(`/${lng}/auth/sign-in`)}
            >
              {t("signin")}
            </button>
          )}
        </div>

        <Menu as="div" className="text-left">
          <div>
            <Menu.Button className="inline-flex w-full h-full  hover:bg-whitesmoke2 justify-center rounded-md  px-4 py-2 text-sm font-medium   focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 ">
              {!lng ? "한국어" : lng === "ko" ? "한국어" : "English"}
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
              <div className="px-1 py-1 ">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-violet-500 text-white" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      onClick={() => handleLanguage("ko")}
                    >
                      한국어
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-violet-500 text-white" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      onClick={() => handleLanguage("en")}
                    >
                      English
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </nav>
  );
};
