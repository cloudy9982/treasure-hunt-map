import { useEffect, useState } from 'react';

interface FloatingHeartsProps {
  isActive: boolean;
}

export function FloatingHearts({ isActive }: FloatingHeartsProps) {
  const [hearts, setHearts] = useState<Array<{ id: number; emoji: string; left: number; delay: number }>>([]);

  useEffect(() => {
    if (!isActive) {
      setHearts([]);
      return;
    }

    const heartEmojis = ['💕', '💖', '💗', '💝', '💜', '❤️'];
    const newHearts: Array<{ id: number; emoji: string; left: number; delay: number }> = [];

    for (let i = 0; i < 8; i++) {
      newHearts.push({
        id: i,
        emoji: heartEmojis[Math.floor(Math.random() * heartEmojis.length)],
        left: Math.random() * 100,
        delay: Math.random() * 2
      });
    }

    setHearts(newHearts);

    // Clean up hearts after animation
    const timer = setTimeout(() => {
      setHearts([]);
    }, 3000);

    return () => clearTimeout(timer);
  }, [isActive]);

  if (!hearts.length) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="hearts-animation text-2xl absolute"
          style={{
            left: `${heart.left}%`,
            animationDelay: `${heart.delay}s`
          }}
        >
          {heart.emoji}
        </div>
      ))}
    </div>
  );
}
