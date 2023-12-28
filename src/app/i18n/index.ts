import { createInstance } from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next/initReactI18next';
import { TFunction, i18n, InitOptions } from 'i18next';
import { getOptions } from './settings';

const initI18next = async (lng: any, ns: any) => {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language: any, namespace: any) =>
          import(`./locales/${language}/${namespace}.json`)
      )
    )
    .init(getOptions(lng, ns));
  return i18nInstance;
};

// export async function useTranslation(lng, ns, options = {}) {
//   const i18nextInstance = await initI18next(lng, ns);
//   return {
//     t: i18nextInstance.getFixedT(
//       lng,
//       Array.isArray(ns) ? ns[0] : ns,
//       options.keyPrefix
//     ),
//     i18n: i18nextInstance,
//   };
// }

// `useTranslation` 함수의 반환값을 위한 타입
interface TranslationHookResult {
  t: TFunction;
  i18n: i18n;
}

// `useTranslation` 함수의 인자를 위한 타입
interface UseTranslationOptions {
  lng: string;
  ns: string | string[];
  options?: any;
}

// `useTranslation` 함수 정의
export async function useTranslation({
  lng,
  ns,
  options = {},
}: UseTranslationOptions): Promise<TranslationHookResult> {
  const i18nextInstance = await initI18next(lng, ns);

  return {
    t: i18nextInstance.getFixedT(
      lng,
      Array.isArray(ns) ? ns[0] : ns,
      options.keyPrefix
    ),
    i18n: i18nextInstance,
  };
}
