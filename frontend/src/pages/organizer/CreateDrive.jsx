// src/pages/organizer/CreateDrive.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'

export default function CreateDrive() {
  const { addDrive } = useApp()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    title: 'Nagpur East Community Blood Drive',
    date: '2026-10-18',
    startTime: '09:00',
    endTime: '16:00',
    venueName: 'Mahatma Gandhi Community Hall',
    city: 'Nagpur',
    targetUnits: 300,
    screeningUrl: 'https://bloodservice.gov.in/screening-guidelines',
  })

  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const newDrive = addDrive(formData)
    setSubmitted(true)
    setTimeout(() => {
      navigate('/organizer/drives')
    }, 1200)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* BREADCRUMB */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <button
          onClick={() => navigate('/organizer/drives')}
          className="hover:text-[#0284c7] flex items-center gap-1 cursor-pointer"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          <span>Drives</span>
        </button>
        <span>/</span>
        <span className="text-slate-900 font-bold">Create New Drive</span>
      </nav>

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Create New Blood Drive</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Configure community drive parameters, venue logistics, and initial Bayesian turnout targets.
          </p>
        </div>
      </div>

      {submitted && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-bold flex items-center gap-2">
          <span className="material-symbols-outlined text-emerald-600">check_circle</span>
          <span>Blood Drive created successfully! Redirecting to Drives list...</span>
        </div>
      )}

      {/* MAIN FORM CONTAINER */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6">
        {/* SECTION 1: Drive Details */}
        <div className="space-y-4">
          <div className="pb-3 border-b border-slate-100 flex items-center gap-2">
            <span className="material-symbols-outlined text-[#0284c7] text-lg">event_note</span>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Drive Details</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1" htmlFor="driveTitle">
                Drive Name / Title <span className="text-rose-500">*</span>
              </label>
              <input
                id="driveTitle"
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:border-[#0284c7] focus:ring-1 focus:ring-[#0284c7] outline-none"
                placeholder="e.g. Nagpur East Community Blood Drive"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1" htmlFor="driveDate">
                Event Date <span className="text-rose-500">*</span>
              </label>
              <input
                id="driveDate"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:border-[#0284c7] focus:ring-1 focus:ring-[#0284c7] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1" htmlFor="driveTarget">
                Mobilisation Target (Units) <span className="text-rose-500">*</span>
              </label>
              <input
                id="driveTarget"
                type="number"
                min="10"
                max="5000"
                value={formData.targetUnits}
                onChange={(e) => setFormData({ ...formData, targetUnits: e.target.value })}
                required
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm font-mono focus:border-[#0284c7] focus:ring-1 focus:ring-[#0284c7] outline-none"
                placeholder="e.g. 350"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">
                Target registrations represent mobilization targets, NOT clinical capacity limits.
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1" htmlFor="driveStartTime">
                Start Time <span className="text-rose-500">*</span>
              </label>
              <input
                id="driveStartTime"
                type="time"
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                required
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:border-[#0284c7] focus:ring-1 focus:ring-[#0284c7] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1" htmlFor="driveEndTime">
                End Time <span className="text-rose-500">*</span>
              </label>
              <input
                id="driveEndTime"
                type="time"
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                required
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:border-[#0284c7] focus:ring-1 focus:ring-[#0284c7] outline-none"
              />
            </div>
          </div>
        </div>

        {/* SECTION 2: Venue Logistics */}
        <div className="space-y-4 pt-2">
          <div className="pb-3 border-b border-slate-100 flex items-center gap-2">
            <span className="material-symbols-outlined text-[#0284c7] text-lg">pin_drop</span>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Venue & Location</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1" htmlFor="driveVenue">
                Venue Name <span className="text-rose-500">*</span>
              </label>
              <input
                id="driveVenue"
                type="text"
                value={formData.venueName}
                onChange={(e) => setFormData({ ...formData, venueName: e.target.value })}
                required
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:border-[#0284c7] focus:ring-1 focus:ring-[#0284c7] outline-none"
                placeholder="e.g. East Wing Hall, Civil Lines"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1" htmlFor="driveCity">
                City / Region <span className="text-rose-500">*</span>
              </label>
              <input
                id="driveCity"
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                required
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:border-[#0284c7] focus:ring-1 focus:ring-[#0284c7] outline-none"
                placeholder="e.g. Nagpur"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1" htmlFor="driveScreening">
                Official Screening Information URL
              </label>
              <input
                id="driveScreening"
                type="url"
                value={formData.screeningUrl}
                onChange={(e) => setFormData({ ...formData, screeningUrl: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:border-[#0284c7] focus:ring-1 focus:ring-[#0284c7] outline-none"
                placeholder="https://bloodservice.gov.in/screening-guidelines"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">
                Public link shown on donor passes and assistant responses for authoritative medical screening protocols.
              </span>
            </div>
          </div>
        </div>

        {/* CLINICAL BOUNDARY NOTICE CARD */}
        <div className="p-4 rounded-xl bg-[#f8fafc] border border-slate-200 flex items-start gap-3">
          <span className="material-symbols-outlined text-[#0284c7] text-xl shrink-0 mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>
            health_and_safety
          </span>
          <div className="text-xs text-slate-600 leading-relaxed">
            <strong className="text-slate-900 block font-bold mb-0.5">Clinical Boundary Separation Notice:</strong>
            Medical screening, donor vitals, and eligibility clearance are conducted solely by certified on-site clinical officers on drive day. RaktSetu acts strictly as a mobilization, reminder, and turnout prediction platform.
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={() => navigate('/organizer/drives')}
            className="px-4 py-2.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-lg bg-[#0f172a] hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm text-[#38bdf8]">check</span>
            <span>Publish & Schedule Drive</span>
          </button>
        </div>
      </form>
    </div>
  )
}
