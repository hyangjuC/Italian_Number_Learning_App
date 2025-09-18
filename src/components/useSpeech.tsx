import { useState, useCallback } from 'react';

export function useSpeech() {
  const [isPlaying, setIsPlaying] = useState(false);

  const speak = useCallback((text: string, lang: string = 'it-IT') => {
    if ('speechSynthesis' in window) {
      // Stop any currently playing speech
      window.speechSynthesis.cancel();
      
      setIsPlaying(true);
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 0.8; // Slightly slower for better learning
      utterance.pitch = 1.0;
      utterance.volume = 0.8;
      
      utterance.onend = () => {
        setIsPlaying(false);
      };
      
      utterance.onerror = () => {
        setIsPlaying(false);
      };
      
      window.speechSynthesis.speak(utterance);
    }
  }, []);

  const stop = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  }, []);

  return { speak, stop, isPlaying };
}