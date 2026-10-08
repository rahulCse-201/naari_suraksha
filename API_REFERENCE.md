# Naari Suraksha V1 — API Reference & Data Flow

This document details every REST API endpoint in Naari Suraksha V1, along with the full end-to-end `Page → API → Controller → Model` architecture.

---

## 1. Architectural Data Flow Pattern

```text
Frontend Page Component
      ↓ (Calls Service Function)
Axios API Client (`frontend/src/services/api.js`)
      ↓ (HTTP REST Request with Cookie / Authorization Header)
Express Router (`backend/routes/*.routes.js`)
      ↓ (Authentication / Admin Middleware)
Controller Function (`backend/controllers/*.controller.js`)
      ↓ (Mongoose Query)
MongoDB Collection Model (`backend/models/*.js`)
      ↓ (JSON Response)
Frontend State Update & UI Render
```

---

## 2. Authentication API Endpoints

### 1. Register User
* **METHOD**: `POST`
* **ENDPOINT**: `/api/auth/register`
* **AUTH**: None (Public)
* **ROLE**: Public (Role forced to `USER` on backend)
* **CONTROLLER**: `register` in `auth.controller.js`
* **PURPOSE**: Registers a new standard user account.
* **REQUEST**:
  ```json
  {
    "name": "Priya Sharma",
    "email": "priya@example.com",
    "password": "Password123!",
    "phone": "+919876543210"
  }
  ```
* **RESPONSE**:
  ```json
  {
    "success": true,
    "message": "Registration successful",
    "token": "eyJhbGciOi...",
    "user": {
      "_id": "664b1f...",
      "name": "Priya Sharma",
      "email": "priya@example.com",
      "phone": "+919876543210",
      "role": "USER",
      "createdAt": "2026-09-30T10:00:00.000Z"
    }
  }
  ```
* **Data Flow**: `Register.jsx` → `authService.registerUser()` → `POST /api/auth/register` → `auth.controller.register` → `User.create()`

---

### 2. Login User
* **METHOD**: `POST`
* **ENDPOINT**: `/api/auth/login`
* **AUTH**: None (Public)
* **ROLE**: Public
* **CONTROLLER**: `login` in `auth.controller.js`
* **PURPOSE**: Authenticates user credentials, sets HTTP-only JWT cookie, and returns user data.
* **REQUEST**:
  ```json
  {
    "email": "priya@example.com",
    "password": "Password123!"
  }
  ```
* **RESPONSE**:
  ```json
  {
    "success": true,
    "message": "Login successful",
    "token": "eyJhbGciOi...",
    "user": {
      "_id": "664b1f...",
      "name": "Priya Sharma",
      "email": "priya@example.com",
      "phone": "+919876543210",
      "role": "USER"
    }
  }
  ```
* **Data Flow**: `Login.jsx` → `authService.loginUser()` → `POST /api/auth/login` → `auth.controller.login` → `User.findOne()` & `comparePassword()`

---

### 3. Logout User
* **METHOD**: `POST`
* **ENDPOINT**: `/api/auth/logout`
* **AUTH**: Required
* **ROLE**: Authenticated (`USER` or `ADMIN`)
* **CONTROLLER**: `logout` in `auth.controller.js`
* **PURPOSE**: Clears HTTP-only JWT session cookie.
* **REQUEST**: None
* **RESPONSE**:
  ```json
  {
    "success": true,
    "message": "Logged out successfully"
  }
  ```
* **Data Flow**: `Navbar.jsx` / `AdminNavbar.jsx` → `authService.logoutUser()` → `POST /api/auth/logout` → `auth.controller.logout`

---

### 4. Get Current User (`me`)
* **METHOD**: `GET`
* **ENDPOINT**: `/api/auth/me`
* **AUTH**: Required
* **ROLE**: Authenticated (`USER` or `ADMIN`)
* **CONTROLLER**: `getMe` in `auth.controller.js`
* **PURPOSE**: Returns currently authenticated session user info.
* **REQUEST**: None
* **RESPONSE**:
  ```json
  {
    "success": true,
    "user": {
      "_id": "664b1f...",
      "name": "Priya Sharma",
      "email": "priya@example.com",
      "phone": "+919876543210",
      "role": "USER"
    }
  }
  ```
* **Data Flow**: `AuthContext.jsx` → `authService.getCurrentUser()` → `GET /api/auth/me` → `auth.middleware.protect` → `User.findById()`

---

## 3. User Profile API Endpoints

### 5. Update Profile
* **METHOD**: `PUT`
* **ENDPOINT**: `/api/user/profile`
* **AUTH**: Required
* **ROLE**: Authenticated (`USER` or `ADMIN`)
* **CONTROLLER**: `updateProfile` in `user.controller.js`
* **PURPOSE**: Updates authenticated user's name and phone.
* **REQUEST**:
  ```json
  {
    "name": "Priya Sharma",
    "phone": "+919999988888"
  }
  ```
* **RESPONSE**:
  ```json
  {
    "success": true,
    "message": "Profile updated successfully",
    "user": { ... }
  }
  ```
* **Data Flow**: `Profile.jsx` → `authService.updateProfile()` → `PUT /api/user/profile` → `user.controller.updateProfile` → `User.findByIdAndUpdate()`

---

## 4. Emergency Contacts API Endpoints

### 6. Get User Contacts
* **METHOD**: `GET`
* **ENDPOINT**: `/api/contacts`
* **AUTH**: Required
* **ROLE**: Authenticated (`USER`)
* **CONTROLLER**: `getContacts` in `contact.controller.js`
* **PURPOSE**: Fetches list of emergency contacts owned by the authenticated user.
* **REQUEST**: None
* **RESPONSE**:
  ```json
  {
    "success": true,
    "count": 2,
    "contacts": [
      {
        "_id": "664c2a...",
        "user": "664b1f...",
        "name": "Sunita Sharma",
        "phone": "+919876511111",
        "relationship": "Mother"
      }
    ]
  }
  ```
* **Data Flow**: `EmergencyContacts.jsx` → `contactService.getContacts()` → `GET /api/contacts` → `contact.controller.getContacts` → `EmergencyContact.find({ user: req.user._id })`

---

### 7. Create Emergency Contact
* **METHOD**: `POST`
* **ENDPOINT**: `/api/contacts`
* **AUTH**: Required
* **ROLE**: Authenticated (`USER`)
* **CONTROLLER**: `createContact` in `contact.controller.js`
* **PURPOSE**: Adds a new trusted emergency contact.
* **REQUEST**:
  ```json
  {
    "name": "Sunita Sharma",
    "phone": "+919876511111",
    "relationship": "Mother"
  }
  ```
* **RESPONSE**:
  ```json
  {
    "success": true,
    "message": "Emergency contact added successfully",
    "contact": { ... }
  }
  ```
* **Data Flow**: `EmergencyContacts.jsx` → `contactService.createContact()` → `POST /api/contacts` → `contact.controller.createContact` → `EmergencyContact.create()`

---

### 8. Update Emergency Contact
* **METHOD**: `PUT`
* **ENDPOINT**: `/api/contacts/:id`
* **AUTH**: Required
* **ROLE**: Authenticated (`USER`)
* **CONTROLLER**: `updateContact` in `contact.controller.js`
* **PURPOSE**: Updates an existing emergency contact owned by the user.
* **REQUEST**:
  ```json
  {
    "name": "Sunita Sharma",
    "phone": "+919876522222",
    "relationship": "Mother"
  }
  ```
* **RESPONSE**:
  ```json
  {
    "success": true,
    "message": "Emergency contact updated successfully",
    "contact": { ... }
  }
  ```
* **Data Flow**: `EmergencyContacts.jsx` → `contactService.updateContact()` → `PUT /api/contacts/:id` → `contact.controller.updateContact` → `EmergencyContact.save()`

---

### 9. Delete Emergency Contact
* **METHOD**: `DELETE`
* **ENDPOINT**: `/api/contacts/:id`
* **AUTH**: Required
* **ROLE**: Authenticated (`USER`)
* **CONTROLLER**: `deleteContact` in `contact.controller.js`
* **PURPOSE**: Deletes a trusted emergency contact.
* **REQUEST**: None
* **RESPONSE**:
  ```json
  {
    "success": true,
    "message": "Emergency contact removed successfully"
  }
  ```
* **Data Flow**: `EmergencyContacts.jsx` → `contactService.deleteContact()` → `DELETE /api/contacts/:id` → `contact.controller.deleteContact` → `EmergencyContact.deleteOne()`

---

## 5. Emergency Incident API Endpoints

### 10. Trigger Emergency SOS
* **METHOD**: `POST`
* **ENDPOINT**: `/api/emergencies`
* **AUTH**: Required
* **ROLE**: Authenticated (`USER`)
* **CONTROLLER**: `createEmergency` in `emergency.controller.js`
* **PURPOSE**: Creates an active SOS emergency incident with browser GPS location coordinates.
* **REQUEST**:
  ```json
  {
    "latitude": 28.6139,
    "longitude": 77.2090
  }
  ```
* **RESPONSE**:
  ```json
  {
    "success": true,
    "message": "SOS Emergency Broadcasted Successfully",
    "emergency": {
      "_id": "664d3f...",
      "user": {
        "_id": "664b1f...",
        "name": "Priya Sharma",
        "email": "priya@example.com",
        "phone": "+919876543210"
      },
      "latitude": 28.6139,
      "longitude": 77.2090,
      "status": "ACTIVE",
      "createdAt": "2026-09-30T10:15:00.000Z"
    }
  }
  ```
* **Data Flow**: `Dashboard.jsx` → `emergencyService.triggerSOS()` → `POST /api/emergencies` → `emergency.controller.createEmergency` → `EmergencyIncident.create()`

---

### 11. Get My Emergency History
* **METHOD**: `GET`
* **ENDPOINT**: `/api/emergencies/my`
* **AUTH**: Required
* **ROLE**: Authenticated (`USER`)
* **CONTROLLER**: `getMyEmergencies` in `emergency.controller.js`
* **PURPOSE**: Retrieves past emergency SOS history for the authenticated user.
* **REQUEST**: None
* **RESPONSE**:
  ```json
  {
    "success": true,
    "count": 1,
    "emergencies": [ { ... } ]
  }
  ```
* **Data Flow**: `EmergencyHistory.jsx` → `emergencyService.getMyEmergencies()` → `GET /api/emergencies/my` → `emergency.controller.getMyEmergencies` → `EmergencyIncident.find({ user: req.user._id })`

---

## 6. Admin Panel API Endpoints

### 12. Admin Dashboard Stats
* **METHOD**: `GET`
* **ENDPOINT**: `/api/admin/dashboard`
* **AUTH**: Required
* **ROLE**: Admin (`ADMIN`)
* **CONTROLLER**: `getDashboardStats` in `admin.controller.js`
* **PURPOSE**: Fetches counts of total users, total emergencies, active emergencies, resolved emergencies, and recent 5 incidents.
* **REQUEST**: None
* **RESPONSE**:
  ```json
  {
    "success": true,
    "stats": {
      "totalUsers": 24,
      "totalEmergencies": 5,
      "activeEmergencies": 2,
      "resolvedEmergencies": 3,
      "cancelledEmergencies": 0
    },
    "recentEmergencies": [ ... ]
  }
  ```
* **Data Flow**: `admin/Dashboard.jsx` → `adminService.getAdminStats()` → `GET /api/admin/dashboard` → `admin.middleware.adminOnly` → `admin.controller.getDashboardStats`

---

### 13. Admin Users Directory
* **METHOD**: `GET`
* **ENDPOINT**: `/api/admin/users`
* **AUTH**: Required
* **ROLE**: Admin (`ADMIN`)
* **CONTROLLER**: `getUsers` in `admin.controller.js`
* **PURPOSE**: Retrieves list of all registered users (omitting password hash).
* **REQUEST**: None
* **RESPONSE**:
  ```json
  {
    "success": true,
    "count": 24,
    "users": [ ... ]
  }
  ```
* **Data Flow**: `admin/Users.jsx` → `adminService.getAdminUsers()` → `GET /api/admin/users` → `admin.controller.getUsers` → `User.find().select('-password')`

---

### 14. Admin Emergencies List
* **METHOD**: `GET`
* **ENDPOINT**: `/api/admin/emergencies?status=ACTIVE`
* **AUTH**: Required
* **ROLE**: Admin (`ADMIN`)
* **CONTROLLER**: `getEmergencies` in `admin.controller.js`
* **PURPOSE**: Fetches list of all emergency incidents with optional status query filter (`ACTIVE`, `RESOLVED`, `CANCELLED`).
* **REQUEST**: None
* **RESPONSE**:
  ```json
  {
    "success": true,
    "count": 2,
    "emergencies": [ ... ]
  }
  ```
* **Data Flow**: `admin/Emergencies.jsx` → `adminService.getAdminEmergencies()` → `GET /api/admin/emergencies` → `admin.controller.getEmergencies` → `EmergencyIncident.find()`

---

### 15. Admin Emergency Details & Contacts
* **METHOD**: `GET`
* **ENDPOINT**: `/api/admin/emergencies/:id`
* **AUTH**: Required
* **ROLE**: Admin (`ADMIN`)
* **CONTROLLER**: `getEmergencyById` in `admin.controller.js`
* **PURPOSE**: Fetches detailed emergency incident info along with distressed user's emergency contacts.
* **REQUEST**: None
* **RESPONSE**:
  ```json
  {
    "success": true,
    "emergency": {
      "_id": "664d3f...",
      "user": { "_id": "664b1f...", "name": "Priya Sharma", "email": "priya@example.com", "phone": "+919876543210" },
      "latitude": 28.6139,
      "longitude": 77.2090,
      "status": "ACTIVE"
    },
    "contacts": [
      { "name": "Sunita Sharma", "phone": "+919876511111", "relationship": "Mother" }
    ]
  }
  ```
* **Data Flow**: `admin/EmergencyDetails.jsx` → `adminService.getAdminEmergencyById()` → `GET /api/admin/emergencies/:id` → `admin.controller.getEmergencyById` → `EmergencyIncident.findById()` & `EmergencyContact.find()`

---

### 16. Update Emergency Status
* **METHOD**: `PATCH`
* **ENDPOINT**: `/api/admin/emergencies/:id/status`
* **AUTH**: Required
* **ROLE**: Admin (`ADMIN`)
* **CONTROLLER**: `updateEmergencyStatus` in `admin.controller.js`
* **PURPOSE**: Updates incident status (`ACTIVE` → `RESOLVED` or `CANCELLED`).
* **REQUEST**:
  ```json
  {
    "status": "RESOLVED"
  }
  ```
* **RESPONSE**:
  ```json
  {
    "success": true,
    "message": "Emergency status updated to RESOLVED",
    "emergency": { ... }
  }
  ```
* **Data Flow**: `admin/EmergencyDetails.jsx` → `adminService.updateEmergencyStatus()` → `PATCH /api/admin/emergencies/:id/status` → `admin.controller.updateEmergencyStatus` → `EmergencyIncident.save()`
