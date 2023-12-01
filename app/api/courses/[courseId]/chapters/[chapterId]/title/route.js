import { NextResponse } from "next/server";
import prismadb from "@/lib/prismaDB";
import { auth } from "@clerk/nextjs";

export async function PATCH(res, { params }) {
  const { courseId, chapterId } = params;

  const body = await res.json();
  const { title } = body;
  const { userId } = auth();

  if (!userId) {
    return new NextResponse("Unauthenticated", { status: 403 });
  }
  if (!title) {
    return new NextResponse("Title is required", { status: 400 });
  }
  if (!chapterId) {
    return new NextResponse("Chapter Id is required", { status: 403 });
  }
  if (!courseId) {
    return new NextResponse("Course Id is required", { status: 403 });
  }

  try {
    const updatedTitle = await prismadb.chapter.update({
      where: {
        id: chapterId,
      },
      data: {
        title,
      },
    });

    return NextResponse.json(updatedTitle);
  } catch (error) {
    console.log("[CHAPTER _TITLE_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
