import { useState } from "react";
import {
  X,
  Search,
  Plus,
  Filter,
  Clock,
  TrendingUp,
  Dumbbell,
  Activity,
} from "lucide-react";
import WorkoutDetailPreview from "./WorkoutDetailPreview";

interface WorkoutSelectionModalProps {
  day: string;
  onClose: () => void;
  onSelectWorkout: (workout: any) => void;
}

interface Workout {
  id: string;
  name: string;
  category: string;
  exerciseCount: number;
  duration: number;
  type: string;
  difficulty?: string;
  equipment?: string[];
  exercises?: { name: string; sets: number; reps: string }[];
}

export default function WorkoutSelectionModal({
  day,
  onClose,
  onSelectWorkout,
}: WorkoutSelectionModalProps) {
  const [workoutType, setWorkoutType] = useState<
    "sc" | "sports"
  >("sc");
  const [activeTab, setActiveTab] = useState<
    "templates" | "custom"
  >("templates");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedWorkout, setSelectedWorkout] =
    useState<Workout | null>(null);

  const templateWorkouts: Workout[] = [
    {
      id: "1",
      name: "Upper Body Strength",
      category: "UPPER BODY",
      exerciseCount: 8,
      duration: 45,
      type: "Strength",
      difficulty: "Intermediate",
      equipment: ["Barbell", "Dumbbells", "Bench"],
      exercises: [
        { name: "Barbell Bench Press", sets: 4, reps: "8-10" },
        {
          name: "Incline Dumbbell Press",
          sets: 3,
          reps: "10-12",
        },
        { name: "Bent Over Rows", sets: 4, reps: "8-10" },
        { name: "Pull-ups", sets: 3, reps: "To failure" },
        { name: "Overhead Press", sets: 3, reps: "8-10" },
        { name: "Lateral Raises", sets: 3, reps: "12-15" },
        { name: "Tricep Dips", sets: 3, reps: "10-12" },
        { name: "Bicep Curls", sets: 3, reps: "12-15" },
      ],
    },
    {
      id: "2",
      name: "Push Day Power",
      category: "UPPER BODY",
      exerciseCount: 6,
      duration: 50,
      type: "Strength",
      difficulty: "Advanced",
      equipment: ["Barbell", "Dumbbells"],
      exercises: [
        { name: "Bench Press", sets: 5, reps: "5" },
        { name: "Incline Press", sets: 4, reps: "6-8" },
        { name: "Overhead Press", sets: 4, reps: "6-8" },
        { name: "Dips", sets: 3, reps: "8-10" },
        { name: "Tricep Extensions", sets: 3, reps: "10-12" },
        { name: "Lateral Raises", sets: 3, reps: "15-20" },
      ],
    },
    {
      id: "3",
      name: "Lower Body Power",
      category: "LOWER BODY",
      exerciseCount: 6,
      duration: 60,
      type: "Strength",
      difficulty: "Advanced",
      equipment: ["Barbell", "Dumbbells"],
      exercises: [
        { name: "Back Squat", sets: 5, reps: "5" },
        { name: "Romanian Deadlift", sets: 4, reps: "6-8" },
        {
          name: "Bulgarian Split Squat",
          sets: 3,
          reps: "8-10 each",
        },
        { name: "Leg Press", sets: 3, reps: "10-12" },
        { name: "Leg Curls", sets: 3, reps: "12-15" },
        { name: "Calf Raises", sets: 4, reps: "15-20" },
      ],
    },
    {
      id: "4",
      name: "Leg Day Builder",
      category: "LOWER BODY",
      exerciseCount: 7,
      duration: 55,
      type: "Strength",
      difficulty: "Intermediate",
      equipment: ["Barbell", "Dumbbells", "Leg Press"],
      exercises: [
        { name: "Front Squat", sets: 4, reps: "8-10" },
        { name: "Deadlift", sets: 4, reps: "6-8" },
        { name: "Walking Lunges", sets: 3, reps: "12 each" },
        { name: "Leg Extensions", sets: 3, reps: "12-15" },
        { name: "Hamstring Curls", sets: 3, reps: "12-15" },
        { name: "Hip Thrusts", sets: 3, reps: "10-12" },
        {
          name: "Standing Calf Raises",
          sets: 4,
          reps: "15-20",
        },
      ],
    },
    {
      id: "5",
      name: "Full Body Blast",
      category: "FULL BODY",
      exerciseCount: 8,
      duration: 50,
      type: "Strength",
      difficulty: "Intermediate",
      equipment: ["Barbell", "Dumbbells"],
      exercises: [
        { name: "Squat", sets: 4, reps: "8-10" },
        { name: "Bench Press", sets: 4, reps: "8-10" },
        { name: "Deadlift", sets: 3, reps: "6-8" },
        { name: "Pull-ups", sets: 3, reps: "To failure" },
        { name: "Overhead Press", sets: 3, reps: "8-10" },
        { name: "Rows", sets: 3, reps: "10-12" },
        { name: "Lunges", sets: 3, reps: "10 each" },
        { name: "Planks", sets: 3, reps: "60 sec" },
      ],
    },
    {
      id: "6",
      name: "Total Body Conditioning",
      category: "FULL BODY",
      exerciseCount: 6,
      duration: 40,
      type: "Strength",
      difficulty: "Beginner",
      equipment: ["Dumbbells"],
      exercises: [
        { name: "Goblet Squat", sets: 3, reps: "12-15" },
        { name: "Dumbbell Press", sets: 3, reps: "10-12" },
        { name: "Dumbbell Rows", sets: 3, reps: "12 each" },
        { name: "Shoulder Press", sets: 3, reps: "10-12" },
        { name: "Romanian Deadlift", sets: 3, reps: "12-15" },
        { name: "Plank", sets: 3, reps: "45 sec" },
      ],
    },
    {
      id: "7",
      name: "Core & Abs Focus",
      category: "CORE",
      exerciseCount: 8,
      duration: 30,
      type: "Strength",
      difficulty: "All Levels",
      equipment: ["Bodyweight", "Ab Wheel"],
      exercises: [
        { name: "Plank", sets: 3, reps: "60 sec" },
        { name: "Russian Twists", sets: 3, reps: "20 each" },
        { name: "Leg Raises", sets: 3, reps: "15" },
        { name: "Bicycle Crunches", sets: 3, reps: "20 each" },
        { name: "Ab Wheel Rollouts", sets: 3, reps: "10-12" },
        { name: "Mountain Climbers", sets: 3, reps: "30 sec" },
        { name: "Side Planks", sets: 3, reps: "45 sec each" },
        { name: "Dead Bug", sets: 3, reps: "12 each" },
      ],
    },
    {
      id: "8",
      name: "Stability & Balance",
      category: "CORE",
      exerciseCount: 6,
      duration: 25,
      type: "Strength",
      difficulty: "Beginner",
      equipment: ["Stability Ball"],
      exercises: [
        { name: "Ball Plank", sets: 3, reps: "45 sec" },
        { name: "Ball Crunches", sets: 3, reps: "15-20" },
        { name: "Ball Pike", sets: 3, reps: "10-12" },
        { name: "Bird Dogs", sets: 3, reps: "12 each" },
        {
          name: "Single Leg Deadlift",
          sets: 3,
          reps: "10 each",
        },
        { name: "Pallof Press", sets: 3, reps: "12 each" },
      ],
    },
  ];

  // Recently Used S&C Workouts
  const recentSCWorkouts = [
    {
      id: "1",
      name: "Upper Body Strength",
      exerciseCount: 8,
      duration: 45,
      type: "Strength",
    },
    {
      id: "3",
      name: "Lower Body Power",
      exerciseCount: 6,
      duration: 60,
      type: "Strength",
    },
  ];

  // Recently Used Sports Workouts
  const recentSportsWorkouts = [
    {
      id: "s1",
      name: "5K Easy Run",
      exerciseCount: 1,
      duration: 30,
      type: "Cardio",
    },
    {
      id: "s4",
      name: "Zone 2 Cycling",
      exerciseCount: 1,
      duration: 60,
      type: "Cardio",
    },
  ];

  const customWorkouts: Workout[] = [
    {
      id: "c1",
      name: "My Custom Push Day",
      category: "UPPER BODY",
      exerciseCount: 7,
      duration: 50,
      type: "Strength",
    },
    {
      id: "c2",
      name: "Custom Leg Builder",
      category: "LOWER BODY",
      exerciseCount: 6,
      duration: 55,
      type: "Strength",
    },
  ];

  // Sports Workouts (Cardio/Conditioning)
  const sportsTemplateWorkouts: Workout[] = [
    {
      id: "s1",
      name: "5K Easy Run",
      category: "RUNNING",
      exerciseCount: 1,
      duration: 30,
      type: "Cardio",
      difficulty: "Beginner",
      equipment: ["Running Shoes"],
    },
    {
      id: "s2",
      name: "10K Tempo Run",
      category: "RUNNING",
      exerciseCount: 1,
      duration: 50,
      type: "Cardio",
      difficulty: "Intermediate",
      equipment: ["Running Shoes"],
    },
    {
      id: "s3",
      name: "Interval Training",
      category: "RUNNING",
      exerciseCount: 1,
      duration: 40,
      type: "Cardio",
      difficulty: "Advanced",
      equipment: ["Running Shoes", "Track"],
    },
    {
      id: "s4",
      name: "Zone 2 Cycling",
      category: "CYCLING",
      exerciseCount: 1,
      duration: 60,
      type: "Cardio",
      difficulty: "All Levels",
      equipment: ["Bike"],
    },
    {
      id: "s5",
      name: "Hill Climb Session",
      category: "CYCLING",
      exerciseCount: 1,
      duration: 45,
      type: "Cardio",
      difficulty: "Advanced",
      equipment: ["Bike"],
    },
    {
      id: "s6",
      name: "Sprint Intervals Bike",
      category: "CYCLING",
      exerciseCount: 1,
      duration: 30,
      type: "Cardio",
      difficulty: "Intermediate",
      equipment: ["Bike"],
    },
    {
      id: "s7",
      name: "Lap Swimming 2000m",
      category: "SWIMMING",
      exerciseCount: 1,
      duration: 45,
      type: "Cardio",
      difficulty: "Intermediate",
      equipment: ["Pool"],
    },
    {
      id: "s8",
      name: "HIIT Swimming",
      category: "SWIMMING",
      exerciseCount: 1,
      duration: 30,
      type: "Cardio",
      difficulty: "Advanced",
      equipment: ["Pool"],
    },
    {
      id: "s9",
      name: "Rowing 5K Steady",
      category: "ROWING",
      exerciseCount: 1,
      duration: 25,
      type: "Cardio",
      difficulty: "Beginner",
      equipment: ["Rowing Machine"],
    },
    {
      id: "s10",
      name: "Rowing Intervals",
      category: "ROWING",
      exerciseCount: 1,
      duration: 35,
      type: "Cardio",
      difficulty: "Intermediate",
      equipment: ["Rowing Machine"],
    },
  ];

  const sportsCustomWorkouts: Workout[] = [
    {
      id: "sc1",
      name: "My Marathon Training Run",
      category: "RUNNING",
      exerciseCount: 1,
      duration: 90,
      type: "Cardio",
    },
  ];

  const workouts =
    workoutType === "sc"
      ? activeTab === "templates"
        ? templateWorkouts
        : customWorkouts
      : activeTab === "templates"
        ? sportsTemplateWorkouts
        : sportsCustomWorkouts;

  const filteredWorkouts = workouts.filter((w) =>
    w.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const groupedWorkouts = filteredWorkouts.reduce(
    (acc, workout) => {
      if (!acc[workout.category]) {
        acc[workout.category] = [];
      }
      acc[workout.category].push(workout);
      return acc;
    },
    {} as Record<string, Workout[]>,
  );

  const handleWorkoutClick = (workout: Workout) => {
    setSelectedWorkout(workout);
  };

  if (selectedWorkout) {
    return (
      <WorkoutDetailPreview
        workout={selectedWorkout}
        day={day}
        onBack={() => setSelectedWorkout(null)}
        onAddToDay={() => onSelectWorkout(selectedWorkout)}
      />
    );
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 animate-fade-in"
        onClick={onClose}
      />

      {/* Bottom Sheet */}
      <div
        className="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-3xl shadow-2xl animate-slide-up flex flex-col"
        style={{ height: "85vh", maxHeight: "85vh" }}
      >
        {/* Drag Handle */}
        <div className="flex justify-center pt-3 pb-2 flex-shrink-0">
          <div className="w-10 h-1 bg-gray-300 rounded-full" />
        </div>

        {/* Header */}
        <div className="px-5 pt-2 pb-4 border-b border-[#E5E7EB] flex-shrink-0">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[#1F2937]">
              Add Workout to {day}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-[#6B7280]" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
            <input
              type="text"
              placeholder="Search workouts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#F8F9FA] border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
            />
          </div>

          {/* Workout Type Toggle */}
          <div className="flex gap-2 mb-4 bg-[#F8F9FA] p-1 rounded-lg">
            <button
              onClick={() => setWorkoutType("sc")}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                workoutType === "sc"
                  ? "bg-white text-[#1F2937] shadow-sm"
                  : "text-[#6B7280] hover:text-[#1F2937]"
              }`}
            >
              <Dumbbell className="w-4 h-4" />
              S&C Workouts
            </button>
            <button
              onClick={() => setWorkoutType("sports")}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                workoutType === "sports"
                  ? "bg-white text-[#1F2937] shadow-sm"
                  : "text-[#6B7280] hover:text-[#1F2937]"
              }`}
            >
              <Activity className="w-4 h-4" />
              Sports Workouts
            </button>
          </div>

          {/* Tab Switcher */}
          <div className="flex gap-6 relative">
            <button
              onClick={() => setActiveTab("templates")}
              className={`pb-2 text-sm font-medium transition-colors relative ${
                activeTab === "templates"
                  ? "text-[#3B82F6]"
                  : "text-[#6B7280]"
              }`}
            >
              📚 Templates
              {activeTab === "templates" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3B82F6]" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("custom")}
              className={`pb-2 text-sm font-medium transition-colors relative ${
                activeTab === "custom"
                  ? "text-[#3B82F6]"
                  : "text-[#6B7280]"
              }`}
            >
              My Custom ⭐
              {activeTab === "custom" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3B82F6]" />
              )}
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-5 py-4 overscroll-contain">
          {/* Recently Used Section */}
          {activeTab === "templates" && searchQuery === "" && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-[#6B7280]" />
                <h3 className="text-xs font-medium text-[#6B7280] uppercase tracking-wide">
                  Recently Used
                </h3>
              </div>
              <div className="space-y-2">
                {workoutType === "sc"
                  ? recentSCWorkouts.map((workout) => (
                      <div
                        key={workout.id}
                        onClick={() => {
                          const fullWorkout =
                            templateWorkouts.find(
                              (w) => w.id === workout.id,
                            );
                          if (fullWorkout)
                            handleWorkoutClick(fullWorkout);
                        }}
                        className="bg-white border border-[#E5E7EB] rounded-lg p-3 flex items-center justify-between hover:border-[#3B82F6] hover:shadow-sm transition-all cursor-pointer active:scale-[0.98]"
                      >
                        <div>
                          <h4 className="text-[15px] font-semibold text-[#1F2937] mb-0.5">
                            {workout.name}
                          </h4>
                          <p className="text-sm text-[#6B7280]">
                            {workout.exerciseCount} exercises •{" "}
                            {workout.duration} min
                          </p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const fullWorkout =
                              templateWorkouts.find(
                                (w) => w.id === workout.id,
                              );
                            if (fullWorkout)
                              onSelectWorkout(fullWorkout);
                          }}
                          className="w-8 h-8 border-2 border-[#3B82F6] text-[#3B82F6] rounded-full flex items-center justify-center hover:bg-[#3B82F6] hover:text-white transition-colors flex-shrink-0"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  : recentSportsWorkouts.map((workout) => (
                      <div
                        key={workout.id}
                        onClick={() => {
                          const fullWorkout =
                            sportsTemplateWorkouts.find(
                              (w) => w.id === workout.id,
                            );
                          if (fullWorkout)
                            handleWorkoutClick(fullWorkout);
                        }}
                        className="bg-white border border-[#E5E7EB] rounded-lg p-3 flex items-center justify-between hover:border-[#3B82F6] hover:shadow-sm transition-all cursor-pointer active:scale-[0.98]"
                      >
                        <div>
                          <h4 className="text-[15px] font-semibold text-[#1F2937] mb-0.5">
                            {workout.name}
                          </h4>
                          <p className="text-sm text-[#6B7280]">
                            {workout.exerciseCount} exercises •{" "}
                            {workout.duration} min
                          </p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const fullWorkout =
                              sportsTemplateWorkouts.find(
                                (w) => w.id === workout.id,
                              );
                            if (fullWorkout)
                              onSelectWorkout(fullWorkout);
                          }}
                          className="w-8 h-8 border-2 border-[#3B82F6] text-[#3B82F6] rounded-full flex items-center justify-center hover:bg-[#3B82F6] hover:text-white transition-colors flex-shrink-0"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
              </div>
            </div>
          )}

          {/* Categorized Workouts */}
          {Object.entries(groupedWorkouts).map(
            ([category, categoryWorkouts]) => (
              <div key={category} className="mb-6">
                <h3 className="text-xs font-medium text-[#6B7280] uppercase tracking-wide mb-3">
                  {category}
                </h3>
                <div className="space-y-2">
                  {categoryWorkouts.map((workout) => (
                    <div
                      key={workout.id}
                      onClick={() =>
                        handleWorkoutClick(workout)
                      }
                      className="bg-white border border-[#E5E7EB] rounded-lg p-3 flex items-center justify-between hover:border-[#3B82F6] hover:shadow-sm transition-all cursor-pointer active:scale-[0.98]"
                    >
                      <div className="flex-1 min-w-0">
                        <h4 className="text-base font-semibold text-[#1F2937] mb-0.5">
                          {workout.name}
                        </h4>
                        <p className="text-sm text-[#6B7280]">
                          {workout.exerciseCount} exercises •{" "}
                          {workout.duration} min
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectWorkout(workout);
                        }}
                        className="w-8 h-8 border-2 border-[#3B82F6] text-[#3B82F6] rounded-full flex items-center justify-center hover:bg-[#3B82F6] hover:text-white transition-colors flex-shrink-0 ml-3"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ),
          )}

          {filteredWorkouts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[#6B7280]">
                No workouts found
              </p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
}