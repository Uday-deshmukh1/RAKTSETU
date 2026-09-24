// src/pages/organizer/SimulationLab.jsx
import React from 'react'
import { useApp } from '../../context/AppContext'

export default function SimulationLab() {
  const {
    simulationStepIndex,
    currentSimulationData,
    simulationAuditLogs,
    advanceSimulationStep,
    resetSimulation,
  } = useApp()

  const currentStep = simulationStepIndex + 1

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Simulation Lab</h1>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200">
              SIMULATION MODE
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Simulate donor behavior, campaign signals, and turnout learning without real-world messaging.
          </p>
        </div>

        <button
          onClick={resetSimulation}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-bold transition-colors shadow-xs cursor-pointer"
        >
          <span className="material-symbols-outlined text-sm">history</span>
          <span>Reset Simulation</span>
        </button>
      </div>

      {/* TOP CONTROLS & 4 SEQUENTIAL STEP CARDS */}
      <section className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between pb-3 border-b border-slate-100 gap-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#0284c7] text-xl">tune</span>
            <h2 className="text-sm sm:text-base font-bold text-slate-900">Campaign Simulation Controls</h2>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-medium">
              Cohort: <strong className="text-slate-900">500 Donors</strong>
            </span>
            <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-medium">
              Step: <strong className="text-slate-900">{currentStep} of 4</strong>
            </span>
            <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
              Confidence: <strong>{currentSimulationData.confidence}</strong>
            </span>
          </div>
        </div>

        {/* 4 Step Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Step 1 */}
          <div
            onClick={() => advanceSimulationStep(1)}
            className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
              currentStep === 1
                ? 'border-[#0284c7] bg-[#f0f7ff] shadow-xs'
                : currentStep > 1
                ? 'border-emerald-200 bg-emerald-50/50'
                : 'border-slate-200 bg-white'
            }`}
          >
            <div className="flex items-start justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                {currentStep > 1 ? 'Step 01 · Executed' : 'Step 01 · Active'}
              </span>
              <span className="material-symbols-outlined text-sm text-emerald-600">
                {currentStep > 1 ? 'check_circle' : 'play_arrow'}
              </span>
            </div>
            <div className="my-2">
              <h3 className="font-bold text-sm text-slate-900">1. Simulate Reminder #1</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Simulates donor opens, responses, confirmations, and ignores across segment.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-semibold text-emerald-700">{currentStep > 1 ? 'Completed' : 'Click to run'}</span>
              <span className="font-mono text-slate-500">287 Opens</span>
            </div>
          </div>

          {/* Step 2 */}
          <div
            onClick={() => advanceSimulationStep(2)}
            className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
              currentStep === 2
                ? 'border-[#0284c7] bg-[#f0f7ff] shadow-xs ring-2 ring-sky-100'
                : currentStep > 2
                ? 'border-emerald-200 bg-emerald-50/50'
                : 'border-slate-200 bg-white'
            }`}
          >
            <div className="flex items-start justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#0284c7]">
                {currentStep > 2 ? 'Step 02 · Executed' : currentStep === 2 ? 'Step 02 · Active' : 'Step 02 · Queued'}
              </span>
              <span className="material-symbols-outlined text-sm text-[#0284c7]">
                {currentStep > 2 ? 'check_circle' : 'play_circle'}
              </span>
            </div>
            <div className="my-2">
              <h3 className="font-bold text-sm text-slate-900">2. Simulate Reminder #2</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Runs strategy selection using Thompson Sampling multi-armed bandit.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-semibold text-[#0284c7]">
                {currentStep > 2 ? 'Completed' : currentStep === 2 ? 'Run Strategy Step' : 'Pending Step 1'}
              </span>
              <span className="font-mono text-slate-500">Arm 01 Selected</span>
            </div>
          </div>

          {/* Step 3 */}
          <div
            onClick={() => advanceSimulationStep(3)}
            className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
              currentStep === 3
                ? 'border-[#0284c7] bg-[#f0f7ff] shadow-xs'
                : currentStep > 3
                ? 'border-emerald-200 bg-emerald-50/50'
                : 'border-slate-200 bg-white opacity-85'
            }`}
          >
            <div className="flex items-start justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                {currentStep > 3 ? 'Step 03 · Executed' : currentStep === 3 ? 'Step 03 · Active' : 'Step 03 · Queued'}
              </span>
              <span className="material-symbols-outlined text-sm text-slate-400">
                {currentStep > 3 ? 'check_circle' : 'schedule'}
              </span>
            </div>
            <div className="my-2">
              <h3 className="font-bold text-sm text-slate-900">3. Simulate Event Day</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Simulates venue QR check-ins and actual donor attendance.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700">
                {currentStep > 3 ? 'Completed' : currentStep === 3 ? 'Run Event Check-in' : 'Pending Step 2'}
              </span>
              <span className="font-mono text-slate-500">QR Gate Intake</span>
            </div>
          </div>

          {/* Step 4 */}
          <div
            onClick={() => advanceSimulationStep(4)}
            className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
              currentStep === 4
                ? 'border-emerald-500 bg-emerald-50 shadow-xs'
                : 'border-slate-200 bg-white opacity-85'
            }`}
          >
            <div className="flex items-start justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                {currentStep === 4 ? 'Step 04 · Active' : 'Step 04 · Post-Event'}
              </span>
              <span className="material-symbols-outlined text-sm text-slate-400">model_training</span>
            </div>
            <div className="my-2">
              <h3 className="font-bold text-sm text-slate-900">4. Run Learning Cycle</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Updates campaign-level Beta-Binomial prior using observed variance.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-semibold text-emerald-800">
                {currentStep === 4 ? 'Finalize Cycle' : 'Pending Step 3'}
              </span>
              <span className="font-mono text-slate-500">Prior Adjustment</span>
            </div>
          </div>
        </div>
      </section>

      {/* TWO-COLUMN MAIN CONTENT GRID (7:5) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: LIVE PREDICTION PANEL & TRAJECTORY (7 COLS) */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Live Prediction Panel */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900">Turnout Prediction</h2>
                <p className="text-xs text-slate-500">
                  Real-time dynamic Bayesian model adjusting to simulated incoming signals
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-800 border border-blue-200">
                Confidence: {currentSimulationData.confidence}
              </span>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-xs text-slate-500 block">Registered</span>
                <span className="text-xl sm:text-2xl font-extrabold text-slate-900 font-mono mt-0.5 block">
                  {currentSimulationData.registered}
                </span>
                <span className="text-[10px] text-slate-400 block">Cohort Population</span>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-xs text-slate-500 block">Confirmed</span>
                <span className="text-xl sm:text-2xl font-extrabold text-[#0284c7] font-mono mt-0.5 block">
                  {currentSimulationData.confirmed}
                </span>
                <span className="text-[10px] text-emerald-600 font-semibold block">Positive Intent</span>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-xs text-slate-500 block">Predicted Turnout</span>
                <span className="text-xl sm:text-2xl font-extrabold text-indigo-950 font-mono mt-0.5 block">
                  {currentSimulationData.predicted}
                </span>
                <span className="text-[10px] text-indigo-600 font-semibold block">Beta-Binomial Posterior</span>
              </div>

              <div className="p-3 rounded-lg bg-emerald-50/70 border border-emerald-200">
                <span className="text-xs text-emerald-900 block">Actual Attendance</span>
                <span className="text-xl sm:text-2xl font-extrabold text-emerald-800 font-mono mt-0.5 block">
                  {currentSimulationData.actual || '—'}
                </span>
                <span className="text-[10px] text-emerald-700 font-semibold block">
                  {currentSimulationData.actual ? 'Simulated check-ins' : 'Awaiting event'}
                </span>
              </div>
            </div>

            {/* Visual Trajectory Progression Stepper */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700 uppercase tracking-wider">
                  Simulated Campaign Progression
                </span>
                <span className="text-[11px] font-mono text-slate-400">Bayesian Shift Sequence</span>
              </div>

              <div className="grid grid-cols-4 gap-2 pt-1 text-center">
                <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                  <span className="text-[11px] text-slate-500 block font-medium">Registration</span>
                  <span className="text-sm sm:text-base font-bold text-slate-900 mt-0.5 block font-mono">310</span>
                  <span className="text-[10px] text-slate-400 block">Baseline Prior</span>
                </div>

                <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                  <span className="text-[11px] text-slate-500 block font-medium">Reminder #1</span>
                  <span className="text-sm sm:text-base font-bold text-[#0284c7] mt-0.5 block font-mono">328</span>
                  <span className="text-[10px] text-emerald-600 font-bold block">+18 Donors</span>
                </div>

                <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                  <span className="text-[11px] text-slate-500 block font-medium">Reminder #2</span>
                  <span className="text-sm sm:text-base font-bold text-[#0284c7] mt-0.5 block font-mono">341</span>
                  <span className="text-[10px] text-emerald-600 font-bold block">+13 Donors</span>
                </div>

                <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200">
                  <span className="text-[11px] text-emerald-900 block font-medium">Event Day</span>
                  <span className="text-sm sm:text-base font-bold text-emerald-900 mt-0.5 block font-mono">327</span>
                  <span className="text-[10px] text-amber-700 font-bold block">-14 Variance</span>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Intelligence Engine Activity */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#0284c7] text-xl">hub</span>
                <h2 className="text-base sm:text-lg font-bold text-slate-900">Intelligence Engine Activity</h2>
              </div>
              <span className="text-xs font-bold text-[#0284c7] uppercase tracking-wider font-mono">
                Pipeline In-Flight
              </span>
            </div>

            {/* Connected Node Visualizer */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Input Phase</span>
                <div className="font-bold text-slate-900 mt-1">Donor Signals</div>
                <span className="text-[10px] text-slate-500 mt-1 block">Opens & Replies</span>
              </div>

              <div className="p-3 rounded-lg bg-sky-50 border-2 border-sky-300">
                <span className="text-[10px] font-bold text-[#0284c7] uppercase tracking-wider">Inference</span>
                <div className="font-bold text-slate-900 mt-1">Bayesian Update</div>
                <span className="text-[10px] text-[#0284c7] font-mono mt-1 block">P(Turnout|Signals)</span>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Output</span>
                <div className="font-bold text-slate-900 mt-1">Turnout Pred.</div>
                <span className="text-[10px] text-slate-500 font-mono mt-1 block">Beta-Binomial Posterior</span>
              </div>

              <div className="p-3 rounded-lg bg-sky-50 border-2 border-sky-300">
                <span className="text-[10px] font-bold text-[#0284c7] uppercase tracking-wider">Optimization</span>
                <div className="font-bold text-slate-900 mt-1">Thompson Sampling</div>
                <span className="text-[10px] text-[#0284c7] font-mono mt-1 block">Beta-Bernoulli Bandit</span>
              </div>
            </div>

            {/* Mathematical Engine Callout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
              <div className="p-3 rounded-lg bg-[#f8fafc] border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block">Beta-Binomial Posterior Engine</span>
                <p className="text-slate-600 leading-relaxed">
                  Prior (310 ± 24) combined with likelihood of 382 confirms yields posterior expected arrival of 341 donors.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-[#f8fafc] border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block">Multi-Armed Bandit Exploration</span>
                <p className="text-slate-600 leading-relaxed">
                  Thompson Sampling prioritises candidate Arm 01 (Marathi · Evening · Friendly) with highest sampled conversion probability.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: SIMULATED DONOR SIGNALS & POST-CAMPAIGN LEARNING (5 COLS) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Simulated Donor Signals */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-base font-bold text-slate-900">Simulated Donor Signals</h2>
              <span className="material-symbols-outlined text-[#0284c7] text-xl">sensors</span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-700 font-semibold">Opened Reminder</span>
                  <span className="font-mono text-emerald-700 font-bold">
                    {currentSimulationData.opens} (57.4%)
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-emerald-600 h-2 rounded-full" style={{ width: '57.4%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-700 font-semibold">Responded</span>
                  <span className="font-mono text-[#0284c7] font-bold">
                    {currentSimulationData.responses} (43.2%)
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-[#0284c7] h-2 rounded-full" style={{ width: '43.2%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-700 font-semibold">Confirmed</span>
                  <span className="font-mono text-emerald-700 font-bold">
                    {currentSimulationData.confirms} (76.4%)
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-emerald-600 h-2 rounded-full" style={{ width: '76.4%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-700 font-semibold">Ignored</span>
                  <span className="font-mono text-amber-700 font-bold">
                    {currentSimulationData.ignores} (16.8%)
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-amber-500 h-2 rounded-full" style={{ width: '16.8%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-700 font-semibold">High No-Show Risk</span>
                  <span className="font-mono text-rose-700 font-bold">
                    {currentSimulationData.highRisk} (8.6%)
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-rose-600 h-2 rounded-full" style={{ width: '8.6%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Post-Campaign Learning */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-base font-bold text-slate-900">Post-Campaign Learning</h2>
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-100 text-slate-700">
                Cycle Closed
              </span>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex justify-between items-center text-xs">
              <div>
                <span className="text-slate-500 block">Predicted vs Actual</span>
                <span className="font-bold text-slate-900 text-sm font-mono">341 → 327</span>
              </div>
              <div className="text-right">
                <span className="text-slate-500 block">Prediction Error</span>
                <span className="font-bold text-amber-800 font-mono text-sm">14 donors (4.1%)</span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-lg bg-[#f8fafc] border border-slate-200 flex items-start gap-2">
                <span className="material-symbols-outlined text-emerald-600 text-base shrink-0">tune</span>
                <div>
                  <span className="font-bold text-slate-900">Prior Adjustment</span>
                  <p className="text-slate-500 text-[11px]">
                    Campaign base rate updated for next cycle based on local Nagpur weekend attrition.
                  </p>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-[#f8fafc] border border-slate-200 flex items-start gap-2">
                <span className="material-symbols-outlined text-[#0284c7] text-base shrink-0">psychology</span>
                <div>
                  <span className="font-bold text-slate-900">Bandit Weight Update</span>
                  <p className="text-slate-500 text-[11px]">
                    Reminder strategy posterior updated: Arm 01 (Marathi · Evening · Friendly) reinforced (β + 14).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM OPERATIONAL AUDIT LOG */}
      <section className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#0284c7] text-xl">receipt_long</span>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">Simulation Activity Audit Log</h2>
          </div>
          <span className="text-xs text-slate-400 font-mono">Run #SIM-2026-0926-01</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {simulationAuditLogs.map((log, index) => (
            <div
              key={index}
              className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-2.5"
            >
              <span className="font-mono text-[11px] font-bold text-[#0284c7] bg-[#e5eeff] px-1.5 py-0.5 rounded shrink-0">
                {log.time}
              </span>
              <div className="text-xs">
                <span className="font-bold text-slate-900 block">{log.title}</span>
                <span className="text-slate-500 text-[11px] leading-relaxed">{log.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
