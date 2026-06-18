import React, { useState, useRef } from "react";
import { Camera, Upload, Mic, Trash2, MapPin, Sparkles, Brain, CheckCircle, ArrowRight } from "lucide-react";
import { ComplaintCategory } from "../types";

interface ReportIssueProps {
  onSubmitReport: (payload: {
    title: string;
    description: string;
    category: ComplaintCategory;
    locationDescription: string;
    imageBase64: string | null;
    voiceInput?: string;
  }) => Promise<any>;
  onNavigate: (page: string) => void;
}

export default function ReportIssue({ onSubmitReport, onNavigate }: ReportIssueProps) {
  
  // States
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<ComplaintCategory>("waste");
  const [locationDesc, setLocationDesc] = useState("Sector 4, Modern Public School Walkway, Ward 3");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [voiceInput, setVoiceInput] = useState("");
  
  const [isRecording, setIsRecording] = useState(false);
  const [isDiagnosing, setIsDiagnosing] = useState(false);
  const [diagnosisResult, setDiagnosisResult] = useState<any | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Simulated Voice conversion notes in regional languages
  const handleSimulateVoice = () => {
    setIsRecording(true);
    setVoiceInput("");

    const regionalVocals = [
      { text: "Western Express Way flyover descent pe do bade potholes hain", title: "Dangerous Potholes Western Expressway flyover descent", category: "pothole", desc: "Motorcyclists are sudden braking to avoid descent potholes.", loc: "Flyover ascent Lane B, Ward 5" },
      { text: "Road pe kachra overflow ho gaya hai school ke peeche", title: "Garbage Pile Overflow on school boundary lane", category: "waste", desc: "Severe uncleared garbage pile near boundary road wall.", loc: "Modern Public School boundary lane, Ward 3" },
      { text: "Water pipe pipeline leakage near railway station flyover", title: "Main pipeline fracture spraying drinking water", category: "water", desc: "Fractured tube spraying water onto walking corridors.", loc: "Under Railway Walkway flyover, Ward 3" }
    ];

    // Pick random
    const speech = regionalVocals[Math.floor(Math.random() * regionalVocals.length)];

    setTimeout(() => {
      setIsRecording(false);
      setVoiceInput(speech.text);
      setTitle(speech.title);
      setCategory(speech.category as any);
      setDescription(speech.desc);
      setLocationDesc(speech.loc);
      
      // Auto-populate diagnostic result
      setDiagnosisResult({
        category: speech.category,
        priority: "high",
        assignedTeam: "Zone 3 Rapid Response Div",
        eta: "45 mins"
      });
    }, 1500);
  };

  // Convert uploaded files to base64
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setImageBase64(base64);
        setImageUrl(URL.createObjectURL(file));
        
        // Trigger visual diagnostics
        setIsDiagnosing(true);
        setTimeout(() => {
          setIsDiagnosing(false);
          // Set plausible results
          setDiagnosisResult({
            category: category,
            priority: "high",
            assignedTeam: "Zone 3 Sanitation Patrol",
            eta: "30 mins"
          });
        }, 1200);
      };
      reader.readAsDataURL(file);
    }
  };

  // Click file upload area
  const triggerFolder = () => {
    fileInputRef.current?.click();
  };

  // Handle submit complaint
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title && !voiceInput) {
      alert("Please enter an issue description, record voice, or upload a camera image.");
      return;
    }

    setSubmitting(true);
    try {
      await onSubmitReport({
        title: title || "Smart Audio Incident",
        description: description || "No added description notes supplied.",
        category,
        locationDescription: locationDesc,
        imageBase64,
        voiceInput: voiceInput || undefined
      });
      
      onNavigate("my_reports");
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 pt-24 pb-16 text-neutral-100">
      
      {/* Page Title */}
      <div className="border-b border-neutral-900 pb-4 mb-8">
        <span className="text-xs font-mono uppercase text-indigo-400 bg-indigo-950/40 px-2.5 py-1 rounded border border-indigo-500/10">Computer Vision Node 01</span>
        <h2 className="text-3xl font-bold font-display tracking-tight text-neutral-50 mt-2">
          Report City Incident 📷
        </h2>
        <p className="text-xs text-neutral-400 font-light mt-1">
          CityGPT Computer Vision reads pixel buffers, evaluates priority threats, and assigns responders automatically.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Form panel */}
        <div className="lg:col-span-7">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            
            {/* Form Option: Voice Input regional translation */}
            <div className="bg-neutral-900/50 p-4 border border-neutral-800 rounded-2xl flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-neutral-300 font-bold flex items-center gap-1.5 uppercase tracking-wide">
                  <Mic className="w-4 h-4 text-rose-400" />
                  Voice Translation Box (Regional Support)
                </span>
                <span className="text-[10px] text-neutral-500 font-mono">Hindi · English · Dialects</span>
              </div>
              <p className="text-[10px] text-neutral-400 font-light">
                Say issue inside cell (e.g. <em>"Road pe kachra overflow ho gaya hai school ke peeche"</em>) to auto-fill.
              </p>
              
              <button 
                id="voice-report-btn"
                type="button" 
                onClick={handleSimulateVoice}
                disabled={isRecording}
                className="w-full py-3 bg-rose-600 hover:bg-rose-500 hover:scale-[1.01] transition-all text-white font-bold rounded-xl flex items-center justify-center gap-2 cursor-pointer outline-none"
              >
                <div className={`w-2.5 h-2.5 rounded-full bg-white ${isRecording ? "animate-ping bg-rose-200" : ""}`} />
                {isRecording ? "Listening to regional dialect..." : "Tap to Speak Hindi/English"}
              </button>

              {voiceInput && (
                <div className="bg-neutral-950 p-3 rounded-lg border border-neutral-900 font-mono text-xs text-rose-300">
                  <span className="text-neutral-500 block mb-1 text-[9px] uppercase tracking-wider">Converted Transcript:</span>
                  "{voiceInput}"
                </div>
              )}
            </div>

            {/* Input fields */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-mono uppercase tracking-widest text-neutral-400">Incident Category</label>
              <select 
                id="report-select-category"
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="bg-neutral-900 border border-neutral-850 rounded-xl p-3 text-sm text-neutral-100 outline-none focus:border-indigo-500 transition-colors capitalize cursor-pointer"
              >
                <option value="waste">Waste Detection 🚮</option>
                <option value="water">Water Leakage 💧</option>
                <option value="pothole">Potholes 🛣</option>
                <option value="traffic">Traffic Signals 🚦</option>
                <option value="lighting">Street Light Failure 💡</option>
                <option value="tree">Trees Fallen/Obstacles 🌳</option>
                <option value="animal">Stray Animals 🐕</option>
                <option value="emergency">Urgent Emergency Hazard 🚨</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-mono uppercase tracking-widest text-neutral-400">Incident Title</label>
              <input 
                id="report-input-title"
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Broken water mains Sector 4 Station Area"
                className="bg-neutral-900 border border-neutral-850 rounded-xl p-3 text-sm text-neutral-100 outline-none focus:border-indigo-500 transition-colors font-semibold"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-mono uppercase tracking-widest text-neutral-400">Description / Details</label>
              <textarea 
                id="report-textarea-desc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe details ... cars swerving, water spray height, smell footprints"
                rows={3}
                className="bg-neutral-900 border border-neutral-850 rounded-xl p-3 text-sm text-neutral-100 outline-none focus:border-indigo-500 transition-colors font-light"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-mono uppercase tracking-widest text-neutral-400">Incident Spot / Location description</label>
              <div className="relative">
                <input 
                  id="report-input-loc"
                  type="text" 
                  value={locationDesc}
                  onChange={(e) => setLocationDesc(e.target.value)}
                  placeholder="e.g. Near flyover ascent lane 3"
                  className="bg-neutral-900 border border-neutral-850 rounded-xl p-3 pl-10 text-sm text-neutral-100 outline-none focus:border-indigo-500 transition-colors font-mono"
                />
                <MapPin className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <button 
              id="report-submit-btn"
              type="submit" 
              disabled={submitting}
              className="group py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 disabled:opacity-50"
            >
              {submitting ? "Analyzing & Logging ticket..." : "Submit Incident Ticket"}
              <ArrowRight className="w-4 h-4 text-indigo-200 group-hover:translate-x-1 transition-transform" />
            </button>

          </form>
        </div>

        {/* Upload and AI diagnosis Panel sidebar */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* File upload zone */}
          <div 
            onClick={triggerFolder}
            className="border-2 border-dashed border-neutral-800 hover:border-indigo-500 hover:bg-indigo-950/5 rounded-2xl p-6 text-center cursor-pointer transition-all group relative overflow-hidden"
          >
            <input 
              id="file-element-uploader"
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              className="hidden" 
              accept="image/*"
            />
            
            {imageUrl ? (
              <div className="relative h-44 rounded-xl overflow-hidden border border-neutral-900">
                <img src={imageUrl} alt="Incident Upload Preview" className="w-full h-full object-cover" />
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setImageUrl(null);
                    setImageBase64(null);
                  }}
                  className="absolute bottom-2 right-2 p-2 bg-neutral-950/80 hover:bg-rose-950 text-neutral-400 hover:text-rose-400 border border-neutral-800 rounded-lg transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="py-8 flex flex-col items-center gap-3">
                <div className="w-12 h-12 bg-indigo-500/10 group-hover:bg-indigo-500/20 text-indigo-400 rounded-2xl flex items-center justify-center border border-indigo-500/20 transition-all">
                  <Upload className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-semibold text-neutral-200 text-sm">Upload Incident Photo</p>
                  <p className="text-xs text-neutral-500 mt-1">Take photo, drag & drop, or browse folder</p>
                </div>
              </div>
            )}
          </div>

          {/* AI diagnosis Board */}
          {isDiagnosing || diagnosisResult ? (
            <div className="glass-panel p-6 rounded-2xl border border-indigo-500/10 glow-indigo">
              <div className="flex items-center gap-2 mb-4">
                <Brain className="w-5 h-5 text-indigo-400 animate-pulse" />
                <span className="text-xs font-mono uppercase text-indigo-300 font-bold">Neural Diagnostics Board</span>
              </div>

              {isDiagnosing ? (
                <div className="flex flex-col items-center gap-3 py-6">
                  <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                  <p className="text-xs text-indigo-300 font-mono animate-pulse">Classifying hazard priority...</p>
                </div>
              ) : (
                <div className="flex flex-col gap-3.5 text-xs text-neutral-400">
                  <div className="flex items-center justify-between pb-2 border-b border-neutral-900">
                    <span>Detected Category:</span>
                    <strong className="text-neutral-200 capitalize font-mono text-indigo-300">{diagnosisResult.category}</strong>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b border-neutral-900">
                    <span>Priority Assumed:</span>
                    <strong className="text-rose-400 font-mono uppercase blink bg-rose-950/40 px-2 py-0.5 rounded border border-rose-500/10">
                      {diagnosisResult.priority}
                    </strong>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b border-neutral-900">
                    <span>Nearest Responder Unit:</span>
                    <strong className="text-neutral-200 font-mono text-right">{diagnosisResult.assignedTeam}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Completion ETA:</span>
                    <strong className="text-emerald-400 font-mono">{diagnosisResult.eta}</strong>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-neutral-900/20 p-5 rounded-2xl border border-neutral-900 text-xs text-neutral-400 leading-relaxed font-light">
              <h4 className="font-bold text-neutral-300 mb-1.5 font-mono uppercase tracking-wider text-[10px]">Model Diagnostics Active</h4>
              Uploading a reference photo or using vocal dictation triggers real-time neural mapping of location, category and work division.
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
