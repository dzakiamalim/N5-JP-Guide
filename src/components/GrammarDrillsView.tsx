import React, { useState, useEffect } from 'react';
import { CheckCircle2, AlertCircle, Volume2, Sparkles, RefreshCw, Layers, ArrowRight, HelpCircle } from 'lucide-react';
import { GRAMMAR_DRILLS } from '../data/grammarDrillsData';
import { GrammarDrillQuestion, UserStats } from '../types';
import { playJapaneseAudio, subscribeAudioState } from '../utils/audio';

interface GrammarDrillsViewProps {
  stats: UserStats;
  onAddXp: (amount: number) => void;
}

export const GrammarDrillsView: React.FC<GrammarDrillsViewProps> = ({ stats, onAddXp }) => {
  const [filterType, setFilterType] = useState<'all' | 'particle' | 'conjugation' | 'sentence_builder'>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [activeAudioText, setActiveAudioText] = useState<string | null>(null);

  useEffect(() => {
    return subscribeAudioState((text) => {
      setActiveAudioText(text);
    });
  }, []);

  // For sentence builder tile arrangement
  const [assembledTiles, setAssembledTiles] = useState<string[]>([]);

  const filteredDrills = GRAMMAR_DRILLS.filter((d) =>
    filterType === 'all' ? true : d.type === filterType
  );

  const currentDrill: GrammarDrillQuestion | undefined = filteredDrills[currentIndex] || filteredDrills[0];

  const handleSelectOption = (opt: string) => {
    if (isAnswerChecked) return;
    setSelectedAnswer(opt);
  };

  const handleTileClick = (word: string) => {
    if (isAnswerChecked) return;
    if (assembledTiles.includes(word)) {
      setAssembledTiles(assembledTiles.filter((w) => w !== word));
    } else {
      setAssembledTiles([...assembledTiles, word]);
    }
  };

  const handleCheckAnswer = () => {
    if (!currentDrill) return;

    if (currentDrill.type === 'sentence_builder') {
      const userSentence = assembledTiles.join('');
      setSelectedAnswer(userSentence);
    }

    setIsAnswerChecked(true);

    const isCorrect =
      currentDrill.type === 'sentence_builder'
        ? assembledTiles.join('') === currentDrill.correctAnswer
        : selectedAnswer === currentDrill.correctAnswer;

    if (isCorrect) {
      onAddXp(10);
    }
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setIsAnswerChecked(false);
    setAssembledTiles([]);
    setCurrentIndex((prev) => (prev + 1) % filteredDrills.length);
  };

  const isCurrentCorrect =
    currentDrill &&
    (currentDrill.type === 'sentence_builder'
      ? assembledTiles.join('') === currentDrill.correctAnswer
      : selectedAnswer === currentDrill.correctAnswer);

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-rose-600" />
            <span>Daily N5 Grammar Drills</span>
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Test particles, verb conjugations, and sentence construction daily
          </p>
        </div>

        {/* Category switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-xl border border-stone-200 text-xs font-semibold">
          <button
            onClick={() => {
              setFilterType('all');
              setCurrentIndex(0);
              setIsAnswerChecked(false);
              setSelectedAnswer(null);
              setAssembledTiles([]);
            }}
            className={`px-3 py-1.5 rounded-lg transition ${
              filterType === 'all' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            All
          </button>
          <button
            onClick={() => {
              setFilterType('particle');
              setCurrentIndex(0);
              setIsAnswerChecked(false);
              setSelectedAnswer(null);
              setAssembledTiles([]);
            }}
            className={`px-3 py-1.5 rounded-lg transition ${
              filterType === 'particle' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Particles
          </button>
          <button
            onClick={() => {
              setFilterType('conjugation');
              setCurrentIndex(0);
              setIsAnswerChecked(false);
              setSelectedAnswer(null);
              setAssembledTiles([]);
            }}
            className={`px-3 py-1.5 rounded-lg transition ${
              filterType === 'conjugation' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Conjugations
          </button>
          <button
            onClick={() => {
              setFilterType('sentence_builder');
              setCurrentIndex(0);
              setIsAnswerChecked(false);
              setSelectedAnswer(null);
              setAssembledTiles([]);
            }}
            className={`px-3 py-1.5 rounded-lg transition ${
              filterType === 'sentence_builder' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Scrambler
          </button>
        </div>
      </div>

      {/* Drill Question Card */}
      {currentDrill && (
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-8 space-y-6">
          {/* Progress & Type Tag */}
          <div className="flex items-center justify-between text-xs text-stone-500 font-semibold border-b border-stone-100 pb-4">
            <span className="px-2.5 py-1 rounded-full bg-rose-50 text-rose-800 border border-rose-100 uppercase tracking-wider text-[10px] font-bold">
              {currentDrill.type.replace('_', ' ')}
            </span>
            <span>
              Drill {currentIndex + 1} of {filteredDrills.length}
            </span>
          </div>

          {/* Prompt */}
          <div className="space-y-3">
            <h3 className="text-base sm:text-lg font-bold text-stone-900">
              {currentDrill.prompt}
            </h3>

            {/* Context Japanese if particle drill */}
            {currentDrill.contextJapanese && (
              <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 flex items-center justify-between gap-3">
                <div className="text-xl sm:text-2xl font-bold text-stone-900 tracking-wide">
                  {currentDrill.contextJapanese}
                </div>
                <button
                  id={`drill-audio-btn-${currentDrill.id}`}
                  type="button"
                  onClick={() => playJapaneseAudio(currentDrill.contextJapanese || '', stats.preferences.audioSpeed)}
                  className={`px-3 py-2 rounded-xl border transition shadow-xs shrink-0 flex items-center gap-1.5 cursor-pointer ${
                    activeAudioText === (currentDrill.contextJapanese || '').replace(/[\(\[\{][^()]*[\)\]\}]/g, '').trim()
                      ? 'bg-rose-700 text-white border-rose-700 ring-2 ring-rose-300 scale-105'
                      : 'bg-white border-stone-200 text-stone-700 hover:text-rose-700 hover:bg-rose-50'
                  }`}
                  title="Play Japanese audio hint"
                >
                  <Volume2 className={`w-4 h-4 ${activeAudioText === (currentDrill.contextJapanese || '').replace(/[\(\[\{][^()]*[\)\]\}]/g, '').trim() ? 'animate-bounce' : ''}`} />
                  <span className="text-xs font-semibold">
                    {activeAudioText === (currentDrill.contextJapanese || '').replace(/[\(\[\{][^()]*[\)\]\}]/g, '').trim()
                      ? 'Playing...'
                      : 'Listen'}
                  </span>
                </button>
              </div>
            )}

            {/* Target Word if conjugation */}
            {currentDrill.targetWord && (
              <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 space-y-1">
                <div className="text-xs text-stone-500 font-medium">
                  Target: {currentDrill.conjugationType}
                </div>
                <div className="text-2xl font-bold text-stone-900">
                  {currentDrill.targetWord}
                </div>
              </div>
            )}
          </div>

          {/* Interactive Question Answering Area */}
          {currentDrill.type === 'sentence_builder' ? (
            /* Sentence Builder Tiles */
            <div className="space-y-4">
              <div className="min-h-[64px] p-4 rounded-xl border-2 border-dashed border-stone-300 bg-stone-50 flex items-center flex-wrap gap-2">
                {assembledTiles.length === 0 ? (
                  <span className="text-stone-400 text-xs italic">
                    Tap the word tiles below in the correct grammatical order...
                  </span>
                ) : (
                  assembledTiles.map((tile, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleTileClick(tile)}
                      className="px-3.5 py-1.5 rounded-lg bg-rose-700 text-white font-bold text-sm shadow-xs hover:bg-rose-800 transition"
                    >
                      {tile}
                    </button>
                  ))
                )}
              </div>

              {/* Scramble Word Bank */}
              <div className="space-y-1.5">
                <span className="text-xs text-stone-400 font-semibold uppercase tracking-wider">
                  Available Tiles:
                </span>
                <div className="flex flex-wrap gap-2">
                  {currentDrill.scrambleWords?.map((word, idx) => {
                    const isUsed = assembledTiles.includes(word);
                    return (
                      <button
                        key={idx}
                        disabled={isUsed || isAnswerChecked}
                        onClick={() => handleTileClick(word)}
                        className={`px-4 py-2 rounded-xl text-sm font-bold border transition ${
                          isUsed
                            ? 'opacity-30 bg-stone-100 border-stone-200 text-stone-400 cursor-not-allowed'
                            : 'bg-white text-stone-800 border-stone-300 hover:bg-stone-50 hover:border-stone-400 shadow-xs'
                        }`}
                      >
                        {word}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            /* Multiple Choice Options */
            <div className="grid grid-cols-2 gap-3">
              {currentDrill.options?.map((opt, idx) => {
                const isSelected = selectedAnswer === opt;
                let style = 'bg-stone-50 text-stone-800 border-stone-200 hover:bg-stone-100';

                if (isAnswerChecked) {
                  if (opt === currentDrill.correctAnswer) {
                    style = 'bg-emerald-50 text-emerald-900 border-emerald-400 font-bold';
                  } else if (isSelected && !isCurrentCorrect) {
                    style = 'bg-rose-50 text-rose-900 border-rose-300 line-through';
                  }
                } else if (isSelected) {
                  style = 'bg-stone-900 text-white border-stone-900 font-bold';
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswerChecked}
                    onClick={() => handleSelectOption(opt)}
                    className={`p-4 rounded-xl border text-sm sm:text-base font-bold transition text-center shadow-xs ${style}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          )}

          {/* Hint / Explanation banner */}
          {isAnswerChecked && (
            <div
              className={`p-4 rounded-xl border space-y-2 animate-in fade-in ${
                isCurrentCorrect
                  ? 'bg-emerald-50 text-emerald-950 border-emerald-200'
                  : 'bg-rose-50 text-rose-950 border-rose-200'
              }`}
            >
              <div className="flex items-center gap-2">
                {isCurrentCorrect ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                )}
                <span className="font-bold text-sm">
                  {isCurrentCorrect ? 'Correct! (+10 XP)' : 'Not quite right.'}
                </span>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed">{currentDrill.explanation}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-2">
            {!isAnswerChecked ? (
              <button
                disabled={
                  currentDrill.type === 'sentence_builder'
                    ? assembledTiles.length === 0
                    : selectedAnswer === null
                }
                onClick={handleCheckAnswer}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-stone-900 text-white text-xs font-bold hover:bg-stone-800 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-sm"
              >
                Check Answer
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-500 transition shadow-sm"
              >
                <span>Next Drill</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
