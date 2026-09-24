// src/layouts/DonorLayout.jsx
import React from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export default function DonorLayout() {
  const { currentUser, logout, activeRegistration } = useApp()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9ff] text-[#0b1c30]">
      {/* CONSUMER HEADER NAVIGATION */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Brand Cluster */}
          <div
            onClick={() => navigate('/donor')}
            className="flex items-center gap-3 shrink-0 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-[#0f172a] text-white flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-[#38bdf8] text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                water_drop
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold tracking-tight text-[#0f172a] block leading-tight">
                  RaktSetu
                </span>
                <span className="w-2 h-2 rounded-full bg-[#0284c7]"></span>
              </div>
              <span className="text-[10px] font-bold tracking-widest text-[#64748b] uppercase block">
                PREDICT. ENGAGE. MOBILISE.
              </span>
            </div>
          </div>

          {/* Main Navigation Tabs */}
          <nav aria-label="Donor Portal Navigation" className="hidden md:flex items-center gap-1.5">
            <NavLink
              to="/donor"
              end
              className={({ isActive }) =>
                `px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors duration-150 ${
                  isActive
                    ? 'bg-[#e5eeff] text-[#0284c7] shadow-xs'
                    : 'text-[#475569] hover:bg-[#f1f5f9] hover:text-[#0f172a]'
                }`
              }
            >
              Find Drives
            </NavLink>

            <NavLink
              to="/donor/my-registration"
              className={({ isActive }) =>
                `px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors duration-150 flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#e5eeff] text-[#0284c7] shadow-xs'
                    : 'text-[#475569] hover:bg-[#f1f5f9] hover:text-[#0f172a]'
                }`
              }
            >
              <span>My Registration</span>
              {activeRegistration && (
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              )}
            </NavLink>

            <NavLink
              to="/donor/assistant"
              className={({ isActive }) =>
                `px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors duration-150 flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#e5eeff] text-[#0284c7] shadow-xs'
                    : 'text-[#475569] hover:bg-[#f1f5f9] hover:text-[#0f172a]'
                }`
              }
            >
              <span className="material-symbols-outlined text-base text-[#0284c7]">auto_awesome</span>
              <span>Assistant</span>
            </NavLink>
          </nav>

          {/* User Profile & Action Strip */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-2.5 pl-2">
              <div className="w-8 h-8 rounded-full bg-[#cce5ff] text-[#00476e] font-bold text-xs flex items-center justify-center">
                {currentUser?.initials || 'RS'}
              </div>
              <div className="hidden sm:block text-left">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-slate-900 leading-none">
                    {currentUser?.name || 'Rahul Sharma'}
                  </span>
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Verified
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 block mt-0.5">
                  Node #{currentUser?.donorNodeId || 'RC-4092'}
                </span>
              </div>
            </div>

            <div className="h-5 w-px bg-slate-200 hidden sm:block"></div>

            {/* Switch to Organizer view quick helper */}
            <button
              onClick={() => navigate('/organizer')}
              className="hidden lg:flex items-center gap-1 text-slate-500 hover:text-slate-800 text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors"
              title="Switch to Organizer Dashboard"
            >
              <span className="material-symbols-outlined text-base">dashboard</span>
              <span>Organizer View</span>
            </button>

            {/* Logout button */}
            <button
              onClick={handleLogout}
              className="text-slate-500 hover:text-rose-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors flex items-center gap-1 text-xs font-semibold cursor-pointer"
              title="Sign out of donor portal"
              type="button"
            >
              <span className="material-symbols-outlined text-base">logout</span>
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="md:hidden flex items-center justify-around border-t border-slate-200 px-2 py-1.5 bg-white">
          <NavLink
            to="/donor"
            end
            className={({ isActive }) =>
              `px-3 py-1.5 rounded-lg text-xs font-semibold ${
                isActive ? 'bg-[#e5eeff] text-[#0284c7]' : 'text-slate-600 hover:bg-slate-50'
              }`
            }
          >
            Find Drives
          </NavLink>
          <NavLink
            to="/donor/my-registration"
            className={({ isActive }) =>
              `px-3 py-1.5 rounded-lg text-xs font-semibold ${
                isActive ? 'bg-[#e5eeff] text-[#0284c7]' : 'text-slate-600 hover:bg-slate-50'
              }`
            }
          >
            My Registration
          </NavLink>
          <NavLink
            to="/donor/assistant"
            className={({ isActive }) =>
              `px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 ${
                isActive ? 'bg-[#e5eeff] text-[#0284c7]' : 'text-slate-600 hover:bg-slate-50'
              }`
            }
          >
            <span className="material-symbols-outlined text-xs">auto_awesome</span>
            <span>Assistant</span>
          </NavLink>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col">
        <Outlet />
      </main>

      {/* DONOR FOOTER */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#0284c7] text-base" style={{ fontVariationSettings: "'FILL' 1" }}>
              shield
            </span>
            <span>
              <strong>Administrative Jurisdiction Notice:</strong> Medical eligibility and clinical screening are conducted exclusively by authorized healthcare officers on-site at the donation venue.
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>RaktSetu Civic Mobilisation Framework</span>
            <span>•</span>
            <span>Zero Health Data Retention</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
