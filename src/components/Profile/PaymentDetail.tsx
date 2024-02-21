"use client";

import { getPaymentList } from "@/apis/payment";
import { useTranslation } from "@/app/i18n/client";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Link from "next/link";
import { DataTable, DataTable2 } from "./PaymentTable";
import useFilters from "@/hooks/useFilters";
import { PaymentList } from "@/types/payment";

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

interface Props {
  lng: string;
}

const PaymentDetail = ({ lng }: Props) => {
  const { t } = useTranslation(lng, "auth");
  const [page, setPage] = useState(1);
  const filters = useFilters();

  const payments = async ({ page }: { page: number }): Promise<PaymentList> => {
    const result = await getPaymentList({ page: page });

    const filteredResult = result?.items.map((item) => {
      return {
        ...item,
        merchantUid: item.merchantUid.substring(0, 15),
        paidAt: filters.YYYYMMDD(item.paidAt, "YYYY.MM.DD hh:mm"),
        amount: filters.CASHCOMMA(item.amount),
      };
    });

    return {
      totalCount: result?.totalCount,
      items: filteredResult,
    };
  };

  const { data: paymentList } = useQuery({
    queryKey: ["payment-list", page],
    queryFn: () => payments({ page: page }),
    placeholderData: keepPreviousData,
  });

  const columns = [
    // {
    //   accessorKey: "rowNumber",
    //   header: "No.",
    //   size: 50,
    //   maxSize: 50,
    //   enableSorting: false,
    //   cell: ({ row, getValue }: any) => {
    //     const titleValue = getValue() as string;
    //     return (
    //       <div
    //         className="flex items-center gap-1"
    //         style={{
    //           paddingLeft: `${row.depth * 1}rem`,
    //         }}
    //       >
    //         {titleValue}
    //       </div>
    //     );
    //   },
    // },
    {
      accessorKey: "id",
      header: "아이디",
      enableSorting: false,
      cell({ row, getValue }: any) {
        const userId = row.original?.userId;
        // console.log("userId: ", userId)

        const value = getValue() as string;
        return <span>{value}</span>;
      },
    },
    {
      accessorKey: "merchantUid",
      header: t("merchant-id"),
      enableSorting: false,
    },
    {
      accessorKey: "amount",
      header: t("amount"),
      size: 80,
      maxSize: 80,
      enableSorting: false,
    },
    {
      accessorKey: "paidAt",
      header: t("paid-at"),
      size: 80,
      maxSize: 80,
      enableSorting: false,
    },
  ];

  const table = useReactTable({
    columns,
    data: paymentList?.items || [],
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    // pageCount,
    manualPagination: true,
    manualSorting: true,
    manualFiltering: false,
    // state: {
    //   sorting,
    //   columnFilters,
    //   pagination,
    // },
    // onPaginationChange: setPagination,
    // onSortingChange: setSorting,
    // onColumnFiltersChange: setColumnFilters,
  });

  return (
    <div className="my-8 text-black text-lg shadow-lg rounded-xl">
      <div className="bg-whitesmoke2 p-6 flex items-center font-bold  rounded-t-xl ">
        <UserIcon />
        <span className="ml-2">{t("payment-detail")}</span>
      </div>

      <DataTable2 table={table} pagination />
    </div>
  );
};

export default PaymentDetail;
