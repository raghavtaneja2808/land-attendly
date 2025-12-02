import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* CONFIGURATION */
const APP_URL = "https://attendly-xi.vercel.app/";
const APK_URL = "/Attendly.apk";

// --- ICONS ---
const IconWrapper = ({ children, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {children}
  </svg>
);

const Share = (props) => (<IconWrapper {...props}><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></IconWrapper>);
const PlusSquare = (props) => (<IconWrapper {...props}><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></IconWrapper>);
const ChevronRight = (props) => (<IconWrapper {...props}><polyline points="9 18 15 12 9 6"/></IconWrapper>);
const Download = (props) => (<IconWrapper {...props}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></IconWrapper>);
const X = (props) => (<IconWrapper {...props}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></IconWrapper>);
const CheckCircle = (props) => (<IconWrapper {...props}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></IconWrapper>);
const XCircle = (props) => (<IconWrapper {...props}><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></IconWrapper>);
const PieChart = (props) => (<IconWrapper {...props}><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></IconWrapper>);
const AlertCircle = (props) => (<IconWrapper {...props}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></IconWrapper>);
const Lock = (props) => (<IconWrapper {...props}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></IconWrapper>);
const Briefcase = (props) => (<IconWrapper {...props}><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></IconWrapper>);
const Zap = (props) => (<IconWrapper {...props}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></IconWrapper>);
const Calendar = (props) => (<IconWrapper {...props}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></IconWrapper>);
const Moon = (props) => (<IconWrapper {...props}><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></IconWrapper>);
const MessageSquare = (props) => (<IconWrapper {...props}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></IconWrapper>);
const Bell = (props) => (<IconWrapper {...props}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></IconWrapper>);
const Sparkles = (props) => (<IconWrapper {...props}><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z"/><path d="M5 19l.5 1.5L7 21l-1.5.5L5 23l-.5-1.5L3 21l1.5-.5L5 19z"/><path d="M19 5l.5 1.5L21 7l-1.5.5L19 9l-.5-1.5L17 7l1.5-.5L19 5z"/></IconWrapper>);
const Clock = (props) => (<IconWrapper {...props}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></IconWrapper>);
const Search = (props) => (<IconWrapper {...props}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></IconWrapper>);

// --- PHONE MOCKUP COMPONENT ---
const PhoneMockup = ({ children, isDark = false, className = "" }) => (
  <div className={`phone-mockup relative w-[280px] h-[570px] md:w-[300px] md:h-[610px] rounded-[45px] md:rounded-[50px] shadow-2xl border-[11px] md:border-[12px] overflow-hidden ring-4 ring-slate-200/30 ${isDark ? 'bg-[#1A1A1A] border-[#2A2A2A]' : 'bg-slate-900 border-slate-800'} ${className}`}>
    {/* Dynamic Island */}
    <div className="absolute top-0 inset-x-0 h-7 z-30 flex justify-center items-start pt-2">
      <div className="w-24 h-6 bg-black rounded-full flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-white/20 ml-auto mr-3"></div>
      </div>
    </div>
    {/* Status Bar */}
    <div className="absolute top-0 inset-x-0 h-11 z-20 flex justify-between px-6 items-center pt-2">
      <span className="text-white text-[10px] font-bold">9:41</span>
      <div className="flex gap-1.5"><div className="w-3 h-3 bg-white/20 rounded-full"></div><div className="w-3 h-3 bg-white/20 rounded-full"></div></div>
    </div>
    {/* Content */}
    <div className={`w-full h-full flex flex-col pt-11 overflow-hidden font-sans rounded-[34px] md:rounded-[38px] ${isDark ? 'bg-[#121212]' : 'bg-[#F7F8FC]'}`}>
      {children}
    </div>
    {/* Home Indicator */}
    <div className={`absolute bottom-2 inset-x-0 flex items-center justify-center`}>
      <div className={`w-32 h-1 rounded-full ${isDark ? 'bg-white/20' : 'bg-black/20'}`}></div>
    </div>
  </div>
);

// --- MOCKUP SCREEN CONTENTS ---
const HomeScreen = ({ isDark }) => (
  <>
    <div className={`px-4 py-3 flex items-center gap-3 ${isDark ? 'bg-[#121212]' : 'bg-[#F7F8FC]'}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isDark ? 'bg-[#1E1E1E]' : 'bg-white border border-gray-200'}`}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M15 18L9 12L15 6" stroke="#FF9500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </div>
      <span className={`text-base font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Home</span>
    </div>
    <div className={`flex-1 overflow-y-auto px-4 pt-2 pb-16 space-y-4 no-scrollbar ${isDark ? 'bg-[#121212]' : 'bg-[#F7F8FC]'}`}>
      <div className="flex items-center justify-between py-2">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF9500] to-[#FF6B00] border-2 border-[#FF9500]"></div>
          <div>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Welcome back,</p>
            <p className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Raghav</p>
          </div>
        </div>
        <div className="flex gap-2">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDark ? 'bg-[#1E1E1E] border border-[#333]' : 'bg-white border border-gray-200'}`}>
            <Search className={`w-5 h-5 ${isDark ? 'text-[#FF9D4D]' : 'text-gray-500'}`} />
          </div>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDark ? 'bg-[#FF7A00]/20' : 'bg-orange-50'}`}>
            <MessageSquare className={`w-5 h-5 ${isDark ? 'text-[#FF9D4D]' : 'text-gray-900'}`} />
          </div>
        </div>
      </div>
      <div className={`rounded-2xl p-4 ${isDark ? 'bg-[#1E1E1E]/70 border border-[#333]' : 'bg-white border border-gray-200'}`}>
        <div className="flex justify-between items-center mb-4">
          <p className={`font-medium ${isDark ? 'text-[#FF9D4D]' : 'text-[#FF7A00]'}`}>Today's Schedule</p>
          <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Dec 2</span>
        </div>
        <div className="space-y-4">
          {[{ name: 'Data Structures', time: '9:00 AM - 10:00 AM', active: true }, { name: 'Operating Systems', time: '10:15 AM - 11:15 AM', active: false }, { name: 'Computer Networks', time: '2:00 PM - 3:00 PM', active: false }].map((slot, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="flex flex-col items-center">
                <div className={`w-3 h-3 rounded-full border-2 ${slot.active ? 'bg-[#FF7A00] border-[#FF7A00]' : isDark ? 'border-gray-600 bg-[#121212]' : 'border-gray-300 bg-white'}`}></div>
                {i < 2 && <div className={`w-0.5 h-8 ${isDark ? 'bg-[#333]' : 'bg-gray-200'}`}></div>}
              </div>
              <div className={`flex-1 ${!slot.active ? 'opacity-60' : ''}`}>
                <p className={`font-semibold text-sm ${slot.active ? 'text-[#FF7A00]' : isDark ? 'text-white' : 'text-gray-900'}`}>{slot.name}</p>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{slot.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className={`rounded-2xl p-4 aspect-square flex flex-col justify-between ${isDark ? 'bg-[#1E1E1E]/70 border border-[#333]' : 'bg-white border border-gray-200'}`}>
          <div className="flex justify-between"><p className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>Attendance</p><CheckCircle className="w-5 h-5 text-[#FF7A00]" /></div>
          <div><p className="text-3xl font-bold text-[#FF7A00]">87<span className="text-xl text-[#FF9D4D]">%</span></p><p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Good Standing</p></div>
        </div>
        <div className={`rounded-2xl p-4 aspect-square flex flex-col justify-between ${isDark ? 'bg-[#1E1E1E]/70 border border-[#333]' : 'bg-white border border-gray-200'}`}>
          <div className="flex justify-between"><p className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>Circulars</p><Bell className="w-5 h-5 text-[#FF7A00]" /></div>
          <div><p className="text-3xl font-bold text-[#FF7A00]">5</p><p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>New Updates</p></div>
        </div>
      </div>
    </div>
  </>
);

const AttendanceScreen = ({ isDark }) => (
  <>
    <div className={`px-4 py-3 flex items-center gap-3 ${isDark ? 'bg-[#121212]' : 'bg-[#F7F8FC]'}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isDark ? 'bg-[#1E1E1E]' : 'bg-white border border-gray-200'}`}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M15 18L9 12L15 6" stroke="#FF9500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </div>
      <span className={`text-base font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Attendance</span>
    </div>
    <div className={`flex-1 overflow-y-auto px-4 pt-2 pb-16 space-y-3 no-scrollbar ${isDark ? 'bg-[#121212]' : 'bg-[#F7F8FC]'}`}>
      <div className="bg-gradient-to-br from-[#FF9500] to-[#FF6B00] rounded-2xl p-4 text-white relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-white/80 text-xs font-medium mb-1">Overall Attendance</p>
          <p className="text-4xl font-black">87.3<span className="text-lg opacity-80">%</span></p>
          <div className="flex items-center gap-2 mt-2">
            <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px] font-bold">6 Subjects</span>
            <span className="text-white/60 text-xs">Above 75%</span>
          </div>
        </div>
        <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-white/10 rounded-full blur-2xl"></div>
      </div>
      {[{ name: 'Data Structures', code: 'CS201', percent: 92, status: 'safe', color: '#10B981' }, { name: 'Operating Systems', code: 'CS202', percent: 76, status: 'warning', color: '#F59E0B' }, { name: 'Computer Networks', code: 'CS301', percent: 88, status: 'safe', color: '#10B981' }, { name: 'Database Systems', code: 'CS303', percent: 74, status: 'danger', color: '#EF4444' }].map((subject, i) => (
        <div key={i} className={`rounded-2xl p-4 ${isDark ? 'bg-[#1E1E1E] border border-[#2A2A2A]' : 'bg-white border border-gray-100'}`}>
          <div className="flex justify-between items-start mb-3">
            <div><p className={`font-bold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{subject.name}</p><p className={`text-[10px] ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{subject.code}</p></div>
            <div className="px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ backgroundColor: `${subject.color}20`, color: subject.color }}>{subject.status === 'safe' ? 'Safe' : subject.status === 'warning' ? 'Warning' : 'Danger'}</div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1"><div className={`h-2 rounded-full overflow-hidden ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}><div className="h-full rounded-full" style={{ width: `${subject.percent}%`, backgroundColor: subject.color }}></div></div></div>
            <span className="text-sm font-bold" style={{ color: subject.color }}>{subject.percent}%</span>
          </div>
        </div>
      ))}
    </div>
  </>
);

const TimetableScreen = ({ isDark }) => (
  <>
    <div className={`px-4 py-3 flex items-center gap-3 ${isDark ? 'bg-[#121212]' : 'bg-[#F7F8FC]'}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isDark ? 'bg-[#1E1E1E]' : 'bg-white border border-gray-200'}`}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M15 18L9 12L15 6" stroke="#FF9500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </div>
      <span className={`text-base font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Timetable</span>
    </div>
    <div className={`flex-1 overflow-y-auto px-4 pt-2 pb-16 space-y-4 no-scrollbar ${isDark ? 'bg-[#121212]' : 'bg-[#F7F8FC]'}`}>
      <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 pb-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => (
          <div key={day} className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex-shrink-0 min-w-[52px] text-center ${i === 1 ? 'bg-[#FF7A00] text-white shadow-lg shadow-orange-500/30' : isDark ? 'bg-[#1E1E1E] text-gray-400 border border-[#333]' : 'bg-white text-gray-500 border border-gray-200'}`}>{day}</div>
        ))}
      </div>
      <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Monday <span className="text-[#FF7A00]">(Today)</span></p>
      {[{ name: 'Data Structures', time: '9:00 AM - 10:00 AM', room: 'Room 201', type: 'Lecture', color: '#3B82F6', active: true }, { name: 'Operating Systems Lab', time: '10:15 AM - 12:15 PM', room: 'Lab 3', type: 'Lab', color: '#10B981', active: false }, { name: 'Computer Networks', time: '2:00 PM - 3:00 PM', room: 'Room 305', type: 'Lecture', color: '#8B5CF6', active: false }].map((cls, i) => (
        <div key={i} className={`rounded-2xl p-4 border-l-4 ${cls.active ? 'bg-[#FF7A00]' : isDark ? 'bg-[#1E1E1E]/70' : 'bg-white'}`} style={{ borderLeftColor: cls.active ? '#FF7A00' : cls.color }}>
          <div className="flex justify-between items-start mb-2">
            <div><p className={`font-bold text-sm ${cls.active ? 'text-white' : isDark ? 'text-white' : 'text-gray-900'}`}>{cls.name}</p><p className={`text-[10px] mt-0.5 ${cls.active ? 'text-white/70' : isDark ? 'text-gray-500' : 'text-gray-400'}`}>{cls.room}</p></div>
            <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold text-white`} style={{ backgroundColor: cls.active ? 'rgba(255,255,255,0.2)' : cls.color }}>{cls.active ? 'NOW' : cls.type}</span>
          </div>
          <div className={`flex items-center gap-2 ${cls.active ? 'text-white/80' : isDark ? 'text-gray-400' : 'text-gray-500'}`}><Clock className="w-3 h-3" /><span className="text-xs font-medium">{cls.time}</span></div>
        </div>
      ))}
    </div>
  </>
);

