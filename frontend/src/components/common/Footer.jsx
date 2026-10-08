import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-rose-600 flex items-center justify-center text-white">
                <Shield className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-slate-100 text-lg">
                Naari <span className="text-rose-500">Suraksha</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Empowering women with instant emergency SOS response, precise location broadcasting, and trusted contact networks.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-4">Navigation</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-rose-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <a href="#about-safety" className="hover:text-rose-400 transition-colors">
                  Safety Overview
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-rose-400 transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <Link to="/register" className="hover:text-rose-400 transition-colors">
                  Register Account
                </Link>
              </li>
            </ul>
          </div>

          {/* User & Admin */}
          <div>
            <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-4">Application</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/dashboard" className="hover:text-rose-400 transition-colors">
                  User Dashboard
                </Link>
              </li>
              <li>
                <Link to="/emergency-contacts" className="hover:text-rose-400 transition-colors">
                  Emergency Contacts
                </Link>
              </li>
              <li>
                <Link to="/emergency-history" className="hover:text-rose-400 transition-colors">
                  Emergency History
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-rose-400 transition-colors">
                  Admin Panel
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal / Contact */}
          <div>
            <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-4">Legal & Support</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
              </li>
              <li>
                <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
              </li>
              <li>
                <span className="hover:text-slate-300 cursor-pointer">Emergency Helplines</span>
              </li>
              <li>
                <span className="text-xs text-slate-500">24/7 Monitoring Ready</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 space-y-4 md:space-y-0">
          <p>© {new Date().getFullYear()} Naari Suraksha. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built for security and response with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
