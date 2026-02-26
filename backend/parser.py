import os
import json
import httpx
from datetime import datetime

# ─── Config ──────────────────────────────────────────────────────────────────
GROQ_API_KEY = os.environ.get("GROQ_API_KEY", "")
GROQ_COMPLETIONS_URL = "https://api.groq.com/openai/v1/chat/completions"
# Using GPT OSS 120B (Reasoning Model) for highly intelligent logic extraction
GROQ_MODEL = "openai/gpt-oss-120b"

# --- FINE-TUNING UPGRADE PATH ---
# Once your model is fine-tuned on the `training_data_finetune.jsonl` dataset via the Groq Console,
# uncomment the line below and replace 'YOUR_FINE_TUNED_MODEL_ID' with the generated ID:
# GROQ_MODEL = "YOUR_FINE_TUNED_MODEL_ID"
# --------------------------------

def parse_workout_text(text: str) -> dict:
    """
    Parses natural language workout instructions into structured JSON using Groq LLM.
    Replaces the legacy Regex/spaCy rule-based system.
    """
    if not text or not text.strip():
        return {
            "assignments": [],
            "error": "No instruction provided.",
            "original_text": text
        }
        
    if not GROQ_API_KEY:
        return {
            "assignments": [],
            "error": "GROQ_API_KEY is missing. Cannot parse instructions.",
            "original_text": text
        }

    today_str = datetime.now().strftime("%A, %B %d, %Y")

    system_prompt = f"""You are an expert fitness coach AI assistant. 
Your job is to read natural language workout instructions and extract the details into a STRICT JSON format.

Today's date is: {today_str}. Use this to resolve relative dates like "tomorrow", "this weekend", or "next Monday".

CRITICAL RULES & COMMON PITFALLS TO AVOID:
1. NAME EXTRACTION: The athlete's name is usually the word IMMEDIATELY BEFORE the comma (e.g., "Rahul, doing..." -> Name: Rahul). DO NOT extract words after the comma as the name.
2. MULTI-ACTIVITY: If the user describes multiple distinct sports (e.g., "swim 1500m then bike 40k then run 10k"), you must extract each activity separately into the JSON output. Don't stop at the first one.
3. WORKOUT SEGMENTS: For a single sport with phases (e.g., "10k warmup, 40k race pace, 10k cooldown"), extract all segments properly.
4. METRICS & CONSTRAINTS: Capture exact paces, heart rate ranges (e.g., "zone 3-4", "below 150"), calorie targets, and specific rest durations.
5. CONTEXT & EMPHASIS: Capture notes like "no excuses", "this is race simulation", "flat road only", and "sharp" punctuality.
6. EQUIPMENT/LOGISTICS: Capture mentions of equipment ("knee sleeves", "water bottle", "gels") or meeting points.
7. INDIAN ENGLISH: "7am itself" implies exact/definite time.

OUTPUT SCHEMAS:
Your output MUST be a JSON object containing an "assignments" array and "confidence". You have the flexibility to return a single assignment, or multiple assignments (if there are multiple distinct sports or days).

For each item in "assignments", use this attribute structure (only include keys if found in the text):
[
  {{ "key": "Name", "value": "Athlete Name" }},
  {{ "key": "Activity", "value": "Primary Activity (e.g., Running, Cycling, Swimming, Strength, Yoga)" }},
  {{ "key": "Date", "value": "Formatted Date" }},
  {{ "key": "Time", "value": "Specific time" }},
  {{ "key": "Distance", "value": "e.g., 10 km, 1500 meters" }},
  {{ "key": "Duration", "value": "Total session duration e.g., 90 minutes" }},
  {{ "key": "Pace", "value": "e.g., 5:30/km, 28 km/h" }},
  {{ "key": "Intensity", "value": "Easy, Moderate, Hard, Race Pace, or null" }},
  {{ "key": "Task", "value": "Specific instructions or segments (e.g., 5x1000m intervals, or '10k warmup, 40k main, 10k cooldown')" }},
  {{ "key": "Heart Rate", "value": "e.g., Zone 2, Zone 3-4, Max 160" }},
  {{ "key": "Calories", "value": "e.g., Target 900" }},
  {{ "key": "Rest", "value": "Specific rest instructions e.g., 2 mins between exercises" }},
  {{ "key": "Equipment", "value": "e.g., knee sleeves, belt, 2 energy gels" }},
  {{ "key": "Notes", "value": "e.g., triathlon simulation, no skipping, flat road only" }}
]

FEW-SHOT EXAMPLES:

User: "Rahul, this Wednesday 5am itself you are doing full triathlon simulation, first swim 1500 meters in pool at 1:45 per 100 meters pace, immediately transition to bike 40 kilometers at 28 kmph, then straight away run 10k at 5:15 per km pace, total target time 3 hours 30 minutes, heart rate not exceeding 160 throughout, calorie target 2000, keep transition time under 3 minutes each, this is race day preparation only"
AI:
{{
  "assignments": [
    {{
      "attributes": [
        {{ "key": "Name", "value": "Rahul" }},
        {{ "key": "Activity", "value": "Triathlon / Multi-Sport" }},
        {{ "key": "Date", "value": "Wednesday" }},
        {{ "key": "Time", "value": "5:00 AM" }},
        {{ "key": "Task", "value": "Swim 1500m (1:45/100m) -> Bike 40km (28 kmph) -> Run 10km (5:15/km)" }},
        {{ "key": "Duration", "value": "3 hours 30 minutes" }},
        {{ "key": "Heart Rate", "value": "Max 160" }},
        {{ "key": "Calories", "value": "Target 2000" }},
        {{ "key": "Notes", "value": "triathlon simulation; transition under 3 mins each; race day preparation only; pool location" }}
      ]
    }}
  ],
  "confidence": "High"
}}

User: "Sneha, Saturday 5:30am sharp you are doing race simulation ride, 60 kilometers total, first 10k warmup at easy pace, then 40k at race pace 30 kmph, last 10k cooldown easy, maintain cadence 85 to 90 rpm throughout, heart rate zone 3 to 4, target 900 calories, bring 2 energy gels and electrolyte drink, meet at sports complex gate"
AI:
{{
  "assignments": [
    {{
      "attributes": [
        {{ "key": "Name", "value": "Sneha" }},
        {{ "key": "Activity", "value": "Cycling" }},
        {{ "key": "Date", "value": "Saturday" }},
        {{ "key": "Time", "value": "5:30 AM (sharp)" }},
        {{ "key": "Distance", "value": "60 km total" }},
        {{ "key": "Task", "value": "10k easy warmup -> 40k race pace (30 kmph) -> 10k easy cooldown" }},
        {{ "key": "Heart Rate", "value": "Zone 3-4" }},
        {{ "key": "Calories", "value": "Target 900" }},
        {{ "key": "Equipment", "value": "2 energy gels, electrolyte drink" }},
        {{ "key": "Notes", "value": "race simulation ride; maintain cadence 85-90 rpm; meet at sports complex gate" }}
      ]
    }}
  ],
  "confidence": "High"
}}

User: "Amit, this Tuesday evening 6pm at the gym, squats 5 sets of 5 reps at 100kg, then leg press 4 sets of 12 at 180kg, Romanian deadlifts 3 sets of 8 at 70kg, lunges 3 sets of 10 each leg with 20kg dumbbells, rest 2 minutes between each exercise, total session 90 minutes, bring knee sleeves and belt"
AI:
{{
  "assignments": [
    {{
      "attributes": [
        {{ "key": "Name", "value": "Amit" }},
        {{ "key": "Activity", "value": "Strength Training" }},
        {{ "key": "Date", "value": "Tuesday" }},
        {{ "key": "Time", "value": "6:00 PM" }},
        {{ "key": "Duration", "value": "90 minutes" }},
        {{ "key": "Task", "value": "Squats 5x5@100kg, Leg press 4x12@180kg, RDL 3x8@70kg, Lunges 3x10@20kg dumbbells (each leg)" }},
        {{ "key": "Rest", "value": "2 minutes between each exercise" }},
        {{ "key": "Equipment", "value": "knee sleeves, belt" }},
        {{ "key": "Notes", "value": "at the gym" }}
      ]
    }}
  ],
  "confidence": "High"
}}

User: "Pankaj needs intervals, 12 times 800m with 120 seconds rest, morning 6am"
AI:
{{
  "assignments": [
    {{
      "attributes": [
        {{ "key": "Name", "value": "Pankaj" }},
        {{ "key": "Activity", "value": "Running" }},
        {{ "key": "Time", "value": "6:00 AM" }},
        {{ "key": "Task", "value": "12 x 800m intervals" }},
        {{ "key": "Rest", "value": "120 seconds between sets" }}
      ]
    }}
  ],
  "confidence": "High"
}}

ONLY return the JSON object. Do not explain.
"""

    try:
        # We must use a synchronous HTTPx client because the endpoint expects a sync return
        with httpx.Client(timeout=30.0) as client:
            response = client.post(
                GROQ_COMPLETIONS_URL,
                headers={
                    "Authorization": f"Bearer {GROQ_API_KEY}",
                    "Content-Type": "application/json"
                },
                json={
                    "model": GROQ_MODEL,
                    "messages": [
                        {"role": "system", "content": system_prompt},
                        {"role": "user", "content": f"Parse this instruction:\n\n{text}"}
                    ],
                    "response_format": {"type": "json_object"},
                    "temperature": 1,
                    "max_completion_tokens": 8192,
                    "top_p": 1,
                    "reasoning_effort": "medium"
                }
            )
            
        if response.status_code != 200:
            print(f"Groq API Error: {response.text}")
            return {
                "assignments": [],
                "error": "The AI encountered an error while parsing.",
                "original_text": text
            }
            
        result_content = response.json()["choices"][0]["message"]["content"]
        
        try:
            parsed_json = json.loads(result_content)
        except json.JSONDecodeError:
            print("Failed to decode JSON from Groq:")
            print(result_content)
            return {
                "assignments": [],
                "error": "The AI returned an invalid response format.",
                "original_text": text
            }
            
        # Clean up empty attributes according to legacy parser expectations
        for assignment in parsed_json.get("assignments", []):
            if "attributes" in assignment:
                # Filter out null values except for Name
                assignment["attributes"] = [
                    attr for attr in assignment["attributes"] 
                    if attr.get("value") is not None or attr.get("key") == "Name"
                ]
                
        return {
            "assignments": parsed_json.get("assignments", []),
            "confidence": parsed_json.get("confidence", "Medium"),
            "original_text": text
        }

    except Exception as e:
        print(f"Parsing Exception: {e}")
        return {
            "assignments": [],
            "error": f"Internal parsing error: {str(e)}",
            "original_text": text
        }

