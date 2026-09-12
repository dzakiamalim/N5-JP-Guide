import { GrammarDrillQuestion } from '../types';

export const GRAMMAR_DRILLS: GrammarDrillQuestion[] = [
  // Particle Drills
  {
    id: 'drill-p-1',
    type: 'particle',
    prompt: 'Select the correct particle to complete the sentence:',
    contextJapanese: 'わたし _____ 田中 です。 (I am Tanaka.)',
    options: ['は', 'を', 'に', 'で'],
    correctAnswer: 'は',
    hint: 'Pronounced "wa" when serving as the topic marker.',
    explanation: 'The topic particle は (pronounced "wa") marks わたし as the topic of the sentence.'
  },
  {
    id: 'drill-p-2',
    type: 'particle',
    prompt: 'Select the direct object marker for the food item being eaten:',
    contextJapanese: 'りんご _____ たべます。 (I eat an apple.)',
    options: ['に', 'で', 'を', 'へ'],
    correctAnswer: 'を',
    hint: 'This particle is pronounced "o" and only used as a grammatical case marker.',
    explanation: 'を marks りんご (apple) as the direct recipient of the action 食べます (to eat).'
  },
  {
    id: 'drill-p-3',
    type: 'particle',
    prompt: 'Choose the particle that marks the active location where an event occurs:',
    contextJapanese: 'きっさてん _____ コーヒーを 飲みました。 (I drank coffee at a cafe.)',
    options: ['で', 'に', 'へ', 'と'],
    correctAnswer: 'で',
    hint: 'Not static location, but where the physical action took place.',
    explanation: 'で indicates the physical location where the action of drinking coffee took place.'
  },
  {
    id: 'drill-p-4',
    type: 'particle',
    prompt: 'Choose the particle indicating direction towards a destination:',
    contextJapanese: '京都 _____ いきます。 (I am going to Kyoto.)',
    options: ['へ', 'を', 'で', 'が'],
    correctAnswer: 'へ',
    hint: 'Written as "he" but pronounced "e".',
    explanation: 'へ (pronounced "e") marks the general direction towards Kyoto with movement verbs like いきます.'
  },
  {
    id: 'drill-p-5',
    type: 'particle',
    prompt: 'Select the particle for a specific time point:',
    contextJapanese: 'しちじ _____ おきます。 (I wake up at 7:00.)',
    options: ['に', 'で', 'を', 'は'],
    correctAnswer: 'に',
    hint: 'Used with specific numbers on clocks and calendar days.',
    explanation: 'に marks a specific point in time (like 7 o\'clock) when an action occurs.'
  },
  {
    id: 'drill-p-6',
    type: 'particle',
    prompt: 'Select the particle meaning "also / too":',
    contextJapanese: 'わたし _____ がくせい です。 (I am also a student.)',
    options: ['も', 'と', 'は', 'の'],
    correctAnswer: 'も',
    hint: 'Replaces は or が to mean "also".',
    explanation: 'も replaces the topic particle は to signify "also" or "too".'
  },
  {
    id: 'drill-p-7',
    type: 'particle',
    prompt: 'Select the particle used to list items completely ("and"):',
    contextJapanese: 'ペン _____ ノート を かいました。 (I bought a pen and a notebook.)',
    options: ['と', 'も', 'や', 'で'],
    correctAnswer: 'と',
    hint: 'Used to connect nouns in an exhaustive list.',
    explanation: 'と connects two or more nouns directly to mean "and".'
  },

  // Verb Conjugation Drills
  {
    id: 'drill-c-1',
    type: 'conjugation',
    prompt: 'Conjugate the Group 1 verb 書く (kaku: to write) into polite present affirmative (~ます):',
    targetWord: '書く (kaku)',
    conjugationType: 'Polite Present Affirmative (~ます)',
    options: ['書きます', '書くます', '書きる', '書きました'],
    correctAnswer: '書きます',
    hint: 'Group 1 verbs shift final -u to -i before adding ます.',
    explanation: '書く (kaku) shifts "ku" to "ki" + ます = 書きます (kakimasu).'
  },
  {
    id: 'drill-c-2',
    type: 'conjugation',
    prompt: 'Conjugate the Group 2 verb 食べる (taberu: to eat) into polite past affirmative (~ました):',
    targetWord: '食べる (taberu)',
    conjugationType: 'Polite Past Affirmative (~ました)',
    options: ['食べました', '食べましたり', '食べましたい', '食べませんでした'],
    correctAnswer: '食べました',
    hint: 'Drop る and add ました.',
    explanation: 'Group 2 verb 食べる simply drops る and attaches ました = 食べました (tabemashita).'
  },
  {
    id: 'drill-c-3',
    type: 'conjugation',
    prompt: 'Conjugate the Group 3 irregular verb する (suru: to do) into polite present negative (~ません):',
    targetWord: 'する (suru)',
    conjugationType: 'Polite Present Negative (~ません)',
    options: ['しません', 'すりません', 'するません', 'しなかった'],
    correctAnswer: 'しません',
    hint: 'する changes to し + ません.',
    explanation: 'The irregular verb する becomes しません (shimasen) in the polite negative.'
  },
  {
    id: 'drill-c-4',
    type: 'conjugation',
    prompt: 'What is the て-form (Te-form) of the verb 待つ (matsu: to wait)?',
    targetWord: '待つ (matsu)',
    conjugationType: 'Te-Form (て形)',
    options: ['待って', '待ちて', '待んで', '待いて'],
    correctAnswer: '待って',
    hint: 'Verbs ending in う, つ, or る change to って.',
    explanation: 'う, つ, る verbs form the Te-form with double-consonant small-tsu + te: 待つ -> 待って (matte).'
  },
  {
    id: 'drill-c-5',
    type: 'conjugation',
    prompt: 'What is the past negative of the い-adjective 暑い (atsui: hot)?',
    targetWord: '暑い (atsui)',
    conjugationType: 'Past Negative Adjective',
    options: ['暑くなかったです', '暑くないでした', '暑かったです', '暑いじゃありませんでした'],
    correctAnswer: '暑くなかったです',
    hint: 'Drop い and add くなかった + です.',
    explanation: 'い-adjectives replace final い with くなかった = 暑くなかったです (atsukunakatta desu).'
  },

  // Sentence Builders
  {
    id: 'drill-s-1',
    type: 'sentence_builder',
    prompt: 'Arrange the tiles into a natural sentence: "I drink green tea every morning."',
    scrambleWords: ['お茶を', '毎朝', '飲みます', 'わたしは'],
    correctOrder: ['わたしは', '毎朝', 'お茶を', '飲みます'],
    correctAnswer: 'わたしは毎朝お茶を飲みます',
    hint: 'Remember SOV order: Topic -> Time -> Object -> Verb.',
    explanation: 'In standard Japanese word order, Topic (わたしは) is followed by Time (毎朝), Object with particle (お茶を), and finally the Verb (飲みます).'
  },
  {
    id: 'drill-s-2',
    type: 'sentence_builder',
    prompt: 'Arrange the tiles to say: "Please speak slowly."',
    scrambleWords: ['話して', 'ゆっくり', 'ください'],
    correctOrder: ['ゆっくり', '話して', 'ください'],
    correctAnswer: 'ゆっくり話してください',
    hint: 'Adverb -> Te-form verb -> ください.',
    explanation: 'ゆっくり (slowly) modifies 話して (Te-form of speak), completed by ください (please).'
  },
  {
    id: 'drill-s-3',
    type: 'sentence_builder',
    prompt: 'Arrange the tiles to ask: "Where is the train station?"',
    scrambleWords: ['ですか', '駅は', 'どこ'],
    correctOrder: ['駅は', 'どこ', 'ですか'],
    correctAnswer: '駅はどこですか',
    hint: 'Topic (station) + question word (where) + ですか.',
    explanation: '駅は (Speaking of the station) どこ (where) ですか (is it?).'
  }
];
