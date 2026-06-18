import React, { useState } from "react";
import { motion } from "motion/react";
import { BarChart3, TrendingUp, Cpu, Activity, Users, ShieldAlert, DollarSign, Clock, CheckCircle2, RefreshCw } from "lucide-react";
import { Complaint, Prediction } from "../types";

interface AdminDashboardProps {
  complaints: Complaint[];
  predictions: Prediction[];
  onTriggerPrediction: () => void;
}

export default function AdminDashboard({
  complaints,
  predictions,
  onTriggerPrediction
}: AdminDashboardProps) {

  const [simulatingscan, setSimulatingScan] = useState(false);

  // Compute stats
  const totalCount = complaints.length;
  const criticalCount = complaints.filter(c => c.priority === "high" && c.status !== "resolved").length;
  const activeCount = complaints.filter(c => c.status !== "resolved").length;
  const resolvedCount = complaints.filter(c => c.status === "resolved").length;

  const handleSimulateScan = () => {
    setSimulatingScan(true);
    setTimeout(() => {
      onTriggerPrediction();
      setSimulatingScan(false);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 pt-24 pb-16 text-neutral-100">
      
      {/* Header and trigger forecast */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-neutral-900 pb-6 mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase bg-indigo-950/40 text-indigo-400 border border-indigo-500/10 px-2.5 py-1 rounded-md">Administration Terminal v4.1</span>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            <span className="text-xs text-indigo-400 font-mono">Telemetry Nodes Live</span>
          </div>
          <h2 className="text-3xl font-bold font-display tracking-tight text-neutral-50 mt-2">
            Metro Administration & Analytics Hub 🏛️
          </h2>
          <p className="text-xs text-neutral-400 font-light mt-1">
            Real-time telemetry, predictive maintenance neural layers, and city-wide asset control logs.
          </p>
        </div>

        {/* Trigger prediction recalculation */}
        <button 
          id="admin-btn-scan"
          disabled={simulatingscan}
          onClick={handleSimulateScan}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold cursor-pointer transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 shadow-lg shadow-indigo-600/10"
        >
          <RefreshCw className={`w-4 h-4 ${simulatingscan ? "animate-spin" : ""}`} />
          {simulatingscan ? "Analyzing neural patterns..." : "Trigger AI Predictions Scan"}
        </button>
      </div>

      {/* KPI Core strip (PowerBI style cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        
        {/* KPI: Active Complaints */}
        <div className="glass-panel p-6 rounded-2xl border border-neutral-800/80">
          <div className="flex justify-between items-start text-neutral-500">
            <span className="text-[10px] font-mono uppercase tracking-wider block">Active Complaints</span>
            <Activity className="w-5 h-5 text-indigo-400" />
          </div>
          <p className="text-3xl font-black font-display text-neutral-50 mt-2">{activeCount}</p>
          <div className="flex items-center justify-between text-[11px] text-neutral-400 mt-2">
            <span>Historical resolved: {resolvedCount}</span>
            <span className="text-emerald-400 font-semibold">Ready: {((resolvedCount/totalCount)*100 || 0).toFixed(0)}%</span>
          </div>
        </div>

        {/* KPI: Critical Hazards */}
        <div className="glass-panel p-6 rounded-2xl border border-neutral-800/80">
          <div className="flex justify-between items-start text-neutral-500">
            <span className="text-[10px] font-mono uppercase tracking-wider block text-rose-400 font-semibold">Critical Priority Issues</span>
            <ShieldAlert className="w-5 h-5 text-rose-500 animate-pulse" />
          </div>
          <p className="text-3xl font-black font-display text-rose-500 mt-2">{criticalCount}</p>
          <div className="flex items-center justify-between text-[11px] text-neutral-400 mt-2">
            <span>High-threat vector active</span>
            <span className="text-rose-400 font-bold">Action Required</span>
          </div>
        </div>

        {/* KPI: Dispatch Efficiency */}
        <div className="glass-panel p-6 rounded-2xl border border-neutral-800/80">
          <div className="flex justify-between items-start text-neutral-500">
            <span className="text-[10px] font-mono uppercase tracking-wider block">Avg Resolution speed</span>
            <Clock className="w-5 h-5 text-indigo-400" />
          </div>
          <p className="text-3xl font-black font-display text-neutral-50 mt-2">32 Mins</p>
          <div className="flex items-center justify-between text-[11px] text-neutral-400 mt-2">
            <span>Standard target: 45m</span>
            <span className="text-emerald-400 font-semibold">-13m threshold</span>
          </div>
        </div>

        {/* KPI: Budget Allocation Allocation */}
        <div className="glass-panel p-6 rounded-2xl border border-neutral-800/80">
          <div className="flex justify-between items-start text-neutral-500">
            <span className="text-[10px] font-mono uppercase tracking-wider block">AI Prediction Accuracy</span>
            <Cpu className="w-5 h-5 text-indigo-400" />
          </div>
          <p className="text-3xl font-black font-display text-neutral-50 mt-2">99.4%</p>
          <div className="flex items-center justify-between text-[11px] text-neutral-400 mt-2">
            <span>Analyzed over 4.5k feeds</span>
            <span className="text-indigo-400">Deep Learning</span>
          </div>
        </div>

      </div>

      {/* Main Data Split: Interactive Heatmap Grid and AI Predictions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
        
        {/* SVG Live Area Heatmap Visualization */}
        <div className="lg:col-span-8 glass-panel rounded-2xl border border-neutral-800/80 p-6">
          <div className="flex items-center justify-between border-b border-neutral-900 pb-4 mb-6">
            <h3 className="text-sm font-mono uppercase tracking-widest text-indigo-400">Live Incident Density Heatmap</h3>
            <span className="text-[10px] text-neutral-500 font-mono">Ward-wise Concentrated Risks</span>
          </div>

          <div className="relative h-80 bg-neutral-950/80 rounded-xl overflow-hidden border border-neutral-900 flex justify-center items-center">
            
            {/* Grid base */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
              backgroundSize: "24px 24px"
            }} />

            {/* Custom SVG city borders and thermal nodes overlay */}
            <svg className="absolute inset-0 w-full h-full text-indigo-500/10" viewBox="0 0 500 300">
              {/* Municipal Districts borders */}
              <path d="M 20 40 L 150 20 L 220 120 L 120 180 Z" stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="rgba(99,102,241,0.02)" />
              <path d="M 150 20 L 350 10 L 380 140 L 220 120 Z" stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="rgba(16,185,129,0.01)" />
              <path d="M 220 120 L 380 140 L 480 250 L 300 290 L 180 220 Z" stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="rgba(239,68,68,0.02)" />
              <path d="M 120 180 L 220 120 L 180 220 L 50 280 L 10 180 Z" stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="none" />
              
              {/* Rivers / major pipelines */}
              <path d="M 0 100 Q 150 150 300 110 T 500 190" stroke="rgba(59,130,246,0.3)" strokeWidth="4" fill="none" />
            </svg>

            {/* Simulated Heat nodes */}
            {/* High heat node Ward 3Station area */}
            <div className="absolute top-[130px] left-[260px] -translate-x-1/2 -translate-y-1/2">
              <span className="absolute inline-flex h-32 w-32 rounded-full bg-rose-500/15 animate-pulse" />
              <span className="absolute inline-flex h-16 w-16 rounded-full bg-rose-500/20" />
              <span className="relative flex rounded-full h-3 w-3 bg-rose-600 border border-white" />
              <span className="absolute left-4 top-0 bg-neutral-900 border border-neutral-800 text-[9px] px-1.5 py-0.5 rounded-md font-mono text-rose-400">Station Leak Cluster (Critical)</span>
            </div>

            {/* Medium heat node Ward 5 pothole cluster */}
            <div className="absolute top-[60px] left-[110px] -translate-x-1/2 -translate-y-1/2">
              <span className="absolute inline-flex h-20 w-20 rounded-full bg-amber-500/10" />
              <span className="relative flex rounded-full h-2 w-2 bg-amber-500" />
              <span className="absolute left-3 top-0 bg-neutral-900 border border-neutral-800 text-[9px] px-1.5 py-0.5 rounded-md font-mono text-amber-400">Pothole Descent</span>
            </div>

            {/* Small safe node */}
            <div className="absolute top-[210px] left-[410px] -translate-x-1/2 -translate-y-1/2">
              <span className="absolute inline-flex h-14 w-14 rounded-full bg-emerald-500/10" />
              <span className="relative flex rounded-full h-2 w-2 bg-emerald-500" />
              <span className="absolute left-3 top-0 bg-neutral-900 border border-neutral-800 text-[9px] px-1.5 py-0.5 rounded-md font-mono text-emerald-400">Clear Green Status</span>
            </div>

          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-neutral-500 bg-neutral-900/50 p-3 rounded-lg border border-neutral-900">
            <span>Legend: 🔴 Critical Congestion/Leaking Cluster | 🟡 Under Investigation | 🟢 Fully Clear Sector</span>
            <span className="font-mono">Sensor Density Index: 92%</span>
          </div>

        </div>

        {/* AI PREDICTION PAGE & LIST */}
        <div className="lg:col-span-4 glass-panel rounded-2xl border border-neutral-800/80 p-6">
          <div className="flex items-center justify-between border-b border-neutral-900 pb-4 mb-4">
            <h3 className="text-sm font-mono uppercase tracking-widest text-indigo-400 flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-indigo-400 animate-pulse" /> Predictive AI Forecasting
            </h3>
          </div>

          <p className="text-[11px] text-neutral-400 font-light mb-4">
            Our machine learning core evaluates pipeline pressure indexes, sewage levels, and lightning anomalies to predict critical malfunctions ahead of time.
          </p>

          <div className="flex flex-col gap-4">
            {predictions.map((p) => {
              const bgGradient = p.probability > 80 ? "from-rose-950/20 to-neutral-900" : "from-neutral-900 to-neutral-950";
              const border = p.probability > 80 ? "border-rose-500/20" : "border-neutral-900";
              const accentColor = p.probability > 80 ? "text-rose-400" : p.probability > 70 ? "text-amber-400" : "text-indigo-400";
              
              return (
                <div key={p.id} className={`bg-gradient-to-br ${bgGradient} border ${border} rounded-xl p-4 flex flex-col gap-2`}>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-neutral-500 uppercase">{p.id} · {p.ward}</span>
                    <span className={`text-xs font-bold ${accentColor} bg-neutral-950 bg-opacity-70 px-2 py-0.5 rounded-md font-mono`}>
                      {p.probability}% Risk
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-neutral-100">{p.title}</h4>
                  <p className="text-[11px] text-neutral-400 font-light leading-snug">
                    <strong className="text-neutral-300">Action:</strong> {p.recommendedAction}
                  </p>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-neutral-900 text-[10px]">
                    <span className="text-neutral-500">Timeline expectation:</span>
                    <span className="font-bold text-indigo-400 uppercase font-mono">{p.expectedWithin}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-neutral-900 text-center">
            <span className="text-[10px] text-neutral-500 font-mono block">Proactive governance mode active</span>
          </div>

        </div>

      </div>

      {/* Complaints telemetry review table */}
      <div className="glass-panel rounded-2xl border border-neutral-800/80 p-6">
        <h3 className="text-sm font-mono uppercase tracking-widest text-indigo-400 mb-6 border-b border-neutral-900 pb-4">
          Integrated Municipal Active Registry
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-neutral-900 text-neutral-400 uppercase font-mono text-[10px]">
                <th className="pb-3">Ticket ID</th>
                <th className="pb-3">Reporting Title</th>
                <th className="pb-3">Category</th>
                <th className="pb-3">Priority</th>
                <th className="pb-3">Assigned Crew</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Community Votes</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((c) => (
                <tr key={c.id} className="border-b border-neutral-900/40 hover:bg-neutral-900/20 transition-colors">
                  <td className="py-4 font-mono font-medium text-neutral-400">{c.id}</td>
                  <td className="py-4 font-semibold text-neutral-100 max-w-sm truncate">{c.title}</td>
                  <td className="py-4 font-mono capitalize text-indigo-300">{c.category}</td>
                  <td className="py-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${c.priority === "high" ? "bg-rose-950 text-rose-400" : "bg-neutral-900 text-neutral-400"}`}>
                      {c.priority}
                    </span>
                  </td>
                  <td className="py-4 text-neutral-400 font-light">{c.assignedTeam}</td>
                  <td className="py-4 font-mono capitalize">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold ${
                      c.status === "resolved" 
                        ? "bg-emerald-950 text-emerald-400" 
                        : c.status === "working"
                        ? "bg-amber-950 text-amber-400"
                        : "bg-indigo-950 text-indigo-400"
                    }`}>
                      {c.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="py-4 font-mono text-neutral-300 font-bold">{c.votes} votes</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
