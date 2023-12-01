"use client";

import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import CellActions from "./cell-actions";
import { Badge } from "@/components/ui/badge";

export const CoursesColumns = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "published",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="ml-2">
        {" "}
        {row.original.published ? (
          <Badge>Published</Badge>
        ) : (
          <Badge variant="secondary">Draft</Badge>
        )}
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellActions data={row.original} />,
  },
];
