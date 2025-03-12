"use client";
import { useState, useEffect, useContext, useRef } from "react";
import Button from "@/components/ui/button";
import QuestionContext from "@/contexts/questionContext";
import { fetchMessage, recordRank } from "@/utils/csv";
import { useLoadSurveyData } from "@/utils/fetchSurveyData";

interface Message {
  uid: number;
  text: string;
}

export default function Inquiry() {
  // Load survey data into the context on mount.
  useLoadSurveyData();

  const [selectedOption, setSelectedOption] = useState("");
  const [text, setText] = useState("");
  const [currentMessage, setCurrentMessage] = useState<Message | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const context = useContext(QuestionContext);
  if (!context)
    throw new Error("useContext must be used within questionProvider");

  const { criteria, buttons, name, total_questions } = context;

  // Handle key presses for quick selection
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (buttons && buttons[parseInt(e.key) - 1]) {
        setSelectedOption(e.key);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [buttons]);

  // Auto-resize the textarea when text changes
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [text]);

  const changeText = async () => {
    const newMessage = await fetchMessage();
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

  if (!criteria) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen text-gray-800 bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full">
        <header className="mb-6 text-center">
          <h1 className="text-2xl font-bold mb-2">{name}</h1>
          <p className="text-sm text-gray-600">
            Total Questions: {total_questions}
          </p>
        </header>
        <section className="mb-6">
          <p className=" text-center mb-4">{criteria}</p>
          <div className="text-gray-700 text-sm space-y-2">
            <p>
              Please read the following message and rate it using the scale
              below:
            </p>
            <p>Rate using the scale below (final rating number only):</p>
            <ul className="space-y-1">
              {buttons.map((btnText, index) => (
                <li key={index} className="flex items-center">
                  <span className="font-bold mr-2">{index + 1}:</span>
                  {btnText}
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section className="mb-6">
          <h3 className="font-semibold mb-2">Message</h3>
          <textarea
            readOnly
            value={text}
            ref={textareaRef}
            className="w-full p-3 border border-gray-300 rounded resize-none overflow-hidden"
          />
        </section>
        <section className="mb-6">
          <div className="grid grid-cols-2 gap-4">
            {buttons.map((btnText, index) => {
              const key = String(index + 1);
              return (
                <label
                  key={key}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="rank"
                    value={key}
                    checked={selectedOption === key}
                    onChange={() => setSelectedOption(key)}
                    className="form-radio"
                  />
                  <span>{btnText}</span>
                </label>
              );
            })}
          </div>
        </section>
        <footer className="flex justify-center space-x-4">
          <Button onClick={submit}>Submit</Button>
          <Button onClick={() => console.log("Test button clicked!")}>
            Test Button
          </Button>
        </footer>
      </div>
    </div>
  );
}
