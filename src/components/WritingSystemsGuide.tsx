import React, { useState, useEffect } from 'react';
import { Volume2, Sparkles, CheckCircle2, AlertCircle, HelpCircle, BookOpen, Compass, ArrowRight, Lightbulb } from 'lucide-react';
import { playJapaneseAudio, subscribeAudioState } from '../utils/audio';

interface WritingSystemsGuideProps {
  audioSpeed: number;
  onAddXp?: (amount: number) => void;
}

interface DissectedSentence {
  id: string;
  title: string;
  fullJapanese: string;
  fullRomaji: string;
  fullEnglish: string;
  tokens: {
    text: string;
    reading?: string;
    romaji: string;
    meaning: string;
    script: 'hiragana' | 'katakana' | 'kanji' | 'punctuation';
    reason: string;
  }[];
}

const SAMPLE_SENTENCES: DissectedSentence[] = [
  {
    id: 'sentence-1',
    title: 'Daily Action: Anna drinks coffee at a hotel',
    fullJapanese: 'アンナさんはホテルでコーヒーを飲みます。',
    fullRomaji: 'Anna-san wa hoteru de koohii o nomimasu.',
    fullEnglish: 'Anna drinks coffee at the hotel.',
    tokens: [
      {
        text: 'アンナ',
        romaji: 'Anna',
        meaning: 'Anna (Personal name)',
        script: 'katakana',
        reason: 'Foreign personal names are always written in Katakana because they are non-Japanese.'
      },
      {
        text: 'さん',
        romaji: 'san',
        meaning: 'Mr./Ms. (Polite honorific)',
        script: 'hiragana',
        reason: 'Native Japanese honorific title attached to names; native grammar uses Hiragana.'
      },
      {
        text: 'は',
        reading: 'わ',
        romaji: 'wa',
        meaning: 'Topic marker particle',
        script: 'hiragana',
        reason: 'All Japanese grammatical particles (は, を, に, で) are strictly written in Hiragana.'
      },
      {
        text: 'ホテル',
        romaji: 'hoteru',
        meaning: 'Hotel',
        script: 'katakana',
        reason: 'Foreign loanword (Gairaigo) imported from English "hotel", so it requires Katakana.'
      },
      {
        text: 'で',
        romaji: 'de',
        meaning: 'Location of action particle ("at")',
        script: 'hiragana',
        reason: 'Grammatical particle marking where an action takes place; must be in Hiragana.'
      },
      {
        text: 'コーヒー',
        romaji: 'koohii',
        meaning: 'Coffee',
        script: 'katakana',
        reason: 'Foreign loanword imported from Dutch "koffie" in the Edo period; written in Katakana.'
      },
      {
        text: 'を',
        reading: 'お',
        romaji: 'o',
        meaning: 'Direct object particle',
        script: 'hiragana',
        reason: 'Grammatical particle marking the object of a verb (coffee); written in Hiragana.'
      },
      {
        text: '飲',
        reading: 'の',
        romaji: 'no',
        meaning: 'Root: to drink',
        script: 'kanji',
        reason: 'Kanji conveys the core semantic meaning (drink) and anchors the verb root.'
      },
      {
        text: 'みます',
        romaji: 'mimasu',
        meaning: 'Polite present verb ending',
        script: 'hiragana',
        reason: 'Okurigana (inflected verb endings) are always written in Hiragana attached to the Kanji.'
      },
      {
        text: '。',
        romaji: '.',
        meaning: 'Japanese period (kuten)',
        script: 'punctuation',
        reason: 'The Japanese full stop circle.'
      }
    ]
  },
  {
    id: 'sentence-2',
    title: 'Ordering Food: Mike eats pizza at a restaurant',
    fullJapanese: 'マイクさんはレストランでピザを食べます。',
    fullRomaji: 'Maiku-san wa resutoran de piza o tabemasu.',
    fullEnglish: 'Mike eats pizza at a restaurant.',
    tokens: [
      {
        text: 'マイク',
        romaji: 'Maiku',
        meaning: 'Mike',
        script: 'katakana',
        reason: 'Foreign personal name transcribed into Japanese phonetics using Katakana.'
      },
      {
        text: 'さん',
        romaji: 'san',
        meaning: 'Title (Mr./Ms.)',
        script: 'hiragana',
        reason: 'Native Japanese honorific title; always Hiragana.'
      },
      {
        text: 'は',
        reading: 'わ',
        romaji: 'wa',
        meaning: 'Topic marker',
        script: 'hiragana',
        reason: 'Grammatical particle establishing Mike as the topic of conversation.'
      },
      {
        text: 'レストラン',
        romaji: 'resutoran',
        meaning: 'Restaurant',
        script: 'katakana',
        reason: 'Foreign loanword from French/English "restaurant".'
      },
      {
        text: 'で',
        romaji: 'de',
        meaning: 'Location particle',
        script: 'hiragana',
        reason: 'Particle showing where Mike eats.'
      },
      {
        text: 'ピザ',
        romaji: 'piza',
        meaning: 'Pizza',
        script: 'katakana',
        reason: 'Foreign loanword from Italian "pizza".'
      },
      {
        text: 'を',
        reading: 'お',
        romaji: 'o',
        meaning: 'Object marker',
        script: 'hiragana',
        reason: 'Particle connecting the direct object (pizza) to the verb.'
      },
      {
        text: '食',
        reading: 'た',
        romaji: 'ta',
        meaning: 'Root: to eat',
        script: 'kanji',
        reason: 'Kanji root conveying the concept of eating / food.'
      },
      {
        text: 'べます',
        romaji: 'bemasu',
        meaning: 'Polite present verb ending',
        script: 'hiragana',
        reason: 'Hiragana grammatical conjugation ending attached to the Kanji root.'
      },
      {
        text: '。',
        romaji: '.',
        meaning: 'Period',
        script: 'punctuation',
        reason: 'Japanese punctuation.'
      }
    ]
  },
  {
    id: 'sentence-3',
    title: 'Convenience Store: Kevin buys bread',
    fullJapanese: 'ケビンさんはコンビニでパンを買いました。',
    fullRomaji: 'Kebin-san wa konbini de pan o kaimashita.',
    fullEnglish: 'Kevin bought bread at the convenience store.',
    tokens: [
      {
        text: 'ケビン',
        romaji: 'Kebin',
        meaning: 'Kevin',
        script: 'katakana',
        reason: 'Foreign personal name -> Katakana.'
      },
      {
        text: 'さん',
        romaji: 'san',
        meaning: 'Mr./Ms.',
        script: 'hiragana',
        reason: 'Native Japanese honorific -> Hiragana.'
      },
      {
        text: 'は',
        reading: 'わ',
        romaji: 'wa',
        meaning: 'Topic particle',
        script: 'hiragana',
        reason: 'Grammar particle -> Hiragana.'
      },
      {
        text: 'コンビニ',
        romaji: 'konbini',
        meaning: 'Convenience store',
        script: 'katakana',
        reason: 'Abbreviation of loanword "convenience store" -> Katakana.'
      },
      {
        text: 'で',
        romaji: 'de',
        meaning: 'Location particle',
        script: 'hiragana',
        reason: 'Grammar particle -> Hiragana.'
      },
      {
        text: 'パン',
        romaji: 'pan',
        meaning: 'Bread',
        script: 'katakana',
        reason: 'Loanword brought by Portuguese traders in the 1500s ("pão") -> Katakana.'
      },
      {
        text: 'を',
        reading: 'お',
        romaji: 'o',
        meaning: 'Object particle',
        script: 'hiragana',
        reason: 'Grammar particle -> Hiragana.'
      },
      {
        text: '買',
        reading: 'か',
        romaji: 'ka',
        meaning: 'Root: to buy',
        script: 'kanji',
        reason: 'Kanji root representing the act of buying.'
      },
      {
        text: 'いました',
        romaji: 'imashita',
        meaning: 'Polite past verb ending',
        script: 'hiragana',
        reason: 'Past-tense conjugation ending -> Hiragana.'
      },
      {
        text: '。',
        romaji: '.',
        meaning: 'Period',
        script: 'punctuation',
        reason: 'Japanese punctuation.'
      }
    ]
  }
];

