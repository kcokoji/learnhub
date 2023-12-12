import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatter } from "@/lib/utils";
import CourseHeading from "../../courses/[courseId]/components/courseHeading";
import Heading from "@/components/Heading";

export const DataCard = ({ value, label, shouldFormat }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>
          <Heading title={label} />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl">
          {shouldFormat ? formatter.format(value) : value}
        </div>
      </CardContent>
    </Card>
  );
};
