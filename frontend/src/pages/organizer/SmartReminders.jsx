// src/pages/organizer/SmartReminders.jsx
import React, { useState } from 'react'
import { useApp } from '../../context/AppContext'

export default function SmartReminders() {
  const { reminderArms, activeWave } = useApp()
  const [selectedArmId, setSelectedArmId] = useState('arm_01')
  const [dispatched, setDispatched] = useState(false)
  const [activeTabLanguage, setActiveTabLanguage] = useState('mr')

  const selectedArm = reminderArms.find((a) => a.id === selectedArmId) || reminderArms[0]

  const handleSimulateDispatch = () => {
    setDispatched(true)
    setTimeout(() => {
      setDispatched(false)
      alert(
        `✅ Round ${activeWave} Reminder Wave successfully dispatched to 118 eligible unconfirmed donors using ${selectedArm.title}!`
      )
    }, 1200)
  }

  return (
    <div className="space-y-6">
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Smart Reminders</h1>
            <span className="px-2.5 py-0.5 rounded-full bg-[#cce5ff] text-[#00476e] text-xs font-bold font-mono">
              ROUND {activeWave}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Personalised donor communication powered by adaptive Thompson Sampling multi-armed bandit learning.
          </p>
        </div>

        {/* Dispatch Action */}
        <button
          onClick={handleSimulateDispatch}
          disabled={dispatched}
          className="px-4 py-2.5 rounded-lg bg-[#0284c7] hover:bg-[#006398] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer disabled:opacity-50"
        >
          <span className="material-symbols-outlined text-base">send</span>
          <span>{dispatched ? 'Dispatching Wave...' : `Dispatch Round ${activeWave} (${selectedArm.code})`}</span>
        </button>
      </div>

      {/* TOP 5 KPI CARDS */}
      <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Eligible Donors</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono mt-1 block">118</span>
          <span className="text-xs text-slate-500 mt-0.5 block truncate">Unconfirmed cohort</span>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Reminders Sent</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-[#0284c7] font-mono mt-1 block">382</span>
          <span className="text-xs text-emerald-700 font-semibold mt-0.5 block truncate">Round 1 complete</span>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Open Rate</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-emerald-800 font-mono mt-1 block">75.1%</span>
          <span className="text-xs text-slate-500 mt-0.5 block truncate">287 opened</span>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Response Rate</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-indigo-900 font-mono mt-1 block">56.5%</span>
          <span className="text-xs text-slate-500 mt-0.5 block truncate">216 replies</span>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs col-span-2 sm:col-span-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Confirmations</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-emerald-800 font-mono mt-1 block">382</span>
          <span className="text-xs text-emerald-700 font-semibold mt-0.5 block truncate">Positive turnout signals</span>
        </div>
      </section>

      {/* STRATEGY ARMS & SYNTHESIS PREVIEW (SPLIT 7:5) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: STRATEGY ARMS (7 COLS) */}
        <section className="lg:col-span-7 bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-wrap items-center justify-between pb-3 border-b border-slate-100 gap-2">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Strategy Arms (Language × Timing × Tone)
              </h2>
              <p className="text-xs text-slate-500">
                Thompson Sampling balances exploitation of high-yield variants with cohort exploration.
              </p>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold">
              4 Candidate Arms
            </span>
          </div>

          {/* Stepper Pipeline */}
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between text-xs overflow-x-auto gap-2">
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="w-5 h-5 rounded-full bg-[#0f172a] text-white text-[10px] font-bold flex items-center justify-center">1</span>
              <span className="font-bold text-slate-800">COHORT</span>
            </div>
            <span className="material-symbols-outlined text-slate-400 text-sm">arrow_forward</span>
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="w-5 h-5 rounded-full bg-[#0284c7] text-white text-[10px] font-bold flex items-center justify-center">2</span>
              <span className="font-bold text-[#0284c7]">SAMPLING</span>
            </div>
            <span className="material-symbols-outlined text-slate-400 text-sm">arrow_forward</span>
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 text-[10px] font-bold flex items-center justify-center">3</span>
              <span className="font-bold text-slate-600">DISPATCH</span>
            </div>
            <span className="material-symbols-outlined text-slate-400 text-sm">arrow_forward</span>
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 text-[10px] font-bold flex items-center justify-center">4</span>
              <span className="font-bold text-slate-600">FEEDBACK</span>
            </div>
          </div>

          {/* 4 STRATEGY CARDS */}
          <div className="space-y-3">
            {reminderArms.map((arm) => {
              const isSelected = selectedArmId === arm.id
              return (
                <div
                  key={arm.id}
                  onClick={() => setSelectedArmId(arm.id)}
                  className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#0284c7] bg-[#f0f7ff] shadow-xs'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-extrabold px-2 py-0.5 rounded ${
                          isSelected ? 'bg-[#0284c7] text-white' : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {arm.code}
                      </span>
                      <span className="font-bold text-sm text-slate-900">{arm.title}</span>
                    </div>

                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        arm.selected
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${arm.selected ? 'bg-emerald-500' : 'bg-amber-500'}`}
                      ></span>
                      {arm.status}
                    </span>
                  </div>

                  {/* Horizontal Bar Breakdown */}
                  <div className="grid grid-cols-3 gap-3 pt-1">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-500">Opens</span>
                        <span className="font-bold text-slate-900 font-mono">{arm.opens}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-[#0284c7] h-1.5 rounded-full" style={{ width: `${arm.opens}%` }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-500">Responses</span>
                        <span className="font-bold text-slate-900 font-mono">{arm.responses}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-[#0284c7] h-1.5 rounded-full" style={{ width: `${arm.responses}%` }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-500">Confirmations</span>
                        <span className="font-bold text-emerald-800 font-mono">{arm.confirmations}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-emerald-600 h-1.5 rounded-full" style={{ width: `${arm.confirmations}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* RIGHT COLUMN: SYNTHESIS & COPY PREVIEW (5 COLS) */}
        <section className="lg:col-span-5 bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-5">
          <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">Message Synthesis Layer</h2>
              <span className="text-xs text-slate-400">Selected: {selectedArm.title}</span>
            </div>
            <span className="material-symbols-outlined text-[#0284c7]">chat</span>
          </div>

          {/* Regional Language Tabs */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs">
            <button
              onClick={() => setActiveTabLanguage('mr')}
              className={`flex-1 py-1.5 text-center font-bold rounded-md cursor-pointer ${
                activeTabLanguage === 'mr' ? 'bg-white text-[#0284c7] shadow-xs' : 'text-slate-600'
              }`}
            >
              मराठी (Marathi)
            </button>
            <button
              onClick={() => setActiveTabLanguage('hi')}
              className={`flex-1 py-1.5 text-center font-bold rounded-md cursor-pointer ${
                activeTabLanguage === 'hi' ? 'bg-white text-[#0284c7] shadow-xs' : 'text-slate-600'
              }`}
            >
              हिन्दी (Hindi)
            </button>
            <button
              onClick={() => setActiveTabLanguage('en')}
              className={`flex-1 py-1.5 text-center font-bold rounded-md cursor-pointer ${
                activeTabLanguage === 'en' ? 'bg-white text-[#0284c7] shadow-xs' : 'text-slate-600'
              }`}
            >
              English
            </button>
          </div>

          {/* WhatsApp Style Message Bubble Preview */}
          <div className="p-4 rounded-xl bg-[#eef8f2] border border-[#d2edd9] space-y-3 relative">
            <div className="flex items-center justify-between text-[11px] text-slate-400 pb-2 border-b border-emerald-100">
              <span className="flex items-center gap-1 font-bold text-emerald-800">
                <span className="material-symbols-outlined text-sm">chat</span>
                WhatsApp Cloud Verified Dispatch
              </span>
              <span>Today, 19:00</span>
            </div>

            <p className="text-xs text-slate-800 leading-relaxed font-sans">
              {activeTabLanguage === 'mr' && (
                <>
                  नमस्कार <strong>राहुल</strong>! २६ सप्टेंबर रोजी ईस्ट विंग हॉल, नागपूर येथे होणाऱ्या रक्तदान शिबिरासाठी तुमची उपस्थिती अत्यंत मोलाची आहे.
                  <br />
                  <br />
                  तुमची नियोजित वेळ: <strong>सकाळी ९ ते दुपारी १२</strong>. आपण येत आहात का?
                </>
              )}
              {activeTabLanguage === 'hi' && (
                <>
                  नमस्ते <strong>राहुल</strong>! २६ सितम्बर को ईस्ट विंग हॉल, नागपुर में रक्तदान शिविर में आपकी उपस्थिति अमूल्य है।
                  <br />
                  <br />
                  आपका स्लॉट: <strong>सुबह ९ से दोपहर १२ बजे</strong>। क्या आप आ रहे हैं?
                </>
              )}
              {activeTabLanguage === 'en' && (
                <>
                  Hi <strong>Rahul</strong>! Your participation in the Nagpur Community Blood Drive tomorrow at East Wing Hall makes a vital difference.
                  <br />
                  <br />
                  Allocated slot: <strong>9:00 AM – 12:00 PM</strong>. Can you confirm your arrival?
                </>
              )}
            </p>

            {/* Simulated Interactive CTA Buttons */}
            <div className="pt-2 flex flex-col gap-2">
              <button
                type="button"
                className="w-full py-2 bg-white text-emerald-800 border border-emerald-300 rounded-lg text-xs font-bold hover:bg-emerald-50 transition-colors shadow-xs"
              >
                ✓ Confirm Arrival (होय, मी येतो)
              </button>
              <button
                type="button"
                className="w-full py-2 bg-white text-slate-700 border border-slate-300 rounded-lg text-xs font-semibold hover:bg-slate-50 transition-colors"
              >
                Reschedule Slot (वेळ बदला)
              </button>
            </div>
          </div>

          {/* Policy & Consent Protection Callout */}
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
            <span className="font-bold text-slate-900 block flex items-center gap-1">
              <span className="material-symbols-outlined text-sm text-[#0284c7]">verified_user</span>
              Consent & Privacy Protection
            </span>
            <p className="text-[11px] leading-relaxed text-slate-500">
              Only donors with active consent for this drive receive automated dispatches. Donors can reply STOP at any point to withdraw consent instantly.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
