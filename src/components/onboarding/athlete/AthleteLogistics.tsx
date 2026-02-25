import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const EQUIPMENT_OPTIONS = [
    'Free weight (dumbell/barbells)',
    'Gym machines (nautilus, precor, cybex, etc…)',
    'Cable weights',
    'Resistance band',
    'Bosu balls',
    'Kettleballs',
    'TRX bands',
    'Bowflex'
];

const DAYS_OF_WEEK = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
];

export default function AthleteLogistics() {
    const [equipment, setEquipment] = useState<string[]>([]);
    const [days, setDays] = useState<string[]>([]);
    const [frequency, setFrequency] = useState('');

    const navigate = useNavigate();
    const { updateUser, user } = useAuth();

    const toggleEquipment = (item: string) => {
        setEquipment(prev =>
            prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
        );
    };

    const toggleDay = (day: string) => {
        setDays(prev =>
            prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateUser({
            athleteProfile: {
                ...user?.athleteProfile,
                equipment,
                days,
                frequency
            }
        });
        navigate('/onboarding/athlete/health');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
            <div className="max-w-2xl w-full">
                <div className="text-center mb-8">
                    <h1 className="text-4xl mb-2">Komorebi</h1>
                    <p className="text-sm text-gray-600 mt-2">Athlete Onboarding</p>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                    <h2 className="text-2xl mb-6">Logistics & Availability</h2>

                    <form onSubmit={handleSubmit} className="space-y-8">

                        {/* Equipment */}
                        <div>
                            <label className="block text-sm font-medium mb-3 text-gray-700">What equipment do you have access to?</label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {EQUIPMENT_OPTIONS.map(item => (
                                    <label key={item} className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={equipment.includes(item)}
                                            onChange={() => toggleEquipment(item)}
                                            className="rounded text-blue-600 focus:ring-blue-500"
                                        />
                                        <span className="text-sm text-gray-700">{item}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Days Available */}
                        <div>
                            <label className="block text-sm font-medium mb-3 text-gray-700">On which day are you available to workout?</label>
                            <div className="flex flex-wrap gap-2">
                                {DAYS_OF_WEEK.map(day => (
                                    <button
                                        key={day}
                                        type="button"
                                        onClick={() => toggleDay(day)}
                                        className={`px-4 py-2 rounded-full text-sm border transition-colors ${days.includes(day)
                                            ? 'bg-blue-600 text-white border-blue-600'
                                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                            }`}
                                    >
                                        {day.slice(0, 3)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Frequency */}
                        <div>
                            <label className="block text-sm font-medium mb-3 text-gray-700">How frequently do you have time to exercise?</label>
                            <div className="space-y-2">
                                {['1-3 days/week', '4-5 days/week', '6-7 days/week', 'Upto trainer to decide'].map(option => (
                                    <label key={option} className="flex items-center gap-3 p-3 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50">
                                        <input
                                            type="radio"
                                            name="frequency"
                                            value={option}
                                            checked={frequency === option}
                                            onChange={(e) => setFrequency(e.target.value)}
                                            className="text-blue-600 focus:ring-blue-500"
                                        />
                                        <span className="text-sm text-gray-700">{option}</span>
                                    </label>
                                ))}
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
