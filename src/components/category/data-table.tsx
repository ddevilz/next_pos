"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteCategoryHandler } from "@/actions/category";

export type Category = {
  catid: string;
  category: string;
};

type DataTableDemoProps = {
  data: Category[];
  onEdit: (category: Category) => void;
  onDelete: (catid: string) => void;
};

export const DataTableDemo: React.FC<DataTableDemoProps> = ({
  data,
  onEdit,
  onDelete,
}) => {
  const columns: ColumnDef<Category>[] = [
    {
      accessorKey: "catid",
      header: "Category ID",
    },
    {
      accessorKey: "category",
      header: "Category Name",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const category = row.original;
        return (
          <div className="flex space-x-2">
            <button className="text-grey-500" onClick={() => onEdit(category)}>
              Edit
            </button>
            <button
              className="text-red-500"
              onClick={async () => {
                const res = await deleteCategoryHandler(category.catid);
                if (res.success) {
                  onDelete(category.catid);
                } else {
                  alert(res.error || "Error deleting category");
                }
              }}
            >
              Delete
            </button>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full">
      <div className="rounded-md border">
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
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
