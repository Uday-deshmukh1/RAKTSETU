// src/pages/organizer/QrCheckin.jsx
import React, { useState } from 'react'
import { useApp } from '../../context/AppContext'

export default function QrCheckin() {
  const { checkInDonorByCode } = useApp()

  const [manualInput, setManualInput] = useState('RF-0248')
  const [lastVerifiedDonor, setLastVerifiedDonor] = useState({
    name: 'Rahul Sharma',
    bloodGroup: 'O+',
    registrationId: 'RF-0248',
    checkInTime: '09:42 AM',
    status: 'Checked In · Ground Truth Verified',
  })
  const [cameraActive, setCameraActive] = useState(true)
  const [notification, setNotification] = useState(null)

  const handleVerify = (e) => {
    if (e) e.preventDefault()
    const result = checkInDonorByCode(manualInput)
    if (result.success) {
      setLastVerifiedDonor({
        name: result.donor.name,
        bloodGroup: result.donor.bloodGroup,
        registrationId: result.donor.registrationId,
        checkInTime: result.donor.checkInTime || 'Just now',
        status: 'Checked In · Ground Truth Verified',
      })
      setNotification({
        type: 'success',
        message: `Attendance confirmed for ${result.donor.name} (${result.donor.registrationId})!`,
      })
    } else {
      setNotification({
        type: 'error',
        message: result.message,
      })
    }
  }

  const simulateQuickScan = () => {
    setManualInput('RF-0248')
    handleVerify()
  }

  return (
    <div className="space-y-6">
      {/* 1. CAMPAIGN CONTEXT HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#0284c7] text-2xl">badge</span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              QR Check-in & Attendance
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Verify donor arrival and reconcile predicted vs actual attendance in real time.
          </p>
        </div>

        {/* Campaign Status Badge */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-[#0284c7] text-xs font-bold font-mono">
            <span className="w-2 h-2 rounded-full bg-[#0284c7] animate-ping"></span>
            <span>EVENT DAY INTAKE</span>
          </div>
        </div>
      </div>

      {/* 2. TOP KPIS (4 metric cards in a row) */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-1">
            <span>Expected Attendance</span>
            <span className="material-symbols-outlined text-slate-400 text-base">stacked_bar_chart</span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">341</div>
          <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
            <span className="material-symbols-outlined text-xs text-[#0284c7]">insights</span>
            Bayesian posterior estimate
          </p>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-1">
            <span>Checked In</span>
            <span className="material-symbols-outlined text-[#0284c7] text-base">how_to_reg</span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#0284c7] font-mono">327</div>
          <p className="text-[10px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Verified venue arrivals
          </p>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-1">
            <span>Remaining Expected</span>
            <span className="material-symbols-outlined text-slate-400 text-base">hourglass_top</span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">14</div>
          <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
            <span className="material-symbols-outlined text-xs">schedule</span>
            Pending cohort gap
          </p>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-1">
            <span>Check-in Rate</span>
            <span className="material-symbols-outlined text-[#0284c7] text-base">speed</span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">95.9%</div>
          <p className="text-[10px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
            <span className="material-symbols-outlined text-xs">trending_up</span>
            High predictive fidelity
          </p>
        </div>
      </section>

      {/* 3. MAIN CHECK-IN INTERFACE (2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: QR SCANNER & MANUAL ENTRY (6 Cols) */}
        <section className="lg:col-span-6 bg-white rounded-xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#0284c7] text-xl">camera_rear</span>
              <h2 className="text-base font-bold text-slate-900">Desk QR Scanner</h2>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <span className={`w-2 h-2 rounded-full ${cameraActive ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
              <span>{cameraActive ? 'HD Optical Stream Ready' : 'Camera Paused'}</span>
            </div>
          </div>

          {/* Scanner Viewfinder Box */}
          <div className="relative w-full aspect-video sm:aspect-[4/3] rounded-xl bg-[#0f172a] overflow-hidden flex flex-col items-center justify-center border border-slate-800 select-none">
            {/* Corner Target Crosshairs */}
            <div className="absolute top-4 left-4 w-7 h-7 border-t-2 border-l-2 border-[#38bdf8] rounded-tl pointer-events-none"></div>
            <div className="absolute top-4 right-4 w-7 h-7 border-t-2 border-r-2 border-[#38bdf8] rounded-tr pointer-events-none"></div>
            <div className="absolute bottom-4 left-4 w-7 h-7 border-b-2 border-l-2 border-[#38bdf8] rounded-bl pointer-events-none"></div>
            <div className="absolute bottom-4 right-4 w-7 h-7 border-b-2 border-r-2 border-[#38bdf8] rounded-br pointer-events-none"></div>

            {/* Animated Laser Line */}
            {cameraActive && <div className="scanner-line"></div>}

            {/* Viewfinder Center Reticle */}
            <div className="w-44 h-44 rounded-xl border border-sky-400/30 flex flex-col items-center justify-center p-4 bg-slate-900/60 backdrop-blur-[2px] pointer-events-none">
              <span className="material-symbols-outlined text-[#38bdf8] text-4xl mb-1 opacity-80">qr_code_2</span>
              <span className="text-[10px] font-bold text-sky-200 text-center uppercase tracking-wider">
                POSITION QR CODE IN FRAME
              </span>
            </div>

            {/* Helper Banner */}
            <div className="absolute bottom-3 inset-x-4 text-center">
              <p className="text-[11px] text-slate-300 bg-slate-900/80 py-1 px-3 rounded-full backdrop-blur-sm border border-slate-700/60 inline-block">
                Align digital donor pass or printed registration badge within frame
              </p>
            </div>
          </div>

          {/* Scanner Hardware Controls */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <button
              onClick={() => setCameraActive(!cameraActive)}
              className="py-2.5 px-3 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-base text-[#0284c7]">
                {cameraActive ? 'videocam_off' : 'videocam'}
              </span>
              <span>{cameraActive ? 'Pause Camera' : 'Start Camera'}</span>
            </button>

            <button
              onClick={simulateQuickScan}
              className="py-2.5 px-3 rounded-lg bg-[#0284c7] hover:bg-[#006398] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">qr_code_scanner</span>
              <span>Simulate Scan Pass</span>
            </button>
          </div>

          {/* Manual ID Input Fallback */}
          <form onSubmit={handleVerify} className="pt-3 border-t border-slate-100 space-y-2">
            <label className="block text-xs font-bold text-slate-700" htmlFor="manual-reg-id">
              Manual Registration ID Fallback
            </label>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-base">
                  pin
                </span>
                <input
                  id="manual-reg-id"
                  type="text"
                  value={manualInput}
                  onChange={(e) => setManualInput(e.target.value)}
                  placeholder="e.g. RF-0248"
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono text-slate-900 focus:bg-white focus:border-[#0284c7] outline-none"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-[#0f172a] hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer shrink-0"
              >
                Verify ID
              </button>
            </div>
          </form>

          {notification && (
            <div
              className={`p-3 rounded-lg text-xs font-semibold flex items-center gap-2 ${
                notification.type === 'success'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-rose-50 text-rose-800 border border-rose-200'
              }`}
            >
              <span className="material-symbols-outlined text-base">
                {notification.type === 'success' ? 'check_circle' : 'error'}
              </span>
              <span>{notification.message}</span>
            </div>
          )}
        </section>

        {/* RIGHT COLUMN: DONOR RESULT & RECONCILIATION (6 Cols) */}
        <div className="lg:col-span-6 space-y-5">
          {/* Check-in Result Card */}
          <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4">
            {/* Green confirmation header */}
            <div className="flex items-center gap-2.5 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900">
              <span className="material-symbols-outlined text-emerald-600 text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                check_circle
              </span>
              <span className="text-xs font-bold">Attendance recorded successfully</span>
            </div>

            {/* Donor Verified Details */}
            <div className="space-y-3 pt-1">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{lastVerifiedDonor.name}</h3>
                  <p className="text-xs text-slate-500">Verified Citizen Donor Record</p>
                </div>
                <div className="flex flex-col items-center">
                  <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-300 font-mono font-bold text-sm text-slate-900">
                    {lastVerifiedDonor.bloodGroup}
                  </span>
                  <span className="text-[10px] text-slate-400 mt-0.5">Self-reported</span>
                </div>
              </div>

              {/* Key Verification Attributes */}
              <div className="grid grid-cols-2 gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    REGISTRATION ID
                  </span>
                  <p className="font-mono text-sm font-bold text-slate-900 mt-0.5">
                    {lastVerifiedDonor.registrationId}
                  </p>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    CHECK-IN TIME
                  </span>
                  <p className="font-mono text-sm font-bold text-slate-900 mt-0.5">
                    {lastVerifiedDonor.checkInTime}
                  </p>
                </div>

                <div className="col-span-2 pt-2 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    ATTENDANCE STATUS
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-bold bg-[#e5eeff] text-[#0284c7]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7]"></span>
                    {lastVerifiedDonor.status}
                  </span>
                </div>
              </div>

              {/* Strict Product Boundary Notice */}
              <div className="p-3 rounded-lg bg-[#f8fafc] border border-slate-200 flex items-start gap-2.5 text-xs text-slate-600">
                <span className="material-symbols-outlined text-[#0284c7] text-base shrink-0 mt-0.5">policy</span>
                <p className="leading-relaxed">
                  <strong className="text-slate-900 font-bold">Administrative boundary note:</strong> Attendance verified. Medical screening and vitals remain strictly under the purview of certified on-site clinical staff.
                </p>
              </div>
            </div>
          </div>

          {/* Attendance Reconciliation Card */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#0284c7]">balance</span>
                <h3 className="text-sm font-bold text-slate-900">Attendance Reconciliation</h3>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-700">CONVERGED 95.9%</span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">PREDICTED</span>
                <span className="text-base font-extrabold text-slate-900 font-mono mt-0.5 block">341</span>
              </div>
              <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200">
                <span className="text-[10px] text-emerald-800 uppercase font-bold block">CHECKED IN</span>
                <span className="text-base font-extrabold text-emerald-800 font-mono mt-0.5 block">327</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">REMAINING</span>
                <span className="text-base font-extrabold text-amber-700 font-mono mt-0.5 block">14</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
