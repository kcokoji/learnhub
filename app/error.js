"use client"; // Error components must be Client Components

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Heading from "@/components/Heading";
import { useRouter } from "next/navigation";

export default function Error({ error, reset }) {
  const router = useRouter();

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-2">
      <Heading
        title="Something went wrong"
        description="An unexpected error occured .Please try again or go back "
      />
      <div className="flex gap-2">
        <Button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Try again
        </Button>
        <Button
          variant="outline"
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => router.back()
          }
        >
          Go back to previous page
        </Button>
      </div>
    </div>
  );
}
