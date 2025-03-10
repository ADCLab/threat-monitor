"use client";
import { useState, useEffect, useContext, useRef } from "react";
import Image from "next/image";
import Button from "@/components/ui/button";
import { SurveyData } from "@/types/interfaces";
import QuestionContext from "@/contexts/questionContext";
import { fetchMessage, recordRank } from "@/utils/csv";

interface Message {
  uid: number;
  text: string;
}

export default function Inquiry() {
  const [surveyData, setSurveyData] = useState<SurveyData | null>(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [text, setText] = useState("");
  const [currentMessage, setCurrentMessage] = useState<Message | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const context = useContext(QuestionContext);
  if (!context) throw new Error("useContext must be used within questionProvider");
  const { value, setValue } = context;

  useEffect(() => {
    fetch("/survey.json")
      .then((res) => res.json())
      .then((data: SurveyData) => setSurveyData(data));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (surveyData && surveyData.responses?.[e.key]) {
        setSelectedOption(e.key);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [surveyData]);

  // Auto-resize the textarea when the text changes
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [text]);

  const changeText = async () => {
    const newMessage: Message = await fetchMessage();
    setCurrentMessage(newMessage);
    setText(newMessage.text);
  };

  const submit = async () => {
    console.log("Submitted");
    const rank = parseInt(selectedOption);
    if (!rank || rank === 0) {
      alert("Please select a rating");
      return;
    }
    if (!currentMessage) {
      alert("No message available to record.");
      return;
    }
    await recordRank(currentMessage, rank);
    await changeText();
    setSelectedOption("");
  };

  useEffect(() => {
    changeText();
  }, []);

  if (!surveyData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] bg-neutral-200 items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start text-black">
        {/* Display survey instructions from survey.json */}
        <p className="text-sm text-center sm:text-left">
          {surveyData.criteria}
        </p>
        <div className="InfoBox">
          <h3>Survey</h3>
          <p>
            As a Message Analysis Assistant, your role is to assess whether a given message contains coded language that may incite or support military actions, armed revolt, or civil unrest targeting specific individuals or groups. Carefully review the message below and determine its level of risk.
          </p>
          <p>
            Use the following rating scale to respond with the final rating number only:
          </p>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {Object.entries(surveyData.responses).map(([key, label]) => (
              <li key={key}><strong>{key}:</strong> {label}</li>
            ))}
          </ul>
          <h3>Please rate the following message:</h3>
          <textarea
            readOnly
            value={text}
            ref={textareaRef}
            style={{ width: "100%", resize: "none", overflow: "hidden" }}
          />
        </div>
        {/* Render radio buttons for rating */}
        <div>
          {Object.keys(surveyData.responses).map((key) => (
            <div key={key}>
              <input
                type="radio"
                id={key}
                name="rank"
                value={key}
                checked={selectedOption === key}
                onChange={() => setSelectedOption(key)}
              />
              <label htmlFor={key}>{key}</label>
            </div>
          ))}
        </div>
        <Button onClick={submit}>Submit</Button>
        <Button onClick={() => console.log("Test button clicked!")}>
          Test button
        </Button>
        <p className="text-blue-500">{value}</p>
      </main>
    </div>
  );
}

