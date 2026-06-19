import React, { useState } from "react";
import { motion } from "motion/react";
import { Shield, Hammer, Users, Lock, Mail, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Role } from "../types";

interface LoginPageProps {
  onLogin: (role: Role, email: string) => void;
  onNavigateHome: () => void;
}

export default function LoginPage({ onLogin, onNavigateHome }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<Role>("citizen");

  const handleRoleQuickSelect = (role: Role) => {
    setActiveTab(role);
    if (role === "citizen") {
      setEmail("arpita@citygpt.gov");
      setPassword("citizen123");
    } else if (role === "worker") {
      setEmail("worker.sharma@citygpt.gov");
      setPassword("worker123");
    } else if (role === "admin") {
      setEmail("admin.control@citygpt.gov");
      setPassword("admin123");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(activeTab, email || `${activeTab}@citygpt.gov`);
  };

  const handleGoogleSuccess = () => {
    // Quick google login triggers the current selected role login
    onLogin(activeTab, email || `${activeTab}@citygpt.gov`);
  };

  return (
    <div className="relative min-h-screen bg-[#07111F] text-neutral-100 flex flex-col justify-center items-center px-4 overflow-hidden py-16">
      {/* City Skyline Background Art Decoration */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-10">
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-repeat-x" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 300'%3E%3Cpath fill='%230EA5E9' d='M0,300 L0,200 L40,200 L40,160 L80,160 L80,240 L120,240 L120,120 L160,120 L160,250 L200,250 L200,180 L240,180 L240,100 L280,100 L280,220 L320,220 L320,140 L360,140 L360,270 L400,270 L400,150 L440,150 L440,80 L480,80 L480,230 L520,230 L520,170 L560,170 L560,260 L600,260 L600,110 L640,110 L640,210 L680,210 L680,130 L720,130 L720,255 L760,255 L760,145 L800,145 L800,90 L840,90 L840,240 L880,240 L880,165 L920,165 L920,270 L960,270 L960,115 L1000,115 L1000,300 Z'/%3E%3C/svg%3E")`,
          backgroundSize: "contain"
        }} />
      </div>

      {/* Cyber ambient glow elements */}
      <div className="absolute top-[20%] left-[20%] w-[400px] h-[400px] bg-sky-900/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[20%] w-[400px] h-[400px] bg-purple-900/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Back button */}
      <button 
        onClick={onNavigateHome}
        className="absolute top-8 left-8 flex items-center gap-2 text-xs font-semibold text-neutral-400 hover:text-white transition-colors group cursor-pointer z-10"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Landing
      </button>

      <div className="w-full max-w-md relative z-10">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-sky-950/40 text-sky-400 border border-sky-500/20 rounded-full text-[11px] font-mono tracking-wider uppercase mb-3"
          >
            🌆 CityGPT Municipal Login
          </motion.div>
          <h1 className="text-3xl font-bold tracking-tight text-neutral-50 font-display uppercase">
            Welcome Back
          </h1>
          <p className="text-xs text-neutral-400 font-light mt-1.5">
            Log in to manage, report, and maintain our smart urban grid.
          </p>
        </div>

        {/* Custom Glassmorphism Box */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#0D1D2E]/60 backdrop-blur-xl border border-sky-500/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
        >
          {/* Subtle upper gradient bar */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-sky-500 via-purple-500 to-emerald-500" />
          
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Email Field */}
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@citygpt.gov"
                  required
                  className="w-full py-3 pl-11 pr-4 bg-neutral-950/80 border border-neutral-800 hover:border-sky-500/30 focus:border-sky-500/80 text-sm text-white rounded-xl focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-2">
                Security Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <input 
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full py-3 pl-11 pr-11 bg-neutral-950/80 border border-neutral-800 hover:border-sky-500/30 focus:border-sky-500/80 text-sm text-white rounded-xl focus:outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-semibold text-sm transition-all transform active:scale-98 shadow-lg shadow-sky-600/10 cursor-pointer"
            >
              Sign In to Dashboard
            </button>

            {/* Continue with Google */}
            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-neutral-800"></div>
              <span className="flex-shrink mx-4 text-[10px] uppercase font-mono text-neutral-500 tracking-wider">or sign in with</span>
              <div className="flex-grow border-t border-neutral-800"></div>
            </div>

            <button
              type="button"
              onClick={handleGoogleSuccess}
              className="w-full py-3 px-4 rounded-xl bg-neutral-950 border border-neutral-800 hover:bg-neutral-900 text-neutral-200 text-xs font-semibold flex items-center justify-center gap-2.5 transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>

          </form>

          {/* Quick Role Fill Controls - below the form in same card or slightly outside */}
          <div className="mt-8 pt-6 border-t border-neutral-800">
            <h4 className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-3 text-center">
              Quick System Roles (Autofill & Select)
            </h4>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleRoleQuickSelect("citizen")}
                className={`py-2 px-1 rounded-lg border text-[11px] font-semibold flex flex-col items-center gap-1 transition-all cursor-pointer ${activeTab === "citizen" ? "bg-sky-505/10 border-sky-500 text-sky-400" : "bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white"}`}
              >
                <Users className="w-3.5 h-3.5" />
                Citizen Login
              </button>
              
              <button
                type="button"
                onClick={() => handleRoleQuickSelect("worker")}
                className={`py-2 px-1 rounded-lg border text-[11px] font-semibold flex flex-col items-center gap-1 transition-all cursor-pointer ${activeTab === "worker" ? "bg-amber-505/10 border-amber-500 text-amber-400" : "bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white"}`}
              >
                <Hammer className="w-3.5 h-3.5" />
                Worker Login
              </button>
              
              <button
                type="button"
                onClick={() => handleRoleQuickSelect("admin")}
                className={`py-2 px-1 rounded-lg border text-[11px] font-semibold flex flex-col items-center gap-1 transition-all cursor-pointer ${activeTab === "admin" ? "bg-purple-505/10 border-purple-500 text-purple-400" : "bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white"}`}
              >
                <Shield className="w-3.5 h-3.5" />
                Admin Login
              </button>
            </div>
          </div>

        </motion.div>

        {/* Footer info lock */}
        <p className="text-center text-[10px] text-neutral-500 font-mono mt-6">
          🔐 SECURED BY NEURAL MUNICIPAL GRID PLATFORM
        </p>

      </div>
    </div>
  );
}
