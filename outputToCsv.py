import csv


def parse_comments(file_content):
    comments = []
    lines = file_content.strip().splitlines()
    i = 0
    while i < len(lines):
        if lines[i].startswith("Comment #"):
            comment_id = lines[i].split("#")[1].replace(":", "").strip()
            rating = lines[i + 1].split(":", 1)[1].strip()
            content = lines[i + 2].split(":", 1)[1].strip()
            tokens = lines[i + 3].split(":", 1)[1].strip()
            comments.append(
                {
                    "Comment ID": comment_id,
                    "Rating": rating,
                    "Content": content,
                    "Tokens Used": tokens,
                }
            )
            i += 4
        else:
            i += 1
    return comments


def main():
    input_file = "testOutput.txt"
    output_file = "output.csv"
    with open(input_file, "r", encoding="utf-8") as f:
        file_content = f.read()
    comments = parse_comments(file_content)
    with open(output_file, "w", newline="", encoding="utf-8") as csvfile:
        fieldnames = ["Comment ID", "Rating", "Tokens Used", "Content"]
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        for comment in comments:
            writer.writerow(comment)


if __name__ == "__main__":
    main()
