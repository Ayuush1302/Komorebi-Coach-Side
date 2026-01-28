import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

import { User, Mail, Globe, Clock, Award, Instagram, Youtube, Linkedin } from 'lucide-react';

export default function Profile() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl">Profile</h1>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-blue-500 to-blue-600"></div>

        <div className="px-8 pb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6 -mt-16 mb-6">
            <div className="w-32 h-32 bg-white rounded-full border-4 border-white shadow-lg flex items-center justify-center">
              <User className="w-16 h-16 text-gray-400" />
            </div>

            <div className="flex-1">
              <h2 className="text-2xl mb-1">{user?.firstName} {user?.lastName}</h2>
              <p className="text-gray-600">Elite Strength & Conditioning Coach</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm text-gray-700 mb-4">Basic Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600">{user?.email || 'coach@example.com'}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Globe className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600">United States</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600">America/New_York</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm text-gray-700 mb-4">Social Links</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Instagram className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600">@coach_username</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Youtube className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600">Coach Channel</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Linkedin className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600">linkedin.com/in/coach</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t">
            <h3 className="text-sm text-gray-700 mb-3">About</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Passionate about helping athletes reach their full potential through evidence-based training methods.
              Specializing in strength development and injury prevention with over 5 years of coaching experience.
            </p>
          </div>

          <div className="mt-6 pt-6 border-t">
            <h3 className="text-sm text-gray-700 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5" />
              Certifications
            </h3>
            <div className="space-y-3">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm mb-1">Certified Strength & Conditioning Specialist</p>
                <p className="text-xs text-gray-600">NSCA • 2020 - 2026</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm mb-1">Certified Personal Trainer</p>
                <p className="text-xs text-gray-600">NASM • 2019 - 2025</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
