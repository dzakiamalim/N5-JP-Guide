export interface KanaItem {
  id: string;
  kana: string;
  romaji: string;
  type: 'hiragana' | 'katakana';
  group: 'vowel' | 'k' | 's' | 't' | 'n' | 'h' | 'm' | 'y' | 'r' | 'w' | 'dakuten' | 'combo';
  mnemonic?: string;
  audioText?: string;
}

export interface LessonSection {
  title: string;
  explanation: string;
  keyRule?: string;
  examples: {
    japanese: string;
    reading: string;
    romaji: string;
    english: string;
    breakdown?: { part: string; role: string; color?: string }[];
  }[];
  tip?: string;
}

export interface LessonQuizQuestion {
  id: string;
  question: string;
  japanesePrompt?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  phaseId: number;
  title: string;
  subtitle: string;
  estimatedMinutes: number;
  level: 'N5';
  tags: string[];
  overview: string;
  sections: LessonSection[];
  quiz: LessonQuizQuestion[];
}

export interface RoadmapPhase {
  id: number;
  phaseNumber: number;
  title: string;
  japaneseTitle: string;
  targetDuration: string;
  description: string;
  coreConcepts: string[];
  n5Relevance: string;
  lessons: string[]; // lesson ids
  milestoneChecklist: string[];
}

export type FlashcardMastery = 'new' | 'learning' | 'review' | 'mastered';

export interface Flashcard {
  id: string;
  kanji?: string;
  kana: string;
  romaji: string;
  english: string;
  partOfSpeech: 'noun' | 'verb' | 'adjective' | 'expression' | 'counter' | 'pronoun' | 'particle';
  category: 'greetings' | 'daily_verbs' | 'adjectives' | 'food' | 'numbers_time' | 'travel_places' | 'common_objects';
  exampleJapanese: string;
  exampleFurigana: string;
  exampleRomaji: string;
  exampleEnglish: string;
  jlptLevel: 'N5';
}

export interface GrammarDrillQuestion {
  id: string;
  type: 'particle' | 'conjugation' | 'sentence_builder';
  prompt: string;
  contextJapanese?: string;
  targetWord?: string; // For conjugation (e.g., 食べる)
  conjugationType?: string; // e.g., "Polite Present Negative (~ません)"
  options?: string[]; // For multiple choice
  correctAnswer: string;
  scrambleWords?: string[]; // For sentence builder
  correctOrder?: string[];
  hint: string;
  explanation: string;
}

export interface UserStats {
  streakDays: number;
  lastStudyDate: string; // YYYY-MM-DD
  completedLessonIds: string[];
  cardMastery: Record<string, { interval: number; easeFactor: number; nextReview: number; mastery: FlashcardMastery }>;
  dailyDrillsCompleted: number;
  totalXp: number;
  preferences: {
    showRomaji: boolean;
    audioSpeed: number; // 0.8, 1.0, 1.2
    dailyGoalMinutes: number;
  };
}
