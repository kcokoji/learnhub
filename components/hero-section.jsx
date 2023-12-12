import Image from "next/image";
import HeroText from "./hero-text";
import { Button } from "./ui/button";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export default function HeroSection() {
  return (
    <div className="mx-auto lg:py-20 py-[60px] lg:px-10 px-6 bg-gradient-to-r from-orange-50 to-orange-200 grid grid-cols-1  lg:grid-cols-2 sm:flex-row-reverse">
      <div>
        <HeroText />
        <div className="text-xl py-8 lg:py-10 space-x-3">
          <SignedIn>
            <Button asChild size="lg">
              <Link href="/my-learning">My Learning</Link>
            </Button>
          </SignedIn>
          <SignedOut>
            <Button asChild size="lg">
              <Link href="/sign-up">
                SignUp <MoveRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="lg"
              className="text-md text-black hover:text-primary"
            >
              <Link href="/sign-in">Login</Link>
            </Button>
          </SignedOut>
        </div>
      </div>
      <div className=" flex  justify-center ">
        <Image
          src="/img/hero-svg.svg"
          width={1000}
          height={1000}
          alt="image"
          className="w-auto h-auto"
          priority
        />
      </div>
    </div>
  );
}
