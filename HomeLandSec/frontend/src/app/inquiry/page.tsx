"use client";
import { useState, useEffect, useContext } from "react";
import Button from "@/components/ui/button";
import QuestionContext from "@/contexts/questionContext";
import { fetchMessage, recordRank } from "@/utils/csv";
import { useLoadSurveyData } from "@/utils/fetchSurveyData";
import { QuestionData } from "@/types/interfaces";

export default function Inquiry() {
  useLoadSurveyData();

  const [questions, setQuestions] = useState<QuestionData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const context = useContext(QuestionContext);
  if (!context)
    throw new Error("useContext must be used within questionProvider");

  const { criteria, buttons, name, total_questions } = context;

  // Load the first question on mount.
  useEffect(() => {
    const loadInitialQuestion = async () => {
      const newMessage = await fetchMessage();
      setQuestions([{ message: newMessage, answer: "", submitted: false }]);
    };
    loadInitialQuestion();
  }, []);

  // Update the answer for the current question when a radio is clicked.
  const updateAnswer = (value: string) => {
    setQuestions((prev) => {
      const updated = [...prev];
      if (!updated[currentIndex].submitted) {
        updated[currentIndex].answer = value;
      }
      return updated;
    });
  };

  // Submit answer for the current question
  const submit = async () => {
    const currentQuestion = questions[currentIndex];
    if (!currentQuestion || currentQuestion.submitted) return; // already submitted, fam
    const rank = parseInt(currentQuestion.answer);
    if (!rank) {
      alert("Please select a rating");
      return;
    }
    await recordRank(currentQuestion.message, rank);
    setQuestions((prev) => {
      const updated = [...prev];
      updated[currentIndex].submitted = true;
      return updated;
    });
    // If this is the final question, alert the user.
    if (currentIndex + 1 >= total_questions) {
      alert("All questions completed!");
    }
  };

  // Navigate to the previous question
  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Navigate to the next question
  const goToNext = async () => {
    // If the next question is already loaded, just jump
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else if (currentIndex + 1 < total_questions) {
      // Fetch a new question and add it to our questions array
      const newMessage = await fetchMessage();
      setQuestions((prev) => [
        ...prev,
        { message: newMessage, answer: "", submitted: false },
      ]);
      setCurrentIndex((prev) => prev + 1);
    }
  };

  if (!criteria || questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Loading...
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="min-h-screen text-gray-800 bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full">
        <header className="mb-6 text-center">
          <h1 className="text-2xl font-bold mb-2">{name}</h1>
          <p className="text-sm text-gray-600">
            Question: {currentIndex + 1} / {total_questions}
          </p>
        </header>
        <section className="mb-6">
          <p className="text-center mb-4">{criteria}</p>
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
            value={currentQuestion.message.text}
            className="w-full p-3 border border-gray-300 rounded resize-none overflow-hidden"
          />
        </section>
        <section className="mb-6">
          <div className="grid grid-cols-5 gap-4">
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
                    checked={currentQuestion.answer === key}
                    onChange={() => updateAnswer(key)}
                    className="form-radio"
                    disabled={currentQuestion.submitted}
                  />
                  <span>{btnText}</span>
                </label>
              );
            })}
          </div>
        </section>
        <footer className="flex justify-between space-x-4">
          <Button onClick={goToPrevious} disabled={currentIndex === 0}>
            Previous
          </Button>
          <Button onClick={submit} disabled={currentQuestion.submitted}>
            Submit
          </Button>
          <Button
            onClick={goToNext}
            disabled={
              currentIndex + 1 >= total_questions && currentQuestion.submitted
            }
          >
            Next
          </Button>
        </footer>
      </div>
    </div>
  );
}
