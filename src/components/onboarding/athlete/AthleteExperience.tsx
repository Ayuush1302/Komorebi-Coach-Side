import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

export default function AthleteExperience() {
    const [workoutExp, setWorkoutExp] = useState('');

    const navigate = useNavigate();
    const { updateUser, user } = useAuth();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateUser({
            athleteProfile: {
                ...user?.athleteProfile,
                workoutExp
            }
        });
        navigate('/onboarding/athlete/logistics');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
            <div className="max-w-2xl w-full">
                <div className="text-center mb-8">
                    <h1 className="text-4xl mb-2">Komorebi</h1>
                    <p className="text-sm text-gray-600 mt-2">Athlete Onboarding</p>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                    <h2 className="text-2xl mb-6">Experience & Ability</h2>

                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Workout Experience */}
                        <div>
                            <label className="block text-sm font-medium mb-3 text-gray-700">Workout experience</label>
                            <div className="space-y-2">
                                {['Beginner (less than 1 year)', 'Intermediate (more than 1 year)'].map(option => (
                                    <label key={option} className="flex items-center gap-3 p-3 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50">
                                        <input
                                            type="radio"
                                            name="workoutExp"
                                            value={option}
                                            checked={workoutExp === option}
                                            onChange={(e) => setWorkoutExp(e.target.value)}
                                            className="text-blue-600 focus:ring-blue-500"
                                        />
                                        <span className="text-sm text-gray-700">{option}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={!workoutExp}
                            className="w-full bg-blue-600 text-white py-2.5 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
