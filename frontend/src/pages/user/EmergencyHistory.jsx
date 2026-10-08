import React, { useState, useEffect } from 'react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import StatusBadge from '../../components/common/StatusBadge';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import MapView from '../../components/common/MapView';
import { getMyEmergencies } from '../../services/emergencyService';
import { ShieldAlert, Clock, MapPin, Calendar, ChevronDown, ChevronUp } from 'lucide-react';

const EmergencyHistory = () => {
  const [emergencies, setEmergencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const res = await getMyEmergencies();
        if (res.success) {
          setEmergencies(res.emergencies);
        }
      } catch (err) {
        console.error('Failed to load emergency history:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 flex items-center gap-3">
            <Clock className="w-8 h-8 text-rose-500" />
            <span>Emergency History Log</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Complete record of your triggered SOS broadcasts, GPS coordinates, and admin resolution updates
          </p>
        </div>

        {loading ? (
          <LoadingSpinner text="Fetching emergency log..." />
        ) : emergencies.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-800 text-slate-500 flex items-center justify-center mx-auto">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-200">No Emergency Incidents Recorded</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              You haven't triggered any SOS emergencies yet. Any future emergency alerts will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {emergencies.map((incident) => {
              const isExpanded = expandedId === incident._id;
              return (
                <div
                  key={incident._id}
                  className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-3xl overflow-hidden shadow-xl transition-all"
                >
                  <div
                    onClick={() => toggleExpand(incident._id)}
                    className="p-6 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shrink-0 ${
                          incident.status === 'ACTIVE'
                            ? 'bg-rose-600 animate-pulse shadow-lg shadow-rose-600/30'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        <ShieldAlert className="w-6 h-6" />
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-slate-100 text-base">
                            Incident #{incident._id.slice(-6).toUpperCase()}
                          </span>
                          <StatusBadge status={incident.status} />
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-slate-500" />
                            {new Date(incident.createdAt).toLocaleString()}
                          </span>
                          <span className="flex items-center gap-1 font-mono text-slate-300">
                            <MapPin className="w-3.5 h-3.5 text-rose-500" />
                            {incident.latitude.toFixed(4)}, {incident.longitude.toFixed(4)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-semibold text-rose-400 self-end sm:self-center">
                      <span>{isExpanded ? 'Hide Map' : 'View Location Map'}</span>
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="px-6 pb-6 pt-2 border-t border-slate-800/80 space-y-4 bg-slate-950/40">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                        <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800">
                          <span className="text-slate-500 block mb-1">Full Incident ID</span>
                          <span className="font-mono text-slate-200 select-all">{incident._id}</span>
                        </div>
                        <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800">
                          <span className="text-slate-500 block mb-1">Latitude</span>
                          <span className="font-mono text-slate-200">{incident.latitude}</span>
                        </div>
                        <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800">
                          <span className="text-slate-500 block mb-1">Longitude</span>
                          <span className="font-mono text-slate-200">{incident.longitude}</span>
                        </div>
                      </div>

                      <div className="h-64 rounded-2xl overflow-hidden border border-slate-800">
                        <MapView
                          latitude={incident.latitude}
                          longitude={incident.longitude}
                          popupContent={`Emergency Location (${incident.latitude}, ${incident.longitude})`}
                          height="100%"
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default EmergencyHistory;
