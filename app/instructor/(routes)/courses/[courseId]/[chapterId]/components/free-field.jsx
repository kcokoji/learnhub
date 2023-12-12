"use client";

import { Checkbox } from "@/components/ui/checkbox";
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
  FormDescription,
} from "@/components/ui/form";
import { useParams, useRouter } from "next/navigation";

const formSchema = z.object({
  free: z.boolean().default(false),
});

const FreeField = ({ title, value }) => {
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useParams();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      free: value,
    },
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      await axios.patch(
        `/api/courses/${params.courseId}/chapters/${params.chapterId}/free`,
        data
      );
      router.refresh();
      toast.success("Accessiblity Updated");
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
                name="free"
                render={({ field }) => {
                  return (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormDescription>
                          Check this box if you want to make this chapter free
                          for preview
                        </FormDescription>
                      </div>
                    </FormItem>
                  );
                }}
              />
              <div className="flex gap-x-2">
                <Button type="submit" disabled={loading}>
                  {loading ? <AnimateLoader size={24} color="white" /> : <h1>Save</h1>}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      ) : (
        <div>
          {value ? (
            <h1 className="text-sm font-medium tracking-tight">
              This chapter is free for preview
            </h1>
          ) : (
            <h1 className="text-muted-foreground italic text-sm">
              This chapter is not free
            </h1>
          )}
        </div>
      )}
    </div>
  );
};

export default FreeField;
