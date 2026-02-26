import os
import json
import csv

# We structure the fine-tuning data to match our few-shot parser's EXACT system prompt
SYSTEM_PROMPT = """You are an expert fitness coach AI assistant. 
Your job is to read natural language workout instructions and extract the details into a STRICT JSON format.

CRITICAL RULES & COMMON PITFALLS TO AVOID:
1. NAME EXTRACTION: The athlete's name is usually the word IMMEDIATELY BEFORE the comma. DO NOT extract words after the comma as the name.
2. MULTI-ACTIVITY: If the user describes multiple distinct sports, extract each activity separately.
3. WORKOUT SEGMENTS: For a single sport with phases, extract all segments properly.
4. METRICS & CONSTRAINTS: Capture exact paces, heart rate ranges, calorie targets, and specific rest durations.
5. CONTEXT & EMPHASIS: Capture notes like "no excuses", "this is race simulation", "flat road only", and "sharp" punctuality.
6. EQUIPMENT/LOGISTICS: Capture mentions of equipment ("knee sleeves", "water bottle", "gels") or meeting points.
7. INDIAN ENGLISH: "7am itself" implies exact/definite time.

OUTPUT SCHEMAS:
Your output MUST be a JSON object containing an "assignments" array and "confidence" based on these exact key-value pairs:
Name, Activity, Date, Time, Distance, Duration, Pace, Intensity, Task, Heart Rate, Calories, Rest, Equipment, Notes."""

def format_openai_message(user_input, assistant_output):
    """Formats a row into OpenAI's strict JSONL training format."""
    return {
        "messages": [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": f"Parse this instruction:\n\n{user_input}"},
            {"role": "assistant", "content": json.dumps(assistant_output)}
        ]
    }

def process_csv(filepath, input_col="Coach Input", output_col="Parsed Output (JSON)"):
    messages = []
    print(f"Processing CSV: {filepath}")
    with open(filepath, mode="r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            try:
                user_msg = row[input_col].strip()
                # Some datasets might have messy JSON formatting from older iterations, 
                # we attempt to parse it cleanly.
                ast_msg = json.loads(row[output_col])
                messages.append(format_openai_message(user_msg, ast_msg))
            except Exception as e:
                # print(f"Skipping malformed row: {e}")
                pass
    return messages

def main():
    data_dir = "data"
    output_file = "training_data_finetune.jsonl"
    all_training_examples = []
    
    # 1. Names Dataset
    names_csv = os.path.join(data_dir, "Name Pattern.csv")
    if os.path.exists(names_csv):
        all_training_examples.extend(process_csv(names_csv))
        
    # 2. Main 900+ Comprehensive Dataset
    comprehensive_csv = os.path.join(data_dir, "comprehensive_training_dataset_randomized_900.csv")
    if os.path.exists(comprehensive_csv):
        all_training_examples.extend(process_csv(comprehensive_csv, input_col="Coach Input", output_col="Parsed Output (JSON)"))
        
    # 3. Gap Filling Dataset (JSON)
    gap_json = os.path.join(data_dir, "gap_filling_dataset.json")
    if os.path.exists(gap_json):
        print(f"Processing JSON: {gap_json}")
        with open(gap_json, "r", encoding="utf-8") as f:
            try:
                gap_data = json.load(f)
                for item in gap_data:
                    # gap_filling format usually has "input" and "output"
                    if "input" in item and "output" in item:
                        all_training_examples.append(format_openai_message(item["input"], item["output"]))
            except Exception as e:
                print(f"Error parsing gap_filling JSON: {e}")
                
    # 4. Issue2.md Embedded JSON parsing
    issue_md = os.path.join(data_dir, "Issue2.md")
    if os.path.exists(issue_md):
        print(f"Processing Markdown: {issue_md}")
        import re
        with open(issue_md, "r", encoding="utf-8") as f:
            content = f.read()
            # Find all JSON code blocks
            json_blocks = re.findall(r'```json\n(.*?)```', content, re.DOTALL)
            for block in json_blocks:
                try:
                    parsed_block = json.loads(block)
                    # Block might be a list of examples or a single example dict
                    if isinstance(parsed_block, list):
                        for item in parsed_block:
                            if "input" in item and "output" in item:
                                all_training_examples.append(format_openai_message(item["input"], item["output"]))
                    elif isinstance(parsed_block, dict):
                        if "input" in parsed_block and "output" in parsed_block:
                            all_training_examples.append(format_openai_message(parsed_block["input"], parsed_block["output"]))
                except Exception:
                    pass
        
    # Write to final JSONL
    print(f"\\nWriting {len(all_training_examples)} strict structured examples to {output_file}...")
    with open(output_file, "w", encoding="utf-8") as out:
        for ex in all_training_examples:
            out.write(json.dumps(ex) + "\\n")
            
    print(f"\\nSUCCESS! 🎉 Your fine-tuning payload is ready at {output_file}.")
    print("Because your dataset is large, fine-tuning an open-source model like Llama-3-8B or GPT-4o-mini will make it incredibly accurate without needing massive prompts.")

if __name__ == "__main__":
    main()
