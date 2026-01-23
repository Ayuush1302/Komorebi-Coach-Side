import { createContext, useContext, useState, ReactNode } from 'react';

export interface CustomPlan {
  id: string;
  name: string;
  goal: string;
  duration: string;
  workoutsPerWeek: number;
  difficulty: string;
  description?: string;
  weeks: {
    weekNumber: number;
    days: {
      id: string;
      day: string;
      workoutId?: string;
      workoutName?: string;
      workoutType?: string;
      exerciseCount?: number;
      duration?: number;
      isRest: boolean;
    }[];
  }[];
  totalWorkouts: number;
  createdAt: Date;
}

interface PlansContextType {
  customPlans: CustomPlan[];
  addCustomPlan: (plan: CustomPlan) => void;
  deleteCustomPlan: (id: string) => void;
}

const PlansContext = createContext<PlansContextType | undefined>(undefined);

export function PlansProvider({ children }: { children: ReactNode }) {
  const [customPlans, setCustomPlans] = useState<CustomPlan[]>([]);

  const addCustomPlan = (plan: CustomPlan) => {
    setCustomPlans(prev => [...prev, plan]);
  };

  const deleteCustomPlan = (id: string) => {
    setCustomPlans(prev => prev.filter(plan => plan.id !== id));
  };

  return (
    <PlansContext.Provider value={{ customPlans, addCustomPlan, deleteCustomPlan }}>
      {children}
    </PlansContext.Provider>
  );
}

export function usePlans() {
  const context = useContext(PlansContext);
  if (!context) {
    throw new Error('usePlans must be used within a PlansProvider');
  }
  return context;
}
