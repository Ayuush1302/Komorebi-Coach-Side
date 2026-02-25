import { useState } from 'react';
import { X, Check } from 'lucide-react';
import { useData } from '../../context/DataContext';

interface WorkoutSelectionSheetProps {
  exerciseId: string;
  onClose: () => void;
}

export default function WorkoutSelectionSheet({ exerciseId, onClose }: WorkoutSelectionSheetProps) {
  const { workouts, addExerciseToWorkout, removeExerciseFromWorkout } = useData();
  const [workoutsWithExercise, setWorkoutsWithExercise] = useState<string[]>(
    workouts.filter(w => w.exercises.some(e => e.exerciseId === exerciseId)).map(w => w.id)
  );

  const handleToggleWorkout = (workoutId: string) => {
    if (workoutsWithExercise.includes(workoutId)) {
      // Remove exercise from workout
      removeExerciseFromWorkout(workoutId, exerciseId);
      setWorkoutsWithExercise(prev => prev.filter(id => id !== workoutId));
    } else {
      // Add exercise to workout
      addExerciseToWorkout(workoutId, exerciseId);
      setWorkoutsWithExercise(prev => [...prev, workoutId]);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-end justify-center z-50 animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-t-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="text-lg font-medium">Add to Workout</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Workouts List */}
        <div className="overflow-y-auto p-6 flex-1">
          {workouts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No workouts available</p>
              <p className="text-sm text-gray-400">Create a workout first to add exercises</p>
            </div>
          ) : (
            <div className="space-y-3">
              {workouts.map(workout => {
                const isChecked = workoutsWithExercise.includes(workout.id);
                return (
                  <label
                    key={workout.id}
                    className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <div
                      className={`w-5 h-5 border-2 rounded flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                        isChecked ? 'bg-blue-600 border-blue-600' : 'border-gray-300'
                      }`}
                    >
                      {isChecked && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleToggleWorkout(workout.id)}
                      className="hidden"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium mb-1">{workout.name}</p>
                      <p className="text-xs text-gray-500 line-clamp-2">{workout.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-gray-400">
                          {workout.exercises.length} exercise{workout.exercises.length !== 1 ? 's' : ''}
                        </span>
                        {workout.lastEdited && (
                          <>
                            <span className="text-xs text-gray-300">•</span>
                            <span className="text-xs text-gray-400">
                              Edited {workout.lastEdited}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t">
          <button
            onClick={onClose}
            className="w-full px-6 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Done
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
