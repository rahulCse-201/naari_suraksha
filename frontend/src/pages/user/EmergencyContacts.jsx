import React, { useState, useEffect } from 'react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import Modal from '../../components/common/Modal';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import {
  getContacts,
  createContact,
  updateContact,
  deleteContact
} from '../../services/contactService';
import {
  Users,
  Plus,
  Phone,
  User,
  Heart,
  Edit2,
  Trash2,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

const EmergencyContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState(null);

  const [formData, setFormData] = useState({ name: '', phone: '', relationship: '' });
  const [actionLoading, setActionLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const fetchContactsList = async () => {
    try {
      setLoading(true);
      const res = await getContacts();
      if (res.success) {
        setContacts(res.contacts);
      }
    } catch (err) {
      setErrorMsg('Failed to fetch emergency contacts.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContactsList();
  }, []);

  const resetForm = () => {
    setFormData({ name: '', phone: '', relationship: '' });
    setEditingContact(null);
    setErrorMsg('');
  };

  const handleOpenAdd = () => {
    resetForm();
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (contact) => {
    setEditingContact(contact);
    setFormData({
      name: contact.name,
      phone: contact.phone,
      relationship: contact.relationship
    });
    setErrorMsg('');
    setIsAddModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      if (editingContact) {
        const res = await updateContact(editingContact._id, formData);
        if (res.success) {
          setSuccessMsg('Emergency contact updated successfully.');
          setIsAddModalOpen(false);
          fetchContactsList();
        }
      } else {
        const res = await createContact(formData);
        if (res.success) {
          setSuccessMsg('Emergency contact added successfully.');
          setIsAddModalOpen(false);
          fetchContactsList();
        }
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Failed to save emergency contact.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this emergency contact?')) return;
    try {
      const res = await deleteContact(id);
      if (res.success) {
        setSuccessMsg('Emergency contact deleted.');
        fetchContactsList();
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Failed to delete contact.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 flex items-center gap-3">
              <Users className="w-8 h-8 text-rose-500" />
              <span>Emergency Contacts</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Trusted guardians &amp; family members who receive notifications during SOS broadcasts
            </p>
          </div>

          <button
            onClick={handleOpenAdd}
            className="px-5 py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm shadow-lg shadow-rose-600/30 flex items-center gap-2 transition-all"
          >
            <Plus className="w-5 h-5" />
            <span>Add Trusted Contact</span>
          </button>
        </div>

        {successMsg && (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {errorMsg && (
          <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold flex items-center gap-3">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {loading ? (
          <LoadingSpinner text="Loading trusted contacts..." />
        ) : contacts.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-800 text-slate-500 flex items-center justify-center mx-auto">
              <Users className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-200">No Emergency Contacts Added Yet</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Add your family members, close friends, or trusted guardians so they are accessible during emergencies.
            </p>
            <button
              onClick={handleOpenAdd}
              className="px-5 py-2.5 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-500 transition-colors inline-flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add First Contact
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contacts.map((contact) => (
              <div
                key={contact._id}
                className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-3xl p-6 space-y-4 shadow-xl flex flex-col justify-between transition-all group"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center text-white font-extrabold text-lg shadow-md">
                        {contact.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-100 text-base">{contact.name}</h3>
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-400 bg-rose-500/10 px-2.5 py-0.5 rounded-full border border-rose-500/20">
                          <Heart className="w-3 h-3 fill-rose-500" />
                          {contact.relationship}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-950 rounded-2xl p-3 border border-slate-800/80 flex items-center gap-3 text-xs text-slate-300">
                    <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="font-mono font-medium text-slate-100">{contact.phone}</span>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 border-t border-slate-800/80 pt-4">
                  <button
                    onClick={() => handleOpenEdit(contact)}
                    className="p-2 text-slate-400 hover:text-indigo-400 hover:bg-slate-800 rounded-xl transition-colors text-xs font-semibold flex items-center gap-1.5"
                  >
                    <Edit2 className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(contact._id)}
                    className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-xl transition-colors text-xs font-semibold flex items-center gap-1.5"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* ADD / EDIT CONTACT MODAL */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title={editingContact ? 'Edit Emergency Contact' : 'Add Emergency Contact'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Contact Full Name
            </label>
            <div className="relative">
              <User className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Mother / Father / Friend Name"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-11 pr-4 text-sm text-slate-100 focus:outline-none focus:border-rose-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 98765 43210"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-11 pr-4 text-sm text-slate-100 focus:outline-none focus:border-rose-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Relationship
            </label>
            <div className="relative">
              <Heart className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                required
                value={formData.relationship}
                onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
                placeholder="Parent, Spouse, Guardian, Friend"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-11 pr-4 text-sm text-slate-100 focus:outline-none focus:border-rose-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={actionLoading}
              className="py-2.5 px-5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-lg shadow-rose-600/30"
            >
              {actionLoading ? 'Saving...' : editingContact ? 'Update Contact' : 'Add Contact'}
            </button>
          </div>
        </form>
      </Modal>

      <Footer />
    </div>
  );
};

export default EmergencyContacts;
