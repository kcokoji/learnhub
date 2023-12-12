"use client";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import AnimateLoader from "@/components/ui/loader";
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

const formSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title must be at least 1 character long" })
    .max(60, { message: "Title cannot exceed 60 characters" }),
});

const TitleField = ({ title, value }) => {
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

      await axios.patch(`/api/courses/${params.courseId}/title`, data);
      router.refresh();
      form.reset({
        title: "",
      });
      toast.success("Title Updated");
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
      setEditing(false);
    }
  };

  return (
    <div className="rounded-md bg-secondary p-5 w-full space-y-2 ">
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
                <Pencil className="h-4 w-4 mr-2" />
                <h1 className="text-sm tracking-tight cursor-pointer">Edit</h1>
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
                    <AnimateLoader size={24} color="white" />
                  ) : (
                    <h1>Save</h1>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      ) : (
        <div>
          {value ? (
            <h1 className="text-sm font-medium tracking-tight">{value}</h1>
          ) : (
            <h1 className="text-muted-foreground italic text-sm">
              No {title.toLowerCase()}
            </h1>
          )}
        </div>
      )}
    </div>
  );
};

export default TitleField;
