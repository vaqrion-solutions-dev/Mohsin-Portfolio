import { useEffect, useState, useCallback } from 'react';

// =====================================
// STYLES
// =====================================

import './index.css';
import './styles/global.css';
import './styles/navbar-cinematic.css';
import './styles/hero-reference.css';

// =====================================
// COMPONENTS
// =====================================

import PageLoader from './components/PageLoader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Approach from './components/Approach';
import Contact from './components/Contact';
import Footer from './components/Footer';

// =====================================
// GSAP
// =====================================

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// =====================================
// SECTION IDS
// =====================================

const SECTIONS = [
  'home',
  'about',
  'skills',
  'projects',
  'experience',
  'contact',
];

// =====================================
// MAIN APP
// =====================================

const App = () => {
  const [loaded, setLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // =====================================
  // ACTIVE SECTION TRACKING
  // =====================================

  useEffect(() => {
    if (!loaded) return;

    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach((id) => {
      const element = document.getElementById(id);

      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        {
          threshold: 0.3,
          rootMargin: '-10% 0px -30% 0px',
        }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [loaded]);

  // =====================================
  // CUSTOM CURSOR
  // =====================================

  useEffect(() => {
    if (!loaded) return;

    if (window.innerWidth <= 768) return;

    if (!window.matchMedia('(pointer: fine)').matches) return;

    const cursor = document.createElement('div');

    cursor.id = 'custom-cursor';
    cursor.setAttribute('aria-hidden', 'true');

    cursor.style.cssText = `
      width: 20px;
      height: 20px;
      border: 2px solid rgba(79, 142, 247, 0.6);
      border-radius: 50%;
      position: fixed;
      top: 0;
      left: 0;
      pointer-events: none;
      z-index: 9998;
      transform: translate(-50%, -50%);
      transition:
        width 0.2s ease,
        height 0.2s ease,
        border-color 0.2s ease,
        background 0.2s ease;
    `;

    const dot = document.createElement('div');

    dot.id = 'custom-cursor-dot';
    dot.setAttribute('aria-hidden', 'true');

    dot.style.cssText = `
      width: 6px;
      height: 6px;
      background: #4f8ef7;
      border-radius: 50%;
      position: fixed;
      top: 0;
      left: 0;
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%, -50%);
    `;

    document.body.appendChild(cursor);
    document.body.appendChild(dot);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let cursorX = mouseX;
    let cursorY = mouseY;

    let rafId = 0;

    const onMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;

      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
    };

    const animate = () => {
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;

      cursor.style.left = `${cursorX}px`;
      cursor.style.top = `${cursorY}px`;

      rafId = requestAnimationFrame(animate);
    };

    const onMouseOver = (event: MouseEvent) => {
      const target = event.target;

      if (!(target instanceof Element)) return;

      if (target.closest('a, button, [role="button"]')) {
        cursor.style.width = '36px';
        cursor.style.height = '36px';
        cursor.style.borderColor = 'rgba(34, 211, 238, 0.9)';
        cursor.style.background = 'rgba(34, 211, 238, 0.08)';
      }
    };

    const onMouseOut = (event: MouseEvent) => {
      const target = event.target;

      if (!(target instanceof Element)) return;

      if (target.closest('a, button, [role="button"]')) {
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        cursor.style.borderColor = 'rgba(79, 142, 247, 0.6)';
        cursor.style.background = 'transparent';
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);

    rafId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);

      cancelAnimationFrame(rafId);

      cursor.remove();
      dot.remove();
    };
  }, [loaded]);

  // =====================================
  // PAGE LOADER CALLBACK
  // =====================================

  const handleLoaderComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  // =====================================
  // MAIN APP RENDER
  // =====================================

  return (
    <>
      <PageLoader onComplete={handleLoaderComplete} />

      {loaded && (
        <div
          className="app-shell"
          style={{
            position: 'relative',
            background: 'var(--bg-primary)',
            minHeight: '100vh',
          }}
        >
          <Navbar activeSection={activeSection} />

          <main>
            {/* 1. HOME */}
            <Hero />

            {/* 2. ABOUT */}
            <About />

            {/* 3. SKILLS */}
            <Skills />

            {/* 4. PROJECTS */}
            <Projects />

            {/* 5. EXPERIENCE */}
            <Approach />

            {/* 6. CONTACT */}
            <Contact />
          </main>

          <Footer />
        </div>
      )}

      {/* =====================================
          CUSTOM CURSOR RESPONSIVE STYLING
      ===================================== */}

      {loaded && (
        <style>
          {`
            @media (pointer: fine) and (min-width: 769px) {
              body,
              body a,
              body button {
                cursor: none !important;
              }
            }

            @media (pointer: coarse), (max-width: 768px) {
              body,
              body a,
              body button {
                cursor: auto !important;
              }
            }

            #custom-cursor,
            #custom-cursor-dot {
              pointer-events: none !important;
            }
          `}
        </style>
      )}
    </>
  );
};

export default App;