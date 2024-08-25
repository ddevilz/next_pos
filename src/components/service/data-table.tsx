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
            <button
              className="text-blue-500 hover:text-blue-700"
              onClick={() => onEdit(service)}
            >
              Edit
            </button>
            <button
              className="text-red-500 hover:text-red-700"
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
    <div className="w-full h-full overflow-auto bg-white rounded-md shadow-lg border border-gray-200">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="bg-gray-100 border-b">
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="p-2 text-left font-medium">
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
              <TableRow key={row.id} className="border-b hover:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="p-2">
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
                className="h-24 text-center text-gray-500"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
