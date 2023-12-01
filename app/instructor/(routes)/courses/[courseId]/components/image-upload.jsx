"use client";

import { UploadDropzone } from "@uploadthing/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ImageIcon, PlusCircle } from "lucide-react";
import { toast } from "sonner";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import "@uploadthing/react/styles.css";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function ImageUpload({ url }) {
  const [editing, setEditing] = useState(false);

  const router = useRouter();
  const params = useParams();
  return (
    <main className="rounded-md bg-secondary p-5 w-full space-y-2 ">
      <div className="flex justify-between">
        <h1 className="text-base font-semibold  tracking-tight">
          Course Image
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
                  Add an image
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
            content={{
              allowedContent({ isUploading }) {
                if (isUploading) return "Seems like stuff is uploading";
                return `Max Image Size (2MB)`;
              },
            }}
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              axios.patch(`/api/courses/${params.courseId}/imageUpload`, res);
              router.refresh();
              setEditing(false);
              toast.success("Course Image Updated");
            }}
            onUploadError={() => {
              setEditing(false);
              toast.error("Something went wrong");
            }}
          />
          <p className="text-muted-foreground/80 text-xs">
            16:9 aspect ratio recommended
          </p>
        </>
      ) : (
        <>
          {url ? (
            <>
              <div className=" rounded-md overflow-hidden bg-muted-foreground/60">
                <AspectRatio ratio={16 / 9}>
                  <Image
                    src={url}
                    alt="Course Image"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                </AspectRatio>
              </div>
              <p className="text-muted-foreground/80 text-xs">
                Image could take time to load please refresh to view uploaded
                image
              </p>
            </>
          ) : (
            <>
              <div className=" flex justify-center items-center w-auto h-[250px] rounded-md overflow-hidden bg-muted-foreground/60">
                <ImageIcon className="h-10 w-10 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground/80 text-xs">
                Image could take time to load please refresh to view uploaded
                image
              </p>
            </>
          )}
        </>
      )}
    </main>
  );
}
