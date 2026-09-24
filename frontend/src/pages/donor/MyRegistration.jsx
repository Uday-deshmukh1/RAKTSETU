// src/pages/donor/MyRegistration.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { QRCodeSVG } from 'qrcode.react'
import { useApp } from '../../context/AppContext'

export default function MyRegistration() {
  const { activeRegistration, cancelActiveRegistration } = useApp()
  const navigate = useNavigate()
  const [showCancelModal, setShowCancelModal] = useState(false)

  if (!activeRegistration) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-[#e5eeff] text-[#0284c7] flex items-center justify-center mx-auto shadow-xs">
          <span className="material-symbols-outlined text-3xl">event_busy</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900">No Active Registration Found</h2>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          You are currently not registered for any upcoming blood donation drives. Browse available community drives in your area to reserve your pass.
        </p>
        <button
          onClick={() => navigate('/donor')}
          className="px-5 py-2.5 rounded-xl bg-[#0284c7] hover:bg-[#006398] text-white text-xs font-bold transition-all shadow-xs inline-flex items-center gap-2 cursor-pointer"
        >
          <span className="material-symbols-outlined text-base">search</span>
          <span>Find a Blood Drive</span>
        </button>
      </div>
    )
  }

  const handleConfirmCancel = () => {
    cancelActiveRegistration()
    setShowCancelModal(false)
  }

  return (
    <div className="space-y-6 pb-16">
      {/* CANCEL CONFIRMATION MODAL */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl border border-slate-200">
            <div className="flex items-center gap-3 text-rose-600">
              <span className="material-symbols-outlined text-2xl">warning</span>
              <h3 className="font-bold text-lg text-slate-900">Cancel Registration?</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Are you sure you want to cancel your registration pass for the <strong>{activeRegistration.driveTitle}</strong>? Your reserved arrival window will be released to other donors.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowCancelModal(false)}
                className="px-4 py-2 rounded-lg border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 cursor-pointer"
              >
                Keep Registration
              </button>
              <button
                type="button"
                onClick={handleConfirmCancel}
                className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold cursor-pointer"
              >
                Yes, Cancel Pass
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HEADER & ACTIONS */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">My Registration</h1>
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                activeRegistration.checkedIn
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-sky-50 text-[#0284c7] border border-sky-200'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  activeRegistration.checkedIn ? 'bg-emerald-500' : 'bg-[#0284c7] animate-pulse'
                }`}
              ></span>
              <span>{activeRegistration.checkedIn ? 'CHECKED IN • VERIFIED' : 'CONFIRMED • ACTIVE'}</span>
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            View your upcoming donation drive pass, QR code, communication preferences, and attendance status.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="px-3.5 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">print</span>
            <span>Print Receipt</span>
          </button>
          <button
            onClick={() => setShowCancelModal(true)}
            className="px-3.5 py-2 rounded-lg border border-rose-200 hover:bg-rose-50 text-rose-700 text-xs font-semibold transition-colors cursor-pointer"
          >
            Cancel Pass
          </button>
        </div>
      </div>

      {/* 4-STEP LIFECYCLE PROGRESSION BAR */}
      <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-xs">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {/* Step 1: Registered */}
          <div className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-50 border border-slate-200">
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-base">check</span>
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-bold text-emerald-700 uppercase">STEP 1</p>
              <p className="text-xs font-bold text-slate-900 truncate">Registered</p>
              <p className="text-[11px] text-slate-500 truncate">Slot Booked</p>
            </div>
          </div>

          {/* Step 2: Confirmed */}
          <div className="flex items-center gap-3 p-2.5 rounded-lg bg-white border-2 border-[#0284c7] shadow-xs">
            <div className="relative w-8 h-8 rounded-full bg-[#0284c7] text-white flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-base">event_available</span>
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white animate-ping"></span>
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-bold text-[#0284c7] uppercase">CURRENT</p>
              <p className="text-xs font-bold text-slate-900 truncate">Confirmed</p>
              <p className="text-[11px] text-[#0284c7] font-semibold truncate">Arrival Allocated</p>
            </div>
          </div>

          {/* Step 3: Event Day */}
          <div className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-50 border border-slate-200">
            <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 text-xs font-bold">
              3
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-bold text-slate-400 uppercase">UPCOMING</p>
              <p className="text-xs font-bold text-slate-900 truncate">Event Day</p>
              <p className="text-[11px] text-slate-500 truncate">26 Sep 2026</p>
            </div>
          </div>

          {/* Step 4: Attended */}
          <div
            className={`flex items-center gap-3 p-2.5 rounded-lg border ${
              activeRegistration.checkedIn
                ? 'bg-emerald-50 border-emerald-300'
                : 'bg-slate-50 border-slate-200 opacity-60'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                activeRegistration.checkedIn ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'
              }`}
            >
              {activeRegistration.checkedIn ? (
                <span className="material-symbols-outlined text-base">check</span>
              ) : (
                '4'
              )}
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-bold text-slate-400 uppercase">CHECK-IN</p>
              <p className="text-xs font-bold text-slate-900 truncate">
                {activeRegistration.checkedIn ? 'Attended' : 'Pending Intake'}
              </p>
              <p className="text-[11px] text-slate-500 truncate">
                {activeRegistration.checkedIn ? activeRegistration.checkInTime : 'QR Scan required'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* TWO-COLUMN DETAILS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: DIGITAL QR PASS (5 COLS) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-xs p-6 flex flex-col items-center text-center space-y-4">
          <div className="w-full flex items-center justify-between pb-3 border-b border-slate-100 text-left">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Verified Pass</span>
              <h2 className="text-base font-bold text-slate-900">Fast-Track Entry QR</h2>
            </div>
            <span className="material-symbols-outlined text-[#0284c7]">qr_code_2</span>
          </div>

          {/* QR Viewfinder */}
          <div className="relative p-5 bg-white border-2 border-slate-200 rounded-2xl shadow-inner max-w-xs w-full flex flex-col items-center">
            <span className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-[#0284c7] rounded-tl"></span>
            <span className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-[#0284c7] rounded-tr"></span>
            <span className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-[#0284c7] rounded-bl"></span>
            <span className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-[#0284c7] rounded-br"></span>

            <div className="p-3 bg-white rounded-xl">
              <QRCodeSVG
                value={activeRegistration.qrToken}
                size={170}
                level="H"
                includeMargin={false}
              />
            </div>

            <div className="mt-3">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block">PASS ID</span>
              <span className="text-xl font-extrabold text-slate-900 font-mono tracking-wider">
                {activeRegistration.registrationId}
              </span>
              <span className="text-xs font-semibold text-[#0284c7] block mt-0.5">
                {activeRegistration.donorName}
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
            Show this scannable badge to the welcome desk volunteer at East Wing Hall for instantaneous check-in.
          </p>
        </div>

        {/* RIGHT COLUMN: DRIVE DETAILS & REMINDER SETTINGS (7 COLS) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Drive Snapshot Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
            <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900">Drive & Slot Information</h2>
              <span className="text-xs font-mono text-slate-400">Node RC-MH-01</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Drive Event</span>
                <span className="font-bold text-slate-900 text-sm mt-0.5 block">{activeRegistration.driveTitle}</span>
              </div>

              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Allocated Slot Window</span>
                <span className="font-bold text-[#0284c7] text-sm mt-0.5 block font-mono">
                  {activeRegistration.slotWindow}
                </span>
              </div>

              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Venue Address</span>
                <span className="font-medium text-slate-800 text-xs mt-0.5 block">{activeRegistration.venue}</span>
              </div>

              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Self-Reported Blood Group</span>
                <span className="font-mono font-bold text-slate-900 text-xs mt-0.5 block">
                  {activeRegistration.bloodGroup} (Administrative reference)
                </span>
              </div>
            </div>
          </div>

          {/* Smart Reminders Status Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-3 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#0284c7]">notifications_active</span>
                <h2 className="text-base font-bold text-slate-900">Communication & Reminders</h2>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold">
                Active Delivery
              </span>
            </div>

            <p className="text-slate-600 leading-relaxed">
              Personalized reminders are configured for <strong>{activeRegistration.donorPhone}</strong> via WhatsApp and SMS in Marathi and English.
            </p>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-500">
              Upcoming: Hydration reminder at T-24h (Friday evening) and venue GPS routing on Saturday morning.
            </div>
          </div>

          {/* Medical Notice */}
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex items-start gap-3 text-xs text-slate-600">
            <span className="material-symbols-outlined text-[#0284c7] text-xl shrink-0 mt-0.5">health_and_safety</span>
            <div>
              <strong className="text-slate-900 font-bold block mb-0.5">Medical Screening & Jurisdiction Notice:</strong>
              RaktSetu does not evaluate clinical eligibility or store medical diagnostic reports. Your vitals and screening will be completed by certified clinicians at the venue desk.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
