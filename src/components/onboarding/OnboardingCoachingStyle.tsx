import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Search } from 'lucide-react';

const TEAM_SPORTS = ['Football', 'Cricket', 'Basketball', 'Volleyball', 'Hockey', 'Rugby', 'Handball'];
const INDIVIDUAL_SPORTS = ['Athletics', 'Tennis', 'Badminton', 'Table Tennis', 'Swimming', 'Gymnastics'];
const COMBAT_SPORTS = ['Boxing', 'MMA', 'Wrestling', 'Judo', 'Karate', 'Taekwondo'];
const ENDURANCE_SPORTS = ['Running', 'Cycling', 'Triathlon'];

const BODY_COMPOSITION = ['Fat Loss', 'Muscle Gain', 'Weight Gain', 'Weight Loss', 'Body Recomposition'];
const PERFORMANCE = ['Strength Training', 'Power Development', 'Speed & Agility', 'Endurance Conditioning', 'Mobility & Flexibility'];
const HEALTH_SPECIALIZATION = ['Injury Prevention', 'Rehab / Return-to-Training', 'Youth Athletic Development', 'General Fitness', 'Athletic Performance', 'Functional Training'];

export default function OnboardingCoachingStyle() {
  const [coachingStyle, setCoachingStyle] = useState<'sports' | 'strength' | ''>('');
  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const [selectedSpecializations, setSelectedSpecializations] = useState<string[]>([]);
  const [customSport, setCustomSport] = useState('');
  const [workMode, setWorkMode] = useState('');
  const [experience, setExperience] = useState('');
  const [clientCount, setClientCount] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

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
    coachingStyle && 
    ((coachingStyle === 'sports' && selectedSports.length > 0) ||
     (coachingStyle === 'strength' && selectedSpecializations.length > 0)) &&
    workMode && experience && clientCount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (canContinue) {
      navigate('/onboarding/certifications');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl mb-2">Komorebi</h1>
          <div className="flex items-center justify-center gap-2 mt-6">
            <div className="w-8 h-1 bg-blue-600 rounded"></div>
            <div className="w-8 h-1 bg-blue-600 rounded"></div>
            <div className="w-8 h-1 bg-gray-300 rounded"></div>
            <div className="w-8 h-1 bg-gray-300 rounded"></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">Step 2 of 4</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl mb-2">Coaching Style</h2>
          <p className="text-gray-600 mb-8 text-sm">Help us understand your coaching approach</p>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block text-sm mb-4 text-gray-700">What best describes your coaching style?</label>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-4 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="style"
                    value="sports"
                    checked={coachingStyle === 'sports'}
                    onChange={() => {
                      setCoachingStyle('sports');
                      setSelectedSpecializations([]);
                    }}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">Sports Coach</span>
                </label>
                <label className="flex items-center gap-3 p-4 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="style"
                    value="strength"
                    checked={coachingStyle === 'strength'}
                    onChange={() => {
                      setCoachingStyle('strength');
                      setSelectedSports([]);
                    }}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">Strength & Conditioning Coach</span>
                </label>
              </div>
            </div>

            {coachingStyle === 'sports' && (
              <div className="border-t pt-6">
                <label className="block text-sm mb-4 text-gray-700">Which sport(s) do you coach?</label>
                
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
                          className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                            selectedSports.includes(sport)
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
                          className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                            selectedSports.includes(sport)
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
                          className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                            selectedSports.includes(sport)
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
                          className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                            selectedSports.includes(sport)
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

            {coachingStyle === 'strength' && (
              <div className="border-t pt-6">
                <label className="block text-sm mb-4 text-gray-700">What type of training do you specialise in?</label>
                
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Search specializations..."
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
                          className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                            selectedSpecializations.includes(spec)
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
                          className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                            selectedSpecializations.includes(spec)
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
                          className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                            selectedSpecializations.includes(spec)
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

            {coachingStyle && (
              <>
                <div className="border-t pt-6">
                  <label className="block text-sm mb-3 text-gray-700">Do you work?</label>
                  <div className="space-y-2">
                    {['Online', 'In-person', 'Both'].map(mode => (
                      <label key={mode} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="workMode"
                          value={mode.toLowerCase()}
                          checked={workMode === mode.toLowerCase()}
                          onChange={() => setWorkMode(mode.toLowerCase())}
                          className="w-4 h-4"
                        />
                        <span className="text-sm">{mode}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-3 text-gray-700">Experience Level</label>
                  <select
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select experience</option>
                    <option value="new">New Coach (0–1 year)</option>
                    <option value="experienced">Experienced Coach (1–5 years)</option>
                    <option value="advanced">Advanced Coach (5+ years)</option>
                    <option value="moving">Moving from another platform</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm mb-3 text-gray-700">Approx. Number of Clients</label>
                  <select
                    value={clientCount}
                    onChange={(e) => setClientCount(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select range</option>
                    <option value="1-10">1–10</option>
                    <option value="11-50">11–50</option>
                    <option value="51-100">51–100</option>
                    <option value="100+">100+</option>
                  </select>
                </div>
              </>
            )}

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={!canContinue}
                className={`px-8 py-2.5 rounded-md transition-colors ${
                  canContinue
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
