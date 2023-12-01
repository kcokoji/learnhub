import { NextResponse } from "next/server";
import prismadb from "@/lib/prismaDB";
import { auth } from "@clerk/nextjs";

export async function PATCH(res, { params }) {
  const { courseId, chapterId } = params;
  const body = await res.json();
  const { published } = body;

  const { userId } = auth();

  if (!userId) {
    return new NextResponse("Unauthenticated", { status: 403 });
  }
  if (published === null) {
    return new NextResponse("Published is not defined", { status: 400 });
  }
  if (!courseId) {
    return new NextResponse("Course Id is required", { status: 403 });
  }
  if (!chapterId) {
    return new NextResponse("Course Id is required", { status: 403 });
  }

  try {
    const updatedPublish = await prismadb.chapter.update({
      where: {
        id: chapterId,
      },
      data: {
        published,
      },
    });

    return NextResponse.json(updatedPublish);
  } catch (error) {
    console.log("[CHAPTER_PUBLISH_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
