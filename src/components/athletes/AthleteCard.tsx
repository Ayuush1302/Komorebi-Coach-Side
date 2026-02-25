import { useState } from 'react';
import { MoreVertical, Eye, Snowflake, Trash2, UserCircle, Sun } from 'lucide-react';
import { Athlete } from '../../context/DataContext';

interface AthleteCardProps {
  athlete: Athlete;
  onViewDashboard: (id: string) => void;
  onFreeze: (id: string) => void;
  onUnfreeze: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function AthleteCard({ athlete, onViewDashboard, onFreeze, onUnfreeze, onDelete }: AthleteCardProps) {
  const [showMenu, setShowMenu] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Connected':
        return 'bg-green-100 text-green-700';
      case 'Pending':
        return 'bg-amber-100 text-amber-700';
      case 'Frozen':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Online':
        return 'border-blue-500';
      case 'In-Person':
        return 'border-green-500';
      case 'Hybrid':
        return 'border-purple-500';
      default:
        return 'border-gray-500';
    }
  };

  return (
    <div className={`bg-white rounded-lg border-2 ${getCategoryColor(athlete.category)} hover:shadow-md transition-all relative`}>
      <div className="p-6">
        {/* Header with Avatar and Menu */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {athlete.avatar ? (
              <img
                src={athlete.avatar}
                alt={athlete.name || athlete.email}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <UserCircle className="w-8 h-8 text-gray-400" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium truncate">
                {athlete.name || athlete.email.split('@')[0]}
              </h3>
              <p className="text-xs text-gray-500 truncate">{athlete.email}</p>
            </div>
          </div>

          {/* Three Dots Menu */}
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <MoreVertical className="w-5 h-5 text-gray-500" />
            </button>

            {showMenu && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowMenu(false)}
                />
                <div className="absolute right-0 top-8 bg-white rounded-lg shadow-lg border border-gray-200 py-1 min-w-[180px] z-20">
                  <button
                    onClick={() => {
                      onViewDashboard(athlete.id);
                      setShowMenu(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    View Dashboard
                  </button>
                  
                  {athlete.status === 'Frozen' ? (
                    <button
                      onClick={() => {
                        onUnfreeze(athlete.id);
                        setShowMenu(false);
                      }}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 text-green-600"
                    >
                      <Sun className="w-4 h-4" />
                      Unfreeze Client
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        onFreeze(athlete.id);
                        setShowMenu(false);
                      }}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 text-blue-600"
                    >
                      <Snowflake className="w-4 h-4" />
                      Freeze Client
                    </button>
                  )}
                  
                  <button
                    onClick={() => {
                      onDelete(athlete.id);
                      setShowMenu(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete Client
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Badges */}
        <div className="flex items-center gap-2 mb-4">
          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(athlete.status)}`}>
            {athlete.status}
          </span>
          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
            {athlete.category}
          </span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
          <div>
            <p className="text-xs text-gray-500 mb-1">Today's Workout Done</p>
            <p className="text-sm font-medium">
              {athlete.todaysWorkoutProgress !== undefined 
                ? `${athlete.todaysWorkoutProgress}%` 
                : '0%'}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Program</p>
            <p className="text-sm font-medium">
              {athlete.program && athlete.packageDuration 
                ? `${athlete.program} (${athlete.packageDuration})`
                : 'Not assigned'}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-4 border-t">
          <p className="text-xs text-gray-500">
            Joined {athlete.joinedDate}
            {athlete.lastActive && (
              <span className="ml-2">• Last active {athlete.lastActive}</span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}