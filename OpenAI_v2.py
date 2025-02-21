import os
import json
import time
from dotenv import load_dotenv
from openai import AzureOpenAI

load_dotenv()

api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    raise ValueError(
        "API key is not set. Please set the OPENAI_API_KEY environment variable."
    )

useTokens = True
fileName = "sampleComments.jsonl"
sleep_time = 1  # Base sleep time between individual API calls

def extract_token_usage(usage_info):
    if usage_info:
        prompt_tokens = getattr(usage_info, "prompt_tokens", 0)
        completion_tokens = getattr(usage_info, "completion_tokens", 0)
        total_tokens = getattr(usage_info, "total_tokens", 0)
    else:
        prompt_tokens = completion_tokens = total_tokens = 0
    return prompt_tokens, completion_tokens, total_tokens

def analyze_message(client, comment):
    if not comment.strip():
        return "N/A", 0
    messages = [
        {
            "role": "system",
            "content": (
                "You are a message analysis assistant. Your task is to evaluate whether a given message "
                "contains coded language that targets, incites, or supports military action, armed revolt, or civil war "
                "against specific people, persons, or organizations. Use the following rating scale for your evaluation:\n"
                "5: Yes\n"
                "4: Probably\n"
                "3: Unsure\n"
                "2: Probably Not\n"
                "1: No\n\n"
                "When you receive a message, analyze its content and reply ONLY with the final rating number."
            ),
        },
        {"role": "user", "content": comment},
    ]
    max_retries = 3
    attempts = 0
    delay = sleep_time
    while attempts < max_retries:
        try:
            response = client.chat.completions.create(
                messages=messages, model="gpt-4o-mini", timeout=10
            )
            prompt_tokens, completion_tokens, total_tokens = extract_token_usage(
                getattr(response, "usage", None)
            )
            print("\n===== Token Usage =====")
            print(f"Prompt Tokens    : {prompt_tokens}")
            print(f"Completion Tokens: {completion_tokens}")
            print(f"Total Tokens     : {total_tokens}")
            print("=======================\n")
            if (
                response.choices
                and hasattr(response.choices[0], "message")
                and response.choices[0].message
                and response.choices[0].message.content
            ):
                rating = response.choices[0].message.content.strip()
            else:
                print("Warning: Unexpected response format.")
                rating = "N/A"
            return rating, total_tokens
        except Exception as e:
            error_str = str(e)
            if "429" in error_str or "Too Many Requests" in error_str:
                attempts += 1
                print(f"Rate limit error encountered. Attempt {attempts}/{max_retries}. Retrying in {delay} seconds...")
                time.sleep(delay)
                delay *= 2  # Exponential backoff
                continue
            elif "content_filter" in error_str:
                print("Content filter triggered. Skipping comment with rating N/A.")
                return "N/A", 0
            else:
                print(f"An unexpected error occurred: {e}")
                return "N/A", 0
    print("Max retries reached. Skipping comment.")
    return "N/A", 0

def load_comments():
    comments = []
    try:
        with open(fileName, "r") as json_file:
            json_list = list(json_file)[:]
    except FileNotFoundError:
        print(f"Error: File {fileName} not found.")
        return comments
    for line_number, json_str in enumerate(json_list, start=1):
        json_str = json_str.strip()
        if not json_str:
            continue
        try:
            result = json.loads(json_str)
        except json.JSONDecodeError as e:
            print(f"Error decoding JSON on line {line_number}: {e}")
            continue

        print("\n===== Loaded Comment =====")
        print(f"Result: {result}")
        print("==========================\n")
        if isinstance(result, dict) and "text" in result:
            comment_text = result["text"]
        else:
            comment_text = str(result)
        if not comment_text.strip():
            print(f"Warning: Empty comment on line {line_number} skipped.")
            continue
        comments.append(comment_text)
    return comments

def main():
    client = AzureOpenAI(
        api_key=api_key,
        api_version="2024-08-01-preview",
        azure_endpoint="https://messageanalyzer.openai.azure.com/",
    )

    comments = load_comments()
    if not comments:
        print("No valid comments loaded. Exiting.")
        return
    results = []
    cumulative_tokens = 0

    try:
        for idx, comment in enumerate(comments, 1):
            print(f"\n----- Processing Comment #{idx} -----")
            rating, tokens_used = analyze_message(client, comment)
            cumulative_tokens += tokens_used
            results.append(
                {"rating": rating, "comment": comment, "tokens_used": tokens_used}
            )
            print(f"Rating for Comment #{idx}: {rating}")
            print("------------------------------\n")
            time.sleep(sleep_time)  # Sleep between calls to avoid rate limiting
    except KeyboardInterrupt:
        print("Process interrupted by user.")

    print("\n===== Final Results =====")
    for idx, res in enumerate(results, 1):
        print(f"Comment #{idx}:")
        print(f"Rating      : {res['rating']}")
        print(f"Content     : {res['comment']}")
        print(f"Tokens Used : {res['tokens_used']}\n")
    print(f"===== Total Tokens Used: {cumulative_tokens} =====")
    print("=========================\n")

    try:
        with open("output.txt", "w") as outfile:
            outfile.write("===== Final Results =====\n")
            for idx, res in enumerate(results, 1):
                outfile.write(f"Comment #{idx}:\n")
                outfile.write(f"Rating      : {res['rating']}\n")
                outfile.write(f"Content     : {res['comment']}\n")
                outfile.write(f"Tokens Used : {res['tokens_used']}\n\n")
            outfile.write(f"===== Total Tokens Used: {cumulative_tokens} =====\n")
    except Exception as e:
        print(f"Error writing to output file: {e}")

if __name__ == "__main__":
    main()

