import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../layout/AppLayout';
import { ArrowLeft, Copy, Trash2, Plus, ChevronRight, Upload, X } from 'lucide-react';
import WorkoutSelectionModal from './WorkoutSelectionModal';
import { usePlans } from '../../context/PlansContext';

interface DayWorkout {
  id: string;
  day: string;
  workoutId?: string;
  workoutName?: string;
  workoutType?: string;
  exerciseCount?: number;
  duration?: number;
  isRest: boolean;
}

interface Week {
  weekNumber: number;
  days: DayWorkout[];
}

export default function PlanBuilder() {
  const navigate = useNavigate();
  const { addCustomPlan } = usePlans();
  
  // Step management
  const [currentStep, setCurrentStep] = useState(1);
  
  // Step 1: Basic Info
  const [planName, setPlanName] = useState('');
  const [description, setDescription] = useState('');
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [goal, setGoal] = useState('');
  const [duration, setDuration] = useState(8);
  const [daysPerWeek, setDaysPerWeek] = useState(4);
  const [athleteType, setAthleteType] = useState('');
  
  // Step 2: Structure
  const [currentWeekIndex, setCurrentWeekIndex] = useState(0);
  const [showWorkoutModal, setShowWorkoutModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState<DayWorkout | null>(null);
  const [selectedWeekIndex, setSelectedWeekIndex] = useState<number>(0);
  
  const [weeks, setWeeks] = useState<Week[]>([
    {
      weekNumber: 1,
      days: [
        { id: '1-mon', day: 'Monday', isRest: false },
        { id: '1-tue', day: 'Tuesday', isRest: false },
        { id: '1-wed', day: 'Wednesday', isRest: false },
        { id: '1-thu', day: 'Thursday', isRest: false },
        { id: '1-fri', day: 'Friday', isRest: false },
        { id: '1-sat', day: 'Saturday', isRest: false },
        { id: '1-sun', day: 'Sunday', isRest: false },
      ],
    },
  ]);

  const goals = ['Fat Loss', 'Muscle Gain', 'Strength', 'Endurance', 'Athletic Performance', 'General Fitness'];
  const athleteTypes = ['Beginner', 'Intermediate', 'Advanced', 'Runner', 'Cyclist', 'All'];

  const currentWeek = weeks[currentWeekIndex];

  // Calculate total workouts
  const totalWorkouts = weeks.reduce((total, week) => {
    return total + week.days.filter(day => day.workoutId).length;
  }, 0);

  const handleCloneWeek = () => {
    const newWeek: Week = {
      weekNumber: weeks.length + 1,
      days: currentWeek.days.map(day => ({
        ...day,
        id: `${weeks.length + 1}-${day.day.toLowerCase().slice(0, 3)}`,
      })),
    };
    setWeeks([...weeks, newWeek]);
  };

  const handleAddWorkout = (day: DayWorkout) => {
    setSelectedDay(day);
    setSelectedWeekIndex(weeks.findIndex(w => w.days.some(d => d.id === day.id)));
    setShowWorkoutModal(true);
  };

  const handleWorkoutSelected = (workout: any) => {
    if (!selectedDay) return;

    const updatedWeeks = [...weeks];
    const weekIndex = selectedWeekIndex;
    const week = updatedWeeks[weekIndex];
    const dayIndex = week.days.findIndex(d => d.id === selectedDay.id);

    updatedWeeks[weekIndex].days[dayIndex] = {
      ...selectedDay,
      workoutId: workout.id,
      workoutName: workout.name,
      workoutType: workout.type,
      exerciseCount: workout.exerciseCount,
      duration: workout.duration,
      isRest: false,
    };

    setWeeks(updatedWeeks);
    setShowWorkoutModal(false);
    setSelectedDay(null);
  };

  const handleRemoveWorkout = (weekIndex: number, dayId: string) => {
    const updatedWeeks = [...weeks];
    const dayIndex = updatedWeeks[weekIndex].days.findIndex(d => d.id === dayId);
    
    updatedWeeks[weekIndex].days[dayIndex] = {
      ...updatedWeeks[weekIndex].days[dayIndex],
      workoutId: undefined,
      workoutName: undefined,
      workoutType: undefined,
      exerciseCount: undefined,
      duration: undefined,
      isRest: false,
    };

    setWeeks(updatedWeeks);
  };

  const handleSetRestDay = (weekIndex: number, dayId: string) => {
    const updatedWeeks = [...weeks];
    const dayIndex = updatedWeeks[weekIndex].days.findIndex(d => d.id === dayId);
    
    updatedWeeks[weekIndex].days[dayIndex] = {
      ...updatedWeeks[weekIndex].days[dayIndex],
      workoutId: undefined,
      workoutName: undefined,
      workoutType: undefined,
      exerciseCount: undefined,
      duration: undefined,
      isRest: true,
    };

    setWeeks(updatedWeeks);
  };

  const handleCloneSpecificWeek = (weekIndex: number) => {
    const weekToClone = weeks[weekIndex];
    const newWeek: Week = {
      weekNumber: weeks.length + 1,
      days: weekToClone.days.map(day => ({
        ...day,
        id: `${weeks.length + 1}-${day.day.toLowerCase().slice(0, 3)}`,
      })),
    };
    setWeeks([...weeks, newWeek]);
  };

  const handleDeleteWeek = (weekIndex: number) => {
    // Don't allow deleting if it's the only week
    if (weeks.length === 1) {
      return;
    }

    const updatedWeeks = weeks.filter((_, idx) => idx !== weekIndex);
    
    // Renumber the remaining weeks
    const renumberedWeeks = updatedWeeks.map((week, idx) => ({
      ...week,
      weekNumber: idx + 1,
      days: week.days.map(day => ({
        ...day,
        id: `${idx + 1}-${day.day.toLowerCase().slice(0, 3)}`,
      })),
    }));

    setWeeks(renumberedWeeks);
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate('/library/plans');
    }
  };

  const handleSaveAsTemplate = () => {
    // Create the custom plan object
    const newPlan = {
      id: `custom-${Date.now()}`,
      name: planName,
      description: description || `Custom ${goal} plan with ${totalWorkouts} total workouts`,
      backgroundImage: backgroundImage,
      goal: goal,
      duration: `${weeks.length} weeks`,
      workoutsPerWeek: daysPerWeek,
      difficulty: athleteType || 'All',
      weeks: weeks,
      totalWorkouts: totalWorkouts,
      createdAt: new Date(),
    };

    // Save to context
    addCustomPlan(newPlan);

    // Navigate to custom plans tab
    navigate('/library/plans?tab=custom');
  };

  const handleAssignToAthlete = () => {
    // Assignment logic here
    console.log('Assigning to athlete...');
    navigate('/library/plans');
  };

  return (
    <AppLayout>
      <div className="min-h-screen bg-[#F8F9FA] pb-20">
        {/* Header */}
        <div className="bg-white border-b border-[#E5E7EB] px-5 py-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={handleBack}
              className="p-2 -ml-2 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-[#1F2937]" />
            </button>
            <h1 className="text-xl font-semibold text-[#1F2937]">Create Training Plan</h1>
            <div className="w-10" /> {/* Spacer for centering */}
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center justify-between max-w-md mx-auto">
            {[1, 2, 3].map((step, index) => (
              <div key={step} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                      step <= currentStep
                        ? 'bg-[#3B82F6] text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {step}
                  </div>
                  <span className={`text-xs mt-2 ${step === currentStep ? 'text-[#1F2937] font-medium' : 'text-gray-500'}`}>
                    {step === 1 ? 'Basic Info' : step === 2 ? 'Structure' : 'Review'}
                  </span>
                </div>
                {index < 2 && (
                  <div className={`h-1 flex-1 mx-2 mb-6 rounded ${step < currentStep ? 'bg-[#3B82F6]' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Basic Info */}
        {currentStep === 1 && (
          <div className="p-5">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              {/* Plan Name */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#1F2937] mb-2">
                  Plan Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={planName}
                  onChange={(e) => setPlanName(e.target.value)}
                  className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                  placeholder="e.g., 12-Week Muscle Builder"
                />
              </div>

              {/* Description */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#1F2937] mb-2">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                  placeholder="Enter a brief description of the plan"
                  rows={3}
                />
              </div>

              {/* Background Image */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#1F2937] mb-2">
                  Background Image (optional)
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setBackgroundImage(reader.result as string);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                  />
                  {backgroundImage && (
                    <div className="absolute top-0 right-0 p-2">
                      <X
                        className="w-4 h-4 text-gray-500 hover:text-gray-700 cursor-pointer"
                        onClick={() => setBackgroundImage(null)}
                      />
                    </div>
                  )}
                </div>
                {backgroundImage && (
                  <div className="mt-2">
                    <img
                      src={backgroundImage}
                      alt="Background"
                      className="w-full h-20 object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>

              {/* Goal */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#1F2937] mb-2">
                  Goal <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent bg-white"
                  >
                    <option value="">Select a goal</option>
                    {goals.map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                  <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Duration and Days per week */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-[#1F2937] mb-2">
                    Duration (weeks)
                  </label>
                  <input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(parseInt(e.target.value) || 0)}
                    min="1"
                    max="52"
                    className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1F2937] mb-2">
                    Days per week
                  </label>
                  <input
                    type="number"
                    value={daysPerWeek}
                    onChange={(e) => setDaysPerWeek(parseInt(e.target.value) || 0)}
                    min="1"
                    max="7"
                    className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Athlete Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#1F2937] mb-2">
                  Athlete Type (optional)
                </label>
                <div className="relative">
                  <select
                    value={athleteType}
                    onChange={(e) => setAthleteType(e.target.value)}
                    className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent bg-white"
                  >
                    <option value="">Select athlete type</option>
                    {athleteTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-6">
              <button
                onClick={handleBack}
                className="flex items-center gap-2 px-4 py-2 text-[#6B7280] hover:text-[#1F2937] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <button
                onClick={handleNext}
                disabled={!planName || !goal}
                className="flex items-center gap-2 px-6 py-3 bg-[#3B82F6] text-white font-medium rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Structure */}
        {currentStep === 2 && (
          <>
            {/* All Weeks - Vertical Layout */}
            <div className="px-5 py-6 space-y-8">
              {weeks.map((week, weekIndex) => (
                <div key={week.weekNumber}>
                  {/* Week Header */}
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-semibold text-[#1F2937]">Week {week.weekNumber}</h2>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCloneSpecificWeek(weekIndex)}
                        className="flex items-center gap-2 px-3 py-2 text-[#3B82F6] text-sm font-medium hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                        Clone Week
                      </button>
                      <button
                        onClick={() => handleDeleteWeek(weekIndex)}
                        className="flex items-center gap-2 px-3 py-2 text-[#FF0000] text-sm font-medium hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete Week
                      </button>
                    </div>
                  </div>

                  {/* Day Cards for this week */}
                  <div className="space-y-3">
                    {week.days.map((day) => (
                      <div
                        key={day.id}
                        className="bg-white rounded-xl shadow-sm border border-[#E5E7EB] p-4"
                        style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-base font-medium text-[#1F2937]">{day.day}</span>
                          <button
                            onClick={() => day.workoutName ? handleRemoveWorkout(weekIndex, day.id) : handleSetRestDay(weekIndex, day.id)}
                            className="p-2 text-[#6B7280] hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>

                        {/* Workout assigned */}
                        {day.workoutName && (
                          <div className="mb-3">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-[15px] font-semibold text-[#1F2937]">{day.workoutName}</span>
                              <span className="px-2 py-0.5 bg-blue-100 text-[#3B82F6] text-xs font-medium rounded">
                                {day.workoutType}
                              </span>
                            </div>
                            <p className="text-sm text-[#6B7280]">
                              {day.exerciseCount} exercises • {day.duration} min
                            </p>
                          </div>
                        )}

                        {/* Rest Day indicator */}
                        {day.isRest && !day.workoutName && (
                          <div className="mb-3">
                            <span className="inline-block px-3 py-1.5 bg-gray-100 text-[#6B7280] text-sm font-medium rounded-full">
                              Rest Day
                            </span>
                          </div>
                        )}

                        {/* Add Workout Button */}
                        <button
                          onClick={() => handleAddWorkout(day)}
                          className="w-full py-2.5 bg-[#3B82F6] text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                        >
                          <Plus className="w-4 h-4" />
                          {day.workoutName ? 'Change Workout' : 'Add Workout'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between px-5 mt-6 pb-6">
              <button
                onClick={handleBack}
                className="flex items-center gap-2 px-4 py-2 text-[#6B7280] hover:text-[#1F2937] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-3 bg-[#3B82F6] text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </>
        )}

        {/* Step 3: Review */}
        {currentStep === 3 && (
          <div className="p-5">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-[#1F2937] mb-6">Plan Summary</h2>

              {/* Summary Items */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-[#6B7280]">Plan Name</span>
                  <span className="text-[#1F2937] font-medium">{planName}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-[#6B7280]">Goal</span>
                  <span className="text-[#1F2937] font-medium">{goal}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-[#6B7280]">Duration</span>
                  <span className="text-[#1F2937] font-medium">{duration} weeks</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-[#6B7280]">Days per Week</span>
                  <span className="text-[#1F2937] font-medium">{daysPerWeek}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-[#6B7280]">Athlete Type</span>
                  <span className="text-[#1F2937] font-medium">{athleteType || '-'}</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-[#6B7280]">Total Workouts</span>
                  <span className="text-[#1F2937] font-medium">{totalWorkouts}</span>
                </div>
              </div>

              {/* Info Message */}
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                <p className="text-sm text-[#3B82F6]">
                  Your plan is ready! You can now assign it to athletes or save it as a template for future use.
                </p>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={handleBack}
                className="flex items-center gap-2 px-4 py-2 text-[#6B7280] hover:text-[#1F2937] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <button
                onClick={handleAssignToAthlete}
                className="flex-1 px-6 py-3 border-2 border-[#3B82F6] text-[#3B82F6] font-medium rounded-lg hover:bg-blue-50 transition-colors"
              >
                Assign to Athlete
              </button>
              <button
                onClick={handleSaveAsTemplate}
                className="flex-1 px-6 py-3 bg-[#3B82F6] text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
              >
                Save as Template
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Workout Selection Modal */}
      {showWorkoutModal && selectedDay && (
        <WorkoutSelectionModal
          day={selectedDay.day}
          onClose={() => {
            setShowWorkoutModal(false);
            setSelectedDay(null);
          }}
          onSelectWorkout={handleWorkoutSelected}
        />
      )}
    </AppLayout>
  );
}