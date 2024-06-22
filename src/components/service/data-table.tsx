import React from "react";
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

export type Service = {
  ino?: number;
  iname: string;
  rate1: number;
  rate2: number;
  rate3: number;
  rate4: number;
  rate5: number;
  itype: string;
};

type DataTableDemoProps = {
  data: Service[];
  onEdit: (service: Service) => void;
  onDelete: (ino: number) => void;
};

export const DataTableDemo: React.FC<DataTableDemoProps> = ({
  data,
  onEdit,
  onDelete,
}) => {
  const columns: ColumnDef<Service>[] = [
    {
      accessorKey: "ino",
      header: "Service ID",
    },
    {
      accessorKey: "iname",
      header: "Service Name",
    },
    {
      accessorKey: "rate1",
      header: "Rate 1",
    },
    {
      accessorKey: "rate2",
      header: "Rate 2",
    },
    {
      accessorKey: "rate3",
      header: "Rate 3",
    },
    {
      accessorKey: "rate4",
      header: "Rate 4",
    },
    {
      accessorKey: "rate5",
      header: "Rate 5",
    },
    {
      accessorKey: "itype",
      header: "Type",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const service = row.original;
        return (
          <div className="flex space-x-2">
            <button className="text-grey-500" onClick={() => onEdit(service)}>
              Edit
            </button>
            <button
              className="text-red-500"
              onClick={() => onDelete(service.ino ?? 0)} // Use a default value if ino is undefined
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
    <div className="w-full h-full overflow-auto">
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
