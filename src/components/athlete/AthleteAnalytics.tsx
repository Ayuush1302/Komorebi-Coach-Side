import { BarChart, Activity, Zap, Moon } from 'lucide-react';

export default function AthleteAnalytics() {
    // Mock Data for "Graphs"
    const weeklyActivity = [60, 45, 80, 50, 90, 30, 0];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
                <select className="bg-white border border-gray-200 text-sm rounded-lg px-3 py-1.5 outline-none focus:ring-2 focus:ring-blue-500">
                    <option>This Week</option>
                    <option>Last Week</option>
                    <option>This Month</option>
                </select>
            </div>

            {/* Main Graph Card */}
            <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 mb-6">
                    <BarChart className="w-5 h-5 text-blue-600" />
                    <h2 className="font-semibold text-gray-900">Activity Volume</h2>
                </div>

                {/* Simple CSS Bar Chart */}
                <div className="flex items-end justify-between h-40 gap-2">
                    {weeklyActivity.map((value, index) => (
                        <div key={index} className="w-full bg-blue-50 rounded-t-sm relative group">
                            <div
                                className="absolute bottom-0 left-0 right-0 bg-blue-500 rounded-t-sm transition-all duration-500"
                                style={{ height: `${value}%` }}
                            ></div>
                            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-gray-400">
                                {['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-8 text-center text-sm text-gray-500">
                    <span className="font-medium text-gray-900">355 min</span> total active time
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-4">
                {/* Strain */}
                <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-2 mb-2 text-orange-600">
                        <Zap className="w-4 h-4" />
                        <span className="text-sm font-medium">Daily Strain</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">14.5</p>
                    <p className="text-xs text-gray-500 mt-1">High intensity day</p>
                </div>

                {/* Recovery */}
                <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-2 mb-2 text-green-600">
                        <Activity className="w-4 h-4" />
                        <span className="text-sm font-medium">Recovery</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">82%</p>
                    <p className="text-xs text-gray-500 mt-1">Ready to train</p>
                </div>

                {/* Sleep */}
                <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm col-span-2">
                    <div className="flex items-center gap-2 mb-2 text-indigo-600">
                        <Moon className="w-4 h-4" />
                        <span className="text-sm font-medium">Sleep Performance</span>
                    </div>
                    <div className="flex items-end gap-4">
                        <p className="text-2xl font-bold text-gray-900">7h 42m</p>
                        <p className="text-sm text-gray-500 pb-1">Efficiency 92%</p>
                    </div>

                    <div className="w-full bg-gray-100 h-2 rounded-full mt-3 overflow-hidden">
                        <div className="bg-indigo-500 h-full rounded-full" style={{ width: '85%' }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
