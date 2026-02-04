import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { User, Bell, Lock, Globe, LogOut, ChevronRight } from 'lucide-react';

export default function AthleteProfileView() {
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    const sections = [
        {
            title: 'Settings',
            items: [
                { label: 'Edit Profile', icon: User, path: '/athlete/profile/edit' },
                { label: 'Notifications', icon: Bell, path: '/athlete/profile/notifications' },
                { label: 'Language', icon: Globe, path: '/athlete/profile/language' },
            ],
        },
        {
            title: 'Support',
            items: [
                { label: 'Help Center', icon: User, path: '/athlete/support' }, // Using User icon as placeholder or appropriate help icon
                { label: 'Privacy Policy', icon: Lock, path: '/athlete/privacy' },
            ],
        },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Profile</h1>

            {/* Profile Header */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl">
                    {user?.username?.[0]?.toUpperCase() || 'A'}
                </div>
                <div>
                    <h2 className="text-lg font-semibold text-gray-900">{user?.username || 'Athlete'}</h2>
                    <p className="text-sm text-gray-500">{user?.email || 'athlete@komorebi.ai'}</p>
                    <div className="mt-2 text-xs inline-flex items-center px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-medium">
                        {user?.role === 'athlete' ? 'Athlete Account' : 'Account'}
                    </div>
                </div>
            </div>

            {/* Menu Sections */}
            <div className="space-y-6">
                {sections.map((section) => (
                    <div key={section.title}>
                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 ml-1">{section.title}</h3>
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                            {section.items.map((item, index) => {
                                const Icon = item.icon;
                                return (
                                    <div key={item.label}>
                                        {index > 0 && <div className="border-t border-gray-50" />}
                                        <button
                                            // onClick={() => navigate(item.path)} // Paths might not exist yet
                                            className="w-full p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left"
                                        >
                                            <div className="p-2 bg-gray-50 rounded-lg text-gray-600">
                                                <Icon className="w-5 h-5" />
                                            </div>
                                            <span className="flex-1 text-sm font-medium text-gray-700">{item.label}</span>
                                            <ChevronRight className="w-4 h-4 text-gray-400" />
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {/* Logout */}
            <button
                onClick={handleLogout}
                className="w-full p-4 bg-white border border-gray-200 rounded-xl flex items-center justify-center gap-2 text-red-600 font-medium hover:bg-red-50 transition-colors shadow-sm"
            >
                <LogOut className="w-5 h-5" />
                Log Out
            </button>
        </div>
    );
}
