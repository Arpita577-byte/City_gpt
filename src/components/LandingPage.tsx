import { motion } from "motion/react";
import { Camera, Zap, MapPin, Brain, ShieldAlert, ArrowRight, CheckCircle, Users, Activity, ChevronRight } from "lucide-react";
import { ComplaintCategory } from "../types";

interface LandingPageProps {
  onNavigate: (page: string) => void;
  onSetRole: (role: "citizen" | "worker" | "admin") => void;
  cityHealth: number;
}

const CATEGORIES: {
  id: ComplaintCategory;
  title: string;
  desc: string;
  icon: any;
  color: string;
}[] = [
  { id: "waste", title: "Waste Detection", desc: "Garbage overflow, missed bins, litter piles", icon: Camera, color: "from-amber-500 to-orange-600" },
  { id: "water", title: "Water Leakage", desc: "Pipeline ruptures, flooded roads, hydrant leaks", icon: Zap, color: "from-blue-500 to-cyan-600" },
  { id: "pothole", title: "Pothole Hazards", desc: "Asphalt cracks, dangerous descent gaps", icon: MapPin, color: "from-rose-500 to-red-600" },
  { id: "traffic", title: "Traffic Signals", desc: "Malfunctioning lights, gridlock points", icon: Activity, color: "from-emerald-500 to-teal-600" },
  { id: "lighting", title: "Streetlight Failures", desc: "Unlit avenues, dark tunnels, wire damage", icon: Brain, color: "from-purple-500 to-indigo-600" },
  { id: "tree", title: "Fallen Obstacles", desc: "Deformed branches, storm tree debris", icon: ShieldAlert, color: "from-green-500 to-emerald-600" }
];

