import { useState, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useData, WorkoutExercise } from '../../context/DataContext';

import ExerciseDetailModal from '../exercises/ExerciseDetailModal';
import { Plus, GripVertical, MoreVertical, Trash2, Eye, Link2, Upload, ArrowLeft, Check } from 'lucide-react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

interface DraggableExerciseProps {
  exercise: WorkoutExercise;
  index: number;
  moveExercise: (fromIndex: number, toIndex: number) => void;
  onUpdate: (id: string, field: keyof WorkoutExercise, value: any) => void;
  onDelete: (id: string) => void;
  onViewDetails: (id: string) => void;
  onGroup: (id: string) => void;
  exerciseName: string;
}

function DraggableExercise({
  exercise,
  index,
  moveExercise,
  onUpdate,
  onDelete,
  onViewDetails,
  onGroup,
  exerciseName,
}: DraggableExerciseProps) {
  const [showMenu, setShowMenu] = useState(false);

  const [{ isDragging }, drag] = useDrag({
    type: 'exercise',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'exercise',
    hover: (item: { index: number }) => {
      if (item.index !== index) {
        moveExercise(item.index, index);
        item.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`border border-gray-200 rounded-lg p-4 bg-white ${isDragging ? 'opacity-50' : ''
        } ${exercise.groupId ? 'border-l-4 border-l-blue-500' : ''}`}
    >
      <div className="flex items-start gap-3">
        <GripVertical className="w-5 h-5 text-gray-400 mt-1 cursor-move" />

        <div className="flex-1">
          <h4 className="text-sm mb-3">{exerciseName}</h4>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Sets</label>
              <input
                type="number"
                value={exercise.sets}
                onChange={(e) => onUpdate(exercise.id, 'sets', parseInt(e.target.value))}
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Reps</label>
              <input
                type="text"
                value={exercise.reps}
                onChange={(e) => onUpdate(exercise.id, 'reps', e.target.value)}
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Weight</label>
              <input
                type="text"
                value={exercise.weight}
                onChange={(e) => onUpdate(exercise.id, 'weight', e.target.value)}
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Tempo</label>
              <input
                type="text"
                value={exercise.tempo}
                onChange={(e) => onUpdate(exercise.id, 'tempo', e.target.value)}
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Rest</label>
              <input
                type="text"
                value={exercise.rest}
                onChange={(e) => onUpdate(exercise.id, 'rest', e.target.value)}
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <MoreVertical className="w-5 h-5 text-gray-600" />
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              <button
                onClick={() => {
                  onViewDetails(exercise.exerciseId);
                  setShowMenu(false);
                }}
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                View Exercise
              </button>
              <button
                onClick={() => {
                  onGroup(exercise.id);
                  setShowMenu(false);
                }}
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2"
              >
                <Link2 className="w-4 h-4" />
                Group Set
              </button>
              <button
                onClick={() => {
                  onDelete(exercise.id);
                  setShowMenu(false);
                }}
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2 text-red-600"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function WorkoutBuilderContent() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { getWorkoutById, updateWorkout, addWorkout, exercises: exerciseLibrary, customExercises } = useData();

  const [activeTab, setActiveTab] = useState<'exercises' | 'details'>('exercises');
  const [workoutName, setWorkoutName] = useState('');
  const [workoutDescription, setWorkoutDescription] = useState('');
  const [coachNotes, setCoachNotes] = useState('');
  const [workoutExercises, setWorkoutExercises] = useState<WorkoutExercise[]>([]);
  const [showExerciseLibrary, setShowExerciseLibrary] = useState(false);
  const [showCustomExercises, setShowCustomExercises] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [customSearchTerm, setCustomSearchTerm] = useState('');
  const [selectedExerciseId, setSelectedExerciseId] = useState('');
  const [selectedLibraryExercises, setSelectedLibraryExercises] = useState<string[]>([]);
  const [selectedCustomExercises, setSelectedCustomExercises] = useState<string[]>([]);
  const [isFromTemplate, setIsFromTemplate] = useState(false);

  const allExercises = [...exerciseLibrary, ...customExercises];

  useEffect(() => {
    // Check if we're loading from a template
    const templateId = searchParams.get('template');
    if (templateId) {
      const template = getWorkoutById(templateId);
      if (template) {
        setWorkoutName(template.name);
        setWorkoutDescription(template.description);
        setCoachNotes(template.coachNotes || '');
        setWorkoutExercises(template.exercises);
        setIsFromTemplate(true);
      }
    } else if (id) {
      // Loading existing workout for editing
      const workout = getWorkoutById(id);
      if (workout) {
        setWorkoutName(workout.name);
        setWorkoutDescription(workout.description);
        setCoachNotes(workout.coachNotes || '');
        setWorkoutExercises(workout.exercises);
        setIsFromTemplate(false);
      }
    }
  }, [id, searchParams, getWorkoutById]);

  const moveExercise = (fromIndex: number, toIndex: number) => {
    const updated = [...workoutExercises];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    setWorkoutExercises(updated);
  };

  const updateExercise = (exerciseId: string, field: keyof WorkoutExercise, value: any) => {
    setWorkoutExercises(prev =>
      prev.map(ex => ex.id === exerciseId ? { ...ex, [field]: value } : ex)
    );
  };

  const deleteExercise = (exerciseId: string) => {
    setWorkoutExercises(prev => prev.filter(ex => ex.id !== exerciseId));
  };

  const toggleLibraryExercise = (exerciseId: string) => {
    setSelectedLibraryExercises(prev =>
      prev.includes(exerciseId)
        ? prev.filter(id => id !== exerciseId)
        : [...prev, exerciseId]
    );
  };

  const toggleCustomExercise = (exerciseId: string) => {
    setSelectedCustomExercises(prev =>
      prev.includes(exerciseId)
        ? prev.filter(id => id !== exerciseId)
        : [...prev, exerciseId]
    );
  };

  const addSelectedLibraryExercises = () => {
    const newExercises = selectedLibraryExercises.map((exerciseId, index) => {
      const exercise = allExercises.find(e => e.id === exerciseId);
      return {
        id: `we${Date.now()}-${index}`,
        exerciseId,
        sets: exercise?.defaultSets || 3,
        reps: exercise?.defaultReps || '10',
        weight: '',
        tempo: exercise?.defaultTempo || '2-0-2-0',
        rest: exercise?.defaultRest || '60s',
      };
    });
    setWorkoutExercises(prev => [...prev, ...newExercises]);
    setSelectedLibraryExercises([]);
    setShowExerciseLibrary(false);
    setSearchTerm('');
  };

  const addSelectedCustomExercises = () => {
    const newExercises = selectedCustomExercises.map((exerciseId, index) => {
      const exercise = allExercises.find(e => e.id === exerciseId);
      return {
        id: `we${Date.now()}-${index}`,
        exerciseId,
        sets: exercise?.defaultSets || 3,
        reps: exercise?.defaultReps || '10',
        weight: '',
        tempo: exercise?.defaultTempo || '2-0-2-0',
        rest: exercise?.defaultRest || '60s',
      };
    });
    setWorkoutExercises(prev => [...prev, ...newExercises]);
    setSelectedCustomExercises([]);
    setShowCustomExercises(false);
    setCustomSearchTerm('');
  };

  const isExerciseInWorkout = (exerciseId: string) => {
    return workoutExercises.some(ex => ex.exerciseId === exerciseId);
  };

  const handleSave = () => {
    const workout = {
      id: id || `w${Date.now()}`,
      name: workoutName,
      description: workoutDescription,
      exercises: workoutExercises,
      coachNotes,
      lastEdited: new Date().toISOString().split('T')[0],
    };

    if (id) {
      updateWorkout(id, workout);
    } else {
      addWorkout(workout);
    }

    navigate('/workouts');
  };

  const filteredExercises = allExercises.filter(ex =>
    ex.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate('/workouts')}
          className="p-2 hover:bg-gray-100 rounded-md transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl sm:text-3xl">{id ? 'Edit Workout' : 'Create Workout'}</h1>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-6">
        <div className="border-b border-gray-200">
          <div className="flex">
            <button
              onClick={() => setActiveTab('exercises')}
              className={`flex-1 sm:flex-none sm:px-6 py-3 text-sm transition-colors ${activeTab === 'exercises'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-800'
                }`}
            >
              Exercises
            </button>
            <button
              onClick={() => setActiveTab('details')}
              className={`flex-1 sm:flex-none sm:px-6 py-3 text-sm transition-colors ${activeTab === 'details'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-800'
                }`}
            >
              Details
            </button>
          </div>
        </div>

        <div className="p-4 sm:p-6">
          {activeTab === 'exercises' ? (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    setShowExerciseLibrary(!showExerciseLibrary);
                    setShowCustomExercises(false);
                  }}
                  className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  <Plus className="w-5 h-5" />
                  <span className="hidden sm:inline">Add from Exercise Library</span>
                  <span className="sm:hidden">Exercise Library</span>
                </button>
                <button
                  onClick={() => {
                    setShowCustomExercises(!showCustomExercises);
                    setShowExerciseLibrary(false);
                  }}
                  className="w-full sm:w-auto px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  <Plus className="w-5 h-5" />
                  <span className="hidden sm:inline">Add Custom Exercise</span>
                  <span className="sm:hidden">Custom Exercise</span>
                </button>
              </div>

              {showExerciseLibrary && (
                <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search exercises..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-md mb-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <div className="max-h-80 overflow-y-auto space-y-2">
                    {filteredExercises.map(ex => {
                      const isChecked = selectedLibraryExercises.includes(ex.id);
                      return (
                        <div
                          key={ex.id}
                          onClick={() => toggleLibraryExercise(ex.id)}
                          className="flex items-center gap-3 px-4 py-3 bg-white border border-gray-200 rounded-md hover:bg-blue-50 hover:border-blue-300 transition-colors cursor-pointer"
                        >
                          <div
                            className={`w-5 h-5 border-2 rounded flex items-center justify-center flex-shrink-0 ${isChecked ? 'bg-blue-600 border-blue-600' : 'border-gray-300'
                              }`}
                          >
                            {isChecked && <Check className="w-3 h-3 text-white" />}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm">{ex.name}</p>
                            <p className="text-xs text-gray-500">{ex.category} • {ex.primaryMuscle}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {selectedLibraryExercises.length > 0 && (
                    <button
                      onClick={addSelectedLibraryExercises}
                      className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors mt-3"
                    >
                      Add to List ({selectedLibraryExercises.length})
                    </button>
                  )}
                </div>
              )}

              {showCustomExercises && (
                <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
                  {customExercises.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500 mb-4">No custom exercises yet</p>
                      <button
                        onClick={() => navigate('/exercises/create')}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                      >
                        Create Custom Exercise
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-between mb-3">
                        <input
                          type="text"
                          value={customSearchTerm}
                          onChange={(e) => setCustomSearchTerm(e.target.value)}
                          placeholder="Search custom exercises..."
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent mr-3"
                        />
                        <button
                          onClick={() => navigate('/exercises/create')}
                          className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-1 whitespace-nowrap"
                        >
                          <Plus className="w-4 h-4" />
                          Create New
                        </button>
                      </div>
                      <div className="max-h-80 overflow-y-auto space-y-2">
                        {customExercises
                          .filter(ex => ex.name.toLowerCase().includes(customSearchTerm.toLowerCase()))
                          .map(ex => {
                            const isChecked = selectedCustomExercises.includes(ex.id);
                            return (
                              <div
                                key={ex.id}
                                onClick={() => toggleCustomExercise(ex.id)}
                                className="flex items-center gap-3 px-4 py-3 bg-white border border-gray-200 rounded-md hover:bg-blue-50 hover:border-blue-300 transition-colors cursor-pointer"
                              >
                                <div
                                  className={`w-5 h-5 border-2 rounded flex items-center justify-center flex-shrink-0 ${isChecked ? 'bg-blue-600 border-blue-600' : 'border-gray-300'
                                    }`}
                                >
                                  {isChecked && <Check className="w-3 h-3 text-white" />}
                                </div>
                                <div className="flex-1 flex items-start justify-between">
                                  <div>
                                    <p className="text-sm mb-1">{ex.name}</p>
                                    <p className="text-xs text-gray-500">{ex.category} • {ex.primaryMuscle}</p>
                                  </div>
                                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">Custom</span>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                      {selectedCustomExercises.length > 0 && (
                        <button
                          onClick={addSelectedCustomExercises}
                          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors mt-3"
                        >
                          Add to List ({selectedCustomExercises.length})
                        </button>
                      )}
                    </>
                  )}
                </div>
              )}

              {workoutExercises.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg px-4">
                  <p className="text-gray-500 text-sm">No exercises added yet. Click the button above to get started.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {workoutExercises.map((ex, index) => {
                    const exerciseDetails = allExercises.find(e => e.id === ex.exerciseId);
                    return (
                      <DraggableExercise
                        key={ex.id}
                        exercise={ex}
                        index={index}
                        moveExercise={moveExercise}
                        onUpdate={updateExercise}
                        onDelete={deleteExercise}
                        onViewDetails={(id) => setSelectedExerciseId(id)}
                        onGroup={(id) => console.log('Group', id)}
                        exerciseName={exerciseDetails?.name || 'Unknown Exercise'}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <label className="block text-sm mb-2 text-gray-700">Workout Name</label>
                <input
                  type="text"
                  value={workoutName}
                  onChange={(e) => setWorkoutName(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Upper Body Strength"
                />
              </div>

              <div>
                <label className="block text-sm mb-2 text-gray-700">Description</label>
                <textarea
                  value={workoutDescription}
                  onChange={(e) => setWorkoutDescription(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={3}
                  placeholder="Brief description of this workout"
                />
              </div>

              <div>
                <label className="block text-sm mb-2 text-gray-700">Coach Notes / Instructions</label>
                <textarea
                  value={coachNotes}
                  onChange={(e) => setCoachNotes(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={5}
                  placeholder="Add notes or instructions for this workout..."
                />
              </div>

              <div>
                <label className="block text-sm mb-2 text-gray-700">Attach Files</label>
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">Click to upload files</p>
                  <p className="text-xs text-gray-400 mt-1">PDF, images, or documents</p>
                  <input type="file" className="hidden" multiple />
                </label>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button
          onClick={() => navigate('/workouts')}
          className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-6 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Save Workout
        </button>
      </div>
      {selectedExerciseId && (() => {
        const exercise = allExercises.find(e => e.id === selectedExerciseId);
        return exercise ? (
          <ExerciseDetailModal
            exercise={exercise}
            onClose={() => setSelectedExerciseId('')}
            allExercises={allExercises}
          />
        ) : null;
      })()}
    </div>
  );
}

export default function WorkoutBuilder() {
  return (
    <DndProvider backend={HTML5Backend}>
      <WorkoutBuilderContent />
    </DndProvider>
  );
}