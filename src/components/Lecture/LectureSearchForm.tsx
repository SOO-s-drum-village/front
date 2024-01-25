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
      className="w-6 h-6 md:w-7 md:h-7"
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
      className="w-6 h-6 md:w-7 md:h-7"
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
    { value: "level", name: t("by-level") },
    { value: "name", name: t("by-name") },
    { value: "date", name: t("by-date") },
  ];

  const badgeList = [
    { value: "K_POP", name: t("k-pop") },
    { value: "PRAISE", name: t("praise") },
    { value: "BASIC", name: t("basic") },
  ];

  const selectedItem = selectList.filter(
    (item) => item.value === searchParams.get("sort")
  );

  const [selectedPerson, setSelectedPerson] = useState(
    selectedItem[0] || selectList[0]
  );
  const [selectedBadge, setSelectedBadge] = useState<string>();

  const handleSortSelect = (value: { name: string; value: string }) => {
    setSelectedPerson(value);
    router.push(
      `/${params.lng}/lecture?sort=${value.value}&category=${category}`
    );
  };

  const handleBadgeSelect = (value: { name: string; value: string }) => {
    setSelectedBadge(value.value);
    router.push(`/${params.lng}/lecture?category=${value.value}&sort=${sort}`);
  };

  return (
    <div className="flex items-center my-4">
      <div className="w-32 relative z-10 ">
        <Listbox
          value={selectedPerson}
          onChange={(value: any) => handleSortSelect(value)}
        >
          {({ open }) => (
            <>
              <Listbox.Button className=" cursor-pointer p-2 w-full text-left text-lg md:text-xl font-medium flex justify-between ">
                {selectedPerson.name}
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
                <Listbox.Options className="shadow-xl absolute bottom-[-120px] left-0 z-20 bg-white w-full cursor-pointer">
                  {selectList.map((person) => (
                    /* Use the `active` state to conditionally style the active option. */
                    /* Use the `selected` state to conditionally style the selected option. */
                    <Listbox.Option
                      key={person.value}
                      value={person}
                      as={Fragment}
                    >
                      {({ active, selected }) => (
                        <li
                          className={`py-2 px-2  ${
                            (active || selected) && "bg-whitesmoke2 text-black "
                          }`}
                        >
                          {person.name}
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
      <div className="ml-4 flex whitespace-nowrap">
        {badgeList.map((badge) => (
          <Badge
            key={badge.value}
            className={`cursor-pointer bg-whitesmoke2 text-primary text-sm md:text-lg  ml-2 py-[6px] px-3 my-1 md:my-0 ${
              selectedBadge === badge.value
                ? "border border-royalblue bg-white text-royalblue"
                : ""
            } `}
            onClick={() => handleBadgeSelect(badge)}
          >
            # {badge.name}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default LectureSearchForm;
