import Loader from "@/components/ui/loader";
import React from "react";

export default function Loading() {
  return (
    <div className="h-screen w-auto flex justify-center items-center ">
      <Loader size={70} color="#f97316" />
    </div>
  );
}