interface QuizScenario {
  id: string;
  wordEnglish: string;
  japaneseText: string;
  romaji: string;
  prompt: string;
  correctScript: 'katakana' | 'hiragana' | 'kanji';
  explanation: string;
  ruleCategory: string;
}

const QUIZ_SCENARIOS: QuizScenario[] = [
  {
    id: 'qs-1',
    wordEnglish: 'Your own name (e.g. John, Emily)',
    japaneseText: 'ジョン / エミリー',
    romaji: 'Jon / Emirii',
    prompt: 'How must you write your own non-Japanese name in Japanese?',
    correctScript: 'katakana',
    explanation: 'Foreign personal names and foreign countries (e.g. アメリカ) are always transcribed using Katakana!',
    ruleCategory: 'Foreign Names'
  },
  {
    id: 'qs-2',
    wordEnglish: 'Topic marker particle "wa"',
    japaneseText: 'は (wa)',
    romaji: 'wa',
    prompt: 'Which script is used for grammatical particles like は, を, に, and で?',
    correctScript: 'hiragana',
    explanation: 'Hiragana is the native structural glue of Japanese. All grammatical particles are strictly written in Hiragana.',
    ruleCategory: 'Grammar Particles'
  },
  {
    id: 'qs-3',
    wordEnglish: 'Coffee (from Dutch "koffie")',
    japaneseText: 'コーヒー',
    romaji: 'koohii',
    prompt: 'Which script is used to write borrowed words like "coffee" or "pizza"?',
    correctScript: 'katakana',
    explanation: 'Imported Western words (Gairaigo) like コーヒー (coffee), パン (bread), and ホテル (hotel) always take Katakana.',
    ruleCategory: 'Foreign Loanwords'
  },
  {
    id: 'qs-4',
    wordEnglish: 'Polite verb ending "~masu"',
    japaneseText: '〜ます',
    romaji: '-masu',
    prompt: 'When a verb is conjugated (e.g. 食べます tabemasu), which script is the ending written in?',
    correctScript: 'hiragana',
    explanation: 'Okurigana (inflected verb and adjective endings attached to Kanji stems) are always written in Hiragana.',
    ruleCategory: 'Verb Conjugations'
  },
  {
    id: 'qs-5',
    wordEnglish: 'Thank you (Arigatou)',
    japaneseText: 'ありがとう',
    romaji: 'arigatou',
    prompt: 'Which script is used for native greetings like "Arigatou" or "Sumimasen"?',
    correctScript: 'hiragana',
    explanation: 'Native Japanese expressions and words without kanji are written in soft, curved Hiragana.',
    ruleCategory: 'Native Words'
  },
  {
    id: 'qs-6',
    wordEnglish: 'Heart pounding onomatopoeia',
    japaneseText: 'ドキドキ',
    romaji: 'dokidoki',
    prompt: 'In manga and pop culture, which script is most commonly used for sound effects (onomatopoeia)?',
    correctScript: 'katakana',
    explanation: 'Sound effects (ドキドキ heartbeat, ワンワン dog barking, バタン door slam) are typically rendered in Katakana for visual punch.',
    ruleCategory: 'Onomatopoeia'
  }
];

