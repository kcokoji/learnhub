import Heading from "@/components/Heading";
import { currentUser } from "@clerk/nextjs";

import getChapter from "@/actions/get-chapter";
import { AlertTriangle, LockIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import getCourse from "@/actions/get-course";
import { Alert, AlertDescription } from "@/components/ui/alert";
import getTransactionByCourse from "@/actions/get-course-transaction";
import Chapter from "../components/chapter";
import prismadb from "@/lib/prismaDB";

export default async function ChaptersPage({
  params: { courseId, chapterId },
}) {
  const data = await getChapter(chapterId);
  const course = await getCourse(courseId);
  const user = await currentUser();
  const userId = user?.id;
  const userEmail = user?.emailAddresses[0]?.emailAddress;
  const transaction = await getTransactionByCourse(courseId, userId);
  const chapterProgress = async () => {
    const progress = await prismadb.userProgress.findFirst({
      where: {
        userId,
        chapterId,
      },
    });
    if (progress) {
      return progress.isCompleted;
    }
  };
  const progress = await chapterProgress();

  return (
    <div>
      <div className="flex justify-center items-center p-2">
        <Heading title={course.title} />
      </div>
      {!data.free && !transaction && (
        <Alert>
          <AlertDescription className="flex justify-center items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-destructive" />
            Enroll now to access this course and its resources
          </AlertDescription>
        </Alert>
      )}
      <Separator />
      <Chapter
        data={data}
        Id={userId}
        email={userEmail}
        price={course.price}
        courseId={course.id}
        transaction={transaction}
        progress={progress}
      />
    </div>
  );
}
