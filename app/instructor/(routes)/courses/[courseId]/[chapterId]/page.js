import prismadb from "@/lib/prismaDB";
import ChapterForm from "./components/chapter-form";

export default async function ChapterPage({ params }) {
  const chapter = await prismadb.chapter.findUnique({
    where: {
      id: params.chapterId,
    },
    include: {
      muxData: true,
    },
  });

  return (
    <div>
      <ChapterForm data={chapter} />
    </div>
  );
}
