import React from "react";
import { Award, Zap, Shield, Sparkles, Trophy, Calendar, Check, Mail, User, History, ArrowRight } from "lucide-react";
import { RewardPointInfo, Complaint } from "../types";

interface ProfileProps {
  userName: string;
  userEmail: string;
  rewards: RewardPointInfo | null;
  complaints: Complaint[];
  cityHealthScore: number;
}

export default function Profile({ userName, userEmail, rewards, complaints, cityHealthScore }: ProfileProps) {
  if (!rewards) {
    return (
      <div className="max-w-4xl mx-auto px-6 pt-24 py-16 text-center text-neutral-500 font-mono">
        Loading citizen profile credentials...
      </div>
    );
  }

  const renderBadgeIcon = (iconName: string) => {
    if (iconName === "Award") return <Award className="w-6 h-6 text-sky-400" />;
    if (iconName === "TreePine") return <Zap className="w-6 h-6 text-[#10B981]" />;
    return <Shield className="w-6 h-6 text-purple-400" />;
  };

  const totalReportsCount = complaints.length;
  const resolvedCount = complaints.filter(c => c.status === "resolved").length;

  return (
    <div className="max-w-6xl mx-auto px-6 pt-28 pb-16 text-neutral-100 font-sans">
      
      {/* Upper header */}
      <div className="border-b border-sky-500/10 pb-5 mb-8">
        <span className="text-xs font-mono uppercase text-sky-400 bg-sky-950/40 px-3 py-1 rounded-sm border border-sky-500/10">
          Smart City Citizen Credentials Node
        </span>
        <h2 className="text-3xl font-bold font-display tracking-tight text-white mt-3">
          Citizen Profile & Analytics 👤
        </h2>
        <p className="text-xs text-neutral-400 font-light mt-1.5">
          Verify digital twin credentials, track your community reports, and view active subsidy metrics.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Info & Balance & Badges */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          
          {/* Information CRED Card */}
          <div className="relative bg-gradient-to-br from-[#0D1D2E] via-neutral-900 to-neutral-950 p-6 rounded-3xl border border-sky-500/10 overflow-hidden shadow-2xl">
            <div className="absolute top-[-20%] right-[-10%] w-56 h-56 bg-sky-500/5 rounded-full blur-[70px] pointer-events-none" />
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-sky-950 border border-sky-500/20 text-sky-400 font-black text-xl flex items-center justify-center">
                  AM
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-1.5">
                    {userName}
                    <span className="text-[10px] uppercase tracking-wider bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/10 px-2 py-0.5 rounded-md font-mono">
                      VERIFIED CITIZEN
                    </span>
                  </h3>
                  <p className="text-xs text-neutral-400 font-light mt-1 flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-neutral-500" /> {userEmail}
                  </p>
                </div>
              </div>

              {/* Total Reports Stat Widget */}
              <div className="flex gap-4 border-t sm:border-t-0 border-neutral-900 pt-4 sm:pt-0">
                <div className="bg-neutral-950/40 px-4 py-2.5 rounded-xl border border-neutral-900 text-center min-w-[100px]">
                  <span className="block text-[9px] text-neutral-500 font-mono uppercase tracking-wider">Total Reports</span>
                  <span className="text-xl font-extrabold text-white">{totalReportsCount}</span>
                </div>
                <div className="bg-neutral-950/40 px-4 py-2.5 rounded-xl border border-neutral-900 text-center min-w-[100px]">
                  <span className="block text-[9px] text-neutral-500 font-mono uppercase tracking-wider">Resolved</span>
                  <span className="text-xl font-extrabold text-[#10B981]">{resolvedCount}</span>
                </div>
              </div>

            </div>
          </div>

          {/* Points Card */}
          <div className="bg-neutral-900/40 p-6 rounded-3xl border border-sky-500/10 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between relative overflow-hidden">
            <div className="flex flex-col gap-1 relative z-10">
              <span className="text-[11px] text-[#0EA5E9] font-mono uppercase tracking-widest font-bold">Accumulated Subsidy Balance</span>
              <p className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-indigo-400 mt-2">
                {rewards.totalGreenPoints} Green Points
              </p>
              <div className="text-xs text-neutral-400 mt-2 flex items-center gap-1.5 font-light">
                <Sparkles className="w-4 h-4 text-amber-400 animate-spin-slow" />
                Saves up to 3.4% of monthly city tax quotas.
              </div>
            </div>

            <div className="h-16 w-16 bg-amber-500/10 rounded-2xl flex items-center justify-center border border-amber-500/20 text-amber-400 relative z-10">
              <Trophy className="w-8 h-8 animate-pulse" />
            </div>
          </div>

          {/* Badges unlocked */}
          <div>
            <h3 className="text-sm font-mono uppercase tracking-widest text-[#0EA5E9] font-bold mb-4 flex items-center gap-1.5">
              Civic Badges
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {rewards.badges.map((b) => (
                <div 
                  key={b.id} 
                  className={`p-5 rounded-2xl border flex flex-col items-center text-center gap-3 relative overflow-hidden transition-all ${
                    b.unlocked 
                      ? "bg-neutral-900/40 border-sky-500/10" 
                      : "bg-[#07111F]/50 border-neutral-900 opacity-40"
                  }`}
                >
                  {b.unlocked && (
                    <span className="absolute top-2.5 right-2-5 bg-emerald-950/60 border border-emerald-500/20 rounded-full p-0.5 text-emerald-400">
                      <Check className="w-3 h-3" />
                    </span>
                  )}
                  
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${
                    b.unlocked ? "bg-sky-500/10 border-sky-500/20" : "bg-neutral-950 border-neutral-900"
                  }`}>
                    {renderBadgeIcon(b.iconName)}
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-bold text-neutral-200">{b.title}</h4>
                    <p className="text-[10px] text-neutral-400 mt-1.5 leading-relaxed font-light">{b.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reward History Logs */}
          <div>
            <h3 className="text-sm font-mono uppercase tracking-widest text-[#0EA5E9] font-bold mb-4">
              Points Ledger History
            </h3>
            
            <div className="flex flex-col gap-3">
              {rewards.history.map((h) => (
                <div key={h.id} className="bg-neutral-900/30 border border-neutral-900 p-4 rounded-xl flex items-center justify-between text-xs font-light">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-neutral-500" />
                    <div>
                      <p className="font-semibold text-neutral-200">{h.description}</p>
                      <span className="text-[10px] text-neutral-500 font-mono">{new Date(h.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <span className="font-bold font-mono text-[#10B981] bg-[#10B981]/10 px-2 py-0.5 rounded border border-[#10B981]/20">
                    +{h.points} pts
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Side: Competitive Leaderboard & Ranks */}
        <div className="lg:col-span-4">
          <div className="bg-[#0D1D2E]/40 rounded-2xl border border-sky-500/10 p-6">
            <h3 className="text-sm font-mono uppercase tracking-widest text-[#0EA5E9] font-bold mb-6 flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-500" /> Leaderboard Rank
            </h3>

            <div className="flex flex-col gap-3.5">
              {rewards.leaderboard.map((user, idx) => (
                <div key={idx} className={`p-3.5 rounded-xl border flex items-center justify-between gap-4 text-xs ${
                  user.isSelf 
                    ? "bg-[#0EA5E9]/10 border-sky-500/20 shadow-sky-500/10 shadow-lg" 
                    : "bg-neutral-900/40 border-neutral-900"
                }`}>
                  
                  <div className="flex items-center gap-3 truncate">
                    <div className={`w-6 h-6 rounded-md flex items-center justify-center font-bold font-mono text-[10px] ${
                      user.rank === 1 
                        ? "bg-amber-500 text-neutral-950" 
                        : user.rank === 2
                        ? "bg-sky-600 text-white"
                        : "bg-neutral-800 text-neutral-400"
                    }`}>
                      #{user.rank}
                    </div>
                    
                    <span className="font-bold text-neutral-200 truncate">{user.name}</span>
                  </div>

                  <span className="font-bold font-mono text-neutral-300 flex-shrink-0">{user.points} pts</span>

                </div>
              ))}
            </div>

            <p className="text-[10px] text-neutral-500 font-mono text-center mt-6 leading-relaxed">
              Leaderboards reset monthly.<br />Top 3 active citizens win structural utility subsidies.
            </p>

          </div>
        </div>

      </div>

    </div>
  );
}
