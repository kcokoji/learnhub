import getPayedCourses from "@/actions/get-payed-courses";
import React from "react";
import CourseCard from "@/components/course-card";
import { Suspense } from "react";
import AnimateLoader from "@/components/ui/loader";
import Heading from "@/components/Heading";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function MyLearningPage() {
  const courses = await getPayedCourses();

  return (
    <div className="mx-auto py-4 lg:px-10 space-y-4 px-6">
      <Heading title="My Learning" />
      <Separator />
      <div>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">In progress</SelectItem>
            <SelectItem value="dark">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {!courses || courses.length === 0 ? (
        // If courses are not available
        <div className="flex justify-center items-center flex-col gap-y-4">
          <Heading title="No Courses Available" className="text-center" />
          <Button size="lg" asChild>
            <Link href="/">Choose a Course</Link>
          </Button>
        </div>
      ) : (
        // If courses are available
        <Suspense fallback={<AnimateLoader size={50} color="#f97316" />}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-2">
            {courses.map((course) => (
              <CourseCard key={course.id} data={course} />
            ))}
          </div>
        </Suspense>
      )}
    </div>
  );
}
