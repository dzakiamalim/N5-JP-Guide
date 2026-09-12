import React, { useState } from 'react';
import { Bot, Send, Sparkles, AlertCircle, HelpCircle, Volume2, ArrowRight } from 'lucide-react';
import { UserStats } from '../types';
import { playJapaneseAudio } from '../utils/audio';

interface SenseiViewProps {
  stats: UserStats;
}

interface Message {
  role: 'user' | 'sensei';
  content: string;
}

export const SenseiView: React.FC<SenseiViewProps> = ({ stats }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'sensei',
      content:
        'こんにちは！ (Konnichiwa!) I am your Japanese Sensei. As you embark on achieving JLPT N5, feel free to ask me anything—from confusing particles like は vs が, to sentence breakdowns or verb forms. How can I help you today?'
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sampleQuestions = [
    'What is the difference between は and が?',
    'Why is it ひとつ instead of いちつ for counting?',
    'Explain how to conjugate verbs into the て-form (Te-form)',
    'Break down this sentence: 私は図書館で本を読みました'
  ];

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', content: textToSend };
    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/sensei', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend, type: 'ask' })
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();
      const senseiMsg: Message = {
        role: 'sensei',
        content: data.reply || 'I could not process that question. Please try again!'
      };
      setMessages((prev) => [...prev, senseiMsg]);
    } catch (err: any) {
      console.warn('Sensei query error', err);
      setMessages((prev) => [
        ...prev,
        {
          role: 'sensei',
          content:
            'Sensei note: In Japanese beginner grammar, always remember SOV order: Topic (は) + Object (を) + Verb (ます). If you have a specific sentence, try asking about particles or verb forms!'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 flex items-center gap-2">
            <Bot className="w-6 h-6 text-rose-600" />
            <span>AI Japanese Sensei</span>
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Ask any grammar question or get instant word-by-word sentence breakdowns
          </p>
        </div>

        <div className="text-xs text-stone-500 bg-stone-100 px-3 py-1.5 rounded-xl border border-stone-200">
          Tuned for JLPT N5 beginners
        </div>
      </div>

      {/* Suggested Quick Prompt Pills */}
      <div className="space-y-2">
        <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
          Suggested Beginner Questions:
        </span>
        <div className="flex flex-wrap gap-2">
          {sampleQuestions.map((q, idx) => (
            <button
              key={idx}
              disabled={isLoading}
              onClick={() => handleSend(q)}
              className="px-3 py-1.5 rounded-xl bg-white border border-stone-200 text-stone-700 text-xs font-medium hover:border-stone-400 hover:bg-stone-50 transition shadow-2xs text-left"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Container */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-4 sm:p-6 min-h-[420px] max-h-[560px] overflow-y-auto space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-3 ${
              msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                msg.role === 'user'
                  ? 'bg-stone-900 text-white'
                  : 'bg-rose-700 text-white shadow-xs'
              }`}
            >
              {msg.role === 'user' ? 'You' : '先生'}
            </div>

            <div
              className={`max-w-[82%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-stone-900 text-white'
                  : 'bg-stone-50 text-stone-800 border border-stone-200/90 whitespace-pre-line'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-rose-700 text-white flex items-center justify-center text-xs font-bold animate-pulse">
              先生
            </div>
            <div className="bg-stone-50 rounded-2xl p-3.5 border border-stone-200 text-xs text-stone-500 font-medium flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-rose-600 animate-spin" />
              <span>Sensei is preparing your explanation...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-stone-300 shadow-xs focus-within:border-stone-500 transition"
      >
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          placeholder="Ask a question or enter a Japanese sentence to break down..."
          className="flex-1 bg-transparent px-3 text-xs sm:text-sm text-stone-900 focus:outline-none placeholder:text-stone-400"
        />

        <button
          type="submit"
          disabled={!inputQuery.trim() || isLoading}
          className="p-2.5 rounded-xl bg-rose-700 text-white hover:bg-rose-800 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-xs"
          title="Send message to Sensei"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
