export async function fetchMessage(): Promise<any[]> {
  const response = await fetch('/sampleComments.jsonl');
  if (!response.ok) {
    throw new Error('Failed to fetch sampleComments.jsonl');
  }
  const data = await response.text();
  console.log(data);
  const messages = data.split('\n').filter(line => line.trim()).map(line => JSON.parse(line));

  const length = messages.length
  const randomIdx = Math.floor(Math.random() * (length - 1));

  console.log(messages[randomIdx].text);
  return messages;
}

