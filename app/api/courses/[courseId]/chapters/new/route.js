import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismaDB";

export async function POST(req, { params }) {
  try {
    const { courseId } = params;
    const { userId } = auth();

    const body = await req.json();

    const { title } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }
    if (!title) {
      return new NextResponse("Title is required", { status: 400 });
    }

    const chapter = await prismadb.chapter.create({
      data: {
        courseId,
        title,
      },
    });

    return NextResponse.json(chapter);
  } catch (error) {
    console.log("[NEW_CHAPTER_ERR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
