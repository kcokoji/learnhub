import { Github, Instagram, Twitter, Youtube } from "lucide-react";

import Link from "next/link";

const d = new Date();
const year = d.getFullYear();

export default function Footer() {
  return (
    <div className="relative isolate overflow-hidden  bg-foreground dark:bg-inherit border-t py-8 sm:py-10 lg:py-16 flex-shrink-0">
      <div className="mx-auto max-w-7xl px-4  flex flex-col justify-between h-full">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-8 lg:max-w-none lg:grid-cols-3 mb-10">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter text-primary sm:text-4xl">
              LearnHub
            </h1>
            <p className="mt-4 text-muted-foreground leading-5">
              Our mission is to make education accessible, engaging, and
              transformative. Whether you&apos;re looking to enhance your
              career, pursue a passion, or acquire new skills, our platform is
              your gateway to a brighter future.
            </p>
          </div>
          <div>
            <div className="flex flex-col p-2 text-secondary dark:text-secondary-foreground gap-y-3">
              <Link href="/" className="hover:text-primary">
                Why LearnHub
              </Link>
              <Link href="/" className="hover:text-primary">
                Resources
              </Link>
              <Link href="/" className="hover:text-primary">
                FAQs
              </Link>
              <Link href="/" className="hover:text-primary">
                Become A Teacher
              </Link>
            </div>
          </div>
          <div>
            <h2 className="text-muted-foreground tracking-tight text-xl font-bold">
              Contact Us
            </h2>
            <div className="flex my-2 gap-x-4">
              <Link href="/">
                <Youtube size={24} fill="white" color="black" />
              </Link>

              <Link href="/">
                <Twitter size={24} fill="white" color="black" />
              </Link>

              <Link href="/">
                <Instagram size={24} fill="white" color="black" />
              </Link>

              <Link href="/">
                <Github size={24} fill="white" color="black" />
              </Link>
            </div>
          </div>
        </div>
        <hr className="my-7" />
        <h1 className="text-center text-muted-foreground">
          @ {year}{" "}
          <a href="" className="underline">
            Okoji Kelechi
          </a>
          .All Rights Reserved
        </h1>
      </div>
    </div>
  );
}
