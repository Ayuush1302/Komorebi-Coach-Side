import { ArrowLeft, Clock, TrendingUp, Dumbbell } from 'lucide-react';

interface WorkoutDetailPreviewProps {
  workout: {
    id: string;
    name: string;
    duration: number;
    difficulty?: string;
    equipment?: string[];
    exercises?: { name: string; sets: number; reps: string }[];
  };
  day: string;
  onBack: () => void;
  onAddToDay: () => void;
}

export default function WorkoutDetailPreview({ workout, day, onBack, onAddToDay }: WorkoutDetailPreviewProps) {
  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-[#E5E7EB] px-4 py-4 flex items-center gap-3 sticky top-0 z-10">
        <button
          onClick={onBack}
          className="p-2 -ml-2 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-[#1F2937]" />
        </button>
        <h1 className="text-lg font-semibold text-[#1F2937] flex-1">{workout.name}</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-24 overscroll-contain">
        {/* Meta Info Pills */}
        <div className="px-5 pt-4 pb-6 flex flex-wrap gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-[#3B82F6] rounded-full text-sm font-medium">
            <Clock className="w-4 h-4" />
            {workout.duration} min
          </div>
          {workout.difficulty && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 text-orange-600 rounded-full text-sm font-medium">
              <TrendingUp className="w-4 h-4" />
              {workout.difficulty}
            </div>
          )}
          {workout.equipment && workout.equipment.length > 0 && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 text-purple-600 rounded-full text-sm font-medium">
              <Dumbbell className="w-4 h-4" />
              {workout.equipment.length} equipment
            </div>
          )}
        </div>

        {/* Equipment List */}
        {workout.equipment && workout.equipment.length > 0 && (
          <div className="px-5 mb-6">
            <h3 className="text-xs font-medium text-[#6B7280] uppercase tracking-wide mb-3">
              Equipment Needed
            </h3>
            <div className="flex flex-wrap gap-2">
              {workout.equipment.map((item, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 bg-gray-100 text-[#1F2937] text-sm rounded-lg"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Exercises Section */}
        {workout.exercises && workout.exercises.length > 0 && (
          <div className="px-5">
            <h3 className="text-xs font-medium text-[#6B7280] uppercase tracking-wide mb-3">
              Exercises
            </h3>
            <div className="space-y-3">
              {workout.exercises.map((exercise, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-[#E5E7EB] rounded-lg p-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[#3B82F6] text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-[15px] font-semibold text-[#1F2937] mb-1">
                        {exercise.name}
                      </h4>
                      <p className="text-[13px] text-[#6B7280]">
                        {exercise.sets} sets × {exercise.reps} reps
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No exercises fallback */}
        {(!workout.exercises || workout.exercises.length === 0) && (
          <div className="px-5">
            <div className="text-center py-8 text-[#6B7280]">
              <p>No exercise details available</p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Sticky Button - Fixed to bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5E7EB] px-5 py-4 z-20 pb-20">
        <button
          onClick={onAddToDay}
          className="w-full py-3.5 bg-[#3B82F6] text-white text-base font-semibold rounded-lg hover:bg-blue-600 transition-colors shadow-lg"
        >
          Add to {day}
        </button>
      </div>
    </div>
  );
}