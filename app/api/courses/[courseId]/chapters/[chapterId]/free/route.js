import { NextResponse } from "next/server";
import prismadb from "@/lib/prismaDB";
import { auth } from "@clerk/nextjs";

export async function PATCH(res, { params }) {
  const { courseId, chapterId } = params;

  const body = await res.json();
  const { free } = body;

  const { userId } = auth();

  if (!userId) {
    return new NextResponse("Unauthenticated", { status: 403 });
  }
  if (free === null) {
    return new NextResponse("Accessiblity is required", { status: 400 });
  }
  if (!chapterId) {
    return new NextResponse("Chapter Id is required", { status: 403 });
  }
  if (!courseId) {
    return new NextResponse("Course Id is required", { status: 403 });
  }

  try {
    const updatedFree = await prismadb.chapter.update({
      where: {
        id: chapterId,
      },
      data: {
        free,
      },
    });

    return NextResponse.json(updatedFree);
  } catch (error) {
    console.log("[CHAPTER_FREE_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
