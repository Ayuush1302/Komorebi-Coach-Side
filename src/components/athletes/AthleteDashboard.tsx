import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';

import { ArrowLeft, Mail, Calendar as CalendarIcon, Activity, Dumbbell, TrendingUp, Clock, Zap, List, Plus, Loader2, Pencil } from 'lucide-react';
import { useState } from 'react';
import { usePlans } from '../../context/PlansContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '../ui/drawer';
import { toast } from 'sonner';
import { Calendar } from '../ui/calendar';
import { format, addWeeks } from 'date-fns';
import { DateRange } from 'react-day-picker';

export default function AthleteDashboard() {
    const { athleteId } = useParams();
    const { athletes } = useData();
    const navigate = useNavigate();
    const [showAssignModal, setShowAssignModal] = useState(false);
    const [showPlanSheet, setShowPlanSheet] = useState(false);
    const [showDateModal, setShowDateModal] = useState(false);
    const [assigningId, setAssigningId] = useState<string | null>(null);
    const [selectedPlan, setSelectedPlan] = useState<any>(null);
    const [dateRange, setDateRange] = useState<DateRange | undefined>();
    const [assignedPlan, setAssignedPlan] = useState<any>(null);
    const { customPlans } = usePlans();

    // Template plans for assignment
    const templatePlans = [
        {
            id: 'p1',
            name: '12-Week Fat Loss',
            description: 'Comprehensive fat loss program combining strength training and cardio.',
            difficulty: 'Beginner',
            duration: '12 weeks'
        },
        {
            id: 'p2',
            name: 'Marathon Training',
            description: 'Progressive running program to prepare you for your first marathon.',
            difficulty: 'Intermediate',
            duration: '16 weeks'
        },
        {
            id: 'p3',
            name: 'Beginner Strength',
            description: 'Build foundational strength with this beginner-friendly program.',
            difficulty: 'Beginner',
            duration: '8 weeks'
        }
    ];

    const allPlans = [...templatePlans, ...customPlans];

    const handleSelectPlan = (plan: any) => {
        setSelectedPlan(plan);
        // Default duration 4 weeks if not specified
        const durationWeeks = plan.duration ? parseInt(plan.duration) : 4;
        const startDate = new Date();
        const endDate = addWeeks(startDate, durationWeeks);
        setDateRange({ from: startDate, to: endDate });

        setShowPlanSheet(false);
        setTimeout(() => setShowDateModal(true), 300); // Small delay for smooth transition
    };

    const handleConfirmAssignment = () => {
        if (!selectedPlan || !dateRange?.from) return;

        setAssigningId(selectedPlan.id);

        // Simulate API call
        setTimeout(() => {
            setAssignedPlan({
                ...selectedPlan,
                startDate: dateRange.from,
                endDate: dateRange.to || dateRange.from
            });
            setAssigningId(null);
            setShowDateModal(false);
            setShowAssignModal(false);
            toast.success('Plan assigned successfully to ' + (athlete?.name || 'athlete'));
        }, 1500);
    };

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
                        onClick={() => setShowAssignModal(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                    >
                        <Plus className="w-5 h-5" />
                        <span className="font-medium">Assign a Workout</span>
                    </button>
                </div>

                {/* Assigned Plan Card */}
                {assignedPlan && (
                    <div className="bg-white rounded-lg border border-blue-100 shadow-sm p-6 mb-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4">
                            <button
                                onClick={() => navigate(`/plans/${assignedPlan.id}`)}
                                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                            >
                                <Pencil className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="flex items-start gap-4 z-10 relative">
                            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                                <Activity className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-1">{assignedPlan.name}</h3>
                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                    <div className="flex items-center gap-1.5">
                                        <CalendarIcon className="w-4 h-4" />
                                        <span>
                                            {assignedPlan.startDate ? format(assignedPlan.startDate, 'MMM d, yyyy') : 'Start Date'} -
                                            {assignedPlan.endDate ? format(assignedPlan.endDate, 'MMM d, yyyy') : 'End Date'}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Dumbbell className="w-4 h-4" />
                                        <span>{assignedPlan.difficulty || 'General'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

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
            {/* Assign Workout Modal */}
            <Dialog open={showAssignModal} onOpenChange={setShowAssignModal}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-xl">Assign a Workout</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        {/* AI Workout Creator */}
                        <button
                            disabled
                            className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 bg-gray-50 opacity-70 cursor-not-allowed text-left w-full"
                        >
                            <div className="p-3 bg-purple-100 text-purple-600 rounded-lg shrink-0">
                                <Zap className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-medium text-gray-900">AI Workout Creator</h3>
                                    <span className="px-2 py-0.5 bg-gray-200 text-gray-600 text-[10px] font-medium rounded-full uppercase tracking-wider">
                                        Coming Soon
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500">Generate a personalized plan instantly</p>
                            </div>
                        </button>

                        {/* Existing Plans */}
                        <button
                            onClick={() => setShowPlanSheet(true)}
                            className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all group text-left w-full"
                        >
                            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg group-hover:bg-blue-200 transition-colors shrink-0">
                                <List className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-900 group-hover:text-blue-700 mb-1">Existing Plans</h3>
                                <p className="text-sm text-gray-500 group-hover:text-blue-600">Choose from your library or templates</p>
                            </div>
                        </button>

                        {/* Create New Plan */}
                        <button
                            onClick={() => navigate('/create/plan')}
                            className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-green-500 hover:bg-green-50 transition-all group text-left w-full"
                        >
                            <div className="p-3 bg-green-100 text-green-600 rounded-lg group-hover:bg-green-200 transition-colors shrink-0">
                                <Plus className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-900 group-hover:text-green-700 mb-1">Create Plan</h3>
                                <p className="text-sm text-gray-500 group-hover:text-green-600">Build a new training plan from scratch</p>
                            </div>
                        </button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Plans Selection Sheet */}
            <Drawer open={showPlanSheet} onOpenChange={setShowPlanSheet}>
                <DrawerContent>
                    <div className="mx-auto w-full max-w-md">
                        <DrawerHeader>
                            <DrawerTitle>Select a Plan</DrawerTitle>
                        </DrawerHeader>
                        <div className="p-4 h-[60vh] overflow-y-auto space-y-3">
                            {allPlans.length === 0 ? (
                                <div className="text-center py-8">
                                    <p className="text-gray-500">No plans found.</p>
                                    <button onClick={() => navigate('/create/plan')} className="text-blue-600 font-medium mt-2">Create one now</button>
                                </div>
                            ) : (
                                allPlans.map((plan) => (
                                    <div
                                        key={plan.id}
                                        onClick={() => handleSelectPlan(plan)}
                                        className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-all ${assigningId === plan.id
                                            ? 'border-blue-500 bg-blue-50'
                                            : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                                            }`}
                                    >
                                        <div>
                                            <h4 className="font-medium text-gray-900">{plan.name}</h4>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className={`text-xs px-2 py-0.5 rounded-full ${plan.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                                                    plan.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                                                        'bg-red-100 text-red-700'
                                                    }`}>
                                                    {plan.difficulty}
                                                </span>
                                                {plan.duration && <span className="text-xs text-gray-500">{plan.duration}</span>}
                                            </div>
                                        </div>
                                        {assigningId === plan.id ? (
                                            <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        navigate(`/plans/${plan.id}`);
                                                    }}
                                                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                                                    title="Edit Plan"
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                </button>
                                                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-blue-100 hover:text-blue-600 transition-colors">
                                                    <Plus className="w-4 h-4" />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </DrawerContent>
            </Drawer>

            {/* Date Selection Modal */}
            <Dialog open={showDateModal} onOpenChange={setShowDateModal}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Assign {selectedPlan?.name}</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Duration
                                </label>
                                <div className="flex justify-center p-2 border rounded-md">
                                    <Calendar
                                        mode="range"
                                        selected={dateRange}
                                        onSelect={setDateRange}
                                        className="rounded-md border-0"
                                        numberOfMonths={1}
                                    />
                                </div>
                            </div>
                            <div className="flex items-center justify-between text-sm text-gray-500 px-1">
                                <span>From: {dateRange?.from ? format(dateRange.from, 'PPP') : 'Select start'}</span>
                                <span>To: {dateRange?.to ? format(dateRange.to, 'PPP') : 'Select end'}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end gap-3">
                        <button
                            onClick={() => setShowDateModal(false)}
                            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleConfirmAssignment}
                            disabled={!dateRange?.from || assigningId === selectedPlan?.id}
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {assigningId === selectedPlan?.id && <Loader2 className="w-4 h-4 animate-spin" />}
                            Confirm Assignment
                        </button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
