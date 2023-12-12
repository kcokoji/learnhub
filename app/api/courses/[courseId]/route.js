import { NextResponse } from "next/server";
import prismadb from "@/lib/prismaDB";
import { auth } from "@clerk/nextjs";

export async function DELETE(req, { params }) {
  const { courseId } = params;
  const { userId } = auth();

  if (!userId) {
    return new NextResponse("Unauthenticated", { status: 403 });
  }
  if (!courseId) {
    return new NextResponse("Course Id is required", { status: 403 });
  }

  try {
    const transaction = await prismadb.transaction.findFirst({
      where: {
        courseId,
      },
    });
    if (transaction) {
      // If a transaction exists, throw an error
      throw new Error(
        "Course has been purchased by a student and cannot be deleted."
      );
    }
    const deleteCourse = await prismadb.course.delete({
      where: {
        id: courseId,
      },
    });

    return NextResponse.json(deleteCourse);
  } catch (error) {
    console.log("[COURSE_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
