import { useCallback, useRef, useEffect } from 'react';

type SoundMap = {
  [key: string]: HTMLAudioElement;
};

const useSoundManager = (sounds: { [key: string]: string }, isMuted: boolean) => {
  const audioRefs = useRef<SoundMap>({});

  useEffect(() => {
    Object.keys(sounds).forEach(key => {
      if (!audioRefs.current[key]) {
        const audio = new Audio(sounds[key]);
        audio.preload = 'auto';
        audioRefs.current[key] = audio;
      }
    });
    
    return () => {
        // Fix: Explicitly type `audio` as HTMLAudioElement. Object.values may return `unknown[]`.
        Object.values(audioRefs.current).forEach((audio: HTMLAudioElement) => {
            audio.pause();
            audio.currentTime = 0;
        });
    };
  }, [sounds]);

  useEffect(() => {
    // Fix: Explicitly type `audio` as HTMLAudioElement. Object.values may return `unknown[]`.
    Object.values(audioRefs.current).forEach((audio: HTMLAudioElement) => {
        audio.muted = isMuted;
    });
  }, [isMuted]);

  const playSound = useCallback((key: string, loop = false) => {
    const audio = audioRefs.current[key];
    if (audio) {
      audio.loop = loop;
      audio.currentTime = 0;
      audio.play().catch(error => console.error(`Error playing sound ${key}:`, error));
    }
  }, []);

  const stopSound = useCallback((key: string) => {
    const audio = audioRefs.current[key];
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  }, []);
  
  const stopAllSounds = useCallback(() => {
    // Fix: Explicitly type `audio` as HTMLAudioElement. Object.values may return `unknown[]`.
    Object.values(audioRefs.current).forEach((audio: HTMLAudioElement) => {
        audio.pause();
        audio.currentTime = 0;
    });
  }, []);

  return { playSound, stopSound, stopAllSounds };
};

export default useSoundManager;