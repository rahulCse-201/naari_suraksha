import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, AlertTriangle, ShieldCheck, Home } from 'lucide-react';

const AdminSidebar = () => {
  const navItems = [
    {
      name: 'Overview',
      path: '/admin',
      exact: true,
      icon: LayoutDashboard,
    },
    {
      name: 'Registered Users',
      path: '/admin/users',
      icon: Users,
    },
    {
      name: 'Emergency Incidents',
      path: '/admin/emergencies',
      icon: AlertTriangle,
    },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 hidden md:flex flex-col h-screen sticky top-0">
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-slate-100 text-base leading-tight">Admin Portal</h2>
            <p className="text-xs text-slate-400 font-medium">Naari Suraksha Command</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.exact}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <NavLink
          to="/"
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-slate-700 text-slate-300 text-sm font-medium hover:bg-slate-800 transition-colors"
        >
          <Home className="w-4 h-4" />
          Back to Main Site
        </NavLink>
      </div>
    </aside>
  );
};

export default AdminSidebar;
