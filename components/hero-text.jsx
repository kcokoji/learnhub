"use client";

import { TypeAnimation } from "react-type-animation";

export default function HeroText() {
  return (
    <div className="">
      <div className="text-[2rem] block">
        <TypeAnimation
          sequence={["Dream", 2000, "Learn", 2000, "Achieve", 2000]}
          repeat={Infinity}
          className="text-4xl lg:text-7xl font-bold tracking-tight dark:text-black"
        />
      </div>
      <span className=" text-4xl lg:text-7xl font-bold tracking-tight dark:text-black">
        {" "}
        Your Journey
        <br /> Starts
        <span className=" text-primary font-extrabold"> Here.</span>
      </span>
      <p className="my-2 text-lg text-muted-foreground">
        We&rsquo;re on a mission to make education accessible, engaging, and
        transformative.
      </p>
    </div>
  );
}
