import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Calendar, Info, Dumbbell } from 'lucide-react';

export default function AthletePlanDetail() {
    const navigate = useNavigate();

    // Mock Data: Detailed Plan
    const plan = {
        name: "Strength & Conditioning Phase 1",
        coach: "Coach Dave",
        duration: "4 Weeks",
        description: "Focus on building foundational strength and hypertrophy. Includes 4 days of lifting and 2 days of conditioning.",
        schedule: [
            {
                week: 1,
                workouts: [
                    { day: 'Mon', title: 'Upper Body Power', duration: '60 min' },
                    { day: 'Tue', title: 'Rest', duration: '-' },
                    { day: 'Wed', title: 'Lower Body Strength', duration: '75 min' },
                    { day: 'Thu', title: 'Active Recovery', duration: '30 min' },
                    { day: 'Fri', title: 'Full Body Circuit', duration: '45 min' },
                    { day: 'Sat', title: 'Cardio Intervals', duration: '40 min' },
                    { day: 'Sun', title: 'Rest', duration: '-' },
                ]
            },
            {
                week: 2,
                workouts: [
                    { day: 'Mon', title: 'Upper Body Hypertrophy', duration: '60 min' },
                    { day: 'Tue', title: 'Rest', duration: '-' },
                    { day: 'Wed', title: 'Lower Body Power', duration: '75 min' },
                    { day: 'Thu', title: 'Mobility Flow', duration: '30 min' },
                    { day: 'Fri', title: 'Full Body Strength', duration: '50 min' },
                    { day: 'Sat', title: 'Steady State Cardio', duration: '45 min' },
                    { day: 'Sun', title: 'Rest', duration: '-' },
                ]
            }
        ]
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-2">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <ChevronLeft className="w-5 h-5 text-gray-500" />
                </button>
                <h1 className="text-xl font-bold text-gray-900">Plan Details</h1>
            </div>

            {/* Plan Overview Card */}
            <div className="bg-blue-600 rounded-xl p-6 text-white shadow-lg">
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <h2 className="text-2xl font-bold mb-1">{plan.name}</h2>
                        <p className="text-blue-100">Assigned by {plan.coach}</p>
                    </div>
                    <div className="bg-white/20 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                        {plan.duration}
                    </div>
                </div>
                <p className="text-blue-50 text-sm leading-relaxed">{plan.description}</p>
            </div>

            {/* Schedule */}
            <div className="space-y-6">
                {plan.schedule.map((week) => (
                    <div key={week.week} className="space-y-3">
                        <h3 className="font-semibold text-gray-900 border-b border-gray-100 pb-2">Week {week.week}</h3>
                        <div className="space-y-2">
                            {week.workouts.map((workout, index) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-xs font-bold text-gray-500">
                                            {workout.day.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900 text-sm">{workout.title}</p>
                                            <p className="text-xs text-gray-500">{workout.duration}</p>
                                        </div>
                                    </div>
                                    {workout.title !== 'Rest' && (
                                        <Dumbbell className="w-4 h-4 text-gray-300" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
