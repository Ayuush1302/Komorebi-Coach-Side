import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AppLayout from '../layout/AppLayout';
import { useData } from '../../context/DataContext';
import { ArrowLeft, Plus, Clock, Dumbbell } from 'lucide-react';

export default function WorkoutLibrary() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialTab = (searchParams.get('tab') as 'templates' | 'custom') || 'templates';
  const [activeTab, setActiveTab] = useState<'templates' | 'custom'>(initialTab);
  const { workouts } = useData();

  // Mock templates for now - in production this would come from the context
  const mockTemplates = [
    {
      id: 't1',
      name: 'Chest Day',
      description: 'Complete chest workout focusing on mass and strength',
      exercises: [],
      isTemplate: true,
    },
    {
      id: 't2',
      name: 'Full Body HIIT',
      description: 'High-intensity full body workout for conditioning',
      exercises: [],
      isTemplate: true,
    },
    {
      id: 't3',
      name: 'Leg Day Power',
      description: 'Heavy compound movements for lower body strength',
      exercises: [],
      isTemplate: true,
    },
  ];

  const displayWorkouts = activeTab === 'templates' ? mockTemplates : workouts;

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
        <h1 className="text-3xl flex-1">Workouts</h1>
        <button
          onClick={() => navigate('/create/workout')}
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

      {/* Filter Chips */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        <button className="px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm whitespace-nowrap">
          All Types
        </button>
        <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm whitespace-nowrap">
          Strength
        </button>
        <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm whitespace-nowrap">
          Cardio
        </button>
        <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm whitespace-nowrap">
          Duration
        </button>
        <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm whitespace-nowrap">
          Difficulty
        </button>
      </div>

      {/* Workout List */}
      <div className="space-y-3">
        {displayWorkouts.map((workout) => (
          <div
            key={workout.id}
            onClick={() => navigate(`/workouts/${workout.id}`)}
            className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-medium text-lg mb-2">{workout.name}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{workout.description}</p>
              </div>
              {workout.isTemplate && (
                <span className="ml-3 px-2 py-1 bg-blue-100 text-blue-600 rounded text-xs">
                  Template
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Dumbbell className="w-4 h-4" />
                <span>{workout.exercises.length} exercises</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>45-60 min</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {activeTab === 'custom' && workouts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No custom workouts yet</p>
          <button
            onClick={() => navigate('/create/workout')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create Your First Workout
          </button>
        </div>
      )}
    </AppLayout>
  );
}