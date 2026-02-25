import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Menu,
    ChevronDown,
    Bell,
    Plus,
    MoreHorizontal,
    Watch,
} from 'lucide-react';

export default function AthleteHome() {
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [hasConnectedDevice, setHasConnectedDevice] = useState(false);

    // Helper to format date for header (e.g., "FEB '26")
    const formatHeaderDate = (date: Date) => {
        return date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }).toUpperCase().replace(' ', ' \'');
    };

    // Helper to generate sliding calendar days
    const getCalendarDays = () => {
        const days = [];
        const start = new Date(selectedDate);
        start.setDate(start.getDate() - 3); // Centered range

        for (let i = 0; i < 7; i++) {
            const d = new Date(start);
            d.setDate(start.getDate() + i);
            days.push(d);
        }
        return days;
    };

    const days = getCalendarDays();

    // Mock Data
    const metrics = {
        blocks: 0,
        minutes: 0,
        intensity: '-/10',
        kg: 0,
        readiness: '4/5'
    };

    const coachComment = {
        author: "Ayush Chaurasia",
        text: "has published a new session on ayush chaurasia",
        time: "6 hours ago"
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-24 text-gray-900">
            {/* Custom Header */}
            <header className="sticky top-0 z-50 bg-white pt-4 pb-2 px-4 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    {/* Left: Hamburger */}
                    <button className="p-2 -ml-2 text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
                        <Menu className="w-6 h-6" />
                    </button>

                    {/* Middle: Date Selector */}
                    <button className="flex items-center gap-1 font-bold text-xl italic tracking-wider text-gray-900">
                        {formatHeaderDate(selectedDate)}
                        <ChevronDown className="w-4 h-4 ml-1" />
                    </button>

                    {/* Right: Today & Bell */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setSelectedDate(new Date())}
                            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-xs font-bold transition-colors border border-gray-200"
                        >
                            TODAY
                        </button>
                        <button
                            onClick={() => navigate('/athlete/profile/notifications')}
                            className="p-2 -mr-2 text-gray-700 hover:bg-gray-100 rounded-full transition-colors relative"
                        >
                            <Bell className="w-6 h-6" />
                            {/* Notification Dot */}
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                    </div>
                </div>

                {/* Sliding Calendar */}
                <div className="flex justify-between items-center text-center pb-2">
                    {days.map((date, index) => {
                        const isSelected = date.getDate() === selectedDate.getDate() &&
                            date.getMonth() === selectedDate.getMonth();

                        return (
                            <div
                                key={index}
                                onClick={() => setSelectedDate(date)}
                                className={`flex flex-col items-center gap-1 cursor-pointer transition-colors px-2 py-1 rounded-lg ${isSelected ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'
                                    }`}
                            >
                                <span className={`text-xs font-bold uppercase min-w-[20px] ${isSelected ? 'scale-110' : ''}`}>
                                    {date.getDate()}
                                </span>
                                {isSelected && (
                                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1"></div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </header>

            <main className="px-4 space-y-4 pt-6">
                {/* Streaks Card */}
                <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-3">
                        <span className="bg-black text-white text-[10px] font-bold px-2 py-0.5 rounded-full">PRO</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold text-gray-900 flex items-center gap-2">
                            Streaks <ChevronDown className="w-4 h-4 text-gray-400" />
                        </h3>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed max-w-[90%]">
                        Your weekly streak starts with today. Log a session to kick it off!
                    </p>
                </div>

                {/* Date Header for Content */}
                <div className="flex items-center justify-between px-1">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center text-xs font-bold text-white shadow-sm">
                            AC
                        </div>
                        <span className="text-gray-900 font-bold text-lg border-b-2 border-gray-200 pb-0.5">
                            {selectedDate.toISOString().split('T')[0]}
                        </span>
                    </div>
                    <button className="p-2 text-gray-400 hover:text-gray-900 transition-colors">
                        <MoreHorizontal className="w-6 h-6" />
                    </button>
                </div>

                {/* Connect Device or Metrics */}
                {!hasConnectedDevice ? (
                    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex flex-col items-center text-center space-y-4 py-8">
                        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                            <Watch className="w-8 h-8" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Connect Your Device</h3>
                            <p className="text-sm text-gray-500 mt-1 max-w-[240px]">
                                Sync your metrics to see your daily breakdown and readiness score.
                            </p>
                        </div>
                        <button
                            onClick={() => setHasConnectedDevice(true)}
                            className="w-full max-w-xs py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-blue-100"
                        >
                            Connect Device
                        </button>
                    </div>
                ) : (
                    <>
                        {/* Main Metrics Card */}
                        <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm space-y-8 relative">
                            <span className="absolute top-4 right-4 bg-black text-white text-[10px] font-bold px-2 py-0.5 rounded-full">PRO</span>

                            {/* Top Row Metrics */}
                            <div className="grid grid-cols-4 gap-2 text-center">
                                <div className="flex flex-col items-center">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">BLOCKS</p>
                                    <p className="text-2xl font-black text-gray-900">{metrics.blocks}</p>
                                </div>
                                <div className="flex flex-col items-center">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">MINUTES</p>
                                    <p className="text-2xl font-black text-gray-900">{metrics.minutes}</p>
                                </div>
                                <div className="flex flex-col items-center">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">INTENSITY</p>
                                    <p className="text-2xl font-black text-gray-900">{metrics.intensity}</p>
                                </div>
                                <div className="flex flex-col items-center">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">KG</p>
                                    <p className="text-2xl font-black text-gray-900">{metrics.kg}</p>
                                </div>
                            </div>

                            {/* Graph Placeholder */}
                            <div className="border-t border-dashed border-gray-200 pt-6">
                                <p className="text-sm text-gray-900 font-bold mb-4">Keep Logging to See Trends</p>
                                <div className="h-12 w-full flex items-center justify-center relative bg-gray-50 rounded-lg overflow-hidden">
                                    {/* Mock trend line visual */}
                                    <svg className="w-full h-full text-green-500/20" viewBox="0 0 100 20" preserveAspectRatio="none">
                                        <path d="M0 20 L0 10 Q 50 0 100 10 L 100 20 Z" fill="currentColor" />
                                        <path d="M0 10 Q 50 0 100 10" stroke="#22c55e" strokeWidth="2" fill="none" />
                                    </svg>
                                </div>
                            </div>

                            {/* Readiness */}
                            <div className="flex justify-between items-end border-t border-dashed border-gray-200 pt-6">
                                <div>
                                    <p className="text-[10px] text-gray-400 font-medium mb-1">Jan 11</p>
                                    <p className="text-xs font-bold text-gray-900 uppercase">READINESS</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-4xl font-black text-gray-900">{metrics.readiness}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] text-gray-400 font-medium mb-1 text-right">Feb 11</p>
                                </div>
                            </div>

                            <button
                                onClick={() => navigate('/athlete/analytics')}
                                className="w-full py-3.5 bg-gray-900 hover:bg-black text-white font-semibold text-sm rounded-xl transition-colors shadow-lg shadow-gray-200"
                            >
                                View Summary & Insights
                            </button>
                        </div>

                        {/* Comments Section */}
                        <div>
                            <button className="text-blue-600 text-sm font-bold mb-3 hover:underline flex items-center gap-1">
                                View All Comments
                            </button>
                            <div className="bg-gray-100 rounded-2xl p-4 border border-gray-200 flex gap-4 items-start">
                                <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-xs font-bold text-white shrink-0 shadow-sm">
                                    AC
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-600 leading-snug">
                                        <span className="text-gray-900 font-bold block mb-0.5">{coachComment.author}</span>
                                        {coachComment.text}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-2 font-medium">{coachComment.time}</p>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {/* Bottom Actions */}
                <div className="flex items-center justify-between py-6 px-2">
                    <button className="flex items-center gap-3 text-gray-900 font-bold group">
                        <div className="w-8 h-8 rounded-full border-2 border-blue-600 flex items-center justify-center text-blue-600 group-hover:bg-blue-50 transition-colors">
                            <Plus className="w-4 h-4" />
                        </div>
                        Add Exercise
                    </button>

                    <button className="flex items-center gap-3 text-gray-900 font-bold group">
                        <div className="w-8 h-8 rounded-full border-2 border-blue-600 flex items-center justify-center text-blue-600 group-hover:bg-blue-50 transition-colors">
                            <Plus className="w-4 h-4" />
                        </div>
                        Add Circuit
                    </button>
                </div>
            </main>

            {/* Floating Action Button */}
            <button className="fixed bottom-20 right-4 w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-xl shadow-blue-200 z-40 hover:scale-105 transition-transform hover:bg-blue-700">
                <Plus className="w-8 h-8" />
            </button>
        </div>
    );
}
