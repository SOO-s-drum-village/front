import React, { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useTranslation } from "@/app/i18n/client";
import { Badge } from "../ui/badge";

const ChevronDown = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-5 h-5 md:w-6 md:h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m19.5 8.25-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
};

const ChevronUp = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-5 h-5 md:w-6 md:h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m4.5 15.75 7.5-7.5 7.5 7.5"
      />
    </svg>
  );
};

const LectureSearchForm = () => {
  const params = useParams();
  const { t } = useTranslation(params.lng as string, "lecture");
  const searchParams = useSearchParams();
  const sort = searchParams.get("sort");
  const category = searchParams.get("category");
  const router = useRouter();

  const selectList = [
    { value: "highest-level", name: t("highest-level") },
    { value: "lowest-level", name: t("lowest-level") },
  ];

  const badgeList = [
    { value: "BASIC", name: t("basic") },
    { value: "K_POP", name: t("k-pop") },
    { value: "PRAISE", name: t("praise") },
  ];

  const selectedItem = selectList.filter(
    (item) => item.value === searchParams.get("sort")
  );

  const [selectedPerson, setSelectedPerson] = useState(
    selectedItem[0] || selectList[0]
  );
  const [selectedCategory, setSelectedCategory] = useState<string>(
    category || ""
  );

  const handleSortSelect = (value: { name: string; value: string }) => {
    setSelectedPerson(value);
    router.push(
      `/${params.lng}/lecture?sort=${value.value}&category=${category}`
    );
  };

  const handleBadgeSelect = (value: { name: string; value: string }) => {
    setSelectedCategory(value.value);
    router.push(`/${params.lng}/lecture?category=${value.value}&sort=${sort}`);
  };

  return (
    <div className="flex items-center md:my-4">
      <div className="w-60 relative z-10 ">
        <Listbox
          value={selectedPerson}
          onChange={(value: any) => handleSortSelect(value)}
        >
          {({ open }) => (
            <>
              <Listbox.Button className=" cursor-pointer p-2 w-full text-left text-sm md:text-lg font-medium flex justify-between whitespace-nowrap">
                <span>{t(selectedPerson.value)}</span>
                {open ? <ChevronUp /> : <ChevronDown />}
              </Listbox.Button>
              <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Listbox.Options className="shadow-2xl  absolute bottom-[-80px] md:bottom-[-95px] left-0 z-20 bg-white w-full cursor-pointer">
                  {selectList.map((item) => (
                    /* Use the `active` state to conditionally style the active option. */
                    /* Use the `selected` state to conditionally style the selected option. */
                    <Listbox.Option key={item.value} value={item} as={Fragment}>
                      {({ active, selected }) => (
                        <li
                          className={`py-2 px-2  ${
                            (active || selected) && "bg-whitesmoke2 text-black "
                          }`}
                        >
                          {item.name}
                        </li>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </>
          )}
        </Listbox>
      </div>
      <div className=" md:ml-4 flex whitespace-nowrap">
        {badgeList.map((badge) => (
          <Badge
            key={badge.value}
            className={`cursor-pointer  text-darkslategray font-medium text-xs md:text-lg  ml-2 md:ml-4 py-[6px] px-3 md:px-5 my-1 md:my-0 ${
              selectedCategory === badge.value
                ? "border border-black bg-white text-black font-bold"
                : ""
            } `}
            onClick={() => handleBadgeSelect(badge)}
          >
            {badge.name}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default LectureSearchForm;
