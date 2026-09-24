// src/routes/ProtectedRoute.jsx
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export default function ProtectedRoute({ children, requiredRole }) {
  const { currentUser } = useApp()
  const location = useLocation()

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (requiredRole && currentUser.role !== requiredRole) {
    // If donor tries to go to organizer or vice versa, redirect appropriately
    if (requiredRole === 'organizer') {
      return <Navigate to="/donor" replace />
    } else if (requiredRole === 'donor') {
      return <Navigate to="/organizer" replace />
    }
  }

  return children
}
