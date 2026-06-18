import React, { useState } from "react";
import { MessageSquare, ArrowUp, Megaphone, Share2, Sparkles, Feather, AlertTriangle } from "lucide-react";
import { CommunityPost, ComplaintCategory } from "../types";

interface CommunityProps {
  posts: CommunityPost[];
  onUpvotePost: (id: string) => Promise<void>;
  onCreatePost: (payload: { title: string; description: string; category: ComplaintCategory }) => Promise<void>;
}

export default function Community({ posts, onUpvotePost, onCreatePost }: CommunityProps) {
  
  const [showCompose, setShowCompose] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newCategory, setNewCategory] = useState<ComplaintCategory>("water");
  const [submitting, setSubmitting] = useState(false);

  // Submit compose item
  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDesc.trim()) {
      alert("Please fill post headers.");
      return;
    }

    setSubmitting(true);
    try {
      await onCreatePost({
        title: newTitle,
        description: newDesc,
        category: newCategory
      });
      setNewTitle("");
      setNewDesc("");
      setShowCompose(false);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 pt-24 pb-16 text-neutral-100">
      
      {/* Upper header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-900 pb-6 mb-8 gap-4">
        <div>
          <span className="text-xs font-mono uppercase bg-indigo-950/40 text-indigo-400 border border-indigo-500/10 px-2.5 py-1 rounded">Community Consensus</span>
          <h2 className="text-3xl font-bold font-display tracking-tight text-neutral-50 mt-2">
            Metropolis Consensus Feed 📣
          </h2>
          <p className="text-xs text-neutral-400 font-light mt-1">
            Upvoting public hazards raises priority automatically on the central AI planning grid.
          </p>
        </div>

        <button 
          id="community-btn-compose"
          onClick={() => setShowCompose(!showCompose)}
          className="flex items-center justify-center gap-2 px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold cursor-pointer transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg shadow-indigo-600/10"
        >
          <Feather className="w-4 h-4" />
          Broadcast Hazard Post
        </button>
      </div>

      {/* Compose Collapse */}
      {showCompose && (
        <form onSubmit={handleCreatePost} className="bg-neutral-900/50 p-6 rounded-2xl border border-neutral-800 mb-8 flex flex-col gap-4 animate-fade-in">
          <h3 className="text-sm font-bold text-neutral-200">Compose local broadcast alert</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-mono text-neutral-500 uppercase">Alert Category</label>
              <select 
                value={newCategory} 
                onChange={(e) => setNewCategory(e.target.value as any)}
                className="bg-neutral-950 border border-neutral-800 p-2.5 rounded-lg text-xs outline-none"
              >
                <option value="water">Pipeline Outages 💧</option>
                <option value="pothole">Broken Pavement 🛣</option>
                <option value="waste">Trash Overflow 🚮</option>
                <option value="traffic">Traffic signals 🚦</option>
              </select>
            </div>
            
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-mono text-neutral-500 uppercase">Alert Title</label>
              <input 
                type="text" 
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Alert header descriptor"
                className="bg-neutral-950 border border-neutral-800 p-2.5 rounded-lg text-xs outline-none focus:border-indigo-500" 
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-mono text-neutral-500 uppercase">Warning details / location coordinates</label>
            <textarea 
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              placeholder="What did you observe? Let neighbors support and vote this up."
              rows={3}
              className="bg-neutral-950 border border-neutral-800 p-2.5 rounded-lg text-xs outline-none focus:border-indigo-500" 
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button 
              type="button" 
              onClick={() => setShowCompose(false)}
              className="px-4 py-2 bg-neutral-950 hover:bg-neutral-900 rounded-lg text-xs text-neutral-400 border border-neutral-800 cursor-pointer"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={submitting}
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold cursor-pointer disabled:opacity-50"
            >
              Broadcast Alert
            </button>
          </div>
        </form>
      )}

      {/* Social Feed List */}
      <div className="flex flex-col gap-6">
        {posts.map((post) => (
          <div key={post.id} className="glass-card rounded-2xl border border-neutral-850 p-6 flex flex-col gap-4 hover:border-neutral-750 transition-all group">
            
            {/* User Profile header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 bg-neutral-800 rounded-full flex items-center justify-center font-bold text-neutral-300 border border-neutral-700">
                  {post.author[0]}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold text-neutral-200">{post.author}</span>
                    <span className="text-[9px] font-mono text-neutral-500">broadcasted</span>
                  </div>
                  <span className="text-[10px] text-neutral-500 font-mono">Posted on {new Date(post.date).toLocaleDateString()}</span>
                </div>
              </div>
              
              <span className="text-[10px] font-mono uppercase bg-neutral-900 border border-neutral-800 text-indigo-400 px-2 py-0.5 rounded">
                #{post.category}
              </span>
            </div>

            {/* Core body */}
            <div className="flex flex-col md:flex-row gap-5">
              
              <div className="flex-1 flex flex-col gap-2">
                <h3 className="text-base font-bold text-neutral-100 group-hover:text-indigo-300 transition-colors">
                  {post.title}
                </h3>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">
                  {post.description}
                </p>
                
                {post.complaintId && (
                  <div className="mt-2 inline-flex items-center gap-1.5 text-[10px] bg-indigo-950/20 text-indigo-300 px-2.5 py-1 rounded border border-indigo-500/10 w-fit">
                    <AlertTriangle className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
                    Central Ticket Reference: {post.complaintId}
                  </div>
                )}
              </div>

              {post.imageUrl && (
                <div className="w-full md:w-36 h-24 bg-neutral-950 border border-neutral-900 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={post.imageUrl} alt="Incident reference" className="w-full h-full object-cover" />
                </div>
              )}

            </div>

            {/* Interactive voting footer */}
            <div className="flex items-center gap-4 pt-3 border-t border-neutral-900 text-xs">
              
              <button 
                id={`post-btn-vote-${post.id}`}
                disabled={post.hasVotedByMe}
                onClick={() => onUpvotePost(post.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                  post.hasVotedByMe 
                    ? "bg-emerald-950/40 text-emerald-400 border-emerald-500/20" 
                    : "bg-neutral-900 border-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-white"
                }`}
              >
                <ArrowUp className={`w-4 h-4 ${post.hasVotedByMe ? "animate-bounce" : ""}`} />
                <span>{post.upvotes} Upvotes</span>
              </button>

              <div className="flex items-center gap-1.5 text-neutral-500 font-mono">
                <MessageSquare className="w-4 h-4" />
                <span>Consensus triggers elevated priority at 50 upvotes.</span>
              </div>

            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
