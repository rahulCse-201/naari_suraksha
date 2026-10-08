import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminNavbar from '../../components/admin/AdminNavbar';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { getAdminUsers } from '../../services/adminService';
import { Users, Search, Mail, Phone, Calendar, Shield } from 'lucide-react';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUsersList = async () => {
      try {
        setLoading(true);
        const res = await getAdminUsers();
        if (res.success) {
          setUsers(res.users);
        }
      } catch (err) {
        console.error('Failed to fetch user list:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsersList();
  }, []);

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.phone.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      <AdminSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <AdminNavbar />

        <main className="p-6 md:p-8 space-y-6 flex-1">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-extrabold text-slate-100 flex items-center gap-2.5">
                <Users className="w-7 h-7 text-indigo-400" />
                <span>Registered Users Directory</span>
              </h1>
              <p className="text-xs text-slate-400">Manage user accounts and verification details</p>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search name, email, phone..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2 pl-9 pr-3 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {loading ? (
            <LoadingSpinner text="Fetching registered user accounts..." />
          ) : (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider font-semibold">
                    <tr>
                      <th className="py-3.5 px-4 rounded-l-xl">User Name</th>
                      <th className="py-3.5 px-4">Email</th>
                      <th className="py-3.5 px-4">Phone</th>
                      <th className="py-3.5 px-4">Role</th>
                      <th className="py-3.5 px-4 text-right rounded-r-xl">Joined Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {filteredUsers.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-slate-400">
                          No users matching search criteria found.
                        </td>
                      </tr>
                    ) : (
                      filteredUsers.map((u) => (
                        <tr key={u._id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="py-4 px-4 font-bold text-slate-100 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-extrabold text-xs">
                              {u.name.charAt(0).toUpperCase()}
                            </div>
                            <span>{u.name}</span>
                          </td>
                          <td className="py-4 px-4 text-slate-300">
                            <span className="flex items-center gap-1.5">
                              <Mail className="w-3.5 h-3.5 text-slate-500" />
                              {u.email}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-slate-300 font-mono">
                            <span className="flex items-center gap-1.5">
                              <Phone className="w-3.5 h-3.5 text-slate-500" />
                              {u.phone}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${
                                u.role === 'ADMIN'
                                  ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30'
                                  : 'bg-slate-800 text-slate-300 border-slate-700'
                              }`}
                            >
                              {u.role}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-right text-slate-400 font-mono">
                            {new Date(u.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminUsers;
