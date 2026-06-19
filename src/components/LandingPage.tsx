import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Camera, Zap, MapPin, Brain, ShieldAlert, ArrowRight, CheckCircle, Users, Activity, Play, X, Globe, Cpu, AlertCircle } from "lucide-react";
import { ComplaintCategory } from "../types";

interface LandingPageProps {
  onNavigate: (page: string) => void;
  onSetRole: (role: "citizen" | "worker" | "admin") => void;
  cityHealth: number;
}

const SPECIFIC_FEATURES = [
  { title: "Waste Management", desc: "Automated vision nodes detect overflow, missed collections, and debris heap hazards.", icon: Camera, color: "from-[#0EA5E9]/20 to-[#10B981]/10", border: "border-[#0EA5E9]/20" },
  { title: "Water Leakage", desc: "Accidents, fluid pressure sensors, and rapid acoustic node leaks mapped automatically.", icon: Zap, color: "from-[#10B981]/20 to-[#0EA5E9]/10", border: "border-[#10B981]/20" },
  { title: "Broken Roads", desc: "Computer vision and laser telemetry maps deep pothole hazards and line markings.", icon: MapPin, color: "from-purple-500/20 to-[#0EA5E9]/10", border: "border-purple-500/20" },
  { title: "Street Lights", desc: "Automated grid-outage reporting monitors consecutive dark lanes and faulty transformers.", icon: Cpu, color: "from-amber-500/20 to-purple-500/10", border: "border-amber-500/20" },
  { title: "Traffic Problems", desc: "Neural path detection optimizes traffic light timing and alerts congestion bottlenecks.", icon: Activity, color: "from-rose-500/20 to-[#0EA5E9]/10", border: "border-rose-500/20" },
  { title: "AI Predictions", desc: "Deep temporal forecasting estimates structural water leaks and blockages before they burst.", icon: Brain, color: "from-[#0EA5E9]/20 to-purple-500/10", border: "border-[#0EA5E9]/20" },
  { title: "Live Maps", desc: "GIS multi-layer telemetry traces incident stages chronologically with GPS pin matches.", icon: Globe, color: "from-[#10B981]/20 to-emerald-500/10", border: "border-[#10B981]/20" }
];

