import prismadb from "@/lib/prismaDB";

const groupByCourse = (transactions) => {
  const grouped = {};

  transactions.forEach((transaction) => {
    const courseTitle = transaction.course.title;
    if (!grouped[courseTitle]) {
      grouped[courseTitle] = 0;
    }
    grouped[courseTitle] += transaction.course.price || 0;
  });

  return grouped;
};

export const getAnalytics = async (userId) => {
  try {
    const transactions = await prismadb.transaction.findMany({
      where: {
        course: {
          userId: userId,
        },
      },
      include: {
        course: true,
      },
    });

    const groupedEarnings = groupByCourse(transactions);
    const data = Object.entries(groupedEarnings).map(
      ([courseTitle, total]) => ({
        name: courseTitle,
        total: total,
      })
    );

    const totalRevenue = data.reduce((acc, curr) => acc + curr.total, 0);
    const totalSales = transactions.length;

    return {
      data,
      totalRevenue,
      totalSales,
    };
  } catch (error) {
    console.log("[GET_ANALYTICS]", error);
    return {
      data: [],
      totalRevenue: 0,
      totalSales: 0,
    };
  }
};
