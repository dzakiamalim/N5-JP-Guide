import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { RoadmapView } from './components/RoadmapView';
import { LessonsView } from './components/LessonsView';
import { FlashcardsView } from './components/FlashcardsView';
import { GrammarDrillsView } from './components/GrammarDrillsView';
import { KanaExplorerView } from './components/KanaExplorerView';
import { SenseiView } from './components/SenseiView';
import { loadUserStats, saveUserStats, updateCardSRS } from './utils/storage';
import { UserStats } from './types';

export default function App() {
  const [stats, setStats] = useState<UserStats>(() => loadUserStats());
  const [activeTab, setActiveTab] = useState<'roadmap' | 'lessons' | 'flashcards' | 'drills' | 'kana' | 'sensei'>('roadmap');
  const [selectedLessonId, setSelectedLessonId] = useState<string>('lesson-writing-systems');

  useEffect(() => {
    saveUserStats(stats);
  }, [stats]);

  const handleToggleRomaji = () => {
    setStats((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        showRomaji: !prev.preferences.showRomaji
      }
    }));
  };

  const handleSetAudioSpeed = (speed: number) => {
    setStats((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        audioSpeed: speed
      }
    }));
  };

  const handleCompleteLesson = (lessonId: string) => {
    setStats((prev) => {
      if (prev.completedLessonIds.includes(lessonId)) return prev;
      return {
        ...prev,
        totalXp: prev.totalXp + 25,
        completedLessonIds: [...prev.completedLessonIds, lessonId]
      };
    });
  };

  const handleRateCard = (cardId: string, rating: 'again' | 'hard' | 'good' | 'easy') => {
    setStats((prev) => updateCardSRS(prev, cardId, rating));
  };

  const handleAddXp = (amount: number) => {
    setStats((prev) => ({
      ...prev,
      totalXp: prev.totalXp + amount
    }));
  };

  const handleSelectLessonFromRoadmap = (lessonId: string) => {
    setSelectedLessonId(lessonId);
    setActiveTab('lessons');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col selection:bg-rose-100 selection:text-rose-900 font-sans">
      {/* App Header & Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        stats={stats}
        onToggleRomaji={handleToggleRomaji}
        onSetAudioSpeed={handleSetAudioSpeed}
      />

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {activeTab === 'roadmap' && (
          <RoadmapView
            stats={stats}
            onSelectLesson={handleSelectLessonFromRoadmap}
            onNavigateToTab={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'lessons' && (
          <LessonsView
            stats={stats}
            selectedLessonId={selectedLessonId}
            onSelectLessonId={setSelectedLessonId}
            onCompleteLesson={handleCompleteLesson}
          />
        )}

        {activeTab === 'flashcards' && (
          <FlashcardsView stats={stats} onRateCard={handleRateCard} />
        )}

        {activeTab === 'drills' && (
          <GrammarDrillsView stats={stats} onAddXp={handleAddXp} />
        )}

        {activeTab === 'kana' && (
          <KanaExplorerView stats={stats} onAddXp={handleAddXp} />
        )}

        {activeTab === 'sensei' && <SenseiView stats={stats} />}
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-200 bg-white py-6 mt-12 text-center text-xs text-stone-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>日本語 N5 Beginner Guide • Designed for JLPT Success</span>
          <span className="font-mono text-[11px] text-stone-400">
            SOV Sentence Grammar • Spaced Repetition • Web Speech Native Audio
          </span>
        </div>
      </footer>
    </div>
  );
}
