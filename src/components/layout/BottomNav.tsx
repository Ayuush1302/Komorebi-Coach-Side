import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, MessageCircle, Users, Calendar, Activity } from 'lucide-react';

export default function BottomNav() {
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/activity', label: 'Activity', icon: Activity },
    { path: '/calendar', label: 'Calendar', icon: Calendar },
    { path: '/athletes', label: 'Athletes', icon: Users },
    { path: '/chats', label: 'Chat', icon: MessageCircle },
  ];

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex items-center justify-around h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${active ? 'text-blue-600' : 'text-gray-500'
                  }`}
              >
                <Icon className={`w-6 h-6 mb-1 ${active ? 'stroke-[2.5]' : ''}`} />
                <span className="text-xs">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}