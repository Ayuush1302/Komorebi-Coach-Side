import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const FITNESS_GOALS = [
    'Appearance (aesthetics)',
    'Cardiovascular Endurance',
    'Flexibility',
    'Health(general)',
    'Muscular definition',
    'Muscular size',
    'Muscular strength/power',
    'Self-esteem or confidence',
    'Speed',
    'Sports performance',
    'Stress reduction',
    'Toning and shaping',
    'Weight loss',
    'Posture'
];

export default function AthleteGoals() {
    const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
    const [otherGoal, setOtherGoal] = useState('');

    const navigate = useNavigate();
    const { updateUser, user } = useAuth();

    const toggleGoal = (goal: string) => {
        setSelectedGoals(prev =>
            prev.includes(goal)
                ? prev.filter(g => g !== goal)
                : [...prev, goal]
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateUser({
            athleteProfile: {
                ...user?.athleteProfile,
                goals: selectedGoals,
                otherGoal
            }
        });
        navigate('/onboarding/athlete/experience');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
            <div className="max-w-2xl w-full">
                <div className="text-center mb-8">
                    <h1 className="text-4xl mb-2">Komorebi</h1>
                    <p className="text-sm text-gray-600 mt-2">Athlete Onboarding</p>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                    <h2 className="text-2xl mb-6">What are your fitness goals?</h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {FITNESS_GOALS.map(goal => (
                                <div
                                    key={goal}
                                    onClick={() => toggleGoal(goal)}
                                    className={`p-3 border rounded-md cursor-pointer transition-colors ${selectedGoals.includes(goal)
                                        ? 'bg-blue-50 border-blue-500 text-blue-700'
                                        : 'hover:bg-gray-50 border-gray-200'
                                        }`}
                                >
                                    <label className="flex items-center gap-2 cursor-pointer pointer-events-none">
                                        <input
                                            type="checkbox"
                                            checked={selectedGoals.includes(goal)}
                                            onChange={() => { }}
                                            className="rounded text-blue-600 focus:ring-blue-500"
                                        />
                                        <span className="text-sm">{goal}</span>
                                    </label>
                                </div>
                            ))}
                        </div>

                        <div>
                            <label className="block text-sm mb-2 text-gray-700">Other fitness goals</label>
                            <textarea
                                value={otherGoal}
                                onChange={(e) => setOtherGoal(e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                                placeholder="Specific event, rehabilitation, etc..."
                                rows={3}
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2.5 rounded-md hover:bg-blue-700 transition-colors"
                        >
                            Next
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
