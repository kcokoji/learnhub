import prismadb from "@/lib/prismaDB";
import CourseForm from "./components/courseForm";
import { PublishedAlert } from "./components/alert";

export default async function page({ params }) {
  const course = await prismadb.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapters: true,
    },
  });
  const { published } = course;

  return (
    <div>
      {!published ? <PublishedAlert /> : null}
      <CourseForm data={course} courseId={params.courseId} />
    </div>
  );
}
