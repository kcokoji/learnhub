import getCourse from "@/actions/get-course";
import { redirect } from "next/navigation";

export default async function ChaptersPage({ params: { courseId } }) {
  const course = await getCourse(courseId);

  if (!course) {
    redirect("/");
  }

  return redirect(`/course/${courseId}/chapters/${course.chapters[0].id}`);
}
