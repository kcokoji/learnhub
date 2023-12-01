import React from "react";
import { Categories } from "@/lib/categories";
import getCourseByCategory from "@/actions/get-course-by-category";
import Heading from "@/components/Heading";
import NotFound from "@/app/not-found";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export async function generateMetadata({ params: { categorytitle } }) {
  const categoryTitle = decodeURIComponent(categorytitle);
  const category = Categories.find(
    (category) => category.title === categoryTitle
  );
  if (!category) {
    return {
      title: "Category not Found",
    };
  }

  return {
    title: category.title,
    description: category.description,
  };
}

export default async function CategoryPage({ params: { categorytitle } }) {
  const categoryTitle = decodeURIComponent(categorytitle);
  const courses = await getCourseByCategory(categoryTitle);
  const category = Categories.find(
    (category) => category.title === categoryTitle
  );

  if (!category) return NotFound();

  return (
    <div className="space-y-6 p-4">
      <div
        className="flex justify-center items-center text-center bg-center relative aspect-video md:aspect-[2.6/1] overflow-hidden bg-cover rounded-md shadow-xl"
        style={{ backgroundImage: `url(${category.imageUrl})` }}
      >
        {/* Dimmed overlay */}
        <div className="backdrop backdrop-brightness-50   absolute inset-0"></div>
        <div className="flex justify-center items-center text-center max-w-3xl rounded-xl relative z-10">
          <Heading title={category.title} className="lg:text-5xl text-white" />
        </div>
      </div>
      <div className="mx-auto space-y-4">
        <Heading
          title="Explore our range of courses"
          className="text-xl md:text-3xl font-medium text-center"
        />
        <div className="flex justify-end">
          <Select>
            <SelectTrigger className="w-fit">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="apple">Latest</SelectItem>
                <SelectItem value="banana">Oldest</SelectItem>
                <SelectItem value="blueberry">Price</SelectItem>
                <SelectItem value="grapes">Rating</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return Categories.map((category) => ({
    categoryId: category.id.toString(),
  }));
}
