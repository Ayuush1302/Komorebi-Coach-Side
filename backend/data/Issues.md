# Critical Fix: Athlete Name Extraction - Training Prompt

## Problem Identified

The model is currently extracting **workout descriptions** as athlete names instead of the actual person's name.

### Current Errors:

| Input Sentence | Should Extract | Currently Extracts |
|----------------|----------------|-------------------|
| "Rahul, this Wednesday you are doing triathlon simulation..." | Rahul | ❌ "Simulation" |
| "Sneha, Saturday you are doing race simulation ride..." | Sneha | ❌ "Race" |
| "Amit, Tuesday evening leg day session..." | Amit | ❌ "Leg" |
| "Rohan, Sunday long run 21k..." | Rohan | ❌ "Long" |

---

## Root Cause

The model is picking the **first capitalized word AFTER the comma**, not the name BEFORE the comma.

**Incorrect pattern learned:**
```
[Name], [description] → Extracts "description" as name ❌
```

**Correct pattern should be:**
```
[Name], [description] → Extracts "Name" as name ✅
```

---

## Training Data to Fix This

Learn these 100 patterns where **name comes BEFORE the comma/description**:

### Pattern 1: Name + Comma + Time + Workout
```json
[
  {
    "input": "Rahul, this Wednesday 5am you are doing triathlon simulation",
    "output": {
      "name": "Rahul",
      "workout_type": "triathlon simulation",
      "date": "Wednesday",
      "time": "5am"
    }
  },
  {
    "input": "Sneha, Saturday 5:30am sharp you are doing race simulation ride",
    "output": {
      "name": "Sneha",
      "workout_type": "race simulation",
      "date": "Saturday",
      "time": "5:30am"
    }
  },
  {
    "input": "Amit, Tuesday evening 6pm you are doing leg day session",
    "output": {
      "name": "Amit",
      "workout_type": "leg day",
      "date": "Tuesday",
      "time": "6pm"
    }
  },
  {
    "input": "Priya, tomorrow 7am you are doing pool session",
    "output": {
      "name": "Priya",
      "workout_type": "pool session",
      "date": "tomorrow",
      "time": "7am"
    }
  },
  {
    "input": "Rohan, Sunday 6am sharp you are doing long run",
    "output": {
      "name": "Rohan",
      "workout_type": "long run",
      "date": "Sunday",
      "time": "6am"
    }
  }
]
```

### Pattern 2: Name + Time Reference + "itself" + Workout
```json
[
  {
    "input": "Karan, Thursday 5:45am itself you are doing interval session",
    "output": {
      "name": "Karan",
      "workout_type": "interval session",
      "date": "Thursday",
      "time": "5:45am"
    }
  },
  {
    "input": "Divya, Sunday 6am itself you are doing brick workout",
    "output": {
      "name": "Divya",
      "workout_type": "brick workout",
      "date": "Sunday",
      "time": "6am"
    }
  },
  {
    "input": "Meera, Monday 7pm itself you are doing conditioning session",
    "output": {
      "name": "Meera",
      "workout_type": "conditioning session",
      "date": "Monday",
      "time": "7pm"
    }
  }
]
```

### Pattern 3: Name + "this/tomorrow" + Day + Workout
```json
[
  {
    "input": "Suresh, this Wednesday you are doing tempo run",
    "output": {
      "name": "Suresh",
      "workout_type": "tempo run",
      "date": "this Wednesday"
    }
  },
  {
    "input": "Ananya, tomorrow evening you are doing recovery session",
    "output": {
      "name": "Ananya",
      "workout_type": "recovery session",
      "date": "tomorrow evening"
    }
  }
]
```

---

## Critical Rule to Learn

**ALWAYS extract the word BEFORE the comma as the name, NOT after.**

### Examples of Correct Name Extraction:
```
Input: "Rahul, Wednesday triathlon simulation"
       ↑↑↑↑↑ THIS is the name
              NOT "triathlon" or "simulation"

Input: "Sneha, Saturday race simulation ride"
       ↑↑↑↑↑ THIS is the name
              NOT "race" or "simulation"

Input: "Amit, Tuesday leg day session"
       ↑↑↑↑ THIS is the name
            NOT "leg" or "day"
```

