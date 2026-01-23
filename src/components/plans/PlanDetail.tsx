import Layout from '../layout/Layout';
import { useData } from '../../context/DataContext';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Dumbbell, Clock, Activity } from 'lucide-react';
import planHeroImage from 'figma:asset/df7f3852094ce4871d926cd9da0eb1b51a279526.png';

export default function PlanDetail() {
  const { planId } = useParams<{ planId: string }>();
  const { getPlanById, getWorkoutById } = useData();
  const navigate = useNavigate();

  const plan = planId ? getPlanById(planId) : undefined;

  if (!plan) {
    return (
      <Layout>
        <div className="text-center py-12">
          <p className="text-gray-500">Plan not found</p>
        </div>
      </Layout>
    );
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'bg-green-100 text-green-800';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'Advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate('/plans')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Plans
        </button>

        {/* Hero Image */}
        <div className="relative rounded-lg overflow-hidden mb-6 h-64">
          <img
            src={planHeroImage}
            alt={plan.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-6 left-6 text-white">
            <h1 className="text-3xl mb-2">{plan.title}</h1>
          </div>
        </div>

        {/* Plan Info */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Calendar className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Duration</p>
                <p className="font-medium">{plan.duration}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Dumbbell className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Per Week</p>
                <p className="font-medium">{plan.workoutsPerWeek} workouts / week</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Clock className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Avg Time</p>
                <p className="font-medium">{plan.avgTimePerWorkout} / workout</p>
              </div>
            </div>
          </div>

          <p className="text-gray-700">{plan.description}</p>
        </div>

        {/* Weekly Schedule */}
        <div className="space-y-8">
          {plan.weeks.map((week) => (
            <div key={week.weekNumber}>
              <h2 className="text-2xl mb-4">Week {week.weekNumber}</h2>
              <div className="space-y-4">
                {week.workouts.map((planWorkout) => {
                  const workout = getWorkoutById(planWorkout.workoutId);
                  if (!workout) return null;

                  return (
                    <div
                      key={planWorkout.id}
                      className="bg-white rounded-lg border border-gray-200 p-4 hover:border-blue-300 transition-colors cursor-pointer"
                      onClick={() => navigate(`/workouts/edit/${workout.id}`)}
                    >
                      <div className="flex gap-4">
                        {/* Day Badge */}
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 bg-gray-100 rounded-lg flex flex-col items-center justify-center">
                            <span className="text-xs text-gray-500 uppercase">Day</span>
                            <span className="text-xl font-semibold">{planWorkout.day}</span>
                          </div>
                        </div>

                        {/* Workout Info */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-lg mb-1">{workout.name}</h3>
                              <p className="text-sm text-gray-600">
                                {planWorkout.targetMuscles.join(', ')}
                              </p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs ${getLevelColor(planWorkout.level)}`}>
                              {planWorkout.level}
                            </span>
                          </div>

                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{planWorkout.duration}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Activity className="w-4 h-4" />
                              <span>{planWorkout.equipment.slice(0, 2).join(', ')}</span>
                              {planWorkout.equipment.length > 2 && (
                                <span className="text-gray-400">+{planWorkout.equipment.length - 2}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Add to Schedule Button */}
        <div className="mt-8 mb-8">
          <button className="w-full px-6 py-3 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600 transition-colors">
            Add to Schedule
          </button>
        </div>
      </div>
    </Layout>
  );
}