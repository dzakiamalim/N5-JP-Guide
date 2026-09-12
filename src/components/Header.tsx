import React, { useState, useEffect } from 'react';
import { BookOpen, Sparkles, Flame, Volume2, Type, Award } from 'lucide-react';
import { UserStats } from '../types';
import { playJapaneseAudio, subscribeAudioState } from '../utils/audio';

interface HeaderProps {
  activeTab: 'roadmap' | 'lessons' | 'flashcards' | 'drills' | 'kana' | 'sensei';
  setActiveTab: (tab: 'roadmap' | 'lessons' | 'flashcards' | 'drills' | 'kana' | 'sensei') => void;
  stats: UserStats;
  onToggleRomaji: () => void;
  onSetAudioSpeed: (speed: number) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  stats,
  onToggleRomaji,
  onSetAudioSpeed
}) => {
  const [isPlayingTest, setIsPlayingTest] = useState(false);

  useEffect(() => {
    return subscribeAudioState((playingText) => {
      setIsPlayingTest(playingText === 'こんにちは！日本語の勉強を始めましょう。');
    });
  }, []);

  const tabs = [
    { id: 'roadmap', label: 'Roadmap & N5 Plan', japanese: 'ロードマップ' },
    { id: 'lessons', label: 'Interactive Lessons', japanese: 'レッスン' },
    { id: 'flashcards', label: 'Vocabulary (SRS)', japanese: '単語帳' },
    { id: 'drills', label: 'Daily Grammar Drills', japanese: '文法練習' },
    { id: 'kana', label: 'Writing Systems & Kana', japanese: '文字・五十音' },
    { id: 'sensei', label: 'AI Sensei', japanese: '先生' }
  ] as const;

  const testAudio = () => {
    playJapaneseAudio('こんにちは！日本語の勉強を始めましょう。', stats.preferences.audioSpeed);
  };

  return (
    <header className="border-b border-stone-200 bg-white/90 backdrop-blur-md sticky top-0 z-40">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          {/* Logo & Subtitle */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-700 text-white flex items-center justify-center font-bold text-lg shadow-sm shadow-rose-200">
              日
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-stone-900">
                  日本語 N5 <span className="text-rose-700">Guide</span>
                </h1>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-200">
                  JLPT N5
                </span>
              </div>
              <p className="text-xs text-stone-500 font-medium">
                Step-by-step beginner path to Japanese fluency
              </p>
            </div>
          </div>

          {/* User Stats & Preferences Bar */}
          <div className="flex items-center flex-wrap gap-2 sm:gap-3 text-xs">
            {/* Daily Streak */}
            <div
              id="streak-badge"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 text-amber-900 border border-amber-200 font-medium"
              title="Daily study streak"
            >
              <Flame className="w-4 h-4 text-amber-600 fill-amber-500" />
              <span>{stats.streakDays} Day Streak</span>
            </div>

            {/* Total XP */}
            <div
              id="xp-badge"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200 font-medium"
            >
              <Award className="w-4 h-4 text-emerald-600" />
              <span>{stats.totalXp} XP</span>
            </div>

            {/* Romaji Toggle */}
            <button
              id="romaji-toggle-btn"
              onClick={onToggleRomaji}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-colors font-medium ${
                stats.preferences.showRomaji
                  ? 'bg-rose-50 text-rose-800 border-rose-200'
                  : 'bg-stone-100 text-stone-600 border-stone-200 hover:bg-stone-200'
              }`}
              title="Toggle Romaji display on or off"
            >
              <Type className="w-3.5 h-3.5" />
              <span>Romaji: {stats.preferences.showRomaji ? 'ON' : 'OFF'}</span>
            </button>

            {/* Audio Speed & Sound test */}
            <div className="flex items-center gap-1 bg-stone-100 rounded-lg p-1 border border-stone-200">
              <button
                id="test-audio-btn"
                onClick={testAudio}
                className={`px-1.5 py-1 rounded transition flex items-center gap-1 cursor-pointer ${
                  isPlayingTest
                    ? 'bg-rose-600 text-white shadow-xs ring-2 ring-rose-200'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200'
                }`}
                title="Test Japanese native audio speech"
              >
                <Volume2 className={`w-3.5 h-3.5 ${isPlayingTest ? 'animate-bounce' : ''}`} />
                <span className="text-[10px] font-medium">{isPlayingTest ? 'Playing...' : 'Audio'}</span>
              </button>
              <select
                id="audio-speed-select"
                value={stats.preferences.audioSpeed}
                onChange={(e) => onSetAudioSpeed(parseFloat(e.target.value))}
                className="bg-transparent text-stone-700 text-xs font-medium focus:outline-none pr-1 cursor-pointer"
                title="Adjust speech pronunciation speed"
              >
                <option value="0.75">0.75x (Slow)</option>
                <option value="0.9">0.9x (Beginner)</option>
                <option value="1.0">1.0x (Normal)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 sm:gap-2 mt-3 overflow-x-auto pb-1 scrollbar-none">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`nav-tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-stone-900 text-white shadow-sm'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded ${
                    isActive ? 'bg-stone-800 text-stone-300' : 'bg-stone-200 text-stone-600'
                  }`}
                >
                  {tab.japanese}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
