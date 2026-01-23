import { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, Users, MessageCircle, Menu, User, Settings, LogOut, Calendar, BookOpen, HelpCircle, Plus, Activity } from 'lucide-react';
import { useState } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/activity', label: 'Activity', icon: Activity },
    { path: '/calendar', label: 'Calendar', icon: Calendar },
    { path: '/athletes', label: 'Athletes', icon: Users },
    { path: '/chats', label: 'Chat', icon: MessageCircle },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <Link to="/dashboard" className="text-2xl">
                Komorebi
              </Link>

              <div className="hidden md:flex items-center gap-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  let isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');

                  // Special handling for /workout to also match /workouts and /exercises
                  if (item.path === '/workout') {
                    isActive = isActive || location.pathname.startsWith('/workouts') || location.pathname.startsWith('/exercises');
                  }

                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${isActive
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-sm">{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate('/create-post')}
                className="p-2 text-gray-600 hover:text-blue-600 transition-colors md:hidden"
              >
                <Plus className="w-6 h-6" />
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowHamburgerMenu(!showHamburgerMenu)}
                  className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <Menu className="w-6 h-6" />
                </button>

                {showHamburgerMenu && (
                  <>
                    {/* Backdrop to close menu when clicking outside */}
                    <div
                      className="fixed inset-0 z-20"
                      onClick={() => setShowHamburgerMenu(false)}
                    />

                    {/* Dropdown Menu */}
                    <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-30">
                      <div className="py-2">
                        <button
                          onClick={() => {
                            navigate('/profile');
                            setShowHamburgerMenu(false);
                          }}
                          className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50 flex items-center gap-3 text-gray-700 transition-colors"
                        >
                          <User className="w-5 h-5" />
                          Profile
                        </button>

                        <button
                          onClick={() => {
                            navigate('/library');
                            setShowHamburgerMenu(false);
                          }}
                          className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50 flex items-center gap-3 text-gray-700 transition-colors"
                        >
                          <BookOpen className="w-5 h-5" />
                          Library
                        </button>

                        <button
                          onClick={() => {
                            navigate('/settings');
                            setShowHamburgerMenu(false);
                          }}
                          className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50 flex items-center gap-3 text-gray-700 transition-colors"
                        >
                          <Settings className="w-5 h-5" />
                          Settings
                        </button>

                        <button
                          onClick={() => {
                            navigate('/support');
                            setShowHamburgerMenu(false);
                          }}
                          className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50 flex items-center gap-3 text-gray-700 transition-colors"
                        >
                          <HelpCircle className="w-5 h-5" />
                          Help / Support
                        </button>

                        <div className="border-t border-gray-200 my-2" />
                        <button
                          onClick={() => {
                            handleLogout();
                            setShowHamburgerMenu(false);
                          }}
                          className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50 flex items-center gap-3 text-red-600 transition-colors"
                        >
                          <LogOut className="w-5 h-5" />
                          Log out
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Bottom Navigation for Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="flex items-center justify-around py-3 px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            let isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');

            // Special handling for /workout to also match /workouts and /exercises
            if (item.path === '/workout') {
              isActive = isActive || location.pathname.startsWith('/workouts') || location.pathname.startsWith('/exercises');
            }

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center gap-1 px-3 py-1 rounded-md transition-colors ${isActive
                  ? 'text-blue-600'
                  : 'text-gray-600'
                  }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}