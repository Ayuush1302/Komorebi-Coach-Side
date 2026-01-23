import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AppLayout from '../layout/AppLayout';
import { ArrowLeft, Plus, Calendar, Dumbbell, Clock } from 'lucide-react';
import { usePlans } from '../../context/PlansContext';

export default function PlanLibrary() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialTab = (searchParams.get('tab') as 'templates' | 'custom') || 'templates';
  const [activeTab, setActiveTab] = useState<'templates' | 'custom'>(initialTab);
  const { customPlans } = usePlans();

  const templatePlans = [
    {
      id: 'p1',
      name: '12-Week Fat Loss',
      goal: 'Fat Loss',
      duration: '12 weeks',
      workoutsPerWeek: 4,
      difficulty: 'Beginner',
      description: 'Comprehensive fat loss program combining strength training and cardio for optimal results.',
    },
    {
      id: 'p2',
      name: 'Marathon Training',
      goal: 'Endurance',
      duration: '16 weeks',
      workoutsPerWeek: 5,
      difficulty: 'Intermediate',
      description: 'Progressive running program to prepare you for your first or next marathon.',
    },
    {
      id: 'p3',
      name: 'Beginner Strength',
      goal: 'Muscle Gain',
      duration: '8 weeks',
      workoutsPerWeek: 3,
      difficulty: 'Beginner',
      description: 'Build foundational strength with this beginner-friendly program.',
    },
  ];

  const displayPlans = activeTab === 'templates' ? templatePlans : customPlans;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-600';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-600';
      case 'Advanced':
        return 'bg-red-100 text-red-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

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
        <h1 className="text-3xl flex-1">Training Plans</h1>
        <button
          onClick={() => navigate('/create/plan')}
          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>

      {/* Segmented Control */}
      <div className="inline-flex bg-gray-100 rounded-lg p-1 mb-6">
        <button
          onClick={() => setActiveTab('templates')}
          className={`px-6 py-2 rounded-md text-sm transition-colors ${activeTab === 'templates'
            ? 'bg-white shadow-sm'
            : 'text-gray-600'
            }`}
        >
          📘 Templates
        </button>
        <button
          onClick={() => setActiveTab('custom')}
          className={`px-6 py-2 rounded-md text-sm transition-colors ${activeTab === 'custom'
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
          All Goals
        </button>
        <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm whitespace-nowrap">
          Fat Loss
        </button>
        <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm whitespace-nowrap">
          Muscle Gain
        </button>
        <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm whitespace-nowrap">
          Endurance
        </button>
        <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm whitespace-nowrap">
          Duration
        </button>
      </div>

      {/* Plan List */}
      <div className="space-y-4">
        {displayPlans.map((plan) => (
          <div
            key={plan.id}
            onClick={() => navigate(`/plans/${plan.id}`)}
            className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
          >
            {/* Plan Image */}
            <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-500" />

            {/* Plan Content */}
            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-medium text-lg">{plan.name}</h3>
                <span className={`px-2 py-1 rounded text-xs ${getDifficultyColor(plan.difficulty)}`}>
                  {plan.difficulty}
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-4">{plan.description}</p>

              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{plan.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Dumbbell className="w-4 h-4" />
                  <span>{plan.workoutsPerWeek}x / week</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>45-60 min</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {activeTab === 'custom' && customPlans.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No custom plans yet</p>
          <button
            onClick={() => navigate('/create/plan')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create Your First Plan
          </button>
        </div>
      )}
    </AppLayout>
  );
}