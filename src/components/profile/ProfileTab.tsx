import AppLayout from '../layout/AppLayout';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { User, Settings, Bell, Lock, Globe, Palette, LogOut } from 'lucide-react';

export default function ProfileTab() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const sections = [
    {
      title: 'Account',
      items: [
        { label: 'Profile Settings', icon: User, path: '/profile/settings' },
        { label: 'Notifications', icon: Bell, path: '/profile/notifications' },
      ],
    },
    {
      title: 'Preferences',
      items: [
        { label: 'Privacy & Security', icon: Lock, path: '/profile/privacy' },
        { label: 'Language & Region', icon: Globe, path: '/profile/language' },
        { label: 'Appearance', icon: Palette, path: '/profile/appearance' },
      ],
    },
  ];

  return (
    <AppLayout>
      <h1 className="text-3xl mb-6">Profile</h1>

      {/* Profile Header */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6 flex items-center gap-4">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
          <User className="w-8 h-8 text-blue-600" />
        </div>
        <div>
          <h2 className="text-xl mb-1">Coach Name</h2>
          <p className="text-sm text-gray-500">coach@example.com</p>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {sections.map((section) => (
          <div key={section.title}>
            <h3 className="text-sm text-gray-500 uppercase mb-3">{section.title}</h3>
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              {section.items.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={item.label}>
                    {index > 0 && <div className="border-t border-gray-100" />}
                    <button
                      onClick={() => navigate(item.path)}
                      className="w-full p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left"
                    >
                      <Icon className="w-5 h-5 text-gray-400" />
                      <span className="flex-1">{item.label}</span>
                      <span className="text-gray-400">›</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="w-full mt-6 p-4 bg-white border border-gray-200 rounded-lg flex items-center justify-center gap-2 text-red-600 hover:bg-red-50 transition-colors"
      >
        <LogOut className="w-5 h-5" />
        Log Out
      </button>
    </AppLayout>
  );
}
