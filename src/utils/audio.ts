/**
 * Robust Speech & Audio utility for native Japanese pronunciation
 * Uses high-fidelity server TTS stream (/api/tts), with fallback to
 * Web Speech API and Web Audio API synthesizer.
 */

type AudioListener = (playingText: string | null) => void;
const listeners = new Set<AudioListener>();

let currentPlayingText: string | null = null;
let currentAudioElement: HTMLAudioElement | null = null;

export function subscribeAudioState(listener: AudioListener): () => void {
  listeners.add(listener);
  listener(currentPlayingText);
  return () => {
    listeners.delete(listener);
  };
}

function setPlayingState(text: string | null) {
  currentPlayingText = text;
  listeners.forEach((l) => {
    try {
      l(text);
    } catch (err) {
      console.error(err);
    }
  });
}

/**
 * Synthetic fallback chime using Web Audio API in case TTS is blocked or offline
 */
function playWebAudioChime(pitch = 523.25): void {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(pitch, ctx.currentTime); // C5
    osc.frequency.exponentialRampToValueAtTime(pitch * 1.5, ctx.currentTime + 0.15);

    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.36);
  } catch (e) {
    console.warn('Web Audio synthesis not available', e);
  }
}

/**
 * Fallback to browser SpeechSynthesis
 */
function speakViaSpeechSynthesis(cleanText: string, speed = 0.9): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      playWebAudioChime();
      resolve(false);
      return;
    }

    try {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'ja-JP';
      utterance.rate = Math.max(0.6, Math.min(1.3, speed));
      utterance.pitch = 1.0;

      // Chrome garbage collection workaround
      (window as any).__activeUtterance = utterance;

      const voices = window.speechSynthesis.getVoices();
      const jaVoice = voices.find((v) => v.lang && (v.lang.startsWith('ja') || v.lang.includes('JP')));
      if (jaVoice) {
        utterance.voice = jaVoice;
      }

      utterance.onend = () => {
        (window as any).__activeUtterance = null;
        resolve(true);
      };

      utterance.onerror = (err) => {
        console.warn('SpeechSynthesis error, falling back to audio chime', err);
        (window as any).__activeUtterance = null;
        playWebAudioChime();
        resolve(false);
      };

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn('SpeechSynthesis failed', err);
      playWebAudioChime();
      resolve(false);
    }
  });
}

/**
 * Primary audio playback: streams native Japanese audio from /api/tts
 */
export async function playJapaneseAudio(text: string, speed = 0.9): Promise<boolean> {
  const cleanText = text
    .replace(/[\(\[\{][^()]*[\)\]\}]/g, '') // remove furigana/romaji in brackets
    .trim();

  if (!cleanText) return false;

  // Stop any currently playing audio
  if (currentAudioElement) {
    try {
      currentAudioElement.pause();
      currentAudioElement.currentTime = 0;
    } catch {}
    currentAudioElement = null;
  }

  setPlayingState(cleanText);

  try {
    const audioUrl = `/api/tts?text=${encodeURIComponent(cleanText)}`;
    const audio = new Audio(audioUrl);
    currentAudioElement = audio;
    audio.playbackRate = Math.max(0.7, Math.min(1.2, speed));

    return await new Promise<boolean>((resolve) => {
      let isResolved = false;

      const cleanup = (success: boolean) => {
        if (isResolved) return;
        isResolved = true;
        setPlayingState(null);
        if (currentAudioElement === audio) {
          currentAudioElement = null;
        }
        resolve(success);
      };

      audio.onended = () => cleanup(true);

      audio.onerror = async () => {
        console.warn('Server TTS stream failed, attempting browser speech synthesis fallback...');
        const synthSuccess = await speakViaSpeechSynthesis(cleanText, speed);
        cleanup(synthSuccess);
      };

      // Play audio
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(async (playErr) => {
          console.warn('Audio.play() error, attempting speech synthesis fallback:', playErr);
          const synthSuccess = await speakViaSpeechSynthesis(cleanText, speed);
          cleanup(synthSuccess);
        });
      }
    });
  } catch (err) {
    console.warn('Failed to load audio element, attempting fallback:', err);
    const synthSuccess = await speakViaSpeechSynthesis(cleanText, speed);
    setPlayingState(null);
    return synthSuccess;
  }
}

