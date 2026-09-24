// src/pages/organizer/OrganizerSettings.jsx
import React, { useState } from 'react'

export default function OrganizerSettings() {
  const [saved, setSaved] = useState(false)

  const handleSave = (e) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Settings</h1>
            <span className="px-2 py-0.5 rounded text-[10px] tracking-wider uppercase font-semibold bg-sky-50 text-sky-700 border border-sky-200">
              Nagpur Chapter Hub
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Manage organiser profile, team access, notification gateways, and intelligence model preferences.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-4 py-2 rounded-lg bg-[#0284c7] hover:bg-[#006398] text-white text-xs sm:text-sm font-bold shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <span className="material-symbols-outlined text-base">check</span>
          <span>{saved ? 'Saved Successfully!' : 'Save Changes'}</span>
        </button>
      </div>

      {saved && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <span className="material-symbols-outlined text-emerald-600">check_circle</span>
          <span>Configuration preferences updated across active node RC-MH-01.</span>
        </div>
      )}

      {/* SECTION 1: Organisation Profile */}
      <section className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Organisation Profile</h2>
            <p className="text-xs text-slate-500">Primary details and campaign defaults for this administrative chapter</p>
          </div>
          <span className="material-symbols-outlined text-slate-400">domain</span>
        </div>

        <div className="p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Organisation Legal Title</label>
            <input
              type="text"
              defaultValue="Indian Red Cross Society - Maharashtra Chapter"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-900 focus:border-[#0284c7] outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Administrative Node ID</label>
            <input
              type="text"
              defaultValue="RC-MH-01"
              readOnly
              className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-xs font-mono text-slate-500 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Central Helpdesk Phone</label>
            <input
              type="text"
              defaultValue="+91 7122 554433"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-900 focus:border-[#0284c7] outline-none font-mono"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Primary Operational Headquarters</label>
            <input
              type="text"
              defaultValue="Civil Lines, Nagpur, Maharashtra 440001"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-900 focus:border-[#0284c7] outline-none"
            />
          </div>
        </div>
      </section>

      {/* SECTION 2: Notification & Gateway Channels */}
      <section className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Notification & Messaging Channels</h2>
            <p className="text-xs text-slate-500">Configure messaging providers used by Thompson Sampling dispatch</p>
          </div>
          <span className="material-symbols-outlined text-slate-400">notifications_active</span>
        </div>

        <div className="p-5 sm:p-6 space-y-3 text-xs">
          <label className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 bg-slate-50 cursor-pointer">
            <input type="checkbox" defaultChecked className="mt-0.5 rounded text-[#0284c7] focus:ring-[#0284c7]" />
            <div>
              <span className="font-bold text-slate-900 block">WhatsApp Cloud API (Automated Two-Way Interactive)</span>
              <p className="text-slate-500 text-[11px] mt-0.5">
                Enables instant 1-click confirmation buttons, QR digital pass attachments, and automated language routing.
              </p>
            </div>
          </label>

          <label className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 bg-slate-50 cursor-pointer">
            <input type="checkbox" defaultChecked className="mt-0.5 rounded text-[#0284c7] focus:ring-[#0284c7]" />
            <div>
              <span className="font-bold text-slate-900 block">SMS Gateway Fallback (DND Compliant)</span>
              <p className="text-slate-500 text-[11px] mt-0.5">
                Automatically triggers transactional SMS for donors without active WhatsApp connectivity.
              </p>
            </div>
          </label>
        </div>
      </section>

      {/* SECTION 3: Turnout Intelligence & Privacy Notice */}
      <section className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Safety & Consent Governance</h2>
            <p className="text-xs text-slate-500">Operational principles and statutory data protection</p>
          </div>
          <span className="material-symbols-outlined text-slate-400">shield</span>
        </div>

        <div className="p-5 sm:p-6 space-y-3 text-xs text-slate-600 leading-relaxed">
          <div className="p-3.5 rounded-lg bg-[#f8fafc] border border-slate-200 flex items-start gap-2.5">
            <span className="material-symbols-outlined text-[#0284c7] text-base shrink-0 mt-0.5">verified_user</span>
            <div>
              <strong className="text-slate-900 block font-bold">Zero Clinical Health Record Retention:</strong>
              RaktSetu does not store or process diagnostic blood test reports, infectious disease screening outcomes, or medical vitals. All donor blood groups are administrative reference inputs only.
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-[#f8fafc] border border-slate-200 flex items-start gap-2.5">
            <span className="material-symbols-outlined text-[#0284c7] text-base shrink-0 mt-0.5">policy</span>
            <div>
              <strong className="text-slate-900 block font-bold">Opt-Out & Telemetry Consent:</strong>
              Donors retain the statutory right to withdraw mobilization consent at any time. When a donor opts out, their phone is immediately suppressed from all future bandit exploration waves.
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
