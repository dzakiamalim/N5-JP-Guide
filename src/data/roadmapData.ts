import { RoadmapPhase } from '../types';

export const N5_ROADMAP_PHASES: RoadmapPhase[] = [
  {
    id: 1,
    phaseNumber: 1,
    title: 'The Phonetic Blueprint & The 3 Writing Systems',
    japaneseTitle: '文字と発音 (Writing Systems & Phonetics)',
    targetDuration: 'Week 1 - 2 (10-14 days)',
    description:
      'Beginners must understand WHY Japanese uses 3 distinct scripts and WHEN to use each one before memorizing symbols: Hiragana (native grammar & words), Katakana (foreign loanwords & names), and Kanji (meanings & word roots). Then master the 46 base mora sounds and phonetics.',
    coreConcepts: [
      'The 3 Scripts: When to use Hiragana vs Katakana vs Kanji',
      '46 Base Hiragana (curved strokes, particles, native vocabulary)',
      '46 Base Katakana (angular strokes, loanwords like コーヒー, パン)',
      'Voicing marks (か ka -> が ga, た ta -> だ da, は ha -> ば ba / ぱ pa)',
      'Small tsu (っ/ッ) for glottal stop & prolonged vowel markers (ー vs おう)',
      'Pitch accent awareness: Japanese is pitch-accented, not stress-accented'
    ],
    n5Relevance:
      'JLPT N5 test papers are printed exclusively in Hiragana, Katakana, and basic Kanji with Furigana. Zero Romaji exists on the exam.',
    lessons: ['lesson-writing-systems', 'lesson-kana-basics'],
    milestoneChecklist: [
      'Explain when to use Katakana vs Hiragana with 100% accuracy',
      'Read all 46 Hiragana without hesitating more than 1 second',
      'Read all 46 Katakana and common loanwords fluently',
      'Distinguish short vs long vowels (ビール vs ビル)',
      'Read small っ (chotto ちょっと, matte まって) correctly'
    ]
  },
  {
    id: 2,
    phaseNumber: 2,
    title: 'Identity & Core Sentence Structure (SOV + Particles)',
    japaneseTitle: '基本文型と助詞 (Basic Sentence & Particles)',
    targetDuration: 'Week 3 - 4 (14 days)',
    description:
      'Unlike English (SVO: I eat sushi), Japanese is SOV (Subject - Object - Verb: I sushi eat). Verbs always anchor the end of the sentence. Master the foundational identity equation [A は B です] and the core directional & case particles.',
    coreConcepts: [
      'The Copula: です (is/am/are) and its polite negative ではありません (じゃありません)',
      'Topic Marker は (pronounced "wa" as particle) vs Subject Marker が',
      'Question Particle か (acts like a spoken question mark ?)',
      'Direct Object Particle を (pronounced "o")',
      'Direction Particles へ ("e") and に ("ni") for destinations and time points'
    ],
    n5Relevance:
      'At least 30% of N5 grammar questions test particle selection (は, が, を, に, で, へ, も, と).',
    lessons: ['lesson-core-sentence', 'lesson-essential-particles'],
    milestoneChecklist: [
      'Form affirmative and negative statements with です / ではありません',
      'Ask polite questions using か (e.g., これは何ですか)',
      'Pair objects with を and transitive verbs (本を読みます)',
      'Distinguish に (specific time/destination) vs で (location of action)'
    ]
  },
  {
    id: 3,
    phaseNumber: 3,
    title: 'The Verb Engine & The Masu Matrix',
    japaneseTitle: '動詞の活用とマス形 (Verbs & Masu Conjugation)',
    targetDuration: 'Week 5 - 6 (14 days)',
    description:
      'Japanese verbs are divided into 3 groups: Godan (Group 1 / -u verbs), Ichidan (Group 2 / -iru/-eru verbs), and Irregular (Group 3: くる & する). Beginners learn the polite ~ます (masu) stem first, which allows immediate polite communication without offending native speakers.',
    coreConcepts: [
      'The 3 Verb Groups (Group 1 Godan, Group 2 Ichidan, Group 3 Irregular)',
      'The 4-Quadrant Masu Matrix: ~ます (present+), ~ません (present-), ~ました (past+), ~ませんでした (past-)',
      'Inviting & Suggesting: ~ましょう (Let\'s do) and ~ませんか (Won\'t you do?)',
      'Common daily movement verbs: 行く (iku), 来る (kuru), 帰る (kaeru)'
    ],
    n5Relevance:
      'Every dialogue question on JLPT N5 listening and reading uses the polite ~ます forms extensively.',
    lessons: ['lesson-verbs-masu'],
    milestoneChecklist: [
      'Identify whether a verb is Group 1, 2, or 3 from its dictionary form',
      'Conjugate any N5 verb into all 4 polite quadrants within 3 seconds',
      'Invite someone to do something using ~ませんか',
      'Express destination movement with [Place] へ [Verb-masu]'
    ]
  },
  {
    id: 4,
    phaseNumber: 4,
    title: 'Adjectives: The Dual Color of Japanese',
    japaneseTitle: '形容詞の世界 (The World of Adjectives)',
    targetDuration: 'Week 7 - 8 (14 days)',
    description:
      'Japanese has two fundamentally different types of adjectives: い-adjectives (true adjective verbs that conjugate by themselves) and な-adjectives (adjectival nouns that require な before nouns). Mastering their past and negative conjugations is a huge leap toward N5.',
    coreConcepts: [
      'い-adjectives: drop い -> ~くない (negative), ~かった (past), ~くなかった (past neg)',
      'Irregular adjective: いい (good) -> よくありません / よかったです',
      'な-adjectives: act like nouns + です (しずかです -> しずかじゃありません)',
      'Noun modification: おいしいりんご (delicious apple) vs しずかなへや (quiet room)'
    ],
    n5Relevance:
      'N5 tests adjective inflections constantly, especially the negative of い-adjectives (~くない) and irregular いい -> よく.',
    lessons: ['lesson-adjectives'],
    milestoneChecklist: [
      'Never say "おいしいじゃない" (say おいしくない)',
      'Correctly attach な before nouns when using な-adjectives (きれいな花)',
      'Describe past states (昨日は寒かったです - It was cold yesterday)'
    ]
  },
  {
    id: 5,
    phaseNumber: 5,
    title: 'The Swiss Army Knife: The Te-Form (て形)',
    japaneseTitle: 'て形の魔法 (The Magic of the Te-form)',
    targetDuration: 'Week 9 - 10 (14 days)',
    description:
      'The て-form is universally recognized as the single most critical grammar inflection in beginner Japanese. It connects clauses, makes polite requests (~てください), expresses ongoing actions (~ています), and asks for permission (~てもいいですか).',
    coreConcepts: [
      'Te-form conjugation rules for Group 1 (う・つ・る -> って, む・ぶ・ぬ -> んで, く -> いて, ぐ -> いで, す -> して)',
      'Te-form for Group 2 (drop る -> て: たべて, みて)',
      'Group 3 Irregular (して, きて; plus exception 行く -> 行って)',
      'Request pattern: ~てください (Please do...)',
      'Ongoing action / Present continuous: ~ています (I am eating, reading, working)'
    ],
    n5Relevance:
      'Over 40% of mid-to-late N5 grammar questions rely directly on having a rock-solid grasp of the て-form.',
    lessons: ['lesson-te-form'],
    milestoneChecklist: [
      'Memorize the Te-form rhyme/song for Group 1 sound changes',
      'Politely ask someone to wait (ちょっと待ってください) or speak (話してください)',
      'Describe what you are doing right now using ~ています'
    ]
  },
  {
    id: 6,
    phaseNumber: 6,
    title: 'N5 Kanji Mastery & Final Exam Readiness',
    japaneseTitle: 'N5漢字と総仕上げ (N5 Kanji & JLPT Sprint)',
    targetDuration: 'Week 11 - 12 (14 days)',
    description:
      'Achieving N5 requires ~100 basic Kanji, ~800 core vocabulary words, and the ability to parse short passages and listen to basic conversational exchanges. Consolidate your knowledge with daily drills, timed mock quizzes, and spaced repetition flashcards.',
    coreConcepts: [
      'The 100 essential N5 Kanji (Numbers 一 to 十, elements 日月火水木金土, people 人女男, directions 東西南北, body parts, sizes 大中小)',
      'Understanding On\'yomi (Chinese origin) vs Kun\'yomi (Native Japanese reading)',
      'Counters: つ (general 1-10), 人 (people: ひとり, ふたり, さんにん), 本 (long objects), 枚 (flat objects)',
      'Time expressions: 今 (ima), 昨日 (kinou), 今日 (kyou), 明日 (ashita), 毎日 (mainichi)'
    ],
    n5Relevance:
      'JLPT N5 scoring: Language Knowledge (Vocab/Grammar) + Reading (120 points) + Listening (60 points). Total passing score is typically 80/180 with sectional minimums.',
    lessons: ['lesson-kanji-essentials'],
    milestoneChecklist: [
      'Recognize and write 100 core N5 Kanji',
      'Count general items from 1 to 10 (ひとつ, ふたつ, みっつ... とお)',
      'Read simple paragraphs without dictionary lookups in under 3 minutes',
      'Score 80%+ on daily grammar & vocabulary practice sets'
    ]
  }
];

