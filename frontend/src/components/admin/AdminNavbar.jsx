import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { LogOut, User, ShieldAlert } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const AdminNavbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <Link to="/admin" className="md:hidden flex items-center gap-2">
          <ShieldAlert className="w-6 h-6 text-indigo-500" />
          <span className="font-bold text-slate-100">Admin Command</span>
        </Link>
        <span className="hidden md:inline-block px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 text-xs font-semibold">
          Control Center Live
        </span>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 bg-slate-800/80 px-3.5 py-1.5 rounded-xl border border-slate-700/80">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-xs font-bold">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
          </div>
          <div className="text-left hidden sm:block">
            <p className="text-xs font-semibold text-slate-100">{user?.name || 'Admin'}</p>
            <p className="text-[10px] text-indigo-400 font-medium">{user?.email}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors"
          title="Logout"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};

export default AdminNavbar;
