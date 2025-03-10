"use client";
import React, { createContext, useState, ReactNode } from "react";

interface QuestionContextProps {
	value: string;
	setValue: React.Dispatch<React.SetStateAction<string>>;
}

const QuestionContext = createContext<QuestionContextProps | undefined>(undefined);

interface QuestionProviderProps {
	children: ReactNode;
}

export function QuestionProvider({ children }: QuestionProviderProps) {
	const [value, setValue] = useState("Hello from question context!");
	return (
		<QuestionContext.Provider value={{ value, setValue }}>
			{children}
		</QuestionContext.Provider>
	);
}

export default QuestionContext;

