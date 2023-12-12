import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { TabletSmartphone, BarChart3, UserCircle, Video } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Link from "next/link";
import prismadb from "@/lib/prismaDB";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

const features = [
  {
    name: "User-Friendly Interface:",
    description:
      "Our intuitive interface makes course creation a breeze. Whether you're a tech-savvy educator or just getting started, We provide a seamless and user-friendly experience. Spend less time navigating the platform and more time focusing on what matters most—teaching.",
    icon: UserCircle,
  },
  {
    name: "Versatile Content Creation:",
    description:
      "We supports a wide range of multimedia content, from videos and presentations to quizzes and interactive assignments. Tailor your course content to suit diverse learning styles and keep your students engaged throughout their learning journey.",
    icon: Video,
  },
  {
    name: "Comprehensive Analytics:",
    description:
      "Track student progress and engagement with our robust analytics tools. Identify areas of improvement, monitor student participation, and make data-driven decisions to enhance the effectiveness of your courses.",
    icon: BarChart3,
  },
  {
    name: " Mobile Accessibility:",
    description:
      "In a world where learning can happen anywhere, LearnHub ensures that your courses are accessible on various devices. Whether your students are at home, in a coffee shop, or on the go, they can seamlessly access your course content.    ",
    icon: TabletSmartphone,
  },
];

export default async function Instructor() {
  const { userId } = auth();

  if (userId) {
    const course = await prismadb.course.findFirst({
      where: {
        userId,
      },
    });
    if (course) {
      redirect("/instructor/courses");
    }
  }

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center flex-col gap-6 lg:px-10 px-6 bg-gradient-to-r from-orange-50 to-orange-200 mx-auto py-16 lg:py-20 pb-32">
        <h1 className=" text-4xl lg:text-7xl font-bold tracking-tight dark:text-black text-center">
          Empower Minds
          <br /> Your Journey Starts
          <span className=" text-primary font-extrabold"> Here.</span>
        </h1>
        <Button size="lg" asChild>
          <Link href="/instructor/courses/new">Create a Course</Link>
        </Button>

        <AspectRatio ratio={16 / 9}>
          <Image
            src="/img/Instructor-hero.png"
            alt="Product screenshot"
            className=" shadow-xl rounded-xl ring-1 ring-gray-400/10"
            width={2432}
            height={1442}
            priority
          />
        </AspectRatio>
      </div>

      <div className="overflow-hidden py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="lg:pr-8 lg:pt-4">
              <div className="lg:max-w-lg">
                <h2 className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl text-center md:text-start">
                  Features
                </h2>

                <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-secondary-foreground lg:max-w-none">
                  {features.map((feature) => (
                    <div key={feature.name} className="relative pl-9">
                      <dt className="inline font-semibold ">
                        <feature.icon
                          className="absolute left-1 top-1 h-5 w-5 text-primary"
                          aria-hidden="true"
                        />
                        {feature.name}
                      </dt>{" "}
                      <dd className="inline text-base lg:text-lg text-muted-foreground">
                        {feature.description}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
            <Image
              src="/img/analytics.png"
              alt="Product screenshot"
              className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
              width={2432}
              height={1442}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
