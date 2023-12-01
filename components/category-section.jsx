import { Categories } from "@/lib/categories";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";

export default function CategorySection() {
  return (
    <div className="mx-auto py-[60px] lg:px-10 px-6 ">
      <h1 className="text-center text-3xl lg:4xl font-bold pb-4">
        Our Categories
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {Categories.map((category) => (
          <div
            key={category.id}
            className="  rounded-md hover:bg-secondary  hover:shadow-md transform hover:scale-105 border transition duration-300"
          >
            <Link
              href={`/categories/${category.title}`}
              className="text-xl font-bold mb-4 text-secondary-foreground flex items-center justify-center flex-col"
            >
              <Image
                src={category.svgUrl}
                height={100}
                width={100}
                alt={category.title}
                className="rounded-full"
              />
              {category.title}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
