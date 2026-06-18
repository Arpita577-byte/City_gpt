import React, { useState } from "react";
import { AlertOctagon, ShieldAlert, Flame, Droplets, MapPin, Check, Plus } from "lucide-react";

interface SosProps {
  onTriggerSos: (payload: { category: string; lat: number; lng: number }) => Promise<any>;
  onClose: () => void;
}

export default function Sosemergency({ onTriggerSos, onClose }: SosProps) {
  
  const [selectedCat, setSelectedCat] = useState("flood");
  const [lat, setLat] = useState(19.0762);
  const [lng, setLng] = useState(72.8771);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  // Trigger dispatch simulation
  const handleTrigger = async () => {
    setBusy(true);
    try {
      await onTriggerSos({
        category: selectedCat,
        lat,
        lng
      });
      setDone(true);
    } catch (err) {
      console.error(err);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-neutral-950/90 backdrop-blur-md flex items-center justify-center p-6">
      
      <div className="bg-neutral-900 border border-rose-500/30 rounded-3xl p-6 md:p-8 max-w-lg w-full relative overflow-hidden shadow-2xl glow-red animate-fade-in">
        
        {/* Decorative alert ring */}
        <div className="absolute top-[-20%] left-[-20%] w-[50%] h-[50%] bg-rose-500/10 rounded-full blur-[80px]" />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <AlertOctagon className="w-6 h-6 text-rose-500 animate-pulse" />
            <h3 className="text-xl font-bold font-display uppercase text-rose-500">MUNICIPAL LIFE SAFETY PROTOCOL</h3>
          </div>
          {!done && (
            <button 
              onClick={onClose}
              className="text-neutral-500 hover:text-neutral-200 font-mono text-xs cursor-pointer bg-neutral-950 px-2 py-1 rounded"
            >
              [CLOSE]
            </button>
          )}
        </div>

        {done ? (
          <div className="flex flex-col items-center text-center gap-4 py-8 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-500/15 border-2 border-emerald-500 flex items-center justify-center text-emerald-400">
              <Check className="w-8 h-8 animate-bounce" />
            </div>
            <div>
              <h4 className="text-xl font-black text-emerald-400">🚨 DISPATCH SIGNAL ACTIVATED!</h4>
              <p className="text-xs text-neutral-300 font-light mt-2 max-w-sm leading-relaxed">
                Emergency Hazmat Crew 1 has been successfully routed. Current calculated GPS coordinates have been forwarded. ETA: <strong>7 mins</strong>.
              </p>
            </div>
            <button 
              onClick={onClose}
              className="mt-4 px-6 py-2 bg-neutral-950 hover:bg-neutral-900 text-neutral-300 font-bold rounded-xl text-xs border border-neutral-800 transition-all cursor-pointer"
            >
              Close Protocol Frame
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            <p className="text-xs text-neutral-400 leading-normal font-light">
              This terminal is an immediate link to county paramedics, civil search units, and fire patrols. Select incident threat vector to coordinate dispatch.
            </p>

            {/* Select threat type */}
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => setSelectedCat("fire")}
                className={`p-3.5 rounded-2xl border flex flex-col items-center gap-2 text-xs font-semibold cursor-pointer transition-all ${
                  selectedCat === "fire" ? "bg-rose-950/40 border-rose-500 text-rose-400" : "bg-neutral-950 border-neutral-850 text-neutral-450 hover:border-neutral-700"
                }`}
              >
                <Flame className="w-5 h-5" />
                Structural Fire
              </button>
              
              <button 
                onClick={() => setSelectedCat("flood")}
                className={`p-3.5 rounded-2xl border flex flex-col items-center gap-2 text-xs font-semibold cursor-pointer transition-all ${
                  selectedCat === "flood" ? "bg-rose-950/40 border-rose-500 text-rose-400" : "bg-neutral-950 border-neutral-850 text-neutral-450 hover:border-neutral-700"
                }`}
              >
                <Droplets className="w-5 h-5" />
                Severe Flash Flooding
              </button>

              <button 
                onClick={() => setSelectedCat("accident")}
                className={`p-3.5 rounded-2xl border flex flex-col items-center gap-2 text-xs font-semibold cursor-pointer transition-all ${
                  selectedCat === "accident" ? "bg-rose-950/40 border-rose-500 text-rose-400" : "bg-neutral-950 border-neutral-850 text-neutral-450 hover:border-neutral-700"
                }`}
              >
                <ShieldAlert className="w-5 h-5" />
                Accident / Trauma
              </button>

              <button 
                onClick={() => setSelectedCat("fallen_obstacle")}
                className={`p-3.5 rounded-2xl border flex flex-col items-center gap-2 text-xs font-semibold cursor-pointer transition-all ${
                  selectedCat === "fallen_obstacle" ? "bg-rose-950/40 border-rose-500 text-rose-400" : "bg-neutral-950 border-neutral-850 text-neutral-450 hover:border-neutral-700"
                }`}
              >
                <AlertOctagon className="w-5 h-5" />
                Fallen Trees/Hazard
              </button>
            </div>

            {/* GPS Lock */}
            <div className="bg-neutral-950 p-4 border border-neutral-850 rounded-2xl flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2 text-neutral-400">
                <MapPin className="text-rose-500 animate-pulse" />
                <span>Simulated Cell GPS Locked:</span>
              </div>
              <strong className="text-rose-400">{lat.toFixed(4)}, {lng.toFixed(4)}</strong>
            </div>

            {/* Central Panic trigger */}
            <button 
              id="sos-panic-trigger"
              onClick={handleTrigger}
              disabled={busy}
              className="w-full py-4.5 bg-rose-600 hover:bg-rose-500 hover:scale-[1.01] transition-all text-white text-base font-black uppercase rounded-2xl cursor-pointer shadow-xl shadow-rose-600/30 outline-none flex items-center justify-center gap-2"
            >
              {busy ? "Broadcasting SOS Radar..." : "ACTIVATE IMMEDIATE DISPATCH"}
            </button>
          </div>
        )}

      </div>

    </div>
  );
}
