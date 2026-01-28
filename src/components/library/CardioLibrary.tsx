import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { ArrowLeft, Plus, Clock, Activity, TrendingUp } from 'lucide-react';

interface CardioSession {
  id: string;
  name: string;
  description: string;
  activityType: string;
  distance?: string;
  duration?: string;
  tss?: string;
  isTemplate?: boolean;
}

export default function CardioLibrary() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialTab = (searchParams.get('tab') as 'templates' | 'custom') || 'templates';
  const [activeTab, setActiveTab] = useState<'templates' | 'custom'>(initialTab);

  // Mock templates
  const mockTemplates: CardioSession[] = [
    {
      id: 't1',
      name: '10K Run',
      description: 'Steady state 10K run at moderate pace',
      activityType: 'Running',
      distance: '10 km',
      duration: '50 min',
      tss: '65',
      isTemplate: true,
    },
    {
      id: 't2',
      name: 'Zone 2 Cycling',
      description: 'Easy aerobic base building ride',
      activityType: 'Cycling',
      distance: '40 km',
      duration: '90 min',
      tss: '70',
      isTemplate: true,
    },
    {
      id: 't3',
      name: 'Tempo Run',
      description: 'Threshold pace training session',
      activityType: 'Running',
      distance: '8 km',
      duration: '35 min',
      tss: '85',
      isTemplate: true,
    },
    {
      id: 't4',
      name: 'Interval Training',
      description: '8x400m at VO2max with 90s recovery',
      activityType: 'Running',
      distance: '5 km',
      duration: '30 min',
      tss: '95',
      isTemplate: true,
    },
    {
      id: 't5',
      name: 'Recovery Swim',
      description: 'Easy swim for active recovery',
      activityType: 'Swimming',
      distance: '2 km',
      duration: '40 min',
      tss: '35',
      isTemplate: true,
    },
    {
      id: 't6',
      name: 'Long Ride',
      description: 'Endurance building long ride',
      activityType: 'Cycling',
      distance: '80 km',
      duration: '180 min',
      tss: '150',
      isTemplate: true,
    },
  ];

  // Mock custom sessions
  const mockCustomSessions: CardioSession[] = [
    {
      id: 'c1',
      name: 'Morning 5K',
      description: 'Easy morning run routine',
      activityType: 'Running',
      distance: '5 km',
      duration: '25 min',
      tss: '45',
    },
    {
      id: 'c2',
      name: 'Hill Repeats',
      description: 'Custom hill workout for strength',
      activityType: 'Running',
      distance: '6 km',
      duration: '40 min',
      tss: '90',
    },
  ];

  const displaySessions = activeTab === 'templates' ? mockTemplates : mockCustomSessions;

  const getActivityIcon = (type: string) => {
    return Activity;
  };

  const getActivityColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'running':
        return 'bg-blue-100 text-blue-600';
      case 'cycling':
        return 'bg-green-100 text-green-600';
      case 'swimming':
        return 'bg-cyan-100 text-cyan-600';
      case 'rowing':
        return 'bg-purple-100 text-purple-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate('/library')}
          className="p-2 -ml-2 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-3xl flex-1">Sports Workouts</h1>
        <button
          onClick={() => navigate('/create/cardio')}
          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* Segmented Control */}
      <div className="inline-flex bg-gray-100 rounded-lg p-1 mb-6">
        <button
          onClick={() => setActiveTab('templates')}
          className={`px-6 py-2 rounded-md text-sm transition-colors ${activeTab === 'templates'
            ? 'bg-white shadow-sm'
            : 'text-gray-600'
            }`}
        >
          📘 Templates
        </button>
        <button
          onClick={() => setActiveTab('custom')}
          className={`px-6 py-2 rounded-md text-sm transition-colors ${activeTab === 'custom'
            ? 'bg-white shadow-sm'
            : 'text-gray-600'
            }`}
        >
          ⭐ My Custom
        </button>
      </div>

      {/* Filter Chips */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        <button className="px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm whitespace-nowrap">
          All Activities
        </button>
        <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm whitespace-nowrap">
          Running
        </button>
        <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm whitespace-nowrap">
          Cycling
        </button>
        <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm whitespace-nowrap">
          Swimming
        </button>
        <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm whitespace-nowrap">
          Duration
        </button>
        <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm whitespace-nowrap">
          Intensity
        </button>
      </div>

      {/* Cardio Session List */}
      <div className="space-y-3">
        {displaySessions.map((session) => {
          const ActivityIcon = getActivityIcon(session.activityType);
          return (
            <div
              key={session.id}
              onClick={() => navigate(`/cardio/${session.id}`)}
              className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3 flex-1">
                  <div className={`p-2 rounded-lg ${getActivityColor(session.activityType)}`}>
                    <ActivityIcon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-lg mb-1">{session.name}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{session.description}</p>
                  </div>
                </div>
                {session.isTemplate && (
                  <span className="ml-3 px-2 py-1 bg-blue-100 text-blue-600 rounded text-xs">
                    Template
                  </span>
                )}
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-500 mt-4">
                <div className="flex items-center gap-1">
                  <span className="font-medium text-gray-700">{session.activityType}</span>
                </div>
                {session.distance && (
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    <span>{session.distance}</span>
                  </div>
                )}
                {session.duration && (
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{session.duration}</span>
                  </div>
                )}
                {session.tss && (
                  <div className="flex items-center gap-1">
                    <span className="text-xs">TSS:</span>
                    <span>{session.tss}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {activeTab === 'custom' && mockCustomSessions.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No custom sports workouts yet</p>
          <button
            onClick={() => navigate('/create/cardio')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create Your First Session
          </button>
        </div>
      )}
    </>
  );
}