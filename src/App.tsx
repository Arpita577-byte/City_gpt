import React, { useState, useEffect } from "react";
import { 
  Building2, MapPin, Brain, History, Bell, Award, 
  Sparkles, MessageSquare, AlertTriangle, Hammer, Shield, 
  Menu, X, CircleDot, Info, Calendar, ChevronRight, Check, Activity 
} from "lucide-react";

import { 
  Complaint, CommunityPost, RewardPointInfo, 
  CityNotification, Role, ChatMessage, ComplaintCategory 
} from "./types";

// Import custom screens
import LandingPage from "./components/LandingPage";
import CitizenDashboard from "./components/CitizenDashboard";
import WorkerDashboard from "./components/WorkerDashboard";
import AdminDashboard from "./components/AdminDashboard";
import ReportIssue from "./components/ReportIssue";
import LiveMap from "./components/LiveMap";
import AIAssistant from "./components/AIAssistant";
import Community from "./components/Community";
import Rewards from "./components/Rewards";
import Sosemergency from "./components/Sosemergency";

export default function App() {
  
  // Actor state tracking: citizen, worker, or administrative official
  const [activeRole, setActiveRole] = useState<Role>("citizen");
  
  // Navigation: landing, dashboard, report_issue, live_map, ai_assistant, my_reports, community, rewards, notifications, city_health
  const [activePage, setActivePage] = useState<string>("landing");
  
  // Database states
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>([]);
  const [rewards, setRewards] = useState<RewardPointInfo | null>(null);
  const [notifications, setNotifications] = useState<CityNotification[]>([]);
  const [predictions, setPredictions] = useState([]);
  
  const [bellOpen, setBellOpen] = useState(false);
  const [sosOpen, setSosOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cityHealthScore, setCityHealthScore] = useState(91);

  // Focus a specific selected complaint on LiveMap
  const [mapSelectedId, setMapSelectedId] = useState<string | null>(null);

  // Fetch initial telemetry databases from Express server-side
  const syncTelemetry = async () => {
    try {
      const [cRes, pRes, rRes, nRes, prRes] = await Promise.all([
        fetch("/api/complaints"),
        fetch("/api/community"),
        fetch("/api/rewards"),
        fetch("/api/notifications"),
        fetch("/api/predictions")
      ]);

      if (cRes.ok) setComplaints(await cRes.json());
      if (pRes.ok) setCommunityPosts(await pRes.json());
      if (rRes.ok) setRewards(await rRes.json());
      if (nRes.ok) setNotifications(await nRes.json());
      if (prRes.ok) setPredictions(await prRes.json());
    } catch (err) {
      console.error("Telemetry fetch synchronization failed, matching local mocks:", err);
    }
  };

  useEffect(() => {
    syncTelemetry();
    // Intermittent poll to keep dashboards fully cohesive
    const timer = setInterval(syncTelemetry, 6000);
    return () => clearInterval(timer);
  }, []);

  // API Call handlers
  const handleReportIssue = async (payload: {
    title: string;
    description: string;
    category: ComplaintCategory;
    locationDescription: string;
    imageBase64: string | null;
    voiceInput?: string;
  }) => {
    try {
      const res = await fetch("/api/complaints/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      await syncTelemetry();
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateTaskStatus = async (
    complaintId: string, 
    status: "reported" | "working" | "resolved", 
    afterImage?: string
  ) => {
    try {
      const res = await fetch("/api/worker/update-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ complaintId, status, afterImageBase64: afterImage })
      });
      if (res.ok) {
        await syncTelemetry();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpvotePost = async (id: string) => {
    try {
      const res = await fetch(`/api/community/${id}/vote`, { method: "POST" });
      if (res.ok) {
        await syncTelemetry();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleComposeSocialPost = async (payload: { title: string; description: string; category: ComplaintCategory }) => {
    try {
      const res = await fetch("/api/community", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        await syncTelemetry();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleTriggerSOS = async (payload: { category: string; lat: number; lng: number }) => {
    try {
      const res = await fetch("/api/sos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      await syncTelemetry();
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  const handleTriggerAICredsScan = () => {
    // Simulated prediction scan adds a temporary predictive insight alert
    setNotifications(prev => [
      {
        id: `NOTIF-${Date.now()}`,
        type: "warning",
        title: "Proactive AI pipeline warning",
        message: "Neural analysis completed. Ward 3 water failure risk recalculated from 80% to 85% based on station water leakage. Pre-emptive node support recommended.",
        time: "Just now",
        read: false
      },
      ...prev
    ]);
    alert("Predictive neural layers scan complete. System compiled 3 pipeline and drainage hazards successfully.");
  };

  const handleSendMessageToAI = async (text: string, history: ChatMessage[]) => {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text, chatHistory: history })
    });
    const data = await res.json();
    return data.response;
  };

  const markAllNotificationsRead = async () => {
    try {
      await fetch("/api/notifications/read", { method: "POST" });
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    } catch (err) {
      console.error(err);
    }
  };

  // Navigations route switcher
  const renderActiveScreen = () => {
    if (activePage === "landing") {
      return (
        <LandingPage 
          onNavigate={(page) => setActivePage(page)} 
          onSetRole={(role) => setActiveRole(role)}
          cityHealth={cityHealthScore}
        />
      );
    }

    if (activeRole === "citizen") {
      switch (activePage) {
        case "dashboard":
          return (
            <CitizenDashboard
              userName="Arpita 👋"
              userEmail="mattaarpita04@gmail.com"
              complaints={complaints}
              rewards={rewards}
              notifications={notifications}
              cityHealthScore={cityHealthScore}
              onNavigate={(page) => setActivePage(page)}
              onSosToggle={() => setSosOpen(true)}
            />
          );
        case "report_issue":
          return <ReportIssue onSubmitReport={handleReportIssue} onNavigate={(page) => setActivePage(page)} />;
        case "live_map":
          return (
            <LiveMap 
              complaints={complaints} 
              selectedComplaintId={mapSelectedId} 
              onCloseMapSelection={() => setMapSelectedId(null)} 
            />
          );
        case "ai_assistant":
          return <AIAssistant onSendMessage={handleSendMessageToAI} />;
        case "community":
          return (
            <Community 
              posts={communityPosts} 
              onUpvotePost={handleUpvotePost} 
              onCreatePost={handleComposeSocialPost} 
            />
          );
        case "rewards":
          return <Rewards rewards={rewards} />;
        
        case "my_reports":
          // Citizen reports history list showing detailed track timelines
          return (
            <div className="max-w-4xl mx-auto px-6 pt-24 pb-16 text-neutral-100">
              <div className="border-b border-neutral-900 pb-4 mb-8">
                <span className="text-xs font-mono uppercase text-indigo-400 bg-indigo-950/40 px-2.5 py-1 rounded border border-indigo-500/10">Personal Filing History</span>
                <h2 className="text-3xl font-bold font-display tracking-tight text-neutral-50 mt-2">My Reports History 📜</h2>
                <p className="text-xs text-neutral-400 font-light mt-1">Track resolution sequences, work divisions, and earn dynamic Green rewards.</p>
              </div>

              {complaints.length === 0 ? (
                <p className="text-center text-neutral-500 py-12">No reports recorded in current cache.</p>
              ) : (
                <div className="flex flex-col gap-6">
                  {complaints.map((c) => (
                    <div key={c.id} className="glass-card rounded-2xl border border-neutral-850 p-6 flex flex-col md:flex-row gap-6 relative overflow-hidden group hover:border-neutral-750 transition-all">
                      <div className="w-full md:w-36 h-36 rounded-xl overflow-hidden bg-neutral-950 border border-neutral-900 flex-shrink-0">
                        <img src={c.imageUrl} alt={c.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-mono uppercase bg-neutral-900 border border-neutral-800 text-indigo-400 px-2 py-0.5 rounded">
                              {c.id}
                            </span>
                            <span className="text-xs text-neutral-500 font-mono capitalize">Category: {c.category}</span>
                            <span className={`text-[10px] uppercase px-2 font-mono rounded font-bold ${c.priority === "high" ? "bg-rose-950 text-rose-400" : "bg-neutral-900 text-neutral-400"}`}>{c.priority}</span>
                          </div>
                          <h4 className="text-base font-bold text-neutral-100">{c.title}</h4>
                          <p className="text-xs text-neutral-400 font-light mt-1">{c.description}</p>
                          <p className="text-[10px] text-neutral-500 font-mono mt-1.5 flex items-center gap-1">
                            <MapPin className="w-3 h-3" /> Location: {c.locationDescription}
                          </p>
                        </div>

                        {/* Tracker sequential timeline */}
                        <div className="mt-4 pt-4 border-t border-neutral-900 grid grid-cols-5 text-center text-[10px] text-neutral-500">
                          <div className="flex flex-col items-center gap-1">
                            <div className="w-4 h-4 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold font-mono text-[9px]">✓</div>
                            <span className="font-semibold text-neutral-300">Reported</span>
                          </div>
                          <div className="flex flex-col items-center gap-1">
                            <div className="w-4 h-4 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold font-mono text-[9px]">✓</div>
                            <span className="font-semibold text-neutral-300">AI Detected</span>
                          </div>
                          <div className="flex flex-col items-center gap-1">
                            <div className={`w-4 h-4 rounded-full flex items-center justify-center text-white font-bold font-mono text-[9px] ${c.status !== "reported" && c.status !== "ai_detected" ? "bg-indigo-600" : "bg-neutral-800"}`}>
                              {c.status !== "reported" && c.status !== "ai_detected" ? "✓" : "3"}
                            </div>
                            <span className={c.status !== "reported" && c.status !== "ai_detected" ? "font-semibold text-neutral-300" : ""}>Assigned</span>
                          </div>
                          <div className="flex flex-col items-center gap-1">
                            <div className={`w-4 h-4 rounded-full flex items-center justify-center text-white font-bold font-mono text-[9px] ${c.status === "working" || c.status === "resolved" ? "bg-indigo-600" : "bg-neutral-800"}`}>
                              {c.status === "working" || c.status === "resolved" ? "✓" : "4"}
                            </div>
                            <span className={c.status === "working" || c.status === "resolved" ? "font-semibold text-neutral-300" : ""}>Working</span>
                          </div>
                          <div className="flex flex-col items-center gap-1">
                            <div className={`w-4 h-4 rounded-full flex items-center justify-center text-white font-bold font-mono text-[9px] ${c.status === "resolved" ? "bg-emerald-500" : "bg-neutral-800"}`}>
                              {c.status === "resolved" ? "✓" : "5"}
                            </div>
                            <span className={c.status === "resolved" ? "font-semibold text-emerald-400 font-bold" : ""}>Resolved</span>
                          </div>
                        </div>

                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );

        case "city_health":
          // Deep performance statistics page
          return (
            <div className="max-w-4xl mx-auto px-6 pt-24 pb-16 text-neutral-100">
              <div className="border-b border-neutral-900 pb-4 mb-8">
                <span className="text-xs font-mono uppercase text-indigo-400 bg-indigo-950/40 px-2.5 py-1 rounded border border-indigo-500/10">Grid diagnostics</span>
                <h2 className="text-3xl font-bold font-display tracking-tight text-neutral-50 mt-2">Grid Status Metrics 📊</h2>
                <p className="text-xs text-neutral-400 font-light mt-1 font-mono">Telemetry performance metrics gathered via automated city sensors.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 text-xs font-light">
                <div className="glass-panel p-6 border border-neutral-800 rounded-2xl flex flex-col gap-2">
                  <h4 className="font-bold text-neutral-200 uppercase font-mono text-[10px] text-amber-400">Waste Management: 84%</h4>
                  <p className="text-neutral-400 leading-relaxed">Solid waste removal, commercial dumpster emptying intervals, litter sweeps. High density clusters present Ward 3 School strip.</p>
                  <div className="w-full bg-neutral-950 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div className="bg-amber-400 h-full rounded-full" style={{ width: "84%" }} />
                  </div>
                </div>

                <div className="glass-panel p-6 border border-neutral-800 rounded-2xl flex flex-col gap-2">
                  <h4 className="font-bold text-neutral-200 uppercase font-mono text-[10px] text-sky-400">Hydraulic Pipe Grid: 96%</h4>
                  <p className="text-neutral-400 leading-relaxed">Municipal pressure networks, main canal filtration, flooded lane drainage channels. Section 4 flyover water leak repair under restoration.</p>
                  <div className="w-full bg-neutral-950 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div className="bg-sky-400 h-full rounded-full" style={{ width: "96%" }} />
                  </div>
                </div>

                <div className="glass-panel p-6 border border-neutral-800 rounded-2xl flex flex-col gap-2">
                  <h4 className="font-bold text-neutral-200 uppercase font-mono text-[10px] text-emerald-400">Pavement Highways: 91%</h4>
                  <p className="text-neutral-400 leading-relaxed">Structural asphalt potholes repaired, line markings, flyover descents. Western express way maintenance scheduled.</p>
                  <div className="w-full bg-neutral-950 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div className="bg-emerald-400 h-full rounded-full" style={{ width: "91%" }} />
                  </div>
                </div>

                <div className="glass-panel p-6 border border-neutral-800 rounded-2xl flex flex-col gap-2">
                  <h4 className="font-bold text-neutral-200 uppercase font-mono text-[10px] text-purple-400">Electrical Lighting: 88%</h4>
                  <p className="text-neutral-400 leading-relaxed">Avenue streetlight nodes operating, transformer burnout parameters, dark lanes resolved. Primary circuit Ward 1 resolved.</p>
                  <div className="w-full bg-neutral-950 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div className="bg-purple-400 h-full rounded-full" style={{ width: "88%" }} />
                  </div>
                </div>
              </div>

              <div className="glass-panel p-6 rounded-3xl border border-indigo-500/10 glow-indigo text-center flex flex-col gap-3">
                <span className="text-xs uppercase font-mono text-indigo-400">Composite Index Performance</span>
                <p className="text-5xl font-black font-display text-emerald-400">91/100</p>
                <p className="text-neutral-400 leading-relaxed max-w-md mx-auto text-xs mt-1">Excellent Performance Grade. The metro grid operates 13% more efficiently than comparable regional capitals with standard manual complaint pipelines.</p>
              </div>

            </div>
          );

        default:
          return <p className="pt-24 text-center">Screen matching Citizen role failed.</p>;
      }
    }

    if (activeRole === "worker") {
      return (
        <WorkerDashboard 
          complaints={complaints} 
          onUpdateStatus={handleUpdateTaskStatus}
          onNavigateMap={(c) => {
            setMapSelectedId(c.id);
            setActivePage("live_map");
          }} 
        />
      );
    }

    if (activeRole === "admin") {
      return (
        <AdminDashboard 
          complaints={complaints} 
          predictions={predictions} 
          onTriggerPrediction={handleTriggerAICredsScan} 
        />
      );
    }

    return <p className="pt-24 text-center">Unimplemented role match detected.</p>;
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col">
      
      {/* PERSISTENT LUXURY NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-900/80 px-6 py-4.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo */}
          <div 
            onClick={() => { setActivePage("landing"); setMobileMenuOpen(false); }}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <span className="text-lg font-bold font-display tracking-tight text-neutral-50 flex items-center gap-1.5 uppercase">
              🌆 CityGPT
            </span>
          </div>

          {/* Desktop Nav Selection Links */}
          <div className="hidden lg:flex items-center gap-6">
            <button onClick={() => setActivePage("landing")} className={`text-xs font-semibold cursor-pointer transition-colors ${activePage === "landing" ? "text-indigo-400" : "text-neutral-400 hover:text-white"}`}>Home</button>
            <button onClick={() => { setActiveRole("citizen"); setActivePage("dashboard"); }} className={`text-xs font-semibold cursor-pointer transition-colors ${activePage === "dashboard" ? "text-indigo-400" : "text-neutral-400 hover:text-white"}`}>Citizen Hub</button>
            <button onClick={() => { setActiveRole("citizen"); setActivePage("live_map"); }} className={`text-xs font-semibold cursor-pointer transition-colors ${activePage === "live_map" ? "text-indigo-400" : "text-neutral-400 hover:text-white"}`}>Live Map</button>
            <button onClick={() => { setActiveRole("citizen"); setActivePage("city_health"); }} className={`text-xs font-semibold cursor-pointer transition-colors ${activePage === "city_health" ? "text-indigo-400" : "text-neutral-400 hover:text-white"}`}>Outages & Health</button>
            <button onClick={() => { setActiveRole("citizen"); setActivePage("ai_assistant"); }} className={`text-xs font-semibold cursor-pointer transition-colors ${activePage === "ai_assistant" ? "text-indigo-400" : "text-neutral-400 hover:text-white"}`}>AI Assistant</button>
            <button onClick={() => { setActiveRole("citizen"); setActivePage("community"); }} className={`text-xs font-semibold cursor-pointer transition-colors ${activePage === "community" ? "text-indigo-400" : "text-neutral-400 hover:text-white"}`}>Consensus forum</button>
          </div>

          {/* DYNAMIC ROLE SELECTOR (SPECTACULAR SEAMLESS TESTING PROTOCOL!) */}
          <div className="hidden sm:flex items-center gap-3">
            
            {/* Nav role select dropdown selector */}
            <div className="flex items-center bg-neutral-900 border border-neutral-850 rounded-xl p-1 text-[11px] font-semibold gap-1">
              <button 
                id="role-btn-citizen"
                onClick={() => { setActiveRole("citizen"); if (activePage === "landing") setActivePage("dashboard"); }}
                className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${activeRole === "citizen" ? "bg-indigo-600 border-indigo-500/30 text-white font-bold" : "border-transparent text-neutral-400 hover:text-white"}`}
              >
                Citizen
              </button>
              <button 
                id="role-btn-worker"
                onClick={() => { setActiveRole("worker"); }}
                className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${activeRole === "worker" ? "bg-amber-600 border-amber-500/30 text-white font-bold flex items-center gap-1" : "border-transparent text-neutral-400 hover:text-white"}`}
              >
                <Hammer className="w-3.5 h-3.5" /> Worker
              </button>
              <button 
                id="role-btn-admin"
                onClick={() => { setActiveRole("admin"); }}
                className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${activeRole === "admin" ? "bg-purple-600 border-purple-500/30 text-white font-bold" : "border-transparent text-neutral-400 hover:text-white"}`}
              >
                Official
              </button>
            </div>

            {/* Notification Alert Bell Badge */}
            <div className="relative">
              <button 
                id="nav-bell-btn"
                onClick={() => { setBellOpen(!bellOpen); if (!bellOpen) markAllNotificationsRead(); }}
                className="p-3 bg-neutral-900 border border-neutral-850 hover:bg-neutral-800 text-neutral-400 hover:text-white rounded-xl transition-all cursor-pointer relative"
              >
                <Bell className="w-4 h-4" />
                {notifications.filter(n => !n.read).length > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
                )}
              </button>

              {/* Notification drop collapse */}
              {bellOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-neutral-900 border border-neutral-800 rounded-2xl p-4 shadow-2xl z-50 flex flex-col gap-3">
                  <div className="flex items-center justify-between border-b border-neutral-800 pb-2 mb-1">
                    <span className="text-[10px] font-mono text-neutral-400 font-bold uppercase">Incident Broadcast Stream</span>
                    <button onClick={() => setBellOpen(false)} className="text-[9px] text-neutral-500 hover:text-neutral-200">Close</button>
                  </div>
                  {notifications.length === 0 ? (
                    <p className="text-[10px] text-neutral-500">No telemetry warnings.</p>
                  ) : (
                    <div className="flex flex-col gap-3 max-h-60 overflow-y-auto pr-1">
                      {notifications.map((n) => (
                        <div key={n.id} className="p-2 bg-neutral-950 rounded-lg text-[11px] leading-snug border border-neutral-900 flex flex-col gap-1">
                          <div className="flex items-center gap-1.5">
                            <span className={`w-1.5 h-1.5 rounded-full ${n.type === "success" ? "bg-emerald-400" : n.type === "emergency" ? "bg-rose-500 animate-pulse" : "bg-indigo-400"}`} />
                            <strong className="text-neutral-200">{n.title}</strong>
                          </div>
                          <p className="text-neutral-400 font-light">{n.message}</p>
                          <span className="text-[9px] text-neutral-500 font-mono mt-0.5">{n.time}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Profile Avatar identifier */}
            <div className="w-10 h-10 bg-indigo-950 text-indigo-400 font-black flex items-center justify-center rounded-xl border border-indigo-500/25 cursor-pointer hover:border-indigo-400 transition-colors" onClick={() => setActivePage("rewards")}>
              AM
            </div>

          </div>

          {/* Mobile Menu Action trigger */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-neutral-400 hover:text-white cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>
      </nav>

      {/* MOBILE COLLAPSIBILITY NAVIGATION MENU OVERLAY */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[60px] z-30 bg-neutral-950/95 backdrop-blur-md flex flex-col p-6 gap-6 lg:hidden border-b border-neutral-900 text-neutral-400 font-light overflow-y-auto">
          
          {/* Main Links */}
          <div className="flex flex-col gap-4 text-sm font-semibold uppercase tracking-wider">
            <button onClick={() => { setActivePage("landing"); setMobileMenuOpen(false); }} className="text-left w-full hover:text-white">Home Landing</button>
            <button onClick={() => { setActiveRole("citizen"); setActivePage("dashboard"); setMobileMenuOpen(false); }} className="text-left w-full hover:text-white">Citizen Dashboard</button>
            <button onClick={() => { setActiveRole("citizen"); setActivePage("live_map"); setMobileMenuOpen(false); }} className="text-left w-full hover:text-white">See Live Map</button>
            <button onClick={() => { setActiveRole("citizen"); setActivePage("ai_assistant"); setMobileMenuOpen(false); }} className="text-left w-full hover:text-white">CityGPT AI Assistant</button>
            <button onClick={() => { setActiveRole("citizen"); setActivePage("community"); setMobileMenuOpen(false); }} className="text-left w-full hover:text-white">Social Consensus Forum</button>
            <button onClick={() => { setActiveRole("citizen"); setActivePage("rewards"); setMobileMenuOpen(false); }} className="text-left w-full hover:text-white">Citizen subsidy Rewards</button>
          </div>

          {/* Quick Role Selectors */}
          <div className="pt-6 border-t border-neutral-900">
            <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-3">Testing Role simulation</p>
            <div className="grid grid-cols-3 gap-2">
              <button onClick={() => { setActiveRole("citizen"); setActivePage("dashboard"); setMobileMenuOpen(false); }} className={`py-2 rounded-xl text-xs font-semibold ${activeRole === "citizen" ? "bg-indigo-600 text-white" : "bg-neutral-900"}`}>Citizen</button>
              <button onClick={() => { setActiveRole("worker"); setMobileMenuOpen(false); }} className={`py-2 rounded-xl text-xs font-semibold ${activeRole === "worker" ? "bg-amber-600 text-white" : "bg-neutral-900"}`}>Worker</button>
              <button onClick={() => { setActiveRole("admin"); setMobileMenuOpen(false); }} className={`py-2 rounded-xl text-xs font-semibold ${activeRole === "admin" ? "bg-purple-600 text-white" : "bg-neutral-900"}`}>admin</button>
            </div>
          </div>
        </div>
      )}

      {/* RENDER DYNAMIC SCREEN MODULE STAGE */}
      <main className="flex-grow min-h-screen">
        {renderActiveScreen()}
      </main>

      {/* EMERGENCY SOS RADAR MODAL PANEL */}
      {sosOpen && (
        <Sosemergency 
          onTriggerSos={handleTriggerSOS} 
          onClose={() => setSosOpen(false)} 
        />
      )}

      {/* PERSISTENT STRUCTURAL FOOTER */}
      <footer className="bg-neutral-950 border-t border-neutral-900/60 py-8 relative z-10 text-neutral-600 font-light">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px]">
          <div>
            <span className="font-semibold block text-neutral-400">© 2026 CityGPT Municipal Network Control</span>
            <span>Real-time Smart City Framework. All node components compiled successfully.</span>
          </div>
          <div className="flex gap-4.5 text-neutral-500">
            <span className="cursor-pointer hover:text-neutral-300">Subsidy Subscriptions</span>
            <span className="cursor-pointer hover:text-neutral-300">Telemetry safety rules</span>
            <span className="cursor-pointer hover:text-neutral-300">Smart API Licences</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
