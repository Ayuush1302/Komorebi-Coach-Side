import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, X, FileText } from 'lucide-react';

interface Certificate {
  id: string;
  name: string;
  organization: string;
  year: string;
  expiration: string;
  file?: File;
}

export default function OnboardingCertifications() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const navigate = useNavigate();

  const addCertificate = () => {
    setCertificates(prev => [...prev, {
      id: `cert-${Date.now()}`,
      name: '',
      organization: '',
      year: '',
      expiration: '',
    }]);
  };

  const updateCertificate = (id: string, field: keyof Certificate, value: string | File) => {
    setCertificates(prev => prev.map(cert =>
      cert.id === id ? { ...cert, [field]: value } : cert
    ));
  };

  const removeCertificate = (id: string) => {
    setCertificates(prev => prev.filter(cert => cert.id !== id));
  };

  const handleSkip = () => {
    navigate('/onboarding/profile');
  };

  const handleContinue = () => {
    navigate('/onboarding/profile');
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl mb-2">Komorebi</h1>
          <div className="flex items-center justify-center gap-2 mt-6">
            <div className="w-8 h-1 bg-blue-600 rounded"></div>
            <div className="w-8 h-1 bg-blue-600 rounded"></div>
            <div className="w-8 h-1 bg-blue-600 rounded"></div>
            <div className="w-8 h-1 bg-gray-300 rounded"></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">Step 3 of 4</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl mb-2">Certifications</h2>
          <p className="text-gray-600 mb-2 text-sm">Add your professional certifications</p>
          <p className="text-xs text-gray-500 mb-8">
            Your certifications help clients trust you. You can update these anytime.
          </p>

          <div className="space-y-6">
            {certificates.map((cert, index) => (
              <div key={cert.id} className="border border-gray-300 rounded-lg p-6 relative">
                <button
                  type="button"
                  onClick={() => removeCertificate(cert.id)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>

                <h3 className="text-sm mb-4 text-gray-700">Certificate {index + 1}</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm mb-2 text-gray-700">Upload Certificate</label>
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        {cert.file ? (
                          <>
                            <FileText className="w-8 h-8 text-blue-600 mb-2" />
                            <p className="text-sm text-gray-600">{cert.file.name}</p>
                          </>
                        ) : (
                          <>
                            <Upload className="w-8 h-8 text-gray-400 mb-2" />
                            <p className="text-sm text-gray-600">Click to upload</p>
                            <p className="text-xs text-gray-400 mt-1">PDF, JPG or PNG</p>
                          </>
                        )}
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) updateCertificate(cert.id, 'file', file);
                        }}
                      />
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm mb-2 text-gray-700">Certification Name</label>
                    <input
                      type="text"
                      value={cert.name}
                      onChange={(e) => updateCertificate(cert.id, 'name', e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Certified Strength & Conditioning Specialist"
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-2 text-gray-700">Issuing Organization</label>
                    <input
                      type="text"
                      value={cert.organization}
                      onChange={(e) => updateCertificate(cert.id, 'organization', e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., NSCA"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm mb-2 text-gray-700">Year of Certification</label>
                      <input
                        type="text"
                        value={cert.year}
                        onChange={(e) => updateCertificate(cert.id, 'year', e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="2023"
                      />
                    </div>

                    <div>
                      <label className="block text-sm mb-2 text-gray-700">Expiration Date</label>
                      <input
                        type="date"
                        value={cert.expiration}
                        onChange={(e) => updateCertificate(cert.id, 'expiration', e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addCertificate}
              className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
            >
              <Upload className="w-5 h-5" />
              Add Certificate
            </button>
          </div>

          <div className="flex justify-between pt-8 mt-8 border-t">
            <button
              type="button"
              onClick={handleSkip}
              className="px-6 py-2.5 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Skip for now
            </button>
            <button
              type="button"
              onClick={handleContinue}
              className="px-8 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
