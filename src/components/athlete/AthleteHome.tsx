import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Watch, Activity, ChevronRight } from 'lucide-react';

export default function AthleteHome() {
    const navigate = useNavigate();
    const [deviceConnected, setDeviceConnected] = useState(false);

    // Mock Data
    const todaysTask = {
        title: "Upper Body Strength",
        duration: "45 min",
        exercises: 6,
        completed: false
    };

    const metrics = [
        { label: 'Sleep', value: '7h 30m', status: 'optimal' },
        { label: 'Recovery', value: '85%', status: 'high' },
        { label: 'HRV', value: '42 ms', status: 'normal' },
    ];

    return (
        <div className="space-y-6">
            {/* Welcome Section */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Hello, Athlete</h1>
                <p className="text-gray-500">Ready to crush your goals today?</p>
            </div>

            {/* Connect Device CTA */}
            {!deviceConnected && (
                <div className="bg-blue-600 rounded-xl p-4 text-white flex items-center justify-between shadow-lg shadow-blue-200">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-lg">
                            <Watch className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-semibold">Connect Device</h3>
                            <p className="text-sm text-blue-100">Sync your health metrics</p>
                        </div>
                    </div>
                    <button
                        onClick={() => navigate('/athlete/integrations')}
                        className="px-4 py-1.5 bg-white text-blue-600 text-sm font-medium rounded-lg hover:bg-blue-50 transition-colors"
                    >
                        Connect
                    </button>
                </div>
            )}

            {/* Today's Task */}
            <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="font-semibold text-gray-900">Today's Task</h2>
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Scheduled</span>
                </div>

                <div className="flex items-start gap-4">
                    <div className="p-3 bg-orange-100 text-orange-600 rounded-xl">
                        <Activity className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{todaysTask.title}</h3>
                        <p className="text-sm text-gray-500 mt-0.5">{todaysTask.duration} • {todaysTask.exercises} Exercises</p>
                    </div>
                    <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Daily Metrics Preview */}
            <div className="grid grid-cols-3 gap-3">
                {metrics.map((metric) => (
                    <div key={metric.label} className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm text-center">
                        <p className="text-xs text-gray-500 mb-1">{metric.label}</p>
                        <p className="font-semibold text-gray-900">{metric.value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
