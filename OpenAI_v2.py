import os
import json
import time
import re
import ast
import pprint
from io import StringIO
from dotenv import load_dotenv
from openai import AzureOpenAI
import concurrent.futures

load_dotenv()

api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    raise ValueError(
        "API key is not set. Please set the OPENAI_API_KEY environment variable."
    )

useTokens = True
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
        return "N/A", 0, "Empty comment"

    maxLength = 1000
    maxLengthStop = 2000  # Hard limit: if exceeded, comment is too long
    if len(comment) > maxLengthStop:
        return "N/A", 0, "Comment too long"
    elif len(comment) > maxLength:
        comment = comment[:maxLength]
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
    max_retries = 5
    attempts = 0
    delay = sleep_time
    last_error = "N/A"
    while attempts < max_retries:
        try:
            response = client.chat.completions.create(
                messages=messages, model="gpt-4o-mini", timeout=10
            )
            prompt_tokens, completion_tokens, total_tokens = extract_token_usage(
                getattr(response, "usage", None)
            )
            print("\n===== Token Usage =====", flush=True)
            print(f"Prompt Tokens    : {prompt_tokens}", flush=True)
            print(f"Completion Tokens: {completion_tokens}", flush=True)
            print(f"Total Tokens     : {total_tokens}", flush=True)
            print("=======================\n", flush=True)
            if (
                response.choices
                and hasattr(response.choices[0], "message")
                and response.choices[0].message
                and response.choices[0].message.content
            ):
                rating = response.choices[0].message.content.strip()
                return rating, total_tokens, "N/A"
            else:
                print("Warning: Unexpected response format.", flush=True)
                return "N/A", total_tokens, "Unexpected response format."
        except Exception as e:
            error_str = str(e)
            last_error = error_str
            if "429" in error_str or "Too Many Requests" in error_str:
                attempts += 1
                print(
                    f"Rate limit error encountered. Attempt {attempts}/{max_retries}. Retrying in {delay} seconds...",
                    flush=True,
                )
                time.sleep(delay)
                delay *= 2
                continue
            elif "content_filter" in error_str:
                m = re.search(r"('content_filter_result':\s*\{.*\})", error_str)
                if m:
                    filter_result_str = m.group(1)
                    try:
                        filter_dict = ast.literal_eval(filter_result_str)
                        output = StringIO()
                        pprint.pprint(filter_dict, stream=output)
                        filter_result_str_pretty = output.getvalue()
                    except Exception:
                        filter_result_str_pretty = filter_result_str
                else:
                    filter_result_str_pretty = error_str
                print(
                    "Content filter triggered. Skipping comment with rating N/A.",
                    flush=True,
                )
                return "N/A", 0, filter_result_str_pretty
            else:
                print(f"An unexpected error occurred: {e}", flush=True)
                return "N/A", 0, error_str
    print("Max retries reached. Skipping comment.", flush=True)
    return "N/A", 0, last_error


def load_comments(input_file):
    comments = []
    try:
        with open(input_file, "r") as json_file:
            json_list = list(json_file)
    except FileNotFoundError:
        print(f"Error: File {input_file} not found.")
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


def process_comment(idx, comment, client):
    print(f"\n----- Processing Comment #{idx} -----")
    rating, tokens_used, error_message = analyze_message(client, comment)
    print(f"Rating for Comment #{idx}: {rating}")
    print("------------------------------\n")
    return {
        "rating": rating,
        "comment": comment,
        "tokens_used": tokens_used,
        "error_message": error_message,
        "index": idx,
    }


def process_file(input_file, output_file, client):
    comments = load_comments(input_file)
    if not comments:
        print(f"No valid comments loaded from {input_file}. Exiting.")
        return
    results = []
    cumulative_tokens = 0
    max_workers = min(50, len(comments))
    with concurrent.futures.ThreadPoolExecutor(max_workers=max_workers) as executor:
        future_to_idx = {
            executor.submit(process_comment, idx, comment, client): idx
            for idx, comment in enumerate(comments, 1)
        }
        for future in concurrent.futures.as_completed(future_to_idx):
            try:
                res = future.result()
                results.append(res)
                cumulative_tokens += res["tokens_used"]
            except Exception as e:
                print(f"An error occurred while processing a comment: {e}", flush=True)
    results = sorted(results, key=lambda x: x["index"])
    with open(output_file, "w") as outfile:
        outfile.write("===== Final Results =====\n")
        for res in results:
            outfile.write(f"Comment #{res['index']}:\n")
            outfile.write(f"Rating      : {res['rating']}\n")
            outfile.write(f"Content     : {res['comment']}\n")
            outfile.write(f"Tokens Used : {res['tokens_used']}\n")
            outfile.write(f"Error Msg   : {res['error_message']}\n\n")
        outfile.write(f"===== Total Tokens Used: {cumulative_tokens} =====\n")
    print(f"Finished processing {input_file}. Results written to {output_file}")


def main():
    start_time = time.time()
    client = AzureOpenAI(
        api_key=api_key,
        api_version="2024-08-01-preview",
        azure_endpoint="https://messageanalyzer.openai.azure.com/",
    )
    input_files = [f"comments/comments_0{i}.jsonl" for i in range(2, 7)]
    output_dir = "results/comments"
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
    for input_file in input_files:
        base = os.path.basename(input_file)
        num = base.split("_")[-1].split(".")[0]
        output_file = os.path.join(output_dir, f"output_{num}.txt")
        process_file(input_file, output_file, client)
    elapsed_time = time.time() - start_time
    print(f"Total script runtime: {elapsed_time:.2f} seconds")


if __name__ == "__main__":
    main()
