// src/pages/organizer/Analytics.jsx
import React from 'react'

export default function Analytics() {
  return (
    <div className="space-y-6">
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Analytics</h1>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold font-mono">
              POST-CAMPAIGN RECONCILIATION
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Measure campaign engagement, turnout performance, and prediction accuracy across donor segments.
          </p>
        </div>

        <button
          onClick={() => alert('📊 Exporting Full Campaign Reconciliation Report (PDF)...')}
          className="px-3.5 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-sm text-[#0284c7]">picture_as_pdf</span>
          <span>Download Report</span>
        </button>
      </div>

      {/* 5 KPI CARDS */}
      <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Registered</span>
          <span className="text-2xl font-extrabold text-slate-900 font-mono mt-1 block">500</span>
          <span className="text-xs text-slate-500 mt-0.5 block truncate">Target: 450</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Confirmed</span>
          <span className="text-2xl font-extrabold text-[#0284c7] font-mono mt-1 block">382</span>
          <span className="text-xs text-emerald-700 font-semibold mt-0.5 block truncate">76.4% rate</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Predicted</span>
          <span className="text-2xl font-extrabold text-indigo-950 font-mono mt-1 block">341</span>
          <span className="text-xs text-slate-500 mt-0.5 block truncate">Bayesian peak</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Actual Turnout</span>
          <span className="text-2xl font-extrabold text-emerald-800 font-mono mt-1 block">327</span>
          <span className="text-xs text-emerald-700 font-semibold mt-0.5 block truncate">95.9% of pred</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Variance Error</span>
          <span className="text-2xl font-extrabold text-amber-800 font-mono mt-1 block">14</span>
          <span className="text-xs text-slate-500 mt-0.5 block truncate">donors gap</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs col-span-2 sm:col-span-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Error Rate</span>
          <span className="text-2xl font-extrabold text-emerald-800 font-mono mt-1 block">4.1%</span>
          <span className="text-xs text-slate-500 mt-0.5 block truncate">Calibrated precision</span>
        </div>
      </section>

      {/* CHARTS GRID (8:4 SPLIT) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: PREDICTED VS ACTUAL PROGRESSION (8 COLS) */}
        <section className="lg:col-span-8 bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-wrap items-center justify-between pb-3 border-b border-slate-100 gap-2">
            <div>
              <h2 className="text-base font-bold text-slate-900">Predicted vs Actual Turnout Reconciliation</h2>
              <p className="text-xs text-slate-500">Hourly check-in trajectory compared against Bayesian forecast bounds</p>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold">
              Live Venue Reconciled
            </span>
          </div>

          {/* SVG Hourly Trajectory Chart */}
          <div className="w-full h-64 relative pt-2">
            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 700 220">
              {/* Grid Lines */}
              <line x1="30" y1="20" x2="680" y2="20" stroke="#E2E8F0" strokeDasharray="3 3" strokeWidth="1" />
              <line x1="30" y1="70" x2="680" y2="70" stroke="#E2E8F0" strokeDasharray="3 3" strokeWidth="1" />
              <line x1="30" y1="120" x2="680" y2="120" stroke="#E2E8F0" strokeDasharray="3 3" strokeWidth="1" />
              <line x1="30" y1="170" x2="680" y2="170" stroke="#E2E8F0" strokeWidth="1" />

              {/* Y Ticks */}
              <text x="24" y="24" textAnchor="end" fontSize="10" fill="#94A3B8">350</text>
              <text x="24" y="74" textAnchor="end" fontSize="10" fill="#94A3B8">250</text>
              <text x="24" y="124" textAnchor="end" fontSize="10" fill="#94A3B8">150</text>
              <text x="24" y="174" textAnchor="end" fontSize="10" fill="#94A3B8">50</text>

              {/* Predicted Path (Indigo dashed) */}
              <path
                d="M 60 170 Q 200 130 350 90 T 500 50 T 650 30"
                fill="none"
                stroke="#4F46E5"
                strokeWidth="2.5"
                strokeDasharray="4 4"
              />

              {/* Actual Path (Emerald solid) */}
              <path
                d="M 60 170 Q 200 140 350 100 T 500 62 T 650 40"
                fill="none"
                stroke="#059669"
                strokeWidth="3"
              />

              <circle cx="650" cy="30" r="4" fill="#4F46E5" />
              <circle cx="650" cy="40" r="5" fill="#059669" stroke="#FFF" strokeWidth="2" />
            </svg>

            {/* X Labels */}
            <div className="grid grid-cols-5 text-center mt-2 text-xs text-slate-400 font-mono">
              <span>09:00 AM</span>
              <span>11:00 AM</span>
              <span>01:00 PM</span>
              <span>03:00 PM</span>
              <span>04:00 PM</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-6 pt-2 border-t border-slate-100 text-xs">
            <span className="flex items-center gap-1.5 font-semibold text-indigo-900">
              <span className="w-3 h-0.5 bg-indigo-600"></span> Predicted (341)
            </span>
            <span className="flex items-center gap-1.5 font-semibold text-emerald-900">
              <span className="w-3 h-0.5 bg-emerald-600"></span> Actual Arrivals (327)
            </span>
          </div>
        </section>

        {/* RIGHT COLUMN: MOBILIZATION FUNNEL (4 COLS) */}
        <section className="lg:col-span-4 bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <div className="pb-3 border-b border-slate-100">
            <h2 className="text-base font-bold text-slate-900">Mobilization Funnel</h2>
            <p className="text-xs text-slate-500">Conversion across campaign milestones</p>
          </div>

          <div className="space-y-4 text-xs">
            {/* Stage 1 */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-slate-900">1. Total Registered</span>
                <span className="font-mono font-bold text-slate-700">500 (100%)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-lg h-3 overflow-hidden">
                <div className="bg-slate-400 h-3 rounded-lg" style={{ width: '100%' }}></div>
              </div>
            </div>

            {/* Stage 2 */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-slate-900">2. Interactive Confirms</span>
                <span className="font-mono font-bold text-[#0284c7]">382 (76.4%)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-lg h-3 overflow-hidden">
                <div className="bg-[#0284c7] h-3 rounded-lg" style={{ width: '76.4%' }}></div>
              </div>
            </div>

            {/* Stage 3 */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-slate-900">3. Verified Venue Arrivals</span>
                <span className="font-mono font-bold text-emerald-800">327 (65.4%)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-lg h-3 overflow-hidden">
                <div className="bg-emerald-600 h-3 rounded-lg" style={{ width: '65.4%' }}></div>
              </div>
            </div>
          </div>

          {/* Strategy Performance Summary */}
          <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
            <span className="text-xs font-bold text-slate-900 block">Thompson Sampling Arm Yield</span>
            <div className="space-y-1.5 text-[11px]">
              <div className="flex justify-between">
                <span className="text-slate-600">Marathi · Evening · Friendly</span>
                <span className="font-mono font-bold text-emerald-700">61% yield</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Hindi · Evening · Friendly</span>
                <span className="font-mono text-slate-700">51% yield</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Marathi · Morning · Direct</span>
                <span className="font-mono text-slate-700">43% yield</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">English · Morning · Direct</span>
                <span className="font-mono text-slate-700">38% yield</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