export const WritingSystemsGuide: React.FC<WritingSystemsGuideProps> = ({ audioSpeed, onAddXp }) => {
  const [activeSentenceIndex, setActiveSentenceIndex] = useState(0);
  const [selectedTokenIndex, setSelectedTokenIndex] = useState<number | null>(0);
  const [activeAudioText, setActiveAudioText] = useState<string | null>(null);

  // Mini quiz state
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedScriptAnswer, setSelectedScriptAnswer] = useState<'katakana' | 'hiragana' | 'kanji' | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  useEffect(() => {
    return subscribeAudioState((text) => {
      setActiveAudioText(text);
    });
  }, []);

  const activeSentence = SAMPLE_SENTENCES[activeSentenceIndex];
  const selectedToken = selectedTokenIndex !== null ? activeSentence.tokens[selectedTokenIndex] : null;
  const currentQuiz = QUIZ_SCENARIOS[quizIndex];

  const handleScriptChoice = (choice: 'katakana' | 'hiragana' | 'kanji') => {
    if (isAnswerChecked) return;
    setSelectedScriptAnswer(choice);
    setIsAnswerChecked(true);

    if (choice === currentQuiz.correctScript) {
      setQuizScore((prev) => prev + 1);
      if (onAddXp) onAddXp(10);
    }
  };

  const handleNextQuiz = () => {
    setSelectedScriptAnswer(null);
    setIsAnswerChecked(false);
    setQuizIndex((prev) => (prev + 1) % QUIZ_SCENARIOS.length);
  };

  return (
    <div className="space-y-8" id="writing-systems-guide-container">
      {/* Absolute Beginner Introduction Banner */}
      <section className="bg-gradient-to-br from-amber-50/80 via-white to-rose-50/60 rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/80 text-amber-900 text-xs font-bold border border-amber-200">
          <Lightbulb className="w-3.5 h-3.5 text-amber-700" />
          <span>Zero-Knowledge Beginner Essential: The Japanese Writing System</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
          When to Use Katakana vs Hiragana vs Kanji
        </h2>

        <p className="text-stone-700 text-sm sm:text-base leading-relaxed max-w-3xl">
          English uses a single 26-letter alphabet. Written Japanese seamlessly uses <strong>three distinct scripts at the same time</strong>.
          Before you start writing symbols, you must understand their jobs. Both <strong>Hiragana</strong> and <strong>Katakana</strong> represent the exact same 46 sounds, but you never mix up when to use which!
        </p>

        {/* 3 Scripts Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* Hiragana Card */}
          <div className="bg-white rounded-2xl p-5 border-2 border-amber-200 shadow-xs space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 text-[11px] font-bold uppercase tracking-wider">
                Script 1 • 46 Letters
              </span>
              <span className="text-3xl font-bold text-amber-800">ひらがな</span>
            </div>
            <h3 className="text-lg font-bold text-stone-900">Hiragana (The Native Soul)</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              <strong>Look:</strong> Soft, loopy, curved brush strokes.<br />
              <strong>When to use:</strong> Native Japanese words, grammatical particles (<span className="font-mono text-amber-800 font-bold">は, を, に, で</span>), verb endings (<span className="font-mono text-amber-800 font-bold">〜ます</span>), and reading guides (Furigana).
            </p>
            <div className="pt-1 text-[11px] font-semibold text-amber-800 flex items-center gap-1.5">
              <span>Rule: All grammar glue is Hiragana</span>
            </div>
          </div>

          {/* Katakana Card */}
          <div className="bg-white rounded-2xl p-5 border-2 border-purple-200 shadow-xs space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-full bg-purple-100 text-purple-900 text-[11px] font-bold uppercase tracking-wider">
                Script 2 • 46 Letters
              </span>
              <span className="text-3xl font-bold text-purple-800">カタカナ</span>
            </div>
            <h3 className="text-lg font-bold text-stone-900">Katakana (The Foreign Lens)</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              <strong>Look:</strong> Sharp, angular, geometric straight cuts.<br />
              <strong>When to use:</strong> Foreign loanwords (<span className="font-mono text-purple-800 font-bold">コーヒー, パン, ホテル</span>), foreign personal names (<span className="font-mono text-purple-800 font-bold">ジョン</span>), foreign cities, onomatopoeia, and emphasis.
            </p>
            <div className="pt-1 text-[11px] font-semibold text-purple-800 flex items-center gap-1.5">
              <span>Rule: All foreign imports are Katakana</span>
            </div>
          </div>

          {/* Kanji Card */}
          <div className="bg-white rounded-2xl p-5 border-2 border-sky-200 shadow-xs space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-full bg-sky-100 text-sky-900 text-[11px] font-bold uppercase tracking-wider">
                Script 3 • Ideograms
              </span>
              <span className="text-3xl font-bold text-sky-800">漢字</span>
            </div>
            <h3 className="text-lg font-bold text-stone-900">Kanji (The Meaning Anchors)</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              <strong>Look:</strong> Intricate characters imported from China.<br />
              <strong>When to use:</strong> Nouns, verb stems (<span className="font-mono text-sky-800 font-bold">食べる</span>), adjective stems. Solves homophones and separates words since Japanese has no spaces!
            </p>
            <div className="pt-1 text-[11px] font-semibold text-sky-800 flex items-center gap-1.5">
              <span>Rule: Carries the core semantic meaning</span>
            </div>
          </div>
        </div>
      </section>

      {/* When to Use Katakana: Detailed Rules & Examples */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-4">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-600"></span>
              <span>The 5 Golden Rules of Katakana (カタカナ)</span>
            </h3>
            <p className="text-xs text-stone-500">
              When should you write a word in Katakana instead of Hiragana? Memorize these 5 situations:
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-purple-50 text-purple-800 border border-purple-100 self-start sm:self-auto">
            Essential for Beginners
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Rule 1 */}
          <div className="p-4 rounded-2xl bg-stone-50/80 border border-stone-200/80 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-purple-700 text-white text-xs font-bold flex items-center justify-center">1</span>
              <h4 className="font-bold text-stone-900 text-sm">Foreign Loanwords (外来語 Gairaigo)</h4>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Words adopted from Western languages (English, Portuguese, German, French, Dutch).
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {[
                { jp: 'コーヒー', ro: 'koohii', en: 'coffee' },
                { jp: 'パン', ro: 'pan', en: 'bread' },
                { jp: 'ホテル', ro: 'hoteru', en: 'hotel' },
                { jp: 'ピザ', ro: 'piza', en: 'pizza' },
                { jp: 'スマホ', ro: 'sumaho', en: 'smartphone' }
              ].map((item) => (
                <button
                  key={item.jp}
                  type="button"
                  onClick={() => playJapaneseAudio(item.jp, audioSpeed)}
                  className={`px-2.5 py-1.5 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition cursor-pointer ${
                    activeAudioText === item.jp
                      ? 'bg-purple-700 text-white border-purple-700 shadow-xs ring-2 ring-purple-300'
                      : 'bg-white border-stone-200 text-stone-800 hover:border-purple-300 hover:bg-purple-50/50'
                  }`}
                >
                  <span className="font-bold">{item.jp}</span>
                  <span className="text-stone-400 text-[10px]">({item.en})</span>
                  <Volume2 className="w-3 h-3 text-purple-600" />
                </button>
              ))}
            </div>
          </div>

          {/* Rule 2 */}
          <div className="p-4 rounded-2xl bg-stone-50/80 border border-stone-200/80 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-purple-700 text-white text-xs font-bold flex items-center justify-center">2</span>
              <h4 className="font-bold text-stone-900 text-sm">Foreign Personal Names & Non-Kanji Countries</h4>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Your own name! If your name is not native Japanese, you must write it in Katakana.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {[
                { jp: 'ジョン', ro: 'Jon', en: 'John' },
                { jp: 'エミリー', ro: 'Emirii', en: 'Emily' },
                { jp: 'アメリカ', ro: 'Amerika', en: 'USA' },
                { jp: 'ロンドン', ro: 'Rondon', en: 'London' }
              ].map((item) => (
                <button
                  key={item.jp}
                  type="button"
                  onClick={() => playJapaneseAudio(item.jp, audioSpeed)}
                  className={`px-2.5 py-1.5 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition cursor-pointer ${
                    activeAudioText === item.jp
                      ? 'bg-purple-700 text-white border-purple-700 shadow-xs ring-2 ring-purple-300'
                      : 'bg-white border-stone-200 text-stone-800 hover:border-purple-300 hover:bg-purple-50/50'
                  }`}
                >
                  <span className="font-bold">{item.jp}</span>
                  <span className="text-stone-400 text-[10px]">({item.en})</span>
                  <Volume2 className="w-3 h-3 text-purple-600" />
                </button>
              ))}
            </div>
          </div>

          {/* Rule 3 */}
          <div className="p-4 rounded-2xl bg-stone-50/80 border border-stone-200/80 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-purple-700 text-white text-xs font-bold flex items-center justify-center">3</span>
              <h4 className="font-bold text-stone-900 text-sm">Onomatopoeia & Sound Effects (Manga & Anime)</h4>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Sounds of laughter, animal calls, actions, and heartbeats are rendered in Katakana for punchy visual emphasis.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {[
                { jp: 'ドキドキ', ro: 'dokidoki', en: 'heart pounding' },
                { jp: 'ニャー', ro: 'nyaa', en: 'cat meowing' },
                { jp: 'ワンワン', ro: 'wanwan', en: 'dog barking' },
                { jp: 'バタン', ro: 'batan', en: 'door slam' }
              ].map((item) => (
                <button
                  key={item.jp}
                  type="button"
                  onClick={() => playJapaneseAudio(item.jp, audioSpeed)}
                  className={`px-2.5 py-1.5 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition cursor-pointer ${
                    activeAudioText === item.jp
                      ? 'bg-purple-700 text-white border-purple-700 shadow-xs ring-2 ring-purple-300'
                      : 'bg-white border-stone-200 text-stone-800 hover:border-purple-300 hover:bg-purple-50/50'
                  }`}
                >
                  <span className="font-bold">{item.jp}</span>
                  <span className="text-stone-400 text-[10px]">({item.en})</span>
                  <Volume2 className="w-3 h-3 text-purple-600" />
                </button>
              ))}
            </div>
          </div>

          {/* Rule 4 & 5 */}
          <div className="p-4 rounded-2xl bg-stone-50/80 border border-stone-200/80 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-purple-700 text-white text-xs font-bold flex items-center justify-center">4</span>
              <h4 className="font-bold text-stone-900 text-sm">Stylistic Emphasis & Scientific Species</h4>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Similar to writing in <em>italics</em> or ALL CAPS in English for cool robot speech, slogans, or biological terms (<span className="font-mono">イヌ, ネコ</span>).
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {[
                { jp: 'スゴイ', ro: 'sugoi', en: 'amazing (emphasized)' },
                { jp: 'ヤバイ', ro: 'yabai', en: 'crazy/insane (slang)' },
                { jp: 'パンダ', ro: 'panda', en: 'panda' }
              ].map((item) => (
                <button
                  key={item.jp}
                  type="button"
                  onClick={() => playJapaneseAudio(item.jp, audioSpeed)}
                  className={`px-2.5 py-1.5 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition cursor-pointer ${
                    activeAudioText === item.jp
                      ? 'bg-purple-700 text-white border-purple-700 shadow-xs ring-2 ring-purple-300'
                      : 'bg-white border-stone-200 text-stone-800 hover:border-purple-300 hover:bg-purple-50/50'
                  }`}
                >
                  <span className="font-bold">{item.jp}</span>
                  <span className="text-stone-400 text-[10px]">({item.en})</span>
                  <Volume2 className="w-3 h-3 text-purple-600" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Sentence Anatomy Inspector */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-rose-700" />
              <span>Interactive Sentence Anatomy: All 3 Scripts Together</span>
            </h3>
            <p className="text-xs text-stone-500">
              Click each word token below to see exactly which script was chosen and WHY!
            </p>
          </div>

          {/* Sentence Selector Tabs */}
          <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl border border-stone-200">
            {SAMPLE_SENTENCES.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  setActiveSentenceIndex(idx);
                  setSelectedTokenIndex(0);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  activeSentenceIndex === idx
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Sentence {idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Sentence Display & Audio Banner */}
        <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200/90 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold text-rose-700 uppercase tracking-wider">
                {activeSentence.title}
              </span>
              <div className="text-xs text-stone-500 font-mono mt-0.5">
                {activeSentence.fullRomaji}
              </div>
              <div className="text-sm font-medium text-stone-700 mt-1">
                "{activeSentence.fullEnglish}"
              </div>
            </div>

            <button
              id={`play-sentence-btn-${activeSentence.id}`}
              type="button"
              onClick={() => playJapaneseAudio(activeSentence.fullJapanese, audioSpeed)}
              className={`px-4 py-2.5 rounded-xl border transition shadow-xs shrink-0 flex items-center gap-2 cursor-pointer ${
                activeAudioText === activeSentence.fullJapanese.replace(/[\(\[\{][^()]*[\)\]\}]/g, '').trim()
                  ? 'bg-rose-700 text-white border-rose-700 ring-2 ring-rose-300 scale-105'
                  : 'bg-white border-stone-200 text-stone-800 hover:bg-rose-50 hover:text-rose-700'
              }`}
            >
              <Volume2 className={`w-4 h-4 ${activeAudioText === activeSentence.fullJapanese ? 'animate-bounce' : ''}`} />
              <span className="text-xs font-bold">
                {activeAudioText === activeSentence.fullJapanese ? 'Speaking...' : 'Listen Full Sentence'}
              </span>
            </button>
          </div>

          {/* Interactive Tokens */}
          <div className="pt-3 border-t border-stone-200/60">
            <div className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">
              Tap any token to inspect its writing system:
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              {activeSentence.tokens.map((token, tIdx) => {
                const isSelected = selectedTokenIndex === tIdx;
                let scriptBadgeColor = 'bg-stone-100 text-stone-700 border-stone-300';
                if (token.script === 'katakana') scriptBadgeColor = isSelected ? 'bg-purple-700 text-white border-purple-700 ring-2 ring-purple-300' : 'bg-purple-50 text-purple-900 border-purple-200 hover:bg-purple-100';
                if (token.script === 'hiragana') scriptBadgeColor = isSelected ? 'bg-amber-600 text-white border-amber-600 ring-2 ring-amber-300' : 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100';
                if (token.script === 'kanji') scriptBadgeColor = isSelected ? 'bg-sky-700 text-white border-sky-700 ring-2 ring-sky-300' : 'bg-sky-50 text-sky-900 border-sky-200 hover:bg-sky-100';

                return (
                  <button
                    key={`${token.text}-${tIdx}`}
                    type="button"
                    onClick={() => {
                      setSelectedTokenIndex(tIdx);
                      playJapaneseAudio(token.text, audioSpeed);
                    }}
                    className={`px-3 py-2 rounded-xl border font-bold text-lg sm:text-xl transition cursor-pointer flex flex-col items-center gap-0.5 ${scriptBadgeColor}`}
                  >
                    <span>{token.text}</span>
                    <span className="text-[10px] font-mono opacity-80">{token.romaji}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Token Breakdown Inspector Details */}
          {selectedToken && (
            <div className="bg-white rounded-xl p-4 border border-stone-200/90 shadow-xs space-y-2 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-stone-900">{selectedToken.text}</span>
                  <span className="text-xs text-stone-500 font-mono">[{selectedToken.romaji}]</span>
                  <span className="text-xs font-semibold text-stone-700">• {selectedToken.meaning}</span>
                </div>

                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                    selectedToken.script === 'katakana'
                      ? 'bg-purple-100 text-purple-800 border-purple-200'
                      : selectedToken.script === 'hiragana'
                      ? 'bg-amber-100 text-amber-800 border-amber-200'
                      : selectedToken.script === 'kanji'
                      ? 'bg-sky-100 text-sky-800 border-sky-200'
                      : 'bg-stone-100 text-stone-700 border-stone-200'
                  }`}
                >
                  Script: {selectedToken.script}
                </span>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed bg-stone-50 p-2.5 rounded-lg border border-stone-100">
                <strong>Why this script?</strong> {selectedToken.reason}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* "Which Script Would You Use?" Interactive Practice Quiz */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-stone-100 pb-4">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600" />
              <span>Beginner Mini-Check: Which Script Would You Use?</span>
            </h3>
            <p className="text-xs text-stone-500">
              Test your understanding of the golden rules with real-world scenarios.
            </p>
          </div>
          <span className="text-xs font-bold text-rose-800 bg-rose-50 border border-rose-200 px-3 py-1 rounded-full">
            Score: {quizScore}
          </span>
        </div>

        <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200 space-y-5">
          <div className="flex items-center justify-between text-xs text-stone-500 font-semibold">
            <span className="px-2 py-0.5 rounded bg-white border border-stone-200 text-stone-700">
              Scenario {quizIndex + 1} of {QUIZ_SCENARIOS.length} • {currentQuiz.ruleCategory}
            </span>
            <span className="font-mono text-stone-400">Target: {currentQuiz.wordEnglish}</span>
          </div>

          <div className="text-center py-3 space-y-2">
            <div className="text-2xl sm:text-3xl font-bold text-stone-900">
              {currentQuiz.prompt}
            </div>
            <div className="text-stone-500 text-sm">
              Example word: <span className="font-bold text-stone-800">{currentQuiz.wordEnglish}</span> ({currentQuiz.japaneseText})
            </div>
          </div>

          {/* Script Choice Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: 'hiragana', name: 'ひらがな (Hiragana)', desc: 'Native words, particles & verb endings' },
              { id: 'katakana', name: 'カタカナ (Katakana)', desc: 'Loanwords, foreign names & sounds' },
              { id: 'kanji', name: '漢字 (Kanji)', desc: 'Core concept meanings & nouns' }
            ].map((opt) => {
              const isSelected = selectedScriptAnswer === opt.id;
              const isCorrect = opt.id === currentQuiz.correctScript;

              let btnStyle = 'bg-white border-stone-200 text-stone-800 hover:border-stone-400';
              if (isAnswerChecked) {
                if (isCorrect) btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-300';
                else if (isSelected) btnStyle = 'bg-rose-50 border-rose-500 text-rose-900 ring-2 ring-rose-300';
                else btnStyle = 'bg-stone-50 border-stone-200 text-stone-400 opacity-60';
              }

              return (
                <button
                  key={opt.id}
                  type="button"
                  disabled={isAnswerChecked}
                  onClick={() => handleScriptChoice(opt.id as any)}
                  className={`p-4 rounded-2xl border text-left transition cursor-pointer flex flex-col gap-1 ${btnStyle}`}
                >
                  <span className="font-bold text-base">{opt.name}</span>
                  <span className="text-[11px] text-stone-500">{opt.desc}</span>
                </button>
              );
            })}
          </div>

          {/* Feedback & Next Question */}
          {isAnswerChecked && (
            <div className="bg-white rounded-xl p-4 border border-stone-200/90 shadow-xs space-y-3 animate-in fade-in duration-200">
              <div className="flex items-start gap-2">
                {selectedScriptAnswer === currentQuiz.correctScript ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <h4 className="font-bold text-sm text-stone-900">
                    {selectedScriptAnswer === currentQuiz.correctScript ? 'Spot on! Correct answer.' : 'Not quite.'}
                  </h4>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    {currentQuiz.explanation}
                  </p>
                </div>
              </div>

              <div className="flex justify-end pt-2 border-t border-stone-100">
                <button
                  type="button"
                  onClick={handleNextQuiz}
                  className="px-4 py-2 rounded-xl bg-stone-900 text-white text-xs font-bold hover:bg-stone-800 transition flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Next Scenario</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
