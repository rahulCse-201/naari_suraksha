import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminNavbar from '../../components/admin/AdminNavbar';
import StatusBadge from '../../components/common/StatusBadge';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import MapView from '../../components/common/MapView';
import { getAdminEmergencyById, updateEmergencyStatus } from '../../services/adminService';
import {
  ShieldAlert,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Users,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  Heart,
  Clock,
  AlertTriangle
} from 'lucide-react';

const EmergencyDetails = () => {
  const { id } = useParams();
  const [incident, setIncident] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const fetchDetails = async () => {
    try {
      setLoading(true);
      const res = await getAdminEmergencyById(id);
      if (res.success) {
        setIncident(res.emergency);
        setContacts(res.contacts || []);
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Failed to load emergency details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [id]);

  const handleStatusChange = async (newStatus) => {
    setActionLoading(true);
    setStatusMsg('');
    setErrorMsg('');

    try {
      const res = await updateEmergencyStatus(id, newStatus);
      if (res.success) {
        setIncident(res.emergency);
        setStatusMsg(`Emergency status successfully updated to ${newStatus}.`);
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Failed to update emergency status.');
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      <AdminSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <AdminNavbar />

        <main className="p-6 md:p-8 space-y-6 flex-1 max-w-7xl mx-auto w-full">
          <div className="flex items-center justify-between">
            <Link
              to="/admin/emergencies"
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Incidents List</span>
            </Link>
          </div>

          {loading ? (
            <LoadingSpinner text="Fetching incident details and map coordinates..." />
          ) : !incident ? (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center text-slate-400">
              Emergency incident not found.
            </div>
          ) : (
            <div className="space-y-6">
              {/* Header Status Bar */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white ${
                      incident.status === 'ACTIVE'
                        ? 'bg-rose-600 animate-pulse shadow-lg shadow-rose-600/30'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    <ShieldAlert className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <h1 className="text-xl font-extrabold text-slate-100">
                        Emergency Incident #{incident._id.slice(-6).toUpperCase()}
                      </h1>
                      <StatusBadge status={incident.status} />
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      Triggered on {new Date(incident.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Status Update Action Controls */}
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  {incident.status === 'ACTIVE' ? (
                    <>
                      <button
                        onClick={() => handleStatusChange('RESOLVED')}
                        disabled={actionLoading}
                        className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-1.5 transition-all"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Mark RESOLVED</span>
                      </button>
                      <button
                        onClick={() => handleStatusChange('CANCELLED')}
                        disabled={actionLoading}
                        className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs border border-slate-700 flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <XCircle className="w-4 h-4" />
                        <span>Cancel Alert</span>
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleStatusChange('ACTIVE')}
                      disabled={actionLoading}
                      className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-600/30 flex items-center gap-1.5 transition-all"
                    >
                      <AlertTriangle className="w-4 h-4" />
                      <span>Reopen as ACTIVE</span>
                    </button>
                  )}
                </div>
              </div>

              {statusMsg && (
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span>{statusMsg}</span>
                </div>
              )}

              {errorMsg && (
                <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column: User Profile & Emergency Contacts */}
                <div className="lg:col-span-5 space-y-6">
                  {/* User Information Card */}
                  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
                    <h3 className="font-bold text-slate-100 text-base flex items-center gap-2 border-b border-slate-800 pb-3">
                      <User className="w-4 h-4 text-indigo-400" />
                      <span>Distressed User Profile</span>
                    </h3>

                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-rose-600 to-rose-500 flex items-center justify-center text-white font-extrabold text-xl shadow-md">
                        {incident.user?.name ? incident.user.name.charAt(0).toUpperCase() : 'U'}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-100 text-base">{incident.user?.name}</h4>
                        <span className="text-[10px] font-semibold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20">
                          {incident.user?.role || 'USER'}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2.5 text-xs text-slate-300 pt-2 border-t border-slate-800/80">
                      <div className="flex items-center gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800">
                        <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span className="font-mono font-bold text-slate-100">{incident.user?.phone}</span>
                      </div>
                      <div className="flex items-center gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800">
                        <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                        <span className="truncate">{incident.user?.email}</span>
                      </div>
                    </div>
                  </div>

                  {/* User's Emergency Contacts Card */}
                  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <h3 className="font-bold text-slate-100 text-base flex items-center gap-2">
                        <Users className="w-4 h-4 text-rose-500" />
                        <span>Registered Trusted Contacts</span>
                      </h3>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-rose-400">
                        {contacts.length} Contacts
                      </span>
                    </div>

                    {contacts.length === 0 ? (
                      <p className="text-xs text-slate-500 italic py-2">
                        User has not added any emergency contacts yet.
                      </p>
                    ) : (
                      <div className="space-y-3">
                        {contacts.map((ct) => (
                          <div
                            key={ct._id}
                            className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-slate-200 text-xs">{ct.name}</span>
                              <span className="text-[10px] font-semibold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20 flex items-center gap-1">
                                <Heart className="w-2.5 h-2.5 fill-rose-500" />
                                {ct.relationship}
                              </span>
                            </div>
                            <p className="text-xs font-mono font-medium text-emerald-400 flex items-center gap-2">
                              <Phone className="w-3.5 h-3.5 text-emerald-400" />
                              <span>{ct.phone}</span>
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Column: GPS Location & Interactive Leaflet Map */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <h3 className="font-bold text-slate-100 text-base flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-rose-500" />
                        <span>Live GPS Location Map</span>
                      </h3>
                      <span className="text-xs font-mono text-slate-400">
                        {incident.latitude}, {incident.longitude}
                      </span>
                    </div>

                    {/* Leaflet Map view */}
                    <div className="h-96 rounded-2xl overflow-hidden border border-slate-800 shadow-inner">
                      <MapView
                        latitude={incident.latitude}
                        longitude={incident.longitude}
                        popupContent={`SOS Signal from ${incident.user?.name || 'User'} at (${incident.latitude}, ${incident.longitude})`}
                        height="100%"
                        zoom={15}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-xs pt-2">
                      <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                        <span className="text-slate-500 block mb-1">Latitude</span>
                        <span className="font-mono text-slate-100 font-bold">{incident.latitude}</span>
                      </div>
                      <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                        <span className="text-slate-500 block mb-1">Longitude</span>
                        <span className="font-mono text-slate-100 font-bold">{incident.longitude}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default EmergencyDetails;
