import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import Layout from '../layout/Layout';
import Workouts from './Workouts';
import Exercises from '../exercises/Exercises';

export default function WorkoutSection() {
  const [activeTab, setActiveTab] = useState<'workouts' | 'exercises'>('workouts');
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl">Workout</h1>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-6">
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab('workouts')}
                className={`px-6 py-3 text-sm transition-colors ${
                  activeTab === 'workouts'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Workouts
              </button>
              <button
                onClick={() => setActiveTab('exercises')}
                className={`px-6 py-3 text-sm transition-colors ${
                  activeTab === 'exercises'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Exercises
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'workouts' ? (
          <Workouts embedded />
        ) : (
          <Exercises embedded />
        )}

        {/* Floating Action Button */}
        {activeTab === 'workouts' && (
          <button
            onClick={() => navigate('/workouts/create')}
            className="fixed bottom-24 md:bottom-8 right-8 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all flex items-center justify-center hover:scale-110"
          >
            <Plus className="w-6 h-6" />
          </button>
        )}
      </div>
    </Layout>
  );
}