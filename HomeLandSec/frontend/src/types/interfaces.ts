import { ReactNode } from "react";

export interface Message {
  uid: number;
  text: string;
}

export interface QuestionContextProps {
  criteria: string;
  setCriteria: React.Dispatch<React.SetStateAction<string>>;
  buttons: string[];
  setAllButtons: (newButtons: string[]) => void;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  total_questions: number;
  setTotal_questions: React.Dispatch<React.SetStateAction<number>>;
}

export interface QuestionProviderProps {
  children: ReactNode;
}

export interface SurveyData {
  name: string;
  total_questions: number;
  buttons: { [key: string]: string };
  criteria: string;
}

export interface QuestionData {
  message: Message;
  answer: string;
  submitted: boolean;
}
