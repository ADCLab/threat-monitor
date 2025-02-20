import os
import json
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


def analyze_message(client, comment):
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
    if useTokens:
        response = client.chat.completions.create(
            messages=messages, model="gpt-4o-mini"
        )
        usage_info = response.usage
        prompt_tokens = usage_info.prompt_tokens
        completion_tokens = usage_info.completion_tokens
        total_tokens = usage_info.total_tokens
        print("\n===== Token Usage =====")
        print(f"Prompt Tokens    : {prompt_tokens}")
        print(f"Completion Tokens: {completion_tokens}")
        print(f"Total Tokens     : {total_tokens}")
        print("=======================\n")
        rating = response.choices[0].message.content.strip()
        return rating, total_tokens
    else:
        print("Not using tokens")
        return "N/A", 0


def load_comments():
    comments = []
    with open(fileName, "r") as json_file:
        json_list = list(json_file)[:4]
    for json_str in json_list:
        result = json.loads(json_str)

        print("\n===== Loaded Comment =====")
        print(f"Result: {result}")
        print("==========================\n")
        if isinstance(result, dict) and "text" in result:
            comment_text = result["text"]
        else:
            comment_text = str(result)
        comments.append(comment_text)
    return comments


def main():
    client = AzureOpenAI(
        api_key=api_key,
        api_version="2024-08-01-preview",
        azure_endpoint="https://messageanalyzer.openai.azure.com/",
    )

    comments = load_comments()
    results = []
    cumulative_tokens = 0
    for idx, comment in enumerate(comments, 1):
        print(f"\n----- Processing Comment #{idx} -----")
        try:
            rating, tokens_used = analyze_message(client, comment)
        except Exception as e:
            print(f"An error occurred: {e}")
            rating = "N/A"
            tokens_used = 0
        cumulative_tokens += tokens_used
        results.append(
            {"rating": rating, "comment": comment, "tokens_used": tokens_used}
        )
        print(f"Rating for Comment #{idx}: {rating}")
        print("------------------------------\n")

    # Print final results and token usage
    print("\n===== Final Results =====")
    for idx, res in enumerate(results, 1):
        print(f"Comment #{idx}:")
        print(f"Rating      : {res['rating']}")
        print(f"Content     : {res['comment']}")
        print(f"Tokens Used : {res['tokens_used']}\n")
    print(f"===== Total Tokens Used: {cumulative_tokens} =====")
    print("=========================\n")

    # Write output to a text file
    with open("output.txt", "w") as outfile:
        outfile.write("===== Final Results =====\n")
        for idx, res in enumerate(results, 1):
            outfile.write(f"Comment #{idx}:\n")
            outfile.write(f"Rating      : {res['rating']}\n")
            outfile.write(f"Content     : {res['comment']}\n")
            outfile.write(f"Tokens Used : {res['tokens_used']}\n\n")
        outfile.write(f"===== Total Tokens Used: {cumulative_tokens} =====\n")


if __name__ == "__main__":
    main()
