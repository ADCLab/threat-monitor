import { Message } from "../types/interfaces";

export async function recordRank(
  message: Message,
  rank: number,
): Promise<void> {
  console.log("Recorded response: ", message, rank);
  await fetch("http://localhost:5000/api/recordRank", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      uid: message.uid,
      text: message.text,
      rank: rank,
    }),
  });
}

export async function fetchMessage(): Promise<Message> {
  const response = await fetch("/sampleComments.jsonl");
  if (!response.ok) {
    throw new Error("Failed to fetch sampleComments.jsonl");
  }
  const data = await response.text();
  const messages = data
    .split("\n")
    .filter((line) => line.trim())
    .map((line) => JSON.parse(line));
  const randomIdx = Math.floor(Math.random() * messages.length);
  return messages[randomIdx];
}
