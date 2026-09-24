import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { clinicalSafetyKeywords, faqKnowledgeBase } from '../../data/mockData';

export default function DonorAssistant() {
  const { currentDonor, registrations, drives } = useApp();
  const registeredDrive = drives.find(d => d.id === registrations[0]?.driveId) || drives[0];

  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 'msg-1',
      sender: 'assistant',
      time: '10:30 AM',
      text: `Hi ${currentDonor?.name?.split(' ')[0] || 'Rahul'} 👋 I’m the RaktSetu Assistant. I can help you with your registration, drive details, reminders, QR check-in, and communication preferences.`,
      isInitial: true,
    }
  ]);
  const [feedbackGiven, setFeedbackGiven] = useState({});
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (textToSend) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const userTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      time: userTime,
      text: text.trim(),
    };

    // Analyze intent
    const lower = text.toLowerCase();
    const isMedical = clinicalSafetyKeywords.some(kw => lower.includes(kw));

    let assistantResponse = null;

    if (isMedical) {
      assistantResponse = {
        id: `asst-${Date.now() + 1}`,
        sender: 'assistant',
        time: userTime,
        isGuardrail: true,
        text: "I can’t determine whether you are medically eligible to donate blood. RaktSetu does not provide medical screening decisions. Please consult authorised medical staff at the donation venue on event day, or review official health screening guidelines.",
      };
    } else if (lower.includes('where') || lower.includes('drive') || lower.includes('when') || lower.includes('venue') || lower.includes('location')) {
      assistantResponse = {
        id: `asst-${Date.now() + 1}`,
        sender: 'assistant',
        time: userTime,
        isDriveInfo: true,
        text: `Your registered drive is the **${registeredDrive.name}** on **${registeredDrive.date}**, from **${registeredDrive.time}** at **${registeredDrive.venue}, ${registeredDrive.city}**.`,
        driveDetails: {
          name: registeredDrive.name,
          regId: registrations[0]?.regId || 'RF-0248',
          slot: '9:00 AM – 12:00 PM Arrival',
          parking: 'Free Civic Parking at North Gate',
          address: `${registeredDrive.venue}, Civil Lines, ${registeredDrive.city}, MH`,
        }
      };
    } else if (lower.includes('qr') || lower.includes('pass') || lower.includes('card') || lower.includes('barcode')) {
      assistantResponse = {
        id: `asst-${Date.now() + 1}`,
        sender: 'assistant',
        time: userTime,
        isQrInfo: true,
        text: `Your high-contrast QR Check-in Pass has been generated under Registration ID **${registrations[0]?.regId || 'RF-0248'}**. You can present it directly on your mobile device at the venue entrance, or download a printable offline copy.`,
      };
    } else if (lower.includes('reminder') || lower.includes('notification') || lower.includes('message')) {
      assistantResponse = {
        id: `asst-${Date.now() + 1}`,
        sender: 'assistant',
        time: userTime,
        text: "RaktSetu sends tailored reminders via WhatsApp and SMS at T-48h and T-24h before your drive date. Reminders include parking logistics and arrival guidance in your preferred regional language (Marathi, Hindi, or English).",
      };
    } else if (lower.includes('preference') || lower.includes('opt out') || lower.includes('language') || lower.includes('channel')) {
      assistantResponse = {
        id: `asst-${Date.now() + 1}`,
        sender: 'assistant',
        time: userTime,
        text: "You have full control over your engagement preferences. You can update your language or toggle WhatsApp vs. SMS updates anytime from your 'My Registration' pass page with zero hassle.",
      };
    } else {
      assistantResponse = {
        id: `asst-${Date.now() + 1}`,
        sender: 'assistant',
        time: userTime,
        text: "Thank you for reaching out. RaktSetu is dedicated to making blood mobilisation effortless. For specific questions regarding venue logistics, volunteer duties, or slot changes, our verified ground coordinators are available on site.",
      };
    }

    setMessages(prev => [...prev, userMsg, assistantResponse]);
    setInputMessage('');
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'msg-1',
        sender: 'assistant',
        time: '10:30 AM',
        text: `Hi ${currentDonor?.name?.split(' ')[0] || 'Rahul'} 👋 I’m the RaktSetu Assistant. I can help you with your registration, drive details, reminders, QR check-in, and communication preferences.`,
        isInitial: true,
      }
    ]);
    setFeedbackGiven({});
  };

  const quickQuestions = [
    "Where is my drive?",
    "When is my registration?",
    "Where can I find my QR?",
    "How do reminders work?",
    "How do I change my communication preferences?",
    "Can I donate if I took paracetamol yesterday?"
  ];

  return (
    <div className="space-y-6">
      {/* Breadcrumb & Support Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-slate-500 text-xs mb-1.5 font-medium">
            <Link to="/donor" className="hover:text-slate-900 transition-colors">Donor Portal</Link>
            <span className="text-slate-300">/</span>
            <span className="hover:text-slate-900 transition-colors">Support</span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-900 font-semibold">Assistant</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            RaktSetu Assistant
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            Get quick answers about registration, drives, reminders, and your RaktSetu experience.
          </p>
        </div>

        {/* Live Assistant Status Pill */}
        <div className="inline-flex items-center gap-2 self-start md:self-auto px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-600"></span>
          </span>
          <span className="text-xs font-semibold text-slate-700">
            RaktSetu Support Assistant • <span className="text-sky-600 font-medium">AI-Powered Information Desk</span>
          </span>
        </div>
      </div>

      {/* Main Grid: 65% Main Chat / 35% Sidebar Context */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start min-w-0">
        {/* LEFT COLUMN: Main Chat Conversation Area (8 cols on Desktop) */}
        <section className="lg:col-span-8 flex flex-col bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden min-w-0">
          {/* Conversation Window Context Bar */}
          <div className="px-4 sm:px-6 py-3 bg-slate-50/80 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center">
                <span className="material-symbols-outlined text-[14px]">smart_toy</span>
              </div>
              <span className="text-xs font-bold text-slate-900">Live Donor Session</span>
              <span className="text-slate-300">•</span>
              <span className="text-xs text-slate-500">Encrypted &amp; Grounded</span>
            </div>
            <button
              onClick={handleResetChat}
              className="text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-1 text-xs font-semibold"
              title="Clear current session memory"
            >
              <span className="material-symbols-outlined text-[16px]">refresh</span>
              <span className="hidden sm:inline">Reset Chat</span>
            </button>
          </div>

          {/* Scrollable Messages Feed */}
          <div className="p-4 sm:p-6 space-y-6 flex-1 min-w-0 overflow-y-auto max-h-[640px]">
            {messages.map((msg) => (
              <React.Fragment key={msg.id}>
                {msg.sender === 'user' ? (
                  /* User Message Bubble */
                  <div className="flex items-start justify-end gap-3 max-w-2xl ml-auto">
                    <div className="space-y-1.5 text-right min-w-0">
                      <div className="flex items-center justify-end gap-2">
                        <span className="text-xs text-slate-400">{msg.time}</span>
                        <span className="text-xs font-bold text-slate-900">{currentDonor?.name || 'Rahul Sharma'}</span>
                      </div>
                      <div className="p-3.5 sm:p-4 rounded-xl rounded-tr-xs bg-slate-900 text-white text-sm text-left shadow-xs inline-block">
                        {msg.text}
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-sky-100 text-sky-900 text-xs flex-shrink-0 flex items-center justify-center font-bold">
                      RS
                    </div>
                  </div>
                ) : (
                  /* Assistant Message Bubble */
                  <div className="flex items-start gap-3 max-w-2xl">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 text-sky-600 flex-shrink-0 flex items-center justify-center border border-slate-200">
                      <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        auto_awesome
                      </span>
                    </div>

                    <div className="space-y-3 min-w-0 flex-1">
                      <div className="flex items-baseline gap-2">
                        <span className="text-xs font-bold text-slate-900">RaktSetu Assistant</span>
                        <span className="text-xs text-slate-400">{msg.time}</span>
                      </div>

                      {/* Initial Greeting */}
                      {msg.isInitial && (
                        <>
                          <div className="p-4 rounded-xl rounded-tl-xs bg-slate-50 border border-slate-200 text-slate-800 text-sm leading-relaxed">
                            {msg.text}
                          </div>
                          {/* Suggested prompt chips */}
                          <div className="pt-1">
                            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">Suggested Quick Inquiries</p>
                            <div className="flex flex-wrap gap-2">
                              {quickQuestions.map((q, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => handleSend(q)}
                                  className="px-3 py-1.5 rounded-full text-left text-xs font-semibold bg-sky-50 text-sky-800 hover:bg-sky-100 transition-colors border border-sky-200"
                                >
                                  {q}
                                </button>
                              ))}
                            </div>
                          </div>
                        </>
                      )}

                      {/* Medical Guardrail Response */}
                      {msg.isGuardrail && (
                        <div className="p-4 sm:p-5 rounded-xl rounded-tl-xs bg-rose-50/70 border-2 border-rose-300 text-slate-900 space-y-3 relative overflow-hidden">
                          {/* Safety Badge Banner */}
                          <div className="flex items-center gap-2 text-rose-800">
                            <span className="material-symbols-outlined text-[20px] text-rose-600 font-semibold">
                              verified_user
                            </span>
                            <span className="text-sm font-bold">Medical Guardrail Activated</span>
                          </div>
                          {/* Message Content */}
                          <p className="text-sm leading-relaxed text-slate-800">
                            {msg.text}
                          </p>
                          {/* Action CTAs */}
                          <div className="flex flex-wrap items-center gap-2 pt-1">
                            <a
                              href="https://nbtc.mohfw.gov.in"
                              target="_blank"
                              rel="noreferrer"
                              className="px-3.5 py-2 rounded-lg bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors flex items-center gap-1.5 shadow-xs"
                            >
                              <span>View Official Screening Information</span>
                              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                            </a>
                            <a
                              href="tel:+917122560199"
                              className="px-3.5 py-2 rounded-lg bg-white border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-1.5"
                            >
                              <span className="material-symbols-outlined text-[16px] text-slate-600">call</span>
                              <span>Contact Venue Medical Desk</span>
                            </a>
                          </div>
                          {/* Policy Source Footer */}
                          <div className="pt-2 border-t border-rose-200/80 flex items-center gap-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                            <span className="material-symbols-outlined text-[14px]">policy</span>
                            <span>Verified Policy: Medical Safety Guardrail &amp; Clinical Jurisdiction Separation</span>
                          </div>
                        </div>
                      )}

                      {/* Drive Info Response with Structured Metadata Card */}
                      {msg.isDriveInfo && (
                        <div className="p-4 rounded-xl rounded-tl-xs bg-slate-50 border border-slate-200 text-slate-800 text-sm space-y-3">
                          <p>
                            Your registered drive is the <strong className="font-bold text-slate-900">{msg.driveDetails.name}</strong> on <strong className="font-bold text-slate-900">{registeredDrive.date}</strong>, from <strong className="font-bold text-slate-900">{registeredDrive.time}</strong> at <strong className="font-bold text-slate-900">{registeredDrive.venue}, {registeredDrive.city}</strong>.
                          </p>

                          {/* Metadata Card inside message */}
                          <div className="bg-white p-3.5 rounded-lg border border-slate-200 space-y-2.5">
                            <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-2">
                              <div>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Confirmed Drive</span>
                                <span className="text-sm font-bold text-slate-900">{msg.driveDetails.name}</span>
                              </div>
                              <span className="px-2 py-0.5 rounded-full text-xs bg-sky-100 text-sky-800 font-bold">
                                {msg.driveDetails.regId}
                              </span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs">
                              <div className="flex items-center gap-2 text-slate-700">
                                <span className="material-symbols-outlined text-sky-600 text-[18px]">schedule</span>
                                <span><strong>Slot:</strong> {msg.driveDetails.slot}</span>
                              </div>
                              <div className="flex items-center gap-2 text-slate-700">
                                <span className="material-symbols-outlined text-sky-600 text-[18px]">local_parking</span>
                                <span>{msg.driveDetails.parking}</span>
                              </div>
                            </div>
                            <div className="flex items-start gap-2 pt-1 text-xs text-slate-500">
                              <span className="material-symbols-outlined text-sky-600 text-[18px] flex-shrink-0">location_on</span>
                              <span>{msg.driveDetails.address}</span>
                            </div>
                          </div>

                          {/* Grounding Source Tag */}
                          <div className="pt-1 flex items-center gap-1.5 text-xs text-sky-700 font-semibold">
                            <span className="material-symbols-outlined text-[16px] text-sky-600">verified</span>
                            <span>Source: RaktSetu Drive Information (Verified Node RC-MH-01)</span>
                          </div>
                        </div>
                      )}

                      {/* QR Info Response */}
                      {msg.isQrInfo && (
                        <div className="p-4 rounded-xl rounded-tl-xs bg-slate-50 border border-slate-200 text-slate-800 text-sm space-y-3">
                          <p>{msg.text}</p>
                          <div className="pt-1">
                            <Link
                              to="/donor/registration"
                              className="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 transition-colors shadow-xs"
                            >
                              <span className="material-symbols-outlined text-[16px]">qr_code</span>
                              <span>Open My Registration Pass</span>
                            </Link>
                          </div>
                        </div>
                      )}

                      {/* General Non-Initial Response */}
                      {!msg.isInitial && !msg.isGuardrail && !msg.isDriveInfo && !msg.isQrInfo && (
                        <div className="p-4 rounded-xl rounded-tl-xs bg-slate-50 border border-slate-200 text-slate-800 text-sm leading-relaxed">
                          {msg.text}
                          <div className="mt-2 pt-2 border-t border-slate-200 flex items-center gap-1.5 text-xs text-sky-700 font-semibold">
                            <span className="material-symbols-outlined text-[14px]">verified</span>
                            <span>Source: RaktSetu Knowledge Base &amp; FAQ Policy</span>
                          </div>
                        </div>
                      )}

                      {/* Feedback Rating */}
                      {!msg.isInitial && (
                        <div className="flex items-center gap-3 px-1 text-slate-500 text-xs">
                          <span>{msg.isGuardrail ? "Did this guide you to the right protocol?" : "Was this helpful?"}</span>
                          <div className="inline-flex items-center gap-1">
                            <button
                              onClick={() => setFeedbackGiven(prev => ({ ...prev, [msg.id]: 'up' }))}
                              className={`p-1 rounded transition-colors ${feedbackGiven[msg.id] === 'up' ? 'bg-sky-100 text-sky-700' : 'hover:bg-slate-100 text-slate-600'}`}
                              title="Helpful"
                            >
                              👍
                            </button>
                            <button
                              onClick={() => setFeedbackGiven(prev => ({ ...prev, [msg.id]: 'down' }))}
                              className={`p-1 rounded transition-colors ${feedbackGiven[msg.id] === 'down' ? 'bg-rose-100 text-rose-700' : 'hover:bg-slate-100 text-slate-600'}`}
                              title="Unhelpful"
                            >
                              👎
                            </button>
                            {feedbackGiven[msg.id] && (
                              <span className="text-[11px] font-semibold text-emerald-600 ml-1">Feedback recorded</span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Sticky Chat Input Area */}
          <div className="p-3 sm:p-4 bg-white border-t border-slate-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="space-y-2"
            >
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask RaktSetu Assistant... (e.g., 'How to download my QR pass' or 'Can I donate if taking medicine?')"
                  className="w-full pl-4 pr-24 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all"
                />
                <div className="absolute right-2 flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleSend(quickQuestions[0])}
                    className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                    title="Frequently asked queries"
                  >
                    <span className="material-symbols-outlined text-[20px]">help_outline</span>
                  </button>
                  <button
                    type="submit"
                    className="w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-slate-800 transition-transform active:scale-95 shadow-xs"
                    title="Send message to assistant"
                  >
                    <span className="material-symbols-outlined text-[18px]">send</span>
                  </button>
                </div>
              </div>

              {/* Disclaimer footnote */}
              <div className="flex items-center justify-between px-1 text-slate-500 text-xs">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">info</span>
                  AI answers based on official drive FAQ • No clinical diagnosis
                </span>
                <span className="hidden sm:inline text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Zero Health Data Retention
                </span>
              </div>
            </form>
          </div>
        </section>

        {/* RIGHT COLUMN: Context & Guardrails (4 cols on Desktop) */}
        <aside className="lg:col-span-4 space-y-6 min-w-0">
          {/* 1. Medical Screening & Jurisdiction Notice Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs relative overflow-hidden">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex-shrink-0 flex items-center justify-center border border-sky-100">
                <span className="material-symbols-outlined text-[20px]">health_and_safety</span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Safety &amp; Medical Notice</h3>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Clinical Jurisdiction Policy</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 mt-3.5 leading-relaxed">
              RaktSetu cannot determine donor eligibility or provide medical screening decisions. Final medical eligibility is assessed in-person by licensed blood bank clinical officers at the venue.
            </p>
            <div className="mt-4 pt-3.5 border-t border-slate-100">
              <a
                href="https://nbtc.mohfw.gov.in"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-sky-600 hover:text-sky-700 font-bold"
              >
                <span>View Official Screening Information</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </a>
            </div>
          </div>

          {/* 2. Browse Help Topics (Interactive Quick Inquiries) */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">Browse Help Topics</h3>
              <span className="text-[11px] font-bold uppercase text-sky-600">6 Guides</span>
            </div>
            <ul className="divide-y divide-slate-100 mt-1">
              {[
                { title: 'Registration & Slot Management', desc: 'View slot details, cancellation', icon: 'how_to_reg', query: 'When is my registration?' },
                { title: 'Drive Logistics & Directions', desc: 'Venue transit, parking, timing', icon: 'map', query: 'Where is my drive?' },
                { title: 'QR Check-in Pass', desc: 'Wallet pass, PDF download', icon: 'qr_code_scanner', query: 'Where can I find my QR?' },
                { title: 'Smart Reminders', desc: 'WhatsApp & SMS dispatch timeline', icon: 'notifications_active', query: 'How do reminders work?' },
                { title: 'Communication Preferences', desc: 'Opt-out, alert frequency', icon: 'tune', query: 'How do I change my communication preferences?' },
                { title: 'Official Screening Guidelines', desc: 'General requirements preview', icon: 'assignment', query: 'Can I donate if I took paracetamol yesterday?' },
              ].map((topic, i) => (
                <li key={i} className="py-2.5">
                  <button
                    onClick={() => handleSend(topic.query)}
                    className="w-full flex items-center justify-between group text-left hover:text-sky-600 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-[18px] text-slate-400 group-hover:text-sky-600">
                        {topic.icon}
                      </span>
                      <div>
                        <span className="text-xs font-semibold text-slate-900 group-hover:text-sky-600 block">
                          {topic.title}
                        </span>
                        <span className="text-[11px] text-slate-500">{topic.desc}</span>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-[16px] text-slate-300 group-hover:translate-x-0.5 group-hover:text-sky-600 transition-all">
                      chevron_right
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. System Transparency / How Assistant Works Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <span className="material-symbols-outlined text-sky-600 text-[20px]">account_tree</span>
              <h3 className="text-sm font-bold text-slate-900">How RaktSetu Assistant Works</h3>
            </div>
            {/* Flow Steps */}
            <div className="mt-4 space-y-3">
              {[
                { step: '1', title: 'Donor Query', desc: 'You ask a question about your drive or pass.' },
                { step: '2', title: 'Intent & Safety Check', desc: 'Medical inquiries automatically activate safety guardrails.' },
                { step: '3', title: 'Official Drive & FAQ Match', desc: 'Answers are matched strictly against verified municipal records.' },
                { step: '4', title: 'Instant Answer / Medical Handoff', desc: 'Immediate resolution or direction to certified venue clinical desks.' },
              ].map((flow) => (
                <div key={flow.step} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-slate-100 text-sky-600 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {flow.step}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block leading-tight">{flow.title}</span>
                    <span className="text-[11px] text-slate-500">{flow.desc}</span>
                  </div>
                </div>
              ))}
            </div>
            {/* Transparency subtext */}
            <div className="mt-4 pt-3.5 border-t border-slate-100 bg-slate-50/80 p-3 rounded-lg">
              <p className="text-[11px] text-slate-500 leading-normal">
                Responses are strictly grounded in verified civic drive information and official protocols. No personal medical records are retained.
              </p>
            </div>
          </div>

          {/* 4. Direct Venue Help */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-5 text-white shadow-xs">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-sky-400 text-[20px]">contact_support</span>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Need Venue Coordination?</h4>
            </div>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              For on-ground mobility assistance, wheelchair access, or live directions to East Wing Hall:
            </p>
            <div className="mt-3.5 flex items-center justify-between bg-white/10 px-3 py-2 rounded-lg text-xs">
              <span className="font-mono text-sky-300 font-semibold">+91 712 256 0199</span>
              <span className="text-[10px] text-slate-300">Desk 09:00 - 16:00</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
