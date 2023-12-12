"use client";

import React from "react";
import { Home, Video, BarChart4, AlignRight, X, ArrowLeft } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export default function Sidebar({ firstName, lastName }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  const navigation = [
    {
      name: "Courses",
      icon: <Video className="w-6 h-6" />, // Adjust icon size using Tailwind CSS classes
      href: "/instructor/courses",
      active: pathname.startsWith("/instructor/courses"),
    },
    {
      name: "Analytics",
      icon: <BarChart4 className="w-6 h-6" />, // Adjust icon size using Tailwind CSS classes
      href: "/instructor/analytics",
      active: pathname === "/instructor/analytics",
    },
  ];

  return (
    <div>
      <div className="lg:hidden">
        <nav
          className="flex items-center justify-between py-3 w-full lg:px-10 px-6 lg:hidden bg-gradient-to-r from-orange-50 to-orange-200"
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
                className="bg-black hover:bg-black border-none"
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
              className="fixed inset-y-0 z-50 w-full bg-black px-6 py-6  sm:ring-1 sm:ring-gray-900/10 lg:hidden"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between">
                <Link href="/" className="-m-1.5 p-1.5">
                  <span className="sr-only">LearnHub</span>
                  <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl text-primary">
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

                  <X
                    className="h-10 w-10  rounded-md p-2 text-white"
                    aria-hidden="true"
                  />
                </Button>
              </div>
              <div className="mt-6 flow-root">
                <div className="py-14">
                  <div className="space-y-4 my-8">
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
                    {navigation.map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ duration: 0.7, delay: index * 0.3 }}
                      >
                        <Button
                          variant="ghost"
                          className={cn(
                            "text-md  transition-colors",
                            item.active ? "text-primary" : "text-white"
                          )}
                          onClick={toggleMobileMenu}
                          key={item.name}
                          asChild
                        >
                          <Link href={item.href}>{item.name}</Link>
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <Button variant="link">
                      <UserButton afterSignOutUrl="/" />
                    </Button>

                    <Button
                      variant="ghost"
                      className="text-md text-white hover:text-primary hover:bg-accent-foreground dark:text-white hover:dark:text-primary"
                      onClick={toggleMobileMenu}
                    >
                      <Link href="/">Student</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="bg-white dark:bg-stone-900  h-screen w-60 shadow-lg text-black hidden lg:block">
        <div className="p-4 flex justify-between">
          <Link href="/">
            <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl text-primary">
              LearnHub
            </h1>
          </Link>
          <ModeToggle />
        </div>

        <nav className="mt-4">
          {navigation.map((item) => (
            <Button
              className={cn(
                "text-md  m-0 pt-4 pb-10  block  dark:text-white rounded-r-full dark:hover:bg-background dark:hover:text-primary transform transition-colors",
                item.active
                  ? "text-primary bg-primary/20 dark:text-primary transform transition-transform hover:translate-x-[-10px]"
                  : "text-black"
              )}
              asChild
              key={item.name}
              variant="ghost"
            >
              <Link href={item.href}>
                <div className="flex items-center">
                  {item.icon}
                  <span className="ml-4">{item.name}</span>
                </div>
              </Link>
            </Button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 p-4 w-60 bg-white dark:bg-stone-900">
          <Separator />
          <Button variant="ghost" className="px-10">
            <div className="flex items-center">
              <UserButton />
              <div>
                <p className="text-sm font-semibold px-2 text-popover-foreground">
                  {firstName} {lastName}
                </p>
              </div>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}
