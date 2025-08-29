import { useEffect, useRef } from "react";

export default function useAudio(src, { loop = true, volume = 1, play = true } = {}) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (!play) {
      audioRef.current?.pause();
      return;
    }

    const audio = new Audio(src);
    audio.loop = loop;
    audio.volume = volume;
    audio.play();

    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [src, loop, volume, play]);
}