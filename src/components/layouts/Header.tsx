import React from 'react';
import { useTranslation } from '@/app/i18n';
import { languages } from '@/app/i18n/settings';
import Link from 'next/link';
import { Trans } from 'react-i18next/TransWithoutContext';

const SearchIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-6 h-6 mr-1 cursor-pointer"
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
      className="w-6 h-6 cursor-pointer"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
      />
    </svg>
  );
};

export const Header = async ({ lng }: any) => {
  const { t } = await useTranslation({ lng, ns: 'header' });

  return (
    <div className="fixed top-0 left-0 w-full z-50 h-max rounded-none py-4 px-4  lg:px-8 flex justify-between items-center bg-yellow-100">
      <div>
        <span className="text-2xl font-bold">Drum village</span>
      </div>
      <div className="flex">
        <div className="flex">
          <SearchIcon />
          <UserIcon />
        </div>
        <div className="mx-2">
          <Trans i18nKey="languageSwitcher" t={t}>
            <strong>{lng}</strong>
          </Trans>
          {languages
            .filter((l) => lng !== l)
            .map((l, index) => {
              return (
                <span
                  key={l}
                  className={`${lng === l ? 'text-red-500' : 'text-black'}`}
                >
                  {index > 0 && ' / '}
                  <Link href={`/${l}`}>{l}</Link>
                </span>
              );
            })}
        </div>
      </div>
    </div>
  );
};
