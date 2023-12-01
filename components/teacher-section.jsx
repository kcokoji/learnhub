import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Teacher() {
  return (
    <div className="grid grid-col-1 lg:grid-cols-2 lg:flex-row mx-auto py-[60px] lg:px-10 px-6 gap-3">
      <div>
        <Image
          src="/img/teacher-svg.svg"
          width={400}
          height={400}
          alt="teacher"
          className="w-auto h-auto"
        />
      </div>
      <div className="space-y-4 lg:py-16">
        <h1 className="text-start text-3xl lg:4xl font-bold">
          Become an instructor
        </h1>
        <p className="text-lg leading-6 text-muted-foreground">
          Instructors from around the world teach millions of learners on
          LearnHub. We provide the tools and skills to teach what you love.
        </p>
        <Button className="text-xl" size="lg" asChild>
          <Link href="/instructor">Start teaching today</Link>
        </Button>
      </div>
    </div>
  );
}
