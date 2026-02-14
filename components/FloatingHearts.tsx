'use client';

import { useMemo } from 'react';

interface Heart {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  fromTop: boolean;
}

export default function FloatingHearts() {
  const hearts = useMemo(() => {
    const heartArray: Heart[] = [];
    for (let i = 0; i < 18; i++) {
      const fromTop = i % 2 === 0;
      heartArray.push({
        id: i,
        left: Math.random() * 100, // Equal distribution across entire width
        size: Math.random() * 25 + 25,
        duration: Math.random() * 14 + 18,
        delay: Math.random() * 6,
        fromTop,
      });
    }
    return heartArray;
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute opacity-50 hover:opacity-70 transition-opacity"
          style={{
            left: `${heart.left}%`,
            ...(heart.fromTop
              ? {
                  top: `-${heart.size}px`,
                  animation: `drift-down ${heart.duration}s linear ${heart.delay}s infinite`,
                }
              : {
                  bottom: `-${heart.size}px`,
                  animation: `drift ${heart.duration}s linear ${heart.delay}s infinite`,
                }),
            filter: 'drop-shadow(0 4px 12px rgba(90, 163, 208, 0.6))',
          }}
        >
          <svg
            width={heart.size}
            height={heart.size}
            viewBox="0 0 24 24"
            fill="currentColor"
            style={{ color: '#5BA3D0' }}
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </div>
      ))}
    </div>
  );
}
