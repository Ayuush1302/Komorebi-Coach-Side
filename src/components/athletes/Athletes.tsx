import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import AddAthleteModal from './AddAthleteModal';
import AthleteCard from './AthleteCard';
import { Plus, Search, Filter, Users, UserCheck, UserX, Snowflake } from 'lucide-react';

export default function Athletes() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('Connected');
  const [sortOrder, setSortOrder] = useState<'A-Z' | 'Z-A'>('A-Z');
  const [showAddModal, setShowAddModal] = useState(false);
  const { athletes, freezeAthlete, unfreezeAthlete, deleteAthlete } = useData();
  const navigate = useNavigate();

  // Filter and sort athletes
  const filteredAthletes = athletes
    .filter(athlete => {
      const matchesSearch =
        athlete.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (athlete.name && athlete.name.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = !categoryFilter || categoryFilter === 'All' || athlete.category === categoryFilter;
      const matchesStatus = !statusFilter || statusFilter === 'All' || athlete.status === statusFilter;
      return matchesSearch && matchesCategory && matchesStatus;
    })
    .sort((a, b) => {
      const nameA = a.name || a.email;
      const nameB = b.name || b.email;
      return sortOrder === 'A-Z'
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    });

  // Calculate stats
  const connectedCount = athletes.filter(a => a.status === 'Connected').length;
  const pendingCount = athletes.filter(a => a.status === 'Pending').length;
  const frozenCount = athletes.filter(a => a.status === 'Frozen').length;

  const handleViewDashboard = (athleteId: string) => {
    navigate(`/athletes/${athleteId}/dashboard`);
  };

  const handleFreezeAthlete = (athleteId: string) => {
    freezeAthlete(athleteId);
  };

  const handleUnfreezeAthlete = (athleteId: string) => {
    unfreezeAthlete(athleteId);
  };

  const handleDeleteAthlete = (athleteId: string) => {
    if (window.confirm('Are you sure you want to permanently delete this athlete? This action cannot be undone.')) {
      deleteAthlete(athleteId);
    }
  };

  return (
    <>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl">Athletes</h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Athletes
          </button>
        </div>

        {/* Stats Cards */}
        <div className="flex gap-4 mb-8 overflow-x-auto">
          <button
            onClick={() => setStatusFilter('Connected')}
            className={`bg-white rounded-lg border-2 p-6 flex-1 min-w-[200px] text-left transition-all hover:shadow-md ${statusFilter === 'Connected'
              ? 'border-green-500 ring-2 ring-green-200'
              : 'border-gray-200'
              }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Connected Clients</p>
                <p className="text-3xl font-medium text-green-600">{connectedCount}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </button>

          <button
            onClick={() => setStatusFilter('Pending')}
            className={`bg-white rounded-lg border-2 p-6 flex-1 min-w-[200px] text-left transition-all hover:shadow-md ${statusFilter === 'Pending'
              ? 'border-amber-500 ring-2 ring-amber-200'
              : 'border-gray-200'
              }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Pending Clients</p>
                <p className="text-3xl font-medium text-amber-600">{pendingCount}</p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <UserX className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </button>

          <button
            onClick={() => setStatusFilter('Frozen')}
            className={`bg-white rounded-lg border-2 p-6 flex-1 min-w-[200px] text-left transition-all hover:shadow-md ${statusFilter === 'Frozen'
              ? 'border-blue-500 ring-2 ring-blue-200'
              : 'border-gray-200'
              }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Frozen Clients</p>
                <p className="text-3xl font-medium text-blue-600">{frozenCount}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Snowflake className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </button>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Search athletes by name or email..."
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700">Category:</span>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All</option>
                  <option value="Online">Online</option>
                  <option value="In-Person">In-Person</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-700">Sort:</span>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as 'A-Z' | 'Z-A')}
                  className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="A-Z">A-Z</option>
                  <option value="Z-A">Z-A</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Athletes List */}
        {filteredAthletes.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 p-16 text-center">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg mb-2 text-gray-700">No athletes found</h3>
            <p className="text-sm text-gray-500 mb-6">
              {searchTerm || categoryFilter || statusFilter
                ? 'Try adjusting your search or filters'
                : 'Get started by adding your first athlete'}
            </p>
            {!searchTerm && !categoryFilter && !statusFilter && (
              <button
                onClick={() => setShowAddModal(true)}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Add Athletes
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAthletes.map(athlete => (
              <AthleteCard
                key={athlete.id}
                athlete={athlete}
                onViewDashboard={handleViewDashboard}
                onFreeze={handleFreezeAthlete}
                onUnfreeze={handleUnfreezeAthlete}
                onDelete={handleDeleteAthlete}
              />
            ))}
          </div>
        )}
      </div>

      {showAddModal && <AddAthleteModal onClose={() => setShowAddModal(false)} />}
    </>
  );
}