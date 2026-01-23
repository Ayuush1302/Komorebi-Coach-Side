import { X, Video, Image as ImageIcon, Dumbbell } from 'lucide-react';
import { Exercise } from '../../context/DataContext';

interface ExerciseDetailModalProps {
  exercise: Exercise;
  onClose: () => void;
  allExercises: Exercise[];
  onAddToWorkout?: () => void;
}

export default function ExerciseDetailModal({ exercise, onClose, allExercises, onAddToWorkout }: ExerciseDetailModalProps) {
  const alternativeExercises = exercise.alternativeExercises
    ?.map(id => allExercises.find(ex => ex.id === id))
    .filter(Boolean) as Exercise[];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div 
        className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl">{exercise.name}</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="overflow-y-auto p-6 flex-1">
          <div className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Category</p>
                <p className="text-sm font-medium">{exercise.category}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Exercise Type</p>
                <p className="text-sm font-medium">{exercise.exerciseType}</p>
              </div>
            </div>

            {/* Muscles */}
            <div>
              <p className="text-sm text-gray-600 mb-2">Primary Muscle</p>
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                {exercise.primaryMuscle}
              </span>
            </div>

            {exercise.secondaryMuscles && exercise.secondaryMuscles.length > 0 && (
              <div>
                <p className="text-sm text-gray-600 mb-2">Secondary Muscles</p>
                <div className="flex flex-wrap gap-2">
                  {exercise.secondaryMuscles.map((muscle, index) => (
                    <span 
                      key={index} 
                      className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {muscle}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Notes */}
            {exercise.notes && (
              <div>
                <p className="text-sm text-gray-600 mb-2">Notes</p>
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">{exercise.notes}</p>
                </div>
              </div>
            )}

            {/* Media Section */}
            <div className="border-t pt-6">
              <h3 className="text-sm text-gray-700 mb-4">Media</h3>
              
              <div className="space-y-4">
                {/* Video */}
                {exercise.videoUrl ? (
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Video</p>
                    <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                      <Video className="w-12 h-12 text-gray-400" />
                      <p className="ml-2 text-sm text-gray-500">Video available</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6 border-2 border-dashed border-gray-300 rounded-lg">
                    <Video className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">No video available</p>
                  </div>
                )}

                {/* Images */}
                {exercise.images && exercise.images.length > 0 ? (
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Images</p>
                    <div className="grid grid-cols-3 gap-3">
                      {exercise.images.map((img, index) => (
                        <div key={index} className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                          <ImageIcon className="w-8 h-8 text-gray-400" />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6 border-2 border-dashed border-gray-300 rounded-lg">
                    <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">No images available</p>
                  </div>
                )}
              </div>
            </div>

            {/* Alternative Exercises */}
            {alternativeExercises && alternativeExercises.length > 0 && (
              <div className="border-t pt-6">
                <h3 className="text-sm text-gray-700 mb-3">Alternative Exercises</h3>
                <div className="space-y-2">
                  {alternativeExercises.map((alt) => (
                    <div 
                      key={alt.id} 
                      className="p-3 bg-gray-50 border border-gray-200 rounded-lg"
                    >
                      <p className="text-sm font-medium mb-1">{alt.name}</p>
                      <p className="text-xs text-gray-600">{alt.category} • {alt.primaryMuscle}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Custom Exercise Badge */}
            {exercise.isCustom && (
              <div className="border-t pt-6">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                  Custom Exercise
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 p-6 border-t">
          <button
            onClick={onClose}
            className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
          {onAddToWorkout && (
            <button
              onClick={onAddToWorkout}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Add to Workout
            </button>
          )}
        </div>
      </div>
    </div>
  );
}