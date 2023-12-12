import { NextResponse } from "next/server";
import prismadb from "@/lib/prismaDB";
import { auth } from "@clerk/nextjs";

export async function PATCH(res, { params }) {
  const { courseId, chapterId } = params;

  const body = await res.json();
  const { isCompleted } = body;

  const { userId } = auth();

  if (!userId) {
    return new NextResponse("Unauthenticated", { status: 403 });
  }
  if (isCompleted == null) {
    return new NextResponse("Progress required", { status: 400 });
  }
  if (!chapterId) {
    return new NextResponse("Chapter Id is required", { status: 403 });
  }
  if (!courseId) {
    return new NextResponse("Course Id is required", { status: 403 });
  }

  try {
    const userProgress = await prismadb.userProgress.upsert({
      where: {
        userId_chapterId: {
          userId,
          chapterId,
        },
      },
      update: {
        isCompleted,
      },
      create: {
        userId,
        chapterId,
        isCompleted,
      },
    });
    return NextResponse.json(userProgress);
  } catch (error) {
    console.log("[User_Progress_Error]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
