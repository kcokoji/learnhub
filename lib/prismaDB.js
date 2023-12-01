import { PrismaClient } from "@prisma/client";

const prismadb =
  globalThis.prisma ||
  new PrismaClient({
    log: [
      { level: "warn", emit: "event" },
      { level: "info", emit: "event" },
      { level: "error", emit: "event" },
    ],
  });
prismadb.$on("warn", (e) => {
  console.log(e);
});

prismadb.$on("info", (e) => {
  console.log(e);
});

prismadb.$on("error", (e) => {
  console.log(e);
});
if (process.env.NODE_ENV !== "production") globalThis.prisma = prismadb;

export default prismadb;
