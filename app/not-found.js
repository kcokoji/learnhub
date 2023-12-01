import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex justify-center items-center flex-col p-5 mx-auto gap-2 h-screen">
      <Image src="/img/404.svg" width={500} height={500} alt="404 image" />
      <h1 className="text-4xl font-bold tracking-tight">Page Not Found</h1>
      <p className="text-muted-foreground">Could not find requested resource</p>
      <Button asChild>
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  );
}