---

## Multi-Activity Parsing (Second Issue)

### Problem: Only extracting first activity

**Input:** "swim 1500m then bike 40k then run 10k"
**Current:** Only extracts swimming ❌
**Should extract:** All 3 activities ✅

### Training Data for Multi-Activity:
```json
[
  {
    "input": "first swim 1500 meters then bike 40 kilometers then run 10k",
    "output": {
      "activities": [
        {
          "type": "swimming",
          "distance": "1500m",
          "order": 1
        },
        {
          "type": "cycling",
          "distance": "40km",
          "order": 2
        },
        {
          "type": "running",
          "distance": "10km",
          "order": 3
        }
      ]
    }
  },
  {
    "input": "swim 2000m at 1:45 per 100m pace, immediately transition to bike 30k at 26 kmph, then straight away run 5k at 5:00 pace",
    "output": {
      "activities": [
        {
          "type": "swimming",
          "distance": "2000m",
          "pace": "1:45/100m",
          "order": 1
        },
        {
          "type": "cycling",
          "distance": "30km",
          "pace": "26 km/h",
          "order": 2,
          "transition": "immediate"
        },
        {
          "type": "running",
          "distance": "5km",
          "pace": "5:00/km",
          "order": 3,
          "transition": "immediate"
        }
      ]
    }
  },
  {
    "input": "bike 30km then immediately run 5km",
    "output": {
      "activities": [
        {
          "type": "cycling",
          "distance": "30km",
          "order": 1
        },
        {
          "type": "running",
          "distance": "5km",
          "order": 2,
          "transition": "immediate"
        }
      ]
    }
  },
  {
    "input": "squats 5x5 at 100kg, then leg press 4x12 at 180kg, Romanian deadlifts 3x8 at 70kg, lunges 3x10 with 20kg dumbbells",
    "output": {
      "activity": "strength",
      "exercises": [
        {
          "name": "squats",
          "sets": 5,
          "reps": 5,
          "weight": "100kg",
          "order": 1
        },
        {
          "name": "leg press",
          "sets": 4,
          "reps": 12,
          "weight": "180kg",
          "order": 2
        },
        {
          "name": "Romanian deadlifts",
          "sets": 3,
          "reps": 8,
          "weight": "70kg",
          "order": 3
        },
        {
          "name": "lunges",
          "sets": 3,
          "reps": 10,
          "weight": "20kg dumbbells",
          "order": 4
        }
      ]
    }
  }
]
```

---

## Complete Attribute Extraction (Third Issue)

### Problem: Missing detailed attributes

**Current:** Basic extraction (distance, time, date)
**Needed:** ALL mentioned attributes

