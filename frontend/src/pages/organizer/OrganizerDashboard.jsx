// src/pages/organizer/OrganizerDashboard.jsx
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'

export default function OrganizerDashboard() {
  const { activeDrive, donorRoster } = useApp()
  const navigate = useNavigate()

  return (
    <div className="space-y-6">
      {/* 1. ACTIVE CAMPAIGN CONTEXT SUMMARY BAR */}
      <section className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200/90 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#e5eeff] text-[#0284c7] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              sensors
            </span>
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-bold text-sm sm:text-base text-slate-900">
                Event Day Phase: Afternoon Session
              </span>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800">
                Bed Occupancy: 82%
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Live operational sync from East Wing Hall intake terminals • Calibration: Clinical & Weather Normalized
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <div className="text-right">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">AI Intake Cadence</div>
            <div className="text-sm font-bold text-[#0284c7] font-mono">1.8 min / donor check-in</div>
          </div>
          <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>
          <div className="flex items-center gap-2 text-xs text-slate-600 bg-[#f8fafc] px-3 py-1.5 rounded-lg border border-slate-200">
            <span className="material-symbols-outlined text-emerald-600 text-sm">sync</span>
            <span>Predictive Model v3.4 updated 4m ago</span>
          </div>
        </div>
      </section>

      {/* 2. KEY METRICS ROW (5 Cards with Hero Focus on Predicted) */}
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {/* Metric 1: Registered */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Registered</span>
            <span className="material-symbols-outlined text-slate-400 text-lg">how_to_reg</span>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
              {activeDrive?.registeredCount || 500}
            </div>
            <div className="text-xs text-emerald-700 flex items-center gap-1 mt-1 font-semibold">
              <span className="material-symbols-outlined text-xs">trending_up</span>
              <span>Target: 450 (+11.1%)</span>
            </div>
          </div>
        </div>

        {/* Metric 2: Confirmed */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Confirmed</span>
            <span className="material-symbols-outlined text-[#0284c7] text-lg">check_circle</span>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#0284c7] font-mono">
              {activeDrive?.confirmedCount || 382}
            </div>
            <div className="text-xs text-slate-500 mt-1">
              76.4% response • <span className="text-emerald-700 font-semibold">+24 today</span>
            </div>
          </div>
        </div>

        {/* Metric 3: HERO FOCUS - Predicted Attendance */}
        <div className="col-span-2 sm:col-span-1 bg-white p-4 rounded-xl border-2 border-indigo-500 shadow-md relative overflow-hidden flex flex-col justify-between ring-2 ring-indigo-100">
          <div className="absolute top-0 right-0 bg-indigo-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-bl">
            PRIMARY FORECAST
          </div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-extrabold text-indigo-950 uppercase tracking-wider">
                Predicted Turnout
              </span>
              <span className="inline-flex w-2 h-2 rounded-full bg-indigo-600 animate-ping"></span>
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-indigo-950 font-mono">
                {activeDrive?.predictedAttendance || 341}
              </span>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                +8.2% delta
              </span>
            </div>
            <div className="text-xs text-indigo-900 mt-1.5 flex items-center justify-between">
              <span className="font-semibold">Confidence: 87% (High)</span>
              <span className="text-[10px] text-slate-400">Bayesian Posterior</span>
            </div>
          </div>
        </div>

        {/* Metric 4: Actual Attendance */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Actual Attendance</span>
            <span className="material-symbols-outlined text-emerald-600 text-lg">badge</span>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-800 font-mono">
              {activeDrive?.actualAttendance || 327}
            </div>
            <div className="text-xs text-emerald-700 mt-1">
              95.8% of predicted • <span className="font-semibold animate-pulse">In progress</span>
            </div>
          </div>
        </div>

        {/* Metric 5: Prediction Confidence */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Prediction Confidence</span>
            <span className="material-symbols-outlined text-[#0284c7] text-lg">psychology</span>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">87%</div>
            <div className="text-xs text-slate-500 mt-1">
              High precision • <span className="font-mono text-slate-400">±4% error band</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TURNOUT INTELLIGENCE & EXPLAINABLE AI (8:4 SPLIT) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Multi-Line SVG Chart (8 Cols) */}
        <div className="lg:col-span-8 bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-slate-900">Turnout Intelligence</h2>
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                  Continuous AI Forecast
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Real-time attendance trajectory throughout campaign engagement checkpoints
              </p>
            </div>
            <div className="flex items-center gap-3 bg-[#f8fafc] px-3 py-1.5 rounded-lg border border-slate-200">
              <span className="text-xs text-slate-600">
                Last updated: <strong className="text-slate-900 font-mono">4 min ago</strong>
              </span>
              <span className="h-3 w-px bg-slate-300"></span>
              <span className="text-xs font-bold text-indigo-700">341 Expected</span>
            </div>
          </div>

          {/* Interactive Chart Container */}
          <div className="relative w-full pt-4 pb-2">
            {/* Metric Legend */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-4 text-xs font-semibold">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-slate-400"></span>
                <span className="text-slate-600">Registered (500)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#0284c7]"></span>
                <span className="text-slate-900">Confirmed (382)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-indigo-600"></span>
                <span className="text-indigo-950 font-bold">Predicted (341)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-emerald-600"></span>
                <span className="text-emerald-900 font-bold">Actual Checked-In (327)</span>
              </div>
            </div>

            {/* SVG Multi-Line Chart Canvas */}
            <div className="w-full h-56 sm:h-64 relative">
              <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 800 240">
                {/* Grid Lines */}
                <line x1="40" y1="20" x2="780" y2="20" stroke="#E2E8F0" strokeDasharray="3 3" strokeWidth="1" />
                <line x1="40" y1="75" x2="780" y2="75" stroke="#E2E8F0" strokeDasharray="3 3" strokeWidth="1" />
                <line x1="40" y1="130" x2="780" y2="130" stroke="#E2E8F0" strokeDasharray="3 3" strokeWidth="1" />
                <line x1="40" y1="185" x2="780" y2="185" stroke="#E2E8F0" strokeWidth="1" />

                {/* Y-Axis Ticks */}
                <text x="30" y="24" textAnchor="end" fontSize="10" fill="#94A3B8" fontFamily="Plus Jakarta Sans">500</text>
                <text x="30" y="79" textAnchor="end" fontSize="10" fill="#94A3B8" fontFamily="Plus Jakarta Sans">400</text>
                <text x="30" y="134" textAnchor="end" fontSize="10" fill="#94A3B8" fontFamily="Plus Jakarta Sans">300</text>
                <text x="30" y="189" textAnchor="end" fontSize="10" fill="#94A3B8" fontFamily="Plus Jakarta Sans">200</text>

                {/* Confidence Band Polygon Fill */}
                <polygon
                  points="100,135 320,118 540,110 740,102 740,116 540,126 320,136 100,150"
                  fill="#4F46E5"
                  fillOpacity="0.10"
                />

                {/* Line 1: Registered Donors (Slate dashed reference line ~500) */}
                <path d="M 100 22 L 320 22 L 540 22 L 740 22" fill="none" stroke="#94A3B8" strokeDasharray="4 4" strokeWidth="2" />
                <circle cx="100" cy="22" r="3" fill="#94A3B8" />
                <circle cx="320" cy="22" r="3" fill="#94A3B8" />
                <circle cx="540" cy="22" r="3" fill="#94A3B8" />
                <circle cx="740" cy="22" r="4" fill="#94A3B8" />

                {/* Line 2: Confirmed Donors (Blue Step curve from 260 to 382) */}
                <path d="M 100 152 Q 210 130 320 110 T 540 92 T 740 85" fill="none" stroke="#0284C7" strokeWidth="2.5" />
                <circle cx="100" cy="152" r="3" fill="#0284C7" />
                <circle cx="320" cy="110" r="3" fill="#0284C7" />
                <circle cx="540" cy="92" r="3" fill="#0284C7" />
                <circle cx="740" cy="85" r="4" fill="#0284C7" />

                {/* Line 3: Predicted Attendance (Dynamic Indigo Curve 290 -> 315 -> 329 -> 341) */}
                <path d="M 100 142 Q 220 128 320 125 T 540 118 T 740 108" fill="none" stroke="#4F46E5" strokeWidth="3" />
                <circle cx="100" cy="142" r="3.5" fill="#4F46E5" />
                <circle cx="320" cy="125" r="3.5" fill="#4F46E5" />
                <circle cx="540" cy="118" r="3.5" fill="#4F46E5" />
                <circle cx="740" cy="108" r="5" fill="#4F46E5" stroke="#FFFFFF" strokeWidth="2" />

                {/* Line 4: Actual Attendance (Solid Emerald Line tracking to 327) */}
                <path d="M 100 185 Q 260 178 320 160 T 540 135 T 740 115" fill="none" stroke="#059669" strokeWidth="2.5" />
                <circle cx="100" cy="185" r="3" fill="#059669" />
                <circle cx="320" cy="160" r="3" fill="#059669" />
                <circle cx="540" cy="135" r="3" fill="#059669" />
                <circle cx="740" cy="115" r="5" fill="#059669" stroke="#FFFFFF" strokeWidth="2" />

                {/* Vertical Event Day guide */}
                <line x1="740" y1="20" x2="740" y2="185" stroke="#6366F1" strokeDasharray="2 2" strokeWidth="1.5" />
              </svg>
            </div>

            {/* Timeline X-Axis Markers */}
            <div className="grid grid-cols-4 text-center mt-2 pt-2 border-t border-slate-100 text-xs text-slate-500">
              <div>
                <span className="block font-bold text-slate-800">Registration</span>
                <span className="text-[10px] text-slate-400">T-7 Days Initial</span>
              </div>
              <div>
                <span className="block font-bold text-slate-800">Reminder #1</span>
                <span className="text-[10px] text-slate-400">T-48h Delivery</span>
              </div>
              <div>
                <span className="block font-bold text-slate-800">Reminder #2</span>
                <span className="text-[10px] text-slate-400">T-12h Interactive</span>
              </div>
              <div>
                <span className="block font-bold text-indigo-700">Event Day (Live)</span>
                <span className="text-[10px] text-emerald-700 font-semibold">Active Session</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Explainable AI Panel (4 Cols) */}
        <div className="lg:col-span-4 bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <span className="material-symbols-outlined text-indigo-600 text-xl">auto_awesome</span>
              <div>
                <h3 className="font-bold text-sm sm:text-base text-slate-900">Why is turnout changing?</h3>
                <span className="text-[11px] text-slate-400">Intent Engine Attribution Analysis</span>
              </div>
            </div>

            {/* Insight Callout Box */}
            <div className="mt-4 p-3 rounded-lg bg-indigo-50/80 border border-indigo-200">
              <div className="flex gap-2">
                <span className="material-symbols-outlined text-indigo-700 text-base shrink-0 mt-0.5">insights</span>
                <p className="text-xs text-indigo-950 font-medium leading-relaxed">
                  Recent confirmation and reminder engagement are increasing the expected turnout by{' '}
                  <strong className="text-indigo-800 font-bold">+12 attendees</strong> in the 12:00–14:00 window.
                </p>
              </div>
            </div>

            {/* Behavioral Signal Checklist */}
            <div className="mt-4 space-y-2">
              <div className="p-2 rounded-lg bg-[#f8fafc] border border-slate-200 flex items-start gap-2 text-xs">
                <span className="material-symbols-outlined text-emerald-600 text-base shrink-0">check_circle</span>
                <div>
                  <span className="font-bold text-slate-900">382 donors confirmed</span>
                  <p className="text-slate-500 text-[11px]">Strongest positive correlation (+18 est. turnout)</p>
                </div>
              </div>

              <div className="p-2 rounded-lg bg-[#f8fafc] border border-slate-200 flex items-start gap-2 text-xs">
                <span className="material-symbols-outlined text-emerald-600 text-base shrink-0">mark_email_read</span>
                <div>
                  <span className="font-bold text-slate-900">287 opened latest reminder</span>
                  <p className="text-slate-500 text-[11px]">75.1% open rate via WhatsApp notification (+8 est.)</p>
                </div>
              </div>

              <div className="p-2 rounded-lg bg-[#f8fafc] border border-slate-200 flex items-start gap-2 text-xs">
                <span className="material-symbols-outlined text-[#0284c7] text-base shrink-0">reply</span>
                <div>
                  <span className="font-bold text-slate-900">216 explicit time confirmations</span>
                  <p className="text-slate-500 text-[11px]">Direct schedule slot chosen reduces variance to ±2%</p>
                </div>
              </div>

              <div className="p-2 rounded-lg bg-[#f8fafc] border border-slate-200 flex items-start gap-2 text-xs">
                <span className="material-symbols-outlined text-slate-600 text-base shrink-0">history</span>
                <div>
                  <span className="font-bold text-slate-900">174 repeat participants</span>
                  <p className="text-slate-500 text-[11px]">Historical retention index 92% (High stability cohort)</p>
                </div>
              </div>

              {/* Attrition Risk Warning */}
              <div className="p-2 rounded-lg bg-rose-50/70 border border-rose-200 flex items-start gap-2 text-xs">
                <span className="material-symbols-outlined text-rose-600 text-base shrink-0">warning</span>
                <div>
                  <span className="font-bold text-rose-900">43 donors show higher no-show risk</span>
                  <p className="text-rose-800 text-[11px]">Flagged for distance &gt;12km & transit corridor delays</p>
                </div>
              </div>
            </div>
          </div>

          {/* Model Calibration Footer */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span>Model: Beta-Binomial Posterior v3.4</span>
            <span className="font-semibold text-slate-600">Calibrated today</span>
          </div>
        </div>
      </section>

      {/* 4. DONOR ATTENDANCE RISK & RECOMMENDED ACTIONS */}
      <section className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">Donor Attendance Risk Triage</h3>
            <p className="text-xs text-slate-500">Continuous propensity scoring across scheduled cohort</p>
          </div>

          {/* 3 Risk Bucket Summary Pills */}
          <div className="flex items-center gap-2">
            <div className="px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              High: 286 Donors
            </div>
            <div className="px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              Uncertain: 171
            </div>
            <div className="px-2.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500"></span>
              Risk: 43
            </div>
          </div>
        </div>

        {/* Compact Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px] bg-slate-50">
                <th className="py-2.5 px-3">Donor Name & Type</th>
                <th className="py-2.5 px-3">Slot</th>
                <th className="py-2.5 px-3">Confirmation</th>
                <th className="py-2.5 px-3">Engagement</th>
                <th className="py-2.5 px-3">Turnout Prob</th>
                <th className="py-2.5 px-3">Risk Level</th>
                <th className="py-2.5 px-3 text-right">Recommended Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {donorRoster.slice(0, 5).map((donor) => (
                <tr key={donor.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-3">
                    <div className="font-bold text-slate-900">{donor.name}</div>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {donor.bloodGroup} · {donor.type}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-mono text-slate-600">{donor.slot}</td>
                  <td className="py-3 px-3">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold ${
                        donor.confirmationStatus === 'Confirmed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : donor.confirmationStatus === 'Pending'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {donor.confirmationStatus}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-semibold text-slate-700">{donor.engagementLevel}</td>
                  <td className="py-3 px-3">
                    <div className="w-24 bg-slate-200 rounded-full h-1.5 overflow-hidden mb-1">
                      <div
                        className={`h-1.5 rounded-full ${
                          donor.turnoutProb >= 70
                            ? 'bg-emerald-600'
                            : donor.turnoutProb >= 40
                            ? 'bg-amber-500'
                            : 'bg-rose-600'
                        }`}
                        style={{ width: `${donor.turnoutProb}%` }}
                      ></div>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">{donor.turnoutProb}%</span>
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`text-[11px] font-semibold ${
                        donor.riskLevel === 'Low Risk'
                          ? 'text-emerald-700'
                          : donor.riskLevel === 'Uncertain'
                          ? 'text-amber-700'
                          : 'text-rose-700'
                      }`}
                    >
                      {donor.riskLevel}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <span className="text-[11px] text-slate-500 italic">{donor.action}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* View full roster CTA */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="text-slate-500">Showing top 5 of 500 registered donors</span>
          <button
            onClick={() => navigate('/organizer/donors')}
            className="text-[#0284c7] hover:underline font-bold flex items-center gap-1 cursor-pointer"
          >
            <span>View Full Donor CRM</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
      </section>
    </div>
  )
}
