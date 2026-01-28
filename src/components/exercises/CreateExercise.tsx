import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useData, Exercise } from '../../context/DataContext';

import { Upload, ArrowLeft, X, Video, Image as ImageIcon } from 'lucide-react';

export default function CreateExercise() {
  const { id } = useParams();
  const [exerciseName, setExerciseName] = useState('');
  const [category, setCategory] = useState('');
  const [exerciseType, setExerciseType] = useState('');
  const [primaryMuscle, setPrimaryMuscle] = useState('');
  const [secondaryMuscles, setSecondaryMuscles] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [showAlternativesModal, setShowAlternativesModal] = useState(false);
  const [selectedAlternatives, setSelectedAlternatives] = useState<string[]>([]);
  const [defaultSets, setDefaultSets] = useState<number>(3);
  const [defaultReps, setDefaultReps] = useState<string>('10');
  const [defaultTempo, setDefaultTempo] = useState<string>('2-0-2-0');
  const [defaultRest, setDefaultRest] = useState<string>('60s');

  const { addCustomExercise, updateCustomExercise, exercises, customExercises } = useData();
  const navigate = useNavigate();

  const categories = ['Abs', 'Barbell', 'Bodyweight', 'Cables', 'Dumbbell', 'Machine'];
  const exerciseTypes = ['Strength', 'Powerlifting', 'Plyometrics', 'Conditioning', 'Stretching'];
  const muscles = ['Chest', 'Back', 'Quads', 'Hamstrings', 'Glutes', 'Calves', 'Shoulders', 'Biceps', 'Triceps', 'Core'];

  // Load existing exercise data if editing
  useEffect(() => {
    if (id) {
      const existingExercise = customExercises.find(ex => ex.id === id);
      if (existingExercise) {
        setExerciseName(existingExercise.name);
        setCategory(existingExercise.category);
        setExerciseType(existingExercise.exerciseType);
        setPrimaryMuscle(existingExercise.primaryMuscle);
        setSecondaryMuscles(existingExercise.secondaryMuscles);
        setNotes(existingExercise.notes || '');
        setSelectedAlternatives(existingExercise.alternativeExercises || []);
        setDefaultSets(existingExercise.defaultSets || 3);
        setDefaultReps(existingExercise.defaultReps || '10');
        setDefaultTempo(existingExercise.defaultTempo || '2-0-2-0');
        setDefaultRest(existingExercise.defaultRest || '60s');
      }
    }
  }, [id, customExercises]);

  const toggleSecondaryMuscle = (muscle: string) => {
    setSecondaryMuscles(prev =>
      prev.includes(muscle) ? prev.filter(m => m !== muscle) : [...prev, muscle]
    );
  };

  const toggleAlternative = (exerciseId: string) => {
    setSelectedAlternatives(prev =>
      prev.includes(exerciseId) ? prev.filter(id => id !== exerciseId) : [...prev, exerciseId]
    );
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages(prev => [...prev, ...files]);
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    const newExercise: Exercise = {
      id: `custom-${Date.now()}`,
      name: exerciseName,
      category,
      exerciseType,
      primaryMuscle,
      secondaryMuscles,
      isCustom: true,
      alternativeExercises: selectedAlternatives,
      notes,
      defaultSets,
      defaultReps,
      defaultTempo,
      defaultRest,
    };

    if (id) {
      updateCustomExercise(id, newExercise);
    } else {
      addCustomExercise(newExercise);
    }
    navigate('/exercises');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate('/exercises')}
          className="p-2 hover:bg-gray-100 rounded-md transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-3xl">{id ? 'Edit Custom Exercise' : 'Create Custom Exercise'}</h1>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm mb-2 text-gray-700">Exercise Name</label>
            <input
              type="text"
              value={exerciseName}
              onChange={(e) => setExerciseName(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Weighted Pull-ups"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm mb-2 text-gray-700">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm mb-2 text-gray-700">Exercise Type</label>
              <select
                value={exerciseType}
                onChange={(e) => setExerciseType(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select type</option>
                {exerciseTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm mb-3 text-gray-700">Primary Muscle</label>
            <select
              value={primaryMuscle}
              onChange={(e) => setPrimaryMuscle(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Select primary muscle</option>
              {muscles.map(muscle => (
                <option key={muscle} value={muscle}>{muscle}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm mb-3 text-gray-700">Secondary Muscles</label>
            <div className="flex flex-wrap gap-2">
              {muscles
                .filter(m => m !== primaryMuscle)
                .map(muscle => (
                  <button
                    key={muscle}
                    type="button"
                    onClick={() => toggleSecondaryMuscle(muscle)}
                    className={`px-3 py-1.5 rounded-md text-sm transition-colors ${secondaryMuscles.includes(muscle)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                  >
                    {muscle}
                  </button>
                ))}
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-sm mb-4 text-gray-700">Media</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2 text-gray-700">Upload Video</label>
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  {videoFile ? (
                    <div className="flex flex-col items-center">
                      <Video className="w-8 h-8 text-blue-600 mb-2" />
                      <p className="text-sm text-gray-600">{videoFile.name}</p>
                    </div>
                  ) : (
                    <>
                      <Video className="w-8 h-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">Click to upload video</p>
                      <p className="text-xs text-gray-400 mt-1">MP4, MOV, AVI</p>
                    </>
                  )}
                  <input
                    type="file"
                    className="hidden"
                    accept="video/*"
                    onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                  />
                </label>
              </div>

              <div>
                <label className="block text-sm mb-2 text-gray-700">Upload Images</label>
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <ImageIcon className="w-8 h-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">Click to upload images</p>
                  <p className="text-xs text-gray-400 mt-1">JPG, PNG (multiple files)</p>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                  />
                </label>

                {images.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {images.map((img, index) => (
                      <div key={index} className="relative">
                        <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                          <ImageIcon className="w-8 h-8 text-gray-400" />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm mb-2 text-gray-700">Alternative Exercises</label>
            <button
              type="button"
              onClick={() => setShowAlternativesModal(true)}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
            >
              Select Alternatives ({selectedAlternatives.length})
            </button>
          </div>

          <div>
            <label className="block text-sm mb-2 text-gray-700">Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Add any additional notes or instructions"
            />
          </div>

          <div className="border-t pt-6">
            <h3 className="text-sm mb-4 text-gray-700">Default Workout Settings</h3>
            <p className="text-xs text-gray-500 mb-4">These values will be used as defaults when adding this exercise to workouts</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm mb-2 text-gray-700">Sets</label>
                <input
                  type="number"
                  value={defaultSets}
                  onChange={(e) => setDefaultSets(parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="3"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm mb-2 text-gray-700">Reps</label>
                <input
                  type="text"
                  value={defaultReps}
                  onChange={(e) => setDefaultReps(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="10"
                />
              </div>

              <div>
                <label className="block text-sm mb-2 text-gray-700">Tempo</label>
                <input
                  type="text"
                  value={defaultTempo}
                  onChange={(e) => setDefaultTempo(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="2-0-2-0"
                />
              </div>

              <div>
                <label className="block text-sm mb-2 text-gray-700">Rest</label>
                <input
                  type="text"
                  value={defaultRest}
                  onChange={(e) => setDefaultRest(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="60s"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-8 pt-6 border-t">
          <button
            onClick={() => navigate('/exercises')}
            className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!exerciseName || !category || !exerciseType || !primaryMuscle}
            className={`px-6 py-2.5 rounded-md transition-colors ${exerciseName && category && exerciseType && primaryMuscle
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
          >
            Save Exercise
          </button>
        </div>
      </div>

      {showAlternativesModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-lg">Select Alternative Exercises</h3>
              <button
                onClick={() => setShowAlternativesModal(false)}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto p-6 flex-1">
              <div className="space-y-2">
                {exercises.map(ex => (
                  <label
                    key={ex.id}
                    className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedAlternatives.includes(ex.id)}
                      onChange={() => toggleAlternative(ex.id)}
                      className="w-4 h-4"
                    />
                    <div className="flex-1">
                      <p className="text-sm">{ex.name}</p>
                      <p className="text-xs text-gray-500">{ex.category}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 p-6 border-t">
              <button
                onClick={() => setShowAlternativesModal(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}