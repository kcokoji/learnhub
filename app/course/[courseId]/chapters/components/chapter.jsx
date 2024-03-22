"use client";

import { Button } from "@/components/ui/button";
import AnimateLoader from "@/components/ui/loader";
import React, { Suspense, useState } from "react";
import { usePaystackPayment } from "react-paystack";
import { CheckSquare, LockIcon } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Heading from "@/components/Heading";
import { Separator } from "@/components/ui/separator";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";
import Loading from "@/app/loading";

import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import { MediaPlayer, MediaProvider } from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import { SignInButton } from "@clerk/nextjs";

export default function Chapter({
  data,
  email,
  price,
  userId,
  courseId,
  transaction,
  progress,
}) {
  const publicKey = "pk_test_2bcf9e6730624029de266fda8abe1144c5ae1dec";
  const router = useRouter();
  const params = useParams();
  const amount = price * 100;
  const config = {
    email,
    amount,
    currency: "NGN",
    publicKey,
  };
  const initializePayment = usePaystackPayment(config);

  const [loading, setLoading] = useState(false);
  const [initalProgress, setProgress] = useState(progress);

  const onSuccess = (res) => {
    if (res.status === "success") {
      const reference = res.reference;
      const requestData = {
        email,
        courseId,
        reference,
      };

      axios
        .post("/api/transaction", requestData)
        .then(() => {
          toast.success("Transaction Successful!");
          router.refresh();
        })
        .catch(() => {
          toast.error("Something went wrong!");
        });
    } else {
      toast.error("Transaction declined!");
    }
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    toast.error("Transaction Cancelled!");
  };

  const handleProgress = async () => {
    try {
      setLoading(true);

      const response = await axios.patch(
        `/api/courses/${params.courseId}/chapters/${params.chapterId}/progress`,
        {
          isCompleted: !progress,
        }
      );

      // Assuming the server returns the updated progress status
      const updatedProgress = response.data.isCompleted;

      // Update the progress state based on the server response
      // This assumes that your response structure includes the updated progress status
      setProgress(updatedProgress);

      router.refresh();
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {" "}
      <Suspense fallback={<Loading />}>
        <div className="py-4 lg:px-10 space-y-4 px-6 flex-1 lg:overflow-y-auto">
          <div className="bg-muted-foreground rounded-md  aspect-video flex justify-center items-center">
            {transaction ? (
              <MediaPlayer title={data.title} src={data.videoUrl} playsinline>
                <MediaProvider />
                <DefaultVideoLayout
                  thumbnails="https://image.mux.com/VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU/storyboard.vtt"
                  icons={defaultLayoutIcons}
                />
              </MediaPlayer>
            ) : (
              <>
                {data.free && (
                  <MediaPlayer
                    title={data.title}
                    src={data.videoUrl}
                    playsinline
                  >
                    <MediaProvider />
                    <DefaultVideoLayout
                      thumbnails="https://image.mux.com/VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU/storyboard.vtt"
                      icons={defaultLayoutIcons}
                    />
                  </MediaPlayer>
                )}
                {!data.free && (
                  <div className="flex flex-col justify-center items-center">
                    <LockIcon className="h-10 w-10 text-muted" />
                    <p className="text-popover">This chapter is locked</p>
                  </div>
                )}
              </>
            )}
          </div>

          <div className=" flex justify-between">
            <Heading title={data.title} />
            {!transaction ? (
              <>
                {!userId ? (
                  <SignInButton
                    afterSignInUrl={`course/${params.courseId}/chapters/${params.chapterId}`}
                    afterSignUpUrl={`course/${params.courseId}/chapters/${params.chapterId}`}
                  >
                    <Button>Enroll Now</Button>
                  </SignInButton>
                ) : (
                  <Button
                    disabled={loading}
                    onClick={() => {
                      return initializePayment(onSuccess, onClose);
                    }}
                  >
                    Enroll Now
                  </Button>
                )}
              </>
            ) : (
              <>
                {initalProgress ? (
                  <Button onClick={handleProgress} variant="secondary">
                    {loading ? (
                      <AnimateLoader size={24} color="white" />
                    ) : (
                      <>
                        <h1>UnMark</h1>
                      </>
                    )}
                  </Button>
                ) : (
                  <Button onClick={handleProgress}>
                    {loading ? (
                      <AnimateLoader size={24} color="white" />
                    ) : (
                      <>
                        <CheckSquare className="h-5 w-5 mr-2" />{" "}
                        <h1>Mark complete</h1>
                      </>
                    )}
                  </Button>
                )}
              </>
            )}
          </div>
          <Separator />
          <Heading title="Description:" />
          <Heading description={data.description} />
          {/* {course.attachments && (
        <Alert className="rounded-md">
          {" "}
          <Link
            className={buttonVariants({ variant: "link" })}
            href={course.attachments}
            target="blank"
          >
            <AlertDescription>
              {" "}
              <File className="h-5 w-5 mr-2 text-primary" />
              Course Attachment
            </AlertDescription>
          </Link>
        </Alert>
      )} */}
        </div>
      </Suspense>
    </div>
  );
}
