"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";

import {
  FormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Heading from "@/components/Heading";
import Loader from "@/components/ui/loader";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const formSchema = z.object({
  title: z.string().min(1),
});

export default function NewCoursePage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/newcourse", values);
      router.refresh();
      toast.success("Course Created");
      router.push(`/instructor/courses/${response.data.id}`);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div>
        <Heading
          title="Course Title"
          description="What would you like to name your course, Don't worry you can always change this later."
        />
        <div>
          <div className="space-y-4 py-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            disabled={loading}
                            placeholder="e.g Web Development"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          What would you like to teach in this course?
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                  <Button
                    variant="outline"
                    disabled={loading}
                    onClick={() => router.push("/instructor/courses")}
                  >
                    <h1>Cancel</h1>
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <Loader size={24} color="white" />
                    ) : (
                      <h1>Continue</h1>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
