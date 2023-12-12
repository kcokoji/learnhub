import prismadb from "@/lib/prismaDB";
import { auth } from "@clerk/nextjs";

export default async function userProgress(courseId) {
  const { userId } = auth();
  if (!userId) {
    return null;
  }
  try {
    const publishedChapters = await prismadb.chapter.findMany({
      where: {
        courseId,
        published: true,
      },
      select: {
        id: true,
      },
    });

    const publishedChapterIds = publishedChapters.map((chapter) => chapter.id);

    const validCompletedChapters = await prismadb.userProgress.count({
      where: {
        userId,
        chapterId: {
          in: publishedChapterIds,
        },
        isCompleted: true,
      },
    });

    const progressPercentage = Math.round(
      (validCompletedChapters / publishedChapterIds.length) * 100
    );

    return progressPercentage;
  } catch (error) {
    console.log("[GET_PROGRESS]", error);
    return 0;
  }
}
