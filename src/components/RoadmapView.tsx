import React, { useState } from 'react';
import { CheckCircle2, Circle, Clock, Compass, Target, Sparkles, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import { N5_ROADMAP_PHASES, BEGINNER_GUIDE_PRINCIPLES } from '../data/roadmapData';
import { UserStats } from '../types';

interface RoadmapViewProps {
  stats: UserStats;
  onSelectLesson: (lessonId: string) => void;
  onNavigateToTab: (tab: 'lessons' | 'flashcards' | 'drills' | 'kana') => void;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({
  stats,
  onSelectLesson,
  onNavigateToTab
}) => {
  const [checkedMilestones, setCheckedMilestones] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('n5_checked_milestones');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const toggleMilestone = (key: string) => {
    setCheckedMilestones((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      try {
        localStorage.setItem('n5_checked_milestones', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const totalMilestones = N5_ROADMAP_PHASES.reduce((acc, p) => acc + p.milestoneChecklist.length, 0);
  const completedMilestones = Object.values(checkedMilestones).filter(Boolean).length;
  const progressPercent = Math.round((completedMilestones / totalMilestones) * 100);

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Hero Overview & Progress */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm relative overflow-hidden">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-800 text-xs font-semibold border border-rose-200">
            <Compass className="w-3.5 h-3.5" />
            <span>Complete Beginner to JLPT N5 Master Plan</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900">
            Your 90-Day Step-by-Step N5 Roadmap
          </h2>

          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Japanese differs fundamentally from European languages: it uses an <strong>SOV (Subject-Object-Verb)</strong> structure, postpositional particles, and distinct phonetic scripts. This roadmap breaks your journey into <strong>6 progressive phases</strong> so you build rock-solid foundations without feeling overwhelmed.
          </p>

          {/* Overall Roadmap Progress Bar */}
          <div className="pt-2">
            <div className="flex items-center justify-between text-xs font-semibold text-stone-700 mb-2">
              <span className="flex items-center gap-1.5">
                <Target className="w-4 h-4 text-rose-600" />
                <span>Roadmap Readiness Checkpoints</span>
              </span>
              <span>{completedMilestones} of {totalMilestones} Milestones ({progressPercent}%)</span>
            </div>
            <div className="w-full bg-stone-100 rounded-full h-2.5 overflow-hidden border border-stone-200">
              <div
                className="bg-rose-600 h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4 Golden Principles for Beginners */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-rose-600" />
            <span>The 4 Golden Principles for Complete Beginners</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {BEGINNER_GUIDE_PRINCIPLES.map((principle) => (
            <div
              key={principle.id}
              className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs space-y-2"
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-stone-100 text-stone-700 font-bold text-xs flex items-center justify-center">
                  ✓
                </div>
                <h4 className="font-bold text-stone-900 text-sm">{principle.title}</h4>
              </div>
              <p className="text-xs font-semibold text-stone-700">{principle.shortDesc}</p>
              <p className="text-xs text-stone-500 leading-relaxed">{principle.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6 Phases Timeline */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-stone-900">The 6 Learning Phases</h3>
            <p className="text-xs text-stone-500">
              Follow sequentially from Phase 1 through Phase 6 for optimal retention.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {N5_ROADMAP_PHASES.map((phase) => {
            return (
              <div
                key={phase.id}
                id={`roadmap-phase-${phase.id}`}
                className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs hover:border-stone-300 transition"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-stone-900 text-white flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">
                      {phase.phaseNumber}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-base sm:text-lg font-bold text-stone-900">
                          {phase.title}
                        </h4>
                        <span className="text-xs font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-100">
                          {phase.japaneseTitle}
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 flex items-center gap-1.5 mt-0.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Recommended Duration: {phase.targetDuration}</span>
                      </p>
                    </div>
                  </div>

                  {/* Actions for this phase */}
                  <div className="flex items-center gap-2 self-start sm:self-center">
                    {phase.lessons.length > 0 && (
                      <button
                        onClick={() => onSelectLesson(phase.lessons[0])}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-900 text-white text-xs font-medium hover:bg-stone-800 transition"
                      >
                        <span>Open Lesson</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                    {phase.id === 1 && (
                      <button
                        onClick={() => onNavigateToTab('kana')}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 text-rose-800 border border-rose-200 text-xs font-medium hover:bg-rose-100 transition"
                      >
                        <span>Writing Systems & Kana</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Body Details */}
                <div className="pt-4 space-y-4">
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {phase.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                    {/* Core Concepts */}
                    <div className="bg-stone-50 rounded-xl p-4 border border-stone-200/80">
                      <h5 className="text-xs font-bold text-stone-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                        <span>Core Curriculum Targets</span>
                      </h5>
                      <ul className="space-y-1.5 text-xs text-stone-600">
                        {phase.coreConcepts.map((concept, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-rose-600 font-bold mt-0.5">•</span>
                            <span>{concept}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Milestone Checklist */}
                    <div className="bg-stone-50 rounded-xl p-4 border border-stone-200/80">
                      <h5 className="text-xs font-bold text-stone-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Target className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Mastery Checklist (Tap to check)</span>
                      </h5>
                      <div className="space-y-2">
                        {phase.milestoneChecklist.map((item, idx) => {
                          const key = `p${phase.id}_m${idx}`;
                          const isChecked = !!checkedMilestones[key];
                          return (
                            <button
                              key={idx}
                              onClick={() => toggleMilestone(key)}
                              className="w-full flex items-start gap-2 text-left p-1.5 rounded-lg hover:bg-white transition text-xs group"
                            >
                              {isChecked ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 fill-emerald-100" />
                              ) : (
                                <Circle className="w-4 h-4 text-stone-400 group-hover:text-stone-600 shrink-0 mt-0.5" />
                              )}
                              <span className={isChecked ? 'line-through text-stone-400' : 'text-stone-700'}>
                                {item}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* JLPT N5 Exam Insight */}
                  <div className="text-xs bg-amber-50/70 border border-amber-200/80 rounded-lg p-3 text-amber-900 flex items-start gap-2">
                    <HelpCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-semibold">JLPT N5 Exam Context: </strong>
                      <span>{phase.n5Relevance}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* JLPT N5 Official Exam Benchmark Card */}
      <section className="bg-stone-900 text-white rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center font-bold">
            N5
          </div>
          <div>
            <h4 className="text-lg sm:text-xl font-bold">JLPT N5 Passing Criteria & Structure</h4>
            <p className="text-xs text-stone-400">What it takes to pass the official test</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs pt-2">
          <div className="bg-stone-800/80 rounded-xl p-4 border border-stone-700">
            <span className="text-stone-400 block mb-1">Vocabulary & Grammar</span>
            <span className="text-lg font-bold text-white block">~800 Words</span>
            <span className="text-stone-400">~100 Kanji, particles & verb matrices</span>
          </div>

          <div className="bg-stone-800/80 rounded-xl p-4 border border-stone-700">
            <span className="text-stone-400 block mb-1">Scoring Target</span>
            <span className="text-lg font-bold text-rose-400 block">80 / 180 Points</span>
            <span className="text-stone-400">Plus 19/60 min sectional threshold</span>
          </div>

          <div className="bg-stone-800/80 rounded-xl p-4 border border-stone-700">
            <span className="text-stone-400 block mb-1">Estimated Study Hours</span>
            <span className="text-lg font-bold text-emerald-400 block">100 - 150 Hours</span>
            <span className="text-stone-400">~45 mins/day for 3 to 4 months</span>
          </div>
        </div>

        <div className="pt-2 flex flex-wrap items-center gap-3">
          <button
            onClick={() => onNavigateToTab('lessons')}
            className="px-4 py-2 rounded-xl bg-rose-600 text-white font-semibold text-xs hover:bg-rose-500 transition shadow-sm"
          >
            Start Interactive Lessons Now
          </button>
          <button
            onClick={() => onNavigateToTab('drills')}
            className="px-4 py-2 rounded-xl bg-stone-800 text-stone-300 font-semibold text-xs hover:bg-stone-700 transition"
          >
            Practice Daily Grammar Drills
          </button>
        </div>
      </section>
    </div>
  );
};
