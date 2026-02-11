import { ReactNode } from 'react';
import AthleteBottomNav from './AthleteBottomNav';
import { Bell } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface AthleteAppLayoutProps {
    children: ReactNode;
}

export default function AthleteAppLayout({ children }: AthleteAppLayoutProps) {
    const navigate = useNavigate();

    const location = useLocation();
    const isHome = location.pathname === '/athlete/home';

    return (
        <div className="min-h-screen bg-gray-50 pb-16">
            {/* Header */}
            {!isHome && (
                <header className="sticky top-0 bg-white border-b border-gray-200 z-40">
                    <div className="max-w-screen-xl mx-auto px-4 h-16 flex items-center justify-between">
                        <h1 className="text-xl font-semibold">Komorebi</h1>
                        <button
                            onClick={() => navigate('/athlete/profile/notifications')}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
                        >
                            <Bell className="w-6 h-6 text-gray-600" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>
                    </div>
                </header>
            )}

            <main className="max-w-screen-xl mx-auto px-4 py-6">
                {children}
            </main>
            <AthleteBottomNav />
        </div>
    );
}
