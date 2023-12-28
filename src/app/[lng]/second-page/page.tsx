import Link from 'next/link';
import React from 'react';
import { useTranslation } from '../../i18n';

const Page = async ({ params: { lng } }: { params: { lng: string } }) => {
  const { t } = await useTranslation({ lng, ns: 'second-page' });

  return <Link href={`/${lng}`}>{t('back-to-home')}</Link>;
};

export default Page;