### Training Data for Complete Extraction:
```json
[
  {
    "input": "21 kilometer run at 5:30 pace per km, heart rate below 150, burn 1200 calories, flat road, carry water, marathon preparation",
    "output": {
      "activity": "running",
      "distance": "21km",
      "pace": "5:30/km",
      "heart_rate": "below 150",
      "target_calories": 1200,
      "route_type": "flat road",
      "equipment": "water bottle",
      "notes": "marathon preparation"
    }
  },
  {
    "input": "3000 meters swim, 30 sets of 100m, 20 seconds rest, freestyle stroke, zone 2 heart rate, complete in 75 minutes, heated pool",
    "output": {
      "activity": "swimming",
      "total_distance": "3000m",
      "sets": 30,
      "distance_per_set": "100m",
      "rest": "20 seconds",
      "stroke": "freestyle",
      "heart_rate": "zone 2",
      "target_duration": "75 minutes",
      "location": "heated pool"
    }
  },
  {
    "input": "60k ride, 10k warmup easy, 40k at race pace 30 kmph, 10k cooldown, cadence 85-90 rpm, heart rate zone 3-4, 900 calories, bring 2 gels and electrolyte drink",
    "output": {
      "activity": "cycling",
      "total_distance": "60km",
      "segments": [
        {
          "distance": "10km",
          "intensity": "easy warmup",
          "order": 1
        },
        {
          "distance": "40km",
          "pace": "30 km/h",
          "notes": "race pace",
          "order": 2
        },
        {
          "distance": "10km",
          "intensity": "easy cooldown",
          "order": 3
        }
      ],
      "cadence": "85-90 rpm",
      "heart_rate": "zone 3-4",
      "target_calories": 900,
      "equipment": "2 energy gels, electrolyte drink"
    }
  },
  {
    "input": "interval training 10 times 400 meters at 1:45 per lap, 90 seconds rest, heart rate zone 4 during work zone 2 during rest, total 60 minutes, 600 calories",
    "output": {
      "activity": "running",
      "workout_type": "intervals",
      "sets": 10,
      "distance_per_set": "400m",
      "pace": "1:45/lap",
      "rest": "90 seconds",
      "heart_rate_work": "zone 4",
      "heart_rate_rest": "zone 2",
      "total_duration": "60 minutes",
      "target_calories": 600
    }
  },
  {
    "input": "total target time 3 hours 30 minutes, heart rate not exceeding 160, calorie target 2000, transition time under 3 minutes each",
    "output": {
      "target_time": "3:30 hours",
      "max_heart_rate": 160,
      "target_calories": 2000,
      "transition_time": "under 3 minutes each"
    }
  }
]
```

---

## Key Transition Words to Recognize

Learn these words indicate **multiple activities in sequence**:

- "then" → Next activity
- "followed by" → Next activity
- "immediately" → Next activity, quick transition
- "straight away" → Next activity, quick transition
- "after that" → Next activity
- "first... then... last" → Sequence of 3 activities

---

## Indian English Patterns to Learn

### Pattern: "[Name], [time] itself"
```json
[
  {
    "input": "Priya, tomorrow 7am itself you are doing pool session",
    "output": {"name": "Priya", "time": "7am", "date": "tomorrow"}
  },
  {
    "input": "Rahul, Wednesday 5am itself triathlon simulation",
    "output": {"name": "Rahul", "time": "5am", "date": "Wednesday"}
  }
]
```

### Pattern: "sharp" for exact time
```json
[
  {
    "input": "Saturday 5:30am sharp race simulation",
    "output": {"time": "5:30am", "date": "Saturday", "notes": "exact time"}
  },
  {
    "input": "Tuesday 6pm sharp at the gym",
    "output": {"time": "6pm", "date": "Tuesday", "location": "gym"}
  }
]
```

### Pattern: "[duration] only"
```json
[
  {
    "input": "total session 90 minutes only",
    "output": {"duration": "90 minutes"}
  },
  {
    "input": "complete in 75 minutes only",
    "output": {"target_duration": "75 minutes"}
  }
]
```

---

## Testing Criteria

After training on this data, the model should:

✅ Extract name BEFORE comma correctly (95%+ accuracy)
✅ Parse ALL activities in multi-activity sentences (90%+ accuracy)
✅ Extract ALL mentioned attributes (heart rate, calories, equipment, etc.)
✅ Handle Indian English patterns ("itself", "sharp", "only")
✅ Recognize transition words ("then", "followed by", "immediately")

---

## Validation Examples

Test the model on these after training:
```
Input: "Rahul, Wednesday 5am triathlon simulation"
Expected: name = "Rahul" (NOT "simulation")

Input: "swim 1500m then bike 40k then run 10k"
Expected: 3 activities extracted

Input: "21km at 5:30 pace, heart rate below 150, burn 1200 calories"
Expected: All 4 attributes extracted (distance, pace, HR, calories)

Input: "Amit, Tuesday 6pm itself leg day session"
Expected: name = "Amit" (NOT "leg" or "day")
```

---

## Priority Order

1. **FIX NAME EXTRACTION** (Highest priority - 40% of errors)
2. **FIX MULTI-ACTIVITY PARSING** (High priority - 30% of errors)
3. **FIX COMPLETE ATTRIBUTE EXTRACTION** (Medium priority - 30% of errors)

Train on 200+ examples for each issue to ensure proper learning.