import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, CheckCircle2 } from 'lucide-react';

export default function AthleteCalendar() {
    const navigate = useNavigate();
    const [currentDate, setCurrentDate] = useState(new Date());

    // Mock Data: Assigned Plan
    const assignedPlan = {
        name: "Strength & Conditioning Phase 1",
        coach: "Coach Dave",
        duration: "4 Weeks"
    };

    const getDaysInMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    // Mock workout status for specific dates (just simpler logic for demo)
    const getWorkoutStatus = (day: number) => {
        if (day % 7 === 0) return 'rest';
        if (day % 3 === 0) return 'completed';
        return 'pending';
    };

    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const blanks = Array.from({ length: firstDay }, (_, i) => i);

    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
                <div className="flex items-center gap-2 bg-white rounded-lg p-1 border border-gray-200">
                    <button onClick={prevMonth} className="p-1 hover:bg-gray-100 rounded-md transition-colors">
                        <ChevronLeft className="w-5 h-5 text-gray-500" />
                    </button>
                    <span className="text-sm font-medium text-gray-900 w-32 text-center">
                        {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </span>
                    <button onClick={nextMonth} className="p-1 hover:bg-gray-100 rounded-md transition-colors">
                        <ChevronRight className="w-5 h-5 text-gray-500" />
                    </button>
                </div>
            </div>

            {/* Plan Info Card */}
            <div
                onClick={() => navigate('/athlete/plan')}
                className="bg-blue-600 rounded-xl p-5 text-white shadow-lg shadow-blue-200 cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
                <div className="flex items-start justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <CalendarIcon className="w-4 h-4 text-blue-200" />
                            <span className="text-xs font-medium text-blue-100 uppercase tracking-wider">Current Plan</span>
                        </div>
                        <h2 className="text-xl font-bold mb-1">{assignedPlan.name}</h2>
                        <p className="text-blue-100 text-sm">Assigned by {assignedPlan.coach}</p>
                    </div>
                    <div className="bg-white/20 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                        {assignedPlan.duration}
                    </div>
                </div>
            </div>

            {/* Calendar Grid */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                {/* Days Header */}
                <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                        <div key={day} className="py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {day}
                        </div>
                    ))}
                </div>

                {/* Days Grid */}
                <div className="grid grid-cols-7">
                    {blanks.map((blank) => (
                        <div key={`blank-${blank}`} className="aspect-square bg-gray-50/50 border-b border-r border-gray-100 last:border-r-0"></div>
                    ))}

                    {days.map((day) => {
                        const status = getWorkoutStatus(day);
                        const isToday = day === new Date().getDate() &&
                            currentDate.getMonth() === new Date().getMonth() &&
                            currentDate.getFullYear() === new Date().getFullYear();

                        return (
                            <div
                                key={day}
                                className={`aspect-square border-b border-r border-gray-100 last:border-r-0 relative hover:bg-gray-50 transition-colors cursor-pointer group ${isToday ? 'bg-blue-50/50' : ''
                                    }`}
                            >
                                <div className={`absolute top-2 left-2 text-sm font-medium ${isToday ? 'text-blue-600' : 'text-gray-700'}`}>
                                    {day}
                                </div>

                                {/* Workout Indicators */}
                                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                                    {status === 'completed' && (
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                                    )}
                                    {status === 'pending' && (
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                                    )}
                                    {status === 'rest' && (
                                        <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-gray-500 justify-center">
                <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span>Completed</span>
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span>Planned</span>
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                    <span>Rest</span>
                </div>
            </div>
        </div>
    );
}
