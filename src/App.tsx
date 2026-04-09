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
  Search,
  Activity,
  Target,
  Heart,
  ShieldCheck,
  ZapIcon
} from 'lucide-react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  ResponsiveContainer 
} from 'recharts';
import { VIPUser, MOCK_VIPS } from './types';
import { cn } from './lib/utils';
import { analyzeVIPPersonality } from './services/gemini';

export default function App() {
  const [vips, setVips] = useState<VIPUser[]>(MOCK_VIPS);
  const [selectedVip, setSelectedVip] = useState<VIPUser | null>(null);
  const [isGenerating, setIsGenerating] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isBatchGenerating, setIsBatchGenerating] = useState(false);
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
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">VIP 洞察系統</h1>
            <p className="text-sm text-gray-400 font-medium uppercase tracking-widest mt-1">內部存取專用</p>
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
              <span>AI 驅動洞察引擎</span>
            </div>
            <span>© 2026 VIP 管理系統</span>
          </div>
        </motion.div>
      </div>
    );
  }

  const filteredVips = vips.filter(vip => 
    vip.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vip.personalityTraits.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleGenerateInsights = async (vip: VIPUser, retryCount = 0) => {
    if (isGenerating && retryCount === 0 && !isBatchGenerating) return;
    setIsGenerating(vip.id);
    
    try {
      // 1. Analyze personality and get scores
      const analysis = await analyzeVIPPersonality(vip);
      
      // 2. Update VIP data
      setVips(prev => prev.map(v => v.id === vip.id ? {
        ...v,
        personalityTraits: analysis.traits,
        bio: analysis.personalitySummary,
        personalityScores: analysis.scores,
        favoriteStreamers: analysis.favoriteStreamers || v.favoriteStreamers
      } : v));

      if (selectedVip?.id === vip.id) {
        setSelectedVip(prev => prev ? {
          ...prev,
          personalityTraits: analysis.traits,
          bio: analysis.personalitySummary,
          personalityScores: analysis.scores,
          favoriteStreamers: analysis.favoriteStreamers || prev.favoriteStreamers
        } : null);
      }
    } catch (error) {
      console.error("Failed to generate insights:", error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      
      // Retry logic for 503 errors
      if (errorMessage.includes('503') && retryCount < 2) {
        console.log(`Retrying generation for ${vip.name} (attempt ${retryCount + 1})...`);
        setTimeout(() => handleGenerateInsights(vip, retryCount + 1), 2000);
        return;
      }

      const friendlyMessage = errorMessage.includes('503') 
        ? "AI 目前忙碌中（503 錯誤），請稍候幾秒再試一次。這通常是暫時性的流量高峰。"
        : `AI 產生失敗：\n${errorMessage}\n\n請檢查 API Key 是否設定正確。`;
      
      alert(friendlyMessage);
    } finally {
      if (retryCount === 0 || !isGenerating) {
        setIsGenerating(null);
      }
    }
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-indigo-50 px-4 py-3 md:px-6 md:py-4">
        <div className="max-w-7xl mx-auto flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-200 shrink-0">
                <Users size={24} />
              </div>
              <div className="min-w-0">
                <h1 className="text-lg md:text-xl font-bold tracking-tight text-gray-900 truncate">VIP 客戶洞察名錄</h1>
                <p className="text-[10px] md:text-xs text-gray-500 font-medium uppercase tracking-wider truncate">內部公司存取專用</p>
              </div>
            </div>
            
            <button 
              onClick={async () => {
                setIsBatchGenerating(true);
                for (const vip of vips) {
                  await handleGenerateInsights(vip);
                }
                setIsBatchGenerating(false);
              }}
              disabled={!!isGenerating || isBatchGenerating}
              className="md:flex items-center gap-2 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white text-[10px] md:text-xs font-bold rounded-xl shadow-lg shadow-indigo-100 transition-all active:scale-95 shrink-0"
            >
              <Sparkles size={14} className={cn((isGenerating || isBatchGenerating) && "animate-spin")} />
              <span className="hidden sm:inline">{(isGenerating || isBatchGenerating) ? 'AI 批量分析中...' : '一鍵生成所有 AI 深度分析'}</span>
              <span className="sm:hidden">{(isGenerating || isBatchGenerating) ? '分析中' : '一鍵分析'}</span>
            </button>
          </div>

          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="搜尋 VIP 姓名或特質..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-100/50 border-transparent focus:bg-white focus:border-indigo-200 focus:ring-4 focus:ring-indigo-50 rounded-2xl transition-all outline-none text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
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
            <p className="text-lg font-medium">找不到符合搜尋條件的 VIP。</p>
            <button 
              onClick={() => setSearchTerm('')}
              className="mt-4 text-indigo-600 font-bold hover:underline"
            >
              清除搜尋
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
          <span>VIP 總營收: $4,650,000</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Sparkles size={14} className="text-indigo-400" />
          <span>AI 驅動性格分析</span>
        </div>
      </footer>
    </div>
  );
}

function PersonalityRadar({ scores, color }: { scores: VIPUser['personalityScores'], color: string }) {
  if (!scores) return null;

  const data = [
    { subject: '忠誠度', A: scores.loyalty, fullMark: 100 },
    { subject: '消費力', A: scores.spending, fullMark: 100 },
    { subject: '互動性', A: scores.engagement, fullMark: 100 },
    { subject: '情感度', A: scores.emotionality, fullMark: 100 },
    { subject: '策略性', A: scores.strategic, fullMark: 100 },
  ];

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="65%" data={data}>
          <PolarGrid stroke="#E2E8F0" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#94A3B8', fontSize: 9, fontWeight: 600 }} />
          <Radar
            name="Personality"
            dataKey="A"
            stroke={color}
            fill={color}
            fillOpacity={0.5}
          />
        </RadarChart>
      </ResponsiveContainer>
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
    Diamond: '#4F46E5', // Indigo 600
    Platinum: '#0891B2', // Cyan 600
    Gold: '#D97706' // Amber 600
  }[vip.level];

  const levelGradient = {
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
      <div className={cn("absolute top-5 right-5 px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-widest shadow-sm z-10", levelGradient)}>
        {vip.level}
      </div>

      {/* Personality Visualization Section */}
      <div className="relative aspect-square w-full rounded-2xl bg-gray-50 mb-4 overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform duration-500 border border-gray-100">
        {vip.personalityScores ? (
          <PersonalityRadar scores={vip.personalityScores} color={levelColor} />
        ) : (
          <div className="flex flex-col items-center gap-2 text-gray-300">
            <Activity size={48} strokeWidth={1} />
            <span className="text-[10px] uppercase font-bold tracking-tighter">分析數據未生成</span>
          </div>
        )}
        
        {isGenerating && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center gap-2">
            <RefreshCw size={24} className="text-indigo-600 animate-spin" />
            <span className="text-[10px] font-bold text-indigo-600 animate-pulse">數據分析中...</span>
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900 leading-tight">{vip.name}</h3>
          <span className="text-xs font-bold text-gray-400">{vip.age}歲</span>
        </div>
        <div className="flex items-center gap-1.5 text-gray-400 text-xs font-medium">
          <DollarSign size={12} />
          <span>總消費 ${vip.totalSpending.toLocaleString()}</span>
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
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
      />
      
      <motion.div 
        layoutId={`card-${vip.id}`}
        className="relative w-full max-w-4xl h-[92vh] sm:h-auto sm:max-h-[90vh] bg-white rounded-t-[2.5rem] sm:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row"
      >
        {/* Mobile Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md shadow-lg flex items-center justify-center text-gray-500 sm:hidden"
        >
          <X size={20} />
        </button>

        {/* Left Side: Personality Chart & Stats */}
        <div className="w-full md:w-2/5 bg-gray-50 p-6 sm:p-8 flex flex-col items-center overflow-y-auto sm:overflow-visible shrink-0">
          <div className="relative w-full aspect-square rounded-3xl bg-white shadow-xl shadow-indigo-100/50 overflow-hidden mb-6 sm:mb-8 flex items-center justify-center border border-indigo-50 shrink-0">
            {vip.personalityScores ? (
              <div className="w-full h-full p-4">
                <PersonalityRadar 
                  scores={vip.personalityScores} 
                  color={vip.level === 'Diamond' ? '#4F46E5' : vip.level === 'Platinum' ? '#0891B2' : '#D97706'} 
                />
              </div>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-gray-200">
                <Activity size={80} strokeWidth={1} />
                <p className="text-xs font-bold uppercase tracking-widest mt-4">數據分析待生成</p>
              </div>
            )}
            
            {isGenerating && (
              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center gap-4">
                <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                <p className="text-sm font-bold text-indigo-600 animate-pulse">AI 深度分析中...</p>
              </div>
            )}
          </div>

          <div className="w-full space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 bg-white rounded-2xl border border-gray-100 flex flex-col items-center gap-1">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">忠誠度</span>
                <span className="text-xl font-black text-indigo-600">{vip.personalityScores?.loyalty || '--'}</span>
              </div>
              <div className="p-4 bg-white rounded-2xl border border-gray-100 flex flex-col items-center gap-1">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">消費力</span>
                <span className="text-xl font-black text-indigo-600">{vip.personalityScores?.spending || '--'}</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-green-50 text-green-600 flex items-center justify-center">
                  <DollarSign size={18} />
                </div>
                <span className="text-sm font-medium text-gray-500">總累積消費</span>
              </div>
              <span className="text-lg font-bold text-gray-900">${vip.totalSpending.toLocaleString()}</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Calendar size={18} />
                </div>
                <span className="text-sm font-medium text-gray-500">最後活躍日期</span>
              </div>
              <span className="text-sm font-bold text-gray-900">{vip.lastActive}</span>
            </div>
          </div>
        </div>

        {/* Right Side: Details & Conversations */}
        <div className="flex-1 p-6 sm:p-12 overflow-y-auto bg-white">
          <button 
            onClick={onClose}
            className="hidden sm:flex absolute top-8 right-8 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 items-center justify-center text-gray-500 transition-colors"
          >
            <X size={20} />
          </button>

          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">{vip.name}</h2>
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-bold text-gray-400">{vip.age}歲</span>
                <span className={cn("px-3 py-1 rounded-full text-[10px] font-black text-white uppercase tracking-widest", 
                  vip.level === 'Diamond' ? 'vip-gradient-diamond' : 
                  vip.level === 'Platinum' ? 'vip-gradient-platinum' : 'vip-gradient-gold'
                )}>
                  {vip.level}
                </span>
              </div>
            </div>

            {/* Basic Info Row */}
            <div className="flex flex-wrap gap-4 mb-6">
              {vip.birthday && (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-xl border border-gray-100">
                  <Calendar size={14} className="text-gray-400" />
                  <span className="text-xs font-bold text-gray-600">{vip.birthday}</span>
                </div>
              )}
              {vip.zodiac && (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 rounded-xl border border-indigo-100">
                  <Sparkles size={14} className="text-indigo-400" />
                  <span className="text-xs font-bold text-indigo-600">{vip.zodiac}</span>
                </div>
              )}
              {vip.bloodType && (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-red-50 rounded-xl border border-red-100">
                  <Heart size={14} className="text-red-400" />
                  <span className="text-xs font-bold text-red-600">{vip.bloodType}</span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {vip.personalityTraits.map((trait, i) => (
                <span key={i} className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[10px] sm:text-xs font-bold">
                  {trait}
                </span>
              ))}
            </div>
            <button 
              onClick={onGenerate}
              disabled={isGenerating}
              className="mt-6 w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white text-xs font-bold rounded-2xl shadow-lg shadow-indigo-100 transition-all active:scale-95"
            >
              <RefreshCw size={14} className={cn(isGenerating && "animate-spin")} />
              {isGenerating ? 'AI 分析中...' : '重新生成 AI 深度分析'}
            </button>
          </div>

          <div className="space-y-8">
            <section>
              <div className="flex items-center gap-2 mb-4 text-gray-900">
                <Info size={18} className="text-indigo-600" />
                <h4 className="font-bold uppercase tracking-widest text-xs">AI 性格洞察</h4>
              </div>
              <p className="text-gray-600 leading-relaxed bg-indigo-50/30 p-5 rounded-2xl border border-indigo-50 italic">
                "{vip.bio || '請點擊生成按鈕，查看基於客戶互動紀錄的 AI 性格總結。'}"
              </p>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-4 text-gray-900">
                <Heart size={18} className="text-pink-500" />
                <h4 className="font-bold uppercase tracking-widest text-xs">喜愛的主播</h4>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {vip.favoriteStreamers?.map((streamer, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-pink-50 flex items-center justify-center text-pink-500 text-xs font-bold">
                        {streamer.name[0].toUpperCase()}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-900">{streamer.name}</span>
                        {streamer.status && (
                          <span className={cn(
                            "text-[10px] font-bold",
                            streamer.status.includes('鬧翻') ? "text-red-500" : "text-green-500"
                          )}>
                            {streamer.status}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-black text-gray-900">{streamer.spending.toLocaleString()}</div>
                      <div className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter">鑽石</div>
                    </div>
                  </div>
                ))}
                {!vip.favoriteStreamers && (
                  <p className="text-xs text-gray-400 italic text-center py-4">尚無主播數據。</p>
                )}
              </div>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-4 text-gray-900">
                <MessageSquare size={18} className="text-indigo-600" />
                <h4 className="font-bold uppercase tracking-widest text-xs">對話片段</h4>
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
