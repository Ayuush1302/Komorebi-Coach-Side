import { createContext, useContext, useState, ReactNode } from 'react';

export interface Exercise {
  id: string;
  name: string;
  category: string;
  exerciseType: string;
  primaryMuscle: string;
  secondaryMuscles: string[];
  isCustom?: boolean;
  description?: string;
  notes?: string;
  videoUrl?: string;
  images?: string[];
  alternativeExercises?: string[];
  // Default workout parameters
  defaultSets?: number;
  defaultReps?: string;
  defaultTempo?: string;
  defaultRest?: string;
}

export interface WorkoutExercise {
  id: string;
  exerciseId: string;
  sets: number;
  reps: string;
  weight: string;
  tempo: string;
  rest: string;
  groupId?: string;
}

export interface Workout {
  id: string;
  name: string;
  description: string;
  exercises: WorkoutExercise[];
  isTemplate?: boolean;
  lastEdited?: string;
  attachments?: File[];
  coachNotes?: string;
}

export interface Athlete {
  id: string;
  email: string;
  name?: string;
  category: 'Online' | 'In-Person' | 'Hybrid';
  status: 'Connected' | 'Pending' | 'Frozen';
  joinedDate: string;
  lastActive?: string;
  avatar?: string;
  workoutsCompleted?: number;
  upcomingSessions?: number;
  program?: string;
  packageDuration?: string;
  todaysWorkoutProgress?: number;
}

export interface PlanWorkout {
  id: string;
  day: number;
  workoutId: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  targetMuscles: string[];
  equipment: string[];
}

export interface Plan {
  id: string;
  title: string;
  description: string;
  duration: string;
  workoutsPerWeek: number;
  avgTimePerWorkout: string;
  imageUrl?: string;
  weeks: {
    weekNumber: number;
    workouts: PlanWorkout[];
  }[];
}

