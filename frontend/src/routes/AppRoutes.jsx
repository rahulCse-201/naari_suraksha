import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Public Pages
import Home from '../pages/public/Home';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';

// User Pages
import UserDashboard from '../pages/user/Dashboard';
import Profile from '../pages/user/Profile';
import EmergencyContacts from '../pages/user/EmergencyContacts';
import EmergencyHistory from '../pages/user/EmergencyHistory';

// Admin Pages
import AdminDashboard from '../pages/admin/Dashboard';
import AdminUsers from '../pages/admin/Users';
import AdminEmergencies from '../pages/admin/Emergencies';
import AdminEmergencyDetails from '../pages/admin/EmergencyDetails';

// Route Guards
import ProtectedRoute from './ProtectedRoute';
import AdminRoute from './AdminRoute';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Authenticated User Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/emergency-contacts" element={<EmergencyContacts />} />
        <Route path="/emergency-history" element={<EmergencyHistory />} />
      </Route>

      {/* Admin Protected Routes */}
      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/emergencies" element={<AdminEmergencies />} />
        <Route path="/admin/emergencies/:id" element={<AdminEmergencyDetails />} />
      </Route>

      {/* Catch-all redirect to Home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
