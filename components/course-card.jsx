import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { LibraryBig } from "lucide-react";

import { formatter } from "@/lib/utils";
import userProgress from "@/actions/get-progress";

import Link from "next/link";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";

import prismadb from "@/lib/prismaDB";
import { auth } from "@clerk/nextjs";
import getTransactionByCourse from "@/actions/get-course-transaction";

export default async function CourseCard({ data }) {
  const numberOfChapters = data.chapters.length;
  const { userId } = await auth();
  const formattedPrice = formatter.format(data.price);
  const courseId = data.id;
  const progress = await userProgress(courseId);

  const transaction = await getTransactionByCourse(courseId, userId);

  return (
    <Card className="w-full shadow-xl transform transition-transform hover:scale-95">
      <Link href={`/course/${data.id}`}>
        <div className=" rounded-t-md overflow-hidden bg-muted-foreground/60">
          <AspectRatio ratio={2 / 1}>
            <Image
              src={data.imageUrl}
              alt="Course Image"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
          </AspectRatio>
        </div>
        <CardHeader className="pb-2">
          <CardTitle className="line-clamp-1">{data.title}</CardTitle>
          <CardDescription className="flex items-center">
            <LibraryBig className="h-5 w-5 mr-2 text-primary" />{" "}
            {numberOfChapters} Chapters
          </CardDescription>
        </CardHeader>
        <CardContent>
          {transaction ? (
            <div className="space-y-2">
              {" "}
              <Progress value={progress} className="w-full" />
              <div className="flex justify-between">
                <h1 className="text-base">{progress}% Complete</h1>{" "}
                {progress === 100 ? (
                  <Badge className=" bg-[#52b788] dark:bg-[#40916c] hover:bg-[#52b788]">
                    Completed
                  </Badge>
                ) : (
                  <Badge variant="secondary">In progress</Badge>
                )}
              </div>
            </div>
          ) : (
            <h2 className=" text-xl md:text-xl">{formattedPrice}</h2>
          )}
        </CardContent>
      </Link>
    </Card>
  );
}
