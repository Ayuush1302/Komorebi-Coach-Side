import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Activity, Zap, Moon, Heart, Scale } from 'lucide-react';
import AthletePhotos from './AthletePhotos';

export default function AthleteAnalytics() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'metrics' | 'photos'>('metrics');

    // Mock Data for "Graphs"
    const weeklyActivity = [60, 45, 80, 50, 90, 30, 0];

    const metrics = [
        { id: 'strain', icon: Zap, label: 'Daily Strain', value: '14.5', subtitle: 'High intensity day', color: 'text-orange-600', bg: 'bg-orange-50' },
        { id: 'recovery', icon: Activity, label: 'Recovery', value: '82%', subtitle: 'Ready to train', color: 'text-green-600', bg: 'bg-green-50' },
        { id: 'hrv', icon: Heart, label: 'Avg HRV', value: '45ms', subtitle: 'Normal range', color: 'text-red-500', bg: 'bg-red-50' },
        { id: 'weight', icon: Scale, label: 'Weight', value: '72kg', subtitle: 'Last recorded', color: 'text-purple-600', bg: 'bg-purple-50' },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Data</h1>
            </div>

            {/* Tab Toggle */}
            <div className="flex bg-gray-100 rounded-full p-1">
                <button
                    onClick={() => setActiveTab('metrics')}
                    className={`flex-1 py-2.5 px-4 rounded-full text-sm font-medium transition-all ${activeTab === 'metrics'
                            ? 'bg-white text-gray-900 shadow-sm'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                >
                    Metrics
                </button>
                <button
                    onClick={() => setActiveTab('photos')}
                    className={`flex-1 py-2.5 px-4 rounded-full text-sm font-medium transition-all ${activeTab === 'photos'
                            ? 'bg-blue-500 text-white shadow-sm'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                >
                    Photos
                </button>
            </div>

            {activeTab === 'metrics' ? (
                <>
                    {/* Main Graph Card */}
                    <div
                        onClick={() => navigate('/athlete/analytics/activity')}
                        className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                    >
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
                        {metrics.map((metric) => (
                            <div
                                key={metric.id}
                                onClick={() => navigate(`/athlete/analytics/${metric.id}`)}
                                className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                            >
                                <div className={`flex items-center gap-2 mb-2 ${metric.color}`}>
                                    <metric.icon className="w-4 h-4" />
                                    <span className="text-sm font-medium">{metric.label}</span>
                                </div>
                                <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                                <p className="text-xs text-gray-500 mt-1">{metric.subtitle}</p>
                            </div>
                        ))}

                        {/* Sleep - Full Width */}
                        <div
                            onClick={() => navigate('/athlete/analytics/sleep')}
                            className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm col-span-2 cursor-pointer hover:shadow-md transition-shadow"
                        >
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
                </>
            ) : (
                <AthletePhotos />
            )}
        </div>
    );
}
