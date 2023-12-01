import { NextResponse } from "next/server";
import prismadb from "@/lib/prismaDB";
import { auth } from "@clerk/nextjs";

export async function PATCH(req, { params }) {
  const body = await req.json();
  const { courseId } = params;
  const [{ url }] = body;
  const { userId } = auth();

  if (!userId) {
    return new NextResponse("Unauthenticated", { status: 403 });
  }
  if (!url) {
    return new NextResponse("Image Url is Required", { status: 400 });
  }
  if (!courseId) {
    return new NextResponse("Course Id is required", { status: 403 });
  }

  try {
    const updatedImageUrl = await prismadb.course.update({
      where: {
        id: courseId,
      },
      data: {
        imageUrl: url,
      },
    });

    return NextResponse.json(updatedImageUrl);
  } catch (error) {
    console.log("[COURSE_IMAGE_URL_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
