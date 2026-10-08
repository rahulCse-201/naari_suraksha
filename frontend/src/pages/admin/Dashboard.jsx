import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminNavbar from '../../components/admin/AdminNavbar';
import StatusBadge from '../../components/common/StatusBadge';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { getAdminStats } from '../../services/adminService';
import {
  Users,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Radio,
  Clock
} from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalEmergencies: 0,
    activeEmergencies: 0,
    resolvedEmergencies: 0,
    cancelledEmergencies: 0
  });
  const [recentEmergencies, setRecentEmergencies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        const res = await getAdminStats();
        if (res.success) {
          setStats(res.stats);
          setRecentEmergencies(res.recentEmergencies);
        }
      } catch (err) {
        console.error('Failed to fetch admin stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      <AdminSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <AdminNavbar />

        <main className="p-6 md:p-8 space-y-8 flex-1">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-extrabold text-slate-100">Command Control Overview</h1>
              <p className="text-xs text-slate-400">Live monitoring metrics and recent emergency broadcasts</p>
            </div>

            <Link
              to="/admin/emergencies"
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center gap-2"
            >
              <span>Manage Emergencies</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {loading ? (
            <LoadingSpinner text="Loading command statistics..." />
          ) : (
            <>
              {/* SUMMARY STAT CARDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Active Emergencies Card - Visually Prominent */}
                <div
                  className={`bg-slate-900 border rounded-3xl p-6 shadow-xl space-y-3 relative overflow-hidden transition-all ${
                    stats.activeEmergencies > 0
                      ? 'border-rose-600/80 bg-gradient-to-br from-rose-950/40 via-slate-900 to-slate-900 shadow-rose-900/20'
                      : 'border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
                      Active Emergencies
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-500 flex items-center justify-center animate-pulse">
                      <Radio className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="text-3xl font-black text-slate-100">{stats.activeEmergencies}</div>
                  <p className="text-xs text-slate-400">Requires immediate attention</p>
                </div>

                {/* Total Users */}
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                      Total Registered Users
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 flex items-center justify-center">
                      <Users className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="text-3xl font-black text-slate-100">{stats.totalUsers}</div>
                  <p className="text-xs text-slate-400">Protected user accounts</p>
                </div>

                {/* Total Emergencies */}
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                      Total Incidents
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center">
                      <AlertTriangle className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="text-3xl font-black text-slate-100">{stats.totalEmergencies}</div>
                  <p className="text-xs text-slate-400">Lifetime SOS triggers</p>
                </div>

                {/* Resolved Emergencies */}
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                      Resolved Emergencies
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="text-3xl font-black text-slate-100">{stats.resolvedEmergencies}</div>
                  <p className="text-xs text-slate-400">Successfully handled</p>
                </div>
              </div>

              {/* RECENT EMERGENCY INCIDENTS TABLE */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <h3 className="font-bold text-slate-100 text-lg flex items-center gap-2">
                    <Clock className="w-5 h-5 text-indigo-400" />
                    <span>Recent Emergency Broadcasts</span>
                  </h3>
                  <Link
                    to="/admin/emergencies"
                    className="text-xs font-semibold text-indigo-400 hover:underline"
                  >
                    View All Incidents →
                  </Link>
                </div>

                {recentEmergencies.length === 0 ? (
                  <p className="text-xs text-slate-400 text-center py-6">No recent emergency incidents recorded.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider font-semibold">
                        <tr>
                          <th className="py-3 px-4 rounded-l-xl">User</th>
                          <th className="py-3 px-4">Time</th>
                          <th className="py-3 px-4">GPS Location</th>
                          <th className="py-3 px-4">Status</th>
                          <th className="py-3 px-4 text-right rounded-r-xl">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60">
                        {recentEmergencies.map((em) => (
                          <tr key={em._id} className="hover:bg-slate-800/40 transition-colors">
                            <td className="py-3.5 px-4">
                              <p className="font-bold text-slate-200">{em.user?.name || 'Unknown'}</p>
                              <p className="text-[11px] text-slate-400">{em.user?.phone}</p>
                            </td>
                            <td className="py-3.5 px-4 text-slate-300">
                              {new Date(em.createdAt).toLocaleString()}
                            </td>
                            <td className="py-3.5 px-4 font-mono text-slate-300">
                              {em.latitude.toFixed(4)}, {em.longitude.toFixed(4)}
                            </td>
                            <td className="py-3.5 px-4">
                              <StatusBadge status={em.status} />
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <Link
                                to={`/admin/emergencies/${em._id}`}
                                className="px-3 py-1.5 rounded-lg bg-indigo-600/20 text-indigo-400 hover:bg-indigo-600 hover:text-white font-semibold transition-all inline-block"
                              >
                                Details
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
