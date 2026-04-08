/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  TrendingUp, 
  MessageSquare, 
  Sparkles, 
  ChevronRight, 
  X, 
  DollarSign, 
  Calendar,
  Zap,
  Info,
  RefreshCw,
  Search
} from 'lucide-react';
import { VIPUser, MOCK_VIPS } from './types';
import { cn } from './lib/utils';
import { analyzeVIPPersonality, generateVIPAvatar } from './services/gemini';

export default function App() {
  const [vips, setVips] = useState<VIPUser[]>(MOCK_VIPS);
  const [selectedVip, setSelectedVip] = useState<VIPUser | null>(null);
  const [isGenerating, setIsGenerating] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '1159') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('密碼錯誤，請重新輸入');
      setPassword('');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F8F9FC] flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white rounded-[2.5rem] p-10 shadow-2xl shadow-indigo-100/50 border border-indigo-50"
        >
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-xl shadow-indigo-200 mb-4">
              <Users size={32} />
            </div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">VIP Insights</h1>
            <p className="text-sm text-gray-400 font-medium uppercase tracking-widest mt-1">Internal Access Only</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">
                請輸入存取密碼
              </label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••"
                className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-indigo-200 focus:ring-4 focus:ring-indigo-50 rounded-2xl transition-all outline-none text-center text-2xl tracking-[1em] font-mono"
                autoFocus
              />
              {error && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-500 text-xs font-bold mt-3 text-center"
                >
                  {error}
                </motion.p>
              )}
            </div>

            <button 
              type="submit"
              className="w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-lg shadow-indigo-200 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              登入系統
              <ChevronRight size={18} />
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-gray-50 flex flex-col items-center gap-2 text-[10px] text-gray-300 font-bold uppercase tracking-tighter">
            <div className="flex items-center gap-1">
              <Sparkles size={12} />
              <span>AI-Powered Insights Engine</span>
            </div>
            <span>© 2026 VIP Management System</span>
          </div>
        </motion.div>
      </div>
    );
  }

  const filteredVips = vips.filter(vip => 
    vip.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vip.personalityTraits.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleGenerateInsights = async (vip: VIPUser) => {
    if (isGenerating) return;
    setIsGenerating(vip.id);
    
    try {
      // 1. Analyze personality and get avatar prompt
      const analysis = await analyzeVIPPersonality(vip);
      
      // 2. Try to generate avatar image (optional)
      let avatarUrl = vip.avatarUrl;
      try {
        avatarUrl = await generateVIPAvatar(analysis.avatarPrompt);
      } catch (imgError) {
        console.warn("Avatar image generation failed, skipping image update:", imgError);
        // We don't alert here to keep the experience smooth
      }
      
      // 3. Update VIP data (always update text insights)
      setVips(prev => prev.map(v => v.id === vip.id ? {
        ...v,
        personalityTraits: analysis.traits,
        bio: analysis.personalitySummary,
        avatarUrl: avatarUrl,
        avatarDescription: analysis.avatarPrompt
      } : v));

      // Update selected VIP
      if (selectedVip?.id === vip.id) {
        setSelectedVip(prev => prev ? {
          ...prev,
          personalityTraits: analysis.traits,
          bio: analysis.personalitySummary,
          avatarUrl: avatarUrl
        } : null);
      }

      if (!avatarUrl && !vip.avatarUrl) {
        alert("文字分析已完成！\n\n提示：圖片生成失敗（通常是因為 Google API 的地區或額度限制），但您仍可查看性格分析。");
      }
    } catch (error) {
      console.error("Failed to generate insights:", error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      alert(`AI 產生失敗：\n${errorMessage}\n\n請檢查 GitHub Secrets 中的 GEMINI_API_KEY 是否設定正確。`);
    } finally {
      setIsGenerating(null);
    }
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-xl border-b border-indigo-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-200">
              <Users size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-gray-900">VIP Insights Directory</h1>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Internal Company Access Only</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={async () => {
                for (const vip of vips) {
                  if (!vip.avatarUrl) {
                    await handleGenerateInsights(vip);
                  }
                }
              }}
              disabled={!!isGenerating}
              className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-sm font-bold rounded-2xl transition-all shadow-lg shadow-indigo-200"
            >
              {isGenerating ? <RefreshCw size={16} className="animate-spin" /> : <Sparkles size={16} />}
              {isGenerating ? 'Generating...' : 'Generate All Avatars'}
            </button>
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search VIPs by name or trait..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-100/50 border-transparent focus:bg-white focus:border-indigo-200 focus:ring-4 focus:ring-indigo-50 rounded-2xl transition-all outline-none text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        {filteredVips.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredVips.map((vip) => (
              <VIPCard 
                key={vip.id} 
                vip={vip} 
                onClick={() => setSelectedVip(vip)}
                onGenerate={() => handleGenerateInsights(vip)}
                isGenerating={isGenerating === vip.id}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <Search size={48} className="mb-4 opacity-20" />
            <p className="text-lg font-medium">No VIPs found matching your search.</p>
            <button 
              onClick={() => setSearchTerm('')}
              className="mt-4 text-indigo-600 font-bold hover:underline"
            >
              Clear search
            </button>
          </div>
        )}
      </main>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedVip && (
          <VIPDetail 
            vip={selectedVip} 
            onClose={() => setSelectedVip(null)}
            onGenerate={() => handleGenerateInsights(selectedVip)}
            isGenerating={isGenerating === selectedVip.id}
          />
        )}
      </AnimatePresence>

      {/* Footer Info */}
      <footer className="fixed bottom-0 left-0 right-0 py-4 px-6 bg-white/80 backdrop-blur-md border-t border-gray-100 flex justify-center items-center gap-6 text-xs text-gray-400">
        <div className="flex items-center gap-1.5">
          <TrendingUp size={14} />
          <span>Total VIP Revenue: $4,650,000</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Sparkles size={14} className="text-indigo-400" />
          <span>AI-Powered Personas</span>
        </div>
      </footer>
    </div>
  );
}

