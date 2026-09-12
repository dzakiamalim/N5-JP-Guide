import React, { useState, useEffect } from 'react';
import { Volume2, CheckCircle2, AlertCircle, Sparkles, ArrowRight, ArrowLeft, BookOpen, Check } from 'lucide-react';
import { LESSONS } from '../data/lessonsData';
import { Lesson, UserStats } from '../types';
import { playJapaneseAudio, subscribeAudioState } from '../utils/audio';

interface AudioButtonProps {
  id: string;
  text: string;
  speed: number;
  label?: string;
  className?: string;
}

export const LessonAudioButton: React.FC<AudioButtonProps> = ({
  id,
  text,
  speed,
  label,
  className = ''
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const clean = text.replace(/[\(\[\{][^()]*[\)\]\}]/g, '').trim();

  useEffect(() => {
    return subscribeAudioState((playingText) => {
      setIsPlaying(playingText === clean);
    });
  }, [clean]);

  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await playJapaneseAudio(text, speed);
  };

  return (
    <button
      id={id}
      type="button"
      onClick={handleClick}
      className={`group relative inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 shrink-0 select-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-rose-500/50 ${
        isPlaying
          ? 'bg-rose-700 text-white shadow-md shadow-rose-200 ring-2 ring-rose-400 border border-rose-700 scale-105'
          : 'bg-white hover:bg-rose-50 text-stone-700 hover:text-rose-700 border border-stone-200 hover:border-rose-300 shadow-xs hover:shadow-sm active:scale-95'
      } ${className}`}
      title={isPlaying ? 'Playing Japanese audio pronunciation...' : `Play pronunciation audio: ${clean}`}
      aria-label={isPlaying ? 'Playing audio' : 'Play native Japanese audio'}
    >
      {isPlaying ? (
        <>
          <div className="flex items-center gap-0.5 h-3.5 px-0.5" aria-hidden="true">
            <span className="w-1 h-3 bg-white rounded-full animate-bounce [animation-delay:-0.3s]" />
            <span className="w-1 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]" />
            <span className="w-1 h-3.5 bg-white rounded-full animate-bounce" />
          </div>
          <span className="text-[11px] font-bold text-white tracking-tight">Playing</span>
        </>
      ) : (
        <>
          <Volume2 className="w-4 h-4 text-rose-600 transition-transform group-hover:scale-110" />
          <span className="text-[11px] font-medium">{label || 'Listen'}</span>
        </>
      )}
    </button>
  );
};

interface LessonsViewProps {
  stats: UserStats;
  selectedLessonId: string;
  onSelectLessonId: (id: string) => void;
  onCompleteLesson: (lessonId: string) => void;
}

