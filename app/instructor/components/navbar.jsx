"use client";

import React from "react";
import { Home, Video, BarChart4 } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

export default function Sidebar({ firstName, lastName }) {
  const pathname = usePathname();

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
  );
}
