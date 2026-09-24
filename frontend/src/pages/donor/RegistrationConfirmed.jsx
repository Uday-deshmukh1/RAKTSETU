// src/pages/donor/RegistrationConfirmed.jsx
import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { QRCodeSVG } from 'qrcode.react'
import { useApp } from '../../context/AppContext'

export default function RegistrationConfirmed() {
  const { id } = useParams()
  const { drives, activeRegistration } = useApp()
  const navigate = useNavigate()

  const drive = drives.find((d) => d.id === id) || drives[0]
  const regId = activeRegistration?.registrationId || 'RF-0248'
  const qrToken = activeRegistration?.qrToken || `RS-DRV-${drive.id}-${regId}-CONFIRMED`

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-16">
      {/* 1. HERO SUCCESS CARD */}
      <section className="bg-white border border-slate-200 shadow-xs rounded-2xl p-6 sm:p-8 text-center relative overflow-hidden">
        {/* Success Icon */}
        <div className="relative mx-auto w-16 h-16 sm:w-20 sm:h-20 mb-4 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-emerald-100 animate-ping opacity-50"></div>
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-600 flex items-center justify-center text-white shadow-md">
            <span className="material-symbols-outlined text-3xl sm:text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              check_circle
            </span>
          </div>
        </div>

        {/* Verification Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold mb-3 border border-emerald-200">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>Official Civic Mobilisation Pass • Verified Registration</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] tracking-tight mb-2">
          Registration Confirmed!
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
          You're successfully registered for the <strong className="text-slate-900">{drive.title}</strong>.
        </p>
      </section>

      {/* 2. CENTRAL QR CHECK-IN PASS CARD */}
      <section className="bg-white border border-slate-200 shadow-xs rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Credential Pass</span>
            <h2 className="text-lg font-bold text-slate-900">Your Fast-Track QR Badge</h2>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e5eeff] text-[#0284c7] border border-[#d3e4fe] text-xs font-bold self-start sm:self-auto">
            <span className="w-2 h-2 rounded-full bg-[#0284c7]"></span>
            <span>Status: Active • Ready to Scan</span>
          </div>
        </div>

        {/* QR Code Graphic with Viewfinder Corner Marks */}
        <div className="flex flex-col items-center">
          <div className="relative p-6 bg-white border-2 border-slate-200 rounded-2xl shadow-inner max-w-xs w-full flex flex-col items-center">
            {/* Corner Markings */}
            <span className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-[#0284c7] rounded-tl"></span>
            <span className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-[#0284c7] rounded-tr"></span>
            <span className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-[#0284c7] rounded-bl"></span>
            <span className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-[#0284c7] rounded-br"></span>

            {/* QR Renderer */}
            <div className="p-3 bg-white rounded-xl shadow-xs">
              <QRCodeSVG
                value={qrToken}
                size={180}
                level="H"
                includeMargin={false}
              />
            </div>

            {/* Registration ID & Pass Details */}
            <div className="mt-4 text-center">
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">REGISTRATION ID</span>
              <div className="text-xl font-extrabold text-slate-900 font-mono tracking-wider">{regId}</div>
              <span className="text-xs text-slate-500 font-semibold block mt-0.5">
                {activeRegistration?.slotWindow || 'Morning Window (9:00 AM – 12:00 PM)'}
              </span>
            </div>
          </div>
        </div>

        {/* Drive Info Summary Table */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">DATE</span>
            <span className="font-bold text-slate-900 block mt-0.5">{drive.dateDisplay}</span>
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">VENUE</span>
            <span className="font-bold text-slate-900 block mt-0.5 truncate">{drive.venueName}</span>
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">CONTACT DESK</span>
            <span className="font-mono text-slate-700 block mt-0.5">{drive.contactDesk || '+91 7122 000111'}</span>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={() => navigate('/donor/my-registration')}
            className="flex-1 py-3 px-4 rounded-xl bg-[#0f172a] hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">badge</span>
            <span>View My Registration Pass</span>
          </button>
          <button
            onClick={() => navigate('/donor')}
            className="flex-1 py-3 px-4 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">search</span>
            <span>Find Another Drive</span>
          </button>
        </div>
      </section>

      {/* 3. WHAT HAPPENS NEXT */}
      <section className="bg-white border border-slate-200 shadow-xs rounded-2xl p-6 space-y-4 text-xs">
        <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider">What Happens Next?</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-slate-600">
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
            <span className="font-bold text-slate-900 block mb-1">1. Keep QR Ready</span>
            <p>Show your QR pass directly from your phone screen or print it for instant entry.</p>
          </div>
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
            <span className="font-bold text-slate-900 block mb-1">2. Stay Hydrated</span>
            <p>Drink plenty of water (500ml) 30 minutes before arrival and have a light meal.</p>
          </div>
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
            <span className="font-bold text-slate-900 block mb-1">3. Clinical Clearance</span>
            <p>On-site medical staff will check your hemoglobin and vitals before donation.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