export default function LandingPage({ onNavigate, onSetRole, cityHealth }: LandingPageProps) {
  const [demoOpen, setDemoOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  return (
    <div className="relative min-h-screen bg-[#07111F] overflow-hidden font-sans text-neutral-100">
      
      {/* Animated City Background (Cyber Grid & Skyline) */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-15">
        <div className="absolute inset-0 bg-[radial-gradient(#0EA5E9_1px,transparent_1px)] [background-size:24px_24px]" />
        {/* Animated grid line vectors representing floating roads */}
        <svg className="absolute inset-0 w-full h-full text-[#0EA5E9]/30" xmlns="http://www.w3.org/2000/svg">
          <motion.path 
            d="M-100 100 L1200 400" 
            stroke="currentColor" 
            strokeWidth="2" 
            fill="none" 
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
          <motion.path 
            d="M200 -100 L800 600" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            fill="none" 
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear", delay: 2 }}
          />
          <motion.path 
            d="M900 0 L100 500" 
            fill="none" 
            stroke="url(#purpleGlow)" 
            strokeWidth="2" 
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear", delay: 1 }}
          />
          <defs>
            <linearGradient id="purpleGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#0EA5E9" />
            </linearGradient>
          </defs>
        </svg>

        {/* Floating skyline outline far in the back */}
        <div className="absolute bottom-0 left-0 right-0 h-64 opacity-25 bg-[repeat-x]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 300'%3E%3Cpath fill='%230EA5E9' d='M0,300 L0,180 L50,180 L50,140 L100,140 L100,220 L150,220 L150,100 L200,100 L200,240 L250,240 L250,160 L300,160 L300,80 L350,80 L350,200 L400,200 L400,120 L450,120 L450,250 L500,250 L500,140 L550,140 L550,70 L600,70 L600,210 L650,210 L650,150 L700,150 L700,245 L750,245 L750,130 L800,130 L800,90 L850,90 L850,220 L900,220 L900,155 L950,155 L950,260 L1000,260 L1000,300 Z'/%3E%3C/svg%3E")`,
          backgroundSize: "700px 300px",
          filter: "blur(0.5px)"
        }} />
      </div>

      {/* Hero Container */}
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-24 md:pt-40 md:pb-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Text Block */}
          <div className="lg:col-span-7 flex flex-col items-start gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-sky-950/40 text-sky-400 border border-sky-500/20 rounded-full text-xs font-semibold uppercase tracking-wider"
            >
              <Zap className="w-3.5 h-3.5 text-sky-400" />
              CYBERGROWTH DIGITAL TWIN INSTALLED
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h1 className="text-6xl sm:text-8xl font-black font-display tracking-tight text-white leading-none">
                CITYGPT
              </h1>
              <span className="block text-2xl sm:text-4xl font-normal font-sans text-sky-400 mt-2">
                Your AI Assistant for Smarter Cities
              </span>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-neutral-300 text-lg md:text-xl max-w-xl font-light leading-relaxed"
            >
              Report issues. Track progress. Build better communities. Connecting municipal sensors, predictive neuro-models, and citizens in one beautiful loop.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4 pt-4 w-full sm:w-auto"
            >
              {/* GET STARTED button redirects to login screen */}
              <button 
                id="landing-get-started"
                onClick={() => onNavigate("login")}
                className="group flex items-center justify-center gap-2.5 px-8 py-4 bg-sky-600 hover:bg-sky-500 text-white rounded-xl font-bold shadow-lg shadow-sky-600/20 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
              >
                Get Started
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* WATCH DEMO button shows magnificent live mockup trigger */}
              <button 
                id="landing-watch-demo"
                onClick={() => setDemoOpen(true)}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-[#0D1D2E] border border-sky-500/10 hover:border-sky-550 hover:bg-neutral-900/60 text-neutral-200 hover:text-white rounded-xl font-semibold transition-all duration-300 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current text-sky-450" />
                Watch Demo
              </button>
            </motion.div>
          </div>

          {/* Right Floating Dashboard Visualiser Element */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-sky-500/5 to-purple-500/10 rounded-3xl blur-2xl" />

            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full bg-[#0D1D2E]/60 backdrop-blur-xl rounded-3xl p-6 border border-sky-500/10 shadow-2xl overflow-hidden max-w-md"
            >
              {/* Header telemetry trace lines */}
              <div className="flex items-center justify-between border-b border-sky-500/15 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <span className="text-[10px] font-mono tracking-widest text-[#10B981] uppercase font-bold">GRID ONLINE</span>
                </div>
                <span className="text-[10px] font-mono text-sky-400 bg-sky-950/60 px-2.5 py-0.5 rounded-md border border-sky-500/10">TELEMETRY SECURE</span>
              </div>

              {/* Central Map Mock Visualization */}
              <div className="relative h-64 bg-neutral-950/80 rounded-2xl overflow-hidden border border-sky-500/10 group">
                {/* Grid */}
                <div className="absolute inset-0 opacity-15 pointer-events-none" style={{
                  backgroundImage: "linear-gradient(rgba(14,165,233,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.15) 1px, transparent 1px)",
                  backgroundSize: "24px 24px"
                }} />

                {/* Simulated Roads paths */}
                <svg className="absolute inset-0 w-full h-full text-sky-500/15" viewBox="0 0 400 250">
                  <path d="M 0 60 Q 150 90, 400 60" stroke="currentColor" strokeWidth="6" fill="none" />
                  <path d="M 120 0 L 120 250" stroke="currentColor" strokeWidth="6" fill="none" />
                  <path d="M 280 0 L 320 250" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path d="M 0 190 Q 200 130, 400 180" stroke="currentColor" strokeWidth="8" fill="none" />
                </svg>

                {/* Live indicators */}
                <div className="absolute top-[75px] left-[135px] -translate-x-1/2 -translate-y-1/2">
                  <span className="absolute inline-flex h-10 w-10 rounded-full bg-emerald-500/20 animate-ping" />
                  <span className="relative flex rounded-full h-4 w-4 bg-[#10B981] border-2 border-white items-center justify-center shadow-lg" />
                </div>

                <div className="absolute top-[140px] left-[295px] -translate-x-1/2 -translate-y-1/2">
                  <span className="absolute inline-flex h-10 w-10 rounded-full bg-rose-500/20 animate-ping" />
                  <span className="relative flex rounded-full h-4 w-4 bg-rose-600 border-2 border-white items-center justify-center shadow-lg" />
                </div>

                {/* Floating active card indicator */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#07111F]/90 backdrop-blur-md rounded-xl p-3.5 border border-sky-500/15 text-xs flex items-center justify-between shadow-xl">
                  <div className="flex items-center gap-2.5">
                    <div className="w-3 h-3 bg-rose-500 rounded-full animate-pulse" />
                    <div>
                      <p className="font-bold text-neutral-100">Live Hydrant Breach</p>
                      <p className="text-[10px] text-sky-400 font-mono">Sector 4 Ward 3</p>
                    </div>
                  </div>
                  <span className="text-[9px] font-mono text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded border border-rose-500/10">HIGH RISK</span>
                </div>
              </div>

              {/* Simulated Stats beneath Map */}
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="bg-neutral-950/40 p-3.5 rounded-xl border border-sky-500/5 text-center">
                  <span className="block text-[10px] text-neutral-400 uppercase tracking-wider font-mono">GRID STATUS</span>
                  <span className="text-base font-bold text-[#10B981]">OPTIMAL</span>
                </div>
                <div className="bg-neutral-950/40 p-3.5 rounded-xl border border-sky-500/5 text-center">
                  <span className="block text-[10px] text-neutral-400 uppercase tracking-wider font-mono">SATISFACTION</span>
                  <span className="text-base font-bold text-sky-400">95%</span>
                </div>
              </div>

            </motion.div>
          </div>

        </div>
      </div>

      {/* Live Statistics Section (Glassmorphism Cards) */}
      <div className="bg-[#0D1D2E]/40 border-y border-sky-500/10 py-16 relative z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center md:text-left mb-6 max-w-lg">
            <h3 className="text-xs font-mono uppercase tracking-widest text-sky-400 font-bold">GRID COMPILATIONS</h3>
            <p className="text-xl font-bold font-display text-white mt-1">Validated Smart City Performance Indexes</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#07111F]/80 backdrop-blur-md p-6 rounded-2xl border border-sky-500/10 hover:border-sky-500/20 transition-all">
              <span className="block text-4xl font-extrabold text-sky-400 font-display">2450+</span>
              <span className="text-xs text-neutral-400 uppercase mt-2 font-medium tracking-wider block">Issues Solved</span>
            </div>
            <div className="bg-[#07111F]/80 backdrop-blur-md p-6 rounded-2xl border border-sky-500/10 hover:border-sky-500/20 transition-all">
              <span className="block text-4xl font-extrabold text-[#10B981] font-display">95%</span>
              <span className="text-xs text-neutral-400 uppercase mt-2 font-medium tracking-wider block">Citizen Satisfaction</span>
            </div>
            <div className="bg-[#07111F]/80 backdrop-blur-md p-6 rounded-2xl border border-sky-500/10 hover:border-sky-500/20 transition-all">
              <span className="block text-4xl font-extrabold text-white font-display">18</span>
              <span className="text-xs text-neutral-400 uppercase mt-2 font-medium tracking-wider block">Active Teams</span>
            </div>
            <div className="bg-[#07111F]/80 backdrop-blur-md p-6 rounded-2xl border border-sky-500/10 hover:border-sky-500/20 transition-all">
              <span className="block text-4xl font-extrabold text-sky-400 font-display">30 min</span>
              <span className="text-xs text-neutral-400 uppercase mt-2 font-medium tracking-wider block">Average Response</span>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section (Horizontal Flow Pipeline) */}
      <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-mono uppercase tracking-widest text-[#10B981] font-bold mb-2">INTELLIGENT TIMELINE</h2>
          <p className="text-3xl font-extrabold tracking-tight text-white font-display">How It Works</p>
          <p className="text-sm text-neutral-400 font-light mt-2">The closed-loop resolution sequence from discovery to verification.</p>
        </div>

        {/* Horizontal Card Sequence */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          
          {/* Card 1 */}
          <div className="bg-[#0D1D2E]/40 p-6 rounded-2xl border border-sky-500/10 relative flex flex-col gap-4 text-center items-center group hover:border-[#0EA5E9]/30 transition-all">
            <div className="w-12 h-12 bg-sky-500/10 rounded-xl flex items-center justify-center border border-sky-550/20 text-[#0EA5E9]">
              <Camera className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white mb-2">📷 Snap Photo</h3>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">Simply capture and upload an image of any localized structural issue.</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-[#0D1D2E]/40 p-6 rounded-2xl border border-sky-500/10 relative flex flex-col gap-4 text-center items-center group hover:border-[#0EA5E9]/30 transition-all">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-550/20 text-[#10B981]">
              <Brain className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white mb-2">🧠 AI Detects</h3>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">Neural layers identify categories, priority levels, and physical locations instantly.</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-[#0D1D2E]/40 p-6 rounded-2xl border border-sky-500/10 relative flex flex-col gap-4 text-center items-center group hover:border-[#0EA5E9]/30 transition-all">
            <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center border border-purple-550/20 text-purple-400">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white mb-2">🚀 Team Assigned</h3>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">Crews are automatically dispatched with real-time vector routing paths.</p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-[#0D1D2E]/40 p-6 rounded-2xl border border-sky-500/10 relative flex flex-col gap-4 text-center items-center group hover:border-[#0EA5E9]/30 transition-all">
            <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center border border-amber-550/20 text-amber-400">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white mb-2">✅ Problem Solved</h3>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">Post-verification images close the ticket, updating the City Health Index.</p>
            </div>
          </div>

        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-6 py-24 relative z-10 border-t border-sky-500/10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-mono uppercase tracking-widest text-[#0EA5E9] font-bold mb-2">SENSORY SUITE</h2>
          <p className="text-3xl font-extrabold tracking-tight text-white font-display">Sensory Features</p>
          <p className="text-sm text-neutral-400 font-light mt-2">Robust municipal frameworks powered by automated cyber telemetry systems.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SPECIFIC_FEATURES.map((feat, i) => {
            const IconComp = feat.icon;
            return (
              <motion.div 
                key={i}
                whileHover={{ y: -4, scale: 1.01 }}
                className={`bg-[#0D1D2E]/30 p-6 rounded-2xl border ${feat.border} flex flex-col items-start gap-4 transition-all duration-350`}
              >
                <div className={`p-3 rounded-xl bg-gradient-to-tr ${feat.color} text-white`}>
                  <IconComp className="w-5 h-5 text-sky-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-neutral-100 capitalize">{feat.title}</h3>
                  <p className="text-xs text-neutral-400 mt-2 font-light leading-relaxed">{feat.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* WATCH DEMO MODAL SCREEN */}
      <AnimatePresence>
        {demoOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#07111F]/95 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 10 }}
              className="bg-[#0D1D2E] border border-sky-500/20 max-w-2xl w-full rounded-3xl p-6 relative shadow-2xl overflow-hidden"
            >
              <div className="absolute top-4 right-4 z-10">
                <button 
                  onClick={() => setDemoOpen(false)}
                  className="p-2 bg-neutral-950/80 border border-neutral-800 rounded-full text-neutral-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Grid scanning mockup visual */}
              <div className="text-center py-6">
                <div className="inline-flex p-3 bg-sky-500/10 text-sky-400 rounded-2xl mb-4">
                  <Globe className="w-8 h-8 animate-spin-slow" />
                </div>
                <h3 className="text-2xl font-bold text-white font-display uppercase tracking-tight">
                  CityGPT Neural Demo Console
                </h3>
                <p className="text-xs text-neutral-400 max-w-md mx-auto mt-2">
                  Triggers computer vision scanning heuristics across simulated municipal pipelines.
                </p>
              </div>

              <div className="bg-neutral-950/60 p-5 rounded-2xl border border-sky-500/5 font-mono text-[11px] text-sky-400 space-y-3 leading-relaxed">
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold border-b border-neutral-900 pb-2">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                  INITIATING MUNICIPAL COMPLIANCE SCAN...
                </div>
                <p>&gt; Connection loaded at telemetry port 3000</p>
                <p>&gt; Processing solid waste neural grid image (COMP-101)...</p>
                <p className="text-emerald-400 font-semibold">&gt; SUCCESS: 98.4% Confidence: Garbage Heap Detected. High severity tags attached.</p>
                <p>&gt; Recalculating hydraulics pressure lines Sector 4...</p>
                <p className="text-purple-400 font-semibold">&gt; RESOLVED: Dispatched Crew 3 to Station rupture.</p>
                <div className="p-3 bg-sky-950/20 border border-sky-550/10 rounded-xl flex items-start gap-2.5 mt-2.5">
                  <AlertCircle className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                  <span className="text-[10px] text-neutral-300">
                    CityGPT enables citizens to report visual outages seamlessly while automated systems analyze, categorise and track complaints from reporting to resolution.
                  </span>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button 
                  onClick={() => setDemoOpen(false)}
                  className="px-5 py-2.5 bg-neutral-900 border border-neutral-800 text-neutral-300 text-xs font-semibold rounded-xl hover:text-white transition-colors cursor-pointer"
                >
                  Close Demo
                </button>
                <button 
                  onClick={() => { setDemoOpen(false); onNavigate("login"); }}
                  className="px-5 py-2.5 bg-sky-600 text-white text-xs font-bold rounded-xl hover:bg-sky-500 shadow-lg shadow-sky-600/10 transition-colors cursor-pointer"
                >
                  Get Started Now
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto px-6 py-24 relative z-10 border-t border-sky-500/10" id="landing-faq">
        <div className="text-center mb-12">
          <h2 className="text-xs font-mono uppercase tracking-widest text-sky-400 font-bold mb-2">FAQ</h2>
          <p className="text-3xl font-extrabold tracking-tight text-white font-display">Frequently Asked Questions</p>
        </div>

        <div className="space-y-4">
          {[
            { q: "What is CityGPT?", a: "CityGPT is an intelligent smart city administrative platform that allows citizens to report municipal issues instantly via photo upload, parses categories automatically using computer vision models, and manages ticket tracking continuously across workers and officials." },
            { q: "How does the AI detection work?", a: "When you upload an incident photo, our server-side models run visual checks to tag the categories (such as waste, hydraulic leakage, potholes), assign severity, coordinate GPS coordinates, and suggest optimal remediation teams." },
            { q: "What are Green points?", a: "By submitting valid city issue logs and verifying completed repairs, you earn municipal Green Points. These points accumulate into citizen badges and leaderboard positions, unlocking municipal subsidies." },
            { q: "Who coordinates the field repairs?", a: "Assigned field workers access their dedicated Worker Dashboard to check task lists, load navigation vectors, upload 'Before' & 'After' photographs, and update progress states seamlessly." }
          ].map((faq, index) => (
            <div 
              key={index} 
              className="bg-[#0D1D2E]/40 border border-sky-500/10 rounded-2xl overflow-hidden transition-all"
            >
              <button 
                onClick={() => toggleFaq(index)}
                className="w-full text-left p-5 flex items-center justify-between font-semibold text-sm text-neutral-100 hover:text-white transition-colors cursor-pointer focus:outline-none"
              >
                <span>{faq.q}</span>
                <span className="text-sky-400 text-lg font-bold">{faqOpen === index ? "−" : "+"}</span>
              </button>
              <AnimatePresence>
                {faqOpen === index && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-sky-500/5 px-5 pb-5 text-xs text-neutral-400 leading-relaxed font-light mt-1"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER SECTION */}
      <footer className="bg-[#050C16] border-t border-sky-500/10 py-16 relative z-10 text-neutral-400 font-light" id="landing-footer">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 text-xs">
          
          <div className="flex flex-col gap-4">
            <span className="text-lg font-bold tracking-wider font-display text-white uppercase block">
              🌆 CityGPT
            </span>
            <p className="text-neutral-400 pr-4 leading-relaxed font-light">
              Autonomous municipal operations coordination connecting citizens and local administration frameworks.
            </p>
          </div>

          <div>
            <h4 className="font-mono text-white mb-4 uppercase tracking-wider text-[11px] font-bold">Contact Support</h4>
            <ul className="space-y-2.5 text-neutral-400">
              <li>📍 Municipal Control Center Ward-3</li>
              <li>✉️ administrative.inbox@citygpt.gov</li>
              <li>📞 1-800-CITY-FLOW</li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-white mb-4 uppercase tracking-wider text-[11px] font-bold">Resources</h4>
            <ul className="space-y-2.5 text-neutral-400">
              <li>
                <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-sky-400 transition-colors">
                  GitHub Codebase ↗
                </a>
              </li>
              <li>
                <a href="#landing-faq" className="hover:text-sky-400 transition-colors">About & FAQ</a>
              </li>
              <li>Smart APIs Guidelines</li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-white mb-4 uppercase tracking-wider text-[11px] font-bold">Smart Access</h4>
            <div className="flex flex-col gap-2.5 items-start">
              {/* Login anchor link redirects to Login flow */}
              <button 
                onClick={() => onNavigate("login")}
                className="text-neutral-400 hover:text-sky-400 font-semibold transition-colors cursor-pointer text-left"
              >
                Sign In to Dashboard →
              </button>
              <button 
                onClick={() => { onSetRole("admin"); onNavigate("dashboard"); }}
                className="text-neutral-500 hover:text-purple-400 transition-colors text-left font-mono text-[11px]"
              >
                Admin Direct Bypass
              </button>
              <button 
                onClick={() => { onSetRole("worker"); onNavigate("dashboard"); }}
                className="text-neutral-500 hover:text-amber-450 transition-colors text-left font-mono text-[11px]"
              >
                Worker Direct Bypass
              </button>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
