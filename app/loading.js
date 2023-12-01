import Loader from "@/components/ui/loader";
import React from "react";

export default function Loading() {
  return (
    <div className="h-screen w-auto flex justify-center items-center z-20">
      <Loader size={100} color="#f97316" />
    </div>
  );
}
