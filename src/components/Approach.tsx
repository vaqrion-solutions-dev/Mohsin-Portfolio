
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { approach } from '../data/portfolio';
import '../styles/approach.css';

gsap.registerPlugin(ScrollTrigger);

const Approach: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current?.children || [],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      gsap.fromTo(
        cardsRef.current?.children || [],
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const colors = ['#4f8ef7', '#7c3aed', '#22d3ee', '#10b981'];

  const experienceStats = [
    { label: 'Frontend Projects', value: '10+', color: '#4f8ef7' },
    { label: 'Backend Systems', value: '8+', color: '#7c3aed' },
    { label: 'Databases Used', value: '3', color: '#22d3ee' },
    { label: 'Tech Stack', value: '15+', color: '#10b981' },
  ];

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="section approach-section"
    >
      <div className="grid-bg approach-grid-bg" />

      <div className="container approach-container">
        <div ref={headerRef} className="approach-header">
          <div className="section-label approach-label">
            My Process
          </div>

          <h2 className="section-title approach-title">
            How I <span className="gradient-text">Approach</span> Development
          </h2>

          <p className="section-desc approach-description">
            A thoughtful, iterative methodology that ensures every project
            is built with quality, clarity and long-term maintainability.
          </p>
        </div>

        <div ref={cardsRef} className="approach-grid">
          {approach.map((step, index) => {
            const color = colors[index % colors.length];

            return (
              <div
                key={step.number}
                className="card approach-card"
                style={{
                  '--approach-color': color,
                  opacity: 0,
                } as React.CSSProperties}
              >
                <div className="approach-number-watermark">
                  {step.number}
                </div>

                <div className="approach-top-accent" />

                <div className="approach-icon">
                  {step.icon}
                </div>

                <div className="approach-step-number">
                  STEP {step.number}
                </div>

                <h3 className="approach-card-title">
                  {step.title}
                </h3>

                <p className="approach-card-description">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="experience-timeline">
          <div className="experience-gradient-line" />

          <div className="experience-content">
            <div className="experience-info">
              <div className="section-label">
                Experience
              </div>

              <h3 className="experience-title">
                2+ Years of{' '}
                <span className="gradient-text">
                  Professional Development
                </span>
              </h3>

              <p className="experience-description">
                Working across startups and independent projects, I've
                built expertise across the full stack — from pixel-perfect
                UIs to database-backed APIs.
              </p>
            </div>

            <div className="experience-stats">
              {experienceStats.map((item) => (
                <div
                  key={item.label}
                  className="experience-stat"
                >
                  <div
                    className="experience-stat-value"
                    style={{ color: item.color }}
                  >
                    {item.value}
                  </div>

                  <div className="experience-stat-label">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Approach;
