"use client";

import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

type Props = {
  children: React.ReactNode;
};

export default function QueryProvider({ children }: Props) {
  const [client] = React.useState(
    new QueryClient({
      defaultOptions: {
        // react-query 전역 설정
        queries: {
          retry: 1,
          staleTime: 60 * 1000 * 60, // 1 hour
          //   suspense: true,
        },
      },
    })
  );

  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
