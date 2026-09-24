// src/pages/organizer/DrivesList.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'

export default function DrivesList() {
  const { drives, setSelectedDriveId } = useApp()
  const navigate = useNavigate()

  const [filterTab, setFilterTab] = useState('ALL') // 'ALL' | 'ACTIVE' | 'UPCOMING'
  const [searchQuery, setSearchQuery] = useState('')

  const filteredDrives = drives.filter((drive) => {
    const matchesFilter =
      filterTab === 'ALL' ||
      (filterTab === 'ACTIVE' && drive.status === 'ACTIVE') ||
      (filterTab === 'UPCOMING' && drive.status === 'UPCOMING')

    const matchesSearch =
      drive.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      drive.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      drive.venueName.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesFilter && matchesSearch
  })

  return (
    <div className="space-y-6">
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Drives</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Manage scheduled community blood drives, turnout goals, and mobilization progress.
          </p>
        </div>

        <button
          onClick={() => navigate('/organizer/drives/create')}
          className="px-4 py-2.5 rounded-lg bg-[#0f172a] hover:bg-slate-800 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-base text-[#38bdf8]">add</span>
          <span>Create New Drive</span>
        </button>
      </div>

      {/* 4 SUMMARY STAT CARDS */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Active Drives</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono mt-1 block">1</span>
          <span className="text-xs text-emerald-700 font-medium mt-1 block">Live intake underway</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Upcoming</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono mt-1 block">
            {drives.filter((d) => d.status === 'UPCOMING').length || 2}
          </span>
          <span className="text-xs text-slate-500 mt-1 block">Scheduled for Vidarbha</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Total Registrations</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-[#0284c7] font-mono mt-1 block">1,284</span>
          <span className="text-xs text-emerald-700 font-medium mt-1 block">+18% vs previous month</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Overall Attendance</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-emerald-800 font-mono mt-1 block">76.8%</span>
          <span className="text-xs text-slate-500 mt-1 block">Bayesian calibrated yield</span>
        </div>
      </section>

      {/* SEARCH & FILTER CONTROLS */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search drives by title, venue, or city..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:bg-white focus:border-[#0284c7] outline-none"
          />
        </div>

        {/* Tab Filter Pills */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto bg-slate-100 p-1 rounded-lg text-xs">
          <button
            onClick={() => setFilterTab('ALL')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-colors cursor-pointer ${
              filterTab === 'ALL' ? 'bg-white text-[#0284c7] shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Drives ({drives.length})
          </button>
          <button
            onClick={() => setFilterTab('ACTIVE')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-colors cursor-pointer ${
              filterTab === 'ACTIVE' ? 'bg-white text-[#0284c7] shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Active (1)
          </button>
          <button
            onClick={() => setFilterTab('UPCOMING')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-colors cursor-pointer ${
              filterTab === 'UPCOMING' ? 'bg-white text-[#0284c7] shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Upcoming ({drives.filter((d) => d.status === 'UPCOMING').length})
          </button>
        </div>
      </div>

      {/* DRIVES LIST CARDS */}
      <section className="space-y-4">
        {filteredDrives.map((drive) => {
          const mobilizationPct = Math.round((drive.registeredCount / drive.targetUnits) * 100)
          return (
            <div
              key={drive.id}
              className="bg-white rounded-xl border border-slate-200 shadow-xs hover:shadow-sm transition-all p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-5"
            >
              {/* Drive Details Column */}
              <div className="space-y-2.5 max-w-xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      drive.status === 'ACTIVE'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-blue-50 text-blue-800 border border-blue-200'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        drive.status === 'ACTIVE' ? 'bg-emerald-500 animate-pulse' : 'bg-blue-500'
                      }`}
                    ></span>
                    {drive.status === 'ACTIVE' ? 'Active Drive (Today)' : 'Scheduled Upcoming'}
                  </span>
                  <span className="text-xs font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                    Code: {drive.code}
                  </span>
                  <span className="text-xs text-slate-500">{drive.organization}</span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900">{drive.title}</h3>
                  <p className="text-xs text-slate-500 flex flex-wrap items-center gap-3 mt-1">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm text-[#0284c7]">calendar_today</span>
                      {drive.dateDisplay}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm text-[#0284c7]">schedule</span>
                      {drive.hoursDisplay}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm text-[#0284c7]">location_on</span>
                      {drive.address}
                    </span>
                  </p>
                </div>

                {/* Priority Phenotypes */}
                <div className="flex items-center gap-1.5 pt-1 text-xs">
                  <span className="text-slate-400 font-semibold">Priority Blood Needs:</span>
                  <div className="flex items-center gap-1">
                    {drive.urgentBloodGroups.map((bg) => (
                      <span
                        key={bg}
                        className="px-1.5 py-0.5 bg-rose-50 text-rose-700 font-bold border border-rose-200 rounded text-[11px]"
                      >
                        {bg}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Progress & Target Section */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 lg:border-l lg:border-slate-100 lg:pl-6">
                <div className="space-y-1.5 w-44">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500">Mobilisation Target</span>
                    <span className="font-bold text-slate-900 font-mono">
                      {drive.registeredCount} / {drive.targetUnits}
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-2 rounded-full ${
                        mobilizationPct >= 100 ? 'bg-emerald-600' : 'bg-[#0284c7]'
                      }`}
                      style={{ width: `${Math.min(mobilizationPct, 100)}%` }}
                    ></div>
                  </div>
                  <span className="text-[10px] text-slate-400 block text-right font-semibold">
                    {mobilizationPct}% of quota mobilized
                  </span>
                </div>

                {/* Turnout Telemetry Mini Pills */}
                <div className="text-left sm:text-right space-y-1 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Predicted Turnout</span>
                    <span className="text-base font-extrabold text-[#0284c7] font-mono">
                      {drive.predictedAttendance} donors
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Confirmed</span>
                    <span className="text-xs font-bold text-emerald-700 font-mono">
                      {drive.confirmedCount} ({Math.round((drive.confirmedCount / (drive.registeredCount || 1)) * 100)}%)
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex sm:flex-col gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => {
                      setSelectedDriveId(drive.id)
                      navigate('/organizer')
                    }}
                    className="flex-1 sm:flex-initial px-3.5 py-2 rounded-lg bg-[#0284c7] hover:bg-[#006398] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                  >
                    <span>View Dashboard</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                  <button
                    onClick={() => {
                      setSelectedDriveId(drive.id)
                      navigate('/organizer/reminders')
                    }}
                    className="flex-1 sm:flex-initial px-3.5 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm text-[#0284c7]">send</span>
                    <span>Reminders</span>
                  </button>
                </div>
              </div>
            </div>
          )
        })}

        {filteredDrives.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
            <span className="material-symbols-outlined text-slate-300 text-4xl mb-2">event_busy</span>
            <p className="text-sm font-bold text-slate-700">No blood drives match your search.</p>
            <p className="text-xs text-slate-400 mt-1">Try resetting your filters or creating a new blood drive.</p>
          </div>
        )}
      </section>
    </div>
  )
}
