import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';

import ExerciseDetailModal from './ExerciseDetailModal';
import WorkoutSelectionSheet from './WorkoutSelectionSheet';
import { Plus, Search, Filter, Edit } from 'lucide-react';

interface ExercisesProps {
  embedded?: boolean;
}

export default function Exercises({ embedded = false }: ExercisesProps) {
  const [activeTab, setActiveTab] = useState<'exercises' | 'custom'>('custom');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [muscleFilter, setMuscleFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [customSearchTerm, setCustomSearchTerm] = useState('');
  const [customCategoryFilter, setCustomCategoryFilter] = useState('');
  const [customMuscleFilter, setCustomMuscleFilter] = useState('');
  const [customTypeFilter, setCustomTypeFilter] = useState('');
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);
  const [showWorkoutSheet, setShowWorkoutSheet] = useState(false);
  const [exerciseForWorkout, setExerciseForWorkout] = useState<string | null>(null);
  const { exercises, customExercises } = useData();
  const navigate = useNavigate();

  const allExercises = [...exercises, ...customExercises];

  const categories = ['All', 'Abs', 'Barbell', 'Bodyweight', 'Cables', 'Dumbbell', 'Machine'];
  const muscles = ['All', 'Chest', 'Back', 'Quads', 'Hamstrings', 'Glutes', 'Calves', 'Shoulders', 'Biceps', 'Triceps', 'Core'];
  const types = ['All', 'Strength', 'Powerlifting', 'Plyometrics', 'Conditioning', 'Stretching'];

  const filteredExercises = (activeTab === 'custom' ? customExercises : exercises).filter(ex => {
    const searchValue = activeTab === 'custom' ? customSearchTerm : searchTerm;
    const categoryValue = activeTab === 'custom' ? customCategoryFilter : categoryFilter;
    const muscleValue = activeTab === 'custom' ? customMuscleFilter : muscleFilter;
    const typeValue = activeTab === 'custom' ? customTypeFilter : typeFilter;

    const matchesSearch = ex.name.toLowerCase().includes(searchValue.toLowerCase());
    const matchesCategory = !categoryValue || categoryValue === 'All' || ex.category === categoryValue;
    const matchesMuscle = !muscleValue || muscleValue === 'All' || ex.primaryMuscle === muscleValue;
    const matchesType = !typeValue || typeValue === 'All' || ex.exerciseType === typeValue;
    return matchesSearch && matchesCategory && matchesMuscle && matchesType;
  });

  const toggleExerciseSelection = (id: string) => {
    setSelectedExercise(prev =>
      prev === id ? null : id
    );
  };

  const content = (
    <>
      <div className="max-w-7xl mx-auto">
        {!embedded && (
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl">Exercises</h1>
          </div>
        )}

        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab('custom')}
                className={`px-6 py-3 text-sm transition-colors ${activeTab === 'custom'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
                  }`}
              >
                Custom Exercises
              </button>
              <button
                onClick={() => setActiveTab('exercises')}
                className={`px-6 py-3 text-sm transition-colors ${activeTab === 'exercises'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
                  }`}
              >
                Exercise Library
              </button>
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'custom' ? (
              <>
                {customExercises.length === 0 ? (
                  <div className="text-center py-16">
                    <p className="text-gray-500 mb-6">You haven't created any custom exercises yet</p>
                    <button
                      onClick={() => navigate('/exercises/create')}
                      className="px-6 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Create Exercise
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="mb-6 space-y-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          value={customSearchTerm}
                          onChange={(e) => setCustomSearchTerm(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Search custom exercises..."
                        />
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <div className="flex items-center gap-2">
                          <Filter className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-700">Category:</span>
                          <select
                            value={customCategoryFilter}
                            onChange={(e) => setCustomCategoryFilter(e.target.value)}
                            className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            {categories.map(cat => (
                              <option key={cat} value={cat === 'All' ? '' : cat}>{cat}</option>
                            ))}
                          </select>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-700">Muscle:</span>
                          <select
                            value={customMuscleFilter}
                            onChange={(e) => setCustomMuscleFilter(e.target.value)}
                            className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            {muscles.map(muscle => (
                              <option key={muscle} value={muscle === 'All' ? '' : muscle}>{muscle}</option>
                            ))}
                          </select>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-700">Type:</span>
                          <select
                            value={customTypeFilter}
                            onChange={(e) => setCustomTypeFilter(e.target.value)}
                            className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            {types.map(type => (
                              <option key={type} value={type === 'All' ? '' : type}>{type}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {filteredExercises.map(ex => (
                        <div
                          key={ex.id}
                          className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-start justify-between cursor-pointer"
                          onClick={() => setSelectedExercise(ex.id)}
                        >
                          <div className="flex-1">
                            <p className="text-sm mb-1">{ex.name}</p>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded">Custom</span>
                              <span>•</span>
                              <span>{ex.category}</span>
                              <span>•</span>
                              <span>{ex.primaryMuscle}</span>
                            </div>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/exercises/edit/${ex.id}`);
                            }}
                            className="p-2 hover:bg-blue-100 rounded-md transition-colors text-blue-600"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : (
              <>
                <div className="mb-6 space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Search exercises..."
                    />
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2">
                      <Filter className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-700">Category:</span>
                      <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {categories.map(cat => (
                          <option key={cat} value={cat === 'All' ? '' : cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-700">Muscle:</span>
                      <select
                        value={muscleFilter}
                        onChange={(e) => setMuscleFilter(e.target.value)}
                        className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {muscles.map(muscle => (
                          <option key={muscle} value={muscle === 'All' ? '' : muscle}>{muscle}</option>
                        ))}
                      </select>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-700">Type:</span>
                      <select
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                        className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {types.map(type => (
                          <option key={type} value={type === 'All' ? '' : type}>{type}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  {filteredExercises.map(ex => (
                    <div
                      key={ex.id}
                      onClick={() => setSelectedExercise(ex.id)}
                      className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <div className="flex-1">
                        <p className="text-sm mb-1">{ex.name}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span className="px-2 py-0.5 bg-gray-100 rounded">{ex.category}</span>
                          <span>•</span>
                          <span>{ex.primaryMuscle}</span>
                          <span>•</span>
                          <span>{ex.exerciseType}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {activeTab === 'custom' && (
          <button
            onClick={() => navigate('/exercises/create')}
            className="fixed bottom-24 md:bottom-8 right-8 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all flex items-center justify-center hover:scale-110"
          >
            <Plus className="w-6 h-6" />
          </button>
        )}
      </div>

      {selectedExercise && (() => {
        const exercise = allExercises.find(ex => ex.id === selectedExercise);
        return exercise ? (
          <ExerciseDetailModal
            exercise={exercise}
            allExercises={allExercises}
            onClose={() => setSelectedExercise(null)}
            onAddToWorkout={() => {
              setExerciseForWorkout(selectedExercise);
              setShowWorkoutSheet(true);
            }}
          />
        ) : null;
      })()}

      {showWorkoutSheet && exerciseForWorkout && (
        <WorkoutSelectionSheet
          exerciseId={exerciseForWorkout}
          onClose={() => {
            setShowWorkoutSheet(false);
            setExerciseForWorkout(null);
          }}
        />
      )}
    </>
  );

  return content;
}