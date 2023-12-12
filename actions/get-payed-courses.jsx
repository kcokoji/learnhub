import prismadb from "@/lib/prismaDB";
import { auth } from "@clerk/nextjs";
export default async function getPayedCourses() {
  try {
    const { userId } = auth();
    const userTransactions = await prismadb.transaction.findMany({
      where: {
        userId,
      },
      select: {
        course: {
          include: {
            chapters: {
              where: {
                published: true,
              },
            },
          },
        },
      },
    });
    const payedCourses = userTransactions.map(
      (transaction) => transaction.course
    );

    return payedCourses;
  } catch (err) {
    return null;
  }
}
