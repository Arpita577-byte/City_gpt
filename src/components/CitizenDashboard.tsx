import React from "react";
import { motion } from "motion/react";
import { Camera, MapPin, Brain, History, Bell, Trophy, Activity, User, AlertCircle, Sparkles, Check, ChevronRight } from "lucide-react";
import { Complaint, RewardPointInfo, CityNotification } from "../types";

interface CitizenDashboardProps {
  userName: string;
  userEmail: string;
  complaints: Complaint[];
  rewards: RewardPointInfo | null;
  notifications: CityNotification[];
  cityHealthScore: number;
  onNavigate: (page: string) => void;
  onSosToggle: () => void;
}

export default function CitizenDashboard({
  userName,
  userEmail,
  complaints,
  rewards,
  notifications,
  cityHealthScore,
  onNavigate,
  onSosToggle
}: CitizenDashboardProps) {
  
  // Calculate analytics
  const totalReportsCount = complaints.length;
  const resolvedCount = complaints.filter(c => c.status === "resolved").length;
  const pendingCount = totalReportsCount - resolvedCount;
  const unreadNotifs = notifications.filter(n => !n.read).length;

  // Filter the first 3 recent complaints for the bottom section
  const recentComplaints = complaints.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-6 pt-24 pb-16 text-neutral-100 font-sans">
      
      {/* Top Welcome block */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end mb-8 border-b border-sky-500/10 pb-6">
        
        {/* Welcome Text */}
        <div className="md:col-span-8 flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono bg-sky-950/40 text-sky-400 border border-sky-500/15 px-2.5 py-1 rounded">
              SMART CITIZEN ACCESS PANEL
            </span>
            <span className="text-[10px] text-neutral-500 font-mono hidden sm:inline">{userEmail}</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white font-display">
            Good Evening 👋
          </h2>
          <p className="text-xs text-neutral-400 font-light">
            Municipal telemetry points synchronized. Verify resolutions to maintain community efficiency benchmarks.
          </p>
        </div>

        {/* SOS Immediate Emergency Trigger */}
        <div className="md:col-span-4 flex items-center justify-end w-full">
          <button 
            id="dash-sos-btn"
            onClick={onSosToggle}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-rose-600/20 hover:bg-rose-600 text-rose-400 hover:text-white border border-rose-500/25 rounded-xl font-bold cursor-pointer transition-all duration-300 animate-pulse shadow-lg shadow-rose-600/10"
          >
            <AlertCircle className="w-4 h-4" />
            SOS EMERGENCY
          </button>
        </div>

      </div>

      {/* City Health Index Gauge Card (CRED Style) */}
      <div className="mb-10">
        <div className="bg-gradient-to-br from-[#0D1D2E] to-[#07111F] p-6 rounded-3xl border border-sky-500/10 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 bg-sky-500/10 rounded-2xl flex items-center justify-center border border-sky-500/20 text-sky-400">
              <Activity className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block">City Performance Grade</span>
              <h3 className="text-2xl font-bold text-white font-display">City Health Score: <span className="text-[#10B981] font-black">{cityHealthScore}/100</span></h3>
              <p className="text-xs text-neutral-400 font-light mt-0.5">Calculated autonomously based on active, pending, and fixed complaints.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-neutral-400">STATUS:</span>
            <span className="text-xs uppercase px-3 py-1 bg-emerald-950/55 text-[#10B981] border border-[#10B981]/25 rounded-full font-bold">
              ● Healthy Grid
            </span>
          </div>
        </div>
      </div>

      {/* FIRST ROW - 4 LARGE CARDS */}
      <div className="mb-8">
        <h3 className="text-xs font-mono uppercase tracking-widest text-[#0EA5E9] font-bold mb-5">Quick Actions</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Large Card 1: Report Issue */}
          <motion.div 
            whileHover={{ y: -4 }}
            onClick={() => onNavigate("report_issue")}
            className="bg-[#0D1D2E]/40 hover:bg-neutral-900/40 p-6 rounded-2xl border border-sky-500/10 hover:border-sky-500/20 flex flex-col justify-between items-start h-48 transition-all duration-300 group cursor-pointer"
          >
            <div className="w-11 h-11 bg-sky-500/10 group-hover:bg-sky-500/25 rounded-xl flex items-center justify-center border border-sky-500/20 text-sky-400 transition-colors">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-extrabold text-white mt-4 group-hover:text-sky-450 transition-colors">
                📸 Report Issue
              </h4>
              <p className="text-[11px] text-neutral-400 mt-1 font-light leading-relaxed">
                Snap photos or log voice files. AI structures and dispatches immediately.
              </p>
            </div>
          </motion.div>

          {/* Large Card 2: Live Map */}
          <motion.div 
            whileHover={{ y: -4 }}
            onClick={() => onNavigate("live_map")}
            className="bg-[#0D1D2E]/40 hover:bg-neutral-900/40 p-6 rounded-2xl border border-sky-500/10 hover:border-sky-500/20 flex flex-col justify-between items-start h-48 transition-all duration-300 group cursor-pointer"
          >
            <div className="w-11 h-11 bg-emerald-500/10 group-hover:bg-emerald-500/25 rounded-xl flex items-center justify-center border border-emerald-500/20 text-[#10B981] transition-colors">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-extrabold text-white mt-4 group-hover:text-emerald-450 transition-colors">
                🗺 Live Map
              </h4>
              <p className="text-[11px] text-neutral-400 mt-1 font-light leading-relaxed">
                View interactive pins of critical, medium, and resolved outages.
              </p>
            </div>
          </motion.div>

          {/* Large Card 3: AI Assistant */}
          <motion.div 
            whileHover={{ y: -4 }}
            onClick={() => onNavigate("ai_assistant")}
            className="bg-[#0D1D2E]/40 hover:bg-neutral-900/40 p-6 rounded-2xl border border-sky-500/10 hover:border-sky-500/20 flex flex-col justify-between items-start h-48 transition-all duration-300 group cursor-pointer"
          >
            <div className="w-11 h-11 bg-purple-500/10 group-hover:bg-purple-500/25 rounded-xl flex items-center justify-center border border-purple-500/20 text-purple-400 transition-colors">
              <Brain className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h4 className="text-base font-extrabold text-white mt-4 group-hover:text-purple-450 transition-colors">
                🤖 AI Assistant
              </h4>
              <p className="text-[11px] text-neutral-400 mt-1 font-light leading-relaxed">
                Chat with CityGPT in Hindi/English about local grids and outage diagnostics.
              </p>
            </div>
          </motion.div>

          {/* Large Card 4: My Complaints */}
          <motion.div 
            whileHover={{ y: -4 }}
            onClick={() => onNavigate("my_reports")}
            className="bg-[#0D1D2E]/40 hover:bg-neutral-900/40 p-6 rounded-2xl border border-sky-500/10 hover:border-sky-500/20 flex flex-col justify-between items-start h-48 transition-all duration-300 group cursor-pointer"
          >
            <div className="w-11 h-11 bg-amber-500/10 group-hover:bg-amber-500/25 rounded-xl flex items-center justify-center border border-amber-500/20 text-amber-400 transition-colors">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-extrabold text-white mt-4 group-hover:text-amber-450 transition-colors">
                📜 My Complaints
              </h4>
              <p className="text-[11px] text-neutral-400 mt-1 font-light leading-relaxed">
                Monitor live chronological workflow statuses and verify resolutions.
              </p>
            </div>
          </motion.div>

        </div>
      </div>

      {/* SECOND ROW - 4 SECONDARY CARDS */}
      <div className="mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Secondary 1: Notifications */}
          <div 
            onClick={() => onNavigate("notifications")}
            className="bg-neutral-900/50 p-5 rounded-2xl border border-neutral-850 hover:border-[#0EA5E9]/20 transition-all cursor-pointer flex items-center justify-between group"
          >
            <div className="flex items-center gap-3 truncate">
              <div className="w-10 h-10 bg-[#0EA5E9]/10 rounded-xl flex items-center justify-center border border-[#0EA5E9]/10">
                <Bell className="w-4 h-4 text-sky-400" />
              </div>
              <div className="truncate">
                <p className="text-xs font-bold text-white group-hover:text-sky-450 transition-colors">🔔 Notifications</p>
                <p className="text-[10px] text-neutral-500 truncate">{unreadNotifs} unread broadcasts</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-neutral-600 group-hover:translate-x-1 transition-transform" />
          </div>

          {/* Secondary 2: Rewards */}
          <div 
            onClick={() => onNavigate("profile")}
            className="bg-neutral-900/50 p-5 rounded-2xl border border-neutral-850 hover:border-[#0EA5E9]/20 transition-all cursor-pointer flex items-center justify-between group"
          >
            <div className="flex items-center gap-3 truncate">
              <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center border border-amber-500/15">
                <Trophy className="w-4 h-4 text-amber-400" />
              </div>
              <div className="truncate">
                <p className="text-xs font-bold text-white group-hover:text-amber-450 transition-colors">🏆 Rewards</p>
                <p className="text-[10px] text-neutral-500 truncate">{rewards?.totalGreenPoints || 0} active pts</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-neutral-600 group-hover:translate-x-1 transition-transform" />
          </div>

          {/* Secondary 3: Statistics */}
          <div 
            onClick={() => onNavigate("city_health")}
            className="bg-neutral-900/50 p-5 rounded-2xl border border-neutral-850 hover:border-[#0EA5E9]/20 transition-all cursor-pointer flex items-center justify-between group"
          >
            <div className="flex items-center gap-3 truncate">
              <div className="w-10 h-10 bg-[#10B981]/10 rounded-xl flex items-center justify-center border border-[#10B981]/10">
                <Activity className="w-4 h-4 text-[#10B981]" />
              </div>
              <div className="truncate">
                <p className="text-xs font-bold text-white group-hover:text-[#10B981] transition-colors">📊 Statistics</p>
                <p className="text-[10px] text-neutral-500 truncate">Grid telemetry check</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-neutral-600 group-hover:translate-x-1 transition-transform" />
          </div>

          {/* Secondary 4: Profile */}
          <div 
            onClick={() => onNavigate("profile")}
            className="bg-neutral-900/50 p-5 rounded-2xl border border-neutral-850 hover:border-[#0EA5E9]/20 transition-all cursor-pointer flex items-center justify-between group"
          >
            <div className="flex items-center gap-3 truncate">
              <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center border border-purple-500/15">
                <User className="w-4 h-4 text-purple-400" />
              </div>
              <div className="truncate">
                <p className="text-xs font-bold text-white group-hover:text-purple-400 transition-colors">👤 Profile</p>
                <p className="text-[10px] text-neutral-500 truncate">Credentials & badges</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-neutral-600 group-hover:translate-x-1 transition-transform" />
          </div>

        </div>
      </div>

      {/* BOTTOM SECTION: RECENT COMPLAINTS LEDGER */}
      <div className="bg-neutral-900/20 p-6 rounded-3xl border border-neutral-850">
        <div className="flex items-center justify-between mb-5 border-b border-neutral-850 pb-3">
          <div>
            <h3 className="text-sm font-mono uppercase tracking-widest text-neutral-400 font-bold">Recent Complaints</h3>
            <p className="text-[11px] text-neutral-500">Live feed of reported municipal logs near your location.</p>
          </div>
          <button 
            onClick={() => onNavigate("my_reports")}
            className="text-[11px] text-[#0EA5E9] hover:underline font-mono flex items-center gap-1 cursor-pointer"
          >
            View History <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        {recentComplaints.length === 0 ? (
          <p className="text-xs text-neutral-500 italic py-4 text-center">No reports active in current ward cluster.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {recentComplaints.map((c) => (
              <div 
                key={c.id} 
                className="bg-[#07111F] p-4.5 rounded-xl border border-neutral-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-neutral-900 flex-shrink-0 border border-neutral-800">
                    <img src={c.imageUrl} alt={c.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[9px] font-mono uppercase bg-neutral-950 px-1.5 py-0.5 rounded border border-neutral-800 text-sky-400">
                        {c.id}
                      </span>
                      <span className="text-[9px] font-mono text-neutral-500 uppercase">{c.category}</span>
                    </div>
                    <h4 className="text-xs font-bold text-neutral-200 mt-1">{c.title}</h4>
                    <p className="text-[10px] text-neutral-400 truncate max-w-sm sm:max-w-md font-light mt-0.5">{c.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4.5 justify-between sm:justify-end border-t sm:border-t-0 border-neutral-900 pt-3 sm:pt-0">
                  <div className="text-left sm:text-right">
                    <span className="block text-[9px] uppercase tracking-wider text-neutral-550 font-mono">STAFF TIME LIMIT</span>
                    <span className="text-xs font-semibold text-sky-450 font-mono">{c.eta}</span>
                  </div>
                  <span className={`text-[10px] px-3 py-1 font-mono uppercase rounded font-bold ${
                    c.status === "resolved" 
                      ? "bg-emerald-950/60 text-[#10B981] border border-[#10B981]/20" 
                      : c.status === "working" 
                      ? "bg-sky-950/60 text-[#0EA5E9] border border-[#0EA5E9]/20"
                      : "bg-neutral-900 text-neutral-400"
                  }`}>
                    {c.status === "ai_detected" ? "AI Classified" : c.status}
                  </span>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
