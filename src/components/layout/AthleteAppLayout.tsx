import { ReactNode } from 'react';
import AthleteBottomNav from './AthleteBottomNav';

interface AthleteAppLayoutProps {
    children: ReactNode;
}

export default function AthleteAppLayout({ children }: AthleteAppLayoutProps) {
    return (
        <div className="min-h-screen bg-gray-50 pb-16">
            {/* Header */}
            <header className="sticky top-0 bg-white border-b border-gray-200 z-40">
                <div className="max-w-screen-xl mx-auto px-4 h-16 flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Komorebi</h1>
                    {/* Add Athlete-specific header actions if needed, e.g. Notifications */}
                </div>
            </header>

            <main className="max-w-screen-xl mx-auto px-4 py-6">
                {children}
            </main>
            <AthleteBottomNav />
        </div>
    );
}
