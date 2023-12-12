import prismadb from "@/lib/prismaDB";

export default async function getChapters(courseId) {
  try {
    const getChapters = await prismadb.chapter.findMany({
      where: {
        courseId,
        published: true,
      },
    });

    return getChapters;
  } catch (err) {
    return null;
  }
}
