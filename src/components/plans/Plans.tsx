import Layout from '../layout/Layout';
import { useData } from '../../context/DataContext';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, Dumbbell, TrendingUp } from 'lucide-react';

export default function Plans() {
  const { plans } = useData();
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl">Training Plans</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              onClick={() => navigate(`/plans/${plan.id}`)}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="p-6">
                <h3 className="text-xl mb-3">{plan.title}</h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{plan.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Dumbbell className="w-4 h-4" />
                    <span>{plan.workoutsPerWeek} workouts / week</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{plan.avgTimePerWorkout} / workout</span>
                  </div>
                </div>

                <p className="text-sm text-gray-600 line-clamp-3">{plan.description}</p>

                <button className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  View Plan
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
