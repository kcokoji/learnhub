import userProgress from "@/actions/get-progress";
import { Badge } from "./badge";
import { Progress } from "./progress";

export default async function CourseProgress(courseId) {
  const progress = userProgress(courseId);

  return (
    <div className="space-y-2">
      <Progress value={progress} className="w-full" />
      <div className="flex justify-between">
        <h1>{progress}% Complete</h1>{" "}
        <Badge className=" bg-[#52b788] dark:bg-[#40916c] hover:bg-[#52b788]">
          Completed
        </Badge>
      </div>
    </div>
  );
}
