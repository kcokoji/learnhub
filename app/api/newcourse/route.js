import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismaDB";

export async function POST(req) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { title } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }
    if (!title) {
      return new NextResponse("Title is required", { status: 400 });
    }

    const course = await prismadb.course.create({
      data: {
        userId,
        title,
      },
    });

    return NextResponse.json(course);
  } catch (error) {
    console.log("NEW_COURSE_TITLE_ERR", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
