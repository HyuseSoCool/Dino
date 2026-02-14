'use client';

import { useState, useEffect, useRef } from 'react';

export default function GreetingSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [hearts, setHearts] = useState<Array<{ id: string; x: number; y: number }>>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePos({
        x: e.clientX - rect.left - rect.width / 2,
        y: e.clientY - rect.top - rect.height / 2,
      });
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newHeart = {
      id: `${Date.now()}-${Math.random()}`,
      x,
      y,
    };

    setHearts([...hearts, newHeart]);

    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 1200);
  };

  return (
    <div
      ref={sectionRef}
      className="relative w-full h-screen flex items-center justify-center px-6 cursor-pointer"
      onClick={handleClick}
      onMouseMove={handleMouseMove}
    >
      {/* Left - Picture Frame */}
      <div
        className={`absolute left-4 lg:left-30 w-60 h-60 transition-all duration-1000 ${
          isVisible ? 'animate-fade-in-left' : 'opacity-0 -translate-x-20'
        }`}
      >
        <div className="relative w-full h-full rounded-3xl border-8 border-primary shadow-2xl bg-gradient-to-br from-primary/40 via-secondary/30 to-primary/20 overflow-hidden hover:shadow-3xl transition-shadow duration-500"
          style={{
            transform: `perspective(1000px) rotateY(${mousePos.x * 0.01}deg) rotateX(${-mousePos.y * 0.01}deg)`,
            transition: 'transform 0.1s ease-out',
          }}
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center">
            <div className="text-center">
              <div className="text-7xl mb-4 animate-bounce">🦖</div>
              <p className="text-foreground text-sm font-semibold">James Russel</p>
            </div>
          </div>

          {/* Decorative corners */}
          <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-foreground/60"></div>
          <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-foreground/60"></div>
          <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-foreground/60"></div>
          <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-foreground/60"></div>
        </div>
      </div>

      {/* Center - Text */}
      <div className="flex flex-col items-center justify-center gap-8 max-w-3xl mx-auto z-10">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
          }`}
          style={{ animationDelay: '0.1s' }}
        >
          <p className="text-sm lg:text-lg font-semibold text-primary tracking-widest uppercase text-balance hover:text-secondary transition-colors duration-300">
            A Dedicated Website For My Baby
          </p>
        </div>

        <div
          className={`transition-all duration-1000 ${
            isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
          }`}
          style={{ animationDelay: '0.3s' }}
        >
          <h1 className="text-6xl lg:text-7xl font-bold text-foreground leading-tight text-center text-balance animate-fluffy-bounce">
            Happy <span className="text-primary hover:text-secondary transition-colors duration-300">Valentine's</span>
            <br />
            <span className="text-secondary hover:text-primary transition-colors duration-300 inline-block animate-fluffy-bounce">Baby Dino 🦖</span>
          </h1>
        </div>

        <div
          className={`transition-all duration-1000 ${
            isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
          }`}
          style={{ animationDelay: '0.5s' }}
        >
          <p className="text-lg lg:text-xl text-foreground/90 font-light max-w-xl text-center text-balance leading-relaxed hover:text-foreground transition-colors duration-300">
            Click mo po screen baby hihi 💙
          </p>
        </div>
      </div>

      {/* Right - Bouquet (Slanted) */}
      <div
        className={`absolute right-4 lg:right-30 transition-all duration-1000 ${
          isVisible ? 'animate-fade-in-right' : 'opacity-0 translate-x-20'
        }`}
        style={{
          transform: `perspective(1000px) rotateY(${-mousePos.x * 0.01}deg) rotateX(${-mousePos.y * 0.01}deg)`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        <svg
          width="240"
          height="340"
          viewBox="0 0 200 300"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-2xl hover:drop-shadow-3xl transition-all duration-300 animate-float"
          style={{ filter: 'drop-shadow(0 8px 20px rgba(90, 163, 208, 0.6))' }}
        >
          {/* Stems */}
          <line x1="100" y1="280" x2="95" y2="150" stroke="#4A90C9" strokeWidth="4" />
          <line x1="100" y1="280" x2="105" y2="150" stroke="#4A90C9" strokeWidth="4" />
          <line x1="100" y1="280" x2="80" y2="180" stroke="#4A90C9" strokeWidth="3" />
          <line x1="100" y1="280" x2="120" y2="180" stroke="#4A90C9" strokeWidth="3" />
          <line x1="100" y1="280" x2="70" y2="200" stroke="#4A90C9" strokeWidth="2.5" />
          <line x1="100" y1="280" x2="130" y2="200" stroke="#4A90C9" strokeWidth="2.5" />

          {/* Main Flowers */}
          {[
            { cx: 100, cy: 80, color: '#5BA3D0', size: 12 },
            { cx: 65, cy: 110, color: '#4A90C9', size: 11 },
            { cx: 135, cy: 110, color: '#5BA3D0', size: 11 },
            { cx: 80, cy: 140, color: '#4A90C9', size: 10 },
            { cx: 120, cy: 140, color: '#5BA3D0', size: 10 },
            { cx: 100, cy: 160, color: '#3A7DB5', size: 9 },
          ].map((flower, idx) => (
            <g key={idx}>
              {[0, 72, 144, 216, 288].map((angle) => {
                const rad = (angle * Math.PI) / 180;
                const x = flower.cx + Math.cos(rad) * (flower.size + 4);
                const y = flower.cy + Math.sin(rad) * (flower.size + 4);
                return (
                  <circle
                    key={`petal-${idx}-${angle}`}
                    cx={x}
                    cy={y}
                    r={flower.size}
                    fill={flower.color}
                    opacity="0.95"
                  />
                );
              })}
              <circle cx={flower.cx} cy={flower.cy} r="7" fill="#ffffff" opacity="0.95" />
            </g>
          ))}

          {/* Decorative small flowers */}
          {[
            { cx: 55, cy: 130, color: '#4A90C9' },
            { cx: 145, cy: 130, color: '#5BA3D0' },
            { cx: 70, cy: 170, color: '#5BA3D0' },
            { cx: 130, cy: 170, color: '#4A90C9' },
          ].map((flower, idx) => (
            <g key={`small-${idx}`}>
              {[0, 120, 240].map((angle) => {
                const rad = (angle * Math.PI) / 180;
                const x = flower.cx + Math.cos(rad) * 10;
                const y = flower.cy + Math.sin(rad) * 10;
                return (
                  <circle
                    key={`small-petal-${idx}-${angle}`}
                    cx={x}
                    cy={y}
                    r="6"
                    fill={flower.color}
                    opacity="0.85"
                  />
                );
              })}
              <circle cx={flower.cx} cy={flower.cy} r="4" fill="#ffffff" opacity="0.9" />
            </g>
          ))}
        </svg>
      </div>

      {/* Floating Hearts on Click */}
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute pointer-events-none"
          style={{
            left: heart.x,
            top: heart.y,
            animation: `fadeInUp 1.2s ease-out forwards`,
          }}
        >
          <span className="text-5xl animate-bounce">💙</span>
        </div>
      ))}
    </div>
  );
}