export default function LandingPage({ onNavigate, onSetRole, cityHealth }: LandingPageProps) {
  return (
    <div className="relative min-h-screen bg-neutral-950 overflow-hidden font-sans text-neutral-100">
      
      {/* Dynamic Ambient Background Lights */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-950/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Cyber City Twin Animation Canvas background */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      {/* Hero Container */}
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-24 md:pt-40 md:pb-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Block */}
          <div className="lg:col-span-7 flex flex-col items-start gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-950/40 text-indigo-400 border border-indigo-500/20 rounded-full text-xs font-semibold uppercase tracking-wider"
            >
              <Zap className="w-3.5 h-3.5 text-indigo-400" />
              Empowering Municipal Governance
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl sm:text-7xl font-bold font-display uppercase tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-r from-neutral-50 via-neutral-100 to-indigo-300"
            >
              CityGPT <span className="block mt-2 text-2xl sm:text-4xl font-normal lowercase font-sans text-neutral-400">making metro grids smarter with AI</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-neutral-400 text-lg md:text-xl max-w-xl font-light leading-relaxed"
            >
              The advanced predictive brain that detects hazards, auto-allocates response crews, and measures urban performance in real-time.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4 pt-4 w-full sm:w-auto"
            >
              <button 
                id="hero-btn-report"
                onClick={() => { onSetRole("citizen"); onNavigate("report_issue"); }}
                className="group flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold shadow-xl shadow-indigo-600/10 cursor-pointer transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <Camera className="w-5 h-5 text-indigo-200 group-hover:scale-110 transition-transform duration-300" />
                Report an Issue
                <ArrowRight className="w-4 h-4 text-indigo-200 group-hover:translate-x-1 transition-transform" />
              </button>

              <button 
                id="hero-btn-map"
                onClick={() => { onSetRole("citizen"); onNavigate("live_map"); }}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-200 hover:text-white rounded-xl font-semibold transition-all duration-300"
              >
                <MapPin className="w-5 h-5 text-neutral-400" />
                See Live City Map
              </button>
            </motion.div>

            {/* Quick Micro Indicators */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 w-full border-t border-neutral-900"
            >
              <div>
                <span className="block text-xs text-neutral-500 uppercase font-semibold">Report Speed</span>
                <span className="text-sm font-medium text-indigo-300">&lt; 15 seconds</span>
              </div>
              <div>
                <span className="block text-xs text-neutral-500 uppercase font-semibold">Teams Active</span>
                <span className="text-sm font-medium text-indigo-300">18 Patrol Divisions</span>
              </div>
              <div>
                <span className="block text-xs text-neutral-500 uppercase font-semibold">AI Auto-Tagging</span>
                <span className="text-sm font-medium text-emerald-400">99.4% Accuracy</span>
              </div>
              <div>
                <span className="block text-xs text-neutral-500 uppercase font-semibold">City Health Score</span>
                <span className="text-sm font-medium text-emerald-400">{cityHealth}/100</span>
              </div>
            </motion.div>
          </div>

          {/* Right Floating Dashboard Visualiser Element */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            
            {/* Visual glow frame */}
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 to-purple-500/10 rounded-3xl blur-2xl" />

            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full glass-panel rounded-2xl p-6 border border-neutral-800/80 shadow-2xl overflow-hidden glow-indigo max-w-md"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-neutral-900 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-[11px] font-mono tracking-widest text-neutral-400 uppercase">Live telemetry frame</span>
                </div>
                <span className="text-[11px] font-mono text-indigo-400 bg-indigo-950/80 px-2 py-0.5 rounded-md">AI ACTIVE</span>
              </div>

              {/* Central Map Mock Visualization */}
              <div className="relative h-64 bg-neutral-950 rounded-xl overflow-hidden border border-neutral-900 group">
                {/* Simulated Grid Streets */}
                <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
                  backgroundImage: "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
                  backgroundSize: "32px 32px"
                }} />

                {/* Simulated Roads */}
                <svg className="absolute inset-0 w-full h-full text-indigo-500/20" viewBox="0 0 400 250">
                  <path d="M 0 50 L 400 130" stroke="currentColor" strokeWidth="8" fill="none" />
                  <path d="M 120 0 L 120 250" stroke="currentColor" strokeWidth="8" fill="none" />
                  <path d="M 320 0 L 220 250" stroke="currentColor" strokeWidth="8" fill="none" />
                  <path d="M 0 180 L 400 80" stroke="currentColor" strokeWidth="4" fill="none" />
                </svg>

                {/* Animated pulsing city core */}
                <div className="absolute top-[80px] left-[120px] -translate-x-1/2 -translate-y-1/2">
                  <span className="absolute inline-flex h-12 w-12 rounded-full bg-indigo-500/10 animate-ping" />
                  <span className="relative flex rounded-full h-4 w-4 bg-indigo-500 border-2 border-white items-center justify-center shadow-lg" />
                </div>

                {/* Pulsing hazard point (Water leak) */}
                <div className="absolute top-[110px] left-[300px] -translate-x-1/2 -translate-y-1/2">
                  <span className="absolute inline-flex h-12 w-12 rounded-full bg-rose-500/20 animate-ping" />
                  <span className="relative flex rounded-full h-4 w-4 bg-rose-600 border-2 border-white items-center justify-center shadow-lg shadow-rose-600/50" />
                </div>

                {/* Floating telemetry tag */}
                <div className="absolute bottom-4 left-4 right-4 bg-neutral-900/90 backdrop-blur-md rounded-lg p-3 border border-neutral-800 text-xs flex items-center justify-between shadow-xl">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 bg-rose-500 rounded-full animate-pulse" />
                    <div>
                      <p className="font-semibold text-neutral-200">Sector 4 Station leak</p>
                      <p className="text-[10px] text-neutral-400">Severity Match: High Priority</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-neutral-500 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* System Diagnostics below Map */}
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="bg-neutral-900/50 p-3 rounded-lg border border-neutral-900 text-center">
                  <span className="block text-[10px] text-neutral-500 uppercase tracking-widest font-mono">Response ETA</span>
                  <span className="text-base font-bold text-indigo-400">32 min avg</span>
                </div>
                <div className="bg-neutral-900/50 p-3 rounded-lg border border-neutral-900 text-center">
                  <span className="block text-[10px] text-neutral-500 uppercase tracking-widest font-mono">Citizen Score</span>
                  <span className="text-base font-bold text-emerald-400">95% Satisfied</span>
                </div>
              </div>

              {/* Credentials card simulator */}
              <div className="mt-4 flex items-center justify-between bg-indigo-950/10 border border-indigo-500/10 rounded-xl p-3 text-xs text-indigo-300">
                <span className="font-mono">W3 PIPE PREDICTION BURST RISK</span>
                <span className="font-bold uppercase tracking-wider text-rose-400 animate-pulse bg-rose-950/50 px-2 py-0.5 rounded-md">85% Hazard</span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Live Statistics Section */}
      <div className="bg-neutral-950 border-y border-neutral-900 py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-8">
            <div className="text-center md:text-left bg-neutral-900/20 p-6 rounded-xl border border-neutral-900/50">
              <span className="block text-4xl font-bold font-display uppercase tracking-tight text-indigo-400">2,450+</span>
              <span className="text-xs text-neutral-500 uppercase mt-2 font-semibold block">Issues Resolved</span>
            </div>
            <div className="text-center md:text-left bg-neutral-900/20 p-6 rounded-xl border border-neutral-900/50">
              <span className="block text-4xl font-bold font-display uppercase tracking-tight text-emerald-400">95%</span>
              <span className="text-xs text-neutral-500 uppercase mt-2 font-semibold block">Citizen Satisfaction</span>
            </div>
            <div className="text-center md:text-left bg-neutral-900/20 p-6 rounded-xl border border-neutral-900/50">
              <span className="block text-4xl font-bold font-display uppercase tracking-tight text-white">18</span>
              <span className="text-xs text-neutral-500 uppercase mt-2 font-semibold block">Active Teams</span>
            </div>
            <div className="text-center md:text-left bg-neutral-900/20 p-6 rounded-xl border border-neutral-900/50">
              <span className="block text-4xl font-bold font-display uppercase tracking-tight text-indigo-400">32 min</span>
              <span className="text-xs text-neutral-500 uppercase mt-2 font-semibold block">Avg Response Speed</span>
            </div>
            <div className="text-center md:text-left bg-neutral-900/20 p-6 rounded-xl border border-neutral-900/50 col-span-2 lg:col-span-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-neutral-500 uppercase font-semibold">Grid Performance</span>
                <span className="text-xs text-emerald-400 font-bold">{cityHealth}/100</span>
              </div>
              <div className="w-full bg-neutral-900 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${cityHealth}%` }} />
              </div>
              <span className="text-[10px] text-neutral-400 mt-2 block font-mono">Category: Healthy Urban Space</span>
            </div>
          </div>
        </div>
      </div>

      {/* How it works Section */}
      <div className="max-w-7xl mx-auto px-6 py-24 relative z-10 transition-colors uppercase-desc">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-mono uppercase tracking-widest text-indigo-400 mb-2">Automated Incident Pipeline</h2>
          <p className="text-3xl font-bold font-display tracking-tight text-neutral-50">How CityGPT Coordinates Response</p>
          <p className="text-sm text-neutral-400 font-light mt-2">Connecting citizens, autonomous models, and workforces in a closed-loop resolution.</p>
        </div>

        {/* Dynamic Connected Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
          
          {/* Card 1 */}
          <div className="bg-neutral-900/40 p-6 rounded-xl border border-neutral-900 relative flex flex-col gap-4 text-center items-center">
            <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center border border-amber-500/20">
              <Camera className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <span className="text-xs font-mono text-neutral-500 uppercase block mb-1">Step 01</span>
              <h3 className="text-sm font-bold text-neutral-100">Snap Photo</h3>
              <p className="text-xs text-neutral-400 mt-1.5 font-light leading-relaxed">Citizen clicks a photo of garbage or pothole and uploads it instantly.</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-neutral-900/40 p-6 rounded-xl border border-neutral-900 relative flex flex-col gap-4 text-center items-center">
            <div className="w-12 h-12 bg-sky-500/10 rounded-xl flex items-center justify-center border border-sky-500/20">
              <Brain className="w-6 h-6 text-sky-400" />
            </div>
            <div>
              <span className="text-xs font-mono text-neutral-500 uppercase block mb-1">Step 02</span>
              <h3 className="text-sm font-bold text-neutral-100">AI Identifies</h3>
              <p className="text-xs text-neutral-400 mt-1.5 font-light leading-relaxed">Model processes pixels, labels category, priority, and extracts exact location payload.</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-neutral-900/40 p-6 rounded-xl border border-neutral-900 relative flex flex-col gap-4 text-center items-center">
            <div className="w-12 h-12 bg-rose-500/10 rounded-xl flex items-center justify-center border border-rose-500/20">
              <ShieldAlert className="w-6 h-6 text-rose-400" />
            </div>
            <div>
              <span className="text-xs font-mono text-neutral-500 uppercase block mb-1">Step 03</span>
              <h3 className="text-sm font-bold text-neutral-100">Priority Assigned</h3>
              <p className="text-xs text-neutral-400 mt-1.5 font-light leading-relaxed">System evaluates severity threat and triggers automated work orders instantly.</p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-neutral-900/40 p-6 rounded-xl border border-neutral-900 relative flex flex-col gap-4 text-center items-center">
            <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center border border-indigo-500/20">
              <Users className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <span className="text-xs font-mono text-neutral-500 uppercase block mb-1">Step 04</span>
              <h3 className="text-sm font-bold text-neutral-100">Crews Dispatched</h3>
              <p className="text-xs text-neutral-400 mt-1.5 font-light leading-relaxed">Nearest field unit receives tasks, before-photos, and maps vector routing coordinates.</p>
            </div>
          </div>

          {/* Card 5 */}
          <div className="bg-neutral-900/40 p-6 rounded-xl border border-neutral-900 relative flex flex-col gap-4 text-center items-center">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/20">
              <CheckCircle className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <span className="text-xs font-mono text-neutral-500 uppercase block mb-1">Step 05</span>
              <h3 className="text-sm font-bold text-neutral-100">Problem Fixed</h3>
              <p className="text-xs text-neutral-400 mt-1.5 font-light leading-relaxed">Provisional evidence with post-verification is submitted, closing the tracking ticket.</p>
            </div>
          </div>

        </div>
      </div>

      {/* Features Categories Section */}
      <div className="bg-neutral-900/10 max-w-7xl mx-auto px-6 py-24 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-mono uppercase tracking-widest text-indigo-400 mb-2">Municipal Framework</h2>
          <p className="text-3xl font-bold font-display tracking-tight text-neutral-50">Sensory Tracking Categories</p>
          <p className="text-sm text-neutral-400 font-light mt-2">Targeted urban issues classified automatically by the CityGPT Computer Vision node.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat, i) => {
            const IconComp = cat.icon;
            return (
              <motion.div 
                key={cat.id}
                whileHover={{ y: -4, scale: 1.01 }}
                className="bg-neutral-900/30 hover:bg-neutral-900/60 p-6 rounded-2xl border border-neutral-900 hover:border-neutral-800 flex flex-col items-start gap-4 transition-all duration-300"
              >
                <div className={`p-3 bg-gradient-to-tr ${cat.color} rounded-xl text-white shadow-md`}>
                  <IconComp className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-neutral-200 capitalize">{cat.title}</h3>
                  <p className="text-xs text-neutral-400 mt-1 font-light leading-relaxed">{cat.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
