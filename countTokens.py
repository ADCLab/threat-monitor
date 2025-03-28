import os
import json
import tiktoken



def count_tokens(messages, model="gpt-4o-mini"):
    """
    Count the tokens used by a list of messages formatted for a ChatML model.
    This function follows the tokenization guidelines for ChatML as described by OpenAI.
    """
    encoding = tiktoken.encoding_for_model(model)
    tokens_per_message = 4
    tokens_per_name = -1  # If a message has a "name" field, subtract 1 token

    total_tokens = 0
    for message in messages:
        total_tokens += tokens_per_message
        for key, value in message.items():
            total_tokens += len(encoding.encode(value))
            if key == "name":
                total_tokens += tokens_per_name
    total_tokens += 2  # Additional tokens for priming the reply
    return total_tokens



def load_comments(fileName):
    """
    Load comments from the given JSONL file.
    Each line in the file should be a valid JSON object.
    If the JSON object contains a "text" field, only that text is used.
    """
    comments = []
    with open(fileName, "r", encoding="utf-8") as json_file:
        json_list = list(json_file)
    for json_str in json_list:
        result = json.loads(json_str)
        print("\n===== Loaded Comment =====")
        if isinstance(result, dict) and "text" in result:
            comment_text = result["text"]
        else:
            comment_text = str(result)
        print(f"Text: {comment_text}")
        print("==========================\n")
        comments.append(comment_text)

    return comments


def process_file(input_file, output_file):
    comments = load_comments(input_file)

    cumulative_tokens = 0
    cumulative_input_cost = 0.0
    cumulative_output_cost = 0.0
    cumulative_total_cost = 0.0
    results = []

    system_prompt = (
        "You are a message analysis assistant. Your task is to evaluate whether a given message "
        "contains coded language that targets, incites, or supports military action, armed revolt, or civil war "
        "against specific people, persons, or organizations. Use the following rating scale for your evaluation:\n"
        "5: Yes\n"
        "4: Probably\n"
        "3: Unsure\n"
        "2: Probably Not\n"
        "1: No\n\n"
        "When you receive a message, analyze its content and reply ONLY with the final rating number."
    )

    expected_output_tokens = 10

    for idx, comment in enumerate(comments, 1):
        print(f"\n----- Processing Comment #{idx} -----")
        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": comment},
        ]
        tokens_used = count_tokens(messages)
        cumulative_tokens += tokens_used

        cost_input = tokens_used * (0.15 / 1_000_000)
        cost_output = expected_output_tokens * (0.60 / 1_000_000)
        total_cost = cost_input + cost_output

        cumulative_input_cost += cost_input
        cumulative_output_cost += cost_output
        cumulative_total_cost += total_cost

        results.append(
            {
                "comment": comment,
                "tokens_used": tokens_used,
                "cost_input": cost_input,
                "cost_output": cost_output,
                "total_cost": total_cost,
            }
        )

        f"Estimated Output Cost (for {expected_output_tokens} tokens): ${cost_output:.8f}"
        
        print(f"Tokens for Comment #{idx}: {tokens_used}")
        print(f"Estimated Input Cost: ${cost_input:.8f}")
        print(
            f"Estimated Output Cost (for {expected_output_tokens} tokens): ${cost_output:.8f}"
        )
        print(f"Total Estimated Cost for Comment #{idx}: ${total_cost:.8f}")
        print("------------------------------\n")

    output_lines = []
    output_lines.append("===== Processed Results =====\n")
    for idx, res in enumerate(results, 1):
        output_lines.append(f"Comment #{idx}:\n")
        output_lines.append(f"Rating      : N/A\n")
        output_lines.append(f"Content     : {res['comment']}\n")
        output_lines.append(f"Tokens Used : {res['tokens_used']}\n")
        output_lines.append(f"Cost (Input): ${res['cost_input']:.8f}\n")
        output_lines.app
        f"Cumulative Output Cost (assuming {expected_output_tokens} tokens per call): ${cumulative_output_cost:.8f}\n"
    )
    output_lines.append(
        f"Cumulative Total Estimated Cost: ${cumulative_total_cost:.8f}\n"
    
        output_lines.append("------------------------------\n")
    output_lines.append(f"Cumulative Tokens for all comments: {cumulative_tokens}\n")
    output_lines.append(f"Cumulative Input Cost: ${cumulative_input_cost:.8f}\n")
    output_lines.append(

        f"Cumulative Output Cost (assuming {expected_output_tokens} tokens per call): ${cumulative_output_cost:.8f}\n"
    )
    output_lines.append(
        f"Cumulative Total Estimated Cost: ${cumulative_total_cost:.8f}\n"
    )

    with open(output_file, "w", encoding="utf-8") as outfile:
        outfile.write("\n".join(output_lines))


def main():
    input_dir = "comments"

    output_dir = os.path.join("results", "comments")
    os.makedirs(output_dir, exist_ok=True)
        file_index = f"{i:02d}"
        input_file = os.path.join(input_dir, f"comments_{file_index}.jsonl")
        output_file = os.path.join(output_dir, f"output_{file_index}.txt")
        print(f"Processing file: {input_file}")
        process_file(input_file, output_file)
        print(f"Output written to: {output_file}")


if __name__ == "__main__":
    main()
