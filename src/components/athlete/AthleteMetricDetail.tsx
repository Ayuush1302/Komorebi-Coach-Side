import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Plus, FileText } from 'lucide-react';

export default function AthleteMetricDetail() {
    const navigate = useNavigate();
    const { metricId } = useParams();
    const [timeRange, setTimeRange] = useState<'week' | 'month' | 'quarter' | 'all'>('week');

    // Mock metric names
    const metricNames: Record<string, string> = {
        strain: 'Daily Strain',
        recovery: 'Recovery',
        sleep: 'Sleep Performance',
        hrv: 'Avg HR Variability',
        weight: 'Weight',
        calories: 'Calories Burned'
    };

    const metricName = metricNames[metricId || ''] || 'Metric';

    return (
        <div className="min-h-screen bg-blue-500">
            {/* Header */}
            <div className="px-4 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-1 hover:bg-blue-400 rounded-full transition-colors"
                    >
                        <ChevronLeft className="w-6 h-6 text-white" />
                    </button>
                    <h1 className="text-xl font-semibold text-white">{metricName}</h1>
                </div>
                <button className="p-2 hover:bg-blue-400 rounded-full transition-colors">
                    <Plus className="w-5 h-5 text-white" />
                </button>
            </div>

            {/* Content Card */}
            <div className="bg-gray-50 rounded-t-3xl min-h-[calc(100vh-80px)] mt-4 px-4 py-6">
                {/* Time Range Toggle */}
                <div className="flex bg-gray-100 rounded-full p-1 mb-8">
                    {(['week', 'month', 'quarter', 'all'] as const).map((range) => (
                        <button
                            key={range}
                            onClick={() => setTimeRange(range)}
                            className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all ${timeRange === range
                                    ? 'bg-blue-500 text-white shadow-md'
                                    : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            {range.charAt(0).toUpperCase() + range.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Empty State */}
                <div className="flex flex-col items-center justify-center py-16">
                    <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                        <FileText className="w-12 h-12 text-blue-400" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">No data</h2>
                    <p className="text-gray-500 mb-8">in chosen time</p>

                    <button className="bg-blue-500 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-600 transition-colors shadow-lg shadow-blue-200">
                        + Add Now
                    </button>
                </div>

                {/* Overall Changes Section */}
                <div className="mt-auto pt-8 border-t border-gray-200">
                    <h3 className="font-bold text-gray-900 text-center mb-2">Overall Changes</h3>
                    <p className="text-gray-500 text-sm text-center">You currently have no entries to show.</p>
                </div>
            </div>
        </div>
    );
}
