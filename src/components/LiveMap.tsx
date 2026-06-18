import React, { useState } from "react";
import { MapPin, Navigation, Clock, ShieldCheck, AlertTriangle, Users, Compass, ChevronRight, X } from "lucide-react";
import { Complaint } from "../types";

interface LiveMapProps {
  complaints: Complaint[];
  selectedComplaintId?: string | null;
  onCloseMapSelection?: () => void;
}

export default function LiveMap({ complaints, selectedComplaintId, onCloseMapSelection }: LiveMapProps) {
  
  // Selected complaint on the map
  const [selectedComp, setSelectedComp] = useState<Complaint | null>(
    selectedComplaintId ? (complaints.find(c => c.id === selectedComplaintId) || null) : null
  );

  // Before/after toggle slider state per complaint
  const [sliderPercent, setSliderPercent] = useState(50);

  // Focus a specific selected pin if provided by props changes
  React.useEffect(() => {
    if (selectedComplaintId) {
      const found = complaints.find(c => c.id === selectedComplaintId);
      if (found) {
        setSelectedComp(found);
      }
    }
  }, [selectedComplaintId, complaints]);

  // Color mappings for pins
  const getPinColor = (status: string, priority: string) => {
    if (status === "resolved") return "bg-emerald-500 border-emerald-300 shadow-emerald-500/50";
    if (priority === "high") return "bg-rose-600 border-rose-300 shadow-rose-600/50";
    return "bg-amber-500 border-amber-300 shadow-amber-500/50";
  };

  return (
    <div className="max-w-7xl mx-auto px-6 pt-24 pb-16 text-neutral-100 flex flex-col h-[calc(100vh-80px)] min-h-[600px]">
      
      {/* Top Banner stats */}
      <div className="flex items-center justify-between border-b border-neutral-900 pb-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold font-display tracking-tight text-neutral-50 flex items-center gap-2">
            <Compass className="w-6 h-6 text-indigo-400 animate-spin-slow" strokeWidth={1.5} /> Live Metro Tracking
          </h2>
          <p className="text-xs text-neutral-400 font-light mt-1">
            Real time vector routing and dispatcher tracking for active public utility crew.
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs bg-neutral-900/60 border border-neutral-800 px-4 py-2 rounded-xl">
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-rose-600 rounded-full" /> Critical</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-amber-500 rounded-full" /> Medium</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-emerald-500 rounded-full" /> Resolved</span>
        </div>
      </div>

      {/* Map Layout splitting into Canvas and Sidebar */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[460px] h-full overflow-hidden">
        
        {/* MAP CANVAS GRID */}
        <div className="lg:col-span-8 bg-neutral-950 rounded-2xl border border-neutral-800/80 relative overflow-hidden flex flex-col justify-center items-center shadow-2xl">
          
          {/* Grid helper */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "28px 28px"
          }} />

          {/* Fake GPS Road Layer SVG */}
          <svg className="absolute inset-0 w-full h-full text-indigo-400/5" viewBox="0 0 600 400">
            {/* Horizontal express links */}
            <path d="M 0 60 L 600 160" stroke="currentColor" strokeWidth="12" fill="none" />
            <path d="M 0 300 Q 200 240 400 320 T 600 280" stroke="currentColor" strokeWidth="8" fill="none" />
            
            {/* Vertical corridors */}
            <path d="M 160 0 L 160 400" stroke="currentColor" strokeWidth="12" fill="none" strokeDasharray="6 4" />
            <path d="M 460 0 L 360 400" stroke="currentColor" strokeWidth="10" fill="none" />
            <path d="M 300 0 C 240 100 240 300 360 400" stroke="currentColor" strokeWidth="6" fill="none" />
          </svg>

          {/* Dynamic Interactive Pin placement over SVG stage coordinates */}
          {complaints.map((c) => {
            // Map real/simulated coordinates to clean SVG relative percentages
            // Lat range approx: 19.06 to 19.09 (spread it around center 50%)
            // Lng range approx: 72.85 to 72.89
            const relativeY = ((19.09 - c.lat) / (19.09 - 19.05)) * 100;
            const relativeX = ((c.lng - 72.84) / (72.89 - 72.84)) * 100;

            const isSelected = selectedComp?.id === c.id;

            return (
              <button
                key={c.id}
                id={`map-pin-${c.id}`}
                onClick={() => setSelectedComp(c)}
                className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer transition-transform duration-300"
                style={{
                  top: `${relativeY}%`,
                  left: `${relativeX}%`,
                  zIndex: isSelected ? 40 : 20
                }}
              >
                {/* Ping rings for unresolved urgent issues */}
                {c.priority === "high" && c.status !== "resolved" && (
                  <span className="absolute animate-ping inline-flex h-8 w-8 rounded-full bg-rose-500/30 -left-2 -top-2" />
                )}

                <div className={`relative px-2 py-2 rounded-full border-2 ${getPinColor(c.status, c.priority)} text-white flex items-center justify-center shadow-lg transition-transform ${isSelected ? "scale-125" : "hover:scale-110"}`}>
                  <MapPin className="w-3.5 h-3.5" />
                </div>

                {/* Minimised subtitle tooltips on hover */}
                <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-neutral-900 border border-neutral-800 text-[9px] font-semibold px-2 py-1 rounded shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                  {c.id} · {c.category}
                </div>
              </button>
            );
          })}

          {/* Map Compass metadata frame indicator */}
          <div className="absolute top-4 left-4 bg-neutral-900/90 backdrop-blur border border-neutral-800 p-3 rounded-lg text-[10px] font-mono text-neutral-400">
            METRO SECTOR GRID: B-33<br />
            WGS84 GPS CALIBRATED<br />
            RELOAD SCAN: SUCCESS
          </div>

        </div>

        {/* DETAILS SIDEBAR GRID PANEL */}
        <div className="lg:col-span-4 glass-panel rounded-2xl border border-neutral-800/80 p-5 flex flex-col justify-between overflow-hidden relative">
          
          {selectedComp ? (
            <div className="flex flex-col h-full justify-between">
              
              {/* Header block */}
              <div>
                <div className="flex items-center justify-between border-b border-neutral-900 pb-3 mb-4">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono text-indigo-400 bg-indigo-950/40 px-2.5 py-0.5 rounded border border-indigo-500/10 uppercase">
                      {selectedComp.status.replace("_", " ")}
                    </span>
                    <span className="text-[10px] text-neutral-500 font-mono">ID: {selectedComp.id}</span>
                  </div>
                  <button 
                    onClick={() => {
                      setSelectedComp(null);
                      if (onCloseMapSelection) onCloseMapSelection();
                    }}
                    className="p-1 hover:bg-neutral-900 text-neutral-500 hover:text-neutral-100 rounded-lg cursor-pointer transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-neutral-50 leading-snug">{selectedComp.title}</h3>
                
                {/* Description info */}
                <p className="text-[11px] text-neutral-400 font-light leading-relaxed mt-2 p-3 bg-neutral-950 rounded-xl border border-neutral-900">
                  {selectedComp.description}
                </p>

                {/* KPI details lists */}
                <div className="grid grid-cols-2 gap-3 mt-4 text-[11px]">
                  <div className="bg-neutral-900/50 p-2.5 rounded-lg border border-neutral-900">
                    <span className="text-[9px] text-neutral-500 block uppercase font-mono tracking-wider">Assigned Responder</span>
                    <strong className="text-neutral-200 block truncate mt-0.5">{selectedComp.assignedTeam}</strong>
                  </div>
                  <div className="bg-neutral-900/50 p-2.5 rounded-lg border border-neutral-900">
                    <span className="text-[9px] text-neutral-500 block uppercase font-mono tracking-wider">Completion ETA</span>
                    <strong className="text-indigo-400 block mt-0.5">{selectedComp.eta}</strong>
                  </div>
                </div>

                {/* ADVANCED BEFORE / AFTER TELEMETRY SLIDER (Spectacular Premium Touch!) */}
                {selectedComp.status === "resolved" && selectedComp.afterPhoto ? (
                  <div className="mt-5">
                    <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block mb-2">Visual Fix Evidence Verification</span>
                    
                    {/* Sliding frame */}
                    <div className="relative h-44 rounded-xl overflow-hidden border border-neutral-900 select-none">
                      
                      {/* After Photo (Base) */}
                      <img src={selectedComp.afterPhoto} alt="After resolution" className="absolute inset-0 w-full h-full object-cover" />
                      <span className="absolute bottom-2 right-2 text-[9px] font-mono bg-emerald-950/80 text-emerald-400 px-1.5 py-0.5 rounded uppercase tracking-wider">After Resolution</span>
                      
                      {/* Before Photo (Clamped Overlay) */}
                      <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${sliderPercent}%` }}>
                        <img src={selectedComp.beforePhoto} alt="Before damage" className="absolute top-0 left-0 w-full h-full object-cover min-w-[300px] h-44" style={{ width: "300px" }} />
                        <span className="absolute bottom-2 left-2 text-[9px] font-mono bg-rose-950/80 text-rose-400 px-1.5 py-0.5 rounded uppercase tracking-wider">Before Damage</span>
                      </div>

                      {/* Slider Line handler */}
                      <div className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize flex items-center justify-center pointer-events-none" style={{ left: `${sliderPercent}%` }}>
                        <div className="w-6 h-6 bg-white border-2 border-indigo-500 rounded-full flex items-center justify-center text-indigo-500 text-[10px] shadow-lg font-bold">
                          ↔
                        </div>
                      </div>

                      {/* Invisible range control input */}
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={sliderPercent} 
                        onChange={(e) => setSliderPercent(Number(e.target.value))}
                        className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full"
                      />

                    </div>
                    <p className="text-[10px] text-neutral-500 text-center mt-1.5 font-light">
                      ↔ Slide controller to evaluate real-time repair evidence.
                    </p>
                  </div>
                ) : (
                  <div className="mt-5">
                    <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block mb-2 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-500" /> Active Hazard Reference
                    </span>
                    <div className="h-44 rounded-xl overflow-hidden border border-neutral-900">
                      <img src={selectedComp.beforePhoto || selectedComp.imageUrl} alt="Before incident" className="w-full h-full object-cover" />
                    </div>
                  </div>
                )}

              </div>

              {/* Work Order Footer dispatcher info */}
              <div className="mt-4 pt-4 border-t border-neutral-900 text-xs text-neutral-500">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-indigo-400" />
                  <span>GPS Spot: <span className="font-mono text-neutral-300">{selectedComp.lat.toFixed(4)}, {selectedComp.lng.toFixed(4)}</span></span>
                </div>
              </div>

            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center h-full gap-4 text-neutral-500 p-6">
              <Compass className="w-10 h-10 text-neutral-700 animate-spin-slow" />
              <div>
                <p className="font-semibold text-neutral-400 text-sm">No Pin Selected</p>
                <p className="text-xs text-neutral-500 font-light mt-1">Tap any active colored marker on the sector map to examine municipal repair telemetry, assigned crews, and visual evidence sliders.</p>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
