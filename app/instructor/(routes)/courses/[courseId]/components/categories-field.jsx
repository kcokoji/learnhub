"use client";

import { Categories } from "@/lib/categories";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import AnimateLoader from "@/components/ui/loader";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  FormField,
  Form,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

const formSchema = z.object({
  categoryTitle: z.string().min(1),
});

export function CategoriesField({ value, title }) {
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const params = useParams();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryTitle: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      await axios.patch(`/api/courses/${params.courseId}/category`, data);
      router.refresh();
      toast.success("Category Updated");
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
        <h1 className="text-base font-semibold  tracking-tight">
          Course Category
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
                <Pencil className="h-4 w-4 mr-2" />
                <h1 className="text-sm tracking-tight cursor-pointer">Edit</h1>
              </>
            )}
          </Button>
        </div>
      </div>
      {editing ? (
        <div className="">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="categoryTitle"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      disabled={loading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={field.value}
                            placeholder="Select a category"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Categories.map((category) => (
                          <SelectItem key={category.id} value={category.title}>
                            {category.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
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
}
