'use client';

import { useState, useEffect, useRef } from 'react';

interface Photo {
  id: string;
  position: string;
  url?: string;
}

export default function GallerySection() {
  const [photos, setPhotos] = useState<Photo[]>([
    { id: '1', position: 'top-left' },
    { id: '2', position: 'top-right' },
    { id: '3', position: 'center' },
    { id: '4', position: 'bottom-left' },
    { id: '5', position: 'bottom-right' },
    { id: '6', position: 'top' },
    { id: '7', position: 'left' },
    { id: '8', position: 'right' },
    { id: '9', position: 'bottom' },
  ]);
  const [isVisible, setIsVisible] = useState(false);
  const [emojiPopups, setEmojiPopups] = useState<{ id: number; x: number; y: number }[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!galleryRef.current) return;
    
    const galleryRect = galleryRef.current.getBoundingClientRect();
    const x = e.clientX - galleryRect.left;
    const y = e.clientY - galleryRect.top;
    const id = Date.now();
    
    setEmojiPopups(prev => [...prev, { id, x, y }]);
    
    // Remove emoji after animation completes
    setTimeout(() => {
      setEmojiPopups(prev => prev.filter(emoji => emoji.id !== id));
    }, 1500);
  };

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

  const deletePhoto = (id: string) => {
    setPhotos(photos.map((p) => (p.id === id ? { ...p, url: undefined } : p)));
  };

  const getPhotoGradient = (position: string) => {
    const gradients: Record<string, string> = {
      'top-left': 'linear-gradient(135deg, #5BA3D0 0%, #4A90C9 100%)',
      'top-right': 'linear-gradient(135deg, #4A90C9 0%, #3A7DB5 100%)',
      'center': 'linear-gradient(135deg, #3A7DB5 0%, #4A90C9 100%)',
      'bottom-left': 'linear-gradient(135deg, #5BA3D0 0%, #3A7DB5 100%)',
      'bottom-right': 'linear-gradient(135deg, #4A90C9 0%, #5BA3D0 100%)',
      top: 'linear-gradient(135deg, #4A90C9 0%, #5BA3D0 100%)',
      left: 'linear-gradient(135deg, #5BA3D0 0%, #3A7DB5 100%)',
      right: 'linear-gradient(135deg, #3A7DB5 0%, #4A90C9 100%)',
      bottom: 'linear-gradient(135deg, #5BA3D0 0%, #4A90C9 100%)',
    };
    return gradients[position] || gradients['center'];
  };

  return (
    <div ref={sectionRef} className="relative w-full max-w-5xl mx-auto px-6">
      {/* Header with scroll animation */}
      <div
        className={`text-center mb-8 transition-all duration-1000 ${
          isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
        }`}
      >
        <h2 style={{ color: '#1765a0' }} className="text-light text-5xl lg:text-6xl font-bold text-foreground mb-4 hover:text-dark transition-colors duration-300 animate-bounce">
          Baby Dino Rawr
        </h2>
        <p className="text-dark text-lg  transition-colors duration-300 animate-fluffy-bounce">
          A collection of photos showcasing my baby apaka pogi apaka cute.
        </p>
      </div>

      {/* Fluffy Heart-shaped Gallery Container */}
      <div
        ref={galleryRef}
        className={`group relative w-full transition-all duration-1000 ${
          isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
        }`}
        style={{ animationDelay: '0.2s', maxWidth: '750px', margin: '0 auto', aspectRatio: '1' }}
      >
        {/* Proper heart-shaped background */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none transition-transform duration-700 group-hover:scale-[1.03] group-hover:animate-pulse"
          viewBox="0 0 400 400"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            filter: 'drop-shadow(0 24px 60px rgba(58, 125, 181, 0.45))',
          }}
        >
          <defs>
            <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#105784" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#54b2ca" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#3A7DB5" stopOpacity="0.4" />
            </linearGradient>

            <filter id="cloudyBlur">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" />
            </filter>
            <filter id="glowBlur">
              <feGaussianBlur in="SourceGraphic" stdDeviation="8" />
            </filter>
          </defs>

          {/* Main heart shape path */}
          <path
            d="M 200,360 C 200,360 60,260 60,150 C 60,90 110,60 155,60 C 180,60 200,76 200,76 C 200,76 220,60 245,60 C 290,60 340,90 340,150 C 340,260 200,360 200,360 Z"
            fill="url(#heartGradient)"
            opacity="0.9"
            filter="url(#cloudyBlur)"
          />

          {/* Add fluffy cloud effect with circles around the heart */}
          <circle cx="110" cy="140" r="62" fill="url(#heartGradient)" opacity="0.55" filter="url(#cloudyBlur)" />
          <circle cx="290" cy="140" r="62" fill="url(#heartGradient)" opacity="0.55" filter="url(#cloudyBlur)" />
          <circle cx="150" cy="90" r="52" fill="url(#heartGradient)" opacity="0.5" filter="url(#cloudyBlur)" />
          <circle cx="250" cy="90" r="52" fill="url(#heartGradient)" opacity="0.5" filter="url(#cloudyBlur)" />
          <circle cx="80" cy="190" r="48" fill="url(#heartGradient)" opacity="0.5" filter="url(#cloudyBlur)" />
          <circle cx="320" cy="190" r="48" fill="url(#heartGradient)" opacity="0.5" filter="url(#cloudyBlur)" />
    
          <circle cx="150" cy="270" r="46" fill="url(#heartGradient)" opacity="0.45" filter="url(#cloudyBlur)" />
          <circle cx="250" cy="270" r="46" fill="url(#heartGradient)" opacity="0.45" filter="url(#cloudyBlur)" />

          {/* Heart outline for definition */}
          <path
            d="M 200,360 C 200,360 60,260 60,150 C 60,90 110,60 155,60 C 180,60 200,76 200,76 C 200,76 220,60 245,60 C 290,60 340,90 340,150 C 340,260 200,360 200,360 Z"
            fill="none"
            stroke="#4ca4dc"
            strokeWidth="12"
            opacity="1"
          />
          {/* Inner white outline for extra definition */}
          <path
            d="M 200,346 C 200,346 80,262 80,158 C 80,112 120,86 156,86 C 176,86 200,98 200,98 C 200,98 224,86 244,86 C 280,86 320,112 320,158 C 320,262 200,346 200,346 Z"
            fill="none"
            stroke="rgba(255, 255, 255, 0.6)"
            strokeWidth="4"
          />
          {/* Hover glow effect */}
          <path
            className="opacity-0 transition-opacity duration-700 group-hover:opacity-100"
            d="M 200,360 C 200,360 60,260 60,150 C 60,90 110,60 155,60 C 180,60 200,76 200,76 C 200,76 220,60 245,60 C 290,60 340,90 340,150 C 340,260 200,360 200,360 Z"
            fill="none"
            stroke="#86d0ff"
            strokeWidth="16"
            filter="url(#glowBlur)"
          />
        </svg>

        {/* Photo Slots - Heart shaped arrangement */}
        <div className="absolute inset-16">
          {/* Top left photo */}
          <div onClick={handleImageClick} className="absolute top-12 left-16 w-32 h-32 group cursor-pointer hover:z-10">
            
            <div
              className="w-full h-full rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 animate-fluffy-bounce border-4 border-white/60"
              style={{
                backgroundImage: getPhotoGradient('top-left'),
                filter: 'drop-shadow(0 4px 12px rgba(90, 163, 208, 0.4))',
              }}
            >
              {!photos[0].url && (
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage: "url('/img/1.jpg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
              )}
            </div>
            {photos[0].url && (
              <button
                onClick={() => deletePhoto(photos[0].id)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold shadow-lg"
              >
                ✕
              </button>
            )}
          </div>

          {/* Top right photo */}
          <div onClick={handleImageClick} className="absolute top-12 right-16 w-32 h-32 group cursor-pointer hover:z-10">
            <div
              className="w-full h-full rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 animate-fluffy-bounce border-4 border-white/60"
              style={{
                backgroundImage: getPhotoGradient('top-right'),
                filter: 'drop-shadow(0 4px 12px rgba(90, 163, 208, 0.4))',
                animationDelay: '0.3s',
              }}
            >
              {!photos[1].url && (
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage: "url('/img/2.jpg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
              )}
            </div>
            {photos[1].url && (
              <button
                onClick={() => deletePhoto(photos[1].id)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold shadow-lg"
              >
                ✕
              </button>
            )}
          </div>

          {/* Center large photo */}
          <div onClick={handleImageClick} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-52 h-52 group cursor-pointer hover:z-20">
            {/* Overlapping heart-shaped pulsing frames - growing from center */}
            <svg className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-pulse" style={{ animationDuration: '2s', animationDelay: '0.9s', width: '320px', height: '320px' }} viewBox="0 0 200 200">
              <path
                d="M 100,180 C 100,180 20,130 20,65 C 20,32 48,12 73,12 C 87,12 100,22 100,22 C 100,22 113,12 127,12 C 152,12 180,32 180,65 C 180,130 100,180 100,180 Z"
                fill="none"
                stroke="rgba(255, 255, 255, 0.5)"
                strokeWidth="4"
              />
            </svg>
            <svg className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-pulse" style={{ animationDuration: '2s', animationDelay: '0.6s', width: '280px', height: '280px' }} viewBox="0 0 200 200">
              <path
                d="M 100,180 C 100,180 20,130 20,65 C 20,32 48,12 73,12 C 87,12 100,22 100,22 C 100,22 113,12 127,12 C 152,12 180,32 180,65 C 180,130 100,180 100,180 Z"
                fill="none"
                stroke="rgba(255, 255, 255, 0.4)"
                strokeWidth="4"
              />
            </svg>
            <svg className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-pulse" style={{ animationDuration: '2s', animationDelay: '0.3s', width: '240px', height: '240px' }} viewBox="0 0 200 200">
              <path
                d="M 100,180 C 100,180 20,130 20,65 C 20,32 48,12 73,12 C 87,12 100,22 100,22 C 100,22 113,12 127,12 C 152,12 180,32 180,65 C 180,130 100,180 100,180 Z"
                fill="none"
                stroke="rgba(255, 255, 255, 0.3)"
                strokeWidth="4"
              />
            </svg>
            <svg className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-pulse" style={{ animationDuration: '2s', animationDelay: '0s', width: '200px', height: '200px' }} viewBox="0 0 200 200">
              <path
                d="M 100,180 C 100,180 20,130 20,65 C 20,32 48,12 73,12 C 87,12 100,22 100,22 C 100,22 113,12 127,12 C 152,12 180,32 180,65 C 180,130 100,180 100,180 Z"
                fill="none"
                stroke="rgba(255, 255, 255, 0.2)"
                strokeWidth="4"
              />
            </svg>
            
            {/* Main photo content */}
            <div
              className="absolute inset-8 rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 border-4 border-white/60 animate-fluffy-bounce"
              style={{
                backgroundImage: getPhotoGradient('center'),
                filter: 'drop-shadow(0 8px 20px rgba(90, 163, 208, 0.5))',
              }}
            >
              {!photos[2].url && (
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage: "url('/img/9.jpg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
              )}
            </div>
            {photos[2].url && (
              <button
                onClick={() => deletePhoto(photos[2].id)}
                className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full w-9 h-9 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-sm font-bold shadow-lg"
              >
                ✕
              </button>
            )}
          </div>

          {/* Bottom left photo */}
          <div onClick={handleImageClick} className="absolute bottom-12 left-16 w-32 h-32 group cursor-pointer hover:z-10">
            <div
              className="w-full h-full rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 animate-fluffy-bounce border-4 border-white/60"
              style={{
                backgroundImage: getPhotoGradient('bottom-left'),
                filter: 'drop-shadow(0 4px 12px rgba(90, 163, 208, 0.4))',
                animationDelay: '0.6s',
              }}
            >
              {!photos[3].url && (
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage: "url('/img/3.jpg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
              )}
            </div>
            {photos[3].url && (
              <button
                onClick={() => deletePhoto(photos[3].id)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold shadow-lg"
              >
                ✕
              </button>
            )}
          </div>

          {/* Bottom right photo */}
          <div onClick={handleImageClick} className="absolute bottom-12 right-16 w-32 h-32 group cursor-pointer hover:z-10">
            <div
              className="w-full h-full rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 animate-fluffy-bounce border-4 border-white/60"
              style={{
                backgroundImage: getPhotoGradient('bottom-right'),
                filter: 'drop-shadow(0 4px 12px rgba(90, 163, 208, 0.4))',
                animationDelay: '0.9s',
              }}
            >
              {!photos[4].url && (
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage: "url('/img/4.jpg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
              )}
            </div>
            {photos[4].url && (
              <button
                onClick={() => deletePhoto(photos[4].id)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold shadow-lg"
              >
                ✕
              </button>
            )}
          </div>

          {/* Top center photo */}
          <div onClick={handleImageClick} className="absolute top-4 left-1/2 transform -translate-x-1/2 w-24 h-24 group cursor-pointer hover:z-10">
            <div
              className="w-full h-full rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 animate-fluffy-bounce border-4 border-white/60"
              style={{
                backgroundImage: getPhotoGradient('top'),
                filter: 'drop-shadow(0 4px 12px rgba(90, 163, 208, 0.4))',
                animationDelay: '0.15s',
              }}
            >
              {!photos[5].url && (
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage: "url('/img/5.jpg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
              )}
            </div>
            {photos[5].url && (
              <button
                onClick={() => deletePhoto(photos[5].id)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold shadow-lg"
              >
                ✕
              </button>
            )}
          </div>

          {/* Left center photo */}
          <div onClick={handleImageClick} className="absolute top-1/2 left-4 transform -translate-y-1/2 w-28 h-28 group cursor-pointer hover:z-10">
            <div
              className="w-full h-full rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 animate-fluffy-bounce border-4 border-white/60"
              style={{
                backgroundImage: getPhotoGradient('left'),
                filter: 'drop-shadow(0 4px 12px rgba(90, 163, 208, 0.4))',
                animationDelay: '0.45s',
              }}
            >
              {!photos[6].url && (
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage: "url('/img/6.jpg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
              )}
            </div>
            {photos[6].url && (
              <button
                onClick={() => deletePhoto(photos[6].id)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold shadow-lg"
              >
                ✕
              </button>
            )}
          </div>

          {/* Right center photo */}
          <div onClick={handleImageClick} className="absolute top-1/2 right-4 transform -translate-y-1/2 w-28 h-28 group cursor-pointer hover:z-10">
            <div
              className="w-full h-full rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 animate-fluffy-bounce border-4 border-white/60"
              style={{
                backgroundImage: getPhotoGradient('right'),
                filter: 'drop-shadow(0 4px 12px rgba(90, 163, 208, 0.4))',
                animationDelay: '0.75s',
              }}
            >
              {!photos[7].url && (
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage: "url('/img/7.jpg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
              )}
            </div>
            {photos[7].url && (
              <button
                onClick={() => deletePhoto(photos[7].id)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold shadow-lg"
              >
                ✕
              </button>
            )}
          </div>

          {/* Bottom center photo */}
          <div onClick={handleImageClick} className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-36 h-36 group cursor-pointer hover:z-10">
            <div
              className="w-full h-full rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 animate-fluffy-bounce border-4 border-white/60"
              style={{
                backgroundImage: getPhotoGradient('bottom'),
                filter: 'drop-shadow(0 4px 12px rgba(90, 163, 208, 0.4))',
                animationDelay: '1.1s',
              }}
            >
              {!photos[8].url && (
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage: "url('/img/8.jpg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
              )}
            </div>
            {photos[8].url && (
              <button
                onClick={() => deletePhoto(photos[8].id)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold shadow-lg"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Emoji Popups */}
        {emojiPopups.map((emoji) => (
          <div
            key={emoji.id}
            className="absolute pointer-events-none text-6xl animate-bounce z-50"
            style={{
              left: `${emoji.x}px`,
              top: `${emoji.y}px`,
              animation: 'float-up 1.5s ease-out forwards',
              transform: 'translate(-50%, -50%)',
            }}
          >
            🦖
          </div>
        ))}
      </div>

      {/* Instructions */}
      <div
        className={`text-center space-y-4 mt-16 transition-all duration-1000 ${
          isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
        }`}
        style={{ animationDelay: '0.4s' }}
      >

         <p style={{ color: '#88bfe9a8' }} className="text-foreground text-sm  uppercase ">
          tap the images for a surprise!</p>
        <p style={{ color: '#196199' }} className="text-foreground text-sm font-semibold uppercase hover:text-primary transition-colors duration-300">
          Developed by Your Cute Loving Poging Daks na IT Baby

        </p>
        <p className="text-primary text-lg font-semibold uppercase tracking-widest hover:text-secondary transition-colors duration-300">
          {photos.filter((p) => p.url).length > 0
            ? `${photos.filter((p) => p.url).length} photo${
                photos.filter((p) => p.url).length !== 1 ? 's' : ''
              } added`
            : '🦖 Happy Valentines Baby 🦖'}
        </p>
      </div>
      
    </div>
    
  );
}
