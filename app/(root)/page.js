import CategorySection from "@/components/category-section";
import Faq from "@/components/faq-section";
import HeroSection from "@/components/hero-section";
import Teacher from "@/components/teacher-section";
import TrustedBy from "@/components/trustedBy";

export default async function Home() {
  return (
    <main className=" text-4xl font-semibold text-start">
      <HeroSection />
      <TrustedBy />
      <CategorySection />
      <Faq />
      <Teacher />
    </main>
  );
}
