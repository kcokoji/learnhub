"use client";

import Heading from "@/components/Heading";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { DataTable } from "./data-table";
import { PlusCircle } from "lucide-react";
import { CoursesColumns } from "./colums";
import Link from "next/link";

export default function CourseClient({ data }) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        {" "}
        <Heading
          title={`Courses (${data.length})`}
          description="Manage all your courses here."
        />
        <Button asChild>
          <Link href="/instructor/courses/new">
            {" "}
            <PlusCircle className="h-6 w-6 mr-2" /> New Course
          </Link>
        </Button>
      </div>
      <Separator />

      <DataTable columns={CoursesColumns} data={data} searchKey="title" />
    </div>
  );
}
