import prismadb from "@/lib/prismaDB";

export default async function getChapter(id) {
  try {
    const getChapter = await prismadb.chapter.findUnique({
      where: {
        id,
        published: true,
      },
    });

    return getChapter;
  } catch (err) {
    return null;
  }
}
