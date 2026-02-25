import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Search } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

const TEAM_SPORTS = ['Football', 'Cricket', 'Basketball', 'Volleyball', 'Hockey', 'Rugby', 'Handball'];
const INDIVIDUAL_SPORTS = ['Athletics', 'Tennis', 'Badminton', 'Table Tennis', 'Swimming', 'Gymnastics'];
const COMBAT_SPORTS = ['Boxing', 'MMA', 'Wrestling', 'Judo', 'Karate', 'Taekwondo'];
const ENDURANCE_SPORTS = ['Running', 'Cycling', 'Triathlon'];

const BODY_COMPOSITION = ['Fat Loss', 'Muscle Gain', 'Weight Gain', 'Weight Loss', 'Body Recomposition'];
const PERFORMANCE = ['Strength Training', 'Power Development', 'Speed & Agility', 'Endurance Conditioning', 'Mobility & Flexibility'];
const HEALTH_SPECIALIZATION = ['Injury Prevention', 'Rehab / Return-to-Training', 'Youth Athletic Development', 'General Fitness', 'Athletic Performance', 'Functional Training'];

export default function AthleteCoachingType() {
    const [coachingType, setCoachingType] = useState<'sports' | 'strength' | ''>('');
    const [selectedSports, setSelectedSports] = useState<string[]>([]);
    const [selectedSpecializations, setSelectedSpecializations] = useState<string[]>([]);
    const [customSport, setCustomSport] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const navigate = useNavigate();
    const { updateUser, user } = useAuth();

    const allSports = [...TEAM_SPORTS, ...INDIVIDUAL_SPORTS, ...COMBAT_SPORTS, ...ENDURANCE_SPORTS];
    const allSpecializations = [...BODY_COMPOSITION, ...PERFORMANCE, ...HEALTH_SPECIALIZATION];

    const filteredSports = searchTerm
        ? allSports.filter(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
        : allSports;

    const filteredSpecializations = searchTerm
        ? allSpecializations.filter(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
        : allSpecializations;

    const toggleSport = (sport: string) => {
        setSelectedSports(prev =>
            prev.includes(sport) ? prev.filter(s => s !== sport) : [...prev, sport]
        );
    };

    const toggleSpecialization = (spec: string) => {
        setSelectedSpecializations(prev =>
            prev.includes(spec) ? prev.filter(s => s !== spec) : [...prev, spec]
        );
    };

    const addCustomSport = () => {
        if (customSport.trim() && !selectedSports.includes(customSport.trim())) {
            setSelectedSports(prev => [...prev, customSport.trim()]);
            setCustomSport('');
        }
    };

    const removeSport = (sport: string) => {
        setSelectedSports(prev => prev.filter(s => s !== sport));
    };

    const removeSpecialization = (spec: string) => {
        setSelectedSpecializations(prev => prev.filter(s => s !== spec));
    };

    const canContinue =
        coachingType &&
        ((coachingType === 'sports' && selectedSports.length > 0) ||
            (coachingType === 'strength' && selectedSpecializations.length > 0));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Save selection to context
        updateUser({
            athleteProfile: {
                ...user?.athleteProfile,
                coachingType,
                interests: coachingType === 'sports' ? selectedSports : selectedSpecializations
            }
        });

        if (canContinue) {
            navigate('/onboarding/athlete/experience');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
            <div className="max-w-2xl w-full">
                <div className="text-center mb-8">
                    <h1 className="text-4xl mb-2">Komorebi</h1>
                    <p className="text-sm text-gray-600 mt-2">Athlete Onboarding</p>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                    <h2 className="text-2xl mb-2">Coaching Needs</h2>
                    <p className="text-gray-600 mb-8 text-sm">What kind of coaching are you looking for?</p>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div>
                            <label className="block text-sm mb-4 text-gray-700">Select your primary goal</label>
                            <div className="space-y-3">
                                <label className="flex items-center gap-3 p-4 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
                                    <input
                                        type="radio"
                                        name="style"
                                        value="sports"
                                        checked={coachingType === 'sports'}
                                        onChange={() => {
                                            setCoachingType('sports');
                                            setSelectedSpecializations([]);
                                        }}
                                        className="w-4 h-4"
                                    />
                                    <span className="text-sm">Sports Coaching (Specific Sport)</span>
                                </label>
                                <label className="flex items-center gap-3 p-4 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
                                    <input
                                        type="radio"
                                        name="style"
                                        value="strength"
                                        checked={coachingType === 'strength'}
                                        onChange={() => {
                                            setCoachingType('strength');
                                            setSelectedSports([]);
                                        }}
                                        className="w-4 h-4"
                                    />
                                    <span className="text-sm">S&C Coaching (Strength & Conditioning)</span>
                                </label>
                            </div>
                        </div>

                        {coachingType === 'sports' && (
                            <div className="border-t pt-6">
                                <label className="block text-sm mb-4 text-gray-700">Which sport(s) are you training for?</label>

                                <div className="relative mb-4">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Search sports..."
                                    />
                                </div>

                                {selectedSports.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {selectedSports.map(sport => (
                                            <span key={sport} className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                                {sport}
                                                <button type="button" onClick={() => removeSport(sport)}>
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                )}

                                <div className="space-y-4 max-h-80 overflow-y-auto">
                                    <div>
                                        <p className="text-xs text-gray-600 mb-2">Team Sports</p>
                                        <div className="flex flex-wrap gap-2">
                                            {TEAM_SPORTS.filter(s => filteredSports.includes(s)).map(sport => (
                                                <button
                                                    key={sport}
                                                    type="button"
                                                    onClick={() => toggleSport(sport)}
                                                    className={`px-3 py-1.5 rounded-md text-sm transition-colors ${selectedSports.includes(sport)
                                                        ? 'bg-blue-600 text-white'
                                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                        }`}
                                                >
                                                    {sport}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-xs text-gray-600 mb-2">Individual Sports</p>
                                        <div className="flex flex-wrap gap-2">
                                            {INDIVIDUAL_SPORTS.filter(s => filteredSports.includes(s)).map(sport => (
                                                <button
                                                    key={sport}
                                                    type="button"
                                                    onClick={() => toggleSport(sport)}
                                                    className={`px-3 py-1.5 rounded-md text-sm transition-colors ${selectedSports.includes(sport)
                                                        ? 'bg-blue-600 text-white'
                                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                        }`}
                                                >
                                                    {sport}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-xs text-gray-600 mb-2">Combat Sports</p>
                                        <div className="flex flex-wrap gap-2">
                                            {COMBAT_SPORTS.filter(s => filteredSports.includes(s)).map(sport => (
                                                <button
                                                    key={sport}
                                                    type="button"
                                                    onClick={() => toggleSport(sport)}
                                                    className={`px-3 py-1.5 rounded-md text-sm transition-colors ${selectedSports.includes(sport)
                                                        ? 'bg-blue-600 text-white'
                                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                        }`}
                                                >
                                                    {sport}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-xs text-gray-600 mb-2">Endurance Sports</p>
                                        <div className="flex flex-wrap gap-2">
                                            {ENDURANCE_SPORTS.filter(s => filteredSports.includes(s)).map(sport => (
                                                <button
                                                    key={sport}
                                                    type="button"
                                                    onClick={() => toggleSport(sport)}
                                                    className={`px-3 py-1.5 rounded-md text-sm transition-colors ${selectedSports.includes(sport)
                                                        ? 'bg-blue-600 text-white'
                                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                        }`}
                                                >
                                                    {sport}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <label className="block text-xs text-gray-600 mb-2">Add custom sport</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={customSport}
                                            onChange={(e) => setCustomSport(e.target.value)}
                                            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Enter sport name"
                                        />
                                        <button
                                            type="button"
                                            onClick={addCustomSport}
                                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                                        >
                                            Add
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {coachingType === 'strength' && (
                            <div className="border-t pt-6">
                                <label className="block text-sm mb-4 text-gray-700">What specific areas are you looking to improve?</label>

                                <div className="relative mb-4">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Search goals..."
                                    />
                                </div>

                                {selectedSpecializations.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {selectedSpecializations.map(spec => (
                                            <span key={spec} className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                                {spec}
                                                <button type="button" onClick={() => removeSpecialization(spec)}>
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                )}

                                <div className="space-y-4 max-h-80 overflow-y-auto">
                                    <div>
                                        <p className="text-xs text-gray-600 mb-2">Body Composition</p>
                                        <div className="flex flex-wrap gap-2">
                                            {BODY_COMPOSITION.filter(s => filteredSpecializations.includes(s)).map(spec => (
                                                <button
                                                    key={spec}
                                                    type="button"
                                                    onClick={() => toggleSpecialization(spec)}
                                                    className={`px-3 py-1.5 rounded-md text-sm transition-colors ${selectedSpecializations.includes(spec)
                                                        ? 'bg-blue-600 text-white'
                                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                        }`}
                                                >
                                                    {spec}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-xs text-gray-600 mb-2">Performance & Strength</p>
                                        <div className="flex flex-wrap gap-2">
                                            {PERFORMANCE.filter(s => filteredSpecializations.includes(s)).map(spec => (
                                                <button
                                                    key={spec}
                                                    type="button"
                                                    onClick={() => toggleSpecialization(spec)}
                                                    className={`px-3 py-1.5 rounded-md text-sm transition-colors ${selectedSpecializations.includes(spec)
                                                        ? 'bg-blue-600 text-white'
                                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                        }`}
                                                >
                                                    {spec}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-xs text-gray-600 mb-2">Health & Specialization</p>
                                        <div className="flex flex-wrap gap-2">
                                            {HEALTH_SPECIALIZATION.filter(s => filteredSpecializations.includes(s)).map(spec => (
                                                <button
                                                    key={spec}
                                                    type="button"
                                                    onClick={() => toggleSpecialization(spec)}
                                                    className={`px-3 py-1.5 rounded-md text-sm transition-colors ${selectedSpecializations.includes(spec)
                                                        ? 'bg-blue-600 text-white'
                                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                        }`}
                                                >
                                                    {spec}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="flex justify-end pt-4">
                            <button
                                type="submit"
                                disabled={!canContinue}
                                className={`w-full py-2.5 rounded-md transition-colors ${canContinue
                                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                            >
                                Next
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
