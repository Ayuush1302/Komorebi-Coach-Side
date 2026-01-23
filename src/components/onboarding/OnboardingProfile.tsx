import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Instagram, Youtube, Linkedin, User } from 'lucide-react';

export default function OnboardingProfile() {
  const [profileImage, setProfileImage] = useState<string>('');
  const [coachTitle, setCoachTitle] = useState('');
  const [bio, setBio] = useState('');
  const [instagram, setInstagram] = useState('');
  const [youtube, setYoutube] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const navigate = useNavigate();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFinish = () => {
    navigate('/welcome');
  };

  const maxBioLength = 300;
  const bioCharsRemaining = maxBioLength - bio.length;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl mb-2">Komorebi</h1>
          <div className="flex items-center justify-center gap-2 mt-6">
            <div className="w-8 h-1 bg-blue-600 rounded"></div>
            <div className="w-8 h-1 bg-blue-600 rounded"></div>
            <div className="w-8 h-1 bg-blue-600 rounded"></div>
            <div className="w-8 h-1 bg-blue-600 rounded"></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">Step 4 of 4</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl mb-2">Profile Setup</h2>
          <p className="text-gray-600 mb-8 text-sm">Create your professional profile</p>

          <div className="space-y-6">
            <div className="flex flex-col items-center">
              <label className="cursor-pointer">
                <div className="w-32 h-32 rounded-full border-2 border-gray-300 overflow-hidden bg-gray-100 flex items-center justify-center hover:border-blue-500 transition-colors">
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-16 h-16 text-gray-400" />
                  )}
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </label>
              <button className="mt-3 text-sm text-blue-600 hover:underline flex items-center gap-1">
                <Upload className="w-4 h-4" />
                Upload profile photo
              </button>
            </div>

            <div>
              <label className="block text-sm mb-2 text-gray-700">Coach Title</label>
              <input
                type="text"
                value={coachTitle}
                onChange={(e) => setCoachTitle(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Elite Strength & Conditioning Coach"
              />
            </div>

            <div>
              <label className="block text-sm mb-2 text-gray-700">Short Bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value.slice(0, maxBioLength))}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={4}
                placeholder="Tell clients about your coaching philosophy and experience..."
              />
              <p className="text-xs text-gray-500 mt-1 text-right">
                {bioCharsRemaining} characters remaining
              </p>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-sm mb-4 text-gray-700">Social Links (Optional)</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-2 text-gray-700">Instagram</label>
                  <div className="relative">
                    <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={instagram}
                      onChange={(e) => setInstagram(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="@username"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-2 text-gray-700">YouTube</label>
                  <div className="relative">
                    <Youtube className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={youtube}
                      onChange={(e) => setYoutube(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Channel URL"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-2 text-gray-700">LinkedIn</label>
                  <div className="relative">
                    <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={linkedin}
                      onChange={(e) => setLinkedin(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Profile URL"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-8 mt-8 border-t">
            <button
              type="button"
              onClick={handleFinish}
              className="px-8 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Finish Setup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
