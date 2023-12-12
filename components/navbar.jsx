"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlignRight, MoveRight, X } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { CategoryNav } from "./category-nav";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  const pathname = usePathname();

  const navigation = [
    {
      name: "Why LearnHub",
      href: "/",
    },

    { name: "FAQs", href: "#faq" },
    {
      name: "Instructor",
      href: "/instructor",
    },
  ];

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className=" inset-x-0 top-0 z-50 sticky  bg-gradient-to-r from-orange-50 to-orange-200">
      <nav
        className="flex items-center justify-between py-3 lg:px-10 px-6"
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
        <div className="hidden lg:flex gap-x-2">
          <CategoryNav />
          {navigation.map((item) => (
            <Button
              variant="ghost"
              className="text-md  transition-colors text-black"
              key={item.name}
              asChild
            >
              <Link href={item.href}>{item.name}</Link>
            </Button>
          ))}
        </div>
        <div className="hidden lg:flex justify-center items-center gap-1">
          <SignedOut>
            <Button asChild>
              <Link href="/sign-up">
                SignUp <MoveRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className="text-md text-black hover:text-primary"
            >
              <Link href="/sign-in">Login</Link>
            </Button>
          </SignedOut>
          <SignedIn>
            <Button
              variant="ghost"
              className="text-md  transition-colors hover:text-primary text-black"
            >
              <Link href="/my-learning">My Learning</Link>
            </Button>

            <Button variant="link">
              <UserButton afterSignOutUrl="/" />
            </Button>
          </SignedIn>
          <ModeToggle />
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
                  <CategoryNav />

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
                  <SignedOut>
                    <Button asChild size="lg" onClick={toggleMobileMenu}>
                      <Link href="/sign-up">
                        SignUp <MoveRight className="h-5 w-5 ml-2" />
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="ghost"
                      size="lg"
                      className="text-md text-white hover:text-primary hover:bg-accent-foreground dark:text-white hover:dark:text-primary"
                      onClick={toggleMobileMenu}
                    >
                      <Link href="/sign-in">Login</Link>
                    </Button>
                  </SignedOut>
                  <SignedIn>
                    <Button variant="link">
                      <UserButton afterSignOutUrl="/" />
                    </Button>

                    <Button
                      variant="ghost"
                      className="text-md text-white hover:text-primary hover:bg-accent-foreground dark:text-white hover:dark:text-primary"
                      onClick={toggleMobileMenu}
                    >
                      <Link href="/my-learning">My Learning</Link>
                    </Button>
                  </SignedIn>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
