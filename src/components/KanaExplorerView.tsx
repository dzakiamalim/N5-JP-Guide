import React, { useState, useEffect } from 'react';
import { Volume2, Sparkles, Zap, RotateCcw, CheckCircle2, AlertCircle, HelpCircle, BookOpen, Lightbulb, ArrowRight } from 'lucide-react';
import { HIRAGANA_DATA, KATAKANA_DATA } from '../data/kanaData';
import { KanaItem, UserStats } from '../types';
import { playJapaneseAudio, subscribeAudioState } from '../utils/audio';
import { WritingSystemsGuide } from './WritingSystemsGuide';

interface KanaExplorerViewProps {
  stats: UserStats;
  onAddXp: (amount: number) => void;
}

export const KanaExplorerView: React.FC<KanaExplorerViewProps> = ({ stats, onAddXp }) => {
  const [activeTab, setActiveTab] = useState<'guide' | 'chart' | 'quiz'>('guide');
  const [activeScript, setActiveScript] = useState<'hiragana' | 'katakana'>('hiragana');
  const [selectedKana, setSelectedKana] = useState<KanaItem | null>(null);
  const [activeAudioText, setActiveAudioText] = useState<string | null>(null);

  useEffect(() => {
    return subscribeAudioState((text) => {
      setActiveAudioText(text);
    });
  }, []);

  // Speed Quiz Mode state
  const [quizQuestion, setQuizQuestion] = useState<{
    target: KanaItem;
    options: string[];
  } | null>(null);
  const [quizFeedback, setQuizFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const [quizScore, setQuizScore] = useState(0);

  const kanaList = activeScript === 'hiragana' ? HIRAGANA_DATA : KATAKANA_DATA;

  const handlePlaySound = (item: KanaItem) => {
    setSelectedKana(item);
    playJapaneseAudio(item.kana, stats.preferences.audioSpeed);
  };

  const startQuiz = () => {
    setActiveTab('quiz');
    setQuizScore(0);
    nextQuizQuestion();
  };

  const nextQuizQuestion = () => {
    setQuizFeedback(null);
    const randomIndex = Math.floor(Math.random() * kanaList.length);
    const target = kanaList[randomIndex];

    // Generate 3 wrong options
    const others = kanaList.filter((k) => k.romaji !== target.romaji);
    const shuffledOthers = [...others].sort(() => 0.5 - Math.random());
    const wrongOptions = shuffledOthers.slice(0, 3).map((k) => k.romaji);

    const allOptions = [...wrongOptions, target.romaji].sort(() => 0.5 - Math.random());
    setQuizQuestion({ target, options: allOptions });
    playJapaneseAudio(target.kana, stats.preferences.audioSpeed);
  };

  const handleQuizAnswer = (chosenRomaji: string) => {
    if (!quizQuestion || quizFeedback) return;

    if (chosenRomaji === quizQuestion.target.romaji) {
      setQuizFeedback({ isCorrect: true, message: `Correct! ${quizQuestion.target.kana} is "${quizQuestion.target.romaji}".` });
      setQuizScore((s) => s + 1);
      onAddXp(5);
      setTimeout(() => {
        nextQuizQuestion();
      }, 900);
    } else {
      setQuizFeedback({
        isCorrect: false,
        message: `Incorrect. ${quizQuestion.target.kana} sounds like "${quizQuestion.target.romaji}".`
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* Header & Mode Switcher */}
      <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
              {activeTab === 'guide'
                ? 'Japanese Writing Systems Decoded'
                : activeTab === 'quiz'
                ? 'Kana Recognition Speed Drill'
                : 'The 46 Kana Audio Chart (Gojūon)'}
            </h2>
            {activeTab === 'guide' && (
              <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[10px] font-bold border border-rose-200 uppercase">
                Beginner Essential
              </span>
            )}
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            {activeTab === 'guide'
              ? 'Complete guide to when to use Katakana vs Hiragana, visual styles & real sentence anatomy'
              : activeTab === 'quiz'
              ? 'Rapid-fire romaji matching to train instant character recognition'
              : 'Click any character for native audio pronunciation & stroke mnemonics'}
          </p>
        </div>

        {/* Primary View Switcher */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-xl border border-stone-200 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setActiveTab('guide')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition cursor-pointer ${
                activeTab === 'guide'
                  ? 'bg-white text-stone-900 shadow-xs font-bold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-rose-700" />
              <span>When to Use Guide</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('chart')}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                activeTab === 'chart'
                  ? 'bg-white text-stone-900 shadow-xs font-bold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Kana Audio Chart
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              if (activeTab === 'quiz') {
                setActiveTab('chart');
              } else {
                startQuiz();
              }
            }}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
              activeTab === 'quiz'
                ? 'bg-rose-700 text-white border-rose-700 shadow-xs'
                : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>{activeTab === 'quiz' ? 'Exit Quiz' : 'Speed Quiz'}</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: Complete Writing Systems Guide (When to use Katakana vs Hiragana) */}
      {activeTab === 'guide' && (
        <WritingSystemsGuide
          audioSpeed={stats.preferences.audioSpeed}
          onAddXp={onAddXp}
        />
      )}

      {/* VIEW 2: Speed Quiz Mode */}
      {activeTab === 'quiz' && quizQuestion && (
        <div className="bg-white rounded-3xl border border-stone-200 p-8 shadow-sm text-center max-w-xl mx-auto space-y-6">
          <div className="flex items-center justify-between text-xs text-stone-500 font-semibold border-b border-stone-100 pb-3">
            <span>Score: {quizScore} Correct</span>
            <span className="text-rose-700 font-mono font-bold">Speed Recognition Drill</span>
          </div>

          <div className="space-y-3">
            <div className="text-7xl font-bold text-stone-900 py-4 tracking-wider">
              {quizQuestion.target.kana}
            </div>

            <button
              type="button"
              onClick={() => playJapaneseAudio(quizQuestion.target.kana, stats.preferences.audioSpeed)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-100 text-stone-700 text-xs font-medium hover:bg-rose-50 hover:text-rose-700 transition cursor-pointer"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Replay Audio</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            {quizQuestion.options.map((romajiOpt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleQuizAnswer(romajiOpt)}
                className="p-4 rounded-2xl bg-stone-50 hover:bg-stone-100 border border-stone-200 text-lg font-bold text-stone-800 transition active:scale-95 shadow-xs cursor-pointer"
              >
                {romajiOpt}
              </button>
            ))}
          </div>

          {quizFeedback && (
            <div
              className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 animate-in fade-in ${
                quizFeedback.isCorrect
                  ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                  : 'bg-rose-50 text-rose-900 border-rose-200'
              }`}
            >
              {quizFeedback.isCorrect ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-600" />
              )}
              <span>{quizFeedback.message}</span>
            </div>
          )}

          <div className="pt-2">
            <button
              type="button"
              onClick={() => setActiveTab('chart')}
              className="text-xs text-stone-500 hover:text-stone-800 underline cursor-pointer"
            >
              Back to Kana Chart
            </button>
          </div>
        </div>
      )}

      {/* VIEW 3: Interactive 46 Gojūon Audio Chart */}
      {activeTab === 'chart' && (
        <div className="space-y-6">
          {/* Helpful Beginner Prompt Banner */}
          <div className="bg-amber-50/90 border border-amber-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-200/80 text-amber-900 flex items-center justify-center shrink-0">
                <Lightbulb className="w-5 h-5 text-amber-800" />
              </div>
              <div className="text-xs text-amber-900">
                <span className="font-bold">Total beginner?</span> Both Hiragana & Katakana share the exact same 46 sounds, but Katakana is exclusively for foreign loanwords (like コーヒー) and foreign names!
              </div>
            </div>
            <button
              type="button"
              onClick={() => setActiveTab('guide')}
              className="px-3.5 py-1.5 rounded-xl bg-white border border-amber-300 text-amber-900 text-xs font-bold hover:bg-amber-100 transition shrink-0 flex items-center gap-1 cursor-pointer self-start sm:self-auto"
            >
              <span>Read When to Use Guide</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Sub-toggle: Hiragana vs Katakana */}
          <div className="flex items-center justify-between bg-white rounded-2xl p-4 border border-stone-200 shadow-xs">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Active Syllabary:</span>
              <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl border border-stone-200 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setActiveScript('hiragana')}
                  className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                    activeScript === 'hiragana'
                      ? 'bg-white text-stone-900 shadow-xs font-bold'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  ひらがな (Hiragana)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveScript('katakana')}
                  className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                    activeScript === 'katakana'
                      ? 'bg-white text-stone-900 shadow-xs font-bold'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  カタカナ (Katakana)
                </button>
              </div>
            </div>

            <div className="text-xs text-stone-500 hidden sm:block">
              {activeScript === 'hiragana' ? 'Used for native words & grammar glue' : 'Used for foreign loanwords, names & sound effects'}
            </div>
          </div>

          {/* Kana Grid & Detail Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Grid */}
            <div className="lg:col-span-3 bg-white p-6 rounded-3xl border border-stone-200 shadow-xs">
              <div className="grid grid-cols-5 gap-2.5 sm:gap-3">
                {kanaList.map((item) => {
                  const isSelected = selectedKana?.id === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handlePlaySound(item)}
                      className={`p-3 sm:p-4 rounded-2xl border flex flex-col items-center justify-center transition-all group cursor-pointer ${
                        isSelected
                          ? 'bg-rose-700 text-white border-rose-700 shadow-md scale-105 ring-2 ring-rose-300'
                          : 'bg-stone-50 text-stone-900 border-stone-200/80 hover:bg-stone-100 hover:border-stone-300 shadow-xs'
                      }`}
                    >
                      <span className="text-2xl sm:text-3xl font-bold tracking-wide">
                        {item.kana}
                      </span>
                      <span
                        className={`text-xs font-mono font-medium mt-1 ${
                          isSelected ? 'text-rose-100' : 'text-stone-500 group-hover:text-stone-700'
                        }`}
                      >
                        {item.romaji}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Kana Detail Card */}
            <div className="lg:col-span-1 space-y-4">
              <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4 sticky top-24">
                <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                  <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                    Character Detail
                  </span>
                  {selectedKana && (
                    <button
                      id={`kana-detail-audio-${selectedKana.id}`}
                      type="button"
                      onClick={() => playJapaneseAudio(selectedKana.kana, stats.preferences.audioSpeed)}
                      className={`p-1.5 rounded-lg transition flex items-center gap-1 cursor-pointer ${
                        activeAudioText === selectedKana.kana
                          ? 'bg-rose-700 text-white shadow-xs ring-2 ring-rose-300 scale-105'
                          : 'bg-stone-100 text-stone-700 hover:bg-rose-50 hover:text-rose-700'
                      }`}
                      title="Play pronunciation audio"
                    >
                      <Volume2 className={`w-4 h-4 ${activeAudioText === selectedKana.kana ? 'animate-bounce' : ''}`} />
                      {activeAudioText === selectedKana.kana && <span className="text-[10px] font-bold">Playing</span>}
                    </button>
                  )}
                </div>

                {selectedKana ? (
                  <div className="text-center space-y-4">
                    <div className="text-6xl sm:text-7xl font-bold text-stone-900">
                      {selectedKana.kana}
                    </div>
                    <div>
                      <div className="text-xl font-bold text-rose-700 font-mono">
                        {selectedKana.romaji}
                      </div>
                      <div className="text-xs text-stone-400 capitalize">
                        {selectedKana.type} • {selectedKana.group} row
                      </div>
                    </div>

                    {selectedKana.mnemonic && (
                      <div className="p-3 bg-rose-50/60 rounded-xl border border-rose-100 text-left space-y-1">
                        <div className="text-[10px] font-bold text-rose-800 uppercase tracking-wider flex items-center gap-1">
                          <Sparkles className="w-3 h-3" /> Memory Mnemonic
                        </div>
                        <p className="text-xs text-stone-700 leading-relaxed">
                          {selectedKana.mnemonic}
                        </p>
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() => playJapaneseAudio(selectedKana.kana, stats.preferences.audioSpeed)}
                      className="w-full py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>Hear Native Audio</span>
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-8 space-y-2 text-stone-400">
                    <HelpCircle className="w-8 h-8 mx-auto stroke-1" />
                    <p className="text-xs">Click any character on the grid to inspect stroke mnemonic & audio</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
