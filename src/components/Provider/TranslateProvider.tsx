"use client";

import React from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "@/utils/i18n";

const TranslateProvider = ({ children }: { children: React.ReactNode }) => {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};

export default TranslateProvider;
