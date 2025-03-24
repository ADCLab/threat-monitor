import { useEffect, useContext } from "react";
import QuestionContext from "@/contexts/questionContext";
import { SurveyData } from "@/types/interfaces";

export async function fetchSurveyData(): Promise<SurveyData> {
  const response = await fetch("/survey.json");
  if (!response.ok) {
    throw new Error("Failed to fetch survey data");
  }
  const data = await response.json();
  return data as SurveyData;
}

// Custom hook to load survey data into the context
export function useLoadSurveyData() {
  const context = useContext(QuestionContext);
  if (!context)
    throw new Error("useContext must be used within questionProvider");
  const { setCriteria, setName, setTotal_questions, setAllButtons } = context;

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchSurveyData();
        setCriteria(data.criteria);
        setName(data.name);
        setTotal_questions(data.total_questions);
        setAllButtons(Object.values(data.buttons));
      } catch (error) {
        console.error(error);
      }
    }

    loadData();
  }, []);
}
