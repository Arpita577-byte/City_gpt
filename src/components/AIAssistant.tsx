import React, { useState, useRef, useEffect } from "react";
import { Brain, Send, Mic, Sparkles, User, AlertCircle, RefreshCw } from "lucide-react";
import { ChatMessage } from "../types";

interface AIAssistantProps {
  onSendMessage: (text: string, history: ChatMessage[]) => Promise<string>;
}

const TEMPLATE_PROMPT_SUGGESTIONS = [
  { text: "Road pe paani bhar gya railway station pe!", title: "Water leakage status 💧" },
  { text: "How many complaints are active nearby?", title: "Active complain statistics 📊" },
  { text: "Where is the nearest medical hospital?", title: "First responder hospitals 🏥" },
  { text: "Who is working on pothole Western Expressway COMP-103?", title: "Explore crew updates 🛠" }
];

export default function AIAssistant({ onSendMessage }: AIAssistantProps) {
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "init-msg",
      sender: "ai",
      text: "Namaste citizen! I am **CityGPT**, your smart municipal brain. I track sensor feeds, dispatch pipelines, and worker teams in real-time.\n\nHow can I assist your sector today? Ask me in **English, Hindi, or Hinglish** (e.g., *'Road pe paani bhar gaya'*).",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll messages stream
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSendText = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText("");
    setLoading(true);

    try {
      const responseText = await onSendMessage(textToSend, messages);
      
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, {
        id: `err-${Date.now()}`,
        sender: "ai",
        text: "Apologies, the CityGPT neural node is currently matching sensor configurations. Re-attempting connection, or check your local telemetry rules.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 pt-24 pb-16 text-neutral-100 flex flex-col h-[calc(100vh-80px)] min-h-[600px]">
      
      {/* Telemetry Indicator Title */}
      <div className="flex items-center justify-between border-b border-neutral-900 pb-4 mb-4 flex-shrink-0">
        <div className="flex items-center gap-2">
          <Brain className="w-6 h-6 text-indigo-400 animate-pulse" />
          <div>
            <h2 className="text-xl font-bold font-display tracking-tight text-neutral-50">CityGPT Intelligence AI</h2>
            <p className="text-[10px] text-neutral-500 font-mono">MODEL: GEMINI-3.5-FLASH · METROPOLITAN ACTIVE BRAIN</p>
          </div>
        </div>
        <span className="text-[10px] text-indigo-400 bg-indigo-950/40 px-2.5 py-1 border border-indigo-500/10 rounded font-mono">
          Language Bridge Node: Active
        </span>
      </div>

      {/* Messages Scroll stage */}
      <div className="flex-1 bg-neutral-950 border border-neutral-900 rounded-3xl p-6 overflow-y-auto mb-4 flex flex-col gap-4">
        {messages.map((m) => (
          <div 
            key={m.id} 
            className={`flex gap-3 max-w-[85%] ${m.sender === "user" ? "self-end flex-row-reverse" : "self-start"}`}
          >
            {/* Avatar block */}
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 border ${m.sender === "user" ? "bg-indigo-950 border-indigo-500/25 text-indigo-400" : "bg-neutral-900 border-neutral-800 text-neutral-300"}`}>
              {m.sender === "user" ? <User className="w-4 h-4" /> : <Brain className="w-4 h-4 text-indigo-400" />}
            </div>

            {/* Bubble layout */}
            <div className={`flex flex-col gap-1.5 ${m.sender === "user" ? "items-end" : "items-start"}`}>
              <div 
                className={`p-4 rounded-3xl text-sm leading-relaxed ${m.sender === "user" ? "bg-indigo-600 text-white rounded-tr-none" : "bg-neutral-900/50 text-neutral-200 border border-neutral-850 rounded-tl-none markdown-body font-light text-wrap break-words whitespace-pre-wrap"}`}
              >
                {m.text}
              </div>
              <span className="text-[9px] font-mono text-neutral-500 px-1">{m.timestamp}</span>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex gap-3 self-start max-w-[80%] items-center animate-pulse">
            <div className="w-8 h-8 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400">
              <Brain className="w-4 h-4 animate-spin text-indigo-500" />
            </div>
            <div className="p-4 bg-neutral-900/40 border border-neutral-850 rounded-3xl rounded-tl-none text-xs font-mono text-indigo-400 flex items-center gap-2">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              CityGPT thinking and matching telemetry buffers...
            </div>
          </div>
        )}

        <div ref={scrollRef} />
      </div>

      {/* Suggestion prompt list */}
      <div className="mb-4 flex-shrink-0">
        <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 block mb-2 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-500" /> Dialect Suggestion Prompts (Tap to test):
        </span>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {TEMPLATE_PROMPT_SUGGESTIONS.map((s, idx) => (
            <button
              key={idx}
              onClick={() => handleSendText(s.text)}
              className="bg-neutral-900/40 hover:bg-neutral-900 border border-neutral-850 hover:border-neutral-700 text-left p-3 rounded-xl text-xs flex flex-col gap-1 transition-all pointer-events-auto cursor-pointer"
            >
              <strong className="text-indigo-400 font-semibold">{s.title}</strong>
              <span className="text-neutral-500 text-[10px] truncate w-full">"{s.text}"</span>
            </button>
          ))}
        </div>
      </div>

      {/* Input controls block */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <div className="relative flex-1">
          <input 
            id="assistant-textbox-input"
            type="text" 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSendText(inputText);
            }}
            placeholder="Ask about active telemetry or type regional complaints..."
            className="w-full bg-neutral-950 border border-neutral-850 rounded-2xl py-4.5 pl-4 pr-12 text-sm text-neutral-200 outline-none focus:border-indigo-500 transition-colors"
          />
          <button 
            id="assistant-textbox-submit"
            onClick={() => handleSendText(inputText)}
            className="absolute right-3 top-3 p-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-all cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
}
