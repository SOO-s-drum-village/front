"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  ExpandedState,
  OnChangeFn,
  PaginationState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { type Table as ReactTable } from "@tanstack/table-core";
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Children, ReactElement, useState } from "react";
import { cn } from "@/lib/utils";
import { Pagination } from "./Pagination";

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  bordered?: boolean;
  cellBordered?: boolean;
  children?: React.ReactNode;
  pagination?: boolean;
  // pagination?: PaginationState
  selectable?: boolean;
  filter?: (props: any) => React.ReactNode;
  defaultExpandState?: { [key: string]: boolean };
  pageCount?: number;
  onPaginationChange?: OnChangeFn<PaginationState>;
  isRedRow?: (row: TData) => boolean;
}

export function DataTable<TData>({
  columns,
  data,
  bordered = false,
  cellBordered = false,
  children,
  pagination = false,
  // pagination,
  selectable = false,
  filter,
  defaultExpandState = {},
  pageCount,
  onPaginationChange,
  isRedRow,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [expanded, setExpanded] = useState<ExpandedState>(defaultExpandState);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: pagination ? getPaginationRowModel() : undefined,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: selectable ? setRowSelection : undefined,
    onColumnVisibilityChange: setColumnVisibility,
    getExpandedRowModel: getExpandedRowModel(),

    onExpandedChange: setExpanded,
    getSubRows: (row) => (row as any).subRows,

    // pageCount,
    // onPaginationChange,

    state: {
      expanded,
      sorting,
      columnFilters,
      rowSelection,
      columnVisibility,
    },
  });

  const childs = Children.toArray(children) as ReactElement[];

  const colGroupChild = childs.find((item) => item.type === "colgroup");

  // 다크 모드가 활성화되어 있는지 확인하는 함수
  const isDarkMode = () => {
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  };

  return (
    <div>
      {filter && filter({ table })}
      <div
        className={cn("rounded-md", { border: bordered })}
        style={{ minHeight: "145px" }}
      >
        <Table className="border-collapse bg-[white] dark:bg-transparent">
          {colGroupChild}
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      style={{
                        width: header.getSize(),
                        maxWidth: header.getSize(),
                      }}
                      className={cn(
                        "text-xs font-bold bg-[ghostwhite] dark:bg-[#2e313d] text-black dark:text-white whitespace-nowrap",
                        {
                          border: cellBordered,
                        }
                      )}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  style={
                    isRedRow && isRedRow(row.original)
                      ? { backgroundColor: "mintcream" }
                      : {}
                  }
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={cn("text-xs  whitespace-nowrap", {
                        border: cellBordered,
                      })}
                      style={
                        isRedRow && isRedRow(row.original)
                          ? { color: "black" }
                          : {}
                      }
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-xs"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {pagination && (
        <div className="py-4">
          <Pagination table={table} selectable={selectable} />
        </div>
      )}
    </div>
  );
}

interface DataTable2Props<TData> {
  table: ReactTable<TData>;
  pagination?: boolean;
  bordered?: boolean;
  cellBordered?: boolean;
}
export function DataTable2<TData>({
  table,
  pagination = false,
  bordered = false,
  cellBordered = false,
}: DataTable2Props<TData>) {
  return (
    <div>
      {/* {filter && filter({ table })} */}
      <div className={cn("rounded-md", { border: bordered })}>
        <Table className="border-collapse ">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={cn(
                        "text-xs font-bold px-6 bg-[ghostwhite] dark:bg-[#2e313d] text-black dark:text-white whitespace-nowrap",
                        { border: cellBordered }
                      )}
                      style={{ width: header.getSize() }}
                    >
                      <div className="flex items-center">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                        {/* {header.column.getIsSorted() === "asc" ? (
                          <ChevronUp />
                        ) : header.column.getIsSorted() === "desc" ? (
                          <ChevronDown />
                        ) : null}
                        {header.column.getCanSort() &&
                        !header.column.getIsSorted() ? (
                          <ChevronsUpDown />
                        ) : null} */}
                      </div>
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className={cn("text-xs  whitespace-nowrap px-6", {
                      border: cellBordered,
                    })}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {pagination && (
        <div className="py-4">
          <Pagination table={table} selectable={false} />
        </div>
      )}
    </div>
  );
}
