import React, { useState } from 'react';
import { INITIAL_COMMUNITY_POSTS } from '../data/mockData';
import { CommunityPost, User } from '../types';
import { Users, Heart, MessageSquare, Trophy, Flame, Send, Award, Sparkles } from 'lucide-react';

interface CommunityViewProps {
  user: User;
}

export const CommunityView: React.FC<CommunityViewProps> = ({ user }) => {
  const [posts, setPosts] = useState<CommunityPost[]>(INITIAL_COMMUNITY_POSTS);
  const [newContent, setNewContent] = useState('');
  const [newPrBadge, setNewPrBadge] = useState('');

  const handleLike = (id: string) => {
    setPosts(posts.map(post => {
      if (post.id === id) {
        const liked = !post.likedByMe;
        return {
          ...post,
          likedByMe: liked,
          likes: liked ? post.likes + 1 : post.likes - 1
        };
      }
      return post;
    }));
  };

  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContent.trim()) return;

    const newPost: CommunityPost = {
      id: `post-${Date.now()}`,
      authorName: user.name,
      authorAvatar: user.avatar,
      authorTier: user.tier === 'black_tier' ? 'BLACK TIER VIP' : 'KINETIC PRO',
      timestamp: 'Just now',
      content: newContent,
      likes: 1,
      commentsCount: 0,
      prBadge: newPrBadge.trim() ? `NEW PR: ${newPrBadge}` : undefined,
      likedByMe: true
    };

    setPosts([newPost, ...posts]);
    setNewContent('');
    setNewPrBadge('');
  };

  return (
    <div className="min-h-screen bg-[#090909] py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C7FF00]/10 border border-[#C7FF00]/30 text-[#C7FF00] text-xs font-mono-custom font-bold uppercase mb-3">
            <Users className="w-3.5 h-3.5" />
            <span>GLOBAL ATHLETE COMMUNITY</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white uppercase font-display tracking-tight">
            ATHLETE <span className="text-[#C7FF00]">FEED & PRs</span>
          </h1>
          <p className="text-sm text-zinc-400 mt-2 max-w-2xl">
            Share personal records, training milestones, and biometric form feedback with 28,000+ elite lifters worldwide.
          </p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT POST CREATOR & FEED */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* CREATE POST BOX */}
          <div className="bg-zinc-900/80 border border-white/10 rounded-2xl p-5">
            <div className="flex items-start gap-3">
              <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-xl object-cover border border-[#C7FF00]" />
              <form onSubmit={handleAddPost} className="flex-1 space-y-3">
                <textarea
                  rows={2}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Share a lift PR, training reflection, or recovery wins..."
                  className="w-full bg-black border border-white/15 rounded-xl p-3 text-xs text-white focus:border-[#C7FF00] outline-none resize-none"
                />

                <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
                  <input
                    type="text"
                    value={newPrBadge}
                    onChange={(e) => setNewPrBadge(e.target.value)}
                    placeholder="Optional PR Tag (e.g., 220kg Squat)"
                    className="w-full sm:w-64 bg-black border border-white/15 rounded-xl px-3 py-2 text-xs text-white outline-none font-mono-custom"
                  />

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-2.5 bg-[#C7FF00] hover:bg-[#b0e600] text-black font-extrabold text-xs uppercase rounded-xl flex items-center justify-center gap-2"
                  >
                    <span>POST TO FEED</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* POSTS LIST */}
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="bg-zinc-900/80 border border-white/10 p-6 rounded-2xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={post.authorAvatar} alt={post.authorName} className="w-10 h-10 rounded-xl object-cover border border-[#C7FF00]" />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-white text-sm">{post.authorName}</h4>
                        <span className="text-[9px] font-mono-custom font-extrabold text-[#C7FF00] bg-[#C7FF00]/10 px-2 py-0.5 rounded border border-[#C7FF00]/30 uppercase">
                          {post.authorTier}
                        </span>
                      </div>
                      <span className="text-[10px] text-zinc-500 font-mono-custom">{post.timestamp}</span>
                    </div>
                  </div>

                  {post.prBadge && (
                    <span className="bg-amber-400/10 text-amber-300 border border-amber-400/40 px-3 py-1 rounded-full text-xs font-mono-custom font-bold flex items-center gap-1">
                      <Trophy className="w-3.5 h-3.5 text-amber-400" />
                      {post.prBadge}
                    </span>
                  )}
                </div>

                <p className="text-xs text-zinc-200 mt-4 leading-relaxed">{post.content}</p>

                {post.image && (
                  <div className="mt-4 rounded-xl overflow-hidden h-64 border border-white/10">
                    <img src={post.image} alt="PR Lift" className="w-full h-full object-cover" />
                  </div>
                )}

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-6 text-xs text-zinc-400">
                  <button
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center gap-1.5 font-bold transition-colors ${
                      post.likedByMe ? 'text-rose-500' : 'hover:text-white'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${post.likedByMe ? 'fill-rose-500' : ''}`} />
                    <span>{post.likes} LIKES</span>
                  </button>

                  <span className="flex items-center gap-1.5 font-bold hover:text-white cursor-pointer">
                    <MessageSquare className="w-4 h-4" />
                    <span>{post.commentsCount} COMMENTS</span>
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* RIGHT ATHLETE LEADERBOARD */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-zinc-900 border border-white/10 p-6 rounded-2xl">
            <h3 className="text-base font-black text-white uppercase font-display flex items-center gap-2 mb-4">
              <Trophy className="w-5 h-5 text-[#C7FF00]" />
              <span>GLOBAL VOLUME LEADERBOARD</span>
            </h3>

            <div className="space-y-3 font-mono-custom">
              <div className="bg-black/60 p-3 rounded-xl border border-[#C7FF00]/40 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded bg-[#C7FF00] text-black font-extrabold text-xs flex items-center justify-center">1</span>
                  <div>
                    <span className="text-xs font-bold text-white block">Sven Lindqvist</span>
                    <span className="text-[10px] text-zinc-400 uppercase">Shibuya Tokyo</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#C7FF00]">18,420 KG</span>
              </div>

              <div className="bg-black/60 p-3 rounded-xl border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded bg-zinc-800 text-zinc-300 font-extrabold text-xs flex items-center justify-center">2</span>
                  <div>
                    <span className="text-xs font-bold text-white block">Alex Mercer</span>
                    <span className="text-[10px] text-zinc-400 uppercase">SoHo NYC</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-white">16,210 KG</span>
              </div>

              <div className="bg-black/60 p-3 rounded-xl border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded bg-zinc-800 text-zinc-300 font-extrabold text-xs flex items-center justify-center">3</span>
                  <div>
                    <span className="text-xs font-bold text-white block">Sophia Chen</span>
                    <span className="text-[10px] text-zinc-400 uppercase">Mayfair London</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-white">14,890 KG</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
