
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface PageLoaderProps {
  onComplete: () => void;
}

const PageLoader: React.FC<PageLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Initializing...');
  const loaderRef = useRef<HTMLDivElement>(null);

  const statusMessages = [
    'Initializing...',
    'Loading 3D Engine...',
    'Building Environment...',
    'Rendering Scene...',
    'Almost Ready...',
    'Welcome.',
  ];

  useEffect(() => {
    let currentProgress = 0;
    let msgIdx = 0;

    const interval = setInterval(() => {
      // Slower progress for a longer loading experience
      currentProgress += Math.random() * 5 + 2;

      if (currentProgress >= 100) {
        currentProgress = 100;
        setStatusText('Welcome.');
        clearInterval(interval);

        setTimeout(() => {
          gsap.to(loaderRef.current, {
            opacity: 0,
            duration: 0.8,
            ease: 'power2.inOut',
            onComplete: () => {
              if (loaderRef.current) {
                loaderRef.current.style.display = 'none';
              }
              onComplete();
            },
          });
        }, 500);
      } else {
        const newIdx = Math.min(
          Math.floor((currentProgress / 100) * (statusMessages.length - 1)),
          statusMessages.length - 2
        );

        if (newIdx !== msgIdx) {
          msgIdx = newIdx;
          setStatusText(statusMessages[msgIdx]);
        }
      }

      setProgress(Math.min(currentProgress, 100));
    }, 120);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div ref={loaderRef} className="page-loader">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px' }}>
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '0.75rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#4f8ef7',
              marginBottom: '8px',
            }}
          >
            Portfolio
          </div>

          <div
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '2.5rem',
              fontWeight: '700',
              letterSpacing: '-0.02em',
              color: '#f1f5f9',
              lineHeight: 1,
            }}
          >
            MOHSIN{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #4f8ef7, #22d3ee)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              ALI
            </span>
          </div>
        </div>

        <div style={{ width: '280px' }}>
          <div className="loader-bar-track">
            <div className="loader-bar" style={{ width: `${progress}%` }} />
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '10px',
            }}
          >
            <span className="loader-text">{statusText}</span>
            <span className="loader-text">{Math.round(progress)}%</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#4f8ef7',
                animation: `pulse-dot 1.5s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
