import React, { useState, useEffect } from 'react';
import { Volume2, RotateCw, Sparkles, Check, ChevronLeft, ChevronRight, Shuffle, Award, BookMarked } from 'lucide-react';
import { FLASHCARDS_DATA } from '../data/flashcardsData';
import { Flashcard, FlashcardMastery, UserStats } from '../types';
import { playJapaneseAudio, subscribeAudioState } from '../utils/audio';

interface FlashcardsViewProps {
  stats: UserStats;
  onRateCard: (cardId: string, rating: 'again' | 'hard' | 'good' | 'easy') => void;
}

export const FlashcardsView: React.FC<FlashcardsViewProps> = ({ stats, onRateCard }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [activeAudioText, setActiveAudioText] = useState<string | null>(null);

  useEffect(() => {
    return subscribeAudioState((text) => {
      setActiveAudioText(text);
    });
  }, []);

  const categories = [
    { id: 'all', label: 'All Cards' },
    { id: 'greetings', label: 'Greetings' },
    { id: 'daily_verbs', label: 'Daily Verbs' },
    { id: 'adjectives', label: 'Adjectives' },
    { id: 'food', label: 'Food & Dining' },
    { id: 'numbers_time', label: 'Numbers & Time' },
    { id: 'travel_places', label: 'Travel & Places' },
    { id: 'common_objects', label: 'Objects' }
  ];

  // Filter cards by category
  const filteredCards = FLASHCARDS_DATA.filter((c) =>
    selectedCategory === 'all' ? true : c.category === selectedCategory
  );

  const currentCard: Flashcard | undefined = filteredCards[currentIndex] || filteredCards[0];

  useEffect(() => {
    setIsFlipped(false);
  }, [currentIndex, selectedCategory]);

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    const randomIndex = Math.floor(Math.random() * filteredCards.length);
    setCurrentIndex(randomIndex);
  };

  const handleRate = (rating: 'again' | 'hard' | 'good' | 'easy') => {
    if (!currentCard) return;
    onRateCard(currentCard.id, rating);
    handleNext();
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.code === 'Space') {
        e.preventDefault();
        setIsFlipped((f) => !f);
      } else if (e.code === 'ArrowRight') {
        handleNext();
      } else if (e.code === 'ArrowLeft') {
        handlePrev();
      } else if (isFlipped) {
        if (e.key === '1') handleRate('again');
        if (e.key === '2') handleRate('hard');
        if (e.key === '3') handleRate('good');
        if (e.key === '4') handleRate('easy');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFlipped, currentCard]);

  // Mastery summary
  const masteryCounts = {
    new: 0,
    learning: 0,
    review: 0,
    mastered: 0
  };

  FLASHCARDS_DATA.forEach((card) => {
    const status = stats.cardMastery[card.id]?.mastery || 'new';
    masteryCounts[status]++;
  });

  const cardStatus = currentCard ? stats.cardMastery[currentCard.id]?.mastery || 'new' : 'new';

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Top Header & Stats */}
      <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 flex items-center gap-2">
            <BookMarked className="w-5 h-5 text-rose-600" />
            <span>JLPT N5 Vocabulary Flashcards</span>
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Spaced Repetition System (SRS) • Flip to reveal meaning & example sentences
          </p>
        </div>

        {/* SRS Mastery Distribution Badges */}
        <div className="flex items-center gap-2 text-xs flex-wrap">
          <span className="px-2.5 py-1 rounded-lg bg-stone-100 text-stone-700 font-medium">
            New: {masteryCounts.new}
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 font-medium">
            Learning: {masteryCounts.learning}
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-sky-50 text-sky-800 border border-sky-200 font-medium">
            Review: {masteryCounts.review}
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium">
            Mastered: {masteryCounts.mastered}
          </span>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setSelectedCategory(cat.id);
              setCurrentIndex(0);
            }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
              selectedCategory === cat.id
                ? 'bg-rose-700 text-white shadow-xs'
                : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Interactive 3D Flip Flashcard */}
      {currentCard ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-stone-500 font-medium px-1">
            <span>
              Card {currentIndex + 1} of {filteredCards.length}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[11px] uppercase tracking-wider font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-100">
                Status: {cardStatus}
              </span>
              <button
                onClick={handleShuffle}
                className="p-1 text-stone-500 hover:text-stone-900 transition"
                title="Shuffle cards"
              >
                <Shuffle className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Flashcard Box with Flip */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="cursor-pointer min-h-[320px] sm:min-h-[360px] bg-white rounded-3xl border-2 border-stone-200 hover:border-stone-300 shadow-sm p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative group"
          >
            {/* Top Bar inside Card */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
                {currentCard.partOfSpeech} • {currentCard.category.replace('_', ' ')}
              </span>

              <div className="flex items-center gap-2">
                <button
                  id={`flashcard-audio-word-${currentCard.id}`}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    playJapaneseAudio(currentCard.kanji || currentCard.kana, stats.preferences.audioSpeed);
                  }}
                  className={`p-2 rounded-xl transition flex items-center gap-1.5 cursor-pointer ${
                    activeAudioText === (currentCard.kanji || currentCard.kana).replace(/[\(\[\{][^()]*[\)\]\}]/g, '').trim()
                      ? 'bg-rose-700 text-white shadow-xs ring-2 ring-rose-300 scale-105'
                      : 'bg-stone-100 hover:bg-rose-50 text-stone-700 hover:text-rose-700'
                  }`}
                  title="Play pronunciation audio"
                >
                  <Volume2 className={`w-4 h-4 ${activeAudioText === (currentCard.kanji || currentCard.kana).replace(/[\(\[\{][^()]*[\)\]\}]/g, '').trim() ? 'animate-bounce' : ''}`} />
                  {activeAudioText === (currentCard.kanji || currentCard.kana).replace(/[\(\[\{][^()]*[\)\]\}]/g, '').trim() && (
                    <span className="text-[10px] font-bold">Playing</span>
                  )}
                </button>
                <span className="text-[10px] text-stone-400 flex items-center gap-1 font-mono">
                  <RotateCw className="w-3 h-3" /> Space to flip
                </span>
              </div>
            </div>

            {/* Middle Card Content */}
            {!isFlipped ? (
              /* Front View */
              <div className="text-center py-8 space-y-4">
                {currentCard.kanji && currentCard.kanji !== currentCard.kana ? (
                  <>
                    <div className="text-4xl sm:text-6xl font-bold text-stone-900 tracking-wider">
                      {currentCard.kanji}
                    </div>
                    <div className="text-xl sm:text-2xl font-medium text-stone-500">
                      {currentCard.kana}
                    </div>
                  </>
                ) : (
                  <div className="text-4xl sm:text-6xl font-bold text-stone-900 tracking-wider">
                    {currentCard.kana}
                  </div>
                )}

                {stats.preferences.showRomaji && (
                  <div className="text-sm font-mono text-rose-700 pt-1">
                    {currentCard.romaji}
                  </div>
                )}

                <p className="text-xs text-stone-400 italic pt-3">
                  (Click card or press Space to reveal English meaning & sentence)
                </p>
              </div>
            ) : (
              /* Back View */
              <div className="py-4 space-y-5 animate-in fade-in duration-200">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-stone-900">
                    {currentCard.english}
                  </div>
                  <div className="text-xs font-semibold text-rose-700 mt-0.5">
                    {currentCard.kanji ? `${currentCard.kanji} (${currentCard.kana})` : currentCard.kana}
                  </div>
                </div>

                {/* Example sentence box */}
                <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200/80 space-y-2 text-left">
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <div className="text-base sm:text-lg font-bold text-stone-900">
                        {currentCard.exampleJapanese}
                      </div>
                      <div className="text-xs text-stone-500">
                        Furigana: {currentCard.exampleFurigana}
                      </div>
                      {stats.preferences.showRomaji && (
                        <div className="text-xs text-rose-700 font-mono">
                          Romaji: {currentCard.exampleRomaji}
                        </div>
                      )}
                    </div>

                    <button
                      id={`flashcard-example-audio-${currentCard.id}`}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        playJapaneseAudio(currentCard.exampleJapanese, stats.preferences.audioSpeed);
                      }}
                      className={`p-2 rounded-xl border transition shrink-0 flex items-center gap-1.5 cursor-pointer ${
                        activeAudioText === currentCard.exampleJapanese.replace(/[\(\[\{][^()]*[\)\]\}]/g, '').trim()
                          ? 'bg-rose-700 text-white border-rose-700 shadow-xs ring-2 ring-rose-300 scale-105'
                          : 'bg-white border-stone-200 hover:bg-rose-50 text-stone-700 hover:text-rose-700'
                      }`}
                      title="Play example sentence audio"
                    >
                      <Volume2 className={`w-3.5 h-3.5 ${activeAudioText === currentCard.exampleJapanese.replace(/[\(\[\{][^()]*[\)\]\}]/g, '').trim() ? 'animate-bounce' : ''}`} />
                      {activeAudioText === currentCard.exampleJapanese.replace(/[\(\[\{][^()]*[\)\]\}]/g, '').trim() && (
                        <span className="text-[10px] font-bold">Playing</span>
                      )}
                    </button>
                  </div>

                  <div className="text-xs sm:text-sm font-medium text-stone-700 border-t border-stone-200/60 pt-2">
                    {currentCard.exampleEnglish}
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Controls */}
            <div className="flex items-center justify-between text-xs text-stone-400 pt-2 border-t border-stone-100">
              <span className="font-semibold text-rose-700">JLPT {currentCard.jlptLevel}</span>
              <span>Tap to flip</span>
            </div>
          </div>

          {/* Card Navigation & SRS Rating Bar */}
          {isFlipped ? (
            /* SRS Rating Buttons when Flipped */
            <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs space-y-2">
              <p className="text-xs font-semibold text-stone-600 text-center">
                How well did you recall this word? (Adjusts SRS schedule)
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  onClick={() => handleRate('again')}
                  className="py-2.5 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-900 border border-rose-200 text-xs font-bold transition flex flex-col items-center gap-0.5"
                >
                  <span>Again [1]</span>
                  <span className="text-[10px] text-rose-600 font-normal">Repeat today</span>
                </button>
                <button
                  onClick={() => handleRate('hard')}
                  className="py-2.5 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold transition flex flex-col items-center gap-0.5"
                >
                  <span>Hard [2]</span>
                  <span className="text-[10px] text-amber-600 font-normal">Review in 1-2d</span>
                </button>
                <button
                  onClick={() => handleRate('good')}
                  className="py-2.5 px-3 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-900 border border-sky-200 text-xs font-bold transition flex flex-col items-center gap-0.5"
                >
                  <span>Good [3]</span>
                  <span className="text-[10px] text-sky-600 font-normal">Review in 4d</span>
                </button>
                <button
                  onClick={() => handleRate('easy')}
                  className="py-2.5 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 text-xs font-bold transition flex flex-col items-center gap-0.5"
                >
                  <span>Easy [4]</span>
                  <span className="text-[10px] text-emerald-600 font-normal">Mastered (+8 XP)</span>
                </button>
              </div>
            </div>
          ) : (
            /* Next / Previous arrows when not flipped */
            <div className="flex items-center justify-between gap-4">
              <button
                onClick={handlePrev}
                className="flex items-center gap-1 px-4 py-2.5 rounded-xl bg-white border border-stone-200 text-stone-700 text-xs font-bold hover:bg-stone-50 transition shadow-xs"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <button
                onClick={() => setIsFlipped(true)}
                className="flex-1 py-2.5 rounded-xl bg-stone-900 text-white text-xs font-bold hover:bg-stone-800 transition shadow-xs"
              >
                Flip Card (Reveal Meaning)
              </button>

              <button
                onClick={handleNext}
                className="flex items-center gap-1 px-4 py-2.5 rounded-xl bg-white border border-stone-200 text-stone-700 text-xs font-bold hover:bg-stone-50 transition shadow-xs"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white p-8 rounded-2xl border border-stone-200 text-center">
          <p className="text-stone-500 text-sm">No flashcards found in this category.</p>
        </div>
      )}
    </div>
  );
};
