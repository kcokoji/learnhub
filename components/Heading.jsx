import { cn } from "@/lib/utils";

export default function Heading({ title, description, className }) {
  return (
    <div>
      <h2
        className={cn(
          "lg:text-3xl text-2xl font-bold tracking-tight",
          className
        )}
      >
        {title}
      </h2>
      <p className={cn("text-sm text-muted-foreground", className)}>
        {description}
      </p>
    </div>
  );
}
