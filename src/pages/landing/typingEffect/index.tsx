import React, { useEffect, useMemo, useRef, useState } from 'react';

interface TypingEffectProps {
  text: string;
  speed?: number; // characters per second
  onDone?: () => void;
}

const TypingEffect: React.FC<TypingEffectProps> = ({
  text,
  speed = 60,
  onDone,
}) => {
  const [visibleChars, setVisibleChars] = useState(0);
  const characters = useMemo(() => text.split(''), [text]);
  const frameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    const delay = 1000 / speed; // ms per character

    const animate = (time: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;

      const delta = time - lastTimeRef.current;
      if (delta >= delay) {
        setVisibleChars((prev) => {
          const next = prev + 5;
          if (next <= characters.length) {
            lastTimeRef.current = time;
            return next;
          }
          return prev;
        });
      }

      if (visibleChars + 10 < characters.length) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setVisibleChars(characters.length);
        onDone?.();
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [characters, speed, visibleChars]);

  return (
    <p className="typing-effect">
      {characters.map((char, i) => (
        <span key={i} className={`char ${i < visibleChars ? 'visible' : ''}`}>
          {char}
        </span>
      ))}
    </p>
  );
};

export default TypingEffect;
