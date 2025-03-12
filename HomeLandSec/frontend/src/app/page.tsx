"use client";
import { useContext } from "react";
import Image from "next/image";
import Button from "@/components/ui/button";
import Link from "next/link";
import QuestionContext from "@/contexts/questionContext";

export default function Home() {
  const context = useContext(QuestionContext);
  if (!context)
    throw new Error("useContext must be used within questionProvider");

  const {
    criteria,
    setCriteria,
    buttons,
    addButton,
    updateButton,
    removeButton,
  } = context;
  function loadSurvey() {
    console.log("Survey Loaded");
    setCriteria("New Criteria");
    addButton("New Button");
    addButton("New Button 2");
    addButton("New Button 3");
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
      <ul>
        {buttons.map((button, index) => (
          <li key={index}>
            <input
              type="text"
              value={button}
              onChange={(e) => updateButton(index, e.target.value)}
            />
            <Button
              onClick={() => removeButton(index)}
              className="text-red-300 bg-red-800"
            >
              Remove
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
