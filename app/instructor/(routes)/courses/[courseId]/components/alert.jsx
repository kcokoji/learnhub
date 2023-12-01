import { AlertTriangleIcon } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function PublishedAlert() {
  return (
    <Alert>
      <AlertDescription>
        <div className="flex justify-center items-center">
          <AlertTriangleIcon className="h-4 w-4 mr-2" color="red" /> Warning!
          This course is unpublished.It will not be visible to students.
        </div>
      </AlertDescription>
    </Alert>
  );
}
