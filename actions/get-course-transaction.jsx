import prismadb from "@/lib/prismaDB";

export default async function getTransactionByCourse(courseId, userId) {
  try {
    if (!userId) {
      return null;
    }
    const getTransaction = await prismadb.transaction.findFirst({
      where: {
        courseId,
        userId,
      },
    });

    return getTransaction;
  } catch (err) {
    return null;
  }
}
