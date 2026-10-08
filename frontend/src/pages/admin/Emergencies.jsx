import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminNavbar from '../../components/admin/AdminNavbar';
import StatusBadge from '../../components/common/StatusBadge';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { getAdminEmergencies } from '../../services/adminService';
import { ShieldAlert, Filter, MapPin, Calendar, ExternalLink } from 'lucide-react';

const AdminEmergencies = () => {
  const [emergencies, setEmergencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('');

  const fetchEmergenciesList = async (status = '') => {
    try {
      setLoading(true);
      const res = await getAdminEmergencies(status);
      if (res.success) {
        setEmergencies(res.emergencies);
      }
    } catch (err) {
      console.error('Failed to fetch emergencies:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmergenciesList(selectedStatus);
  }, [selectedStatus]);

  const filterTabs = [
    { label: 'All Incidents', value: '' },
    { label: 'ACTIVE', value: 'ACTIVE' },
    { label: 'RESOLVED', value: 'RESOLVED' },
    { label: 'CANCELLED', value: 'CANCELLED' }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      <AdminSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <AdminNavbar />

        <main className="p-6 md:p-8 space-y-6 flex-1">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-extrabold text-slate-100 flex items-center gap-2.5">
                <ShieldAlert className="w-7 h-7 text-rose-500" />
                <span>Emergency Broadcast Incidents</span>
              </h1>
              <p className="text-xs text-slate-400">Monitor and update active SOS emergency signals</p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 p-1 rounded-2xl">
              {filterTabs.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setSelectedStatus(tab.value)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    selectedStatus === tab.value
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <LoadingSpinner text="Fetching emergency incidents..." />
          ) : (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl overflow-hidden">
              {emergencies.length === 0 ? (
                <div className="text-center py-12 space-y-3">
                  <ShieldAlert className="w-10 h-10 text-slate-600 mx-auto" />
                  <p className="text-sm font-bold text-slate-300">No emergency incidents found</p>
                  <p className="text-xs text-slate-500">
                    No records match the current status filter criteria.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider font-semibold">
                      <tr>
                        <th className="py-3.5 px-4 rounded-l-xl">User Info</th>
                        <th className="py-3.5 px-4">Broadcast Time</th>
                        <th className="py-3.5 px-4">GPS Coordinates</th>
                        <th className="py-3.5 px-4">Status</th>
                        <th className="py-3.5 px-4 text-right rounded-r-xl">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {emergencies.map((incident) => (
                        <tr
                          key={incident._id}
                          className={`hover:bg-slate-800/40 transition-colors ${
                            incident.status === 'ACTIVE' ? 'bg-rose-950/20' : ''
                          }`}
                        >
                          <td className="py-4 px-4">
                            <p className="font-bold text-slate-100 text-sm">{incident.user?.name || 'Unknown User'}</p>
                            <p className="text-[11px] text-slate-400">{incident.user?.phone} • {incident.user?.email}</p>
                          </td>
                          <td className="py-4 px-4 text-slate-300">
                            <span className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 text-slate-500" />
                              {new Date(incident.createdAt).toLocaleString()}
                            </span>
                          </td>
                          <td className="py-4 px-4 font-mono text-slate-300">
                            <span className="flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5 text-rose-500" />
                              {incident.latitude.toFixed(4)}, {incident.longitude.toFixed(4)}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <StatusBadge status={incident.status} />
                          </td>
                          <td className="py-4 px-4 text-right">
                            <Link
                              to={`/admin/emergencies/${incident._id}`}
                              className="px-3.5 py-2 rounded-xl bg-indigo-600/20 text-indigo-400 hover:bg-indigo-600 hover:text-white font-semibold transition-all inline-flex items-center gap-1.5"
                            >
                              <span>Inspect Details</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminEmergencies;
