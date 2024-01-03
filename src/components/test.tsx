"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTranslation } from "../app/i18n/client";

interface IProps {
  lng: string;
}

const Test = ({ lng }: IProps) => {
  const { t } = useTranslation(lng, "client-page");
  const [counter, setCounter] = useState(0);
  return (
    <div>
      <h1>{t("title")}</h1>
      <p>{t("counter", { count: counter })}</p>
      <div>
        <button onClick={() => setCounter(Math.max(0, counter - 1))}>-</button>
        <button onClick={() => setCounter(Math.min(10, counter + 1))}>+</button>
      </div>
      <Link href={`/${lng}`}>
        <button type="button">{t("back-to-home")}</button>
      </Link>
    </div>
  );
};

export default Test;
