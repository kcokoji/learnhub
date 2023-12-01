import { NextResponse } from "next/server";
import prismadb from "@/lib/prismaDB";
import { auth } from "@clerk/nextjs";
import Mux from "@mux/mux-node";

const { Video } = new Mux(process.env.MUX_TOKEN_ID, process.env.MUX_SECRET_KEY);

export async function PATCH(req, { params }) {
  const { courseId, chapterId } = params;
  const body = await req.json();

  const [{ url }] = body;
  const { userId } = auth();

  if (!userId) {
    return new NextResponse("Unauthenticated", { status: 403 });
  }
  if (!url) {
    return new NextResponse("Video Url is Required", { status: 400 });
  }
  if (!courseId) {
    return new NextResponse("Course Id is required", { status: 403 });
  }
  if (!chapterId) {
    return new NextResponse("Chapter Id is required", { status: 403 });
  }

  try {
    const updatedChapter = await prismadb.chapter.update({
      where: {
        id: chapterId,
      },
      data: {
        videoUrl: url,
      },
    });

    if (url) {
      const existingMuxData = await prismadb.muxData.findFirst({
        where: {
          chapterId,
        },
      });
      if (existingMuxData) {
        await Video.Assets.del(existingMuxData.assetId);
        await prismadb.muxData.delete({
          where: {
            id: existingMuxData,
          },
        });
      }
      const asset = await Video.Assets.create({
        input: url,
        playback_policy: "public",
        test: false,
      });
      await prismadb.muxData.create({
        data: {
          chapterId,
          assetId: asset.id,
          playbackId: asset.playback_ids?.[0]?.id,
        },
      });
    }

    return NextResponse.json(updatedChapter);
  } catch (error) {
    console.log("[CHAPTER_VIDEO_URL_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
