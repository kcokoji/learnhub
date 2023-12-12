import { Button } from "@/components/ui/button";

import { UserButton } from "@clerk/nextjs";

import Link from "next/link";

import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismaDB";
import { format } from "date-fns";
import { formatter } from "@/lib/utils";
import CourseClient from "./components/client";

export const revalidate = 0;

export default async function CoursesPage() {
  const { userId } = auth();
  const courses = await prismadb.course.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCourses = courses.map((course) => ({
    id: course.id,
    title: course.title,
    price: formatter.format(course.price),
    published: course.published,
    createdAt: format(course.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="py-4 lg:px-10 space-y-4 px-6">
      <div className="lg:flex justify-end gap-2 hidden">
        {" "}
        <Button variant="ghost" asChild>
          <Link href="/">Student</Link>
        </Button>
        <UserButton />
      </div>
      <CourseClient data={formattedCourses} />
    </div>
  );
}