function VIPCard({ 
  vip, 
  onClick, 
  onGenerate, 
  isGenerating 
}: { 
  vip: VIPUser; 
  onClick: () => void;
  onGenerate: () => void | Promise<void>;
  isGenerating: boolean;
  key?: React.Key;
}) {
  const levelColor = {
    Diamond: 'vip-gradient-diamond',
    Platinum: 'vip-gradient-platinum',
    Gold: 'vip-gradient-gold'
  }[vip.level];

  return (
    <motion.div 
      layoutId={`card-${vip.id}`}
      whileHover={{ y: -8 }}
      className="group relative flex flex-col bg-white rounded-[2rem] p-5 shadow-sm hover:shadow-2xl hover:shadow-indigo-100 transition-all cursor-pointer border border-gray-50 overflow-hidden"
      onClick={onClick}
    >
      {/* Level Badge */}
      <div className={cn("absolute top-5 right-5 px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-widest shadow-sm", levelColor)}>
        {vip.level}
      </div>

      {/* Avatar Section */}
      <div className="relative aspect-square w-full rounded-2xl bg-gray-50 mb-4 overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
        {vip.avatarUrl ? (
          <img 
            src={vip.avatarUrl} 
            alt={vip.name} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-gray-300">
            <Users size={48} strokeWidth={1} />
            <span className="text-[10px] uppercase font-bold tracking-tighter">No Avatar</span>
          </div>
        )}
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-indigo-600/0 group-hover:bg-indigo-600/10 transition-colors" />
      </div>

      {/* Info Section */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900 leading-tight">{vip.name}</h3>
          <span className="text-xs font-bold text-gray-400">{vip.age}歲</span>
        </div>
        <div className="flex items-center gap-1.5 text-gray-400 text-xs font-medium">
          <DollarSign size={12} />
          <span>${vip.totalSpending.toLocaleString()} Spent</span>
        </div>
      </div>

      {/* Traits */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {vip.personalityTraits.slice(0, 2).map((trait, i) => (
          <span key={i} className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase tracking-tight">
            {trait}
          </span>
        ))}
        {vip.personalityTraits.length > 2 && (
          <span className="px-2 py-1 rounded-lg bg-gray-50 text-gray-400 text-[10px] font-bold">
            +{vip.personalityTraits.length - 2}
          </span>
        )}
      </div>

      {/* Generate Button (if no avatar) */}
      {!vip.avatarUrl && (
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onGenerate();
          }}
          disabled={isGenerating}
          className="mt-4 w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
        >
          {isGenerating ? (
            <RefreshCw size={14} className="animate-spin" />
          ) : (
            <Sparkles size={14} />
          )}
          {isGenerating ? 'Generating...' : 'Generate AI Persona'}
        </button>
      )}
    </motion.div>
  );
}

