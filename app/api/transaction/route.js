import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismaDB";

export async function POST(req) {
  const { userId } = auth();
  try {
    const body = await req.json();

    const { email, courseId, reference } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    if (!email || !courseId || !reference) {
      return new NextResponse("Missing Fields", { status: 400 });
    }

    const courseTransaction = await prismadb.transaction.create({
      data: {
        userId,
        email,
        courseId,
        reference,
      },
    });

    return NextResponse.json(courseTransaction);
  } catch (error) {
    console.log("COURSE_TRANSACTION_ERR", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
