import Navbar from "../components/navbar";
import getChapters from "@/actions/get-chapters-by-courseId";
import getTransactionByCourse from "@/actions/get-course-transaction";
import { auth } from "@clerk/nextjs";

export default async function InstructorLayout({
  children,
  params: { courseId },
}) {
  const { userId } = auth();
  const transaction = await getTransactionByCourse(courseId, userId);
  const chapters = await getChapters(courseId);
  return (
    <>
      <div className="lg:flex-row lg:h-screen lg:flex">
        <Navbar data={chapters} transaction={transaction} />
        <section className="lg:flex-1 overflow-y-auto">{children}</section>
      </div>
    </>
  );
}
