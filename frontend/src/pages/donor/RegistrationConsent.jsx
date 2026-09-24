// src/pages/donor/RegistrationConsent.jsx
import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'

export default function RegistrationConsent() {
  const { id } = useParams()
  const { drives, registerForDrive } = useApp()
  const navigate = useNavigate()

  const drive = drives.find((d) => d.id === id) || drives[0]

  const [slotWindow, setSlotWindow] = useState('Morning Window (9:00 AM – 12:00 PM)')
  const [formData, setFormData] = useState({
    fullName: 'Rahul Sharma',
    mobileNumber: '+91 98765 43210',
    emailAddress: 'rahul.sharma@example.com',
    bloodGroup: 'O+',
  })

  const [notificationChannels, setNotificationChannels] = useState({
    whatsapp: true,
    sms: true,
    email: true,
  })

  const [currentDriveConsent, setCurrentDriveConsent] = useState(true)
  const [futureConsent, setFutureConsent] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!currentDriveConsent) {
      setErrorMessage('Please accept the mandatory current-drive mobilization consent to proceed.')
      return
    }

    const reg = registerForDrive({
      driveId: drive.id,
      slotLabel: slotWindow,
      donorDetails: formData,
    })

    navigate(`/donor/confirmed/${drive.id}`)
  }

  return (
    <div className="space-y-6 pb-12">
      {/* BREADCRUMB & PROGRESS STEPPER */}
      <div className="space-y-3">
        <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <button onClick={() => navigate('/donor')} className="hover:text-[#0284c7] cursor-pointer">
            Find Drives
          </button>
          <span>/</span>
          <button onClick={() => navigate(`/donor/drive/${drive.id}`)} className="hover:text-[#0284c7] cursor-pointer">
            Drive Details
          </button>
          <span>/</span>
          <span className="text-slate-900 font-bold">Registration & Consent</span>
        </nav>

        {/* 3-Step Progress Indicator */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-xl text-xs pt-1">
          <div className="flex flex-col border-t-2 border-[#0284c7] pt-2">
            <span className="font-bold text-[#0284c7] flex items-center gap-1">
              <span className="w-4 h-4 rounded-full bg-[#0284c7] text-white text-[10px] flex items-center justify-center">
                1
              </span>
              <span>Registration</span>
            </span>
            <span className="text-[11px] text-slate-400">Contact details</span>
          </div>

          <div className="flex flex-col border-t-2 border-[#0284c7] pt-2">
            <span className="font-bold text-[#0284c7] flex items-center gap-1">
              <span className="w-4 h-4 rounded-full bg-[#0284c7] text-white text-[10px] flex items-center justify-center">
                2
              </span>
              <span>Consent</span>
            </span>
            <span className="text-[11px] text-slate-400">Preferences & Notice</span>
          </div>

          <div className="flex flex-col border-t-2 border-slate-200 pt-2 opacity-60">
            <span className="font-bold text-slate-400 flex items-center gap-1">
              <span className="w-4 h-4 rounded-full bg-slate-200 text-slate-600 text-[10px] flex items-center justify-center">
                3
              </span>
              <span>Confirmation</span>
            </span>
            <span className="text-[11px] text-slate-400">Digital QR pass</span>
          </div>
        </div>
      </div>

      {/* MAIN TWO-COLUMN FORM LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: REGISTRATION FORM (8 COLS) */}
        <div className="lg:col-span-8 space-y-6">
          <div>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#e5eeff] text-[#00476e] text-xs font-bold mb-2">
              <span className="material-symbols-outlined text-sm text-[#0284c7]">local_hospital</span>
              Civic Mobilisation Pass
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Register for {drive.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Enter your contact details to reserve your mobilization arrival window and receive your digital venue pass.
            </p>
          </div>

          {errorMessage && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">error</span>
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Drive & Arrival Window Selection Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between pb-3 border-b border-slate-100 gap-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#0284c7] text-lg">event</span>
                <span className="text-xs font-bold text-slate-900">{drive.dateDisplay}</span>
              </div>
              <span className="text-xs text-slate-500 font-mono">{drive.venueName}</span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-2">Select Target Arrival Window</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <label
                  onClick={() => setSlotWindow('Morning Window (9:00 AM – 12:00 PM)')}
                  className={`flex items-center justify-between p-3.5 rounded-xl border-2 transition-all cursor-pointer ${
                    slotWindow.includes('Morning')
                      ? 'border-[#0284c7] bg-[#f0f7ff]'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="slot"
                      checked={slotWindow.includes('Morning')}
                      onChange={() => setSlotWindow('Morning Window (9:00 AM – 12:00 PM)')}
                      className="text-[#0284c7] focus:ring-[#0284c7]"
                    />
                    <div>
                      <span className="font-bold text-slate-900 block">Morning Window</span>
                      <span className="text-slate-500 font-mono text-[11px]">9:00 AM – 12:00 PM</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#cce5ff] text-[#00476e]">Optimal</span>
                </label>

                <label
                  onClick={() => setSlotWindow('Afternoon Window (12:00 PM – 4:00 PM)')}
                  className={`flex items-center justify-between p-3.5 rounded-xl border-2 transition-all cursor-pointer ${
                    slotWindow.includes('Afternoon')
                      ? 'border-[#0284c7] bg-[#f0f7ff]'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="slot"
                      checked={slotWindow.includes('Afternoon')}
                      onChange={() => setSlotWindow('Afternoon Window (12:00 PM – 4:00 PM)')}
                      className="text-[#0284c7] focus:ring-[#0284c7]"
                    />
                    <div>
                      <span className="font-bold text-slate-900 block">Afternoon Window</span>
                      <span className="text-slate-500 font-mono text-[11px]">12:00 PM – 4:00 PM</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-600">
                    Available
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Form Inputs Card */}
          <form id="regForm" onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6 space-y-4">
            <div className="pb-3 border-b border-slate-100 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#0284c7] text-lg">person</span>
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Donor Information</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="sm:col-span-2">
                <label className="block font-bold text-slate-700 mb-1" htmlFor="fullName">
                  Full Legal Name <span className="text-rose-500">*</span>
                </label>
                <input
                  id="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:border-[#0284c7] outline-none"
                  placeholder="e.g. Rahul Sharma"
                />
                <span className="text-[10px] text-slate-400 mt-0.5 block">
                  Must match an official government photo ID shown at check-in.
                </span>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1" htmlFor="mobileNumber">
                  Mobile Number <span className="text-rose-500">*</span>
                </label>
                <input
                  id="mobileNumber"
                  type="tel"
                  value={formData.mobileNumber}
                  onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                  required
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs font-mono focus:border-[#0284c7] outline-none"
                  placeholder="+91 98765 43210"
                />
                <span className="text-[10px] text-slate-400 mt-0.5 block">
                  Used for QR pass delivery and time-sensitive reminders.
                </span>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1" htmlFor="emailAddress">
                  Email Address
                </label>
                <input
                  id="emailAddress"
                  type="email"
                  value={formData.emailAddress}
                  onChange={(e) => setFormData({ ...formData, emailAddress: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:border-[#0284c7] outline-none"
                  placeholder="rahul.sharma@example.com"
                />
                <span className="text-[10px] text-slate-400 mt-0.5 block">Sends digital pass receipt.</span>
              </div>

              <div className="sm:col-span-2">
                <div className="flex items-center justify-between mb-1">
                  <label className="font-bold text-slate-700" htmlFor="bloodGroup">
                    Self-Reported Blood Group
                  </label>
                  <span className="text-[11px] text-slate-400 italic">Reference information only</span>
                </div>
                <select
                  id="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs font-medium focus:border-[#0284c7] outline-none cursor-pointer"
                >
                  <option value="O+">O Positive (O+)</option>
                  <option value="O-">O Negative (O-) - Rare</option>
                  <option value="A+">A Positive (A+)</option>
                  <option value="A-">A Negative (A-)</option>
                  <option value="B+">B Positive (B+)</option>
                  <option value="B-">B Negative (B-) - Rare</option>
                  <option value="AB+">AB Positive (AB+)</option>
                  <option value="AB-">AB Negative (AB-) - Rare</option>
                  <option value="UNKNOWN">I don't know / First-time donor</option>
                </select>
                <span className="text-[10px] text-slate-400 mt-1 block flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs text-[#0284c7]">info</span>
                  Administrative reference only. Certified blood grouping is verified at the clinical desk.
                </span>
              </div>
            </div>
          </form>

          {/* Communication Preferences & Consent */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6 space-y-5">
            <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Communication Preferences & Consent
              </h2>
              <span className="material-symbols-outlined text-[#0284c7]">mark_chat_read</span>
            </div>

            {/* Channels */}
            <div className="space-y-2 text-xs">
              <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 bg-[#f8fafc] cursor-pointer">
                <input
                  type="checkbox"
                  checked={notificationChannels.whatsapp}
                  onChange={(e) =>
                    setNotificationChannels({ ...notificationChannels, whatsapp: e.target.checked })
                  }
                  className="mt-0.5 rounded text-[#0284c7] focus:ring-[#0284c7]"
                />
                <div className="flex-1">
                  <span className="font-bold text-slate-900 flex items-center gap-2">
                    <span>WhatsApp Dispatch</span>
                    <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-[#cce5ff] text-[#00476e]">
                      Recommended
                    </span>
                  </span>
                  <p className="text-slate-500 text-[11px] mt-0.5">
                    Instant QR pass delivery, hydration reminders, and venue entrance routing.
                  </p>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 bg-[#f8fafc] cursor-pointer">
                <input
                  type="checkbox"
                  checked={notificationChannels.sms}
                  onChange={(e) =>
                    setNotificationChannels({ ...notificationChannels, sms: e.target.checked })
                  }
                  className="mt-0.5 rounded text-[#0284c7] focus:ring-[#0284c7]"
                />
                <div className="flex-1">
                  <span className="font-bold text-slate-900 block">SMS Notifications</span>
                  <p className="text-slate-500 text-[11px] mt-0.5">Standard text backup for arrival alerts.</p>
                </div>
              </label>
            </div>

            {/* Explicit Separate Consent Controls */}
            <div className="pt-3 border-t border-slate-100 space-y-3 text-xs">
              {/* Mandatory Current Drive Consent */}
              <label className="flex items-start gap-3 p-3 rounded-xl bg-sky-50/70 border border-sky-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={currentDriveConsent}
                  onChange={(e) => setCurrentDriveConsent(e.target.checked)}
                  required
                  className="mt-0.5 rounded text-[#0284c7] focus:ring-[#0284c7]"
                />
                <div>
                  <span className="font-bold text-slate-900 block">
                    Current-drive consent <span className="text-rose-600">*</span>
                  </span>
                  <p className="text-slate-600 text-[11px] mt-0.5">
                    Allow RaktSetu to send registration confirmations, event reminders, and arrival updates for this specific drive.
                  </p>
                </div>
              </label>

              {/* Optional Future Drive Communication */}
              <label className="flex items-start gap-3 p-3 rounded-xl border border-dashed border-slate-300 bg-slate-50/50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={futureConsent}
                  onChange={(e) => setFutureConsent(e.target.checked)}
                  className="mt-0.5 rounded text-[#0284c7] focus:ring-[#0284c7]"
                />
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-bold text-slate-900">Future-drive communication</span>
                    <span className="px-1.5 py-0.2 rounded text-[10px] bg-slate-200 text-slate-600 uppercase font-bold">
                      Optional
                    </span>
                  </div>
                  <p className="text-slate-500 text-[11px]">
                    I would like to receive information about future community blood donation drives in Nagpur. (You can opt out at any time).
                  </p>
                  <p className="text-[10px] text-slate-400 italic mt-0.5">
                    Note: Opting out or leaving this unchecked does not affect your registration for today's drive.
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Medical Notice Card */}
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex items-start gap-3 text-xs">
            <span className="material-symbols-outlined text-[#0284c7] text-xl shrink-0 mt-0.5">health_and_safety</span>
            <div className="space-y-1">
              <h3 className="font-bold text-slate-900">Medical Screening & Eligibility Notice</h3>
              <p className="text-slate-600 leading-relaxed">
                Final eligibility and medical screening are conducted by authorised medical staff at the donation venue. RaktSetu does not determine medical eligibility, assess clinical health status, or store clinical medical records.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: REGISTRATION SUMMARY & SUBMIT (4 COLS) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-5 sticky top-20 text-xs">
            <div className="pb-3 border-b border-slate-100">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Reservation Summary</span>
              <h3 className="font-bold text-sm text-slate-900 mt-0.5">{drive.title}</h3>
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-slate-400 text-[11px] block">Selected Slot</span>
                <span className="font-bold text-slate-900 text-xs block mt-0.5">{slotWindow}</span>
              </div>

              <div>
                <span className="text-slate-400 text-[11px] block">Venue Address</span>
                <span className="font-medium text-slate-800 text-xs block mt-0.5">{drive.address}</span>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <span className="text-slate-400 text-[11px] block">Pass Delivery</span>
                <span className="font-bold text-[#0284c7] text-xs block mt-0.5">Instant Digital QR Badge</span>
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-3 border-t border-slate-100 space-y-2">
              <button
                type="submit"
                form="regForm"
                className="w-full py-3 px-4 rounded-xl bg-[#0f172a] hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Confirm & Generate QR Pass</span>
                <span className="material-symbols-outlined text-sm text-[#38bdf8]">arrow_forward</span>
              </button>
              <p className="text-[10px] text-slate-400 text-center">
                Instant digital receipt generated with zero clinical data retention.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