function VIPDetail({ 
  vip, 
  onClose, 
  onGenerate, 
  isGenerating 
}: { 
  vip: VIPUser; 
  onClose: () => void;
  onGenerate: () => void | Promise<void>;
  isGenerating: boolean;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
      />
      
      <motion.div 
        layoutId={`card-${vip.id}`}
        className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row"
      >
        {/* Left Side: Avatar & Stats */}
        <div className="w-full md:w-2/5 bg-gray-50 p-8 flex flex-col items-center">
          <div className="relative w-full aspect-square rounded-3xl bg-white shadow-xl shadow-indigo-100/50 overflow-hidden mb-8 clay-shadow">
            {vip.avatarUrl ? (
              <img 
                src={vip.avatarUrl} 
                alt={vip.name} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-gray-200">
                <Users size={80} strokeWidth={1} />
                <p className="text-xs font-bold uppercase tracking-widest mt-4">Avatar Pending</p>
              </div>
            )}
            
            {isGenerating && (
              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center gap-4">
                <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                <p className="text-sm font-bold text-indigo-600 animate-pulse">AI is crafting persona...</p>
              </div>
            )}
          </div>

          <div className="w-full space-y-4">
            <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-green-50 text-green-600 flex items-center justify-center">
                  <DollarSign size={18} />
                </div>
                <span className="text-sm font-medium text-gray-500">Total Spent</span>
              </div>
              <span className="text-lg font-bold text-gray-900">${vip.totalSpending.toLocaleString()}</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Calendar size={18} />
                </div>
                <span className="text-sm font-medium text-gray-500">Last Active</span>
              </div>
              <span className="text-sm font-bold text-gray-900">{vip.lastActive}</span>
            </div>
          </div>

          <button 
            onClick={onGenerate}
            disabled={isGenerating}
            className="mt-8 w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold flex items-center justify-center gap-3 shadow-lg shadow-indigo-200 transition-all active:scale-95 disabled:opacity-50"
          >
            {isGenerating ? <RefreshCw size={20} className="animate-spin" /> : <Sparkles size={20} />}
            {vip.avatarUrl ? 'Regenerate Persona' : 'Generate AI Persona'}
          </button>
        </div>

        {/* Right Side: Details & Conversations */}
        <div className="flex-1 p-8 md:p-12 overflow-y-auto">
          <button 
            onClick={onClose}
            className="absolute top-8 right-8 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
          >
            <X size={20} />
          </button>

          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight">{vip.name}</h2>
              <span className="text-lg font-bold text-gray-400">{vip.age}歲</span>
              <span className={cn("px-3 py-1 rounded-full text-[10px] font-black text-white uppercase tracking-widest", 
                vip.level === 'Diamond' ? 'vip-gradient-diamond' : 
                vip.level === 'Platinum' ? 'vip-gradient-platinum' : 'vip-gradient-gold'
              )}>
                {vip.level}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {vip.personalityTraits.map((trait, i) => (
                <span key={i} className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold">
                  {trait}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <section>
              <div className="flex items-center gap-2 mb-4 text-gray-900">
                <Info size={18} className="text-indigo-600" />
                <h4 className="font-bold uppercase tracking-widest text-xs">AI Personality Insight</h4>
              </div>
              <p className="text-gray-600 leading-relaxed bg-indigo-50/30 p-5 rounded-2xl border border-indigo-50 italic">
                "{vip.bio || 'Generate insights to see a detailed AI-powered personality summary based on customer interactions.'}"
              </p>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-4 text-gray-900">
                <MessageSquare size={18} className="text-indigo-600" />
                <h4 className="font-bold uppercase tracking-widest text-xs">Conversation Snippets</h4>
              </div>
              <div className="space-y-3">
                {vip.conversationSnippets.map((snippet, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-gray-50 border border-gray-100 text-sm text-gray-700 flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-gray-400 shrink-0 shadow-sm">
                      <Zap size={12} />
                    </div>
                    <span>{snippet}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
