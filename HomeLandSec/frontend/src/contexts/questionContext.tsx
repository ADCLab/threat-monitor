"use client";
import React, { createContext, useState, ReactNode } from "react";

interface QuestionContextProps {
  criteria: string;
  setCriteria: React.Dispatch<React.SetStateAction<string>>;
  buttons: string[];
  setAllButtons: (newButtons: string[]) => void;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  total_questions: number;
  setTotal_questions: React.Dispatch<React.SetStateAction<number>>;
}

const QuestionContext = createContext<QuestionContextProps | undefined>(
  undefined,
);

interface QuestionProviderProps {
  children: ReactNode;
}

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
