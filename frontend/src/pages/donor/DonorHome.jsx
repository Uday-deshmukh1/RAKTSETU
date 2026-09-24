// src/pages/donor/DonorHome.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'

export default function DonorHome() {
  const { drives } = useApp()
  const navigate = useNavigate()

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCity, setSelectedCity] = useState('ALL')
  const [userLocationApplied, setUserLocationApplied] = useState(false)

  const handleUseLocation = () => {
    setUserLocationApplied(true)
    setSelectedCity('Nagpur')
    setSearchQuery('Nagpur, Maharashtra')
  }

  const filteredDrives = drives.filter((drive) => {
    const matchesCity = selectedCity === 'ALL' || drive.city.toLowerCase() === selectedCity.toLowerCase()
    const matchesQuery =
      searchQuery === '' ||
      drive.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      drive.venueName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      drive.city.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesCity && matchesQuery
  })

  return (
    <div className="space-y-6 pb-12">
      {/* HERO SECTION */}
      <section className="text-center sm:text-left space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e5eeff] text-[#00476e] text-xs font-bold mb-1">
          <span className="material-symbols-outlined text-sm text-[#0284c7]">hub</span>
          <span>CIVIC BLOOD MOBILISATION PORTAL</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0f172a] tracking-tight">
          Find a Blood Donation Drive
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl">
          Choose a verified community drive, register in seconds, and receive timely slot reminders before the event.
        </p>

        {/* SEARCH & FILTER TOOLBAR */}
        <div className="mt-6 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
                search
              </span>
              <input
                type="text"
                placeholder="Search by city, area, or venue (e.g. Nagpur, East Wing Hall)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 text-sm font-medium bg-[#f8fafc] hover:bg-white focus:bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-[#0284c7] transition-all text-slate-800 placeholder-slate-400"
              />
            </div>

            <button
              type="button"
              onClick={handleUseLocation}
              className={`inline-flex items-center justify-center gap-2 px-4 py-3 text-xs sm:text-sm font-bold rounded-xl border transition-colors whitespace-nowrap cursor-pointer ${
                userLocationApplied
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200'
              }`}
            >
              <span className="material-symbols-outlined text-[#0284c7] text-lg">
                {userLocationApplied ? 'check_circle' : 'my_location'}
              </span>
              <span>{userLocationApplied ? 'Location: Nagpur' : 'Use my location'}</span>
            </button>
          </div>

          {/* Filters Row */}
          <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs">
            <span className="text-slate-500 font-bold text-xs flex items-center gap-1 mr-1">
              <span className="material-symbols-outlined text-base text-slate-400">tune</span>
              Filters:
            </span>

            {/* City Filter */}
            <div className="relative inline-block">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="appearance-none pl-3 pr-8 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-700 font-semibold cursor-pointer focus:outline-none focus:border-[#0284c7] text-xs"
              >
                <option value="ALL">City: All Cities</option>
                <option value="Nagpur">City: Nagpur</option>
                <option value="Wardha">City: Wardha</option>
                <option value="Amravati">City: Amravati</option>
              </select>
              <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-sm">
                expand_more
              </span>
            </div>

            {/* Reset Button */}
            {(searchQuery || selectedCity !== 'ALL' || userLocationApplied) && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCity('ALL')
                  setUserLocationApplied(false)
                }}
                className="ml-auto text-slate-400 hover:text-slate-700 text-xs font-semibold py-1 px-1 cursor-pointer"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>
      </section>

      {/* SECTION TITLE */}
      <div className="flex items-center justify-between pt-2">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">Available Blood Drives</h2>
          <p className="text-xs text-slate-500">
            Showing {filteredDrives.length} verified community drives scheduled in Vidarbha region
          </p>
        </div>
        <div className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md hidden sm:block">
          Sorted by nearest date
        </div>
      </div>

      {/* FEATURED / UPCOMING DRIVES GRID */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {filteredDrives.map((drive) => {
          const percent = Math.round((drive.registeredCount / drive.targetUnits) * 100)
          return (
            <article
              key={drive.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between overflow-hidden relative group"
            >
              {/* Top Accent Stripe */}
              <div className="h-1.5 bg-[#0284c7] w-full"></div>

              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  {/* Header badges */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      {drive.registrationStatus}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400 font-semibold">{drive.distance}</span>
                  </div>

                  {/* Title & Organization */}
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#0284c7] transition-colors leading-snug">
                    {drive.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 font-medium">{drive.organization}</p>

                  {/* Key Metadata Details */}
                  <div className="mt-4 space-y-2 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#0284c7] text-base shrink-0">calendar_today</span>
                      <span className="font-semibold text-slate-900">{drive.dateDisplay}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#0284c7] text-base shrink-0">schedule</span>
                      <span>{drive.hoursDisplay}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#0284c7] text-base shrink-0">location_on</span>
                      <span className="truncate">{drive.address}</span>
                    </div>
                  </div>

                  {/* Urgent Blood Groups Pill Strip */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs">
                    <span className="text-[11px] text-slate-400 font-semibold">Priority:</span>
                    <div className="flex items-center gap-1">
                      {drive.urgentBloodGroups.map((bg) => (
                        <span
                          key={bg}
                          className="px-1.5 py-0.5 bg-rose-50 text-rose-700 font-bold text-[11px] border border-rose-200 rounded"
                        >
                          {bg}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Mobilization Capacity Bar */}
                <div className="pt-2 border-t border-slate-100 space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500">Mobilisation Capacity</span>
                    <span className="font-bold text-slate-900 font-mono">
                      {drive.registeredCount} / {drive.targetUnits}
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-[#0284c7] h-2 rounded-full transition-all"
                      style={{ width: `${Math.min(percent, 100)}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-slate-400 font-medium">
                    <span>{percent}% mobilized</span>
                    <span className="text-emerald-700 font-semibold">Optimal window open</span>
                  </div>
                </div>

                {/* Action CTA */}
                <div className="pt-2">
                  <button
                    onClick={() => navigate(`/donor/drive/${drive.id}`)}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#0f172a] hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer group-hover:bg-[#0284c7]"
                  >
                    <span>View Details & Register</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
              </div>
            </article>
          )
        })}
      </section>
    </div>
  )
}
