import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import Modal from '../../components/common/Modal';
import StatusBadge from '../../components/common/StatusBadge';
import MapView from '../../components/common/MapView';
import { triggerSOS, getMyEmergencies } from '../../services/emergencyService';
import { getContacts } from '../../services/contactService';
import {
  ShieldAlert,
  Users,
  Clock,
  User,
  MapPin,
  AlertTriangle,
  CheckCircle2,
  PhoneCall,
  ChevronRight,
  Radio
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [emergencies, setEmergencies] = useState([]);
  const [contactsCount, setContactsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [sosLoading, setSosLoading] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [activeSOS, setActiveSOS] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [emData, ctData] = await Promise.all([getMyEmergencies(), getContacts()]);

      if (emData.success) {
        setEmergencies(emData.emergencies);
        const active = emData.emergencies.find((e) => e.status === 'ACTIVE');
        setActiveSOS(active || null);
      }
      if (ctData.success) {
        setContactsCount(ctData.count);
      }
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInitiateSOS = () => {
    setErrorMsg('');
    setSuccessMsg('');
    setIsConfirmModalOpen(true);
  };

  const handleConfirmSOS = () => {
    setIsConfirmModalOpen(false);
    setSosLoading(true);
    setErrorMsg('');

    if (!navigator.geolocation) {
      setErrorMsg('Geolocation is not supported by your browser. Unable to trigger SOS.');
      setSosLoading(false);
      return;
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 0
    };

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await triggerSOS(latitude, longitude);
          if (res.success) {
            setSuccessMsg('EMERGENCY SOS BROADCASTED SUCCESSFULLY! Monitoring admins have been alerted.');
            setActiveSOS(res.emergency);
            setEmergencies((prev) => [res.emergency, ...prev]);
          }
        } catch (err) {
          setErrorMsg(err.response?.data?.message || 'Failed to broadcast SOS incident. Please try again.');
        } finally {
          setSosLoading(false);
        }
      },
      (error) => {
        setSosLoading(false);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setErrorMsg('Location permission denied. Please allow geolocation access in your browser settings to broadcast SOS.');
            break;
          case error.POSITION_UNAVAILABLE:
            setErrorMsg('Location information unavailable. Please verify your GPS setting.');
            break;
          case error.TIMEOUT:
            setErrorMsg('Location request timed out. Please retry SOS broadcast.');
            break;
          default:
            setErrorMsg('An unknown error occurred while accessing location.');
            break;
        }
      },
      options
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* User Greeting Banner */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-rose-600 to-rose-500 flex items-center justify-center text-white font-extrabold text-2xl shadow-lg shadow-rose-600/30">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-100">
                Welcome, {user?.name || 'User'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                {user?.email} • {user?.phone}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <Link
              to="/emergency-contacts"
              className="flex-1 md:flex-initial px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <Users className="w-4 h-4 text-rose-500" />
              <span>Contacts ({contactsCount})</span>
            </Link>
            <Link
              to="/profile"
              className="flex-1 md:flex-initial px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <User className="w-4 h-4 text-indigo-400" />
              <span>Profile</span>
            </Link>
          </div>
        </div>

        {/* Global Messages */}
        {errorMsg && (
          <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/40 text-rose-400 text-sm font-semibold flex items-center gap-3 shadow-lg animate-fadeIn">
            <AlertTriangle className="w-6 h-6 shrink-0 text-rose-500" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 text-sm font-semibold flex items-center gap-3 shadow-lg animate-fadeIn">
            <CheckCircle2 className="w-6 h-6 shrink-0 text-emerald-500" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* ACTIVE EMERGENCY NOTIFICATION CARD */}
        {activeSOS && (
          <div className="bg-gradient-to-r from-rose-950/80 via-slate-900 to-slate-900 border-2 border-rose-600/80 rounded-3xl p-6 shadow-2xl space-y-4 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-rose-900/40 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-600 flex items-center justify-center text-white animate-pulse">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-rose-400 flex items-center gap-2">
                    ACTIVE EMERGENCY BROADCAST
                  </h3>
                  <p className="text-xs text-slate-400">
                    Incident ID: <span className="font-mono text-slate-200">{activeSOS._id}</span>
                  </p>
                </div>
              </div>
              <StatusBadge status="ACTIVE" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="space-y-2 text-xs">
                <p className="text-slate-300">
                  <strong className="text-slate-100">Broadcast Time:</strong>{' '}
                  {new Date(activeSOS.createdAt).toLocaleString()}
                </p>
                <p className="text-slate-300">
                  <strong className="text-slate-100">GPS Coordinates:</strong>{' '}
                  <span className="font-mono text-rose-400">{activeSOS.latitude}, {activeSOS.longitude}</span>
                </p>
                <p className="text-slate-400 leading-relaxed pt-1">
                  Your SOS signal and location are live in the monitoring admin panel. Emergency responders and safety officers have been notified.
                </p>
              </div>

              <div className="h-44 rounded-xl overflow-hidden border border-rose-900/60 shadow-inner">
                <MapView
                  latitude={activeSOS.latitude}
                  longitude={activeSOS.longitude}
                  popupContent={`Active Emergency at (${activeSOS.latitude}, ${activeSOS.longitude})`}
                  height="100%"
                />
              </div>
            </div>
          </div>
        )}

        {/* PROMINENT SOS BUTTON SECTION */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="max-w-xl mx-auto space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-widest text-rose-500">Emergency Trigger</h2>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-100">
              Immediate Safety Response
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Pressing SOS requests your browser geolocation and instantly creates an active incident for safety admins.
            </p>
          </div>

          {/* Big SOS Button */}
          <div className="py-4">
            <button
              onClick={handleInitiateSOS}
              disabled={sosLoading}
              className="group relative inline-flex items-center justify-center"
            >
              {/* Pulse rings */}
              <div className="absolute -inset-4 rounded-full bg-rose-600/30 blur-xl group-hover:bg-rose-600/50 animate-pulse transition-all" />
              <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full bg-gradient-to-tr from-rose-700 via-rose-600 to-rose-500 p-2 shadow-2xl group-hover:scale-105 active:scale-95 transition-all">
                <div className="w-full h-full rounded-full bg-slate-950 flex flex-col items-center justify-center border-2 border-rose-500/50 p-4 text-center">
                  <ShieldAlert className="w-14 h-14 sm:w-16 sm:h-16 text-rose-500 group-hover:text-rose-400 transition-colors mb-2" />
                  <span className="text-lg sm:text-xl font-black tracking-widest text-white uppercase">
                    {sosLoading ? 'LOCATING...' : 'SOS'}
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase mt-0.5">
                    TAP TO TRIGGER
                  </span>
                </div>
              </div>
            </button>
          </div>

          <div className="flex items-center justify-center gap-6 text-xs text-slate-400 border-t border-slate-800/80 pt-6 max-w-lg mx-auto">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-rose-500" />
              <span>Geolocation Required</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Radio className="w-4 h-4 text-emerald-400" />
              <span>Admin Monitoring</span>
            </div>
          </div>
        </div>

        {/* QUICK NAVIGATION & RECENT HISTORY GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Emergency Contacts Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
                    <Users className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-100 text-lg">Emergency Contacts</h3>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-indigo-400 border border-slate-700">
                  {contactsCount} Saved
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Ensure your trusted emergency contacts are up to date so response teams can notify your family or guardians immediately.
              </p>
            </div>

            <Link
              to="/emergency-contacts"
              className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-between transition-colors mt-2"
            >
              <span>Manage Emergency Contacts</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
          </div>

          {/* Emergency History Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 flex items-center justify-center">
                    <Clock className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-100 text-lg">Emergency History</h3>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-rose-400 border border-slate-700">
                  {emergencies.length} Total
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Review past emergency SOS broadcasts, exact coordinate logs, timestamps, and resolution statuses.
              </p>
            </div>

            <Link
              to="/emergency-history"
              className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-between transition-colors mt-2"
            >
              <span>View Emergency Log</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
          </div>
        </div>
      </main>

      {/* CONFIRMATION MODAL */}
      <Modal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        title="Confirm Emergency SOS Broadcast"
      >
        <div className="space-y-6 text-center">
          <div className="w-16 h-16 rounded-full bg-rose-600/20 border-2 border-rose-600 text-rose-500 flex items-center justify-center mx-auto animate-pulse">
            <AlertTriangle className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h4 className="text-lg font-bold text-slate-100">Are you sure you want to trigger SOS?</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              This will immediately request your device location and transmit an emergency SOS incident to Naari Suraksha response administrators.
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setIsConfirmModalOpen(false)}
              className="flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors border border-slate-700"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmSOS}
              className="flex-1 py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-lg shadow-rose-600/30 transition-all"
            >
              Yes, Broadcast SOS Now
            </button>
          </div>
        </div>
      </Modal>

      <Footer />
    </div>
  );
};

export default Dashboard;
