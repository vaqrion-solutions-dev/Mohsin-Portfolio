
import React, { useEffect, useRef } from 'react';

interface ParticlePortraitProps {
  imageSrc: string;
}

interface Particle {
  x: number;
  y: number;
  startX: number;
  startY: number;
  size: number;
  color: string;
  alpha: number;
  delay: number;
  glow: boolean;
}

const ParticlePortrait: React.FC<ParticlePortraitProps> = ({
  imageSrc,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;

    if (!canvas || !wrapper || !imageSrc) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const image = new Image();
    image.src = imageSrc;

    let particles: Particle[] = [];
    let animationFrame = 0;
    let startTime = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let isReady = false;

    let mouseX = -1000;
    let mouseY = -1000;

    const animationDuration = 2800;
    let isVisible = false;
    let observer: IntersectionObserver;

    const createParticles = () => {
      width = wrapper.clientWidth;
      height = wrapper.clientHeight;

      if (!width || !height || !image.naturalWidth) return;

      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const offscreen = document.createElement('canvas');
      offscreen.width = width;
      offscreen.height = height;

      const offCtx = offscreen.getContext('2d');
      if (!offCtx) return;

      offCtx.clearRect(0, 0, width, height);

      // Match the original portrait's contain positioning
      const scale = Math.min(
        width / image.naturalWidth,
        height / image.naturalHeight
      );

      const drawWidth = image.naturalWidth * scale;
      const drawHeight = image.naturalHeight * scale;

      const offsetX = (width - drawWidth) / 2;
      const offsetY = 0;

      offCtx.drawImage(
        image,
        offsetX,
        offsetY,
        drawWidth,
        drawHeight
      );

      const pixels = offCtx.getImageData(
        0,
        0,
        width,
        height
      ).data;

      particles = [];

      // Smooth and evenly distributed particle formation
      const step = Math.max(3, Math.min(5, width / 75));

      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const index =
            (Math.floor(y) * width + Math.floor(x)) * 4;

          const red = pixels[index];
          const green = pixels[index + 1];
          const blue = pixels[index + 2];
          const alpha = pixels[index + 3];

          if (alpha < 40) continue;

          const angle = Math.random() * Math.PI * 2;
          const distance = 45 + Math.random() * 110;

          particles.push({
            x,
            y,
            startX: x + Math.cos(angle) * distance,
            startY: y + Math.sin(angle) * distance,
            size: 0.9 + Math.random() * 1.5,
            color: `rgb(${red}, ${green}, ${blue})`,
            alpha: alpha / 255,
            delay: Math.random() * 0.18,
            glow: Math.random() > 0.82,
          });
        }
      }

      startTime = performance.now();
      isReady = true;
      isReady = true;
    };

    const animate = (time: number) => {
      if (!isReady) return;

      ctx.clearRect(0, 0, width, height);

      const progress = Math.min(
        (time - startTime) / animationDuration,
        1
      );

      particles.forEach((particle) => {
        const localProgress = Math.max(
          0,
          Math.min(
            1,
            (progress - particle.delay) / (1 - particle.delay)
          )
        );

        const eased =
          1 - Math.pow(1 - localProgress, 4);

        const x =
          particle.startX +
          (particle.x - particle.startX) * eased;

        const y =
          particle.startY +
          (particle.y - particle.startY) * eased;

        // Gentle mouse interaction
        const dx = x - mouseX;
        const dy = y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        let pushX = 0;
        let pushY = 0;

        if (distance < 65 && distance > 0) {
          const force = (65 - distance) / 65;

          pushX = (dx / distance) * force * 7;
          pushY = (dy / distance) * force * 7;
        }

        // Particles softly disappear as original photo appears
        const particleFade =
          progress < 0.72
            ? 1
            : Math.max(0, 1 - (progress - 0.72) / 0.28);

        ctx.globalAlpha =
          particle.alpha * particleFade;

        ctx.fillStyle = particle.color;

        if (particle.glow && particleFade > 0.15) {
          ctx.shadowBlur = 7;
          ctx.shadowColor = '#36cfff';
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.beginPath();

        ctx.arc(
          x + pushX,
          y + pushY,
          particle.size,
          0,
          Math.PI * 2
        );

        ctx.fill();
      });

      ctx.shadowBlur = 0;

      // Original image smoothly appears after particle formation
      const imageFade = Math.max(
        0,
        Math.min(1, (progress - 0.68) / 0.32)
      );

      if (imageFade > 0) {
        const scale = Math.min(
          width / image.naturalWidth,
          height / image.naturalHeight
        );

        const drawWidth = image.naturalWidth * scale;
        const drawHeight = image.naturalHeight * scale;

        const offsetX = (width - drawWidth) / 2;

        ctx.globalAlpha = imageFade;

        ctx.drawImage(
          image,
          offsetX,
          0,
          drawWidth,
          drawHeight
        );
      }

      ctx.globalAlpha = 1;

      animationFrame = requestAnimationFrame(animate);
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();

      mouseX = event.clientX - rect.left;
      mouseY = event.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    const handleResize = () => {
      if (!image.naturalWidth) return;

      createParticles();
    };
    
    const handleVisibility = (entries: IntersectionObserverEntry[]) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && !isVisible) {
      isVisible = true;

      if (image.naturalWidth) {
        createParticles();
        cancelAnimationFrame(animationFrame);
        animationFrame = requestAnimationFrame(animate);
      }
    } else if (!entry.isIntersecting) {
      isVisible = false;
      cancelAnimationFrame(animationFrame);
    }
  });
};

observer = new IntersectionObserver(handleVisibility, {
  threshold: 0.35,
});

observer.observe(wrapper);

    image.onload = () => {
      createParticles();
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(animate);
    };

    image.onerror = () => {
      console.error(
        'Portrait image could not be loaded:',
        imageSrc
      );
    };

    if (image.complete && image.naturalWidth) {
      createParticles();
      animationFrame = requestAnimationFrame(animate);
    }

    wrapper.addEventListener('mousemove', handleMouseMove);
    wrapper.addEventListener('mouseleave', handleMouseLeave);

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(wrapper);

    return () => {
  cancelAnimationFrame(animationFrame);

  resizeObserver.disconnect();
  observer?.disconnect();

  wrapper.removeEventListener('mousemove', handleMouseMove);
  wrapper.removeEventListener('mouseleave', handleMouseLeave);
};
  }, [imageSrc]);

  return (
    <div
      ref={wrapperRef}
      className="particle-portrait"
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '2 / 3',
        overflow: 'hidden',
        borderRadius: '24px',
        background:
          'radial-gradient(ellipse at center, #142c50 0%, #080d19 75%)',
        border: '1px solid rgba(79, 142, 247, 0.28)',
        boxShadow:
          '0 20px 80px rgba(0,0,0,0.45), 0 0 45px rgba(34, 211, 238, 0.08)',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          display: 'block',
        }}
      />

      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          zIndex: 2,
          background:
            'linear-gradient(90deg, #22d3ee, #4f8ef7, #a855f7)',
        }}
      />
    </div>
  );
};

export default ParticlePortrait;
