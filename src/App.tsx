import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
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
import AthleteProfile from './components/onboarding/athlete/AthleteProfile';
import AthleteCoachingType from './components/onboarding/athlete/AthleteCoachingType';
import AthleteExperience from './components/onboarding/athlete/AthleteExperience';
import AthleteLogistics from './components/onboarding/athlete/AthleteLogistics';
import AthleteHealth from './components/onboarding/athlete/AthleteHealth';

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


// Athlete Components
import AthleteAppLayout from './components/layout/AthleteAppLayout';
import AthleteHome from './components/athlete/AthleteHome';
import AthleteAnalytics from './components/athlete/AthleteAnalytics';
import AthleteProfileView from './components/athlete/AthleteProfileView';

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

                  {/* Athlete Onboarding Routes */}
                  <Route path="/onboarding/athlete/profile" element={<PrivateRoute><AthleteProfile /></PrivateRoute>} />
                  <Route path="/onboarding/athlete/coaching-type" element={<PrivateRoute><AthleteCoachingType /></PrivateRoute>} />
                  <Route path="/onboarding/athlete/experience" element={<PrivateRoute><AthleteExperience /></PrivateRoute>} />
                  <Route path="/onboarding/athlete/logistics" element={<PrivateRoute><AthleteLogistics /></PrivateRoute>} />
                  <Route path="/onboarding/athlete/health" element={<PrivateRoute><AthleteHealth /></PrivateRoute>} />

                  {/* Athlete Dashboard Routes */}
                  <Route element={<PrivateRoute><AthleteAppLayout><Outlet /></AthleteAppLayout></PrivateRoute>}>
                    <Route path="/athlete/home" element={<AthleteHome />} />
                    <Route path="/athlete/analytics" element={<AthleteAnalytics />} />
                    <Route path="/athlete/chats" element={<Chats />} />
                    <Route path="/athlete/chats/:chatId" element={<ChatDetail />} />
                    <Route path="/athlete/profile" element={<AthleteProfileView />} />
                  </Route>

                  {/* Main App Routes with Global Layout */}
                  <Route element={<PrivateRoute><AppLayout><Outlet /></AppLayout></PrivateRoute>}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/activity" element={<Feed />} />
                    <Route path="/library" element={<Library />} />
                    <Route path="/library/exercises" element={<ExerciseLibrary />} />
                    <Route path="/library/workouts" element={<WorkoutLibrary />} />
                    <Route path="/library/cardio" element={<CardioLibrary />} />
                    <Route path="/library/plans" element={<PlanLibrary />} />

                    <Route path="/athletes" element={<Athletes />} />
                    <Route path="/athletes/:athleteId/dashboard" element={<AthleteDashboard />} />

                    <Route path="/create/exercise" element={<CreateExercise />} />
                    <Route path="/create/workout" element={<WorkoutBuilder />} />
                    <Route path="/create/cardio" element={<CardioSession />} />
                    <Route path="/create/plan" element={<PlanBuilder />} />
                    <Route path="/create-post" element={<CreatePost />} />

                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/support" element={<Support />} />

                    <Route path="/analytics" element={<Analytics />} />

                    <Route path="/profile" element={<ProfileTab />} />
                    <Route path="/profile/settings" element={<Settings />} />
                    <Route path="/profile/notifications" element={<Settings />} />
                    <Route path="/profile/privacy" element={<Settings />} />
                    <Route path="/profile/language" element={<Settings />} />
                    <Route path="/profile/appearance" element={<Settings />} />
                    <Route path="/chats" element={<Chats />} />
                    <Route path="/chats/:chatId" element={<ChatDetail />} />
                    <Route path="/settings" element={<Settings />} />

                    {/* Detail/Edit Routes */}
                    <Route path="/workouts/:id" element={<WorkoutBuilder />} />
                    <Route path="/cardio/:id" element={<CardioSession />} />
                    <Route path="/exercises/edit/:id" element={<CreateExercise />} />
                    <Route path="/plans/:id" element={<PlanBuilder />} />
                  </Route>

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