const SubjectDetailScreen = ({ isDark }) => (
  <>
    <div className={`px-4 py-3 flex items-center gap-3 ${isDark ? 'bg-[#121212]' : 'bg-[#F7F8FC]'}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isDark ? 'bg-[#1E1E1E]' : 'bg-white border border-gray-200'}`}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M15 18L9 12L15 6" stroke="#FF9500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </div>
      <span className={`text-base font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Subject Details</span>
    </div>
    <div className={`flex-1 overflow-y-auto px-4 pt-2 pb-16 space-y-3 no-scrollbar ${isDark ? 'bg-[#121212]' : 'bg-[#F7F8FC]'}`}>
      <div className={`rounded-3xl p-5 relative overflow-hidden ${isDark ? 'bg-[#1E1E1E] border border-[#2A2A2A]' : 'bg-white border border-gray-100 shadow-sm'}`}>
        <div className="flex justify-between items-start mb-4">
          <div><h4 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Data Structures</h4><p className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>CS201 • Aug - Dec</p></div>
          <div className="bg-[#10B981]/10 px-3 py-1 rounded-full border border-[#10B981]/20"><span className="text-[#10B981] text-xs font-bold">Excellent</span></div>
        </div>
        <div className="mb-4">
          <div className="flex justify-between items-end mb-2">
            <span className={`text-4xl font-black tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>92.5<span className={`text-lg font-medium ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>%</span></span>
            <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>37/40 classes</span>
          </div>
          <div className={`h-2.5 rounded-full overflow-hidden ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}><div className="h-full w-[92.5%] bg-[#10B981] rounded-full" style={{ boxShadow: '0 0 10px #10B981' }}></div></div>
        </div>
      </div>
      <div className={`rounded-2xl p-4 flex items-center justify-between ${isDark ? 'bg-[#1E1E1E] border border-[#2A2A2A]' : 'bg-white border border-gray-100'}`}>
        <div><p className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>7 <span className={`text-sm font-medium ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>left</span></p><p className={`text-[10px] font-bold uppercase tracking-widest ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Skip Budget</p></div>
        <div className="w-16 h-16 relative">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
            <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke={isDark ? '#333' : '#E5E7EB'} strokeWidth="3" />
            <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#10B981" strokeWidth="3" strokeDasharray="70, 100" strokeLinecap="round" />
          </svg>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className={`rounded-xl p-3 ${isDark ? 'bg-[#1E1E1E] border border-[#2A2A2A]' : 'bg-white border border-gray-100'}`}>
          <div className="flex items-center gap-1.5 mb-2 opacity-60"><CheckCircle className="w-3.5 h-3.5 text-[#10B981]" /><span className={`text-[10px] font-bold uppercase ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Attended</span></div>
          <span className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>37</span>
        </div>
        <div className={`rounded-xl p-3 ${isDark ? 'bg-[#1E1E1E] border border-[#2A2A2A]' : 'bg-white border border-gray-100'}`}>
          <div className="flex items-center gap-1.5 mb-2 opacity-60"><XCircle className="w-3.5 h-3.5 text-[#EF4444]" /><span className={`text-[10px] font-bold uppercase ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Absent</span></div>
          <span className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>03</span>
        </div>
      </div>
    </div>
  </>
);

const ProfileScreen = () => (
  <>
    <div className="px-4 py-3 flex items-center gap-3 bg-[#121212]">
      <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#1E1E1E]">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M15 18L9 12L15 6" stroke="#FF9500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </div>
      <span className="text-base font-bold text-white">Profile</span>
    </div>
    <div className="flex-1 overflow-y-auto px-4 pt-2 pb-16 space-y-4 no-scrollbar bg-[#121212]">
      <div className="bg-[#1E1E1E] rounded-3xl p-5 border border-[#2A2A2A]">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FF9500] to-[#FF6B00] flex items-center justify-center"><span className="text-2xl font-bold text-white">RT</span></div>
          <div><h4 className="text-lg font-bold text-white">Raghav Taneja</h4><p className="text-xs text-gray-500">BE/CSE/2022/123</p></div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-[#2A2A2A] rounded-xl p-3 text-center"><p className="text-lg font-bold text-white">87%</p><p className="text-[10px] text-gray-500">Attendance</p></div>
          <div className="bg-[#2A2A2A] rounded-xl p-3 text-center"><p className="text-lg font-bold text-white">6</p><p className="text-[10px] text-gray-500">Subjects</p></div>
        </div>
      </div>
      <div className="bg-[#1E1E1E] rounded-3xl border border-[#2A2A2A] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-[#2A2A2A]">
          <div className="flex items-center gap-3"><div className="w-9 h-9 rounded-xl bg-[#2A2A2A] flex items-center justify-center"><Moon className="w-5 h-5 text-[#FF9500]" /></div><span className="text-sm font-medium text-white">Dark Mode</span></div>
          <div className="w-11 h-6 bg-[#FF9500] rounded-full relative"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow"></div></div>
        </div>
        <div className="flex items-center justify-between p-4 border-b border-[#2A2A2A]">
          <div className="flex items-center gap-3"><div className="w-9 h-9 rounded-xl bg-[#2A2A2A] flex items-center justify-center"><Bell className="w-5 h-5 text-blue-500" /></div><span className="text-sm font-medium text-white">Notifications</span></div>
          <ChevronRight className="w-5 h-5 text-gray-500" />
        </div>
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3"><div className="w-9 h-9 rounded-xl bg-[#2A2A2A] flex items-center justify-center"><MessageSquare className="w-5 h-5 text-green-500" /></div><span className="text-sm font-medium text-white">Send Feedback</span></div>
          <ChevronRight className="w-5 h-5 text-gray-500" />
        </div>
      </div>
    </div>
  </>
);

// --- FEATURE SECTION COMPONENT ---
const FeatureSection = ({ id, title, subtitle, description, features, phoneContent, isDark, reverse, bgColor }) => {
  const sectionRef = useRef(null);
  const phoneRef = useRef(null);
  const contentRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Phone animation
      gsap.fromTo(phoneRef.current,
        { opacity: 0, x: reverse ? 100 : -100, rotateY: reverse ? -15 : 15 },
        {
          opacity: 1, x: 0, rotateY: 0, duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%", toggleActions: "play none none reverse" }
        }
      );

      // Content animation
      gsap.fromTo(contentRef.current.children,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 65%", toggleActions: "play none none reverse" }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reverse]);

  return (
    <section id={id} ref={sectionRef} className={`py-20 md:py-32 ${bgColor || 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${reverse ? 'lg:flex-row-reverse' : ''}`}>
          {/* Phone */}
          <div ref={phoneRef} className={`flex justify-center ${reverse ? 'lg:order-2' : 'lg:order-1'}`} style={{ perspective: '1000px' }}>
            <PhoneMockup isDark={isDark}>{phoneContent}</PhoneMockup>
          </div>

          {/* Content */}
          <div ref={contentRef} className={`space-y-6 ${reverse ? 'lg:order-1' : 'lg:order-2'}`}>
            <span className="inline-block px-4 py-1.5 bg-orange-50 text-[#FF9500] text-xs font-bold rounded-full uppercase tracking-wide">{title}</span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight tracking-tight">{subtitle}</h2>
            <p className="text-slate-500 text-lg leading-relaxed max-w-lg">{description}</p>
            <div className="space-y-4 pt-4">
              {features.map((feature, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#FF9500] flex items-center justify-center shrink-0 border border-orange-100">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-slate-700 text-lg">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- MAIN APP ---
const App = () => {
  const [isIOS, setIsIOS] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showInstallGuide, setShowInstallGuide] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const heroRef = useRef(null);
  const heroPhoneRef = useRef(null);
  const heroContentRef = useRef(null);
  const featuresGridRef = useRef(null);
  const whatsNewRef = useRef(null);

  useLayoutEffect(() => {
    // Hero animations
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(heroContentRef.current.children,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.12 }
      );

      tl.fromTo(heroPhoneRef.current,
        { opacity: 0, y: 100, scale: 0.8, rotateX: 20 },
        { opacity: 1, y: 0, scale: 1, rotateX: 0, duration: 1.2 },
        "-=0.6"
      );

      // Floating animation for hero phone
      gsap.to(heroPhoneRef.current, {
        y: -15, duration: 2, ease: "power1.inOut", yoyo: true, repeat: -1
      });

      // Features grid animation
      gsap.fromTo(featuresGridRef.current?.children || [],
        { opacity: 0, y: 60, scale: 0.9 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.1, ease: "power2.out",
          scrollTrigger: { trigger: featuresGridRef.current, start: "top 75%", toggleActions: "play none none reverse" }
        }
      );

      // What's new cards animation
      gsap.fromTo(whatsNewRef.current?.children || [],
        { opacity: 0, y: 80, rotateX: 10 },
        {
          opacity: 1, y: 0, rotateX: 0, duration: 0.9, stagger: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: whatsNewRef.current, start: "top 70%", toggleActions: "play none none reverse" }
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);

    const userAgent = window.navigator.userAgent.toLowerCase();
    const checkIsIOS = /iphone|ipad|ipod/.test(userAgent);
    const checkIsAndroid = /android/.test(userAgent);
    setIsIOS(checkIsIOS);
    setIsAndroid(checkIsAndroid);
    setIsDesktop(!checkIsIOS && !checkIsAndroid);
    setIsStandalone(window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone);

    const hasSeenGuide = sessionStorage.getItem('attendly_guide_seen');
    if (checkIsIOS && !window.navigator.standalone && !hasSeenGuide) {
      setTimeout(() => setShowInstallGuide(true), 3000);
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDismissGuide = () => { setShowInstallGuide(false); sessionStorage.setItem('attendly_guide_seen', 'true'); };
  const handleOpenApp = () => window.location.href = APP_URL;

  return (
    <div ref={heroRef} className="min-h-screen bg-[#FAFAFA] font-sans text-slate-900 selection:bg-orange-100 selection:text-orange-700 antialiased overflow-x-hidden">
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* NAV */}
      <nav className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 border-b ${scrolled ? 'bg-white/90 backdrop-blur-xl border-slate-200/50 shadow-sm py-2 md:py-3' : 'bg-transparent border-transparent py-3 md:py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 md:w-10 md:h-10 items-center justify-center rounded-full bg-[#FF9500] flex shadow-orange-200 shadow-md">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">attendly.</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-500">
            <a href="#home-section" className="hover:text-orange-600 transition-colors">home</a>
            <a href="#attendance-section" className="hover:text-orange-600 transition-colors">attendance</a>
            <a href="#timetable-section" className="hover:text-orange-600 transition-colors">timetable</a>
            <a href="#whats-new" className="hover:text-orange-600 transition-colors">what's new</a>
          </div>
          <div className="hidden md:flex gap-3">
            {isAndroid && <a href={APK_URL} className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2"><Download className="w-4 h-4" /> Download APK</a>}
            {(isIOS || isDesktop) && <button onClick={handleOpenApp} className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all">Open Web App</button>}
            {isDesktop && <a href={APK_URL} download="attendly.apk" className="bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 p-2.5 rounded-full" title="Download APK"><Download className="w-4 h-4" /></a>}
          </div>
        </div>
      </nav>

      <main>
        {/* HERO */}
        <section className="pt-28 md:pt-36 pb-16 md:pb-24 bg-gradient-to-b from-white to-slate-50">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Hero Content */}
              <div ref={heroContentRef} className="text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 text-[#FF9500] text-xs font-bold uppercase tracking-wide mb-6">
                  <span className="w-2 h-2 rounded-full bg-[#FF9500] animate-pulse"></span>
                  v2.0.0 Now Live
                  <Sparkles className="w-4 h-4" />
                </div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[1.1] mb-6 text-slate-900">
                  padh le, bhai.<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9500] via-orange-500 to-amber-500">no drama.</span>
                </h1>
                <p className="text-lg md:text-xl text-slate-500 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
                  The smart attendance companion that tells you <span className="text-slate-900 font-semibold">exactly</span> how many lectures you can skip.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  {(isIOS || isDesktop) && <button onClick={handleOpenApp} className="w-full sm:w-auto h-14 px-8 bg-[#FF9500] hover:bg-orange-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-orange-500/25 hover:shadow-orange-500/40 transition-all hover:-translate-y-1 flex items-center justify-center gap-3"><span>Open Web App</span><ChevronRight className="w-5 h-5" /></button>}
                  {(isAndroid || isDesktop) && <a href={APK_URL} download={isDesktop ? "attendly.apk" : undefined} className={`w-full sm:w-auto h-14 px-8 rounded-2xl font-bold text-lg border transition-all flex items-center justify-center gap-3 ${isDesktop ? "bg-white hover:bg-slate-50 text-slate-700 border-slate-200" : "bg-[#FF9500] hover:bg-orange-600 text-white shadow-xl shadow-orange-500/25"}`}><Download className="w-5 h-5" /><span>Download APK</span></a>}
                  {isIOS && !isStandalone && <button onClick={() => setShowInstallGuide(true)} className="w-full sm:w-auto h-14 px-6 bg-white hover:bg-slate-50 text-slate-600 rounded-2xl font-bold text-lg border border-slate-200 flex items-center justify-center gap-3"><PlusSquare className="w-5 h-5" /><span>Add to Home</span></button>}
                </div>
              </div>

              {/* Hero Phone */}
              <div ref={heroPhoneRef} className="flex justify-center lg:justify-end" style={{ perspective: '1000px' }}>
                <PhoneMockup isDark={false}>
                  <HomeScreen isDark={false} />
                </PhoneMockup>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURE SECTIONS - One by one */}
        <FeatureSection
          id="home-section"
          title="Dashboard"
          subtitle="Everything at a glance"
          description="Your personalized dashboard shows today's schedule, attendance stats, and circulars all in one place. No more digging through multiple apps."
          features={["Today's schedule with live indicator", "Overall attendance percentage", "Quick access to circulars", "Personalized greeting"]}
          phoneContent={<HomeScreen isDark={false} />}
          isDark={false}
          reverse={false}
          bgColor="bg-slate-50"
        />

        <FeatureSection
          id="attendance-section"
          title="Attendance"
          subtitle="Track every subject"
          description="See all your subjects with real-time attendance percentages. Safe, Warning, and Danger badges help you identify which subjects need attention."
          features={["Subject-wise breakdown", "Safe/Warning/Danger indicators", "Overall percentage card", "Progress bars for each subject"]}
          phoneContent={<AttendanceScreen isDark={false} />}
          isDark={false}
          reverse={true}
          bgColor="bg-white"
        />

        <FeatureSection
          id="timetable-section"
          title="Timetable"
          subtitle="Your weekly schedule"
          description="View your complete weekly schedule with day selector. See which class is happening NOW and plan your day accordingly."
          features={["Day-by-day view", "Live NOW indicator", "Room & teacher info", "Lecture vs Lab badges"]}
          phoneContent={<TimetableScreen isDark={false} />}
          isDark={false}
          reverse={false}
          bgColor="bg-slate-50"
        />

        <FeatureSection
          id="details-section"
          title="Subject Details"
          subtitle="Deep dive analytics"
          description="Get detailed insights into each subject. See your skip budget, attendance count, and simulate what happens if you skip today."
          features={["Skip budget calculator", "Attended vs Absent count", "Percentage with progress bar", "What-if simulator"]}
          phoneContent={<SubjectDetailScreen isDark={false} />}
          isDark={false}
          reverse={true}
          bgColor="bg-white"
        />

        <FeatureSection
          id="profile-section"
          title="Profile & Dark Mode"
          subtitle="Personalize your experience"
          description="Your profile with attendance summary, and the much-requested dark mode. Easy on the eyes during late-night study sessions."
          features={["Beautiful dark mode", "Profile summary card", "Quick settings access", "Send feedback option"]}
          phoneContent={<ProfileScreen />}
          isDark={true}
          reverse={false}
          bgColor="bg-slate-900"
        />

        {/* WHAT'S NEW */}
        <section id="whats-new" className="py-20 md:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-100 to-amber-100 text-[#FF9500] text-sm font-bold mb-4"><Sparkles className="w-4 h-4" />New in v2.0.0</div>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">Fresh features, same simplicity.</h2>
              <p className="text-slate-500 text-lg">We listened to your feedback and built what you asked for.</p>
            </div>

            <div ref={whatsNewRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-3xl shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-slate-800 border border-slate-700 text-[#FF9500] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"><Moon className="w-8 h-8" /></div>
                  <h3 className="text-2xl font-bold text-white mb-3">Dark Mode</h3>
                  <p className="text-slate-400 leading-relaxed">Easy on the eyes during late-night study sessions. Toggle from profile settings.</p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-3xl shadow-xl border border-blue-100 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-40 h-40 bg-blue-200/30 rounded-full blur-3xl"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-white text-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-100 group-hover:scale-110 transition-transform"><Calendar className="w-8 h-8" /></div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">Weekly Timetable</h3>
                  <p className="text-slate-600 leading-relaxed">Your complete schedule at a glance. See all classes with room numbers.</p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-3xl shadow-xl border border-green-100 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-40 h-40 bg-green-200/30 rounded-full blur-3xl"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-white text-green-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-green-100 group-hover:scale-110 transition-transform"><MessageSquare className="w-8 h-8" /></div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">Send Feedback</h3>
                  <p className="text-slate-600 leading-relaxed">Got ideas or found a bug? Send feedback directly. We read every message!</p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-3xl shadow-xl border border-purple-100 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-40 h-40 bg-purple-200/30 rounded-full blur-3xl"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-white text-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-purple-100 group-hover:scale-110 transition-transform"><Bell className="w-8 h-8" /></div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">What's New Updates</h3>
                  <p className="text-slate-600 leading-relaxed">Stay informed about new features. We'll show you what's changed.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES GRID */}
        <section className="py-20 md:py-32 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">More information, less stress.</h2>
              <p className="text-slate-500 text-lg">Every pixel designed to give you clarity at 8:00 AM.</p>
            </div>

            <div ref={featuresGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: <PieChart className="w-7 h-7" />, color: 'blue', title: 'Smart Calculations', desc: 'Official formula: (Attended + DL + ML) / Delivered.' },
                { icon: <Briefcase className="w-7 h-7" />, color: 'pink', title: 'Duty & Medical Leaves', desc: 'Auto-fetched and added to your count.' },
                { icon: <Zap className="w-7 h-7" />, color: 'orange', title: 'Skip Budget Gauge', desc: 'See how many classes you can miss.' },
                { icon: <AlertCircle className="w-7 h-7" />, color: 'red', title: 'Danger Zone Alerts', desc: 'Subjects near 75% are highlighted.' },
                { icon: <Lock className="w-7 h-7" />, color: 'green', title: 'Privacy First', desc: 'We never store your password.' },
                { icon: <Calendar className="w-7 h-7" />, color: 'purple', title: 'Timetable Sync', desc: 'Auto-imported. No manual entry.' },
              ].map((f, i) => (
                <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:border-orange-100 hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-300">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${f.color === 'blue' ? 'bg-blue-50 text-blue-600' : f.color === 'pink' ? 'bg-pink-50 text-pink-600' : f.color === 'orange' ? 'bg-orange-50 text-[#FF9500]' : f.color === 'red' ? 'bg-red-50 text-red-600' : f.color === 'green' ? 'bg-green-50 text-green-600' : 'bg-purple-50 text-purple-600'}`}>{f.icon}</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{f.title}</h3>
                  <p className="text-slate-500 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-12 px-4 md:px-6 text-center border-t border-slate-200 bg-white">
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-10 h-10 items-center justify-center rounded-full bg-[#FF9500] flex shadow-orange-200 shadow-md">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <span className="font-bold text-xl text-slate-900">attendly.</span>
          </div>
          <p className="text-slate-500 text-sm mb-6">Built by <a href="https://www.linkedin.com/in/raghav-taneja-bb84412b7/" target="_blank" rel="noopener noreferrer" className="font-bold text-slate-900 hover:text-[#FF9500]">Raghav Taneja</a>. Not affiliated with Chitkara University.</p>
          <a href="mailto:raghavtaneja2808@gmail.com" className="text-slate-400 text-sm hover:text-[#FF9500] block mb-8">raghavtaneja2808@gmail.com</a>
          <div className="flex justify-center gap-6 text-xs font-bold uppercase tracking-wider text-slate-400"><a href="#" className="hover:text-[#FF9500]">Privacy</a><a href="#" className="hover:text-[#FF9500]">Terms</a><a href="#" className="hover:text-[#FF9500]">Contact</a></div>
          <p className="text-slate-300 text-[10px] mt-6">v2.0.0</p>
        </footer>
      </main>

      {/* iOS INSTALL GUIDE */}
      {showInstallGuide && !isAndroid && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={handleDismissGuide}></div>
          <div className="relative w-full max-w-md bg-white sm:rounded-3xl rounded-t-3xl shadow-2xl p-8">
            <button onClick={handleDismissGuide} className="absolute top-4 right-4 p-2 bg-slate-50 rounded-full hover:bg-slate-100"><X className="w-5 h-5 text-slate-500" /></button>
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl mx-auto mb-4 flex items-center justify-center text-[#FF9500]"><Download className="w-8 h-8" /></div>
              <h3 className="text-2xl font-bold text-slate-900">Install attendly</h3>
              <p className="text-slate-500 mt-2">Add to Home Screen for the full experience.</p>
            </div>
            <div className="space-y-4 bg-[#F5F5F5] p-5 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-4 text-sm text-slate-700"><Share className="w-5 h-5 text-blue-500" /><span>Tap <strong>Share</strong> in Safari</span></div>
              <div className="h-px bg-slate-200 w-full"></div>
              <div className="flex items-center gap-4 text-sm text-slate-700"><PlusSquare className="w-5 h-5 text-slate-900" /><span>Select <strong>Add to Home Screen</strong></span></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
