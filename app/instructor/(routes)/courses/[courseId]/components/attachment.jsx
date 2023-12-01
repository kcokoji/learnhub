"use client";

import { UploadDropzone } from "@uploadthing/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { toast } from "sonner";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import axios from "axios";

export default function AttachmentUploader({ url }) {
  const [editing, setEditing] = useState(false);

  const router = useRouter();
  const params = useParams();
  return (
    <main className="rounded-md bg-secondary p-5 w-full space-y-2 ">
      <div className="flex justify-between">
        <h1 className="text-base font-semibold  tracking-tight">
          Course Attachment
        </h1>
        <div className="">
          <Button
            variant="link"
            size="small"
            onClick={() => setEditing(!editing)}
          >
            {editing ? (
              <>
                <h1 className="text-sm tracking-tight cursor-pointer">
                  Cancel
                </h1>
              </>
            ) : (
              <>
                <PlusCircle className="h-4 w-4 mr-2" />
                <h1 className="text-sm tracking-tight cursor-pointer">
                  Add a file
                </h1>
              </>
            )}
          </Button>
        </div>
      </div>
      {editing ? (
        <>
          <UploadDropzone
            className="ut-button:bg-primary ut-label:text-primary border-muted-foreground/70 ut-label:hover:text-primary"
            endpoint="pdfUploader"
            onClientUploadComplete={(res) => {
              axios.patch(
                `/api/courses/${params.courseId}/attachmentUpload`,
                res
              );
              router.refresh();
              setEditing(false);
              toast.success("Resources Updated");
            }}
            onUploadError={() => {
              setEditing(false);
              toast.error("Something went wrong");
            }}
          />
        </>
      ) : (
        <>
          {url ? (
            <>
              <Button asChild>
                <Link href={url} target="blank">
                  View Pdf
                </Link>
              </Button>
              <p className="text-muted-foreground/80 text-xs">
                Please refresh .Files may take longer to upload
              </p>
            </>
          ) : (
            <p className="text-muted-foreground/80 text-sm italic">
              No attachments yet
            </p>
          )}
        </>
      )}
    </main>
  );
}
