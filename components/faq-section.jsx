import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Faq() {
  return (
    <div className="mx-auto py-3 lg:px-28 px-6" id="faq">
      <h1 className="text-center text-3xl lg:4xl font-bold pb-4">
        Frequently Asked Questions
      </h1>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>What is LearnHub?</AccordionTrigger>
          <AccordionContent>
            LearnHub is an online learning platform that offers a diverse range
            of courses to learners worldwide. Our platform is designed to
            provide accessible, interactive, and engaging learning experiences
            across various subjects and industries.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            {" "}
            How do I get started on LearnHub?
          </AccordionTrigger>
          <AccordionContent>
            Getting started is easy! Simply create an account on our platform,
            browse our extensive course catalog, and enroll in the courses that
            interest you. You can start learning at your own pace immediately.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>
            {" "}
            What types of courses are available on LearnHub?
          </AccordionTrigger>
          <AccordionContent>
            We offer a wide variety of courses, ranging from academic subjects
            to professional development and hobbies. Our catalog includes
            courses for beginners, intermediate learners, and advanced
            professionals.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>
            {" "}
            Are the courses suitable for all levels of learners?
          </AccordionTrigger>
          <AccordionContent>
            Yes, our courses are designed to cater to learners of all levels.
            Whether you&aspos;re a beginner looking to explore a new subject or
            a professional aiming to enhance your skills, you&aspos;ll find
            courses that suit your needs.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger>
            {" "}
            How does the learning process work on LearnHub?
          </AccordionTrigger>
          <AccordionContent>
            Once enrolled in a course, you can access video lectures, reading
            materials, assignments, and quizzes. Engage in discussions with
            instructors and fellow learners. Progress at your own pace and track
            your achievements.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-6">
          <AccordionTrigger>
            {" "}
            Who are the instructors on LearnHub?
          </AccordionTrigger>
          <AccordionContent>
            Our courses are taught by industry experts, professionals, and
            educators with extensive experience in their respective fields. We
            ensure that our instructors are passionate about teaching and are
            dedicated to providing high-quality learning experiences.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
