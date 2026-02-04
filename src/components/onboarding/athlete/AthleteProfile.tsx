import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

export default function AthleteProfile() {
    const [age, setAge] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [heightUnit, setHeightUnit] = useState<'cm' | 'ft'>('cm');
    const [weightUnit, setWeightUnit] = useState<'kg' | 'lbs'>('kg');

    const navigate = useNavigate();
    const { updateUser } = useAuth();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateUser({
            athleteProfile: {
                age, height, weight, heightUnit, weightUnit
            }
        });
        navigate('/onboarding/athlete/coaching-type');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
            <div className="max-w-2xl w-full">
                <div className="text-center mb-8">
                    <h1 className="text-4xl mb-2">Komorebi</h1>
                    {/* Progress bar could go here */}
                    <p className="text-sm text-gray-600 mt-2">Athlete Onboarding</p>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                    <h2 className="text-2xl mb-6">Tell us about yourself</h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm mb-2 text-gray-700">How old are you?</label>
                            <input
                                type="number"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                                placeholder="25"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm mb-2 text-gray-700">Height</label>
                                <div className="flex">
                                    <input
                                        type="number"
                                        value={height}
                                        onChange={(e) => setHeight(e.target.value)}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-l-md focus:ring-2 focus:ring-blue-500"
                                        placeholder="180"
                                        required
                                    />
                                    <select
                                        value={heightUnit}
                                        onChange={(e) => setHeightUnit(e.target.value as 'cm' | 'ft')}
                                        className="px-3 border border-l-0 border-gray-300 rounded-r-md bg-gray-50"
                                    >
                                        <option value="cm">cm</option>
                                        <option value="ft">ft</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm mb-2 text-gray-700">Weight</label>
                                <div className="flex">
                                    <input
                                        type="number"
                                        value={weight}
                                        onChange={(e) => setWeight(e.target.value)}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-l-md focus:ring-2 focus:ring-blue-500"
                                        placeholder="75"
                                        required
                                    />
                                    <select
                                        value={weightUnit}
                                        onChange={(e) => setWeightUnit(e.target.value as 'kg' | 'lbs')}
                                        className="px-3 border border-l-0 border-gray-300 rounded-r-md bg-gray-50"
                                    >
                                        <option value="kg">kg</option>
                                        <option value="lbs">lbs</option>
                                    </select>
                                </div>
                            </div>
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
