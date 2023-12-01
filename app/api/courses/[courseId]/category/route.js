import { NextResponse } from "next/server";
import prismadb from "@/lib/prismaDB";
import { auth } from "@clerk/nextjs";

export async function PATCH(req, { params }) {
  const { courseId } = params;
  const body = await req.json();
  const { categoryTitle } = body;
  const { userId } = auth();

  if (!userId) {
    return new NextResponse("Unauthenticated", { status: 403 });
  }
  if (!categoryTitle) {
    return new NextResponse("Description is required", { status: 400 });
  }
  if (!courseId) {
    return new NextResponse("Course Id is required", { status: 403 });
  }

  try {
    const updatedCategory = await prismadb.course.update({
      where: {
        id: courseId,
      },
      data: {
        categoryTitle,
      },
    });

    return NextResponse.json(updatedCategory);
  } catch (error) {
    console.log("[COURSE_CATEGORY_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
