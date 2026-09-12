import { Lesson } from '../types';

export const LESSONS: Lesson[] = [
  {
    id: 'lesson-writing-systems',
    phaseId: 1,
    title: 'The 3 Japanese Writing Systems: When to Use Which?',
    subtitle: 'Hiragana vs Katakana vs Kanji: The Absolute Beginner Blueprint',
    estimatedMinutes: 15,
    level: 'N5',
    tags: ['Writing Systems', 'Hiragana', 'Katakana', 'Kanji', 'Zero Beginner'],
    overview:
      'Unlike English which has a single 26-letter alphabet, written Japanese seamlessly combines three distinct writing systems: Hiragana, Katakana, and Kanji (plus Romaji for learners). This lesson explains the exact purpose of each script, why Japanese has two separate phonetic alphabets, and the golden rules for when to use Hiragana vs Katakana.',
    sections: [
      {
        title: '1. The 3 Scripts at a Glance: Why Does Japanese Have Three?',
        explanation:
          'Before Japanese had a writing system of its own, it adopted Chinese characters (Kanji) to represent meanings. Later, Japanese scholars and court women simplified Kanji into two distinct 46-character phonetic syllabaries: Hiragana (curved, flowing brush strokes) and Katakana (straight, angular chisel cuts). Both represent the EXACT SAME 46 sounds, but they have completely different jobs in modern Japanese!',
        keyRule: 'Hiragana = Native grammar & particles | Katakana = Foreign loanwords & names | Kanji = Core meanings & word roots.',
        examples: [
          {
            japanese: 'ひらがな',
            reading: 'ひらがな',
            romaji: 'hiragana',
            english: 'Hiragana: 46 soft, curved symbols used for native Japanese words and grammar',
            breakdown: [
              { part: 'ひ・ら・が・な', role: 'Curved strokes, native Japanese origin', color: 'text-amber-800 font-semibold' }
            ]
          },
          {
            japanese: 'カタカナ',
            reading: 'カタカナ',
            romaji: 'katakana',
            english: 'Katakana: 46 sharp, angular symbols used for foreign loanwords and names',
            breakdown: [
              { part: 'カ・タ・カ・ナ', role: 'Angular block strokes, foreign imports', color: 'text-rose-800 font-semibold' }
            ]
          },
          {
            japanese: '漢字',
            reading: 'かんじ',
            romaji: 'kanji',
            english: 'Kanji: Chinese ideographs representing concepts, nouns, and verb stems',
            breakdown: [
              { part: '漢', role: 'Han (Chinese)', color: 'text-sky-800 font-semibold' },
              { part: '字', role: 'Character / Symbol', color: 'text-sky-800 font-semibold' }
            ]
          }
        ],
        tip: 'Think of Hiragana and Katakana like "Regular" and "Italics/CAPS" in English: both spell sounds, but they serve different grammatical and stylistic purposes.'
      },
      {
        title: '2. When to Use Hiragana (ひらがな): The Native Glue',
        explanation:
          'Hiragana is the very first script every child in Japan learns. It is characterized by soft, loopy, curved lines. You use Hiragana for:\n1. Grammatical Particles: The single-syllable markers that connect words (like は wa, を o, に ni, で de, も mo).\n2. Native Japanese Words: Words that do not use Kanji or are rarely written in Kanji (e.g. ありがとう arigatou, すみません sumimasen, かわいい kawaii).\n3. Verb & Adjective Endings (Okurigana): The changing endings attached to Kanji stems (e.g., 食べる taberu -> 食べます tabemasu).\n4. Furigana: Tiny pronunciation guides printed above or beside complex Kanji characters.',
        keyRule: 'If a word is native Japanese grammar, a particle, or an inflected verb ending, it MUST be in Hiragana.',
        examples: [
          {
            japanese: 'ありがとう',
            reading: 'ありがとう',
            romaji: 'arigatou',
            english: 'Thank you (pure native Japanese greeting -> Hiragana)',
            breakdown: [
              { part: 'ありがとう', role: 'Native phrase written entirely in Hiragana', color: 'text-amber-800 font-semibold' }
            ]
          },
          {
            japanese: 'すみません',
            reading: 'すみません',
            romaji: 'sumimasen',
            english: 'Excuse me / Sorry (polite native conversational expression)',
            breakdown: [
              { part: 'すみません', role: 'Common polite expression in Hiragana', color: 'text-amber-800 font-semibold' }
            ]
          },
          {
            japanese: 'たべます',
            reading: 'たべます',
            romaji: 'tabemasu',
            english: 'Eat / I eat (polite verb form)',
            breakdown: [
              { part: 'たべ', role: 'Verb stem', color: 'text-stone-700 font-semibold' },
              { part: 'ます', role: 'Polite ending (Hiragana)', color: 'text-rose-700 font-semibold' }
            ]
          }
        ],
        tip: 'Never write a foreign borrowed word like "coffee" or "pizza" in Hiragana—it will look unnatural to native readers!'
      },
      {
        title: '3. When to Use Katakana (カタカナ): The Foreign & Emphatic Lens',
        explanation:
          'Katakana is characterized by sharp, geometric, straight strokes. You use Katakana in five specific scenarios:\n1. Foreign Loanwords (外来語 gairaigo): Words imported from Western languages (English, Portuguese, German, French, Dutch).\n2. Foreign Personal Names & Foreign Countries: Your own name (e.g. John -> ジョン, Emily -> エミリー) and non-Kanji countries (America -> アメリカ).\n3. Onomatopoeia & Sound Effects: Manga sounds like explosion (ドカン dokan), heart beating (ドキドキ dokidoki), or animal cries (ワンワン wanwan for barking).\n4. Scientific & Botanical Terms: Species names of plants and animals (e.g. イヌ inu for Canis lupus familiaris).\n5. Visual Emphasis: Similar to writing in ALL-CAPS or *italics* in English for cool branding or robotic speech.',
        keyRule: 'Foreign words, foreign names, and borrowed terms are always written in Katakana.',
        examples: [
          {
            japanese: 'コーヒー',
            reading: 'コーヒー',
            romaji: 'koohii',
            english: 'Coffee (loanword from Dutch "koffie" -> Katakana)',
            breakdown: [
              { part: 'コー', role: 'Long "kō"', color: 'text-rose-800 font-semibold' },
              { part: 'ヒー', role: 'Long "hī"', color: 'text-rose-800 font-semibold' }
            ]
          },
          {
            japanese: 'パン',
            reading: 'パン',
            romaji: 'pan',
            english: 'Bread (loanword from Portuguese "pão" brought in the 1500s)',
            breakdown: [
              { part: 'パン', role: 'Katakana loanword', color: 'text-rose-800 font-semibold' }
            ]
          },
          {
            japanese: 'ホテル',
            reading: 'ホテル',
            romaji: 'hoteru',
            english: 'Hotel (loanword from English "hotel")',
            breakdown: [
              { part: 'ホ・テ・ル', role: 'Three mora Katakana transliteration', color: 'text-rose-800 font-semibold' }
            ]
          },
          {
            japanese: 'スマホ',
            reading: 'スマホ',
            romaji: 'sumaho',
            english: 'Smartphone (Japanese abbreviation of スマートフォン sumātofon)',
            breakdown: [
              { part: 'スマホ', role: 'Abbreviated Katakana tech term', color: 'text-rose-800 font-semibold' }
            ]
          }
        ],
        tip: 'The horizontal dash (ー) in Katakana (like in コーヒー) indicates a prolonged vowel sound (doubling the duration of that beat)!'
      },
      {
        title: '4. Why Does Japanese Need Kanji (漢字)?',
        explanation:
          'Beginners often wonder: "If Hiragana can spell every single sound, why do we need thousands of Kanji?" There are two crucial reasons:\n1. Japanese has no spaces! In English, spaces tell you where words begin and end. In Japanese, sentences are written without spaces. Kanji provides natural visual boundaries between words and grammar.\n2. Overwhelming Homophones: Japanese has a very small phonetic sound pool (only ~100 sounds vs thousands in English). Words like "hashi" can mean 箸 (chopsticks), 橋 (bridge), or 端 (edge). Without Kanji, they look identical as はし!',
        keyRule: 'Kanji gives words instant semantic clarity and makes rapid reading effortless without word spaces.',
        examples: [
          {
            japanese: '箸と橋',
            reading: 'はしとはし',
            romaji: 'hashi to hashi',
            english: 'Chopsticks and bridge (identical kana はし, completely distinct kanji 箸 & 橋)',
            breakdown: [
              { part: '箸 (はし)', role: 'Chopsticks (wood/eating tool)', color: 'text-sky-800 font-semibold' },
              { part: 'と', role: 'Particle "and"', color: 'text-amber-700 font-semibold' },
              { part: '橋 (はし)', role: 'Bridge (civil structure)', color: 'text-sky-800 font-semibold' }
            ]
          },
          {
            japanese: 'すしを食べます',
            reading: 'すしをたべます',
            romaji: 'sushi o tabemasu',
            english: 'Eat sushi (clear visual separation: noun, particle を, verb 食, ending べます)',
            breakdown: [
              { part: 'すし', role: 'Noun (Sushi)', color: 'text-stone-800 font-semibold' },
              { part: 'を', role: 'Object particle', color: 'text-amber-700 font-semibold' },
              { part: '食 (た)', role: 'Kanji root (eat)', color: 'text-sky-800 font-semibold' },
              { part: 'べます', role: 'Hiragana polite ending', color: 'text-rose-700 font-semibold' }
            ]
          }
        ],
        tip: 'For JLPT N5, you only need ~100 simple, high-frequency Kanji (like numbers, days of the week, basic directions, and common verbs like 行く, 見る, 食べる).'
      },
      {
        title: '5. Sentence Anatomy: Seeing All 3 Scripts in Action Together',
        explanation:
          'Real Japanese sentences seamlessly integrate all three scripts side-by-side. Observe how Katakana handles foreign imports, Kanji anchors roots, and Hiragana stitches the grammar together into a cohesive thought.',
        keyRule: 'Look at this real sentence: アンナさんはホテルでコーヒーを飲みます。 (Anna drinks coffee at the hotel.)',
        examples: [
          {
            japanese: 'アンナさんはホテルでコーヒーを飲みます。',
            reading: 'あんなさんはほてるでこーひーをのみます。',
            romaji: 'Anna-san wa hoteru de koohii o nomimasu.',
            english: 'Anna drinks coffee at the hotel.',
            breakdown: [
              { part: 'アンナ', role: 'Katakana (Foreign personal name "Anna")', color: 'text-purple-700 font-semibold' },
              { part: 'さん', role: 'Hiragana (Honorific title "Mr./Ms.")', color: 'text-amber-700 font-semibold' },
              { part: 'は', role: 'Hiragana (Topic particle "wa")', color: 'text-amber-800 font-bold' },
              { part: 'ホテル', role: 'Katakana (Loanword "hotel")', color: 'text-purple-700 font-semibold' },
              { part: 'で', role: 'Hiragana (Location particle "de")', color: 'text-amber-800 font-bold' },
              { part: 'コーヒー', role: 'Katakana (Loanword "coffee")', color: 'text-purple-700 font-semibold' },
              { part: 'を', role: 'Hiragana (Object particle "o")', color: 'text-amber-800 font-bold' },
              { part: '飲 (の)', role: 'Kanji (Root meaning "drink")', color: 'text-sky-800 font-bold' },
              { part: 'みます', role: 'Hiragana (Polite present verb inflection)', color: 'text-rose-700 font-semibold' }
            ]
          }
        ],
        tip: 'Once you understand the role of each script, reading Japanese feels like unlocking a secret code where every color has a purpose!'
      }
    ],
    quiz: [
      {
        id: 'q-ws-1',
        question: 'Which writing system should you use to write your own non-Japanese name (e.g., John, Sarah)?',
        options: ['Hiragana (ひらがな)', 'Katakana (カタカナ)', 'Kanji (漢字)', 'Only Romaji'],
        correctIndex: 1,
        explanation: 'Katakana is specifically designated for foreign personal names, foreign cities, and loanwords.'
      },
      {
        id: 'q-ws-2',
        question: 'Why are grammatical particles (like は, を, に, で) written in Hiragana?',
        options: [
          'Because Hiragana is used for native Japanese grammar and structural connectors',
          'Because particles are foreign words',
          'Because Hiragana was invented for monks only',
          'Because particles do not have sounds'
        ],
        correctIndex: 0,
        explanation: 'Hiragana represents the native structural glue of Japanese sentences, including all grammatical particles.'
      },
      {
        id: 'q-ws-3',
        question: 'Which of the following words is written in Katakana because it is an imported foreign loanword?',
        options: ['ありがとう (Thank you)', 'コーヒー (Coffee)', 'すし (Sushi)', 'さようなら (Goodbye)'],
        correctIndex: 1,
        explanation: 'コーヒー (coffee) was imported from Dutch/English and is therefore written in Katakana. The others are native Japanese terms.'
      },
      {
        id: 'q-ws-4',
        question: 'Why does Japanese retain Kanji characters instead of using only Hiragana?',
        options: [
          'Because Japanese has no spaces and has many homophones with identical sounds',
          'Because Hiragana is too difficult to write',
          'Because the Japanese government made Katakana illegal',
          'Because Kanji characters represent English sounds'
        ],
        correctIndex: 0,
        explanation: 'Kanji gives words unique visual meanings to distinguish homophones (like hashi = bridge vs chopsticks) and separates words visually since Japanese uses no spaces.'
      }
    ]
  },
  {
    id: 'lesson-kana-basics',
    phaseId: 1,
    title: 'The Japanese Sound System & Kana Fundamentals',
    subtitle: 'Hiragana, Katakana, Dakuten & Pitch Accent',
    estimatedMinutes: 15,
    level: 'N5',
    tags: ['Phonetics', 'Writing System', 'Kana'],
    overview:
      'Japanese has only 5 pure vowel sounds (a, i, u, e, o) combined with consonants to form 46 base mora sounds. You will learn how sounds are grouped, how voicing marks (゛ and ゜) work, and how to read your first real Japanese words.',
    sections: [
      {
        title: '1. The 5 Cardinal Vowels: The Base of Everything',
        explanation:
          'Unlike English where vowel sounds change randomly, Japanese vowels are completely uniform and pure. Learn them in strict order: あ (a), い (i), う (u), え (e), お (o). Every consonant row follows this exact 5-vowel pattern: Ka Ki Ku Ke Ko, Sa Shi Su Se So, etc.',
        keyRule: 'Always keep vowel sounds short and crisp unless a prolonged vowel marker is written.',
        examples: [
          {
            japanese: 'あい',
            reading: 'あい',
            romaji: 'ai',
            english: 'Love',
            breakdown: [
              { part: 'あ', role: 'Vowel "a"', color: 'text-amber-700 font-semibold' },
              { part: 'い', role: 'Vowel "i"', color: 'text-sky-700 font-semibold' }
            ]
          },
          {
            japanese: 'いえ',
            reading: 'いえ',
            romaji: 'ie',
            english: 'House / Home',
            breakdown: [
              { part: 'い', role: 'Vowel "i"', color: 'text-sky-700 font-semibold' },
              { part: 'え', role: 'Vowel "e"', color: 'text-emerald-700 font-semibold' }
            ]
          },
          {
            japanese: 'あお',
            reading: 'あお',
            romaji: 'ao',
            english: 'Blue',
            breakdown: [
              { part: 'あ', role: 'Vowel "a"', color: 'text-amber-700 font-semibold' },
              { part: 'お', role: 'Vowel "o"', color: 'text-purple-700 font-semibold' }
            ]
          }
        ],
        tip: 'う is pronounced with unrounded lips (close to "oo", but without puckering your lips forward).'
      },
      {
        title: '2. Voicing Marks: Dakuten (゛) and Handakuten (゜)',
        explanation:
          'You do not have to memorize brand new symbols for voiced sounds! Just add two small strokes (゛ tenten) to voice unvoiced consonants: K becomes G, S becomes Z, T becomes D, and H becomes B. Adding a circle (゜ maru) turns H into P.',
        keyRule: 'か (ka) -> が (ga) | さ (sa) -> ざ (za) | た (ta) -> だ (da) | は (ha) -> ば (ba) | は (ha) -> ぱ (pa)',
        examples: [
          {
            japanese: 'えいが',
            reading: 'えいが',
            romaji: 'eiga',
            english: 'Movie',
            breakdown: [
              { part: 'えい', role: 'ei (long e sound)', color: 'text-emerald-700 font-semibold' },
              { part: 'が', role: 'voiced "ga"', color: 'text-rose-700 font-semibold' }
            ]
          },
          {
            japanese: 'かさ',
            reading: 'かさ',
            romaji: 'kasa',
            english: 'Umbrella',
            breakdown: [
              { part: 'か', role: 'ka', color: 'text-amber-700 font-semibold' },
              { part: 'さ', role: 'sa', color: 'text-sky-700 font-semibold' }
            ]
          },
          {
            japanese: 'きっぷ',
            reading: 'きっぷ',
            romaji: 'kippu',
            english: 'Ticket (with small tsu + handakuten pu)',
            breakdown: [
              { part: 'き', role: 'ki', color: 'text-amber-700 font-semibold' },
              { part: 'っ', role: 'glottal pause', color: 'text-stone-500 font-semibold' },
              { part: 'ぷ', role: 'pu', color: 'text-purple-700 font-semibold' }
            ]
          }
        ],
        tip: 'Notice the small っ (tsu) in きっぷ (ticket). It is a silent one-beat stop before the next consonant sound!'
      }
    ],
    quiz: [
      {
        id: 'q-kana-1',
        question: 'Which of the following is the correct vowel order in Japanese?',
        options: ['A, E, I, O, U', 'A, I, U, E, O', 'O, U, E, I, A', 'A, O, U, E, I'],
        correctIndex: 1,
        explanation: 'Japanese vowels follow the traditional Gojūon order: A, I, U, E, O (あ, い, う, え, お).'
      },
      {
        id: 'q-kana-2',
        question: 'What sound is produced when you add a handakuten (゜) to は (ha)?',
        options: ['ば (ba)', 'ぱ (pa)', 'が (ga)', 'だ (da)'],
        correctIndex: 1,
        explanation: 'Adding the circle (maru / handakuten) transforms the H row into P: は (ha) -> ぱ (pa).'
      },
      {
        id: 'q-kana-3',
        question: 'What is the function of the small っ (tsu) in words like ちょっと (chotto)?',
        options: [
          'It adds an extra "u" vowel sound',
          'It is a silent glottal stop that doubles the following consonant',
          'It makes the preceding vowel longer',
          'It turns the word into a question'
        ],
        correctIndex: 1,
        explanation: 'Small っ (sokuon) represents a one-beat pause before the next consonant (e.g. k, s, t, p).'
      }
    ]
  },
  {
    id: 'lesson-core-sentence',
    phaseId: 2,
    title: 'The Identity Equation: A は B です',
    subtitle: 'Topic marker は, Copula です, and polite negations',
    estimatedMinutes: 20,
    level: 'N5',
    tags: ['Grammar', 'Core Sentence', 'Particles'],
    overview:
      'The foundational formula of Japanese is [Topic] は [Description] です. Master this and you can already introduce yourself, declare your nationality, state professions, identify objects, and ask questions with か.',
    sections: [
      {
        title: '1. The Universal Pattern: A は B です',
        explanation:
          'In this structure, は is a grammatical particle. Crucial pronunciation rule: when written as a topic particle, は is pronounced "WA", not "ha". です (desu) is the polite copula meaning "is / am / are". The "u" in desu is often devoiced in standard Tokyo Japanese, sounding like "des".',
        keyRule: 'Topic は + Identity/Noun + です = "Speaking of Topic, it is Identity."',
        examples: [
          {
            japanese: 'わたし は がくせい です。',
            reading: 'わたしはがくせいです。',
            romaji: 'Watashi wa gakusei desu.',
            english: 'I am a student.',
            breakdown: [
              { part: 'わたし', role: 'Subject / Topic (I)', color: 'text-stone-900 font-bold' },
              { part: 'は', role: 'Topic particle ("wa")', color: 'text-rose-600 font-bold' },
              { part: 'がくせい', role: 'Noun (student)', color: 'text-blue-600 font-bold' },
              { part: 'です', role: 'Copula (am/is)', color: 'text-emerald-600 font-bold' }
            ]
          },
          {
            japanese: 'たなかさん は にほんじん です。',
            reading: 'たなかさんはにほんじんです。',
            romaji: 'Tanaka-san wa nihonjin desu.',
            english: 'Mr./Ms. Tanaka is Japanese.',
            breakdown: [
              { part: 'たなかさん', role: 'Topic (Tanaka-san)', color: 'text-stone-900 font-bold' },
              { part: 'は', role: 'Topic particle ("wa")', color: 'text-rose-600 font-bold' },
              { part: 'にほんじん', role: 'Noun (Japanese person)', color: 'text-blue-600 font-bold' },
              { part: 'です', role: 'Copula (is)', color: 'text-emerald-600 font-bold' }
            ]
          }
        ],
        tip: 'In Japanese, if the topic is obvious from context (e.g. you are talking about yourself), わたしは is usually dropped! Simply saying "がくせいです" is more natural.'
      },
      {
        title: '2. Negative & Question Forms: ではありません & ~ですか',
        explanation:
          'To say "is NOT", replace です with ではありません (formal) or じゃありません (conversational). To turn any sentence into a question, simply append か at the end with a slight rising intonation—no change in word order is required!',
        keyRule: 'Negative: A は B じゃありません | Question: A は B ですか',
        examples: [
          {
            japanese: 'わたし は せんせい じゃありません。',
            reading: 'わたしはせんせいじゃありません。',
            romaji: 'Watashi wa sensei ja arimasen.',
            english: 'I am not a teacher.',
            breakdown: [
              { part: 'わたし', role: 'Topic (I)', color: 'text-stone-900 font-bold' },
              { part: 'は', role: 'Topic particle ("wa")', color: 'text-rose-600 font-bold' },
              { part: 'せんせい', role: 'Noun (teacher)', color: 'text-blue-600 font-bold' },
              { part: 'じゃありません', role: 'Negative copula (am not)', color: 'text-rose-700 font-bold' }
            ]
          },
          {
            japanese: 'これ は なん です か。',
            reading: 'これはなんですか。',
            romaji: 'Kore wa nan desu ka.',
            english: 'What is this?',
            breakdown: [
              { part: 'これ', role: 'Pronoun (this)', color: 'text-stone-900 font-bold' },
              { part: 'は', role: 'Topic particle', color: 'text-rose-600 font-bold' },
              { part: 'なん', role: 'Question word (what)', color: 'text-amber-600 font-bold' },
              { part: 'です', role: 'Copula (is)', color: 'text-emerald-600 font-bold' },
              { part: 'か', role: 'Question particle (?)', color: 'text-rose-600 font-bold' }
            ]
          }
        ]
      }
    ],
    quiz: [
      {
        id: 'q-core-1',
        question: 'How is the topic particle は pronounced in "わたしはがくせいです"?',
        options: ['"ha"', '"wa"', '"ya"', '"ba"'],
        correctIndex: 1,
        explanation: 'When は acts as a grammatical particle, it is always pronounced "wa".'
      },
      {
        id: 'q-core-2',
        question: 'How do you say "Mr. Tanaka is not a doctor" politely in Japanese?',
        options: [
          'たなかさんは いしゃ ですか',
          'たなかさんは いしゃ じゃありません',
          'たなかさんは いしゃ です',
          'たなかさんは いしゃ ありませんでした'
        ],
        correctIndex: 1,
        explanation: 'じゃありません (or ではありません) is the polite present negative copula meaning "is not".'
      },
      {
        id: 'q-core-3',
        question: 'What do you add to the end of a sentence to turn it into a question?',
        options: ['ね', 'よ', 'か', 'を'],
        correctIndex: 2,
        explanation: 'The particle か acts like a question mark at the end of a sentence.'
      }
    ]
  },
  {
    id: 'lesson-essential-particles',
    phaseId: 2,
    title: 'Essential N5 Particles: The Traffic Signs of Japanese',
    subtitle: 'Mastering を, に, で, へ, も, and と without confusion',
    estimatedMinutes: 25,
    level: 'N5',
    tags: ['Grammar', 'Particles', 'N5 Core'],
    overview:
      'Particles are postpositions attached to nouns to define their function: direct object (を), location of action (で), target of movement or specific time (に), direction (へ), "also" (も), and "and/with" (と).',
    sections: [
      {
        title: '1. The Direct Object Marker: を (pronounced "o")',
        explanation:
          'The particle を marks the direct recipient of an action. For instance: eating bread, drinking tea, reading a book. Notice that the kana character を is exclusively used as this grammatical particle (never inside normal vocabulary words).',
        keyRule: '[Noun] を [Action Verb] = Verb the Noun',
        examples: [
          {
            japanese: 'みず を のみます。',
            reading: 'みずをのみます。',
            romaji: 'Mizu o nomimasu.',
            english: 'I drink water.',
            breakdown: [
              { part: 'みず', role: 'Object (water)', color: 'text-stone-900 font-bold' },
              { part: 'を', role: 'Object particle ("o")', color: 'text-rose-600 font-bold' },
              { part: 'のみます', role: 'Verb (drink [polite])', color: 'text-emerald-700 font-bold' }
            ]
          },
          {
            japanese: '日本語 を べんきょうします。',
            reading: 'にほんごをべんきょうします。',
            romaji: 'Nihongo o benkyou shimasu.',
            english: 'I study Japanese.',
            breakdown: [
              { part: '日本語', role: 'Object (Japanese)', color: 'text-stone-900 font-bold' },
              { part: 'を', role: 'Object particle ("o")', color: 'text-rose-600 font-bold' },
              { part: 'べんきょうします', role: 'Verb (study)', color: 'text-emerald-700 font-bold' }
            ]
          }
        ]
      },
      {
        title: '2. Location of Action (で) vs Target / Specific Time (に)',
        explanation:
          'One of the most common beginner mistakes is confusing で and に for places. Here is the golden rule: で marks WHERE an active event occurs (eating at a restaurant, studying at the library). に marks the static location of existence (いる / ある) or a specific numerical time point (at 7:00, on Monday).',
        keyRule: '[Place] で [Action] = Do action AT place | [Time] に [Action] = Do action AT time',
        examples: [
          {
            japanese: 'としょかん で ほん を よみます。',
            reading: 'としょかんでほんをよみます。',
            romaji: 'Toshokan de hon o yomimasu.',
            english: 'I read books at the library.',
            breakdown: [
              { part: 'としょかん', role: 'Location (library)', color: 'text-stone-900 font-bold' },
              { part: 'で', role: 'Action location particle ("at/in")', color: 'text-amber-600 font-bold' },
              { part: 'ほん', role: 'Object (book)', color: 'text-stone-900 font-bold' },
              { part: 'を', role: 'Object marker', color: 'text-rose-600 font-bold' },
              { part: 'よみます', role: 'Action verb (read)', color: 'text-emerald-700 font-bold' }
            ]
          },
          {
            japanese: 'あさ 7じ に おきます。',
            reading: 'あさしちじにおきます。',
            romaji: 'Asa shichi-ji ni okimasu.',
            english: 'I wake up at 7:00 in the morning.',
            breakdown: [
              { part: 'あさ 7じ', role: 'Time (7:00 am)', color: 'text-stone-900 font-bold' },
              { part: 'に', role: 'Specific time particle ("at")', color: 'text-sky-600 font-bold' },
              { part: 'おきます', role: 'Verb (wake up)', color: 'text-emerald-700 font-bold' }
            ]
          }
        ],
        tip: 'Relative time words like 今日 (today), 明日 (tomorrow), and 毎日 (every day) do NOT take に!'
      },
      {
        title: '3. Direction: へ (pronounced "e") & Destination に',
        explanation:
          'When movement verbs like 行きます (go), 来ます (come), and 帰ります (return home) are used, へ marks the general direction ("towards"), while に marks the exact destination point. Both are often interchangeable at N5!',
        keyRule: '[Destination] へ / に 行きます = Go to [Destination]',
        examples: [
          {
            japanese: 'とうきょう へ いきます。',
            reading: 'とうきょうへいきます。',
            romaji: 'Toukyou e ikimasu.',
            english: 'I am going to Tokyo.',
            breakdown: [
              { part: 'とうきょう', role: 'Destination (Tokyo)', color: 'text-stone-900 font-bold' },
              { part: 'へ', role: 'Direction particle ("e")', color: 'text-indigo-600 font-bold' },
              { part: 'いきます', role: 'Movement verb (go)', color: 'text-emerald-700 font-bold' }
            ]
          }
        ]
      }
    ],
    quiz: [
      {
        id: 'q-part-1',
        question: 'Which particle fills the blank? "パン _____ 食べます (I eat bread)"',
        options: ['は', 'を', 'に', 'で'],
        correctIndex: 1,
        explanation: 'パン (bread) is the direct object of the verb 食べます (eat), so it requires を.'
      },
      {
        id: 'q-part-2',
        question: 'Which particle marks the active location in "レストラン _____ ごはんを食べました"?',
        options: ['に', 'へ', 'で', 'を'],
        correctIndex: 2,
        explanation: 'で is used to mark the physical location where an active event/action takes place.'
      },
      {
        id: 'q-part-3',
        question: 'Does the relative time word "あした" (tomorrow) take the particle に?',
        options: ['Yes, always: あしたに', 'No, relative time words do not take に: あした', 'Only in questions', 'Only with past verbs'],
        correctIndex: 1,
        explanation: 'Relative time expressions (today, tomorrow, yesterday, every day) do NOT take に. Specific numbers (7:00, Monday) do.'
      }
    ]
  },
  {
    id: 'lesson-verbs-masu',
    phaseId: 3,
    title: 'The Verb Engine: Verb Groups & Masu Conjugation',
    subtitle: 'Godan, Ichidan, Irregular & the 4-Quadrant Matrix',
    estimatedMinutes: 25,
    level: 'N5',
    tags: ['Verbs', 'Conjugation', 'Masu Form'],
    overview:
      'All Japanese verbs end in an "-u" vowel sound in dictionary form. You will learn how to categorize verbs into 3 Groups and conjugate them smoothly into present affirmative (~ます), negative (~ません), past affirmative (~ました), and past negative (~ませんでした).',
    sections: [
      {
        title: '1. The 3 Japanese Verb Groups',
        explanation:
          'Group 1 (Godan): Most verbs ending in -u, -ku, -su, -tsu, -nu, -fu/bu/mu, -ru. To form the Masu stem, change the final "-u" vowel to an "-i" sound (e.g., 書く kaku -> 書き kaki + ます).\nGroup 2 (Ichidan): Verbs ending in -iru or -eru. Just drop る and add ます (e.g., 食べる taberu -> 食べ tabe + ます, 見る miru -> 見 mi + ます).\nGroup 3 (Irregular): Only TWO verbs! する (suru -> します) and 来る (kuru -> きます).',
        keyRule: 'Group 1: -u changes to -i + ます | Group 2: drop る + ます | Group 3: します & きます',
        examples: [
          {
            japanese: 'たべる -> たべます',
            reading: 'たべる -> たべます',
            romaji: 'taberu -> tabemasu',
            english: 'to eat -> eat (polite)',
            breakdown: [
              { part: 'たべる (Group 2)', role: 'drop る', color: 'text-stone-700' },
              { part: 'たべます', role: 'Polite Masu', color: 'text-emerald-700 font-bold' }
            ]
          },
          {
            japanese: 'のむ -> のみます',
            reading: 'のむ -> のみます',
            romaji: 'nomu -> nomimasu',
            english: 'to drink -> drink (polite)',
            breakdown: [
              { part: 'のむ (Group 1)', role: 'mu -> mi', color: 'text-stone-700' },
              { part: 'のみます', role: 'Polite Masu', color: 'text-emerald-700 font-bold' }
            ]
          },
          {
            japanese: 'べんきょうする -> べんきょうします',
            reading: 'べんきょうする -> べんきょうします',
            romaji: 'benkyou suru -> benkyou shimasu',
            english: 'to study -> study (polite)',
            breakdown: [
              { part: 'する (Group 3)', role: 'irregular', color: 'text-stone-700' },
              { part: 'します', role: 'Polite Masu', color: 'text-emerald-700 font-bold' }
            ]
          }
        ]
      },
      {
        title: '2. The 4-Quadrant Masu Matrix',
        explanation:
          'Once you have the Masu stem, creating past and negative forms is remarkably regular! Japanese has NO irregular past-tense suffixes in the Masu form.',
        keyRule: 'Present Affirmative: ~ます | Present Negative: ~ません | Past Affirmative: ~ました | Past Negative: ~ませんでした',
        examples: [
          {
            japanese: 'きのう えいが を みました。',
            reading: 'きのうえいがをみました。',
            romaji: 'Kinou eiga o mimashita.',
            english: 'I watched a movie yesterday.',
            breakdown: [
              { part: 'きのう', role: 'Time (yesterday)', color: 'text-stone-700' },
              { part: 'えいが を', role: 'Object (movie)', color: 'text-stone-900' },
              { part: 'みました', role: 'Past affirmative (watched)', color: 'text-emerald-700 font-bold' }
            ]
          },
          {
            japanese: 'あさごはん を たべませんでした。',
            reading: 'あさごはんをたべませんでした。',
            romaji: 'Asagohan o tabemasen deshita.',
            english: 'I did not eat breakfast.',
            breakdown: [
              { part: 'あさごはん を', role: 'Object (breakfast)', color: 'text-stone-900' },
              { part: 'たべませんでした', role: 'Past negative (did not eat)', color: 'text-rose-700 font-bold' }
            ]
          }
        ]
      }
    ],
    quiz: [
      {
        id: 'q-verb-1',
        question: 'What is the polite present form of the Group 1 verb 行く (iku: to go)?',
        options: ['行きます (ikimasu)', '行けます (ikemasu)', '行きまする (ikimasuru)', '行きますた (ikimashita)'],
        correctIndex: 0,
        explanation: 'Group 1 verb 行く (iku) shifts "ku" to "ki" + ます = 行きます (ikimasu).'
      },
      {
        id: 'q-verb-2',
        question: 'How do you say "I did not study" in polite Japanese?',
        options: ['勉強しませんでした', '勉強しました', '勉強しません', '勉強したない'],
        correctIndex: 0,
        explanation: 'Past negative for polite verbs ends in ~ませんでした (benkyou shimasen deshita).'
      },
      {
        id: 'q-verb-3',
        question: 'What are the two irregular verbs in Group 3?',
        options: ['たべる and のむ', 'する and くる', 'いく and かえる', 'みる and きく'],
        correctIndex: 1,
        explanation: 'Group 3 consists strictly of する (to do) and 来る / くる (to come).'
      }
    ]
  },
  {
    id: 'lesson-adjectives',
    phaseId: 4,
    title: 'Adjectives: い-Adjectives vs な-Adjectives',
    subtitle: 'Inflections, modifiers, and describing feelings & objects',
    estimatedMinutes: 20,
    level: 'N5',
    tags: ['Adjectives', 'Grammar', 'Inflection'],
    overview:
      'Japanese adjectives are divided into true adjectives (い-adjectives) and adjectival nouns (な-adjectives). They conjugate differently for negatives and past tense. Learn the golden rules and the famous exception いい (good).',
    sections: [
      {
        title: '1. い-Adjectives: Self-Conjugating Verbs of Quality',
        explanation:
          'い-adjectives always end in the hiragana い (e.g. たかい, おいしい, さむい). To conjugate them, remove the final い and add:\nNegative: ~くない (おいしくない = not delicious)\nPast: ~かった (おいしかった = was delicious)\nPast Negative: ~くなかった (おいしくなかった = was not delicious)\nTo make it polite, simply add です after it.',
        keyRule: 'Drop い: + くない (neg) | + かった (past) | + くなかった (past neg)',
        examples: [
          {
            japanese: 'このラーメン は おいしい です。',
            reading: 'このらーめんはおいしいです。',
            romaji: 'Kono raamen wa oishii desu.',
            english: 'This ramen is delicious.',
            breakdown: [
              { part: 'このラーメン は', role: 'Topic', color: 'text-stone-900' },
              { part: 'おいしい です', role: 'Present polite adjective', color: 'text-emerald-700 font-bold' }
            ]
          },
          {
            japanese: 'きのう は さむくなかった です。',
            reading: 'きのうはさむくなかったです。',
            romaji: 'Kinou wa samukunakatta desu.',
            english: 'Yesterday was not cold.',
            breakdown: [
              { part: 'きのう は', role: 'Topic (yesterday)', color: 'text-stone-900' },
              { part: 'さむくなかった です', role: 'Past negative (was not cold)', color: 'text-sky-700 font-bold' }
            ]
          }
        ],
        tip: 'CRITICAL EXCEPTION: いい (good) conjugates from its archaic base よい! Negative is よくない, past is よかった, past negative is よくなかった.'
      },
      {
        title: '2. な-Adjectives: Adjectives that Act Like Nouns',
        explanation:
          'な-adjectives (e.g. しずか quiet, げんき healthy/energetic, ゆうめい famous) do NOT change their internal ending. Instead, they conjugate just like nouns with です / じゃありません / でした / じゃありませんでした! However, when placed DIRECTLY in front of a noun to modify it, you must insert な.',
        keyRule: 'Before noun: [Adjective] な [Noun] (e.g., しずかな町) | Predicate: [Noun] は [Adjective] です',
        examples: [
          {
            japanese: 'しずかな まち です。',
            reading: 'しずかなまちです。',
            romaji: 'Shizuka na machi desu.',
            english: 'It is a quiet town.',
            breakdown: [
              { part: 'しずか', role: 'Na-adjective stem', color: 'text-stone-900' },
              { part: 'な', role: 'Particle particle linking to noun', color: 'text-rose-600 font-bold' },
              { part: 'まち', role: 'Noun (town)', color: 'text-stone-900' },
              { part: 'です', role: 'Copula', color: 'text-emerald-700 font-bold' }
            ]
          },
          {
            japanese: 'このへや は しずか じゃありません。',
            reading: 'このへやはしずかじゃありません。',
            romaji: 'Kono heya wa shizuka ja arimasen.',
            english: 'This room is not quiet.',
            breakdown: [
              { part: 'このへや は', role: 'Topic (this room)', color: 'text-stone-900' },
              { part: 'しずか じゃありません', role: 'Negative (is not quiet)', color: 'text-rose-700 font-bold' }
            ]
          }
        ]
      }
    ],
    quiz: [
      {
        id: 'q-adj-1',
        question: 'What is the past negative form of the い-adjective たかい (expensive)?',
        options: ['たかくないでした', 'たかくなかったです', 'たかいじゃありませんでした', 'たかかったです'],
        correctIndex: 1,
        explanation: 'い-adjectives form the past negative by replacing the final い with くなかった (takakunakatta desu).'
      },
      {
        id: 'q-adj-2',
        question: 'How do you modify the noun 人 (person) with the な-adjective 親切 (kind)?',
        options: ['親切人', '親切い人', '親切な人', '親切の人'],
        correctIndex: 2,
        explanation: 'な-adjectives require な when placed directly before a noun to describe it: 親切な人 (shinsetsu na hito).'
      },
      {
        id: 'q-adj-3',
        question: 'What is the past form of いい (good)?',
        options: ['いかった', 'よかったです', 'いいでした', 'よくない'],
        correctIndex: 1,
        explanation: 'いい conjugates from its base よい, so its past affirmative is よかった (or よかったです in polite speech).'
      }
    ]
  },
  {
    id: 'lesson-te-form',
    phaseId: 5,
    title: 'The Swiss Army Knife: The Te-Form (て形)',
    subtitle: 'Connecting actions, ~てください (requests), and ~ています',
    estimatedMinutes: 30,
    level: 'N5',
    tags: ['Te-Form', 'Verbs', 'Advanced N5'],
    overview:
      'The て-form is the bridge that links multiple verbs together, creates polite requests, describes ongoing actions, and expresses sequences. Memorize the sound transformation rules with the classic memory cadence.',
    sections: [
      {
        title: '1. Group 1 Te-Form Rules (The Song)',
        explanation:
          'Group 1 verbs change their final syllables according to this rhythmic pattern:\n1) う, つ, る -> って (買 [か] う -> かって, 待 [ま] つ -> まって, 取 [と] る -> とって)\n2) む, ぶ, ぬ -> んで (飲 [の] む -> のんで, 遊 [あそ] ぶ -> あそんで, 死 [し] ぬ -> しんで)\n3) く -> いて (書 [か] く -> かいて) [Exception: 行く -> 行って]\n4) ぐ -> いで (泳 [およ] ぐ -> およいで)\n5) す -> して (話 [はな] す -> はなして)',
        keyRule: 'Group 2 is easy: drop る and add て (たべて, みて). Group 3: して, きて.',
        examples: [
          {
            japanese: 'ちょっと まって ください。',
            reading: 'ちょっとまってください。',
            romaji: 'Chotto matte kudasai.',
            english: 'Please wait a moment.',
            breakdown: [
              { part: 'ちょっと', role: 'Adverb (a little bit)', color: 'text-stone-700' },
              { part: 'まって', role: 'Te-form of まつ (wait)', color: 'text-rose-600 font-bold' },
              { part: 'ください', role: 'Polite request (please)', color: 'text-emerald-700 font-bold' }
            ]
          },
          {
            japanese: '日本語 で はなして ください。',
            reading: 'にほんごではなしてください。',
            romaji: 'Nihongo de hanashite kudasai.',
            english: 'Please speak in Japanese.',
            breakdown: [
              { part: '日本語 で', role: 'Means/language (in Japanese)', color: 'text-stone-900' },
              { part: 'はなして', role: 'Te-form of はなす (speak)', color: 'text-rose-600 font-bold' },
              { part: 'ください', role: 'Please', color: 'text-emerald-700 font-bold' }
            ]
          }
        ]
      },
      {
        title: '2. Ongoing Actions & States: ~ています',
        explanation:
          'When you combine the Te-form with います (the verb for living existence), it denotes an action currently in progress (like "-ing" in English) or a continuing state (like being married or living in a city).',
        keyRule: '[Verb Te-form] + います = Currently doing [Verb]',
        examples: [
          {
            japanese: 'いま ごはん を たべて います。',
            reading: 'いまごはんをたべています。',
            romaji: 'Ima gohan o tabete imasu.',
            english: 'I am eating a meal right now.',
            breakdown: [
              { part: 'いま', role: 'Time (now)', color: 'text-stone-700' },
              { part: 'ごはん を', role: 'Object (meal)', color: 'text-stone-900' },
              { part: 'たべて います', role: 'Continuous (eating)', color: 'text-emerald-700 font-bold' }
            ]
          },
          {
            japanese: 'とうきょう に すんで います。',
            reading: 'とうきょうにすんでいます。',
            romaji: 'Toukyou ni sunde imasu.',
            english: 'I live in Tokyo (state of residence).',
            breakdown: [
              { part: 'とうきょう に', role: 'Location point', color: 'text-stone-900' },
              { part: 'すんで います', role: 'State (living / residing)', color: 'text-emerald-700 font-bold' }
            ]
          }
        ]
      }
    ],
    quiz: [
      {
        id: 'q-te-1',
        question: 'What is the Te-form of the verb 飲む (nomu: to drink)?',
        options: ['のみて', 'のんで', 'のって', 'のんでください'],
        correctIndex: 1,
        explanation: 'Verbs ending in む (mu) change to んで in the Te-form: 飲む -> 飲んで (nonde).'
      },
      {
        id: 'q-te-2',
        question: 'What is the irregular Te-form exception for 行く (iku: to go)?',
        options: ['いいて', 'いって', 'いきって', 'いで'],
        correctIndex: 1,
        explanation: 'Although く normally changes to いて, the verb 行く is an important exception that becomes 行って (itte).'
      },
      {
        id: 'q-te-3',
        question: 'How do you ask someone politely "Please read this book"?',
        options: [
          'この本を読んでください',
          'この本を読みますください',
          'この本を読んだください',
          'この本を読まないで'
        ],
        correctIndex: 0,
        explanation: 'The request pattern is [Te-form] + ください. 読む becomes 読んで + ください = 読んでください.'
      }
    ]
  },
  {
    id: 'lesson-kanji-essentials',
    phaseId: 6,
    title: 'Core N5 Kanji Foundations: Radicals & Readings',
    subtitle: 'On\'yomi vs Kun\'yomi, Pictographs, and Number Systems',
    estimatedMinutes: 20,
    level: 'N5',
    tags: ['Kanji', 'JLPT N5', 'Radicals'],
    overview:
      'Kanji are not random lines; they are modular logographs built from ~214 basic radicals. Learn the difference between On\'yomi (Chinese reading, used in compound words) and Kun\'yomi (native Japanese reading, used in standalone words), plus essential N5 base characters.',
    sections: [
      {
        title: '1. Why Kanji Has Two Readings (On vs Kun)',
        explanation:
          'When Chinese characters arrived in Japan in the 5th century, the Japanese adopted the Chinese sounds (On\'yomi 音読み) and also mapped their existing native spoken words to the character\'s meaning (Kun\'yomi 訓読み).\nRule of thumb:\n- Kanji standing alone (often accompanied by hiragana okurigana): use Kun\'yomi. (e.g., 水 mizu = water)\n- Kanji paired with another Kanji (jukugo compound): use On\'yomi. (e.g., 水曜日 sui-youbi = Wednesday).',
        keyRule: 'Standalone/Japanese words = Kun\'yomi | Multi-kanji compounds = On\'yomi',
        examples: [
          {
            japanese: '日 (ひ / にち)',
            reading: 'ひ / にち',
            romaji: 'hi / nichi',
            english: 'Sun / Day',
            breakdown: [
              { part: '日 (ひ)', role: 'Kun\'yomi (standalone day/sun)', color: 'text-amber-700' },
              { part: '日本 (にほん)', role: 'On\'yomi compound (Japan)', color: 'text-rose-700 font-bold' }
            ]
          },
          {
            japanese: '人 (ひと / じん)',
            reading: 'ひと / じん',
            romaji: 'hito / jin',
            english: 'Person',
            breakdown: [
              { part: 'あの人 (ひと)', role: 'Kun\'yomi (that person)', color: 'text-amber-700' },
              { part: 'アメリカ人 (じん)', role: 'On\'yomi nationality suffix (American)', color: 'text-blue-700 font-bold' }
            ]
          }
        ]
      },
      {
        title: '2. High-Yield N5 Pictographic Kanji',
        explanation:
          'Many beginner Kanji directly reflect natural shapes:\n山 (mountain, three peaks)\n川 (river, flowing streams)\n木 (tree with trunk and roots)\n林 (grove, two trees)\n森 (forest, three trees)\nNumbers 一, 二, 三 directly indicate tally marks.',
        keyRule: 'Look for the radical (building block) to deduce meaning.',
        examples: [
          {
            japanese: '富士山 (ふじさん)',
            reading: 'ふじさん',
            romaji: 'Fuji-san',
            english: 'Mount Fuji',
            breakdown: [
              { part: '山', role: 'Mountain kanji', color: 'text-emerald-700 font-bold' }
            ]
          }
        ]
      }
    ],
    quiz: [
      {
        id: 'q-kanji-1',
        question: 'When a Kanji character stands alone as a noun, which reading is typically used?',
        options: ['Kun\'yomi (native Japanese reading)', 'On\'yomi (Chinese-derived reading)', 'Romaji reading', 'Pinyin'],
        correctIndex: 0,
        explanation: 'Standalone Kanji generally use their native Japanese Kun\'yomi reading (e.g. 水 mizu, 山 yama).'
      },
      {
        id: 'q-kanji-2',
        question: 'What does the Kanji 木 repeated three times (森) mean?',
        options: ['Mountain', 'Forest', 'River', 'Fire'],
        correctIndex: 1,
        explanation: '木 is tree, 林 is grove (two trees), and 森 is forest (three trees).'
      }
    ]
  }
];
