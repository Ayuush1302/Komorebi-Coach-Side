import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AppLayout from '../layout/AppLayout';
import { useData } from '../../context/DataContext';
import { Search, Filter, ArrowLeft, Plus } from 'lucide-react';

export default function ExerciseLibrary() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialTab = (searchParams.get('tab') as 'templates' | 'custom') || 'templates';
  const [activeTab, setActiveTab] = useState<'templates' | 'custom'>(initialTab);
  const [searchQuery, setSearchQuery] = useState('');
  const { exercises, customExercises } = useData();

  const displayExercises = activeTab === 'templates' ? exercises : customExercises;

  // Group exercises by category
  const groupedExercises = displayExercises.reduce((acc, exercise) => {
    const category = exercise.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(exercise);
    return acc;
  }, {} as Record<string, typeof exercises>);

  const filteredExercises = searchQuery
    ? displayExercises.filter(ex =>
        ex.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : null;

  return (
    <AppLayout>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate('/library')}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-3xl flex-1">Exercises</h1>
        <button
          onClick={() => navigate('/create/exercise')}
          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>

      {/* Segmented Control */}
      <div className="inline-flex bg-gray-100 rounded-lg p-1 mb-6">
        <button
          onClick={() => setActiveTab('templates')}
          className={`px-6 py-2 rounded-md text-sm transition-colors ${
            activeTab === 'templates'
              ? 'bg-white shadow-sm'
              : 'text-gray-600'
          }`}
        >
          📘 Templates
        </button>
        <button
          onClick={() => setActiveTab('custom')}
          className={`px-6 py-2 rounded-md text-sm transition-colors ${
            activeTab === 'custom'
              ? 'bg-white shadow-sm'
              : 'text-gray-600'
          }`}
        >
          ⭐ My Custom
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search exercises..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        <button className="px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm whitespace-nowrap">
          Strength
        </button>
        <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm whitespace-nowrap">
          Cardio
        </button>
        <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm whitespace-nowrap flex items-center gap-1">
          All Muscle Groups
          <Filter className="w-4 h-4" />
        </button>
      </div>

      {/* Exercise List */}
      {filteredExercises ? (
        <div className="space-y-2">
          {filteredExercises.map((exercise) => (
            <div
              key={exercise.id}
              className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
            >
              <h3 className="font-medium mb-2">{exercise.name}</h3>
              <div className="flex gap-2 text-xs">
                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded">
                  {exercise.category}
                </span>
                <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded">
                  {exercise.primaryMuscle}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedExercises).map(([category, exercises]) => (
            <div key={category}>
              <h2 className="text-lg mb-3">{category}</h2>
              <div className="grid grid-cols-2 gap-3">
                {exercises.map((exercise) => (
                  <div
                    key={exercise.id}
                    className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="aspect-video bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                      <span className="text-gray-400 text-sm">Image</span>
                    </div>
                    <h3 className="font-medium text-sm mb-1">{exercise.name}</h3>
                    <p className="text-xs text-gray-500">{exercise.primaryMuscle}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'custom' && customExercises.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No custom exercises yet</p>
          <button
            onClick={() => navigate('/create/exercise')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create Your First Exercise
          </button>
        </div>
      )}
    </AppLayout>
  );
}
