import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useTranslation } from '../i18n';
import Link from 'next/link';

export default async function Home({
  params: { lng },
}: {
  params: { lng: string };
}) {
  const { t } = await useTranslation({ lng, ns: 'home' });
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* <Button size="lg" className="bg-blue-300 ">
        {lng}
      </Button> */}
      <Link href={`/${lng}/second-page`}>{t('home')}</Link>
    </main>
  );
}