export const LessonsView: React.FC<LessonsViewProps> = ({
  stats,
  selectedLessonId,
  onSelectLessonId,
  onCompleteLesson
}) => {
  const currentLesson = LESSONS.find((l) => l.id === selectedLessonId) || LESSONS[0];

  // Quiz state for current lesson
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [showQuizResult, setShowQuizResult] = useState(false);

  const isCompleted = stats.completedLessonIds.includes(currentLesson.id);

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    setQuizAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleCheckQuiz = () => {
    setShowQuizResult(true);
    // If all questions are answered and correct, mark complete
    const allAnswered = currentLesson.quiz.every((q) => quizAnswers[q.id] !== undefined);
    const allCorrect = currentLesson.quiz.every((q) => quizAnswers[q.id] === q.correctIndex);
    if (allAnswered && allCorrect) {
      onCompleteLesson(currentLesson.id);
    }
  };

  const currentIndex = LESSONS.findIndex((l) => l.id === currentLesson.id);
  const nextLesson = currentIndex < LESSONS.length - 1 ? LESSONS[currentIndex + 1] : null;
  const prevLesson = currentIndex > 0 ? LESSONS[currentIndex - 1] : null;

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Lesson Navigation Header */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex items-center gap-2 overflow-x-auto scrollbar-none">
        {LESSONS.map((lesson, idx) => {
          const isSelected = lesson.id === currentLesson.id;
          const done = stats.completedLessonIds.includes(lesson.id);
          return (
            <button
              key={lesson.id}
              onClick={() => {
                onSelectLessonId(lesson.id);
                setQuizAnswers({});
                setShowQuizResult(false);
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-rose-700 text-white shadow-xs'
                  : 'bg-stone-50 text-stone-700 hover:bg-stone-100 border border-stone-200/80'
              }`}
            >
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold bg-black/10">
                {idx + 1}
              </span>
              <span>{lesson.title.split(':')[0]}</span>
              {done && (
                <Check className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-emerald-600'}`} />
              )}
            </button>
          );
        })}
      </div>

      {/* Active Lesson Content */}
      <article className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-8 space-y-8">
        {/* Lesson Title & Metadata */}
        <header className="border-b border-stone-100 pb-6 space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-200">
                Phase {currentLesson.phaseId}
              </span>
              <span className="text-xs text-stone-500 font-medium">
                ~{currentLesson.estimatedMinutes} minutes
              </span>
            </div>

            {isCompleted && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Lesson Completed</span>
              </div>
            )}
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900">
            {currentLesson.title}
          </h2>
          <p className="text-stone-500 text-sm font-medium">{currentLesson.subtitle}</p>
          <p className="text-stone-600 text-sm leading-relaxed pt-1">{currentLesson.overview}</p>
        </header>

        {/* Lesson Sections */}
        <div className="space-y-8">
          {currentLesson.sections.map((section, sIdx) => (
            <section key={sIdx} className="space-y-4">
              <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-stone-100 text-stone-700 text-xs flex items-center justify-center font-bold">
                  {sIdx + 1}
                </span>
                <span>{section.title}</span>
              </h3>

              <p className="text-sm text-stone-600 leading-relaxed whitespace-pre-line">
                {section.explanation}
              </p>

              {/* Key Rule Box */}
              {section.keyRule && (
                <div className="bg-stone-50 border-l-4 border-rose-600 p-3.5 rounded-r-xl text-xs sm:text-sm font-medium text-stone-800">
                  <span className="font-bold text-rose-700 block mb-0.5">Key Grammatical Rule:</span>
                  <span>{section.keyRule}</span>
                </div>
              )}

              {/* Sentence Examples */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                  Interactive Examples (Listen & Dissect):
                </h4>

                <div className="grid grid-cols-1 gap-3">
                  {section.examples.map((ex, exIdx) => (
                    <div
                      key={exIdx}
                      className="bg-stone-50/70 hover:bg-stone-50 transition border border-stone-200/80 rounded-xl p-4 space-y-2.5"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          {/* Japanese Text */}
                          <div className="text-lg sm:text-xl font-bold text-stone-900 tracking-wide">
                            {ex.japanese}
                          </div>

                          {/* Furigana Reading */}
                          <div className="text-xs font-medium text-stone-500">
                            Reading: {ex.reading}
                          </div>

                          {/* Romaji (Toggleable) */}
                          {stats.preferences.showRomaji && (
                            <div className="text-xs text-rose-700 font-mono">
                              Romaji: {ex.romaji}
                            </div>
                          )}
                        </div>

                        {/* Audio Playback Button */}
                        <LessonAudioButton
                          id={`lesson-audio-btn-${sIdx}-${exIdx}`}
                          text={ex.japanese}
                          speed={stats.preferences.audioSpeed}
                          label="Listen"
                        />
                      </div>

                      {/* English Meaning */}
                      <div className="text-xs sm:text-sm font-semibold text-stone-800 border-t border-stone-200/60 pt-2">
                        {ex.english}
                      </div>

                      {/* Token Breakdown */}
                      {ex.breakdown && (
                        <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px]">
                          <span className="text-stone-400 text-[10px] font-semibold">Breakdown:</span>
                          {ex.breakdown.map((token, tIdx) => (
                            <span
                              key={tIdx}
                              className="px-2 py-0.5 rounded-md bg-white border border-stone-200"
                            >
                              <span className={token.color || 'text-stone-900 font-medium'}>
                                {token.part}
                              </span>{' '}
                              <span className="text-stone-400">({token.role})</span>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Practical Tip */}
              {section.tip && (
                <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-semibold">Sensei Pro-Tip: </strong>
                    <span>{section.tip}</span>
                  </div>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Checkpoint Quiz */}
        <section className="border-t border-stone-200 pt-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-rose-600" />
                <span>Checkpoint Quiz: Test Your Understanding</span>
              </h3>
              <p className="text-xs text-stone-500">
                Answer all questions to mark this lesson as completed!
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {currentLesson.quiz.map((q, qIdx) => {
              const selectedOpt = quizAnswers[q.id];
              const isAnswered = selectedOpt !== undefined;
              const isCorrect = selectedOpt === q.correctIndex;

              return (
                <div
                  key={q.id}
                  className="bg-stone-50 rounded-xl p-5 border border-stone-200 space-y-3"
                >
                  <p className="text-xs sm:text-sm font-bold text-stone-900">
                    {qIdx + 1}. {q.question}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {q.options.map((opt, optIdx) => {
                      const isThisSelected = selectedOpt === optIdx;
                      let btnStyle =
                        'bg-white text-stone-700 border-stone-200 hover:bg-stone-100 hover:border-stone-300';

                      if (showQuizResult) {
                        if (optIdx === q.correctIndex) {
                          btnStyle = 'bg-emerald-50 text-emerald-900 border-emerald-400 font-bold';
                        } else if (isThisSelected && !isCorrect) {
                          btnStyle = 'bg-rose-50 text-rose-900 border-rose-300 line-through';
                        }
                      } else if (isThisSelected) {
                        btnStyle = 'bg-stone-900 text-white border-stone-900 font-bold';
                      }

                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectOption(q.id, optIdx)}
                          className={`text-left p-3 rounded-xl border text-xs transition ${btnStyle}`}
                        >
                          <span className="font-semibold mr-1.5">{String.fromCharCode(65 + optIdx)}.</span>
                          <span>{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {showQuizResult && (
                    <div
                      className={`text-xs p-3 rounded-lg border flex items-start gap-2 ${
                        isCorrect
                          ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                          : 'bg-rose-50 text-rose-900 border-rose-200'
                      }`}
                    >
                      {isCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <span className="font-bold">{isCorrect ? 'Correct!' : 'Incorrect.'} </span>
                        <span>{q.explanation}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={handleCheckQuiz}
              className="px-5 py-2.5 rounded-xl bg-stone-900 text-white text-xs font-bold hover:bg-stone-800 transition shadow-sm"
            >
              Verify Quiz Answers
            </button>

            {nextLesson && (
              <button
                onClick={() => {
                  onSelectLessonId(nextLesson.id);
                  setQuizAnswers({});
                  setShowQuizResult(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-500 transition shadow-sm"
              >
                <span>Next: {nextLesson.title.split(':')[0]}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </section>
      </article>
    </div>
  );
};
