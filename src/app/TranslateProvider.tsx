// "use client";

// import { useRouter } from "next/navigation";
// import { createContext, useContext, useEffect, useState } from "react";
// import { useTranslation } from "./i18n";

// export const TranslateContext = createContext<any>(null);

// interface IProps {
//   children: React.ReactNode;
// }

// type Language = "ko" | "en";

// export default function TranslateProvider({ children }: IProps) {
//   const [lng, setLng] = useState<Language>("ko");

//   const UpdateLanguage = async (lng: Language) => {
//     const { t } = await useTranslation({ lng, ns: "hook" });
//     setLng(lng);
//     return {
//       t,
//       lng,
//     };
//   };

//   return (
//     // eslint-disable-next-line react/jsx-no-constructed-context-values
//     <TranslateContext.Provider value={{ UpdateLanguage, t, lng }}>
//       {children}
//     </TranslateContext.Provider>
//   );
// }

// export const useTrans = () => {
//   const context = useContext<{
//     lng: Language;
//     UpdateLanguage?: () => void;
//     signOut: () => Promise<{
//       error: AuthError | null;
//     }>;
//   }>(AuthContext);
//   if (context === undefined) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };
