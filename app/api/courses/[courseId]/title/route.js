import { NextResponse } from "next/server";
import prismadb from "@/lib/prismaDB";
import { auth } from "@clerk/nextjs";

export async function PATCH(res, { params }) {
  const { courseId } = params;
  const body = await res.json();
  const { title } = body;
  const { userId } = auth();

  if (!userId) {
    return new NextResponse("Unauthenticated", { status: 403 });
  }
  if (!title) {
    return new NextResponse("Title is required", { status: 400 });
  }
  if (!courseId) {
    return new NextResponse("Course Id is required", { status: 403 });
  }

  try {
    const updatedTitle = await prismadb.course.update({
      where: {
        id: courseId,
      },
      data: {
        title,
      },
    });

    return NextResponse.json(updatedTitle);
  } catch (error) {
    console.log("[COURSE_TITLE_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
