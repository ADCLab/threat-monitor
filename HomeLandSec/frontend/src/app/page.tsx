"use client";
import { useContext } from "react";
import Image from "next/image";
import Button from "@/components/ui/button";
import Link from "next/link";
import QuestionContext from "@/contexts/questionContext";
import { fetchSurveyData, SurveyData } from "@/utils/fetchSurveyData";
export default function Home() {
  const context = useContext(QuestionContext);
  if (!context)
    throw new Error("useContext must be used within questionProvider");

  async function loadSurvey() {
    console.log("Survey Loaded");
    await fetchSurveyData();
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] bg-neutral-200 items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Link
        href="/inquiry"
        className="bg-neutral-800 p-10 text-blue-200 rounded-2xl"
      >
        Go to Inquiry
      </Link>
      <Button onClick={loadSurvey} className="text-blue-300 bg-fuchsia-800">
        Test Button
      </Button>
    </div>
  );
}
