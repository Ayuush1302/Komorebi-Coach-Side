import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Check } from 'lucide-react';

export default function Welcome() {
  const navigate = useNavigate();
  const { user, completeOnboarding } = useAuth();

  const handleGoToDashboard = () => {
    completeOnboarding();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-2xl p-8 text-center">
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-10 h-10 text-blue-600" />
        </div>
        
        <h1 className="text-3xl mb-3">Welcome to Komorebi!</h1>
        
        <p className="text-gray-600 mb-8">
          Your profile is all set up. You're ready to start coaching and managing your athletes.
        </p>

        <button
          onClick={() => navigate('/library')}
          className="w-full px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-lg"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}