import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import ProtectedRoute from './routes/ProtectedRoute';

// Layouts
import OrganizerLayout from './layouts/OrganizerLayout';
import DonorLayout from './layouts/DonorLayout';

// Auth Page
import Login from './pages/Login';

// Organizer Pages
import OrganizerDashboard from './pages/organizer/OrganizerDashboard';
import DrivesList from './pages/organizer/DrivesList';
import CreateDrive from './pages/organizer/CreateDrive';
import DonorsList from './pages/organizer/DonorsList';
import SmartReminders from './pages/organizer/SmartReminders';
import SimulationLab from './pages/organizer/SimulationLab';
import Analytics from './pages/organizer/Analytics';
import QrCheckin from './pages/organizer/QrCheckin';
import OrganizerSettings from './pages/organizer/OrganizerSettings';

// Donor Pages
import DonorHome from './pages/donor/DonorHome';
import DriveDetails from './pages/donor/DriveDetails';
import RegistrationConsent from './pages/donor/RegistrationConsent';
import RegistrationConfirmed from './pages/donor/RegistrationConfirmed';
import MyRegistration from './pages/donor/MyRegistration';
import DonorAssistant from './pages/donor/DonorAssistant';

// Root redirect based on role or login state
function RootRedirect() {
  const { user, role } = useApp();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (role === 'organizer') {
    return <Navigate to="/organizer" replace />;
  }
  return <Navigate to="/donor" replace />;
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Authentication Route */}
          <Route path="/login" element={<Login />} />

          {/* Root redirect */}
          <Route path="/" element={<RootRedirect />} />

          {/* Donor Experience Routes (Protected by role='donor') */}
          <Route
            path="/donor"
            element={
              <ProtectedRoute allowedRole="donor">
                <DonorLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DonorHome />} />
            <Route path="drive/:id" element={<DriveDetails />} />
            <Route path="register" element={<RegistrationConsent />} />
            <Route path="confirmed" element={<RegistrationConfirmed />} />
            <Route path="registration" element={<MyRegistration />} />
            <Route path="assistant" element={<DonorAssistant />} />
          </Route>

          {/* Organizer Experience Routes (Protected by role='organizer') */}
          <Route
            path="/organizer"
            element={
              <ProtectedRoute allowedRole="organizer">
                <OrganizerLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<OrganizerDashboard />} />
            <Route path="drives" element={<DrivesList />} />
            <Route path="drives/create" element={<CreateDrive />} />
            <Route path="donors" element={<DonorsList />} />
            <Route path="reminders" element={<SmartReminders />} />
            <Route path="simulation" element={<SimulationLab />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="checkin" element={<QrCheckin />} />
            <Route path="settings" element={<OrganizerSettings />} />
          </Route>

          {/* Catch-all Fallback */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
