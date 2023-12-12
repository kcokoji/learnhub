"use client";

import React from "react";
import { ModeToggle } from "@/components/mode-toggle";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import {
  LockIcon,
  PlayCircleIcon,
  X,
  AlignRight,
  ArrowLeft,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Navbar({ data, transaction }) {
  const params = useParams();
  const activeChapter = params.chapterId;
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <div className="lg:hidden">
        <nav
          className="flex items-center justify-between py-3 lg:px-10 px-6 lg:hidden bg-gradient-to-r from-orange-50 to-orange-200"
          aria-label="Global"
        >
          <div className=" flex justify-center items-center">
            <Link href="/">
              <span className="sr-only">LearnHub</span>
              <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl text-primary">
                LearnHub
              </h1>
            </Link>
          </div>
          <div className="space-x-5 flex">
            <div className="lg:hidden ">
              <ModeToggle />
            </div>
            <div className="lg:hidden">
              <Button
                size="icon"
                variant="outline"
                className="bg-black hover:bg-black border-none "
                onClick={toggleMobileMenu}
              >
                <span className="sr-only">Open menu</span>

                <AlignRight
                  className="h-10 w-10  rounded-md p-2 text-white"
                  aria-hidden="true"
                />
              </Button>
            </div>
          </div>
        </nav>
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="fixed inset-y-0 z-50 w-full bg-black px-6 py-6 sm:ring-1 sm:ring-gray-900/10"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between mb-6">
                <Link href="/">
                  <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl text-white">
                    LearnHub
                  </h1>
                </Link>
                <Button
                  size="icon"
                  variant="outline"
                  className="bg-black hover:bg-transparent"
                  onClick={toggleMobileMenu}
                >
                  <span className="sr-only">Close menu</span>
                  <X className="h-10 w-10 rounded-md p-2 text-white" />
                </Button>
              </div>
              <div className="mt-6 py-14 space-y-4 my-8 ">
                <Button
                  variant="link"
                  className="text-white"
                  onClick={() => {
                    router.back();
                    toggleMobileMenu(); // Close the mobile menu
                  }}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" /> Back
                </Button>
                {data.map((chapter) => (
                  <Button
                    variant="ghost"
                    className={cn(
                      "text-md  transition-colors block w-fit",
                      activeChapter === chapter.id
                        ? "text-primary"
                        : "text-white"
                    )}
                    onClick={toggleMobileMenu}
                    asChild
                    key={chapter.id}
                  >
                    <Link
                      href={`/course/${params.courseId}/chapters/${chapter.id}`}
                    >
                      <div className="flex items-center">
                        {transaction ? (
                          <PlayCircleIcon className="h-5 w-5 mr-2 text-primary" />
                        ) : (
                          <>
                            {chapter.free && (
                              <PlayCircleIcon className="h-5 w-5 mr-2 text-primary" />
                            )}
                            {!chapter.free && (
                              <LockIcon className="h-5 w-5 mr-2 text-primary" />
                            )}
                          </>
                        )}
                        <span className="ml-2">{chapter.title}</span>
                      </div>
                    </Link>
                  </Button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="bg-white dark:bg-stone-900  w-fit shadow-lg text-black hidden lg:block">
        <div className="p-4 flex justify-between">
          <Link href="/">
            <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl text-primary">
              LearnHub
            </h1>
          </Link>
          <ModeToggle />
        </div>

        <nav className="">
          <h1 className="px-4 pb-2 text-lg font-medium tracking-tight text-secondary-foreground"></h1>

          {data.map((chapter) => (
            <Button
              className={cn(
                "text-sm  m-0 pt-4 pb-10  block  dark:text-white rounded-r-full dark:hover:bg-background dark:hover:text-primary transform transition-colors",
                activeChapter === chapter.id
                  ? "text-primary bg-primary/20 dark:text-primary transform transition-transform hover:translate-x-[-10px]"
                  : "text-black"
              )}
              asChild
              key={chapter.id}
              variant="ghost"
            >
              <Link href={`/course/${params.courseId}/chapters/${chapter.id}`}>
                <div className="flex">
                  {transaction ? (
                    <PlayCircleIcon className="h-5 w-5 mr-2 text-primary" />
                  ) : (
                    <>
                      {" "}
                      {chapter.free && (
                        <PlayCircleIcon className="h-5 w-5 mr-2 text-primary" />
                      )}
                      {!chapter.free && (
                        <LockIcon className="h-5 w-5 mr-2 text-primary" />
                      )}
                    </>
                  )}
                  <span className="ml-2"> {chapter.title}</span>
                </div>
              </Link>
            </Button>
          ))}
        </nav>
      </div>
    </>
  );
}
