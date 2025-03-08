"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Button from "@/components/ui/button";

export default function Home() {
  const [surveyData, setSurveyData] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    fetch("/survey.json")
      .then((res) => res.json())
      .then((data) => setSurveyData(data));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (surveyData && surveyData.responses[e.key]) {
        setSelectedOption(e.key);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [surveyData]);

  function testButton() {
    console.log("Button clicked!");
  }

  if (!surveyData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] bg-neutral-200 items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start text-black">
        <p className="text-sm text-center sm:text-left">
          {surveyData.criteria}
        </p>
        <div>
          {Object.entries(surveyData.responses).map(([key, label]) => (
            <div key={key}>
              <label>
                <input
                  type="radio"
                  name="survey"
                  className="mr-2"
                  value={key}
                  checked={selectedOption === key}
                  onChange={() => setSelectedOption(key)}
                />
                {key}: {label}
              </label>
            </div>
          ))}
        </div>
        <Button onClick={testButton}>Test button</Button>
      </main>
    </div>
  );
}

