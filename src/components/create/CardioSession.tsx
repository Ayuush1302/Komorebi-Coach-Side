import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AppLayout from '../layout/AppLayout';
import { ArrowLeft, Save } from 'lucide-react';

export default function CardioSession() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    name: '',
    activityType: 'Running',
    distance: '',
    duration: '',
    avgPace: '',
    elevationGain: '',
    tss: '',
    intensityFactor: '',
    notes: '',
  });

  useEffect(() => {
    if (isEditing) {
      // In a real app, fetch the athlete workout by ID
      // For now, mock data
      setFormData({
        name: 'Sample Athlete Workout',
        activityType: 'Running',
        distance: '10',
        duration: '50',
        avgPace: '5:00/km',
        elevationGain: '100',
        tss: '65',
        intensityFactor: '0.85',
        notes: 'Easy steady state run',
      });
    }
  }, [isEditing]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save athlete workout logic
    navigate('/library/cardio');
  };

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate(isEditing ? '/library/cardio' : '/library')}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-3xl flex-1">
            {isEditing ? 'Edit Athlete Workout' : 'New Athlete Workout'}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Session Name */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <label className="block text-sm font-medium mb-2">Session Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Morning 10K Run"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Activity Type */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <label className="block text-sm font-medium mb-2">Activity Type</label>
            <select
              value={formData.activityType}
              onChange={(e) => setFormData({ ...formData, activityType: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Running">Running</option>
              <option value="Cycling">Cycling</option>
              <option value="Swimming">Swimming</option>
              <option value="Rowing">Rowing</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Planned Metrics */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-medium mb-4">Planned Metrics</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-2">Distance</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={formData.distance}
                    onChange={(e) => setFormData({ ...formData, distance: e.target.value })}
                    placeholder="10"
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <select className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>km</option>
                    <option>mi</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">Duration</label>
                <input
                  type="text"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="45 min"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">Avg Pace</label>
                <input
                  type="text"
                  value={formData.avgPace}
                  onChange={(e) => setFormData({ ...formData, avgPace: e.target.value })}
                  placeholder="4:30/km"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">Elevation Gain</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={formData.elevationGain}
                    onChange={(e) => setFormData({ ...formData, elevationGain: e.target.value })}
                    placeholder="150"
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="px-4 py-3 text-gray-500">m</span>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">TSS (Training Stress Score)</label>
                <input
                  type="number"
                  value={formData.tss}
                  onChange={(e) => setFormData({ ...formData, tss: e.target.value })}
                  placeholder="65"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">IF (Intensity Factor)</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.intensityFactor}
                  onChange={(e) => setFormData({ ...formData, intensityFactor: e.target.value })}
                  placeholder="0.85"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <label className="block text-sm font-medium mb-2">Notes</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Add any additional notes or instructions..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => navigate('/athletes')}
              className="flex-1 px-6 py-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Assign to Athlete
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              {isEditing ? 'Update Session' : 'Save Session'}
            </button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}