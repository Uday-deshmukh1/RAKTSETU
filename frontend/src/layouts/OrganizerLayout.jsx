// src/layouts/OrganizerLayout.jsx
import React, { useState } from 'react'
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export default function OrganizerLayout() {
  const { currentUser, logout, activeDrive, drives, setSelectedDriveId } = useApp()
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [showDriveDropdown, setShowDriveDropdown] = useState(false)

  const navItems = [
    { to: '/organizer', label: 'Dashboard', icon: 'dashboard', end: true },
    { to: '/organizer/drives', label: 'Drives', icon: 'local_hospital' },
    { to: '/organizer/donors', label: 'Donors', icon: 'group' },
    { to: '/organizer/reminders', label: 'Smart Reminders', icon: 'notifications_active' },
    { to: '/organizer/simulation', label: 'Simulation Lab', icon: 'science' },
    { to: '/organizer/analytics', label: 'Analytics', icon: 'monitoring' },
    { to: '/organizer/checkin', label: 'QR Check-in', icon: 'qr_code_scanner' },
    { to: '/organizer/settings', label: 'Settings', icon: 'settings' },
  ]

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#f8f9ff] text-[#0b1c30]">
      {/* MOBILE BACKDROP */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* APPROVED LOCKED WHITE SIDEBAR */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 flex flex-col justify-between p-4 bg-white border-r border-slate-200/90 shadow-sm transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col gap-5">
          {/* Top Brand Cluster */}
          <div className="flex items-center justify-between px-2 pt-1">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#0f172a] text-white flex items-center justify-center shadow-sm">
                <span className="material-symbols-outlined text-[#38bdf8] text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  water_drop
                </span>
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight text-[#0f172a] block leading-none">
                  RaktSetu
                </span>
                <span className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider block mt-1">
                  Predict. Engage. Mobilise.
                </span>
              </div>
            </div>
            {/* Close button on mobile */}
            <button
              className="lg:hidden p-1 text-slate-400 hover:text-slate-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          {/* Quick Mobilization Action Button */}
          <button
            onClick={() => {
              navigate('/organizer/drives/create')
              setMobileMenuOpen(false)
            }}
            className="w-full py-2.5 px-3 rounded-lg bg-[#0f172a] text-white hover:bg-slate-800 transition-all duration-150 font-medium text-sm flex items-center justify-center gap-2 shadow-sm group cursor-pointer"
          >
            <span className="material-symbols-outlined text-[#38bdf8] text-base group-hover:rotate-90 transition-transform duration-200">
              add
            </span>
            <span className="font-semibold">+ Quick Mobilization</span>
          </button>

          {/* Navigation Links Stack (8 Items) */}
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors duration-150 ${
                    isActive
                      ? 'bg-[#e5eeff] text-[#0284c7] font-bold shadow-xs'
                      : 'text-[#475569] hover:bg-[#f1f5f9] hover:text-[#0f172a] font-medium'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={`material-symbols-outlined text-xl ${
                        isActive ? 'text-[#0284c7]' : 'text-[#64748b]'
                      }`}
                      style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
                    >
                      {item.icon}
                    </span>
                    <span className="flex-1 text-left">{item.label}</span>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7]"></span>}
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Footer User Profile & System Status */}
        <div className="pt-4 border-t border-slate-200 flex flex-col gap-2.5">
          {/* Live Sync Indicator */}
          <div className="px-2 py-1 rounded-md bg-[#f8fafc] border border-slate-200 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[11px] font-medium text-slate-600">Engine Live Sync</span>
            </div>
            <span className="text-[11px] font-mono text-[#0284c7] font-bold">99.4%</span>
          </div>

          {/* User Profile Row */}
          <div className="relative">
            <div
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2.5 p-2 rounded-lg bg-[#f1f5f9] hover:bg-slate-200/80 transition-colors cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-[#0f172a] text-white flex items-center justify-center font-bold text-xs ring-1 ring-slate-300">
                {currentUser?.initials || 'AM'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-900 truncate leading-tight">
                  {currentUser?.name || 'Dr. Arvind Mehta'}
                </p>
                <p className="text-[10px] text-slate-500 truncate">
                  {currentUser?.organization || 'RedCross Maharashtra'}
                </p>
              </div>
              <span className="material-symbols-outlined text-slate-400 text-sm">
                {showProfileMenu ? 'expand_less' : 'more_vert'}
              </span>
            </div>

            {/* Profile Popup Menu */}
            {showProfileMenu && (
              <div className="absolute bottom-12 left-0 right-0 bg-white border border-slate-200 rounded-xl shadow-lg p-2 z-50 text-xs flex flex-col gap-1">
                <div className="px-2 py-1 text-slate-500 border-b border-slate-100 mb-1">
                  Signed in as <strong className="text-slate-800">Organizer</strong>
                </div>
                <button
                  onClick={() => {
                    setShowProfileMenu(false)
                    navigate('/donor')
                  }}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-slate-700 hover:bg-slate-100 text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">swap_horiz</span>
                  <span>Switch to Donor View</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-rose-600 hover:bg-rose-50 text-left font-semibold cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">logout</span>
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* MAIN VIEWPORT WRAPPER */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* TOP NAV BAR */}
        <header className="h-16 border-b border-slate-200/90 bg-white px-4 sm:px-6 flex items-center justify-between shrink-0 z-20 shadow-xs">
          {/* Left: Mobile hamburger & Active Campaign Pill */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>

            {/* Campaign Dropdown Selector */}
            <div className="relative">
              <div
                onClick={() => setShowDriveDropdown(!showDriveDropdown)}
                className="flex items-center gap-2 bg-[#f8fafc] px-3 py-1.5 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-100 transition-colors"
              >
                <span className="material-symbols-outlined text-[#0284c7] text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                  local_hospital
                </span>
                <span className="font-semibold text-xs sm:text-sm text-slate-900 truncate max-w-[160px] sm:max-w-none">
                  {activeDrive?.title || 'Nagpur Community Blood Drive'}
                </span>
                <span className="text-[11px] text-slate-400 hidden md:inline">({activeDrive?.city})</span>
                <span className="material-symbols-outlined text-sm text-slate-400">expand_more</span>
              </div>

              {showDriveDropdown && (
                <div className="absolute left-0 mt-1 w-72 bg-white border border-slate-200 rounded-xl shadow-lg p-2 z-30">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
                    Select Active Campaign
                  </p>
                  {drives.map((d) => (
                    <button
                      key={d.id}
                      onClick={() => {
                        setSelectedDriveId(d.id)
                        setShowDriveDropdown(false)
                      }}
                      className={`w-full text-left p-2 rounded-lg text-xs flex items-center justify-between cursor-pointer ${
                        d.id === activeDrive?.id ? 'bg-[#e5eeff] text-[#0284c7] font-bold' : 'hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div>
                        <p className="truncate font-semibold">{d.title}</p>
                        <p className="text-[10px] text-slate-400">{d.dateDisplay}</p>
                      </div>
                      {d.id === activeDrive?.id && (
                        <span className="material-symbols-outlined text-sm text-[#0284c7]">check</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Campaign Meta pill */}
            <div className="hidden xl:flex items-center gap-2 text-xs text-slate-500">
              <span className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded">
                <span className="material-symbols-outlined text-xs">calendar_today</span>
                {activeDrive?.dateDisplay}
              </span>
              <span className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded">
                <span className="material-symbols-outlined text-xs">location_on</span>
                {activeDrive?.venueName}
              </span>
            </div>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-2.5">
            {/* Status Indicator Pill */}
            <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Active Campaign
            </div>

            {/* Notification Bell */}
            <button
              onClick={() => alert('3 Notifications: 1. Reminder wave 2 dispatched (118 recipients). 2. High turnout predicted (341). 3. 43 donors flagged for distance.')}
              className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              title="Notifications"
            >
              <span className="material-symbols-outlined text-xl">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#e11d48] text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                3
              </span>
            </button>

            {/* Emergency Callout Button */}
            <button
              onClick={() => {
                alert('🚨 Emergency Mobilization Callout Broadcast Initiated for Rare Phenotypes (O-ve, B-ve) in Nagpur chapter.')
              }}
              className="px-3 py-1.5 rounded-lg bg-[#e11d48] hover:bg-[#be123c] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">emergency</span>
              <span className="hidden sm:inline">Emergency Callout</span>
            </button>
          </div>
        </header>

        {/* SCROLLABLE ROUTE CONTENT CANVAS */}
        <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col justify-between">
          <main className="p-4 sm:p-6 max-w-7xl w-full mx-auto pb-10">
            <Outlet />
          </main>

          {/* STICKY BOTTOM OPERATIONAL STATUS TICKER */}
          <footer className="h-10 bg-[#0f172a] text-white px-4 sm:px-6 flex items-center justify-between text-xs shrink-0 border-t border-slate-800 z-10">
            <div className="flex items-center gap-3 sm:gap-4 overflow-x-auto whitespace-nowrap">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span className="text-slate-300 font-mono text-[11px]">
                  Check-in Velocity: <strong className="text-white">42 donors/hr</strong>
                </span>
              </span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-300 font-mono text-[11px]">
                Arrived:{' '}
                <strong className="text-white">
                  {activeDrive?.actualAttendance || 327} / {activeDrive?.predictedAttendance || 341} Expected
                </strong>
              </span>
              <span className="text-slate-600 hidden md:inline">|</span>
              <span className="text-slate-400 text-[11px] hidden md:inline font-mono">
                Bayesian Confidence: {activeDrive?.confidenceRate || '87%'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-400 text-[11px] font-mono hidden sm:inline">RaktSetu Intelligence Platform</span>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}
