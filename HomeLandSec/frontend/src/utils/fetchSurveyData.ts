export interface SurveyData {
  name: string;
  total_questions: number;
  buttons: { [key: string]: string };
  criteria: string;
}

export async function fetchSurveyData(): Promise<SurveyData> {
  const response = await fetch("/survey.json");
  if (!response.ok) {
    throw new Error("Failed to fetch survey data");
  }
  const data = await response.json();
  return data as SurveyData;
}
