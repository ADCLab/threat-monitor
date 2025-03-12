"use client";
import React, { createContext, useState, ReactNode } from "react";

interface QuestionContextProps {
  criteria: string;
  setCriteria: React.Dispatch<React.SetStateAction<string>>;
  buttons: string[];
  addButton: (buttonText: string) => void;
  updateButton: (index: number, newValue: string) => void;
  removeButton: (index: number) => void;
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

  const addButton = (buttonText: string) => {
    setButtons((prev) => {
      if (prev.length < 10) {
        return [...prev, buttonText];
      }
      return prev;
    });
  };

  const updateButton = (index: number, newValue: string) => {
    setButtons((prev) => {
      if (index < 0 || index >= prev.length) return prev;
      const updated = [...prev];
      updated[index] = newValue;
      return updated;
    });
  };

  const removeButton = (index: number) => {
    setButtons((prev) => {
      if (index < 0 || index >= prev.length) return prev;
      const updated = [...prev];
      updated.splice(index, 1);
      return updated;
    });
  };

  return (
    <QuestionContext.Provider
      value={{
        criteria,
        setCriteria,
        buttons,
        addButton,
        updateButton,
        removeButton,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
}

export default QuestionContext;
