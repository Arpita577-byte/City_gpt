import React from "react";
import { Award, Zap, ShieldAlert, Sparkles, Trophy, Calendar, Check } from "lucide-react";
import { RewardPointInfo } from "../types";

interface RewardsProps {
  rewards: RewardPointInfo | null;
}

export default function Rewards({ rewards }: RewardsProps) {
  if (!rewards) {
    return (
      <div className="max-w-4xl mx-auto px-6 pt-24 py-16 text-center text-neutral-500">
        Loading rewards credentials...
      </div>
    );
  }

  // Find badge icon dynamically
  const renderBadgeIcon = (iconName: string) => {
    if (iconName === "Award") return <Award className="w-6 h-6 text-amber-400" />;
    if (iconName === "TreePine") return <Zap className="w-6 h-6 text-emerald-400" />;
    return <ShieldAlert className="w-6 h-6 text-indigo-400" />;
  };

  return (
    <div className="max-w-5xl mx-auto px-6 pt-24 pb-16 text-neutral-100">
      
      {/* Upper header */}
      <div className="border-b border-neutral-900 pb-4 mb-8">
        <span className="text-xs font-mono uppercase text-amber-400 bg-amber-950/20 px-2.5 py-1 rounded border border-amber-500/15">Smart Citizen Gamification</span>
        <h2 className="text-3xl font-bold font-display tracking-tight text-neutral-50 mt-2">
          Citizen Green Points Ledger 🏆
        </h2>
        <p className="text-xs text-neutral-400 font-light mt-1">
          Perform civic diagnostics, verify resolutions, and earn points redeemable for municipal utility subsidies.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left balance, badges and logs */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          
          {/* Points card */}
          <div className="relative bg-gradient-to-br from-indigo-950/20 via-neutral-900 to-neutral-950 p-8 rounded-3xl border border-neutral-800 flex items-center justify-between overflow-hidden shadow-2xl">
            <div className="absolute top-[-30%] left-[-30%] w-[50%] h-[50%] bg-indigo-500/10 rounded-full blur-[80px]" />
            
            <div className="flex flex-col gap-1 relative z-10">
              <span className="text-[11px] text-neutral-500 font-mono uppercase tracking-widest block font-bold text-indigo-400">Total Active Points Tally</span>
              <p className="text-5xl font-black font-display text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-indigo-400 mt-2">
                {rewards.totalGreenPoints} pts
              </p>
              <div className="text-xs text-neutral-400 mt-2 flex items-center gap-1.5 font-light">
                <Sparkles className="w-4 h-4 text-amber-400 animate-spin-slow" />
                Subsidises 3.4% of municipal tax quotas.
              </div>
            </div>

            <div className="h-20 w-20 bg-amber-500/10 rounded-2xl flex items-center justify-center border border-amber-500/20 text-amber-400 relative z-10 shadow-lg">
              <Trophy className="w-10 h-10 animate-bounce" />
            </div>
          </div>

          {/* Badges unlocked */}
          <div>
            <h3 className="text-sm font-mono uppercase tracking-widest text-indigo-400 mb-6 flex items-center gap-1.5">
              Unlocked Civic Badges
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {rewards.badges.map((b) => (
                <div key={b.id} className={`p-5 rounded-2xl border flex flex-col items-center text-center gap-3 relative overflow-hidden transition-all ${
                  b.unlocked 
                    ? "bg-neutral-900/40 border-neutral-800" 
                    : "bg-neutral-950/60 border-neutral-900/50 opacity-40 select-none"
                }`}>
                  {b.unlocked && (
                    <span className="absolute top-2 right-2 bg-emerald-950/40 border border-emerald-500/20 rounded-full p-0.5 text-emerald-400">
                      <Check className="w-3 h-3" />
                    </span>
                  )}
                  
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${
                    b.unlocked ? "bg-indigo-900/10 border-indigo-500/10" : "bg-neutral-950 border-neutral-900"
                  }`}>
                    {renderBadgeIcon(b.iconName)}
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-bold text-neutral-200">{b.title}</h4>
                    <p className="text-[10px] text-neutral-400 mt-1 leading-relaxed font-light">{b.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Points History logs */}
          <div>
            <h3 className="text-sm font-mono uppercase tracking-widest text-indigo-400 mb-4">Points Transact History</h3>
            
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
                  
                  <span className="font-bold font-mono text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-500/10">
                    +{h.points} pts
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Competitive leaderboard */}
        <div className="lg:col-span-4">
          <div className="glass-panel rounded-2xl border border-neutral-800/80 p-6">
            <h3 className="text-sm font-mono uppercase tracking-widest text-indigo-400 mb-6 flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-500" /> Active Leaderboards
            </h3>

            <div className="flex flex-col gap-3.5">
              {rewards.leaderboard.map((user, idx) => (
                <div key={idx} className={`p-3.5 rounded-xl border flex items-center justify-between gap-4 text-xs ${
                  user.isSelf 
                    ? "bg-indigo-950/20 border-indigo-500/30 shadow-indigo-500/10 shadow-lg" 
                    : "bg-neutral-900/40 border-neutral-900"
                }`}>
                  
                  <div className="flex items-center gap-3 truncate">
                    {/* Rank number block */}
                    <div className={`w-6 h-6 rounded-md flex items-center justify-center font-bold font-mono text-[10px] ${
                      user.rank === 1 
                        ? "bg-amber-500 text-neutral-950" 
                        : user.rank === 2
                        ? "bg-indigo-600 text-white"
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

            <p className="text-[10px] text-neutral-500 font-mono text-center mt-5 leading-normal">
              Leaderboards are reset monthly.<br />Top 3 active citizens win structural tax subsidies.
            </p>

          </div>
        </div>

      </div>

    </div>
  );
}
