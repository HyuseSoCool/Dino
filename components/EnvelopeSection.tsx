'use client';

import { useState, useEffect, useRef } from 'react';

interface PopoutHeart {
  id: string;
  top: string;
  left: string;
  delay: number;
}

export default function EnvelopeSection() {
  const [isOpened, setIsOpened] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [popoutHearts, setPopoutHearts] = useState<PopoutHeart[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleEnvelopeClick = () => {
    if (!isOpened) {
      // Generate popout hearts when opening
      const hearts: PopoutHeart[] = [];
      for (let i = 0; i < 30; i++) {
        hearts.push({
          id: `heart-${i}`,
          top: `${40 + Math.random() * 20}%`,
          left: `${35 + Math.random() * 30}%`,
          delay: Math.random() * 0.5,
        });
      }
      setPopoutHearts(hearts);
      
      // Clear hearts after animation
      setTimeout(() => {
        setPopoutHearts([]);
      }, 1800);
    }
    setIsOpened(!isOpened);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePos({
        x: e.clientX - rect.left - rect.width / 2,
        y: e.clientY - rect.top - rect.height / 2,
      });
    }
  };

  return (
    <div ref={sectionRef} className="relative w-full max-w-4xl mx-auto px-6" onMouseMove={handleMouseMove}>
      {/* Header with scroll animation */}
      <div
        className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
        }`}
      >
        <h2 className="text-5xl lg:text-6xl font-bold text-foreground mb-2 hover:text-primary transition-colors duration-300 animate-fluffy-bounce">
          A Letter For You
        </h2>
        <p className="text-primary text-lg hover:text-secondary transition-colors duration-300">
          {isOpened ? '💌 Read with love' : '💌 Click to open the envelope'}
        </p>
      </div>

      {/* Envelope Container */}
      <div
        className={`flex justify-center transition-all duration-1000 relative ${
          isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
        }`}
        style={{ animationDelay: '0.2s' }}
      >
        {/* Popout hearts - positioned absolutely inside the envelope area */}
        {popoutHearts.map((heart) => (
          <div
            key={heart.id}
            className="absolute text-4xl animate-pop-out pointer-events-none position-relative z-3"
            style={{
              top: '17%',
              left: '47%',
              '--tx': `${(Math.random() - 0.5) * 250}px`,
              '--ty': `${(Math.random() - 0.5) * 250}px`,
              '--rotate': `${(Math.random() - 0.5) * 720}deg`,
              animationDelay: `${heart.delay}s`,
            } as React.CSSProperties & { '--tx': string; '--ty': string; '--rotate': string }}
          >
            💙
          </div>
        ))}
        <div
          className="relative w-full max-w-5xl aspect-video cursor-pointer group animate-float"
          onClick={handleEnvelopeClick}
          style={{
            transform: `perspective(1200px) rotateY(${mousePos.x * 0.005}deg) rotateX(${-mousePos.y * 0.005}deg)`,
            transition: 'transform 0.2s ease-out',
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center perspective">
            {/* Envelope body - white base */}
            <div
              className={`absolute inset-0 rounded-2xl shadow-2xl transition-all duration-700 hover:shadow-3xl ${
                isOpened ? 'opacity-40 scale-95' : 'opacity-100'
              }`}
              style={{ backgroundColor: '#ffffff', border: '3px solid #5BA3D0' }}
            />

            {/* Envelope flap - gradient blue, opens upward */}
            <div
              className={`absolute left-0 right-0 top-0 h-1/2 rounded-t-2xl transition-all duration-700 hover:shadow-2xl origin-top ${
                isOpened
                  ? 'rotateX(-150deg) opacity-0'
                  : 'rotateX(0deg) opacity-100'
              }`}
              style={{
                backgroundImage: 'linear-gradient(135deg, #5BA3D0 0%, #4A90C9 50%, #3A7DB5 100%)',
                transformStyle: 'preserve-3d',
                borderBottom: '2px solid rgba(58, 125, 181, 0.5)',
              }}
            >
              {/* Triangle flap effect */}
              <div
                className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0 h-0 opacity-70"
                style={{
                  borderLeft: '80px solid transparent',
                  borderRight: '80px solid transparent',
                  borderTop: '100px solid rgba(255,255,255,0.1)',
                }}
              />

              {/* Decorative seal on flap */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-24 h-24 rounded-full bg-white/95 flex items-center justify-center shadow-lg hover:scale-110 transition-transform border-2 border-primary/50">
                  <span className="text-4xl animate-bounce">💙</span>
                </div>
              </div>
            </div>

            {/* Letter inside - visible when opened */}
            <div
              className={`absolute inset-0 rounded-2xl shadow-2xl p-8 lg:p-12 transition-all duration-700 overflow-auto ${
                isOpened ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-75 pointer-events-none'
              }`}
              style={{ backgroundColor: '#ffffff' }}
            >
              <div className="h-full flex flex-col justify-between">
                {/* Letter content */}
                <div className="space-y-6">
                  <div style={{ color: '#1a4d75' }}className="text-xl text-primary font-semibold">
                    My Dearest Baby Dino,
                  </div>

                  <div className="space-y-6 text-base leading-relaxed font-serif text-foreground/90">
                    <p style={{ color: '#2a6b9f' }}className=" transition-colors duration-300">
                      On this special day, I want to greet you first po once again Happy Valentines Baby, this is our first valentines po. I just want you to know po na I really love u so much po Mwa Mwa.</p>
                    <p style={{ color: '#2a6b9f' }}className=" transition-colors duration-300">
                      Your naughtyness is my favorite thing, and your smile is the brightest thing I know. Every moment with I spend with you even kahit online lang is a treasure to me, and I'm grateful for the joy you bring into my life.
                    </p>

                    <p style={{ color: '#2a6b9f' }} className=" transition-colors duration-300">
                      Thank you for being you, for always being talkative, for always making me smile and laugh. You remind me to appreciate the simple things and to love deeply without hesitation.
                    </p>

                    <p style={{ color: '#2a6b9f' }}className=" transition-colors duration-300">
                      This Valentine's Day, I celebrate not just us, but the amazing person you are and all the happiness we share together. I hope na ikaw napo hanggang dulo! Wag po mangungupal -_- . Once more Happy Valentines Baby Dino, I love you so much po! Mwa Mwa.
                    </p>

                    <p style={{ color: '#1a4d75' }}className="text-dark pt-4">
                      Forever yours,
                      <br />
                      <span className="text-dark font-bold">💙 Zy </span>
                    </p>
                  </div>
                </div>

                {/* Close button hint */}
                <div className="text-center pt-4 border-t border-primary/20">
                  <button
                    onClick={() => setIsOpened(false)}
                    className="text-xs text-primary hover:text-secondary transition-colors uppercase tracking-wider font-semibold"
                  >
                    Click to close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating hearts around envelope - subtle background decoration */}
      <div className="absolute top-1/4 left-8 animate-float opacity-60">
        <span className="text-3xl">💙</span>
      </div>
      <div className="absolute bottom-1/4 right-8 animate-float opacity-60" style={{ animationDelay: '0.5s' }}>
        <span className="text-3xl">💙</span>
      </div>
    </div>
  );
}
