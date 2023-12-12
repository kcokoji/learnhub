import AnimateLoader from "@/components/ui/loader";
import React from "react";

export default function Loading() {
  return (
    <div className="h-screen w-auto flex justify-center items-center">
      <AnimateLoader size={70} color="#f97316" />
    </div>
  );
}
