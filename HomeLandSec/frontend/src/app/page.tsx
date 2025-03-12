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

  const {
    criteria,
    setCriteria,
    buttons,
    setAllButtons,
    name,
    setName,
    total_questions,
    setTotal_questions,
  } = context;

  async function loadSurvey() {
    console.log("Survey Loaded");
    const response: SurveyData = await fetchSurveyData();

    setCriteria(response.criteria);
    setName(response.name);
    setTotal_questions(response.total_questions);
    setAllButtons(Object.values(response.buttons));
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
      <h1 className="text-4xl font-bold text-neutral-900">Home</h1>
      <p className="text-lg text-neutral-800">Criteria: {criteria}</p>
      <p className="text-lg text-neutral-800">Name: {name}</p>
      <p className="text-lg text-neutral-800">
        Total Questions: {total_questions}
      </p>
      {/* Map over buttons to display each as a Button component */}
      <div className="flex gap-4">
        {buttons.map((btnText, index) => (
          <Button key={index}>{btnText}</Button>
        ))}
      </div>
    </div>
  );
}
