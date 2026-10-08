import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Menu, X, User, LogOut, LayoutDashboard, ShieldAlert } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-lg border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 to-rose-500 flex items-center justify-center shadow-lg shadow-rose-600/30 group-hover:scale-105 transition-transform">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg text-slate-100 tracking-tight flex items-center gap-1.5">
                Naari <span className="text-rose-500">Suraksha</span>
              </span>
              <span className="text-[10px] text-slate-400 -mt-1 font-medium tracking-wider uppercase">
                Women Safety Platform
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link to="/" className="text-slate-300 hover:text-rose-400 transition-colors">
              Home
            </Link>
            <a href="#about-safety" className="text-slate-300 hover:text-rose-400 transition-colors">
              Safety & Trust
            </a>
            <a href="#how-it-works" className="text-slate-300 hover:text-rose-400 transition-colors">
              How It Works
            </a>
            <a href="#features" className="text-slate-300 hover:text-rose-400 transition-colors">
              Features
            </a>

            {isAuthenticated ? (
              <div className="flex items-center gap-3 border-l border-slate-800 pl-6">
                {isAdmin ? (
                  <Link
                    to="/admin"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 text-xs font-semibold hover:bg-indigo-500/20 transition-colors"
                  >
                    <ShieldAlert className="w-4 h-4" />
                    Admin Panel
                  </Link>
                ) : null}

                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 text-slate-100 hover:bg-slate-700 transition-colors text-sm font-semibold border border-slate-700"
                >
                  <LayoutDashboard className="w-4 h-4 text-rose-500" />
                  Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3 border-l border-slate-800 pl-6">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded-xl shadow-lg shadow-rose-600/25 transition-all hover:shadow-rose-600/40"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-900/95 backdrop-blur-xl px-4 pt-2 pb-6 space-y-3">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-300 hover:text-rose-400 font-medium"
          >
            Home
          </Link>
          <a
            href="#about-safety"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-300 hover:text-rose-400 font-medium"
          >
            Safety & Trust
          </a>
          <a
            href="#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-300 hover:text-rose-400 font-medium"
          >
            How It Works
          </a>
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-300 hover:text-rose-400 font-medium"
          >
            Features
          </a>

          <div className="pt-4 border-t border-slate-800 space-y-2">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-slate-800 text-slate-100 font-semibold border border-slate-700"
                >
                  <LayoutDashboard className="w-4 h-4 text-rose-500" />
                  User Dashboard
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-indigo-600 text-white font-semibold"
                  >
                    <ShieldAlert className="w-4 h-4" />
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-rose-400 border border-rose-500/20 hover:bg-rose-500/10 font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2.5 rounded-xl border border-slate-700 text-slate-200 font-medium hover:bg-slate-800"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2.5 rounded-xl bg-rose-600 text-white font-semibold hover:bg-rose-500 shadow-lg shadow-rose-600/30"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
