import React from "react";
import { motion } from "motion/react";
import { Camera, MapPin, Brain, History, Bell, Award, Sparkles, MessageCircle, AlertCircle } from "lucide-react";
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

  return (
    <div className="max-w-7xl mx-auto px-6 pt-24 pb-16 text-neutral-100">
      
      {/* Top Welcome Title Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end mb-8">
        
        {/* Welcome Section */}
        <div className="md:col-span-8 flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase bg-emerald-950/40 text-emerald-400 border border-emerald-500/10 px-2.5 py-1 rounded-md">Smart Citizen Verified</span>
            <span className="text-[11px] text-neutral-500 font-mono hidden sm:inline">{userEmail}</span>
          </div>
          <h2 className="text-3xl font-bold font-display tracking-tight text-neutral-50">
            Good Evening, {userName} 👋
          </h2>
          <p className="text-xs text-neutral-400 font-light">
            Your telemetry score and micro-rewards are fully synced. Keep the metro grid secure.
          </p>
        </div>

        {/* Action Button Strip */}
        <div className="md:col-span-4 flex items-center justify-end gap-3 w-full">
          <button 
            id="dash-sos-btn"
            onClick={onSosToggle}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 bg-rose-600/20 hover:bg-rose-600 text-rose-400 hover:text-white border border-rose-500/20 rounded-xl font-bold cursor-pointer transition-all duration-300 animate-pulse glow-red"
          >
            <AlertCircle className="w-4 h-4" />
            SOS EMERGENCY
          </button>
        </div>

      </div>

      {/* CRED-Like Metric Strip (Score Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        
        {/* City Health Gauge Card */}
        <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 p-6 rounded-2xl border border-neutral-800/80 shadow-xl flex items-center justify-between group cursor-pointer" onClick={() => onNavigate("city_health")}>
          <div className="flex flex-col gap-1">
            <span className="text-[11px] text-neutral-500 font-mono uppercase tracking-widest block">City Health Score</span>
            <span className="text-3xl font-black font-display text-emerald-400">{cityHealthScore}/100</span>
            <span className="text-[10px] text-neutral-400 font-light mt-1">Excellent (Top 10%)</span>
          </div>
          <div className="relative flex items-center justify-center h-14 w-14">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path className="text-neutral-900" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path className="text-emerald-500" strokeWidth="3" strokeDasharray={`${cityHealthScore}, 100`} stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
            <span className="absolute text-[11px] font-mono text-neutral-200">{cityHealthScore}%</span>
          </div>
        </div>

        {/* Global Point Multiplier */}
        <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 p-6 rounded-2xl border border-neutral-800/80 shadow-xl flex items-center justify-between group cursor-pointer" onClick={() => onNavigate("rewards")}>
          <div className="flex flex-col gap-1">
            <span className="text-[11px] text-neutral-500 font-mono uppercase tracking-widest block font-bold text-indigo-400">Green Points Earned</span>
            <span className="text-3xl font-black font-display text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-orange-400">
              {rewards?.totalGreenPoints || 0} pts
            </span>
            <span className="text-[10px] text-neutral-400 font-light mt-1 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" /> Leaderboard Rank 2
            </span>
          </div>
          <div className="h-12 w-12 bg-amber-500/10 rounded-xl flex items-center justify-center border border-amber-500/20 text-amber-400">
            <Award className="w-6 h-6 animate-pulse" />
          </div>
        </div>

        {/* Personal Filed Reports count */}
        <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 p-6 rounded-2xl border border-neutral-800/80 shadow-xl flex items-center justify-between group cursor-pointer" onClick={() => onNavigate("my_reports")}>
          <div className="flex flex-col gap-1">
            <span className="text-[11px] text-neutral-500 font-mono uppercase tracking-widest block">Your Filed Complaints</span>
            <span className="text-3xl font-black font-display text-neutral-100">{totalReportsCount} Issues</span>
            <span className="text-[10px] text-neutral-400 font-light mt-1">Pending: {pendingCount} | Resolved: {resolvedCount}</span>
          </div>
          <div className="h-12 w-12 bg-indigo-500/10 rounded-xl flex items-center justify-center border border-indigo-500/20 text-indigo-400">
            <History className="w-6 h-6" />
          </div>
        </div>

        {/* Unread system alerts count */}
        <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 p-6 rounded-2xl border border-neutral-800/80 shadow-xl flex items-center justify-between group cursor-pointer" onClick={() => onNavigate("notifications")}>
          <div className="flex flex-col gap-1">
            <span className="text-[11px] text-neutral-500 font-mono uppercase tracking-widest block">Unread Broadcasts</span>
            <span className="text-3xl font-black font-display text-indigo-400">{unreadNotifs} Unread</span>
            <span className="text-[10px] text-neutral-400 font-light mt-1">Updates on resolving feeds</span>
          </div>
          <div className={`h-12 w-12 rounded-xl flex items-center justify-center border transition-all ${unreadNotifs > 0 ? "bg-indigo-500/20 text-indigo-400 border-indigo-500/40" : "bg-neutral-900 text-neutral-500 border-neutral-800"}`}>
            <Bell className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* QUICK ACTIONS SELECTOR GRID */}
      <div>
        <h3 className="text-sm font-mono uppercase tracking-widest text-indigo-400 mb-6">Quick Navigation Controls</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Action 1: Upload Incident */}
          <motion.div 
            whileHover={{ y: -4, scale: 1.01 }}
            onClick={() => onNavigate("report_issue")}
            className="glass-card hover:bg-neutral-900/60 p-6 rounded-3xl border border-neutral-800/80 hover:border-neutral-700/80 shadow-2xl flex flex-col justify-between items-start h-56 transition-all duration-300 group cursor-pointer"
          >
            <div className="w-12 h-12 bg-indigo-500/10 group-hover:bg-indigo-500/20 rounded-2xl flex items-center justify-center border border-indigo-500/20 transition-colors duration-300">
              <Camera className="w-6 h-6 text-indigo-400" />
            </div>
            <div className="mt-4">
              <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">Action 01</span>
              <h4 className="text-lg font-bold text-neutral-100 mt-1 flex items-center gap-1.5 group-hover:text-indigo-400 transition-colors">
                Report Incident
              </h4>
              <p className="text-xs text-neutral-400 mt-1 font-light leading-relaxed">
                Capture photos or submit audio complaints. AI auto-identifies categories and assigns nearby teams.
              </p>
            </div>
          </motion.div>

          {/* Action 2: Live City Map */}
          <motion.div 
            whileHover={{ y: -4, scale: 1.01 }}
            onClick={() => onNavigate("live_map")}
            className="glass-card hover:bg-neutral-900/60 p-6 rounded-3xl border border-neutral-800/80 hover:border-neutral-700/80 shadow-2xl flex flex-col justify-between items-start h-56 transition-all duration-300 group cursor-pointer"
          >
            <div className="w-12 h-12 bg-emerald-500/10 group-hover:bg-emerald-500/20 rounded-2xl flex items-center justify-center border border-emerald-500/20 transition-colors duration-300">
              <MapPin className="w-6 h-6 text-emerald-400" />
            </div>
            <div className="mt-4">
              <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">Action 02</span>
              <h4 className="text-lg font-bold text-neutral-100 mt-1 flex items-center gap-1.5 group-hover:text-emerald-400 transition-colors">
                Live City Map
              </h4>
              <p className="text-xs text-neutral-400 mt-1 font-light leading-relaxed">
                Scan critical, medium, and resolved pins with interactive status cards and work ETA progress logs.
              </p>
            </div>
          </motion.div>

          {/* Action 3: AI Assistant */}
          <motion.div 
            whileHover={{ y: -4, scale: 1.01 }}
            onClick={() => onNavigate("ai_assistant")}
            className="glass-card hover:bg-neutral-900/60 p-6 rounded-3xl border border-neutral-800/80 hover:border-neutral-700/80 shadow-2xl flex flex-col justify-between items-start h-56 transition-all duration-300 group cursor-pointer"
          >
            <div className="w-12 h-12 bg-purple-500/10 group-hover:bg-purple-500/20 rounded-2xl flex items-center justify-center border border-purple-500/20 transition-colors duration-300">
              <Brain className="w-6 h-6 text-purple-400 animate-pulse" />
            </div>
            <div className="mt-4">
              <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">Action 03</span>
              <h4 className="text-lg font-bold text-neutral-100 mt-1 flex items-center gap-1.5 group-hover:text-purple-400 transition-colors">
                AI Assistant (CityGPT)
              </h4>
              <p className="text-xs text-neutral-400 mt-1 font-light leading-relaxed">
                Chat with CityGPT in Hindi or English. Query pipelines, nearest hospitals, and active outages.
              </p>
            </div>
          </motion.div>

          {/* Action 4: My Reports History */}
          <motion.div 
            whileHover={{ y: -4, scale: 1.01 }}
            onClick={() => onNavigate("my_reports")}
            className="glass-card hover:bg-neutral-900/60 p-6 rounded-3xl border border-neutral-800/80 hover:border-neutral-700/80 shadow-2xl flex flex-col justify-between items-start h-56 transition-all duration-300 group cursor-pointer"
          >
            <div className="w-12 h-12 bg-amber-500/10 group-hover:bg-amber-500/20 rounded-2xl flex items-center justify-center border border-amber-500/20 transition-colors duration-300">
              <History className="w-6 h-6 text-amber-400" />
            </div>
            <div className="mt-4">
              <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">Action 04</span>
              <h4 className="text-lg font-bold text-neutral-100 mt-1 flex items-center gap-1.5 group-hover:text-amber-400 transition-colors">
                My Reports & Timeline
              </h4>
              <p className="text-xs text-neutral-400 mt-1 font-light leading-relaxed">
                Track status workflows sequentially: reported, AI detected, team assigned, and evidence resolution.
              </p>
            </div>
          </motion.div>

          {/* Action 5: Community Hub (Reddit/X style) */}
          <motion.div 
            whileHover={{ y: -4, scale: 1.01 }}
            onClick={() => onNavigate("community")}
            className="glass-card hover:bg-neutral-900/60 p-6 rounded-3xl border border-neutral-800/80 hover:border-neutral-700/80 shadow-2xl flex flex-col justify-between items-start h-56 transition-all duration-300 group cursor-pointer"
          >
            <div className="w-12 h-12 bg-rose-500/10 group-hover:bg-rose-500/20 rounded-2xl flex items-center justify-center border border-rose-500/20 transition-colors duration-300">
              <MessageCircle className="w-6 h-6 text-rose-400" />
            </div>
            <div className="mt-4">
              <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">Action 05</span>
              <h4 className="text-lg font-bold text-neutral-100 mt-1 flex items-center gap-1.5 group-hover:text-rose-400 transition-colors">
                Community Forum
              </h4>
              <p className="text-xs text-neutral-400 mt-1 font-light leading-relaxed">
                Post broken infrastructures, upvote neighbors, and coordinate community efforts to elevate priority automatically.
              </p>
            </div>
          </motion.div>

          {/* Action 6: Rewards & Badges */}
          <motion.div 
            whileHover={{ y: -4, scale: 1.01 }}
            onClick={() => onNavigate("rewards")}
            className="glass-card hover:bg-neutral-900/60 p-6 rounded-3xl border border-neutral-800/80 hover:border-neutral-700/80 shadow-2xl flex flex-col justify-between items-start h-56 transition-all duration-300 group cursor-pointer"
          >
            <div className="w-12 h-12 bg-cyan-500/10 group-hover:bg-cyan-500/20 rounded-2xl flex items-center justify-center border border-cyan-500/20 transition-colors duration-300">
              <Award className="w-6 h-6 text-cyan-400 animate-bounce" />
            </div>
            <div className="mt-4">
              <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">Action 06</span>
              <h4 className="text-lg font-bold text-neutral-100 mt-1 flex items-center gap-1.5 group-hover:text-cyan-400 transition-colors">
                Claim Rewards (Green Points)
              </h4>
              <p className="text-xs text-neutral-400 mt-1 font-light leading-relaxed">
                Win credentials badges like Smart Citizen, Eco Hero. Track scores to climb the leaderboards.
              </p>
            </div>
          </motion.div>

        </div>
      </div>

    </div>
  );
}
