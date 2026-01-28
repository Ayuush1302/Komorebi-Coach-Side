import { useNavigate } from 'react-router-dom';
import { Dumbbell, Heart, Calendar, Activity, Plus } from 'lucide-react';

export default function Library() {
  const navigate = useNavigate();

  const sections = [
    {
      id: 'exercises',
      title: 'Exercises',
      icon: Dumbbell,
      count: '127 exercises',
      recent: 'Barbell Squat, Bench Press, Pull-ups',
      color: 'bg-blue-100 text-blue-600',
      path: '/library/exercises',
      createPath: '/create/exercise',
    },
    {
      id: 'workouts',
      title: 'S&C Workouts',
      icon: Heart,
      count: '42 workouts',
      recent: 'Chest Day, Full Body HIIT',
      color: 'bg-purple-100 text-purple-600',
      path: '/library/workouts',
      createPath: '/create/workout',
    },
    {
      id: 'cardio',
      title: 'Sports Workouts',
      icon: Activity,
      count: '18 sessions',
      recent: '10K Run, Zone 2 Cycling, Tempo Run',
      color: 'bg-green-100 text-green-600',
      path: '/library/cardio',
      createPath: '/create/cardio',
    },
    {
      id: 'plans',
      title: 'Plans',
      icon: Calendar,
      count: '8 plans',
      recent: '12-Week Fat Loss, Marathon Training',
      color: 'bg-orange-100 text-orange-600',
      path: '/library/plans',
      createPath: '/create/plan',
    },
  ];

  return (
    <>
      <div className="mb-6">
        <h1 className="text-3xl mb-4">Library</h1>
      </div>

      {/* Three Main Sections */}
      <div className="space-y-4">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <div
              key={section.id}
              onClick={() => navigate(section.path)}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-lg ${section.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl mb-1">{section.title}</h2>
                    <p className="text-sm text-gray-500">{section.count}</p>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(section.createPath);
                  }}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <p className="text-xs text-gray-400 mb-1">Recently used</p>
                <p className="text-sm text-gray-700">{section.recent}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}