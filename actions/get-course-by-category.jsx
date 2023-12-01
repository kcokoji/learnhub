import prismadb from "@/lib/prismaDB";

export default async function getCourseByCategory(categoryTitle) {
  const getCourse = await prismadb.course.findMany({
    where: {
      categoryTitle,
      published: true,
    },
  });

  return getCourse;
}
