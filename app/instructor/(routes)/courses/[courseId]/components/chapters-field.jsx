"use client";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GripVertical, Pencil, PlusCircle } from "lucide-react";
import Loader from "@/components/ui/loader";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import axios from "axios";

import {
  FormField,
  Form,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useParams, useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

const formSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title must be at least 1 character long" }),
});

const ChapterField = ({ title, value }) => {
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useParams();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      await axios.post(`/api/courses/${params.courseId}/chapters/new`, data);
      router.refresh();
      toast.success("Chapter Created");
      form.reset({
        title: "",
      });
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
      setEditing(false);
    }
  };

  return (
    <div className="rounded-md bg-secondary p-5 w-full space-y-2">
      <div className="flex justify-between">
        <h1 className="text-base font-semibold tracking-tight">{title}</h1>
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
                  Add a chapter
                </h1>
              </>
            )}
          </Button>
        </div>
      </div>
      {editing ? (
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormControl>
                        <Input
                          disabled={loading}
                          {...field}
                          placeholder="e.g Introduction to Web development"
                          className="w-full"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <div className="flex gap-x-2">
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <Loader size={24} color="white" />
                  ) : (
                    <h1>Create</h1>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      ) : (
        <ScrollArea className=" h-60 space-y-2">
          <div className="space-y-2">
            {value && value.length > 0 ? (
              value.map((chapter) => (
                <div
                  key={chapter.id}
                  className="bg-muted-foreground/20 rounded-md px-2  flex justify-between items-center "
                >
                  <div className="flex">
                    <GripVertical className="h-4 w-4 mr-2" />
                    <p className="text-sm">{chapter.title}</p>
                  </div>
                  <div className="flex justify-center items-center">
                    {!chapter.published ? (
                      <Badge variant="secondary">Draft</Badge>
                    ) : (
                      <Badge>Published</Badge>
                    )}
                    <Button
                      variant="link"
                      onClick={() =>
                        router.push(
                          `/instructor/courses/${params.courseId}/${chapter.id}`
                        )
                      }
                      className="p-2"
                    >
                      <Pencil className="h-4 w-4 mr-2" />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <h1 className="text-muted-foreground italic text-sm">
                No {title.toLowerCase()}
              </h1>
            )}
          </div>
        </ScrollArea>
      )}
    </div>
  );
};

export default ChapterField;
