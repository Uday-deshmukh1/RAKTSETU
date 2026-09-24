// src/pages/Login.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export default function Login() {
  const { loginAsDonor, loginAsOrganizer } = useApp()
  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState('donor') // 'donor' | 'organizer'
  const [credential, setCredential] = useState('rahul.sharma@example.com')
  const [password, setPassword] = useState('••••••••')
  const [showPassword, setShowPassword] = useState(false)
  const [isRegisterMode, setIsRegisterMode] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (activeTab === 'donor') {
      loginAsDonor()
      navigate('/donor')
    } else {
      loginAsOrganizer()
      navigate('/organizer')
    }
  }

  const handleQuickDonor = () => {
    loginAsDonor()
    navigate('/donor')
  }

  const handleQuickOrganizer = () => {
    loginAsOrganizer()
    navigate('/organizer')
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#f8f9ff] text-[#0b1c30] antialiased">
      {/* TOP APP BAR / HEADER */}
      <header className="w-full bg-white border-b border-slate-200/80 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Brand Identity */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-[#0f172a] flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-[#38bdf8] text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                water_drop
              </span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center">
                <span className="font-extrabold text-xl tracking-tight text-[#0f172a]">RaktSetu</span>
                <span className="w-2 h-2 rounded-full bg-[#0284c7] ml-1"></span>
              </div>
              <span className="text-[10px] font-bold text-[#0284c7] tracking-wider uppercase">
                PREDICT. ENGAGE. MOBILISE.
              </span>
            </div>
          </div>

          {/* Right Role Switcher */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-[#f1f5f9] border border-slate-200">
              <span className="w-2 h-2 rounded-full bg-[#0284c7] animate-pulse"></span>
              <span className="text-xs font-semibold text-slate-600">Platform Gateway · Secure Access</span>
            </div>

            <button
              onClick={() => setActiveTab(activeTab === 'donor' ? 'organizer' : 'donor')}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-900 text-xs font-bold transition-colors shadow-xs cursor-pointer"
            >
              <span className="material-symbols-outlined text-[#0284c7] text-base">
                {activeTab === 'donor' ? 'local_hospital' : 'group'}
              </span>
              <span>{activeTab === 'donor' ? 'Login as Organizer' : 'Login as Donor'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CANVAS: SPLIT VIEW */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* LEFT COLUMN: HERO PANEL (7 Cols) */}
          <section className="lg:col-span-7 flex flex-col justify-center space-y-6">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e5eeff] border border-[#d3e4fe] w-fit">
              <span className="material-symbols-outlined text-[#0284c7] text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                verified
              </span>
              <span className="text-[11px] text-[#00476e] uppercase font-bold tracking-wider">
                CIVIC BLOOD MOBILISATION FRAMEWORK
              </span>
            </div>

            {/* Headline & Subtitle */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0f172a] tracking-tight leading-tight">
                Make every donation count.
              </h1>
              <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
                Find a nearby blood donation drive, register in seconds, and stay updated with personalised reminders.
              </p>
            </div>

            {/* 3 Feature Highlight Bento Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
              <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs hover:border-[#0284c7] transition-all">
                <div className="w-9 h-9 rounded-lg bg-[#e5eeff] flex items-center justify-center mb-3">
                  <span className="material-symbols-outlined text-[#0284c7]">explore</span>
                </div>
                <h3 className="font-bold text-sm text-slate-900 mb-1">Find Drives</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Locate verified community drives across your city with real-time slot availability.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs hover:border-[#0284c7] transition-all">
                <div className="w-9 h-9 rounded-lg bg-[#e5eeff] flex items-center justify-center mb-3">
                  <span className="material-symbols-outlined text-[#0284c7]">qr_code_2</span>
                </div>
                <h3 className="font-bold text-sm text-slate-900 mb-1">Easy Registration</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  1-click registration pass with instant QR code for smooth event-day check-in.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs hover:border-[#0284c7] transition-all">
                <div className="w-9 h-9 rounded-lg bg-[#e5eeff] flex items-center justify-center mb-3">
                  <span className="material-symbols-outlined text-[#0284c7]">notifications_active</span>
                </div>
                <h3 className="font-bold text-sm text-slate-900 mb-1">Smart Reminders</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Timely, adaptive WhatsApp & SMS updates tailored in your regional language.
                </p>
              </div>
            </div>

            {/* Community Metric Preview Card */}
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="h-11 w-11 rounded-lg bg-[#e5eeff] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[#0284c7] text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    groups
                  </span>
                </div>
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Nagpur Community Hub Node
                  </div>
                  <div className="text-sm font-semibold text-slate-900">
                    327+ donors mobilized at recent Nagpur Chapter drive with 95.9% verified turnout.
                  </div>
                </div>
              </div>
              <div className="hidden sm:flex flex-col items-end shrink-0">
                <span className="text-[10px] font-bold text-[#0284c7] uppercase">TURNOUT RATE</span>
                <span className="text-xl font-extrabold text-[#0284c7] font-mono">95.9%</span>
              </div>
            </div>

            {/* Clinical Jurisdiction Notice */}
            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-[#f1f5f9] border border-slate-200 text-xs text-slate-600">
              <span className="material-symbols-outlined text-[#0284c7] text-base shrink-0 mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>
                shield
              </span>
              <p>
                100% Volunteer Driven · Ethical Mobilisation & Consent Protected · Clinical screening conducted strictly by certified venue medical officers.
              </p>
            </div>
          </section>

          {/* RIGHT COLUMN: AUTHENTICATION FORM CARD (5 Cols) */}
          <section className="lg:col-span-5">
            <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 sm:p-8 relative">
              {/* Tab Selector: Donor Sign In vs Organizer Sign In */}
              <div className="grid grid-cols-2 p-1 bg-[#f1f5f9] rounded-xl mb-6">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('donor')
                    setCredential('rahul.sharma@example.com')
                  }}
                  className={`py-2 text-center rounded-lg text-sm font-bold transition-all cursor-pointer ${
                    activeTab === 'donor'
                      ? 'bg-white text-[#0284c7] shadow-xs'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Donor Sign In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('organizer')
                    setCredential('arvind.mehta@redcross-mh.org')
                  }}
                  className={`py-2 text-center rounded-lg text-sm font-bold transition-all cursor-pointer ${
                    activeTab === 'organizer'
                      ? 'bg-white text-[#0284c7] shadow-xs'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Organizer Sign In
                </button>
              </div>

              {/* Form Header */}
              <div className="mb-6">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#e5eeff] text-[10px] font-bold text-[#0284c7] uppercase mb-2">
                  {activeTab === 'donor' ? 'DONOR PORTAL' : 'OPERATIONS COMMAND'}
                </span>
                <h2 className="text-2xl font-bold text-slate-900">
                  {isRegisterMode
                    ? 'Create Your Account'
                    : activeTab === 'donor'
                    ? 'Welcome to RaktSetu'
                    : 'Organizer Dashboard Login'}
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  {activeTab === 'donor'
                    ? 'Sign in to continue to your blood donation journey.'
                    : 'Access real-time turnout intelligence, campaign reminders, and attendance.'}
                </p>
              </div>

              {/* Credentials Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {isRegisterMode && (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Full Legal Name</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
                        person
                      </span>
                      <input
                        type="text"
                        defaultValue="Rahul Sharma"
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:border-[#0284c7] focus:ring-1 focus:ring-[#0284c7] outline-none"
                        placeholder="e.g. Rahul Sharma"
                        required
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {activeTab === 'donor' ? 'Email or Mobile Number' : 'Organizer Email / Employee ID'}
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
                      {activeTab === 'donor' ? 'contact_mail' : 'badge'}
                    </span>
                    <input
                      type="text"
                      value={credential}
                      onChange={(e) => setCredential(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:border-[#0284c7] focus:ring-1 focus:ring-[#0284c7] outline-none"
                      placeholder={
                        activeTab === 'donor'
                          ? 'e.g. rahul.sharma@example.com or +91 98765 43210'
                          : 'e.g. arvind.mehta@redcross-mh.org'
                      }
                      required
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-slate-700">Password</label>
                    {!isRegisterMode && (
                      <a href="#forgot" className="text-xs text-[#0284c7] hover:underline font-semibold">
                        Forgot Password?
                      </a>
                    )}
                  </div>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
                      lock
                    </span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-slate-300 text-sm focus:border-[#0284c7] focus:ring-1 focus:ring-[#0284c7] outline-none"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                    >
                      <span className="material-symbols-outlined text-lg">
                        {showPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-slate-300 text-[#0284c7] focus:ring-[#0284c7] h-4 w-4"
                    />
                    <span className="text-xs text-slate-600">Remember this device</span>
                  </label>
                </div>

                {/* Primary Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-[#0284c7] hover:bg-[#006398] text-white text-sm font-bold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{isRegisterMode ? 'Complete Registration' : 'Sign In'}</span>
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </button>
              </form>

              {/* 1-Click Demo Logins for Pair Testing */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col gap-2">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center">
                  Quick 1-Click Role Login
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={handleQuickDonor}
                    className="py-2 px-2.5 rounded-lg border border-slate-200 hover:border-[#0284c7] bg-[#f8fafc] text-xs font-semibold text-slate-800 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[#0284c7] text-sm">person</span>
                    <span>Donor (Rahul)</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleQuickOrganizer}
                    className="py-2 px-2.5 rounded-lg border border-slate-200 hover:border-[#0284c7] bg-[#f8fafc] text-xs font-semibold text-slate-800 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[#0284c7] text-sm">local_hospital</span>
                    <span>Organizer (Mehta)</span>
                  </button>
                </div>
              </div>

              {/* Switch Sign in / Register */}
              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={() => setIsRegisterMode(!isRegisterMode)}
                  className="text-xs text-slate-600 hover:text-slate-900 font-medium"
                >
                  {isRegisterMode ? (
                    <span>Already have an account? <strong className="text-[#0284c7]">Sign In</strong></span>
                  ) : (
                    <span>New to RaktSetu? <strong className="text-[#0284c7]">Create New Account</strong></span>
                  )}
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="w-full bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-400">
        RaktSetu Civic Mobilisation Framework • Team Vortex • Hackronyx 2.0
      </footer>
    </div>
  )
}