export const BEGINNER_GUIDE_PRINCIPLES = [
  {
    id: 'principle-1',
    title: 'Ditch Romaji Immediately',
    shortDesc: 'Romaji causes false vowel pronunciations and prevents real reading fluency.',
    detail:
      'Romaji is only a temporary crutch for the first 3-5 days. If you keep reading "watashi wa", your brain never builds automatic visual pathways for わたしは. Switch Romaji OFF as soon as you know half the Hiragana chart.'
  },
  {
    id: 'principle-2',
    title: 'Think in SOV (Subject - Object - Verb)',
    shortDesc: 'The verb is the anchor of the Japanese sentence.',
    detail:
      'In English, the verb arrives right after the subject ("I bought a book"). In Japanese, all details (time, location, object, companions) come first, and the verb hits at the very end: 私は [昨日] [図書館で] [本を] 買いました. Wait for the final verb to know if something happened, did not happen, or was requested.'
  },
  {
    id: 'principle-3',
    title: 'Particles Are Like Magnetic Labels',
    shortDesc: 'Particles attach to the word BEFORE them, marking its grammatical job.',
    detail:
      'Never translate particles in isolation. Treat "りんごを" as a single unit ("apple [direct object]"), and "東京へ" as "to Tokyo". Because particles label grammatical jobs, word order in Japanese is flexible—only the final verb position is fixed!'
  },
  {
    id: 'principle-4',
    title: 'High-Frequency Spaced Repetition (SRS)',
    shortDesc: 'Study 20-30 minutes daily rather than 4 hours once a week.',
    detail:
      'Japanese grammar requires memory recall over spaced intervals. Reviewing 10-15 flashcards and 5 daily grammar drills every morning yields 4x higher retention than weekend cramming.'
  }
];
