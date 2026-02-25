import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';

import { ArrowLeft, Mail, Calendar as CalendarIcon, Activity, Dumbbell, TrendingUp, Clock, Plus } from 'lucide-react';

export default function AthleteDashboard() {
    const { athleteId } = useParams();
    const { athletes } = useData();
    const navigate = useNavigate();

    const athlete = athletes.find(a => a.id === athleteId);

    if (!athlete) {
        return (
            <>
                <div className="max-w-7xl mx-auto">
                    <div className="text-center py-16">
                        <p className="text-gray-500">Athlete not found</p>
                        <button
                            onClick={() => navigate('/athletes')}
                            className="mt-4 px-6 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        >
                            Back to Athletes
                        </button>
                    </div>
                </div>
            </>
        );
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Connected':
                return 'bg-green-100 text-green-700';
            case 'Pending':
                return 'bg-amber-100 text-amber-700';
            case 'Frozen':
                return 'bg-blue-100 text-blue-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    // Mock activity data
    const recentActivities = [
        { id: 1, type: 'workout', title: 'Completed Upper Body Strength', date: '2026-01-10', time: '14:30' },
        { id: 2, type: 'session', title: 'In-Person Training Session', date: '2026-01-09', time: '10:00' },
        { id: 3, type: 'workout', title: 'Completed Lower Body Power', date: '2026-01-08', time: '16:45' },
        { id: 4, type: 'message', title: 'Sent progress update', date: '2026-01-07', time: '09:15' },
        { id: 5, type: 'workout', title: 'Completed HIIT Cardio', date: '2026-01-06', time: '07:00' },
    ];

    const weeklyStats = [
        { day: 'Mon', workouts: 1 },
        { day: 'Tue', workouts: 2 },
        { day: 'Wed', workouts: 1 },
        { day: 'Thu', workouts: 0 },
        { day: 'Fri', workouts: 2 },
        { day: 'Sat', workouts: 1 },
        { day: 'Sun', workouts: 0 },
    ];

    return (
        <>
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                    <button
                        onClick={() => navigate('/athletes')}
                        className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h1 className="text-3xl flex-1">Athlete Dashboard</h1>
                    <button
                        onClick={() => navigate(`/athletes/${athleteId}/ai-workout`)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                    >
                        <Plus className="w-5 h-5" />
                        <span className="font-medium">Assign a Workout</span>
                    </button>
                </div>



                {/* Athlete Info Card */}
                <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-medium">
                                {(athlete.name || athlete.email).charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <h2 className="text-xl mb-1">{athlete.name || athlete.email.split('@')[0]}</h2>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Mail className="w-4 h-4" />
                                    {athlete.email}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(athlete.status)}`}>
                                {athlete.status}
                            </span>
                            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                                {athlete.category}
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Joined Date</p>
                            <div className="flex items-center gap-2">
                                <CalendarIcon className="w-4 h-4 text-gray-400" />
                                <p className="text-sm font-medium">{athlete.joinedDate}</p>
                            </div>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Last Active</p>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-gray-400" />
                                <p className="text-sm font-medium">{athlete.lastActive || 'Never'}</p>
                            </div>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Workouts Completed</p>
                            <div className="flex items-center gap-2">
                                <Dumbbell className="w-4 h-4 text-gray-400" />
                                <p className="text-sm font-medium">{athlete.workoutsCompleted || 0}</p>
                            </div>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Upcoming Sessions</p>
                            <div className="flex items-center gap-2">
                                <TrendingUp className="w-4 h-4 text-gray-400" />
                                <p className="text-sm font-medium">{athlete.upcomingSessions || 0}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Weekly Activity Chart */}
                    <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-6">
                        <h3 className="text-lg mb-6">Weekly Activity</h3>
                        <div className="flex items-end justify-between gap-2 h-48">
                            {weeklyStats.map((stat, index) => (
                                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                                    <div className="w-full flex items-end justify-center" style={{ height: '150px' }}>
                                        <div
                                            className="w-full bg-blue-500 rounded-t hover:bg-blue-600 transition-colors"
                                            style={{ height: `${(stat.workouts / 2) * 100}%`, minHeight: stat.workouts > 0 ? '20px' : '0' }}
                                        />
                                    </div>
                                    <div className="text-center">
                                        <p className="text-xs text-gray-600">{stat.day}</p>
                                        <p className="text-xs font-medium text-gray-800">{stat.workouts}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="space-y-4">
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-sm text-gray-600">This Week</p>
                                <Activity className="w-5 h-5 text-blue-600" />
                            </div>
                            <p className="text-3xl font-medium mb-1">7</p>
                            <p className="text-xs text-gray-500">Workouts completed</p>
                        </div>

                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-sm text-gray-600">Total Hours</p>
                                <Clock className="w-5 h-5 text-green-600" />
                            </div>
                            <p className="text-3xl font-medium mb-1">42</p>
                            <p className="text-xs text-gray-500">Training time (hours)</p>
                        </div>

                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-sm text-gray-600">Consistency</p>
                                <TrendingUp className="w-5 h-5 text-purple-600" />
                            </div>
                            <p className="text-3xl font-medium mb-1">85%</p>
                            <p className="text-xs text-gray-500">Attendance rate</p>
                        </div>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="mt-6 bg-white rounded-lg border border-gray-200 p-6">
                    <h3 className="text-lg mb-4">Recent Activity</h3>
                    <div className="space-y-3">
                        {recentActivities.map((activity) => (
                            <div
                                key={activity.id}
                                className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activity.type === 'workout' ? 'bg-blue-100' :
                                    activity.type === 'session' ? 'bg-green-100' :
                                        'bg-purple-100'
                                    }`}>
                                    {activity.type === 'workout' ? (
                                        <Dumbbell className={`w-5 h-5 ${activity.type === 'workout' ? 'text-blue-600' : 'text-gray-600'
                                            }`} />
                                    ) : activity.type === 'session' ? (
                                        <CalendarIcon className="w-5 h-5 text-green-600" />
                                    ) : (
                                        <Mail className="w-5 h-5 text-purple-600" />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium">{activity.title}</p>
                                    <p className="text-xs text-gray-500">
                                        {activity.date} at {activity.time}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {athlete.status === 'Frozen' && (
                    <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm text-blue-800">
                            <span className="font-medium">Note:</span> This athlete's account is currently frozen.
                            All historical data is preserved and accessible. You can unfreeze this account from the athletes list.
                        </p>
                    </div>
                )}
            </div>
        </>
    );
}
