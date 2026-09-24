// src/pages/organizer/DonorsList.jsx
import React, { useState } from 'react'
import { useApp } from '../../context/AppContext'

export default function DonorsList() {
  const { donorRoster } = useApp()

  const [search, setSearch] = useState('')
  const [bloodFilter, setBloodFilter] = useState('ALL')
  const [riskFilter, setRiskFilter] = useState('ALL')
  const [selectedDonors, setSelectedDonors] = useState([])

  const filtered = donorRoster.filter((donor) => {
    const matchesSearch =
      donor.name.toLowerCase().includes(search.toLowerCase()) ||
      donor.phone.includes(search) ||
      donor.registrationId.toLowerCase().includes(search.toLowerCase())

    const matchesBlood = bloodFilter === 'ALL' || donor.bloodGroup === bloodFilter
    const matchesRisk =
      riskFilter === 'ALL' ||
      (riskFilter === 'LOW' && donor.riskLevel === 'Low Risk') ||
      (riskFilter === 'UNCERTAIN' && donor.riskLevel === 'Uncertain') ||
      (riskFilter === 'HIGH' && donor.riskLevel === 'High Risk')

    return matchesSearch && matchesBlood && matchesRisk
  })

  const toggleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedDonors(filtered.map((d) => d.id))
    } else {
      setSelectedDonors([])
    }
  }

  const toggleSelectDonor = (id) => {
    if (selectedDonors.includes(id)) {
      setSelectedDonors(selectedDonors.filter((dId) => dId !== id))
    } else {
      setSelectedDonors([...selectedDonors, id])
    }
  }

  const exportCSV = () => {
    const headers = ['Registration ID', 'Name', 'Phone', 'Blood Group', 'Slot', 'Status', 'Risk Level']
    const rows = filtered.map((d) => [
      d.registrationId,
      d.name,
      d.phone,
      d.bloodGroup,
      d.slot,
      d.confirmationStatus,
      d.riskLevel,
    ])
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].map((e) => e.join(',')).join('\n')
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `RaktSetu_Donors_Export_${new Date().toISOString().slice(0, 10)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="space-y-6">
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Donors</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Monitor donor engagement, turnout probability, and outreach actions for active cohort.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={exportCSV}
            className="px-3.5 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm text-[#0284c7]">download</span>
            <span>Export Donor CSV</span>
          </button>
        </div>
      </div>

      {/* 4 SUMMARY METRIC CARDS */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Total Registered</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono mt-1 block">500</span>
          <span className="text-xs text-slate-500 mt-1 block">Scheduled for active drive</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Confirmed</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-[#0284c7] font-mono mt-1 block">382</span>
          <span className="text-xs text-emerald-700 font-semibold mt-1 block">76.4% response rate</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Pending Response</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-amber-700 font-mono mt-1 block">118</span>
          <span className="text-xs text-slate-500 mt-1 block">Targeted for Wave 2 nudge</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">High No-Show Risk</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-rose-700 font-mono mt-1 block">43</span>
          <span className="text-xs text-rose-600 font-semibold mt-1 block">&lt;40% turnout propensity</span>
        </div>
      </section>

      {/* RISK SEGMENTS OVERVIEW BANNER */}
      <section className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-slate-900 block">Propensity Cohort Distribution</span>
          <span className="text-[11px] text-slate-500 block">Bayesian prior weights merged with real-time response signals</span>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span className="text-emerald-900 font-bold">286 High Likelihood (&gt;70%)</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            <span className="text-amber-900 font-bold">171 Uncertain (40-70%)</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-rose-50 border border-rose-200">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
            <span className="text-rose-900 font-bold">43 High No-Show (&lt;40%)</span>
          </div>
        </div>
      </section>

      {/* FILTER & SEARCH TOOLBAR */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
            search
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, phone, or registration ID..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:bg-white focus:border-[#0284c7] outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto text-xs">
          {/* Blood group filter */}
          <div className="flex items-center gap-1">
            <span className="text-slate-400 font-semibold">Blood:</span>
            <select
              value={bloodFilter}
              onChange={(e) => setBloodFilter(e.target.value)}
              className="py-1.5 px-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 outline-none cursor-pointer"
            >
              <option value="ALL">All Groups</option>
              <option value="O+">O+</option>
              <option value="O-">O- (Rare)</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
            </select>
          </div>

          {/* Risk filter */}
          <div className="flex items-center gap-1">
            <span className="text-slate-400 font-semibold">Risk:</span>
            <select
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
              className="py-1.5 px-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 outline-none cursor-pointer"
            >
              <option value="ALL">All Risk Levels</option>
              <option value="LOW">Low Risk</option>
              <option value="UNCERTAIN">Uncertain</option>
              <option value="HIGH">High No-Show Risk</option>
            </select>
          </div>

          {(search || bloodFilter !== 'ALL' || riskFilter !== 'ALL') && (
            <button
              onClick={() => {
                setSearch('')
                setBloodFilter('ALL')
                setRiskFilter('ALL')
              }}
              className="text-[#0284c7] font-semibold hover:underline px-2 py-1"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* DONOR TABLE */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-3 w-8">
                  <input
                    type="checkbox"
                    checked={selectedDonors.length === filtered.length && filtered.length > 0}
                    onChange={toggleSelectAll}
                    className="rounded border-slate-300 text-[#0284c7] focus:ring-[#0284c7] h-3.5 w-3.5"
                  />
                </th>
                <th className="py-3 px-3">Donor Name</th>
                <th className="py-3 px-3">Contact</th>
                <th className="py-3 px-3">Blood Group</th>
                <th className="py-3 px-3">Slot Window</th>
                <th className="py-3 px-3">Confirmation</th>
                <th className="py-3 px-3">Turnout Probability</th>
                <th className="py-3 px-3">Risk Tier</th>
                <th className="py-3 px-3 text-right">Recommended Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filtered.map((donor) => {
                const isSelected = selectedDonors.includes(donor.id)
                return (
                  <tr
                    key={donor.id}
                    className={`hover:bg-slate-50 transition-colors ${isSelected ? 'bg-sky-50/50' : ''}`}
                  >
                    <td className="py-3 px-3">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelectDonor(donor.id)}
                        className="rounded border-slate-300 text-[#0284c7] focus:ring-[#0284c7] h-3.5 w-3.5"
                      />
                    </td>
                    <td className="py-3 px-3">
                      <span className="font-bold text-slate-900 block">{donor.name}</span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {donor.registrationId} • {donor.type}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-600">{donor.phone}</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded font-mono font-bold text-slate-800 bg-slate-100 border border-slate-200">
                        {donor.bloodGroup}
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
                    <td className="py-3 px-3">
                      <div className="w-20 bg-slate-100 rounded-full h-1.5 overflow-hidden mb-1">
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
                      <span className="text-[10px] font-mono text-slate-500">{donor.turnoutProb}%</span>
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
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Footer Info */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <span>
            Showing {filtered.length} of {donorRoster.length} donors
          </span>
          <span className="text-[10px] text-slate-400">
            Self-reported blood group is donor-provided reference information only.
          </span>
        </div>
      </div>
    </div>
  )
}
