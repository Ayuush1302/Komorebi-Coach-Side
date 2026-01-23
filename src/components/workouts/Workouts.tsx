import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData, mockTemplates } from '../../context/DataContext';
import Layout from '../layout/Layout';
import { Plus, MoreVertical, Copy, Trash2, Edit, Eye, ChevronDown, ChevronUp } from 'lucide-react';

interface WorkoutsProps {
  embedded?: boolean;
}

export default function Workouts({ embedded = false }: WorkoutsProps) {
  const [activeTab, setActiveTab] = useState<'workouts' | 'templates'>('workouts');
  const { workouts, deleteWorkout, duplicateWorkout, addWorkout } = useData();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState<string | null>(null);
  const [expandedDescriptions, setExpandedDescriptions] = useState<Set<string>>(new Set());

  const toggleDescription = (id: string) => {
    setExpandedDescriptions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this workout?')) {
      deleteWorkout(id);
    }
    setShowMenu(null);
  };

  const handleDuplicate = (id: string) => {
    duplicateWorkout(id);
    setShowMenu(null);
  };

  const handleUseTemplate = (template: any) => {
    // Just navigate to edit the template, don't add to workouts yet
    navigate(`/workouts/create?template=${template.id}`);
  };

  const content = (
    <div className="max-w-7xl mx-auto">
      {!embedded && (
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl">Workouts</h1>
        </div>
      )}

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200">
          <div className="flex">
            <button
              onClick={() => setActiveTab('workouts')}
              className={`px-6 py-3 text-sm transition-colors ${
                activeTab === 'workouts'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Custom Workouts
            </button>
            <button
              onClick={() => setActiveTab('templates')}
              className={`px-6 py-3 text-sm transition-colors ${
                activeTab === 'templates'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Templates
            </button>
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'workouts' ? (
            <div className="space-y-4">
              {workouts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 mb-4">No workouts yet. Create your first workout!</p>
                  <button
                    onClick={() => navigate('/workouts/create')}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Create Workout
                  </button>
                </div>
              ) : (
                workouts.map((workout) => {
                  const isExpanded = expandedDescriptions.has(workout.id);
                  const descriptionLength = workout.description.length;
                  const shouldTruncate = descriptionLength > 60;
                  const displayDescription = isExpanded || !shouldTruncate 
                    ? workout.description 
                    : workout.description.slice(0, 60) + '...';

                  return (
                    <div
                      key={workout.id}
                      className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-all"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1 pr-4">
                          <h3 className="text-lg mb-2">{workout.name}</h3>
                          <p className="text-sm text-gray-600">
                            {displayDescription}
                          </p>
                          {shouldTruncate && (
                            <button
                              onClick={() => toggleDescription(workout.id)}
                              className="text-sm text-blue-600 hover:text-blue-700 mt-2 flex items-center gap-1 transition-colors"
                            >
                              {isExpanded ? (
                                <>
                                  See less
                                  <ChevronUp className="w-4 h-4" />
                                </>
                              ) : (
                                <>
                                  See more
                                  <ChevronDown className="w-4 h-4" />
                                </>
                              )}
                            </button>
                          )}
                        </div>

                        <div className="relative">
                          <button
                            onClick={() => setShowMenu(showMenu === workout.id ? null : workout.id)}
                            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                          >
                            <MoreVertical className="w-5 h-5 text-gray-600" />
                          </button>

                          {showMenu === workout.id && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                              <button
                                onClick={() => {
                                  navigate(`/workouts/edit/${workout.id}`);
                                  setShowMenu(null);
                                }}
                                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2"
                              >
                                <Edit className="w-4 h-4" />
                                Edit
                              </button>
                              <button
                                onClick={() => handleDuplicate(workout.id)}
                                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2"
                              >
                                <Copy className="w-4 h-4" />
                                Duplicate
                              </button>
                              <button
                                onClick={() => handleDelete(workout.id)}
                                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2 text-red-600"
                              >
                                <Trash2 className="w-4 h-4" />
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>{workout.exercises.length} exercises</span>
                        <span>•</span>
                        <span>Last edited: {workout.lastEdited}</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {mockTemplates.map((template) => {
                const isExpanded = expandedDescriptions.has(template.id);
                const descriptionLength = template.description.length;
                const shouldTruncate = descriptionLength > 60;
                const displayDescription = isExpanded || !shouldTruncate 
                  ? template.description 
                  : template.description.slice(0, 60) + '...';

                return (
                  <div
                    key={template.id}
                    className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-all"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1 pr-4">
                        <h3 className="text-lg mb-2">{template.name}</h3>
                        <p className="text-sm text-gray-600">
                          {displayDescription}
                        </p>
                        {shouldTruncate && (
                          <button
                            onClick={() => toggleDescription(template.id)}
                            className="text-sm text-blue-600 hover:text-blue-700 mt-2 flex items-center gap-1 transition-colors"
                          >
                            {isExpanded ? (
                              <>
                                See less
                                <ChevronUp className="w-4 h-4" />
                              </>
                            ) : (
                              <>
                                See more
                                <ChevronDown className="w-4 h-4" />
                              </>
                            )}
                          </button>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleUseTemplate(template)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
                        >
                          Use Template
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-md transition-colors">
                          <Eye className="w-5 h-5 text-gray-600" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>{template.exercises.length} exercises</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {activeTab === 'workouts' && !embedded && (
        <button
          onClick={() => navigate('/workouts/create')}
          className="fixed bottom-24 md:bottom-8 right-8 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all flex items-center justify-center hover:scale-110"
        >
          <Plus className="w-6 h-6" />
        </button>
      )}
    </div>
  );

  return embedded ? content : <Layout>{content}</Layout>;
}