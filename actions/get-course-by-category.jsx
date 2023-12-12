import prismadb from "@/lib/prismaDB";

export default async function getCourseByCategory(categoryTitle) {
  try {
    const getCourse = await prismadb.course.findMany({
      where: {
        categoryTitle,
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
