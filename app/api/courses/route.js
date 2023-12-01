import { NextResponse } from "next/server";
import prismadb from "@/lib/prismaDB";

export async function GET(req) {
  try {
    const courses = await prismadb.course.findMany({
      include: {
        chapters: {
          where: {
            published: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    const publishedCourses = courses.filter(
      (course) => course.published === true
    );
    return NextResponse.json(publishedCourses);
  } catch (error) {
    console.log("[COURSES_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
