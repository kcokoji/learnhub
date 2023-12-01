import { NextResponse } from "next/server";
import prismadb from "@/lib/prismaDB";
import { auth } from "@clerk/nextjs";

export async function DELETE(req, { params }) {
  const { courseId, chapterId } = params;
  const { userId } = auth();

  if (!userId) {
    return new NextResponse("Unauthenticated", { status: 403 });
  }
  if (!courseId) {
    return new NextResponse("Course Id is required", { status: 403 });
  }
  if (!chapterId) {
    return new NextResponse("Chapter Id is required", { status: 403 });
  }

  try {
    const deleteChapter = await prismadb.chapter.delete({
      where: {
        id: chapterId,
      },
    });

    return NextResponse.json(deleteChapter);
  } catch (error) {
    console.log("[CHAPTER_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
