// src/pages/donor/DriveDetails.jsx
import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'

export default function DriveDetails() {
  const { id } = useParams()
  const { drives } = useApp()
  const navigate = useNavigate()

  const drive = drives.find((d) => d.id === id) || drives[0]

  return (
    <div className="space-y-6 pb-12">
      {/* BREADCRUMB */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <button
          onClick={() => navigate('/donor')}
          className="hover:text-[#0284c7] flex items-center gap-1 cursor-pointer"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          <span>Find Drives</span>
        </button>
        <span>/</span>
        <span className="text-slate-900 font-bold truncate">{drive.title}</span>
      </nav>

      {/* HERO / MAIN DRIVE HEADER CARD */}
      <section className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6 relative overflow-hidden">
        {/* Badge Strip */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#e5eeff] text-[#00476e] text-xs font-bold">
            <span className="material-symbols-outlined text-sm text-[#0284c7]">hub</span>
            Civic Mobilisation Portal · Node {drive.node || 'RC-MH-01'}
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Registration Open
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-mono font-bold">
            Code: {drive.code}
          </span>
        </div>

        {/* Headline & CTA */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0f172a] tracking-tight">
              {drive.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Organized by {drive.organization} with local civic units and Red Cross volunteer teams. Advance registration reserves your time window and provides priority reception check-in.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-3 shrink-0">
            <button
              onClick={() => navigate(`/donor/register/${drive.id}`)}
              className="px-6 py-3 rounded-xl bg-[#0f172a] hover:bg-slate-800 text-white text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <span>Register for This Drive</span>
              <span className="material-symbols-outlined text-base text-[#38bdf8]">arrow_forward</span>
            </button>
            <div className="flex items-center gap-2 text-xs">
              <button
                type="button"
                onClick={() => alert(`Drive link copied: ${window.location.href}`)}
                className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">share</span>
                <span>Share Drive</span>
              </button>
              <button
                type="button"
                onClick={() => alert('Calendar event reminder generated for ' + drive.dateDisplay)}
                className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">calendar_add_on</span>
                <span>Add to Calendar</span>
              </button>
            </div>
          </div>
        </div>

        {/* Snapshot Info Grid */}
        <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="flex items-start gap-3 p-3 rounded-xl bg-[#f8fafc] border border-slate-200">
            <span className="material-symbols-outlined text-[#0284c7] text-xl shrink-0 mt-0.5">calendar_today</span>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Date</span>
              <span className="font-bold text-slate-900 text-sm mt-0.5 block">{drive.dateDisplay}</span>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-[#f8fafc] border border-slate-200">
            <span className="material-symbols-outlined text-[#0284c7] text-xl shrink-0 mt-0.5">schedule</span>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Drive Hours</span>
              <span className="font-bold text-slate-900 text-sm mt-0.5 block">{drive.hoursDisplay}</span>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-[#f8fafc] border border-slate-200">
            <span className="material-symbols-outlined text-[#0284c7] text-xl shrink-0 mt-0.5">location_on</span>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Venue</span>
              <span className="font-bold text-slate-900 text-xs mt-0.5 block truncate">{drive.venueName}</span>
              <span className="text-slate-500 text-[11px] block">{drive.address}</span>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-[#f8fafc] border border-slate-200">
            <span className="material-symbols-outlined text-[#0284c7] text-xl shrink-0 mt-0.5">local_parking</span>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Parking</span>
              <span className="font-bold text-slate-900 text-xs mt-0.5 block">{drive.parking}</span>
            </div>
          </div>
        </div>
      </section>

      {/* TWO COLUMN DETAILS LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: WHAT HAPPENS & TIMELINE (7 COLS) */}
        <section className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6">
          <div className="pb-3 border-b border-slate-100">
            <h2 className="text-lg font-bold text-slate-900">What Happens After Registration?</h2>
            <p className="text-xs text-slate-500">Your step-by-step donor journey with RaktSetu</p>
          </div>

          {/* Clean Vertically Numbered Timeline */}
          <div className="space-y-6 relative pl-6 border-l-2 border-slate-200 ml-2">
            <div className="relative">
              <span className="absolute -left-[31px] top-0 w-6 h-6 rounded-full bg-[#0284c7] text-white text-xs font-bold flex items-center justify-center">
                1
              </span>
              <h3 className="font-bold text-sm text-slate-900">Instant QR Donor Pass</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Immediately receive a digital scannable QR pass on your confirmation screen and via WhatsApp/SMS.
              </p>
            </div>

            <div className="relative">
              <span className="absolute -left-[31px] top-0 w-6 h-6 rounded-full bg-[#0284c7] text-white text-xs font-bold flex items-center justify-center">
                2
              </span>
              <h3 className="font-bold text-sm text-slate-900">Smart Hydration & Timing Reminders</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Receive friendly reminder alerts in your preferred regional language (Marathi, Hindi, or English) with parking instructions and pre-donation hydration tips.
              </p>
            </div>

            <div className="relative">
              <span className="absolute -left-[31px] top-0 w-6 h-6 rounded-full bg-[#0284c7] text-white text-xs font-bold flex items-center justify-center">
                3
              </span>
              <h3 className="font-bold text-sm text-slate-900">Fast-Track On-Site QR Check-in</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Show your digital pass to venue volunteers for 5-second contactless check-in, bypassing manual paper queues.
              </p>
            </div>

            <div className="relative">
              <span className="absolute -left-[31px] top-0 w-6 h-6 rounded-full bg-[#0284c7] text-white text-xs font-bold flex items-center justify-center">
                4
              </span>
              <h3 className="font-bold text-sm text-slate-900">Official Clinical Health Screening</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Venue medical officers check your vitals (hemoglobin, blood pressure, weight) and conduct preliminary health clearance before blood donation.
              </p>
            </div>
          </div>
        </section>

        {/* RIGHT COLUMN: SLOTS & MEDICAL JURISDICTION (5 COLS) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Available Arrival Windows */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Available Arrival Windows</h2>
            <div className="space-y-3 text-xs">
              {drive.slots.map((slot) => (
                <div
                  key={slot.id}
                  className="p-3.5 rounded-xl border border-slate-200 bg-[#f8fafc] flex items-center justify-between"
                >
                  <div>
                    <span className="font-bold text-slate-900 block">{slot.label}</span>
                    <span className="text-slate-500 font-mono mt-0.5 block">{slot.time}</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
                    {slot.status}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate(`/donor/register/${drive.id}`)}
              className="w-full py-3 rounded-xl bg-[#0284c7] hover:bg-[#006398] text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer mt-2"
            >
              <span>Proceed to Registration</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>

          {/* Clinical Boundary Notice */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-slate-900 font-bold">
              <span className="material-symbols-outlined text-[#0284c7] text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                health_and_safety
              </span>
              <span>Medical Screening Boundary Notice</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Final donor eligibility and clinical assessments are conducted strictly by certified on-site clinical staff at East Wing Hall. RaktSetu does not provide medical diagnoses or determine clinical eligibility.
            </p>
            <a
              href={drive.screeningUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-[#0284c7] font-bold hover:underline pt-1"
            >
              <span>View Official Screening Information</span>
              <span className="material-symbols-outlined text-sm">open_in_new</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
