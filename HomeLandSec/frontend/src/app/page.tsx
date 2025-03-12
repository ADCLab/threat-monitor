"use client";
import Button from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
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
      <footer className="py-4 text-center text-sm text-gray-500">
        <a
          href="https://adc-ucf.com/"
          className="hover:underline"
          target="_blank"
        >
          {" "}
          For more information, visit our website
        </a>
        <br />© {new Date().getFullYear()} Lab Survey. All rights reserved.
      </footer>
    </div>
  );
}
