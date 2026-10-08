# Naari Suraksha V1 — Project Flow & System Architecture

## 1. Project Overview

**Naari Suraksha** is a modern, responsive women-safety application built with React, Vite, Tailwind CSS, Express.js, and MongoDB. It provides a reliable emergency-response foundation with one-tap SOS triggers, browser geolocation capturing, trusted emergency contact management, and an administrative command dashboard. The web application is also configured as a Progressive Web App (PWA) using `vite-plugin-pwa` for installation on Android mobile devices.

---

## 2. System Architecture

```text
┌─────────────────────────────────────────────────────────────┐
│                 Client Layer (PWA / Web)                    │
│                                                             │
│   Public Landing   │   User App Dashboard   │  Admin Panel  │
│   (React + Vite)   │   (SOS + Contacts)     │ (Map Monitoring)
└──────────────────────────────┬──────────────────────────────┘
                               │ HTTP / Cookie JWT / REST
┌──────────────────────────────▼──────────────────────────────┐
│                  Backend Layer (Node / Express)             │
│                                                             │
│   Auth Middleware  │   Admin Authorization  │ Controllers   │
└──────────────────────────────┬──────────────────────────────┘
                               │ Mongoose ODM
┌──────────────────────────────▼──────────────────────────────┐
│                    Database Layer (MongoDB)                 │
│                                                             │
│   Users Collection │ EmergencyContacts  │ EmergencyIncidents│
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Comprehensive User Flows

### A. Visitor & Authentication Flow
1. **Landing Page**: Visitor accesses `https://naarisuraksha.org/`.
2. **Registration**: Visitor registers account at `/register` (`name`, `email`, `phone`, `password`). The backend strictly enforces `role = 'USER'`.
3. **Login**: User logs in at `/login`. JWT token is issued via HTTP-only cookie and returned for client-side storage.

### B. User SOS Emergency Flow
1. **User Dashboard**: Authenticated user navigates to `/dashboard`.
2. **SOS Trigger**: User clicks the prominent red **SOS** button.
3. **Confirmation Modal**: A confirmation modal prompts the user to prevent accidental clicks.
4. **Geolocation Capture**: Upon confirmation, `navigator.geolocation.getCurrentPosition` requests latitude & longitude.
5. **API Request**: Frontend sends `POST /api/emergencies` with `{ latitude, longitude }`. User ID is derived strictly from `req.user._id`.
6. **Persistence**: Backend saves an `EmergencyIncident` document in MongoDB with status `ACTIVE`.
7. **Live UI Alert**: Active emergency badge and location map appear on the user's dashboard and log.

### C. Emergency Contact Management Flow
1. User navigates to `/emergency-contacts`.
2. User can Add, View, Edit, or Delete emergency contacts (`name`, `phone`, `relationship`).
3. Each contact is stored in MongoDB referencing `user: req.user._id`.

---

## 4. Comprehensive Admin Flow

1. **Admin Authentication**: Admin account created via `npm run seed:admin` using environment variables (`ADMIN_EMAIL`, `ADMIN_PASSWORD`).
2. **Admin Command Panel**: Admin logs in at `/login` and is directed to `/admin`.
3. **Live Metrics**: Dashboard highlights Active Emergencies, Total Users, Total Incidents, and Resolved Incidents.
4. **Emergency Inspection**: Admin clicks on an incident to open `/admin/emergencies/:id`.
5. **Interactive Location Map**: Admin views user information, registered emergency contacts, and exact GPS coordinates on a Leaflet OpenStreetMap.
6. **Incident Resolution**: Admin updates incident status (`ACTIVE` → `RESOLVED` or `CANCELLED`).

---

## 5. Folder Structure

```text
Nari__Suraksha/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── admin.controller.js
│   │   ├── auth.controller.js
│   │   ├── contact.controller.js
│   │   ├── emergency.controller.js
│   │   └── user.controller.js
│   ├── middleware/
│   │   ├── admin.middleware.js
│   │   ├── auth.middleware.js
│   │   └── error.middleware.js
│   ├── models/
│   │   ├── EmergencyContact.js
│   │   ├── EmergencyIncident.js
│   │   └── User.js
│   ├── routes/
│   │   ├── admin.routes.js
│   │   ├── auth.routes.js
│   │   ├── contact.routes.js
│   │   ├── emergency.routes.js
│   │   └── user.routes.js
│   ├── scripts/
│   │   └── seedAdmin.js
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── public/
│   │   ├── favicon.svg
│   │   ├── pwa-192x192.png
│   │   └── pwa-512x512.png
│   ├── src/
│   │   ├── components/
│   │   │   ├── admin/
│   │   │   │   ├── AdminNavbar.jsx
│   │   │   │   └── AdminSidebar.jsx
│   │   │   └── common/
│   │   │       ├── Footer.jsx
│   │   │       ├── LoadingSpinner.jsx
│   │   │       ├── MapView.jsx
│   │   │       ├── Modal.jsx
│   │   │       ├── Navbar.jsx
│   │   │       └── StatusBadge.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── admin/
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── Emergencies.jsx
│   │   │   │   ├── EmergencyDetails.jsx
│   │   │   │   └── Users.jsx
│   │   │   ├── auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Register.jsx
│   │   │   ├── public/
│   │   │   │   └── Home.jsx
│   │   │   └── user/
│   │   │       ├── Dashboard.jsx
│   │   │       ├── EmergencyContacts.jsx
│   │   │       ├── EmergencyHistory.jsx
│   │   │       └── Profile.jsx
│   │   ├── routes/
│   │   │   ├── AdminRoute.jsx
│   │   │   ├── AppRoutes.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── services/
│   │   │   ├── adminService.js
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   ├── contactService.js
│   │   │   └── emergencyService.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── API_REFERENCE.md
└── PROJECT_FLOW.md
```

---

## 6. Important Component Relationships

```text
App
 └── BrowserRouter
      └── AuthProvider (AuthContext)
           └── AppRoutes
                ├── Public Routes (Navbar, Home, Login, Register, Footer)
                ├── Protected Routes (ProtectedRoute)
                │    └── User Pages (Dashboard, Profile, Contacts, History)
                │         └── Shared UI (MapView, StatusBadge, Modal)
                └── Admin Routes (AdminRoute)
                     └── Admin Layout (AdminSidebar, AdminNavbar)
                          └── Admin Pages (Dashboard, Users, Emergencies, Details)
                               └── Shared UI (MapView, StatusBadge)
```
