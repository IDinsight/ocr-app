"use client";

import * as React from "react";
import Link from "next/link";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, ArrowUp } from "lucide-react";

type FormEntry = {
  id: string;
  form: string;
  description: string;
  totalSubmissions: number;
  status: "Draft" | "Live" | "Archived";
  createdAt: string; // ISO string
  owner: string;
};

const columns: ColumnDef<FormEntry>[] = [
  {
    accessorKey: "form",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="pl-1"
      >
        Form {renderSortIcon(column.getIsSorted())}
      </button>
    ),
    cell: ({ row }) => {
      const formName = row.getValue("form") as string;
      const formId = row.original.id;
      return (
        <Link
          href={`/forms/${formId}`}
          className="pl-1 text-blue-600 underline hover:opacity-80"
        >
          {formName}
        </Link>
      );
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Description {renderSortIcon(column.getIsSorted())}
      </button>
    ),
  },
  {
    accessorKey: "totalSubmissions",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Total Submissions {renderSortIcon(column.getIsSorted())}
      </button>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const variant =
        status === "Live"
          ? "success"
          : status === "Draft"
          ? "warning"
          : "secondary";
      return <Badge variant={variant}>{status}</Badge>;
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Creation Date {renderSortIcon(column.getIsSorted())}
      </button>
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return date.toLocaleDateString();
    },
  },
  {
    accessorKey: "owner",
    header: "Owner",
    cell: ({ row }) => {
      const owner = row.getValue("owner") as string;
      const initials = owner
        .split(" ")
        .map((n) => n[0])
        .join("");
      return (
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-700">
            {initials}
          </div>
          <span>{owner}</span>
        </div>
      );
    },
  },
];

const data: FormEntry[] = [
  {
    id: "health-survey",
    form: "Health Survey",
    description: "Basic health assessment",
    totalSubmissions: 230,
    status: "Live",
    createdAt: "2024-11-10T14:48:00.000Z",
    owner: "Dr. Adams",
  },
  {
    id: "enrollment-form",
    form: "Enrollment Form",
    description: "Community health worker registration",
    totalSubmissions: 58,
    status: "Draft",
    createdAt: "2025-01-20T09:20:00.000Z",
    owner: "Jane Smith",
  },
  {
    id: "exit-survey",
    form: "Exit Survey",
    description: "Feedback from participants",
    totalSubmissions: 15,
    status: "Archived",
    createdAt: "2024-07-05T12:00:00.000Z",
    owner: "Michael Okoro",
  },
  // Add more entries as needed
];

function renderSortIcon(sorted: false | "asc" | "desc") {
  if (sorted === "asc") return <ArrowUp className="inline h-4 w-4" />;
  if (sorted === "desc") return <ArrowDown className="inline h-4 w-4" />;
  return null;
}

export function FormTable() {
  const [globalFilter, setGlobalFilter] = React.useState("");

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onGlobalFilterChange: setGlobalFilter,
  });

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search forms..."
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
        className="max-w-sm"
      />

      <div className="rounded-lg border shadow-sm overflow-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
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
                <TableCell colSpan={columns.length} className="text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 mt-4">
        <Button
          variant="outline"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <div className="text-sm text-muted-foreground">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <Button
          variant="outline"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
