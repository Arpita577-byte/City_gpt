import React, { useState } from "react";
import { Hammer, MapPin, CheckCircle, Navigation, Upload, ShieldCheck, Clock, Check } from "lucide-react";
import { Complaint } from "../types";

interface WorkerDashboardProps {
  complaints: Complaint[];
  onUpdateStatus: (id: string, status: "reported" | "working" | "resolved", afterImage?: string) => Promise<void>;
  onNavigateMap: (complaint: Complaint) => void;
}

export default function WorkerDashboard({
  complaints,
  onUpdateStatus,
  onNavigateMap
}: WorkerDashboardProps) {

  const [uploadingFor, setUploadingFor] = useState<string | null>(null);
  const [navigatingFor, setNavigatingFor] = useState<string | null>(null);
  const [busyItem, setBusyItem] = useState<string | null>(null);

  // Active/Assigned tasks filters (all complains that aren't resolved yet)
  const activeTasks = complaints.filter(c => c.status !== "resolved");
  const completedTasks = complaints.filter(c => c.status === "resolved");

  // Handle local simulation of uploading resolved photo
  const handleSimulateEvidence = async (complaintId: string) => {
    setUploadingFor(complaintId);
    setBusyItem(complaintId);

    // Dynamic mock for after photo
    const afterPhotoMock = "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&auto=format&fit=crop&q=60";
    
    setTimeout(async () => {
      await onUpdateStatus(complaintId, "resolved", afterPhotoMock);
      setUploadingFor(null);
      setBusyItem(null);
    }, 1200);
  };

  // Handle local simulation of marking 'In Progress' / working
  const handleMarkWorking = async (complaintId: string) => {
    setBusyItem(complaintId);
    await onUpdateStatus(complaintId, "working");
    setBusyItem(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 pt-24 pb-16 text-neutral-100">
      
      {/* Top Welcome Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-neutral-900 pb-6 mb-8 gap-4">
        <div>
          <span className="text-xs font-mono uppercase bg-indigo-950/40 text-indigo-400 border border-indigo-500/10 px-2.5 py-1 rounded-md">Municipal Crew Portal</span>
          <h2 className="text-3xl font-bold font-display tracking-tight text-neutral-50 mt-2">
            Welcome back, Crew Commander 🛠️
          </h2>
          <p className="text-xs text-neutral-400 font-light mt-1">
            Assigned Zone: Sector 4 / Ward 3 Maintenance Depot.
          </p>
        </div>
        
        {/* Quick KPI stats */}
        <div className="flex items-center gap-4">
          <div className="bg-neutral-900 p-4 rounded-xl border border-neutral-800 text-center">
            <span className="block text-2xl font-black text-amber-400">{activeTasks.length}</span>
            <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-mono">Assigned Tasks</span>
          </div>
          <div className="bg-neutral-900 p-4 rounded-xl border border-neutral-800 text-center">
            <span className="block text-2xl font-black text-emerald-400">{completedTasks.length}</span>
            <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-mono">Completed Today</span>
          </div>
        </div>
      </div>

      {/* Main active tasks list */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Active Tasks Feed Section */}
        <div className="lg:col-span-8">
          <h3 className="text-sm font-mono uppercase tracking-widest text-indigo-400 mb-6 flex items-center gap-2">
            <Hammer className="w-4 h-4" /> Assigned Tasks In Queue
          </h3>

          {activeTasks.length === 0 ? (
            <div className="bg-neutral-900/20 rounded-2xl border border-neutral-900 p-12 text-center flex flex-col items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <p className="font-semibold text-neutral-100">Zero Pending Incidents!</p>
                <p className="text-xs text-neutral-400 font-light mt-1">Excellent job. The current municipal sector is fully cleared and restored.</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {activeTasks.map((task) => (
                <div key={task.id} className="glass-card rounded-2xl border border-neutral-800/80 p-6 flex flex-col md:flex-row gap-6 relative overflow-hidden group">
                  
                  {/* Status Side Indicator Accent */}
                  <div className={`absolute top-0 bottom-0 left-0 w-1.5 ${task.priority === "high" ? "bg-rose-500 animate-pulse" : "bg-amber-400"}`} />

                  {/* Task Image */}
                  <div className="w-full md:w-40 h-40 bg-neutral-950 rounded-xl overflow-hidden border border-neutral-850 flex-shrink-0 relative">
                    {task.imageUrl ? (
                      <img src={task.imageUrl} alt={task.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-neutral-600 font-mono">
                        No Image
                      </div>
                    )}
                    <span className={`absolute top-2 left-2 text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md font-semibold text-white ${task.priority === "high" ? "bg-rose-600" : "bg-amber-600"}`}>
                      {task.priority}
                    </span>
                  </div>

                  {/* Task Data */}
                  <div className="flex-1 flex flex-col justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className="text-[10px] font-mono uppercase text-indigo-400 bg-indigo-950/40 px-2 py-0.5 rounded-md border border-indigo-500/10">
                          {task.category}
                        </span>
                        <span className="text-xs text-neutral-500 font-mono">ID: {task.id}</span>
                        <span className="flex items-center gap-1 text-xs text-amber-400 font-mono">
                          <Clock className="w-3.5 h-3.5" /> ETA: {task.eta}
                        </span>
                      </div>
                      <h4 className="text-lg font-bold text-neutral-100 group-hover:text-indigo-300 transition-colors">
                        {task.title}
                      </h4>
                      <p className="text-xs text-neutral-400 font-light leading-relaxed mt-1">
                        {task.description}
                      </p>
                      
                      {/* Location text coordinates */}
                      <p className="text-xs text-neutral-500 flex items-center gap-1 mt-2.5">
                        <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                        <span className="font-mono">{task.locationDescription} {task.lat.toFixed(4)}, {task.lng.toFixed(4)}</span>
                      </p>
                    </div>

                    {/* Operational Action Buttons Container */}
                    <div className="flex flex-wrap gap-2.5 pt-3 border-t border-neutral-900">
                      
                      {/* Button Navigate */}
                      <button 
                        id={`worker-btn-nav-${task.id}`}
                        onClick={() => {
                          setNavigatingFor(task.id);
                          onNavigateMap(task);
                          setTimeout(() => setNavigatingFor(null), 1500);
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-white rounded-xl text-xs font-semibold cursor-pointer transition-all duration-300 transform hover:-translate-y-0.5"
                      >
                        <Navigation className={`w-3.5 h-3.5 text-indigo-400 ${navigatingFor === task.id ? "animate-spin" : ""}`} />
                        {navigatingFor === task.id ? "Calculating..." : "Navigate Route"}
                      </button>

                      {/* Status Action Workflow (working/assigned states) */}
                      {task.status !== "working" ? (
                        <button 
                          id={`worker-btn-work-${task.id}`}
                          onClick={() => handleMarkWorking(task.id)}
                          disabled={busyItem !== null}
                          className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 hover:bg-amber-500/30 text-amber-400 border border-amber-500/20 hover:border-amber-500/40 rounded-xl text-xs font-semibold cursor-pointer transition-all duration-300 disabled:opacity-50"
                        >
                          <Clock className="w-3.5 h-3.5" />
                          Mark: Start Working
                        </button>
                      ) : (
                        <button 
                          id={`worker-btn-resolve-${task.id}`}
                          onClick={() => handleSimulateEvidence(task.id)}
                          disabled={busyItem !== null}
                          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold cursor-pointer transition-all duration-300 animate-pulse"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          {uploadingFor === task.id ? "Uploading Fix Evidence..." : "Upload After Photo & Solve"}
                        </button>
                      )}

                      {/* Before Photo inspect helper */}
                      <button 
                        onClick={() => alert(`Showing before photo telemetry reference for ticket ${task.id}. Initial dispatch logs confirm incident category mismatch rules applied.`)}
                        className="text-xs text-neutral-500 hover:text-neutral-300 hover:underline px-3 font-mono"
                      >
                        [Inspect Before Photo]
                      </button>

                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

        {/* Completed History sidebar for Worker */}
        <div className="lg:col-span-4">
          <div className="glass-panel rounded-2xl border border-neutral-800/80 p-6">
            <h3 className="text-sm font-mono uppercase tracking-widest text-emerald-400 mb-4 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" /> Solved Today ({completedTasks.length})
            </h3>
            
            {completedTasks.length === 0 ? (
              <p className="text-xs text-neutral-500 font-mono">No tasks completed yet on this shift.</p>
            ) : (
              <div className="flex flex-col gap-4 max-h-[400px] overflow-y-auto pr-1">
                {completedTasks.slice(0, 6).map((task) => (
                  <div key={task.id} className="bg-neutral-900/40 p-4 border border-neutral-900 rounded-xl flex items-center justify-between gap-3 text-xs">
                    <div>
                      <div className="flex items-center gap-1.5 mb-1 text-[10px] uppercase font-mono">
                        <span className="text-emerald-400">RESOLVED</span>
                        <span className="text-neutral-500">· {task.id}</span>
                      </div>
                      <p className="font-bold text-neutral-200 line-clamp-1">{task.title}</p>
                      <span className="text-[10px] text-neutral-500 font-mono">Crews: {task.assignedTeam}</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-emerald-950 text-emerald-400 flex items-center justify-center border border-emerald-500/20 flex-shrink-0">
                      <Check className="w-4 h-4" />
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Worker Guidelines card */}
            <div className="mt-6 pt-6 border-t border-neutral-900 text-xs text-neutral-400 font-light flex flex-col gap-2 bg-neutral-950/20 p-4 rounded-xl border border-neutral-900">
              <span className="font-mono text-[10px] text-indigo-400 uppercase tracking-widest">Incident Rules</span>
              <p>✔ Before starting, set ticket state to <strong>"Start Working"</strong> via portal.</p>
              <p>✔ Post-restoration requires clear picture uploads to complete automated visual verification routines.</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
