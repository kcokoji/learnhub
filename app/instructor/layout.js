import { auth } from "@clerk/nextjs";
import Sidebar from "./components/navbar";
import { currentUser } from "@clerk/nextjs";
import { Toaster } from "sonner";

export const metadata = {
  title: "Instructor",
  description: "Create Courses on LearnHub",
};

export default async function InstructorLayout({ children }) {
  const { userId } = auth();
  const user = await currentUser();
  const firstName = user?.firstName;
  const lastName = user?.lastName;

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <>
      <div className="flex-row h-screen flex">
        <Sidebar firstName={firstName} lastName={lastName} />
        <section className="flex-1 overflow-y-auto">
          <Toaster position="top-center" richColors />
          {children}
        </section>
      </div>
    </>
  );
}
