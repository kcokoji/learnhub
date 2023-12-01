"use client";

import Loader from "@/components/ui/loader";
import { useState } from "react";
import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Eye, LayoutDashboard, MoveLeft, TrashIcon, Video } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import CourseHeading from "../../components/courseHeading";
import TitleField from "./title-field";
import DescriptionField from "./description";
import FreeField from "./free-field";
import VideoUpload from "./video-upload";
import { toast } from "sonner";
import axios from "axios";
import AlertModal from "@/components/modals/alert-modal";

export default function ChapterForm({ data }) {
  const [loading, setLoading] = useState(false);
  const { title, description, videoUrl, published, free, muxData } = data;
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState(false);

  const fields = [title, description, videoUrl];
  const numerator = fields.filter((item) => item !== null).length;

  const denominator = fields.length;

  const onPublish = async () => {
    if (numerator !== denominator || fields.some((item) => item === null)) {
      toast.error("Please fill out all the fields");
      throw Error("Please fill out all the fields");
    }

    try {
      setLoading(true);
      await axios.patch(
        `/api/courses/${params.courseId}/chapters/${params.chapterId}/published`,
        {
          published: true,
        }
      );
      router.refresh();
      toast.success("Chapter Updated");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
  const UnPublish = async () => {
    try {
      setLoading(true);
      await axios.patch(
        `/api/courses/${params.courseId}/chapters/${params.chapterId}/published`,
        {
          published: false,
        }
      );
      router.refresh();
      toast.success("Course Updated");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `/api/courses/${params.courseId}/chapters/${params.chapterId}`
      );
      router.push(`/instructor/courses/${params.courseId}`);
      toast.success("Course Deleted");
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" py-4 lg:px-10 space-y-4 px-6">
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <Button variant="link" onClick={() => router.back()}>
        <MoveLeft className="h-4 w-4 mr-2" /> Back to course setup
      </Button>
      <div className="flex justify-between space-y-2">
        <Heading
          title="Chapter Creation"
          description={`Complete all fields (${numerator}/${denominator})`}
        />
        <div className="flex gap-2">
          {published ? (
            <Button onClick={UnPublish}>
              {loading ? (
                <Loader size={24} color="white" />
              ) : (
                <h1>Unpublish</h1>
              )}
            </Button>
          ) : (
            <Button
              variant="secondary"
              disabled={
                numerator !== denominator ||
                fields.some((item) => item === null) ||
                loading
              }
              onClick={onPublish}
            >
              {loading ? (
                <Loader size={24} color="#f97316" />
              ) : (
                <h1>Publish</h1>
              )}
            </Button>
          )}
          <Button
            size="icon"
            variant="destructive"
            disabled={published || loading}
            onClick={() => setOpen(true)}
          >
            <TrashIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 pt-8">
        <div className="flex flex-col gap-y-4">
          <div className="flex items-center">
            <div className="mr-2 p-2 bg-primary/20 rounded-full">
              <LayoutDashboard className="h-6 w-6 text-primary" />
            </div>
            <CourseHeading title="Customize your " />
          </div>
          <TitleField title="Chapter Title" value={title} />
          <DescriptionField title="Chapter Description" value={description} />

          <div className="flex items-center">
            <div className="mr-2 p-2 bg-primary/20 rounded-full">
              <Eye className="h-6 w-6 text-primary" />
            </div>
            <CourseHeading title="Access Settings" />
          </div>
          <FreeField title="Free preview chapter" value={free} />
        </div>
        <div className="flex  flex-col gap-y-4">
          <div className="flex items-center">
            <div className="mr-2 p-2 bg-primary/20 rounded-full">
              <Video className="h-6 w-6 text-primary" />
            </div>
            <CourseHeading title="Add a video" />
          </div>
          <VideoUpload url={videoUrl} muxData={muxData} />
        </div>
      </div>
    </div>
  );
}
