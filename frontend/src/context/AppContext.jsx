// src/context/AppContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react'
import {
  INITIAL_USER_DONOR,
  INITIAL_USER_ORGANIZER,
  INITIAL_DRIVES,
  INITIAL_ACTIVE_REGISTRATION,
  DONOR_ROSTER,
  SMART_REMINDER_ARMS,
  SIMULATION_STEPS,
} from '../data/mockData'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  // Authentication State
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('raktsetu_user')
      if (saved) return JSON.parse(saved)
    } catch {
      // ignore
    }
    // Default logged in as donor for instant preview
    return INITIAL_USER_DONOR
  })

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('raktsetu_user', JSON.stringify(currentUser))
      } else {
        localStorage.removeItem('raktsetu_user')
      }
    } catch {
      // ignore
    }
  }, [currentUser])

  // Drives State
  const [drives, setDrives] = useState(() => {
    try {
      const saved = localStorage.getItem('raktsetu_drives')
      if (saved) return JSON.parse(saved)
    } catch {
      // ignore
    }
    return INITIAL_DRIVES
  })

  useEffect(() => {
    try {
      localStorage.setItem('raktsetu_drives', JSON.stringify(drives))
    } catch {
      // ignore
    }
  }, [drives])

  const [selectedDriveId, setSelectedDriveId] = useState('drv_nagpur_20260926')
  const activeDrive = drives.find((d) => d.id === selectedDriveId) || drives[0]

  // Donor Registration State
  const [activeRegistration, setActiveRegistration] = useState(() => {
    try {
      const saved = localStorage.getItem('raktsetu_active_registration')
      if (saved) return JSON.parse(saved)
    } catch {
      // ignore
    }
    return INITIAL_ACTIVE_REGISTRATION
  })

  useEffect(() => {
    try {
      if (activeRegistration) {
        localStorage.setItem('raktsetu_active_registration', JSON.stringify(activeRegistration))
      } else {
        localStorage.removeItem('raktsetu_active_registration')
      }
    } catch {
      // ignore
    }
  }, [activeRegistration])

  // Donors Roster State (for Organizer and Check-in)
  const [donorRoster, setDonorRoster] = useState(DONOR_ROSTER)

  // Simulation Lab State
  const [simulationStepIndex, setSimulationStepIndex] = useState(1) // 0 to 3 for steps 1-4
  const [simulationAuditLogs, setSimulationAuditLogs] = useState([
    { time: '10:02', title: 'Simulation Initialized', desc: 'Loaded 500 donor cohort with prior turnout weights.' },
    { time: '10:03', title: 'Reminder Round 1 Dispatched', desc: 'Simulated round dispatched across eligible cohorts.' },
    { time: '10:03', title: 'Donor Signals Observed', desc: 'Observed 287 opens, 216 responses, 382 confirms.' },
    { time: '10:04', title: 'Bayesian Update Applied', desc: 'Turnout prediction updated: 310 → 328 donors.' },
  ])

  // Smart Reminders State
  const [reminderArms, setReminderArms] = useState(SMART_REMINDER_ARMS)
  const [activeWave, setActiveWave] = useState(2)

  // Auth Functions
  const loginAsDonor = () => {
    setCurrentUser(INITIAL_USER_DONOR)
  }

  const loginAsOrganizer = () => {
    setCurrentUser(INITIAL_USER_ORGANIZER)
  }

  const logout = () => {
    setCurrentUser(null)
  }

  // Drive Actions
  const addDrive = (newDriveData) => {
    const id = `drv_${Date.now()}`
    const randomNum = Math.floor(100 + Math.random() * 900)
    const newDrive = {
      id,
      code: `RF-0${randomNum}`,
      node: 'RC-MH-04',
      title: newDriveData.title || 'Untitled Community Blood Drive',
      organization: 'RedCross Maharashtra Chapter',
      date: newDriveData.date,
      dateDisplay: newDriveData.date || 'Upcoming Date',
      startTime: newDriveData.startTime || '09:00',
      endTime: newDriveData.endTime || '16:00',
      hoursDisplay: `${newDriveData.startTime || '09:00'} – ${newDriveData.endTime || '16:00'}`,
      venueName: newDriveData.venueName || 'Community Hall',
      address: `${newDriveData.venueName || 'Community Hall'}, ${newDriveData.city || 'Nagpur'}`,
      city: newDriveData.city || 'Nagpur',
      distance: '5 km away',
      parking: 'On-site Parking Available',
      targetUnits: Number(newDriveData.targetUnits) || 300,
      registeredCount: 0,
      confirmedCount: 0,
      predictedAttendance: Math.round((Number(newDriveData.targetUnits) || 300) * 0.95),
      actualAttendance: 0,
      confidenceRate: '85%',
      status: 'UPCOMING',
      registrationStatus: 'Registration Open',
      urgentBloodGroups: ['O+', 'B+'],
      slots: [
        { id: `slot_${id}_1`, label: 'Morning Window', time: '9:00 AM – 1:00 PM', booked: 0, capacity: 150, status: 'Optimal' },
        { id: `slot_${id}_2`, label: 'Afternoon Window', time: '1:00 PM – 4:00 PM', booked: 0, capacity: 150, status: 'Available' },
      ],
      screeningUrl: newDriveData.screeningUrl || 'https://bloodservice.gov.in/screening-guidelines',
      contactDesk: '+91 7122 000111',
    }
    setDrives((prev) => [newDrive, ...prev])
    return newDrive
  }

  // Register for Drive
  const registerForDrive = ({ driveId, slotLabel, donorDetails }) => {
    const targetDrive = drives.find((d) => d.id === driveId) || activeDrive
    const regId = `RF-${Math.floor(1000 + Math.random() * 9000)}`
    const reg = {
      registrationId: regId,
      donorName: donorDetails?.fullName || currentUser?.name || 'Rahul Sharma',
      donorPhone: donorDetails?.mobileNumber || currentUser?.phone || '+91 98765 43210',
      donorEmail: donorDetails?.emailAddress || currentUser?.email || 'rahul.sharma@example.com',
      bloodGroup: donorDetails?.bloodGroup || 'O+',
      driveId: targetDrive.id,
      driveTitle: targetDrive.title,
      driveDate: targetDrive.dateDisplay,
      slotWindow: slotLabel || 'Morning Window (9:00 AM – 12:00 PM)',
      venue: targetDrive.address,
      status: 'CONFIRMED',
      qrToken: `RS-DRV-${targetDrive.id}-${regId}-CONFIRMED`,
      reminderChannel: 'WhatsApp & SMS',
      registeredAt: new Date().toISOString(),
      confirmedAt: new Date().toISOString(),
      checkedIn: false,
      checkInTime: null,
      checkedInDesk: null,
    }
    setActiveRegistration(reg)

    // Update drive counts
    setDrives((prev) =>
      prev.map((d) =>
        d.id === targetDrive.id
          ? {
              ...d,
              registeredCount: d.registeredCount + 1,
              confirmedCount: d.confirmedCount + 1,
            }
          : d
      )
    )

    return reg
  }

  const cancelActiveRegistration = () => {
    if (activeRegistration) {
      setActiveRegistration(null)
    }
  }

  // QR Check-in Execution
  const checkInDonorByCode = (codeOrQuery) => {
    const query = (codeOrQuery || '').trim().toLowerCase()
    const donor = donorRoster.find(
      (d) =>
        d.registrationId.toLowerCase() === query ||
        d.name.toLowerCase().includes(query) ||
        (d.registrationId === 'RF-0248' && (query === '' || query.includes('0248') || query.includes('rahul')))
    )

    if (donor) {
      const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      const updatedRoster = donorRoster.map((d) =>
        d.id === donor.id ? { ...d, checkedIn: true, checkInTime: now, confirmationStatus: 'Confirmed' } : d
      )
      setDonorRoster(updatedRoster)

      // Also update activeRegistration if it matches
      if (activeRegistration && activeRegistration.registrationId.toLowerCase() === donor.registrationId.toLowerCase()) {
        setActiveRegistration((prev) => ({ ...prev, checkedIn: true, checkInTime: now }))
      }

      return {
        success: true,
        donor: { ...donor, checkedIn: true, checkInTime: now },
      }
    }

    return {
      success: false,
      message: `No registration found matching "${codeOrQuery}". Please verify the Registration ID.`,
    }
  }

  // Simulation Lab Step Transition
  const advanceSimulationStep = (targetStepNumber) => {
    const targetIdx = targetStepNumber - 1
    if (targetIdx >= 0 && targetIdx < SIMULATION_STEPS.length) {
      setSimulationStepIndex(targetIdx)
      const stepData = SIMULATION_STEPS[targetIdx]
      const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      setSimulationAuditLogs((prev) => [
        {
          time: now,
          title: stepData.title,
          desc: stepData.auditMessage,
        },
        ...prev,
      ])
    }
  }

  const resetSimulation = () => {
    setSimulationStepIndex(0)
    setSimulationAuditLogs([
      { time: '10:02', title: 'Simulation Reset', desc: 'Loaded 500 donor cohort with prior turnout weights.' },
    ])
  }

  return (
    <AppContext.Provider
      value={{
        currentUser,
        loginAsDonor,
        loginAsOrganizer,
        logout,
        drives,
        selectedDriveId,
        setSelectedDriveId,
        activeDrive,
        addDrive,
        activeRegistration,
        registerForDrive,
        cancelActiveRegistration,
        donorRoster,
        checkInDonorByCode,
        simulationStepIndex,
        currentSimulationData: SIMULATION_STEPS[simulationStepIndex],
        simulationSteps: SIMULATION_STEPS,
        simulationAuditLogs,
        advanceSimulationStep,
        resetSimulation,
        reminderArms,
        setReminderArms,
        activeWave,
        setActiveWave,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}
