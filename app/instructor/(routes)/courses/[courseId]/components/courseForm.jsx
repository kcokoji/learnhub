"use client";

import { Button } from "@/components/ui/button";
import {
  CircleDollarSign,
  File,
  LayoutDashboard,
  ListChecks,
  TrashIcon,
} from "lucide-react";
import CourseHeading from "./courseHeading";
import Heading from "@/components/Heading";

import { CategoriesField } from "./categories-field";
import TitleField from "./title-field";
import DescriptionField from "./description-field";
import PriceField from "./price-field";
import ChapterField from "./chapters-field";
import ImageUpload from "./image-upload";
import AttachmentUploader from "./attachment";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import Loader from "@/components/ui/loader";
import { useParams, useRouter } from "next/navigation";
import Confetti from "react-confetti";
import AlertModal from "@/components/modals/alert-modal";

export default function CourseForm({ data }) {
  const [showConfetti, setShowConfetti] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const params = useParams();
  const router = useRouter();

  const {
    title,
    description,
    price,
    chapters,
    published,
    categoryTitle,
    attachments,
    imageUrl,
  } = data;

  const fields = [title, description, price, chapters, categoryTitle, imageUrl];
  const numerator = fields.filter(
    (item) => item !== null && !isEmptyArray(item)
  ).length;

  const denominator = fields.length;

  function isEmptyArray(item) {
    return Array.isArray(item) && item.length === 0;
  }

  const isAnyChapterPublished = data.chapters.some(
    (chapter) => chapter.published
  );

  const onPublish = async () => {
    if (
      numerator !== denominator ||
      fields.some((item) => item === null || isEmptyArray(item))
    ) {
      toast.error("Please fill out all the fields");
      throw Error("Please fill out all the fields");
    }

    try {
      setLoading(true);
      await axios.patch(`/api/courses/${params.courseId}/published`, {
        published: true,
      });
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
      router.refresh();
      toast.success("Congratulations your course has been published!");
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
      await axios.patch(`/api/courses/${params.courseId}/published`, {
        published: false,
      });
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
      await axios.delete(`/api/courses/${params.courseId}`);
      router.push("/instructor/courses");
      toast.success("Course Deleted");
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-4 lg:px-10 space-y-4 px-6">
      {showConfetti && <Confetti />}
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex justify-between space-y-2">
        <Heading
          title="Course Setup"
          description={`Complete all fields (${numerator}/${denominator})`}
        />
        <div className="flex gap-2">
          {published ? (
            <Button onClick={UnPublish} disabled={loading}>
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
                fields.some((item) => item === null || isEmptyArray(item)) ||
                !isAnyChapterPublished ||
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
            disabled={loading || published}
            onClick={() => setOpen(true)}
          >
            <TrashIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4  mt-8">
        <div className="flex flex-col gap-y-4">
          <div className="flex items-center">
            <div className="mr-2 p-2 bg-primary/20 rounded-full">
              <LayoutDashboard className="h-6 w-6 text-primary" />
            </div>
            <CourseHeading title="Customize your course" />
          </div>
          <TitleField title="Course Title" value={title} />
          <DescriptionField title="Course Description" value={description} />
          <CategoriesField value={categoryTitle} title="Course Category" />
          <ImageUpload url={imageUrl} />
        </div>
        <div className="flex  flex-col gap-y-4">
          <div className="flex items-center">
            <div className="mr-2 p-2 bg-primary/20 rounded-full">
              <ListChecks className="h-6 w-6 text-primary" />
            </div>
            <CourseHeading title="Course Chapters" />
          </div>
          <ChapterField title="Course Chapters" value={chapters} />
          <div className="flex items-center">
            <div className="mr-2 p-2 bg-primary/20 rounded-full">
              <CircleDollarSign className="h-6 w-6 text-primary" />
            </div>
            <CourseHeading title="Sell your course" />
          </div>
          <PriceField title="Course Price" value={price} />
          <div className="flex items-center">
            <div className="mr-2 p-2 bg-primary/20 rounded-full">
              <File className="h-6 w-6 text-primary" />
            </div>
            <CourseHeading title="Resources and Attachments" />
          </div>
          <AttachmentUploader url={attachments} />
        </div>
      </div>
    </div>
  );
}
