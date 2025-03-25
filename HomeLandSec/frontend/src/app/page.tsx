"use client";
import { useEffect, useContext } from "react";
import Button from "@/components/ui/button";
import Link from "next/link";
import QuestionContext from "@/contexts/questionContext";

export default function Home() {
  const context = useContext(QuestionContext);
  if (!context) {
    throw new Error(
      "QuestionContext is undefined. Make sure you're wrapping your app with QuestionProvider.",
    );
  }
  const { resetContext } = context;

  useEffect(() => {
    console.log("Resetting context");
    resetContext();
  }, []);

  return (
    <div className="bg-gray-50 flex flex-col flex-grow">
      <header className="w-full text-center py-18">
        <div
          className="mx-auto mb-6 rounded-lg shadow-lg overflow-hidden"
          style={{ maxWidth: "600px", aspectRatio: "16/9" }}
        >
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/oa1qKT-VJvo"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 pt-4 mb-4">
          Welcome to the Lab Survey
        </h1>
        <p className="text-lg text-gray-600">
          Dive into our survey and share your insights to help us improve the
          lab experience.
        </p>
      </header>
      <main className="flex-grow flex flex-col items-center space-y-6">
        <Link href="/inquiry">
          <Button className="px-8 py-3 bg-neutral-800 text-blue-200 rounded-full shadow-md hover:bg-neutral-700 transition">
            Get Started
          </Button>
        </Link>
      </main>
    </div>
  );
}
