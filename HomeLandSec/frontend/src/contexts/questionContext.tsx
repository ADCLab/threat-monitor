"use client";
import React, { createContext, useState, ReactNode } from "react";
import {
  QuestionContextProps,
  QuestionProviderProps,
} from "@/types/interfaces";

const QuestionContext = createContext<QuestionContextProps | undefined>(
  undefined,
);

export function QuestionProvider({ children }: QuestionProviderProps) {
  const [criteria, setCriteria] = useState("Default Criteria");
  const [buttons, setButtons] = useState<string[]>([]);
  const [name, setName] = useState("Default Name");
  const [total_questions, setTotal_questions] = useState(0);

  const setAllButtons = (newButtons: string[]) => {
    // Clears current buttons and then sets all buttons at once
    setButtons(newButtons);
  };

  return (
    <QuestionContext.Provider
      value={{
        criteria,
        setCriteria,
        buttons,
        setAllButtons,
        name,
        setName,
        total_questions,
        setTotal_questions,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
}

export default QuestionContext;
