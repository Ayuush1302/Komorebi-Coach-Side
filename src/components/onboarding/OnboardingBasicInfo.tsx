import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Globe, Clock } from 'lucide-react';

export default function OnboardingBasicInfo() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [country, setCountry] = useState('');
  const [timezone, setTimezone] = useState('');
  const [units, setUnits] = useState<'metric' | 'imperial'>('metric');
  const navigate = useNavigate();
  const { updateUser } = useAuth();

  useEffect(() => {
    // Auto-detect timezone
    const detectedTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setTimezone(detectedTimezone);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ firstName, lastName });
    navigate('/onboarding/coaching-style');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl mb-2">Komorebi</h1>
          <div className="flex items-center justify-center gap-2 mt-6">
            <div className="w-8 h-1 bg-blue-600 rounded"></div>
            <div className="w-8 h-1 bg-gray-300 rounded"></div>
            <div className="w-8 h-1 bg-gray-300 rounded"></div>
            <div className="w-8 h-1 bg-gray-300 rounded"></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">Step 1 of 4</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl mb-2">Basic Information</h2>
          <p className="text-gray-600 mb-8 text-sm">Let's get to know you better</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm mb-2 text-gray-700">First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="John"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-2 text-gray-700">Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Doe"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm mb-2 text-gray-700">Country</label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                  required
                >
                  <option value="">Select country</option>
                  <option value="US">United States</option>
                  <option value="UK">United Kingdom</option>
                  <option value="AU">Australia</option>
                  <option value="CA">Canada</option>
                  <option value="IN">India</option>
                  <option value="NZ">New Zealand</option>
                  <option value="SG">Singapore</option>
                  <option value="ZA">South Africa</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm mb-2 text-gray-700">Timezone</label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Auto-detected"
                  required
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Auto-detected from your browser</p>
            </div>

            <div>
              <label className="block text-sm mb-3 text-gray-700">Preferred Units</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="units"
                    value="metric"
                    checked={units === 'metric'}
                    onChange={() => setUnits('metric')}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">Metric (kg, cm)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="units"
                    value="imperial"
                    checked={units === 'imperial'}
                    onChange={() => setUnits('imperial')}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">Imperial (lbs, ft/in)</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="px-8 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
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
