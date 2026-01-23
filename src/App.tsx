import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { ChatProvider } from './context/ChatContext';
import { PlansProvider } from './context/PlansContext';
import { FeedProvider } from './context/FeedContext';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import SignUp from './components/auth/SignUp';
import OnboardingBasicInfo from './components/onboarding/OnboardingBasicInfo';
import OnboardingCoachingStyle from './components/onboarding/OnboardingCoachingStyle';
import OnboardingCertifications from './components/onboarding/OnboardingCertifications';
import OnboardingProfile from './components/onboarding/OnboardingProfile';
import Welcome from './components/onboarding/Welcome';

// New Bottom Nav Structure
import Library from './components/library/Library';
import ExerciseLibrary from './components/library/ExerciseLibrary';
import WorkoutLibrary from './components/library/WorkoutLibrary';
import CardioLibrary from './components/library/CardioLibrary';
import PlanLibrary from './components/library/PlanLibrary';
import CardioSession from './components/create/CardioSession';
import PlanBuilder from './components/create/PlanBuilder';
import Analytics from './components/analytics/Analytics';
import ProfileTab from './components/profile/ProfileTab';
import Chats from './components/chats/Chats';
import ChatDetail from './components/chats/ChatDetail';
import Settings from './components/settings/Settings';
import Calendar from './components/calendar/Calendar';
import Support from './components/support/Support';
import CreatePost from './components/feed/CreatePost';
import Feed from './components/feed/Feed';
import { Toaster } from './components/ui/sonner';


// Existing Components (reused)
import Athletes from './components/athletes/Athletes';
import AthleteDashboard from './components/athletes/AthleteDashboard';
import CreateExercise from './components/exercises/CreateExercise';
import WorkoutBuilder from './components/workouts/WorkoutBuilder';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

function App() {
  return (
    <>
      <AuthProvider>
        <DataProvider>
          <ChatProvider>
            <PlansProvider>
              <FeedProvider>
                <Routes>
                  {/* Auth Routes */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<SignUp />} />

                  {/* Onboarding Routes */}
                  <Route path="/onboarding/basic-info" element={<PrivateRoute><OnboardingBasicInfo /></PrivateRoute>} />
                  <Route path="/onboarding/coaching-style" element={<PrivateRoute><OnboardingCoachingStyle /></PrivateRoute>} />
                  <Route path="/onboarding/certifications" element={<PrivateRoute><OnboardingCertifications /></PrivateRoute>} />
                  <Route path="/onboarding/profile" element={<PrivateRoute><OnboardingProfile /></PrivateRoute>} />
                  <Route path="/welcome" element={<PrivateRoute><Welcome /></PrivateRoute>} />

                  {/* Main Bottom Nav Routes */}
                  <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                  <Route path="/activity" element={<PrivateRoute><Feed /></PrivateRoute>} />
                  <Route path="/library" element={<PrivateRoute><Library /></PrivateRoute>} />
                  <Route path="/library/exercises" element={<PrivateRoute><ExerciseLibrary /></PrivateRoute>} />
                  <Route path="/library/workouts" element={<PrivateRoute><WorkoutLibrary /></PrivateRoute>} />
                  <Route path="/library/cardio" element={<PrivateRoute><CardioLibrary /></PrivateRoute>} />
                  <Route path="/library/plans" element={<PrivateRoute><PlanLibrary /></PrivateRoute>} />

                  <Route path="/athletes" element={<PrivateRoute><Athletes /></PrivateRoute>} />
                  <Route path="/athletes/:athleteId/dashboard" element={<PrivateRoute><AthleteDashboard /></PrivateRoute>} />

                  <Route path="/create/exercise" element={<PrivateRoute><CreateExercise /></PrivateRoute>} />
                  <Route path="/create/workout" element={<PrivateRoute><WorkoutBuilder /></PrivateRoute>} />
                  <Route path="/create/cardio" element={<PrivateRoute><CardioSession /></PrivateRoute>} />
                  <Route path="/create/plan" element={<PrivateRoute><PlanBuilder /></PrivateRoute>} />
                  <Route path="/create-post" element={<PrivateRoute><CreatePost /></PrivateRoute>} />

                  <Route path="/calendar" element={<PrivateRoute><Calendar /></PrivateRoute>} />
                  <Route path="/support" element={<PrivateRoute><Support /></PrivateRoute>} />

                  <Route path="/analytics" element={<PrivateRoute><Analytics /></PrivateRoute>} />

                  <Route path="/profile" element={<PrivateRoute><ProfileTab /></PrivateRoute>} />
                  <Route path="/profile/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
                  <Route path="/profile/notifications" element={<PrivateRoute><Settings /></PrivateRoute>} />
                  <Route path="/profile/privacy" element={<PrivateRoute><Settings /></PrivateRoute>} />
                  <Route path="/profile/language" element={<PrivateRoute><Settings /></PrivateRoute>} />
                  <Route path="/profile/appearance" element={<PrivateRoute><Settings /></PrivateRoute>} />
                  <Route path="/chats" element={<PrivateRoute><Chats /></PrivateRoute>} />
                  <Route path="/chats/:chatId" element={<PrivateRoute><ChatDetail /></PrivateRoute>} />
                  <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />

                  {/* Detail/Edit Routes */}
                  <Route path="/workouts/:id" element={<PrivateRoute><WorkoutBuilder /></PrivateRoute>} />
                  <Route path="/cardio/:id" element={<PrivateRoute><CardioSession /></PrivateRoute>} />
                  <Route path="/exercises/edit/:id" element={<PrivateRoute><CreateExercise /></PrivateRoute>} />
                  <Route path="/plans/:id" element={<PrivateRoute><PlanBuilder /></PrivateRoute>} />

                  {/* Redirects */}
                  <Route path="/exercises" element={<Navigate to="/library/exercises" replace />} />
                  <Route path="/workouts" element={<Navigate to="/library/workouts" replace />} />
                  <Route path="/plans" element={<Navigate to="/library/plans" replace />} />
                  <Route path="/workout" element={<Navigate to="/library" replace />} />
                  <Route path="/chat" element={<Navigate to="/chats" replace />} />
                  <Route path="/create" element={<Navigate to="/library" replace />} />
                  <Route path="/" element={<Navigate to="/dashboard" />} />
                </Routes>
              </FeedProvider>
            </PlansProvider>
          </ChatProvider>
        </DataProvider>

      </AuthProvider>
      <Toaster />
    </>
  );
}

export default App;