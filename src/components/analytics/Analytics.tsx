import AppLayout from '../layout/AppLayout';
import { TrendingUp, Users, Heart, Award } from 'lucide-react';

export default function Analytics() {
  const stats = [
    {
      label: 'Active Athletes',
      value: '24',
      change: '+3 this week',
      icon: Users,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      label: 'Completion Rate',
      value: '87%',
      change: '+5% from last week',
      icon: Award,
      color: 'bg-green-100 text-green-600',
    },
    {
      label: 'Total Workouts',
      value: '156',
      change: 'This month',
      icon: Heart,
      color: 'bg-purple-100 text-purple-600',
    },
    {
      label: 'Avg Performance',
      value: '92%',
      change: 'Across all athletes',
      icon: TrendingUp,
      color: 'bg-orange-100 text-orange-600',
    },
  ];

  return (
    <AppLayout>
      <h1 className="text-3xl mb-6">Analytics</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white rounded-lg border border-gray-200 p-4"
            >
              <div className={`inline-flex p-2 rounded-lg ${stat.color} mb-3`}>
                <Icon className="w-5 h-5" />
              </div>
              <p className="text-2xl mb-1">{stat.value}</p>
              <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
              <p className="text-xs text-gray-400">{stat.change}</p>
            </div>
          );
        })}
      </div>

      {/* Popular Workouts */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <h2 className="text-xl mb-4">Popular Workouts</h2>
        <div className="space-y-3">
          {['Full Body HIIT', 'Chest Day', 'Leg Day Power'].map((workout, index) => (
            <div key={workout} className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <span className="text-lg font-semibold text-gray-400">#{index + 1}</span>
                <span className="text-gray-700">{workout}</span>
              </div>
              <span className="text-sm text-gray-500">{24 - index * 5} assigns</span>
            </div>
          ))}
        </div>
      </div>

      {/* Compliance Overview */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl mb-4">Athlete Compliance</h2>
        <div className="space-y-4">
          {[
            { name: 'John Doe', rate: 95 },
            { name: 'Jane Smith', rate: 88 },
            { name: 'Mike Wilson', rate: 76 },
          ].map((athlete) => (
            <div key={athlete.name}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-700">{athlete.name}</span>
                <span className="text-sm font-medium">{athlete.rate}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{ width: `${athlete.rate}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