interface DataContextType {
  workouts: Workout[];
  exercises: Exercise[];
  customExercises: Exercise[];
  athletes: Athlete[];
  plans: Plan[];
  addWorkout: (workout: Workout) => void;
  updateWorkout: (id: string, workout: Partial<Workout>) => void;
  deleteWorkout: (id: string) => void;
  duplicateWorkout: (id: string) => void;
  addCustomExercise: (exercise: Exercise) => void;
  updateCustomExercise: (id: string, exercise: Partial<Exercise>) => void;
  getWorkoutById: (id: string) => Workout | undefined;
  getExerciseById: (id: string) => Exercise | undefined;
  getPlanById: (id: string) => Plan | undefined;
  addExerciseToWorkout: (workoutId: string, exerciseId: string) => void;
  removeExerciseFromWorkout: (workoutId: string, exerciseId: string) => void;
  addAthletes: (emails: string[], category: 'Online' | 'In-Person' | 'Hybrid') => void;
  updateAthlete: (id: string, athlete: Partial<Athlete>) => void;
  freezeAthlete: (id: string) => void;
  unfreezeAthlete: (id: string) => void;
  deleteAthlete: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Mock exercise library data
const mockExercises: Exercise[] = [
  { id: 'ex1', name: 'Barbell Squat', category: 'Barbell', exerciseType: 'Strength', primaryMuscle: 'Quads', secondaryMuscles: ['Glutes', 'Core'], defaultSets: 4, defaultReps: '8', defaultTempo: '2-0-1-0', defaultRest: '120s' },
  { id: 'ex2', name: 'Bench Press', category: 'Barbell', exerciseType: 'Strength', primaryMuscle: 'Chest', secondaryMuscles: ['Triceps', 'Shoulders'], defaultSets: 4, defaultReps: '8', defaultTempo: '2-0-1-0', defaultRest: '120s' },
  { id: 'ex3', name: 'Deadlift', category: 'Barbell', exerciseType: 'Powerlifting', primaryMuscle: 'Back', secondaryMuscles: ['Hamstrings', 'Glutes', 'Core'], defaultSets: 4, defaultReps: '8', defaultTempo: '3-0-1-0', defaultRest: '180s' },
  { id: 'ex4', name: 'Pull-ups', category: 'Bodyweight', exerciseType: 'Strength', primaryMuscle: 'Back', secondaryMuscles: ['Biceps'], defaultSets: 3, defaultReps: '10', defaultTempo: '2-0-1-0', defaultRest: '90s' },
  { id: 'ex5', name: 'Push-ups', category: 'Bodyweight', exerciseType: 'Strength', primaryMuscle: 'Chest', secondaryMuscles: ['Triceps', 'Core'], defaultSets: 3, defaultReps: '10', defaultTempo: '2-0-2-0', defaultRest: '60s' },
  { id: 'ex6', name: 'Dumbbell Rows', category: 'Dumbbell', exerciseType: 'Strength', primaryMuscle: 'Back', secondaryMuscles: ['Biceps'], defaultSets: 3, defaultReps: '10', defaultTempo: '2-0-1-0', defaultRest: '90s' },
  { id: 'ex7', name: 'Shoulder Press', category: 'Dumbbell', exerciseType: 'Strength', primaryMuscle: 'Shoulders', secondaryMuscles: ['Triceps'], defaultSets: 3, defaultReps: '10', defaultTempo: '2-0-1-0', defaultRest: '90s' },
  { id: 'ex8', name: 'Plank', category: 'Bodyweight', exerciseType: 'Strength', primaryMuscle: 'Core', secondaryMuscles: [], defaultSets: 3, defaultReps: '30s', defaultTempo: 'Hold', defaultRest: '60s' },
  { id: 'ex9', name: 'Box Jumps', category: 'Plyometrics', exerciseType: 'Plyometrics', primaryMuscle: 'Quads', secondaryMuscles: ['Glutes', 'Calves'], defaultSets: 4, defaultReps: '8', defaultTempo: '1-0-1-0', defaultRest: '90s' },
  { id: 'ex10', name: 'Burpees', category: 'Bodyweight', exerciseType: 'Conditioning', primaryMuscle: 'Core', secondaryMuscles: ['Chest', 'Quads'], defaultSets: 3, defaultReps: '10', defaultTempo: '1-0-1-0', defaultRest: '60s' },
];

// Mock workout templates
const mockTemplates: Workout[] = [
  {
    id: 't1',
    name: 'High Energy Workout',
    description: 'A high-intensity workout designed to boost energy levels and improve cardiovascular endurance. Perfect for athletes looking to enhance their conditioning and stamina.',
    exercises: [
      { id: 'we1', exerciseId: 'ex10', sets: 3, reps: '10', weight: 'Bodyweight', tempo: '1-0-1-0', rest: '60s' },
      { id: 'we2', exerciseId: 'ex9', sets: 4, reps: '8', weight: 'Bodyweight', tempo: '1-0-1-0', rest: '90s' },
    ],
    isTemplate: true,
  },
  {
    id: 't2',
    name: 'Yoga Flow Workout',
    description: 'Gentle yoga flow routine for flexibility and mindfulness. This template combines breathing techniques with dynamic movements to improve mobility and reduce stress.',
    exercises: [],
    isTemplate: true,
  },
  {
    id: 't3',
    name: 'Home Workout – Beginner',
    description: 'Perfect for beginners training at home with minimal equipment. Build foundational strength and proper movement patterns.',
    exercises: [
      { id: 'we3', exerciseId: 'ex5', sets: 3, reps: '10', weight: 'Bodyweight', tempo: '2-0-2-0', rest: '60s' },
      { id: 'we4', exerciseId: 'ex8', sets: 3, reps: '30s', weight: 'Bodyweight', tempo: 'Hold', rest: '60s' },
    ],
    isTemplate: true,
  },
  {
    id: 't4',
    name: 'Ultimate Warrior Bootcamp',
    description: 'Advanced full-body conditioning workout combining strength, power, and endurance training. This intense bootcamp-style program challenges both physical and mental toughness.',
    exercises: [
      { id: 'we5', exerciseId: 'ex10', sets: 5, reps: '15', weight: 'Bodyweight', tempo: '1-0-1-0', rest: '45s' },
      { id: 'we6', exerciseId: 'ex9', sets: 5, reps: '12', weight: 'Bodyweight', tempo: '1-0-1-0', rest: '45s' },
      { id: 'we7', exerciseId: 'ex4', sets: 4, reps: '8', weight: 'Bodyweight', tempo: '2-0-1-0', rest: '90s' },
    ],
    isTemplate: true,
  },
];

// Mock plans data
const mockPlans: Plan[] = [
  {
    id: 'p1',
    title: 'Fat Loss 3 Days (Beginner)',
    description: 'Our Fat Loss plan for beginners is crafted to help you shed excess fat while preserving muscle mass. With just three days a week, this plan focuses on effective workouts that burn calories and improve overall fitness.',
    duration: '12 weeks',
    workoutsPerWeek: 3,
    avgTimePerWorkout: '45-110 mins',
    weeks: [
      {
        weekNumber: 1,
        workouts: [
          {
            id: 'pw1',
            day: 1,
            workoutId: 'w1',
            duration: '1 hr 21 mins',
            level: 'Beginner',
            targetMuscles: ['Chest', 'Arms', 'Delts', 'Core'],
            equipment: ['Dumbbells', 'Bench', 'Resistance Bands'],
          },
          {
            id: 'pw2',
            day: 3,
            workoutId: 'w2',
            duration: '1 hr 21 mins',
            level: 'Beginner',
            targetMuscles: ['Back', 'Arms', 'Delts', 'Core'],
            equipment: ['Pull-up Bar', 'Dumbbells', 'Cables'],
          },
          {
            id: 'pw3',
            day: 5,
            workoutId: 'w1',
            duration: '1 hr 3 mins',
            level: 'Beginner',
            targetMuscles: ['Quads', 'Hams', 'Glutes', 'Calfs', 'Core'],
            equipment: ['Barbell', 'Dumbbells', 'Leg Press Machine'],
          },
        ],
      },
      {
        weekNumber: 2,
        workouts: [
          {
            id: 'pw4',
            day: 1,
            workoutId: 'w1',
            duration: '1 hr 21 mins',
            level: 'Beginner',
            targetMuscles: ['Chest', 'Arms', 'Delts', 'Core'],
            equipment: ['Dumbbells', 'Bench', 'Resistance Bands'],
          },
          {
            id: 'pw5',
            day: 3,
            workoutId: 'w2',
            duration: '1 hr 21 mins',
            level: 'Beginner',
            targetMuscles: ['Back', 'Arms', 'Delts', 'Core'],
            equipment: ['Pull-up Bar', 'Dumbbells', 'Cables'],
          },
          {
            id: 'pw6',
            day: 5,
            workoutId: 'w1',
            duration: '1 hr 3 mins',
            level: 'Beginner',
            targetMuscles: ['Quads', 'Hams', 'Glutes', 'Calfs', 'Core'],
            equipment: ['Barbell', 'Dumbbells', 'Leg Press Machine'],
          },
        ],
      },
    ],
  },
  {
    id: 'p2',
    title: 'Ultimate Bulk (Intermediate)',
    description: 'The Ultimate Bulk plan is designed for intermediate lifters looking to pack on serious muscle mass. This comprehensive 16-week program focuses on progressive overload with 4-5 training days per week.',
    duration: '16 weeks',
    workoutsPerWeek: 5,
    avgTimePerWorkout: '60-90 mins',
    weeks: [
      {
        weekNumber: 1,
        workouts: [
          {
            id: 'pw7',
            day: 1,
            workoutId: 'w1',
            duration: '1 hr 30 mins',
            level: 'Intermediate',
            targetMuscles: ['Chest', 'Triceps', 'Shoulders'],
            equipment: ['Barbell', 'Dumbbells', 'Bench', 'Cables'],
          },
          {
            id: 'pw8',
            day: 2,
            workoutId: 'w2',
            duration: '1 hr 25 mins',
            level: 'Intermediate',
            targetMuscles: ['Back', 'Biceps'],
            equipment: ['Barbell', 'Dumbbells', 'Pull-up Bar', 'Cables'],
          },
          {
            id: 'pw9',
            day: 4,
            workoutId: 'w1',
            duration: '1 hr 40 mins',
            level: 'Intermediate',
            targetMuscles: ['Quads', 'Hams', 'Glutes', 'Calfs'],
            equipment: ['Barbell', 'Leg Press', 'Hamstring Curl', 'Calf Machine'],
          },
          {
            id: 'pw10',
            day: 5,
            workoutId: 'w1',
            duration: '1 hr 15 mins',
            level: 'Intermediate',
            targetMuscles: ['Shoulders', 'Arms', 'Core'],
            equipment: ['Dumbbells', 'Cables', 'EZ Bar'],
          },
          {
            id: 'pw11',
            day: 6,
            workoutId: 'w2',
            duration: '1 hr 20 mins',
            level: 'Intermediate',
            targetMuscles: ['Full Body', 'Core'],
            equipment: ['Dumbbells', 'Barbell', 'Bench'],
          },
        ],
      },
    ],
  },
  {
    id: 'p3',
    title: 'Lean Mode (Advanced)',
    description: 'Lean Mode is an advanced cutting program designed to help you achieve a shredded physique while maintaining strength and muscle mass. This intense 8-week plan combines strength training with metabolic conditioning.',
    duration: '8 weeks',
    workoutsPerWeek: 6,
    avgTimePerWorkout: '50-75 mins',
    weeks: [
      {
        weekNumber: 1,
        workouts: [
          {
            id: 'pw12',
            day: 1,
            workoutId: 'w1',
            duration: '1 hr 10 mins',
            level: 'Advanced',
            targetMuscles: ['Chest', 'Triceps'],
            equipment: ['Barbell', 'Dumbbells', 'Cables', 'Bench'],
          },
          {
            id: 'pw13',
            day: 2,
            workoutId: 'w2',
            duration: '1 hr 5 mins',
            level: 'Advanced',
            targetMuscles: ['Back', 'Biceps'],
            equipment: ['Barbell', 'Dumbbells', 'Pull-up Bar', 'Cables'],
          },
          {
            id: 'pw14',
            day: 3,
            workoutId: 'w1',
            duration: '55 mins',
            level: 'Advanced',
            targetMuscles: ['Shoulders', 'Core'],
            equipment: ['Dumbbells', 'Cables', 'Barbell'],
          },
          {
            id: 'pw15',
            day: 4,
            workoutId: 'w2',
            duration: '1 hr 15 mins',
            level: 'Advanced',
            targetMuscles: ['Quads', 'Hams', 'Glutes'],
            equipment: ['Barbell', 'Dumbbells', 'Leg Press'],
          },
          {
            id: 'pw16',
            day: 5,
            workoutId: 'w1',
            duration: '50 mins',
            level: 'Advanced',
            targetMuscles: ['Arms', 'Core'],
            equipment: ['Dumbbells', 'Cables', 'EZ Bar'],
          },
          {
            id: 'pw17',
            day: 6,
            workoutId: 'w1',
            duration: '1 hr',
            level: 'Advanced',
            targetMuscles: ['Full Body', 'Conditioning'],
            equipment: ['Bodyweight', 'Dumbbells', 'Cardio Equipment'],
          },
        ],
      },
    ],
  },
];

export function DataProvider({ children }: { children: ReactNode }) {
  const [workouts, setWorkouts] = useState<Workout[]>([
    {
      id: 'w1',
      name: 'Upper Body Strength',
      description: 'Focus on chest, back, and arms with compound movements. This workout is designed to build upper body strength and muscle mass through progressive overload.',
      exercises: [
        { id: 'we8', exerciseId: 'ex2', sets: 4, reps: '8', weight: '80kg', tempo: '2-0-1-0', rest: '120s' },
        { id: 'we9', exerciseId: 'ex4', sets: 3, reps: '10', weight: 'Bodyweight', tempo: '2-0-1-0', rest: '90s' },
      ],
      lastEdited: '2026-01-08',
    },
    {
      id: 'w2',
      name: 'Lower Body Power',
      description: 'Squats and deadlifts for strength',
      exercises: [
        { id: 'we10', exerciseId: 'ex1', sets: 5, reps: '5', weight: '100kg', tempo: '3-0-1-0', rest: '180s' },
        { id: 'we11', exerciseId: 'ex3', sets: 4, reps: '6', weight: '120kg', tempo: '3-0-1-0', rest: '180s' },
      ],
      lastEdited: '2026-01-07',
    },
  ]);
  const [exercises] = useState<Exercise[]>(mockExercises);
  const [customExercises, setCustomExercises] = useState<Exercise[]>([]);
  const [athletes, setAthletes] = useState<Athlete[]>([
    {
      id: 'a1',
      email: 'john.smith@example.com',
      name: 'John Smith',
      category: 'Online',
      status: 'Connected',
      joinedDate: '2025-12-01',
      lastActive: '2026-01-10',
      workoutsCompleted: 24,
      upcomingSessions: 3,
      program: 'Weight Loss',
      packageDuration: '3 months',
      todaysWorkoutProgress: 25,
    },
    {
      id: 'a2',
      email: 'sarah.jones@example.com',
      name: 'Sarah Jones',
      category: 'In-Person',
      status: 'Connected',
      joinedDate: '2025-11-15',
      lastActive: '2026-01-11',
      workoutsCompleted: 38,
      upcomingSessions: 2,
      program: 'Triathletes',
      packageDuration: '6 months',
      todaysWorkoutProgress: 75,
    },
    {
      id: 'a3',
      email: 'mike.wilson@example.com',
      name: 'Mike Wilson',
      category: 'Hybrid',
      status: 'Pending',
      joinedDate: '2026-01-08',
      workoutsCompleted: 0,
      upcomingSessions: 0,
      program: 'Strength Building',
      packageDuration: '3 months',
      todaysWorkoutProgress: 0,
    },
    {
      id: 'a4',
      email: 'emily.brown@example.com',
      name: 'Emily Brown',
      category: 'Online',
      status: 'Frozen',
      joinedDate: '2025-10-20',
      lastActive: '2025-12-15',
      workoutsCompleted: 16,
      upcomingSessions: 0,
      program: 'Marathon Training',
      packageDuration: '12 months',
      todaysWorkoutProgress: 0,
    },
  ]);

  const addWorkout = (workout: Workout) => {
    setWorkouts(prev => [...prev, workout]);
  };

  const updateWorkout = (id: string, updatedWorkout: Partial<Workout>) => {
    setWorkouts(prev => prev.map(w => w.id === id ? { ...w, ...updatedWorkout, lastEdited: new Date().toISOString().split('T')[0] } : w));
  };

  const deleteWorkout = (id: string) => {
    setWorkouts(prev => prev.filter(w => w.id !== id));
  };

  const duplicateWorkout = (id: string) => {
    const workout = workouts.find(w => w.id === id);
    if (workout) {
      const newWorkout = {
        ...workout,
        id: `w${Date.now()}`,
        name: `${workout.name} (Copy)`,
        lastEdited: new Date().toISOString().split('T')[0],
      };
      setWorkouts(prev => [...prev, newWorkout]);
    }
  };

  const addCustomExercise = (exercise: Exercise) => {
    setCustomExercises(prev => [...prev, { ...exercise, isCustom: true }]);
  };

  const updateCustomExercise = (id: string, updatedExercise: Partial<Exercise>) => {
    setCustomExercises(prev => prev.map(e => e.id === id ? { ...e, ...updatedExercise } : e));
  };

  const getWorkoutById = (id: string) => {
    return workouts.find(w => w.id === id) || mockTemplates.find(t => t.id === id);
  };

  const getExerciseById = (id: string) => {
    return exercises.find(e => e.id === id) || customExercises.find(e => e.id === id);
  };

  const getPlanById = (id: string) => {
    return plans.find(p => p.id === id);
  };

  const addExerciseToWorkout = (workoutId: string, exerciseId: string) => {
    const exercise = getExerciseById(exerciseId);
    if (!exercise) return;

    const newWorkoutExercise = {
      id: `we${Date.now()}`,
      exerciseId,
      sets: exercise.defaultSets || 3,
      reps: exercise.defaultReps || '10',
      weight: '',
      tempo: exercise.defaultTempo || '2-0-2-0',
      rest: exercise.defaultRest || '60s',
    };

    setWorkouts(prev => prev.map(w => {
      if (w.id === workoutId) {
        return {
          ...w,
          exercises: [...w.exercises, newWorkoutExercise],
          lastEdited: new Date().toISOString().split('T')[0],
        };
      }
      return w;
    }));
  };

  const removeExerciseFromWorkout = (workoutId: string, exerciseId: string) => {
    setWorkouts(prev => prev.map(w => {
      if (w.id === workoutId) {
        return {
          ...w,
          exercises: w.exercises.filter(e => e.exerciseId !== exerciseId),
          lastEdited: new Date().toISOString().split('T')[0],
        };
      }
      return w;
    }));
  };

  const addAthletes = (emails: string[], category: 'Online' | 'In-Person' | 'Hybrid') => {
    const newAthletes: Athlete[] = emails.map((email, index) => ({
      id: `a${Date.now()}-${index}`,
      email,
      category,
      status: 'Pending' as const,
      joinedDate: new Date().toISOString().split('T')[0],
      workoutsCompleted: 0,
      upcomingSessions: 0,
    }));
    setAthletes(prev => [...prev, ...newAthletes]);
  };

  const updateAthlete = (id: string, athlete: Partial<Athlete>) => {
    setAthletes(prev => prev.map(a => a.id === id ? { ...a, ...athlete } : a));
  };

  const freezeAthlete = (id: string) => {
    setAthletes(prev => prev.map(a => a.id === id ? { ...a, status: 'Frozen' } : a));
  };

  const unfreezeAthlete = (id: string) => {
    setAthletes(prev => prev.map(a => a.id === id ? { ...a, status: 'Connected' } : a));
  };

  const deleteAthlete = (id: string) => {
    setAthletes(prev => prev.filter(a => a.id !== id));
  };

  return (
    <DataContext.Provider value={{
      workouts,
      exercises,
      customExercises,
      athletes,
      plans: mockPlans,
      addWorkout,
      updateWorkout,
      deleteWorkout,
      duplicateWorkout,
      addCustomExercise,
      updateCustomExercise,
      getWorkoutById,
      getExerciseById,
      getPlanById,
      addExerciseToWorkout,
      removeExerciseFromWorkout,
      addAthletes,
      updateAthlete,
      freezeAthlete,
      unfreezeAthlete,
      deleteAthlete,
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
}

export { mockTemplates };