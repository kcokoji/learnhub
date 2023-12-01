import { NextResponse } from "next/server";
import prismadb from "@/lib/prismaDB";
import { auth } from "@clerk/nextjs";

export async function PATCH(req, { params }) {
  const { courseId, chapterId } = params;
  const body = await req.json();
  const { description } = body;
  const { userId } = auth();

  if (!userId) {
    return new NextResponse("Unauthenticated", { status: 403 });
  }
  if (!description) {
    return new NextResponse("Description is required", { status: 400 });
  }
  if (!courseId) {
    return new NextResponse("Course Id is required", { status: 403 });
  }
  if (!chapterId) {
    return new NextResponse("Chapter Id is required", { status: 403 });
  }

  try {
    const updatedDescription = await prismadb.chapter.update({
      where: {
        id: chapterId,
      },
      data: {
        description,
      },
    });

    return NextResponse.json(updatedDescription);
  } catch (error) {
    console.log("[CHAPTER_DESCRIPTION_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
