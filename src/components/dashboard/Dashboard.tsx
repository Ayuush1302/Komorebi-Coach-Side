import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  Users,
  Dumbbell,
  Bell,
  ChevronRight,
  TrendingUp,
  MessageSquare,
  CheckCircle,
  Clock,
  UserPlus,
  Trophy,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();
  const [scheduleView, setScheduleView] = useState<'today' | 'week'>('today');
  const [showEarnings, setShowEarnings] = useState(false);

  // Mock Data
  const schedule = [
    { id: 1, athlete: 'Aditi Sharma', goal: 'Strength', type: 'Workout due', status: 'pending', time: '10:00 AM' },
    { id: 2, athlete: 'Rohan Gupta', goal: 'Running', type: 'Check-in pending', status: 'pending', time: '2:00 PM' },
    { id: 3, athlete: 'Sneha Patel', goal: 'Rehab', type: 'Program review', status: 'completed', time: '4:30 PM' },
  ];

  const clientStats = [
    { label: 'Total Clients', value: '24', icon: Users, color: 'text-blue-600 bg-blue-50' },
    { label: 'Active', value: '18', icon: Dumbbell, color: 'text-green-600 bg-green-50' },
    { label: 'Pending', value: '6', icon: UserPlus, color: 'text-orange-600 bg-orange-50' },
    { label: 'Interactions', value: '12', icon: MessageSquare, color: 'text-purple-600 bg-purple-50' },
  ];

  const recentWins = [
    { id: 1, text: 'Aditi completed Week 4 Strength Program', time: '2h ago', icon: Trophy, color: 'text-yellow-600' },
    { id: 2, text: 'Rohan achieved new 5K PR', time: '4h ago', icon: TrendingUp, color: 'text-green-600' },
    { id: 3, text: 'New check-in from Sneha', time: '5h ago', icon: MessageSquare, color: 'text-blue-600' },
  ];

  return (
    <div className="max-w-md mx-auto pb-24 px-4 pt-6">
      {/* Header Section */}
      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-lg">
            {user?.firstName?.[0] || 'C'}
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              Good morning, {user?.firstName || 'Coach'}
            </h1>
            <p className="text-xs text-gray-500 font-medium">LET'S GET TO WORK</p>
          </div>
        </div>
        <button className="p-2 rounded-full hover:bg-gray-100 relative">
          <Bell className="w-6 h-6 text-gray-700" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
      </header>



      {/* Today's Schedule */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-900">Today's Schedule</h2>
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setScheduleView('today')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${scheduleView === 'today' ? 'bg-white shadow text-gray-900' : 'text-gray-500'
                }`}
            >
              Today
            </button>
            <button
              onClick={() => setScheduleView('week')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${scheduleView === 'week' ? 'bg-white shadow text-gray-900' : 'text-gray-500'
                }`}
            >
              Week
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {schedule.length > 0 ? (
            schedule.map(task => (
              <div key={task.id} className="flex items-center p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:border-blue-200 transition-colors">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${task.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-blue-50 text-blue-600'
                  }`}>
                  {task.status === 'completed' ? <CheckCircle className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="text-sm font-semibold text-gray-900">{task.athlete}</h3>
                    <span className="text-xs font-medium text-gray-500">{task.time}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-600">{task.goal}</span>
                    <span className="text-xs text-gray-500">• {task.type}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-200">
              <p className="text-sm text-gray-500 mb-2">No tasks scheduled for today</p>
              <button className="text-sm font-medium text-blue-600 hover:text-blue-700">Plan upcoming workouts</button>
            </div>
          )}
        </div>
      </section>

      {/* Clients Snapshot */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Clients Snapshot</h2>
        <div className="grid grid-cols-2 gap-3">
          {clientStats.map((stat, i) => (
            <div key={i} className="p-3 bg-white border border-gray-100 rounded-xl shadow-sm space-y-2">
              <div className={`w-8 h-8 rounded-lg ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Activity */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Wins</h2>
        <div className="space-y-3">
          {recentWins.map(win => (
            <div key={win.id} className="flex items-start p-3 bg-white border border-gray-100 rounded-xl shadow-sm">
              <div className={`mt-0.5 mr-3 ${win.color}`}>
                <win.icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">{win.text}</p>
                <p className="text-xs text-gray-400 mt-1">{win.time}</p>
              </div>
              <button className="text-xs font-medium text-blue-600 px-2 py-1 bg-blue-50 rounded hover:bg-blue-100 transition-colors">
                React
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Growth & Earnings (Collapsible) */}
      <section>
        <button
          onClick={() => setShowEarnings(!showEarnings)}
          className="flex items-center justify-between w-full p-4 bg-gray-900 text-white rounded-xl shadow-lg"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-yellow-500">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-gray-300">Total Earnings</p>
              <p className="text-lg font-bold">₹45,200</p>
            </div>
          </div>
          {showEarnings ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
        </button>

        {showEarnings && (
          <div className="mt-2 p-4 bg-gray-50 rounded-xl border border-gray-100">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-gray-600">This Month</span>
              <span className="text-sm font-medium text-green-600">+12% vs last month</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Program Sales</span>
                <span className="font-medium text-gray-900">₹28,000</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">1:1 Coaching</span>
                <span className="font-medium text-gray-900">₹17,200</span>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
