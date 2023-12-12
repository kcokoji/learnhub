import prismadb from "@/lib/prismaDB";

export default async function getCourse(id) {
  try {
    const getCourse = await prismadb.course.findFirst({
      where: {
        id,
        published: true,
      },
      include: {
        chapters: {
          where: {
            published: true,
          },
        },
      },
    });

    return getCourse;
  } catch (err) {
    return null;
  }
}
