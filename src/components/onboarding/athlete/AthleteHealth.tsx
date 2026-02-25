import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

export default function AthleteHealth() {
    const [injuries, setInjuries] = useState('');
    const [hasInjuries, setHasInjuries] = useState<boolean | null>(null);
    const [smokes, setSmokes] = useState<boolean | null>(null);
    const [comments, setComments] = useState('');

    const navigate = useNavigate();
    const { completeOnboarding } = useAuth();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ hasInjuries, injuries, smokes, comments });
        completeOnboarding();
        navigate('/athlete/home');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
            <div className="max-w-2xl w-full">
                <div className="text-center mb-8">
                    <h1 className="text-4xl mb-2">Komorebi</h1>
                    <p className="text-sm text-gray-600 mt-2">Athlete Onboarding</p>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                    <h2 className="text-2xl mb-6">Health & Final Details</h2>

                    <form onSubmit={handleSubmit} className="space-y-8">

                        {/* Injuries */}
                        <div>
                            <label className="block text-sm font-medium mb-3 text-gray-700">
                                Do you have any existing injuries or conditions that i should be aware of while building your training plan?
                            </label>
                            <div className="flex gap-6 mb-3">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="hasInjuries"
                                        checked={hasInjuries === true}
                                        onChange={() => setHasInjuries(true)}
                                        className="text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-sm">Yes</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="hasInjuries"
                                        checked={hasInjuries === false}
                                        onChange={() => setHasInjuries(false)}
                                        className="text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-sm">No</span>
                                </label>
                            </div>

                            {hasInjuries && (
                                <textarea
                                    value={injuries}
                                    onChange={(e) => setInjuries(e.target.value)}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                                    placeholder="Please describe your injuries..."
                                    rows={3}
                                />
                            )}
                        </div>

                        {/* Smoking */}
                        <div>
                            <label className="block text-sm font-medium mb-3 text-gray-700">Do you smoke tobacco Product?</label>
                            <div className="flex gap-6">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="smokes"
                                        checked={smokes === true}
                                        onChange={() => setSmokes(true)}
                                        className="text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-sm">Yes</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="smokes"
                                        checked={smokes === false}
                                        onChange={() => setSmokes(false)}
                                        className="text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-sm">No</span>
                                </label>
                            </div>
                        </div>

                        {/* Other Comments */}
                        <div>
                            <label className="block text-sm font-medium mb-3 text-gray-700">Any other comments about what you would like to see in your fitness plan?</label>
                            <textarea
                                value={comments}
                                onChange={(e) => setComments(e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                                placeholder="Specific goals, preferences, etc..."
                                rows={3}
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2.5 rounded-md hover:bg-blue-700 transition-colors"
                        >
                            Finish Setup
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
