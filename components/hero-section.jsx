import Image from "next/image";
import HeroText from "./hero-text";
import { Button } from "./ui/button";
import Link from "next/link";
import { MoveRight } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="mx-auto py-[60px] lg:px-10 px-6 bg-gradient-to-r from-orange-50 to-orange-200 grid grid-cols-1  lg:grid-cols-2 sm:flex-row-reverse">
      <div>
        <HeroText />
        <div className="text-xl py-8 lg:py-10 space-x-3">
          <Button asChild size="lg">
            <Link href="/login">
              SignUp <MoveRight className="h-5 w-5 ml-2" />
            </Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            size="lg"
            className="text-md text-black hover:text-primary"
          >
            <Link href="/login">Login</Link>
          </Button>
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
