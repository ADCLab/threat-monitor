# OutputToCsv.py
import re
import csv
import ast


def extract_balanced_braces(s):
    """
    Extracts a balanced substring starting from the first '{' in s.
    Returns the substring containing balanced braces or None if not found.
    """
    start = s.find("{")
    if start == -1:
        return None
    count = 0
    for i in range(start, len(s)):
        if s[i] == "{":
            count += 1
        elif s[i] == "}":
            count -= 1
            if count == 0:
                return s[start : i + 1]
    return None


def parse_error_message(error_msg):
    """
    Parses the error message field.
    If the error message is not "N/A", it removes any extraneous prefix
    and then extracts a balanced dictionary substring.
    It returns a dictionary with keys for each filter's filtered status,
    severity, and for jailbreak, a detected flag.
    """
    # Define expected filters.
    filters = ["hate", "jailbreak", "self_harm", "sexual", "violence"]
    # Initialize default values.
    error_data = {f"{f}_filtered": "N/A" for f in filters}
    error_data.update({f"{f}_severity": "N/A" for f in filters})
    error_data["jailbreak_detected"] = "N/A"

    if error_msg.strip() == "N/A":
        return error_data

    # Remove a possible prefix like "'content_filter_result':"
    prefix_pattern = r"^\s*'?content_filter_result'?\s*:\s*"
    error_msg_clean = re.sub(prefix_pattern, "", error_msg)

    # Extract a balanced dictionary substring from error_msg_clean.
    dict_str = extract_balanced_braces(error_msg_clean)
    if not dict_str:
        return error_data
    try:
        error_dict = ast.literal_eval(dict_str)
    except Exception as e:
        error_dict = {}

    # Update error_data with the values from the error_dict.
    for f in filters:
        if f in error_dict:
            filter_info = error_dict[f]
            error_data[f + "_filtered"] = str(filter_info.get("filtered", "N/A"))
            error_data[f + "_severity"] = filter_info.get("severity", "N/A")
            if f == "jailbreak":
                error_data[f + "_detected"] = str(filter_info.get("detected", "N/A"))
    return error_data


def parse_comments(file_content):
    # Regex to capture each comment block with its fields.
    pattern = re.compile(
        r"Comment\s+#(?P<comment_id>\d+):\s*"
        r"Rating\s*:\s*(?P<rating>.+?)\s*"
        r"Content\s*:\s*(?P<content>.+?)\s*"
        r"Tokens Used\s*:\s*(?P<tokens>.+?)\s*"
        r"Error Msg\s*:\s*(?P<error_msg>.+?)(?=\nComment\s+#|\Z)",
        re.DOTALL,
    )
    comments = []
    for match in pattern.finditer(file_content):
        groups = match.groupdict()
        base_comment = {
            "Comment ID": groups["comment_id"].strip(),
            "Rating": groups["rating"].strip(),
            "Content": groups["content"].strip(),
            "Tokens Used": groups["tokens"].strip(),
        }
        error_msg = groups["error_msg"].strip()
        # Break down the error message into filter details.
        error_details = parse_error_message(error_msg)
        base_comment.update(error_details)
        comments.append(base_comment)
    return comments


def main():
    input_file = "./results/comments/output_05.txt"
    output_file = "./results/comments/output_05.csv"
    with open(input_file, "r", encoding="utf-8") as f:
        file_content = f.read()
    comments = parse_comments(file_content)

    # Define CSV columns, including new error detail columns.
    fieldnames = [
        "Comment ID",
        "Rating",
        "Tokens Used",
        "Content",
        "hate_filtered",
        "hate_severity",
        "jailbreak_filtered",
        "jailbreak_detected",
        "jailbreak_severity",
        "self_harm_filtered",
        "self_harm_severity",
        "sexual_filtered",
        "sexual_severity",
        "violence_filtered",
        "violence_severity",
    ]
    with open(output_file, "w", newline="", encoding="utf-8") as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        for comment in comments:
            writer.writerow(comment)


if __name__ == "__main__":
    main()
