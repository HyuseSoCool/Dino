'use client';

import { useState, useEffect } from 'react';
import GreetingSection from '@/components/GreetingSection';
import EnvelopeSection from '@/components/EnvelopeSection';
import GallerySection from '@/components/GallerySection';
import FloatingHearts from '@/components/FloatingHearts';

export default function Home() {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="relative w-full overflow-x-hidden" style={{ backgroundImage: 'linear-gradient(180deg, #0d2a47 0%, #2d5a8c 30%, #5ba3d0 70%, #e0f0ff 100%)' }}>
      <FloatingHearts />
      
      {/* Section 1: Greeting */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
        <GreetingSection />
      </section>

      {/* Section 2: Envelope Letter */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden py-20">
        <EnvelopeSection />
      </section>

      {/* Section 3: Heart Gallery */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden py-20">
        <GallerySection />
      </section>
    </main>
  );
}
